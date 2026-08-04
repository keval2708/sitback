import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactSelect from "react-select";
import * as yup from "yup";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Label } from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const TopSpender = () => {
  //hook
  const { t } = useTranslation();
  const { toaster } = useToaster();

  //states
  const [topspender, setTopSpender] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limit, setLimit] = useState({ value: "", label: "All" }); // Set default value for limit
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    starttime: "",
    endtime: "",
  };

  const formSchema = yup
    .object()
    .shape({
      startdate: yup.date().required("Please select a date"),
      enddate: yup.mixed().when("startdate", {
        then: (schema) =>
          schema
            .required("End date is required")
            .test("is-valid-date", "End date cannot be less than Start date", function (value) {
              const { startdate } = this.parent;
              if (value && startdate) {
                return moment(value).isSameOrAfter(startdate);
              }
              return true;
            }),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .strict(true);

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    setValue,
  } = methods;

  const startDateee = watch("startdate");

  const getTopSpenderList = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.TOP_SPENDER +
        `?startDate=${moment(startDate).format("YYYY-MM-DD")}&endDate=${moment(endDate).format(
          "YYYY-MM-DD"
        )}`,
        {
          params: {
            page,
            limit: limit.value,
          },
        }
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newTopSpenderData = res?.data?.data?.records;
        setTopSpender((prevData) => (page == 1 ? newTopSpenderData : [...prevData, ...newTopSpenderData]));
        setPageResponse(res?.data?.data);

        // setTopSpender(res?.data?.data?.records);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getTopSpenderList(1);
    }
  }, [startDate, endDate, limit]);

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setValue("startdate", null);
    setLimit({ value: "", label: "All" }); // Set limit to default value
  };

  const options = [
    { value: 10, label: 10 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
    { value: "", label: "All" },
  ];

  const handleNext = async () => {
    setCurrentPage((prev) => prev + 1);
    setPageResponse(null);
    if (pageResponse?.nextPage) {
      await getTopSpenderList(currentPage + 1);
    }
  };

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="table-header-bgfill">
          <h5>{t('topSpendersReport')}</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <Row>
            <Col md={6} lg={3}>
              <FormGroup className="white-input-wrapper">
                <Label>{t('dateRangeStart')}</Label>
                <FormGroup controlId="formBasicEmail">
                  <Controller
                    name="startdate"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="datepicker-input"
                        placeholderText="Select start date"
                        dateFormat="yyyy/MM/dd"
                        selected={field?.value}
                        maxDate={endDate ? endDate : new Date()}
                        onChange={(date) => {
                          field.onChange(date);
                          setStartDate(date);
                          setCurrentPage(1)
                        }}
                      />
                    )}
                  />
                </FormGroup>
              </FormGroup>
            </Col>
            <Col md={6} lg={3}>
              <FormGroup className="white-input-wrapper">
                <Label>{t('dateRangeEnd')}</Label>
                <ReactDatePicker
                  className="datepicker-input"
                  placeholderText="Select end date"
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  minDate={startDateee}
                  maxDate={new Date()}
                  onChange={(date) => {
                    setEndDate(date)
                    setCurrentPage(1)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={12} lg={6}>
              <FormGroup className="white-input-wrapper">
                <Label>{t('top')}</Label>
                <div className="clearfilter-btn-wrapper">
                  <ReactSelect
                    options={options}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    value={limit}
                    onChange={(e) => {
                      setLimit(e)
                      setCurrentPage(1)
                    }}
                  />
                  <Button className="uploadcsv-file-wrapper" onClick={() => handleClearFilter()}>
                    {t('clearFilter')}
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
        {startDate && endDate && (
          <div
            id="scrolltable"
            className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper"
          >
            <InfiniteScroll
              className="pageScroll"
              dataLength={topspender?.length || 0}
              next={() => handleNext()}
              hasMore={pageResponse?.nextPage || false}
              loader={<div style={{ visibility: "hidden" }}>done</div>}
              height={300}
            >

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>{t('client')}</th>
                    <th>{t('serviceQuantity')}</th>
                    <th>{t('servicesTotal')}</th>
                    <th>{t('productQuantity')}</th>
                    <th>{t('productTotal')}</th>
                    <th>{t('salesTotal')}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && currentPage === 1 ? <Loader loading={loading} /> : topspender?.length > 0 ? (
                    topspender?.map((detail, key) => {
                      return (
                        <tr key={key}>
                          <td className="">{detail?.username ? detail?.username : ""}</td>
                          <td className="">{detail?.serviceCount ? detail?.serviceCount : 0}</td>
                          <td className="">${detail?.serviceTotal ? detail?.serviceTotal : 0}</td>
                          <td className="">{detail?.productCount ? detail?.productCount : 0}</td>
                          <td className="">${detail?.productTotal ? detail?.productTotal : 0}</td>
                          <td className="">${detail?.salesTotal ? detail?.salesTotal : 0}</td>
                        </tr>
                      );
                    })
                  ) : null}
                  {pageResponse?.totalRecords === 0 ?
                    <tr>
                      <td colSpan={6} className="text-center">
                        <p className="notes-available-text">{t('noRecAvail')}</p>
                      </td>
                    </tr> : null
                  }
                </tbody>
              </Table>

            </InfiniteScroll>
          </div>
        )}
      </ClientAddLayoutTableWrapper>
    </div>
  );
};

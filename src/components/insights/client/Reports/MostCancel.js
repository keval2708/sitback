"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { Accordion, Col, Row, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import * as yup from "yup";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Label } from "@/styles/global/main.style";
import {
  ClientAddLayoutTableWrapper,
  InsightsCancellationReportsSection,
} from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const MostCancel = () => {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  const [cancelData, setCancelData] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [specificContent, setSpecificContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subDataLoading, setSubDataLoading] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

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

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    formState: { errors },
    watch,
  } = methods;

  const startDateee = watch("startdate");

  const getCancelUserList = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.MOST_CANCEL_USERS +
        `?startDate=${moment(startDate).format("YYYY-MM-DD")}&endDate=${moment(endDate).format(
          "YYYY-MM-DD"
        )}`,
        {
          params: {
            page,
            limit: 8,
          },
        }
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newCancelData = res?.data?.data?.records;
        setCancelData((prevData) => (page == 1 ? newCancelData : [...prevData, ...newCancelData]));
        setPageResponse(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (data, index) => {
    if (expandedAccordion === index) return;

    setExpandedAccordion(index);

    setSpecificContent([]);
    specificUserDetail(data);
  };

  const specificUserDetail = async (data) => {
    try {
      setSubDataLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.CANCEL_USER_DATA_DETAIL +
        `/${data?.userId}` +
        `?startDate=${moment(startDate).format("YYYY-MM-DD")}&endDate=${moment(endDate).format(
          "YYYY-MM-DD"
        )}&page=${page}&limit=${data?.cancelCount}`
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setSpecificContent(res?.data?.data?.records);
        // setSpecificContent((prevContent) => ({
        //   ...prevContent,
        //   [expandedAccordion]: res?.data?.data?.records, // Save content specific to the accordion index
        // }));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSubDataLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getCancelUserList();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg.action == "cancelBookingSpa" || msg.action == "cancelBookingUser") {
          if (startDate && endDate) {
            getCancelUserList(1);
          }
        }
      });
    }
  }, [window.io, startDate, endDate]);

  const handleNext = async () => {
    setCurrentPage((prev) => prev + 1);
    setPageResponse(null);
    if (pageResponse?.nextPage) {
      await getCancelUserList(currentPage + 1);
    }
  };

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="table-header-bgfill">
          <h5>{t("cancelReport")}</h5>
        </div>
        <div className="select-reports-box-wrapper">
          <Row>
            <Col>
              <FormGroup className="white-input-wrapper">
                <Label>{t("dateRangeStart")}</Label>
                <Controller
                  name="startdate"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      className="datepicker-input"
                      placeholderText="Select start date"
                      dateFormat="yyyy/MM/dd"
                      selected={field?.value || startDate}
                      onChange={(date) => {
                        field.onChange(date);
                        setStartDate(date);
                      }}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="white-input-wrapper">
                <Label>{t("dateRangeEnd")}</Label>
                <ReactDatePicker
                  className="datepicker-input"
                  placeholderText="Select end date"
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  minDate={startDateee}
                  onChange={(date) => setEndDate(date)}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        {startDate && endDate && (
          <div className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper">
            <InfiniteScroll
              className="pageScroll"
              dataLength={cancelData?.length || 0}
              next={() => handleNext()}
              hasMore={pageResponse?.nextPage || false}
              loader={<div style={{ visibility: "hidden" }}>done</div>}
              height={300}
            >
              <InsightsCancellationReportsSection>
                <div className="header-bar-wrapper">
                  <h5>{t("client")}</h5>
                  <h5>{t("cancellations")}</h5>
                </div>
                <Accordion key={`${startDate}-${endDate}`}>
                  {loading && currentPage === 1 ? (
                    <Loader loading={loading} />
                  ) : cancelData?.length > 0 ? (
                    cancelData?.map((data, index) => (
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header onClick={() => handleClick(data, index)}>
                          <h5>{data.username}</h5>
                          <h5>{data.cancelCount}</h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table striped hover responsive>
                            <thead>
                              <tr>
                                <th>{t("type")}</th>
                                <th>{t("cancelDateTime")}</th>
                                <th>{t("cancelledBy")}</th>
                                <th>{t("appointDateTime")}</th>
                              </tr>
                            </thead>
                            {!subDataLoading && specificContent?.length > 0 ? (
                              specificContent?.map((content, index) => (
                                <tbody key={index}>
                                  <tr>
                                    <td className="">
                                      {content?.serviceName} (
                                      {content?.hour * 60 + content?.minutes} min)
                                    </td>
                                    <td className="">
                                      {moment(content?.cancelTime).format("yyyy-MM-DD hh:mm a")}
                                    </td>
                                    <td className="">{content?.cancel_by}</td>
                                    <td className="">
                                      {content?.date +
                                        moment(content?.slot_time, " HH:mm:ss").format(" h:mm ") +
                                        content?.time_type}
                                    </td>
                                  </tr>
                                </tbody>
                              ))
                            ) : subDataLoading && expandedAccordion === index ? (
                              <Loader loading={subDataLoading} />
                            ) : (
                              <tr>
                                <td colSpan={6} className="text-center">
                                  <p className="notes-available-text">{t("noRecAvail")}</p>
                                </td>
                              </tr>
                            )}
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))
                  ) : null}
                  {pageResponse?.totalRecords === 0 ? (
                    <div className="text-center">
                      <p className="notes-available-text">{t("noRecAvail")}</p>
                    </div>
                  ) : null}
                </Accordion>
              </InsightsCancellationReportsSection>
            </InfiniteScroll>
          </div>
        )}
      </ClientAddLayoutTableWrapper>
    </div>
  );
};

"use client";

// import moment from "moment";
import moment from "moment";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import InlineSVG from "svg-inline-react";
import { CsvUploadDataModal } from "./Modal/CsvUploadDataModal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { handleRedirect, saveClientData } from "@/redux/insightClient";
import { API_ROUTER } from "@/services/apiRouter";
import { Input, Select } from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import {
  MoreCircle_icon,
  Search_icon,
  UploadcsvDownload_icon,
  Uploadcsv_icon,
} from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const ClientList = () => {
  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  //states
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);

  const [showCsvModal, setShowCsvModal] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const [verifiednewData, setVerifiedNewData] = useState();

  const [addCsvData, setAddCsvData] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchTableData();
    // setLoading(true);
  }, []);

  const fetchTableData = async (page = 1, params = "", filter_by = "") => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_CLIENT_DATA, {
        params: {
          page,
          ...(params ? { params } : {}),
          ...(filter_by ? { filter_by } : {}),
          limit: 10,
        },
      });

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const newClientData = res?.data?.data?.records;
        setClientData((prevData) => (page == 1 ? newClientData : [...prevData, ...newClientData]));
        setPageResponse(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const verifyClientData = async (userDatas) => {
    const transformedUserDatas = userDatas.map((data) => {
      return {
        ...data,
        birthday: data["birthday (yyyy-mm-dd)"],
      };
    });

    try {
      const params = {
        userData: transformedUserDatas,
      };
      const res = await axiosApiCall.post(API_ROUTER?.CSV_VERIFY, params);
      if (!res?.status) {
        fileInputRef.current.value = null;
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setVerifiedNewData(res?.data?.data?.verifiedData);
        if (res?.data?.data?.errorDataArray?.length > 0) {
          setErrorData(res?.data?.data?.errorDataArray);
          setShowCsvModal(true);
        } else {
          createClientData(res?.data?.data?.verifiedData);
        }
        fileInputRef.current.value = null;
      }
    } catch (error) {
      fileInputRef.current.value = null;
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const createClientData = async (userData) => {
    try {
      setCreateLoading(true);
      const params = {
        userData: userData,
      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_CLIENT_DATA, params);
      if (!res?.status) {
        fileInputRef.current.value = null;
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.errorDataArray?.length > 0) {
          setErrorData(res?.data?.errorDataArray);
          setShowCsvModal(true);
        } else {
          setShowCsvModal(false);
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        }
        fileInputRef.current.value = null;
        setVerifiedNewData(null);
        setAddCsvData(false);
        fetchTableData();
        //setShowCsvModal(false)
      }
    } catch (error) {
      fileInputRef.current.value = null;
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setCreateLoading(false);
      //setShowCsvModal(false)
    }
  };

  const DeleteClientData = async (id) => {
    // let date = moment(formData?.birthDate).format("YYYY-MM-DD");

    try {
      const res = await axiosApiCall.delete(API_ROUTER?.DELETE_CLIENT_DATA + `/${id}`);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setClientData((prevData) => prevData.filter((client) => client.userId !== id));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // CSV_VERIFY
  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const expectedHeaders = [
            "name",
            "birthday (yyyy-mm-dd)",
            "phone",
            "countrycode",
            "email",
          ];
          const actualHeaders = Object.keys(results.data[0]);
          const headersValid = expectedHeaders.every((header) => actualHeaders.includes(header));
          if (!headersValid) {
            fileInputRef.current.value = null;
            toaster("Please enter valid file with correct headers", TOAST_TYPES.ERROR);
            return;
          }
          const validRecords = results.data.filter((record) => {
            return !Object.values(record).every(
              (value) => value === null || value === undefined || value === ""
            );
          });

          fileInputRef.current.value = null;

          verifyClientData(validRecords);
        },
      });
    }
  };

  const handleNext = async () => {
    setCurrentPage((prev) => prev + 1);
    setPageResponse(null);
    if (pageResponse?.nextPage) {
      await fetchTableData(currentPage + 1, search, category);
    }
  };

  const handleChange = () => {
    dispatch(handleRedirect("client-add"));
  };

  const handleRouteChange = (value, detail) => {
    dispatch(saveClientData(detail));
    dispatch(handleRedirect(value));
  };

  const handleCategory = async (value) => {
    setCategory(value);
  };

  const handleSearch = async () => {
    if (search && category) {
      setCurrentPage(1);
      await fetchTableData(1, search, category);
    } else {
      setCurrentPage(1);
      await fetchTableData(1);
    }
  };
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await handleSearch();
    }
  };

  const formatCountryCode = (code) => {
    if (!code.startsWith("+")) {
      return `(+${code})`;
    }
    return `(${code})`;
  };

  useEffect(() => {
    if (addCsvData === true) {
      createClientData(verifiednewData);
    }
  }, [addCsvData, verifiednewData]);

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="searchfilter">
          <h4>{t("searchClient")}</h4>
          <div className="search-clientby-header-bar">
            <div className="header-wrapper">
              <Select
                aria-label="Default select example"
                onChange={({ target: { value } }) => handleCategory(value)}
                value={category}
              >
                <option value="all">{t("allField")}</option>
                <option value="client_id">{t("id")}</option>
                <option value="name">{t("name")}</option>
                <option value="birthday">Birthday</option>
                <option value="email">{t("email")}</option>
              </Select>
              <div className="search-input-icon-wrapper">
                <Input
                  type="text"
                  placeholder="Search"
                  className=""
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <InlineSVG
                  src={Search_icon}
                  className="global_laguage_icon"
                  onClick={(e) => handleSearch(e)}
                />
              </div>
              <button className="addnew-client" onClick={() => handleChange()}>
                {t("addNewClient")} +
              </button>
            </div>
            <div className="uploadcsv-btn-wrapper">
              <div className="uploadcsv-file-wrapperbtn-wrapper">
                <div className="uploadcsv-file-wrapper">
                  <p>{t("uploadCsv")}</p>
                  <InlineSVG src={Uploadcsv_icon} className="global_laguage_icon" />
                </div>
                <Input
                  type="file"
                  id="input"
                  placeholder="Upload .csv"
                  onChange={(e) => handleUpload(e)}
                  accept=".csv"
                  ref={fileInputRef}
                />
              </div>
              <button
                className="uploadcsv-file-wrapper download"
                onClick={() => {
                  window.location.href =
                    "https://sitback-media-dev.dryrun.click/sampleCSV/sample-client-user.csv";
                }}
              >
                {t("downloadCsv")}{" "}
                <InlineSVG src={UploadcsvDownload_icon} className="global_laguage_icon" />
              </button>
            </div>
          </div>
        </div>
        <div
          id="scrolltable"
          className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper"
        >
          <InfiniteScroll
            className="pageScroll"
            dataLength={clientData?.length}
            next={() => handleNext()}
            hasMore={pageResponse?.nextPage || false}
            loader={<div style={{ visibility: "hidden" }}>{t("done")}</div>}
            height={400}

          // scrollableTarget="scrolltable"
          >
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>{t("name")}</th>
                  <th>{t("id")}</th>
                  <th>Birthday</th>
                  <th>{t("phone")} #</th>
                  <th>{t("email")}</th>
                  <th></th>
                </tr>
              </thead>

              <tbody style={{ height: "50px" }}>
                {loading && currentPage === 1 ? (
                  <Loader loading={loading} />
                ) : clientData?.length > 0 ? (
                  clientData?.map((detail, index) => {
                    return (
                      <tr key={index}>
                        <td className="">{detail?.username ? detail?.username : "-"}</td>
                        <td className="">{detail?.client_id ? detail?.client_id : "-"}</td>
                        <td className="">
                          {detail?.dob
                            ? detail?.dob == "Invalid date"
                              ? "-"
                              : moment(detail?.dob).format("yyyy-MM-DD")
                            : "-"}
                        </td>
                        <td className="">
                          {detail?.countrycode ? formatCountryCode(detail?.countrycode) : ""}{" "}
                          {detail?.phone != "0" ? detail?.phone : "-"}
                        </td>
                        <td className="">{detail?.email ? detail?.email : "-"}</td>
                        <td className="">
                          <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                              <InlineSVG src={MoreCircle_icon} className="global_laguage_icon" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => handleRouteChange("client-note-list", detail)}
                              >
                                {t("notes")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleRouteChange("history-list", detail)}
                              >
                                {t("posHistory")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleRouteChange("serviceHistory-list", detail)}
                              >
                                {t("serviceHistory")}
                              </Dropdown.Item>
                              {detail.isEditable === false ? (
                                ""
                              ) : (
                                <Dropdown.Item
                                  onClick={() => handleRouteChange("client-edit", detail)}
                                >
                                  {t("edit")}
                                </Dropdown.Item>
                              )}

                              <Dropdown.Item onClick={() => DeleteClientData(detail?.userId)}>
                                {t("delete")}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })
                ) : null}
                {pageResponse?.totalRecords === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <p className="notes-available-text client-list">{t("noRecAvail")}</p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </ClientAddLayoutTableWrapper>

      <CsvUploadDataModal
        show={showCsvModal}
        errorData={errorData}
        onHide={() => setShowCsvModal(false)}
        verifiedData={verifiednewData}
        setAddCsvData={(e) => {
          setAddCsvData(e);
        }}
        createLoading={createLoading}
      // getClients={getClients}
      />
    </div>
  );
};

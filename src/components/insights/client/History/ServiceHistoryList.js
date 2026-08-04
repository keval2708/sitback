"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";

import { insightCheckSliceSelector } from "@/redux/insightClient";
import { API_ROUTER } from "@/services/apiRouter";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const ServiceHistoryList = () => {
  //hook
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { selectedClient } = useSelector(insightCheckSliceSelector);

  //states
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  useEffect(() => {
    fetchHistoryData();
  }, [selectedClient.userId]);

  const fetchHistoryData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.SERVICE_HISTORY_LIST + `/${selectedClient && selectedClient.userId}`,
        {
          params: {
            page,
          },
        }
      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setHistory(res?.data?.data?.records)
        const newhistoryData = res?.data?.data?.records;
        setHistory((prevData) => (page == 1 ? newhistoryData : [...prevData, ...newhistoryData]));
        setPageResponse(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setCurrentPage((prev) => prev + 1);
    setPageResponse(null);
    if (pageResponse?.nextPage) {
      await fetchHistoryData(currentPage + 1);
    }
  };


  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="table-header-bgfill">
          <h5>
            {t("history")}- <span>{selectedClient && selectedClient.username}</span>
          </h5>
        </div>
        <div className="">
          <div className="searchfilter">
            <h4 className="mb-0">Service Purchase History</h4>
          </div>
          <div
            id="scrolltable"
            className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper"
          >
            <InfiniteScroll
              className="pageScroll"
              dataLength={history?.length || 0}
              next={() => handleNext()}
              hasMore={pageResponse?.nextPage || false}
              loader={<div style={{ visibility: "hidden" }}>{t("done")}</div>}
              height={400}
            >
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>
                      {t("service")}/{t("product")}
                    </th>
                    <th>{t("quantity")}</th>
                    <th>
                      <div style={{ display: "inline-flex", alignItems: "center" }}>
                        {t("amount")}
                        <p style={{ color: "red", fontSize: "10px", marginLeft: "5px" }}>
                          (Including all charges)
                        </p>
                      </div>
                    </th>
                    <th>{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && currentPage === 1 ? (
                    <Loader loading={loading} />
                  ) : history?.length > 0 ? (
                    history?.map((detail, key) => {
                      return (
                        <>
                          <tr key={key}>
                            <td className="" style={{ width: "380px" }}>
                              <div>
                                <p>
                                  {detail?.servicename} - {detail?.totalmin} Min
                                </p>
                                {detail?.posData &&
                                  detail?.posData?.length > 0 &&
                                  detail?.posData?.map((data, key) => (
                                    <p key={key} style={{ marginTop: "10px" }}>
                                      {" "}
                                      {data?.productName}{" "}
                                    </p>
                                  ))}
                                {/* <p style={{ marginTop: "10px" }}> {detail?.productName} </p> */}
                              </div>
                            </td>
                            <td className="">
                              <div>
                                <p>-</p>
                                {detail?.posData &&
                                  detail?.posData?.length > 0 &&
                                  detail?.posData?.map((data, key) => (
                                    <p key={key} style={{ marginTop: "10px" }}>
                                      {" "}
                                      {data?.pcount ? <p>{data?.pcount}</p> : <></>}
                                    </p>
                                  ))}
                                {/* <p style={{ marginTop: "10px" }}>
                                  {detail?.pcount ? <p>{detail?.pcount}</p> : <></>}
                                </p> */}
                              </div>
                            </td>
                            <td className="">
                              <div>
                                <p>${detail?.charges}</p>

                                {detail?.posData &&
                                  detail?.posData?.length > 0 &&
                                  detail?.posData?.map((data, key) => (
                                    <p key={key} style={{ marginTop: "10px" }}>
                                      {" "}
                                      {data?.amount ? <p>${data?.amount}</p> : <></>}
                                    </p>
                                  ))}
                                {/* <p style={{ marginTop: "10px" }}>
                                  {detail?.amount ? <p>${detail?.amount}</p> : <></>}
                                </p> */}
                              </div>
                            </td>
                            <td className="">
                              <div>
                                <p>
                                  {" "}
                                  {detail?.date ? (
                                    <p>{moment(detail?.date).format("YYYY-MM-DD")}</p>
                                  ) : (
                                    <></>
                                  )}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : null}
                  {pageResponse?.totalRecords === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <p className="notes-available-text">{t("noRecAvail")}</p>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </Table>
            </InfiniteScroll>
          </div>
        </div>
      </ClientAddLayoutTableWrapper>
    </div>
  );
};

"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { handleRedirect, insightCheckSliceSelector } from "@/redux/insightClient";
import { API_ROUTER } from "@/services/apiRouter";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const ListNote = () => {
  //hook
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { selectedClient } = useSelector(insightCheckSliceSelector);
  const dispatch = useDispatch();

  //states
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageResponse, setPageResponse] = useState(null);

  useEffect(() => {
    fetchNotesData();
  }, []);

  useEffect(() => {
    fetchNotesData();
  }, [selectedClient.userId]);


  const fetchNotesData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        API_ROUTER?.LIST_NOTES + `/${selectedClient && selectedClient.userId}`, {
        params: {
          page,
          limit: 10,
        },
      }

      );
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setNotes(res?.data?.data?.records);

        const newClientData = res?.data?.data?.records;
        setNotes((prevData) => (page == 1 ? newClientData : [...prevData, ...newClientData]));
        setPageResponse(res?.data?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = () => {
    dispatch(handleRedirect("client-note-add"));
  };

  const handleNext = async () => {
    setCurrentPage((prev) => prev + 1);
    setPageResponse(null);
    if (pageResponse?.nextPage) {
      await fetchNotesData(currentPage + 1);
    }
  };

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <div className="table-header-bgfill">
          <h5>
            {t('notes')}- <span>{selectedClient && selectedClient.username} </span>
          </h5>
          <button className="addnew-client" onClick={() => handleChange()}>
            {t('addNotes')}
          </button>
        </div>
        <div className="">
          <div className="searchfilter">
            <h4 className="mb-0">{t('cNotes')}</h4>
          </div>
          <div className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper">
            <InfiniteScroll
              className="pageScroll"
              dataLength={notes?.length || 0}
              next={() => handleNext()}
              hasMore={pageResponse?.nextPage || false}
              loader={<div style={{ visibility: "hidden" }}>done</div>}
              height={400}
            >
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>{t('sr')}</th>
                    <th>{t('title')} </th>
                    <th style={{ width: "650px" }}>{t('description')} </th>
                    <th>{t('dateTime')}</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && currentPage === 1 ? <Loader loading={loading} /> : notes?.length > 0 ? notes?.map((detail, key) => {
                    return (
                      <tr key={key}>
                        <td className="" style={{ verticalAlign: "baseline" }}>{key + 1}</td>
                        <td className="" style={{ verticalAlign: "baseline" }}>{detail?.title}</td>
                        <td className="" style={{ verticalAlign: "baseline" }}>{detail?.description}</td>
                        <td className="" style={{ verticalAlign: "baseline" }}>{moment(detail?.createTime)?.format("yyyy-MM-DD hh:mm a")}</td>
                      </tr>
                    );
                  }) :
                    null
                  }
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
        </div>
      </ClientAddLayoutTableWrapper>
    </div>
  );
};

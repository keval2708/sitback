"use client";
import { Button, Modal, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { TableWrapperMain } from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";

export const CsvUploadDataModal = ({
  show,
  date,
  onHide = () => { },
  onConfirm = () => { },
  errorData,
  verifiedData,
  setAddCsvData,
  createLoading

}) => {

  const { t } = useTranslation();

  const handleonclick = () =>{
    setAddCsvData(true)
  }

  return (
    <div className="">
      <CustomModal
        show={show}
        onHide={() => onHide()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitbackmodalwrapper insights-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon " onClick={() => onHide()}>
          <p>
            {t('csvHeader1')}
          </p>
        </Modal.Header>
        <Modal.Body className="stripe-card">
          <ClientAddLayoutTableWrapper>
            <div
              id="scrolltable"
              className="sitback-history-table-wrapper addnew-client-wrapper table-scroll-added-wrapper"
            >
              <InfiniteScroll
                dataLength={0}
              // next={() => handleNext()}
              // hasMore={pageResponse?.nextPage || false}
              // loader={
              //   <p>.<Loader loading={loading} /></p>
              // }
              >
                <TableWrapperMain>
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>{t('name')}</th>
                        <th>{t('phone')} #</th>
                        <th>{t('birthDay')}</th>
                        <th>{t('email')}</th>
                        <th>{t('Error')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errorData?.length > 0 &&
                        errorData?.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td className="">{data?.name}</td>
                              <td className="">
                                ({data?.countrycode ? data?.countrycode : "-"}) {data?.phone}
                              </td>
                              <td className="">{data?.birthday}</td>
                              <td> {data?.email}</td>
                              <td>
                                {data?.errors?.name ? (
                                  data?.errors?.name?.map((nm, key) => (
                                    <div key={key}>
                                      <p>- {nm}</p>
                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}
                                {data?.errors?.phone ? (
                                  data?.errors?.phone?.map((phn, key) => (
                                    <div key={key}>
                                      <p>- {phn}</p>
                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}
                                {data?.errors?.birthday ? (
                                  data?.errors?.birthday?.map((bday, key) => (
                                    <div key={key}>
                                      <p>- {bday}</p>
                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}

                                {data?.errors?.email ? (
                                  data?.errors?.email?.map((mail, key) => (
                                    <div key={key}>
                                      <p>- {mail}</p>
                                    </div>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </TableWrapperMain>
              </InfiniteScroll>
            </div>
          </ClientAddLayoutTableWrapper>
          <div className="modal-footer">
            {verifiedData?.length > 0 &&
              <LoadingButton
                type="submit"
                // disabled={openLoading}
                label={t('skipErr')}
                loadinglabel={t('skipErr')}
                isLoading={createLoading}
                className="loading-btn-wrapper csvmodal"
                onClick={() =>  handleonclick()}
              />
            }

            <Button
              variant="primary"
              type="reset"
              className="cancel-btn-wrapper"
              isBorderBtn={true}
              onClick={() => onHide()}
            >
              Abort Process

            </Button>
          </div>
        </Modal.Body>
      </CustomModal>
    </div>
  );
};

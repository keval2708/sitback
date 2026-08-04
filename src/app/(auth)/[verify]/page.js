"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Tooltip as ReactTooltip } from "react-tooltip";
import InlineSVG from "svg-inline-react";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, LoginTextTitle, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import { LoginFormWrapper, LoginLayoutWrapper } from "@/styles/pages/signup.style";
import { Info_icon, delete_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function ServiceProvider() {
  // Hooks
  const params = useParams();
  const formData = new FormData();
  const { push } = useRouter();
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const DEFAULT_IMAGE = "/images/certificate-icon.svg";

  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const [error, setError] = useState("");
  const [width, setWidth] = useState(0);

  const [stepOneImageUpload, setStepOneImageUpload] = useState(null);
  const [stepTwoImageUpload, setStepTwoImageUpload] = useState(null);

  //third image modal
  const [lgShowoImageModal, setLgShowImageModal] = useState(false);
  const [stepThreeImg, setStepThreeImg] = useState([]);

  // useEffect
  useEffect(() => {
    getDocStatus();
  }, [params]);

  useEffect(() => {
    let count = 0;
    [stepOneImageUpload, stepTwoImageUpload, stepThreeImg].forEach((item, index) => {
      if (index === 1) {
        if (stepTwoImageUpload && stepOneImageUpload) {
          count = 50;
        }
      }
      if (index === 2) {
        if (stepTwoImageUpload && stepOneImageUpload && stepThreeImg.length > 0) {
          count = 100;
        }
      }
    });
    setWidth(count);
  }, [stepOneImageUpload, stepTwoImageUpload, stepThreeImg]);

  const getDocStatus = async () => {
    let docStatus = {
      token: params?.verify,
    };

    try {
      setLoadingApi(true);
      const res = await axiosApiCall.post(API_ROUTER?.GET_DOC_STATUS, docStatus);

      if (res?.documentAdded) {
        setLoadingApi(false);
        if (res.status === 1) {
          // DOC added, status: 1, documentAdded:true
          setLgShow(true);
        } else if (res.status === 2) {
          // DOC approved, status: 2, documentAdded:true
          push(PATH_AUTH?.logIn);
        } else if (res.status === 3) {
          // DOC rejected, status: 3, documentAdded:true
          setLgShow(false);
        }
      } else if (res.status === 4) {
        setLoadingApi(false);
      } else {
        push(PATH_AUTH?.root);
      }
    } catch (error) {
      setLoadingApi(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleSubmit = async () => {
    setError("");
    let imgError = false;
    if (!stepOneImageUpload || !stepTwoImageUpload || !stepThreeImg?.length) {
      imgError = true;
      setError(t("verifyText4"));
    }

    if (!imgError) {
      formData?.append("token", params?.verify);
      formData?.append("govdoc", stepOneImageUpload);
      formData?.append("otherdoc", stepTwoImageUpload);
      for await (const i of stepThreeImg) {
        formData.append("image", i?.fileObj);
      }

      try {
        setLoading(true);

        // const res = await axiosApiCall.post(API_ROUTER?.ADDVERIFYDOC, formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });

        const res = await axiosApiCall({
          method: "post",
          url: API_ROUTER?.ADDVERIFYDOC,
          baseURL: process.env.API_URL_V3,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          setLgShow(true);
          // push(PATH_DASHBOARD?.serviceProvider);
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOneImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setStepOneImageUpload(file);
    }
  };

  const handleTwoImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setStepTwoImageUpload(file);
    }
  };

  const renderCloseButton = (stepImage, setStepImage) => {
    if (stepImage && stepImage !== "/images/certificate-icon.svg") {
      return (
        <span className="icons-btn" onClick={() => handleImageReset(setStepImage)}>
          <Image isContainImg={true} alt="sitback" src="/images/close-icon.svg" />
        </span>
      );
    } else {
      return null;
    }
  };

  const handleImageReset = (setStepImage) => {
    setStepImage(null);
  };

  const blobGenerate = (arg) => {
    let multiImg = [];

    if (stepThreeImg.length + arg.target.files.length <= 5) {
      for (let i of arg.target.files) {
        URL.revokeObjectURL(i);
        multiImg.push({ file: URL?.createObjectURL(i), fileObj: i });
      }

      setStepThreeImg([...stepThreeImg, ...multiImg]);
    } else {
      toaster("You can select a maximum of 5 images.", TOAST_TYPES.ERROR);
    }
  };

  const deleteFile = (data) => {
    let removeImg = stepThreeImg.filter((d) => d !== data);
    setStepThreeImg([...removeImg]);
  };

  const handleDone = (e) => {
    e.preventDefault();
    if (stepThreeImg.length < 5) {
      toaster("Please select 5 images.", TOAST_TYPES.ERROR);
    } else {
      setLgShowImageModal(false);
    }
  };

  return (
    <>
      {loadingApi ? (
        <>
          <Loader loading={loadingApi} />
        </>
      ) : (
        <>
          <LoginLayoutWrapper>
            <div className="right-top-img-div">
              <Image alt="sitback" src="/images/right-top-img-1.svg" />
            </div>
            <div className="right-top-img-div left-top-img-div">
              <Image alt="sitback" src="/images/right-top-img-1.svg" />
            </div>
            <Container>
              <LoginFormWrapper className="verify-document-section">
                <LoginTextTitle>{t("verifyText")}</LoginTextTitle>
                <div className="verify-documents-block">
                  <div className="progress-bardiv">
                    <div className="progress-bar-active" style={{ width: `${width}%` }}></div>
                    <div className="step-list-div">
                      <span
                        className={`${
                          stepOneImageUpload && stepOneImageUpload !== "" ? "step-active" : ""
                        }`}
                      ></span>
                      <span className={`${stepTwoImageUpload ? "step-active" : ""}`}></span>
                      <span className={`${stepThreeImg?.length ? "step-active" : ""}`}></span>
                    </div>
                  </div>
                  <div className="verify-documents-divlist-wrapper">
                    <div className="document-box">
                      <div className="document-iconbox">
                        <input
                          name="step-1"
                          type="file"
                          accept="image/*, application/pdf"
                          onChange={(e) => handleOneImageUpload(e)}
                        />
                        <Image
                          isContainImg={true}
                          alt="sitback"
                          src={
                            stepOneImageUpload
                              ? stepOneImageUpload?.type == "application/pdf"
                                ? "images/pdf-svgrepo-com.svg"
                                : URL.createObjectURL(stepOneImageUpload)
                              : DEFAULT_IMAGE
                          }
                        />
                        {renderCloseButton(stepOneImageUpload, setStepOneImageUpload)}
                      </div>

                      <div className="info-section-wrapper">
                        <p>{t("verifyText1")}</p>
                        <InlineSVG
                          src={Info_icon}
                          data-tooltip-id="my-tooltip-1"
                          className="global_laguage_icon"
                        />
                        <ReactTooltip
                          id="my-tooltip-1"
                          className="verify-tooltip"
                          place="bottom"
                          content={
                            <>
                              <p>{t("verifyTooltip1")}</p>
                              <p>{t("verifyTooltip2")}</p>
                              <p>{t("verifyTooltip3")}</p>
                            </>
                          }
                        />
                      </div>
                    </div>
                    <div className="document-box">
                      <div className="document-iconbox">
                        <input
                          type="file"
                          name="step-2"
                          accept="image/*, application/pdf"
                          disabled={!stepOneImageUpload}
                          onChange={(e) => handleTwoImageUpload(e)}
                        />
                        <Image
                          isContainImg={true}
                          alt="sitback"
                          //  src="/images/license-icon.svg"
                          src={
                            stepTwoImageUpload
                              ? stepTwoImageUpload?.type == "application/pdf"
                                ? "images/pdf-svgrepo-com.svg"
                                : URL.createObjectURL(stepTwoImageUpload)
                              : DEFAULT_IMAGE
                          }
                        />
                        {renderCloseButton(stepTwoImageUpload, setStepTwoImageUpload)}
                      </div>
                      <p>{t("verifyText2")}</p>
                    </div>

                    <div className="document-box">
                      <div className="document-iconbox">
                        <span
                          className="add-icon-wrapper"
                          onClick={() => setLgShowImageModal(true)}
                          disabled={!stepOneImageUpload && !stepTwoImageUpload}
                        >
                          <Image
                            src="/images/certificate-icon.svg"
                            alt="sitback"
                            isContainImg={true}
                          />
                        </span>
                      </div>

                      <p>{t("verifyText3")}</p>
                    </div>
                  </div>
                  <LoadingButton
                    type="submit"
                    disabled={loading}
                    label={t("verifyCaps")}
                    loadinglabel={t("verify")}
                    isLoading={loading}
                    className="loading-btn-wrapper"
                    onClick={() => handleSubmit()}
                  />
                  <p className="text-danger">{error}</p>
                </div>
              </LoginFormWrapper>
            </Container>
            <div className="right-top-img-div right-button-img-div center-bottom-img">
              <Image alt="sitback" src="/images/right-top-img-1.svg" />
            </div>
          </LoginLayoutWrapper>

          <CustomModal
            show={lgShowoImageModal}
            onConfirm={() => setLgShowImageModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
            className="sitback-modal-wrapper"
          >
            <Modal.Body>
              <SitBackModalBodyWrapper>
                <h3 className="modal-title-text">{t("addphotos")}</h3>
                <Form>
                  <div className="upload-gallery-img-section">
                    <div className="upload-gallery">
                      <input
                        multiple
                        type="file"
                        name="file"
                        onChange={(e) => blobGenerate(e)}
                        accept="image/*"
                      />
                      <Image alt="sitback" src="/images/upload-gallery-icon.svg" />
                    </div>
                    <p>{t("uploadgallery")}</p>
                  </div>
                  <div className="gallery-image-view">
                    {stepThreeImg &&
                      stepThreeImg?.length > 0 &&
                      stepThreeImg.map((i, key) => (
                        <div key={key} className="gridbox">
                          <div className="gallery-image-box">
                            <span className="delete-icon-box" onClick={() => deleteFile(i)}>
                              <InlineSVG src={delete_icon} className="global_laguage_icon" />
                            </span>
                            <div className="gallery-img">
                              <img alt="sitback" src={i.file} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="modal-footer-div">
                    <LoadingButton
                      type="submit"
                      disabled={stepThreeImg?.length == 0 || stepThreeImg?.length > 5}
                      label="DONE"
                      onClick={(e) => handleDone(e)}
                    />
                    <Button
                      variant="primary"
                      type="reset"
                      isBorderBtn={true}
                      onClick={() => {
                        setStepThreeImg([]);
                        setLgShowImageModal(false);
                      }}
                    >
                      {t("cancelCaps")}
                    </Button>
                  </div>
                </Form>
              </SitBackModalBodyWrapper>
            </Modal.Body>
          </CustomModal>

          <Modal
            show={lgShow}
            onHide={() => {
              push(PATH_AUTH?.signIn);
            }}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
            className="sitback-modal-wrapper sitback-modalv2-wrapper"
          >
            <Modal.Header closeButton className="red-close-icon"></Modal.Header>
            <Modal.Body>
              <div className="sitback-request-modal-wrapper">
                <div className="sitback-request-img">
                  <Image isContainImg={true} alt="sitback" src="/images/request-time-img.svg" />
                </div>
                <h5>{t("verifyMText")}</h5>
                <p>{t("verifyMText1")}</p>
                <p>{t("verifyMText2")}</p>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

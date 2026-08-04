// ChatReportModal.js
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const ChatReportModal = ({ show, onHide = () => { }, onConfirm = () => { }, activeChat }) => {
  //hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { toaster } = useToaster();
  const { login } = useSelector(authCheckSliceSelector);

  //states
  const [lgShow, setLgShow] = useState(false);

  const clientName = activeChat?.current?.username;
  // Form Config
  const defaultValues = useMemo(() => {
    return {
      messages: "",
    };
  }, []);



  //schema
  const formSchema = yup
    .object()
    .shape({
      messages: yup.string().required("Message is required"),
    })
    .strict(true);

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Constants
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    onHide();
  };

  const resetState = () => {
    setValue("price", "");
    setValue("minute", "");
  };

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {
    }
  };

  const onSubmit = async (formData) => {
    let params = {
      description: formData.messages,
      user_id: activeChat?.current?.usernameID,
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_USER_REPORT, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        reset(defaultValues);
        resetState();
        cancel();
        setLgShow(true);

        // onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomModal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper report-customer modal-white-bg sitback-updated-profile-service-modal"
      >
        {/* <Modal.Header closeButton className="red-close-icon"></Modal.Header> */}
        <Modal.Body>
          <SitBackModalBodyWrapper className="pt-0">
            <h3 className="modal-title-text mt-2">{t('reportClient')}</h3>
            <Form onSubmit={handleSubmit(onSubmitForm)} className="mb-0">
              <FormGroup controlId="formBasicEmail">
                <Label>{t('cName')}</Label>
                <Input type="text" value={clientName} readOnly className="modal-input-white" />
              </FormGroup>
              <FormGroup controlId="formBasicEmail">
                <Label>{t('whatHappen')}</Label>
                <Input
                  as="textarea"
                  rows={8}
                  {...register("messages")}
                  placeholder="Write your message here"
                  className="modal-input-white"
                />
                <p className="text-danger">{errors.messages?.message}</p>
              </FormGroup>
              <div className="modal-footer-div mt-2">
                <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()} className="sitback-updated-cancel-btn-wrapper">
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t("save")}
                  loadinglabel={t("saving")}
                  isLoading={loading}
                  className="loading-btn-wrapper"
                />
              </div>
            </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>

      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper modal-white-bg sitback-updated-profile-service-modal"
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body>
          <div className="sitback-request-modal-wrapper report-submitted-modal-wrapper" style={{ minHeight: "auto" }}>
            <h5>{t('reportSubmit')}</h5>
            <p>{t('reportText1')}</p>
            <Button className="mb-2" onClick={() => setLgShow(false)}>{t('done')}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ChatReportModal;

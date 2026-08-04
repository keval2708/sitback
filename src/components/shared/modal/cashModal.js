// import { yupResolver } from "@hookform/resolvers/yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import {
  handlePaymentFailedModal,
  handlePaymentFailedTotalAmount,
} from "@/redux/appointment";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleTarget, handleTargetProcess, messageCheckSliceSelector } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const CashModal = ({
  show,
  onHide = () => { },
  data,
  handlePaymentOptionModel = () => { },
  onPaymentSuccess = () => { },
  productTotalAmount,
  tipAmount,
}) => {
  console.log("data", data);
  const [loading, setLoading] = useState(false);
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bookingData } = useSelector(messageCheckSliceSelector);

  const { card } = useSelector(authCheckSliceSelector);
  //const { tipPrice,isAddTip,optionSelected } = tipTotalAmount;
  //console.log("data",data);

  const TotalPayAmount = Number(data?.userTotalAmount || 0) + Number(productTotalAmount) + Number(tipAmount || 0);
  console.log("TotalPayAmount", TotalPayAmount);
  console.log("productTotalAmount", productTotalAmount);
  console.log("tipAmount", tipAmount);

  // methods
  const cancel = async () => {
    if (handlePaymentOptionModel) {
      handlePaymentOptionModel();
    }
    resetState();
    onHide();
  };
  // Form Config
  const defaultValues = useMemo(
    () => ({
      givenCash: null,
      neededCash: 0,
    }),
    []
  );
  // validation
  const formSchema = yup.object().shape({
    givenCash: yup
      .number()
      .typeError("Given amount must be a number")
      .integer("Given amount must be an integer")
      .required("Given amount is required"),
    neededCash: yup.number(),
  });

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = methods;

  const SelectGivenCash = methods.watch("givenCash");

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) { }
  };

  const onSubmit = async (formData) => {
    // let params = "";
    // if (tipTotalAmount?.isAddTip) {
    //   params = {
    //     id: data?.id,
    //     total_main_amount: data?.userTotalAmount,
    //     cash_given: formData?.givenCash,
    //     cash_needed: formData?.neededCash,
    //     spaTotalAmount: data?.spaTotalAmount,
    //     tip: tipAmount ? tipAmount : 0,
    //     tipemployee_id: tipTotalAmount?.optionSelected?.value,
    //     poscharge: productTotalAmount ? productTotalAmount : 0,
    //   };
    // } else {
    //   params = {
    //     id: data?.id,
    //     total_main_amount: data?.userTotalAmount,
    //     cash_given: formData?.givenCash,
    //     cash_needed: formData?.neededCash,
    //     spaTotalAmount: data?.spaTotalAmount,
    //     poscharge: productTotalAmount ? productTotalAmount : 0,
    //   };
    // }
    //return

    // const updatedList = bookingData.filter((record) => record.id == data?.id);
    // dispatch(handleTargetProcess("removeBooking"));
    // dispatch(handleTarget(updatedList[0]));
    // cancel();
    // reset(defaultValues);
    // resetState();
    // dispatch(handlePaymentFailedModal(false));.
    const params = {
      id: data?.id,
      total_main_amount: data?.userTotalAmount,
      cash_given: formData?.givenCash,
      cash_needed: formData?.neededCash,
      spaTotalAmount: data?.spaTotalAmount,
      tip: tipAmount ? tipAmount : 0,
      poscharge: productTotalAmount ? productTotalAmount : 0,
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CAPTURE_CASH_PAYMENT, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        const updatedList = bookingData.filter((record) => record.id == data?.id);
        dispatch(handleTargetProcess("removeBooking"));
        dispatch(handleTarget(updatedList[0]));
        cancel();
        reset(defaultValues);
        resetState();
        dispatch(handlePaymentFailedModal(false));
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handlePaymentOptionModel();
        onPaymentSuccess();
        dispatch(
          handlePaymentFailedTotalAmount({ tipPrice: null, isAddTip: false, optionSelected: null })
        );
        // setSmModalHide(true);
        // setOfflineBooking(true);
        // setShowAddModal(false);
        // setAppointmentDate(false)
        // setCurrentPage(1)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };
  const resetState = () => {
    reset(defaultValues);
    clearErrors("givenCash");
    setValue("givenCash", null);
    setValue("neededCash", 0);
  };

  const cashGiven = Number(SelectGivenCash || 0);

  const cashNeeded =
    SelectGivenCash === null || SelectGivenCash === ""
      ? TotalPayAmount
      : cashGiven < TotalPayAmount
        ? TotalPayAmount - cashGiven
        : -(cashGiven - TotalPayAmount);

  return (
    <CustomModal
      show={show}
      onHide={() => cancel()}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper sitback-updated-profile-service-modal"
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">{t("cashInfo")}</h3>

          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="card-info-detail-wrapper">
              <div className="row-wrapper">
                <div className="total-amount">
                  <h3>{t("totalAmtDue")}</h3>
                  <p>${TotalPayAmount}</p>
                </div>
              </div>
            </div>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("cashGiven")}</Label>
              <Input type="number" placeholder="Enter given cash" {...register("givenCash")} />
              <p className="text-danger mt-2">{errors?.givenCash?.message}</p>
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <Label>{t("cashNeeded")}</Label>
              <Input
                type="number"
                placeholder="Enter needed cash"
                disabled
                {...register("neededCash")}
                value={cashNeeded}
              />
              <p className="text-danger">{errors?.neededCash?.message}</p>
            </FormGroup>
            <div className="note-wrapper-block">
              <h6>Note:</h6>
              <p className="note-description">
                Platform charges based on the subscription will be deducted from the card (*******
                {card}) that was used to purchase the subscription.
              </p>
            </div>
            <div className="modal-footer-div">
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t("completePayment")}
                loadinglabel={t("saving")}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
            </div>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(CashModal);

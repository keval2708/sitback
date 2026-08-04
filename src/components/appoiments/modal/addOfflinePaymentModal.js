import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { handleCalender } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
  Image,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AddOfflineCardModal = ({
  show,
  setSmModalHide,
  setShowAddModal,
  onHide = () => { },
  appointmentDate,
  setAppointmentDate,
  setOfflineBooking,
  setCurrentPage,
}) => {
  const [loading, setLoading] = useState(false);
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // methods
  const cancel = async () => {
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
    formState: { errors },
  } = methods;

  const SelectGivenCash = methods.watch("givenCash");

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) { }
  };

  const onSubmit = async (formData) => {
    let params = {
      total_charge_amount: appointmentDate?.charges,
      processing_fees: 0,
      total_main_amount: appointmentDate?.charges,
      booking_id: appointmentDate?.id,
      user_id: appointmentDate?.user_id,
      paymentdescription: "cash payment",
      cash_given: formData?.givenCash,
      cash_needed: formData?.neededCash,
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_CASH_PAYMENT, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
        reset(defaultValues);
        resetState();
        setSmModalHide(true);
        setOfflineBooking(true);
        setShowAddModal(false);
        setAppointmentDate(false);
        setCurrentPage(1);
        //   // onConfirm();
      }
      dispatch(handleCalender(true));
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    reset(defaultValues);
    setValue("givenCash", 0);
    setValue("neededCash", 0);
  };

  const goBack = () => {
    onHide();
  };

  return (
    <CustomModal
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper sitbackmodalwrapper"
    >
      <Modal.Header closeButton className="red-close-icon">
        <span onClick={() => goBack()} className="go-to-backbtn">
          <Image alt="sitback" src="/images/Arrow-v3.svg" />
        </span>
      </Modal.Header>
      <Modal.Body className="stripe-card">
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">{t("cashInfo")}</h3>

          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="card-info-detail-wrapper">
              {/* <div className="card-info">
                <h5>Service Amount</h5>
                <p>${appointmentDate?.charges}</p>
              </div> */}
              <div className="row-wrapper">
                <div className="total-amount">
                  <h3>{t("totalAmtDue")}</h3>
                  <p>${appointmentDate?.charges}</p>
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
                value={
                  SelectGivenCash - parseInt(appointmentDate?.charges) < 0
                    ? Math.abs(SelectGivenCash - parseInt(appointmentDate?.charges)).toString()
                    : -Math.abs(SelectGivenCash - parseInt(appointmentDate?.charges)).toString() ||
                    0
                }
              />
              <p className="text-danger">{errors?.neededCash?.message}</p>
            </FormGroup>
            <div className="modal-footer-div">
              {/* <Button variant="primary" type="submit" onClick={onConfirm}> */}
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t("completePayment")}
                loadinglabel={t("saving")}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              {/* <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                Save
              </Button> */}
              {/* <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
              {t('cancel')}
            </Button> */}
            </div>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(AddOfflineCardModal);

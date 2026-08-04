import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from 'react-select'
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import OtpInput from "@/components/shared/inputs/otpInput";
import { useToaster } from "@/hooks";
import { handleSubscriptionFail } from "@/redux/appointment";
import { handleCalender, handleTarget, handleTargetProcess } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Image, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


const CancelAppointmentModal = ({
  show,
  handleClose,
  data,
  setcancelBooking,
  upcomingCalenderData,
}) => {

  const defaultValues = useMemo(
    () => ({
      category: "spa", // Set the default category value here
    }),
    []
  );

  // Validation schema
  const formSchema = yup.object().strict();

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
  } = methods;

  // Hooks
  const dispatch = useDispatch();
  const disable = useRef(false);
  const otpVerified = useRef(false);

  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [btnText, setBtnText] = useState('CANCEL');
  const [otpTextView, setOtpTextView] = useState(false);
  const [category, setCategory] = useState("spa");
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const [timerStart, setTimerStart] = useState(false);

  const formattedSeconds = seconds.toString().padStart(2, '0');

  const options = [
    { value: 'client', label: 'Client' },
    { value: 'spa', label: 'Spa' },
  ];

  const handleCategory = async (value) => {
    setCategory(value?.value);
    setValue('category', value?.value); // Update the form state
    if (value?.value === "spa") {
      setCategory("spa");
      setValue('category', "spa");
      setOtp('');
      disable.current = false;
      setOtpTextView(false);
      setSeconds(120)
      setBtnText('CANCEL');
      reset(defaultValues);
      otpVerified.current = false;
      setOtp('');
      setTimerStart(false)
    }
  };

  const addOrDelete = async () => {
    cancel();
    handleClose();
  };

  const cancel = async () => {
    setCategory("spa");
    setValue('category', "spa");
    setOtp('');
    disable.current = false;
    setOtpTextView(false);
    setSeconds(120)
    setBtnText('CANCEL');
    reset(defaultValues);
    otpVerified.current = false;
    setOtp('');
    handleClose();
    setTimerStart(false)
  };

  const selectedOption = options.find(option => option.value === category);

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {
      return error;
    }
  };
  const changeOtp = (value) => {
    setOtp(value)
  };
  useEffect(() => {
    if (timerStart) {
      if (seconds <= 0) return;

      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000); // Update every 1 second

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [seconds, show, timerStart])

  useEffect(() => {
    if (otp?.length > 3) {
      disable.current = false;
    }
  }, [show, otpTextView, otp]);

  const resendOtp = async () => {
    try {
      const params = {
        id:
          data?._def?.extendedProps?.type === "only_guest"
            ? data?._def?.extendedProps?.mainUserId
            : parseInt(data?.id),
        type: data?._def?.extendedProps?.type,
        guest_id: data?._def?.extendedProps?.type === "only_guest" ? parseInt(data?.id) : 0, //only_guest
      };
      //return

      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CANCEL_BOOKING_SEND_OTP, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setOtpTextView(true);
        setBtnText("VERIFY & CANCEL");
        disable.current = true;
        setSeconds(120)
        setTimerStart(true)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };
  const verifyOtp = async () => {

    try {
      if (!otp) {
        return toaster("OTP is required", TOAST_TYPES.ERROR);
      }
      setLoading(true);

      let param = {
        otp: otp,
        id: data?._def?.extendedProps?.type === "only_guest"
          ? data?._def?.extendedProps?.mainUserId
          : parseInt(data?.id),
        type: data?._def?.extendedProps?.type,
        guest_id: data?._def?.extendedProps?.type === "only_guest" ? parseInt(data?.id) : 0, //only_guest
        //phone: phNo?.number,
      };
      const res = await axiosApiCall.post(API_ROUTER?.CANCEL_BOOKING_VERIFY_OTP, param);
      if (!res?.status) {
        setOtp("");
        disable.current = true;
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {

        dispatch(handleCalender(true));
        let updatedList = [];
        if (data?._def?.extendedProps?.type === "only_main_user") {
          updatedList = upcomingCalenderData.filter(
            (record) => record.id == data?._def?.extendedProps?.mainUserId
          );
          if (data?._def?.extendedProps?.isguest === 0) {
            dispatch(handleTargetProcess("removeBooking"));
          } else {
            dispatch(handleTargetProcess("userCancel"));
          }
        } else if (data?._def?.extendedProps?.type === "only_guest") {
          updatedList = upcomingCalenderData.filter((record) => record.id == data?.id);
          dispatch(handleTargetProcess("userCancel"));
        }
        //dispatch(handleTarget(updatedList[0]));

        handleClose();
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        // setCancelbookinU(true);
        setcancelBooking(true);
        cancel();

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (info) => {
    //console.log("category",info?.category);
    if (info?.category === "spa") {
      cancel_appointment()
    } else {
      if (timerStart) {
        if (!otpVerified?.current) {
          await verifyOtp();
        } else {
          cancel();
        }
      } else {
        // API call

        const params = {
          id:
            data?._def?.extendedProps?.type === "only_guest"
              ? data?._def?.extendedProps?.mainUserId
              : parseInt(data?.id),
          type: data?._def?.extendedProps?.type,
          guest_id: data?._def?.extendedProps?.type === "only_guest" ? parseInt(data?.id) : 0, //only_guest
        };
        //return

        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.CANCEL_BOOKING_SEND_OTP, params);
        if (!res?.status) {
          setLoading(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setOtpTextView(true);
          setBtnText("VERIFY & CANCEL");
          disable.current = true;
          setSeconds(120)
          setTimerStart(true)
          setLoading(false);
        }
      }
    }
  };

  const cancel_appointment = async () => {
    setLoading(true);
    const params = {
      id:
        data?._def?.extendedProps?.type === "only_guest"
          ? data?._def?.extendedProps?.mainUserId
          : parseInt(data?.id),
      type: data?._def?.extendedProps?.type,
      guest_id: data?._def?.extendedProps?.type === "only_guest" ? parseInt(data?.id) : 0, //only_guest
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CANCEL_BOOKING, params);
      if (!res?.status) {
        if (res?.spaCardError) {
          dispatch(handleSubscriptionFail(true));
          push(PATH_DASHBOARD?.serviceProvider);
        }
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // setUpcomingList(res?.data?.data);

        dispatch(handleCalender(true));
        let updatedList = [];
        if (data?._def?.extendedProps?.type === "only_main_user") {
          updatedList = upcomingCalenderData.filter(
            (record) => record.id == data?._def?.extendedProps?.mainUserId
          );
          if (data?._def?.extendedProps?.isguest === 0) {
            dispatch(handleTargetProcess("removeBooking"));
          } else {
            dispatch(handleTargetProcess("spaCancel"));
          }
        } else if (data?._def?.extendedProps?.type === "only_guest") {
          updatedList = upcomingCalenderData.filter((record) => record.id == data?.id);
          dispatch(handleTargetProcess("spaCancel"));
        }
        // dispatch(handleTargetProcess("spaCancel"));
        dispatch(handleTarget(updatedList[0]));

        handleClose();
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        // setCancelbookinU(true);
        setcancelBooking(true);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => cancel()}
      centered
      className="sitback-modal-wrapper sitback-modalv2-wrapper confirm-cancel-modal-wrapper"
    >
      <Modal.Header closeButton className="red-close-icon pb-0" />
      <Modal.Body className="pt-0">
        <SitBackModalBodyWrapper className="pt-0">
          <h3 className="modal-title-text mb-2">Please confirm the cancellation</h3>
          <Form className="provider-form" onSubmit={handleSubmit(onSubmitForm)}>
            <FormGroup controlId="formBasicEmail">
              <Label>Who is cancelling?</Label>
              <Select
                options={options}
                name="category"
                className="sitback-select2-container input-with-icon"
                classNamePrefix="sitback-select-option"
                onChange={(e) => handleCategory(e)}
                value={selectedOption}
              />
              {
                otpTextView &&
                <>
                  <h5>
                    <i>
                      <img alt="sitback" src="/images/DangerCircle.svg" />
                    </i>
                    OTP has been sent to the client`s registered phone number.
                  </h5>
                </>}

            </FormGroup>

            {
              otpTextView &&
              <>

                <FormGroup controlId="formBasicEmail" className="mb-0">
                  <Label className="TickSquareicon">OTP {otpVerified?.current && <span className="TickSquareicon"><i><Image alt="sitback" isContainImg={true} src="/images/TickSquare.svg" /></i>Verified</span>} </Label>
                  <div>
                    <OtpInput value={otp} onChange={(val) => changeOtp(val)} />

                    <div className="login-detail-text-wrapper resend-code-link">
                      {
                        seconds > 0 &&
                        <span>Resend code in {formattedSeconds} seconds</span>
                      }
                      {
                        seconds <= 0 &&
                        <span className="pointer" onClick={() => resendOtp()}>Resend Code</span>
                      }
                    </div>
                  </div>
                </FormGroup>
              </>
            }

            <div className="addpricemessage mt-2">
              {/* <span>{t('verifyEmailText')}</span> */}
            </div>


            <div className="modal-footer-div mt-1">
              <LoadingButton
                type="submit"
                disabled={disable?.current || loading}
                label={btnText}
                loadinglabel={btnText}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => addOrDelete()}>
                KEEP APPOINTMENT
              </Button>
            </div>

          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </Modal>
  );
};

export default CancelAppointmentModal;

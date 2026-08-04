"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { MainMenu } from "@/components/dashboards/MainMenu";
import LoadingButton from "@/components/shared/button/LoadingButton";
import SubscriptionPayment from "@/components/shared/modal/SubscriptionPayment";
import { useToaster } from "@/hooks";
import { appointmentCheckSliceSelector } from "@/redux/appointment";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { handleBlock, handlePersonalInfoTab, handleProfileTab, handleSubscribe, messageTabHandle, tabHandle } from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Image,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutWrapper,
  ServiceProviderMenuListWrapper,
} from '@/styles/pages/signup.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function ServiceProvider() {
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);
  const { subscriptionPayment } = useSelector(appointmentCheckSliceSelector);

  // state
  const [lgShow, setLgShow] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posRedirect, setPosRedirect] = useState(0);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      message: "",
    }),
    []
  );

  // validation
  const formSchema = yup
    .object()
    .shape({
      message: yup.string().required("message is required"),
    })
    .strict();

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {
      return error
    }
  };

  const onSubmit = async (data) => {
    let param = {
      name: login?.username,
      message: data?.message,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.SPA_HELP, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    setOpenForm(false);
    setLgShow(true);
  };

  const resetState = () => {
    setValue("message", "");
  };


  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      console.log(res);
      if (!res?.status) {
        return res
      } else {
        setPosRedirect(res?.data?.postproductlength)
        if (res?.data?.data?.isCardError) {
          dispatch(handleBlock(true));
        } else {
          dispatch(handleBlock(res?.data?.data.isBlocked));
        }
        dispatch(handleSubscribe(res?.data?.data.isSubscribe));
        if (res?.data?.data.isBlocked) {
          setOpenForm(false);
          setLgShow(true);
        }
        if (res?.data?.data?.location == '' || res?.data?.data?.location == null) {
          setCheckLocation(true);
        }
        if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data.planData?.status == 'canceled') {
            push(PATH_DASHBOARD?.subscriptions);
          }
          if (res?.data?.data?.spa_type == "onlydashboard") {
            push(NEW_DASHBOARD_PATH?.dashboard);
          }
          if (res?.data?.data?.planData?.plan_id == 1) {
            dispatch(tabHandle("second"));
          }
        }
        if (res?.data?.data?.isSubscribe == 0) {
          push(PATH_DASHBOARD?.subscriptions);
        }
        if (res?.data?.data?.isSubscribe == 3) {
          if (res?.data?.data.planData?.status == 'canceled') {
            leave_room();
          }
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    document.body.classList.remove("background-white-layout");
    getProfileInfo();
  }, []);

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie('token');
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return res
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error
    }
  };

  const openMailForm = async () => {
    dispatch(tabHandle("third"));
    dispatch(messageTabHandle("first"));
    push(PATH_DASHBOARD?.insights);
    // setLgShow(false);
    // setOpenForm(true);
  };

  const goToPage = async () => {
    dispatch(handleProfileTab('fourth'));
    dispatch(handlePersonalInfoTab({ isEdit: true, isLocationFocus: true }));
    push(PATH_DASHBOARD?.profileService);
  };

  return (
    <div className="service-profider-layout sitback-updated-service-provider-wrapper">
      <LoginLayoutWrapper className="service-profider">
        <div className="right-top-img-div right-top">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <div className="right-top-img-div left-top-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <Container>
          <LoginFormWrapper className="isServiceProviderLayout">
            <ServiceProviderMenuListWrapper>
              <MainMenu posRedirect={posRedirect} />
              <div className="faq">
                <Link href={PATH_DASHBOARD?.faq}>
                  <h5>{t('ClickForHelp')}</h5>
                </Link>
              </div>
            </ServiceProviderMenuListWrapper>
          </LoginFormWrapper>
        </Container>
        <div className="right-top-img-div right-button-img-div center-bottom-img">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
      </LoginLayoutWrapper>

      <Modal
        show={lgShow}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('tmpSuspend')}</p>
            <p>{t('contactAdminQue')}</p>
            <span onClick={() => openMailForm()}>{t('contactUs')}</span>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={checkLocation}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('addLocationField')}</p>
            <span onClick={() => goToPage()}>{t('updateLocation')}</span>
          </div>
        </Modal.Body>
      </Modal>


      <Modal
        show={openForm}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper "
      >
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <h3 className="modal-title-text">{t('contactAdmin')}</h3>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup controlId="formBasicEmail">
                <Label>{t('message')}</Label>
                <Input
                  as="textarea"
                  rows={5}
                  {...register("message")}
                  placeholder="message"
                />
                <p className="text-danger">{errors?.message?.message}</p>
              </FormGroup>
              <div className="modal-footer-div mt-2">
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t('save')}
                  loadinglabel={t('saving')}
                  isLoading={loading}
                  className="loading-btn-wrapper"
                />
                <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
                  {t("cancel")}
                </Button>
              </div>
            </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </Modal>

      <SubscriptionPayment
        show={subscriptionPayment}
      />

    </div>
  )
}

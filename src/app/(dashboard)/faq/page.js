"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import { FrequentlyAskQuestionsLayout } from "@/styles/pages/subscriptions.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function FAQS() {
  //state
  const [faqData, setfaqData] = useState([]);
  const [loading, setLoading] = useState(false);

  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { login } = useSelector(authCheckSliceSelector);

  useEffect(() => {
    listFaq();
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res
      } else {
        dispatch(loginDetail(res?.data?.data));
        if (res?.data?.data.isBlocked) {
          // push(PATH_DASHBOARD?.serviceProvider);
        }
        if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data.planData?.status == 'canceled') {
            push(PATH_DASHBOARD?.subscriptions);
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

  const listFaq = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_FAQS);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setfaqData(res.data.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <MainLayoutWrapper>
        <FrequentlyAskQuestionsLayout>
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }}>
                <div className="text-center-wrapper">
                  <h3 className="main-title-text">{t('frequently')}</h3>
                </div>
                <Accordion defaultActiveKey="0">
                  {faqData.map((faqItem, index) => (
                    <Col lg={12} key={index}>
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                          <h3>{faqItem.question}</h3>
                          <span></span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>{faqItem.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Col>
                  ))}
                </Accordion>
                <div className="contact-link-text">
                  {/* <a className="mail-text" href='mailto:support@sitback.io'>
                    {t("needHelp")}
                  </a> */}
                  <Link href=''
                    onClick={() => window.location = 'mailto:support@sitback.io'}>
                    {t("needHelp")}
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </FrequentlyAskQuestionsLayout>
      </MainLayoutWrapper>
    </>
  );
}

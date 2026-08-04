"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  ContactUsLayoutWrapper,
  FormGroup,
  Image,
  Input,
  Label,
  MainLayoutWrapper,
} from "@/styles/global/main.style";
import {
  ComingSoonLayoutWrapper,
  ContactUsUpdatedWrapper,
} from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function ContactUs() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { toaster } = useToaster();

  useEffect(() => {
    document.body.classList.remove("background-white-layout");
  }, []);

  const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must not contain spaces and only letters are allowed"),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Last Name must not contain spaces and only letters are allowed"),
  email: Yup.string()
    .required(t("reqEmail"))
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      t("validEmailAddress")
    ),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Please enter a valid 10 digit phone number"),
  message: Yup.string()
  .trim() // Trims the leading and trailing spaces
  .required("Message is required")
  .test('not-just-space', 'Message cannot be just spaces', value => value.trim().length > 0),

});


  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

const onSubmit = async (data) => {
    let params = {
      firstname:data?.firstName,
      lastname:data?.lastName,
      countrycode:'+1',
      phone:data?.phoneNumber,
      email:data?.email,
      message:data?.message,

    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CONTACT_US, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        reset();
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BlogHeader />
      <MainLayoutWrapper style={{minHeight: 'calc(100vh - 100px)'}}>
        <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-medium-size-banner-div">
          <section className="sitback-banner-updated-div">
            <div className="sitback-banner-image-div">
              <img
                src="/images/landing-banner-image.webp"
                alt="Loading Video..."
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                  zIndex: 2,
                }}
              />
              <div className="banner-content-wrapper banner-content-with-btn-div contact-banner-content-div">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>{t('contactUsText1')}</h1>
                    <p>{t('contactUsText2')}</p>
                    <Link href="javascript:void(0);" onClick={() => {window.location.href = "mailto:support@sitback.com";}} className="email-link-wrapper">
                      <div className="icon-div">
                        <Image alt="sitback" src="/images/email-icon.svg" />
                      </div>
                      {t('contactUsText3')}
                    </Link>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>
        <ContactUsUpdatedWrapper>
          <div className="contact-form-main-div">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col sm="6">
                    <FormGroup className="contact-form-group">
                      <Label>{t('contactUsFormText1')}</Label>
                      <Input
                        type="text"
                        placeholder="John"
                        {...register("firstName")}
                        className={errors.firstName ? "is-invalid" : ""}
                      />
                      <div className="error">{errors.firstName?.message}</div>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="contact-form-group">
                      <Label>{t('contactUsFormText2')}</Label>
                      <Input
                        type="text"
                        placeholder="Doe"
                        {...register("lastName")}
                        className={errors.lastName ? "is-invalid" : ""}
                      />
                      <div className="error">{errors.lastName?.message}</div>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="contact-form-group">
                      <Label>{t('contactUsFormText3')}</Label>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        {...register("email")}
                        className={errors.email ? "is-invalid" : ""}
                      />
                      <div className="error">{errors.email?.message}</div>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="contact-form-group">
                      <Label>{t('contactUsFormText4')}</Label>
                      <Input
                        type="number"
                        placeholder="1234567890"
                        {...register("phoneNumber")}
                        className={errors.phoneNumber ? "is-invalid" : ""}
                      />
                      <div className="error">{errors.phoneNumber?.message}</div>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="contact-form-group text-area-form-group">
                  <Label>{t('contactUsFormText5')}</Label>
                  <Input
                    placeholder="Write your message..."
                    as="textarea"
                    {...register("message")}
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  />
                  <div className="error">{errors.message?.message}</div>
                </FormGroup>
                <div className="footerbox">
                    <Button variant="primary" type="submit" className="send-msg-btn" disabled={loading}>
                    {t('contactUsFormText6')}
                  </Button>
                </div>
              </Form>
          </div>
        </ContactUsUpdatedWrapper>
        <ContactUsLayoutWrapper>
          {/* <div className="cloud-image-wrapper">
            <Image alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-side-cloud-img">
            <Image alt="sitback" src="/images/Union.svg" />
          </div> */}
          {/* <Container>
            <div className="contact-form-wrapper">
              <div className="contact-detailbox">
                <h3>Contact Information</h3>
                <p>Email directly or submit the form to contact us.</p>
                <Link href="javascript:void(0)" onClick={() => {window.location.href = "mailto:support@sitback.com";}} className="">
                    <InlineSVG src={EmailV2_icon} className="iconbox" />
                    Support@sitback.com
                </Link>
              </div>
              <div className="form-layout-box">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label>First Name</Label>
                        <Input
                          type="text"
                          placeholder="John"
                          {...register("firstName")}
                          className={errors.firstName ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.firstName?.message}</div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                          type="text"
                          placeholder="Doe"
                          {...register("lastName")}
                          className={errors.lastName ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.lastName?.message}</div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="example@example.com"
                          {...register("email")}
                          className={errors.email ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.email?.message}</div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                          type="number"
                          placeholder="1234567890"
                          {...register("phoneNumber")}
                          className={errors.phoneNumber ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.phoneNumber?.message}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label>Message</Label>
                    <Input
                      placeholder="Write your message..."
                      as="textarea"
                      {...register("message")}
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    />
                    <div className="error">{errors.message?.message}</div>
                  </FormGroup>
                  <div className="footerbox">
                     <Button variant="primary" type="submit" disabled={loading}>
                      Send Message
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Container> */}
        </ContactUsLayoutWrapper>
      </MainLayoutWrapper>
      <HomeFooter/>
    </>
  );
}

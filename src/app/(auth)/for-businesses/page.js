"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import sign from "jwt-encode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Form, FormGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import "react-day-picker/style.css"
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { handleLoginTab } from "@/redux/authCheck";
import { handleStep, manageSchedulerResponse } from "@/redux/quickBooking";
import { cmsSelectSpa } from "@/redux/scheduler";
import { myHomePageSelectedDate, myHomePageSelectedService, mySelectedDate, mySelectedServiceList, mySelectedSlot } from "@/redux/service";
import { PATH_AUTH, PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, Input, Label, LoginTextTitle,SitBackModalBodyWrapper } from "@/styles/global/main.style";
import {
  ComingSoonLayoutWrapper,
  ForBusinessDetailDiv,
} from "@/styles/pages/comingsoon.style";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-loading-skeleton/dist/skeleton.css'
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { conversationPixel } from "@/utils/ConversionPixel";





export default function ForBusinesses() {

  // hooks
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { toaster } = useToaster();

  const { t } = useTranslation();
  const [spaDetails, setSpaDetails] = useState();
  const [show, setShow] = useState(false);
  const [requestModalShow, setShowRequestModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
      },
    });

  const handleClose = () => {
    dispatch(mySelectedSlot(null))
    dispatch(mySelectedDate(null))
    setSpaDetails()
    setShow(false);
  }

  const handleRedirect = (key) => {
     // handleLoginTab
     dispatch(handleLoginTab(key));
     push(PATH_AUTH?.signIn);
   };

  useEffect(() => {
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedService(null))
    dispatch(mySelectedServiceList(null));
    dispatch(mySelectedSlot(null))
    dispatch(mySelectedDate(null))
    dispatch(manageSchedulerResponse(null));
    dispatch(handleStep(1))
  }, []);

  const generateIframe = useMemo(() => {
    dispatch(cmsSelectSpa(true));
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${sign(
      spaDetails,
      process.env.SECRET_KEY
    )}`;
    return link; // Return only the link, not the entire anchor element
  }, [spaDetails]);



  const openRequestModal = () => {
    conversationPixel()
    setShowRequestModal(true)
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false); // Close the modal
    reset();
  };


  const onSubmit = async (data) => {
    let params = {
      firstname:data?.firstName,
      lastname:data?.lastName,
      countrycode:'+1',
      phone:data?.phoneNumber,
      email:data?.email,

    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.REQUEST_UD, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handleCloseRequestModal()
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectSpa = () => {
     push(PATH_AUTH?.spas);
   };

  return (
    <>
     <BlogHeader />
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
            <div className="banner-content-wrapper banner-content-with-btn-div">
              <div className="banner-top-title-div">
                <Container>
                  <div className="for-business-banner-content-div">
                    <h1>Sitback.io</h1>
                    <p>The OpenTable for Wellness Appointments</p>
                  </div>
                  <div className="banner-btn-div">
                    <Button className="login-btn" onClick={() => handleRedirect("first")}>Login/Sign Up</Button>
                    <Button className="req-more-btn" onClick={() => openRequestModal()}>Request More Info</Button>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </section>
      </ComingSoonLayoutWrapper>
      <ForBusinessDetailDiv>
        <Container fluid>
          <div className="for-business-main-div">
            <div className="business-booking-revenue-wrapper">
              <div className="business-booking-revenue-inner-div">
                <div className="business-box-div">
                  <div className="box-inner-div">
                    <div className="clearfix">
                      <div className="business-img-div">
                        <Image isContainImg={true} alt="sitback" src="/images/booking-request-image.svg" />
                      </div>
                    </div>
                    <div className="business-detail-div">
                      <h3>10,000+</h3>
                      <p>Booking Requests</p>
                    </div>
                  </div>
                </div>
                <div className="business-box-div">
                  <div className="box-inner-div">
                    <div className="clearfix">
                      <div className="business-img-div">
                        <Image isContainImg={true} alt="sitback" src="/images/revenue-spa-image.svg" />
                      </div>
                    </div>
                    <div className="business-detail-div">
                      <h3>$500,000+</h3>
                      <p>Revenue for Listed Spas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="business-content-div">
              <div className="business-image-div">
                <div className="img-div">
                  <Image isContainImg={true} alt="sitback" src="/images/business-updated-1.png" />
                </div>
              </div>
              <div className="business-detail-div">
                <div className="business-detail-inner-div">
                  <h3>
                    The Quick Response Dashboard
                  </h3>
                  <div className="para-text-div">
                    <p>Sitback.io gives your front desk and service providers access to our Quick Response Dashboard.</p>
                    <p>When a booking request comes in, your team can quickly approve, decline, or suggest another time in just a few clicks.</p>
                    <p>It keeps you in control of your schedule while we handle all the marketing and client outreach.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="business-content-div">
              <div className="business-detail-div">
                <div className="business-detail-inner-div">
                  <h3>
                  Showcase your appointments to the clients ready to book.
                  </h3>
                  <div className="para-text-div">
                    <p>Open time slots are like inventory—if they’re not on our site, clients can’t book them. Uploading them is the fastest way to fill your slower hours and bring in new clients.</p>
                    <p>When you showcase your appointments to the world, you’re immediately putting yourself in front of the clients who are ready to book their next service.</p>
                    <p>Our dashboard makes it easy to look at the vacancies on your calendar, get them on our website fast, and get them filled....fast.</p>
                  </div>
                </div>
              </div>
              <div className="business-image-div">
                <div className="img-div">
                  <Image isContainImg={true} alt="sitback" src="/images/business-updated-2.png" />
                </div>
              </div>
            </div>
            <div className="business-content-div">
              <div className="business-image-div">
                <div className="img-div">
                  <Image isContainImg={true} alt="sitback" src="/images/business-updated-3.png" />
                </div>
              </div>
              <div className="business-detail-div">
                <div className="business-detail-inner-div">
                  <h3>
                  Easy for Clients: An app to find the perfect spa in their area.
                  </h3>
                  <div className="para-text-div">
                    <p>Nobody enjoys searching and checking for individual spa options.</p>
                    <p>Sitback offers a unique and easy way to find the best spas with available appointments in their desired area, all at once.</p>
                    <p>Clients just search broadly or choose the type of massage they want, and bingo! We will filter and display the best spas and resorts for them to book.</p>
                    <p>With filters for the client to specify what they’re looking for in a spa and resort, our app will present the nearest top spa resorts in the area with available slots at your service.</p>
                  </div>
                  <div className="login-btn-div">
                    {/* <Button className="login-btn desktop-view-btn" onClick={() => handleRedirect("first")}>Login/Sign Up</Button>
                    <Button className="req-more-btn desktop-view-btn" onClick={() => openRequestModal()}>Request More Info</Button> */}
                    <Button className="login-btn book-appointment-btn" onClick={() => handleRedirectSpa()}>Book an Appointment</Button>
                  </div>
                  <div className="login-mobile-view-btn-div">
                    <Button className="login-btn" onClick={() => handleRedirect("first")}>Login/Sign Up</Button>
                    <Button className="login-btn req-more-info" onClick={() => openRequestModal()}>Request More Info</Button>
                    {/* <Button className="login-btn book-appointment-btn" onClick={() => handleRedirectSpa()}>Book an Appointment</Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </ForBusinessDetailDiv>

      <HomeFooter/>
      <Modal
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper cloud-image-wrapper-main"
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body>
          <div className="app-store-wrapper">
            <LoginTextTitle>{t("loginModelText")}</LoginTextTitle>
            <div className="app-store-btns-wrapper">
              <Link href="javascript:void(0)" className="app-store-btn"  onClick={() => window.location = 'https://apps.apple.com/us/app/id6475679969'}>
                <Image isContainImg={true} alt="sitback" src="/images/app-store.svg" />
              </Link>
              <Link href="javascript:void(0)" className="app-store-btn" onClick={() => window.location = 'https://play.google.com/store/apps/details?id=com.truvyn.sitback'}>
                <Image isContainImg={true} alt="sitback" src="/images/google-play.svg" />
              </Link>
              <p className="or-text">OR</p>
              {/* <Link href="/">{t("bookAnAppointmentLink")}</Link> */}
              <Link className="link-text" href={generateIframe}>
                {t("bookAnAppointmentLink")}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={requestModalShow}
        onHide={() => handleCloseRequestModal()}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper more-info-modal-wrapper"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <h3 className="modal-title-text">Want More Info Before Listing Your Spa?</h3>
            <div className="form-layout-box">
                <Form onSubmit={handleSubmit(onSubmit)}>

                      <FormGroup className="for-business-form-group">
                        <Label>*First Name</Label>
                        <Input
                          type="text"
                          placeholder="First Name Here"
                          {...register("firstName")}
                          className={errors.firstName ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.firstName?.message}</div>
                      </FormGroup>

                      <FormGroup className="for-business-form-group">
                        <Label>*Last Name</Label>
                        <Input
                          type="text"
                          placeholder="Last Name Here"
                          {...register("lastName")}
                          className={errors.lastName ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.lastName?.message}</div>
                      </FormGroup>
                      <FormGroup className="for-business-form-group">
                        <Label>*Phone Number</Label>
                        <Input
                          type="number"
                          placeholder="1234567890"
                          {...register("phoneNumber")}
                          className={errors.phoneNumber ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.phoneNumber?.message}</div>
                      </FormGroup>

                      <FormGroup className="for-business-form-group">
                        <Label>*Email Address</Label>
                        <Input
                          type="email"
                          placeholder="markanthony002@gmail.com"
                          {...register("email")}
                          className={errors.email ? "is-invalid" : ""}
                        />
                        <div className="error">{errors.email?.message}</div>
                      </FormGroup>




                  <div className="footerbox">
                     <Button variant="primary" type="submit" disabled={loading}>
                     {t('submitCaps')}
                    </Button>
                  </div>
                </Form>
              </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </Modal>

    </>
  );

}

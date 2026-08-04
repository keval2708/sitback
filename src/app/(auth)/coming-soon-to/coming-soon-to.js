"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { myHomePageSelectedCity, myHomePageSelectedDate, myHomePageSelectedService, serviceSliceSelector } from "@/redux/service";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Image,
  Input,
  Label,
  MainLayoutWrapper,
} from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, SpasNearLayoutWrapper, } from "@/styles/pages/comingsoon.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



export default function ComingSoonTo() {

  //hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //state
  const { selectedCity } = useSelector(serviceSliceSelector);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const { toaster } = useToaster();
  const [location, setLocation] = useState({ city: null, state: null, country: null});

  // Yup schema for validation
  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .required(t('reqEmail'))
      // .email("Enter valid email address")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, t('validEmailAddress')),
  });

  // Form management with react-hook-form
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    document.body.classList.add("background-white-layout");
    getProfileInfo();
    dispatch(myHomePageSelectedService(null))
    dispatch(myHomePageSelectedCity(null))
    dispatch(myHomePageSelectedDate(null))
  }, []);

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    setShowHeader(token !== "");
  };

  const onSubmitForm = async (formData) => {
    setLoading(true);
    try {
      let userInfo = '';
      if (selectedCity?.label) {
        userInfo = {
          country: selectedCity?.county,
          state: selectedCity?.state,
          city: selectedCity?.city,
          lat: selectedCity?.lat,
          log: selectedCity?.log,
          email: formData?.email,
        };
      } else if (location?.city) {
        userInfo = {
          country: location?.country,
          state: location?.state,
          city: location?.city,
          email: formData?.email,
        };
      }
    const res = await axiosApiCall.post(API_ROUTER?.NOTIFY_ME, userInfo);
    if (!res?.status) {
      setLoading(false);
      return toaster(res?.message, TOAST_TYPES.ERROR);
    } else {

      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      reset(); // Reset the form here after a successful submission
      setShow(false);
      setLoading(false);
    }


    } catch (error) {}
  };

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchCityAndState = async () => {
      if(!selectedCity?.label) {
        const { city, state, country } = await extractCityFromAddress(selectedCity);
        setLocation({
        city: city,
        state: state,
        country:country,
      });


      }
    };

    fetchCityAndState();
  }, [selectedCity]);

  const extractCityFromAddress = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if we have results
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        // console.log("addressComponents", addressComponents);

        // Find the city, state, and country in the address components
        const city = addressComponents.find(component =>
          component.types.includes("locality")
        )?.long_name;

        const state = addressComponents.find(component =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;

        const country = addressComponents.find(component =>
          component.types.includes("country")
        )?.long_name;

        // console.log("City:", city, "State:", state, "Country:", country);

        return { city, state, country }; // Return city, state, and country
      } else {
        return { city: null, state: null, country: null }; // No results found
      }
    } catch (error) {
      // console.error('Error fetching data from Google Maps API:', error);
      return { city: null, state: null, country: null }; // In case of an error
    }
  };






  return (
    <>
      <BlogHeader />
      <MainLayoutWrapper>
        <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div">
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
              {/* <p className="breadcrumb-text">Home  Services</p>
              <div className="banner-content-wrapper">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>Book The Best Spas With Sitback</h1>
                    <p>Unmatched Relaxation at Top Spas wherever you go.</p>
                  </Container>
                </div>
              </div> */}
            </div>
          </section>
        </ComingSoonLayoutWrapper>
        <SpasNearLayoutWrapper className="coming-soon-layout-wrapper sitback-coming-soon-updated-layout-wrapper">
          <Container>
            {selectedCity?.label ? <>
            <div className="coming-location-wrapper">
              {/* <h2>We are coming soon to</h2> */}
              <h2>{t("comingSoonText")}</h2>
              <p>{selectedCity?.label}</p>
              <Button className="notify-me-btn-wrapper" onClick={() => setShow(true)}>Notify me when available</Button>
              <div className="see-othercities">
                <span className="mapiconbox">
                  <Image alt="sitback" src="/images/map-pinicon.svg" />
                </span>
                <Link className="see-other-city-link" href={PATH_DASHBOARD?.seeOtherCities}>See Other Available Cities</Link>
              </div>
            </div>
            </> :
            <>
            <div className="coming-location-wrapper">
              <h2>{t("comingSoonText")}</h2>

              {location?.city ? <><p>{location?.city +', '+ location?.state }</p> <Button onClick={() => setShow(true)}>Notify me when available</Button></> : ''}

              <div className="see-othercities">
                <span className="mapiconbox">
                  <Image alt="sitback" src="/images/map-pinicon.svg" />
                </span>
                <Link href={PATH_DASHBOARD?.seeOtherCities}>See Other Available Cities</Link>
              </div>

            </div>

            </>}
          </Container>
        </SpasNearLayoutWrapper>
      </MainLayoutWrapper>
      <HomeFooter />
      {!showHeader && <BlogPath />}
      <Modal
        show={show}
        onHide={onClose}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-scheduler-modal-wrapper header-layout-change-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title id="example-modal-sizes-title-sm" className="notification-signup-title-text">
            Notification Signup
          </Modal.Title>
          <Link href="" className="logo-wrapper">
            <Image isContainImg alt="sitback" src="/images/scheduler-logo.svg" />
          </Link>
        </Modal.Header>
        <Modal.Body>
          <SchedulerModalLayoutWrapper>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">

              </FormGroup>

              <div className="yourself-guest-detail">
                {/* <h6>{t("you")}:</h6> */}

                <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                  <Label>{t("email")}</Label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="markanthony002@gmail.com"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-danger phone_input mt-1">{errors.email.message}</p>}
                </FormGroup>
              </div>

              <LoadingButton
                type="submit"
                disabled={loading}
                label="Send"
                loadinglabel="Send"
                isLoading={loading}
                className="loading-btn-wrapper"
              />
            </Form>
          </SchedulerModalLayoutWrapper>
        </Modal.Body>
      </Modal>
    </>
  );
}

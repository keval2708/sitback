"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container, Modal, Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import { Amenities } from "@/components/dashboards/profile-services/Amenities";
import { SpaProfileGallery } from "@/components/dashboards/profile-services/SpaProfileGallery";
import SpaProfileGoogleLocation from "@/components/dashboards/profile-services/SpaProfileGoogleLocation";
import { SpaProfileServices } from "@/components/dashboards/profile-services/SpaProfileServices";
import SpaReview from "@/components/dashboards/profile-services/SpaReview";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { handleProfileTab, messageCheckSliceSelector } from "@/redux/messageTab";
import { handleStep, manageSchedulerResponse } from "@/redux/quickBooking";
import { cmsSelectSpa } from "@/redux/scheduler";
import { mySelectedServiceList, mySelectedSlot } from "@/redux/service";
import { PATH_AUTH, PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, LoginTextTitle, } from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, SpaDetailUpdatedDiv, } from "@/styles/pages/comingsoon.style";
import { RankingStar_icon, } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
export default function Spas() {
  //state
  // const [loading, setLoading] = useState(false);

  const [linkSpa, setLink] = useState(null);
  const { t } = useTranslation();
  const params = useParams();
  const { toaster } = useToaster();
  const [spaDetails, setSpaDetails] = useState();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { isProfileTab } = useSelector(messageCheckSliceSelector);
  const [activeTab, setActiveTab] = useState(isProfileTab);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    address: null,
    lat: null,
    log: null,
  });

  // useEffect
  useEffect(() => {
    getSpaData();
  }, [params]);

  const getSpaData = async () => {
    let param = {
      slug: params?.slug,
    };
    try {
      // setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.SPA_DETAILSL, param);
      if (!res?.status) {
        push(PATH_AUTH?.spas);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data) {
          const spaData = res?.data?.data;
          setSpaDetails(spaData);

          setSelectedLocation({
            address: spaData?.location || null,
            lat: spaData?.lat?.toString() || null,
            log: spaData?.log?.toString() || null,
          });
        } else {
          setSpaDetails([]);
          //push(PATH_AUTH?.blog);
        }
      }
    } catch (error) {
      // setLoading(false);
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      // setTimeout(() => {
      //   // setLoading(false);
      // }, 100);
    }
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //hooks
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
     dispatch(handleProfileTab('first'));
    setActiveTab('first');
    getProfileInfo();
    dispatch(mySelectedSlot(null))
    dispatch(manageSchedulerResponse(null));
    dispatch(handleStep(1))
    document.body.classList.add("background-white-layout");
  }, []);

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    if (token == "") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  const handleChangeTab = (e) => {
    console.log("e",e);
    dispatch(handleProfileTab(e));
    setActiveTab(e);

    // Scroll to the 'tab-btn-div' and adjust for an offset
    const tabBtnDiv = document.getElementById('tab-btn-div');
    if (tabBtnDiv) {
      const offset = 30;
      const elementPosition = tabBtnDiv.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',  // For smooth scrolling
      });
    }
  };

  const generateIframe = useMemo(() => {
    dispatch(cmsSelectSpa(true));
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${spaDetails?.slug}`;
    setLink(link)
    return link; // Return only the link, not the entire anchor element
  }, [spaDetails]);

  const showBookingModel = () => {
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${spaDetails?.slug}`;
    window.location.href = link;
  }

  const showBookingModelWithService = (service) => {
    dispatch(mySelectedServiceList(
        {
            value:service?.id,
            label:service?.name,
            image:service?.image,
            price:service?.price,
            time: { hour:service?.hour, minute:service?.minutes },
            calculatedTime: `(${service?.hour * 60 +service?.minutes} min)`,
          }
      ));
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${spaDetails?.slug}`;
    window.location.href = link;
  }

  //console.log("spaDetails",spaDetails?.spaToken);

  return (
    <>
      <BlogHeader />
      <ComingSoonLayoutWrapper
        className={`sitback-revamp-banner-section sitback-medium-size-banner-div ${spaDetails?.video_file ? 'sitback-spa-detail-page-banner-section' : ''}`}>
              <section className="sitback-banner-updated-div">
          <div className="sitback-banner-image-div">
            <img
              // src="/images/landing-banner-image.webp"
              src={spaDetails?.image ? spaDetails?.image : ""}
              alt="Loading Video..."
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                zIndex: 2,
              }}
            />
            <p className="breadcrumb-text">Home  Services</p>

            { spaDetails?.video_file ? (
            <div className="banner-video-main-div">
              <div className="banner-left-content-div">
                <div className="banner-left-inner-div">
                  <h1>{spaDetails?.username}</h1>
                  <p>{spaDetails?.location}</p>
                  <h5 className="spa-rating-box-wrapper">
                    <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                    {spaDetails?.ratings} <span className="review-text">({spaDetails?.totalReviewCount} Reviews)</span>
                  </h5>
                </div>
              </div>
              <div className="banner-right-content-div">
                <div className="banner-video-div">
                  <div className="position-relative video-banner-wrapper">
                      {!isPlaying && (
                        <div
                          className="thumbnail-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                          style={{

                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 2,
                            cursor: 'pointer',
                          }}
                          onClick={() => setIsPlaying(true)}
                        >
                          <button className="btn btn-light">
                            <Image isContainImg alt="sitback" src="/images/play-icon.svg" />
                          </button>
                        </div>
                      )} *
                      <ReactPlayer
                        url={spaDetails?.video_file}
                        playing={isPlaying}
                        controls={true}
                        width="100%"
                        height="100%"
                        style={{ zIndex: 1 }}
                      />
                    </div>
                    {spaDetails?.features_service == 1 &&
                      <div className="video-below-detail">
                        {/* <p> Book Featured Service</p> */}
                        <Button className="book-featured-btn" onClick={() => { showBookingModelWithService(spaDetails?.service)}}>Book Featured Service</Button>
                      </div>
                    }
                </div>
              </div>
            </div>
            ) : ( <div className="banner-content-wrapper">
              <div className="banner-top-title-div">
                <Container>
                  <h1>{spaDetails?.username}</h1>
                  <p>{spaDetails?.location}</p>
                  <h5 className="spa-rating-box-wrapper">
                    <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                    {spaDetails?.ratings} <span className="review-text">({spaDetails?.totalReviewCount} Reviews)</span>
                  </h5>
                </Container>
              </div>
            </div>)
            }
          </div>
        </section>
      </ComingSoonLayoutWrapper>
      <SpaDetailUpdatedDiv>
        <div className="spa-detail-tab-main-div">
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeTab}
            onSelect={(e) => handleChangeTab(e)}
          >
            <div className="tab-btn-div" id="tab-btn-div">
              <Nav variant="pills" className="">
                <Nav.Item>
                  <Nav.Link eventKey="first">Services</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Amenities</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">{t("gallery")}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">{t("reviews")}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">{t("location")}</Nav.Link>
                </Nav.Item>
              </Nav>
              <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <SpaProfileServices slug={params?.slug} linkSpa={linkSpa}/>
              </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                <Amenities slug={params?.slug}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SpaProfileGallery slug={params?.slug} />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <SpaReview slug={params?.slug} />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <SpaProfileGoogleLocation location={selectedLocation} slug={params?.slug} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </SpaDetailUpdatedDiv>
      {/* <BlogLayoutWrapper> */}
        {/* {loading ? (
          <>
            <Loader loading={loading} />
          </>
        ) : (
          <Container>
            <Row>
              <Col md={5} lg={4} xl={3}>
                <LightyellowBoxWrapper>
                  <div className="user-profile-block spas-detail-box">

                    <div className="upload-profile-div">
                      <div className="profile-img">
                        <img
                          alt="sitback"
                          src={spaDetails?.image ? spaDetails?.image : ""}
                        />
                      </div>
                    </div>
                    <div className="user-profile-detail-wrapper">
                      <div>
                        <div>
                          <SubTitleText16>{spaDetails?.username}</SubTitleText16>
                          <div className="gmail-detail-wrapper">
                            <a className="mail-text-home" href="javascript:void(0)">
                              {spaDetails?.location}
                              <InlineSVG src={MapPinIcon} className="global_laguage_icon" />
                            </a>
                            <Link href="#" className="upgrade-text">
                                {t("manageMembership")}
                              </Link>
                          </div>
                          <h6>
                            {spaDetails?.ratings > 0 ?
                            <>
                              <StarRatings
                                rating={spaDetails?.ratings}
                                starRatedColor="#ffb811"
                                numberOfStars={5}
                                name='rating'
                              />
                              {spaDetails?.ratings}
                            </> : ''}
                          </h6>
                        </div>
                        <div className="edit-and-embed-code-wrapper">
                          {spaDetails?.spaToken && (
                            <LoadingButton
                              type="submit"
                              disabled={loading}
                              label={t("bookAppointmentText1")}
                              loadinglabel={`${t("bookAppointmentText1")}...`}
                              isLoading={loading}
                              onClick={() => { showBookingModel()}}
                              className="loading-btn-wrapper"
                            />
                          )}
                          {login?.spaToken && (
                              <Button isBorderBtn onClick={handleShow}>
                                {t("embeddedCode")}
                                <i>
                                  <img alt="sitback" src="/images/arrows-icons-v3.svg" />
                                </i>
                              </Button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </LightyellowBoxWrapper>
              </Col>
              <Col md={7} lg={8} xl={9}>
                <LightyellowBoxWrapper isSitBackSpaPageWrapper={true}>
                  <OurServicesTabWrapper style={{ boxShadow: 'none'}}>
                    <Tab.Container
                      id="left-tabs-example"
                      activeKey={activeTab}
                      onSelect={(e) => handleChangeTab(e)}
                    >
                      <Nav variant="pills" className="">
                        <Nav.Item>
                          <Nav.Link eventKey="first">Services</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="fifth">Amenities</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">{t("gallery")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">{t("reviews")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="fourth">{t("location")}</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <SpaProfileServices slug={params?.slug} linkSpa={linkSpa}/>
                        </Tab.Pane>
                         <Tab.Pane eventKey="fifth">
                          <Amenities slug={params?.slug}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <SpaProfileGallery slug={params?.slug} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <SpaReview slug={params?.slug} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          <SpaProfileGoogleLocation location={selectedLocation} />
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </OurServicesTabWrapper>
                </LightyellowBoxWrapper>
              </Col>
            </Row>
          </Container>
        )} */}
      {/* </BlogLayoutWrapper> */}
       <HomeFooter/>
      <BlogPath />
      {showHeader ? <></> : <BlogPath />}
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
    </>
  );
}

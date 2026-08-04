"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, Dropdown, Modal, Nav, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import SitbackLoader from "@/components/newdashboards/SitbackLoader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, handleLoginTab } from "@/redux/authCheck";
import { PATH_AUTH, PATH_DASHBOARD, PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button, Image,
} from "@/styles/global/main.style";
import { SitbackGetStartedWrapper } from "@/styles/pages/comingsoon.style";
import { SitbackGetStartedHeaderWrapper } from "@/styles/pages/header.style";
import { GetStartedImgFifth_icon, GetStartedImgFirst_icon, GetStartedImgFourth_icon, GetStartedImgSecond_icon, GetStartedImgSeventh_icon, GetStartedImgSixth_icon, GetStartedImgThird_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

const EXPLORE_TOP_TAB_ICONS = [
  "/images/explore-sitback-icon-1.svg",
  "/images/explore-sitback-icon-2.svg",
  "/images/explore-sitback-icon-3.svg",
  "/images/explore-sitback-icon-4.svg",
  "/images/explore-sitback-icon-5.svg",
];

const EXPLORE_INNER_HEADER_ICONS = [
  "/images/sitback-explore-tab-icon-1.svg",
  "/images/sitback-explore-tab-icon-2.svg",
  "/images/sitback-explore-tab-icon-3.svg",
  "/images/sitback-explore-tab-icon-4.svg",
  "/images/sitback-explore-tab-icon-5.svg",
];

/** Turn CMS `children` object into a stable array sorted by `id`. */
function sortContentChildren(childrenObj) {
  console.log("childrenObj", childrenObj);
  if (!childrenObj || typeof childrenObj !== "object") return [];
  return Object.entries(childrenObj)
    .map(([slug, node]) => (node && typeof node === "object" ? { slug, ...node } : null))
    .filter(Boolean)
    .sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
}

function pickLeafParts(leafChildren) {
  if (!leafChildren || typeof leafChildren !== "object") {
    return {
      mainTitle: "",
      mainDescription: "",
      goToButton: null,
      mainVideo: null,
    };
  }
  return {
    mainTitle: leafChildren.MAIN_TITLE?.title ?? "",
    mainDescription: leafChildren.MAIN_DESCRIPTION?.title ?? "",
    goToButton: leafChildren.GO_TO_BUTTON ?? null,
    mainVideo: leafChildren.MAIN_VIDEO ?? null,
  };
}

/** CMS may expose any of these on MAIN_VIDEO for the idle thumbnail. */
function pickVideoPosterUrl(mainVideo) {
  console.log("mainVideo", mainVideo);
  if (!mainVideo || typeof mainVideo !== "object") return undefined;
  const raw =
    mainVideo?.videoThumbnail;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed || undefined;
}

function ExploreItemContent({ parts }) {

  const router = useRouter();
  const videoRef = useRef(null);
  const [showCenterPlay, setShowCenterPlay] = useState(true);
  const { mainTitle, mainDescription, goToButton, mainVideo } = parts;
  const videoSrc = mainVideo?.videoUrl || null;
  const posterUrl = useMemo(() => pickVideoPosterUrl(mainVideo), [mainVideo]);
  const ctaHref = goToButton?.referenceUrl || null;
  const ctaEnabled = goToButton?.title && Number(goToButton?.isUrlSet) === 1 && Boolean(ctaHref);
  console.log("posterUrl", posterUrl);
  const isExternalCta = ctaHref && /^https?:\/\//i.test(ctaHref);

  const handleCtaClick = () => {
    if (!ctaEnabled || !ctaHref) return;
    if (isExternalCta) {
      window.open(ctaHref, "_blank", "noopener,noreferrer");
    } else {
      router.push(ctaHref);
    }
  };

  useEffect(() => {
    setShowCenterPlay(true);
  }, [videoSrc, posterUrl]);

  useEffect(() => {
    const stopVideoOnHidden = () => {
      if (document.visibilityState !== "visible" && videoRef.current) {
        videoRef.current.pause();
      }
    };
    document.addEventListener("visibilitychange", stopVideoOnHidden);
    return () => document.removeEventListener("visibilitychange", stopVideoOnHidden);
  }, []);

  const handleCenterPlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => { });
  };

  const renderCta = () => {
    if (!goToButton?.title) return null;
    if (!ctaEnabled) {
      return <button type="button">{goToButton.title}</button>;
    }
    return (
      <button type="button" onClick={handleCtaClick}>
        {goToButton.title}
      </button>
    );
  };

  return (
    <div className="explore-inner-tab-content-div">
      <div className="explore-video-text-div">
        {mainTitle ? <h5>{mainTitle}</h5> : null}
        <p>{mainDescription ? mainDescription : ''}</p>
        {renderCta()}
      </div>
      <div className="sitback-explore-video-div">
        {videoSrc ? (
          <div className="sitback-explore-video-wrap">
            <video
              ref={videoRef}
              poster={posterUrl}
              controls={!showCenterPlay}
              playsInline
              width="100%"
              preload="metadata"
              onPlay={() => setShowCenterPlay(false)}
              onEnded={() => setShowCenterPlay(true)}
            >
              <source src={videoSrc} />
            </video>
            {showCenterPlay ? (
              <button
                type="button"
                className={`sitback-explore-video-play-overlay${posterUrl ? " has-poster" : ""}`}
                aria-label="Play video"
                onClick={handleCenterPlay}
              >
                {/* <span className="sitback-explore-play-btn-circle" aria-hidden>
                  <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
                    <path fill="#FFFFFF" d="M8 5.14v13.72L19.26 12 8 5.14z" />
                  </svg>
                </span> */}
                <i>
                  <Image src="/images/sitback-play-icon.svg" isContainImg={true} alt="Logo" />
                </i>
              </button>
            ) : null}
          </div>
        ) : (
          <button type="button">
            <i>
              <Image src="/images/sitback-play-icon.svg" isContainImg={true} alt="" />
            </i>
          </button>
        )}
      </div>
    </div>
  );
}

function GetStartedExploreSection({ section, iconIndex }) {
  const items = useMemo(() => sortContentChildren(section?.children), [section]);
  const defaultKey = items[0]?.slug ?? "item";
  const headerIcon =
    EXPLORE_INNER_HEADER_ICONS[iconIndex] ?? EXPLORE_INNER_HEADER_ICONS[0];

  if (items.length === 0) {
    return (
      <div className="sitback-get-explore-tab-content-div">
        <p className="px-3 py-4">No topics available for this section yet.</p>
      </div>
    );
  }

  return (
    <div className="sitback-get-explore-tab-content-div">
      <Tab.Container id={`get-started-inner-${section.slug}`} defaultActiveKey={defaultKey} transition={false}>
        <Row>
          <Col md={4}>
            <Nav variant="pills" className="flex-column">
              <div className="nav-title-wrapper">
                <h5>
                  <i>
                    <Image src={headerIcon} isContainImg={true} alt="" />
                  </i>
                  {section.title}
                </h5>
              </div>
              {items.map((item) => (
                <Nav.Item key={item.slug}>
                  <Nav.Link eventKey={item.slug}>{item.title}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              {items.map((item) => (
                <Tab.Pane key={item.slug} eventKey={item.slug} mountOnEnter unmountOnExit transition={false}>
                  <ExploreItemContent parts={pickLeafParts(item.children)} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default function ProfileServices() {

  const { toaster } = useToaster();
  const { login } = useSelector(authCheckSliceSelector);
  const dispatch = useDispatch();

  const menuOpen = false;
  const [showMenu, setShowMenu] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [conformBtnLoading, setConformBtnLoading] = useState(false);
  const [contentData, setContentData] = useState(null);
  const { push } = useRouter();
  // console.log("login", login);


  // Effect to fetch content when component mounts
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axiosApiCall.get(`${API_ROUTER?.GET_CONTENT}?slug=GET_STARTED`);
        console.log("response", response);

        if (!response?.status) {
          toaster(response?.message, TOAST_TYPES.ERROR);
        }
        setContentData(response?.data?.data?.GET_STARTED);
        // setError(null);
      } catch (err) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id, employeeType: login?.employeeType });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie('token');
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            dispatch(handleLoginTab('first'));
            // window.location.reload();
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

  const handleMenuShow = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  const handleReadyModalShow = (event) => {
    event?.preventDefault();
    setShowMenu(false);
    setShowGetStartedModal(true);
  };

  const handleReadyModalClose = () => {
    setShowGetStartedModal(false);
  };

  // Add this function before the return statement in your ProfileServices component
  const handleRemoveDemoData = async () => {
    try {
      setConformBtnLoading(true);

      const payload = {
        isAppJourneyVisited: 1
      };

      const response = await axiosApiCall.post(API_ROUTER.UPDATE_SERVICE, payload);

      if (response?.status) {
        toaster(response?.data?.message, TOAST_TYPES.SUCCESS);
        handleReadyModalClose();
        push(PATH_DASHBOARD?.serviceProvider);
      } else {
        toaster(response?.message || "Failed to update status", TOAST_TYPES.ERROR);
      }
    } catch (err) {
      console.error("Error updating service:", err);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setConformBtnLoading(false);
    }
  };

  const topSections = useMemo(() => sortContentChildren(contentData), [contentData]);
  const defaultMainTabKey = topSections[0]?.slug ?? "get-started-tab";

  console.log("login", login);

  return (
    <SitbackGetStartedWrapper>
      <SitbackGetStartedHeaderWrapper>
        <Container fluid>
          <div className="sitback-get-started-header">
            <div className="sitback-get-started-header-left">
              <Link href="/" className="header-logo-wrapper">
                <Image src="/images/sitback-white-logo-updated.svg" isContainImg={true} alt="Logo" />
              </Link>
              <button
                className="mobile-menu-toggle"
                // onClick={() => setMenuOpen(!menuOpen)}
                onClick={handleMenuShow}
              >
                <Image src="/images/menu-toggle-white-icon.svg" isContainImg={true} alt="Logo" />
              </button>
              <div className={`sitback-menu-link-wrapper ${menuOpen ? "open" : ""}`}>
                <Link href={PATH_DASHBOARD?.getStarted} className="nav-link active">
                  <i>
                    <Image src="/images/header-menu-image-1.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Get Started
                </Link>
                <Link href={PATH_DASHBOARD?.serviceProvider} className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-2.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Home
                </Link>
                <Link href={PATH_DASHBOARD?.appointments} className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-3.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Appointments
                </Link>
                <Link href={PATH_DASHBOARD?.selectProfile} className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-4.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Profile
                </Link>
                <Link href={PATH_DASHBOARD?.insights} className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-5.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Insights
                </Link>
                <Link href={PATH_POS?.pos} className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-6.svg" isContainImg={true} alt="Logo" />
                  </i>
                  POS
                </Link>
                <Link href="#" className="nav-link">
                  <i>
                    <Image src="/images/header-menu-image-7.svg" isContainImg={true} alt="Logo" />
                  </i>
                  Apps
                </Link>
              </div>
            </div>
            <div className="sitback-get-started-header-right">
              <Link href="#" className="sitback-get-started-header-right-link">
                <Image src="/images/phone-sitback-icon.svg" isContainImg={true} alt="Logo" />
              </Link>
              <Link href={PATH_DASHBOARD?.notification} className="sitback-get-started-header-right-link">
                <Image src="/images/sitback-msg-icon.svg" isContainImg={true} alt="Logo" />
              </Link>
              <div className="sitback-profile-dropdown-div">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <i>
                      {/* <Image src="/images/profile-dropdown-icon.svg" isContainImg={true} alt="Logo" /> */}
                      <Image
                        isContainImg={true}
                        alt="sitback"
                        src={login?.image || "/images/profile-img.png"}
                        radius={50}
                        onError={(e) => {
                          e.target.src = "/images/profile-img.png"; // some replacement image
                        }}
                      />
                    </i>
                    <div className="sitback-profile-dropdown-div-text">
                      <h6>{login?.spaOwnerName || ""}</h6>
                      {/* <p>Cup of T.LLC</p> */}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        leave_room();
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </Container>
      </SitbackGetStartedHeaderWrapper>
      <div className="sitback-get-started-inner-div">
        <Container>
          <div className="sitback-get-started-inner-div-wrapper">
            <div className="sitback-get-left-div">
              <div className="sitback-welcome-div">
                <div className="clearfix">
                  <div className="sitback-welcome-video-div">
                    <button>
                      <i>
                        <Image src="/images/sitback-play-icon.svg" isContainImg={true} alt="Logo" />
                      </i>
                    </button>
                  </div>
                </div>
                <div className="sitback-welcome-text-div">
                  <h3>Welcome to Sitback Playground! 👋 </h3>
                  <p>Explore Sitback with sample data and see how easy it is to manage spa bookings, clients, and services. When you&apos;re ready, exit playground mode to start setting up your real business.</p>
                </div>
              </div>
              <div className="sitback-get-explore-div">
                <h4>Explore our features</h4>
                <div className="sitback-get-explore-tab-wrapper">
                  {loading ? (
                    <>
                      <SitbackLoader loading={loading} color="text-primary-emphasis" />
                    </>
                  ) : topSections.length === 0 ? (
                    <p className="px-2 py-3">Explore content is not available yet.</p>
                  ) : (
                    <Tabs
                      defaultActiveKey={defaultMainTabKey}
                      id="get-started-explore-tabs"
                      className="mb-3"
                      mountOnEnter
                      unmountOnExit
                      transition={false}
                    >
                      {topSections.map((section, index) => {
                        const topIcon =
                          EXPLORE_TOP_TAB_ICONS[index] ?? EXPLORE_TOP_TAB_ICONS[EXPLORE_TOP_TAB_ICONS.length - 1];
                        return (
                          <Tab
                            key={section.slug}
                            eventKey={section.slug}
                            title={
                              <div className="nav-title-div">
                                <div className="clearfix">
                                  <i>
                                    <Image src={topIcon} isContainImg={true} alt="" />
                                  </i>
                                </div>
                                <p>{section.title}</p>
                              </div>
                            }
                          >
                            <GetStartedExploreSection section={section} iconIndex={index} />
                          </Tab>
                        );
                      })}
                    </Tabs>
                  )}
                </div>
              </div>
            </div>
            <div className="sitback-get-right-div">
              <div className="sitback-get-right-top-div">
                <div className="sitback-get-profile-div">
                  <div className="sitback-get-left-profile">
                    <div className="clearfix">
                      <div className="sitback-profile-div">
                        <Image src="/images/profile-dropdown-icon.svg" isContainImg={true} alt="Logo" />
                      </div>
                    </div>
                    <div className="profile-content-div">
                      <h6>Elon Gated</h6>
                      <p>Onboarding manager</p>
                    </div>
                  </div>
                  <div className="sitback-get-right-profile">
                    <button>Schedule a Call</button>
                  </div>
                </div>
                <div className="sitback-helpful-div">
                  <h5 className="sitback-helpful-title">Helpful resources</h5>
                  <div className="sitback-helpful-content-div">
                    <div className="sitback-boxes-wrapper">
                      <div className="sitback-inner-box-div">
                        <div className="sitback-box-icon-div">
                          <Image src="/images/helpful-resource-img-1.svg" isContainImg={true} alt="Logo" />
                        </div>
                        <div className="sitback-box-text-div">
                          <p>Chat with a human</p>
                        </div>
                      </div>
                    </div>
                    <div className="sitback-boxes-wrapper">
                      <div className="sitback-inner-box-div">
                        <div className="sitback-box-icon-div">
                          <Image src="/images/helpful-resource-img-2.svg" isContainImg={true} alt="Logo" />
                        </div>
                        <div className="sitback-box-text-div">
                          <p>Learning Center</p>
                        </div>
                      </div>
                    </div>
                    <div className="sitback-boxes-wrapper">
                      <div className="sitback-inner-box-div">
                        <div className="sitback-box-icon-div">
                          <Image src="/images/helpful-resource-img-3.svg" isContainImg={true} alt="Logo" />
                        </div>
                        <div className="sitback-box-text-div">
                          <p>Video How-To’s</p>
                        </div>
                      </div>
                    </div>
                    <div className="sitback-boxes-wrapper">
                      <div className="sitback-inner-box-div">
                        <div className="sitback-box-icon-div">
                          <Image src="/images/helpful-resource-img-4.svg" isContainImg={true} alt="Logo" />
                        </div>
                        <div className="sitback-box-text-div">
                          <p>Pep Talk</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sitback-get-right-bottom-div">
                <div className="sitback-title-right-top-div">
                  <h5>⚡Personalize Your Experience</h5>
                  <p>Make your account truly yours with settings and preferences.</p>
                </div>
                <div className="personalize-img-div">
                  <Image src="/images/personalize-experience-img.png" isContainImg={true} alt="Logo" />
                  {login?.isAppJourneyVisited != true && (
                    <button onClick={handleReadyModalShow}>I am Ready</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Offcanvas show={showMenu} onHide={handleMenuClose} className="get-started-menu-div">
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sitback-menu-wrapper">
            <Link href={PATH_DASHBOARD?.getStarted} className="nav-link active">
              {/* <i>
                  <Image src="/images/header-menu-image-1.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgFirst_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Get Started
            </Link>
            <Link href={PATH_DASHBOARD?.serviceProvider} className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-2.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgSecond_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Home
            </Link>
            <Link href={PATH_DASHBOARD?.appointments} className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-3.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgThird_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Appointments
            </Link>
            <Link href={PATH_DASHBOARD?.selectProfile} className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-4.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgFourth_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Profile
            </Link>
            <Link href={PATH_DASHBOARD?.insights} className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-5.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgFifth_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Insights
            </Link>
            <Link href={PATH_POS?.pos} className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-6.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgSixth_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              POS
            </Link>
            <Link href="#" className="nav-link">
              {/* <i>
                  <Image src="/images/header-menu-image-7.svg" isContainImg={true} alt="Logo" />
                </i> */}
              <InlineSVG
                src={GetStartedImgSeventh_icon}
                data-tooltip-id="my-tooltip-1"
                className="global_laguage_icon"
              />
              Apps
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        show={showGetStartedModal}
        onHide={handleReadyModalClose}
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper sitback-get-started-modal-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title>What Happens Next?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sitback-get-started-modal-body-wrapper">
            <Row>
              <Col md={4}>
                <div className="happens-box-wrapper">
                  <div className="happens-box-img-div">
                    {/* <Image src="/images/get-started-modal-img-1.svg" isContainImg={true} alt="Logo" /> */}
                  </div>
                  <p>Exit Playground Mode and Remove Demo Data</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="happens-box-wrapper active-box">
                  <div className="happens-box-img-div">
                    {/* <Image src="/images/get-started-modal-img-1.svg" isContainImg={true} alt="Logo" /> */}
                  </div>
                  <p>Get an Easy-To-Follow Set Up Guide</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="happens-box-wrapper">
                  <div className="happens-box-img-div">
                    {/* <Image src="/images/get-started-modal-img-1.svg" isContainImg={true} alt="Logo" /> */}
                  </div>
                  <p>Connect with a Dedicated Onboarding Specialist</p>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleRemoveDemoData}
            disabled={conformBtnLoading}
          >
            {conformBtnLoading ? "Processing..." : "Remove Demo Data and Get Started"}
          </Button>
        </Modal.Footer>
      </Modal>
    </SitbackGetStartedWrapper>
  );
}

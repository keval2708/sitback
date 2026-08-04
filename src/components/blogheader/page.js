"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Dropdown,} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, handleLoginTab } from "@/redux/authCheck";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image } from "@/styles/global/main.style";
import { BlogHeaderWrapper } from "@/styles/pages/header.style";
import { DropdownItemRightIcon_icon, HeaderMenu_icon, } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getCookie, removeCookie } from "@/utils/cookie";

export default function BlogHeader() {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { login } = useSelector(authCheckSliceSelector);
  const pathname = usePathname();
  const firstSegment = `/${pathname.split('/')[1]}`;

  const [showHeader, setShowHeader] = useState(false);
  const [isSetBodyClass, setBodyClass] = useState(true);

  const idParam = searchParams.get("id");

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    setShowHeader(!!token);
  };

  const handleRedirectLogin = (key) => {
    dispatch(handleLoginTab(key));
    push(PATH_AUTH?.signIn);
  };

  const handleRedirect = () => {
    push(PATH_AUTH?.forBusinesses);
  };

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res;
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie("token");
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            dispatch(handleLoginTab("first"));
            return res;
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleClick = (value) => {
    if (value) {
      document.querySelector('body').classList.add('toggleHeaderMenuOpen');
      setBodyClass(false);
    } else {
      document.querySelector('body').classList.remove('toggleHeaderMenuOpen');
      setBodyClass(true);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('sitback-menu-body-class');
    } else {
      document.body.classList.remove('sitback-menu-body-class');
    }

    // Optional cleanup (useful if component unmounts)
    return () => {
      document.body.classList.remove('sitback-menu-body-class');
    };
  }, [isVisible]);

  return (
    <BlogHeaderWrapper className={`home-page-headerwrapper home-page-updated-header-wrapper ${isVisible ? 'sitback-mobile-menu-header-wrapper' : ''}`}>
      {/* <Navbar expand="md" className="">
        <Container>
          <div>
            <Navbar.Brand href="/" className="sitback-logo-wrapper sitback-mobile-view-logo-wrapper">
              <Image isContainImg={true} alt="sitback" src="/images/sitback-v3.svg" />
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={() => handleClick(isSetBodyClass)} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              {showHeader ? null : (
                <>
                  <Link href="/" className={firstSegment === "/" ? "active" : ""}>
                    Home
                  </Link>
                </>
              )}
              <Link href={PATH_AUTH?.spas} className={(firstSegment === "/spas" && !idParam ) || (firstSegment === "/see-other-cities" || firstSegment === "/coming-soon-to" ) ? "active" : ""}>
                Spas
              </Link>
              <Link
                href={PATH_AUTH?.services}
                className={idParam ? "active" : firstSegment === "/services" ? "active" : ""}
              >
                Services
              </Link>
              <Link href={PATH_AUTH?.howItWork} className={firstSegment === "/how-it-work" ? "active" : ""}>
                How To
              </Link>
              <Link href={PATH_AUTH?.blog} className={firstSegment === "/blog" ? "active" : ""}>
                Blogs
              </Link>
               <Link href={PATH_AUTH?.forBusinesses} className={firstSegment === "/for-businesses" ? "active" : ""}>
                For Businesses
              </Link>
            </Nav>
            <div className="logout-and-profile">
              {showHeader ? (
                <Dropdown className="user-profile-div">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <Image
                      alt="sitback"
                      src={login?.image || "/images/profile-img.png"}
                      radius={50}
                      onError={(e) => {
                        e.target.src = "/images/profile-img.png";
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={leave_room}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button className="font-weight-seven-hundred" onClick={() => handleRedirect("first")}>{t("comingSoonTextLogin")}</Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="sitback-header-div">
        <Container className="home-page-header-container-wrapper">
          <div className="sitback-header-inner-div">
            <div>
              <Dropdown className="header-menu-dropdown desktop-view-menu-wrapper">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <InlineSVG src={HeaderMenu_icon} className="global_laguage_icon" />
                  Menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as="button">
                    <Link href="/" className={pathname === "/" ? "active" : ""}>
                      Home
                      <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                    </Link>

                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    <Link href={PATH_AUTH?.spas} className={(firstSegment === "/spas" && !idParam ) || (firstSegment === "/see-other-cities" || firstSegment === "/coming-soon-to" ) ? "active" : ""}>
                      Spas
                      <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                      <Link
                        href={PATH_AUTH?.services}
                        className={idParam ? "active" : firstSegment === "/services" ? "active" : ""}
                      >
                        Services
                        <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                      </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    <Link href={PATH_AUTH?.howItWork} className={firstSegment === "/how-it-work" ? "active" : ""}>
                      How To
                      <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    <Link href={PATH_AUTH?.blog} className={firstSegment === "/blog" ? "active" : ""}>
                      Blogs
                      <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="mobile-menu-btn-wrapper" onClick={toggleDiv}>
                <InlineSVG src={HeaderMenu_icon} className="global_laguage_icon" />
                {isVisible ? 'Back' : 'Menu'}
              </Button>
            </div>
            <Link href="/" className="header-logo-wrapper">
              <Image isContainImg={true} alt="sitback" src="/images/sitback-white-logo.svg" />
            </Link>
            <div className="header-login-btn">
              <Button className="business-btn" onClick={() => handleRedirect()}>For Business</Button>
              <Button className="login-btn" onClick={() => handleRedirectLogin("first")}>{t("comingSoonTextLogin")}</Button>
            </div>
            {isVisible && (
              <div className="header-mobile-menu-div">
                <div className="header-mobile-menu-inner-div">
                  <div className="">
                      <ul>
                        <li>
                          <Link href="/" className={pathname === "/" ? "active" : ""}>
                            Home
                            <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                          </Link>

                        </li>
                        <li>
                          <Link href={PATH_AUTH?.spas} className={(firstSegment === "/spas" && !idParam ) || (firstSegment === "/see-other-cities" || firstSegment === "/coming-soon-to" ) ? "active" : ""}>
                            Spas
                            <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                          </Link>
                        </li>
                        <li>
                            <Link
                              href={PATH_AUTH?.services}
                              className={idParam ? "active" : firstSegment === "/services" ? "active" : ""}
                            >
                              Services
                              <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                            </Link>
                        </li>
                        <li>
                          <Link href={PATH_AUTH?.howItWork} className={firstSegment === "/how-it-work" ? "active" : ""}>
                            How To
                            <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                          </Link>
                        </li>
                        <li>
                          <Link href={PATH_AUTH?.blog} className={firstSegment === "/blog" ? "active" : ""}>
                            Blogs
                            <InlineSVG src={DropdownItemRightIcon_icon} className="global_laguage_icon" />
                          </Link>
                        </li>
                      </ul>
                  </div>
                  <div className="header-mobile-btn-div">
                    <Button className="for-business-btn" onClick={() => handleRedirect()}>For Business</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </BlogHeaderWrapper>
  );
}

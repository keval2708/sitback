"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Dropdown, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, handleLoginTab, loginDetail } from "@/redux/authCheck";
import { messageCheckSliceSelector } from "@/redux/messageTab";
import { PATH_AUTH, PATH_DASHBOARD, PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";

import { Image } from "@/styles/global/main.style";
import { SitbackGetStartedHeaderWrapper } from "@/styles/pages/header.style";
import { GetStartedImgFifth_icon, GetStartedImgFirst_icon, GetStartedImgFourth_icon, GetStartedImgSecond_icon, GetStartedImgSeventh_icon, GetStartedImgSixth_icon, GetStartedImgThird_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function HeaderBar() {

  // Hooks
  const { push } = useRouter();
  const pathname = usePathname(); // Add this to get current path
  const { login } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();
  const { isBlock, isSubscribe } = useSelector(messageCheckSliceSelector);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [posRedirect, setPosRedirect] = useState(0);

  const menuOpen = false;
  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!isBlock && isSubscribe == 1 && login?.spa_type != "onlydashboard") {
      setShow(true);
    }
  }

  // Helper function to check if a path is active
  const isActivePath = (item) => {
    if (!pathname) return false;

    // Check if the current route is a profile-related route
    if (item.label === "Profile") {
      return (
        pathname.startsWith("/select-profile") ||
        pathname.startsWith("/profile-services") ||
        pathname.startsWith("/therapists-profile")
      );
    }

    const path = item.href;

    // Exact match for home/dashboard
    if (path === PATH_DASHBOARD?.serviceProvider) {
      return pathname === path;
    }

    // For other routes, check if current path starts with the route path
    // This handles nested routes like /appointments/123
    return pathname.startsWith(path);
  };

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

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res
      } else {
        setPosRedirect(res?.data?.postproductlength)
        dispatch(loginDetail(res?.data?.data));
        if (res?.data?.data.isBlocked) {
          //dispatch(handleBlock(res?.data?.data.isBlocked));
          // push(PATH_DASHBOARD?.serviceProvider);
        }
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    getProfileInfo()
  }, []);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg.action == "new_booking_from_user" || msg.action == "new_booking_from_spa") {
          getProfileInfo();
        }
      });
    }
  }, [window.io]);

  const handleMenuShow = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  // Define navigation items for cleaner code
  const navItems = [
    { href: PATH_DASHBOARD?.getStarted, label: "Get Started", icon: GetStartedImgFirst_icon, imgSrc: "/images/header-menu-image-1.svg" },
    { href: PATH_DASHBOARD?.serviceProvider, label: "Home", icon: GetStartedImgSecond_icon, imgSrc: "/images/header-menu-image-2.svg" },
    { href: PATH_DASHBOARD?.appointments, label: "Appointments", icon: GetStartedImgThird_icon, imgSrc: "/images/header-menu-image-3.svg" },
    { href: PATH_DASHBOARD?.selectProfile, label: "Profile", icon: GetStartedImgFourth_icon, imgSrc: "/images/header-menu-image-4.svg" },
    { href: PATH_DASHBOARD?.insights, label: "Insights", icon: GetStartedImgFifth_icon, imgSrc: "/images/header-menu-image-5.svg" },
    { href: PATH_POS?.pos, label: "POS", icon: GetStartedImgSixth_icon, imgSrc: "/images/header-menu-image-6.svg" },
    { href: PATH_DASHBOARD?.apps, label: "Apps", icon: GetStartedImgSeventh_icon, imgSrc: "/images/header-menu-image-7.svg" },
  ];

  // console.log("login", login);

  return (
    <>
      <SitbackGetStartedHeaderWrapper>
        <Container fluid>
          <div className="sitback-get-started-header">
            <div className="sitback-get-started-header-left">
              <Link href={PATH_DASHBOARD?.serviceProvider} className="header-logo-wrapper">
                <Image src="/images/sitback-white-logo-updated.svg" isContainImg={true} alt="Logo" />
              </Link>
              <button
                className="mobile-menu-toggle"
                onClick={handleMenuShow}
              >
                <Image src="/images/menu-toggle-white-icon.svg" isContainImg={true} alt="Logo" />
              </button>
              {(!isBlock && isSubscribe == 1 && login?.spa_type != "onlydashboard") && (
                <div className={`sitback-menu-link-wrapper ${menuOpen ? "open" : ""}`}>
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`nav-link ${isActivePath(item) ? "active" : ""}`}
                    >
                      <i>
                        <Image src={item.imgSrc} isContainImg={true} alt={item.label} />
                      </i>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="sitback-get-started-header-right">
              {(!isBlock && isSubscribe == 1 && login?.spa_type != "onlydashboard") && (
                <>
                  <Link href="#" className="sitback-get-started-header-right-link">
                    <Image src="/images/phone-sitback-icon.svg" isContainImg={true} alt="Logo" />
                  </Link>
                  <Link href={PATH_DASHBOARD?.notification} className="sitback-get-started-header-right-link">
                    <Image src="/images/sitback-msg-icon.svg" isContainImg={true} alt="Logo" />
                  </Link>
                </>
              )}
              <div className="sitback-profile-dropdown-div">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <i>
                      <Image
                        isContainImg={true}
                        alt="sitback"
                        src={login?.image || "/images/profile-img.png"}
                        radius={50}
                        onError={(e) => {
                          e.target.src = "/images/profile-img.png";
                        }}
                      />
                    </i>
                    <div className="sitback-profile-dropdown-div-text">
                      <h6>{login?.spaOwnerName || ""}</h6>
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
      <Offcanvas show={showMenu} onHide={handleMenuClose} className="get-started-menu-div">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="sitback-menu-wrapper">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`nav-link ${isActivePath(item) ? "active" : ""}`}
                onClick={handleMenuClose}
              >
                <InlineSVG
                  src={item.icon}
                  data-tooltip-id="my-tooltip-1"
                  className="global_laguage_icon"
                />
                {item.label}
              </Link>
            ))}
          </div>


        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

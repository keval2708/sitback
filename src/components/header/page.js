"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Dropdown, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MainMenu } from "@/components/dashboards/MainMenu";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, handleLoginTab, loginDetail } from "@/redux/authCheck";
import { messageCheckSliceSelector } from "@/redux/messageTab";
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Image,
} from '@/styles/global/main.style';
import {
  HeaderBarWrapper,
} from '@/styles/pages/header.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function HeaderBar() {

  // Hooks
  const { push } = useRouter();
  const { login } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();
  const { isBlock, isSubscribe } = useSelector(messageCheckSliceSelector);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [posRedirect, setPosRedirect] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!isBlock && isSubscribe == 1 && login?.spa_type != "onlydashboard") {
      setShow(true);
    }
  }
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

  return (
    <>
      <HeaderBarWrapper className="sitback-updated-v2-header-div">
        <Container>
          <div className="sitback-header-wrapper">

            <div className="menu-icon-wrapper" onClick={handleShow}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 37">
                <path fill="#295086" fillRule="evenodd" d="M2.942 0v.034a2.639 2.639 0 0 0 0 5.275h10.107c1.458 0 2.641-1.184 2.641-2.675A2.64 2.64 0 0 0 13.05 0H2.941Zm26.51 20.593H2.942a2.639 2.639 0 0 1 0-5.278h26.51a2.644 2.644 0 0 1 2.638 2.64 2.64 2.64 0 0 1-2.638 2.638Zm0 15.453H2.942c-1.015.136-1.995-.372-2.536-1.217-.541-.88-.541-1.995 0-2.84a2.652 2.652 0 0 1 2.536-1.252h26.51c1.35.136 2.368 1.285 2.368 2.672 0 1.349-1.018 2.502-2.367 2.637Z" clipRule="evenodd" />
              </svg> */}
              <img src="/images/toggle-white-menu-icon.svg" alt="toggle-white-menu-icon" />
            </div>
            {isSubscribe == 0 || isSubscribe == 3 ?
              (<Link href={PATH_DASHBOARD?.subscriptions} className="sitback-logo-wrapper">
                <img alt="sitback" src="/images/sitback-updated-logo-with-text.svg" />
              </Link>) :
              (!isBlock ?
                <Link href={PATH_DASHBOARD?.profileService} className="sitback-logo-wrapper">
                  <img alt="sitback" src="/images/sitback-updated-logo-with-text.svg" />
                </Link>
                :
                <Link href={""} className="sitback-logo-wrapper">
                  <img alt="sitback" src="/images/sitback-updated-logo-with-text.svg" />
                </Link>)
            }
            <div className="user-profile-and-notification">
              {/* <div className="notification-modal-wrapper">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {login?.notificationcount > 0 ?
                    <span className="active-dost "></span> :
                    <></>
                  }
                  <InlineSVG
                    src={notification_icon}
                    className="global_laguage_icon"
                    onClick={() => {
                      if (!isBlock && isSubscribe == 1) {
                        push(PATH_DASHBOARD?.notification);
                      }
                    }}
                  />
                </Dropdown.Toggle>
              </div> */}

              <Dropdown className="user-profile-div">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <Image
                    alt="sitback"
                    src={login?.image || "/images/profile-img.png"}
                    radius={50}
                    onError={(e) => {
                      e.target.src = "/images/profile-img.png"; // some replacement image
                    }}
                  />
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
        </Container>
      </HeaderBarWrapper>
      <Offcanvas show={show} onHide={handleClose} className="sidebar-menu-wrapper">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MainMenu posRedirect={posRedirect} close={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

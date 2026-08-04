"use client";

import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Dropdown, Form, Offcanvas, } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import { MainMenu } from "@/components/dashboards/MainMenu";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail, setdeviceTokens } from "@/redux/authCheck";
import { handleProfileTab, messageCheckSliceSelector } from "@/redux/messageTab";
import { myHeadDateRange, mySpaHeadSelectedDate, mySpaHeadSelectedEndDate, mySpaHeadSelectedStartDate, mySpaHeadSelectedType, mySpaHeadStatusSearch, mySpaHeadTextSearch, serviceSliceSelector } from "@/redux/service";
import { NEW_DASHBOARD_PATH, PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HeaderBarWrapper,
} from '@/styles/pages/header.style';
import { Calendar_icon, notification_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";

export default function DashBoardHeader() {

  // Hooks
  const { t } = useTranslation();
  const { isBlock, isSubscribe } = useSelector(messageCheckSliceSelector);
  const { push } = useRouter();
  const { login,deviceTokens } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();
  const {dactiveTab } = useSelector(messageCheckSliceSelector);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState();
  const pathname = usePathname(); // Correct way to get pathname in Next.js 13
  const {spaHeadSelectedDate} = useSelector(serviceSliceSelector)
  const {spaHeadTextSearch} = useSelector(serviceSliceSelector)
  const {spaHeadStatusSearch} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedType} = useSelector(serviceSliceSelector)
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [show, setShow] = useState(false);
  const [posRedirect, setPosRedirect] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [statusText, setStatusText] = useState({ value: "All", label: "All" });
  const [dateRanges, setDateRanges] = useState([]);
  const [customStartDate, customEndDate] = dateRanges;
  const [userPermissions, setUserPermission] = useState([]);

  // Handle the change in the search input field
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    dispatch(mySpaHeadTextSearch(e.target.value))
  };
  // const handleStatusChange = (e) => {
  //   setStatusText(e)
  //   dispatch(mySpaHeadStatusSearch(e))
  // };

  const handleClose = () => setShow(false);
  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id,employeeType: login?.employeeType,deviceToken:deviceTokens });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            dispatch(setdeviceTokens(null));
            removeCookie('token');
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            // dispatch(handleLoginTab('first'));
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
        const permissions = res?.data?.data?.permissions;
        const permissionsArray = permissions?.split(',').map(item => item.trim());
        setUserPermission(permissionsArray)
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
    dateSetChanges()

  }, []);

  useEffect(() => {
    if (spaHeadTextSearch) {
      setSearchText(spaHeadTextSearch)
      dispatch(mySpaHeadTextSearch(spaHeadTextSearch))
    } else {
      setSearchText('')
      dispatch(mySpaHeadTextSearch(null))
    }

    if(spaHeadStatusSearch) {
      setStatusText(spaHeadStatusSearch)
      dispatch(mySpaHeadStatusSearch(spaHeadStatusSearch))
    } else {
      setStatusText({ value: "All", label: "All" })
      dispatch(mySpaHeadStatusSearch({ value: "All", label: "All" }))
    }

    if(spaHeadSelectedType) {
      setSelectedFilter(spaHeadSelectedType)
      dispatch(mySpaHeadSelectedType(spaHeadSelectedType));
    }else {
      setSelectedFilter('')
      dispatch(mySpaHeadSelectedType(null))
    }
  }, [spaHeadTextSearch,spaHeadSelectedType,spaHeadStatusSearch]);

  // useEffect(() => {
  //   setDateRange(moment().toDate())
  //   dispatch(mySpaHeadSelectedDate(moment().toDate()))
  // }, [dactiveTab]);

const dateSetChanges = async () => {
  if(spaHeadSelectedDate){
    setDateRange(moment(spaHeadSelectedDate).toDate())
  }
  if (spaHeadTextSearch) {
    setSearchText(spaHeadTextSearch)
    dispatch(mySpaHeadTextSearch(spaHeadTextSearch))
  }
  if(spaHeadSelectedType) {
    setSelectedFilter(spaHeadSelectedType)
    dispatch(mySpaHeadSelectedType(spaHeadSelectedType));
  }
  if(spaHeadStatusSearch) {
    setStatusText(spaHeadStatusSearch)
    dispatch(mySpaHeadStatusSearch(spaHeadStatusSearch))
  } else {
    setStatusText({ value: "All", label: "All" })
    dispatch(mySpaHeadStatusSearch({ value: "All", label: "All" }))
  }
}

  const dateSetChange = async (update) => {
    setSelectedFilter('');
    setDateRange(update);
    dispatch(mySpaHeadSelectedDate(update))
    dispatch(mySpaHeadSelectedStartDate(null));
    dispatch(mySpaHeadSelectedEndDate(null));
    dispatch(mySpaHeadSelectedType(null));

  }


  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg.action == "new_booking_from_user" || msg.action == "new_booking_from_spa" || msg.action == "new_booking_from_quick" || msg.action == "message_from_user_side" || msg.action == "new_review_from_user" || msg.action == "notification_read" || msg.action == "profileUpdate") {
          getProfileInfo();
        }
      });

      window.io.socket.on("spaemployee", async (msg) => {
        if (msg.action == "new_booking_from_user" || msg.action == "new_booking_from_spa" || msg.action == "new_booking_from_quick"|| msg.action == "new_review_from_user" || msg.action == "notification_read" || msg.action == "profileUpdate") {
          getProfileInfo();
        }
      });




    }
  }, [window.io]);

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// Set displayName for the component
CustomToggle.displayName = 'CustomToggle';

const redirectToProfile = async (tab) => {
  dispatch(handleProfileTab(tab));
  push(NEW_DASHBOARD_PATH?.profile)
}



  const selectThisWeek = () => {
    if (selectedFilter === 'week') {
      // Toggle off
      setSelectedFilter(null);
      dispatch(mySpaHeadSelectedType(null));
      dispatch(mySpaHeadSelectedStartDate(null));
      dispatch(mySpaHeadSelectedEndDate(null));
    } else {
      // Toggle on
      setSelectedFilter('week');
      setDateRange(null);
      dispatch(mySpaHeadSelectedDate(null))
      dispatch(myHeadDateRange(null));
      setDateRanges([])
      let startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
      let endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
      dispatch(mySpaHeadSelectedStartDate(startOfWeek));
      dispatch(mySpaHeadSelectedEndDate(endOfWeek));
      dispatch(mySpaHeadSelectedType('week'));
    }
  };

  const selectThisMonth = () => {
    if (selectedFilter === 'month') {
      // Toggle off
      setSelectedFilter(null);
      dispatch(mySpaHeadSelectedType(null));
      dispatch(mySpaHeadSelectedStartDate(null));
      dispatch(mySpaHeadSelectedEndDate(null));
    } else {
      // Toggle on
      setSelectedFilter('month');
      setDateRange(null);
      dispatch(mySpaHeadSelectedDate(null))
      dispatch(myHeadDateRange(null));
      setDateRanges([])
      let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      let endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
      dispatch(mySpaHeadSelectedStartDate(startOfMonth));
      dispatch(mySpaHeadSelectedEndDate(endOfMonth));
      dispatch(mySpaHeadSelectedType('month'));
    }
  };

  const rangeSelectDate = (dateData) => {
    setDateRanges(dateData)
    if (dateData[0] && dateData[1]) {
      dispatch(mySpaHeadSelectedStartDate(null));
      dispatch(mySpaHeadSelectedEndDate(null));
      dispatch(mySpaHeadSelectedType(null));
      dispatch(myHeadDateRange(dateData));
    } else {
      dispatch(myHeadDateRange(null));
    }

  }

  const selectStatus = (status) => {
    if (statusText.value === status) {
      // If the current filter is the same as the selected status, remove the filter
      setStatusText({ value: "All", label: "All" });
      dispatch(mySpaHeadStatusSearch({ value: "All", label: "All" }));
    } else {
      // Set the selected status filter and update Redux store
      setStatusText({ value: status, label: status });
      dispatch(mySpaHeadStatusSearch({ value: status, label: status }));
    }
  };
  const canApprove = userPermissions.includes("Approve/Deny Requests");
  // console.log("spaHeadSelectedDate",spaHeadSelectedDate);
  // console.log("dateRange",dateRange);
  // console.log("selectedFilter",selectedFilter);


  return (
    <>
      <HeaderBarWrapper isNewDashboardInsightsHeaderWrapper={true}>
        <Container>
          <div className="sitback-new-header-div">

            <div className="clearfix">
              <a className={pathname==='/profile' || pathname==='/notifications' ? 'sitback-toggle-menu-wrapper profile-header-menu-toggle-wrapper' : 'sitback-toggle-menu-wrapper' }>
                <img alt="sitback" src="/images/toggle-menu.svg" />
              </a>
            </div>
            <a className="sitback-mobile-logo-wrapper" onClick={() => push(NEW_DASHBOARD_PATH?.dashboard)}>
            <img alt="sitback" src="/images/mobile-header-logo-wrapper.svg" />
            </a>
            { pathname == "/profile" || pathname =='/notifications' ? <>
            <a className="sitback-profile-menu-logo-wrapper" onClick={() => push(NEW_DASHBOARD_PATH?.dashboard)}>
            <img alt="sitback" src="/images/mobile-header-logo-wrapper.svg" />
            </a>
            </> : <></>}
            { ((pathname !== "/profile"  && pathname !=='/notifications' ) && (dactiveTab === "dfifth" || dactiveTab === "dfourth")) ? (
              <>
                {dactiveTab === "dfourth" ?
                  <div className="date-select-wrapper">

                    <ReactDatePicker
                        showIcon
                        placeholderText={t("selectDate")}
                        className="datepicker-input"
                        selected={dateRange ? dateRange : ''}
                        value={dateRange ? moment(dateRange).format("ddd, DD MMM YYYY") : ''}
                        onKeyDown={(e) => {
                          e.preventDefault();
                        }}
                        isClearable={!!dateRange}
                        onChange={(update) =>  dateSetChange (update)}
                        icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
                      />
                  </div>
                  : <>
                      <div className="date-select-wrapper">
                        <ReactDatePicker
                          showIcon
                          className="datepicker-input"
                          selectsRange={true}
                          startDate={customStartDate}
                          endDate={customEndDate}
                          placeholderText={t("customDates")}
                          onChange={(update) => rangeSelectDate(update)}
                          isClearable={true}
                          icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </div>
                </> }
              </>) :
              <></>
            }

            { ((pathname !== "/profile" && pathname !=='/notifications') && (dactiveTab === "dfirst" || dactiveTab === "dfifth" )) ? (
              <>

              {dactiveTab === "dfifth" ?
                <div className="week-month-filters">
                  <button
                    className={selectedFilter === 'week' ? 'active-filter' : ''}
                    onClick={selectThisWeek}
                  >
                    {t("thisWeek")}
                  </button>
                  <button

                    className={selectedFilter === 'month' ? 'month-btn active-filter' : 'month-btn'}
                    onClick={selectThisMonth}
                  >
                    {t("thisMonth")}
                  </button>
                </div>
                : "" }
                {dactiveTab === "dfirst" ?

                  <div className="week-month-filters sitback-all-pending-filter-wrapper">
                    <button
                      className={statusText.value === "All" ? 'active-filter' : ''}
                      onClick={() => selectStatus("All")}
                    >
                      {t("allText")}
                    </button>
                    <button
                      className={statusText.value === "Pending" ? 'active-filter' : ''}
                      onClick={() => selectStatus("Pending")}
                    >
                      {t("pending")}
                    </button>
                    <button
                      className={statusText.value === "Confirmed" ? 'active-filter' : ''}
                      onClick={() => selectStatus("Confirmed")}
                    >
                      {t("confirmedText")}
                    </button>
                    <button
                    className={statusText.value === "Rejected" ? 'active-filter' : ''}
                      onClick={() => selectStatus("Rejected")}
                    >
                      {t("declinedText")}
                    </button>
                  </div>
                : ""
                }
              </>) :
              <></>
            }

            { ((pathname !== "/profile" && pathname !=='/notifications') && (dactiveTab === "dfirst")) ? (
            <>
            <div className="search-input-icon-div">
              <i className="calendar-icon">
                <img alt="sitback" src="/images/search-normal.svg" />
              </i>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchText} // Bind value to the state
                  onChange={handleSearchChange} // Update state on change
                />
              </Form.Group>
            </div>
            {/* <div className="status-dropdown-display-wrapper">
            <ReactSelect
                value={statusText}
                options={options}
                className="sitback-select2-container"
                classNamePrefix="sitback-select-option"
                placeholder="Select"
                onChange={handleStatusChange}
              />
            </div> */}
            </>
            ) : <></>}

            { (pathname == "/profile"  || pathname =='/notifications') ? (
            <>
              <a href="javascript:void(0);" className="back-arrow-link" onClick={() => push(NEW_DASHBOARD_PATH?.dashboard)}>
                <i><img alt="sitback" src="/images/Arrow-v3.svg" /></i>
                  {t("gotoDashboard")}
              </a>
            </> ) : <></>}
            <div className={(pathname === '/profile'  || pathname =='/notifications' ) ? 'profile-content-div profile-page-dropdown-menu' : 'profile-content-div'}>
             {login?.employeeType == "spa" ? <>
              <div className="user-profile-and-notification">
                <div className="notification-modal-wrapper">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {login?.notificationcount > 0 ?
                      <span className="active-dost "></span> :
                      <> </>
                    }
                    <InlineSVG
                      src={notification_icon}
                      className="global_laguage_icon"
                      onClick={() => {
                        if (!isBlock && isSubscribe == 1) {
                          push(NEW_DASHBOARD_PATH?.notification);
                        }
                      }}
                    />
                  </Dropdown.Toggle>
                </div>
                </div>
              </> :
              <>
              {canApprove && <div className="user-profile-and-notification">
                <div className="notification-modal-wrapper">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {login?.notificationcount > 0 ?
                      <span className="active-dost "></span> :
                      <> </>
                    }
                    <InlineSVG
                      src={notification_icon}
                      className="global_laguage_icon"
                      onClick={() => {
                        if (!isBlock && isSubscribe == 1) {
                          push(NEW_DASHBOARD_PATH?.notification);
                        }
                      }}
                    />
                  </Dropdown.Toggle>
                </div>
                </div>}
              </> }
              {/* <div className="profile-wrapper">
                <img alt="sitback" src="/images/profile-img.png" />
              </div> */}
              {login?.employeeType == "spa" ? <>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  <div className="profile-wrapper">
                    <img alt="sitback" src={login?.image || "/images/profile-img.png"} />
                  </div>
                </Dropdown.Toggle>
                { (pathname != "/profile") ? (
                <Dropdown.Menu>
                  <Dropdown.Item  onClick={() => { push(NEW_DASHBOARD_PATH?.profile)}}>{t("profile")}</Dropdown.Item>
                  <Dropdown.Item  onClick={() => redirectToProfile('second')}>{t("gallery")}</Dropdown.Item>
                  <Dropdown.Item  onClick={() => redirectToProfile('fourth')}>{t("location")}</Dropdown.Item>
                  <Dropdown.Item  onClick={() => redirectToProfile('first')} active>
                  {t("addServicesAndPrices")}
                  </Dropdown.Item>
                  <Dropdown.Item  onClick={() => redirectToProfile('fifth')}>{t("spaOperatingHours")}</Dropdown.Item>
                </Dropdown.Menu>
                ) :
                <>
                <Dropdown.Menu>
                  <Dropdown.Item  onClick={() => { leave_room()}} >{t("logout")}</Dropdown.Item>
                </Dropdown.Menu>
                </> }
              </Dropdown>
              </> : <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  <div className="profile-wrapper">
                    <img alt="sitback" src={login?.image || "/images/profile-img.png"} />
                  </div>
                </Dropdown.Toggle>
                { (pathname != "/profile") ? (
                <Dropdown.Menu>
                <Dropdown.Item  onClick={() => { push(NEW_DASHBOARD_PATH?.profile)}}>{t("changePassword")}</Dropdown.Item>
                </Dropdown.Menu>
                ) :
                <>
                <Dropdown.Menu>
                  <Dropdown.Item  onClick={() => { leave_room()}} >{t("logout")}</Dropdown.Item>
                </Dropdown.Menu>
                </> }
              </Dropdown> }
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

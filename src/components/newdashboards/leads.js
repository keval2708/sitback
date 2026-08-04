import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import SitbackLoader from "./SitbackLoader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { dtabHandle } from "@/redux/messageTab";
import { myHeadDateRange, mySpaHeadSelectedDate, mySpaHeadSelectedEndDate, mySpaHeadSelectedStartDate, mySpaHeadSelectedType, mySpaHeadTextSearch, serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import {
  LeadsAndBookingDisplayWrapper,
} from '@/styles/pages/insights.style';
import { Calendar_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


export const Leads = () => {
  const {spaHeadSelectedDate} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedEndDate} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedStartDate} = useSelector(serviceSliceSelector)
  const {spaHeadSelectedType} = useSelector(serviceSliceSelector)
  const {headDateRange} = useSelector(serviceSliceSelector)
  const today = moment(new Date()).format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [dateRange, setDateRange] = useState();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [userPermissions, setUserPermission] = useState([]);
  const [dateRanges, setDateRanges] = useState([]);
  const [customStartDate, customEndDate] = dateRanges;

  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { login } = useSelector(authCheckSliceSelector);
  const { t } = useTranslation();
  // console.log("login",login);
  // const permissions = login?.permissions;
  // const permissionsArray = permissions?.split(',').map(item => item.trim());
  // console.log("permissionsArray",permissionsArray);


  const listLeadTrackData = async () => {
    if(login){
        let param = {
          startdate: headDateRange ? moment(headDateRange[0]).format("YYYY-MM-DD") : '',
          enddate: headDateRange ? moment(headDateRange[1]).format("YYYY-MM-DD") : '',
          start: spaHeadSelectedStartDate ? moment(spaHeadSelectedStartDate).format("YYYY-MM-DD") : '',
          end: spaHeadSelectedEndDate ? moment(spaHeadSelectedEndDate).format("YYYY-MM-DD") : '',

        };

        try {

          setLoading(true)
          const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_LEAD_TRACK, param);
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            //
            setLeadsData(res?.data?.data)
            setLoading(false)
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    }

  useEffect(() => {
    listLeadTrackData()
  }, []);

  useEffect(() => {
    const permissions = login.permissions;

    if(permissions) {
      const permissionsArray = permissions?.split(',').map(item => item.trim());
      setUserPermission(permissionsArray)
    }

  }, [login]);
  useEffect(() => {
    if(spaHeadSelectedDate || spaHeadSelectedEndDate || spaHeadSelectedStartDate) {
      listLeadTrackData()
    } else if(!spaHeadSelectedDate && !spaHeadSelectedEndDate && !spaHeadSelectedStartDate) {
      listLeadTrackData()
    }

  }, [spaHeadSelectedDate,spaHeadSelectedStartDate,spaHeadSelectedEndDate,headDateRange]);

  useEffect(() => {
    dateSetChanges()
  }, []);

  const dateSetChanges = async () => {
    if(spaHeadSelectedDate){
      setDateRange(moment(spaHeadSelectedDate).toDate())
    }
     if(spaHeadSelectedType) {
        setSelectedFilter(spaHeadSelectedType)
        dispatch(mySpaHeadSelectedType(spaHeadSelectedType));
      }
  }

  const dateSetChange = async (update) => {
      setSelectedFilter('');
      setDateRange(update);
      dispatch(mySpaHeadSelectedDate(update))
      dispatch(mySpaHeadSelectedStartDate(null));
      dispatch(mySpaHeadSelectedEndDate(null));
      dispatch(mySpaHeadSelectedType(null));
      dispatch(myHeadDateRange(null));
      setDateRanges([])
    }

  const handleRedirect = (text) => {
    dispatch(dtabHandle("dfirst"));
    if(text) {
      dispatch(mySpaHeadTextSearch(text))
    } else {
      dispatch(mySpaHeadTextSearch(null))
    }

  };

  const isPastDate = spaHeadSelectedDate && moment(spaHeadSelectedDate).isBefore(today, 'day');

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

  const canApprove = userPermissions.includes("Approve/Deny Requests");

  useEffect(() => {
    if (window.io) {
      if(login?.employeeType == "spa") {
          window.io.socket.on("serviceprovider", async (msg) => {
          if (msg?.action == "new_booking_from_quick" || msg?.action == "booking_action") {
            listLeadTrackData()
          }
        });
      } else if (login?.employeeType == "spaemployee") {

          window.io.socket.on("spaemployee", async (msg) => {
          if (msg?.action == "new_booking_from_quick" || msg?.action == "booking_action") {
            listLeadTrackData()
          }
        });
      }

    }
  }, [window.io]);


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



  return (
    <>
      <div className="mobile-header-display-div">
          <div className="date-select-wrapper">
          <ReactDatePicker
                showIcon
                className="datepicker-input"
                selectsRange={true}
                startDate={customStartDate}
                endDate={customEndDate}
                placeholderText={t('customDates')}
                onChange={(update) => rangeSelectDate(update)}
                isClearable={true}
                icon={<InlineSVG src={Calendar_icon} className="global_laguage_icon" />}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
          </div>
          <div className="week-month-filters">
            <button className={selectedFilter === 'week' ? 'active-filter' : ''} onClick={selectThisWeek} >
             {t('thisWeek')}
            </button>
            <button className={selectedFilter === 'month' ? 'month-btn active-filter' : 'month-btn'} onClick={selectThisMonth}>
              {t('thisMonth')}
            </button>
          </div>
      </div>
      <LeadsAndBookingDisplayWrapper>
        {loading ?
          <>
            <div className="appointment-submit-main-div">
                <SitbackLoader />
            </div>
            </>  :
          <>
            <div className="leads-boxes-main-div">
            {login?.employeeType == "spa" ?
              <>
              <Row>
                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-1.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('totalLeadsReceived')}</p>
                    <h3>+{leadsData?.totalLeadsReceived}</h3>
                      {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalLeadsReceivedPer?.status == "negative" ?
                      <>
                      <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalLeadsReceivedPer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalLeadsReceivedPer?.formatted}</p>
                      </>}
                      </> : <></>}
                  </div>
                </Col>
                { isPastDate ?

                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-2.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('expiredRequests')}</p>
                    <h3>+{leadsData?.totalPending}</h3>

                     {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>

                      {leadsData?.totalPendingPer?.status == "negative" ?
                      <>
                        <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                      </> :
                      <>
                        <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                      </>}

                      </> : <></>}
                  </div>
                </Col>

                : <>

                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-2.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('pendingRequests')}</p>
                    <h3>+{leadsData?.totalPending}</h3>
                    {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalPendingPer?.status == "negative" ?
                      <>
                        <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                      </> :
                      <>
                        <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                      </>}
                      </> : <></>}


                  </div>
                </Col>
                </> }
                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-3.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('confirmedBookings')}</p>
                    <h3>+{leadsData?.totalApproved}</h3>
                      {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalApprovedPer?.status == "negative" ?
                      <>
                        <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalApprovedPer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalApprovedPer?.formatted}</p>
                      </>}
                        </> : <></>}

                  </div>
                </Col>
                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-4.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('totalRevenue')}</p>
                      <h3>${leadsData?.totalRevenue}</h3>
                      {spaHeadSelectedDate  || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalRevenuePer?.status == "negative" ?
                      <>
                      <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalRevenuePer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalRevenuePer?.formatted}</p>
                      </>}
                      </> : <></>}

                  </div>
                </Col>
              </Row>
              </> :
              <>

              <Row>

                <Col md={6}
                  >
                  <div className="lead-box-wrapper"  style={{ cursor: canApprove ? 'pointer' : 'not-allowed', }}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-1.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('totalLeadsReceived')}</p>
                    <h3>+{leadsData?.totalLeadsReceived}</h3>
                      {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalLeadsReceivedPer?.status == "negative" ?
                      <>
                      <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalLeadsReceivedPer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalLeadsReceivedPer?.formatted}</p>
                      </>}
                      </> : <></>}
                  </div>
                </Col>
                {isPastDate ?
                  <Col md={6}>
                    <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                      <div className="lead-box-img">
                        <img alt="sitback" src="/images/lead-box-image-2.svg" />
                      </div>
                      <p className="total-lead-para-text">{t('expiredRequests')}</p>
                      <h3>+{leadsData?.totalPending}</h3>

                      {spaHeadSelectedDate || spaHeadSelectedType ?
                        <>

                        {leadsData?.totalPendingPer?.status == "negative" ?
                        <>
                          <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                        </> :
                        <>
                          <p className="growth-text">
                        <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                        </>}

                        </> : <></>}
                    </div>
                  </Col> :
                  <>
                    <Col md={6}>
                      <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                        <div className="lead-box-img">
                          <img alt="sitback" src="/images/lead-box-image-2.svg" />
                        </div>
                        <p className="total-lead-para-text">{t('pendingRequests')}</p>
                        <h3>+{leadsData?.totalPending}</h3>
                        {spaHeadSelectedDate || spaHeadSelectedType ?
                          <>
                          {leadsData?.totalPendingPer?.status == "negative" ?
                          <>
                            <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                          </> :
                          <>
                            <p className="growth-text">
                          <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalPendingPer?.formatted}</p>
                          </>}
                          </> : <></>}


                      </div>
                    </Col>
                  </>
                }
                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-3.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('confirmedBookings')}</p>
                    <h3>+{leadsData?.totalApproved}</h3>
                      {spaHeadSelectedDate || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalApprovedPer?.status == "negative" ?
                      <>
                        <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalApprovedPer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalApprovedPer?.formatted}</p>
                      </>}
                        </> : <></>}

                  </div>
                </Col>
                <Col md={6}>
                  <div className="lead-box-wrapper" style={{ cursor:'not-allowed'}}>
                    <div className="lead-box-img">
                      <img alt="sitback" src="/images/lead-box-image-4.svg" />
                    </div>
                    <p className="total-lead-para-text">{t('totalRevenue')}</p>
                      <h3>${leadsData?.totalRevenue}</h3>
                      {spaHeadSelectedDate  || spaHeadSelectedType ?
                      <>
                      {leadsData?.totalRevenuePer?.status == "negative" ?
                      <>
                      <p className="growth-text negative-growth-text"><span><img className="negative-growth-icon" alt="sitback" src="/images/negative-growth.svg" /></span>  {leadsData?.totalRevenuePer?.formatted}</p>
                      </> :
                      <>
                      <p className="growth-text">
                      <span><img alt="sitback" src="/images/growth-icon.svg" /></span>  {leadsData?.totalRevenuePer?.formatted}</p>
                      </>}
                      </> : <></>}

                  </div>
                </Col>
              </Row>
              </>}
            </div>
          </>
        }
      </LeadsAndBookingDisplayWrapper>
    </>
  );
};

"use client";
import moment from "moment";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Accordion, Col,Container,Modal, Row, } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import RangeSlider from 'react-range-slider-input';
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import TopReviewSpasNearComponent from "@/components/auth/TopReviewSpasNearSection";
import WhyPeopleChooseSectionComponent from "@/components/auth/WhyPeopleChooseSectionComponent";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { handleStep, manageSchedulerResponse } from "@/redux/quickBooking";
import { myHomePageSelectedCity, myHomePageSelectedDate, myHomePageSelectedService, mySelectedCity, mySelectedDate, mySelectedServiceList, mySelectedSlot, mySpaLocationPageSelectedCity, mySpaPageSelectedCity, serviceSliceSelector } from "@/redux/service";
import { PATH_AUTH, PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import 'react-range-slider-input/dist/style.css';
import { Button,FormGroup,Image, Input,MainLayoutWrapper,SubTitleText18  } from "@/styles/global/main.style";
import {
  ComingSoonLayoutWrapper,
  ScottsdaleBoxWrapper,
  SpaUpdatedPageLayoutDiv,
  SpasNearLayoutWrapper,
} from "@/styles/pages/comingsoon.style";

import InlineSVG from "svg-inline-react";
import { CitySelectIcon_icon, HomeCrownIcon_icon, PriceRangeSpaIcon_icon, RankingStar_icon, ServiceInput_icon, SmallCalendarIcon_icon, SpaDetailCLoseIcon_icon, SpaFilterIcon_icon, SpaLocationIcon_icon, TimeCircle_icon, } from "@/styles/svgs";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/pagination';


export default function SpaLocation() {

const params = useParams();
  const options = [
    { value: 'Morning', label: 'Morning' },
    { value: 'Afternoon', label: 'Afternoon' },
    { value: 'Evening', label: 'Evening' }
  ]
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation();
  const {homeSelectedService} = useSelector(serviceSliceSelector)
  const {homeSelectedDate} = useSelector(serviceSliceSelector)

  const dayPickerRef = useRef(null);

   // Form Hooks
    const methods = useForm();

    const {
    control,
    setValue,
  } = methods;



  //hooks
  const { toaster } = useToaster();
  const debounceRef = useRef(null);

  //state
  const [loading, setLoading] = useState(false);
  const [cityDropDownData, setCityDropDownData] = useState([]);
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [selectedCityOptionTemp, setSelectedCityOptionTemp] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeTemp, setSelectedTimeTemp] = useState();
  const [serviceListdata, setServiceListdata] = useState([]);
  const [selectedServiceData, setSelectedService] = useState(null);
  const [selectedTempServiceData, setSelectedTempService] = useState(null);
  const [selectedTempCityData, setSelectedTempCity] = useState(null);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentTempMonth, setCurrentTempMonth] = useState();
  const [shortDesc, setShortDesc] = useState(null)
  const [shortTitle, setShortTitle] = useState(null)
  const [spaDetails, setSpaDetails] = useState([]); // Stores the blog data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("MM-DD-yyyy"));
  const [selectedTempDate, setSelectedTempDate] = useState(moment(new Date()).format("MM-DD-yyyy"));
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false);
  const [isDayPickerTempVisible, setIsDayPickerTempVisible] = useState(false);
  const [noBookingsMessage, setNoBookingsMessage] = useState(false);
  const [noCityMessage, setNoCityMessage] = useState(false);
  const [range, setRange] = useState([0, 2000]);
  const [tempRange, setTempRange] = useState([0, 2000]);
  const [myCurrentReviews, setMyCurrentReviews] = useState(null);

  const [rangeMobile, setRangeMobile] = useState([0, 2000]);
  const [tempRangeMobile, setTempRangeMobile] = useState([0, 2000]);
  const defaultMin = 0;
  const defaultMax = 2000;

  const spasPerPage = 12;

  const [selectedTempMobileServiceData, setSelectedTempMobileService] = useState(null);
  const [selectedTempMobileCityData, setSelectedTempMobileCity] = useState(null);
  const [currentTempMobileMonth, setCurrentTempMobileMonth] = useState();
  const [selectedTempMobileDate, setSelectedTempMobileDate] = useState(moment(new Date()).format("MM-DD-yyyy"));
  const [isDayPickerTempMobileVisible, setIsDayPickerTempMobileVisible] = useState(false);
  const [location, setLocation] = useState({ city: null, state: null, lat: null, lng: null });
  const [activeChips, setActiveChips] = useState([]);
  const [totalSpasAvailable, setTotalSpasAvailable] = useState(0); // Stores the number of available spas
  const [cityName, setCityName] = useState(null);



  // Fetch blog data whenever the currentPage changes


  const searchParams = useSearchParams();
    let property1 = searchParams.get("id");

  useEffect(() => {
    if(!homeSelectedDate && !homeSelectedService ) {
      fetchSpaData()
      fetchMyCurrentReviewList()
      dispatch(mySpaPageSelectedCity(null))
   }
  }, [currentPage,property1,location]);

   useEffect(() => {
      if(!homeSelectedDate && !homeSelectedService && location?.lat) {
        setCurrentPage(1);
        fetchSpaData()
        fetchMyCurrentReviewList()
      }
    }, [activeChips]);


  useEffect(() => {
    setLoading(true);
    if(homeSelectedDate || homeSelectedService) {
      setTimeout(() => {
      fetchSpaDatas()
      fetchMyCurrentReviewList()
      dispatch(mySpaLocationPageSelectedCity(null));

      }, 100);
    }

  }, [location]);

  const fetchSpaData = async (isClare = null) => {
    try {
      setLoading(true);
        let param = ''
      if(isClare) {

        param = {
        page: 1,
        perpage: spasPerPage,
        date: moment().format("YYYY-MM-DD"),
        minprice:0,
        maxprice:2000,
        userlat:location?.lat,
        userlog:location?.lng,
        usercity:location?.city,
        userstate:location?.state,
        cityslug: params?.slug,
      };

      } else {

      param = {
        page: currentPage,
        perpage: spasPerPage,
        date: selectedDate ? moment(selectedDate, "MM-DD-YYYY").format("YYYY-MM-DD") : '',
        slot_title:selectedTime?.value,
        minprice:range[0],
        maxprice:range[1],
        serviceid:selectedServiceData?.value,
      };

      if(selectedCityOption) {
        param.cityslug = selectedCityOption?.value;
      } else {
        param.cityslug = params?.slug;
      }
    }
      const res = await axiosApiCall.post(API_ROUTER?.GET_SPA_LIST_SLUGWISE, param);
      // console.log("res",res);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setCityName(res?.data?.city_name || null);
        setTotalSpasAvailable(res?.data?.totalSpa)
        const spaList = res?.data?.data || [];

          // Check if any spa has "futuredesc"
          if(res?.data?.newcitymsg) {
            setLoading(true);
            dispatch(mySelectedCity(res?.data?.citydataarray))
            push(PATH_AUTH?.comingSoonTo);
            return
          }
          if(res?.data?.servicemsgdisplay) {
            setNoCityMessage(true)
          } else {
            setNoCityMessage(false)
          }

          const hasFutureDesc = spaList.some(spa => spa.futuredesc);
          setNoBookingsMessage(hasFutureDesc);
          setShortDesc(res?.data?.short_description)
          setShortTitle(res?.data?.short_title)
          setSpaDetails(res?.data?.data);
          setTotalPages(res?.data?.totalPages);


      }
    } catch (error) {
      // console.error("Error fetching spa:", error);
    } finally {
      if(homeSelectedService || homeSelectedDate) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }

    }
  };

  const fetchMyCurrentReviewList = async () => {
    try {
        let param = {};

        if(selectedCityOption) {
          param.cityslug = selectedCityOption?.value;
        } else {
          param.cityslug = params?.slug;
        }

      const res = await axiosApiCall.post(API_ROUTER?.GET_MY_CURRENT_REVIEW_LIST, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setMyCurrentReviews(res?.data?.data || null);
      }
    } catch (error) {
      // console.error("Error fetching my current reviews:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchSpaDatas = async () => {

      try {
        setLoading(true);
        let param = ''
         param = {
          page: currentPage,
          perpage: spasPerPage,
          date: homeSelectedDate ? moment(homeSelectedDate, "MM-DD-YYYY").format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
          slot_title:selectedTime?.value,
          serviceid:homeSelectedService?.value,
          cityslug:params?.slug,
          minprice:range[0],
          maxprice:range[1],
        };



        const res = await axiosApiCall.post(API_ROUTER?.GET_SPA_LIST_SLUGWISE, param);
        // console.log("res",res);

        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setCityName(res?.data?.city_name || null);
          setTotalSpasAvailable(res?.data?.totalSpa)
          const spaList = res?.data?.data || [];

          if(res?.data?.newcitymsg) {
            setLoading(true);
            dispatch(mySelectedCity(res?.data?.citydataarray))
            push(PATH_AUTH?.comingSoonTo);
            return
          }
          if(res?.data?.servicemsgdisplay) {
            setNoCityMessage(true)
          } else {
            setNoCityMessage(false)
          }

          // Check if any spa has "futuredesc"
          const hasFutureDesc = spaList.some(spa => spa.futuredesc);
          setNoBookingsMessage(hasFutureDesc);
          setShortDesc(res?.data?.short_description)
          setShortTitle(res?.data?.short_title)
          setSpaDetails(res?.data?.data);
          setTotalPages(res?.data?.totalPages);

          setTimeout(() => {
            dispatch(myHomePageSelectedService(null))
            dispatch(myHomePageSelectedCity(null))
            dispatch(mySpaPageSelectedCity(null))
            dispatch(myHomePageSelectedDate(null))
            setLoading(false);
          }, 500);

        }
      } catch (error) {
        // console.error("Error fetching spa:", error);
      }
  };

  // // Pagination handler
  // const goToPreviousPage = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const goToNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  //hooks
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    fetchLatLngFromGoogles();
    getServicess();
    getProfileInfo();
    dispatch(mySelectedSlot(null))
    dispatch(mySelectedDate(null))
    dispatch(manageSchedulerResponse(null));
    dispatch(handleStep(1))
    document.body.classList.add("background-white-layout");
    const filterDiv = document.querySelector('.spa-filter-main-div');
    if (filterDiv) {
      filterDiv.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  const handleClose = () => {
    // dispatch(mySelectedSlot(null))
    // dispatch(mySelectedDate(null))
    setShow(false);
  }

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    if (token == "") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  const handleRadioChange = async (e,data) => {
    // console.log("data",data);
    // console.log("selectedServiceData",selectedServiceData);
    //return

    if(e != null) {
      dispatch(mySelectedSlot(e))
    }
    if(property1){
        dispatch(mySelectedServiceList(
        {
            value:data?.subservicedata?.servicelist_id,
            label:data?.subservicedata?.name,
            image:data?.subservicedata?.image,
            price:data?.subservicedata?.price,
            time: { hour:data?.subservicedata?.hour, minute:data?.subservicedata?.minutes },
            calculatedTime: `(${data?.subservicedata?.hour * 60 +data?.subservicedata?.minutes} min)`,
          }
      ));
    } else {
      dispatch(mySelectedServiceList(null))
    }
    if(data?.futuredate && data?.futuredate != '') {
      dispatch(mySelectedDate(moment(data?.futuredate)?.format("MM-DD-YYYY")))
    } else {
       dispatch(mySelectedDate(selectedDate))
    }

    if(selectedServiceData){

      let param = {
        sp_id: data?.id,
        servicelist_id: selectedServiceData?.servicelistId,
      };
      try {
        const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_SERVICES_ID, param);
        // console.log("res",res?.data?.data);
        //return
        const resData = res?.data?.data || [];
        // console.log("resData",resData);
        //return

        if (res?.data?.data) {
          dispatch(mySelectedServiceList(
            {
                value:resData?.servicelistId,
                label:resData?.label,
                image:resData?.image,
                price:resData?.price,
                time: { hour:resData?.hour, minute:resData?.minutes },
                calculatedTime: `(${resData?.hour * 60 +resData?.minutes} min)`,
              }
          ));


        } else {
          // console.error("No services data received");
        }
      } catch (error) {
        // console.error("Error fetching services:", error);
      }


    }

     let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${data?.slug}`;
     window.location.href = link;
    //setSpaToken(data?.spaToken)
    // setTimeout(() => {
    //   handleShow()
    // }, 100);

  }

  const getServicess = async () => {
    let param = {
        page: 1,
        perpage: 100,
      };
  try {
    const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_SERVICES, param);


    if (res?.data?.data) {
      setServiceListdata(
        res?.data?.data.map((service) => ({

          value:service?.slug,
          label:service?.name,
          image:service?.image,
          price:service?.price,
          time: { hour:service?.hour, minute:service?.minutes },
          calculatedTime: `(${service?.hour * 60 +service?.minutes} min)`,
          servicelistId:service?.servicelist_id,

          // value: service.slug,
          // label: service.name,
        }))
      );
    } else {
      // console.error("No services data received");
    }
  } catch (error) {
    // console.error("Error fetching services:", error);
  }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
  const handleServiceTempSelect = (service) => {
    setSelectedTempService(service);
    setSelectedTempMobileService(service);
  };
   const handleCityTempSelect = (city) => {
    setSelectedTempCity(city);
    setSelectedTempMobileCity(city);
  };
  const handleServiceTempMobileSelect = (service) => {
    setSelectedTempMobileService(service);
    setSelectedTempService(service);
  };
  const handleCityTempMobileSelect = (city) => {
    setSelectedTempMobileCity(city);
    setSelectedTempCity(city);
  };
  const handleTempSearch = () => {
    if(selectedTempServiceData){
      setSelectedService(selectedTempServiceData)
    }
    if(selectedTempDate) {
      setSelectedDate(selectedTempDate)
    }
    if(selectedTempCityData) {
      setSelectedCityOption(selectedTempCityData)
    }

  }

  const handleTempSearchMobile = () => {

    if(selectedTempMobileServiceData){
      setSelectedService(selectedTempMobileServiceData)
    }
    if(selectedTempMobileCityData){
      setSelectedCityOption(selectedTempMobileCityData)
    }
    if(selectedTempMobileDate) {
      setSelectedDate(selectedTempMobileDate)
    }
    if(rangeMobile) {
      setRange(rangeMobile)
    }
    if(selectedCityOptionTemp) {
      setSelectedCityOption(selectedCityOptionTemp)
    }
    if(selectedTimeTemp) {
      setSelectedTime(selectedTimeTemp)
    }
    handleClose()
  }

  const handleDateSelect = (date) => {
      if(date) {
      setSelectedDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentMonth(date);
      setValue("date", date);

      }
      setIsDayPickerVisible(false);

  };

  const handleDateTempSelect = (date) => {
      if(date) {
      setSelectedTempDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentTempMonth(date);
      setSelectedTempMobileDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentTempMobileMonth(date);
      // setValue("date", date);

      }
      setIsDayPickerTempVisible(false);

  };

  const getSpaLocation = async () => {

    const  param = {
      userlat: location?.lat,
      userlog: location?.lng,
    };


    try {
    // setCityLoading(true);
    const cityData = await axiosApiCall.post(API_ROUTER?.GET_CITY_LIST,param);
      // console.log("res",cityData);

    if (!cityData?.status) {
      return toaster(cityData?.message, TOAST_TYPES.ERROR);
    } else {

      const formattedData = cityData?.data?.data.map((city) => ({
        value: city.cityslug,
        label: city.location,
        state: city.state,
        city: city.city,
        lat: city.lat,
        log: city.log,
        county:city.country,
      }));
      setCityDropDownData(formattedData);
    }
  } catch (error) {
    // console.error("Error fetching spa:", error);
  } finally {
    //setCityLoading(false);
  }

  }

  const handleCityChange = (selectedOption) => {
    setSelectedCityOption(selectedOption);
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
          setIsDayPickerVisible(false); // Close the datepicker when clicking outside
        }
      };

      if (isDayPickerVisible) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside); // Cleanup
      };
  }, [isDayPickerVisible]);

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
          setIsDayPickerTempVisible(false); // Close the datepicker when clicking outside
        }
      };

      if (isDayPickerTempVisible) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside); // Cleanup
      };
  }, [isDayPickerTempVisible]);

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption)
  };

  const handleTimeChangeTemp = (selectedOption) => {
    setSelectedTimeTemp(selectedOption)
  };

  const clearAll = () => {
    setSelectedCityOption(null)
    setSelectedCityOptionTemp(null)
    setSelectedTime(null)
    setSelectedTimeTemp(null)
    setSelectedTempCity(null)
    setSelectedTempMobileCity(null)
    if(!property1){
      setSelectedService(null)
      setSelectedTempService(null)
      setSelectedTempMobileService(null)
    }
    setSelectedDate(moment(new Date()).format("MM-DD-yyyy"))
    setSelectedTempDate(moment(new Date()).format("MM-DD-yyyy"))
    setSelectedTempMobileDate(moment(new Date()).format("MM-DD-yyyy"))
    dispatch(myHomePageSelectedService(null))
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedCity(null))
    dispatch(mySpaPageSelectedCity(null))
    setRange([0,2000])
    setTempRange([0,2000])
    setRangeMobile([0,2000])
    setTempRangeMobile([0,2000])
    setActiveChips([]);
    setTimeout(() => {
      setCurrentPage(1)
      fetchSpaData("clear")
    }, 100);

  }

  const clearAlls = () => {
    setSelectedCityOption(null)
    setSelectedCityOptionTemp(null)
    setSelectedTime(null)
    setSelectedTimeTemp(null)
    setSelectedTempCity(null)
    setSelectedTempMobileCity(null)
    if(!property1){
      setSelectedService(null)
      setSelectedTempService(null)
      setSelectedTempMobileService(null)
    }
    setSelectedDate(moment(new Date()).format("MM-DD-yyyy"))
    setSelectedTempDate(moment(new Date()).format("MM-DD-yyyy"))
    setSelectedTempMobileDate(moment(new Date()).format("MM-DD-yyyy"))
    dispatch(myHomePageSelectedService(null))
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedCity(null))
    dispatch(mySpaPageSelectedCity(null))
    setRange([0,2000])
    setTempRange([0,2000])
    setRangeMobile([0,2000])
    setTempRangeMobile([0,2000])
    setCurrentPage(1)
    fetchSpaData()

  }

  // useEffect(() => {
  // if(!homeSelectedDate && !homeSelectedService) {
  //   setCurrentPage(1)
  //   fetchSpaData()
  //  }

  // }, [selectedServiceData,selectedCityOption,selectedDate,selectedTime,range]);

  const handleApplyFilters = () => {
  // Start fresh for chips
  let chips = [];

  if (selectedServiceData) {
    chips.push({
      key: 'service',
      label: selectedServiceData.label,
      onClear: () => {
        setSelectedService(null);
        setSelectedTempService(null);
        dispatch(myHomePageSelectedService(null));
      }
    });
  }

  if (selectedCityOption) {
    chips.push({
      key: 'city',
      label: `${selectedCityOption.city} ${selectedCityOption.state ? ', ' + selectedCityOption.state : ''}`,
      onClear: () => {
        setSelectedCityOption(null);
        setSelectedCityOptionTemp(null);
        dispatch(myHomePageSelectedCity(null));
        dispatch(mySpaPageSelectedCity(null))
      }
    });
  }

  if (selectedDate) {
    chips.push({
      key: 'date',
      label: moment(selectedDate, 'MM-DD-YYYY').format('MM-DD-YYYY'),
      onClear: () => {
        setSelectedDate(moment(new Date()).format('MM-DD-YYYY'));
        dispatch(myHomePageSelectedDate(null));
      }
    });
  }

  if (selectedTime) {
    chips.push({
      key: 'time',
      label: selectedTime.label,
      onClear: () => {
        setSelectedTime(null);
        setSelectedTimeTemp(null);
      }
    });
  }

  // Price filter chip
  if (range[0] !== defaultMin || range[1] !== defaultMax) {
    chips.push({
      key: 'price',
      label: `$${range[0]} – $${range[1]}`,
      onClear: () => {
        setRange([defaultMin, defaultMax]);
        setTempRange([defaultMin, defaultMax]);
      }
    });
  }

  // Update the active chips
  handleClose()
  setActiveChips(chips);

    // // Fetch spa data with the updated filters
    // if (!homeSelectedDate && !homeSelectedService && !homeSelectedCity && location?.lat) {
    //   setCurrentPage(1);
    //   fetchSpaData();
    // }
  };

  useEffect(() => {
    if (homeSelectedService) {
      const selectedOption = serviceListdata.find(
        (option) => option.value === homeSelectedService.value
      );
      setSelectedService(selectedOption || null);
      setSelectedTempService(selectedOption || null)
      setSelectedTempMobileService(selectedOption || null)

    }
  }, [homeSelectedService, serviceListdata]);


  useEffect(() => {
  if (homeSelectedDate && homeSelectedDate !== null) {
    // Using the format "MM-DD-YYYY" to match the actual date string
    const formattedDate = moment(homeSelectedDate, "MM-DD-YYYY");


    if (formattedDate.isValid()) {
      // console.log("Valid date");
      const dateObject = formattedDate.toDate();
      setValue("date", dateObject);
      setCurrentMonth(dateObject);
      setCurrentTempMonth(dateObject)
      setCurrentTempMobileMonth(dateObject)
      setSelectedDate(formattedDate.format("MM-DD-YYYY"));
      setSelectedTempDate(formattedDate.format("MM-DD-YYYY"));
      setSelectedTempMobileDate(formattedDate.format("MM-DD-YYYY"));
    } else {
      // console.error("Invalid date format:", homeSelectedDate);
    }
  }
  }, [homeSelectedDate]);

  const handleSelectedService = async (data) => {
    if(property1){
        dispatch(mySelectedServiceList(
        {
            value:data?.subservicedata?.servicelist_id,
            label:data?.subservicedata?.name,
            image:data?.subservicedata?.image,
            price:data?.subservicedata?.price,
            time: { hour:data?.subservicedata?.hour, minute:data?.subservicedata?.minutes },
            calculatedTime: `(${data?.subservicedata?.hour * 60 +data?.subservicedata?.minutes} min)`,
          }
      ));
    } else {
      dispatch(mySelectedServiceList(null))
    }

    if(data?.futuredate && data?.futuredate != '') {
      dispatch(mySelectedDate(moment(data?.futuredate)?.format("MM-DD-YYYY")))
    } else {
        dispatch(mySelectedDate(selectedDate))
    }
    if(selectedServiceData){

      let param = {
        sp_id: data?.id,
        servicelist_id: selectedServiceData?.servicelistId,
      };
      try {
        const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_SERVICES_ID, param);
        // console.log("res",res?.data?.data);
        //return
        const resData = res?.data?.data || [];
        // console.log("resData",resData);
        //return

        if (res?.data?.data) {
          dispatch(mySelectedServiceList(
            {
                value:resData?.servicelistId,
                label:resData?.label,
                image:resData?.image,
                price:resData?.price,
                time: { hour:resData?.hour, minute:resData?.minutes },
                calculatedTime: `(${resData?.hour * 60 +resData?.minutes} min)`,
              }
          ));


        } else {
          // console.error("No services data received");
        }
      } catch (error) {
        // console.error("Error fetching services:", error);
      }


    }
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${data?.slug}`;
      window.location.href = link;
  }

  const handleRangeChange = (newRange) => {
    setTempRange(newRange); // Update temporary state immediately

    // Clear previous timeout if it exists
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new timeout to call the API after a delay when user stops moving
    debounceRef.current = setTimeout(() => {
      setRange(newRange); // Update actual range
    }, 500); // Delay API call for 500ms after stopping
  };

  const handleRangeChangeMobile = (newRange) => {
    setTempRangeMobile(newRange); // Update temporary state immediately

    // Clear previous timeout if it exists
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set a new timeout to call the API after a delay when user stops moving
    debounceRef.current = setTimeout(() => {
      setRangeMobile(newRange); // Update actual range
    }, 500); // Delay API call for 500ms after stopping
  };

  useEffect(() => {
        const handleClickOutside = (event) => {
          if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
            setIsDayPickerTempMobileVisible(false); // Close the datepicker when clicking outside
          }
        };

        if (isDayPickerTempMobileVisible) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
          document.removeEventListener("mousedown", handleClickOutside); // Cleanup
        };
  }, [isDayPickerTempMobileVisible]);

  const handleDateTempMobileSelect = (date) => {
      if(date) {
      setSelectedTempMobileDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentTempMobileMonth(date);
      setSelectedTempDate(moment(date)?.format("MM-DD-YYYY"));
      setCurrentTempMonth(date);
      // setValue("date", date);

      }
      setIsDayPickerTempMobileVisible(false);

  };

  const fetchLatLngFromGoogles = async (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Store your API key in .env.local
    if (!apiKey) {
      return res.status(500).json({ error: "Google API key is missing" });
    }

    try {
      // Call Google's Geolocation API
      const response = await fetch(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error.message });
      }

      const data = await response.json();

      // Await the city/state result
      const cityState = await fetchCityStateFromLatLag(data?.location?.lat, data?.location?.lng);

      setLocation({
        city: cityState?.city,
        state: cityState?.state,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
      });



    } catch (error) {
      // console.error("Error fetching location:", error);
      //return res.status(500).json({ error: "Failed to get location" });
    }
  };

  const fetchCityStateFromLatLag = async (lat,lng) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.status === 'OK' && data.results.length > 0) {
        const addressComponents = data.results[0].address_components


        let city = ''
        let state = ''

        addressComponents.forEach((component) => {
          const types = component.types

          if (types.includes('locality')) {
            city = component.long_name
          }
          if (types.includes('administrative_area_level_1')) {
            state = component.long_name
          }
        })

        return { city, state }
      } else {
        return { city: '', state: '' }
      }
    } catch (error) {
      // console.error('Google reverse geocode error:', error)
      return { city: '', state: '' }
    }
  }

  useEffect(() => {
    if(location?.lat){
      // console.log("location",location);
      getSpaLocation()
    }
  }, [location]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleChipClear = (key, onClear) => {
    onClear();
    // Remove the chip from the active chips array
    setActiveChips((prevChips) => prevChips.filter((chip) => chip.key !== key));
  };

  return (
    <>
      <BlogHeader />
      <MainLayoutWrapper>
          <ComingSoonLayoutWrapper ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-medium-size-banner-div">
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
                <div className="banner-content-wrapper spa-page-banner-content-div">
                  <div className="banner-top-title-div">
                    <Container>

                      {loading ? '' : <> <h1>{shortTitle}</h1> <p className="spa-page-banner-para-text">{shortDesc}</p> </>}
                    </Container>
                  </div>
                </div>
              </div>
            </section>
          </ComingSoonLayoutWrapper>
          <SpaUpdatedPageLayoutDiv>
            <div className="spa-filter-main-div">
              <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                    <div className="accordion-title-content">
                      <div className="accordion-left-content">
                        <Accordion.Button className="sitback-filter-accordion-btn-wrapper">
                          <h4 className="filter-title-text desktop-view-filter-display-wrapper">
                            <InlineSVG src={SpaFilterIcon_icon} className="global_laguage_icon" />
                            {t("filtersText")}
                          </h4>
                          <a href="javascript:void(0);" onClick={() => handleShow()} className="filter-title-text mobile-view-filter-display-wrapper">
                            <InlineSVG src={SpaFilterIcon_icon} className="global_laguage_icon" />
                            {t("filtersText")}
                          </a>
                        </Accordion.Button>
                        <div className="filter-selected-details filter-detail-desktop-view-wrapper">
                         {activeChips.length === 0 ? null : activeChips.map(f => (
                            <span key={f.key}>
                                {f.label}
                                <a
                                    href="javascript:void(0);"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChipClear(f.key, f.onClear); // Clear chip logic
                                    }}
                                >
                                    <InlineSVG src={SpaDetailCLoseIcon_icon} className="global_laguage_icon" />
                                </a>
                            </span>
                        ))}
                        </div>
                      </div>
                      <div className="accordion-right-content">
                         {totalSpasAvailable > 1 ? <p>{totalSpasAvailable} {t('spasAvailable')}</p> : <p>{totalSpasAvailable} {t('spaAvailable')}</p>}
                      </div>
                      {activeChips.length > 0 && (
                        <div className="filter-selected-details filter-detail-mobile-view-wrapper">
                          {activeChips.length === 0 ? null : activeChips.map(f => (
                              <span key={f.key}>
                                  {f.label}
                                  <a
                                      href="javascript:void(0);"
                                      onClick={(e) => {
                                          e.preventDefault();
                                          handleChipClear(f.key, f.onClear); // Clear chip logic
                                      }}
                                  >
                                      <InlineSVG src={SpaDetailCLoseIcon_icon} className="global_laguage_icon" />
                                  </a>
                              </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Accordion.Body>
                      <div className="sitback-inner-accordion-body-div">
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper">
                          <label className="filter-label">
                            <InlineSVG src={PriceRangeSpaIcon_icon} className="global_laguage_icon" />
                            {t('priceRange')}
                          </label>
                          <FormGroup className="price-range-div">
                            <RangeSlider
                              min={0}
                              max={2000} // Adjust max value as needed
                              value={tempRange}
                              onInput={handleRangeChange}
                            />
                            <div className="prise-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p>${tempRange[0]}</p>
                              <p>${tempRange[1]}</p>
                            </div>
                          </FormGroup>
                          </div>
                        </div>
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper">
                          <label className="filter-label">
                            <InlineSVG src={ServiceInput_icon} className="global_laguage_icon service-icon-label" />
                            {t('serviceType')}
                          </label>
                            <FormGroup className="service-select-div">
                                <ReactSelect
                                  value={selectedServiceData}
                                  options={serviceListdata}
                                  className="sitback-select2-container"
                                  classNamePrefix="sitback-select-option"
                                  placeholder="Service Type"
                                  onChange={handleServiceSelect} // Capture service selection
                                  // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                                  isDisabled={!!property1}
                                />
                              </FormGroup>
                          </div>
                        </div>
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper">
                          <label className="filter-label">
                            <InlineSVG src={CitySelectIcon_icon} className="global_laguage_icon" />
                            {t('selectCityText')}
                          </label>
                            <FormGroup className="city-select-div">
                              <ReactSelect
                                options={cityDropDownData}
                                value={selectedCityOption}
                                onChange={handleCityChange}
                                placeholder="Select City"
                                isClearable
                                className="sitback-select2-container"
                                classNamePrefix="sitback-select-option"
                              />
                              </FormGroup>
                          </div>
                        </div>
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper">
                            <label className="filter-label">
                              <InlineSVG src={SmallCalendarIcon_icon} className="global_laguage_icon" />
                                {t('dateAvailable')}
                            </label>
                            <FormGroup className="date-available-input">
                                <Input
                                  type="text"
                                  value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
                                  onClick={() => setIsDayPickerVisible(true)}
                                  className="datepicker"
                                />
                                {isDayPickerVisible && (
                                  <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
                                    <Controller
                                      name="date"
                                      control={control}
                                      render={() => (
                                      <DayPicker
                                          mode="single"
                                          captionLayout="dropdown"
                                          fromYear={new Date().getFullYear()}
                                          toYear={new Date().getFullYear() + 1}
                                          selected={selectedDate ?  selectedDate : new Date()}
                                          month={currentMonth}
                                              onSelect={(date) => handleDateSelect(date)}
                                              onMonthChange={(month) => setCurrentMonth(month)}
                                              disabled={{
                                                before: new Date(),
                                              }}
                                          styles={{
                                            dropdown: {
                                              backgroundColor: "#ffffff",
                                              border: "none",
                                              borderRadius: "5px",
                                              padding: "10px",
                                              overflow: "hidden",
                                              minWidth: "70px",
                                              color: "#295086",
                                            },
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                )}
                            </FormGroup>
                          </div>
                        </div>
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper">
                              <label className="filter-label">
                                <InlineSVG src={TimeCircle_icon} className="global_laguage_icon" />
                                {t('timeAvailable')}
                              </label>
                              <FormGroup className="time-select-div">
                                <ReactSelect
                                  options={options}
                                  value={selectedTime}
                                  onChange={handleTimeChange}
                                  placeholder="Select Time"
                                  isClearable
                                  className="sitback-select2-container"
                                  classNamePrefix="sitback-select-option"
                                />
                              </FormGroup>
                          </div>
                        </div>
                        <div className="sitback-body-content">
                          <div className="filter-detail-wrapper filter-btn-display-div">
                            <div className="filter-btn-div">
                              <Button className="apply-filter-btn" onClick={() => handleApplyFilters()}>
                                 {t('applyFilters')}
                              </Button>
                              <Link href="javascript:void(0);" onClick={() => clearAll()}>
                                 {t('clearAll')}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </SpaUpdatedPageLayoutDiv>
        <SpasNearLayoutWrapper className="spa-updated-near-layout">
          {/* <div className="mobile-view-filter-wrapper">
            <Form className="filter-inputbox-wrapper">

              <FormGroup className="filterbox-input">
                <Label>{t("selectCityText")}</Label>
                 <ReactSelect
                    value={selectedTempCityData}
                    options={cityDropDownData}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    placeholder={t("selectCityText")}
                    onChange={handleCityTempSelect} // Capture service selection
                    isDisabled={!!property1}

                  />

              </FormGroup>

              <FormGroup className="filterbox-input service-type-form-group-wrapper">
                <Label>{t("serviceType")}</Label>
                 <ReactSelect
                    value={selectedTempServiceData}
                    options={serviceListdata}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    placeholder="What would you like to request?"
                    onChange={handleServiceTempSelect} // Capture service selection
                    isDisabled={!!property1}

                  />

              </FormGroup>

              <FormGroup className="filterbox-input datepicker-box">
                <Label>{t("date")}</Label>


                      <Input
                      value={selectedTempDate || moment(new Date()).format("MM-DD-yyyy")}
                      onClick={() => setIsDayPickerTempVisible(true)}
                      className="datepicker"
                      readOnly
                      />
                      {isDayPickerTempVisible && (
                        <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
                          <Controller
                            name="date"
                            control={control}
                            render={() => (
                            <DayPicker
                                mode="single"
                                captionLayout="dropdown"
                                fromYear={new Date().getFullYear()}
                                toYear={new Date().getFullYear() + 1}
                                selected={selectedTempDate ?  selectedTempDate : new Date()}
                                month={currentTempMonth}
                                    onSelect={(date) => handleDateTempSelect(date)}
                                    onMonthChange={(month) => setCurrentTempMonth(month)}
                                    disabled={{
                                      before: new Date(),
                                    }}
                                styles={{
                                  dropdown: {
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    overflow: "hidden",
                                    minWidth: "70px",
                                    color: "#295086",
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      )}

              </FormGroup>
              <div className="filter-btn">
                <Button type="button" variant="primary" onClick={handleTempSearch} className="font-weight-seven-hundred">

                <Image alt="sitback" src="/images/purple-search-icon.svg"/>
                </Button>
              </div>
            </Form>
            <a href="javascript:void(0);" className="filter-icon-wrapper" onClick={() => handleShow()}>
              <span className="img-wrapper">
                <Image alt="sitback" src="/images/filter-icon-updated-img.png"/>
              </span>
            </a>
          </div> */}
          {/* <div className="spas-layout-change-wrapper">
            <div className="filter-sidebar-wrapper mb-0"></div>
            <div className="spas-layout-section">
              {loading ?
              <> </>  :
              <>
                <div className="our-blogs-header spas-mobile-view-layout-header">
                  <SubTitleText48>{shortTitle} <span></span></SubTitleText48> <p className="sub-pera-text spas-mobile-view-layout-section">{shortDesc}</p>
                </div>
                </>
              }
            </div>
          </div> */}
          <div className="spas-layout-change-wrapper spa-updated-layout-wrapper">
            {/* <div className="filter-sidebar-wrapper desktop-view-sidebar-wrapper">
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("priceRange")}</Accordion.Header>
                  <Accordion.Body>
                    <FormGroup className="mb-2">
                      <RangeSlider
                        min={0}
                        max={2000} // Adjust max value as needed
                        value={tempRange}
                        onInput={handleRangeChange}
                      />
                      <div className="prise-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>${tempRange[0]}</p>
                        <p>${tempRange[1]}</p>
                      </div>
                    </FormGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("serviceType")}</Accordion.Header>
                  <Accordion.Body>
                    <FormGroup className="mb-2">
                      <ReactSelect
                       value={selectedServiceData}
                        options={serviceListdata}
                        className="sitback-select2-container"
                        classNamePrefix="sitback-select-option"
                        placeholder={t("serviceType")}
                        onChange={handleServiceSelect} // Capture service selection
                        // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                         isDisabled={!!property1}
                      />
                      </FormGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("City")}</Accordion.Header>
                  <Accordion.Body>
                    <FormGroup className="mb-2">
                     <ReactSelect
                      options={cityDropDownData}
                      value={selectedCityOption}
                      onChange={handleCityChange}
                      placeholder={t("selectCityText")}
                      isClearable
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                    />
                      </FormGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("dateAvailable")}</Accordion.Header>
                  <Accordion.Body>
                    <FormGroup className="mb-2 date-available-input">
                      <Input
                      value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
                      onClick={() => setIsDayPickerVisible(true)}
                      className="datepicker"
                      readOnly
                      />
                      {isDayPickerVisible && (
                        <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
                          <Controller
                            name="date"
                            control={control}
                            render={() => (
                            <DayPicker
                                mode="single"
                                captionLayout="dropdown"
                                fromYear={new Date().getFullYear()}
                                toYear={new Date().getFullYear() + 1}
                                selected={selectedDate ?  selectedDate : new Date()}
                                month={currentMonth}
                                onSelect={(date) => handleDateSelect(date)}
                                onMonthChange={(month) => setCurrentMonth(month)}
                                disabled={{
                                  before: new Date(),
                                }}
                                styles={{
                                  dropdown: {
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    overflow: "hidden",
                                    minWidth: "70px",
                                    color: "#295086",
                                  },
                                }}
                              />
                            )}
                          />
                        </div>
                      )}

                      </FormGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{t("timeAvailable")}</Accordion.Header>
                  <Accordion.Body>
                    <FormGroup className="mb-2">
                      <ReactSelect
                      options={options}
                      value={selectedTime}
                      onChange={handleTimeChange}
                      placeholder={t("selecttime")}
                      isClearable
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                    />

                      </FormGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="clear-filter-btn">
                <p onClick={() => clearAll()}>{t("clearAll")}</p>
              </div>

            </div> */}
            <div className="spas-layout-section" id="spas-layout-section">
              {loading ? (
                <Container fluid>
                  <>
                    <div className="">
                    <ScottsdaleBoxWrapper className="swiper-loader spa-loader-animation">
                      <div className="imagebox">
                          <Skeleton count={1} />
                      </div>
                      <div className="scottsdale-detail">
                      <Skeleton count={5} />
                      </div>
                    </ScottsdaleBoxWrapper>
                    <ScottsdaleBoxWrapper className="swiper-loader spa-loader-animation">
                      <div className="imagebox">
                          <Skeleton count={1} />
                      </div>
                      <div className="scottsdale-detail">
                      <Skeleton count={5} />
                      </div>
                    </ScottsdaleBoxWrapper>
                    <ScottsdaleBoxWrapper className="swiper-loader spa-loader-animation">
                      <div className="imagebox">
                          <Skeleton count={1} />
                      </div>
                      <div className="scottsdale-detail">
                      <Skeleton count={5} />
                      </div>
                    </ScottsdaleBoxWrapper>
                    <ScottsdaleBoxWrapper className="swiper-loader spa-loader-animation">
                      <div className="imagebox">
                          <Skeleton count={1} />
                      </div>
                      <div className="scottsdale-detail">
                      <Skeleton count={5} />
                      </div>
                    </ScottsdaleBoxWrapper>
                      {/* <div className="spinner-border text-info" role="status">
                      </div> */}
                      {/* <Swiper
                          slidesPerView={1}
                          spaceBetween={18}
                          navigation={false}
                          className="mySwiper"
                          breakpoints={{
                            640: {
                              slidesPerView: 2,
                            },
                            768: {
                              slidesPerView: 3,
                            },
                            1024: {
                              slidesPerView: 4,
                            },
                          }}
                          >
                            <SwiperSlide>

                            </SwiperSlide>


                      </Swiper> */}
                    </div>
                  </>
                </Container>
              ) : (
                <Container fluid>
                  <>
                  <div className="our-blogs-header spas-mobile-view-layout-header">
                    {/* {property1 && property1 != null ?
                    <>
                    <SubTitleText48>{serviceName} in {t("comingSoonText22")}</SubTitleText48>
                    {serviceDesc ? <p className="sub-pera-text">{serviceDesc} </p> : ''}

                    <div className="text-center">
                      <Button onClick={() => { push(PATH_AUTH?.services) }} className="gobackbtn">{t("spaPageText1")}</Button>
                    </div>
                    </> : <>

                    </>} */}

                  </div>
                  {noCityMessage && (
                    <p className="text-spa-lefts">{t("serviceNotAvailable")}</p>
                  )}
                  {!noCityMessage && noBookingsMessage && (
                    <p className="text-spa-lefts">{t("noBookingAvailable")}</p>
                  )}
                  <Row>
                    {spaDetails && spaDetails.length > 0 ? (
                    spaDetails.map((spaData, index) => (

                    <Col xs='12' sm='12' lg='6' xl='6' key={index}>
                      <ScottsdaleBoxWrapper className="spas-detailbox spa-updated-detail-box">
                        <div>
                          <div className="imagebox spa-image-box-desktop-view" onClick={() => { push(PATH_AUTH?.spas + "/" + spaData?.slug) }}>
                            <Image alt="sitback" src={spaData?.image ? spaData?.image : "/images/spas-img.png"} />
                            <div className="rating-mobile-view-display">
                              <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                              {spaData?.ratings} <span className="review-text">({spaData?.totalReviewCount} {t('reviews')})</span>
                            </div>
                            {spaData?.featured_spa === 1 && (
                              <div className="crown-icon-div">
                                <InlineSVG src={HomeCrownIcon_icon} className="global_laguage_icon" />
                              </div>
                            )}
                          </div>
                          <div className="spa-slider-image-mobile-view" onClick={() => { push(PATH_AUTH?.spas + "/" + spaData?.slug) }}>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={18}
                                loop={true}
                                className="mySwiper"
                                modules={[Pagination, Autoplay]}
                                pagination={{
                                  clickable: true, // This makes the dots clickable
                                  dynamicBullets: true, // This adds a dynamic effect to the dots
                                }}
                              >
                              {spaData?.galleryImageList?.map((image, imageIndex) => (
                                  <SwiperSlide key={imageIndex}>
                                    <div className="gallery-image-box-wrapper">
                                      <Image alt={`spa-image-${imageIndex}`} src={image || "/images/spas-img.png"} />
                                        <div className="rating-mobile-view-display">
                                          <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                                          {spaData?.ratings} <span className="review-text">({spaData?.totalReviewCount} {t('reviews')})</span>
                                        </div>
                                        {spaData?.featured_spa === 1 && (
                                          <div className="crown-icon-div">
                                            <InlineSVG src={HomeCrownIcon_icon} className="global_laguage_icon" />
                                          </div>
                                        )}
                                    </div>
                                  </SwiperSlide>
                                ))}

                            </Swiper>
                          </div>
                        </div>
                        <div className="scottsdale-detail">
                          <div>
                            <div className="scottsdale-header-wrapper mb-2">
                              <div className="title-text">
                                <div className="mobile-view-rating-block">
                                  <div className="spa-title-distance-text">
                                    <h4>
                                      {spaData?.username}
                                    </h4>
                                    <p>{spaData?.distance} mi</p>
                                  </div>
                                  {/* <>
                                    {spaData?.ratings > 0 ?
                                    <h6>
                                        <StarRatings
                                          rating={spaData?.ratings}
                                          starRatedColor="#ffb811"
                                          numberOfStars={5}
                                          name='rating'
                                        />
                                        {spaData?.ratings}
                                    </h6> : ''}
                                  </> */}
                                </div>
                                <div className="location-text">
                                  {/* <div>
                                  <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#29508699" fillRule="evenodd" d="M3.379 10.224 8 16l4.621-5.776A6.292 6.292 0 0 0 14 6.293V6A6 6 0 0 0 2 6v.293c0 1.429.486 2.815 1.379 3.93ZM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd"/></svg>
                                  </i>
                                  </div> */}
                                  <div className="location-icon-detail-text">
                                    <InlineSVG src={SpaLocationIcon_icon} className="global_laguage_icon" />
                                    <p className="spa-location-web-view">{spaData?.location}</p>
                                  </div>
                                  {/* <p className="spa-location-mobile-view">{spaData?.city +', '+ spaData?.state}</p> */}
                                  <h6 className="rating-detail-text">
                                    {spaData?.ratings > 0 ?
                                      <>
                                        {/* <StarRatings
                                          rating={spa?.ratings}
                                          starRatedColor="#ffb811"
                                          numberOfStars={5}
                                          name='rating'
                                        /> */}
                                        <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                                        {spaData?.ratings} <span className="review-text">({spaData?.totalReviewCount} {t('reviews')})</span>
                                      </> : ''}

                                    </h6>
                                    <div className="distance-mobile-text">
                                 <p className="text-left">{spaData?.distance} {t('miText')}</p>
                                 </div>
                                </div>
                                <p className="text-left mb-3 mb-xll-0">{spaData?.futuredesc ? '('+spaData?.futuredesc+')' : ''}</p>
                              </div>
                              <Button className="booknow book-now-btn-wrapper"  onClick={() => handleSelectedService(spaData)}>{t("bookNow")}</Button>
                            </div>
                            <div>
                              {/* <>
                                {spaData?.ratings > 0 ?
                                <h6>
                                    <StarRatings
                                      rating={spaData?.ratings}
                                      starRatedColor="#ffb811"
                                      numberOfStars={5}
                                      name='rating'
                                    />
                                    {spaData?.ratings}
                                </h6> : ''}
                              </> */}
                               {/* <h2>{spaData?.description}</h2> */}
                               <div className="days-slot-available-details">
                                  <ul>
                                    {spaData?.slotList && spaData?.slotList.length > 0 ? (
                                      spaData?.slotList.map((slotData, slotDataIndex) => {
                                          if (!slotData?.isShow) return null; // Skip if isShow is false or undefined

                                          let slotClass = "";
                                          if (slotData?.slot_title === "Afternoon") {
                                            slotClass = "afternoon-circle";
                                          } else if (slotData?.slot_title === "Evening") {
                                            slotClass = "evening-circle";
                                          }

                                        //console.log('Slot Data:', slotData); // Log slotData here
                                        return (
                                          <li key={slotDataIndex}>
                                          <Link href="javascript:void(0)" onClick={() => {
                                              handleRadioChange(slotData?.slot_title, spaData);
                                            }}>
                                            <div className="left-display-data">
                                              <span className={slotClass}></span>
                                              <p className="day-data">{slotData?.slot_title}</p>
                                            </div>
                                              {slotData?.slot_count > 0 ? (<p className="slot-data">{slotData?.slot_count > 10 ? '10+' : slotData?.slot_count} {t('slotsText')}</p>) : ''}
                                          </Link>
                                        </li>

                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </ul>
                                </div>
                               {/* <div className="checkbox-and-btn mobile-view-checkbox-and-btn">
                                <div className="checkbox-list-wrapper">
                                  {spaData?.slotList && spaData?.slotList.length > 0 ? (
                                        spaData?.slotList.map((slotData, slotDataIndex) => (
                                      <>
                                        <label className="checkbox-wrapper-div" key={slotDataIndex}>
                                          <input type="radio" name="radio"  value={slotData?.slot_title} onChange={(e) => { handleRadioChange(e,spaData)}} disabled={!slotData?.isShow}/>
                                          <input type="radio" name="radio"  value={slotData?.slot_title} disabled={!slotData?.isShow}/>
                                          <span className="checkmark slot-checkbox-wrapper">{slotData?.slot_title}
                                             {slotData?.slot_count && slotData?.slot_count != 0 ?
                                            <span className="available-text">({slotData?.slot_count} {t("available")})</span>
                                            : <></>}
                                          </span>
                                        </label>
                                        </>
                                      ))
                                    ) : (
                                      <></>
                                    )}
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="availble-services-wrapper">
                            <div className="service-title-div">
                              <h3>{t("availableServices")}</h3>
                              {spaData?.serviceList.length > 3 && (
                                <div className="grid-col flex1mobile">
                                  <button className="plus-more-btn" onClick={() => { push(PATH_AUTH?.spas + "/" + spaData?.slug) }}>+{spaData?.serviceList.length - 3} {t("More")}</button>
                                </div>
                              )}
                            </div>
                            <div className="booknow-and-btn-wrapper">
                              <div className="services-block">
                                {spaData?.serviceList && spaData?.serviceList.length > 0 ? (
                                  <>
                                    {spaData?.serviceList.slice(0, 3).map((serviceData, serviceDataIndex) => (
                                      <div className="grid-col" key={serviceDataIndex}>
                                        <div className="box-wrapper">
                                          <div className="service-image-text-div">
                                            <div className="iconbox">
                                              <Image
                                                isContainImg={true}
                                                alt="sitback"
                                                src={serviceData?.image ? serviceData?.image : "/images/Isolation_Mode.svg"}
                                              />
                                            </div>
                                            <p className="service-name">{serviceData?.name}</p>
                                          </div>
                                          <p className="service-price">${serviceData?.price}</p>
                                        </div>
                                      </div>
                                    ))}
                                    {/* {spaData?.serviceList.length > 4 && (
                                      <div className="grid-col flex1mobile">
                                        <button onClick={() => { push(PATH_AUTH?.spas + "/" + spaData?.slug) }}>+{spaData?.serviceList.length - 4} {t("More")}</button>
                                      </div>
                                    )} */}
                                  </>
                                ) : null}

                              </div>
                               {/* <Button className="booknow"  onClick={() => handleSelectedService(spaData)}>{t("bookNow")}</Button> */}
                              {/* <Button className="booknow" onClick={() => {window.location.href = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${spaData?.slug}`}}>{t("bookNow")}</Button> */}
                            </div>
                            <div className="mobile-view-services-block">
                              <div className="services-slider">
                                <Swiper
                                  slidesPerView={1.3}
                                  spaceBetween={10}
                                  loop={true}
                                  pagination={true}
                                  // modules={[Pagination,Autoplay]}
                                  className="mySwiper"
                                  breakpoints={{
                                    480: {
                                      slidesPerView: 1.3,
                                    },
                                  }}
                                  >

                                  {spaData?.serviceList && spaData?.serviceList.length > 0 ? (
                                  <>
                                    {spaData?.serviceList.map((serviceData, serviceDataIndex) => (
                                     <SwiperSlide key={serviceDataIndex}>
                                    <div className="box-wrapper" >
                                      <div className="clearfix">
                                        <div className="iconbox">
                                          <Image
                                            isContainImg={true}
                                            alt="sitback"
                                            src={serviceData?.image ? serviceData?.image : "/images/Isolation_Mode.svg"}
                                          />
                                        </div>
                                      </div>
                                      <div className="mobile-service-div">
                                        <p className="service-name-text">{serviceData?.name}</p>
                                        <p>${serviceData?.price}</p>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                    ))}

                                  </>
                                ) : null}

                                </Swiper>
                              </div>
                              <div className="text-center">
                                <Button className="booknow booknow-btn-mobile-view"  onClick={() => handleSelectedService(spaData)}>{t("bookNow")}</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScottsdaleBoxWrapper>
                    </Col>
                    ))
                  ) : (
                    <div className="no-blogs-message nodata-available-text">
                      <SubTitleText18 className="text-center">
                        {t("spaPageText4")}
                      </SubTitleText18>
                    </div>
                  )}
                  </Row>
                  </>
                  {spaDetails?.length > 0 ? (
                    <>
                      {/* Pagination */}
                      <div className="pagination-footer-wrapper">
                          {spaDetails?.length > 0 && (
                              <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                pageCount={totalPages}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                                disabledClassName={"disabled"}
                                selected={currentPage - 1} // Ensure it's zero-indexed
                                forcePage={currentPage - 1} // Sync the selected page directly with state
                                renderOnZeroPageCount={null}
                              />
                            )}
                      </div>{" "}
                    </>
                  ) : (
                    ""
                  )}
                  <WhyPeopleChooseSectionComponent cityName={cityName} isDynamic={true} />
                  <TopReviewSpasNearComponent
                    reviews={myCurrentReviews || []}
                    loading={loading}
                    onSeeAllReviews={() => {
                      if (activeChips.length > 0 && activeChips.some(chip => chip.key === 'city')) {
                        dispatch(mySpaLocationPageSelectedCity(selectedCityOption?.value));
                      } else {
                        dispatch(mySpaLocationPageSelectedCity(params?.slug));
                      }

                      push(PATH_AUTH?.reviews);
                    }}
                  />
                </Container>
              )}
            </div>
          </div>
        </SpasNearLayoutWrapper>
      </MainLayoutWrapper>
      <div className="sitback-spa-mobile-view-btn-wrapper">
        <button className="filter-btn" onClick={() => setShow(true)}>
          <i>
            <Image isContainImg={true} alt="sitback" src="/images/filter-without-bg-icon.svg"/>
          </i>
        </button>
      </div>
      {showHeader ? <></> : <BlogPath />}
       <HomeFooter/>
       <Modal
              show={show}
              onHide={() => handleClose()}
              aria-labelledby="example-modal-sizes-title-lg"
              centered className="sitback-scheduler-modal-wrapper header-layout-change-wrapper sitback-mobile-view-accordion-modal"
            >
              <Modal.Header closeButton className="red-close-icon">
                <h4 className="modal-title-text">
                  <i className="filter-icon-title-wrapper">
                    <Image alt="sitback" src="/images/filter-icon-without-bg.svg"/>
                  </i>
                  {t("filtersText")}
                </h4>
                <div className="filter-btn-div">
                  <Button className="apply-filter-btn-wrapper" onClick={() => handleApplyFilters()}>{t('applyFilter')}</Button>
                </div>
              </Modal.Header>
              <Modal.Body>
                 <div className="spas-layout-change-wrapper">
                  <div className="filter-sidebar-wrapper">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <InlineSVG src={PriceRangeSpaIcon_icon} className="global_laguage_icon" />
                          {t("priceRange")}
                        </Accordion.Header>
                        <Accordion.Body>
                          <FormGroup className="price-range-div">
                            <RangeSlider
                              min={0}
                              max={2000} // Adjust max value as needed
                              value={tempRange}
                              onInput={handleRangeChange}
                            />
                            <div className="prise-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p>${tempRange[0]}</p>
                              <p>${tempRange[1]}</p>
                            </div>
                          </FormGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <InlineSVG src={ServiceInput_icon} className="global_laguage_icon" />
                          {t("serviceType")}
                        </Accordion.Header>
                        <Accordion.Body>
                            <FormGroup className="service-select-div">
                              <ReactSelect
                                value={selectedServiceData}
                                options={serviceListdata}
                                isClearable
                                className="sitback-select2-container"
                                classNamePrefix="sitback-select-option"
                                placeholder={t("What would you like to request?")}
                                onChange={handleServiceSelect} // Capture service selection
                                // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                                isDisabled={!!property1}
                              />
                            </FormGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <InlineSVG src={CitySelectIcon_icon} className="global_laguage_icon" />
                            {t('selectCityText')}
                        </Accordion.Header>
                        <Accordion.Body>
                          <FormGroup className="mb-2">
                            <ReactSelect
                              options={cityDropDownData}
                              value={selectedCityOption}
                              onChange={handleCityChange}
                              placeholder={t("selectCityText")}
                              isClearable
                              className="sitback-select2-container"
                              classNamePrefix="sitback-select-option"
                            />
                            </FormGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <InlineSVG src={SmallCalendarIcon_icon} className="global_laguage_icon" />
                          {t("dateAvailable")}
                        </Accordion.Header>
                        <Accordion.Body>
                          <FormGroup className="date-available-input">
                                  <Input
                                  value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
                                  onClick={() => setIsDayPickerVisible(true)}
                                  className="datepicker"
                                  readOnly
                                  />
                                  {isDayPickerVisible && (
                                    <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
                                      <Controller
                                        name="date"
                                        control={control}
                                        render={() => (
                                        <DayPicker
                                            mode="single"
                                            captionLayout="dropdown"
                                            fromYear={new Date().getFullYear()}
                                            toYear={new Date().getFullYear() + 1}
                                            selected={selectedDate ?  selectedDate : new Date()}
                                            month={currentMonth}
                                            onSelect={(date) => handleDateSelect(date)}
                                            onMonthChange={(month) => setCurrentMonth(month)}
                                            disabled={{
                                              before: new Date(),
                                            }}
                                            styles={{
                                              dropdown: {
                                                backgroundColor: "#ffffff",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "10px",
                                                overflow: "hidden",
                                                minWidth: "70px",
                                                color: "#295086",
                                              },
                                            }}
                                          />
                                        )}
                                      />
                                    </div>
                                  )}

                                  </FormGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <InlineSVG src={TimeCircle_icon} className="global_laguage_icon" />
                          {t("timeAvailable")}
                        </Accordion.Header>
                        <Accordion.Body>
                           <FormGroup className="time-select-div">
                                    <ReactSelect
                                    options={options}
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    placeholder={t("selecttime")}
                                    isClearable
                                    className="sitback-select2-container"
                                    classNamePrefix="sitback-select-option"
                                  />

                                  </FormGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <div className="clear-filter-btn clear-filter-mobile-view">
                      <a className="show-result-link" href="javascript:void(0);" onClick={() => handleApplyFilters()}>
                      {t("showResults")}
                      </a>
                      <p onClick={() => clearAll()}>{t("clearAll")}</p>
                    </div>
                  </div>
                </div>

              </Modal.Body>
            </Modal>
    </>
  );
}

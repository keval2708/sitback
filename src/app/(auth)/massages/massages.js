"use client";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, FormGroup,Row } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"
import reactDom from "react-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import InlineSVG from "svg-inline-react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeFooter from "@/components/homefooter/page";
import HomeHeader from "@/components/homeheader/page";
import { useToaster } from "@/hooks";
import { handleStep, manageSchedulerResponse } from "@/redux/quickBooking";
import { myHomePageSelectedCity, myHomePageSelectedDate, myHomePageSelectedService, mySelectedCity, mySelectedDate, mySelectedServiceList, mySelectedSlot } from "@/redux/service";
import { PATH_AUTH, PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, Input, Label, SubTitleText18 } from "@/styles/global/main.style";
import {
  BusinessRevampUpdatedWrapper,
  ComingSoonLayoutWrapper,
  MarketPlaceDisplayDiv,
  ScottsdaleBoxWrapper,
  ScottsdaleSectionWrapper,
} from "@/styles/pages/comingsoon.style";
import { AddressPinIcon_icon,CitySelectIcon_icon,DateInput_icon,HomeCrownIcon_icon,RankingStar_icon, SelectDropDownIcon_icon, SelectedDropDownIcon_icon, ServiceInput_icon, SwiperArrow_icon, } from "@/styles/svgs";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axiosApiCall from "@/utils/axios";
import 'react-loading-skeleton/dist/skeleton.css'
import { TOAST_TYPES } from "@/utils/constants";


export default function Massages() {

 // Form Hooks
 const methods = useForm();

 const {
   setValue,
 } = methods;


  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation();

  //state
  const [loading, setLoading] = useState(false);
  const [loadingSpa, setLoadingSpa] = useState(false);
  const [allspa, setAllSpa] = useState([]);
  const [mostSearchedServiceSpa, setMostSearchedServiceSpa] = useState([]);
  const [featuredSpa, setFeaturedSpa] = useState([]);
  // const [spaDetails, setSpaDetails] = useState();
  // const [show, setShow] = useState(false);
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false);
  const [isDayPickerVisibles, setIsDayPickerVisibles] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
  const [isCityPickerVisibles, setIsCityPickerVisibles] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("MM-DD-yyyy"));
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCity, setSelectedCity] = useState();
  const [cityDropDownData, setCityDropDownData] = useState([]);
  const [filteredCityDropDownData, setFilteredCityDropDownData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const dayPickerRefs = useRef(null);
  const cityPickerRefs = useRef(null);
  const [serviceListdata, setServiceListdata] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);
  const cityInputRef = useRef(null);
  const portalRef = useRef(document.createElement("div"));
  const cityRef = useRef(document.createElement("div"));
  const [location, setLocation] = useState({ city: null, state: null, lat: null, lng: null });
  const [cityInputValue, setCityInputValue] = useState(null);


  useEffect(() => {
    const portalNode = portalRef.current;
    const cityNode = cityRef.current;

    if (!document.body.contains(portalNode)) {
      document.body.appendChild(portalNode);
    }
    if (!document.body.contains(cityNode)) {
      document.body.appendChild(cityNode);
    }

    return () => {
      if (document.body.contains(portalNode)) {
        document.body.removeChild(portalNode);
      }
      if (document.body.contains(cityNode)) {
        document.body.removeChild(cityNode);
      }
    };


  }, []);


  // const handleClose = () => {
  //   dispatch(mySelectedSlot(null))
  //   dispatch(mySelectedDate(null))
  //   setSpaDetails()
  //   setShow(false);
  // }
  // const handleRedirect = () => {
  //   // handleLoginTab
  //   //dispatch(handleLoginTab(key));
  //   push(PATH_AUTH?.spas);
  // };

  const handleDateSelect = (date) => {
    if(date) {
    setSelectedDate(moment(date)?.format("MM-DD-YYYY"));
    setCurrentMonth(date);
    setValue("date", date);

    }
    setIsDayPickerVisible(false);
    setIsDayPickerVisibles(false);

  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityInputValue(city?.label)
    setIsCityPickerVisible(false)
    setIsCityPickerVisibles(false)

  };

  const handleLogin = () => {
    push(PATH_AUTH?.signUp);
  };

  const getFeaturedSpaList = async () => {
       if(location?.lat) {
        let param = {};

        if (selectedCity?.lat) {
          param.lat = selectedCity?.lat;
          param.log = selectedCity?.log;
          param.city = selectedCity?.city;
          param.state = selectedCity?.state;
          param.date = selectedDate;
        } else {
          param.userlat = location?.lat;
          param.userlog = location?.lng;
          param.usercity = location?.city;
          param.userstate = location?.state;
          param.date = selectedDate;
        }


        setLoading(true);
        try {
          const res = await axiosApiCall.post(API_ROUTER?.GET_FEATURED_SPA_LIST,param);
          if (!res?.status) {
            // return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            // console.log("res",res?.data?.data?.length);
            const shuffledData = res?.data?.data
            // ?.map((item) => ({ item, sort: Math.random() }))
            // .sort((a, b) => a.sort - b.sort)
            // .map(({ item }) => item)
            setFeaturedSpa(shuffledData);
          }
        } catch (error) {
          // console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);

        }
      }
    }

  const fetchSpaData = async () => {

    if(location?.lat) {
      let param = {};

      if (selectedCity?.lat) {
        param.lat = selectedCity?.lat;
        param.log = selectedCity?.log;
        param.city = selectedCity?.city;
        param.state = selectedCity?.state;
        param.date = selectedDate;
      } else {
        param.userlat = location?.lat;
        param.userlog = location?.lng;
        param.usercity = location?.city;
        param.userstate = location?.state;
        param.date = selectedDate;
      }


      setLoading(true);
      try {
        const res = await axiosApiCall.post(API_ROUTER?.GET_ALL_SPA,param);
        if (!res?.status) {
          // return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          // console.log("res",res?.data?.data?.length);
          const shuffledData = res?.data?.data
          // ?.map((item) => ({ item, sort: Math.random() }))
          // .sort((a, b) => a.sort - b.sort)
          // .map(({ item }) => item)
          setAllSpa(shuffledData);
        }
      } catch (error) {
        // console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);

      }
    }
  };

  const getMostSearchedService = async () => {

      setLoadingSpa(true);
      try {
       const  param = {
          date: selectedDate,
          userlat: location?.lat,
          userlog: location?.lng,
          usercity: location?.city,
          userstate: location?.state,
        };
        const res = await axiosApiCall.post(API_ROUTER?.GET_MOST_SEARCHED_SERVICE,param);
        //  console.log("111111",res);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          // console.log("res",res?.data?.data?.length);
          const shuffledData = res?.data?.data
          ?.map((item) => ({ item, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ item }) => item)
          setMostSearchedServiceSpa(shuffledData);
        }
      } catch (error) {
        // console.error("Error fetching blogs:", error);
      } finally {
        setLoadingSpa(false);

      }
  };

  useEffect(() => {
    getServicess();
    fetchLatLngFromGoogles();
    setMostSearchedServiceSpa([])
    setAllSpa([])
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedService(null))
    dispatch(myHomePageSelectedCity(null))
    dispatch(mySelectedServiceList(null));
    dispatch(mySelectedSlot(null))
    dispatch(mySelectedDate(null))
    dispatch(manageSchedulerResponse(null));
    dispatch(handleStep(1))
  }, []);

  // const generateIframe = useMemo(() => {
  //   dispatch(cmsSelectSpa(true));
  //   let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${sign(
  //     spaDetails,
  //     process.env.SECRET_KEY
  //   )}`;
  //   return link; // Return only the link, not the entire anchor element
  // }, [spaDetails]);

  const handleRadioChange = (data) => {
    // console.log("data",data);
    // return


    // if(e.target.value != null) {
    //   dispatch(mySelectedSlot(e.target.value))
    // }
    if(data?.futuredate && data?.futuredate != '') {
      dispatch(mySelectedDate(moment(data?.futuredate)?.format("MM-DD-YYYY")))
    }
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${data?.slug}`;
    window.location.href = link;

  }

  const handleRadioChanges = (e,data) => {

    // console.log("e",e);
    // console.log("data",data);

    if(e != null) {
      dispatch(mySelectedSlot(e))
    }
    if(data?.futuredate && data?.futuredate != '') {
      dispatch(mySelectedDate(moment(data?.futuredate)?.format("MM-DD-YYYY")))
    }
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${data?.slug}`;
    window.location.href = link;

  }

  const getServicess = async () => {
  try {
    const res = await axiosApiCall.get(API_ROUTER?.GET_ALL_SERVICES_LIST_HOME);
    if (res?.data?.data) {
      setServiceListdata(
        res?.data?.data.map((service) => ({
          value: service.slug,
          label: service.name,
        }))
      );
    } else {
      // console.error("No services data received");
    }
  } catch (error) {
    // console.error("Error fetching services:", error);
  }
  };

  const handleSearch = async () => {
    // console.log("selectedService",selectedService);

    if(selectedCity) {
      dispatch(myHomePageSelectedService(selectedService))
      dispatch(myHomePageSelectedCity(selectedCity))
      dispatch(myHomePageSelectedDate(selectedDate))
      if(selectedService) {
        push(PATH_AUTH?.services+ "/" + selectedService?.value+ "/" +selectedCity?.value);
        return
      }
      push(PATH_AUTH?.spasLocation+ "/" + selectedCity?.value);
      return
    } else if(filteredCityDropDownData.length > 0 ) {
      setSelectedCity(filteredCityDropDownData[0]);
      setCityInputValue(filteredCityDropDownData[0].label)
      dispatch(myHomePageSelectedService(selectedService))
      dispatch(myHomePageSelectedCity(filteredCityDropDownData[0]))
      dispatch(myHomePageSelectedDate(selectedDate))
       if(selectedService) {
        push(PATH_AUTH?.services+ "/" + selectedService?.value+ "/" + filteredCityDropDownData[0]?.value);
        return
      }
      push(PATH_AUTH?.spasLocation+ "/" + filteredCityDropDownData[0]?.value);
      return
    } else if (selectedCity == null && cityInputValue.trim() !== '') {
      dispatch(mySelectedCity(cityInputValue))
      push(PATH_AUTH?.comingSoonTo);
      return
    }


  }


  const handleClickOutside = (event) => {
    if (portalRef.current && !portalRef.current.contains(event.target)) {
      setIsDayPickerVisible(false);
    }
  };

  useEffect(() => {
    if (isDayPickerVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDayPickerVisible]);

  const handleClickOutsides = (event) => {
    if (cityRef.current && !cityRef.current.contains(event.target) && !event.target.closest("svg")) {
      setIsCityPickerVisible(false);
    }
  };

  useEffect(() => {
    if (isCityPickerVisible) {
      document.addEventListener("mousedown", handleClickOutsides);
    } else {
      document.removeEventListener("mousedown", handleClickOutsides);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsides);
    };
  }, [isCityPickerVisible]);

   useEffect(() => {
      const handleClickOutside = (event) => {
        if (dayPickerRefs.current && !dayPickerRefs.current.contains(event.target)) {
          setIsDayPickerVisibles(false); // Close the datepicker when clicking outside
        }
      };

      if (isDayPickerVisibles) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside); // Cleanup
      };
  }, [isDayPickerVisibles]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityPickerRefs.current && !cityPickerRefs.current.contains(event.target) && !event.target.closest("svg")) {
        setIsCityPickerVisibles(false); // Close the datepicker when clicking outside
      }
    };

    if (isCityPickerVisibles) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
}, [isCityPickerVisibles]);

  const showDatePicker = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 14,
      });
    }
    setIsDayPickerVisible(true);
  };

  const showCityPicker = () => {
    if (cityInputRef.current) {
      const rect = cityInputRef.current.getBoundingClientRect();
      setPositions({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 0,
      });
    }
    setIsCityPickerVisible(true);
  };

  const hideCityPicker = () => {
    setIsCityPickerVisible(false);
    setIsCityPickerVisibles(false);
    setCityInputValue(null)
    setSelectedCity(null)
  }

  const hideCityPickers = () => {

    setIsCityPickerVisibles(false);
    setCityInputValue(null)
    setSelectedCity(null)
  }

  const showDatePickers = () => {
    setIsDayPickerVisibles(true);
  };

  const showCityPickers = () => {
    setIsCityPickerVisibles(true);
  };

  const handleServiceTypeClick = () => {
   const targetElement = document.getElementById("comingSoonText2");
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });
    }
  };

  const handleServiceTypeClicks = () => {
   const targetElement = document.getElementById("smooThScroll");
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });
    }
  };

  const someFunctioncall = () => {
  setIsDayPickerVisibles(false);
  setIsCityPickerVisibles(false)
  handleServiceTypeClicks();
  }

  const getSpaLocation = async () => {

    const  param = {
      userlat: location?.lat,
      userlog: location?.lng,
    };

    try {
    // setCityLoading(true);
    const cityData = await axiosApiCall.post(API_ROUTER?.GET_CITY_LIST,param);

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

  useEffect(() => {
    setLoading(true);
    if(location?.lat){
      // console.log("location",location);
      getSpaLocation()
      getMostSearchedService()
      getFeaturedSpaList()
      fetchSpaData()
    }
  }, [location]);

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

  const cityInputChange = async (data) => {
    if(!data || data == null){
      setSelectedCity(null)
    }
    setCityInputValue(data)
  }

  useEffect(() => {
    if (!cityInputValue) {
      if(cityDropDownData) {
        setFilteredCityDropDownData(cityDropDownData);
      }

    } else {
      const filtered = cityDropDownData.filter(city =>
        city.label.toLowerCase().includes(cityInputValue.toLowerCase())
      );

      if(filtered) {
        setFilteredCityDropDownData(filtered);
      } else {
        setFilteredCityDropDownData([]);
      }

    }
  }, [cityInputValue, cityDropDownData]);

   useEffect(() => {
    // console.log("88888",selectedCity);
    if(selectedCity?.lat || selectedCity == null){
      // console.log("2112");
       setLoading(true);
      // console.log("location",location);
      getFeaturedSpaList()
      fetchSpaData()
    }
  }, [selectedCity]);

   const formatResponseTime = (minutes) => {
    minutes = Math.round(minutes);

    if (minutes < 1) {
      return 'less than 1 minute'; // If it's less than a minute, you can display it as such.
    }
    const minutesInSecond = minutes * 60;

    if (minutesInSecond < 60) {
      return `${minutesInSecond} sec`;  // Less than 1 hour, show in seconds
    } else if (minutes < 60) {
      return `${minutes} min`;  // Less than 60 minutes, show in minutes
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;  // Less than 24 hours, show in hours
    } else if (minutes >= 1440) {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''}`;  // 24 hours and above, show in days
    }
  };

  // console.log("cityInputValue",cityInputValue);
  // console.log("selectedCity",selectedCity);
  return (
    <>
    <HomeHeader />
      <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-landing-page-revamp-banner-section">
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
            <div className="banner-content-wrapper">
              <div className="banner-top-title-div">
                <Container>
                  <h1>Book the Best Massages Near You...Instantly</h1>
                  <p>{t('comingSoonTextMsg2')}</p>
                </Container>
              </div>
            </div>
          </div>
          <div className="sitback-filter-main-div">
              <Form id="comingSoonText2" className="filter-inputbox-wrapper sitback-landing-filter-desktop-view">
                <FormGroup className="filterbox-input">
                  <Label>
                    <InlineSVG src={CitySelectIcon_icon} className="global_laguage_icon city-icon-wrapper" />
                    {t("selectCityText")}
                  </Label>
                  <div className="sit-select-city-select-div">
                    <div className="input-select-wrapper">
                      <input placeholder={t("selectCityText")} value={cityInputValue || ""} ref={cityInputRef}  onClick={() => { showCityPicker(); handleServiceTypeClick(); }} onChange={(event) => cityInputChange(event.target.value)}/>

                          {isCityPickerVisible ? <>
                            <InlineSVG onClick={() => { hideCityPicker()}} src={SelectDropDownIcon_icon} className="global_laguage_icon" /></> : <>
                            <InlineSVG onClick={() => { showCityPicker(); handleServiceTypeClick(); }} src={SelectedDropDownIcon_icon} className="global_laguage_icon" /> </>}
                    </div>
                    {isCityPickerVisible && filteredCityDropDownData.length > 0 &&
                    reactDom.createPortal(
                    <div className="sit-select-city-options-wrapper" style={{
                      position: "absolute",
                      top: positions.top,
                      left: positions.left,
                      zIndex: 9999,
                      //boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
                    }}>
                      <ul>
                    {filteredCityDropDownData.map((cityOption, idx) => (
                              <li key={idx} onClick={() => handleCitySelect(cityOption)}>
                                <a href="javascript:void(0);">
                                  {cityOption.label}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>,
                    cityRef.current
                  )}
                  </div>
                </FormGroup>
                <FormGroup className="filterbox-input service-input-wrapper">
                  <Label>
                    <InlineSVG src={ServiceInput_icon} className="global_laguage_icon" />
                    {t("serviceType")}
                  </Label>
                  <ReactSelect
                    onMenuOpen={() => { handleServiceTypeClick(); }}
                    options={serviceListdata}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    placeholder="What would you like to request?"
                    onChange={handleServiceSelect} // Capture service selection
                    // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                    menuPortalTarget={document.body} // Ensure this is a valid DOM element
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </FormGroup>
                <FormGroup className="filterbox-input datepicker-box">
                  <Label>
                    <InlineSVG src={DateInput_icon} className="global_laguage_icon" />
                    {t("date")}
                  </Label>
                  <Input
                    ref={inputRef}
                    value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
                     onClick={() => { showDatePicker(); handleServiceTypeClick(); }}
                     readOnly
                    className="datepicker"

                  />
                  {isDayPickerVisible &&
                    reactDom.createPortal(

                      <div
                        style={{
                          position: "absolute",
                          top: position.top,
                          left: position.left,
                          zIndex: 9999,
                          //boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
                        }}
                        className="calendarv2-wrapper-div"
                      >
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
                        </div>,
                        portalRef.current
                      )}

                </FormGroup>
                <div className="filter-btn">
                  <Button type="button" variant="primary" onClick={handleSearch} className="font-weight-seven-hundred">
                   {t("search")}
                  </Button>
                </div>
              </Form>

          </div>
        </section>
      </ComingSoonLayoutWrapper>
      <MarketPlaceDisplayDiv>
        <div className="marketplace-main-div">
          <div className="marketplace-desktop-view">
            <Row>
              <Col md={6} lg={4}>
                <div className="marketplace-box-div">
                  <div className="clearfix">
                    <div className="image-div">
                      <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-1.svg" />
                    </div>
                  </div>
                  <div className="marketplace-detail-div">
                    <h4>{t('comingSoonSectionText')} </h4>
                    <p>{t('comingSoonSectionDescMsg')}</p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="marketplace-box-div relaxation-box">
                  <div className="clearfix">
                    <div className="image-div">
                      <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-2.svg" />
                    </div>
                  </div>
                  <div className="marketplace-detail-div">
                    <h4>{t('comingSoonSectionTextOne')}</h4>
                    <p>{t('comingSoonSectionDescOneMsg')}</p>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="marketplace-box-div">
                  <div className="clearfix">
                    <div className="image-div">
                      <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-3.svg" />
                    </div>
                  </div>
                  <div className="marketplace-detail-div">
                    <h4>{t('comingSoonSectionTextTwo')}</h4>
                    <p>{t('comingSoonSectionDescTwo')}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="sitback-marketplace-mobile-div">
            <Swiper
                slidesPerView={1}
                spaceBetween={18}
                navigation={false}
                className="mySwiper"
                >
                <SwiperSlide>
                  <div className="marketplace-box-div">
                    <div className="clearfix">
                      <div className="image-div">
                        <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-1.svg" />
                      </div>
                    </div>
                    <div className="marketplace-detail-div">
                      <h4>{t('comingSoonSectionText')}</h4>
                      <p>{t('comingSoonSectionDescMsg')}</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="marketplace-box-div relaxation-box">
                  <div className="clearfix">
                    <div className="image-div">
                      <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-2.svg" />
                    </div>
                  </div>
                  <div className="marketplace-detail-div">
                    <h4>{t('comingSoonSectionTextOne')}</h4>
                    <p>{t('comingSoonSectionDescOneMsg')}</p>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="marketplace-box-div">
                  <div className="clearfix">
                    <div className="image-div">
                      <Image isContainImg={true} alt="sitback" src="/images/marketplace-image-3.svg" />
                    </div>
                  </div>
                  <div className="marketplace-detail-div">
                    <h4>{t('comingSoonSectionTextTwo')}</h4>
                    <p>{t('comingSoonSectionDescTwo')}</p>
                  </div>
                </div>
                </SwiperSlide>
              </Swiper>
          </div>
        </div>
      </MarketPlaceDisplayDiv>
      <ScottsdaleSectionWrapper className="spas-available-section spas-mobile-view-display-section">
         <Container>
           {featuredSpa && featuredSpa.length > 0 ? (
                     <div className="spas-block-wrapper">
                       <div className="spa-title-arrow-div">
                         <h4 className="spas-name-title-text">
                           <div className="clearfix">
                             <div className="title-text-image-div">
                               <Image isContainImg={true} alt="sitback" src="/images/featured-star-title-icon.svg" />
                             </div>
                           </div>
                           Featured Massages Near You
                         </h4>
                         <div className="center-line"></div>
                         {featuredSpa && featuredSpa.length > 4 ? (
                         <div className="swiper-arrows-div">
                           <Link href="/" className="featured-image-swiper-button-prev">
                             <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                           </Link>
                           <Link href="/" className="next-arrow featured-image-swiper-button-next">
                             <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                           </Link>
                         </div>
                         ) : ''}
                       </div>
                       {loading ? (
                       <>
                       <div className="">
                         <Swiper
                           slidesPerView={1}
                           spaceBetween={18}
                           navigation={false}
                           className="mySwiper"
                           breakpoints={{
                             640: {
                               slidesPerView: 1.5,
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
                             <ScottsdaleBoxWrapper className="swiper-loader">
                                 <div className="imagebox">
                                   <Skeleton count={1} />
                               </div>
                               <div className="scottsdale-detail">
                               <Skeleton count={5} />
                               </div>
                             </ScottsdaleBoxWrapper>
                           </SwiperSlide>
                           <SwiperSlide>
                               <ScottsdaleBoxWrapper className="swiper-loader">
                                 <div className="imagebox">
                                   <Skeleton count={1} />
                               </div>
                               <div className="scottsdale-detail">
                               <Skeleton count={5} />
                               </div>
                             </ScottsdaleBoxWrapper>
                           </SwiperSlide>
                           <SwiperSlide>
                               <ScottsdaleBoxWrapper className="swiper-loader">
                                 <div className="imagebox">
                                   <Skeleton count={1} />
                               </div>
                               <div className="scottsdale-detail">
                               <Skeleton count={5} />
                               </div>
                             </ScottsdaleBoxWrapper>
                           </SwiperSlide>
                           <SwiperSlide>
                               <ScottsdaleBoxWrapper className="swiper-loader">
                                 <div className="imagebox">
                                   <Skeleton count={1} />
                               </div>
                               <div className="scottsdale-detail">
                               <Skeleton count={5} />
                               </div>
                             </ScottsdaleBoxWrapper>
                           </SwiperSlide>

                         </Swiper>
                       </div>
                         {/* <Loader loading={loading} /> */}
                       </>
                       ) : (
                       <>
                         <Swiper
                           slidesPerView={1.2}
                           spaceBetween={18}
                           loop={true}
                           // navigation={true}
                           navigation={{
                             nextEl: ".featured-image-swiper-button-next",
                             prevEl: ".featured-image-swiper-button-prev",
                             disabledClass: "swiper-button-disabled"
                           }}
                           modules={[Pagination, Navigation,Autoplay]}
                           className="mySwiper"
                           // autoplay={{
                           //   delay: 2500,
                           //   disableOnInteraction: false,
                           // }}
                           breakpoints={{
                             640: {
                               slidesPerView: 1.5,
                             },
                             768: {
                               slidesPerView: 3,
                             },
                             1024: {
                               slidesPerView: 4,
                             },
                           }}
                           >
                             {featuredSpa && featuredSpa.length > 0 ? (
                               featuredSpa.map((spa, index) => (
                                 <>
                                 <SwiperSlide key={index}>
                                   <ScottsdaleBoxWrapper className="box-wrapperdiv sitback-updated-slide-box-wrapper">
                                     <div className="imagebox" onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>
                                       <Image alt="sitback" src={spa?.image ? spa?.image : "/images/spas-img.png"} />
                                       {spa?.featured_spa === 1 && (
                                         <div className="crown-icon-div">
                                           <InlineSVG src={HomeCrownIcon_icon} className="global_laguage_icon" />
                                         </div>
                                       )}
                                     </div>
                                     <div className="scottsdale-detail">
                                       <div>
                                         <h4>{spa?.username}</h4>
                                         <div className="sitback-spa-address-distance-text-div">
                                           <p className="address-image-text">
                                             <InlineSVG src={AddressPinIcon_icon} className="global_laguage_icon" />
                                             {spa?.location}
                                           </p>
                                           <p className="spa-distance-text">{spa?.distance} mi</p>
                                         </div>
                                         <div>
                                           <h6>
                                           {spa?.ratings > 0 ?
                                           <>
                                             {/* <StarRatings
                                               rating={spa?.ratings}
                                               starRatedColor="#ffb811"
                                               numberOfStars={5}
                                               name='rating'
                                             /> */}
                                             <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                                             {spa?.ratings} <span className="review-text">({spa?.totalReviewCount} {t('reviews')})</span>
                                           </> : ''}

                                         </h6>
                                         {/* <p>{spa?.distance} mi</p> */}
                                         </div>



                                       </div>
                                       <div className="checkbox-and-btn">
                                           <p>{spa?.futuredesc ? spa?.futuredesc : "Available Today"}</p>
                                           <div className="days-slot-available-details">
                                             <ul>
                                               {spa?.slotList && spa?.slotList.length > 0 ? (
                                                 spa?.slotList.map((slotData, slotDataIndex) => {
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
                                                         handleRadioChanges(slotData?.slot_title, spa);
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
                                          <div className="avg-response-time-div">
                                            {spa?.avg_response_time_minutes ? <p>Avg. Response Time : {formatResponseTime(spa?.avg_response_time_minutes)}</p> : ''}
                                          </div>
                                         <Button className="book-now-btn" onClick={() => { handleRadioChange(spa)}}>{t('bookNow')}</Button>
                                         {/* <Button className="book-now-btn search-btn">Search</Button> */}
                                       </div>
                                     </div>
                                   </ScottsdaleBoxWrapper>
                                 </SwiperSlide>
                                 </>

                               ))
                             ) : (
                               <div className="no-blogs-message">
                                 <SubTitleText18 className="text-center">
                                   {t("comingSoonText23")}
                                 </SubTitleText18>
                               </div>
                             )}
                         </Swiper>
                         {/* <div className="view-spas-footer">
                           <Button className="font-weight-seven-hundred" onClick={() => { push(PATH_AUTH?.spas) }}> {t("comingSoonText25")}</Button>
                         </div> */}
                       </>
                       )}
                     </div>
                     ) : ('')}
          <div className="spas-block-wrapper">
            <div className="spa-title-arrow-div">
              <h4 className="spas-name-title-text">
                <div className="clearfix">
                  <div className="title-text-image-div">
                    <Image isContainImg={true} alt="sitback" src="/images/spa-map-pin-icon.svg" />
                  </div>
                </div>
                Massages Available Near You
              </h4>
              <div className="center-line"></div>
              <div className="swiper-arrows-div">
                <Link href="/" className="image-swiper-button-prev">
                  <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                </Link>
                <Link href="/" className="next-arrow image-swiper-button-next">
                  <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                </Link>
              </div>
            </div>
            {loading ? (
            <>
            <div className="">
              <Swiper
                slidesPerView={1}
                spaceBetween={18}
                navigation={false}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
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
                  <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>

              </Swiper>
            </div>
              {/* <Loader loading={loading} /> */}
            </>
            ) : (
            <>
              <Swiper
                slidesPerView={1.2}
                spaceBetween={18}
                loop={true}
                // navigation={true}
                navigation={{
                  nextEl: ".image-swiper-button-next",
                  prevEl: ".image-swiper-button-prev",
                  disabledClass: "swiper-button-disabled"
                }}
                modules={[Pagination, Navigation,Autoplay]}
                className="mySwiper"
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                >
                  {allspa && allspa.length > 0 ? (
                    allspa.map((spa, index) => (
                      <>
                      <SwiperSlide key={index}>
                        <ScottsdaleBoxWrapper className="box-wrapperdiv sitback-updated-slide-box-wrapper">
                          <div className="imagebox" onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>
                            <Image alt="sitback" src={spa?.image ? spa?.image : "/images/spas-img.png"} />
                              {spa?.featured_spa === 1 && (
                                <div className="crown-icon-div">
                                  <InlineSVG src={HomeCrownIcon_icon} className="global_laguage_icon" />
                                </div>
                              )}
                          </div>
                          <div className="scottsdale-detail">
                            <div>
                              <h4>{spa?.username}</h4>
                              <div className="sitback-spa-address-distance-text-div">
                                <p className="address-image-text">
                                  <InlineSVG src={AddressPinIcon_icon} className="global_laguage_icon" />
                                  {spa?.location}
                                </p>
                                <p className="spa-distance-text">{spa?.distance} mi</p>
                              </div>
                              <div>
                                <h6>
                                {spa?.ratings > 0 ?
                                <>
                                  {/* <StarRatings
                                    rating={spa?.ratings}
                                    starRatedColor="#ffb811"
                                    numberOfStars={5}
                                    name='rating'
                                  /> */}
                                  <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                                  {spa?.ratings} <span className="review-text">({spa?.totalReviewCount} {t('reviews')})</span>
                                </> : ''}

                              </h6>
                              {/* <p>{spa?.distance} mi</p> */}
                              </div>



                            </div>
                            <div className="checkbox-and-btn">
                                <p>{spa?.futuredesc ? spa?.futuredesc : "Available Today"}</p>
                                <div className="days-slot-available-details">
                                  <ul>
                                    {spa?.slotList && spa?.slotList.length > 0 ? (
                                      spa?.slotList.map((slotData, slotDataIndex) => {
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
                                              handleRadioChanges(slotData?.slot_title, spa);
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
                                <div className="avg-response-time-div">
                                  {spa?.avg_response_time_minutes ? <p>Avg. Response Time : {formatResponseTime(spa?.avg_response_time_minutes)}</p> : ''}
                                </div>
                              <Button className="book-now-btn" onClick={() => { handleRadioChange(spa)}}>{t('bookNow')}</Button>
                              {/* <Button className="book-now-btn search-btn">Search</Button> */}
                            </div>
                          </div>
                        </ScottsdaleBoxWrapper>
                      </SwiperSlide>
                      </>

                    ))
                  ) : (
                    <div className="no-blogs-message">
                      <SubTitleText18 className="text-center">
                        {t("comingSoonText23")}
                      </SubTitleText18>
                    </div>
                  )}
              </Swiper>
              {/* <div className="view-spas-footer">
                <Button className="font-weight-seven-hundred" onClick={() => { push(PATH_AUTH?.spas) }}> {t("comingSoonText25")}</Button>
              </div> */}
            </>
            )}
          </div>
          {loadingSpa ? (
            <>
             <div className="">

              <Swiper
                slidesPerView={1.2}
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
                  <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
                <SwiperSlide>
                    <ScottsdaleBoxWrapper className="swiper-loader">
                      <div className="imagebox">
                        <Skeleton count={1} />
                    </div>
                    <div className="scottsdale-detail">
                    <Skeleton count={5} />
                    </div>
                  </ScottsdaleBoxWrapper>
                </SwiperSlide>
              </Swiper>
            </div>
            </> ) :
            <>
            {mostSearchedServiceSpa && mostSearchedServiceSpa.length > 0 ? (
               mostSearchedServiceSpa.map((spaData, spaIndex) => {

                let spaClass = "";
                  if (spaIndex === 0) {
                    spaClass = "light-pink-bg-color";
                  } else if (spaIndex === 1) {
                    spaClass = "light-blue-bg-color";
                  } else {
                    spaClass = "spas-name-title-text"; // Default class for spaIndex 2 and onwards
                  }

                 return (
                <>
                  <div className="spas-block-wrapper" key={spaIndex}>
                      {/* <h4 className="spas-name-title-text">{spaData?.name}</h4> */}
                      <div className="spa-title-arrow-div">
                        <h4 className={`spas-name-title-text ${spaClass}`}>
                          <div className="clearfix">
                            <div className="title-text-image-div">
                              <Image isContainImg={true} alt="sitback" src={spaData?.image} />
                            </div>
                          </div>
                          {spaData?.name}
                        </h4>
                        {spaData?.spaList && spaData?.spaList?.length > 4 ?
                        <>
                        <div className="center-line"></div>
                        <div className="swiper-arrows-div">
                          <Link href="/" className={`image-swiper-button-prev spa-nav-prev-${spaIndex}`}>
                            <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                          </Link>
                          <Link href="/" className={`next-arrow image-swiper-button-next spa-nav-next-${spaIndex}`}>
                            <InlineSVG src={SwiperArrow_icon} className="global_laguage_icon" />
                          </Link>
                        </div></> : ""}
                      </div>
                      <>
                        <Swiper
                          slidesPerView={1.2}
                          spaceBetween={18}
                          loop={true}
                          // navigation={true}
                          navigation={{
                          nextEl: `.spa-nav-next-${spaIndex}`,
                          prevEl: `.spa-nav-prev-${spaIndex}`,
                          disabledClass: "swiper-button-disabled"
                        }}
                          modules={[Pagination, Navigation,Autoplay]}
                          className="mySwiper"
                          // autoplay={{
                          //   delay: 2500,
                          //   disableOnInteraction: false,
                          // }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1.5,
                            },
                            768: {
                              slidesPerView: 3,
                            },
                            1024: {
                              slidesPerView: 4,
                            },
                          }}
                          >
                            {spaData?.spaList && spaData?.spaList?.length > 0 ? (
                              spaData?.spaList.map((spa, index) => (
                                <>
                                <SwiperSlide key={index}>
                                  <ScottsdaleBoxWrapper className="box-wrapperdiv sitback-updated-slide-box-wrapper">
                                    <div className="imagebox" onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>
                                      <Image alt="sitback" src={spa?.image ? spa?.image : "/images/spas-img.png"} />
                                       {spa?.featured_spa === 1 && (
                                        <div className="crown-icon-div">
                                          <InlineSVG src={HomeCrownIcon_icon} className="global_laguage_icon" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="scottsdale-detail">
                                      <div>
                                        <h4>{spa?.username}</h4>
                                        <div className="sitback-spa-address-distance-text-div">
                                          <p className="address-image-text">
                                          <InlineSVG src={AddressPinIcon_icon} className="global_laguage_icon" />
                                            {spa?.location}
                                          </p>
                                          <p className="spa-distance-text">{spa?.distance} mi</p>
                                        </div>
                                        <h6>
                                          {spa?.ratings > 0 ?
                                          <>
                                            {/* <StarRatings
                                              rating={spa?.ratings}
                                              starRatedColor="#ffb811"
                                              numberOfStars={5}
                                              name='rating'
                                            /> */}
                                            <InlineSVG src={RankingStar_icon} className="global_laguage_icon" />
                                            {spa?.ratings} <span className="review-text">({spa?.totalReviewCount} {t('reviews')})</span>
                                          </> : ''}
                                        </h6>
                                        {/* <p>{spa?.distance} mi</p> */}

                                      </div>
                                      <div className="checkbox-and-btn">
                                           <p>{spa?.futuredesc ? spa?.futuredesc : "Available Today"}</p>
                                          <div className="days-slot-available-details">
                                            <ul>
                                              {spa?.slotList && spa?.slotList.length > 0 ? (
                                                spa?.slotList.map((slotData, slotDataIndex) => {
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
                                                      <Link href="javascript:void(0)"  onClick={() => {
                                                          handleRadioChanges(slotData?.slot_title, spa);
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
                                          <div className="avg-response-time-div">
                                            {spa?.avg_response_time_minutes ? <p>Avg. Response Time : {formatResponseTime(spa?.avg_response_time_minutes)}</p> : ''}
                                          </div>
                                        <Button className="book-now-btn" onClick={() => { handleRadioChange(spa)}}>{t('bookNow')}</Button>
                                      </div>
                                    </div>
                                  </ScottsdaleBoxWrapper>
                                </SwiperSlide>
                                </>

                              ))
                            ) : (
                              <div className="no-blogs-message">
                                <SubTitleText18 className="text-center">
                                  {t("comingSoonText23")}
                                </SubTitleText18>
                              </div>
                            )}
                        </Swiper>

                      </>

                  </div>
                </>
              )})) : (
                <></>
              )}
            </> }
              <div className="spa-detail-border-div spa-border-desktop-view"></div>

          {/* <Form className="filter-inputbox-wrapper">
            <FormGroup className="filterbox-input">
              <Label>Service Type</Label>
              <ReactSelect
                options={serviceListdata}
                className="sitback-select2-container"
                classNamePrefix="sitback-select-option"
                placeholder="What would you like to request?"
                onChange={handleServiceSelect} // Capture service selection
                // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
              />
            </FormGroup>
            <FormGroup className="filterbox-input datepicker-box">
              <Label>Date</Label>
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
                    render={({ field }) => (
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
           <div className="filter-btn">
            <Button type="button" variant="primary" onClick={handleSearch} disabled={loading} className="font-weight-seven-hundred">
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
          </Form> */}
         </Container>
         <div className="spa-detail-border-div spa-border-mobile-view"></div>
      </ScottsdaleSectionWrapper>
      <BusinessRevampUpdatedWrapper>
        <Container fluid>
          <div className="business-main-wrapper">
            <div className="business-header-div">
              <h3>{t('businessOwners')}</h3>
              <p>{t('businessOwnersDesc')}</p>
            </div>
            <div className="three-panel-layout">
              <div className="panel panel-left">
                <img src="/images/business-owner-1.webp" alt="Panel 1" />
              </div>
              <div className="panel panel-center">
                <img src="/images/business-owner-2.webp" alt="Panel 2" />
              </div>
              <div className="panel panel-right">
                <img src="/images/business-owner-3.webp" alt="Panel 3" />
              </div>
            </div>
            <div className="business-owner-mobile-view">
              <Swiper
                  slidesPerView={1.2}
                  spaceBetween={20}
                  loop={true}
                  // navigation={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="mySwiper"
                  centeredSlides={true}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  >
                    <>
                      <SwiperSlide key={1}>
                        <div className="slide-image-div">
                          <img src="/images/business-owner-1.webp" alt="Panel 1" />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide key={2}>
                        <div className="slide-image-div">
                          <img src="/images/business-owner-2.webp" alt="Panel 1" />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide key={3}>
                        <div className="slide-image-div">
                          <img src="/images/business-owner-3.webp" alt="Panel 1" />
                        </div>
                      </SwiperSlide>
                    </>
                </Swiper>
            </div>
            <div className="learn-more-btn-div">
              <Button onClick={() => { push(PATH_AUTH?.forBusinesses) }}>{t('learnMore')}</Button>
            </div>
          </div>
        </Container>
      </BusinessRevampUpdatedWrapper>



      <HomeFooter/>
      {/* <div className="footer-wrapper">
        <p>
          {t("comingSoonTitle13")} {new Date().getFullYear()}
        </p>
      </div> */}
      {/* <Modal
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
              <Link className="link-text" href={generateIframe}>
                {t("bookAnAppointmentLink")}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );

}

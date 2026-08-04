"use client";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, FormGroup,Row } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"
import reactDom from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import StarRatings from "react-star-ratings";
import InlineSVG from "svg-inline-react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeFooter from "@/components/homefooter/page";
import HomeHeader from "@/components/homeheader/page";
import { useToaster } from "@/hooks";
import { handleStep, manageSchedulerResponse } from "@/redux/quickBooking";
import { myHomePageSelectedCity, myHomePageSelectedDate, myHomePageSelectedService, mySelectedCity, mySelectedDate, mySelectedServiceList, mySelectedSlot } from "@/redux/service";
import { PATH_AUTH, PATH_DASHBOARD, PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, Input, Label, SubTitleText18,SubTitleText48 } from "@/styles/global/main.style";
import {
  BusinessOwnersWrapper,
  ComingSoonLayoutWrapper,
  ScottsdaleBoxWrapper,
  ScottsdaleSectionWrapper,
} from "@/styles/pages/comingsoon.style";
import { SelectDropDownIcon_icon,SelectedDropDownIcon_icon, } from "@/styles/svgs";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axiosApiCall from "@/utils/axios";
import 'react-loading-skeleton/dist/skeleton.css'
import { TOAST_TYPES } from "@/utils/constants";


export default function ComingSoon() {

 // Form Hooks
 const methods = useForm();

 const {
   control,
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
  // const [spaDetails, setSpaDetails] = useState();
  // const [show, setShow] = useState(false);
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false);
  const [isDayPickerVisibles, setIsDayPickerVisibles] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
  const [isCityPickerVisibles, setIsCityPickerVisibles] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("MM-DD-yyyy"));
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCity, setSelectedCity] = useState();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [cityDropDownData, setCityDropDownData] = useState([]);
  const [filteredCityDropDownData, setFilteredCityDropDownData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const dayPickerRefs = useRef(null);
  const cityPickerRefs = useRef(null);
  const [serviceListdata, setServiceListdata] = useState([]);
  const placeholderRef = useRef(null);
  const videoRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);
  const inputRefs = useRef(null);
  const cityInputRef = useRef(null);
  const cityInputRefs = useRef(null);
  const portalRef = useRef(document.createElement("div"));
  const cityRef = useRef(document.createElement("div"));
  const comingSoonRef = useRef(null);
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



  useEffect(() => {
    if (isVideoLoaded) {
      setTimeout(() => {
        if (placeholderRef.current) {
          placeholderRef.current.style.opacity = "0";
          placeholderRef.current.style.transform = "scale(1.2)";
        }
        if (videoRef.current) {
          videoRef.current.style.opacity = "1";
        }
      }, 1500);
    }
  }, [isVideoLoaded]);


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

  // const handleLogin = () => {
  //   push(PATH_AUTH?.signUp);
  // };

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
        // console.log("res",res);
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
        // console.log("111111",res);
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

  const handleRadioChange = (e,data) => {


    if(e.target.value != null) {
      dispatch(mySelectedSlot(e.target.value))
    }
    if(data?.futuredate && data?.futuredate != '') {
      dispatch(mySelectedDate(moment(data?.futuredate)?.format("MM-DD-YYYY")))
    }
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${data?.slug}`;
    window.location.href = link;

  }

  useEffect(() => {
    getServicess()
  }, []);

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
    if(selectedCity) {
      dispatch(myHomePageSelectedService(selectedService))
      dispatch(myHomePageSelectedCity(selectedCity))
      dispatch(myHomePageSelectedDate(selectedDate))
      push(PATH_AUTH?.spasLocation+ "/" + selectedCity?.value);
      return
    } else if(filteredCityDropDownData.length > 0 ) {
      setSelectedCity(filteredCityDropDownData[0]);
      setCityInputValue(filteredCityDropDownData[0].label)
      dispatch(myHomePageSelectedService(selectedService))
      dispatch(myHomePageSelectedCity(filteredCityDropDownData[0]))
      dispatch(myHomePageSelectedDate(selectedDate))
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
            top: targetElement.offsetTop + 120,
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
    fetchLatLngFromGoogles()
  }, []);

  useEffect(() => {
    setLoading(true);
    if(location?.lat){
      // console.log("location",location);
      getSpaLocation()
      getMostSearchedService()
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
      fetchSpaData()
    }
  }, [selectedCity]);

  // console.log("cityInputValue",cityInputValue);
  // console.log("selectedCity",selectedCity);
  return (
    <>
    <HomeHeader />
      <ComingSoonLayoutWrapper className="coming-soon-sectionv1 sitback-coming-section-mobile-wrapper">
        <div className="video-banner-wrapper">
          {/* Placeholder Image */}
          <img
            ref={placeholderRef}
            src="/images/banner-02.png"
            alt="Loading Video..."
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
              zIndex: 2,
            }}
          />

          {/* Video Wrapper */}
          <div
            className="video-container"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            {/* Video Overlay (Color background) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(81, 69, 69, 0.51)", // Your desired overlay color
                zIndex: 3, // Ensures it's above the video but below the placeholder image
              }}
            ></div>

            {/* Video Iframe */}
            <iframe
              ref={videoRef}
              src="https://player.vimeo.com/video/1046279621?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&background=1"
              width="640"
              height="360"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="banner-video-v2"
              style={{
                width: "100%",
                height: "100%",
                border: "0",
                opacity: "0",
                transition: "opacity 1s ease-in-out",
              }}
              onLoad={() => setIsVideoLoaded(true)}
            />
          </div>
        </div>
        <div className="text-layout-wrapper sitback-text-layout-mobile-warapper">
          <Container>
            <div className="comingsoon-wrapper">
              <Link href="/" className="sitback-logo-wrapper sitback-mobile-logo-wrapper">
                <Image isContainImg={true} alt="sitback" src="/images/sitback-v4.svg" />
              </Link>
              <h3 className="sub-title">{t("comingSoonText1")}</h3>
              <h4  className="coming-soon-mobile-para-text coming-soon-desktop-view-paragraph-text" ref={comingSoonRef}>{t("comingSoonText2")}</h4>
              <h4  className="coming-soon-mobile-para-text coming-soon-mobile-view-paragraph-text" ref={comingSoonRef}>{t("comingSoonText2")}</h4>
              <Form id="comingSoonText2" className="filter-inputbox-wrapper sitback-landing-filter-desktop-view">
                <FormGroup className="filterbox-input">
                  <Label>{t("selectCityText")}</Label>
                  {/* <ReactSelect
                    onMenuOpen={() => { handleServiceTypeClick(); }}
                    options={cityDropDownData}
                    className="sitback-select2-container"
                    classNamePrefix="sitback-select-option"
                    placeholder="Select City"
                    onChange={handleCitySelect} // Capture service selection
                    // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                    menuPortalTarget={document.body} // Ensure this is a valid DOM element
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  /> */}
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
                <FormGroup className="filterbox-input">
                  <Label>{t("serviceType")}</Label>
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
                  <Label>{t("date")}</Label>
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
              {/* <div className="bookand-list-wrapper">
                <Button className="font-weight-seven-hundred" onClick={() => handleRedirect("second")}>{t("bookAppointment")}</Button>
                <Button className="spa-btn font-weight-seven-hundred" onClick={() => handleLogin()}>{t("comingSoonTitle")}</Button>
              </div> */}
            </div>
          </Container>
        </div>
      </ComingSoonLayoutWrapper>
      <ScottsdaleSectionWrapper className="spas-available-section spas-mobile-view-display-section">
          <div className="sitback-mobile-updated-search-select-filter-display-div">
            <div className="landing-mobile-view-filter-wrapper" id="smooThScroll">
              <Form>
                <div className="filter-inputbox-wrapper">

                  <FormGroup className="filterbox-input">
                    <Label>{t("selectCityText")}</Label>
                    {/* <ReactSelect
                     onMenuOpen={() => {someFunctioncall()}}
                      isSearchable={false}
                      options={cityDropDownData}
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                      placeholder="Select City"
                      onChange={() => handleCitySelect()} // Capture service selection
                      // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                      // menuPortalTarget={document.body} // Ensure this is a valid DOM element
                      // styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    /> */}

                  <div className="sit-select-city-select-div">
                    <div className="input-select-wrapper" >
                      <input placeholder={t("selectCityText")} value={cityInputValue || ""} ref={cityInputRefs} onClick={() => { showCityPickers(); handleServiceTypeClicks(); }} onChange={(event) => cityInputChange(event.target.value)}/>

                       {isCityPickerVisibles ? <>  <i >
                       <InlineSVG onClick={() => { hideCityPickers()}} src={SelectDropDownIcon_icon} className="global_laguage_icon" /> </i></> : <>  <i >
                        <InlineSVG onClick={() => { showCityPickers(); handleServiceTypeClicks(); }} src={SelectedDropDownIcon_icon} className="global_laguage_icon" /> </i> </>}

                    </div>
                    {isCityPickerVisibles && filteredCityDropDownData.length > 0 && (
                    <div className="sit-select-city-options-wrapper" ref={cityPickerRefs}>
                      <ul>
                    {filteredCityDropDownData.map((cityOption, idx) => (
                              <li key={idx} onClick={() => handleCitySelect(cityOption)}>
                                <a href="javascript:void(0);">
                                  {cityOption.label}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>
                  )}
                  </div>


                  </FormGroup>

                  <FormGroup className="filterbox-input service-type-input-wrapper">
                    <Label>{t("serviceType")}</Label>
                    <ReactSelect
                     onMenuOpen={() => {someFunctioncall()}}
                      isSearchable={false}
                      options={serviceListdata}
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                      placeholder="What would you like to request?"
                      onChange={handleServiceSelect} // Capture service selection
                      // defaultValue={{ value: 0, label: 'Most Spenders Report' }}
                      // menuPortalTarget={document.body} // Ensure this is a valid DOM element
                      // styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    />

                  </FormGroup>
                  <FormGroup className="filterbox-input datepicker-box">
                    <Label>{t('date')}</Label>


                    <Input
                      ref={inputRefs}
                      value={selectedDate || moment(new Date()).format("MM-DD-yyyy")}
                      onClick={() => { showDatePickers(); handleServiceTypeClicks(); }}
                      readOnly
                      className="datepicker"

                    />


                        {isDayPickerVisibles && (
                        <div className="calendarv2-wrapper-div" ref={dayPickerRefs}>
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
                <div className="filter-btn mobile-filter-btn">
                  <Button type="button" variant="primary" onClick={handleSearch} className="font-weight-seven-hundred">
                   {t("search")}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
         <Container>
         <div className="sitback-landing-marketplace-div">
          <Row>
            <Col md={6} lg={4}>
                <div className="sitback-marketplace-box">
                  <div className="clearfix">
                    <div className="sitback-market-img-div">
                      <span className="inner-img-span">
                        <Image isContainImg={true} alt="sitback" src="/images/welness.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="sitback-content-div">
                    <h5>{t("comingSoonSectionText")}</h5>
                    <p>{t("comingSoonSectionDesc")}</p>
                  </div>
                </div>
            </Col>
            <Col md={6} lg={4}>
                <div className="sitback-marketplace-box">
                  <div className="clearfix">
                    <div className="sitback-market-img-div sitback-orange-box">
                      <span className="inner-img-span">
                        <Image isContainImg={true} alt="sitback" src="/images/relaxation.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="sitback-content-div">
                     <h5>{t("comingSoonSectionTextOne")}</h5>
                    <p>{t("comingSoonSectionDescOne")}</p>
                  </div>
                </div>
            </Col>
            <Col md={6} lg={4}>
                <div className="sitback-marketplace-box">
                  <div className="clearfix">
                    <div className="sitback-market-img-div sitback-green-box">
                      <span className="inner-img-span">
                        <Image isContainImg={true} alt="sitback" src="/images/support.svg" />
                      </span>
                    </div>
                  </div>
                  <div className="sitback-content-div">
                    <h5>{t("comingSoonSectionTextTwo")}</h5>
                    <p>{t("comingSoonSectionDescTwo")}</p>
                  </div>
                </div>
            </Col>
          </Row>
         </div>
         <div className="sitback-landing-marketplace-mobile-div">
            <Swiper
                slidesPerView={1.3}
                spaceBetween={18}
                navigation={false}
                className="mySwiper"
                >
                <SwiperSlide>
                  <div className="sitback-marketplace-box">
                    <div className="clearfix">
                      <div className="sitback-market-img-div">
                        <span className="inner-img-span">
                          <Image isContainImg={true} alt="sitback" src="/images/welness.svg" />
                        </span>
                      </div>
                    </div>
                    <div className="sitback-content-div">
                      <h5>{t("comingSoonSectionText")}</h5>
                      <p>{t("comingSoonSectionDesc")}</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sitback-marketplace-box">
                    <div className="clearfix">
                      <div className="sitback-market-img-div sitback-orange-box">
                        <span className="inner-img-span">
                          <Image isContainImg={true} alt="sitback" src="/images/relaxation.svg" />
                        </span>
                      </div>
                    </div>
                    <div className="sitback-content-div">
                      <h5>{t("comingSoonSectionTextOne")}</h5>
                      <p>{t("comingSoonSectionDescOne")}</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sitback-marketplace-box">
                    <div className="clearfix">
                      <div className="sitback-market-img-div sitback-green-box">
                        <span className="inner-img-span">
                          <Image isContainImg={true} alt="sitback" src="/images/support.svg" />
                        </span>
                      </div>
                    </div>
                    <div className="sitback-content-div">
                      <h5>{t("comingSoonSectionTextTwo")}</h5>
                      <p>{t("comingSoonSectionDescTwo")}</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
         </div>
          <div className="scottsdale-headertext">
            {/* <SubTitleText48>{t("comingSoonText21")} <span>{t('comingSoonText22')}</span></SubTitleText48> */}
            <SubTitleText48>{t("comingSoonText21")}</SubTitleText48>
          </div>
          <div className="see-othercities">
            <Link href={`${PATH_DASHBOARD?.seeOtherCities }`}>{t("seeOtherCities")}</Link>
          </div>
          <div className="spas-block-wrapper">
            <h4 className="spas-name-title-text">{t("availableNearYou")}</h4>
            {loading ? (
            <>
            <div className="">
              {/* <div className="spinner-border text-info" role="status">
              </div> */}
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
                slidesPerView={1.5}
                spaceBetween={18}
                loop={true}
                navigation={true}
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
                        <ScottsdaleBoxWrapper className="box-wrapperdiv">
                          <div className="imagebox" onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>
                            <Image alt="sitback" src={spa?.image ? spa?.image : "/images/spas-img.png"} />
                          </div>
                          <div className="scottsdale-detail">
                            <div>
                              <h4>{spa?.username}</h4>
                              <p>{spa?.location}</p>
                              <div>                              <h6>
                                {spa?.ratings > 0 ?
                                <>
                                  <StarRatings
                                    rating={spa?.ratings}
                                    starRatedColor="#ffb811"
                                    numberOfStars={5}
                                    name='rating'
                                  />
                                  {spa?.ratings}
                                </> : ''}

                              </h6>
                              <p>{spa?.distance} mi</p>
                              </div>



                            </div>
                            <div className="checkbox-and-btn">
                                <p>{spa?.futuredesc}</p>

                              <div className="checkbox-list-wrapper">
                                {spa?.slotList && spa?.slotList.length > 0 ? (
                                  spa?.slotList.map((slotData, slotDataIndex) => {
                                    //console.log('Slot Data:', slotData); // Log slotData here
                                    return (
                                      <>
                                        <label className="checkbox-wrapper-div" key={slotDataIndex}>
                                          <input
                                            type="radio"
                                            name="radio"
                                            value={slotData?.slot_title}
                                            onClick={(e) => {
                                              handleRadioChange(e, spa);
                                            }}
                                            disabled={!slotData?.isShow}
                                          />
                                          <span className="checkmark slot-checkbox-wrapper">
                                            {slotData?.slot_title}
                                            {slotData?.slot_count && slotData?.slot_count != 0 ?
                                            <span className="available-text">({slotData?.slot_count} Available)</span>
                                            : <></>}
                                          </span>
                                        </label>

                                      </>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}



                              </div>

                              {/* <Button onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>Details</Button> */}
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
                slidesPerView={1.5}
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

                 return (
                <>
                  <div className="spas-block-wrapper" key={spaIndex}>
                      <h4 className="spas-name-title-text">{spaData?.name}</h4>

                      <>
                        <Swiper
                          slidesPerView={1.5}
                          spaceBetween={18}
                          loop={true}
                          navigation={true}
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
                            {spaData.spaList && spaData.spaList.length > 0 ? (
                              spaData.spaList.map((spa, index) => (
                                <>
                                <SwiperSlide key={index}>
                                  <ScottsdaleBoxWrapper className="box-wrapperdiv">
                                    <div className="imagebox" onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>
                                      <Image alt="sitback" src={spa?.image ? spa?.image : "/images/spas-img.png"} />
                                    </div>
                                    <div className="scottsdale-detail">
                                      <div>
                                        <h4>{spa?.username}</h4>
                                        <p>{spa?.location}</p>
                                        <h6>
                                          {spa?.ratings > 0 ?
                                          <>
                                            <StarRatings
                                              rating={spa?.ratings}
                                              starRatedColor="#ffb811"
                                              numberOfStars={5}
                                              name='rating'
                                            />
                                            {spa?.ratings}
                                          </> : ''}
                                        </h6>
                                        <p>{spa?.distance} mi</p>

                                      </div>
                                      <div className="checkbox-and-btn">
                                          <p>{spa?.futuredesc}</p>
                                        <div className="checkbox-list-wrapper">
                                          {spa?.slotList && spa?.slotList.length > 0 ? (
                                            spa?.slotList.map((slotData, slotDataIndex) => {
                                              //console.log('Slot Data:', slotData); // Log slotData here
                                              return (
                                                <>
                                                  <label className="checkbox-wrapper-div" key={slotDataIndex}>
                                                    <input
                                                      type="radio"
                                                      name="radio"
                                                      value={slotData?.slot_title}
                                                      onClick={(e) => {
                                                        handleRadioChange(e, spa);
                                                      }}
                                                      disabled={!slotData?.isShow}
                                                    />
                                                    <span className="checkmark slot-checkbox-wrapper">
                                                      {slotData?.slot_title}
                                                      {slotData?.slot_count && slotData?.slot_count != 0 ?
                                                      <span className="available-text">({slotData?.slot_count} Available)</span>
                                                      : <></>}
                                                    </span>
                                                  </label>
                                                </>
                                              );
                                            })
                                          ) : (
                                            <></>
                                          )}


                                        </div>

                                        {/* <Button onClick={() => { push(PATH_AUTH?.spas + "/" + spa?.slug) }}>Details</Button> */}
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
      </ScottsdaleSectionWrapper>
      <BusinessOwnersWrapper>
        <div className="cloud-image-wrapper left-top-image">
          <Image isContainImg={true} alt="sitback" src="/images/cloud-top.svg" className="business-desktop-view-image" />
          <Image isContainImg={true} alt="sitback" src="/images/cloud-top-image.svg" className="business-mobile-view-image" />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="business-owners-detail">
                <SubTitleText48>{t("businessOwners")}</SubTitleText48>
                <p>{t("businessOwnersDesc")}</p>
                <Button onClick={() => { push(PATH_AUTH?.forBusinesses) }}>{t("learnMore")} </Button>
              </div>
            </Col>
            <Col md="6">
              <div className="sitback-project-detail-img">
                <Image isContainImg={true} alt="sitback" src="/images/group-image-wrapper.png" />
              </div>
            </Col>
          </Row>
        </Container>
        <div className="cloud-image-wrapper">
          <Image isContainImg={true} alt="sitback" src="/images/cloud-bottom.svg" className="business-desktop-view-image" />
          <Image isContainImg={true} alt="sitback" src="/images/cloud-bottom-image.svg" className="business-mobile-view-image" />
        </div>
      </BusinessOwnersWrapper>



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

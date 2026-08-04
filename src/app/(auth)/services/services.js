"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row,  } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { cmsSelectService } from "@/redux/scheduler";
import { myHomePageSelectedDate, myHomePageSelectedService } from "@/redux/service";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Image,
  MainLayoutWrapper,
  SubTitleText18,
} from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, ScottsdaleBoxWrapper, ServicesIconBox, SpasNearLayoutWrapper, WhyPeopleChooseSection, } from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function Spas() {

  //hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation();

  //state
  const [loading, setLoading] = useState(true);
  const [servicesData, setServicesData] = useState([]); // Stores the blog data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const servicePerPage = 18;
  const [location, setLocation] = useState({ city: null, state: null, lat: null, lng: null });
  const [showHeader, setShowHeader] = useState(false);
  dispatch(cmsSelectService(12));

  // Fetch blog data whenever the currentPage changes
  useEffect(() => {
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedService(null))

    if(location?.state) {
      getHomeServices();
    }
  }, [currentPage,location]);

  const getHomeServices = async () => {
    try {
      setLoading(true);

      let param = {
        page: currentPage,
        perpage: servicePerPage,
        state: location?.state
      };

      const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_SERVICES_PAGE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {

        setServicesData(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
      }
    } catch (error) {
      //console.error("Error fetching servicesData:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      });
    }
  };

  // // Pagination handler
  // const goToPreviousPage = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const goToNextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  useEffect(() => {
    document.body.classList.add("background-white-layout");
    fetchLatLngFromGoogles();
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    if (token == "") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  const serviceSpsRedirect = async (service) => {
    var clickedService = {
          "value": service?.slug,
          "label": service?.name,
    }
    dispatch(myHomePageSelectedService(clickedService))
    push(PATH_AUTH?.services + "/" + service?.slug);
  }

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
      //console.error("Error fetching location:", error);
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <>
      <BlogHeader />
      <MainLayoutWrapper>
        <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-medium-size-banner-div">
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
              <div className="banner-content-wrapper spa-page-banner-content-div services-page-banner-content-div">
                <div className="banner-top-title-div ">
                  <Container>
                    <h1>{t('servicesPageText1')}</h1>
                    <p className="spa-page-banner-para-text">{t('servicesPageDesc')}</p>
                    <p className="breadcrumb-text bread-crumb-spa-text">{t('homeText')} <span className="sign-text">&gt;</span> {t('servicesText')}</p>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>
        <SpasNearLayoutWrapper className="sitback-services-layout-update-wrapper">
          {loading ? (
            <>
             <Container fluid>
            <>
             <div className="our-blogs-header">
                {/* <SubTitleText48>{t("servicesPageText1")}</SubTitleText48> */}
              </div>
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
            </>
            </Container>
            </>
          ) : (
            <Container fluid>
              {/* <div className="our-blogs-header">
                <SubTitleText48>{t("servicesPageText1")}</SubTitleText48>
              </div> */}
              <div className="spas-page-header-title-div">
                <h3>Popular Spa & Massage Services Near You</h3>
                <p>Explore top-rated spa and massage services near you.</p>
              </div>
              <div className="grid-row service-page-updated-grid-wrapper">
                {servicesData && servicesData.length > 0 ? (
                  servicesData.map((service, index) => (
                    <div className="grid-cols" key={index} >
                      <ServicesIconBox className="service-updated-box" onClick={() => serviceSpsRedirect(service)}>
                        <div className="services-icon">
                          <Image
                            isContainImg={true}
                            alt="sitback"
                            src={service?.image ? service?.image : "/images/Isolation_Mode.svg"}
                          />
                        </div>
                        <p>{service?.name}</p>
                      </ServicesIconBox>
                    </div>
                  ))
                ) : (
                  <div className="no-blogs-message">
                    <SubTitleText18 className="text-center">
                      {t("servicesPageText2")}
                    </SubTitleText18>
                  </div>
                )}
              </div>
              <div className="pagination-footer-wrapper">
               {servicesData?.length > 0 && (
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
              </div>
              <WhyPeopleChooseSection className="services-why-people-choose-div">
                <Container>
                  <div className="why-people-choose-inner-div">
                    <div className="why-people-box-wrapper">
                      <Row>
                        <Col md={6}>
                          <div className="why-people-choose-img-div why-service-choose-img-div">
                            <img src="/images/why-book-image.png" alt="Panel 1" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="why-people-choose-detail-div">
                            <div className="why-people-choose-detail-header-div">
                              <h3>Why Book Spa Services Through Sitback?</h3>
                              <p>Find, compare, and book verified spa services quickly and easily.</p>
                            </div>
                            <div className="why-people-list-display-wrapper">
                              <div className="clearfix">
                                <div className="checkmark-img-div">
                                  <img src="/images/checkmark-green-icon.svg" alt="Panel 1" />
                                </div>
                              </div>
                              <div className="why-list-detail-div">
                                <h4>Simple & Fast Booking</h4>
                                <p>Search, compare, and book in just a few clicks.</p>
                              </div>
                            </div>
                            <div className="why-people-list-display-wrapper">
                              <div className="clearfix">
                                <div className="checkmark-img-div">
                                  <img src="/images/checkmark-green-icon.svg" alt="Panel 1" />
                                </div>
                              </div>
                              <div className="why-list-detail-div">
                                <h4>Improves conversion</h4>
                                <p>Makes booking faster, easier, and more convenient.</p>
                              </div>
                            </div>
                            <div className="why-people-list-display-wrapper">
                              <div className="clearfix">
                                <div className="checkmark-img-div">
                                  <img src="/images/checkmark-green-icon.svg" alt="Panel 1" />
                                </div>
                              </div>
                              <div className="why-list-detail-div">
                                <h4>Adds transactional keywords</h4>
                                <p>Targets booking-focused keywords for higher search intent.</p>
                              </div>
                            </div>
                            <div className="why-people-list-display-wrapper">
                              <div className="clearfix">
                                <div className="checkmark-img-div">
                                  <img src="/images/checkmark-green-icon.svg" alt="Panel 1" />
                                </div>
                              </div>
                              <div className="why-list-detail-div">
                                <h4>Stress-Free Convenience</h4>
                                <p>Easily find last-minute appointments without hassle.</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Container>
              </WhyPeopleChooseSection>
            </Container>
          )}
        </SpasNearLayoutWrapper>
      </MainLayoutWrapper>
      <HomeFooter/>
      {showHeader ? <></> : <BlogPath />}
    </>
  );
}

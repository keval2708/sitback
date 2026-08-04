  "use client";
  import moment from "moment";
import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";
  import { Container, } from "react-bootstrap";
  import { useTranslation } from "react-i18next";
  import Skeleton from "react-loading-skeleton";
  import ReactStars from "react-rating-stars-component";
  import { useSelector } from "react-redux";
  import { Swiper, SwiperSlide } from "swiper/react";
  import BlogHeader from "@/components/blogheader/page";
  import HomeFooter from "@/components/homefooter/page";
  import { useToaster } from "@/hooks";
  import { serviceSliceSelector } from "@/redux/service";
import { PATH_AUTH } from "@/routes/paths";
  import { API_ROUTER } from "@/services/apiRouter";
  import { BlogLayoutWrapper } from "@/styles/pages/blog.style";
  import { ComingSoonLayoutWrapper, ScottsdaleBoxWrapper, TopReviewSpasNearSection } from "@/styles/pages/comingsoon.style";
  import { Stat_icon } from "@/styles/svgs";
  import axiosApiCall from "@/utils/axios";
  import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
  import 'react-loading-skeleton/dist/skeleton.css'
  import 'swiper/css';
  import 'swiper/css/pagination';



  export default function FAQS() {
    //state
    const [myCurrentReviews, setMyCurrentReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({ city: null, state: null, lat: null, lng: null });
    const {spaSelectedCity} = useSelector(serviceSliceSelector)
    const {spaLocationSelectedCity} = useSelector(serviceSliceSelector)

    //hooks
    const { toaster } = useToaster();
    const { t } = useTranslation();
    const { push } = useRouter();

    useEffect(() => {
      // Get user location first
      fetchLatLngFromGoogles();
    }, []);

    useEffect(() => {
      // Fetch reviews when location is available
      if (location.lat && location.lng) {
        fetchMyCurrentReviewList();
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


    const fetchMyCurrentReviewList = async () => {
      try {

         let param = {}
        if(spaSelectedCity && spaSelectedCity?.city) {
          param.lat = spaSelectedCity?.lat;
          param.log = spaSelectedCity?.log;
          param.city = spaSelectedCity?.city;
          param.state = spaSelectedCity?.state;
        } else if (spaLocationSelectedCity) {
          param.cityslug = spaLocationSelectedCity;
        } else {
          param.userlat = location?.lat;
          param.userlog = location?.lng;
          param.usercity = location?.city;
          param.userstate = location?.state;
        }

        const res = await axiosApiCall.post(API_ROUTER?.GET_MY_CURRENT_REVIEW_LIST, param);

        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          setMyCurrentReviews(res?.data?.data || null);
        }
      } catch (error) {
        // console.error("Error fetching my current reviews:", error);
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <BlogHeader />
        <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div">
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

              <div className="banner-content-wrapper sitback-blog-updated-content-wrapper">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>{t("reviews")}</h1>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>

        <BlogLayoutWrapper className="blog-updated-wrapper faq-page-wrapper">
          <Container>
            <TopReviewSpasNearSection>
              <div className="top-review-inner-div reviews-page-top-view-div">
                <div className="top-review-header-div">
                  <h3>{t("ReviewSectionTitleText")}</h3>
                  <p>{t("ReviewSectionSubtitleText")}</p>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="faq-loading-skeleton">
                    <ScottsdaleBoxWrapper className="swiper-loader spa-loader-animation">
                      <div className="imagebox">
                          <Skeleton count={1} />
                      </div>
                      <div className="scottsdale-detail">
                      <Skeleton count={5} />
                      </div>
                    </ScottsdaleBoxWrapper>

                  </div>
                )}

                {/* No Reviews Available */}
                {!loading && (!myCurrentReviews || myCurrentReviews.length === 0) && (
                  <div className="no-reviews-container text-center py-5">
                    <div className="no-reviews-icon mb-3">
                      <img
                        src="/images/no-reviews-icon.svg"
                        alt="No reviews"
                        style={{ width: '80px', height: '80px', opacity: 0.5 }}
                      />
                    </div>
                    <h4 className="mb-3">No Reviews Yet</h4>
                    <p className="text-muted mb-4">
                      There are no reviews available in your area at the moment.
                    </p>

                  </div>
                )}

                {/* Desktop View - Show all reviews in grid */}
                {myCurrentReviews && myCurrentReviews.length > 0 && (
                  <>
                    <div className="top-review-desktop-view-div review-page-desktop-view-wrapper">
                      <div className="masonry-grid">
                        {myCurrentReviews.map((review, index) => (
                          <>
                          <div className="masonry-item">
                              <div className="review-box-wrapper">
                                <div className="review-box-inner-top-div">
                                  <div className="star-img-div">
                                    <ReactStars
                                      isHalf={true}
                                      value={review?.review?.rating % 0.5 === 0 ? parseFloat(review?.review?.rating) : Math.round(parseFloat(review?.review?.rating))}
                                      count={5}
                                      size={15}
                                      halfIcon={<i className={Stat_icon}></i>}
                                      fullIcon={<i className={Stat_icon}></i>}
                                      activeColor="#00B67A"
                                      edit={false}
                                    />
                                  </div>
                                  <p className="user-review-para-text review-page-paragraph-custom-wrapper">
                                    {review.review?.review_text || ""}
                                  </p>
                                </div>
                                <div className="user-content-bottom-wrapper">
                                  <div className="user-display-div">
                                    <div className="clearfix">
                                      <div className="user-img-div">
                                        {review.review?.profile_image ? (
                                          <img
                                            src={review.review.profile_image}
                                            alt={review.review.reviewer_name}
                                          />
                                        ) : (
                                          <div className="default-avatar"></div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="user-detail-div">
                                      <h6>
                                        {review.review?.reviewer_name || ""}
                                      </h6>
                                      <p>
                                        {review.review?.time ? moment(review.review.time).format("DD MMM YYYY") : "Recent"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="user-display-box-wrapper" onClick={() => { push(PATH_AUTH?.spas + "/" + review?.spa_slug) }}>
                                    <div className="user-left-box">
                                      <h6>
                                        {review.spa_name || ""}
                                      </h6>
                                      <p className="review-text">
                                        {review.rating || review.review?.rating || ""}
                                        <span className="star-icon">
                                          <img src="/images/star-green-icon.svg" alt="Star" />
                                        </span>
                                        <span className="total-reviews-text">
                                          ({review.total_reviews || 0} reviews)
                                        </span>
                                      </p>
                                      <p className="place-text">
                                        {review.location || ""}
                                      </p>
                                    </div>
                                    <div className="user-right-box">
                                      <div className="clearfix">
                                        <div className="spa-profile-img">
                                          {review.image ? (
                                            <img
                                              src={review.image}
                                              alt={review.spa_name}
                                            />
                                          ) : (
                                            <div className="default-spa-avatar"></div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                          </>
                        ))}
                      </div>
                    </div>

                    {/* Mobile View - Show reviews in Swiper */}
                    <div className="top-review-mobile-view-div review-page-slider-wrapper">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={18}
                        navigation={false}
                        autoHeight={true}
                        className="mySwiper"
                      >
                        {myCurrentReviews.map((review, index) => (
                          <SwiperSlide key={index}>
                            <div className="review-box-wrapper">
                              <div className="review-box-inner-top-div">
                                <div className="star-img-div">
                                  <ReactStars
                                    isHalf={true}
                                    value={review?.review?.rating % 0.5 === 0 ? parseFloat(review?.review?.rating) : Math.round(parseFloat(review?.review?.rating))}
                                    count={5}
                                    size={15}
                                    halfIcon={<i className={Stat_icon}></i>}
                                    fullIcon={<i className={Stat_icon}></i>}
                                    activeColor="#00B67A"
                                    edit={false}
                                  />
                                </div>
                                {/* <h3 className="user-review-text">“{review.review?.review_text || ""}”</h3> */}
                                <p className="user-review-para-text">
                                  {review.review?.review_text || ""}
                                </p>
                              </div>
                              <div className="user-content-bottom-wrapper">
                                <div className="user-display-div">
                                  <div className="clearfix">
                                    <div className="user-img-div">
                                      {review.review?.profile_image ? (
                                        <img
                                          src={review.review.profile_image}
                                          alt={review.review.reviewer_name}
                                        />
                                      ) : (
                                        <div className="default-avatar"></div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="user-detail-div">
                                    <h6>{review.review?.reviewer_name || ""}</h6>
                                    <p>{review.review?.time ? moment(review.review.time).format("DD MMM YYYY") : "Recent"}</p>
                                  </div>
                                </div>
                                <div className="user-display-box-wrapper" onClick={() => { push(PATH_AUTH?.spas + "/" + review?.spa_slug) }}>
                                  <div className="user-left-box">
                                    <h6>{review.spa_name || ""}</h6>
                                    <p className="review-text">
                                      {review.rating || review.review?.rating || ""}
                                      <span className="star-icon">
                                        <img src="/images/star-green-icon.svg" alt="Star" />
                                      </span>
                                      <span className="total-reviews-text">({review.total_reviews || 0} reviews)</span>
                                    </p>
                                    <p className="place-text">{review.location || ""}</p>
                                  </div>
                                  <div className="user-right-box">
                                    <div className="clearfix">
                                      <div className="spa-profile-img">
                                        {review.image ? (
                                          <img
                                            src={review.image}
                                            alt={review.spa_name}
                                          />
                                        ) : (
                                          <div className="default-spa-avatar"></div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </>
                )}
              </div>
            </TopReviewSpasNearSection>
          </Container>
        </BlogLayoutWrapper>

        <HomeFooter />
      </>
    );
  }

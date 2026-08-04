"use client";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import Loader from "@/components/shared/spinner-home/loader";
import { useToaster } from "@/hooks";
import { myHomePageSelectedService } from "@/redux/service";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image,SubTitleText48, } from "@/styles/global/main.style";
import { BlogDetailBox, BlogInnerBanner, BlogLayoutWrapper, } from "@/styles/pages/blog.style";
import { ComingSoonLayoutWrapper, } from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Blog() {
  //state
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { toaster } = useToaster();
  const [blogDetails, setBlogDetails] = useState();
  const { push } = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    getBlogData();
  }, [params]);

  const getBlogData = async () => {
    let param = {
      slug: params?.slug,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.BLOG_DETAILS, param);
      if (!res?.status) {
        push(PATH_AUTH?.blog);
        //return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        if (res?.data?.data) {
          setBlogDetails(res?.data?.data);
        } else {
          setBlogDetails([]);
          push(PATH_AUTH?.blog);
        }
      }
    } catch (error) {
      setLoading(false);
      return toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  //hooks
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
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

  const getProcessedDesc = (htmlString) => {
    if (!htmlString) return "";

    // Parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Find all blockquote elements
    const blockquotes = doc.querySelectorAll("blockquote");

    // Replace each blockquote with a q element
    blockquotes.forEach((blockquote) => {
      const q = doc.createElement("q");
      q.innerHTML = blockquote.innerHTML; // Preserve the inner content
      blockquote.replaceWith(q);
    });

    // Return the modified HTML as a string
    return doc.body.innerHTML;
  };

  const handleRedirectBlogDetails = (slug) => {
    push(PATH_AUTH?.blog + "/" + slug);
  };


  return (
    <>
      <BlogHeader />
      <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div sitback-blog-detail-banner-section">
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
            <p className="breadcrumb-text">Home  Services</p>
            {/* <div className="banner-content-wrapper">
              <div className="banner-top-title-div">
                <Container>
                  <h1>Our Blogs</h1>
                  <p>72 Blog Added</p>
                </Container>
              </div>
            </div> */}
          </div>
        </section>
      </ComingSoonLayoutWrapper>
      <BlogLayoutWrapper className="overflow-remova-div blog-detail-updated-layout-wrapper">
        <Container>
          {/* <div className="clud-img-div">
            <Image isContainImg={true} alt="sitback" src="/images/clud-img.svg" />
          </div>
          <div className="clud-img-div right-side-wrapper">
            <Image isContainImg={true} alt="sitback" src="/images/clud-img.svg" />
          </div> */}
          {loading ? (
            <>
              <Loader loading={loading} />
            </>
          ) : (
            <div className="blog-detail-page-updated-content-div">
              <div className="blog-detail-layout-wrapper">
                <div className="blog-detail-section">
                  <BlogInnerBanner className="blog-detail-banner-div">
                    <Image alt="sitback" src={blogDetails?.image ? blogDetails?.image : ""} />
                  </BlogInnerBanner>
                  <div className="blog-inner-layout-wrapper">
                    <h6 className="date-text">{moment(blogDetails?.date).format("MMMM D,  YYYY")}</h6>
                    <SubTitleText48 className="blog-detail-title-text">{blogDetails?.title}</SubTitleText48>
                    <p className="truncated-summary">{blogDetails?.sort_desc}</p>
                  </div>
                  <div className="going-section">
                    <div dangerouslySetInnerHTML={{ __html: getProcessedDesc(blogDetails?.desc) }} />
                  </div>
                  {blogDetails?.tagslist && blogDetails.tagslist.length > 0 ? (
                    <>
                      <div className="tags-block-wrapper">
                        <h6>{t('tagsText')}</h6>
                        <ul>
                          {blogDetails.tagslist.map((tagData, index) => (
                            <li key={index}>{tagData?.tag}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : null}

                  <div className="btns-footer-wrapperdiv">
                    {blogDetails?.btn_name1 ?
                      <>
                          <Link href={blogDetails?.btn_link1} className="">
                            {blogDetails?.btn_name1}
                          </Link>
                      </> :
                      ''}

                      {blogDetails?.btn_name2 ?
                        <>
                          <Link href={blogDetails?.btn_link2} className="">
                            {blogDetails?.btn_name2}
                          </Link>
                        </> :
                      ''}
                  </div>
                </div>
                <div className="book-appointment">
                  <div className="book-appointment-box-wrapper">
                    <div className="sitback-logo">
                      <Image isContainImg={true} alt="sitback" src="/images/sitback-white-logo.svg" />
                    </div>
                    <h4><span>{t('sitbackText')}: </span>{t("blogPageText4")}</h4>
                    <div className="servicesgrid-row">
                    {blogDetails?.servicelist && blogDetails.servicelist.length > 0 ? (
                      <div className="grid-row">
                        {blogDetails.servicelist.map((serviceData, serviceIndex) => (
                          <div className="grid-col" key={serviceIndex}>
                            <div className="services-box-wrapper" onClick={() => serviceSpsRedirect(serviceData)}>
                              <div className="clearfix">
                                <div className="box-icons">
                                  <Image isContainImg={true} alt="sitback" src={serviceData?.image} />
                                </div>
                              </div>
                              <p>{serviceData?.name}</p>
                            </div>

                          </div>
                        ))}
                      </div>
                    ) : ''}

                    </div>
                    <div className="services-btn">
                      <Button className="view-all-service-link"  onClick={() => { push(PATH_AUTH?.services) }}>{t("blogPageText5")}</Button>
                      {/* <Link href="/" className="view-all-service-link">
                        View all Services
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="blog-detail-col-wrapper">
              {blogDetails?.randomblogdata && blogDetails.randomblogdata.length > 0 ? (
                <div className="blog-detail-desktop-view">
                  <Row>
                     {blogDetails.randomblogdata.map((blogData, blogIndex) => (

                        <Col xs="12" md="6" lg="4" key={blogIndex}>
                          <BlogDetailBox className="blog-detail-updated-wrapper"
                          onClick={() => handleRedirectBlogDetails(blogData?.slug)}
                          >
                            <div className="blog-banner-wrapper">
                           <Image alt="sitback" src={blogData?.image ? blogData?.image : ""} />
                            </div>
                            <div className="blog-inner-detail-div">
                              <div>
                                <h6 className="blog-date-text">{moment(blogData?.date).format("D MMMM YYYY")}</h6>
                                <h4 className="blog-list-title-summary">{blogData?.title}</h4>
                                <p className="truncated-summary">
                                 {blogData?.sort_desc}
                                </p>
                              </div>
                              <Link
                                href={`${PATH_AUTH?.blog + "/" + blogData?.slug}`}
                                className="sitback-seemore"
                              >
                                {/* {t("blogPageText3")} */}
                                 {t('blogPageText7')}
                              </Link>
                            </div>
                          </BlogDetailBox>
                        </Col>
                    ))}
                  </Row>
                </div> ) : <></>
              }
             {blogDetails?.randomblogdata && blogDetails.randomblogdata.length > 0 ? (
              <>
                <div className="blog-detail-mobile-view">
                    <Swiper
                      slidesPerView={1.2}
                      spaceBetween={18}
                      loop={true}
                      className="mySwiper"
                      >
                      {blogDetails.randomblogdata.map((blogData, blogIndex) => (
                        <SwiperSlide key={blogIndex}>
                          <BlogDetailBox className="blog-detail-updated-wrapper"
                          onClick={() => handleRedirectBlogDetails(blogData?.slug)}
                          >
                            <div className="blog-banner-wrapper">
                              <Image alt="sitback" src={blogData?.image ? blogData?.image : ""} />
                            </div>
                            <div className="blog-inner-detail-div">
                              <div>
                                <h6 className="blog-date-text">{moment(blogData?.date).format("D MMMM YYYY")}</h6>
                                <h4 className="blog-list-title-summary">{blogData?.title}</h4>
                                <p className="truncated-summary">
                                  {blogData?.sort_desc}
                                </p>
                              </div>
                              <Link
                                href={`${PATH_AUTH?.blog + "/" + blogData?.slug}`}
                                className="sitback-seemore"
                              >
                                {/* {t("blogPageText3")} */}
                                {t('blogPageText7')}
                              </Link>
                            </div>
                          </BlogDetailBox>
                        </SwiperSlide>
                      ))}

                    </Swiper>
                </div>
              </>
             ) : <></>}
          </div>
        </Container>
      </BlogLayoutWrapper>
      <HomeFooter/>
      <BlogPath />
      {showHeader ? <></> : <BlogPath />}
    </>
  );
}

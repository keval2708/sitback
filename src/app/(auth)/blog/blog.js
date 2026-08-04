"use client";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { myHomePageSelectedDate, myHomePageSelectedService } from "@/redux/service";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Image, SubTitleText18, } from "@/styles/global/main.style";
import { BlogDetailBox, BlogLayoutWrapper } from "@/styles/pages/blog.style";
import { ComingSoonLayoutWrapper, ScottsdaleBoxWrapper, } from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function Blog() {

  //hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { t } = useTranslation();

  //state
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]); // Stores the blog data
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [totalBlog, setTotalBlog] = useState(0); // Total number of pages
  const blogsPerPage = 9;

  // Fetch blog data whenever the currentPage changes
  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      let param = {
        page: currentPage,
        perpage: blogsPerPage,
      };

      const res = await axiosApiCall.post(API_ROUTER?.BLOG, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setBlogs(res?.data?.data);
        setTotalBlog(res?.data?.totalBlog);
        setTotalPages(res?.data?.totalPages);
      }
    } catch (error) {
      // console.error("Error fetching blogs:", error);
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

  const handleRedirectBlogDetails = (slug) => {
    push(PATH_AUTH?.blog + "/" + slug);
  };



  //hooks
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedService(null))
    getProfileInfo();
    document.body.classList.add("background-white-layout");
  }, []);

  const getProfileInfo = async () => {
    const token = (await getCookie("token")) || "";
    if (token == "") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
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
              <p className="breadcrumb-text">Home  Services</p>
              <div className="banner-content-wrapper sitback-blog-updated-content-wrapper">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>{t("blogPageText1")}</h1>
                    <p>{totalBlog} {t('blogPageText6')}</p>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>
      <BlogLayoutWrapper className="blog-updated-wrapper">
        <Container fluid>
              {/* <div className="clud-img-div">
                <Image isContainImg={true} alt="sitback" src="/images/clud-img.svg" />
              </div>
              <div className="clud-img-div right-side-wrapper">
                <Image isContainImg={true} alt="sitback" src="/images/clud-img.svg" />
              </div> */}
              {loading ? (
                <>
                  {/* <Loader loading={loading} /> */}
                  <Container>
                  <>
                  {/* <div className="our-blogs-header">
                    <SubTitleText48>{t("blogPageText1")}</SubTitleText48>
                  </div> */}
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
                            slidesPerView: 1,
                          },
                          768: {
                            slidesPerView: 2,
                          },
                          1024: {
                            slidesPerView: 3,
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
                <div>
                  {/* <div className="our-blogs-header">
                    <SubTitleText48>{t("blogPageText1")}</SubTitleText48>
                  </div> */}

                  <Row>
                    {blogs && blogs.length > 0 ? (
                      blogs.map((blog, index) => (
                        <Col xs="12" md="6" lg="4" key={index}>
                          <BlogDetailBox className="blog-detail-updated-wrapper" onClick={() => handleRedirectBlogDetails(blog?.slug)}>
                            <div className="blog-banner-wrapper">
                              <Image alt="sitback" src={blog?.image ? blog?.image : ""} />
                            </div>
                            <div className="blog-inner-detail-div">
                              <div>
                                <h6 className="blog-date-text">{moment(blog?.date).format("D MMMM YYYY")}</h6>
                                <h4 className="blog-list-title-summary">{blog?.title}</h4>
                                <p className="truncated-summary">{blog?.sort_desc}</p>
                              </div>
                              <Link
                                href={`${PATH_AUTH?.blog + "/" + blog?.slug}`}
                                className="sitback-seemore"
                              >
                              {t('blogPageText7')}
                              </Link>
                            </div>
                          </BlogDetailBox>
                        </Col>
                      ))
                    ) : (
                      <div className="no-blogs-message">
                        <SubTitleText18 className="text-center">
                          {t("blogPageText2")}
                        </SubTitleText18>
                      </div>
                    )}
                  </Row>
                  {blogs?.length > 0 && (
                  <>
                    {/* Pagination */}
                    <div className="pagination-footer-wrapper">
                    {blogs?.length > 0 && (
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
                  </>
                )}
              </div>
            )}
        </Container>
      </BlogLayoutWrapper>
       <HomeFooter/>
      {showHeader ? <></> : <BlogPath />}
    </>
  );
}

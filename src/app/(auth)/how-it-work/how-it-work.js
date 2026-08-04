"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import BlogHeader from "@/components/blogheader/page";
import BlogPath from "@/components/blogpath/page";
import HomeFooter from "@/components/homefooter/page";
import { myHomePageSelectedDate, myHomePageSelectedService } from "@/redux/service";
import {
  Image,
  MainLayoutWrapper,
} from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, SpasNearLayoutWrapper, } from "@/styles/pages/comingsoon.style";
import { getCookie } from "@/utils/cookie";
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function Services() {

  //hooks
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //state
  const [showHeader, setShowHeader] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(myHomePageSelectedDate(null))
    dispatch(myHomePageSelectedService(null))
    document.body.classList.add("background-white-layout");
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




  return (
    <>
      <BlogHeader />
      <MainLayoutWrapper>
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
              <div className="banner-content-wrapper">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>{t('bookTheBestSpasText')}</h1>
                    {/* <p>Unmatched Relaxation at Top Spas wherever you go.</p> */}
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>
        <SpasNearLayoutWrapper className="how-it-work-video-main-div">
          <Container>
            {/* <div className="our-blogs-header">
              <SubTitleText48>Book The Best Spas With Sitback</SubTitleText48>
            </div> */}

            <div className="position-relative video-banner-wrapper">
              {!isPlaying && (
                <div
                  className="thumbnail-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                  backgroundImage: "url('/images/t0008.74seg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsPlaying(true)}
                >
                  <button className="btn btn-light">
                    <Image isContainImg alt="sitback" src="/images/play-icon.svg" />
                  </button>
                </div>
              )}
              <ReactPlayer
                url="https://media.sitback.io/video.mp4"
                playing={isPlaying}
                controls={true}
                width="100%"
                height="100%"
                style={{ zIndex: 1 }}
              />
            </div>
          </Container>
        </SpasNearLayoutWrapper>
      </MainLayoutWrapper>
      <HomeFooter/>
      {showHeader ? <></> : <BlogPath />}
    </>
  );
}

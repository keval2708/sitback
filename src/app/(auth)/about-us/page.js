"use client";

import React from "react";
import { Container } from "react-bootstrap";
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import { AboutUsLayoutWrapper,Image,MainLayoutWrapper } from "@/styles/global/main.style";
import {
  ComingSoonLayoutWrapper,
  ForBusinessDetailDiv,
} from "@/styles/pages/comingsoon.style";
export default function TermsAndConditions() {



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
              <div className="banner-content-wrapper about-us-banner-content-div">
                <div className="banner-top-title-div">
                  <Container>
                    <h1>Sitback.io</h1>
                    <p className="about-banner-para-text">The OpenTable for Wellness Appointments</p>
                  </Container>
                </div>
              </div>
            </div>
          </section>
        </ComingSoonLayoutWrapper>
        <ForBusinessDetailDiv className="about-us-page-updated-div">
          <Container fluid>
            <div className="for-business-main-div">
              <div className="business-content-div">
                <div className="business-image-div">
                  <div className="img-div">
                    <Image isContainImg={true} alt="sitback" src="/images/about-us-image-1.png" />
                  </div>
                </div>
                <div className="business-detail-div">
                  <div className="business-detail-inner-div">
                    <h3 className="about-us-page-title-text">
                    Sitback Story
                    </h3>
                    <div className="para-text-div">
                      <p>At SitBack.io, we believe managing a spa or wellness business should be as relaxing as the services you provide. That’s why we created SitBack—a seamless, all-in-one platform that simplifies booking, CRM, POS, and employee management.</p>
                      <p>Our SitBack app works like an open marketplace for spa appointments, making it easy for clients to book their next visit while you focus on delivering exceptional experiences.</p>
                      <p>We’re here to help you grow, streamline your operations, and create a stress-free environment—for you and your clients.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="business-content-div">
                <div className="business-detail-div">
                  <div className="business-detail-inner-div">
                    <h3 className="about-us-page-title-text">
                    Sitback Mission
                    </h3>
                    <div className="para-text-div">
                      <p>At SitBack.io, our mission is to empower spa and wellness businesses to thrive by simplifying operations, enhancing customer relationships, and optimizing employee management.</p>
                      <p>We are dedicated to providing intuitive, all-in-one software solutions that allow business owners to focus on delivering exceptional experiences while we take care of the rest</p>
                      <p>Through innovation, reliability, and a commitment to excellence, we strive to be the trusted partner that helps our clients grow, succeed, and achieve peace of mind. Sitback, relax, and let us handle the details</p>
                    </div>
                  </div>
                </div>
                <div className="business-image-div">
                  <div className="img-div">
                    <Image isContainImg={true} alt="sitback" src="/images/about-us-image-2.png" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </ForBusinessDetailDiv>
          <AboutUsLayoutWrapper>
            {/* <div className="cloud-image-wrapper">
              <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
            </div>
            <div className="cloud-image-wrapper right-side-cloud-img">
              <Image isContainImg={true} alt="sitback" src="/images/Union.svg" />
            </div> */}
            {/* <div className="about-banner-wrapper">
              <Container>
                <SubTitleText48>Our Mission</SubTitleText48>
                <p>At SitBack.io, our mission is to empower spa and wellness businesses to thrive by simplifying operations, enhancing customer relationships, and optimizing employee management.</p>
                <p>We are dedicated to providing intuitive, all-in-one software solutions that allow business owners to focus on delivering exceptional experiences while we take care of the rest. </p>
                <p>Through innovation, reliability, and a commitment to excellence, we strive to be the trusted partner that helps our clients grow, succeed, and achieve peace of mind. Sitback, relax, and let us handle the details.</p>
              </Container>
            </div>
            <div className="story-section-wrapper">
              <div className="grid-row">
                <div className="grid-col">
                  <div className="our-story-block">
                    <SubTitleText48 className="text-center text-sm-start">Our Story</SubTitleText48>
                      <p>At SitBack.io, we believe managing a spa or wellness business should be as relaxing as the services you provide. That’s why we created SitBack—a seamless, all-in-one platform that simplifies booking, CRM, POS, and employee management.</p>
                      <p>Our SitBack app works like an open marketplace for spa appointments, making it easy for clients to book their next visit while you focus on delivering exceptional experiences. </p>
                      <p>We’re here to help you grow, streamline your operations, and create a stress-free environment—for you and your clients.</p>
                  </div>
                </div>
                <div className="grid-col logo-block">
                  <div className="sitback-logo-wrapper">
                    <div className="sitback-logo">
                      <Image isContainImg={true} alt="sitback" src="/images/sitback-05.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </AboutUsLayoutWrapper>
        </MainLayoutWrapper>
      <HomeFooter/>
    </>
  );
}

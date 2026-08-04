"use client";

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import {LoginTextTitle,PrivacyPolicyWrapper } from "@/styles/global/main.style";
import { ComingSoonLayoutWrapper, } from "@/styles/pages/comingsoon.style";
export default function TermsAndConditions() {

   useEffect(() => {
    document.body.classList.remove("background-white-layout");
  }, []);


  return (
    <>
      <BlogHeader />
      <ComingSoonLayoutWrapper className="sitback-revamp-banner-section sitback-small-size-banner-div sitback-other-page-banner-div">
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
            <div className="banner-content-wrapper terms-banner-content-wrapper">
              <div className="banner-top-title-div banner-top-other-page-title-div">
                <Container>
                  <h1 className="terms-page-title-text">Sitback <br /> Terms and Conditions</h1>
                  {/* <p>Unmatched Relaxation at Top Spas wherever you go.</p> */}
                </Container>
              </div>
            </div>
          </div>
        </section>
      </ComingSoonLayoutWrapper>
      <PrivacyPolicyWrapper className="privacy-policy-updated-div">
          {/* <div className="cloud-image-wrapper">
            <Image alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-side-cloud-img">
            <Image alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-bottom-side-cloud-img">
            <Image alt="sitback" src="/images/Union.svg" />
          </div>
          <div className="cloud-image-wrapper right-bottom4-side-cloud-img">
            <Image alt="sitback" src="/images/Union.svg" />
          </div> */}
        <Container>
          {/* <LoginTextTitle style={{fontWeight: "500"}}>Sitback Terms and Conditions</LoginTextTitle> */}
          <LoginTextTitle className="terms-main-title">Terms and Conditions</LoginTextTitle>
          <div>
            <h5>1. Acceptance of Terms</h5>
           <p>Welcome to SitBack.io (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, platform, and services (collectively, the &quot;Services&quot;), you agree to comply with and be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to these Terms, please refrain from using our Services.</p>
          </div>
          <div>
            <h5>2. Services Provided</h5>
            <p>SitBack.io provides CRM, POS, and employee management software solutions tailored for the spa and wellness industry. All features, functionality, and services are subject to availability and may be updated, modified, or discontinued at our discretion.</p>
          </div>
          <div>
            <h5>3. User Responsibilities</h5>
            <p>By using our Services, you agree to:</p>
            <ul>
              <li>Provide accurate and up-to-date information during registration and use.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Use the Services only for lawful purposes and in compliance with all applicable laws and regulations.</li>
              <li>Refrain from engaging in unauthorized access, reverse engineering, or misuse of our platform.</li>
            </ul>
          </div>
          <div>
            <h5>4. Payment and Subscriptions</h5>
            <ul>
              <li>Users are required to pay all fees associated with their subscription to our Services.</li>
              <li>Subscription fees are non-refundable except as stated explicitly in these Terms or applicable law.</li>
              <li>We reserve the right to modify pricing and billing terms with prior notice.</li>
            </ul>
          </div>
          <div>
            <h5>5. Intellectual Property</h5>
            <p>All content, trademarks, logos, and materials available on SitBack.io are the exclusive property of SitBack.io and are protected under intellectual property laws. You may not reproduce, distribute, or otherwise exploit our intellectual property without prior written consent.</p>
          </div>
          <div>
            <h5>6. Data Privacy</h5>
            <p>We prioritize the protection of your data. Please review our Privacy Policy for details on how we collect, use, and protect your personal information.</p>
          </div>
          <div>
            <h5>7. Limitation of Liability</h5>
            <p>To the maximum extent permitted by law, SitBack.io and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.</p>
          </div>
          <div>
            <h5>8. Termination</h5>
            <p>We reserve the right to suspend or terminate your access to the Services at our sole discretion for violations of these Terms or any other reason, with or without prior notice.</p>
          </div>
          <div>
            <h5>9. Modifications to Terms</h5>
            <p>We may update these Terms periodically. Any changes will be posted on this page, and continued use of our Services constitutes acceptance of the updated Terms.</p>
          </div>
          <div>
            <h5>10. Governing Law</h5>
            <p>These Terms and your use of the Services shall be governed by and construed in accordance with the laws of the jurisdiction in which SitBack.io operates.</p>
          </div>
          <div>
            <h5>11. Contact Us</h5>
            <p className="mb-1">For any questions or concerns regarding these Terms, please contact us at:</p>
            <div className="contact-terms-link-wrapper">
              <p className="mb-1"><a href="" target="_blank" rel="noreferrer" className="underline-unset">SitBack.io Support</a></p>
              <p className="mb-1">Email: <a href="mailto:support@sitback.io" target="_blank" rel="noreferrer" className="underline-unset">support@sitback.io</a></p>
              <p className="mb-1">Website: <a href="https://www.sitback.io/" target="_blank" rel="noreferrer">www.sitback.io</a></p>
            </div>
          </div>
        </Container>
      </PrivacyPolicyWrapper>
      <HomeFooter/>
    </>
  );
}

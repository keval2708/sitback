"use client";
import { useEffect, useState } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import BlogHeader from "@/components/blogheader/page";
import HomeFooter from "@/components/homefooter/page";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { BlogLayoutWrapper } from "@/styles/pages/blog.style";
import { ComingSoonLayoutWrapper } from "@/styles/pages/comingsoon.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import 'react-loading-skeleton/dist/skeleton.css'

export default function FAQS() {
  //state
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);

  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  useEffect(() => {
    listFaq();
  }, []);

  const listFaq = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_FAQS);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setFaqData(res.data.data);
      }
    } catch (error) {
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
            <p className="breadcrumb-text">Home / FAQs</p>
            <div className="banner-content-wrapper sitback-blog-updated-content-wrapper">
              <div className="banner-top-title-div">
                <Container>
                  <h1>FAQs</h1>
                </Container>
              </div>
            </div>
          </div>
        </section>
      </ComingSoonLayoutWrapper>

      <BlogLayoutWrapper className="blog-updated-wrapper faq-page-wrapper">
        <Container>
          <div className="faq-page-inner-div">
            {loading ? (
              // Loading skeleton for FAQs
              <div className="faq-loading-skeleton">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="faq-skeleton-item" style={{ marginBottom: '20px' }}>
                    <Skeleton height={70} />
                    <div style={{ padding: '20px' }}>
                      <Skeleton count={3} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // FAQ Content
              faqData && faqData.length > 0 ? (
                <Accordion defaultActiveKey="0" className="faq-accordion-wrapper">
                  {faqData.map((faq, index) => (
                    <Accordion.Item eventKey={index.toString()} key={faq.id || index}>
                      <Accordion.Header>
                        #{faq.question}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="faq-accordion-body-div">
                          <p>{faq.answer}</p>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                // No FAQs available
                <div className="no-faqs-message text-center py-5">
                  <h3>No FAQs Available</h3>
                  <p className="text-muted">Please check back later for frequently asked questions.</p>
                </div>
              )
            )}
          </div>
        </Container>
      </BlogLayoutWrapper>

      <HomeFooter />
    </>
  );
}

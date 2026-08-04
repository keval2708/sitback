"use client";

import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import InlineSVG from "svg-inline-react";
import { formatServiceDuration, formatServicePriceWithOutDesimalPoint } from "./utils";
import AssignServicesModal from "../dashboards/models/AssignServicesModal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { MoreOptionGrey_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


export default function TherapistServices({ therapist, onManageSchedule, refreshTrigger = 0 }) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTherapistServices = async () => {
    if (!therapist?.id) return;

    try {
      setLoading(true);
      let params = {
        employeeId: therapist?.id,
        status: "onlyAdded"
      };
      const servicesRes = await axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_SERVICES, { params });
      const allServices = servicesRes?.data?.data || [];
      setServices(allServices);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTherapistServices();
  }, [therapist?.id, refreshTrigger]);

  return (
    <section className="services-section">
      <div className="services-section-header">
        <h2>{t("services")}</h2>
        <button type="button" className="add-services-btn" onClick={onManageSchedule}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#295086" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.9994 11.2432V20.7567V11.2432Z" fill="#295086" />
            <path d="M15.9994 11.2432V20.7567" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20.7568 16.0002H11.2433H20.7568Z" fill="#295086" />
            <path d="M20.7568 16.0002H11.2433" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("addMoreServices")}</span>
        </button>
      </div>

      <div className="services-cards-row slick-slider-container">
        {loading && <p className="services-empty">{t("loading")}</p>}

        {!loading && services.length === 0 && (
          <p className="services-empty">{t("noServicesAssigned")}</p>
        )}

        {!loading && services.length > 0 && (
          <Slider {...sliderSettings}>
            {services.map((service) => (
              <div key={service.id} className="box-white">
                <div className="service-card">
                  <div className="user-detail-wrapper">
                    <p className="service-name">{service?.name}</p>
                    <div>
                      <div className="service-card-top therapist-service-dropdown">
                        <div className="service-icon">
                          <img
                            alt={service?.name}
                            src={service?.image || "/images/right-top-img-1.svg"}
                          />
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="link" className="service-menu-btn">
                            <InlineSVG src={MoreOptionGrey_icon} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={onManageSchedule}>
                              {/* {t("manageSchedule")} */}
                              Manage Service
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="service-meta">
                    <div className="time-price-wrapper">
                      <i>
                        <img alt="clock" src="/images/clock-icon.svg" />
                      </i>
                      <div className="meta-item">
                        <span className="meta-label">{t("time")}</span>
                        <span className="meta-value">{formatServiceDuration(service)}</span>
                      </div>
                    </div>
                    <div className="time-price-wrapper" style={{ justifyContent: "flex-end" }}>
                      <i>
                        <img alt="price" src="/images/dollar-icon.svg" />
                      </i>
                      <div className="meta-item">
                        <span className="meta-label">{t("price")}</span>
                        <span className="meta-value">{formatServicePriceWithOutDesimalPoint(service?.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export function TherapistServicesWithModal({ therapist }) {
  const [showAssignServicesModal, setShowAssignServicesModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleServicesUpdated = () => {
    setShowAssignServicesModal(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <TherapistServices
        therapist={therapist}
        refreshTrigger={refreshTrigger}
        onManageSchedule={() => setShowAssignServicesModal(true)}
      />
      <AssignServicesModal
        show={showAssignServicesModal}
        onHide={() => setShowAssignServicesModal(false)}
        onConfirm={handleServicesUpdated}
        employeeData={therapist}
      />
    </>
  );
}

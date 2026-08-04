"use client";

import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  ServiceCard,
  ServiceCardHeader,
  ServiceHeaderLeft,
  ServiceMetaGroup,
  ServiceMetaItem,
  ServiceMetaLabel,
  ServiceMetaText,
  ServiceMetaValue,
  ServiceName,
  TherapistAvatar,
  TherapistCount,
  TherapistInfo,
  TherapistList,
  TherapistMappingEmptyState,
  TherapistMappingSection,
  TherapistName,
  TherapistOption,
  TherapistSpecialties,
} from "@/styles/pages/therapist-mapping.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const SKELETON_CARD_COUNT = 3;
const SKELETON_THERAPIST_COUNT = 3;

const ServiceCardSkeleton = () => (
  <ServiceCard>
    <ServiceCardHeader>
      <ServiceHeaderLeft>
        <Skeleton width={180} height={20} />
        <ServiceMetaGroup>
          <ServiceMetaItem>
            <Skeleton width={28} height={28} borderRadius={4} />
            <ServiceMetaText>
              <Skeleton width={40} height={10} />
              <Skeleton width={50} height={14} />
            </ServiceMetaText>
          </ServiceMetaItem>
          <ServiceMetaItem>
            <Skeleton width={28} height={28} borderRadius={4} />
            <ServiceMetaText>
              <Skeleton width={40} height={10} />
              <Skeleton width={60} height={14} />
            </ServiceMetaText>
          </ServiceMetaItem>
        </ServiceMetaGroup>
      </ServiceHeaderLeft>
      <TherapistCount>
        <Skeleton width={40} height={28} />
        <Skeleton width={70} height={14} style={{ marginTop: 4 }} />
      </TherapistCount>
    </ServiceCardHeader>
    <TherapistList>
      {Array.from({ length: SKELETON_THERAPIST_COUNT }).map((_, index) => (
        <TherapistOption key={index}>
          <Skeleton circle width={44} height={44} />
          <TherapistInfo>
            <Skeleton width={120} height={14} />
            <Skeleton width={100} height={12} style={{ marginTop: 4 }} />
          </TherapistInfo>
        </TherapistOption>
      ))}
    </TherapistList>
  </ServiceCard>
);

const TimeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="4" fill="#3B67A3" />
    <path d="M8.45672 16.2961C8.15519 15.5681 8 14.7879 8 14C8 12.4087 8.63214 10.8826 9.75736 9.75736C10.8826 8.63214 12.4087 8 14 8C15.5913 8 17.1174 8.63214 18.2426 9.75736C19.3679 10.8826 20 12.4087 20 14C20 14.7879 19.8448 15.5681 19.5433 16.2961C19.2417 17.0241 18.7998 17.6855 18.2426 18.2426C17.6855 18.7998 17.0241 19.2417 16.2961 19.5433C15.5681 19.8448 14.7879 20 14 20C13.2121 20 12.4319 19.8448 11.7039 19.5433C10.9759 19.2417 10.3145 18.7998 9.75736 18.2426C9.20021 17.6855 8.75825 17.0241 8.45672 16.2961Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10.6666V14L16 16" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PriceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V24C28 26.2091 26.2091 28 24 28H4C1.79086 28 0 26.2091 0 24V4Z" fill="#3B67A3" />
    <path d="M11.3333 16.3334H10C10 18.06 11.6133 19.08 13.3333 19.2934V20.6667H14.6667V19.2867C16.1667 19.0867 18 18.2267 18 16.3334C18 14.44 16.1667 13.58 14.6667 13.38V10.0667C15.5533 10.2267 16.6667 10.6934 16.6667 11.6667H18C18 9.77337 16.1667 8.91337 14.6667 8.71337V7.33337H13.3333V8.71337C11.8333 8.91337 10 9.77337 10 11.6667C10 13.56 11.78 14.4067 13.3333 14.62V17.9334C12.3667 17.7667 11.3333 17.2534 11.3333 16.3334ZM16.6667 16.3334C16.6667 17.3067 15.5533 17.7734 14.6667 17.9334V14.7334C15.5533 14.8934 16.6667 15.36 16.6667 16.3334ZM11.3333 11.6667C11.3333 10.6934 12.4467 10.2267 13.3333 10.0667V13.2667C12.42 13.1 11.3333 12.6 11.3333 11.6667Z" fill="white" />
  </svg>
);

const getInitials = (name = "") => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }
  return (parts[0] || "?").substring(0, 2).toUpperCase();
};

const formatDuration = (service) => {
  const hours = Number(service?.hour || service?.hours || 0);
  const minutes = Number(service?.minutes || service?.minute || 0);
  const totalMins = hours * 60 + minutes;
  if (!totalMins && service?.duration) return String(service.duration);
  return `${totalMins || 0}min`;
};

const formatPrice = (price) => {
  const amount = Number(price || 0);
  return `$${amount.toFixed(2)}`;
};

const formatPhone = (therapist) => {
  const code = therapist?.countrycode || therapist?.countryCode || therapist?.dialCode || "";
  const phone =
    therapist?.phone ||
    therapist?.phoneNumber ||
    therapist?.mobile ||
    therapist?.mobileNumber ||
    "";
  if (!phone) return "N/A";
  return `${code ? `${code} ` : ""}${phone}`.trim();
};

const getTherapistName = (therapist) => {
  if (therapist?.username) return therapist.username;
  if (therapist?.name) return therapist.name;
  if (therapist?.employeeName) return therapist.employeeName;
  const first = therapist?.firstName || therapist?.first_name || "";
  const last = therapist?.lastName || therapist?.last_name || "";
  const full = `${first} ${last}`.trim();
  return full || "Therapist";
};

const getTherapistList = (service) => {
  const list =
    service?.therapistList ||
    service?.therapists ||
    service?.employeeList ||
    service?.employees ||
    service?.assignedTherapists ||
    service?.therapist_list ||
    service?.employee_list ||
    [];
  return Array.isArray(list) ? list : [];
};

const TherapistMapping = ({ searchText = "" }) => {
  const { toaster } = useToaster();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(
        `${API_ROUTER?.GET_MY_SERVICES_LIST}?isTherapistListNeeded=true`
      );
      if (!res?.status) {
        return toaster(res?.message || TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
      setServices(res?.data?.data || []);
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchText?.trim()) return services;
    const query = searchText.trim().toLowerCase();

    return services.filter((service) => {
      const serviceName = String(service?.name || "").toLowerCase();
      if (serviceName.includes(query)) return true;

      return getTherapistList(service).some((therapist) => {
        const name = getTherapistName(therapist).toLowerCase();
        const phone = formatPhone(therapist).toLowerCase();
        return name.includes(query) || phone.includes(query);
      });
    });
  }, [services, searchText]);

  if (loading) {
    return (
      <TherapistMappingSection>
        {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </TherapistMappingSection>
    );
  }

  if (!filteredServices.length) {
    return (
      <TherapistMappingSection>
        <TherapistMappingEmptyState>
          {!services.length
            ? "No Services are configured"
            : "No services found."}
        </TherapistMappingEmptyState>
      </TherapistMappingSection>
    );
  }

  return (
    <TherapistMappingSection>
      {filteredServices.map((service) => {
        const therapists = getTherapistList(service);
        const therapistCount = therapists.length;

        return (
          <ServiceCard key={service.id || service.serviceId || service.name}>
            <ServiceCardHeader>
              <ServiceHeaderLeft>
                <ServiceName>{service.name}</ServiceName>
                <ServiceMetaGroup>
                  <ServiceMetaItem>
                    <TimeIcon />
                    <ServiceMetaText>
                      <ServiceMetaLabel>Time</ServiceMetaLabel>
                      <ServiceMetaValue>{formatDuration(service)}</ServiceMetaValue>
                    </ServiceMetaText>
                  </ServiceMetaItem>
                  <ServiceMetaItem>
                    <PriceIcon />
                    <ServiceMetaText>
                      <ServiceMetaLabel>Price</ServiceMetaLabel>
                      <ServiceMetaValue>{formatPrice(service.price)}</ServiceMetaValue>
                    </ServiceMetaText>
                  </ServiceMetaItem>
                </ServiceMetaGroup>
              </ServiceHeaderLeft>

              <TherapistCount>
                <strong>{therapistCount}</strong>
                <span>Therapist{therapistCount === 1 ? "" : "s"}</span>
              </TherapistCount>
            </ServiceCardHeader>

            <TherapistList>
              {therapists.length === 0 ? (
                <div style={{ fontSize: "13px", color: "#64748B" }}>
                  No therapists assigned
                </div>
              ) : (
                therapists.map((therapist) => {
                  const therapistId =
                    therapist.id || therapist.userId || therapist.employeeId || therapist._id;
                  const name = getTherapistName(therapist);
                  const image =
                    therapist.image ||
                    therapist.profile_image ||
                    therapist.thumb_image ||
                    null;

                  return (
                    <TherapistOption key={`${service.id}-${therapistId}`}>
                      <TherapistAvatar>
                        {image ? <img src={image} alt={name} /> : getInitials(name)}
                      </TherapistAvatar>
                      <TherapistInfo>
                        <TherapistName>{name}</TherapistName>
                        <TherapistSpecialties>{formatPhone(therapist)}</TherapistSpecialties>
                      </TherapistInfo>
                    </TherapistOption>
                  );
                })
              )}
            </TherapistList>
          </ServiceCard>
        );
      })}
    </TherapistMappingSection>
  );
};

export default TherapistMapping;

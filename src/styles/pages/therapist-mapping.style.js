"use client";

import styled from "@emotion/styled";

export const TherapistMappingSection = styled.div`
  background: #ffffff;
  padding: 24px;
`;

export const TherapistMappingEmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  width: 100%;
  padding: 24px;
  color: #64748b;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const ServiceCard = styled.div`
  border: 1px solid #d2e3f0;
  border-radius: 12px;
  background: #ffffff;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const ServiceCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f0f7;
  flex-wrap: wrap;
`;

export const ServiceHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;
`;

export const ServiceName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #295086;

`;

export const CategoryTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background: #e6f4ff;
  color: #0958d9;
  font-size: 12px;
  font-weight: 600;
`;

export const ServiceMetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-left: 30px;
`;

export const ServiceMetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  svg {
    flex-shrink: 0;
  }
`;

export const ServiceMetaText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ServiceMetaLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #295086;
  line-height: 1.2;
`;

export const ServiceMetaValue = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #295086;
  line-height: 1.2;
`;

export const TherapistCount = styled.div`
  text-align: center;
  min-width: 90px;

  strong {
    display: block;
    font-size: 28px;
    line-height: 1;
    color: #295086;
    font-weight: 700;
  }

  span {
    display: block;
    margin-top: 4px;
    font-size: 15px;
    color: #295086;
    font-weight: 400;
  }
`;

export const TherapistList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 20px 24px 24px;
`;

export const TherapistOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: default;
  min-width: 220px;
`;

export const TherapistRadio = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? "#004b87" : "#cbd5e1")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #ffffff;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ checked }) => (checked ? "#004b87" : "transparent")};
  }
`;

export const TherapistAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background: #dbeafe;
  color: #004b87;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TherapistInfo = styled.div`
  min-width: 0;
`;

export const TherapistName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #295086;

`;

export const TherapistSpecialties = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #64748b;
`;

"use client";
import React from "react";
import { Container } from "react-bootstrap";
import { Image } from "@/styles/global/main.style";
import {
  UnderMaintenanceLayoutWrapper,
} from "@/styles/pages/comingsoon.style";
export default function UnderMaintenance() {
  return (
    <UnderMaintenanceLayoutWrapper>
      <div className="cloud-image-wrapper">
        <Image alt="sitback" src="/images/image-01.svg" />
      </div>
      <div className="cloud-image-wrapper right-side-cloud-img">
        <Image alt="sitback" src="/images/image-02.svg" />
      </div>
      <Container>
        <div className="under-maintenance-detail">
          <div className="logo-detail-wrapper">
            <div className="sitback-logo-wrapper">
              <Image isContainImg={true} alt="sitback" src="/images/sitback-v3.svg" />
            </div>
            <h5 className="sub-title">Like Open Table.....but for wellness.</h5>
            <h2>Sorry! We are under Maintenance.</h2>
          </div>
          <div className="under-maintenance-banner">
            <Image isContainImg={true} alt="sitback" src="/images/maintenance-banner.svg" />
          </div>
        </div>
      </Container>
    </UnderMaintenanceLayoutWrapper>
  );
}

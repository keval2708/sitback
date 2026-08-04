"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GoogleLocation from "./GoogleLocations";
import { authCheckSliceSelector } from "@/redux/authCheck";

export const Location = () => {
  const { t } = useTranslation();
  const { login } = useSelector(authCheckSliceSelector);

  return (
    <div className="profile-subtab-panel">
      <div className="location-header-row" style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#295086", margin: 0 }}>
          {t("Spa Location") || "Spa Location"}
        </h3>
      </div>
      <GoogleLocation
        location={{
          address: login?.location,
          lat: login?.lat || null,
          log: login?.log || null,
        }}
        draggable={false}
        onChangeLocation={() => { }}
      />
    </div>
  );
};

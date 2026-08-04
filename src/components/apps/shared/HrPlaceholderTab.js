"use client";

import React from "react";
import {
  HrPageHeader,
  HrPageTitleBlock,
  HrPlaceholder,
} from "@/styles/pages/hr-module.style";

export default function HrPlaceholderTab({ title, description }) {
  return (
    <>
      <HrPageHeader>
        <HrPageTitleBlock>
          <h1>{title}</h1>
          <p>{description}</p>
        </HrPageTitleBlock>
      </HrPageHeader>
      <HrPlaceholder>
        <h2>{title}</h2>
        <p>This section will be available soon.</p>
      </HrPlaceholder>
    </>
  );
}

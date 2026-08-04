"use client";

import React from "react";
import { HrModuleShell } from "@/components/apps";
import { MainLayoutWrapper } from "@/styles/global/main.style";

export default function PayrollAppPage() {
  return (
    <MainLayoutWrapper>
      <HrModuleShell defaultTab="dashboard" />
    </MainLayoutWrapper>
  );
}

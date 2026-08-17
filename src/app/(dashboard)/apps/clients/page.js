"use client";

import React from "react";
import AppsClients from "@/components/apps/clients/AppsClients";
import { MainLayoutWrapper } from "@/styles/global/main.style";

export default function ClientsAppPage() {
  return (
    <MainLayoutWrapper>
      <AppsClients />
    </MainLayoutWrapper>
  );
}

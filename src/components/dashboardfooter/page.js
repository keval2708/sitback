"use client";

import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { PATH_AUTH } from "@/routes/paths";
import {
  FooterBarWrapper,
} from '@/styles/pages/header.style';

export default function DashBoardFooter() {
  return (
    <FooterBarWrapper>
      <Container>
        <p>All rights reserved sitback inc. {new Date().getFullYear()} | <Link href={PATH_AUTH?.privacyPolicy}> Privacy Policy</Link></p>
      </Container>
    </FooterBarWrapper>
  )
}

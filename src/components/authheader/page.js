"use client";

import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { HeaderBarWrapper } from "@/styles/pages/header.style";

export default function AuthHeaderBar() {
  // Hooks
  return (
    <>
      <HeaderBarWrapper>
        <Container>
          <div className="sitback-header-wrapper">
            <Link href={""} className="sitback-logo-wrapper">
              <img alt="sitback" src="/images/sitback-relax-logo.svg" />
            </Link>
          </div>
        </Container>
      </HeaderBarWrapper>
    </>
  );
}

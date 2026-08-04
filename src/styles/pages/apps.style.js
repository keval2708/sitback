"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const AppsMarketplace = styled.div`
  background: ${theme.color.white};
  min-height: calc(100vh - 80px);
  padding: 36px 40px 56px;

  ${mediaQueries("lg")`
    padding: 28px 24px 48px;
  `}

  ${mediaQueries("sm")`
    padding: 20px 16px 40px;
  `}
`;

export const AppsMarketplaceInner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const AppsMarketplaceHeader = styled.header`
  margin-bottom: 28px;
  text-align: center;
`;

export const AppsMarketplaceTitle = styled.h1`
  margin: 0 0 8px;
  color: ${theme.color.secondary};
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;

  ${mediaQueries("lg")`
    font-size: 28px;
  `}

  ${mediaQueries("sm")`
    font-size: 24px;
  `}
`;

export const AppsMarketplaceSubtitle = styled.p`
  margin: 0;
  color: ${theme.color.darkblue};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`;

export const AppsMarketplaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  ${mediaQueries("lg")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${mediaQueries("sm")`
    grid-template-columns: 1fr;
    gap: 14px;
  `}
`;

export const AppsCard = styled.article`
  background: ${theme.color.white};
  border: 1px solid #DFECF9;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  /* box-shadow: 0 2px 10px ${theme.color.darkblue06};
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease; */

  &:hover {
    border-color: ${theme.color.primary};
    box-shadow: 0 8px 24px ${theme.color.darkblue06};
    transform: translateY(-2px);
  }

  ${mediaQueries("sm")`
    min-height: auto;
    padding: 20px;
  `}
`;

export const AppsCardIcon = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 16px;

`;

export const AppsCardTitle = styled.h2`
  margin: 0 0 8px;
  color: ${theme.color.secondary};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
`;

export const AppsCardDescription = styled.p`
  margin: 0 0 24px;
  color: ${theme.color.secondary};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;
`;

export const AppsCardCta = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 10px 18px;
  border: none;
  border-radius: 999px;
  background: ${theme.color.secondary};
  color: ${theme.color.white};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, opacity 0.15s ease;

  &:hover {
    background: ${theme.color.logintitlecolor};
    color: ${theme.color.white};
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${theme.color.primary};
    outline-offset: 2px;
  }
`;

"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const ProfileServicesLayoutWrapper = styled.div`
  padding: 45px 0;
  min-height: calc(100vh - 100px);
  background: #f8f9fa;

  &.sitback-updated-profile-services-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 80px;
    min-height: calc(100vh - 122px);
    ${mediaQueries("md")`
      padding: 40px 0 60px;
    `}

    ${mediaQueries("sm")`
      padding: 30px 0 50px;
    `}

    .select-profile-content {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .select-profile-header {
      text-align: center;
      margin-bottom: 48px;

      ${mediaQueries("sm")`
        margin-bottom: 32px;
      `}

      h1 {
        /* font-family: ${theme.font.fontFamilyPoppins}; */
        font-size: 36px !important;
        font-weight: 700;
        line-height: 1.2;
        color: ${theme.color.secondary};
        margin-bottom: 12px;

        ${mediaQueries("lg")`
          font-size: 32px;
        `}

        ${mediaQueries("md")`
          font-size: 28px;
        `}

        ${mediaQueries("sm")`
          font-size: 24px;
        `}
      }

      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.color.darkblue};
        margin: 0;
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;

        ${mediaQueries("sm")`
          font-size: 14px;
        `}
      }
    }

    .select-profile-cards {
      display: flex;
      align-items: stretch;
      justify-content: center;
      gap: 28px;


      ${mediaQueries("md")`
        flex-direction: column;
        align-items: center;
        gap: 20px;
      `}
    }

    .select-profile-card {
      flex: 1;
      max-width: 420px;
      width: 100%;
      background: ${theme.color.white};
      border-radius: 14px;
      box-shadow: 0 4px 24px rgba(41, 80, 134, 0.08);
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
      border: 1px solid #DFECF9;

      ${mediaQueries("md")`
        max-width: 100%;
      `}

      ${mediaQueries("sm")`
        padding: 28px 24px;
      `}

      &:hover {
        box-shadow: 0 8px 32px rgba(41, 80, 134, 0.12);
        transform: translateY(-2px);
      }

      .select-profile-card-icon {
        width: 64px;
        height: 64px;
        border-radius: 12px;
        background: #eef6ff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
      }

      h2 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.3;
        color: ${theme.color.secondary};
        margin: 0;

        ${mediaQueries("sm")`
          font-size: 20px;
        `}
      }

      p {

        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.color.darkblue};
        margin: 0;
        flex: 1;
      }

      .select-profile-card-btn {
        width: auto;
        min-width: 180px;
        padding: 12px 28px;
        border-radius: 50px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 13px;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(41, 80, 134, 0.2);
        margin-top: 8px;

        &:hover {
          opacity: 0.9;
        }

        ${mediaQueries("sm")`
          width: 100%;
          min-width: unset;
        `}
      }
    }
  }
`;

"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const TherapistsProfileLayoutWrapper = styled.div`
  padding: 32px 0 60px;
  min-height: calc(100vh - 100px);
  background: #f8f9fa;

  &.sitback-therapists-profile-wrapper {
    .therapists-profile-content {
      width: 100%;
      margin: 0 auto;
      padding: 0 15px;
    }

    .therapists-profile-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 32px;
      gap: 20px;

      ${mediaQueries("sm")`
        flex-direction: column;
        align-items: stretch;
      `}

      .therapists-header-text {
        h1 {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          color: ${theme.color.secondary};
          margin: 0 0 6px;

          ${mediaQueries("sm")`
            font-size: 26px;
          `}
        }

        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.4;
          color: #8a96a8;
          margin: 0;
        }
      }

      .add-therapist-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        transition: opacity 0.3s ease;

        ${mediaQueries("sm")`
          align-self: flex-start;
        `}

        &:hover {
          opacity: 0.85;
        }

        .add-therapist-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${theme.color.secondary};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: ${theme.color.white};
          font-size: 22px;
          font-weight: 400;
          line-height: 1;
        }

        span {
          font-size: 15px;
          font-weight: 600;
          color: ${theme.color.secondary};
          white-space: nowrap;
        }
      }
    }

    .therapists-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;

      ${mediaQueries("lg")`
        grid-template-columns: repeat(2, 1fr);
      `}

      ${mediaQueries("sm")`
        grid-template-columns: 1fr;
        gap: 16px;
      `}
    }

    .therapist-card {
      background: ${theme.color.white};
      border-radius: 12px;
      border: 2px solid transparent;
      box-shadow: 0 4px 20px rgba(41, 80, 134, 0.08);
      padding: 20px 20px 0;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover,
      &.selected {
        border-color: ${theme.color.secondary};
        box-shadow: 0 6px 28px rgba(41, 80, 134, 0.12);
      }

      .therapist-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .therapist-menu-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f5f8;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;

          svg {
            width: 16px;
            height: 16px;
          }
        }

        .dropdown-toggle::after {
          display: none;
        }

        .therapist-status-badge {
          font-size: 11px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 50px;

          &.active {
            background: #1D62C0;
            color: ${theme.color.white};
          }

          &.inactive {
            background: #fff5f5;
            color: #d64545;
            border: 1px solid #f0b4b4;
          }
        }
      }

      .therapist-card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-bottom: 20px;

        .therapist-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          margin-bottom: 14px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef6ff;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .therapist-initials {
            font-size: 28px;
            font-weight: 700;
            color: ${theme.color.secondary};
            line-height: 1;
          }
        }

        h3 {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          color: ${theme.color.secondary};
          margin: 0 0 4px;
        }

        .therapist-role {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          color: #4D6B93;
          margin: 0;
        }
      }

      .therapist-card-footer {
        border-top: 1px solid #e8f0fa;
        padding: 14px 0 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        .therapist-contact-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 0;

          img {
            width: 14px;
            height: 14px;
            object-fit: contain;
            flex-shrink: 0;
            opacity: 0.6;
          }

          span {
            font-size: 12px;
            font-weight: 400;
            line-height: 1.3;
            color: #4D6B93;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .therapists-empty-state {
      text-align: center;
      padding: 60px 20px;
      background: ${theme.color.white};
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(41, 80, 134, 0.08);

      p {
        font-size: 15px;
        color: #8a96a8;
        margin: 0;
      }
    }
  }
`;

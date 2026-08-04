"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const AddProviderModalWrapper = styled.div`
  &.sitback-add-therapist-modal {
    padding: 8px 12px 4px;

    .add-therapist-modal-header {
      text-align: center;
      margin-bottom: 28px;
      position: relative;

      h3 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1.3;
        color: ${theme.color.secondary};
        margin: 0;
      }
    }

    .add-therapist-form {
      padding: 0;
    }

    .add-therapist-form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 0;

      ${mediaQueries("sm")`
        flex-direction: column;
        gap: 0;
      `}

      .add-therapist-form-group {
        margin-bottom: 21px;
      }

      &.full-width {
        .add-therapist-form-group {
          flex: 1;
        }
      }
    }

    .add-therapist-form-group {
      flex: 1;
      margin-bottom: 18px;
      min-width: 0;

      ${mediaQueries("sm")`
        width: 100%;
      `}

      label {
        display: block;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.4;
        color: #4D6B93;
        margin-bottom: 8px;
      }

      input,
      select {
        width: 100%;
        min-height: 48px;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid #e2e6ed;
        background: ${theme.color.white};
        font-size: 14px;
        font-weight: 400;
        color: #295086;
        outline: none;
        transition: border-color 0.2s ease;
        box-shadow: none;

        &:focus {
          border-color: ${theme.color.secondary};
        }

        &:disabled {
          background: #f8f9fb;
          cursor: not-allowed;
        }
      }

      select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238A96A8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 16px center;
        padding-right: 40px;
        cursor: pointer;
      }

      .text-danger {
        margin-top: 5px;
        margin-bottom: 0;
        display: block;
        margin-left: 25px;
        font-size: 12px;
      }
    }

    .add-therapist-email-field {
      position: relative;

      input {
        padding-right: 120px;
      }

      .add-therapist-send-otp-btn {
        position: absolute;
        right: 12px;
        top: 38px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        font-size: 13px;
        font-weight: 600;
        color: ${theme.color.secondary};
        white-space: nowrap;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        img {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
      }
    }

    .add-therapist-otp-section {
      margin-bottom: 18px;
      text-align: center;

      p {
        font-size: 13px;
        font-weight: 400;
        color: #4D6B93;
        margin: 0 0 14px;
      }

      .otp-input-wrapper {
        display: flex;
        justify-content: center;
        gap: 10px;
        max-width: 100%;
        margin: 0 auto;

        input {
          width: 44px;
          height: 44px;
          min-height: 44px;
          flex: 0 0 44px;
          padding: 0;
          text-align: center;
          border-radius: 8px;
          border: 1px solid #e2e6ed;
          font-size: 18px;
          font-weight: 600;
          color: ${theme.color.secondary};

          &:focus {
            border-color: ${theme.color.secondary};
          }
        }
      }

      .add-therapist-resend-text {
        margin-top: 12px;
        font-size: 13px;
        color: #4D6B93;

        span.pointer {
          color: ${theme.color.secondary};
          font-weight: 600;
          cursor: pointer;
        }
      }
    }

    .add-therapist-phone-input {
      .phone-number-input-wrapper {
        width: 100%;

        .form-control {
          width: 100% !important;
          min-height: 48px !important;
          height: 48px !important;
          border-radius: 8px !important;
          border: 1px solid #e2e6ed !important;
          font-size: 14px !important;
          padding-left: 52px !important;
        }

        .flag-dropdown {
          border: none !important;
          background: transparent !important;
          border-radius: 8px 0 0 8px !important;
        }
      }
    }

    .add-therapist-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
      padding-top: 8px;

      ${mediaQueries("sm")`
        flex-direction: column-reverse;
        align-items: stretch;
      `}

      .add-therapist-save-another-btn {
        min-width: 180px;
        padding: 12px 24px;
        border-radius: 100px;
        border: 1px solid ${theme.color.secondary};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 0.85;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}
      }

      .add-therapist-save-btn {
        min-width: 120px;
        padding: 12px 32px;
        border-radius: 100px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;
        box-shadow: none;

        &:hover {
          opacity: 0.9;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}
      }
    }
  }
`;

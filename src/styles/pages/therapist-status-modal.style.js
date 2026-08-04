"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const TherapistStatusDialogClass = "sitback-therapist-status-dialog";

export const TherapistStatusModalWrapper = styled.div`
  &.sitback-therapist-status-modal {
    padding: 8px 12px 4px;
    text-align: center;

    h3 {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.3;
      color: ${theme.color.secondary};
      margin: 0 0 16px;
    }

    .status-modal-question {
      font-size: 15px;
      font-weight: 700;
      line-height: 1.45;
      color: ${theme.color.secondary};
      margin: 0 0 14px;
    }

    .status-modal-description {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.6;
      color: #4d6b93;
      margin: 0 0 28px;
    }

    .status-modal-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;

      ${mediaQueries("sm")`
        flex-direction: column-reverse;
        align-items: stretch;
      `}

      .status-cancel-btn {
        min-width: 120px;
        padding: 12px 24px;
        border-radius: 100px;
        border: 1px solid ${theme.color.secondary};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;

        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}
      }

      .status-action-btn {
        min-width: 180px;
        padding: 12px 24px;
        border-radius: 100px;
        border: none;
        font-size: 14px;
        font-weight: 600;
        color: ${theme.color.white};
        cursor: pointer;
        width: auto;
        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}

        &.deactivate {
          background: #d64545;
        }

        &.activate {
          background: #24a813;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      button{
        font-weight: 400 !important;
        padding: 9px 15px !important;
        min-height: 45px;
      }
    }
  }
`;

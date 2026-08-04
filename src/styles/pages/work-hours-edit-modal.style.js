"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const WorkHoursEditDialogClass = "sitback-work-hours-edit-dialog";

export const WorkHoursEditModalWrapper = styled.div`
  &.sitback-work-hours-edit-modal {
    padding: 4px 8px 8px;

    .work-hours-edit-header {
      text-align: center;
      margin-bottom: 24px;

      h3 {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.35;
        color: ${theme.color.secondary};
        margin: 0 0 8px;
      }

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: #4d6b93;
        margin: 0 auto;
        max-width: 460px;
      }
    }

    .work-hours-choice-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 8px;

      .work-hours-choice-btn {
        width: 100%;
        border: 1px solid #dbe7f5;
        border-radius: 12px;
        background: ${theme.color.white};
        padding: 18px 20px;
        text-align: left;
        cursor: pointer;
        transition: border-color 0.2s ease, background 0.2s ease;

        &:hover {
          border-color: ${theme.color.secondary};
          background: #f7fbff;
        }

        .choice-title {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: ${theme.color.secondary};
          margin-bottom: 4px;
        }

        .choice-subtitle {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: #4d6b93;
          line-height: 1.4;
        }
      }
    }

    .not-working-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;

      .not-working-label {
        font-size: 15px;
        font-weight: 600;
        color: ${theme.color.secondary};
      }

      .toggle-switch {
        position: relative;
        width: 44px;
        height: 24px;
        flex-shrink: 0;

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          inset: 0;
          background: #dbe7f5;
          border-radius: 24px;
          cursor: pointer;
          transition: background 0.2s ease;

          &::before {
            content: "";
            position: absolute;
            width: 18px;
            height: 18px;
            left: 3px;
            top: 3px;
            background: ${theme.color.white};
            border-radius: 50%;
            transition: transform 0.2s ease;
          }
        }

        input:checked + .slider {
          background: ${theme.color.secondary};

          &::before {
            transform: translateX(20px);
          }
        }
      }
    }

    .shift-rows {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
    }

    .shift-row {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 12px;
      align-items: end;

      ${mediaQueries("sm")`
        grid-template-columns: 1fr;
      `}

      .shift-field {
        display: flex;
        flex-direction: column;
        gap: 4px;

        label {
          font-size: 13px;
          font-weight: 400;
          color: #295086E5;
          margin: 0;
        }

        .rdt {
          width: 100%;
        }

        .rdt input,
        select {
          width: 100%;
          min-height: 46px;
          border: 1px solid #dbe7f5;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: ${theme.color.secondary};
          background: ${theme.color.white};
          outline: none;

          &:focus {
            border-color: ${theme.color.secondary};
          }

          &:disabled {
            background-color: #f3f5f8;
            cursor: not-allowed;
          }
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238A96A8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }
      }

      .shift-delete-btn {
        width: 36px;
        height: 46px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        flex-shrink: 0;
        color: #E32C1F;

        svg {
          width: 18px;
          height: 18px;
        }

        &:disabled {
          color: #D4D4D6;
          cursor: not-allowed;
        }
      }
    }

    .add-shift-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      background: transparent;
      color: #3B67A3;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      padding: 0;
      margin-bottom: 24px;

      .plus-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #3B67A3;
        color: ${theme.color.white};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 1;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .work-hours-edit-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      ${mediaQueries("sm")`
        flex-direction: column-reverse;
        align-items: stretch;
      `}
      button{
        min-height: 45px;
        width: auto;
      }
      .edit-cancel-btn {
        min-width: 160px;
        padding: 9px 15px;
        border-radius: 100px;
        border: 1px solid ${theme.color.secondary};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;

        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}
      }

      .edit-save-btn {
        min-width: 160px;
        padding: 9px 15px;
        border-radius: 100px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;

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

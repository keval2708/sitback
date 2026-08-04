"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const AssignServicesModalWrapper = styled.div`
  &.sitback-assign-services-modal {
    padding: 4px 8px 8px;

    .assign-services-header {
      text-align: center;
      margin-bottom: 28px;

      h3 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.3;
        color: ${theme.color.secondary};
        margin: 0 0 8px;
      }

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: #4d6b93;
        margin: 0;
        max-width: 420px;
        margin-inline: auto;
      }
    }

    .assign-services-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 28px;
      ${mediaQueries("sm")`
        grid-template-columns: 1fr;
      `}
    }

    .assign-service-card {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 170px;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #DFECF9;
      background: ${theme.color.white};
      cursor: pointer;
      text-align: left;
      transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      // box-shadow: 0 2px 12px rgba(41, 80, 134, 0.06);
      &:hover {
        border-color: #DFECF9;
      }

      &.selected {
        border-color: ${theme.color.secondary};
        background: #f0f6fd;
        // box-shadow: 0 4px 16px rgba(41, 80, 134, 0.1);
      }

      .card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
        width: 100%;
        .image-and-checkbox-wrapper{
          display: flex;
          position: relative;
          .card-illustration{
            margin-bottom: 0;
          }
          .select-indicator{
            position: absolute;
            right: -6px;
            top: 0;
          }
        }
      }

      .service-name {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.3;
        color: ${theme.color.secondary};
        flex: 1;
      }

      .select-indicator {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #c5d4e8;
        background: ${theme.color.white};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: border-color 0.2s ease, background 0.2s ease;

        img {
          width: 12px;
          height: 12px;
          object-fit: contain;
        }
      }

      &.selected .select-indicator {
        border-color: ${theme.color.secondary};
        background: ${theme.color.secondary};
      }

      .card-illustration {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-height: 72px;
        margin-bottom: 12px;
        padding-right: 4px;
        img {
          width: 72px;
          height: 72px;
          object-fit: contain;
        }
      }

      .card-info-row {
        display: flex;
        align-items: center;
        // gap: 16px;
        margin-top: auto;
        justify-content: space-between;
        width: 100%;
        .info-block {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          flex: 0 0 50%;
          .info-icon {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: ${theme.color.secondary};
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            img {
              width: 14px;
              height: 14px;
              object-fit: contain;
              filter: brightness(0) invert(1);
            }
  
            &.price-icon {
              color: ${theme.color.white};
              font-size: 14px;
              font-weight: 700;
              line-height: 1;
            }
          }
  
          .info-text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
  
          .info-label {
            font-size: 12px;
            font-weight: 700;
            color: ${theme.color.secondary};
            letter-spacing: 0.5px;
            line-height: normal;
          }
  
          .info-value {
            color: ${theme.color.secondary};
            white-space: nowrap;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
          }
        }
      }

    }

    .assign-services-empty {
      grid-column: 1 / -1;
      text-align: center;
      padding: 32px 16px;
      font-size: 14px;
      color: #8a96a8;
    }

    .assign-services-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding-top: 4px;

      ${mediaQueries("sm")`
        flex-direction: column-reverse;
        align-items: stretch;
      `}

      .assign-services-cancel-btn {
        min-width: 140px;
        padding: 12px 28px;
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

        ${mediaQueries("sm")`
          min-width: unset;
          width: 100%;
        `}
      }

      .assign-services-save-btn {
        min-width: 180px;
        padding: 12px 28px;
        border-radius: 100px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s ease;

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
      button{
        width: auto;
        min-height: 45px;
        padding: 9px 18px !important;
      }
    }
  }
`;

export const AssignServicesDialogClass = "sitback-assign-services-dialog";

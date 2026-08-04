"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const AppointmentAvailabilityWrapper = styled.div`
  &.sitback-appointment-availability-panel {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
    box-shadow: none;

    .availability-page-title {
      font-size: 18px;
      font-weight: 400;
      color: ${theme.color.secondary};
      margin: 0 0 12px;
    }

    .availability-section {
      background: ${theme.color.white};
      border: 1px solid #e8f0fa;
      border-radius: 12px;
      // padding: 24px;
      box-shadow: 0 4px 16px rgba(41, 80, 134, 0.04);
      margin-bottom: 24px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .availability-section-header {
      background: #DFECF9;
      border-radius: 0px;
      padding: 10px 16px;
      border-radius: 12px 12px 0 0;
      span {
        font-size: 15px;
        font-weight: 700;
        color: ${theme.color.secondary};
      }
    }

    .availability-field {
      padding: 18px;
      label {
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: ${theme.color.secondary};
        margin-bottom: 6px;
        line-height: normal;
      }

      .text-danger {
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 0;
      }
      .row{
        .col-md-6{
          margin-bottom: 12px;
        }
      }
      .no-availability-field {
        color: ${theme.color.secondary};
      }
    }

    .staff-status-toggle {
      display: flex;
      align-items: center;
      gap: 16px;
      background: transparent;

      button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: ${theme.color.white};
        border: 1px solid #cbdceb;
        border-radius: 8px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 400;
        color: #4d6b93;
        cursor: pointer;
        transition: all 0.2s ease;

        .radio-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid #295086;
          display: inline-block;
          position: relative;
          flex-shrink: 0;
          background: transparent;
          transition: all 0.2s ease;
        }

        &.active {
          background: ${theme.color.secondary};
          border-color: ${theme.color.secondary};
          color: ${theme.color.white};

          .radio-circle {
            border-color: ${theme.color.white};
            border-width: 2px;

            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: ${theme.color.white};
            }
          }
        }
      }
    }
    .date-input-row{
      display: flex;
      flex-wrap: wrap;
      margin: -6px;
      ${mediaQueries("sm")`
        flex-direction: column;
      `}
      .react-datepicker-wrapper{
        padding: 6px;
        flex: 0 0 48%;
        ${mediaQueries("sm")`
          flex: 0 0 100%;
          width: 100%;
        `}
      }
      .to-label{
        flex: 0 0 4%;
      }
    }
    .time-input-row{
      display: flex;
      flex-wrap: wrap;
      margin: -6px;
      position: relative;
      ${mediaQueries("sm")`
        flex-direction: column;
      `}
      .time-addinput-wrapper{
        padding: 6px;
        flex: 0 0 48%;
        width: unset;
        ${mediaQueries("sm")`
          flex: 0 0 100%;
          width: 100%;
        `}
      }
      .to-label{
        flex: 0 0 4%;
      }
    }
    .date-input-row,
    .time-input-row {
      align-items: center;
      .to-label {
        font-size: 14px;
        font-weight: 400;
        color: #295086;
        text-align: center;
      }
      .datepicker-input,
      .rc-time-picker-input {
        width: 100%;
        min-height: 46px;
        border: 1px solid #dbe7f5;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 14px;
        color: ${theme.color.secondary};
        background-color: ${theme.color.white};
        outline: none;
        transition: border-color 0.2s ease;
        &::placeholder{
          font-weight: 400 !important;
          font-size: 14px !important;
          color: #9aaebf !important;
        }
        &:focus {
          border-color: ${theme.color.secondary};
        }
        &:disabled {
          background-color: #F8F8FB !important;
          color: #9aaebf !important;
          cursor: not-allowed !important;
          border-color: #e2eaf5 !important;
        }
      }
    }

    .time-addinput-wrapper {
      width: 100%;
      position: relative;
      .rc-time-picker-input {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23295086' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
        padding-right: 30px;
        cursor: pointer;
      }
    }

    .sitback-select2-container {
      .sitback-select-option__control {
        background: ${theme.color.white} !important;
        border: 1px solid #dbe7f5 !important;
        border-radius: 8px !important;
        min-height: 46px !important;
        padding: 2px 10px !important;
        box-shadow: none !important;

        &.sitback-select-option__control--is-disabled {
          background: #f5f7fa !important;
          border-color: #e2eaf5 !important;
          cursor: not-allowed;
          .sitback-select-option__single-value {
            color: #9aaebf !important;
          }
        }

        .sitback-select-option__value-container {
          .sitback-select-option__single-value {
            color: ${theme.color.secondary} !important;
            font-weight: 400 !important;
            font-size: 14px !important;
          }

          .sitback-select-option__placeholder {
            color: #9aaebf !important;
            font-weight: 400 !important;
            font-size: 14px !important;
          }
        }
      }

      .sitback-select-option__menu {
        border: 1px solid #dbe7f5 !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
        overflow: hidden;

        .sitback-select-option__menu-list {
          .sitback-select-option__option {
            font-weight: 400 !important;
            font-size: 14px !important;
            color: #295086;
            &.sitback-select-option__option--is-disabled {
              opacity: 0.5;
            }
            &.sitback-select-option__option--is-selected{
              color: white;
              background: #295085;
            }
          }
        }
      }
    }

    .days-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .day-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 52px;
        height: 32px;
        border-radius: 100px;
        border: 1px solid #dbe7f5;
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 13px;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
          background: ${theme.color.secondary};
          border-color: ${theme.color.secondary};
          color: ${theme.color.white};
        }
      }
    }

    .unavailable-note {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 20px;

      input {
        margin-top: 4px;
        flex-shrink: 0;
      }

      p {
        font-size: 13px;
        line-height: 1.5;
        color: #4d6b93;
        margin: 0;
      }
    }

    .availability-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
      padding-top: 8px;
      flex-wrap: wrap;
      ${mediaQueries("sm")`
        flex-direction: column-reverse;
        align-items: stretch;
      `}
      .availability-cancel-btn {
        min-width: 120px;
        padding: 12px 24px;
        border-radius: 100px;
        border: 1px solid ${theme.color.secondary};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .availability-action-btn {
        min-width: 140px;
        padding: 12px 24px;
        border-radius: 100px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      button{
        width: auto;
        font-size: 14px !important;
        font-weight: 400 !important;
        padding: 9px 25px !important;
        min-height: 45px !important;
      }
    }

    .holiday-schedule-section {
      margin-top: 40px;
      border-top: 1px solid #EAEBEC;
      padding-top: 30px;

      .holiday-section-header {
        margin-bottom: 20px;
        h3 {
          font-size: 20px;
          font-weight: 700;
          color: #295086;
          margin-bottom: 4px;
          margin-top: 0;
        }
        p {
          font-size: 14px;
          color: #8A8A8F;
          margin: 0;
        }
      }

      .holiday-add-form-card {
        background: #fff;
        border: 1px solid #EAEBEC;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 25px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        .holiday-form-row {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          width: 100%;
        }

        .form-group-item {
          flex: 2;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 6px;

          &.date-picker-item {
            flex: 1.5;
            .rdtPicker{
              min-width: 150px;
              .rdtTime{
                table{
                  tbody{
                    tr{
                      td{
                        .rdtCounters{
                          .rdtCounter{
                            .rdtBtn{
                              color: #29508D;
                            }
                            .rdtCount{
                              color: #29508D;
                            }
                          }
                          .rdtCounterSeparator{
                            color: #29508D;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          label {
            font-size: 13px;
            font-weight: 600;
            color: #295086;
            margin: 0;
          }
          .form-control {
            border-radius: 6px;
            border: 1px solid #DADADA;
            padding: 8px 12px;
            font-size: 14px;
            height: 40px;
            width: 100%;
            color: #295086 !important;
            &::placeholder {
              font-weight: 400 !important;
              font-size: 14px;
              color: #9aaebf !important;
            }
            &:focus {
              border-color: #295086;
              box-shadow: none;
              outline: none;
            }
          }
          .react-datetime-picker {
            position: relative;
            .react-datepicker-wrapper {
              width: 100%;
            }
            .form-control {
              padding-right: 35px;
            }
            .calendar-icon-indicator {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              pointer-events: none;
              color: #4D6B93;
              display: flex;
              align-items: center;
              svg {
                width: 16px;
                height: 16px;
                fill: #4D6B93;
              }
            }
          }
        }
        .toggle-group-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
          span {
            font-size: 14px;
            font-weight: 500;
            color: #4D6B93;
          }
        }
        .submit-group-item {
          margin-top: 22px;
          .add-holiday-btn {
            background: #004D87;
            color: #fff;
            border: none;
            border-radius: 100px;
            padding: 10px 22px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            height: 40px;
            transition: background 0.2s ease;
            &:hover {
              background: #003660;
            }
          }
        }
      }

      .holiday-list-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .holiday-card {
        display: flex;
        align-items: center;
        background: #F5F7FA;
        border: 1px solid #EEF5FC;
        border-radius: 8px;
        padding: 12px 20px;
        justify-content: space-between;

        .holiday-card-left {
          display: flex;
          align-items: center;
          gap: 20px;

          .holiday-date-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #EEF5FC;
            border-radius: 6px;
            width: 50px;
            height: 50px;
            .holiday-month {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #4D6B93;
            }
            .holiday-day {
              font-size: 18px;
              font-weight: 800;
              color: #295086;
              line-height: 1.1;
            }
          }
          .holiday-info-block {
            h4 {
              font-size: 15px;
              font-weight: 700;
              color: #295086;
              margin: 0 0 2px 0;
            }
            p {
              font-size: 12px;
              color: #8A8A8F;
              margin: 0;
            }
          }
        }

        .holiday-card-right {
          display: flex;
          align-items: center;
          gap: 15px;

          .holiday-status-badge {
            font-size: 12px;
            font-weight: 400;
            padding: 6px 14px;
            border-radius: 100px;
            text-align: center;
            min-width: 75px;

            &.closed {
              background: #FFF;
              color: #E32C1F;
              border: 1px solid #DAE0E799;
            }
            &.open {
              background: #E8F8EE;
              color: #24A813;
              border: 1px solid #D1F2DC;
            }
          }

          .holiday-delete-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            svg {
              width: 18px;
              height: 18px;
              color: #E32C1F;
            }
          }
        }
      }
    }

    .table-responsive {
      overflow-x: auto;
      margin-top: 15px;
      border: 1px solid #E2EAF5;
      border-radius: 8px;
    }

    .availability-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
      color: ${theme.color.secondary};

      thead {
        background: #F5FBFF;
        border-bottom: 1px solid #E2EAF5;

        th {
          padding: 12px 16px;
          font-weight: 700;
          color: #295086;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #EEF5FC;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: #F8FBFE;
          }

          &:last-of-type {
            border-bottom: none;
          }

          td {
            padding: 14px 16px;
            vertical-align: middle;
            color: #4D6B93;

            &.days-cell {
              max-width: 250px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &.actions-cell {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .action-btn {
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: transform 0.2s ease;

              &:hover {
                transform: scale(1.1);
              }

              &.edit-btn img {
                width: 18px;
                height: 18px;
              }

              &.delete-btn svg {
                width: 18px;
                height: 18px;
                color: #E32C1F;
              }
            }
          }
        }
      }
    }
    .sitback-select-option--is-disabled {
      cursor: not-allowed;
      .sitback-select-option__control {
        background-color: #F8F8FB !important;
        cursor: not-allowed;
      }
    }
  }
`;

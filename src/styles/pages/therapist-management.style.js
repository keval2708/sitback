"use client";

import styled from "@emotion/styled";
import { theme } from "../global/theme";
import { mediaQueries } from "@/utils/mediaQuery";

export const TherapistManagementLayoutWrapper = styled.div`
  // padding: 32px 0 60px;
  min-height: calc(100vh - 100px);
  background: #f5f6f8;
  overflow: hidden;
  .container{
    max-width: 1440px;
    padding: 0;
  }
  .therapist-management-layout {
    display: grid;
    grid-template-columns: 346px minmax(0, 1fr);
    // gap: 24px;
    align-items: start;
    ${mediaQueries("lg")`
      grid-template-columns: 280px minmax(0, 1fr);
    `}
    ${mediaQueries("md")`
      grid-template-columns: 1fr;
    `}
    .therapist-sidebar {
      background: #F5FBFF;
      border-radius: 0;
      border-right: 1px solid #007BFF66;
      padding: 24px 15px;
      position: sticky;
      top: 0;
      min-height: calc(100vh - 100px);
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ${mediaQueries("lg")`
        position: static;
      `}
      &::before{
        position: absolute;
        content: '';
        background: #F5FBFF;
        width: calc(100% + 100px);
        left: -100%;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
      .sidebar-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .therapist-status-badge {
        font-size: 11px;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.3px;
        text-transform: uppercase;
        padding: 2px 14px;
        min-height: 25px;
        display: flex;
        border-radius: 1000px;
        justify-content: center;
        align-items: center;
        &.active {
          background: #1d62c0;
          color: ${theme.color.white};
        }
        &.inactive {
          background: #fff5f5;
          color: #d64545;
          border: 1px solid #f0b4b4;
        }
      }
      .edit-photo-btn {
        width: 33px;
        height: 33px;
        border-radius: 1000px;
        background: #DEDFDF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        outline: none;
        box-shadow: none;
        border: none;
        img {
          width: 18px;
          height: 18px;
        }
      }

      .sidebar-avatar-wrap {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;

        .sidebar-avatar {
          width: 150px;
          .profile-img{
            width: 120px;
            height: 120px;
            border-radius: 1000px;
            overflow: hidden;
            background: #eef6ff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .sidebar-initials {
            font-size: 36px;
            font-weight: 700;
            color: ${theme.color.secondary};
          }

          .edit-photo-btn{
            cursor: pointer;
            position: absolute;
            right: 15px;
            bottom: 5px;
            width: 30px;
            height: 30px;
            overflow: hidden;
            background: ${theme.color.secondary};
            border-radius: 100px;
            z-index: 1;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            input{
              width: 50px;
              height: 50px;
              cursor: pointer;
              margin: -7px;
              opacity: 0;
              position: absolute;
            }
            i{
              width: 15px;
              height: 15px;
              display: flex;
              justify-content: center;
              align-items: center;
              svg{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }

        }
      }
      .edit-profile-wrapper{
        margin-bottom: 18px;
        input{
          max-width: 100%;
          background: #fff;
          padding: 8px;
          font-weight: 600;
        }
        .edit-btn-wrapper{
          display: flex;
          align-items: center;
          gap: 9px;
          button{
            padding: 8px;
            width: 50%;
            font-size: 12px;
            font-weight: 400;
            border-radius: 100px;
            min-height: 36px;
            text-transform: uppercase;
            &.btn-primary{
              background: #1d62c0;
              color: #fff;
              border: 1px solid #1d62c0;
            }
            &.btn-outline-secondary{
              border: 1px solid #1d62c0;
              background: transparent;
              color: #1d62c0;
            }
          }
        }
      }
      .sidebar-name {
        font-size: 24px;
        font-weight: 400;
        color: ${theme.color.secondary};
        text-align: center;
        margin: 0 0 20px;
        line-height: 1.2;
      }

      .sidebar-details {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 24px;

        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom:5px;

          label {
            font-size: 14px;
            font-weight: 700;
            color: #295086;
            margin: 0;
          }

          .detail-value-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;

            span,
            a {
              font-size: 14px;
              font-weight: 400;
              color: ${theme.color.secondary};
              word-break: break-word;
            }

            .edit-login-link {
              font-size: 13px;
              font-weight: 400;
              color: #1d62c0;
              cursor: pointer;
              white-space: nowrap;
              background: none;
              border: none;
              padding: 0;
              text-decoration: underline;
            }
          }
        }
      }

      .deactivate-btn,
      .activate-btn {
        width: 100%;
        padding: 9px 18px;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 0.85;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .deactivate-btn {
        border: 1px solid ${theme.color.secondary};
        background: transparent;
        color: ${theme.color.secondary};
      }

      .activate-btn {
        border: 1px solid #24a813;
        background: transparent;
        color: #24a813;
      }
    }
  }


  .therapist-main-content {
    min-width: 0;
    min-height: calc(100vh - 100px);
    height: 100%;
    .main-tabs-nav {
      display: flex;
      align-items: center;
      gap: 40px;
      background: #F5FBFF;
      border-radius: 0;
      border-bottom: 1px solid #007BFF66;
      justify-content: center;
      flex-wrap: wrap;
      ${mediaQueries("lg")`
        gap: 10px;
      `}
      .main-tab-btn {
        border: none;
        background: transparent;
        font-size: 14px;
        font-weight: 400;
        color: #295086;
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        transition: color 0.2s ease;
        padding: 12px;
        ${mediaQueries("sm")`
          padding: 6px 12px;
        `}
        &.active {
          color: ${theme.color.secondary};
          font-weight: 600;
          // &::after {
          //   content: "";
          //   position: absolute;
          //   left: 0;
          //   right: 0;
          //   bottom: -1px;
          //   height: 2px;
          //   background: ${theme.color.secondary};
          //   border-radius: 2px 2px 0 0;
          // }
        }
      }
    }
    .therapists-profile-wrapper{
      padding: 30px;
      background: #F5F6F8;
      height: 100%;
      ${mediaQueries("lg")`
        padding: 18px;
      `}
      // Add or update these styles in your TherapistManagementLayoutWrapper styled component
      .services-section {
        margin-bottom: 28px;
        .services-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
          h2 {
            font-size: 18px;
            font-weight: 700;
            color: ${theme.color.secondary};
            margin: 0;
          }
          .add-services-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: none;
            background: transparent;
            color: #295086;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            padding: 0;
            white-space: nowrap;
            .plus-icon {
              background: #295086;
              color: ${theme.color.white};
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              line-height: 1px;
              padding-bottom: 3px;
              width: 33px;
              height: 33px;
              border-radius: 1000px;
            }
          }
        }
        .services-cards-row {
          display: flex;
          // flex-wrap: wrap;
          margin: -8px;
          overflow: auto;
            &::-webkit-scrollbar {
              height: 5px;
            }
            &::-webkit-scrollbar-track {
              background: ${theme.color.white};
            }
            &::-webkit-scrollbar-thumb {
              background: #295086;
              border: 4px solid #295086;
              border-radius: 8px;
              background-clip: padding-box;
            }
          &.slick-slider-container {
            display: block;
            overflow: visible;
            padding: 0 24px;
            .slick-track {
              display: flex;
              margin-left: 0 !important;
              margin-right: auto !important;
            }
            .slick-slide {
              height: auto;
              > div {
                height: 100%;
              }
            }
            .box-white {
              flex: none !important;
              width: 100% !important;
            }
            .slick-prev:before,
            .slick-next:before {
              color: #cad2dd !important;
              font-size: 24px !important;
              opacity: 0.8;
            }
            .slick-prev {
              left: -18px !important;
              z-index: 1;
            }
            .slick-next {
              right: -15px !important;
              z-index: 1;
            }
            .slick-prev.slick-disabled,
            .slick-next.slick-disabled {
              opacity: 0 !important;
              pointer-events: none;
            }
          }
          .box-white{
            padding: 8px;
            flex: 0 0 280px;
            /* ${mediaQueries("sm")`
              flex: 0 0 100%;
            `} */
          }
          .service-card {
            background: ${theme.color.white};
            padding: 16px;
            border: 1px solid #DFECF9;
            border-radius: 12px;
            transition: transform 0.2s ease;
            cursor: pointer;
            .user-detail-wrapper{
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 12px;
              .service-name {
                font-size: 14px;
                font-weight: 400;
                color: ${theme.color.secondary};
                text-align: left;
                line-height: 1.3;
              }
              .service-card-top{
                position: relative;
                .service-icon {
                  width: 60px;
                  height: 60px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                  }
                }
                .dropdown{
                  position: absolute;
                  right: -5px;
                  top: -8px;
                  .dropdown-menu{
                    width: 125px;
                    min-width: auto;
                    .dropdown-item{
                      font-weight: 400;
                      text-align: left;
                    }
                  }
                }
                .service-menu-btn {
                  width: 21px;
                  height: 21px;
                  border-radius: 1000px;
                  background: #D9D9D9;
                  border: 1px solid #D9D9D9;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0;
                  cursor: pointer;
                  transition: background 0.2s ease;

                  &:hover {
                    background: #D9D9D9;
                  }
                  i{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 12px;
                    height: 12px;
                    margin-left: 1px;
                    svg {
                      width: 100%;
                      height: 100%;
                      display: block;
                    }
                  }
                }
                .dropdown-toggle::after {
                  display: none;
                }
                &.therapist-service-dropdown {
                  .dropdown{
                  .dropdown-menu{
                    width: 150px;
                  }
                }

                }
              }
            }
            .service-meta {
              display: flex;
              align-items: center;
              justify-content: space-between;
              // gap: 12px;
              .time-price-wrapper{
                display: flex;
                align-items: center;
                gap: 6px;
                flex: 0 0 50%;
                /* margin-right: 30px; */
                i{
                  background: #3B67A3;
                  width: 28px;
                  height: 28px;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img{
                    width: 15px;
                    height: 15px;
                  }
                }
                .meta-item {
                  flex-direction: column;
                  display: flex;
                  .meta-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: ${theme.color.secondary};
                    letter-spacing: 0.5px;
                    line-height: normal;
                  }
                  .meta-value {
                    font-size: 14px;
                    font-weight: 400;
                    color: ${theme.color.secondary};
                    line-height: normal;
                  }
                }
              }
            }
          }
          .services-empty {
            font-size: 14px;
            color: #8a96a8;
            padding: 40px 0;
            text-align: center;
            width: 100%;
          }
        }
      }
      .profile-settings-section {
        display: grid;
        grid-template-columns: 220px minmax(0, 1fr);
        gap: 20px;
        align-items: start;
        ${mediaQueries("lg")`
          grid-template-columns: 1fr;
        `}
        .profile-subtabs-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-wrap: wrap;
          ${mediaQueries("lg")`
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 4px;
          `}
          .profile-subtab-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            border: none;
            background: transparent;
            border-radius: 100px;
            padding: 9px 16px;
            font-size: 14px;
            font-weight: 400;
            color: ${theme.color.secondary};
            cursor: pointer;
            text-align: left;
            white-space: nowrap;
            transition: background 0.2s ease, color 0.2s ease;
            .subtab-icon {
              width: 24px;
              height: 24px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              svg {
                width: 21px;
                height: 21px;
                display: block;
              }
            }
            &.active {
              background: ${theme.color.secondary};
              font-weight: 600;
              color: ${theme.color.white};
              .subtab-icon svg path,
              .subtab-icon svg circle,
              .subtab-icon svg line,
              .subtab-icon svg rect {
                stroke: ${theme.color.white};
              }
            }
            &.active {
              .subtab-icon{
                .file-icon-wrapper{
                  path{
                    stroke: transparent;
                    fill: ${theme.color.white};
                  }
                }
              }
            }
          }
        }

        .profile-subtab-panel {
          background: ${theme.color.white};
          border: 1px solid #e8f0fa;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(41, 80, 134, 0.04);

          .panel-section-title {
            font-size: 14px;
            font-weight: 600;
            color: ${theme.color.secondary};
            margin: 0 0 2px;
          }

          .form-row-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            margin-bottom: 20px;

            ${mediaQueries("sm")`
              grid-template-columns: 1fr;
            `}

            &.three-col {
              grid-template-columns: 1fr 1fr 1fr;

              ${mediaQueries("md")`
                grid-template-columns: 1fr 1fr;
              `}

              ${mediaQueries("sm")`
                grid-template-columns: 1fr;
              `}
            }
            &.full-width {
              grid-template-columns: 1fr;
            }
          }

          .form-field {
            display: flex;
            flex-direction: column;
            gap: 6px;

            label {
              font-size: 13px;
              font-weight: 500;
              color: #4d6b93;
              margin: 0;
            }

            input,
            select,
            textarea {
              width: 100%;
              border: 1px solid #dbe7f5;
              border-radius: 8px;
              padding: 12px 14px;
              font-size: 14px;
              color: ${theme.color.secondary};
              background-color: ${theme.color.white};
              outline: none;

               &::placeholder {
                color: ${theme.color.secondary} !important;
                opacity: 0.6;

              }

              &:focus {
                border-color: ${theme.color.secondary};
              }

              &:disabled {
                background-color: #F8F8FB !important;
                cursor: not-allowed;
              }
            }

            textarea {
              min-height: 120px;
              resize: vertical;
            }
            /* Add these styles inside your TherapistManagementLayoutWrapper */

            .phone-number-input-div {
              display: flex;
              align-items: center;
              width: 100%;
              background: ${theme.color.white};
              border: 1px solid #dbe7f5;
              border-radius: 8px;
              transition: all 0.2s ease;
              overflow: hidden;
            }

            .country-code-input {
              flex: 0 0 auto;


              .input-add-employee-wrapper {
                border: none;
                background: transparent;
                font-size: 14px;
                color: ${theme.color.secondary};
                width: 40px;
                text-align: center;
                padding: 12px 0;
                outline: none;
                font-family: inherit;
              }
            }

            .phone-divider {
              width: 1px;
              height: 24px;
              background: #e2eaf5;
              flex-shrink: 0;
            }

            .mobile-number-input {
              flex: 1;
              min-width: 0;

              input {
                width: 100%;
                border: none;
                padding: 12px 14px 12px 12px;
                font-size: 14px;
                font-weight: 400;
                color: ${theme.color.secondary};
                background: transparent;
                outline: none;
                font-family: inherit;

                &::placeholder {
                  color: ${theme.color.secondary} !important;
                  opacity: 0.6;
                  font-weight: 400;
                  font-size: 14px;
                }

                /* Remove spinner buttons for number inputs */
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }

                &[type=number] {
                  -moz-appearance: textfield;
                }
              }
            }
          }

          .save-btn {
            width: auto;
            min-width: 140px;
            padding: 14px 28px;
            border-radius: 100px;
            border: none;
            background: ${theme.color.secondary};
            color: ${theme.color.white};
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.4px;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 8px;

            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
          }

          .placeholder-panel {
            p {
              font-size: 14px;
              color: #8a96a8;
              margin: 0 0 16px;
            }

            .action-link-btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              border: 1px solid ${theme.color.secondary};
              background: transparent;
              color: ${theme.color.secondary};
              border-radius: 100px;
              padding: 12px 20px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
            }
          }

          .notification-item,
          .permission-item,
          .toggle-options-item {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            padding: 8px 0;
            // border-bottom: 1px solid #eef3f9;

            &:last-child {
              border-bottom: none;
            }

            .toggle-options-content {
              flex: 1;
              min-width: 0;
            }

            .item-label {
              display: block;
              font-size: 14px;
              font-weight: 400;
              color: ${theme.color.secondary};
              line-height: 1.4;
            }

            .item-description,
            .item-helper-text {
              font-size: 13px;
              font-weight: 400;
              color: ${theme.color.secondary};
              line-height: 1.5;
              margin: 4px 0 0;
              opacity: 0.5;
            }

            .item-helper-text {
              font-size: 12px;
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

              &.is-disabled {
                opacity: 0.5;

                .slider {
                  cursor: not-allowed;
                }
              }
            }
          }

          .toggle-options-section {
            margin-bottom: 24px;

            &:last-child {
              margin-bottom: 0;
            }
          }

          &.work-hours-panel {
            padding: 24px 28px;

            .work-hours-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
              margin-bottom: 24px;
              flex-wrap: wrap;

              h3 {
                font-size: 18px;
                font-weight: 700;
                color: ${theme.color.secondary};
                margin: 0;
              }

              .work-hours-week-nav {
                display: flex;
                align-items: center;
                gap: 10px;

                .work-hours-range {
                  font-size: 14px;
                  font-weight: 400;
                  color: ${theme.color.secondary};
                  white-space: nowrap;
                }

                .week-nav-btn {
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  border: 1px solid #dbe7f5;
                  background: ${theme.color.white};
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  padding: 0;
                  transition: opacity 0.2s ease;

                  img {
                    width: 12px;
                    height: 12px;
                    object-fit: contain;
                  }

                  &.next img {
                    transform: rotate(180deg);
                  }

                  &:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                  }
                }
              }
            }

            .work-hours-list {
              display: flex;
              flex-direction: column;
              gap: 14px;
            }

            .work-hours-empty {
              font-size: 14px;
              color: #8a96a8;
              margin: 0;
              text-align: center;
              padding: 24px 0;
            }

            .work-hours-row {
              display: grid;
              grid-template-columns: 72px minmax(0, 1fr);
              gap: 16px;
              align-items: center;

              ${mediaQueries("sm")`
                grid-template-columns: 60px minmax(0, 1fr);
                gap: 12px;
              `}

              .work-hours-day {
                display: flex;
                flex-direction: column;
                gap: 2px;

                .day-name {
                  font-size: 14px;
                  font-weight: 700;
                  color: ${theme.color.secondary};
                  line-height: 1.2;
                }

                .day-date {
                  font-size: 13px;
                  font-weight: 400;
                  color: ${theme.color.secondary};
                  line-height: 1.2;
                }
              }

              .work-hours-slot {
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 0;

                .work-hours-bar {
                  flex: 1;
                  min-height: 44px;
                  border-radius: 6px;
                  background: #e8f3fc;
                  display: flex;
                  align-items: center;
                  padding: 10px 15px;
                  justify-content: space-between;
                  span {
                    font-size: 14px;
                    font-weight: 400;
                    color: ${theme.color.secondary};
                    white-space: nowrap;
                    width: calc(100% - 35px);
                  }
                }

                .work-hours-edit-btn {
                  width: 32px;
                  height: 32px;
                  border: none;
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  padding: 0;
                  flex-shrink: 0;

                  img {
                    width: 16px;
                    height: 16px;
                    object-fit: contain;
                  }
                }
              }
            }

            .holiday-schedule-section {
              margin-top: 40px;
              border-top: 1px solid #EAEBEC;
              padding-top: 30px;

              .holiday-tabs-nav {
                display: flex;
                gap: 16px;
                border-bottom: 2px solid #EAEBEC;
                margin-bottom: 24px;

                .holiday-tab-btn {
                  background: none;
                  border: none;
                  padding: 10px 16px;
                  font-size: 16px;
                  font-weight: 600;
                  color: #8A8A8F;
                  cursor: pointer;
                  position: relative;
                  transition: all 0.2s ease;
                  outline: none;
                  width: 50%;
                  

                  &::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: transparent;
                    transition: all 0.2s ease;
                  }

                  &:hover {
                    color: #295086;
                  }

                  &.active {
                    color: #295086;
                    &::after {
                      background: #295086;
                    }
                  }
                }
              }

              .holiday-section-header {
                margin-bottom: 20px;
                h3 {
                  font-size: 15px;
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
                     color: #9aaebf !important;
                      font-weight: 400;
                      font-size: 14px;
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
                    padding: 5px;
                    color: #E32C1F;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                    &:hover {
                      background: #FFF2F1;
                    }
                    svg {
                      width: 16px;
                      height: 16px;
                    }
                  }
                }
              }

              .lunch-type-radio-group {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
                
                .radio-label {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  font-size: 14px;
                  font-weight: 600;
                  color: #4D6B93;
                  cursor: pointer;
                  
                  input[type="radio"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 2px solid #CBDCEB;
                    border-radius: 50%;
                    outline: none;
                    background-color: #fff;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    position: relative;
                    
                    &:checked {
                      border-color: #295086;
                      
                      &::before {
                        content: "";
                        width: 10px;
                        height: 10px;
                        background-color: #295086;
                        border-radius: 50%;
                        display: block;
                      }
                    }
                    
                    &:focus {
                      box-shadow: none;
                      outline: none;
                    }
                  }
                }
              }

              .repeat-days-chips {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 20px;
                
                .repeat-day-chip {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                  padding: 8px 16px;
                  border-radius: 6px;
                  border: 1px solid #dbe7f5;
                  background: #fff;
                  color: #295086;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  
                  &:hover {
                    border-color: #295086;
                  }
                  
                  &.active {
                    background: #004D87;
                    border-color: #004D87;
                    color: #fff;
                    
                    .check-left {
                      font-size: 12px;
                    }
                    .check-right {
                      display: flex;
                      align-items: center;
                      background: #fff;
                      color: #004D87;
                      border-radius: 50%;
                      padding: 1px;
                      width: 14px;
                      height: 14px;
                      justify-content: center;
                      svg {
                        width: 10px;
                        height: 10px;
                      }
                    }
                  }
                }
              }

              .lunch-table-container {
                margin-top: 20px;
                overflow-x: auto;
                border: 1px solid #EEF5FC;
                border-radius: 8px;
                background: #fff;
                
                .lunch-table {
                  width: 100%;
                  border-collapse: collapse;
                  
                  th {
                    background: #F8FBFE;
                    padding: 12px 16px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #295086;
                    border-bottom: 1px solid #EEF5FC;
                    text-align: left;
                  }
                  
                  td {
                    padding: 14px 16px;
                    font-size: 14px;
                    color: #4D6B93;
                    border-bottom: 1px solid #EEF5FC;
                    vertical-align: middle;
                    
                    &.days-col {
                      font-weight: 600;
                      color: #295086;
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
                    }
                  }
                  
                  tr:last-child td {
                    border-bottom: none;
                  }
                }
              }

              .type-badge {
                padding: 4px 12px;
                border-radius: 100px;
                font-size: 12px;
                font-weight: 600;
                display: inline-block;
                
                &.single {
                  background: #F3E8FF;
                  color: #7C3AED;
                }
                
                &.repeating {
                  background: #E0F2FE;
                  color: #0284C7;
                }
              }

              .lunch-filter-select {
                border: 1px solid #cbdceb;
                border-radius: 6px;
                padding: 6px 12px;
                font-size: 14px;
                color: #295086;
                outline: none;
                background: #fff;
                cursor: pointer;
                
                &:focus {
                  border-color: #295086;
                }
              }
            }
          }
          form{
            .form-row-grid{
              .form-field{
                .location-input-wrapper-div{
                  .autocomplete-dropdown-container{
                    padding: 0;
                    background: ${theme.color.white};
                    border-radius: 12px;
                    position: absolute;
                    bottom: 60px;
                    width: 100%;
                    max-height: 250px;
                    overflow: auto;
                    z-index: 3;
                    border: 1px solid rgba(218, 218, 218, 0.6);
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
                    .suggestion-item, .suggestion-item--active{
                      display: flex;
                      flex-direction: column;
                      padding: 10px 19px;
                      color: ${theme.color.secondary};
                    }
                    .suggestion-item--active{
                      background: #DFECF9;
                      span{
                        color: ${theme.color.secondary};
                      }
                    }
                    /* .dropdown-wrapper-div {
                      background: ${theme.color.white};
                      border-radius: 12px;
                      width: 100%;
                      max-height: 250px;
                      overflow: auto;
                      z-index: 3;
                    } */
                    span{
                      color: ${theme.color.secondary};
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: normal;
                      display: inline-flex;
                      margin-bottom: 5px;
                      cursor: pointer;
                      transition: all 0.3s ease-in-out;
                      &:hover{
                        color: ${theme.color.secondary};
                      }
                      &:last-child{
                        margin-bottom: 0;
                      }
                      .search-pin-icon{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 10px;
                        width: 18px;
                        height: 18px;
                        overflow: hidden;
                      }
                    }
                    .suggestion-item{
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .tab-placeholder-card {
    // background: ${theme.color.white};
    // border: 1px solid #e8f0fa;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    min-height: calc(100vh - 205px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 18px;
      font-weight: 700;
      color: ${theme.color.secondary};
      margin: 0 0 8px;
    }

    p {
      font-size: 14px;
      color: #8a96a8;
      margin: 0 0 20px;
    }

    .primary-action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 24px;
      border-radius: 100px;
      border: none;
      background: ${theme.color.secondary};
      color: ${theme.color.white};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .loading-state,
  .not-found-state {
    background: ${theme.color.white};
    border-radius: 12px;
    padding: 60px 24px;
    text-align: center;

    p {
      font-size: 15px;
      color: #8a96a8;
      margin: 0;
    }
  }
`;

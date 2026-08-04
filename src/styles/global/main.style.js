"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import { css } from "styled-components";
import { theme } from "./theme";
import { mediaQueries } from "../../utils/mediaQuery";

export const MainLayoutWrapper = styled.main`
  min-height: calc(100vh - 122px);
  height: 100%;
  /* background-color: #ffffff; */
`;
export const Button = styled.button`
  width: 100%;
  padding: 18px;
  border-radius: 100px;
  border: none;
  box-shadow: none;
  outline: none;
  background: ${theme.color.secondary};
  color: ${theme.color.white};
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  /* text-transform: uppercase; */
  transition: all 0.3s ease-in-out;
  border: 1px solid ${theme.color.primary};
  box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  ${mediaQueries("lg")`
        padding: 16px;
        font-size: 14px;
    `}
  ${mediaQueries("md")`
        padding: 14px;
        font-size: 13px;
    `}
    &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  ${(props) =>
    props.isBorderBtn &&
    css`
      background: transparent;
      color: ${theme.color.secondary};
      border-color: ${theme.color.secondary};
    `}
  &.secondary-btn{
    background: #295086;
    border-color: #295086;
    font-size: 15px;
  }
  &.green-btn-wrapper{
    background: #6BBE99;
    border-color: #6BBE99;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  ${(props) =>
    props.isContainImg &&
    css`
      object-fit: contain;
    `}
  ${(props) =>
    props.radius &&
    css`
      border-radius: ${props?.radius}%;
    `}
`;
export const FormGroup = styled.div`
  margin-bottom: 35px;
  ${mediaQueries("xl")`
        margin-bottom: 30px;
    `}
  ${mediaQueries("lg")`
        margin-bottom: 25px;
    `}
    ${mediaQueries("md")`
        margin-bottom: 20px;
    `}
    ${mediaQueries("sm")`
        margin-bottom: 15px;
    `}
    .forgot-linktext {
    display: flex;
    justify-content: flex-end;
    margin-top: 9px;
    padding-bottom: 3px;
    a {
      color: #29508699;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: inline-flex;
    }
  }
  .sitback-select2-container {
    width: 100%;
    &.white-select-background {
      .sitback-select-option__control {
        background-color: #ffffff !important;
      }
    }
    &.coming-soon-select {
      .sitback-select-option__control {
        padding: 7px 15px;
      }
    }
    .sitback-select-option__control {
      padding: 12px 15px;
      border-radius: 100px;
      background: #fffef6;
      border-color: #dadada;
      outline: none !important;
      box-shadow: none !important;
      ${mediaQueries("md")`
                padding: 9px 15px;
            `}
      ${mediaQueries("sm")`
                padding: 6px 12px;
            `}
            .sitback-select-option__value-container {
        .sitback-select-option__single-value {
          color: #295086b2;
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          ${mediaQueries("md")`
            font-size: 16px !important;
          `}
          img {
            width: 27px !important;
            height: 19px !important;
            overflow: hidden;
            object-fit: contain;
            margin-right: 10px;
          }
        }
        .sitback-select-option__placeholder {
          color: #295086b2;
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
        }
      }
      .sitback-select-option__indicators {
        .sitback-select-option__indicator-separator {
          display: none;
        }
      }
    }
    .sitback-select-option__menu {
      .sitback-select-option__menu-list {
        .sitback-select-option__option {
          color: ${theme.color.secondary};
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          img {
            width: 27px !important;
            height: 19px !important;
            overflow: hidden;
            object-fit: contain;
            margin-right: 10px;
          }
          &.sitback-select-option__option--is-focused {
            background: #eafcff;
          }
          &.sitback-select-option__option--is-selected {
            background: ${theme.color.secondary};
            color: ${theme.color.white};
          }
        }
         &::-webkit-scrollbar {
            /* width: 10px; */
            width: 6px;
          }
          &::-webkit-scrollbar-track {
            background: #E9DEDE;
          }
          &::-webkit-scrollbar-thumb {
            background: #295086;
            border-radius: 8px;
          }

      }

    }
    &.input-with-icon {
    }
  }
  &.sitback-switch-wrapper-div {
    span {
      display: flex;
      color: ${theme.color.secondary};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      align-items: center;
    }
    /*Style 4*/
    .switch2 {
      position: relative;
      display: inline-block;
      margin-left: 10px;
    }

    .switch2 > span {
      position: absolute;
      top: 8px;
      pointer-events: none;
      font-size: 12px;
      text-transform: uppercase;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
      width: 50%;
      text-align: center;
    }

    input.check-toggle-round-flat:checked ~ .off {
      color: #000;
      opacity: 0;
    }

    input.check-toggle-round-flat:checked ~ .on {
      color: #295086;
      opacity: 1;
    }

    .switch2 > span.on {
      left: -4px;
      padding-left: 2px;
      color: #fff;
      opacity: 0;
    }

    .switch2 > span.off {
      right: 0;
      padding-right: 4px;
      color: #295086;
      opacity: 1;
    }

    .check-toggle {
      position: absolute;
      margin-left: -9999px;
      visibility: hidden;
    }
    .check-toggle + label {
      display: block;
      position: relative;
      cursor: pointer;
      outline: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    input.check-toggle-round-flat + label {
      padding: 2px;
      width: 80px;
      height: 34px;
      background: #ffffff;
      -webkit-border-radius: 60px;
      -moz-border-radius: 60px;
      -ms-border-radius: 60px;
      -o-border-radius: 60px;
      border-radius: 60px;
    }
    input.check-toggle-round-flat + label:before,
    input.check-toggle-round-flat + label:after {
      display: block;
      position: absolute;
      content: "";
    }

    input.check-toggle-round-flat + label:before {
      top: 2px;
      left: 2px;
      bottom: 2px;
      right: 2px;
      background-color: transparent;
      border-radius: 60px;
    }
    input.check-toggle-round-flat + label:after {
      top: 4px;
      left: 4px;
      bottom: 4px;
      width: 26px;
      background-color: #295086;
      -webkit-border-radius: 52px;
      -moz-border-radius: 52px;
      -ms-border-radius: 52px;
      -o-border-radius: 52px;
      border-radius: 52px;
      -webkit-transition: margin 0.2s;
      -moz-transition: margin 0.2s;
      -o-transition: margin 0.2s;
      transition: margin 0.2s;
    }

    input.check-toggle-round-flat:checked + label {
    }

    input.check-toggle-round-flat:checked + label:after {
      margin-left: 44px;
      background: #295086;
    }
  }
  .text-danger {
    display: block;
    margin-left: 25px;
    font-size: 12px;
    &.mt-1{
      margin-top: 4px;
    }
  }
  textarea {
    resize: none;
    border-radius: 8px;
    box-shadow: none;
    padding: 15px;
    &:focus {
      box-shadow: none;
    }
    &::-ms-input-placeholder {
      color: #29508699;
      font-weight: 300;
    }
    &::placeholder {
      color: #29508699;
      font-weight: 300;
    }
  }
  .textarea-input{
    background:#ffffff !important;
    &::-ms-input-placeholder {
      color: #29508699;
      font-weight: 300;
    }
    &::placeholder {
      color: #29508699;
      font-weight: 300;
    }
  }

  .Select-Service-checkbox-wrapper {
    .sitback-select-option__control {
      border-radius: 30px;
      //max-height: 150px;
      //overflow: auto;
      .sitback-select-option__placeholder {
        color: #295086b2;
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
      }
    }
    .sitback-select-option__menu {
      .sitback-select-option__menu-list {
        .sitback-select-option__option {
          display: flex;
          align-items: center;
          input {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background-color: white;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 1px solid #ebebeb;
            display: flex;
            justify-content: center;
            align-items: center;
            &:checked {
              background: #295086;
              border-color: #295086;
              position: relative;
              &:after {
                position: absolute;
                content: "";
                background: url("images/checkmark-white.svg") no-repeat;
                background-position: center;
                background-size: contain;
                width: 12px;
                height: 12px;
              }
            }
          }
          /* input[type="checkbox"]{
            background-color: white;
          }  */
        }
      }
    }
  }
  .react-datepicker-wrapper {
    width: 100%;
    input {
      border-radius: 100px;
      border: 1px solid ${theme.color.border};
      background: ${theme.color.lightwhite};
      color: ${theme.color.secondary};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding: 18px 30px;
      width: 100%;
      outline: none;
      box-shadow: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
      ${mediaQueries("xl")`
                padding: 16px 30px;
                font-size: 15px;
            `}
      ${mediaQueries("lg")`
                padding: 14px 30px;
                font-size: 14px;
            `}
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
        -webkit-text-fill-color: ${theme.color.secondary};
      }
      &::-ms-input-placeholder {
        color: #29508699;
        font-weight: 300;
      }
      &::placeholder {
        color: #29508699;
        font-weight: 300;
      }
      &:focus {
        color: ${theme.color.secondary};
        background-color: ${theme.color.white};
        border-color: ${theme.color.border};
        outline: 0;
        box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
  .calendar-wrapper-div {
    display: none;
    position: absolute;
    right: auto;
    left: 0;
    bottom: 94px;
    width: auto;
    z-index: 2;
    .react-calendar {
      width: 290px;
      box-shadow: 0px 4px 4px 0px #0000000a;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      padding: 8px;
      .react-calendar__navigation {
        margin-bottom: 6px;
        button {
          font-size: 18px;
          font-weight: 600;
          line-height: normal;
          color: ${theme.color.secondary};
          border-radius: 4px;
          &:hover {
            background: #e7fcff;
          }
          &:focus {
            background: #e7fcff;
          }
        }
        .react-calendar__navigation__label {
          font-size: 16px;
          font-weight: 600;
          background: transparent !important;
        }
      }
      .react-calendar__viewContainer {
        .react-calendar__month-view {
          .react-calendar__month-view__weekdays {
            .react-calendar__month-view__weekdays__weekday {
              font-size: 12px;
              abbr {
                text-decoration: none !important;
                color: #295085;
              }
            }
          }
          .react-calendar__month-view__days {
            .react-calendar__tile {
              font-size: 13px;
              border-radius: 4px;
              // color: ${theme.color.black};
              &:hover {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
              }
              &:focus {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
              }
              &.react-calendar__month-view__days__day {
                font-size: 13px;
                border-radius: 4px;
                color: ${theme.color.secondary};
              }
              &.react-calendar__tile--active {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
              }
              &.react-calendar__tile--now {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
              }
              &.react-calendar__month-view__days__day--neighboringMonth {
                color: #b8b8b8;
              }
              &.react-calendar__month-view__days__day--weekend {
                color: #e32c1f;
              }
              &:disabled {
                color: #b8b8b8;
                &:hover {
                  color: #b8b8b8;
                  background-color: #f0f0f0;
                }
              }
            }
          }
          // button:not(:disabled), [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled) {
          //     cursor: pointer;
          //     color: #ababab !important;
          // }
        }
        .react-calendar__year-view {
          .react-calendar__year-view__months {
            .react-calendar__tile {
              font-size: 13px;
              border-radius: 4px;
              color: ${theme.color.black};
              * {
                color: ${theme.color.black};
              }
              &:hover {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &:focus {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &.react-calendar__month-view__days__day {
                font-size: 13px;
                border-radius: 4px;
                color: ${theme.color.secondary};
                * {
                  color: ${theme.color.secondary};
                }
              }
              &.react-calendar__tile--active {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &.react-calendar__tile--now {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &.react-calendar__month-view__days__day--neighboringMonth {
                color: #b8b8b8;
                * {
                  color: #b8b8b8;
                }
              }
              &.react-calendar__month-view__days__day--weekend {
                color: #e32c1f;
                * {
                  color: #e32c1f;
                }
              }
              &:disabled {
                color: #b8b8b8;
                &:hover {
                  color: #b8b8b8;
                  background-color: #f0f0f0;
                  * {
                    color: #b8b8b8;
                  }
                }
              }
            }
          }
        }
        .react-calendar__decade-view{
          .react-calendar__decade-view__years{
            button {
              color:black;
              font-size: 13px;
               &:hover {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &:focus {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
            }
          }

        }
        .react-calendar__century-view{
          .react-calendar__century-view__decades {
            button {
              color:black;
              font-size: 13px;
               &:hover {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
              &:focus {
                background-color: ${theme.color.primary};
                color: ${theme.color.white};
                * {
                  color: ${theme.color.white};
                }
              }
            }
          }
        }
      }
    }

    .react-calendar__tile--now {
      background-color: ${theme.color.primary};
      border-radius: 4px;
      color: ${theme.color.white};
    }
    .react-calendar__tile--active {
      background-color: ${theme.color.primary};
      border-radius: 4px;
      color: ${theme.color.white};
    }
  }
  &.show-calendar {
    position: relative;
    .calendar-wrapper-div {
      display: block;
    }
  }
  .edit-number-and-email-input {
    position: relative;
    input {
      padding-right: 55px;
    }
    .edit-pen {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      position: absolute;
      right: 25px;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      .pencil {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        svg {
          width: 18px;
          height: 18px;
          display: block;
          path {
            stroke: ${theme.color.secondary};
          }
        }
      }
    }
  }
  ${(props) =>
    props.isNewDashboardInsightsSitbackFormGroup &&
    css`
      margin-bottom: 50px;
      .sitback-select-option__control{
        background: #FFFFFF !important;
        border: 1px solid #DADADA99 !important;
        .sitback-select-option__multi-value{
          background: #EEEEEE;
          color: #57565E99;
          font-weight: 300;
          font-size: 16px;
          line-height: 25px;
          border-radius: 8px;
        }
        .sitback-select-option__placeholder{
          font-weight: 300 !important;
          font-size: 16px !important;
          line-height: 25px !important;
          color: #57565E99 !important;
        }
      }
      .text-danger{
         font-weight: 500;
      }
      .service-error-text{
        margin-top: 12px;
      }
      .time-appointment-display-div{
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        ${mediaQueries("sm")`
          flex-direction: column;
        `}
        .datepicker-inner-formgroup-wrapper{
          margin-bottom: 0;
        }
        &.add-service-time-display-div{
          .time-left-div{
            position: relative;
            .time-content-text{
              position: absolute;
              top: 0;
              right: 50px;
              bottom: 0;
              margin: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 300;
              font-size: 16px;
              line-height: 25px;
              color: #57565E;
              text-transform: capitalize;
              z-index: 1;
            }
          }
          .time-minute-div{
            position: relative;
            flex: 1;
            ${mediaQueries("sm")`
              width: 100%;
            `}
            .sitback-select-option__control{
              width: 100%;
              border-radius: 100px;
              border: 1px solid #DADADA99;
              background: #FFFFFF;
            }
            .time-content-text{
              position: absolute;
              top: 0;
              right: 50px;
              bottom: 0;
              margin: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: 300;
              font-size: 16px;
              line-height: 25px;
              color: #57565E;
              text-transform: capitalize;
              z-index: 1;
            }
          }
        }
        .time-left-div{
          width: 47%;
          position: relative;
          ${mediaQueries("sm")`
            width: 100%;
          `}
          .text-danger{
            position: absolute;
            bottom: -20px;
            font-size: 12px;
            text-transform: unset;
            ${mediaQueries("sm")`
              bottom: -40px;
              left: 25px;
            `}
          }
          .rc-time-picker{
            width: 100%;
            .rc-time-picker-input{
              border-radius: 100px;
              border: 1px solid #DADADA99;
              padding: 17px 16px;
              font-weight: 300;
              font-size: 16px;
              line-height: 25px;
              color: #57565E99;
              width: 100%;
              min-height: 60px;
              &::placeholder{
                font-weight: 300 !important;
                font-size: 16px !important;
                line-height: 25px !important;
                color: #57565E99 !important;
              }
              &:focus{
                outline: none;
              }
            }
          }
        }
        .rc-time-picker-panel{
          position: absolute;
          top: 65px !important;
        }
        .rc-time-picker-clear-icon{
          display: none;
        }
        p{
          font-weight: 500;
          font-size: 16px;
          line-height: 100%;
          text-transform: lowercase;
          color: #707070;
          margin: 0 20px;
          ${mediaQueries("sm")`
            margin: 20px 0;
          `}
        }
        .time-right-div{
          flex: 1;
          overflow: hidden;
          .text-danger{
            position: absolute;
            bottom: -20px;
            font-size: 12px;
            text-transform: unset;
            ${mediaQueries("sm")`
              bottom: -40px;
              left: 25px;
            `}
          }
          ${mediaQueries("sm")`
            width: 100%;
          `}
          .rc-time-picker{
            width: 100%;
            .rc-time-picker-input{
              border-radius: 100px;
              border: 1px solid #DADADA99;
              padding: 17px 16px;
              font-weight: 300;
              font-size: 16px;
              line-height: 25px;
              color: #57565E99;
              width: 100%;
              min-height: 60px;
              &::placeholder{
                font-weight: 300 !important;
                font-size: 16px !important;
                line-height: 25px !important;
                color: #57565E99 !important;
              }
              &:focus{
                outline: none;
              }
            }
          }
        }
      }
      .appointment-type-radio-btn-wrapper{
        display: flex;
        align-items: center;
        margin-top: 20px;
        .form-check{
          margin-right: 25px;
          display: flex;
          align-items: center;
          .form-check-label{
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;
            color: #8A8A8F99;
            padding-left: 12px;
          }
          .form-check-input{
            width: 20px;
            height: 20px;
            &:checked{
              background-color: #95CCD5;
              border-color: #95CCD5;
            }
            &:focus{
              box-shadow: none;
            }
          }
          .form-check-input:checked[type=radio]{
            --bs-form-check-bg-image: unset !important;
          }
        }
      }
  `}
`;
export const Label = styled.label`
  display: block;
  color: ${theme.color.secondary};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 8px;
  &.TickSquareicon {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      color: #6bbe99;
      font-weight: 400;
      i {
        width: 18px;
        height: 18px;
        display: flex;
        margin: 0 6px;
      }
    }
  }
  ${(props) =>
    props.isNewDashboardInsightsSitbackLabel &&
    css`
        font-weight: 500;
        font-size: 18px;
        line-height: 16px;
        text-transform: uppercase;
        color: #000000;
        margin-bottom: 12px;
        ${mediaQueries("lg")`
          font-size: 18px;
        `}
        ${mediaQueries("md")`
          font-size: 17px;
        `}
        ${mediaQueries("sm")`
          font-size: 16px;
        `}
      `}
      ${(props) =>
    props.isLoginPageLableText &&
    css`
        font-weight: 400;
        font-size: 16px;
        line-height: 100%;
        margin-bottom: 18px;
        color: ${theme.color.secondary};
        ${mediaQueries("md")`
          font-size: 15px;
          margin-bottom: 16px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
          margin-bottom: 14px;
        `}
      `}
`;
export const Input = styled.input`
  border-radius: 100px;
  border: 1px solid ${theme.color.border};
  background: ${theme.color.lightwhite};
  color: ${theme.color.secondary};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 18px 30px;
  width: 100%;
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  ${mediaQueries("xl")`
        padding: 16px 30px;
        font-size: 15px;
    `}
  ${mediaQueries("lg")`
        padding: 14px 30px;
        font-size: 14px;
    `}
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
    -webkit-text-fill-color: ${theme.color.secondary};
  }
  &::-ms-input-placeholder {
    color: #29508699;
    font-weight: 300;
  }
  &::placeholder {
    color: #29508699;
    font-weight: 300;
  }
  &:focus {
    color: ${theme.color.secondary};
    background-color: ${theme.color.white};
    border-color: ${theme.color.border};
    outline: 0;
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ${(props) =>
    props.isSmallInputWrapper &&
    css`
      border: none;
      outline: none;
      box-shadow: none;
      padding: 9px 24px;
      max-width: 256px;
      font-size: 14px;
      &:focus {
        box-shadow: none;
      }
    `}
  ${(props) =>
    props.isTextCenter &&
    css`
      text-align: center;
    `}
    ${(props) =>
    props.isNewDashboardInsightsSitbackInput &&
    css`
        border-radius: 100px;
        border: 1px solid #DADADA99;
        padding: 17px 16px;
        font-weight: 300;
        font-size: 16px;
        line-height: 25px;
        color: #57565E99;
        background: #FFFFFF;
        &::placeholder{
          font-weight: 300;
          font-size: 16px;
          line-height: 25px;
          color: #57565E99;
        }
      `}
`;
export const Select = styled.select`
  border-radius: 100px;
  border: 1px solid ${theme.color.border};
  color: ${theme.color.secondary};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 18px 30px;
  width: 100%;
  outline: none;
  box-shadow: none;
  box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: ${theme.color.lightwhite} url("images/down-icon.svg") no-repeat;
  background-position: right 18px center;
  background-size: 15px;
  ${mediaQueries("xl")`
        padding: 16px 30px;
        font-size: 15px;
    `}
  ${mediaQueries("lg")`
        padding: 14px 30px;
        font-size: 14px;
    `}
    &:focus {
    color: ${theme.color.secondary};
    background-color: ${theme.color.white};
    border-color: ${theme.color.border};
    outline: 0;
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  }
  option[value="1"] {
    i {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      margin-right: 15px;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
`;
export const LoginTextTitle = styled.h2`
  color: ${theme.color.secondary};
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: 42px;
  margin-bottom: 40px;
  letter-spacing: -0.01em;
  text-align: center;

  ${mediaQueries("xl")`
        font-size: 30px;
        line-height: 40px;
        margin-bottom: 36px;
    `}
  ${mediaQueries("lg")`
        font-size: 28px;
        line-height: 38px;
        margin-bottom: 32px;
    `}
    ${mediaQueries("md")`
        font-size: 26px;
        line-height: 34px;
        margin-bottom: 27px;
    `}
    ${mediaQueries("sm")`
        font-size: 22px;
        line-height: 30px;
        margin-bottom: 24px;
    `}
`;
export const SocialLoginIconsWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0px;
  gap: 8px;
  li {
    flex: 0 0 33%;
    width: 100%;
    padding: 0 4px;
    position: relative;
    overflow: hidden;
    .google-icon {
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 24px;
      height: 24px;
      cursor: pointer;
      ${mediaQueries("lg")`
                width: 21px;
                height: 21px;
            `}
      ${mediaQueries("md")`
                width: 18px;
                height: 18px;
            `}
            svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    > div {
      border-radius: 8px;
      border: 1px solid ${theme.color.border};
      background: ${theme.color.lightwhite};
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px !important;
      ${mediaQueries("md")`
                padding: 12px;
                height: 44px !important;
            `}
      div {
        border: none !important;
        /* opacity: 0; */
        /* z-index: 2; */
        /* position: relative; */
        iframe {
          transform: scale(2.5);
          opacity: 0;
          div {
            border: none !important;
          }
        }
        .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
          border: none !important;
        }
      }
    }
    a {
      border-radius: 8px;
      border: 1px solid ${theme.color.border};
      background: ${theme.color.lightwhite};
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      ${mediaQueries("md")`
                padding: 12px;
            `}
      i {
        width: 26px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${mediaQueries("lg")`
                    width: 21px;
                    height: 21px;
                `}
        ${mediaQueries("md")`
                    width: 18px;
                    height: 18px;
                `}
                svg {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
export const SubTitleText16 = styled.h3`
  color: ${theme.color.secondary};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
`;
export const SubTitleText18 = styled.h4`
  color: ${theme.color.secondary};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 1px;
`;
export const SitBackModalBodyWrapper = styled.div`
  padding: 30px 0 9px;
  &.new-appointment-details {
    .search-input-icon-wrapper {
      position: relative;
      i {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        svg {
          color: #979797;
          display: block;
          width: 100%;
          height: 100%;
        }
        &::before {
          position: absolute;
          content: "";
          height: 20px;
          width: 1px;
          background: #979797;
          left: -12px;
        }
      }
    }
  }
  &.add-amenities-modal-wrapper{
    padding: 0;
    .amenities-moadal-header{
      border-bottom: 1px solid #2950864D;
      position: relative;
      padding: 25px 0 25px;
      .modal-title-text{
        font-weight: 700;
        font-size: 25px;
        line-height: 38px;
        letter-spacing: -1%;
        text-align: center;
        color: #295086;
        ${mediaQueries("xl")`
            font-size: 23px;
            line-height: 36px;
        `}
        ${mediaQueries("lg")`
            font-size: 21px;
            line-height: 34px;
        `}
        ${mediaQueries("md")`
            font-size: 19px;
            line-height: 32px;
        `}
        ${mediaQueries("sm")`
            font-size: 17px;
            line-height: 32px;
        `}
      }
      .close-btn{
        background: #FFFFFF;
        border: 1px solid #EAEBEC;
        border-radius: 1000px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        i{
          display: block;
          width: 40px;
          height: 40px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
      }
    }
    .amenities-detail-body-wrapper{
      max-width: 550px;
      margin: 50px auto 70px;
      ${mediaQueries("xl")`
          margin: 50px auto 60px;
      `}
      ${mediaQueries("lg")`
          margin: 40px auto 50px;
      `}
      ${mediaQueries("md")`
          margin: 30px auto 40px;
      `}
      ${mediaQueries("sm")`
          margin: 20px auto 30px;
      `}
      ${mediaQueries("xl")`
            font-size: 23px;
            line-height: 36px;
        `}
        ${mediaQueries("lg")`
            font-size: 21px;
            line-height: 34px;
        `}
        ${mediaQueries("md")`
            font-size: 19px;
            line-height: 32px;
        `}
        ${mediaQueries("sm")`
            font-size: 17px;
            line-height: 32px;
        `}
      ul{
        list-style-type: none;
        padding: 0;
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0;
          }
          p{
            font-weight: 500;
            font-size: 22px;
            line-height: 100%;
            letter-spacing: 1px;
            color: #29508699;
            ${mediaQueries("xl")`
                font-size: 21px;
            `}
            ${mediaQueries("lg")`
                font-size: 20px;
            `}
            ${mediaQueries("md")`
                font-size: 19px;
            `}
            ${mediaQueries("sm")`
                font-size: 18px;
            `}
            &.checked{
               color: #295086 !important;
            }
          }
        }
      }
      .checkbox-wrapperv5{
            display: flex;
            align-items: center;
            padding-top: 5px;
            input{
                width: 30px;
                height: 30px;
                margin: 0;
                border-color: #295086;
                border-width: 1px;
                border-radius: 2px;
                &:focus {
                    border-color: #295086;
                    outline: 0;
                    box-shadow: unset;
                }
                &:checked{
                    background-color: #295086;
                    border-color: transparent;
                    --bs-form-check-bg-image:unset;
                    position: relative;
                    &::before{
                        position: absolute;
                        content: '';
                        left: 0;
                        top: -3px;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 8px;
                        height: 16px;
                        border: solid white;
                        border-width: 0 2px 2px 0;
                        -webkit-transform: rotate(45deg);
                        -ms-transform: rotate(45deg);
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
    .amenities-btn-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 700px;
      margin: auto;
      padding-bottom: 40px;
      ${mediaQueries("sm")`
        flex-direction: column;
        padding-bottom: 20px;
      `}
      button{
        max-width: 280px;
        &.amenities-btn{
          font-weight: 600;
          font-size: 16px;
          line-height: 100%;
          text-transform: uppercase;
          color: #FFFFFF;
          background: #95CCD5;
          border: none;
          ${mediaQueries("md")`
            margin-right: 15px;
          `}
          ${mediaQueries("sm")`
            margin-right: 0;
            margin-bottom: 15px;
            font-size: 14px;
          `}
        }
        &.amenities-btn-profile{
          font-weight: 500;
          font-size: 14px;
          line-height: 100%;
          text-transform: uppercase;
          color: #FFFFFF;
          background: #004D87;
          border: none;
          ${mediaQueries("md")`
            margin-right: 15px;
          `}
          ${mediaQueries("sm")`
            margin-right: 0;
            margin-bottom: 15px;
            font-size: 14px;
          `}
        }
        &.cancel-btn-wrapper{
          font-weight: 600;
          font-size: 16px;
          line-height: 100%;
          text-transform: uppercase;
          margin-left: 35px;
          ${mediaQueries("sm")`
            font-size: 14px;
            margin-left: 0;
          `}
        }
        &.cancel-btn-wrapper-profile{
          color: #004D87;
          border: 1px solid #CFCFCF;
          background: #F2F6F9;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          line-height: normal;
          text-transform: capitalize !important;
          margin-left: 35px;
          ${mediaQueries("sm")`
            font-size: 14px;
            margin-left: 0;
          `}
        }
      }
    }
  }
  .modal-title-text {
    color: ${theme.color.secondary};
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
    ${mediaQueries("xxl")`
            font-size: 27px;
        `}
    ${mediaQueries("xl")`
            font-size: 25px;
        `}
        ${mediaQueries("lg")`
            font-size: 21px;
        `}
        ${mediaQueries("md")`
            font-size: 18px;
        `}
  }
  .account-section {
    /* margin-bottom: 15px; */
  }
  .white-input-wrapper {
    .birthday {
      padding-left: 5px;
    }
  }
  .provider-form {
    padding: 0 10px;
  }
  .formgropcustom {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .checkbox-wrapper-div {
      display: flex;
      align-items: center;
      gap: 12px;

      .form-check-input {
        height: 18px;
        width: 18px;
      }
      label {
        padding-top: 4px;
        padding-top: 4px;
        display: block;
        color: #295086;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .form-check-input:checked {
        // background-color: #95CCD5;
        // border-color: #95CCD5;
      }
    }
    .btn-wrapper {
      padding: 6px 12px;
      background: #295086;
      border-radius: 12px;
      color: white;
      font-size: 12px;
      cursor: pointer;
      margin-right: 7px;
    }
  }
  .total-amount {
    text-align: center;
    width: 100%;
    padding: 6px 12px 12px;
    p {
      color: ${theme.color.secondary};
      font-size: 26px;
      opacity: 0.6;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 1px;
      text-align: center;
      ${mediaQueries("xxl")`
              font-size: 22px;
          `}
      ${mediaQueries("xl")`
              font-size: 20px;
          `}
          ${mediaQueries("lg")`
              font-size: 18px;
          `}
          ${mediaQueries("md")`
              font-size: 16px;
          `}
    }
    h3 {
      margin-bottom: 12px;
      color: ${theme.color.secondary};
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 1px;
      text-align: center;
      ${mediaQueries("xxl")`
              font-size: 22px;
          `}
      ${mediaQueries("xl")`
              font-size: 20px;
          `}
          ${mediaQueries("lg")`
              font-size: 18px;
          `}
          ${mediaQueries("md")`
              font-size: 16px;
          `}
    }
  }
  .subscription-model {
    margin-right: 10px;
    .formgrop {
      margin-bottom: 15px;
    }
    .length-detail-div {
      .input-wrapper {
        p {
          text-align: left;
          display: block;
          color: #295086;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          margin-bottom: 8px;
        }
      }
    }
  }
  .upload-gallery-img-section {
    text-align: center;
    margin-bottom: 25px;
    .upload-gallery {
      width: 130px;
      height: 130px;
      margin: 0 auto 15px;
      overflow: hidden;
      border-radius: 1000px;
      position: relative;
      cursor: pointer;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        &.provider-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      input {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        opacity: 0;
      }
    }
    p {
      color: ${theme.color.secondary};
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 1px;
      margin-bottom: 8px;
      opacity: 0.7;
    }
  }
  .gallery-image-view {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: -10px;
    max-height: 350px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
      /* height: 6px; */
    }
    &::-webkit-scrollbar-track {
      background: #e9dede;
    }
    &::-webkit-scrollbar-thumb {
      background: #295086;
    }

    .gridbox {
      padding: 10px;
      flex: 0 0 25%;
    }
    .gallery-image-box {
      width: 100%;
      height: 150px;
      overflow: hidden;
      border-radius: 8px;
      position: relative;
      .delete-icon-box {
        width: 30px;
        height: 30px;
        border: none;
        box-shadow: none;
        padding: 0;
        background: #f1f4f7;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        right: 12px;
        bottom: 12px;
        i {
          width: 18px;
          height: 18px;
          display: block;
          svg {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
      .gallery-img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
  .mange-schedule-form {
    max-width: 630px !important;
  }
  form {
    max-width: 600px;
    width: 100%;
    margin: 21px auto;
    max-height: 550px;
    overflow: hidden;
    overflow-y: auto;
    padding-right: 6px;
    &::-webkit-scrollbar {
      width: 5px;
      /* height: 6px; */
    }
    &::-webkit-scrollbar-track {
      background: #ebebeb;
    }
    &::-webkit-scrollbar-thumb {
      background: #c4c4c499;
      border-radius: 8px;
    }
    > div {
      margin-bottom: 15px;
    }
    .date-input-wrappper {
      position: relative;
      .row-grid {
        display: flex;
        margin: 0 -12px;
        .col-grid {
          padding: 0 12px;
          flex: 0 0 48%;
          > div {
            margin-bottom: 15px;
          }
        }
        .totext-center {
          flex: 1;
        }
      }
      .time-addinput-wrapper {
        width: 100%;
        /* width: calc(100% - 140px); */
        input {
          border-radius: 100px;
          border: 1px solid ${theme.color.border};
          background: ${theme.color.lightwhite};
          color: ${theme.color.secondary};
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          padding: 18px 24px;
          outline: none;
          box-shadow: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          height: auto;
          /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
          ${mediaQueries("xl")`
                        padding: 16px 24px;
                        font-size: 15px;
                    `}
          ${mediaQueries("lg")`
                        padding: 14px 24px;
                        font-size: 14px;
                    `}
                    &:-webkit-autofill,
                    &:-webkit-autofill:hover,
                    &:-webkit-autofill:focus,
                    &:-webkit-autofill:active {
            /* -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important; */
          }
          &::-ms-input-placeholder {
            color: #295086b2;
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
          }
          &::placeholder {
            color: #295086b2;
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
          }
          &:focus {
            color: ${theme.color.secondary};
            background-color: ${theme.color.white};
            border-color: ${theme.color.border};
            outline: 0;
            /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
          }
        }
        .rc-time-picker-clear {
          display: none;
        }
      }
      .text-danger {
        display: block;
        margin-left: 25px;
        margin-top: -13px;
        font-size: 12px;
        font-style: normal;
        line-height: normal;
      }
    }
    input {
      box-shadow: none;
      &:focus {
        box-shadow: none;
      }
    }
    select {
      box-shadow: none;
      &:focus {
        box-shadow: none;
      }
    }
    .length-detail-div {
      display: flex;
      .input-wrapper {
        width: 100%;
        margin-right: 30px;
        p {
          color: ${theme.color.secondary};
          text-align: start;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 30px;
          letter-spacing: 1px;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .modal-footer-div {
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      gap: 29px;
      margin-top: 45px !important;
      margin-bottom: 10px;
      .loading-btn-wrapper {
        text-transform: none;
        background: #295086;
      }
      button {
        max-width: 100%;
      }
    }
    .react-datepicker-wrapper {
      width: 100%;
    }
    .totext-center {
      display: flex;
      align-items: center;
      justify-content: center;
      h6 {
        color: #707070;
        font-size: 15px;
        margin-top: -10px;
      }
    }
    .datepicker-input {
      border-radius: 100px;
      border: 1px solid ${theme.color.border};
      background: ${theme.color.lightwhite};
      color: ${theme.color.secondary};
      font-size: 15px;
      font-style: normal;
      font-weight: 350;
      line-height: normal;
      padding: 18px 30px;
      width: 100%;
      outline: none;
      box-shadow: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      box-shadow: none;
      background: ${theme.color.lightwhite};
      background: ${theme.color.lightwhite} url("images/down-icon.svg") no-repeat;
      background-position: right 21px center;
      background-size: 12px;
      ${mediaQueries("xl")`
                padding: 16px 30px;
                font-size: 15px;
            `}
      ${mediaQueries("lg")`
                padding: 14px 30px;
                font-size: 14px;
            `}
            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
        -webkit-text-fill-color: ${theme.color.secondary};
      }
      &::-ms-input-placeholder {
        color: #29508699;
        font-weight: 300;
      }
      &::placeholder {
        color: #29508699;
        font-weight: 300;
      }
    }
    .checkbox-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
      .checkbox-wrapper-div {
        padding: 0 5px;
        flex: 0 0 50%;
        input[type="checkbox"] {
          display: none;
        }
        label {
          display: inline-flex;
          align-items: center;
          width: 100%;
          p {
            color: ${theme.color.secondary};
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
          }
          span {
            width: 20px;
            height: 20px;
            border: 1px solid ${theme.color.secondary};
            border-radius: 100px;
            margin-right: 8px;
            background: ${theme.color.white};
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            &:after {
              position: absolute;
              content: "";
              background: url("images/check-mark-icon.svg") no-repeat;
              background-position: center;
              background-size: contain;
              width: 10px;
              height: 10px;
              opacity: 0;
            }
          }
        }
        input[type="checkbox"] + label {
          border: solid 1px ${theme.color.secondary};
          border-radius: 8px;
          color: ${theme.color.secondary};
          padding: 14px 10px;
          background-color: #eeeeee;
          cursor: pointer;
          user-select: none;
        }
        input[type="checkbox"]:checked + label {
          border: solid 1px ${theme.color.secondary};
          color: ${theme.color.secondary};
          background-color: #eeeeee;
          span {
            &:after {
              opacity: 1;
            }
          }
        }
      }
      &.available-times {
        margin: -2px;
        .checkbox-wrapper-div {
          flex: 0 0 14%;
          margin: 0;
          padding: 2px;
          label {
            justify-content: center;
          }
          input[type="checkbox"] + label {
            border-color: #dadada;
            background-color: #FFF;
            /* color: #707070; */
            padding: 14px 4px;
            border-radius: 15px;
            font-size: 14px;
            color: #295086b2;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            ${mediaQueries("md")`
                           padding: 15px 4px;
                           font-size: 12px;
                        `}
            ${mediaQueries("sm")`
                           padding: 9px 4px;
                        `}
          }
          input[type="checkbox"]:checked + label {
            border-color: ${theme.color.logintitlecolor};
            background-color: ${theme.color.logintitlecolor};
            color: ${theme.color.white};
            padding: 14px 4px;
            border-radius: 15px;
            font-size: 14px;
            /* color: #295086; */
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            ${mediaQueries("md")`
                           padding: 15px 4px;
                           font-size: 12px;
                        `}
            ${mediaQueries("sm")`
                           padding: 9px 4px;
                        `}
          }
        }
      }
      &.provider-appointment-section {
        margin: -8px;
        .checkbox-wrapper-div {
          padding: 8px;
          flex: 0 0 33.33%;
          input[type="radio"] {
            display: none;
          }
          label {
            display: inline-flex;
            align-items: center;
            width: 100%;
            position: relative;
            p {
              color: ${theme.color.secondary};
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: 1px;
              word-break: break-word;
            }
            h6 {
              word-break: break-word;
            }
            span {
              width: 20px;
              height: 20px;
              border: 1px solid ${theme.color.secondary};
              border-radius: 100px;
              margin-right: 8px;
              background: ${theme.color.white};
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              position: absolute;
              left: 8px;
              top: 8px;
              &:after {
                position: absolute;
                content: "";
                background: url("images/check-mark-icon.svg") no-repeat;
                background-position: center;
                background-size: contain;
                width: 10px;
                height: 10px;
                opacity: 0;
              }
            }
            > div {
              text-align: center;
              width: 100%;
            }
            .user-img-wrapper {
              width: 127px;
              height: 127px;
              margin: auto;
              overflow: hidden;
              border-radius: 10000px;
              background: #e4e4e4;
              margin-bottom: 6px;
              ${mediaQueries("sm")`
                width: 115px;
                height: 115px;
              `}
            }
            p {
              display: flex;
              align-items: center;
              justify-content: center;
              i {
                display: flex;
                align-items: center;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                svg {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          input[type="radio"] + label {
            border: solid 1px ${theme.color.secondary};
            border-radius: 8px;
            color: ${theme.color.secondary};
            padding: 10px;
            background-color: #eeeeee;
            cursor: pointer;
            user-select: none;
          }
          input[type="radio"]:checked + label {
            border: solid 1px ${theme.color.secondary};
            color: ${theme.color.secondary};
            background-color: #eeeeee;
            span {
              &:after {
                opacity: 1;
              }
            }
          }
          input[type="radio"] + label {
            border-color: ${theme.color.white};
            background: ${theme.color.white};
          }
          input[type="radio"]:checked + label {
            border: solid 1px ${theme.color.secondary};
            color: ${theme.color.secondary};
            background-color: #eeeeee;
            span {
              opacity: 1;
              &:after {
                opacity: 1;
              }
            }
          }
        }
        .data-text {
          margin: 5px 0px;
          padding-left: 25px;
          font-size: 14px;
          font-weight: 300;
          line-height: 18px;
          letter-spacing: 1px;
          /* text-align: center; */
          color: #295086B2;
        }
      }
      &.available-appointments-section {
        margin: -8px;
        .checkbox-wrapper-div {
          padding: 8px;
          flex: 0 0 33.33%;
          input[type="radio"] {
            display: none;
          }
          label {
            display: inline-flex;
            align-items: center;
            width: 100%;
            position: relative;
            span {
              width: 20px;
              height: 20px;
              border: 1px solid ${theme.color.secondary};
              border-radius: 100px;
              margin-right: 8px;
              background: ${theme.color.white};
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              position: absolute;
              left: 8px;
              top: 0;
              bottom: 0;
              margin: auto;
              &:after {
                position: absolute;
                content: "";
                background: url("images/check-mark-icon.svg") no-repeat;
                background-position: center;
                background-size: contain;
                width: 10px;
                height: 10px;
                opacity: 0;
              }
            }
            > div {
              text-align: center;
              width: 100%;
            }
            p {
              width: calc(100% - 20px);
              margin: 0 0 0 auto;
              text-align: center;
              margin-left: 20px;
              &.timetext{
                color: #29508699;
                margin-top: 5px;
              }
            }
          }
          input[type="radio"] + label {
            border: solid 1px ${theme.color.secondary};
            border-radius: 8px;
            color: ${theme.color.secondary};
            padding: 14px 10px;
            background-color: #eeeeee;
            cursor: pointer;
            user-select: none;
          }
          input[type="radio"]:checked + label {
            border: solid 1px ${theme.color.secondary};
            color: ${theme.color.secondary};
            background-color: #eeeeee;
            span {
              &:after {
                opacity: 1;
              }
            }
          }
          input[type="radio"] + label {
            border-color: #bad9d5;
            background: #bad9d5;
          }
          input[type="radio"]:checked + label {
            border: solid 1px ${theme.color.secondary};
            color: ${theme.color.secondary};
            background-color: #eeeeee;
            span {
              opacity: 1;
              &:after {
                opacity: 1;
              }
            }
          }
        }
        .data-text {
          margin: 5px 0px;
          padding-left: 25px;
          font-size: 14px;
          font-weight: 300;
          line-height: 18px;
          letter-spacing: 1px;
          /* text-align: center; */
          color: #295086B2;
        }
      }
    }
    .IdentifyDocument{

      display: flex;
      align-items: center;
      h5{
        color: #295086;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 1px;
      }
      button{
        background: transparent;
        border: none;
        padding: 0;
        width: 18px;
        height: 18px;
        i{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          svg{
            width: 100%;
            height: 100%;
            display: block;
            path{
              fill: #295086;
            }
          }
        }
      }
    }
    .front-and-back-image-wrapper {
      margin-bottom: 25px;
      .upload-file-input-wrapper {
        .upload-file-input {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 12px;
          border: 1px dashed ${theme.color.border};
          background: #f3f3f3;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          img {
            width: 44px;
            height: 44px;
            margin-bottom: 6px;
          }
          p {
            color: ${theme.color.secondary};
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
          }
        }
      }
    }
    .otp-input-wrapper {
      display: flex;
      max-width: 440px;
      margin: 0;
      width: 100%;
      justify-content: space-between;
      input {
        border-radius: 8px;
        padding: 12px;
        flex: 0 0 22%;
        min-height: 65px;
        text-align: center;
        ${mediaQueries("lg")`
                    min-height: 51px;
                `}
        ${mediaQueries("md")`
                    min-height: 51px;
                `}
                &:focus {
          border-color: ${theme.color.primary};
        }
      }
    }
    .login-detail-text-wrapper {
      &.resend-code-link {
        margin-top: -28px;
        color: #295086;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        flex-direction: column;
        display: flex;
        .pointer {
          cursor: pointer;
        }
        ${mediaQueries("lg")`
                    margin-top: -10px;
                `}
        ${mediaQueries("md")`
                    margin-top: -10px;
                `}
      }
    }
  }
  .select-time-slots-wrapper {
    max-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 0;
    .timeit-wrapper-0-1-1 {
      .timeit-control-0-1-2 {
        .timeit-control__time-0-1-3 {
          width: 21px;
          height: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            path {
              stroke-width: 3px;
              stroke: rgba(41, 80, 134, 0.7);
            }
          }
        }
        .timeit-wrapper-0-1-5 {
          .timeit-selector-0-1-6 {
          }
          .timeit-timeWrapper-0-1-7 {
            .timeit-time-0-1-8 {
              color: rgba(193, 185, 187, 0.4);
              &.timeit-selected-0-1-9 {
                color: #295086;
                font-size: 25px;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
    .select-time-slots {
    }
  }
  .sitback-selecttitme-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    h5 {
      display: block;
      color: ${theme.color.secondary};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      width: 100%;
      /* margin-right: 15px; */
      /* flex: 1; */
    }
    .time-addinput-wrapper {
      width: 100%;
      /* width: calc(100% - 140px); */
      input {
        border-radius: 100px;
        border: 1px solid ${theme.color.border};
        background: ${theme.color.lightwhite};
        color: ${theme.color.secondary};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 18px 24px;
        outline: none;
        box-shadow: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height: auto;
        /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
        ${mediaQueries("xl")`
                    padding: 16px 24px;
                    font-size: 15px;
                `}
        ${mediaQueries("lg")`
                    padding: 14px 24px;
                    font-size: 14px;
                `}
                &:-webkit-autofill,
                &:-webkit-autofill:hover,
                &:-webkit-autofill:focus,
                &:-webkit-autofill:active {
          /* -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important; */
        }
        &::-ms-input-placeholder {
          color: #29508699;
          font-weight: 300;
        }
        &::placeholder {
          color: #29508699;
          font-weight: 300;
        }
        &:focus {
          color: ${theme.color.secondary};
          background-color: ${theme.color.white};
          border-color: ${theme.color.border};
          outline: 0;
          /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
        }
      }
      .rc-time-picker-clear {
        display: none;
      }
    }
  }
  .hour-text {
    &.rating-text {
      p {
        h5 {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 15px !important;
        }
      }
    }
  }
  .note-wrapper-block {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24px;
    h6 {
      font-size: 16px;
      font-weight: 600;
      line-height: 22.5px;
      text-align: left;
      color: #295086b2;
      margin-top: -3px;
      margin-right: 5px;
    }
    p {
      font-size: 16px;
      font-weight: 300;
      line-height: 21.92px;
      text-align: left;
      color: #295086b2;
    }
  }
`;
export const ServiceProviderIconWrapper = styled.div`
  display: flex;
  margin: -12px;
  flex-wrap: wrap;
  .box-wrapper {
    flex: 0 0 50%;
    padding: 12px;
    .service-nemu-list-box {
      background: ${theme.color.lightwhite};
      padding: 15px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 245px;
      box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
      ${mediaQueries("xl")`
        min-height: 220px;
      `}
      ${mediaQueries("lg")`
        min-height: 200px;
      `}
      ${mediaQueries("sm")`
        min-height: 160px;
      `}
      &:hover {
        background: ${theme.color.secondary};
        i {
          svg {
            color: ${theme.color.white};
          }
        }
        h5 {
          color: ${theme.color.white};
        }
      }
      i {
        width: 51px;
        height: 51px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        ${mediaQueries("md")`
          width: 50px;
          height: 50px;
        `}
        ${mediaQueries("sm")`
          width: 45px;
          height: 45px;
        `}
        ${mediaQueries("xs")`
          width: 40px;
          height: 40px;
        `}
        svg {
          color: ${theme.color.secondary};
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      h5 {
        color: ${theme.color.secondary};
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        word-break: break-word;
        ${mediaQueries("xl")`
          font-size: 22px;
        `}
        ${mediaQueries("lg")`
          font-size: 20px;
        `}
        ${mediaQueries("md")`
          font-size: 18px;
        `}
        ${mediaQueries("sm")`
          font-size: 18px;
          font-weight: 600;
        `}
        ${mediaQueries("xs")`
          font-size: 14px;
        `}
      }
    }
  }
`;
export const PrivacyPolicyWrapper = styled.div`
  padding: 40px 0;
  overflow: hidden;
  position: relative;
  &.privacy-policy-updated-div{
    max-width: 1210px;
    border-radius: 19px;
    background: #FFF;
    margin: -40px auto 0;
    padding: 30px 20px 30px 35px;
    ${mediaQueries("sm")`
      margin: 0;
      border-radius: unset;
      padding: 30px 20px 30px 20px;
    `}
    .terms-main-title{
      color: ${theme.color.logintitlecolor};
      font-size: 34px;
      font-weight: 600;
      line-height: 45px;
      margin-bottom: 35px;
      ${mediaQueries("lg")`
        font-size: 32px;
        line-height: 40px;
      `}
      ${mediaQueries("lg")`
        font-size: 28px;
        line-height: 38px;
      `}
      ${mediaQueries("md")`
        font-size: 26px;
        line-height: 34px;
      `}
      ${mediaQueries("sm")`
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 30px;
      `}
    }
    h5{
        color: ${theme.color.logintitlecolor};
        font-size: 22px;
        font-weight: 600;
        line-height: 45px;
        margin-bottom: 8px;
        ${mediaQueries("lg")`
          font-size: 21px;
          line-height: 40px;
        `}
        ${mediaQueries("lg")`
          font-size: 20px;
          line-height: 38px;
        `}
        ${mediaQueries("md")`
          font-size: 19px;
          line-height: 34px;
        `}
        ${mediaQueries("sm")`
          font-size: 18px;
          line-height: 30px;
        `}
        &.privacy-introduction-text{
          color: #004D87;
          font-size: 34px;
          font-weight: 600;
          line-height: 45px;
          margin-bottom: 12px;
          ${mediaQueries("lg")`
            font-size: 32px;
            line-height: 42px;
          `}
          ${mediaQueries("lg")`
            font-size: 30px;
            line-height: 38px;
          `}
          ${mediaQueries("md")`
            font-size: 28px;
            line-height: 34px;
          `}
          ${mediaQueries("sm")`
            font-size: 24px;
            line-height: 30px;
          `}
        }
    }
    .privacy-introduction-para-text{
        color: #004D87;
        font-size: 16px;
        font-weight: 500;
        line-height: 34px;
        margin-bottom: 24px;
        ${mediaQueries("md")`
          font-size: 15px;
          line-height: 32px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
          line-height: 30px;
        `}
      }
      .medium-title-text{
        color: #004D87;
        font-size: 18px;
        font-weight: 500;
        line-height: 45px;
        margin-bottom: 0;
        ${mediaQueries("md")`
          font-size: 17px;
          line-height: 40px;
        `}
        ${mediaQueries("sm")`
          font-size: 16px;
          line-height: 35px;
        `}
      }
      .privacy-policy-detail-header-text{
        margin-bottom: 8px;
      }
    p{
      color: ${theme.color.logintitlecolor};
      font-size: 16px;
      font-weight: 300;
      line-height: 34px;
      ${mediaQueries("md")`
          font-size: 15px;
          line-height: 32px;
        `}
      ${mediaQueries("sm")`
        font-size: 14px;
        line-height: 30px;
      `}
    }
    ul{
      li{
        color: ${theme.color.logintitlecolor};
        font-size: 16px;
        font-weight: 300;
        line-height: 24px;
        ${mediaQueries("md")`
          font-size: 15px;
          line-height: 32px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
          line-height: 30px;
        `}
      }
    }
    .contact-terms-link-wrapper{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      p{
        border-radius: 35px;
        background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
        padding: 10px 25px;
        margin-right: 10px;
        a{
          color: #004D87;
          font-size: 16px;
          font-weight: 400;
          line-height: 34px; /* 212.5% */
          text-decoration: underline !important;
          ${mediaQueries("md")`
              font-size: 15px;
              line-height: 32px;
            `}
          ${mediaQueries("sm")`
            font-size: 14px;
            line-height: 30px;
          `}
        }
      }
    }
  }
    .container{
        z-index: 1;
        position: relative;
    }
    .cloud-image-wrapper{
      max-width: 723px;
      height: 280px;
      width: 100%;
      overflow: hidden;
      position: absolute;
      left: -480px;
      top: 200px;
      &.right-side-cloud-img{
          right: -330px;
          top: -200px;
          left: auto;
      }
      &.right-bottom-side-cloud-img{
          right: -280px;
          top: 600px;
          left: auto;
      }
      &.right-bottom4-side-cloud-img{
        right: -280px;
        top: 1600px;
        left: auto;
      }
      img{
        object-fit: contain;
      }
    }
  h2 {
    text-align: start;
    line-height: normal;
    font-weight: 900;
    margin-bottom: 28px;
  }
  h5 {
    color: ${theme.color.secondary};
    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 15px;
  }
  h6 {
    color: ${theme.color.secondary};
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 12px;
  }
  p {
    color: ${theme.color.secondary};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 15px;
    a {
      display: inline-flex;
      color: ${theme.color.secondary};
      text-decoration: underline !important;
      &.underline-unset{
        text-decoration: unset !important;
      }
    }
  }
  ul {
    padding-left: 30px;
    list-style-type: unset;
    li {
      color: ${theme.color.secondary};
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px;
      margin-bottom: 21px;
    }
  }
  div {
    margin-bottom: 35px;
    &:last-child {
      margin-bottom: 0;
    }
    ul {
      li {
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 12px;
        }
      }
    }
    /* p {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    } */
  }
`;
export const TableWrapperMain = styled.div`
  .table-responsive {
    table {
      tr {
        th {
          background: #d2d7df;
          padding: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #295086;
          text-transform: uppercase;
        }
      }
      tr {
        td {
          font-size: 13px;
          font-weight: 400;
          line-height: normal;
          color: #295086;
          padding: 8px;
          span {
            background: transparent;
            display: flex;
            flex-direction: column;
            line-height: normal;
            font-size: 13px;
            font-weight: 400;
            line-height: normal;
            color: #295086;
            height: auto;
            min-height: auto;
            max-height: unset;
            padding: 0;
          }
        }
      }
    }
  }
`;
export const SubTitleText48 = styled.h2`
    color: ${theme.color.secondary};
    text-align: center;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: 64px;
    margin-bottom: 15px;
    ${mediaQueries("xxl")`
        font-size: 44px;
        line-height: 55px;
    `}
    ${mediaQueries("xl")`
        font-size: 40px;
        line-height: 50px;
    `}
    ${mediaQueries("lg")`
        font-size: 35px;
        line-height: 45px;
    `}
    ${mediaQueries("md")`
        font-size: 30px;
        line-height: 40px;
    `}
    ${mediaQueries("sm")`
        font-size: 24px;
        line-height: 35px;
    `}
    ${mediaQueries("xs")`
        font-size: 20px;
        line-height: 30px;
    `}
    span{
      font-style: italic;
      display: inline-block;
    }

`;
export const ParagraphText32 = styled.p`
    font-size: 30px;
    font-weight: 400;
    line-height: 41px;
    text-align: center;
    color: ${theme.color.secondary};
    opacity: 0.6;
    ${mediaQueries("xxl")`
        font-size: 28px;
        line-height: 36px;
    `}
    ${mediaQueries("xl")`
        font-size: 26px;
        line-height: 32px;
    `}
    ${mediaQueries("lg")`
        font-size: 22px;
        line-height: 28px;
    `}
    ${mediaQueries("md")`
        font-size: 18px;
        line-height: 26px;
    `}
    ${mediaQueries("sm")`
        font-size: 16px;
        line-height: 24px;
    `}
    ${mediaQueries("xs")`
        font-size: 14px;
        line-height: 22px;
    `}
`;
export const FooterBarWrapper = styled.div`
  background: ${theme.color.primary};
  .container{
    max-width: 1675px;
    ${mediaQueries("xxl")`
      max-width: 1260px;
    `}
    ${mediaQueries("xl")`
      max-width: 1200px;
    `}
  }
  .main-footerbar{
    padding: 21px 0;
    display: flex;
    align-items: center;
    ${mediaQueries("sm")`
      flex-direction: column;
    `}
    .logo-wrapper{
      width: 120px;
      height: 54px;
      overflow: hidden;
      display: inline-block;
      ${mediaQueries("sm")`
        margin-bottom: 15px;
        width: 100px;
        height: 45px;
      `}
    }
    .nav-link-footer{
      flex: 1;
      display: flex;
      justify-content: center;
      margin-left: -120px;
      ${mediaQueries("md")`
        margin-left: 0px;
      `}
      ul{
        display: flex;
        align-items: center;
        ${mediaQueries("sm")`
          flex-direction: column;
          justify-content: center;
        `}
        li{
          margin: 0 12px;
          ${mediaQueries("sm")`
             margin: 8px;
          `}
          a{
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: normal;
            color: #295086;
            ${mediaQueries("sm")`
              font-size: 13px;
            `}
          }
        }
      }
    }
  }
  .sub-footerbar{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 21px 0;
    border-top: 1px solid #295086;
    p{
      font-style: normal;
      font-weight: 300;
      font-size: 15px;
      line-height: normal;
      display: flex;
      align-items: center;
      color: #295086;
      ${mediaQueries("sm")`
        font-size: 13px;
      `}
    }
  }
  .footer-text-sitback{
    text-align: center;
    font-weight: 600;
    color: #295086;
    font-size: 15px;
    padding-bottom: 15px;
  }
  &.sitback-footer-updated-wrapper{
    margin: 0 20px 20px;
    border-radius: 35px;
    background: ${theme.color.logintitlecolor};
    ${mediaQueries("sm")`
       margin: 0;
       border-radius: 0;
    `}
    .sitback-footer-inner-div{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 45px;
      ${mediaQueries("sm")`
        padding-top: 35px;
      `}
      .logo-wrapper{
        width: 192px;
        height: auto;
        overflow: hidden;
        margin-bottom: 50px;
        ${mediaQueries("sm")`
          width: 135px;
        `}
      }
      .footer-btn-div{
        margin-bottom: 28px;
        ul{
          display: flex;
          align-items: center;
          ${mediaQueries("sm")`
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          `}
          li{
            margin-right: 7px;
            margin-bottom: 7px;
            ${mediaQueries("sm")`
              margin-right: 0;
              flex: 1 1 calc(50% - 10px);
              max-width: calc(50% - 10px);
              display: flex;
              justify-content: center;
              margin-bottom: 0;
            `}
            &:last-child{
              margin-right: 0;
            }
            a{
              border-radius: 7px;
              background: #F0F0F0;
              color: #202020;
              font-size: 14px;
              font-weight: 400;
              line-height: normal;
              padding: 11px 16px;
              min-height: 42px;
              ${mediaQueries("sm")`
                font-size: 12px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
              /* &:hover{
                font-weight: 600;
              } */
            }
          }
        }
      }
      .footer-para-text-div{
        max-width: 1200px;
        margin: 0 auto 35px;
        p{
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-style: normal;
          font-weight: 300;
          line-height: 41px;
          ${mediaQueries("xl")`
            font-size: 19px;
            line-height: 37px;
          `}
          ${mediaQueries("lg")`
            font-size: 18px;
            line-height: 34px;
          `}
          ${mediaQueries("md")`
            font-size: 17px;
            line-height: 30px;
          `}
          ${mediaQueries("sm")`
            font-size: 14px;
            line-height: 26px;
          `}
        }
      }
      .footer-social-login{
        margin-bottom: 35px;
        ul{
          display: flex;
          align-items: center;
          li{
            margin-right: 24px;
            &:last-child{
              margin-right: 0;
            }
            a{
              width: 36px;
              height: 36px;
              overflow: hidden;
              display: block;
            }
          }
        }
      }
    }
    .copy-right-footer-div{
      background: #143F79;
      padding: 10px;
      border-radius: 35px;
      ${mediaQueries("sm")`
        border-radius: 0;
      `}
      p{
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 300;
        line-height: 41px;
      }
    }
  }
`;
export const ContactUsLayoutWrapper = styled.div`
  padding: 48px 0;
  overflow: hidden;
  position: relative;
  .cloud-image-wrapper{
    max-width: 723px;
    height: 280px;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: -480px;
    top: 200px;
    &.right-side-cloud-img{
      right: -330px;
      top: -200px;
      left: auto;
    }
  }
  .contact-form-wrapper{
    border: 1px solid #EAEAEA;
    background: #FFFFFF99;
    border-radius: 12px;
    overflow: hidden;
    min-height: 500px;
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    ${mediaQueries("md")`
      flex-direction: column;
    `}
    .contact-detailbox{
      background: #95CCD5;
      width: 480px;
      /* min-height: 640px; */
      text-align: center;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      flex-direction: column;
      position: relative;
      z-index: 2;
      overflow: hidden;
      ${mediaQueries("lg")`
        width: 400px;
      `}
      ${mediaQueries("md")`
        width: 100%;
        min-height: auto;
      `}
      &::after{
        position: absolute;
        content: '';
        background: url("images/image-v4.svg") no-repeat;
        background-position: center;
        background-size: contain;
        width: 274px;
        height: 252px;
        right: -12%;
        bottom: -12%;
        z-index: -1;
        ${mediaQueries("md")`
          right: -46%;
        `}
      }
      h3{
        font-style: normal;
        font-weight: 800;
        font-size: 34px;
        line-height: 51px;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 6px;
        position: relative;
        z-index: 2;
        ${mediaQueries("lg")`
          font-size: 30px;
          line-height: 45px;
        `}
        ${mediaQueries("md")`
          font-size: 26px;
          line-height: 40px;
        `}
        ${mediaQueries("sm")`
          font-size: 22px;
          line-height: 34px;
        `}
      }
      p{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        max-width: 260px;
        width: 100%;
        margin-bottom: 12px;
        position: relative;
        z-index: 2;
        ${mediaQueries("md")`
          font-size: 15px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
        `}
      }
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #FFFFFF;
        position: relative;
        z-index: 2;
        ${mediaQueries("md")`
          font-size: 15px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
        `}
        .iconbox{
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }
      }
    }
    .form-layout-box{
      flex: 1;
      padding: 55px 18px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      ${mediaQueries("sm")`
         padding: 55px 18px 35px;
      `}
      &::after{
        position: absolute;
        content: '';
        background: url("images/contact-arrow-img.png") no-repeat;
        background-position: center;
        background-size: contain;
        margin: auto;
        right: 25%;
        left: 0;
        width: 276px;
        height: 129px;
        transform: rotate(-32deg);
        bottom: 0;
      }
      form{
        max-width: 657px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 1;

        input{
          background-color: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 9px 0;
          border-bottom: 1px solid #295086;
        }
        .error{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: normal;
          color: red;
        }
        textarea{
          background-color: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 9px 0;
          border-bottom: 1px solid #295086;
          resize: none;
        }
        .select-subject{
          margin-bottom: 35px;
        }
        .checkbox-wrapper{
          display: flex;
          flex-wrap: wrap;
          margin: 0 -6px;
          .grid-wrapper{
            padding: 0 6px;
            flex: 0 0 auto;
            .form-check{
              margin: 0;
              .form-check-input{
                width: 18px;
                height: 18px;
                border-radius: 100px;
                margin-right: 10px;
                box-shadow: none !important;
                border: none !important;
                background-color: #29508699;
                &:focus{
                  box-shadow: none !important;
                }
                &:checked[type=radio]{
                  background-color: #295086;
                }
              }
              .form-check-label{
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                color: #295086;
              }
            }
          }
        }
        .footerbox{
          display: flex;
          justify-content: flex-end;
          ${mediaQueries("sm")`
            justify-content: center;
            margin-top: 30px;
          `}
          button{
            width: auto;
            min-width: 190px;
            background: #295085;
            border-color: #295085;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
export const AboutUsLayoutWrapper = styled.div`
  position: relative;
  overflow: hidden;
  .cloud-image-wrapper{
    max-width: 723px;
    height: 280px;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: -480px;
    top: 200px;
    &.right-side-cloud-img{
      right: -330px;
      top: -200px;
      left: auto;
    }
  }
  p{
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 30px;
    text-align: center;
    color: #29508699;
    max-width: 1000px;
    margin: auto;
    margin-bottom: 18px;
  }
  .about-banner-wrapper{
    padding: 50px 0;
    background: ${theme.color.white};
  }
  .story-section-wrapper{
    background: #FFFDEF;
    .grid-row{
      display: flex;
      flex-wrap: wrap;
      ${mediaQueries("sm")`
        flex-direction: column;
      `}
      .grid-col{
        flex: 0 0 55%;
        ${mediaQueries("sm")`
          flex: 0 0 100%;
        `}
        &.logo-block{
          flex: 0 0 45%;
          background-color: #295086;
          ${mediaQueries("sm")`
            flex: 0 0 100%;
          `}
        }
      }
    }
    .our-story-block{
      padding: 40px 15px;
      max-width: 650px;
      width: 100%;
      margin: auto;
    }
    h2{
      text-align: start;
    }
    p{
      text-align: start;
      max-width: 100%;
      ${mediaQueries("sm")`
         text-align: center;
      `}

    }
    .sitback-logo-wrapper{
      padding: 25px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .sitback-logo{
        max-width: 400px;
        ${mediaQueries("sm")`
          max-width: 200px;
        `}
      }
    }
  }
`;

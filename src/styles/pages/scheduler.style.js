"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";
export const SchedulerModalLayoutWrapper = styled.div`
    .checkbox-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        .checkbox-wrapper-div{
            padding: 0 5px;
            flex: 0 0 50%;
            input[type=checkbox] {
                display: none;
            }
            label{
                display: inline-flex;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            input[type=checkbox] + label{
                border: solid 1px ${theme.color.secondary};
                border-radius:  8px;
                color: ${theme.color.secondary};
                padding: 14px 10px;
                background-color: #FFFFFF;
                cursor: pointer;
                user-select: none;
            }
            input[type=checkbox]:checked + label{
                border: solid 1px ${theme.color.secondary};
                color: ${theme.color.white};
                background-color: #FFFFFF;
                span{
                    &:after{
                        opacity: 1;
                    }
                }
            }
        }
        &.available-times{
            margin: -8px;
            .checkbox-wrapper-div{
                flex: 0 0 72px;
                margin: 0;
                padding: 8px;
                input[type=checkbox] {
                    display: none;
                }

                label{
                    justify-content: center;
                }
                input[type=checkbox] + label{
                    border-color: #dadada;
                    background-color: #FFFFFF;
                    color: #707070;
                    padding: 14px;
                    border-radius: 1000px;
                    font-size: 14px;
                    width: 60px;
                    height: 60px;
                    cursor: pointer;
                    ${mediaQueries("md")`
                        width: 54px;
                        height: 54px;
                        font-size: 12px;
                    `}
                    ${mediaQueries("sm")`
                        width: 48px;
                        height: 48px;
                    `}
                }
                input[type=checkbox]:checked + label{
                    border-color: ${theme.color.primary};
                    background-color: ${theme.color.primary};
                    color: ${theme.color.white};
                    padding: 14px;
                    border-radius: 1000px;
                    font-size: 14px;
                    width: 60px;
                    height: 60px;
                    ${mediaQueries("md")`
                        width: 54px;
                        height: 54px;
                        font-size: 12px;
                    `}
                    ${mediaQueries("sm")`
                        width: 48px;
                        height: 48px;
                    `}
                }
            }
        }
        &.provider-appointment-section{
            margin: -8px;
            position: relative;
            min-height: 20px;
            /* min-height: 100px; */
            ${mediaQueries("sm")`
                justify-content: center;
            `}
            .checkbox-wrapper-div{
                padding: 8px;
                flex: 0 0 33.33%;
                input[type=radio] {
                    display: none;
                }
                label{
                    display: inline-flex;
                    align-items: center;
                    width: 100%;
                    position: relative;
                    p{
                        color: ${theme.color.secondary};
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        letter-spacing: 1px;
                    }
                    h6{
                        word-break: break-word;
                    }
                    span{
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
                        &:after{
                            position: absolute;
                            content: '';
                            background: url('/images/check-mark-icon.svg') no-repeat;
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
                    .user-img-wrapper{
                        width: 127px;
                        height: 127px;
                        margin: auto;
                        overflow: hidden;
                        border-radius: 10000px;
                        background: #e4e4e4;
                        margin-bottom: 6px;
                        ${mediaQueries("xl")`
                            width: 115px;
                            height: 115px;
                        `}
                        ${mediaQueries("lg")`
                            width: 90px;
                            height: 90px;
                        `}
                        ${mediaQueries("md")`
                            width: 70px;
                            height: 70px;
                        `}
                        ${mediaQueries("sm")`
                            width: 60px;
                            height: 60px;
                        `}
                        ${mediaQueries("xs")`
                            width: 50px;
                            height: 50px;
                        `}
                    }
                    p{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        i{
                            display: flex;
                            align-items: center;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            svg{
                              display: block;
                              width: 100%;
                              height: 100%;
                            }
                        }
                    }
                }
                input[type=radio] + label{
                    border: solid 1px ${theme.color.secondary};
                    border-radius:  8px;
                    color: ${theme.color.secondary};
                    padding: 10px;
                    background-color: #EEEEEE;
                    cursor: pointer;
                    user-select: none;
                }
                input[type=radio]:checked + label{
                    border: solid 1px ${theme.color.secondary};
                    color: ${theme.color.secondary};
                    background-color: #EEEEEE;
                    span{
                        &:after{
                            opacity: 1;
                        }
                    }
                }
                input[type=radio] + label{
                    border-color: ${theme.color.white};
                    background: ${theme.color.white};
                }
                input[type=radio]:checked + label{
                    border: solid 1px ${theme.color.secondary};
                    color: ${theme.color.secondary};
                    background-color: #EEEEEE;
                    span{
                        opacity: 1;
                        &:after{
                            opacity: 1;
                        }
                    }
                }
                .rating-text{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 5px;
                    p{
                        margin-bottom: 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        h5{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                        }
                    }
                    .star-icon{
                        display: flex;
                        align-items: center;
                        position: unset;
                        i{
                            width: 15px;
                            height: 15px;
                            display: flex;
                            width: 15px;
                            height: 15px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 0;
                            margin-top: -2px;
                            svg {
                              width: 100%;
                              height: 100%;
                              display: block;
                            }
                        }
                    }
                }
            }
            .loader-wrapper {
              background: #fbfbfbd4;

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
            &.checkbox-color-change{
               .checkbox-wrapper-div{
                    label{
                        span{
                            border: 1px solid ${theme.color.white};
                            background: ${theme.color.white};
                            &:after{
                                position: absolute;
                                content: '';
                                background: url('/images/check-mark-icon-white.svg') no-repeat;
                                background-position: center;
                                background-size: contain;
                            }
                        }
                        > div {
                            text-align: center;
                            width: 100%;
                        }
                        p{
                            width: calc(100% - 20px);
                            margin: 0 0 0 auto;
                            text-align: center;
                            margin-left: 20px;
                            font-weight: 500;
                            ${mediaQueries("xs")`
                                margin-left: 15px;
                            `}
                            &.timetext{
                                color: #29508699;
                                margin-top: 5px;
                                font-weight: 400;
                                ${mediaQueries("sm")`
                                    font-size: 12px;
                                `}
                            }
                            ${mediaQueries("sm")`
                                font-size: 12px;
                            `}
                        }
                    }
                    input[type=radio] + label{
                        border-color: #EAEBEC;
                        background: transparent;
                        p{
                            color: #295086;
                            &.timetext{
                                opacity: 0.6;
                            }
                        }
                    }
                    input[type=radio]:checked + label{
                        border-color: #EAEBEC;
                        background-color: #95CCD5;
                        p{
                            color: white;
                        }
                    }

                }
            }
        }
        &.available-appointments-section{
            position: relative;
            margin: -8px;
            min-height: 20px;
            /* min-height: 100px; */
            ${mediaQueries("sm")`
                margin: -4px;
            `}
            .checkbox-wrapper-div{
                padding: 8px;
                flex: 0 0 33.33%;
                ${mediaQueries("sm")`
                    padding: 4px;
                `}
                input[type=radio] {
                    display: none;
                }
                label{
                    display: inline-flex;
                    align-items: center;
                    width: 100%;
                    position: relative;
                    span{
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
                        ${mediaQueries("xs")`
                            width: 15px;
                            height: 15px;
                        `}
                        &:after{
                            position: absolute;
                            content: '';
                            background: url('/images/check-mark-icon.svg') no-repeat;
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
                    p{
                        width: calc(100% - 20px);
                        margin: 0 0 0 auto;
                        text-align: center;
                        margin-left: 20px;
                        font-weight: 500;
                        ${mediaQueries("xs")`
                            margin-left: 15px;
                        `}
                        &.timetext{
                            color: #29508699;
                            margin-top: 5px;
                            font-weight: 400;
                            ${mediaQueries("sm")`
                                font-size: 12px;
                            `}
                        }
                        ${mediaQueries("sm")`
                            font-size: 12px;
                        `}
                    }
                }
                input[type=radio] + label{
                    border: solid 1px ${theme.color.secondary};
                    border-radius:  8px;
                    color: ${theme.color.secondary};
                    padding: 14px 10px;
                    background-color: #EEEEEE;
                    cursor: pointer;
                    user-select: none;
                    ${mediaQueries("sm")`
                        padding: 9px;
                    `}
                }
                input[type=radio]:checked + label{
                    border: solid 1px ${theme.color.secondary};
                    color: ${theme.color.secondary};
                    background-color: #EEEEEE;
                    span{
                        &:after{
                            opacity: 1;
                        }
                    }
                }
                input[type=radio] + label{
                    border-color: #BAD9D5;
                    background: #BAD9D5;
                }
                input[type=radio]:checked + label{
                    border: solid 1px ${theme.color.secondary};
                    color: ${theme.color.secondary};
                    background-color: #EEEEEE;
                    span{
                        opacity: 1;
                        &:after{
                            opacity: 1;
                        }
                    }
                }
            }
            &.checkbox-color-change{
               .checkbox-wrapper-div{
                    label{
                        span{
                            border: 1px solid ${theme.color.white};
                            background: ${theme.color.white};
                            &:after{
                                position: absolute;
                                content: '';
                                background: url('/images/check-mark-icon-white.svg') no-repeat;
                                background-position: center;
                                background-size: contain;
                            }
                        }
                        > div {
                            text-align: center;
                            width: 100%;
                        }
                        p{
                            width: calc(100% - 20px);
                            margin: 0 0 0 auto;
                            text-align: center;
                            margin-left: 20px;
                            font-weight: 500;
                            ${mediaQueries("xs")`
                                margin-left: 15px;
                            `}
                            &.timetext{
                                color: #29508699;
                                margin-top: 5px;
                                font-weight: 400;
                                ${mediaQueries("sm")`
                                    font-size: 12px;
                                `}
                            }
                            ${mediaQueries("sm")`
                                font-size: 12px;
                            `}
                        }
                    }
                    input[type=radio] + label{
                        border-color: #EAEBEC;
                        background: transparent;
                        p{
                            color: #295086;
                            &.timetext{
                                opacity: 0.6;
                            }
                        }
                    }
                    input[type=radio]:checked + label{
                        border-color: #EAEBEC;
                        background-color: #95CCD5;
                        p{
                            color: white;
                        }
                    }

                }
            }
            .loader-wrapper {
              background: #fbfbfbd4;
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
    .block-content {
      height: 200px;
      text-align: center;
      padding-top: 5rem;
      p {
        color: #295086;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
    .marging-bottom-wrapper{
        margin-bottom: 21px;
      &.date-picker-relative {
        position: relative;
      }
      &.library-datepicker-input-wrapper{
        .mbsc-form-control-wrapper{
            background: transparent;
            border: none;
            &::before, &::after{
                content: unset;
            }
            span {
              opacity: 1 !important;
            }
            .mbsc-textfield-inner{
                input{
                    border-radius: 100px;
                    border: 1px solid ${theme.color.border};
                    background: ${theme.color.white};
                    color: ${theme.color.secondary};
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    padding: 18px 30px;
                    width: 100%;
                    outline: none;
                    box-shadow: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
                    height: unset !important;
                    min-height: 62px;
                    ${mediaQueries("xl")`
                        padding: 16px 30px;
                        font-size: 15px;
                        min-height: 56px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 14px 30px;
                        font-size: 14px;
                        min-height: 50px;
                    `}
                    &:-webkit-autofill,
                    &:-webkit-autofill:hover,
                    &:-webkit-autofill:focus,
                    &:-webkit-autofill:active{
                        -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
                        -webkit-text-fill-color: ${theme.color.secondary};
                    }
                    &::-ms-input-placeholder {
                        color: ${theme.color.secondary};
                        font-weight: 300;
                        opacity: 1;
                    }
                    &::placeholder {
                        color: ${theme.color.secondary};
                        font-weight: 300;
                        opacity: 1;
                    }
                    &:focus{
                        color: ${theme.color.secondary};
                        background-color: ${theme.color.white};
                        border-color: ${theme.color.border};
                        outline: 0;
                        box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
                    }
                    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    }
                }
            }
        }
      }
    }
    .sitback-select2-container{
        .sitback-select-option__control {
            background: #FFFFFF;
        }
    }
    input{
        background: #FFFFFF;
        box-shadow: none !important;
    }
    .card_number_input{
        border-radius: 100px !important;
        color: ${theme.color.secondary} !important;
        font-size: 16px !important;
        font-style: normal !important;
        font-weight: 500 !important;
        line-height: normal !important;
        *{
            color: ${theme.color.secondary} !important;
            font-size: 16px !important;
            font-style: normal !important;
            font-weight: 500 !important;
            line-height: normal !important;
        }
    }
    .ElementsApp input{
        color: ${theme.color.secondary} !important;
        font-size: 16px !important;
        font-style: normal !important;
        font-weight: 500 !important;
        line-height: normal !important;
    }
    .StripeElement{
        border-radius: 100px;
        border: 1px solid ${theme.color.border};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 21px 30px;
        width: 100%;
        outline: none;
        box-shadow: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
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
        &:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
            -webkit-text-fill-color: ${theme.color.secondary};
        }
        *{
            color: ${theme.color.secondary} !important;
            font-size: 16px !important;
            font-style: normal !important;
            font-weight: 500 !important;
            line-height: normal !important;
        }
    }
    form{
        width: calc(100% - 30px);
        margin: auto;
        ${mediaQueries("md")`
            width: 100%;
        `}
        .sitback-select2-container{
            .sitback-select-option__control {
                background: #FFFFFF;
            }
        }
        .yourself-guest-detail{
            margin-bottom: 25px;
            h6{
                display: block;
                color: ${theme.color.secondary};
                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                margin-bottom: 8px;
            }
            label{
                span{
                    opacity: 0.5;
                }
            }
        }
        .bookings-detail-wrapper{
            text-align: center;
            margin-bottom: 21px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            label{
                margin-bottom: 5px;
            }
            p{
                color: #295086;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }
    }
    &.congrats-block-wrapper{
        max-width: 90%;
        margin: auto;
        margin-bottom: 30px;
        .user-img-wrapper{
            width: 220px;
            height: 220px;
            border-radius: 1000px;
            background: ${theme.color.primary};
            overflow: hidden;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 18px;
            img{
                width: 170px;
                height: 170px;
            }
        }
        h4{
            font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
            font-size: 21px;
            font-weight: 600;
            line-height: 38px;
            letter-spacing: -0.01em;
            text-align: center;
            color: ${theme.color.secondary};
            margin-bottom: 15px;
        }
        p{
            font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
            font-size: 16px;
            font-weight: 300;
            line-height: 22px;
            letter-spacing: -0.01em;
            text-align: center;
            color: ${theme.color.secondary};
        }
        button{
            width: auto;
            margin: auto;
        }
    }
    .loading-btn-wrapper{
        margin-bottom: 21px;
    }
    .phone-number-input-wrapper{
        input{
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-size: 14px;
        letter-spacing: .01rem;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding: 15px;
        padding-left: 65px;
        margin-left: 0;
        border-radius: 100px;
        border: none;
        background: ${theme.color.lightwhite};
        color: ${theme.color.secondary};
        line-height: normal;
        height: auto;
        width: 100%;
        outline: none;
        min-height: 63px;
        box-shadow: none;
        outline: none;
        border: 1px solid #DADADA;
        &:focus{
            box-shadow: none;
        }
        ${mediaQueries("xl")`
            font-size: 15px;
            min-height: 57px;
        `}
        ${mediaQueries("lg")`
            font-size: 14px;
            min-height: 51px;
        `}
        ${mediaQueries("xs")`
            font-size: 16px;
        `}
        }
       .flag-dropdown {
            background: transparent;
            border: none;
            border-radius: 100px;
            display:flex;
            align-items:center;
            p {
               font-style: normal;
              font-weight: 500;
              line-height: normal;
              font-size: 15px;
              letter-spacing: .01rem;
              color: ${theme.color.secondary};
              ${mediaQueries("xl")`
                  font-size: 15px;

              `}
              ${mediaQueries("lg")`
                  font-size: 14px;

              `}
              ${mediaQueries("xs")`
                  font-size: 16px;
              `}
            }
            .selected-flag{
              background: transparent;
              padding-left: 16px;
            }
          }
    }
    &.mobile-width-wrapper{
        max-width: 600px;
        margin: auto;
        width: 100%;
        .footer-btns-wrapper-new-flow{
            max-width: 500px;
            margin: 0 auto 20px;
            width: 100%;
            ${mediaQueries("md")`
                max-width: 450px;
            `}
            ${mediaQueries("sm")`
                max-width: 350px;
            `}
            ${mediaQueries("xs")`
                max-width: 260px;
            `}
        }
    }
    .sit-step-display-div{
      margin: 25px 0 50px;
      ${mediaQueries("sm")`
          margin: 25px 0 35px;
      `}
      &.sit-confirm-step-display-div{
        padding: 0 20px;
        ${mediaQueries("sm")`
          padding: 0;
      `}
      }
      h5{
        font-weight: 700;
        font-size: 20px;
        line-height: 16px;
        text-transform: uppercase;
        color: ${theme.color.secondary};
        text-align: center;
        margin-bottom: 30px;
        ${mediaQueries("lg")`
            font-size: 18px;
        `}
        ${mediaQueries("md")`
            font-size: 16px;
        `}
        ${mediaQueries("sm")`
            font-size: 14px;
        `}
      }
      .step-content-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        .step-note-div{
          max-width: 25%;
          flex-basis: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &:last-child{
            &::after{
              content: unset;
            }
          }
          &.single-first-round-active{
            .step-round-wrapper{
              background: #3FA481;
              .number-text{
                display: none;
              }
              .checkmark-icon{
                display: block;
              }
            }
          }
          &.active{
            .step-round-wrapper{
              background: #3FA481;
              .number-text{
                display: none;
              }
              .checkmark-icon{
                display: block;
              }
            }
            &::after{
              background: #3FA481;
            }
          }
          .step-round-wrapper{
            background: #E6ECF5;
            border-radius: 1000px;
            width: 45px;
            height: 45px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            ${mediaQueries("xl")`
                width: 42px;
                height: 42px;
            `}
            ${mediaQueries("lg")`
                width: 39px;
                height: 39px;
            `}
            ${mediaQueries("md")`
                width: 36px;
                height: 36px;
            `}
            ${mediaQueries("sm")`
                width: 33px;
                height: 33px;
            `}
            .number-text{
              font-weight: 600;
              font-size: 16px;
              line-height: 16px;
              letter-spacing: 1px;
              text-align: center;
              color: #29508659;
              ${mediaQueries("md")`
                  font-size: 14px;
              `}
              ${mediaQueries("sm")`
                  font-size: 12px;
              `}
            }
            .checkmark-icon{
              width: 12px;
              height: auto;
              overflow: hidden;
              display: none;
            }
          }
          &::after{
            position: absolute;
            top: 0;
            right: -60px;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 6px;
            background: #D5E0EE99;
            content: '';
            z-index: 0;
            ${mediaQueries("lg")`
                right: -80px;
            `}
            ${mediaQueries("sm")`
                right: -70px;
            `}
            ${mediaQueries("xs")`
                right: -50px;
            `}
          }
        }
      }
    }
    .appointment-para-text{
      max-width: 450px;
      margin: 30px auto 0;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #295086B2;
      ${mediaQueries("sm")`
          font-size: 14px;
          max-width: 285px;
      `}
    }
`;

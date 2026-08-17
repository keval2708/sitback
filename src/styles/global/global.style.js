"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { mediaQueries } from "../../utils/mediaQuery";

export const GlobalStyle = createGlobalStyle`
    html, body {
        max-width: 100vw ;
        overflow-x: unset;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        line-height: 1.5;
        font-weight: 300;
        font-size: 14px;
        color: ${theme.color.black};
        /* background: ${theme.color.lightyellow}; */
        background: ${theme.color.white};
        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
        overflow: auto !important;
        overscroll-behavior-y: none;
        &.background-white-layout{
           background: ${theme.color.white};
        }
        &.sitback-light-yellow-bg-wrapper{
          background: ${theme.color.lightyellow};
        }
        &::-webkit-scrollbar {
            width: 0px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &.modal-open{
            overflow-y: hidden !important;
            pointer-events: auto;
            overflow-y: hidden !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            main{
                overflow-y: hidden !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
            }
        }
        &.toggleHeaderMenuOpen{
            .home-page-headerwrapper{
                background: #89C5D0;
                ${mediaQueries("sm")`
                  background: #95CCD5;
                `}
            }
        }
        &.sitback-menu-body-class{
          overflow-y: hidden;
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    a,
    ul{
        margin: 0;
        padding: 0;
        line-height: normal;
        list-style-type: none;
        text-decoration: none !important;
    }
    a{
        transition: all 0.3s ease-in-out;
        &:hover{
		    opacity: 0.8;
	    }
    }
    input[type='text'],
    input[type='email'],
    input[type='tel'],
    input[type='number'],
    textarea {
      ${mediaQueries("md")`
        font-size: 16px !important;
      `}
    }
    img{
        max-width: 100%;
    }
    .container{
        padding-right: 15px;
        padding-left: 15px;
        max-width: 1320px;
        ${mediaQueries("xl")`
            max-width: 100%;
        `}
    }
    .service-profider-layout{
      &.sitback-updated-service-provider-wrapper{
        .service-profider{
          background: #FFFFFF;
          .right-top-img-div{
            display: none;
          }
            .isServiceProviderLayout{
              .box-wrapper{
                &.sitback-updated-box-wrapper{
                  .service-nemu-list-box{
                    border-radius: 8px;
                    border: 1px solid #EAEBEC;
                    background: #FBFBFB;
                    &:hover{
                      border-color: #007BFF;
                      background: #DFECF9;
                      box-shadow: 0 18px 25px 0 rgba(0, 0, 0, 0.07);
                    }
                    i{
                      svg{
                        path{
                          fill: #295086;
                        }
                      }
                    }
                    h5{
                      color: #004D87;
                      text-transform: uppercase;
                    }
                  }
                   }
              }
              .faq{
                h5{
                color: #295086;
                font-size: 18px;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 1px;
                text-decoration: underline !important;
                }
              }
            }
        }
      }
        .right-top{
            right: -200px !important;
            top: -210px !important;
            ${mediaQueries("xl")`
                right: -170px !important;
                top: -180px !important;
            `}
            ${mediaQueries("lg")`
                right: -160px !important;
                top: -170px !important;
            `}
            ${mediaQueries("md")`
                right: -130px !important;
                top: -140px !important;
            `}
            ${mediaQueries("sm")`

            `}
        }
        .service-profider{
            padding:80px 0px 40px 0px;
            min-height: calc(100vh - 122px);
            /* ${mediaQueries("xl")`
                min-height: calc(100vh - 114px);
            `}
            ${mediaQueries("lg")`
                min-height: calc(100vh - 104px);
            `}
            ${mediaQueries("md")`
                min-height: calc(100vh - 94px);
            `}
            ${mediaQueries("sm")`
                min-height: calc(100vh - 79px);
            `} */
        }
    }
    .dropdown-menu {
        padding: 0px;
        background: #FBF9ED;
        border: 0.5px solid #29508630;
        border-radius: 4px;
        overflow:hidden;
        .dropdown-item{
          &.disabled {
            background: #f1f1f1 !important;
            cursor: not-allowed !important;
            opacity: 1 !important;
            color: #9b9b9b !important;
          }
          color: #4D6B93;
          text-align:center;
          padding: 9px;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: 1px;
          background: #FFF;
        }
    }
    .sitback-modal-wrapper{
        background: #afafaea6;
        .modal-dialog{
            min-height: 100%;
        }
        &.sitback-add-amenities-modal-wrapper{
          .modal-dialog{
            max-width: 725px;
            .modal-content{
              /* background: #FFFFFF; */
            }
          }
        }
          &.sitback-updated-note-modal-wrapper{
              .modal-dialog{
                .modal-content{
                  border-radius: 35px;
                  border: 0.5px solid #EAEBEC;
                  background: #FFF;
                }
              }
          }
          &.edit-availability-modal-wrapper{
            .modal-dialog{
              .modal-content{
                background: #FFF !important;
                border-radius: 8px !important;
                .modal-header {
                  justify-content: center;
                  position: relative;
                  border-bottom: none;
                  padding: 24px 24px 0;
                  .btn-close,
                  button.close {
                    position: absolute;
                    right: 24px;
                    top: 24px;
                    margin: 0;
                  }
                }
              }
            }
          }
          &.edit-lunch-block-modal {
            .modal-dialog {
              max-width: 650px;
              .modal-content {
                border-radius: 20px;
                background: #FFFFFF !important;
                border: none;
                padding: 24px;

                .modal-header {
                  border-bottom: none;
                  padding: 0 0 24px;
                  position: relative;
                  display: flex;
                  justify-content: center;

                  .modal-title-text {
                    font-size: 20px;
                    font-weight: 700;
                    color: #295086;
                    text-align: center;
                    width: 100%;
                  }

                  .btn-close, button.close {
                    position: absolute;
                    right: 0;
                    top: 0;
                    margin: 0;
                    opacity: 1;
                    background-image: none !important;
                    background: none !important;
                    border: none !important;
                    color: #E95060 !important;
                    font-size: 20px !important;
                    line-height: 1 !important;
                    padding: 0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;

                    &::before {
                      content: "✕" !important;
                      font-weight: bold !important;
                      color: #E95060 !important;
                    }
                  }
                }

                .modal-body {
                  padding: 0;
                }
              }
            }

            .edit-lunch-form {
              display: flex;
              flex-direction: column;
              gap: 16px;

              .repeat-days-chips {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 8px;

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
                  }
                }
              }

              .form-group-item {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;

                label {
                  font-size: 14px;
                  font-weight: 600;
                  color: #4D6B93;
                  margin-bottom: 0;
                }

                .form-control {
                  height: 48px;
                  border-radius: 100px !important;
                  border: 1px solid rgba(218, 218, 218, 0.60) !important;
                  padding: 8px 20px !important;
                  font-size: 15px !important;
                  color: #295086 !important;
                  background-color: #fff !important;
                  width: 100%;
                  box-shadow: none !important;

                  &:focus {
                    border-color: #295086 !important;
                  }
                }
              }

              .form-grid-2 {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                width: 100%;
              }

              .react-datetime-picker {
                position: relative;
                width: 100%;

                .react-datepicker-wrapper {
                  width: 100%;
                }

                .react-datepicker__input-container {
                  width: 100%;
                  display: block;
                }

                .form-control {
                  padding-right: 45px !important;
                }

                .calendar-icon-indicator {
                  position: absolute;
                  right: 20px;
                  top: 50%;
                  transform: translateY(-50%);
                  pointer-events: none;
                  color: #4D6B93;
                  display: flex;
                  align-items: center;

                  svg {
                    width: 18px;
                    height: 18px;
                    color: #4D6B93;
                  }
                }
              }

              .rdt {
                width: 100%;
                position: relative;
              }

              .cancel-modal-btn {
                border-radius: 100px !important;
                border: 1.5px solid #295086 !important;
                color: #295086 !important;
                background: transparent !important;
                min-width: 120px;
                height: 48px;
                font-weight: 600 !important;
                font-size: 15px !important;

                &:hover {
                  background: rgba(41, 80, 134, 0.05) !important;
                }
              }

              .submit-modal-btn {
                border-radius: 100px !important;
                background: #295086 !important;
                border: none !important;
                color: #ffffff !important;
                min-width: 140px;
                height: 48px;
                font-weight: 600 !important;
                font-size: 15px !important;

                &:hover {
                  background: #1c3c66 !important;
                }
              }
            }
          }
        &.sitback-updated-profile-service-modal{
          &.white-bg-modal {
            .modal-dialog {
              .modal-content {
                background: #ffffff !important;
              }
            }
          }
          &.sitback-add-therapist-modal-wrapper{
            .modal-dialog{
              max-width: 800px;
              .modal-content{
                border-radius: 16px;
                background: #fff;
              }
              .modal-body{
                input,
                select{
                  border-radius: 100px !important;
                }
              }
            }
          }
          .modal-dialog{
            .modal-content{
              border-radius: 35px;
              background: #FFF;
             .modal-body{
              .sitback-select2-container{
                .sitback-select-option__control{
                  border-radius: 100px;
                  border: 1px solid rgba(218, 218, 218, 0.60);
                  background: #FFF;
                }
                 &.sitback-select-option--is-disabled{
                  cursor: not-allowed;
                  .sitback-select-option__control{
                    background-color: #F8F8FB !important;
                    /* border-color: #f6f6f6; */
                    cursor: not-allowed;
                    .sitback-select-option__single-value{

                      cursor: not-allowed;
                    }
                  }
                }
              }
              input{
                border-radius: 100px;
                border: 1px solid rgba(218, 218, 218, 0.60);
                background-color: #FFF;
                &.amenities-input {
                  border-radius: 0;
                }
              }
              .upload-gallery-img-section{
                &.sitback-updated-profile-service-modal-add-img-section{
                  .upload-gallery{

                  }
                }
              }
                .checkbox-wrapperv5{
                  input{
                    &:checked{
                      background-color: #295086 !important;
                      border-color: transparent !important;
                    }
                  }
                }
              .card_number_input{
                border-radius: 100px !important;
                border: 1px solid rgba(218, 218, 218, 0.60) !important;
                background: #FFF !important;
              }
              select{
                border-radius: 100px;
                border: 1px solid rgba(218, 218, 218, 0.60);
                background: #FFF;
              }
              textarea{
                border: 1px solid rgba(218, 218, 218, 0.60);
                background: #FFF;
              }
              .front-and-back-image-wrapper{
                .upload-file-input-wrapper{
                  .upload-file-input{
                    border-radius: 8px;
                    border: 1px solid #EAEBEC;
                    background: #FBFBFB;
                    input{

                    }
                  }
                }
              }
              .sitback-add-card-btn{
                background: #004D87;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                text-transform: capitalize !important;
              }
             }
             .modal-footer-div{
              button{
                background: #004D87;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                text-transform: capitalize !important;
                &.sitback-updated-cancel-btn-wrapper{
                  color: #004D87;
                  border: 1px solid #CFCFCF;
                  background: #F2F6F9;
                }
              }
             }
              .sitback-updated-download-btn-wrapper{
                background: #004D87;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                text-transform: capitalize !important;
              }
              .sitback-updated-pay-now-btn-wrapper{
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                border-radius: 100px;
                background: #004D87;
              }
              form{
                .card-info-detail-wrapper{
                  .row-wrapper{
                    .total-amount{
                      h3{
                        color: #004D87;
                        text-align: center;
                        font-size: 32px;
                        font-weight: 700;
                        line-height: 45px;
                        letter-spacing: -0.32px;
                        ${mediaQueries("xxl")`
                          font-size: 30px;
                          line-height: 40px;
                        `}
                        ${mediaQueries("xl")`
                          font-size: 28px;
                          line-height: 38px;
                        `}
                        ${mediaQueries("lg")`
                          font-size: 26px;
                          line-height: 36px;
                        `}
                        ${mediaQueries("md")`
                          font-size: 24px;
                          line-height: 34px;
                        `}
                        ${mediaQueries("sm")`
                          font-size: 22px;
                          line-height: 32px;
                        `}
                      }
                        p{
                          color: #004D87;
                          text-align: center;
                          font-size: 32px;
                          font-weight: 500;
                          line-height: 45px;
                          letter-spacing: -0.32px;
                          opacity: 1;
                          ${mediaQueries("xxl")`
                            font-size: 30px;
                            line-height: 40px;
                          `}
                          ${mediaQueries("xl")`
                            font-size: 28px;
                            line-height: 38px;
                          `}
                          ${mediaQueries("lg")`
                            font-size: 26px;
                            line-height: 36px;
                          `}
                          ${mediaQueries("md")`
                            font-size: 24px;
                            line-height: 34px;
                          `}
                          ${mediaQueries("sm")`
                            font-size: 22px;
                            line-height: 32px;
                          `}
                        }
                    }
                  }
                }
              }
            }
          }
          .set-all-days-modal-form{
            padding: 20px;
            .modal-title-text{
                color: #004D87;
                text-align: center;
                font-size: 32px;
                font-weight: 700;
                line-height: 45px;
                letter-spacing: -0.32px;
                ${mediaQueries("xxl")`
                    font-size: 30px;
                    line-height: 40px;
                `}
                ${mediaQueries("xl")`
                    font-size: 28px;
                    line-height: 38px;
                `}
                ${mediaQueries("lg")`
                    font-size: 26px;
                    line-height: 36px;
                `}
                ${mediaQueries("md")`
                    font-size: 24px;
                    line-height: 34px;
                `}
                ${mediaQueries("sm")`
                    font-size: 22px;
                    line-height: 32px;
                `}
            }
            form{
                max-width: 600px;
                width: 100%;
                margin: 21px auto;
                margin-bottom: 0;
                .set-all-days-modal-body{
                    margin-bottom: 20px;
                    text-align: center;
                    p{
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 18px;
                        text-align: center;
                        color: #295086;
                        margin-bottom: 6px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 18px;
                        text-align: center;
                        color: #295086;
                    }
                }
                .set-all-days-modal-row{
                    .form-control{
                        border-radius: 100px;
                        border: 1px solid ${theme.color.border};
                        background: ${theme.color.white};
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
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60);
                        background-color: #FFF;
                        box-shadow: none;
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
                .modal-footer-div{
                    display: flex;
                    justify-content: center;
                    gap: 29px;
                    button{
                        border-color: #004D87;
                    }
                }
            }
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
        }
        &.sitback-updated-payment-modal-wrapper{
          &.sitback-new-appointment-modal-wrapper{
              .modal-dialog{
                .modal-content{
                  background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
                  .modal-body{
                    .new-appointment-details{
                      .checkbox-wrapperv5{
                        input{
                          appearance: none;
                          border-radius: 2px;
                        }
                      }
                    }
                  }
                }
              }
          }
          .modal-dialog{
            .modal-content{
              border-radius: 35px;
              border: 0.5px solid #EAEBEC;
              background: #FFF;
              .modal-body{
                padding: 0;
                .sitback-option-modal-wrapper{
                  max-width: 100%;
                  padding: 0;
                  form{
                    .sitback-history-table-wrapper{
                      .header-bar-wrapper{
                        padding: 12px 45px;
                        ${mediaQueries("xl")`
                          padding: 12px 35px;
                        `}
                        ${mediaQueries("lg")`
                          padding: 12px 25px;
                        `}
                        ${mediaQueries("md")`
                          padding: 12px 15px;
                        `}
                        ${mediaQueries("sm")`
                          padding: 12px;
                        `}
                      }
                       .sitback-payment-history-tip{
                        padding: 0 45px;
                        ${mediaQueries("xl")`
                          padding: 0 35px;
                        `}
                        ${mediaQueries("lg")`
                          padding: 0 25px;
                        `}
                        ${mediaQueries("md")`
                          padding: 0 15px;
                        `}
                        ${mediaQueries("sm")`
                          padding: 0 12px;
                        `}
                      }
                        .addcard-footer-wrapper{
                          padding: 0 45px;
                          ${mediaQueries("xl")`
                            padding: 0 35px;
                          `}
                          ${mediaQueries("lg")`
                            padding: 0 25px;
                          `}
                          ${mediaQueries("md")`
                            padding: 0 15px;
                          `}
                          ${mediaQueries("sm")`
                            padding: 0 12px;
                          `}
                          .card-payment-updated-wrapper{
                            background: #004D87;
                            color: #FFF;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: normal;
                            min-height: 60px;
                          }
                          .cash-payment-updated-wrapper{
                            border: 1px solid #CFCFCF;
                            background: #FFF;
                            color: #004D87;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: normal;
                            min-height: 60px;
                          }
                        }
                        .payment-card-selection-wrapper{
                          margin: 12px auto 10px;
                          padding: 0;
                          width: 88%;

                          .payment-card-selection-header{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 10px;
                            margin-bottom: 8px;

                            h6{
                              margin: 0;
                              color: #295086;
                              font-size: 14px;
                              font-weight: 600;
                              line-height: 1.2;
                            }

                            .add-new-card-btn{
                              background: none;
                              border: none;
                              color: #295086;
                              font-weight: 600;
                              font-size: 12px;
                              line-height: 1.2;
                              text-decoration: underline;
                              cursor: pointer;
                              padding: 0;
                              white-space: nowrap;

                              &:hover{
                                color: #1e3a5f;
                              }
                            }
                          }

                          .payment-card-list{
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            max-height: 140px;
                            overflow-y: auto;
                            padding-right: 4px;
                            scrollbar-width: thin;
                            scrollbar-color: #b7c9e2 transparent;

                            &::-webkit-scrollbar {
                              width: 2px !important;
                            }
                            &::-webkit-scrollbar-track {
                              background: transparent;
                              border-radius: 2px;
                            }
                            &::-webkit-scrollbar-thumb {
                              background: #b7c9e2;
                              border-radius: 2px;
                            }
                          }

                          .payment-card-option{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 8px;
                            min-height: 38px;
                            padding: 6px 12px;
                            border: 1px solid #d9e2ef;
                            border-radius: 8px;
                            background: #ffffff;
                            cursor: pointer;
                            transition: border-color 0.2s ease, background 0.2s ease;

                            &:hover{
                              border-color: #b7c9e2;
                              background: #fafcff;
                            }

                            &.is-selected{
                              border-color: #295086;
                              background: #f5f9ff;
                            }

                            .payment-card-option-main{
                              display: flex;
                              align-items: center;
                              gap: 10px;
                              min-width: 0;
                              flex: 1;
                              margin: 0;
                              cursor: pointer;

                              input[type="radio"]{
                                appearance: none;
                                -webkit-appearance: none;
                                width: 16px;
                                height: 16px;
                                margin: 0;
                                padding: 0;
                                flex-shrink: 0;
                                border: 1.5px solid #c5d0e0;
                                border-radius: 50%;
                                background: #fff;
                                cursor: pointer;
                                display: grid;
                                place-content: center;
                                box-sizing: border-box;

                                &:checked{
                                  border-color: #295086;

                                  &::after{
                                    content: "";
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    background: #295086;
                                  }
                                }
                              }

                              .payment-card-meta{
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 6px 10px;
                                min-width: 0;

                                .payment-card-brand{
                                  color: #295086;
                                  font-size: 13px;
                                  font-weight: 600;
                                  line-height: 1.2;
                                  text-transform: capitalize;
                                }

                                .payment-card-number{
                                  color: #8fa0b8;
                                  font-size: 12px;
                                  font-weight: 400;
                                  line-height: 1.2;
                                  letter-spacing: 0.2px;
                                }
                              }
                            }

                            .payment-card-default-badge{
                              flex-shrink: 0;
                              font-size: 10px;
                              font-weight: 600;
                              color: #295086;
                              background: #e8f1ff;
                              padding: 2px 8px;
                              border-radius: 999px;
                              white-space: nowrap;
                              line-height: 1.3;
                            }
                          }

                          .payment-card-loading,
                          .payment-card-empty{
                            margin: 0;
                            padding: 10px 12px;
                            border-radius: 8px;
                            font-size: 12px;
                            line-height: 1.4;
                            text-align: center;
                          }

                          .payment-card-loading{
                            color: #718096;
                            background: #f8fafc;
                            border: 1px solid #e8eef6;
                          }

                          .payment-card-empty{
                            color: #c53030;
                            font-weight: 500;
                            background: #fff5f5;
                            border: 1px solid #fed7d7;
                          }

                          .payment-card-error{
                            margin: 6px 0 0;
                            color: #e53e3e;
                            font-size: 12px;
                            text-align: left;
                          }
                        }
                        .sitback-payment-history-tip{
                          border-radius: 0 0 20px 35px;
                          background: #DFECF9;
                          padding: 20px;
                          .sitback-tip{
                            .total-text{
                              color: #295086;
                              font-size: 18px;
                              font-weight: 600;
                            }
                            .total-amout-text{
                              color: #295086;
                              text-align: right;
                              font-size: 18px;
                              font-weight: 600;
                              line-height: normal;
                            }
                          }
                        }
                    }
                  }
                  .accordion{
                    .accordion-item{
                      .accordion-header{
                        .accordion-button{
                          padding: 12px 45px;
                          ${mediaQueries("xl")`
                            padding: 12px 35px;
                          `}
                          ${mediaQueries("lg")`
                            padding: 12px 25px;
                          `}
                          ${mediaQueries("md")`
                            padding: 12px 15px;
                          `}
                          ${mediaQueries("sm")`
                            padding: 12px;
                          `}
                        }
                      }
                      .accordion-body{
                        .service-products-table-wrapper{
                          h6{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 8px;

                            p{
                              margin: 0 !important;
                              margin-top: 0 !important;
                              margin-bottom: 0 !important;
                              margin-left: 0 !important;
                              line-height: 1.2;
                              white-space: nowrap;
                            }

                            &.price-delete-cell{
                              flex-direction: row;
                              align-items: center;
                              justify-content: space-between;

                              .product-price-text{
                                margin: 0 !important;
                                margin-top: 0 !important;
                                margin-bottom: 0 !important;
                                margin-left: 0 !important;
                              }
                            }

                            .action-icons{
                              display: flex;
                              align-items: center;
                              flex-shrink: 0;

                              .sitback-icon{
                                cursor: pointer;
                                svg{
                                  path{
                                    fill: #E53935;
                                  }
                                }
                              }
                            }
                          }

                          .quantity{
                            .quantity__minus,
                            .quantity__plus{
                              cursor: pointer;

                              span{
                                cursor: pointer;
                              }
                            }
                          }
                        }
                        .add-trip-modal-input-wrapper{
                          padding: 0 45px;
                          ${mediaQueries("xl")`
                            padding: 0 35px;
                          `}
                          ${mediaQueries("lg")`
                            padding: 0 25px;
                          `}
                          ${mediaQueries("md")`
                            padding: 0 15px;
                          `}
                          ${mediaQueries("sm")`
                            padding: 0 12px;
                          `}
                          .sitback-select2-container{
                            .sitback-select-option__control{
                              border-radius: 100px;
                              border: 1px solid rgba(218, 218, 218, 0.60);
                              background: #FFF;
                            }
                          }
                          .sitback-tip-payment-amount{
                            input{
                              border-radius: 100px;
                              border: 1px solid rgba(218, 218, 218, 0.60);
                              background: #FFF;
                            }
                          }
                            .cash-payment-btn{
                              border-radius: 100px;
                              background: #004D87;
                              color: #FFF;
                              text-align: center;
                              font-size: 14px;
                              font-weight: 500;
                              line-height: normal;
                            }
                        }
                        .checkbox-wrapper-div{
                            padding: 0 45px;
                            ${mediaQueries("xl")`
                              padding: 0 35px;
                            `}
                            ${mediaQueries("lg")`
                              padding: 0 25px;
                            `}
                            ${mediaQueries("md")`
                              padding: 0 15px;
                            `}
                            ${mediaQueries("sm")`
                              padding: 0 12px;
                            `}
                          .checkbox-wrapper-div{
                            padding: 0 !important;
                            input{
                              border: 1px solid rgba(218, 218, 218, 0.60);
                              background: #FFF;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                .new-appointment-details{
                  form{
                    .sitback-select2-container{
                     .sitback-select-option__control{
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60);
                        background: #FFF;
                     }
                    }
                    input{
                      border-radius: 100px;
                      border: 1px solid rgba(218, 218, 218, 0.60);
                      background: #FFF;
                    }
                    textarea{
                      border: 1px solid rgba(218, 218, 218, 0.60);
                      background: #FFF;
                    }
                    .box-wrapper-div{
                      .checkbox-list-wrapper{
                        .checkbox-wrapper-div{
                          input[type="radio"]:checked+label{
                            border-radius: 8px;
                            border: 1px solid #007BFF;
                            background: #DFECF9;
                          }
                          label{
                            span{
                              // background: #24A813;
                              width: unset;
                              height: unset;
                              border: none;
                              left: 18px;
                              top: 18px;
                              &::after{
                                width: 17px;
                                height: 17px;
                                background: url("images/green-provider-icon.svg") no-repeat;
                              }
                            }
                          }
                          &.available-appointment-modal-wrapper{
                            label{
                              border-radius: 8px;
                              border: 1px solid #EAEBEC;
                              background: #FBFBFB;
                              color: #295086;
                              font-size: 14px;
                              font-weight: 500;
                              line-height: normal;
                              span{
                                top: 3px;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                  .checkbox-wrapperv5{
                    input:checked{
                      background: #004D87;
                    }
                  }
                .modal-footer-div{
                  button{
                    background: #004D87;
                    color: #FFF;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;
                  }
                }
                  .checkbox-wrapper-div{
                    input:checked{
                      background-color: #004D87 !important;
                      border-color: transparent !important;
                    }
                  }
              }
            }
          }
        }
        &.more-info-modal-wrapper{
          .modal-dialog{
            .modal-content{
              background: #FFF;
              .modal-body{
                .modal-title-text{
                  color: #004D87;
                  text-align: center;
                  font-size: 34px;
                  font-weight: 800;
                  line-height: 45px;
                  margin-bottom: 30px;
                  letter-spacing: -0.34px;
                  ${mediaQueries("xl")`
                      font-size: 32px;
                      line-height: 42px;
                  `}
                  ${mediaQueries("lg")`
                      font-size: 28px;
                      line-height: 40px;
                  `}
                  ${mediaQueries("md")`
                      font-size: 24px;
                      line-height: 36px;
                  `}
                  ${mediaQueries("sm")`
                      font-size: 22px;
                      line-height: 30px;
                  `}
                }
                .form-layout-box{
                  form{
                    max-height: 100%;
                    label{
                      color: #295086;
                      font-size: 16px;
                      font-weight: 600;
                      line-height: 100%;
                      margin-bottom: 12px;
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                      `}
                    }
                    .for-business-form-group{
                      margin-bottom: 25px;
                      input{
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60);
                        background: #FFF;
                        padding: 15px 25px;
                        min-height: 60px;
                        ${mediaQueries("md")`
                         min-height: 55px;
                        `}
                        ${mediaQueries("sm")`
                          min-height: 50px;
                        `}
                        &::placeholder{
                          color: rgba(41, 80, 134, 0.90);
                          font-size: 14px;
                          font-weight: 400;
                          line-height: 22px;
                        }
                      }
                    }
                    .error{
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 100%;
                      letter-spacing: 0px;
                      color: #E95060;
                      margin-top: 5px;
                    }
                    .footerbox{
                      justify-content: center;
                      display: flex;
                      align-items: center;
                      button{
                        max-width: 445px;
                        color: #FFF;
                        text-align: center;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        margin-top: 25px;
                        border-radius: 100px;
                        background: #004D87;
                        text-transform: capitalize;
                        ${mediaQueries("xl")`
                            font-size: 17px;
                        `}
                        ${mediaQueries("lg")`
                            font-size: 16px;
                        `}
                        ${mediaQueries("md")`
                            font-size: 15px;
                        `}
                        ${mediaQueries("sm")`
                            font-size: 14px;
                        `}
                      }
                    }
                  }
                }
              }
            }
          }
        }
        &.sitback-approve-req-modal-wrapper{
          &.sitback-suggest-req-modal-div{
            .modal-dialog{
              ${mediaQueries("xl")`
                 margin: 20px auto 0;
              `}
            }
          }
          .modal-dialog{
            max-width: 800px !important;
            .modal-content{
              border-radius: 20px;
              .modal-header{
                padding: 45px 0 0 0;
                justify-content: center;
                .btn-close{
                  border-radius: 23px;
                  border: 0.5px solid #E95060;
                  background: #FDFDFD;
                  position: absolute;
                  right: -10px;
                  top: -10px;
                  width: 45px !important;
                  height: 45px !important;
                }
                .modal-title{
                  text-align: center;
                  color: #000;
                  font-size: 25px;
                  font-weight: 800;
                  line-height: normal;
                  ${mediaQueries("xl")`
                      font-size: 23px;
                  `}
                  ${mediaQueries("lg")`
                       font-size: 21px;
                  `}
                  ${mediaQueries("md")`
                       font-size: 19px;
                  `}
                  ${mediaQueries("sm")`
                       font-size: 17px;
                  `}
                }
              }
              .modal-body{
                padding: 12px;
                .sit-req-table-div{
                  .table{
                    margin-bottom: 0;
                    thead{
                      tr{
                        th{
                          color: #57565E;
                          font-size: 16px;
                          font-weight: 700;
                          line-height: normal;
                          background: #F8F8FB;
                          padding: 22px 12px;
                          border: none;
                          vertical-align: middle;
                          ${mediaQueries("md")`
                              font-size: 15px;
                          `}
                          &:first-child{
                            border-top-left-radius: 12px;
                            border-bottom-left-radius: 12px;
                            padding: 22px 12px 22px 35px;
                            ${mediaQueries("xl")`
                                padding: 22px 12px 22px 30px;
                            `}
                            ${mediaQueries("lg")`
                                padding: 22px 12px 22px 25px;
                            `}
                            ${mediaQueries("md")`
                                padding: 22px 12px 22px 20px;
                            `}
                            ${mediaQueries("sm")`
                                padding: 22px 12px 22px 15px;
                            `}
                          }
                          &:last-child{
                            border-top-right-radius: 12px;
                            border-bottom-right-radius: 12px;
                            padding: 22px 35px 22px 12px;
                            ${mediaQueries("xl")`
                                padding: 22px 30px 22px 12px;
                            `}
                            ${mediaQueries("lg")`
                                padding: 22px 25px 22px 12px;
                            `}
                            ${mediaQueries("md")`
                                padding: 22px 20px 22px 12px;
                            `}
                            ${mediaQueries("sm")`
                                padding: 22px 15px 22px 12px;
                            `}
                          }
                        }
                      }
                    }
                    tbody{
                      tr{
                        td{
                          border: none;
                          color: #57565E;
                          font-size: 12px;
                          font-weight: 500;
                          line-height: normal;
                          padding: 16px 12px;
                          vertical-align: middle;
                          &:first-child{
                            padding: 16px 12px 16px 35px;
                            ${mediaQueries("xl")`
                                padding: 22px 12px 22px 30px;
                            `}
                            ${mediaQueries("lg")`
                                padding: 22px 12px 22px 25px;
                            `}
                            ${mediaQueries("md")`
                                padding: 22px 12px 22px 20px;
                            `}
                            ${mediaQueries("sm")`
                                padding: 22px 12px 22px 15px;
                            `}
                          }
                          &:last-child{
                            padding: 16px 35px 16px 12px;
                            ${mediaQueries("xl")`
                                padding: 22px 30px 22px 12px;
                            `}
                            ${mediaQueries("lg")`
                                padding: 22px 25px 22px 12px;
                            `}
                            ${mediaQueries("md")`
                                padding: 22px 20px 22px 12px;
                            `}
                            ${mediaQueries("sm")`
                                padding: 22px 15px 22px 12px;
                            `}
                          }
                        }
                      }
                    }
                  }
                  .info-icon-text-div{
                    display: flex;
                    align-items: flex-start;
                    padding-left: 35px;
                    margin: 15px 0 31px;
                    ${mediaQueries("xl")`
                        padding-left: 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding-left: 25px;
                    `}
                    ${mediaQueries("md")`
                        padding-left: 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding-left: 15px;
                    `}
                    i{
                      display: block;
                      width: 20px;
                      height: auto;
                      overflow: hidden;
                      margin-right: 12px;
                      svg{
                        path{
                          fill: #8A8A8F;
                        }
                      }
                    }
                    p{
                      font-weight: 400;
                      font-size: 16px;
                      line-height: 25px;
                      color: #8A8A8F;
                      span{
                        font-weight: 600;
                        color: #57565E;
                      }
                    }
                  }
                }
                .sit-req-form-wrapper{
                  max-width: 100%;
                  margin: 0;
                  max-height: unset;
                  overflow: unset;
                  .suggest-time-slot-wrapper{
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                    `}
                    label{
                      color: #57565E;
                      font-size: 16px;
                      font-weight: 700;
                      line-height: normal;
                      margin-bottom: 12px;
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("md")`
                        font-size: 14px;
                      `}
                    }
                    .sitback-select2-container{
                      .sitback-select-option__control{
                        border-radius: 50px;
                        background: #EEE;
                        max-width: 260px;
                        min-height: 40px;
                        padding: 2px 12px 2px 20px;
                        color: #57565E;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: normal;
                        border: none;
                        box-shadow: none !important;
                        .sitback-select-option__value-container{
                          max-height: 120px;
                          overflow-y: auto;
                          &::-webkit-scrollbar {
                            width: 8px;
                          }
                          &::-webkit-scrollbar-track {
                            background: #E9DEDE;
                          }
                          &::-webkit-scrollbar-thumb {
                            background: #8A8A8F;
                            border-radius: 8px;
                          }
                          .sitback-select-option__placeholder{
                            color: #57565E;
                            font-size: 12px;
                            font-weight: 500;
                            line-height: normal;
                          }
                          .sitback-select-option__multi-value{
                            background: transparent;
                            padding: 0;
                          }
                        }
                        .sitback-select-option__indicators{
                          .sitback-select-option__indicator-separator{
                            display: none;
                          }
                        }
                      }
                    }
                    .sitback-select-option__menu {
                      z-index: 50;
                      max-width: 250px;
                      .sitback-select-option__menu-list {
                        .sitback-select-option__option {
                          color: rgba(138, 138, 143, 0.60);
                          font-size: 12px;
                          font-weight: 500;
                          line-height: normal;
                          display: flex;
                          align-items: center;
                          justify-content: space-between;;
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
                            background: transparent;
                            color: ${theme.color.secondary};
                          }
                          .checkbox-wrapper-div{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            input{
                                width: 16px;
                                height: 16px;
                                margin-left: 12px;
                                margin-top: -2px;
                                border-color: transparent;
                                border-width: 4px;
                                border-radius: 2px;
                                background-color: #E0E0E0;
                                &:focus {
                                    border-color: transparent;
                                    outline: 0;
                                    box-shadow: unset;
                                }
                                &:checked{
                                    background-color: #95CCD5;
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
                                        width: 6px;
                                        height: 12px;
                                        border: solid white;
                                        border-width: 0 2px 2px 0;
                                        -webkit-transform: rotate(45deg);
                                        -ms-transform: rotate(45deg);
                                        transform: rotate(45deg);
                                    }
                                }
                            }
                            p{
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 100%;
                                color: #838BA1;
                            }
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
                  }
                  .sit-req-form-btn-wrapper{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .approve-btn{
                      border-radius: 25px;
                      background: #95CCD5;
                      color: #FBFBFB;
                      text-align: center;
                      font-size: 16px;
                      font-weight: 500;
                      line-height: normal;
                      text-transform: uppercase;
                      padding: 12px;
                      border: none;
                      min-width: 220px;
                      min-height: 50px;
                      margin-top: 50px;
                    }
                    .approve-note{
                      color: #DC3545;
                      text-align:center;
                    }
                  }
                  .loader-placeholder{
                    position: relative;
                    .spinner-border{
                      position: absolute;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      margin: auto;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                  .spa-closed-msg{
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                    `}
                  }
                }
                .msg-textarea-wrapper{
                  margin-bottom: 30px;
                    label{
                      color: #57565E;
                      font-size: 16px;
                      font-weight: 700;
                      line-height: normal;
                      margin-bottom: 12px;
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("md")`
                        font-size: 14px;
                      `}
                    }
                    textarea{
                      border-radius: 10px;
                      background: #EEE;
                      padding: 12px;
                      resize: none;
                      color: #57565E;
                      font-size: 12px;
                      font-weight: 500;
                      line-height: normal;
                      border: none;
                      &::placeholder{
                        color: #57565E;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: normal;
                      }
                    }
                  }
                .sit-req-cancel-btn-wrapper{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  ${mediaQueries("sm")`
                    flex-direction: column;
                  `}
                  .decline-btn{
                    border-radius: 25px;
                    background: #FFE0E4;
                    color: #E95060;
                    text-align: center;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    text-transform: uppercase;
                    min-width: 220px;
                    border: none;
                    padding: 16px;
                    &.cancel-btn{
                      color: #FBFBFB;
                      background: #CFCFCF;
                      margin-left: 12px;
                      ${mediaQueries("sm")`
                        margin-top: 12px;
                        margin-left: 0;
                      `}
                    }
                  }
                }
                .sit-req-form-wrapper{
                  .date-slot-type-div{
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                    `}
                    label{
                      font-size: 15px;
                    }
                    .add-serice-form-group-wrapper{
                      margin-bottom: 35px;
                    }
                    .suggest-req-form-group{
                      margin-bottom: 30px;
                      .react-datepicker-wrapper{
                        .react-datepicker__input-container{
                          input{
                            background: #FFFFFF;
                            color: #295086b2;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 300;
                            line-height: normal;
                              &:-webkit-autofill{
                              -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                              box-shadow: 0 0 0px 1000px white inset !important;
                              color: #57565E99 !important;
                              -webkit-text-fill-color: #57565E99 !important;
                            }
                        }
                      }

                      }
                    }
                  }
                  .date-slotmanual-div{
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                    `}
                    .suggest-req-form-group{
                      margin-bottom: 30px;
                    }
                    .slot-manual-date-label{
                      font-weight: 700;
                      font-size: 16px;
                      line-height: 100%;
                      letter-spacing: 0px;
                      color: #57565E;
                      margin-bottom: 16px;
                      text-transform: capitalize;
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                      `}
                    }
                    .react-datepicker-wrapper{
                        .react-datepicker__input-container{
                          input{
                            border-radius: 50px;
                            background: #EEE;
                            max-width: 260px;
                            min-height: 42px;
                            padding: 2px 12px 2px 20px;
                            color: #57565E;
                            font-size: 12px !important;
                            font-weight: 500;
                            line-height: normal;
                            border: none;
                            box-shadow: none !important;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            ${mediaQueries("sm")`
                             max-width: 100%;
                             width: 100%;
                          `}
                          }
                        }
                      }
                  }
                  .service-time-manage-display-div{
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                    `}
                        .service-label{
                          font-weight: 700;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: 0px;
                          color: #57565E;
                          margin-bottom: 16px;
                          ${mediaQueries("md")`
                            font-size: 15px;
                          `}
                          ${mediaQueries("sm")`
                            font-size: 14px;
                          `}
                        }
                        .datepicker-display-div{
                          display: flex;
                          align-items: center;
                          .react-datepicker-wrapper{
                            width: 32%;
                            ${mediaQueries("sm")`
                                width: 50%;
                            `}
                            .react-datepicker__input-container{
                              width: 100%;
                              input{
                                border-radius: 100px;
                                border: 1px solid #DADADA99;
                                padding: 12px;
                                font-weight: 300;
                                font-size: 16px;
                                line-height: 25px;
                                color: #57565E99;
                                width: 100%;
                                max-height: 45px;
                                background: #FFFFFF !important;
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
                          .react-datepicker-popper{
                            .react-datepicker__triangle{
                              display: none;
                            }
                          }
                          .save-btn{
                            background: #95CCD5;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            letter-spacing: 0px;
                            text-align: center;
                            text-transform: uppercase;
                            padding: 12px;
                            min-width: 90px;
                            color: #FFFFFF;
                            margin-left: 20px;
                            border: none;
                            border-radius: 100px;
                            ${mediaQueries("md")`
                              font-size: 15px;
                               min-width: 100px;
                            `}
                            ${mediaQueries("sm")`
                              min-width: 80px;
                              font-size: 14px;
                            `}
                          }
                        }
                        .error-text{
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 100%;
                          letter-spacing: 0px;
                          color: #E95060;
                          margin-top: 5px;
                        }
                        .service-time-list{
                          margin-top: 20px;
                          padding-left: 12px;
                          display: flex;
                          align-items: center;
                          flex-wrap: wrap;
                          li{
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            letter-spacing: 0px;
                            color: #8A8A8F99;
                            margin-bottom: 12px;
                            margin-right: 12px;
                            display: flex;
                            align-items: center;
                            border: 1px solid #EFEFF4;
                            border-radius: 25px;
                            padding: 8px;
                            max-width: fit-content;
                            background: #F8F8FB;
                            ${mediaQueries("md")`
                              font-size: 15px;
                            `}
                            ${mediaQueries("sm")`
                              font-size: 14px;
                            `}
                            &:last-child{
                              margin-right: 0;
                            }
                            .remove-btn{
                              background: unset;
                              border: none;
                              border-radius: 1000px;
                              box-shadow: none;
                              width: 25px;
                              height: 25px;
                              overflow: hidden;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-left: 15px;
                              i{
                                display: block;
                                width: 25px;
                                height: auto;
                                overflow: hidden;
                                svg{
                                  width: 100%;
                                  height: 100%;
                                  object-fit: contain;
                                  object-position: center;
                                  path{
                                    fill: #E95060;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      .suggest-timeslot-label{
                        color: #57565E;
                      font-size: 16px;
                      font-weight: 700;
                      line-height: normal;
                      margin-bottom: 12px;
                      padding: 0 0 0 35px;
                      ${mediaQueries("xl")`
                          padding: 0 0 0 30px;
                      `}
                      ${mediaQueries("lg")`
                          padding: 0 0 0 25px;
                      `}
                      ${mediaQueries("md")`
                        font-size: 15px;
                        padding: 0 0 0 20px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                        padding: 0 0 0 15px;
                      `}
                      }
                  .sitback-suggest-time-slot-main-div{
                    display: flex;
                    align-items: center;
                    padding: 0 0 0 35px;
                    ${mediaQueries("xl")`
                         padding: 0 0 0 30px;
                    `}
                    ${mediaQueries("lg")`
                        padding: 0 0 0 25px;
                    `}
                    ${mediaQueries("md")`
                      padding: 0 0 0 20px;
                    `}
                    ${mediaQueries("sm")`
                        padding: 0 0 0 15px;
                        flex-direction: column;
                        align-items: flex-start;
                    `}
                    .add-serice-form-group-wrapper{
                      margin-bottom: 15px;
                    }
                    .date-slot-type-div{
                        padding: 0 !important;
                      }
                    .suggest-req-form-group{
                      margin-bottom: 15px;
                      max-width: 33%;
                      flex-basis: 33%;
                      margin-right: 15px;
                      ${mediaQueries("sm")`
                          max-width: 100%;
                          flex-basis: 100%;
                          margin-right: 0;
                          width: 100%;
                      `}
                      .react-datepicker-wrapper{
                        .react-datepicker__input-container{
                          input{
                            border-radius: 50px;
                            background: #EEE;
                            max-width: 260px;
                            min-height: 42px;
                            padding: 2px 12px 2px 20px;
                            color: #57565E;
                            font-size: 12px !important;
                            font-weight: 500;
                            line-height: normal;
                            border: none;
                            box-shadow: none !important;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            ${mediaQueries("sm")`
                             max-width: 100%;
                             width: 100%;
                          `}
                          }
                        }
                      }
                      .sitback-select2-container{
                      .sitback-select-option__control{
                        border-radius: 50px;
                        background: #EEE !important;
                        max-width: 260px;
                        min-height: 42px;
                        padding: 2px 12px 2px 8px;
                        color: #57565E;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: normal;
                        border: none;
                        box-shadow: none !important;
                        ${mediaQueries("sm")`
                          width: 100%;
                          max-width: 100%;
                      `}
                        .sitback-select-option__value-container{
                          max-height: 120px;
                          overflow-y: auto;
                          .sitback-select-option__single-value{
                            color: #57565E;
                            font-size: 12px !important;
                          }
                          .sitback-select-option__placeholder{
                            color: #57565E !important;
                            font-size: 12px !important;
                            font-weight: 500;
                            line-height: normal;
                          }
                          .sitback-select-option__multi-value{
                            background: transparent;
                            padding: 0;
                          }
                        }
                        .sitback-select-option__indicators{
                          .sitback-select-option__indicator-separator{
                            display: none;
                          }
                        }
                      }
                    }
                    .sitback-select-option__menu {
                      z-index: 50;
                      max-width: 250px;
                      .sitback-select-option__menu-list {
                        .sitback-select-option__option {
                          color: rgba(138, 138, 143, 0.60);
                          font-size: 12px;
                          font-weight: 500;
                          line-height: normal;
                          display: flex;
                          align-items: center;
                          justify-content: space-between;;
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
                            background: transparent;
                            color: ${theme.color.secondary};
                          }
                          .checkbox-wrapper-div{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            input{
                                width: 16px;
                                height: 16px;
                                margin-left: 12px;
                                margin-top: -2px;
                                border-color: transparent;
                                border-width: 4px;
                                border-radius: 2px;
                                background-color: #E0E0E0;
                                &:focus {
                                    border-color: transparent;
                                    outline: 0;
                                    box-shadow: unset;
                                }
                                &:checked{
                                    background-color: #95CCD5;
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
                                        width: 6px;
                                        height: 12px;
                                        border: solid white;
                                        border-width: 0 2px 2px 0;
                                        -webkit-transform: rotate(45deg);
                                        -ms-transform: rotate(45deg);
                                        transform: rotate(45deg);
                                    }
                                }
                            }
                            p{
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 100%;
                                color: #838BA1;
                            }
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
                    }
                    .suggest-time-slot-wrapper{
                      padding: 0 !important;
                      .sitback-select-option__indicators{
                        .sitback-select-option__indicator{
                          padding: 4px;
                        }
                      }
                    }
                  }
                }
                .sit-date-data-wrapper{
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 100%;
                  color: #8A8A8F99;
                  text-align: center;
                  margin-bottom: 30px;
                  span{
                    font-weight: 600;
                  }
                }
                 .sit-slot-confirmation-text{
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 100%;
                  color: #E95060;
                  text-align: center;
                  margin-bottom: 30px;

                }
                .sit-approve-slot-display-div{
                  .slot-selection{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    max-width: 600px;
                    margin: auto;
                    ${mediaQueries("md")`
                        justify-content: center;
                    `}
                      .slot-option{
                        margin-bottom: 12px;
                        flex-basis: 33%;
                        max-width: 33%;
                        ${mediaQueries("sm")`
                           flex-basis: 100%;
                            max-width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        `}
                        .form-check{
                          margin-right: 25px;
                          display: flex;
                          align-items: center;
                          width: 100%;
                          ${mediaQueries("sm")`
                            justify-content: center;
                        `}
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
                  }
                  .approve-btn-modal-wrapper{
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin: 30px 0 0;
                      .submit-btn{
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 100%;
                        letter-spacing: 0px;
                        text-align: center;
                        text-transform: uppercase;
                        color: #FFFFFF;
                        background: #95CCD5;
                        min-width: 220px;
                        padding: 16px 12px;
                        border: none;
                        border-radius: 25px;
                      ${mediaQueries("sm")`
                        min-width: 180px;
                        font-size: 14px;
                      `}
                    }
                  }

                }
              }
            }
          }
        }
        &.sitback-edit-service-modal-wrapper{
          .modal-dialog{
            .modal-content{
              background: #FFFFFF;
              .modal-body{
                .sitback-edit-modal-body{
                  padding: 0;
                  form{
                    max-width: 650px;
                    max-height: 600px;
                    .date-input-wrapper{
                      .date-input-main-div{
                        margin-bottom: 15px;
                        .react-datepicker-wrapper{
                          .react-datepicker__input-container{
                            .datepicker-input{
                              border-radius: 100px;
                              border: 1px solid #DADADA99;
                              padding: 17px 16px;
                              font-weight: 300;
                              font-size: 16px;
                              line-height: 25px;
                              color: #57565E99;
                              width: 100%;
                              min-height: 60px;
                              background: #FFFFFF;
                            }
                          }
                        }
                      }
                      .react-datepicker{
                        .react-datepicker__triangle{
                          display: none !important;
                        }
                      }
                    }
                  }
                  .showcase-btn-div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    ${mediaQueries("md")`
                      margin-top: 40px;
                    `}
                    ${mediaQueries("sm")`
                      flex-direction: column;
                    `}
                    &.availability-showcase-btn-wrapper{
                      .add-appointment-btn{
                        min-width: 200px;
                      }
                      .cancel-btn-wrapper{
                        min-width: 200px;
                      }
                    }
                    .add-appointment-btn{
                      min-width: 120px;
                      padding: 20px 15px;
                      font-weight: 600;
                      line-height: 16px;
                      text-transform: uppercase;
                      margin-right: 40px;
                      background: #95CCD5;
                      border-radius: 25px;
                      border: none;
                      ${mediaQueries("lg")`
                        margin-right: 20px;
                      `}
                      ${mediaQueries("sm")`
                        margin-right: 0;
                        margin-bottom: 20px;
                        min-width: 200px;
                      `}
                    }
                    .cancel-btn-wrapper{
                      min-width: 120px;
                      padding: 18px 15px;
                      font-weight: 600;
                      line-height: 16px;
                      text-transform: uppercase;
                      background: transparent;
                      border-radius: 25px;
                      border: 1px solid #295086;
                      color: #295086;
                      ${mediaQueries("sm")`
                        min-width: 200px;
                      `}
                    }
                  }
                  .sitback-select2-container{
                    .sitback-select-option__control{
                      .sitback-select-option__value-container{
                        .sitback-select-option__single-value{
                          font-weight: 300;
                          font-size: 14px;
                          line-height: 25px;
                          color: #57565E99;
                        }
                      }
                      .sitback-select-option__placeholder{
                        font-weight: 300 !important;
                        font-size: 14px !important;
                        line-height: 25px !important;
                        color: #57565E99 !important;
                      }
                    }
                  }
                }
              }
            }
          }
          &.sitback-confirm-upgrade-modal-wrapper{
            .modal-dialog{
              .modal-content{
                .modal-header-wrapper{
                  h3{
                    color: #295086;
                    font-size: 25px;
                    font-weight: 800;
                    line-height: normal;
                    margin-bottom: 20px;
                    text-align: center;
                    ${mediaQueries("xl")`
                      font-size: 23px;
                    `}
                    ${mediaQueries("lg")`
                      font-size: 21px;
                    `}
                    ${mediaQueries("md")`
                      font-size: 19px;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 17px;
                    `}
                  }
                }
                .modal-body{
                  padding: 50px 65px;
                  ${mediaQueries("xl")`
                    padding: 45px 55px;
                  `}
                  ${mediaQueries("lg")`
                    padding: 40px 45px;
                  `}
                  ${mediaQueries("md")`
                    padding: 35px 35px;
                  `}
                  ${mediaQueries("sm")`
                    padding: 30px 20px;
                  `}
                  .spa-detail-div{
                    max-width: 320px;
                    padding-left: 35px;
                    ${mediaQueries("lg")`
                      padding-left: 25px;
                    `}
                    ${mediaQueries("md")`
                      padding-left: 15px;
                    `}
                    ${mediaQueries("sm")`
                      padding-left: 10px;
                    `}
                    h4{
                      color: #295086;
                      font-size: 18px;
                      font-weight: 700;
                      line-height: normal;
                      letter-spacing: 1px;
                      display: flex;
                      align-items: center;
                      ${mediaQueries("lg")`
                        font-size: 17px;
                      `}
                      ${mediaQueries("md")`
                        font-size: 16px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 15px;
                      `}
                      i{
                        margin-right: 9px;
                        width: 18px;
                        height: auto;
                        overflow: hidden;
                        display: block;
                      }
                    }
                    .plan-inner-div{
                      padding-left: 27px;
                      .per-month-text{
                        color: #295086;
                        font-size: 16px;
                        font-weight: 600;
                        line-height: normal;
                        margin-bottom: 18px;
                        ${mediaQueries("md")`
                          font-size: 15px;
                        `}
                        ${mediaQueries("sm")`
                          font-size: 14px;
                        `}
                        span{
                          color: rgba(138, 138, 143, 0.60);
                          font-weight: 400;
                        }
                      }
                      .plan-desc-text{
                        color: #4D6B93;
                        font-size: 10px;
                        font-weight: 400;
                        line-height: normal;
                        letter-spacing: 1px;
                        margin-bottom: 20px;
                      }
                      .plan-property-div{
                        margin-bottom: 15px;
                        .plan-property-wrapper{
                          display: flex;
                          align-items: center;
                          margin-bottom: 15px;
                          i{
                            margin-right: 8px;
                            width: 8px;
                            height: auto;
                          }
                          p{
                            color: #4D6B93;
                            font-size: 12px;
                            font-weight: 400;
                            line-height: normal;
                            letter-spacing: 1px;
                          }
                        }
                      }
                    }
                  }
                  .additional-monthly-charge-div{
                    border-radius: 8px;
                    border: 1px solid #95CCD5;
                    background: rgba(149, 204, 213, 0.15);
                    padding: 20px;
                    margin-bottom: 15px;
                    ${mediaQueries("lg")`
                      padding: 18px;
                    `}
                    ${mediaQueries("md")`
                      padding: 16px;
                    `}
                    ${mediaQueries("sm")`
                      padding: 15px;
                    `}
                    .monthly-detail-div{
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-bottom: 18px;
                      &:last-child{
                        margin-bottom: 0;
                      }
                      p{
                        color: #8A8A8F;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: normal;
                        letter-spacing: 1px;
                      }
                    }
                  }
                  .billing-type-radio-group{
                    display: flex;
                    align-items: center;
                    margin-bottom: 35px;
                    label{
                      color: #8A8A8F;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: normal;
                      letter-spacing: 1px;
                      display: flex;
                      align-items: center;
                      position: relative;
                      margin-right: 36px;
                      ${mediaQueries("sm")`
                        margin-right: 24px;
                      `}
                      input{
                        border: 1px solid #EEEAEA !important;
                        width: 18px;
                        height: 18px;
                        margin-right: 12px;
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        border-radius: 1000px;
                      }
                      /* Checked state */
                      input[type="radio"]:checked {
                        background-color: #95CCD5;
                      }

                      /* Inner dot when checked */
                      input[type="radio"]:checked::before {
                        content: "";
                        position: absolute;
                        top: 3px;
                        left: 3px;
                        width: 12px;
                        height: 12px;
                        background-color: #95CCD5;
                        border-radius: 50%;
                      }
                    }
                  }
                  .cancle-text{
                    max-width: 495px;
                    color: #8A8A8F;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: normal;
                    letter-spacing: 1px;
                    margin: 0 auto 60px;
                    ${mediaQueries("md")`
                      font-size: 15px;
                      margin: 0 auto 50px;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 14px;
                      margin: 0 auto 40px;
                    `}
                  }
                  .service-modal-btn-div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button{
                      max-width: 295px;
                      min-height: 70px;
                      font-size: 16px !important;
                      text-transform: uppercase;
                      ${mediaQueries("lg")`
                        min-height: 65px;
                      `}
                      ${mediaQueries("md")`
                        min-height: 60px;
                        font-size: 15px !important;
                      `}
                      ${mediaQueries("sm")`
                        min-height: 55px;
                        font-size: 14px !important;
                      `}
                      &.cancle-modal-btn{
                        background: #CFCFCF;
                        border-color: #CFCFCF;
                        margin-left: 15px;
                      }
                    }
                  }
                }
              }
            }
          }
          &.sitback-select-service-dashboard-modal-wrapper{
            .modal-dialog{
              .modal-content{
                .modal-body{
                  .add-employee-title-text{
                    color: #295086 !important;
                    font-size: 25px !important;
                    font-weight: 700 !important;
                    line-height: normal !important;
                    text-transform: capitalize !important;
                    text-align: center !important;
                    margin-bottom: 50px !important;
                    ${mediaQueries("xl")`
                      font-size: 23px !important;
                    `}
                    ${mediaQueries("lg")`
                      font-size: 21px !important;
                    `}
                    ${mediaQueries("md")`
                      font-size: 19px !important;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 17px !important;
                    `}
                  }
                  .add-serice-form-group-wrapper{
                    margin-bottom: 40px;
                    label{
                      color: #295086;
                      font-size: 15px !important;
                      font-weight: 500;
                      line-height: 100%;
                      margin-bottom: 12px;
                      text-transform: capitalize;
                      ${mediaQueries("sm")`
                        font-size: 14px !important;
                      `}
                    }
                    .sitback-select2-container{
                      .sitback-select-option__control{
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60) !important;
                        background: #FFF !important;
                      }
                      .sitback-select-option__value-container{
                        .sitback-select-option__placeholder{
                          color: rgba(87, 86, 94, 0.60) !important;
                          font-size: 14px !important;
                          font-weight: 300 !important;
                          line-height: 23px !important;
                        }
                      }

                    }
                    .name-service-select-div{
                      position: relative;
                      .add-service-link{
                        position: absolute;
                        text-transform: capitalize;
                        font-size: 14px;
                        color: #95CCD5;
                        line-height: normal;
                        bottom: -20px;
                        right: 15px;
                        text-decoration: underline !important;
                        font-weight: 500;
                      }
                    }
                  }
                  .service-modal-btn-div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    button{
                      max-width: 295px;
                      min-height: 70px;
                      font-size: 16px !important;
                      ${mediaQueries("lg")`
                        min-height: 65px;
                      `}
                      ${mediaQueries("md")`
                        min-height: 60px;
                        font-size: 15px !important;
                      `}
                      ${mediaQueries("sm")`
                        min-height: 55px;
                        font-size: 14px !important;
                      `}
                      &.cancle-modal-btn{
                        background: #CFCFCF;
                        border-color: #CFCFCF;
                        margin-left: 15px;
                      }
                    }
                  }
                }
              }
            }
            &.sitback-video-spotlight-detail-modal{
              .modal-dialog{
                .modal-content{
                  padding: 60px 40px 30px;
                  ${mediaQueries("lg")`
                    padding: 50px 30px 30px;
                  `}
                  ${mediaQueries("md")`
                    padding: 40px 20px 30px;
                  `}
                  ${mediaQueries("sm")`
                    padding: 30px 20px 20px;
                  `}
                  .modal-body{
                    .video-spotlight-title-text{
                      margin-bottom: 50px;
                      color: #295086;
                      font-size: 25px;
                      font-weight: 700;
                      line-height: normal;
                      text-transform: capitalize;
                      text-align: center;
                      ${mediaQueries("xl")`
                        font-size: 23px;
                      `}
                      ${mediaQueries("lg")`
                        font-size: 21px;
                      `}
                      ${mediaQueries("md")`
                        font-size: 19px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 18px;
                      `}
                    }
                    label{
                      color: #295086 !important;
                      font-size: 15px !important;
                      font-weight: 500 !important;
                      line-height: 100% !important;
                      text-transform: capitalize;
                      ${mediaQueries("sm")`
                        font-size: 14px !important;
                      `}
                    }
                    .add-serice-form-group-wrapper{
                      margin-bottom: 30px;
                      label{
                        color: #295086 !important;
                        font-size: 15px !important;
                        font-weight: 500 !important;
                        line-height: 100% !important;
                        text-transform: capitalize;
                        ${mediaQueries("sm")`
                          font-size: 14px !important;
                        `}
                      }
                      .sitback-select2-container{
                        .sitback-select-option__control{
                          border-radius: 100px;
                          border: 1px solid rgba(218, 218, 218, 0.60) !important;
                          background: #FFF !important;
                        }
                        .sitback-select-option__menu{
                          z-index: 10;
                        }
                        .sitback-select-option__value-container{
                          .sitback-select-option__placeholder{
                            color: rgba(87, 86, 94, 0.60) !important;
                            font-size: 14px !important;
                            font-weight: 300 !important;
                            line-height: 23px !important;
                          }
                        }

                      }
                    }
                    .video-spotlight-form-group{
                      margin-bottom: 20px;
                      &.length-service-form-group{
                        margin-bottom: 65px;
                        .time-appointment-display-div{
                          .time-left-div{
                            .time-content-text{
                              color: #95CCD5;
                            }
                          }
                          .time-minute-div{
                            .time-content-text{
                              color: #95CCD5;
                            }
                          }
                        }
                      }
                      &.service-price-form-group{
                        input{
                          min-height: 60px;
                          background: ${theme.color.white};
                          ${mediaQueries("md")`
                            min-height: 56px;
                          `}
                          ${mediaQueries("sm")`
                            min-height: 50px;
                          `}
                        }
                      }
                    }
                    .showcase-btn-div{
                      .add-appointment-btn{
                        min-height: 75px;
                        border-radius: 100px;
                        background: #95CCD5;
                        color: #FFF;
                        font-size: 16px !important;
                        font-weight: 500 !important;
                        line-height: normal !important;
                        margin-right: 15px;
                        ${mediaQueries("lg")`
                          min-height: 65px;
                        `}
                        ${mediaQueries("md")`
                          min-height: 60px;
                          font-size: 15px !important;
                        `}
                        ${mediaQueries("sm")`
                          min-height: 55px;
                          font-size: 14px !important;
                        `}
                      }
                      .cancel-btn-wrapper{
                        min-height: 75px;
                        border-radius: 100px;
                        background: #CFCFCF;
                        color: #FBFBFB;
                        font-size: 16px !important;
                        font-weight: 500 !important;
                        line-height: normal !important;
                        border: none;
                        ${mediaQueries("lg")`
                          min-height: 65px;
                        `}
                        ${mediaQueries("md")`
                          min-height: 60px;
                          font-size: 15px !important;
                        `}
                        ${mediaQueries("sm")`
                          min-height: 55px;
                          font-size: 14px !important;
                        `}
                      }
                    }
                  }
                }
              }
            }
          }
          &.sitback-availability-modal-wrapper{
            .modal-dialog{
              .modal-content{
                .modal-body{
                  .sitback-edit-modal-body{
                    .error-msg-text{
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 150%;
                      color: #E95060;
                      margin: 6px 0 0;
                    }
                    .add-employee-title-text{
                      font-weight: 800;
                      font-size: 19px;
                      line-height: 16px;
                      color: #000000;
                      width: 100%;
                      margin-bottom: 50px;
                      ${mediaQueries("lg")`
                          font-size: 18px;
                      `}
                      ${mediaQueries("md")`
                          font-size: 17px;
                      `}
                      ${mediaQueries("sm")`
                          font-size: 16px;
                      `}
                    }
                    .add-remove-modal-form-div{
                      label{
                        font-size: 16px;
                      }
                    }
                    .input-add-employee-label{
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                      `}
                    }
                    .phone-number-input-div{
                      display: flex;
                      align-items: center;
                      .country-code-input{
                        width: 50px;
                        margin-right: 0;
                        input{
                          padding: 14px;
                          border-top-right-radius: 0;
                          border-bottom-right-radius: 0;
                          border-right: none;
                        }
                      }
                      .mobile-number-input{
                        flex: 1;
                        input{
                          border-top-left-radius: 0;
                          border-bottom-left-radius: 0;
                        }
                      }
                    }
                    .input-add-employee-wrapper{
                      background: #FFFFFF !important;
                      border: 1px solid #DADADA99;
                      min-height: 60px;
                      font-weight: 300;
                      font-size: 16px;
                      line-height: 160%;
                      color: #57565E99 !important;
                      padding: 14px 25px;
                      &::placeholder{
                        font-weight: 300;
                        font-size: 16px;
                        line-height: 160%;
                        color: #57565E99 !important;
                      }
                      &:-webkit-autofill{
                        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                        box-shadow: 0 0 0px 1000px white inset !important;
                        color: #57565E99 !important;
                        -webkit-text-fill-color: #57565E99 !important;
                      }
                      ${mediaQueries("md")`
                        font-size: 15px;
                        min-height: 60px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                        min-height: 50px;
                      `}
                    }
                    .email-input-div{
                      margin-bottom: 50px;
                      ${mediaQueries("md")`
                        margin-bottom: 40px;
                      `}
                      ${mediaQueries("sm")`
                        margin-bottom: 30px;
                      `}
                    }
                    .add-remove-employee-row{
                      margin-bottom: 0 !important;
                    }
                    .add-employee-check-box-main-div{
                      margin-bottom: 50px;
                      .add-employee-checkbox-wrapper{
                      display: flex;
                      align-items: center;
                      flex-wrap: wrap;
                      ${mediaQueries("md")`
                        flex-direction: column;
                        align-items: flex-start;
                        margin-bottom: 40px;
                      `}
                      ${mediaQueries("sm")`
                        margin-bottom: 30px;
                      `}
                      .custom-checkbox{
                        flex-basis: 33%;
                        max-width: 33%;
                        ${mediaQueries("md")`
                          flex-basis: 100%;
                          max-width: 100%;
                        `}
                        .form-check-input {
                          width: 18px;
                          height: 18px;
                          border-radius: 3px;
                          background: #D9D9D9;
                          border: none;
                        }
                        .form-check-label {
                          font-weight: 300;
                          font-size: 16px;
                          line-height: 160%;
                          letter-spacing: 0%;
                          color: #57565E99;
                          margin-left: 6px;
                          margin-right: 0;
                          ${mediaQueries("md")`
                            font-size: 15px;
                          `}
                          ${mediaQueries("sm")`
                            font-size: 14px;
                          `}
                        }
                      }
                      .form-check-input:checked[type=checkbox]{
                        background: #38AC795E;
                        --bs-form-check-bg-image: unset;
                        background-size: 14px;
                        background-image: url('/images/checkbox-icon-image.svg');
                        background-repeat: no-repeat;
                        background-position: center;
                      }
                    }
                    }
                    form{
                      max-height: 100%;
                      overflow: unset;
                    }
                    &.sitback-service-time-manage-modal-body{
                      padding: 30px 15px;
                      .modal-title-text{
                        font-weight: 800;
                        font-size: 25px;
                        line-height: 100%;
                        color: #000000;
                        margin-bottom: 40px;
                        text-align: center;
                        letter-spacing: 0;
                        ${mediaQueries("xl")`
                          font-size: 24px;
                        `}
                        ${mediaQueries("lg")`
                          font-size: 23px;
                        `}
                        ${mediaQueries("md")`
                          font-size: 22px;
                        `}
                        ${mediaQueries("sm")`
                          font-size: 21px;
                        `}
                        ${mediaQueries("xs")`
                          font-size: 20px;
                        `}
                      }
                      .service-time-manage-display-div{
                        margin-bottom: 40px;
                        .service-label{
                          font-weight: 700;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: 0px;
                          color: #57565E;
                          margin-bottom: 16px;
                          ${mediaQueries("md")`
                            font-size: 15px;
                          `}
                          ${mediaQueries("sm")`
                            font-size: 14px;
                          `}
                        }
                        .datepicker-display-div{
                          display: flex;
                          align-items: center;
                          .react-datepicker-wrapper{
                            width: 32%;
                            .react-datepicker__input-container{
                              width: 100%;
                              input{
                                border-radius: 100px;
                                border: 1px solid #DADADA99;
                                padding: 12px;
                                font-weight: 300;
                                font-size: 16px;
                                line-height: 25px;
                                color: #57565E99;
                                width: 100%;
                                max-height: 45px;
                                background: #FFFFFF !important;
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
                          .save-btn{
                            background: #95CCD5;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            letter-spacing: 0px;
                            text-align: center;
                            text-transform: uppercase;
                            padding: 12px;
                            min-width: 90px;
                            color: #FFFFFF;
                            margin-left: 20px;
                            border: none;
                            border-radius: 100px;
                            ${mediaQueries("md")`
                              font-size: 15px;
                               min-width: 100px;
                            `}
                            ${mediaQueries("sm")`
                              min-width: 80px;
                              font-size: 14px;
                            `}
                          }
                        }
                        .error-text{
                          font-weight: 500;
                          font-size: 14px;
                          line-height: 100%;
                          letter-spacing: 0px;
                          color: #E95060;
                          margin-top: 5px;
                        }
                        .service-time-list{
                          margin-top: 20px;
                          padding-left: 12px;
                          display: flex;
                          align-items: center;
                          flex-wrap: wrap;
                          li{
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            letter-spacing: 0px;
                            color: #8A8A8F99;
                            margin-bottom: 12px;
                            margin-right: 12px;
                            display: flex;
                            align-items: center;
                            border: 1px solid #EFEFF4;
                            border-radius: 25px;
                            padding: 8px;
                            max-width: fit-content;
                            background: #F8F8FB;
                            ${mediaQueries("md")`
                              font-size: 15px;
                            `}
                            ${mediaQueries("sm")`
                              font-size: 14px;
                            `}
                            &:last-child{
                              margin-right: 0;
                            }
                            .remove-btn{
                              background: unset;
                              border: none;
                              border-radius: 1000px;
                              box-shadow: none;
                              width: 25px;
                              height: 25px;
                              overflow: hidden;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-left: 15px;
                              i{
                                display: block;
                                width: 25px;
                                height: auto;
                                overflow: hidden;
                                svg{
                                  width: 100%;
                                  height: 100%;
                                  object-fit: contain;
                                  object-position: center;
                                  path{
                                    fill: #E95060;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      .small-note-text{
                        margin: 0 0 30px;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 100%;
                        letter-spacing: 0px;
                        color: #E95060;
                      }
                      .submit-btn-wrapper{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        ${mediaQueries("sm")`
                          flex-direction: column;
                        `}
                        .submit-btn{
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 100%;
                          letter-spacing: 0px;
                          text-align: center;
                          text-transform: uppercase;
                          color: #FFFFFF;
                          background: #95CCD5;
                          min-width: 220px;
                          padding: 16px 12px;
                          border: none;
                          border-radius: 25px;
                          ${mediaQueries("sm")`
                            min-width: 180px;
                            font-size: 14px;
                          `}
                          &.cancel-btn-wrapper{
                            border: 1px solid #295086;
                            color: #295086;
                            background: transparent;
                            margin-left: 25px;
                            ${mediaQueries("sm")`
                              margin-left: 0;
                              margin-top: 25px;
                            `}
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
        &.header-border-remove-div{
            .modal-dialog{
                .modal-content{
                    .modal-header{
                        border: none;
                        padding-bottom: 0;
                        padding-top: 20px;
                    }
                    form{
                        margin: 15px auto 10px;
                    }
                }
            }
        }
        .enter-card-info-back{
          margin-top: -30px !important;
        }
        .go-to-backbtn{
            position:relative;
            z-index:1;
            width: 36px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 5px 0 0 5px;
            transition: all 0.3s ease-in-out;
            &:hover{
                opacity: 7;
            }
            img{
                object-fit: contain;
            }
        }
        .modal-dialog{
            max-width: 730px;
            // margin: 28px 40px 28px auto;
            width: calc(100% - 20px);
            margin: auto;
            .modal-content{
                background: #FFF;
                border: none;
                border-radius: 8px;
            }
        }
        .addpricemessage
        {
          display:flex;
          gap:6px;
          margin-top:-10px;

          span{
            font-size: 12px;
            font-weight: 300;
            line-height: 18px;
            letter-spacing: 1px;
            text-align: center;
            color:#295086B2;
          }
        }

        &.sitback-modalv2-wrapper{
            .modal-dialog{
                max-width: 640px;
                margin: auto;
                padding: 0 15px;
                .modal-content{
                    .modal-header{
                        border: none;
                        &.text-right {
                          cursor: pointer;
                          justify-content: end;
                          display: flex;
                        }
                        .btn-close{
                            width: 32px;
                            height: 32px;
                            background-color: ${theme.color.white};
                            opacity: 1;
                            padding: 0;
                            outline: none;
                            box-shadow: none;
                        }
                        &.red-close-icon{
                            .btn-close{
                                background-image: none;
                                background: #fff url('images/red-close-icon.svg') no-repeat;
                                background-position: center;
                                background-size: 13px;
                                border-radius: 100px;
                            }
                        }
                    }
                }
            }
            .app-store-wrapper{
                padding: 15px 0 35px 0px;
                max-width: 425px;
                width: 100%;
                margin: auto;
                .app-store-btns-wrapper{
                    display: flex;
                    flex-direction: column;
                    .app-store-btn{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        max-width: 200px;
                        width: 100%;
                        margin: auto;
                        height: 73px;
                        overflow: hidden;
                        margin-bottom: 30px;
                        border-radius: 9px;
                        border-radius: 9px;
                        background: #23201f;

                        ${mediaQueries("lg")`
                            height: 63px;
                            max-width: 220px;
                            margin-bottom: 25px;
                        `}
                        ${mediaQueries("md")`
                            height: 50px;
                            max-width: 180px;
                            margin-bottom: 20px;
                        `}
                        &:last-child{
                            margin-bottom: 35px;
                        }
                    }
                    .link-text{
                        font-style: normal;
                        font-weight: 300;
                        font-size: 21px;
                        line-height: normal;
                        text-align: center;
                        letter-spacing: -0.01em;
                        text-decoration-line: underline !important;
                        color: #295086;
                        display: inline-flex;
                        justify-content: center;
                    }
                    .or-text{
                        font-style: normal;
                        font-weight: 300;
                        font-size: 21px;
                        line-height: normal;
                        text-align: center;
                        letter-spacing: -0.01em;
                        color: #295086;
                        display: inline-flex;
                        justify-content: center;
                        margin-bottom:15px;
                    }
                }
            }
            .sitback-request-modal-wrapper{
                min-height: 390px;
                ${mediaQueries("xl")`
                    min-height: 340px;
                `}
                ${mediaQueries("lg")`
                    min-height: 320px;
                    margin-bottom: 20px;
                `}
                ${mediaQueries("md")`
                    min-height: 250px;
                `}
                .sitback-request-img{
                    max-width: 300px;
                    width: 100%;
                    margin: 0 auto 30px;
                    overflow: hidden;
                    ${mediaQueries("lg")`
                        max-width: 280px;
                        margin: 0 auto 25px;
                    `}
                    ${mediaQueries("md")`
                        max-width: 260px;
                        margin: 0 auto 20px;
                    `}
                    ${mediaQueries("sm")`
                        max-width: 200px;
                        margin: 0 auto 15px;
                    `}
                }
                h5{
                    color: ${theme.color.secondary};
                    text-align: center;
                    font-size: 28px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 130%;
                    letter-spacing: -0.32px;
                    margin-bottom: 12px;
                    ${mediaQueries("xl")`
                        font-size: 27px;
                        line-height: normal;
                    `}
                    ${mediaQueries("lg")`
                        font-size: 24px;
                        line-height: normal;
                    `}
                    ${mediaQueries("md")`
                        font-size: 22px;
                        line-height: normal;
                    `}
                    ${mediaQueries("sm")`
                        font-size: 20px;
                        line-height: normal;
                    `}
                }
                p{
                    color: ${theme.color.secondary};
                    text-align: center;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 130%;
                    letter-spacing: -0.24px;
                    max-width: 380px;
                    margin: auto;
                    width: 100%;
                    ${mediaQueries("xl")`
                        font-size: 20px;
                        line-height: normal;
                    `}
                    ${mediaQueries("lg")`
                        font-size: 19px;
                        line-height: normal;
                        max-width: 340px;
                    `}
                    ${mediaQueries("md")`
                        font-size: 18px;
                        line-height: normal;
                        max-width: 320px;
                    `}
                    ${mediaQueries("sm")`
                        font-size: 16px;
                        line-height: normal;
                        max-width: 300px;
                    `}
                }
                &.report-submitted-modal-wrapper{
                    min-height: 300px;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    h5{
                        color: ${theme?.color?.secondary};

                    }
                    p{
                        margin: 13px auto 40px;
                        color: #5A6981;
                    }
                    button{
                        width: 240px;
                    }
                }
            }
            .sitback-option-modal-wrapper{
                margin: auto;
                max-width: 470px;
                width: 100%;

                h5{
                    font-size: 25px;
                    font-weight: 700;
                    line-height: 37.5px;
                    letter-spacing: 1px;
                    text-align: center;
                    color: #295086;
                    margin-bottom: 9px;
                }
                p{
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;
                    letter-spacing: 1px;
                    text-align: center;
                    color: #295086;
                }
                .addcard-footer-wrapper{
                    margin-top: 25px;
                }
            }
            .siteback-unavailable-appointments-model{
              width: 100%;
              margin: auto;
              max-width: 500px;
              margin-bottom:10px;
            }
            .sitback-payment-tip-modal{
                .sitback-select2-container.input-with-icon {
                    margin-bottom: -10px;
                }
                    p{
                    color:#4D6B93;
                    }
                    .checkbox-wrapper-div{
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        margin-bottom:20px;
                        input{
                            width: 24px;
                            height: 24px;
                            margin-right: 12px;
                            margin-top: -2px;
                            border-color: transparent;
                            border-width: 4px;
                            border-radius: 2px;
                            &:focus {
                                border-color: transparent;
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
                                    width: 6px;
                                    height: 12px;
                                    border: solid white;
                                    border-width: 0 2px 2px 0;
                                    -webkit-transform: rotate(45deg);
                                    -ms-transform: rotate(45deg);
                                    transform: rotate(45deg);
                                }
                            }
                        }
                        p{
                            font-style: normal;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 100%;
                            color: #838BA1;
                        }
                    }
                        .sitback-tip-payment-amount{
                            position: relative;
                                input{
                                    padding: 18px 18px 18px 56px;
                                    box-shadow:unset;
                                    min-height: 62px;
                                    ${mediaQueries("xl")`
                                        min-height: 56px;
                                    `}
                                    ${mediaQueries("sm")`
                                        min-height: 48px;
                                    `}
                                }
                                i{
                                    width: 20px;
                                    height: 20px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    position: absolute;
                                    left: 20px;
                                    top: 0;
                                    bottom: 0;
                                    margin: auto;
                                    cursor: pointer;
                                        &:before {
                                            position: absolute;
                                            content: "";
                                            height: 20px;
                                            width: 1px;
                                            background: #979797;
                                            left: 26px;
                                        }
                                    svg {
                                        color: #979797;
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                    .text-danger{
                                        text-align:left !important;
                                    }
                        }
                    }
            .note-modal-wrapper{
                max-width: 540px;
                h5{
                    text-align: center;
                    margin-top: -35px;
                }
                p{
                    text-align: start;
                }
            }
        }
        .modal-header-text{
            text-align: center;
            margin-bottom: 21px;
            margin-top: -21px;
            h5{
                font-size: 18px;
                font-weight: 400;
                line-height: 32px;
                letter-spacing: 0em;
                text-align: center;
                color: #295086;
            }
            p{
                font-size: 16px;
                font-weight: 700;
                line-height: 30px;
                letter-spacing: 0em;
                text-align: center;
                color: #295086;
            }
        }
        &.payment-modal-wrapper{
            .modal-dialog{
                max-width: 520px !important;
                .modal-content{
                    border-radius: 24px !important;
                    background: #ffffff !important;
                    background-image: none !important;
                    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.08) !important;
                    border: none !important;
                    padding: 35px 35px 35px !important;

                    .modal-header{
                        border: none !important;
                        padding: 0 !important;
                        position: absolute !important;
                        top: 24px !important;
                        right: 24px !important;
                        z-index: 10 !important;
                        .btn-close{
                            background: transparent url('/images/red-close-icon.svg') no-repeat center !important;
                            background-size: 14px !important;
                            opacity: 1 !important;
                            width: 14px !important;
                            height: 14px !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            border: none !important;
                            outline: none !important;
                        }
                    }

                    .stripe-card{
                        margin-top: 0 !important;
                        padding: 0 !important;
                        .cardtitle{
                            color: #295086 !important;
                            font-size: 26px !important;
                            font-style: normal !important;
                            font-weight: 600 !important;
                            line-height: normal !important;
                            letter-spacing: 0.5px !important;
                            text-align: center !important;
                            margin-bottom: 24px !important;
                        }
                        input{
                            border-radius: 100px !important;
                            border: 1px solid rgba(41, 80, 134, 0.2) !important;
                            background: #ffffff !important;
                            color: #295086 !important;
                            font-size: 15px !important;
                            font-weight: 400 !important;
                            padding: 16px 24px !important;
                            height: 56px !important;
                            outline: none !important;
                            box-shadow: none !important;
                            margin-top: 0 !important;
                            margin-bottom: 12px !important;
                            width: 100% !important;
                            &::placeholder {
                                color: #29508699 !important;
                                font-weight: 300 !important;
                            }
                        }
                        .payment-input-wrapper{
                            margin-bottom: 16px !important;
                            margin-left: -6px !important;
                            margin-right: -6px !important;

                            > div {
                                padding-left: 6px !important;
                                padding-right: 6px !important;
                            }

                            .StripeElement{
                                border-radius: 100px !important;
                                border: 1px solid rgba(41, 80, 134, 0.2) !important;
                                background: #ffffff !important;
                                padding: 18px 24px !important;
                                height: 56px !important;
                                box-sizing: border-box !important;
                                outline: none !important;
                                box-shadow: none !important;
                                -webkit-appearance: none !important;
                                -moz-appearance: none !important;
                                appearance: none !important;
                                margin-top: 0 !important;
                                margin-bottom: 12px !important;

                                &.StripeElement--focus {
                                    border-color: #295086 !important;
                                }
                                iframe {
                                    width: 100% !important;
                                    height: 100% !important;
                                }
                            }
                        }
                        .loading-btn-wrapper {
                            border-radius: 100px !important;
                            background: #295086 !important;
                            color: #ffffff !important;
                            font-weight: 600 !important;
                            padding: 14px 40px !important;
                            border: none !important;
                            height: 52px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            margin: 24px auto 0 !important;
                            width: auto !important;
                            min-width: 200px !important;
                            text-transform: capitalize !important;
                            font-size: 16px !important;
                            transition: all 0.3s ease !important;
                            box-shadow: 0px 4px 12px rgba(41, 80, 134, 0.2) !important;
                            &:hover {
                                background: #1e3c66 !important;
                            }
                            &:disabled {
                                opacity: 0.6 !important;
                                cursor: not-allowed !important;
                            }
                        }
                    }
                    .text-danger
                    {
                      padding-left: 20px !important;
                      margin-top: -8px !important;
                      margin-bottom: 12px !important;
                      font-size: 12px !important;
                      text-align: left !important;
                      color: #E32C1F !important;
                    }
                }
            }
        }
        &.checkout-payment-model{
          background: #afafaea6;
          .modal-dialog{
              max-width: 480px;
              // margin: 28px 40px 28px auto;
              width: calc(100% - 20px);
              margin: auto;
              .modal-content{
                background: #ffffff;
                border: none;
                border-radius: 8px;
                .stripe-card{
                    padding:12px 25px;
                }
                .modal-header{
                    width: 658px;
                    height: 80px;
                    border-radius: 8px 8px 0px 0px;
                    text-align: center;
                    width: 100%;
                    background:#295086;
                    display: flex;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 45px;
                    color:${theme.color.white};
                }

                .payment-card-imgs{
                    display: flex;
                    gap: 15px;
                    margin:12px auto 27px;
                    justify-content:center;
                    img{
                    width:70px;
                    }
                }
                label{
                    font-size: 18px;
                    font-weight: 500;
                    line-height: normal;
                    color:#060D01;
                }
                .payment-amount{
                    display:flex;
                    justify-content:space-between;
                    margin-bottom: 12px;
                    .payment-price{
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 36px;
                        color:#060D01;
                        background: transparent;
                        border: none;
                        outline: none;
                        box-shadow: none;
                        min-height: auto;
                        line-height: normal;
                        padding: 0;
                    }
                    button{
                        border: 1px solid #C4C4C4;
                        border-radius: 4px;
                        color: #696C66;
                        height: auto;
                        font-size: 18px;
                        padding: 5px 15px;
                        font-weight: 400;
                        line-height: normal;
                        background: transparent;
                        min-width: 70px;

                    }
                  }
                  .Card-name{
                    margin-bottom: 15px;
                    label{
                        margin-bottom: 8px;
                        font-weight: 400;
                    }
                    input{
                      border:1px solid #DEDEDE;
                      border-radius:5px;
                      box-shadow:none;
                      height:60px;
                      background-color:#ffffff;
                      background:#ffffff;
                      padding:20px;
                      font-size: 16px;
                      font-weight: 500;
                      line-height: 36px;
                      color:#060D01;
                      &::placeholder{
                        color:#696C66;
                      }
                    }
                    .text-danger
                    {
                      padding-left:20px;
                    }
                  }
                .payment-input-wrapper{
                    input{
                        border:1px solid #DEDEDE;
                        border-radius:5px;
                        box-shadow:none;
                        height:60px;
                        background-color:#ffffff;
                        background:#ffffff;
                        padding:20px;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 36px;
                        color:#060D01;

                      &::placeholder
                      {
                        color:#696C66;
                      }
                  }
                  .card_number{
                    margin-bottom: 12px;
                    .CardNumberField-input-wrapper .InputElement{
                      border:1px solid #DEDEDE !important;
                      border-radius:5px !important;
                      box-shadow:none !important;
                      height:63px !important;
                      background-color:#ffffff !important;
                      background:#ffffff !important;
                      padding:20px !important;
                      font-size: 16px !important;
                      font-weight: 500 !important;
                      line-height: 36px !important;
                      color:#060D01 !important;

                      &::placeholder
                      {
                        color:#696C66 !important;
                      }
                    }
                  }

                }
                .loading-btn-wrapper
                {
                  background:#295086;
                  height:60px;
                  margin-top:20px;
                  color:${theme.color.white};
                  font-size:18px;
                  font-weight:500;
                  padding:5px 20px;
                  margin-bottom:15px;
                  border-radius:8px;
                  border:1px solid #295086;
                }
              }
          }
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
            padding-left: 48px;
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
            .selected-flag{
              background: transparent;
              padding-left: 16px;
            }
          }
        }
        &.changethe-slottime-modal{
            .modal-dialog{
                .modal-content{
                    .modal-header{
                        border: none;
                        &.red-close-icon{
                            .btn-close{
                                background-image: none;
                                background: #fff url('images/red-close-icon.svg') no-repeat;
                                background-position: center;
                                background-size: 13px;
                                border-radius: 100px;
                                opacity: 1;
                            }
                        }
                    }
                    .modal-body{
                        .sitback-request-modal-wrapper{
                            max-width: 600px;
                            width: 100%;
                            margin: 0 auto 0;
                            h3{
                                font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                font-size: 21px;
                                font-weight: 600;
                                line-height: normal;
                                letter-spacing: -0.01em;
                                text-align: start;
                                color: ${theme.color.secondary};
                                margin-bottom: 12px;
                            }
                            .box-wrapper{
                                display: flex;
                                flex-wrap: wrap;
                                margin: -8px;
                                padding-bottom: 0px;
                                .greybox-wrapper{
                                    padding: 8px;
                                    flex: 0 0 50%;
                                }
                            }
                            .boxwhite{
                                padding: 15px;
                                border: 1px solid ${theme.color.white};
                                background: ${theme.color.white};
                                border-radius: 6px;
                                margin-bottom: 15px;
                                height: calc(100% - 15px);
                                h6{
                                    font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: normal;
                                    letter-spacing: -0.01em;
                                    text-align: start;
                                    color: ${theme.color.secondary};
                                    margin-bottom: 4px;
                                }
                                ul{
                                    li{
                                        font-size: 14px;
                                        letter-spacing: .01rem;
                                        color: ${theme.color.secondary};
                                        font-weight: 300;
                                        line-height: normal;
                                        margin-bottom: 8px;
                                        &:last-child{
                                            margin-bottom: 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .btn-wrapper{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-top: 20px;
                        .loading-btn-wrapper{
                            margin-bottom: 15px;
                            background: #295086;
                        }
                        button{
                            max-width: 400px;
                            margin: auto 15px;
                            &.text-btn{
                                background: transparent;
                                border: none;
                                box-shadow: none;
                                padding: 12px;
                                width: auto;
                                max-width: unset;
                                font-size: 16px;
                                font-weight: 600;
                                line-height: 24px;
                                text-align: center;
                                color: #29508699;
                                text-decoration: none;
                            }
                        }
                    }
                }
            }
        }
        &.insights-modal-wrapper{
            .modal-dialog{
                max-width: 830px;
                .modal-header{
                    p{
                        color: #295086;
                        font-size: 14px;
                        text-transform: unset;
                        font-weight: 400;
                        width: calc(100% - 30px);
                    }
                }
                .table-responsive{
                    table{
                        thead{
                            tr{
                                th{
                                    &:last-child{
                                        width: 350px;
                                    }
                                }
                            }
                        }
                        tbody{
                            tr{
                                td{
                                    color: #295086;
                                    font-weight: 500;
                                    vertical-align: text-top;
                                }
                            }
                        }
                    }
                }
                .modal-footer{
                    justify-content: center;
                    border: none;
                    margin-bottom: 10px;
                    display: flex;
                    button{
                        min-width: 180px;
                        margin: 0 8px;
                        border-radius: 100px;
                        padding: 15px;
                        width: auto;
                        &.cancel-btn-wrapper{
                            background: transparent;
                            border-color: #295086;
                            color: #295086;
                        }
                    }
                }
            }
        }
        .checkbox-wrapperv5{
            display: flex;
            align-items: center;
            padding-top: 5px;
            input{
                width: 18px;
                height: 18px;
                margin-right: 12px;
                margin-top: -2px;
                border-color: transparent;
                border-width: 4px;
                border-radius: 2px;
                &:focus {
                    border-color: transparent;
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
                        width: 6px;
                        height: 10px;
                        border: solid white;
                        border-width: 0 2px 2px 0;
                        -webkit-transform: rotate(45deg);
                        -ms-transform: rotate(45deg);
                        transform: rotate(45deg);
                    }
                }
            }
        }
        .checkbox-wrapperv5-text {
            font-size: 14px;
            font-weight: 300;
            line-height: 18px;
            letter-spacing: 1px;
            text-align: center;
            color: #295086B2;
            ${mediaQueries("sm")`
                text-align: start;
                font-size: 12px;
            `}
            ${mediaQueries("xs")`
                text-align: start;
                font-size: 9px;
            `}
        }
        &.cloud-image-wrapper-main{
            .modal-dialog{
                .modal-content{
                    background: #EFECD5;
                    .red-close-icon{
                        display: none;
                    }
                    .modal-body{
                        position: relative;
                        overflow: hidden;
                        &::before{
                            position: absolute;
                            content: '';
                            background: url("images/right-top-img-1.svg") no-repeat;
                            background-position: center;
                            background-size: contain;
                            max-width: 700px;
                            height: 220px;
                            right: -60%;
                            width: 100%;
                            top: -20%;
                        }
                        &::after{
                            position: absolute;
                            content: '';
                            background: url("images/right-top-img-1.svg") no-repeat;
                            background-position: center;
                            background-size: contain;
                            max-width: 700px;
                            height: 220px;
                            left: -60%;
                            width: 100%;
                            bottom: 0;
                            top: 0;
                            margin: auto;
                        }
                        .app-store-wrapper{
                        position: relative;
                        z-index: 2;
                            &::before{
                                position: absolute;
                                content: '';
                                background: url("images/right-top-img-1.svg") no-repeat;
                                background-position: center;
                                background-size: contain;
                                max-width: 700px;
                                height: 220px;
                                right: -60%;
                                width: 100%;
                                bottom: -100px;
                                z-index: -1;
                            }
                        }
                    }
                }
            }
        }
    }
    .sitback-therapist-modal-wrapper{
      background: #00000099;
      .modal-dialog{
        &.sitback-assign-services-dialog {
          max-width: 680px;
        }

        &.sitback-work-hours-edit-dialog {
          max-width: 560px;
        }

        &.sitback-therapist-status-dialog {
          max-width: 620px;
        }

        .modal-content{
          background: white;
          .red-close-icon{
            border: none;
            padding: 21px 21px 0px 21px !important;
            button{
              background-image: none;
              background: url('images/close-icon1.svg') no-repeat;
              background-position: center;
              background-size: 32px;
              opacity: 1;
            }
          }
          .modal-body{
            padding: 21px;
            .sitback-add-therapist-modal{
              padding: 0;
              max-width: 670px;
              margin: auto;
              .add-therapist-modal-header{
                h3{
                  font-size: 18px;
                  font-weight: 400;
                }
              }
              .add-therapist-form{
                .add-therapist-form-row{
                  label{
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 160%;
                    color: rgba(41, 80, 134, 0.9);
                    margin-bottom: 2px;
                  }
                  input{
                    border-radius: 1000px;
                    &::placeholder {
                      color: #295086;
                    }
                  }
                  select{
                    border-radius: 1000px;
                    color: #295086;
                    &::placeholder {
                      color: #295086;
                    }
                  }
                  .phone-number-send-input{
                    position: relative;
                    .phone-number-input-wrapper{
                      input{
                        border-radius: 1000px !important;
                        padding-right: 110px;
                        &::placeholder {
                          color: #295086;
                        }
                      }
                    }
                    .add-therapist-send-otp-btn{
                      outline: none;
                      background-color: transparent;
                      border: none;
                      display: flex;
                      align-items: center;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 160%;
                      color: #295086;
                      position: absolute;
                      right: 18px;
                      top: 0;
                      bottom: 0;
                      margin: auto;
                      height: auto;
                      cursor: pointer;
                      opacity: 0.7;
                      transition: all 0.2s ease-in-out;
                      &.is-bold {
                        font-weight: 700;
                        opacity: 1;
                      }
                      i{
                        width: 21px;
                        height: 21px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 5px;
                        img{
                          object-fit: contain;
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                  }
                }
                .add-therapist-otp-section{
                  p{

                  }
                  .otp-input-wrapper{
                    input{
                      box-shadow: none;
                      background: white;
                    }
                  }
                  .add-therapist-resend-text{
                    margin-top: -15px;
                  }
                }
                .add-therapist-modal-footer{
                  button{
                    font-weight: 400;
                    padding: 9px 12px;
                    min-height: 41px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sitbackmodalwrapper{
        .modal-dialog{
            .modal-content{
                .red-close-icon{
                    border: none;
                    padding-bottom: 0;
                    position: relative;
                    z-index: 11;
                    .btn-close{
                        background-image: none;
                        background: #fff url('images/red-close-icon.svg') no-repeat;
                        background-position: center;
                        background-size: 13px;
                        border-radius: 100px;
                        opacity: 8;
                    }
                }
                .modal-body{
                    > div {
                        padding: 0;
                    }
                }
                .card-info-detail-wrapper{
                    margin-bottom: 0;
                    h5{
                        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 27px;
                        text-align: left;
                        color: ${theme.color.secondary};
                        margin-bottom: 5px;
                    }
                    p{
                        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 27px;
                        color: ${theme.color.secondary};
                        opacity: 0.6;
                    }
                    .card-info{
                        margin-bottom: 10px;
                    }
                    .row-wrapper{
                        display: flex;
                        margin: -8px;
                        .card-info{
                            padding: 8px;
                            flex: 0 0 50%;
                        }
                    }
                }
                .payment-input-wrapper{
                    margin-bottom: 12px;
                    label{
                        margin-bottom: 5px;
                    }
                    .card_number{
                        margin-bottom: 15px;
                    }
                    .StripeElement{
                        border-radius: 100px !important;
                        border: 1px solid ${theme.color.border} !important;
                        background: ${theme.color.lightwhite} !important;
                        color: ${theme.color.secondary};
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        padding: 20px 24px;
                        outline: none;
                        box-shadow: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        height: auto;
                        height: 63px !important;
                        padding-top: 22px !important;
                        ${mediaQueries("xl")`
                            padding: 19px 24px !important;
                            font-size: 15px;
                            height: 57px !important;
                        `}
                        ${mediaQueries("lg")`
                            padding: 16px 24px !important;
                            font-size: 14px;
                            height: 51px !important;
                        `}
                        &:-webkit-autofill,
                        &:-webkit-autofill:hover,
                        &:-webkit-autofill:focus,
                        &:-webkit-autofill:active{

                        }
                        &::-ms-input-placeholder {
                            *{
                                color: #29508699;
                                font-weight: 300;
                            }
                        }
                        &::placeholder {
                            *{
                                color: #29508699;
                                font-weight: 300;
                            }
                        }
                        &:focus{
                            color: ${theme.color.secondary};
                            background-color: ${theme.color.white};
                            border-color: ${theme.color.border};
                            outline: 0;
                            /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
                        }
                    }
                }

            }
        }
    }
    .sitback-payment-reminder-modal{
        .modal-dialog{
            max-width: 500px;
            .modal-content{
                .red-close-icon{
                    border: none;
                    padding: 12px;
                    padding-bottom: 0;
                    .btn-close{
                        background-image: none;
                        background: #fff url('images/close-iconv6.svg') no-repeat;
                        background-position: center;
                        background-size: 34px;
                        border-radius: 100px;
                        opacity: 8;
                        padding: 0;
                        background-color: transparent;
                        width: 34px;
                        height: 34px;
                        margin: 3px 3px 0 auto;
                    }
                }
                .payment-reminder-section{
                    h2{
                        font-style: normal;
                        font-weight: 600;
                        font-size: 24px;
                        line-height: 36px;
                        text-align: center;
                        color: #E32C1F;
                        margin-bottom: 12px;
                        .span-tip-header{
                             color: #295086 !important;
                        }
                    }
                    .payment-header-date-wrapper{
                        ${"" /* display: flex;
                        align-items: center;
                        justify-content: space-between; */
  }
                        ${"" /* width: 100%; */}
                        ${"" /* margin-top: 38px; */}
                        margin-bottom: 15px;
                        h2{
                            color: #295086;
                            ${"" /* width: calc(100% - 238px);
                            text-align: start; */
  }
                            margin-bottom: 8px;
                        }
                        .react-datepicker-wrapper{
                            margin: auto;
                            display: flex;
                            max-width: 260px;
                            width: 100%;
                            .react-datepicker__input-container{
                                position: relative;
                                display: inline-block;
                                width: 100%;
                                input{
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 15px;
                                    line-height: normal;
                                    color: #295086;
                                    background: #fffef9;
                                    border: 0.5px solid #c1cbd6;
                                    border-radius: 100px;
                                    outline: none;
                                    box-shadow: none;
                                    padding: 8px 52px 8px 18px;
                                    width: 100%;
                                }
                                .react-datepicker__close-icon{
                                    top: -1px;
                                    right: 25px;
                                }
                                &:after {
                                    position: absolute;
                                    content: "";
                                    background: url("images/Calendar-v5.svg") no-repeat;
                                    background-position: center;
                                    background-size: contain;
                                    width: 18px;
                                    height: 18px;
                                    right: 10px;
                                    top: 8px;
                                    /* cursor: pointer; */
                                }
                                .react-datepicker__calendar-icon{
                                    display: none;
                                }
                            }
                        }
                    }
                    .Payment-detail-wrapper{
                        overflow: hidden;
                        .header-text{
                            margin-bottom: 9px;
                            padding-bottom: 9px;
                            border-bottom: 1px solid #DADADA;
                            h3{
                                font-style: normal;
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 20px;
                                color: #295086;
                                text-align: center;
                            }
                            .total-tip{
                                text-align: center;
                            }
                        }

                        .payment-detail-list-wrapper{
                            margin-bottom: 9px;
                            padding-bottom: 9px;
                            border-bottom: 1px solid #DADADA;
                            .box-title-header{
                                display: flex;
                                justify-content: start;
                                margin: -8px;
                                margin-bottom: 6px;
                                margin-top: 8px;
                                .flexbox-wrap{
                                    flex: 0 0 50%;
                                    padding: 8px;
                                }
                                .cancelled-text{
                                    font-style: normal;
                                    font-weight: 400;
                                    font-size: 14px;
                                    line-height: 15px;
                                    color: #F7847B;
                                }
                                .box-title-text{
                                    font-style: normal;
                                    font-weight: 600;
                                    font-size: 14px;
                                    line-height: 20px;
                                    color: #295086;
                                }
                                h6{
                                    font-style: normal;
                                    font-weight: 600;
                                    font-size: 12px;
                                    line-height: 20px;
                                    color: #295086;
                                }
                                span{
                                    font-style: normal;
                                    font-weight: 600;
                                    font-size: 14px;
                                    line-height: 15px;
                                    text-align: center;
                                    color: #F7847B;
                                    display: inline-block;
                                }
                            }
                            .services-completed-block{
                                display: flex;
                                justify-content: start;
                                align-items: flex-end;
                                margin: -8px;
                                padding-bottom: 15px;
                                &:last-child{
                                    padding-bottom: 6px;
                                }
                                .schedules-text{
                                    flex: 0 0 50%;
                                    padding: 8px;
                                    h6{
                                        color: #29508699;
                                        font-size: 14px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: 12px;
                                        margin-bottom: 8px;
                                    }
                                    p{
                                        color: #295086;
                                        font-size: 15px;
                                        font-style: normal;
                                        font-weight: 400;
                                        line-height: normal;
                                        letter-spacing: 1px;
                                        &.red-text{
                                            color: #F7847B;
                                        }
                                    }
                                }
                            }
                        }
                        .box-wrapper-div{
                            width: calc(100% - 80px);
                            margin: auto;
                            ${mediaQueries("md")`
                                width: 100%;
                            `}
                        }
                        .footer-wrapper{
                            h2{
                                font-style: normal;
                                font-weight: 600;
                                font-size: 16px;
                                line-height: 21px;
                                letter-spacing: 1px;
                                color: #E32C1F;
                                text-align: start;
                                margin-bottom: 0;
                            }
                            h4{
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 21px;
                                letter-spacing: 1px;
                                color: rgba(41, 80, 134, 0.6);
                            }
                        }
                        .failed-payment-detail-wrapper{
                            .user-detail-wrapper{
                                display:flex;
                                align-items: center;
                                margin-bottom: 15px;
                                &:last-child{
                                    margin-bottom: 0px;
                                }
                                .user-info-detail-columns {
                                  display: flex;
                                  flex-direction: column;
                                  .number-block-wrapper {
                                    margin-top: 10px;
                                  }
                                }
                                .user-img{
                                    width: 51px;
                                    height: 51px;
                                    border-radius: 1000px;
                                    background: #e4e4e4;
                                    border: 2px solid #295085;
                                    overflow: hidden;
                                    margin-right: 15px;
                                }
                                h6{
                                    font-style: normal;
                                    font-weight: 600;
                                    font-size: 15px;
                                    line-height: 20px;
                                    color: #295086;
                                    margin-bottom: 3px;
                                }
                                a{
                                    color: #295086;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: normal;
                                    letter-spacing: 1px;
                                }
                                p{
                                    color: #295086;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: normal;
                                    letter-spacing: 1px;
                                }
                                .phone-text{
                                    margin-right: 25px;
                                    width: 145px;
                                }
                                &.number-block-wrapper{
                                    align-items: flex-start;
                                }
                            }
                        }
                        .payment-reminder-details {
                            display: flex;
                            width: 100%;
                            overflow: auto;
                            &::-webkit-scrollbar {
                                /* width: 6px; */
                                height: 6px;
                            }
                            &::-webkit-scrollbar-track {
                                background: #E9DEDE;
                            }
                            &::-webkit-scrollbar-thumb {
                                background: #295086;
                                border-radius:8px;
                            }
                            .payment-reminder-div{
                                flex: 0 0 300px;
                                padding: 0 9px;
                                .payment-detail-list-wrapper{
                                    .box-wrapper-div{
                                        width:100%;
                                    }
                                }
                                .footer-wrapper{
                                    .box-wrapper-div{
                                        width:100%;
                                    }
                                }
                            }
                        }
                    }
                    .download-btn-wrapper{
                        width: 150px;
                        margin: auto;
                        padding: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 500;
                        i{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 18px;
                            height: 18px;
                            margin-left: 10px;
                            svg{
                                width: 100%;
                                height: 100%;
                                display: block;
                            }
                        }
                    }
                }
            }
        }
        &.sitback-payment-reminderV2-modal{
            .modal-dialog{
                max-width: 1200px;
                .Payment-detail-wrapper{
                    .table-responsive{
                        max-height: 500px;
                        // min-height: 300px;
                        overflow: auto;
                        &::-webkit-scrollbar {
                            width: 6px;
                            height: 6px;
                        }
                        &::-webkit-scrollbar-track {
                            background: #E9DEDE;
                        }
                        &::-webkit-scrollbar-thumb {
                            background: #295086;
                        }
                        table{
                            margin-bottom: 0;
                            thead{
                                tr{
                                    th{
                                        background-color: rgb(41, 80, 134);
                                        color: rgb(255, 255, 255);
                                        font-size: 14px;
                                        text-transform: unset;
                                        font-weight: 400;
                                        padding: 12px;
                                        border: none;
                                        min-width: 150px;
                                    }
                                }
                            }
                            tbody{
                                tr{
                                    td{
                                        color: #295086;
                                        vertical-align: middle;
                                        padding: 15px 12px;
                                        font-weight: 500;
                                        border: none;
                                        font-size: 15px;
                                        background: transparent;
                                        .cancelled-text {
                                          font-size: 15px;
                                        }
                                    }
                                }
                            }
                            ${"" /* > :not(caption) > * > *{
                                background: rgba(149, 204, 213, 0.13);
                            }
                            &.table-striped > tbody > tr:nth-of-type(odd) > *{
                                background: #fbf8ed;
                                --bs-table-bg-type: transparent;
                            }
                            &.table-hover > tbody > tr:hover > *{
                                --bs-table-color-state: transparent !important;
                                --bs-table-bg-state: transparent !important;
                            } */
  }
                        }
                    }
                }
            }
        }
    }
    .sitback-insights-payment-wrapper{
        .modal-dialog{
            max-width: 630px;
            .modal-content{
                background: #FAF9ED;
                border-radius: 0;
                .modal-header{
                    padding: 0px !important;
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    z-index: 2;
                }
                .modal-body{
                    .nav{
                        width: 100%;
                        display: flex;
                        border-bottom: 1px solid #E4E4E4;
                        .nav-item{
                            flex: 0 0 50%;
                            .nav-link {
                                background: #FAF9ED;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 18px;
                                line-height: 100%;
                                text-transform: uppercase;
                                color: rgba(41, 80, 134, 0.6);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 18px 15px;
                                border-radius: 0;
                                min-height: 70px;
                                &.active{
                                    background: #95CCD5;
                                    color: #FFFFFF;
                                }
                            }
                        }
                    }
                    .tab-content{
                        min-height: 300px;
                        form{
                            margin: 0;
                            padding: 15px;
                            width: 100%;
                            max-width: 100%;
                            margin-bottom: 15px;
                            .text-danger {
                                display: block;
                                margin-left: 25px;
                                font-size: 12px;
                            }
                        }
                        .payment-input-wrapper{
                            margin-bottom: 12px;
                            label{
                                margin-bottom: 5px;
                            }
                            .card_number{
                                margin-bottom: 15px;
                            }
                            .StripeElement{
                                border-radius: 100px !important;
                                border: 1px solid ${theme.color.border} !important;
                                background: ${theme.color.lightwhite} !important;
                                color: ${theme.color.secondary};
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: normal;
                                padding: 18px 30px !important;
                                outline: none;
                                box-shadow: none;
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                                height: auto;
                                height: 63px !important;
                                padding-top: 22px !important;
                                ${mediaQueries("xl")`
                                    padding: 19px 24px !important;
                                    font-size: 15px;
                                    height: 57px !important;
                                `}
                                ${mediaQueries("lg")`
                                    padding: 16px 24px !important;
                                    font-size: 14px;
                                    height: 51px !important;
                                `}
                                &:-webkit-autofill,
                                &:-webkit-autofill:hover,
                                &:-webkit-autofill:focus,
                                &:-webkit-autofill:active{

                                }
                                &::-ms-input-placeholder {
                                    *{
                                        color: #29508699;
                                        font-weight: 300;
                                    }
                                }
                                &::placeholder {
                                    *{
                                        color: #29508699;
                                        font-weight: 300;
                                    }
                                }
                                &:focus{
                                    color: ${theme.color.secondary};
                                    background-color: ${theme.color.white};
                                    border-color: ${theme.color.border};
                                    outline: 0;
                                    /* box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06); */
                                }
                                input{
                                    color: ${theme.color.secondary} !important;
                                    font-size: 16px !important;
                                    font-style: normal !important;
                                    font-weight: 500 !important;
                                    line-height: normal !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
     .sitback-get-started-modal-wrapper{
        .modal-dialog{
          max-width: 770px !important;
          .modal-content{
            border-radius: 8px;
            border: 1px solid #EAEBEC;
            background: #FFF;
            padding: 40px 50px;
            position: relative;
            ${mediaQueries("xxl")`
              padding: 35px 45px;
            `}
            ${mediaQueries("xl")`
              padding: 30px 40px;
            `}
            ${mediaQueries("lg")`
              padding: 25px 35px;
            `}
            ${mediaQueries("md")`
              padding: 20px 30px;
            `}
            ${mediaQueries("sm")`
              padding: 15px 25px;
            `}
            .modal-header{
              padding: 0;
              justify-content: center;
              margin-bottom: 40px;
              ${mediaQueries("xxl")`
                margin-bottom: 35px;
              `}
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
              .modal-title{
                color: #295086;
                font-size: 26px;
                font-weight: 600;
                line-height: normal;
                text-transform: capitalize;
                text-align: center;
                ${mediaQueries("xxl")`
                  font-size: 24px;
                `}
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
                  font-size: 16px;
                `}
              }
              .btn-close{
                position: absolute;
                top: 20px;
                right: 20px;
                ${mediaQueries("xxl")`
                  top: 18px;
                  right: 18px;
                `}
                ${mediaQueries("xl")`
                  top: 16px;
                  right: 16px;
                `}
                ${mediaQueries("lg")`
                  top: 14px;
                  right: 14px;
                `}
                ${mediaQueries("md")`
                  top: 12px;
                  right: 12px;
                `}
                ${mediaQueries("sm")`
                  top: 10px;
                  right: 10px;
                `}
              }
            }
            .modal-body{
              padding: 0;
              .sitback-get-started-modal-body-wrapper{
                margin-bottom: 20px;
                .happens-box-wrapper{
                  border-radius: 13px;
                  border: 1px solid rgba(0, 123, 255, 0.40);
                  background: #F5FBFF;
                  padding: 8px 8px 20px 8px;
                  height: calc(100% - 20px);
                  margin-bottom: 20px;
                  &.active-box{
                    border-color: #007BFF;
                    box-shadow: 0 8px 7px 0 rgba(41, 80, 134, 0.12);
                  }
                  .happens-box-img-div{
                    border-radius: 10px;
                    background: #FFF;
                    width: 100%;
                    height: 150px;
                    margin-bottom: 15px;
                    ${mediaQueries("md")`
                      height: 130px;
                    `}
                    ${mediaQueries("sm")`
                      height: 100px;
                    `}
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      object-position: center;
                    }
                  }
                    p{
                    color: #295086;
                    text-align: center !important;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;
                  }
                }
              }
            }
              .modal-footer{
                padding: 0;
                border: none;
                justify-content: center;
                button{
                  max-width: 265px;
                  color: #FFF;
                  text-align: center;
                  font-size: 12px;
                  font-weight: 500;
                  line-height: normal;
                  padding: 13px;
                  border-radius: 100px;
                  border: 1px solid #004D87;
                  background: #004D87;
                }
              }
          }
        }
    }
    .addcard-footer-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        button{
            width: 48%;
            padding: 12px 15px;
            font-weight: 500;
            text-transform: uppercase;
            &.cash-payment-btn{
                background: #CBD3D4;
                border-color: #CBD3D4;
            }
        }
    }
    .card_number_input{
        border:1px solid #DEDEDE !important;
        border-radius:5px !important;
        box-shadow:none !important;
        height:60px !important;
        background-color:#ffffff !important;
        background:#ffffff !important;
        padding:20px !important;
        color: ${theme.color.secondary} !important;
        font-size: 16px !important;
        font-style: normal !important;
        font-weight: 500 !important;
        line-height: normal !important;
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 60px ${theme.color.lightwhite} inset !important;
            -webkit-text-fill-color: ${theme.color.secondary};
        }
        &::-ms-input-placeholder {
            color: #29508699 !important;
            font-weight: 300 !important;
        }
        &::placeholder {
            color: #29508699 !important;
            font-weight: 300 !important;
        }
        *{
            color: ${theme.color.secondary} !important;
            font-size: 16px !important;
            font-style: normal !important;
            font-weight: 500 !important;
            line-height: normal !important;
        }
    }
    .expirey_date
    {
      display:flex;
      width:100%;
      .expiry-width
      {
        width:100%;
      }

    }
    .card_number_input_left
    {
      border:1px solid #DEDEDE !important;
      border-right:0.5px solid #DEDEDE !important;
      border-radius:5px !important;

      box-shadow:none !important;
      height:60px !important;
      background-color:#ffffff !important;
      background:#ffffff !important;
      padding:20px !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 36px !important;
      color:#060D01 !important;
      border-end-end-radius: 0px !important;
      border-start-end-radius:0px !important;
      width:100%;
      &::placeholder
      {
        color:#696C66 !important;
      }
      *{
        font-size: 16px !important;
        font-weight: 500 !important;
        line-height: 36px !important;
        color:#060D01 !important;
      }
    }
    .card_number_input_right
    {
      border:1px solid #DEDEDE !important;
      border-radius:5px !important;
      border-end-start-radius:0px !important;
      border-top-left-radius:0px !important;
      border-left:0.5px solid #DEDEDE !important;
      box-shadow:none !important;
      height:60px !important;
      background-color:#ffffff !important;
      background:#ffffff !important;
      padding:20px !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      line-height: 36px !important;
      color:#060D01 !important;
      width:100%;
      &::placeholder
      {
        color:#696C66 !important;
      }

        &.subscriptions-model
        {
          form{
            margin:0px auto;
          }
        }

        &.report-customer
        {
          form{
            max-width:500px !important;
          }
        }
    }
    .tooltip-box-wrapper{
        background: ${theme.color.white};
    }
    .styles-module_dark__xNqje {
      background: ${theme.color.white} !important;
      color: ${theme.color.black} !important;
    }
    .verify-tooltip {
      width: 320px !important;
      p {
        max-width: 100% !important;
      }

    }
    #dob {
      display: inline-block;
      position: relative;
    }
    [type="date"]::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }
    .sitback-bank-details-modal-wrapper{
        background: #afafaea6;
        .modal-dialog{
            max-width: 640px;
            width: 100%;
            margin: auto;
            padding: 0 15px;
            .modal-content{
                background: #F1F0E4;
                border: none;
                border-radius: 8px;
                .modal-header{
                    .modal-title{
                        color: ${theme.color.secondary};
                        font-size: 30px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 100%;
                        text-transform: uppercase;
                        ${mediaQueries("xl")`
                        font-size: 27px;
                        line-height: normal;
                        `}
                        ${mediaQueries("lg")`
                            font-size: 24px;
                            line-height: normal;
                        `}
                        ${mediaQueries("md")`
                            font-size: 22px;
                            line-height: normal;
                        `}
                        ${mediaQueries("sm")`
                            font-size: 20px;
                            line-height: normal;
                        `}
                    }
                }
                .modal-body{
                    form {
                        > div {
                            margin-bottom: 15px;
                        }
                        select{
                            box-shadow: none;
                        }
                        input{
                            box-shadow: none;
                        }
                        button{
                            margin: 20px 0 15px;
                        }
                    }
                }
            }
        }
    }
    .input-password-show-and-hide-wrapper{
        position: relative;
        .input-group-text{
            width: 60px;
            padding: 0;
            background: #fffef6;
            border: none;
            z-index: 1;
            border: 1px solid #DADADA;
            border-radius: 0 100px 100px 0;
            border-left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px;
            overflow: hidden;
            i{
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                width: 24px;
                height: 24px;
                position: relative;
                span{
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: absolute;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    top: 0;
                    i{
                        width: 100%;
                        height: 100%;
                        display: block;
                        svg{
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }
                    &.view-icon{
                        display: none;
                    }
                    &.hide-icon{
                        display: none;
                        top: -3px;
                    }
                }
                &.bx-hide{
                    span{
                        &.hide-icon{
                            display: flex;
                        }
                    }
                }
                &.bx-show{
                    width: 29px;
                    height: 29px;
                    span{
                        &.view-icon{
                            display: flex;
                        }
                    }
                }
            }
        }
    }
    .sidebar-menu-wrapper{
        .offcanvas-body{
            .box-wrapper{
                .service-nemu-list-box{
                    min-height: 130px;
                    i{
                        width: 33px;
                        height: 33px;
                    }
                    h5{
                        font-size: 15px;
                        font-weight: 500;
                    }
                }
                &.sitback-updated-box-wrapper{
                  .service-nemu-list-box{
                    border-radius: 8px;
                    border: 1px solid #EAEBEC;
                    background: #FBFBFB;
                    &:hover{
                      border-color: #007BFF;
                      background: #DFECF9;
                      box-shadow: 0 18px 25px 0 rgba(0, 0, 0, 0.07);
                    }
                    i{
                      svg{
                        path{
                          fill: #295086;
                        }
                      }
                    }
                    h5{
                      color: #004D87;
                      text-transform: uppercase;
                    }
                  }
                }
            }
        }
    }
    .blog-mobile-menu{
        max-width: 340px;
        .login-header-wrapper{
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            a{
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: normal;
                color: #295086;
                display: inline-flex;
                margin-bottom: 30px;
                width: 100%;
                text-align: center;
                justify-content: center;
            }
            button{
                background: ${theme.color.secondary};
                border-color: ${theme.color.secondary};
                width: auto;
                min-width: 100%;
                padding: 15px;
                color: #D7D7D7;
            }
        }
    }
    .loading-btn-wrapper{
        width: 100%;
        padding: 18px;
        border-radius: 100px;
        border: none;
        box-shadow: none;
        outline: none;
        background: ${theme.color.primary};
        color: ${theme.color.white};
        text-align: center;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: uppercase;
        transition: all 0.3s ease-in-out;
        border: 1px solid ${theme.color.primary};
        box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
        &.csvmodal{
          text-transform: unset;
        }
        ${mediaQueries("lg")`
            padding: 16px;
            font-size: 14px;
        `}
        ${mediaQueries("md")`
            padding: 14px;
            font-size: 13px;
        `}
        &:hover{
            opacity: 0.8;
        }
        &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        }
        span{
            display: inline-flex;
            margin-right: 10px;
        }
    }
    .loader-wrapper-home{
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 4;
      background: transparent;
      .spinner-border {
        color: ${theme.color.primary};

      }
    }
    .loader-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 4;
      background: #efecd5b3;
      &.sitback-updated-loader-wrapper{
          background: #DFECF9;
      }
      &.sitback-loader {
        background: #FFF;
      }
      &.background-transparent {
        background: transparent;
      }
      .spinner-border {
        color: ${theme.color.primary};

      }
    }
    .confirm-delete-modal{
      &.sitback-no-show-updated-modal-wrapper{
        .modal-dialog{
          .modal-content{
            border-radius: 24px !important;
            background: #FFF !important;
            box-shadow: 0 4px 40px 0 rgba(156, 156, 156, 0.12) !important;
            .modal-body{
              .sitback-no-show-title-text{
                color: #295086;
                text-align: center;
                font-size: 26px;
                font-weight: 500;
                line-height: 37px;
                text-transform: capitalize;
                ${mediaQueries("xxl")`
                  font-size: 24px;
                  line-height: 35px;
                `}
                ${mediaQueries("lg")`
                  font-size: 22px;
                  line-height: 33px;
                `}
                ${mediaQueries("md")`
                  font-size: 20px;
                  line-height: 31px;
                `}
                ${mediaQueries("sm")`
                  font-size: 18px;
                  line-height: 29px;
                `}
              }
            }
              .modal-footer{
                .sitback-confirm-red-btn{
                  background: #D92D20;
                  border-radius: 100px;
                  color: #FFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: normal;
                }
                .sitback-nevermind-btn-wrapper{
                  border-radius: 100px;
                  border: 1px solid #CFCFCF !important;
                  background: #F2F6F9;
                  color: #004D87;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: normal;
                }
              }
          }
        }
      }
      &.sitback-updated-service-modal-wrapper{
        .modal-dialog{
          .modal-content{
            border-radius: 35px !important;
            border: 0.5px solid #EAEBEC !important;
            background: #FBFBFB !important;
            .modal-footer{
              .confirm-btn-wrapper{
                border-radius: 100px;
                background: #004D87 !important;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
              }
              .cancel-btn-wrapper{
                border-radius: 100px;
                border: 1px solid #CFCFCF;
                background: #F2F6F9 !important;
                color: #004D87;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
              }
            }
          }
        }
      }
        .modal-dialog{
            max-width: 580px;
            .modal-content{
        background: #F1F0E4;
                border: none;
                .modal-header{
                    border: none;
                    padding-top: 60px;
                    .modal-title {
                        width: 100%;
                        text-align: center;
                        border: none;
                        font-size: 25px;
                        font-weight: 600;
                        line-height: 38px;
                        letter-spacing: -0.01em;
                        text-align: center;
                        color: #295086;
                        margin-bottom: -45px;
                    }
                    .btn-close{
                        margin-top: -75px;
                        margin-right: 0;
                        background-image: none;
                        background: #fff url('images/red-close-icon.svg') no-repeat;
                        background-position: center;
                        background-size: 11px;
                        border-radius: 100px;
                        opacity: 1;
                        outline: none;
                        box-shadow: none;
                    }
                }
                .modal-body{
                    font-size: 25px;
                    font-weight: 300;
                    line-height: 35px;
                    letter-spacing: -0.01em;
                    text-align: center;
                    color: #5A6981;
                    margin-top: 20px;
                    h5{
                        font-size: 25px;
                        font-weight: 300;
                        line-height: 35px;
                        letter-spacing: -0.01em;
                        text-align: center;
                        color: #5A6981;
                        margin-top: 20px;
                    }
                }
                .modal-footer{
                    justify-content: center;
                    border: none;
                    margin-bottom: 40px;
                    button{
                        min-width: 180px;
                        margin: 0 8px;
                        border-radius: 100px;
                        padding: 15px;
                        background: #E32C1F;
                        border-color: #E32C1F;
                        &.cancel-btn-wrapper{
                            background: transparent;
                            border-color: #295086;
                            color: #295086;
                        }
                    }
                    &.btn-loader-wrapper {
                      .loading-btn-wrapper {
                        width: auto;
                      }
                    }
                }
            }
        }
        &.confirm-service-modal-wrapper{
            .modal-dialog{
                max-width: 580px;
                .modal-content{
                    background: #F1F0E4;
                    border: none;
                    .modal-header{
                        &.red-close-icon{
                            .btn-close{
                                background-image: none;
                                background: #fff url('images/red-close-icon.svg') no-repeat;
                                background-position: center;
                                background-size: 11px;
                                border-radius: 100px;
                                opacity: 1;
                            }
                        }
                    }
                    .modal-body{
                      &.text {
                        font-size: 18px;
                      }

                    }
                    .modal-footer{
                      &.btn-loader-wrapper {
                        .loading-btn-wrapper {
                          width: auto;
                        }
                      }
                        .btn-primary{
                           background: #95CCD5;
                           border-color: #95CCD5;
                        }
                        .btn-secondary{
                          width: auto;
                          background: #CBD3D4;
                          border-color: #CBD3D4;
                        }
                    }
                }
            }
            .check-in-confirm-modal{
                .sitback-option-modal-wrapper{
                    h5{
                        margin-top: 0;
                        margin-bottom: 5px;
                        font-weight: 600;
                        color: #e32c1f;
                    }
                    p{
                        color: #295086;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                    }
                }
            }
            &.check-in-model{
              .modal-dialog{
                max-width: 450px;
              .confirm-modal-footer {
                margin-bottom: 20px;
                }
              }
            }
        }

    }
    .verify-your-account-modal-wrapper{
        .modal-dialog {
            max-width: 420px !important;
            margin-left: auto;
            margin-right: auto;
            .modal-content{
                background: transparent;
                border: none;
                border-radius: 24px;
                overflow: hidden;
                padding: 0;
                box-shadow: 0 24px 48px rgba(0, 29, 53, 0.18);
            }
            .verify-account-modal-body{
                position: relative;
                padding: 0;
                border: 2px solid #FFFFFF;
                border-radius: 24px;
                overflow: hidden;
                background: #FFFFFF;
            }
            .verify-account-modal-close{
                position: absolute;
                top: 14px;
                right: 14px;
                z-index: 3;
                width: 36px;
                height: 36px;
                padding: 0;
                border: none;
                border-radius: 50%;
                background: #FFFFFF;
                color: #E32C1F;
                font-size: 30px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                transition: transform 0.15s ease, opacity 0.15s ease;
                &:hover{
                    opacity: 0.92;
                }
                &:focus-visible{
                    outline: 2px solid #FFFFFF;
                    outline-offset: 2px;
                }
                span{
                    display: block;
                    margin-top: -2px;
                }
            }
            .verify-account-modal-top{
                background: #004D87;
                padding: 48px 32px 40px;
                min-height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .verify-account-modal-illustration{
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    max-width: 180px;
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                }
            }
            .verify-account-modal-bottom{
                background: #FFFFFF;
                padding: 28px 24px 32px;
                text-align: center;
            }
            h4{
                font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 26px;
                text-align: center;
                letter-spacing: -0.01em;
                color: #27364E;
                max-width: 100%;
                margin: 0 auto;
                width: 100%;
                &.success-modal-title-text{
                  color: #004D87;
                  text-align: center;
                  font-size: 18px;
                  font-weight: 600;
                  line-height: 1.35;
                  margin-bottom: 12px;
                  max-width: 320px;
                }
            }
            p{
                font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                font-style: normal;
                font-weight: 300;
                font-size: 14px;
                line-height: 24px;
                text-align: center;
                letter-spacing: -0.01em;
                color: #5A6981;
                margin: 0 auto 24px;
                &.success-modal-para-text{
                  color: #5A6981;
                  font-size: 15px;
                  font-weight: 400;
                  line-height: 1.5;
                  max-width: 300px;
                }
            }
            .success-modal-btn{
                  width: 100%;
                  max-width: 200px;
                  min-height: 52px !important;
                  margin: 0 auto;
                  display: block;
                  border-radius: 100px !important;
                  border: none !important;
                  background: #004D87 !important;
                  color: #FFF !important;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 600;
                  line-height: normal;
                  text-transform: uppercase;
                  letter-spacing: 0.04em;
            }
        }
    }
    /* utility class to force modal background to white */
    .modal-white-bg{
      .modal-dialog{
        .modal-content{
          background: #FFFFFF !important;
          /* ensure form controls inside modal are white */
          .modal-body{
            .modal-input-white{
              background: #FFFFFF !important;
            }
            input:checked {
              background-color: #295086 !important;
            }


          }
        }
      }
    }
    .complete-booking-modal{
      .modal-dialog{
        .modal-content{
          background: #FFFFFF !important;
          .modal-footer{
            .complete-booking-confirm-btn,
            .loading-btn-wrapper.complete-booking-confirm-btn{
              background: #004B87 !important;
              background-color: #004B87 !important;
              border-color: #004B87 !important;
              color: #ffffff !important;
              &:hover, &:focus, &:active, &:disabled{
                background: #004B87 !important;
                background-color: #004B87 !important;
                border-color: #004B87 !important;
                color: #ffffff !important;
              }
            }
            .complete-booking-cancel-btn,
            .btn-secondary.complete-booking-cancel-btn{
              background: #FFFFFF !important;
              background-color: #FFFFFF !important;
              border: 1px solid #CBD5E1 !important;
              color: #004B87 !important;
              border-radius: 100px !important;
              font-weight: 600 !important;
              &:hover, &:focus, &:active, &:disabled{
                background: #FFFFFF !important;
                background-color: #FFFFFF !important;
                border-color: #004B87 !important;
                color: #004B87 !important;
              }
            }
          }
        }
      }
    }
    .warning-modal-wrapper{
      &.sitback-appointment-table-modal-display-wrapper{
        .modal-dialog{
          max-width: 65%;
          ${mediaQueries("md")`
            max-width: 100%;
          `}
          .modal-content{
            padding: 25px;
            border-radius: 10px;
            background: #FFF;
            .appointment-header-div{
              text-align: center;
              margin-bottom: 20px;
              h4{
                color: #000;
                font-size: 20px;
                font-weight: 800;
                line-height: normal;
                margin-bottom: 15px;
              }
              p{
                color: #57565E;
                font-size: 12px;
                font-weight: 500;
                line-height: normal;
              }
            }
            .modal-body{
              padding: 0;
              .appointment-modal-table-div{
                max-height: 550px;
                overflow-y: auto;
                .table-responsive{
                    &::-webkit-scrollbar {
                      width: 8px;
                    }
                    &::-webkit-scrollbar-track {
                        background: #fafafa;
                        border-radius: 8px;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: #c7c7c7;
                        border-radius: 8px;
                    }
                    @media (prefers-color-scheme: dark) {
                      &::-webkit-scrollbar {
                        width: 8px;
                      }
                      &::-webkit-scrollbar-track {
                          background: #fafafa;
                          border-radius: 8px;
                      }
                      &::-webkit-scrollbar-thumb {
                          background: #c7c7c7;
                          border-radius: 8px;
                      }
                    }
                }
                .table{
                  &.table-striped > tbody > tr:nth-of-type(odd) > *{
                    --bs-table-bg-type: transparent;
                  }
                  &.table-striped > tbody > tr:nth-of-type(even) > *{
                    --bs-table-bg-type: #F8F8FB;
                  }
                  thead{
                    tr{
                      th{
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 16px;
                        color: #57565E;
                      }
                    }
                  }
                  tbody{
                    tr{
                      &.notification-tr-display-wrapper{
                        td{
                          background: #FFF3F4 !important;
                          --bs-table-bg-type: #FFF3F4 !important;
                        }
                      }
                      td{
                        font-weight: 700;
                        font-size: 12px;
                        line-height: 16px;
                        color: #57565E;
                        padding: 18px 12px;
                        vertical-align: middle;
                        border: none;
                        &:first-child{
                          border-top-left-radius: 12px;
                          border-bottom-left-radius: 12px;
                        }
                        &:last-child{
                          border-top-right-radius: 12px;
                          border-bottom-right-radius: 12px;
                        }
                        .notification-icon-wrapper{
                            width: 24px;
                            height: 24px;
                            overflow: hidden;
                            img{
                              width: 100%;
                              height: 100%;
                              object-fit: contain;
                              object-position: center;
                            }
                          }
                        .mobile-number-text{
                          color: #8A8A8F;
                          font-size: 12px;
                          font-weight: 400;
                          line-height: 16px;
                          margin-top: 2px;
                        }
                        .appointment-name-text{
                          font-weight: 700;
                          font-size: 16px;
                          line-height: 16px;
                          color: #57565E;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          max-width: 125px;
                        }
                        p{
                          font-weight: 700;
                          font-size: 16px;
                          line-height: 16px;
                          letter-spacing: 0px;
                          color: #57565E;
                          ${mediaQueries("md")`
                            font-size: 15px;
                          `}
                          ${mediaQueries("sm")`
                            font-size: 14px;
                          `}
                        }
                        .appointment-status{
                          border-radius: 100px;
                          font-weight: 700;
                          font-size: 9px;
                          line-height: 16px;
                          min-width: 75px;
                          padding: 5px 12px;
                          text-transform: capitalize;
                          &.rejected{
                            color: #E95060;
                            background: #FFEDEF;
                          }
                          &.pastbooking{
                            color: #E95060;
                            background: #FFEDEF;
                          }
                          &.pending{
                            color: #295086;
                            background: #E1E1EF;
                          }
                          &.approved{
                            color: #4A9D77;
                            background: #E2F4EC;
                          }
                        }
                        .appoint-table-btn-div{
                          display: flex;
                          align-items: center;
                          .appointment-status-active-div{
                            display: flex;
                            align-items: center;
                            span{
                              min-width: 115px;
                              padding: 7px 15px;
                              font-weight: 500;
                              font-size: 12px;
                              line-height: 16px;
                              text-align: center;
                              text-transform: uppercase;
                              border-radius: 25px;
                              opacity: 0.38;
                              color: #FBFBFB;
                              &.declined{
                                color: #E95060;
                                background: #FFE0E4;
                                &.not-confirmed-span-wrapper{
                                  white-space: nowrap;
                                }
                              }
                              &.accepted{
                                background: #6BBE99;
                              }
                            }
                            .edit-remove-btn-wrapper{
                              background: transparent;
                              padding: 0;
                              border: none;
                              min-width: 20px;
                              height: auto;
                              overflow: hidden;
                              margin-left: 4px;
                              &.edit-pencil-icon{
                                border: 1px solid #d4d4d6;
                                padding: 3px;
                                height: 20px;
                                border-radius: 1000px;
                                min-width: unset;
                                width: 20px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              }
                              img{
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                                object-position: center;
                              }
                            }
                          }
                          .btn-wrapper{
                            font-weight: 500;
                            font-size: 12px;
                            line-height: 16px;
                            text-transform: uppercase;
                            border-radius: 25px;
                            min-width: 100px;
                            padding: 7px 12px;
                            background: #95CCD5;
                            color: #FFFFFF;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: none;
                            &.declined{
                              color: #E95060;
                              background: #FFE0E4;
                              margin-left: 12px;
                            }
                            &.suggest-btn{
                              margin-left: 24px;
                            }
                          }
                          .confirmation-select-wrapper{
                            display: flex;
                            align-items: center;
                            .confirmation-dropdown{
                              min-width: 115px;
                              max-width: 115px;
                              max-height: 30px;
                              padding: 6px 15px 6px 10px;
                              border-radius: 25px;
                              font-weight: 500;
                              font-size: 11px;
                              line-height: 16px;
                              border-color: #dee2e6;
                              &:focus{
                                box-shadow: none;
                                outline: none;
                                border-color: #dee2e6;
                              }
                            }
                            .save-btn{
                              margin-left: 12px;
                              min-width: 70px;
                              font-weight: 500;
                              font-size: 12px;
                              line-height: 16px;
                              text-align: center;
                              text-transform: uppercase;
                              border-radius: 25px;
                              background: #95CCD5;
                              border: none;
                              padding: 7px 12px;
                            }
                          }
                          .accept-decline-icon-btn-div{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            min-width: 100px;
                            &.decline-btn-display-div{
                              justify-content: flex-end;
                            }
                            &.accept-btn-display-div{
                              justify-content: flex-start;
                            }
                            .accept-btn{
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
                            .decline-btn{
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
                      }
                    }

                  }
                }
              }
            }
          }
        }
      }
        .modal-dialog{
            max-width: 480px;
            .modal-content{
                background: ${theme.color.white};
                .modal-body{
                    .sitback-request-modal-wrapper{
                        text-align: center;
                        min-height: 220px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        &.card-expired-modal-wrapper{
                          min-height: 200px !important;
                        }
                        h5{
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 30px;
                            letter-spacing: 1px;
                            color: #E32C1F;
                            margin-bottom: 15px;
                        }
                        p{
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 30px;
                            letter-spacing: 1px;
                            text-align: center;
                            color: #4D6B93;
                            margin-bottom: 15px;
                        }
                        span{
                            font-size: 16px;
                            font-weight: 400;
                            line-height: normal;
                            letter-spacing: 1px;
                            text-align: center;
                            color: #295086;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                    .sitback-option-modal-wrapper{
                        text-align: center;
                        min-height: 220px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        h5{
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 30px;
                            letter-spacing: 1px;
                            color: #295086;

                            margin-bottom: 15px;
                        }
                        p{
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 30px;
                            letter-spacing: 1px;
                            text-align: center;
                            color: #4D6B93;
                            margin-bottom: 15px;
                        }
                        span{
                            font-size: 16px;
                            font-weight: 400;
                            line-height: normal;
                            letter-spacing: 1px;
                            text-align: center;
                            color: #295086;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                    .support-spa-btn{
                      font-weight: 500;
                      font-size: 16px;
                      line-height: 100%;
                      letter-spacing: 0px;
                      text-align: center;
                      text-transform: uppercase;
                      color: #FFFFFF;
                      background: #95CCD5;
                      min-width: 180px;
                      padding: 16px 12px;
                      border: none;
                      border-radius: 25px;
                      margin-top: 20px;
                      ${mediaQueries("sm")`
                        min-width: 180px;
                        font-size: 14px;
                      `}
                    }
                }
            }
        }
    }
    .subscriptions-cancel-popup-wrapper{
        .modal-dialog{
            max-width: 800px !important;
            .modal-content{
                .modal-body{
                    .sitback-request-modal-wrapper{
                        .text-wrapper{
                            h6{
                                font-weight: 500;
                                font-size: 40px;
                                line-height: normal;
                                color: ${theme.color.secondary};
                                text-align: center;
                                letter-spacing: -0.01em;
                            }
                            h4{
                                font-style: normal;
                                font-weight: 500;
                                font-size: 27px;
                                line-height: normal;
                                text-align: center;
                                letter-spacing: -0.01em;
                                color: ${theme.color.secondary};
                                margin-bottom: 20px;
                            }
                            p{
                                font-weight: 300;
                                font-size: 18px;
                                width: 100%;
                                max-width: 80%;
                            }
                        }
                        .btn-wrapper{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            margin-top: 50px;
                            .loading-btn-wrapper{
                                margin-bottom: 15px;
                                background: #295086;
                            }
                            button{
                                max-width: 400px;
                                margin: auto 15px;
                                &.text-btn{
                                    background: transparent;
                                    border: none;
                                    box-shadow: none;
                                    padding: 12px;
                                    width: auto;
                                    max-width: unset;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: 24px;
                                    text-align: center;
                                    color: #29508699;
                                    text-decoration: underline;
                                }
                            }
                        }
                        .cancellation-modal-wrapper{
                            margin-top: 18px;
                            h4{
                                text-align: center;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 20px;
                                line-height: normal;
                                text-align: center;
                                letter-spacing: -0.01em;
                                color: ${theme.color.secondary};
                            }
                            .form-check-wrapper-div{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: 0;
                                margin-top: 6px;
                                .form-check{
                                    margin: 0 10px;
                                    display: flex;
                                    align-items: center;
                                    .form-check-input{
                                        width: 24px;
                                        height: 24px;
                                        margin-right: 10px;
                                        &:checked {
                                            background-color: #95ccd5;
                                            border-color: #95ccd5;
                                        }
                                        &:focus{
                                            box-shadow: none;
                                        }
                                    }
                                    .form-check-label{
                                        margin-top: 4px;
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 15px;
                                        line-height: normal;
                                        letter-spacing: -0.01em;
                                        color: ${theme.color.secondary};
                                    }
                                }
                            }
                            .btn-wrapper{
                                margin-top: 26px;
                            }
                        }
                    }
                }
            }
        }
    }
    .viewmore{
      display: flex;
      align-items: center;
      justify-content: center;
      .viewmore-text-btn{
        color: ${theme.color.secondary};
        font-size: 16px;
        font-style: normal;
        cursor:pointer;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 1px;
        display: inline-flex;
      }
    }
    .rc-time-picker-panel-combobox {
      .rc-time-picker-panel-select:not(:first-child) {
        display: flex;
        align-items: flex-start;
        height: 144px;
      }
    }
    .addnew-client-wrapper{
        .table-responsive{
            ${"" /* min-height: 500px; */}
            table{
                margin-bottom: 0;
                thead{
                    tr{
                        th{
                            background-color: ${theme.color.secondary};
                            color: ${theme.color.white};
                            font-size: 14px;
                            text-transform: unset;
                            font-weight: 400;
                            padding: 12px;
                            border: none;
                        }
                    }
                }
                tbody{
                    tr{
                        td{
                            color: #29508699;
                            vertical-align: middle;
                            padding: 15px 12px;
                            font-weight: 300;
                            border: none;
                            .dropdown{
                                .dropdown-toggle {
                                    background: transparent !important;
                                    outline: none;
                                    box-shadow: none;
                                    border: none;
                                    padding: 0;
                                    &::after{
                                        content: unset;
                                    }
                                    i{
                                        width: 24px;
                                        height: 24px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        svg{
                                            width: 100%;
                                            height: 100%;
                                            display: block;
                                            path{
                                                fill: #29508699;
                                            }
                                        }
                                    }
                                }
                                .dropdown-menu {
                                    width: 126px;
                                    max-width: unset;
                                    min-width: auto;
                                    .dropdown-item{
                                        border-bottom: 1px solid #29508633;
                                        font-weight: 400;
                                        &:last-child{
                                            border-bottom: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                > :not(caption) > * > *{
                    background: rgba(149, 204, 213, 0.13);
                }
                &.table-striped > tbody > tr:nth-of-type(odd) > *{
                    background: #fbf8ed;
                    --bs-table-bg-type: transparent;
                }
                &.table-hover > tbody > tr:hover > *{
                    --bs-table-color-state: transparent !important;
                    --bs-table-bg-state: transparent !important;
                }
            }
        }
        &.table-scroll-added-wrapper{
            position: relative;
            .table-responsive{
                max-height: 500px;
                min-height: 300px;
                &::-webkit-scrollbar {
                width: 10px;
                }
                &::-webkit-scrollbar-track {
                    background: #E9DEDE;
                }
                &::-webkit-scrollbar-thumb {
                    background: #295086;
                }
                table{
                    thead{
                        position: sticky;
                        top: 0;
                    }
                }
            }
                .pageScroll{
                &::-webkit-scrollbar {
                width: 10px;
                }
                &::-webkit-scrollbar-track {
                    background: #E9DEDE;
                }
                &::-webkit-scrollbar-thumb {
                    background: #295086;
                }
                    .table-responsive{
                max-height: unset;
                min-height: unset;
                overflow-x: unset;
                }
                }
        }

    }
    .sitback-scheduler-modal-wrapper{
        .modal-dialog{
            max-width: 680px;
            .modal-content{
                background: #FBFBFB;
                .modal-header{
                    border-color: #2950864d;
                    padding: 12px 15px;
                    min-height: 98px;
                    .modal-title {
                        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                        font-size: 25px;
                        font-weight: 600;
                        line-height: 38px;
                        letter-spacing: -0.01em;
                        color: ${theme.color.secondary};
                        width: calc(100% - 150px);
                        margin: 0 auto;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .logo-wrapper{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 92px;
                        height: 80px;
                        ${"" /* margin: auto;
                        position: absolute; */
  }
                        right: 0;
                        left: 0;
                    }
                    &.red-close-icon{
                        .btn-close{
                            background-image: none;
                            background: #fff url('/images/red-close-icon.svg') no-repeat;
                            background-position: center;
                            background-size: 13px;
                            border-radius: 100px;
                            opacity: 1;
                            margin-right: 6px;
                            margin-left: 0;
                            position: absolute;
                            right: 10px;
                            top: 24px;
                        }
                    }
                }
                .marging-bottom-wrapper{
                    input{
                        background: ${theme.color.white};
                        box-shadow: none;
                        &::-ms-input-placeholder {
                            color: #29508699;
                            font-weight: 300;
                        }
                        &::placeholder {
                            color: #29508699;
                            font-weight: 300;
                        }
                    }
                }
                .app-store-wrapper{
                padding: 15px 0 35px 0px;
                max-width: 425px;
                width: 100%;
                margin: auto;
                .app-store-btns-wrapper{
                    display: flex;
                    flex-direction: column;
                    .app-store-btn{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        max-width: 200px;
                        width: 100%;
                        margin: auto;
                        height: 73px;
                        overflow: hidden;
                        margin-bottom: 30px;
                        border-radius: 9px;
                        border-radius: 9px;
                        background: #23201f;

                        ${mediaQueries("lg")`
                            height: 63px;
                            max-width: 220px;
                            margin-bottom: 25px;
                        `}
                        ${mediaQueries("md")`
                            height: 50px;
                            max-width: 180px;
                            margin-bottom: 20px;
                        `}
                        &:last-child{
                            margin-bottom: 35px;
                        }
                    }
                }
              }
            }
        }
        &.congrats-modal-wrapper{
            .modal-dialog{
                .modal-content{
                    .red-close-icon{
                        display: flex;
                        justify-content: flex-end;
                        border: none;
                        min-height: 60px;
                    }
                }
            }
        }
        &.reviewyourdetails-modal{
            .modal-dialog{
                .modal-content{
                    background: ${theme.color.white};
                    .reviewyourdetails-wrapper{
                        padding: 0;
                        .reviewyourdetails-header{
                            display:flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            padding: 18px;
                            h5{
                                font-size: 20px;
                                font-weight: 500;
                                line-height: 20px;
                                text-align: left;
                                color: ${theme.color.secondary};
                                ${mediaQueries("lg")`
                                    font-size: 18px;
                                `}
                                ${mediaQueries("md")`
                                    font-size: 16px;
                                `}
                                ${mediaQueries("sm")`
                                    font-size: 15px;
                                `}
                            }
                            h6{
                                font-size: 20px;
                                font-weight: 600;
                                line-height: 20px;
                                text-align: left;
                                color: ${theme.color.secondary};
                                ${mediaQueries("lg")`
                                    font-size: 18px;
                                `}
                                ${mediaQueries("md")`
                                    font-size: 16px;
                                `}
                                ${mediaQueries("sm")`
                                    font-size: 15px;
                                `}
                            }
                        }
                        .reviewyourdetails-block{
                            padding: 18px;
                            ${'' /* background: #FBFBFB; */}
                            .reviewyourdetails{
                                margin-bottom: 30px;
                                h4{
                                    font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: 24px;
                                    letter-spacing: 1px;
                                    color: ${theme.color.secondary};
                                    margin-bottom: 15px;
                                }
                                h3{
                                    font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                    font-size: 16px;
                                    font-weight: 400;
                                    line-height: 12px;
                                    opacity: 0.6;
                                    color: ${theme.color.secondary};
                                    margin-bottom: 12px;
                                    word-break: break-word;
                                    ${mediaQueries("md")`
                                        font-size: 15px;
                                    `}
                                    ${mediaQueries("sm")`
                                        font-size: 14px;
                                    `}
                                }
                                p{
                                    font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                    font-size: 18px;
                                    font-weight: 400;
                                    line-height: normal;
                                    color: ${theme.color.secondary};
                                    word-break: break-word;
                                    ${mediaQueries("lg")`
                                    font-size: 17px;
                                    `}
                                    ${mediaQueries("md")`
                                        font-size: 15px;
                                    `}
                                    ${mediaQueries("sm")`
                                        font-size: 14px;
                                    `}
                                }
                                ul{
                                    display: flex;
                                    justify-content: space-between;
                                    margin-bottom: 26px;
                                    li{
                                        ${mediaQueries("sm")`
                                            flex: 0 0 50%;
                                        `}
                                        &:first-child{
                                            flex: 1;
                                            ${mediaQueries("sm")`
                                                flex: 0 0 50%;
                                            `}
                                        }
                                        &:last-child{
                                            flex: 0 0 200px;
                                            ${mediaQueries("sm")`
                                                flex: 0 0 50%;
                                            `}
                                        }
                                        .flex-text-wrapper{
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-between;
                                            max-width: 405px;
                                            width: 100%;
                                            p{
                                                ${mediaQueries("xs")`
                                                    flex: 0 0 50%;
                                                `}
                                                &:last-child{
                                                    min-width: 80px;
                                                    margin-left: 10px;
                                                }
                                            }
                                        }
                                    }
                                    &.employee-time-list{
                                        justify-content: unset;
                                        li{
                                            flex: 0 0 330px;
                                            margin-right: 15px;
                                            ${mediaQueries("sm")`
                                                flex: 0 0 50%;
                                            `}
                                            h3 {
                                              span{
                                                font-size: 12px;
                                              }
                                            }
                                        }
                                        li:last-child {
                                         ${mediaQueries("sm")`
                                                flex: 0 0 100%;
                                        `}
                                        }

                                    }
                                }
                            }
                            .booking-confirms-block{
                                h3{
                                    font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                    font-size: 16px;
                                    font-weight: 500;
                                    line-height: 24px;
                                    letter-spacing: 1px;
                                    color: ${theme.color.secondary};
                                    margin-bottom: 6px;
                                    ${mediaQueries("md")`
                                    font-size: 15px;
                                    `}
                                    ${mediaQueries("sm")`
                                        font-size: 14px;
                                    `}
                                }
                                .note-text{
                                    ${mediaQueries("md")`
                                        font-size: 14px;
                                    `}
                                    ${mediaQueries("sm")`
                                        font-size: 12px;
                                    `}
                                }
                                ul{
                                    display: inline-flex;
                                    flex-direction: column;
                                    li{
                                        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: normal;
                                        opacity: 0.6;
                                        color: ${theme.color.secondary};
                                        margin-bottom: 12px;
                                        ${mediaQueries("md")`
                                        font-size: 15px;
                                        `}
                                        ${mediaQueries("sm")`
                                            font-size: 14px;
                                        `}
                                    }
                                }
                                .confirm-footer-wrapper{
                                    display: flex;
                                    align-items: center;
                                    margin-top: 15px;
                                    justify-content: space-between;
                                    button{
                                        flex: 0 0 48.5%;
                                    }
                                }
                            }
                        }
                        .simplicity-detail-wrapper{
                            padding: 21px;
                            .text-center{
                                margin-bottom: 12px;
                                h5{
                                    font-style: normal;
                                    font-weight: 700;
                                    font-size: 20px;
                                    line-height: 35px;
                                    letter-spacing: -0.01em;
                                    color: #295086;
                                }
                            }
                            .blue-box-row{
                                display: flex;
                                margin: -12px;
                                max-width: 590px;
                                margin: auto;
                                flex-wrap: wrap;
                                ${mediaQueries("xs")`
                                    justify-content: center;
                                `}
                                ${mediaQueries("md")`
                                   margin: -6px;
                                `}
                                ${mediaQueries("sm")`
                                    max-width: unset;
                                `}
                                .box-col{
                                    flex: 0 0 33.33%;
                                    padding: 12px;
                                    ${mediaQueries("md")`
                                        padding: 6px;
                                    `}
                                    ${mediaQueries("xs")`
                                        flex: 0 0 50%;
                                    `}
                                    .bluebox-wrapper{
                                        padding: 22px;
                                        background-color: #E8FBFE;
                                        border-radius: 9px;
                                        width: 100%;
                                        height: 100%;
                                        .iconbox{
                                            width: 50px;
                                            height: 50px;
                                            margin: 0 auto 10px;
                                            overflow: hidden;
                                        }
                                        p{
                                            font-style: normal;
                                            font-weight: 400;
                                            font-size: 13px;
                                            line-height: 18px;
                                            text-align: center;
                                            letter-spacing: -0.01em;
                                            color: #295086;
                                        }
                                    }
                                }
                            }
                        }
                        .review-details-wrapper{
                            .header-bar-primary{
                                background: #295086;
                                padding: 12px;
                                &.text-center{
                                    margin-bottom: 0px;
                                    h5{
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 20px;
                                        line-height: 35px;
                                        letter-spacing: -0.01em;
                                        color: #fff;
                                    }
                                }
                            }
                            .calender-wrapper{
                                .date-and-text{
                                    padding: 12px 18px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    border-bottom: 1px solid #D5DCE5;
                                    h2{
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 14px;
                                        line-height: normal;
                                        color: #295086;
                                    }
                                    h3{
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 13px;
                                        line-height: 20px;
                                        color: rgba(41, 80, 134, 0.6);
                                        max-width: 250px;
                                        width: 100%;
                                        text-align:center;
                                    }
                                }
                            }
                        }
                        .confirm-footer-wrapper{
                            max-width: 466px;
                            margin: 25px auto;
                            display: flex;
                            align-items: center;
                            width: 100%;
                            padding: 0 9px;
                            button{
                                margin: 0 9px;
                            }
                        }
                    }
                }
            }
            .checkbox-wrapperv5{
                display: flex;
                align-items: center;
                padding-top: 5px;
                input{
                    width: 18px;
                    height: 18px;
                    margin-right: 12px;
                    margin-top: -2px;
                    border-color: transparent;
                    border-width: 4px;
                    border-radius: 2px;
                    &:focus {
                        border-color: transparent;
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
                            width: 6px;
                            height: 10px;
                            border: solid white;
                            border-width: 0 2px 2px 0;
                            -webkit-transform: rotate(45deg);
                            -ms-transform: rotate(45deg);
                            transform: rotate(45deg);
                        }
                    }
                }
                &.checkbox-border-div{
                    margin-top: -25px;
                    input{
                        background: #ececec;
                        &:checked{
                            background-color: #295086;
                        }
                    }
                }
            }
            .checkbox-wrapperv5-text {
                font-size: 14px;
                font-weight: 300;
                line-height: 18px;
                letter-spacing: 1px;
                text-align: center;
                color: #295086B2;
                ${mediaQueries("sm")`
                    text-align: start;
                    font-size: 12px;
                `}
                ${mediaQueries("xs")`
                    text-align: start;
                    font-size: 11.5px;
                    letter-spacing: 0px;
                `}
            }
        }
        &.sitback-mobile-view-accordion-modal{
          .modal-dialog{
            .modal-content{
              ${mediaQueries("sm")`
                border-radius: 10px;
                border: 1px solid #EBECED;
                background: #FFF;
                box-shadow: 0 4px 82px 13px rgba(190, 190, 190, 0.25);
              `}
              .modal-header{
                min-height: 40px;
                border: none;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
                ${mediaQueries("sm")`
                  border-bottom: 1px solid #EBECED;
                  padding-bottom: 20px;
                `}
                .modal-title-text{
                  font-weight: 600;
                  font-size: 18px;
                  line-height: 32px;
                  color: #295086;
                  display: flex;
                  align-items: center;
                  .filter-icon-title-wrapper{
                    width: 28px;
                    height: auto;
                    overflow: hidden;
                    display: block;
                    margin-right: 8px;
                    margin-bottom: 5px;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                }
                .btn-close{
                  border: 1px solid #EFEFEF;
                  width: 20px;
                  height: 20px;
                  margin-right: 0;
                  position: unset;
                  right: unset;
                  top: unset;
                }
                .apply-filter-btn-wrapper{
                  position: absolute;
                  right: 60px;
                  top: 17px;
                  max-width: 115px;
                  border-radius: 100px;
                  background: #004D87;
                  color: #FFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  color: #FFFFFF;
                }
              }
              .modal-body{
                ${mediaQueries("sm")`
                  padding: 16px 0;
                `}
                .filter-sidebar-wrapper{
                  .accordion{
                    max-width: 380px;
                    margin: auto;
                    width: 100%;
                    border: none;
                    border-radius: 0;
                    border-bottom: 0.5px solid #29508699;
                    margin-bottom: 6px;
                    padding-bottom: 12px;
                    ${mediaQueries("lg")`
                      max-width: 48%;
                      margin-top: 0;
                    `}
                    ${mediaQueries("sm")`
                      max-width: 100%;
                      border-color: #EBECED;
                    `}
                    .accordion-item{
                      border: none;
                      background: transparent;
                      ${mediaQueries("sm")`
                        padding: 0 30px;
                      `}
                      .accordion-header{
                        border: none;
                        .accordion-button{
                          background: transparent;
                          border: none;
                          outline: none;
                          box-shadow: none;
                          padding: 12px 0 3px;
                          color: #295086;
                          font-weight: 500;
                          font-size: 16px;
                          letter-spacing: 1px;
                          ${mediaQueries("sm")`
                            font-size: 18px;
                            font-weight: 500;
                            line-height: 30px;
                          `}
                          i{
                            display: none;
                            ${mediaQueries("sm")`
                              margin-right: 7px;
                              display: block;
                            `}
                          }
                          &::after{
                            content: unset;
                          }
                          &::before{
                            content: '';
                            position: absolute;
                            background: url("images/down-arrow-icon.svg") no-repeat;
                            background-position: center;
                            background-size: 15px;
                            right: 22px;
                            width: 18px;
                            height: 18px;
                            transform: rotate(-180deg);
                          }
                          &.collapsed{
                            &::before{
                              transform: rotate(0deg);
                            }
                          }
                        }
                      }
                      .accordion-collapse{
                        border-radius: 0;
                        .accordion-body{
                          padding: 12px 0 0;
                          ${mediaQueries("sm")`
                             padding: 0;
                          `}
                          .price-range-div{
                            margin-bottom: 0;
                          }
                          .service-select-div{
                            margin-bottom: 0;
                          }
                          .date-available-input{
                            margin-bottom: 0;
                            input{
                              color: #295086b2;
                            }
                          }
                          .time-select-div{
                            margin-bottom: 0;
                          }
                          .sitback-select2-container{
                            .sitback-select-option__control{
                              padding: 8px 15px;
                              background: transparent;
                              border-color: #29508699;
                              ${mediaQueries("sm")`
                                border: none;
                                padding: 0;
                              `}
                              .sitback-select-option__indicators {
                                .sitback-select-option__indicator{
                                  padding: 0;
                                  position: relative;
                                  &::before{
                                    content: '';
                                    position: absolute;
                                    background: url("images/down-arrow-icon.svg") no-repeat;
                                    background-position: center;
                                    background-size: 15px;
                                    right: 7px;
                                    width: 18px;
                                    height: 18px;
                                    top: 0;
                                    bottom: 0;
                                    margin: auto;
                                    ${mediaQueries("sm")`
                                      display: none;
                                    `}
                                  }
                                  svg{
                                    display: none;
                                  }
                                }
                              }
                            }
                            &.sitback-select-option--is-disabled{
                              cursor: not-allowed;
                              .sitback-select-option__control{
                                background: #f6f6f6;
                                border-color: #f6f6f6;
                                .sitback-select-option__single-value{
                                  color: #d0d0d0;
                                }
                              }
                            }
                            .sitback-select-option__menu {
                              z-index: 50;
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
                          }
                          .prise-text{
                            display: flex;
                            p{
                              font-weight: 500;
                              font-size: 16px;
                              line-height: 24px;
                              letter-spacing: 1px;
                              color: #29508699;
                              ${mediaQueries("sm")`
                                color: ${theme.color.logintitlecolor};
                                font-size: 14px;
                                font-weight: 500;
                                line-height: 30px;
                              `}

                            }
                          }
                          .date-available-input{
                            position: relative;
                            .datepicker{
                              padding: 15.5px 15px;
                              background: transparent;
                              border-color: #29508699;
                              box-shadow: none;
                              ${mediaQueries("sm")`
                                border: none;
                                padding: 0;
                              `}
                            }
                            .calendarv2-wrapper-div{
                              /* top: 60px;
                              bottom: 0;
                              left: 15px; */
                              top: auto;
                              bottom: 50px;
                              left: 15px;
                            }
                          }
                        }
                      }
                      .range-slider{
                        height: 5px;
                        margin-top: 12px;
                        ${mediaQueries("sm")`
                          border-radius: 100px;
                          height: 3px;
                          background: rgba(41, 80, 134, 0.43);
                        `}
                        .range-slider__thumb{
                          background-color: #29508699;
                          width: 32px;
                          height: 32px;
                          position: absolute;
                          z-index: 3;
                          ${mediaQueries("sm")`
                            width: 10px;
                            height: 10px;
                            background: ${theme.color.secondary};
                          `}
                          &::before{
                            position: absolute;
                            content: '';
                            width: 18px;
                            height: 18px;
                            background-color: #295086;
                            border-radius: 1000px;
                            right: 0;
                            top: 0;
                            left: 0;
                            bottom: 0;
                            margin: auto;
                            z-index: 1;
                          }
                        }
                        .range-slider__range{
                          background-color: #295086;
                          ${mediaQueries("sm")`
                            background: ${theme.color.secondary};
                          `}
                        }
                      }
                      .prise-text{
                        margin-top: 21px;
                        p{
                          font-style: normal;
                          font-weight: 500;
                          font-size: 16px;
                          line-height: 24px;
                          letter-spacing: 1px;
                          color: #29508699;
                        }
                      }
                    }
                  }
                  .clear-filter-btn{
                    display:flex;
                    justify-content:flex-start !important;
                    &.clear-filter-mobile-view{
                      justify-content: flex-end;
                      align-items: center;
                      margin-top: 30px;
                      ${mediaQueries("sm")`
                        padding: 0 30px;
                      `}
                      .show-result-link{
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: normal;
                        letter-spacing: 1px;
                        text-decoration-line: underline !important;
                        color: #295086;
                        display: none;
                      }
                      p{
                        margin-top: 0;
                        font-size: 14px;
                      }
                    }
                    p{
                      font-style: normal;
                      font-weight: 500;
                      font-size: 18px;
                      line-height: normal;
                      letter-spacing: 1px;
                      text-decoration-line: underline !important;
                      color: #295086;
                      margin-top: 15px;
                      cursor: pointer;
                      margin-right: 9px;
                    }
                  }
                }
              }
            }
          }
        }
        &.sitback-download-app-modal-wrapper{
          .modal-dialog{
            .modal-content{
              border-radius: 35px;
              background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
              .modal-header{
                min-height: 40px;
                border: none;
              }
              .modal-body{
                .login-above-image-div{
                  width: 100%;
                  margin: auto;
                  height: 200px;
                  background: url("/images/booking-flow-bg-image.svg") no-repeat;
                  background-position: center;
                  background-size: cover;
                  background-color: #DFECF9;
                  border: 1px solid rgba(0, 123, 255, 0.20);
                  border-radius: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 20px;
                  ${mediaQueries("md")`
                    height: 160px;
                  `}
                  ${mediaQueries("sm")`
                    height: 115px;
                  `}
                  .login-logo-div{
                    width: 145px;
                    height: auto;
                    overflow: hidden;
                    display: block;
                    ${mediaQueries("md")`
                      width: 135px;
                    `}
                    ${mediaQueries("sm")`
                      width: 112px;
                    `}
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                }
                .congrats-block-wrapper{
                  max-width: 100%;
                }
                .app-store-wrapper{
                  display: flex;
                  align-items: center;
                  max-width: 100%;
                  padding: 0;
                  ${mediaQueries("sm")`
                    flex-direction: column;
                  `}
                  .app-store-modal-title-text{
                    color: #004D87;
                    font-size: 17px;
                    font-weight: 300;
                    line-height: 25px;
                    text-align: left;
                    max-width: 310px;
                    width: 100%;
                    margin-bottom: 0;
                    ${mediaQueries("sm")`
                      text-align: center;
                      margin-bottom: 24px;
                    `}
                  }
                  .app-store-btns-wrapper{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: flex-end;
                    flex: 1;
                    .app-store-btn{
                      background: transparent;
                      border: none;
                      margin: 0;
                      max-width: 120px;
                      height: auto;
                      &.app-store-spacing{
                        margin-right: 10px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        &.sitback-updated-complete-booking-modal{
          .modal-dialog{
            .modal-content{
              border-radius: 35px;
              background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
              .modal-header{
                min-height: 40px;
                border: none;
              }
              .modal-body{
                .login-above-image-div{
                  width: 100%;
                  margin: auto;
                  height: 200px;
                  background: url("/images/booking-flow-bg-image.svg") no-repeat;
                  background-position: center;
                  background-size: cover;
                  background-color: #DFECF9;
                  border: 1px solid rgba(0, 123, 255, 0.20);
                  border-radius: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 50px;
                  ${mediaQueries("md")`
                    height: 160px;
                  `}
                  ${mediaQueries("sm")`
                    height: 115px;
                  `}
                  .login-logo-div{
                    width: 145px;
                    height: auto;
                    overflow: hidden;
                    display: block;
                    ${mediaQueries("md")`
                      width: 135px;
                    `}
                    ${mediaQueries("sm")`
                      width: 112px;
                    `}
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                }
                h4{
                  color: #004D87;
                  font-size: 22px;
                  font-weight: 500;
                  line-height: 100%;
                  margin-bottom: 24px;
                  ${mediaQueries("md")`
                    font-size: 21px;
                  `}
                  ${mediaQueries("sm")`
                    font-size: 20px;
                  `}
                }
                p{
                  color: #004D87;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 300;
                  line-height: 29px;
                }
                button{
                  border-radius: 100px;
                  background: #004D87;
                  min-height: 65px;
                  color: #FFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: normal;
                  padding: 22px 25px;
                  text-transform: capitalize;
                  ${mediaQueries("md")`
                    padding: 22px 20px;
                  `}
                  ${mediaQueries("sm")`
                    padding: 22px 15px;
                    min-height: 60px;
                  `}
                }
              }
            }
          }
        }
        &.sitback-start-booking-modal-wrapper{
          .modal-dialog{
            .modal-content{
              border-radius: 35px;
              background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
              .modal-header{
                padding: 0;
                border: none;
                min-height: unset;
                justify-content: center;
                padding: 40px 16px 0;
                /* .close-modal-btn-wrapper{
                  position: unset;
                } */
                .spa-name-header-text{
                  color: #295086;
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 100%;
                  text-transform: uppercase;
                  text-align: center;
                  ${mediaQueries("xl")`
                    font-size: 19px;
                  `}
                  ${mediaQueries("lg")`
                    font-size: 18px;
                  `}
                  ${mediaQueries("md")`
                    font-size: 17px;
                  `}
                  ${mediaQueries("sm")`
                    font-size: 16px;
                    margin-top: 25px;
                  `}
                }
                .powered-text-display-wrapper{
                  border-radius: 100px;
                  background: #004D87;
                  max-width: 195px;
                  position: absolute;
                  top: -20px;
                  left: 0;
                  right: 0;
                  margin: auto;
                  padding: 12px 22px;
                  ${mediaQueries("sm")`
                    top: -3px;
                  `}
                  p{
                    color: #ffffffe6;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: normal;
                    span{
                      font-weight: 600;
                    }
                  }
                }
              }
              .modal-body{
                .sit-step-display-div{
                  margin-top: 16px;
                  h5{
                    color: #295086;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 100%;
                    text-transform: uppercase;
                    margin: 0 0 30px;
                    ${mediaQueries("xl")`
                      font-size: 19px;
                    `}
                    ${mediaQueries("lg")`
                      font-size: 18px;
                    `}
                    ${mediaQueries("md")`
                      font-size: 17px;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 16px;
                    `}
                  }
                  .step-content-wrapper{
                    .step-note-div{
                      &.single-first-round-active{
                        .step-round-wrapper{
                          background: #24A813;
                          border: none;
                        }
                      }
                      &.active{
                          .step-round-wrapper{
                            background: #24A813;
                            border: none;
                          }
                          &::after{
                            background: #24A813;
                          }
                      }
                      .step-round-wrapper{
                        border: 1px dashed #C9C9C9;
                        .checkmark-icon{
                          width: 15px;
                        }
                        .number-text{
                          color: rgba(41, 80, 134, 0.35);
                        }
                      }
                    }
                  }
                }
                form{
                  .marging-bottom-wrapper{
                    label{
                      color: #295086;
                      font-size: 16px;
                      font-weight: 400;
                      line-height: 100%;
                      ${mediaQueries("md")`
                        font-size: 15px;
                      `}
                      ${mediaQueries("sm")`
                        font-size: 14px;
                      `}
                    }
                    input{
                      ${mediaQueries("sm")`
                        font-size: 16px !important;
                      `}
                    }
                    .sitback-select-option__control{
                      border-radius: 100px;
                      border: 1px solid rgba(218, 218, 218, 0.60);
                      background: #FFF;
                      .sitback-select-option__value-container{
                        .sitback-select-option__single-value{
                          color: rgba(41, 80, 134, 0.90);
                          font-size: 14px;
                          font-style: normal;
                          font-weight: 400;
                          line-height: 22px;
                        }
                      }
                    }
                    input{
                      border-radius: 100px;
                      border: 1px solid rgba(218, 218, 218, 0.60);
                      background: #FFF;
                      color: rgba(41, 80, 134, 0.90);
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: 22px;
                    }
                  }
                  .checkbox-wrapperv5{
                      &.checkbox-border-div{
                        input{
                          background: #D5EEFF;
                          &:checked{
                            background: #295086;
                          }
                        }
                      }
                    }
                  textarea{
                    border-radius: 10px;
                    border: 1px solid rgba(218, 218, 218, 0.60);
                    background: #FFF;
                    color: rgba(41, 80, 134, 0.90);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                  }
                  .loading-btn-wrapper{
                    background: #004D87;
                    min-height: 65px;
                    color: #FFF;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;
                    text-transform: capitalize !important;
                    ${mediaQueries("sm")`
                      min-height: 60px;
                    `}
                  }
                  .appointment-updated-text{
                    color: #295086;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 100%;
                    margin-bottom: 25px;
                    text-align: left;
                    ${mediaQueries("md")`
                      font-size: 17px;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 16px;
                    `}
                  }
                  .sit-time-display-data-div{
                    flex-direction: column;
                    .checkbox-wrapper-div{
                      .appointment-label{
                        border-radius: 146px;
                        background: #FFF3E8;
                        border: none;
                        display: flex;
                        align-items: center;
                        padding: 11px 6px !important;
                        span{
                          background: #24A813;
                          left: unset;
                          right: 20px;
                          width: 15px;
                          height: 15px;
                          ${mediaQueries("sm")`
                            top: 0 !important;
                            margin: auto !important;
                            right: 8px !important;
                            left: unset !important;
                            bottom: 0 !important;
                          `}
                        }
                        .appointment-detail-display-div{
                          display: flex;
                          align-items: center;
                          padding-left: 20px;
                          p{
                            flex: unset;
                            width: unset;
                          }
                          .appointment-top-para-text{
                            margin-left: 0;
                            color: #004D87;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: 31px;
                            ${mediaQueries("sm")`
                              margin: 0 !important;
                            `}
                          }
                          .timetext{
                            margin-left: 15px;
                            margin-top: 0;
                            color: #004D87;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 31px;
                            ${mediaQueries("sm")`
                              margin: 0 0 0 15px !important;
                            `}
                          }
                        }

                      }
                      &:nth-child(2){
                        .appointment-label{
                          background: #E0FFE9;
                        }
                      }
                      &:nth-child(3){
                        .appointment-label{
                          background: #DEF1FF;
                        }
                      }
                    }
                    .checkbox-wrapper-div input[type=radio]:checked+label{
                      .appointment-top-para-text{
                        color: #004D87;
                      }
                      .timetext{
                        color: #004D87;
                      }
                    }
                  }
                  .time-slot-checkbox-main-wrapper{
                    .checkbox-list-wrapper{
                      .checkbox-wrapper-div{
                        ${mediaQueries("sm")`
                          flex: 0 0 100% !important;
                        `}
                        label{
                          border-radius: 100px;
                          background: #F2F6F9 !important;
                          span{
                            background: #24A813 !important;
                            border: none !important;
                            left: unset;
                            right: 8px;

                          }
                          p{
                            color: #004D87;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 31px;
                            margin-left: 0;
                            ${mediaQueries("sm")`
                              text-align: left;
                              padding-left: 12px;
                            `}
                          }
                        }
                        input[type=radio]:checked+label{
                          border: 1px solid #007BFF !important;
                          background: #DFECF9 !important;
                        }
                      }
                    }
                  }
                  .provider-checkbox-main-user-div{
                    .checkbox-wrapper-div{
                      flex: 0 0 33.33% !important;
                      ${mediaQueries("sm")`
                        flex: 0 0 50% !important;
                      `}
                      &:nth-child(3){
                        ${mediaQueries("sm")`
                          flex: 0 0 100% !important;
                        `}
                      }
                      label{
                        border-radius: 100px;
                        background: #F2F6F9 !important;
                        padding: 11px 22px !important;
                        span{
                          margin: auto;
                          left: unset;
                          right: 20px;
                          top: 0;
                          bottom: 0;
                          background: #24A813;
                          ${mediaQueries("sm")`
                            top: 0 !important;
                            margin: auto !important;
                            right: 8px !important;
                            left: unset !important;
                            bottom: 0 !important;
                          `}
                        }
                        .user-gender-div{
                          display: flex;
                          align-items: center;
                          .user-img-wrapper{
                            margin: 0 12px 0 0;
                            width: 30px !important;
                            height: auto !important;
                          }
                          h6{
                            color: #295086;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: normal;
                          }
                        }
                      }
                      input[type=radio]:checked+label{
                        border: 1px solid #007BFF !important;
                        background: #DFECF9 !important;
                      }
                    }
                  }
                }
                .simplicity-detail-wrapper{
                  /* box-shadow: 0 3px 69px 0 rgba(0, 0, 0, 0.09); */
                  /* box-shadow: 0 69px 69px 0 rgba(0, 0, 0, 0.09); */
                  h5{
                    color: #004D87 !important;
                    font-size: 22px !important;
                    font-weight: 500 !important;
                    line-height: 100% !important;
                    ${mediaQueries("xl")`
                      font-size: 21px !important;
                    `}
                    ${mediaQueries("lg")`
                      font-size: 20px !important;
                    `}
                    ${mediaQueries("md")`
                      font-size: 19px !important;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 18px !important;
                    `}
                  }
                  .blue-box-row{
                    .box-col{
                      ${mediaQueries("sm")`
                        flex: 0 0 100%;
                      `}
                      .bluebox-wrapper{
                        border-radius: 10px;
                        border: 1px solid rgba(0, 123, 255, 0.20);
                        background: #DFECF9;
                        ${mediaQueries("sm")`
                          display: flex;
                          align-items: center;
                        `}
                        .iconbox{
                          ${mediaQueries("sm")`
                            width: 36px;
                            height: auto;
                            margin: 0 20px 0 0;
                          `}
                        }
                        p{
                          color: #295086;
                          font-size: 14px;
                          font-weight: 300;
                          line-height: 21px;
                          ${mediaQueries("sm")`
                            text-align: left;
                          `}
                        }
                      }
                    }
                  }
                }
                .review-details-wrapper{
                  .header-bar-primary{
                    background: transparent;
                    h5{
                      color: #004D87 !important;
                      font-size: 22px !important;
                      font-weight: 500 !important;
                      line-height: 100% !important;
                    }
                  }
                  .calender-wrapper{
                    max-width: 590px;
                    margin: auto;
                    border-radius: 10px;
                    background: #DFECF9;
                    padding: 18px 30px 12px;
                    ${mediaQueries("sm")`
                      max-width: calc(100% - 30px);
                      padding: 10px 12px;
                    `}
                    .date-and-text{
                      border-color: #fff6;
                        ${mediaQueries("sm")`
                          padding: 12px 10px;
                        `}
                      &:last-child{
                        border: none;
                      }
                      h2{
                        color: #004D87;
                        font-size: 14px;
                        font-weight: 400;
                        letter-spacing: 0.14px;
                      }
                      h3{
                        color: #004D87;
                        text-align: right;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 500;
                        letter-spacing: 0.14px;
                      }
                    }
                  }
                }
                .footer-btns-wrapper-new-flow{
                  &.booking-step-btn-div{
                    max-width: 590px;
                    .go-back-btn{
                      border-radius: 100px;
                      border: 1px solid #CFCFCF;
                      background: #F2F6F9;
                      color: #004D87;
                      text-align: center;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: normal;
                      text-transform: capitalize;
                      min-height: 65px;
                      ${mediaQueries("sm")`
                        min-height: 60px;
                      `}
                    }
                  }
                }
                .confirm-footer-wrapper{
                  &.final-step-btn-div{
                    flex-direction: column;
                    max-width: 590px;
                    button{
                      width: 100%;
                    }
                    .loading-btn-wrapper{
                      background: #004D87;
                      min-height: 65px;
                      color: #FFF;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: normal;
                      text-transform: capitalize;
                      ${mediaQueries("sm")`
                        min-height: 60px;
                      `}
                    }
                    .cancel-btn{
                      border-radius: 100px;
                      border: 1px solid #CFCFCF;
                      background: #F2F6F9;
                      color: #004D87;
                      text-align: center;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: normal;
                      margin-top: 15px;
                      text-transform: capitalize;
                      min-height: 65px;
                      ${mediaQueries("sm")`
                        min-height: 60px;
                      `}
                    }
                  }
                }
              }
            }
          }
        }
        &.header-layout-change-wrapper{
            .modal-dialog{
                .modal-content{
                    .modal-header{
                        .modal-title{
                            margin: 0;
                            width: calc(100% - 59%);
                            ${mediaQueries("sm")`
                                width: calc(100% - 40%);
                            `}
                            ${mediaQueries("xs")`
                                width: calc(100% - 45%);
                                word-break: break-all;
                            `}
                            &.notification-signup-title-text{
                              ${mediaQueries("xs")`
                                  width: calc(100% - 65%);
                                  font-size: 20px;
                                  word-break: break-word;
                              `}
                            }
                        }
                        .logo-wrapper{
                            position: absolute;
                            right: 0;
                            left: 0;
                            margin: auto;
                            &.sitback-modal-mobile-view-header-logo{
                              ${mediaQueries("sm")`
                                left: unset;
                                right: 60px;
                              `}
                            }
                        }
                        .close-modal-btn-wrapper{
                          background: #FFFFFF;
                          border: 1px solid #EFEFEF;
                          padding: 0;
                          width: 30px;
                          height: 30px;
                          overflow: hidden;
                          border-radius: 1000px;
                          position: absolute;
                          right: 10px;
                          top: 24px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          i{
                            display: block;
                            width: 13px;
                            height: auto;
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
                    .modal-body{
                        form{
                            .box-wrapper-div{
                              &.time-slot-checkbox-main-wrapper{
                                .checkbox-list-wrapper{
                                  &.available-appointments-section{
                                    .checkbox-wrapper-div{
                                      label{
                                        border-color: #EAEBEC;
                                        color: #295086;
                                        background: transparent;
                                        span{
                                          border: 1px solid ${theme.color.white};
                                          background: ${theme.color.white};
                                          &:after {
                                            background: url('/images/check-mark-icon-white.svg');
                                            background-repeat: no-repeat;
                                            background-size: contain;
                                            background-position: center;
                                          }
                                        }
                                      }
                                    }
                                    .checkbox-wrapper-div input[type=radio]:checked+label{
                                      background-color: #95CCD5;
                                      border-color: #EAEBEC;
                                      color: #FFFFFF;
                                    }
                                  }

                                }
                              }
                                .provider-appointment-section{
                                    .checkbox-wrapper-div{
                                        flex: 0 0 140px;
                                        ${mediaQueries("sm")`
                                            flex: 0 0 33.33%;
                                        `}
                                        label{
                                            .user-img-wrapper{
                                                border-radius: 0;
                                                background: transparent;
                                                width: 90px;
                                                height: 90px;
                                                ${mediaQueries("sm")`
                                                    width: 60px;
                                                    height: 60px;
                                                `}
                                            }
                                            h6{
                                                font-size: 14px;
                                            }
                                        }
                                    }
                                    &.provider-checkbox-main-user-div{
                                      justify-content: center;
                                      .checkbox-wrapper-div{
                                        label{
                                          padding: 18px 10px 10px;
                                          span{
                                          ${mediaQueries("sm")`
                                            top: -10px;
                                            margin: 0 auto;
                                            right: 0;
                                            left: 0;
                                            background: #3FA481;
                                            border: 1px solid #FFFFFF;
                                          `}
                                          &::after{
                                            ${mediaQueries("sm")`
                                              background-image: url('/images/checkmark-white.svg');
                                              background-repeat: no-repeat;
                                              background-position: center;
                                            `}
                                          }
                                        }
                                        }
                                      }
                                    }
                                }
                                .available-appointments-section{
                                  &.sit-time-display-data-div{
                                    justify-content: center;
                                    .booking-radio-lable-wrapper{
                                      .appointment-label{
                                        span{
                                          ${mediaQueries("sm")`
                                            top: -10px;
                                            margin: 0 auto;
                                            right: 0;
                                            left: 0;
                                            background: #3FA481;
                                            border: 1px solid #FFFFFF;
                                          `}
                                          &::after{
                                            ${mediaQueries("sm")`
                                              background-image: url('/images/checkmark-white.svg');
                                              background-repeat: no-repeat;
                                              background-position: center;
                                            `}
                                          }
                                        }
                                        p{
                                          ${mediaQueries("sm")`
                                            margin-left: 0;
                                            text-align: center;
                                            margin: 5px auto 0;
                                          `}
                                          &.appointment-top-para-text{
                                            ${mediaQueries("sm")`
                                              margin-top: 0;
                                          `}
                                          }
                                        }
                                      }
                                    }
                                  }
                                    .checkbox-wrapper-div{
                                        ${mediaQueries("xs")`
                                          flex: 0 0 50%;
                                          &:nth-child(3){
                                                 flex: 0 0 100%;
                                          }
                                        `}
                                        ${'' /* label{
                                            p{
                                                ${mediaQueries("xs")`
                                                    font-size: 11px;
                                                `}
                                            }
                                            .timetext{
                                                ${mediaQueries("xs")`
                                                    font-size: 9px;
                                                `}
                                            }
                                        } */}
                                    }
                                }
                            }
                            .sitback-select-spa-service-wrapper{
                              .sitback-select-option__menu{
                                .sitback-select-option__menu-list{
                                  .sitback-select-option__option{
                                    display: flex;
                                    img{
                                      min-width: 30px;
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
    }
    .EmbedinWebsiteWrapper{
        min-height: 180px;
        padding: 0 15px;
        .modal-title-text{
            font-size: 25px;
            font-weight: 500;
            line-height: normal;
            letter-spacing: -0.01em;
            text-align: center;
            color: ${theme.color.secondary};
            margin-bottom: 20px;
        }
        .copy-link-input-wrapper{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 15px 0;
            position: relative;
            input{
                width: 100%;
                font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
                font-weight: 400;
                line-height: normal;
                background: #FFFEF6;
                border: 1px solid rgba(218, 218, 218, 0.6);
                border-radius: 100px;
                outline: none;
                box-shadow: none;
                outline: none;
                box-shadow: none;
                min-height: 58px;
                padding: 15px 20px;
                font-size: 12px;
                padding-right: 140px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #295086;
            }
            button{
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
                text-align: center;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 130px;
                background: #295086;
                border-color:#295086;
            }
        }
        .download-btn-wrapper{
            width: 150px;
            margin: auto;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            i{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 18px;
                height: 18px;
                margin-left: 10px;
                svg{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
    .notes-available-text{
        font-size: 14px;
        font-weight: 400;
        color: #295086;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        &.client-list {
          min-height: 260px;
        }
    }
    .mbsc-ios.mbsc-scroller-pointer .mbsc-scroller-wheel-item.mbsc-selected {
        color: #95CCD5;
    }
    .rc-time-picker-panel{
        max-width: 290px !important;
        width: 100% !important;
        top: -180px !important;
        .rc-time-picker-panel-inner{
            border: none;
            border-radius: 12px;
            background: #ffffff;
            overflow: hidden;
            max-width: 285px !important;
            width: 100% !important;
            .rc-time-picker-panel-input-wrap{
                padding: 9px;
                background: #295086;
                input{
                    background: transparent !important;
                    background: transparent !important;
                    color: white !important;
                    outline: none !important;
                    box-shadow: none !important;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: normal;
                    text-align: center;
                    letter-spacing: 0.4px;
                    border: none !important;
                    &::-ms-input-placeholder { /* Edge 12-18 */
                        color: white !important;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: normal;
                        text-align: center;
                    }
                    &::placeholder {
                        color: white !important;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: normal;
                        text-align: center;
                    }
                }
            }
            .rc-time-picker-panel-combobox{
                max-width: 290px !important;
                width: 100% !important;
                .rc-time-picker-panel-select{
                    width: 33.33% !important;
                    flex: 0 0 33.33% !important;
                    display: flex;
                    &::-webkit-scrollbar {
                        width: 6px;
                    }
                    &::-webkit-scrollbar-track {
                        background: #E9DEDE;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: #295086;
                        border: 4px solid #295086;
                        border-radius: 8px;
                        background-clip: padding-box;
                    }
                    ul{
                        li{
                            font-size: 14px;
                            font-weight: 300;
                            line-height: normal;
                            letter-spacing: 0.5px;
                            text-align: left;
                            color: #295086;
                            padding: 2px;
                            height: auto;
                            text-align: center;
                            &.rc-time-picker-panel-select-option-selected{
                                font-weight: 600;
                                background: #edfaff;
                                color: #295086;
                            }
                        }
                    }
                }
            }
        }
    }
    .confirm-cancel-modal-wrapper{
        .modal-content{
            background: #ffffff !important;
        }
        .modal-dialog{
            .modal-body{
                form{
                    margin-bottom: 0;
                    max-width: 520px;
                    min-height: 200px;
                    .sitback-select2-container {
                        .sitback-select-option__control {
                            background-color: #ffffff !important;
                            background: #ffffff !important;
                            border-color: #EAEBEC !important;
                        }
                    }
                    .sitback-select-option__menu {
                        background-color: #ffffff !important;
                        background: #ffffff !important;
                        .sitback-select-option__option {
                            &.sitback-select-option__option--is-focused,
                            &.sitback-select-option__option--is-selected {
                                background-color: #004B87 !important;
                                background: #004B87 !important;
                                color: #ffffff !important;
                            }
                        }
                    }
                    label{
                        span{
                            margin-left: 10px;
                            display: inline-flex;
                            color: #bdbdbd;
                        }
                    }
                    h5{
                        display: flex;
                        align-items: center;
                        margin-top: 6px;
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 18px;
                        letter-spacing: 1px;
                        color: #295086B2;
                        i{
                            width: 18px;
                            height: 18px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 8px;
                        }
                    }
                    .modal-footer-div{
                        margin: 0 !important;
                        .loading-btn-wrapper {
                            background-color: #004B87 !important;
                            background: #004B87 !important;
                            border-color: #004B87 !important;
                            color: #ffffff !important;
                            &:hover, &:focus, &:active {
                                background-color: #003663 !important;
                                background: #003663 !important;
                                border-color: #003663 !important;
                            }
                        }
                    }
                    .otp-input-wrapper{
                        display: flex;
                        max-width: 330px;
                        align-items: center;
                         input{
                            box-shadow: none;
                            background: white;
                          }
                    }
                }
            }
        }
    }
    .remove_cart_icon img {
      cursor: pointer;
    }
    .no-data {
      p {
        color: #295086;
      }
      &.gallery-no-data-div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: 280px;
      }
    }
    .footer-wrapper{
        background: ${theme.color.primary};
        padding: 30px;
        ${mediaQueries("lg")`
            padding: 20px;
        `}
        p{
            font-size: 24px;
            font-weight: 300;
            line-height: normal;
            letter-spacing: 0px;
            text-align: center;
            color: ${theme.color.secondary};
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
            ${mediaQueries("sm")`
                font-size: 15px;
            `}
        }
    }
    .bs-tooltip-end{
       &.show{
           opacity: 1;
        }
        .tooltip-arrow{
            &::before{
                border-right-color: #EFECD5;
            }
        }
        .tooltip-inner{
            padding: 15px;
            text-align: start;
            background: #EFECD5;
            opacity: 1;
            p{
                color: #295086;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 1px;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0px;
                }
            }
        }
    }
    .bs-tooltip-start{
        &.show{
           opacity: 1;
        }
        .tooltip-arrow{
            &::before{
                border-left-color: #EFECD5;
            }
        }
        .tooltip-inner{
            padding: 15px;
            text-align: start;
            background: #EFECD5;
            opacity: 1;
            p{
                color: #295086;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 1px;
                margin-bottom: 10px;
                &:last-child{
                  margin-bottom: 0px;
                }
            }
        }
    }
    .bs-tooltip-top{
        &.show{
           opacity: 1;
        }
        .tooltip-arrow{
            &::before{
                border-top-color: #EFECD5;
            }
        }
        .tooltip-inner{
            padding: 15px;
            text-align: start;
            background: #EFECD5;
            opacity: 1;
            p{
                color: #295086;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 1px;
                margin-bottom: 10px;
                &:last-child{
                  margin-bottom: 0px;
                }
            }
        }
    }

    .upgrades-products-wrapper{
    &.sitback-updated-product-list-modal{
      .modal-dialog{
        .modal-content{
          border-radius: 35px;
          border: 0.5px solid #EAEBEC;
          background: #FBFBFB;
          .modal-header{

          }
          .modal-body{
            .product_list{
              .Product_header{
                .search_box{
                  input{
                    border-radius: 100px  ;
                    border: 1px solid rgba(218, 218, 218, 0.60);
                    background: #FFF;
                  }
                }
                  .addbtn{
                    .loading-btn-wrapper{
                      color: #FFF;
                      text-align: center;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: normal;
                      border-radius: 88px;
                      background: #295086;
                    }
                  }
                  .cartBox{
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    border-radius: 1000px;
                    background: #295086;
                    pointer-events: none;
                    i{
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100%;
                      width: 20px;
                      height: 20px;
                      img{
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-position: center;
                      }
                    }
                      span{
                        width: 15px;
                        height: 15px;
                        right: 4px;
                        top: 5px;
                        font-size: 12px;
                      }
                  }
              }
              .product_card{
                .product_card_box{
                  .product_img{
                    background: #FBFBFB;
                    position: relative;
                    border-radius: 6px;
                    &::after{
                      width: 17px;
                      height: 17px;
                      background: url("images/green-provider-icon.svg") no-repeat;
                      display: block;
                      content: '';
                      top: 9px;
                      right: 7px;
                      position: absolute;
                      opacity: 0;
                    }
                  }
                  &.active{
                    border-radius: 8px;
                    border: 1px solid #007BFF;
                    background: #DFECF9;
                    .product_img{
                      &::after{
                        opacity: 1;
                      }
                    }
                  }
                  .product-wrapper-div{
                    .product_detail{
                      h4{
                        color: #295086;
                        font-size: 15px;
                        font-weight: 400;
                        line-height: normal;
                      }
                      .product_price_row{
                        display: flex;
                        align-items: baseline;
                        gap: 8px;
                        h5{
                          color: #295086;
                          font-size: 16px;
                          font-weight: 600;
                          line-height: normal;
                          margin: 0;
                        }
                        .product_stock{
                          color: #99A1AF;
                          font-size: 12px;
                          font-weight: 500;
                          line-height: normal;
                          white-space: nowrap;
                        }
                      }
                    }
                      .quantity{
                        border-radius: 100px;
                        border: 1px solid #FFF;
                        background: #FBFBFB;
                        padding: 4px;
                        width: 90px;
                        .quantity__minus{
                          border-radius: 60px;
                          /* opacity: 0.4; */
                          background: #295086;
                          cursor: pointer;
                          span{
                            color: #FFFFFF;
                            cursor: pointer;
                          }
                          &.disabled{
                            opacity: 0.4;
                            pointer-events: none;
                            cursor: not-allowed;
                          }
                        }
                        .quantity__input{
                          background: none;
                          color: #295086;
                        }
                        .quantity__plus{
                          border-radius: 50px;
                          background: #295086;
                          cursor: pointer;
                          span{
                            color: #FFFFFF;
                            cursor: pointer;
                          }
                          &.disabled{
                            opacity: 0.4;
                            pointer-events: none;
                            cursor: not-allowed;
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
    }
        .modal-dialog{
            max-width: 1200px !important;
            width: 100%;
            margin: 10px auto;
            padding: 10px;
            .modal-content{
                .red-close-icon{
                    padding-bottom: 0;
                }
            }
            .modal-body{
                margin-top: 0 !important;
                .Product_header{
                    .search_box{
                        .search-icon{
                            position: absolute;
                            left: 19px;
                            width: 23px;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                        }
                    }
                }
                .product_card_box {
                    box-shadow: none !important;
                    border: none !important;
                    .lowStock{
                        position: absolute;
                        background: #F97167;
                        left: 16px;
                        top: 25px;
                        border-radius: 0px 20px 20px 0px;
                        padding: 6px 10px;
                        display: flex;
                        span{
                            font-size: 12px;
                            font-weight: 400;
                            color: white;
                            display: inline-flex;
                            line-height: normal;
                        }
                    }
                    .product_img{
                        width: 100%;
                        height: 180px;
                        overflow: hidden;
                        img{
                            width: 100% !important;
                            height: 100% !important;
                            object-fit: contain !important;
                            object-position: center !important;
                        }
                    }
                    &:hover{
                        box-shadow: none !important;
                        border: none !important;
                    }
                    &.active{
                        background: #6BBE99;
                    }
                    .product-wrapper-div{
                        display: flex;
                        align-items: flex-start;
                        margin-top: 12px;
                        .product_detail{
                            margin: 0;
                            flex: 1;
                            h4{
                                font-style: normal;
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 150%;
                                color: #494C50;
                                text-align: start;
                            }
                            h5{
                                font-style: normal;
                                font-weight: 600;
                                font-size: 15px;
                                line-height: 20px;
                                color: #494C50;
                                margin: 0;
                                text-align: start;
                            }
                        }
                        .quantity{
                            display: flex;
                            align-items: center;
                            width: 70px;
                            justify-content: end;
                            a{
                                width: 21px;
                                height: 21px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 15px;
                                font-weight: 500;
                                color: #494C50;
                                background: white;
                                line-height: normal;
                                padding-bottom: 2px;
                                cursor: pointer;
                            }
                            input{
                                min-width: 24px;
                                height: 21px;
                                outline: none;
                                box-shadow: none;
                                border: none;
                                background: white;
                                background: #2950861A;
                                text-align: center;
                                font-size: 15px;
                                line-height: normal;
                            }
                        }
                    }
                    .error{
                        font-size: 12px;
                        text-align: start;
                        color: red;
                        bottom: -18px;
                        position: absolute;
                        left: 1px;
                        font-weight: 400;
                        letter-spacing: 0.5px;
                    }
                }
            }
        }
    }
    .sitback-payment-options-wrapper{
        .modal-dialog{
            max-width: 800px !important;
            width: 100%;
            margin: 10px auto;
            padding: 10px;
            .sitback-option-modal-wrapper{
                margin: auto;
                max-width: 710px;
                width: 100%;
                max-height: 550px;
                overflow: auto;
                padding-right: 6px;
                scrollbar-width: thin;
                scrollbar-color: #295086 #E9DEDE;
                &::-webkit-scrollbar {
                    width: 3px;
                }
                &::-webkit-scrollbar-track {
                    background: #E9DEDE;
                    border-radius: 3px;
                }
                &::-webkit-scrollbar-thumb {
                    background: #295086;
                    border-radius: 3px;
                }
                .header-bar-wrapper{
                    padding: 12px;
                    background: ${theme.color.secondary};
                    display: flex;
                    align-items: center;
                    min-height: 50px;
                    h6{
                        color: ${theme.color.white};
                        font-size: 14px;
                        font-weight: 400;
                        width: 250px;
                        &:last-child{
                            flex: 1;
                        }
                    }
                    &.service-products-table-wrapper{
                        background: transparent;
                        h6{
                            color: #295086;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 8px;
                            p{
                                margin: 0 !important;
                                margin-right: 15px !important;
                                margin-top: 0 !important;
                                margin-bottom: 0 !important;
                                margin-left: 0 !important;
                                line-height: 1.2;
                                white-space: nowrap;
                            }
                            .action-icons{
                              display: flex;
                              align-items: center;
                              flex-shrink: 0;
                            }
                        }
                    }
                }
                form{
                    margin-top: 20px;
                    ${"" /* min-height: 535px; */}
                }
                .accordion{
                    ${"" /* max-height: 250px;
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 8px;
                    }
                    &::-webkit-scrollbar-track {
                        background: #e9dede;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: #295086;
                        border-radius: 8px;
                    } */
  }
                    .accordion-item{
                        background: transparent !important;
                        border: none !important;
                        &:nth-child(2n){
                            .accordion-header{
                                background: #95ccd51f !important;
                            }
                        }
                        .accordion-header{
                            position: relative;
                            .accordion-button {
                                outline: none;
                                box-shadow: none;
                                background: transparent;
                                padding: 12px;
                                min-height: 65px;
                                position: relative;
                                h6{
                                    color: ${theme.color.secondary};
                                    font-size: 14px;
                                    font-weight: 400;
                                    width: 250px;
                                    &:last-child{
                                        flex: 1;
                                    }
                                }

                                &.collapsed{
                                    span{
                                        background: #F7F7FF;
                                        &:after{
                                            background: ${theme.color.dimgraytext};
                                        }
                                        &:before{
                                            opacity: 1;
                                        }
                                    }
                                }
                                h3{
                                    width: calc(100% - 48px);
                                    color: #170F49;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: 28px;
                                }
                            }
                        }
                        .accordion-body{
                            padding: 0;
                            background: transparent !important;
                            p{
                                color: ${theme.color.dimgraytext};
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 400;
                                margin-top: 20px;
                                margin-bottom: 20px;
                                line-height: 22px;
                                text-align: start;
                                margin-left: 45px;

                            }
                            .table-responsive{
                                min-height: unset;
                                max-height: unset;
                                margin-bottom: 20px;
                                ${"" /* max-height: 200px;
                                &::-webkit-scrollbar {
                                    width: 10px;
                                }
                                &::-webkit-scrollbar-track {
                                    background: #E9DEDE;
                                }
                                &::-webkit-scrollbar-thumb {
                                    background: #295086;
                                } */
  }
                                table > :not(caption) > * > * {
                                    background-color: transparent !important;
                                }
                                table{
                                    thead{
                                        background-color: #295085;
                                        z-index: 4;
                                        position: unset;
                                        tr{
                                            th{
                                                font-size: 14px;
                                                font-weight: 400 !important;
                                                background-color: transparent;
                                                /* background: #fefdf4; */
                                                border-bottom: 1px solid #29508630;
                                                z-index: 1;
                                                box-shadow: none !important;
                                                color: ${theme.color.white};
                                                position: sticky;
                                                top: 0;
                                                background-color: #295086 !important;
                                            }
                                        }
                                    }
                                    tbody{
                                        tr{
                                            td{
                                                border-bottom: 1px solid #29508630;
                                                font-style: normal;
                                                font-weight: 500;
                                                font-size: 14px;
                                                line-height: 20px;
                                                color: #295086;
                                                .quantity{
                                                    display: flex;
                                                    align-items: center;
                                                    width: 70px;
                                                    justify-content: end;
                                                    a{
                                                        width: 21px;
                                                        height: 21px;
                                                        display: flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                        font-size: 15px;
                                                        font-weight: 500;
                                                        color: #fff;
                                                        background: #295086;
                                                        line-height: normal;
                                                        padding-bottom: 2px;
                                                    }
                                                    input{
                                                        min-width: 24px;
                                                        height: 21px;
                                                        outline: none;
                                                        box-shadow: none;
                                                        border: none;
                                                        background: white;
                                                        background: #2950861A;
                                                        text-align: center;
                                                        font-size: 15px;
                                                    }
                                                }
                                                .action-icons{
                                                    display: flex;
                                                    align-items: center;
                                                    .sitback-icon{
                                                        display:flex;
                                                        align-items: center;
                                                        justify-content:center;
                                                        width: 18px;
                                                        height: 18px;
                                                        margin-right: 10px;
                                                        &:last-child{
                                                            margin-right: 0px;
                                                        }
                                                        svg{
                                                            display: block;
                                                            width: 100%;
                                                            height: 100%;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .quantity{
                                display: flex;
                                align-items: center;
                                width: 92px;
                                justify-content: flex-end;
                                a{
                                    width: 21px;
                                    height: 21px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 15px;
                                    font-weight: 500;
                                    color: #fff;
                                    background: #295086;
                                    line-height: normal;
                                    padding-bottom: 2px;
                                    cursor: pointer;
                                }
                                input{
                                    width: 32px;
                                    min-width: 32px;
                                    height: 21px;
                                    outline: none;
                                    box-shadow: none;
                                    border: none;
                                    background: #2950861A;
                                    text-align: center;
                                    font-size: 15px;
                                    color: #295086;
                                    font-weight: 600;
                                    padding: 0;
                                    opacity: 1;
                                }
                            }
                            .action-icons{
                                display: flex;
                                align-items: center;
                                .sitback-icon{
                                    display:flex;
                                    align-items: center;
                                    justify-content:center;
                                    width: 18px;
                                    height: 18px;
                                    margin-right: 10px;
                                    &:last-child{
                                        margin-right: 0px;
                                    }
                                    svg{
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                            .checkbox-wrapper-div{
                                display: flex;
                                align-items: center;
                                margin-top: 15px;
                                margin-bottom:20px;
                                input{
                                    width: 18px;
                                    height: 18px;
                                    margin-right: 12px;
                                    margin-top: -2px;
                                    border-color: transparent;
                                    border-width: 4px;
                                    border-radius: 2px;
                                    &:focus {
                                        border-color: transparent;
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
                                            width: 4px;
                                            height: 9px;
                                            border: solid white;
                                            border-width: 0 2px 2px 0;
                                            -webkit-transform: rotate(45deg);
                                            -ms-transform: rotate(45deg);
                                            transform: rotate(45deg);
                                        }
                                    }
                                }
                                p{
                                    font-style: normal;
                                    font-weight: 500;
                                    font-size: 14px;
                                    line-height: 100%;
                                    color: #295086;
                                    margin: 0;
                                }
                            }
                            .sitback-tip-payment-amount{
                                position: relative;
                                input{
                                    padding: 18px 18px 18px 56px;
                                    box-shadow:unset;
                                    min-height: 62px;
                                    ${mediaQueries("xl")`
                                        min-height: 56px;
                                    `}
                                    ${mediaQueries("sm")`
                                        min-height: 48px;
                                    `}
                                }
                                i{
                                    width: 20px;
                                    height: 20px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    position: absolute;
                                    left: 20px;
                                    top: 0;
                                    bottom: 0;
                                    margin: auto;
                                    cursor: pointer;
                                    &:before {
                                        position: absolute;
                                        content: "";
                                        height: 20px;
                                        width: 1px;
                                        background: #979797;
                                        left: 26px;
                                    }
                                    svg {
                                        color: #979797;
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .text-danger{
                                    text-align:left !important;
                                }
                            }
                            .modal-footer-div{
                                display: flex;
                                justify-content: space-between;
                                gap: 15px;
                                margin: 15px 0;
                                .close-btn{
                                    background-color: #CBD3D4;
                                    border-color: #CBD3D4;
                                }
                            }
                        }
                    }
                    .add-ugrades-text{
                        cursor: pointer;
                        text-decoration: underline !important;
                        color: #295086 !important;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        margin: 8px 0 0;

                        .add-upgrades-plus-icon{
                          width: 22px;
                          height: 22px;
                          flex-shrink: 0;
                          display: block;
                        }
                    }
                }
                .sitback-payment-history-tip {
                    .sitback-tip{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 3px;
                        padding-bottom: 3px;
                        p{
                            color: #295085;
                            font-size: 15px;
                            font-weight: 400;
                            &.total-text{
                                font-weight: 600;
                                color: #E32C1F;
                            }
                        }
                    }
                }
                .addcard-footer-wrapper{
                    button{
                        margin: 0 4px;
                    }
                }
            }
        }
    }
    .confirm-modal-footer{
        display: flex;
        align-items: center;
        justify-content: center;
        button{
            padding: 12px !important;
            min-height: 50px;
            font-weight: 500;
            letter-spacing: 1px;
            &.loading-btn-wrapper{
                background: #95CCD5 !important;
                border-color: #95CCD5 !important;
            }
        }
    }
    .no-products-body-wrapper{
        .no-products-message{
            font-weight: 500;
            max-width: 680px;
            width: 100%;
            margin: auto;
            margin-bottom: 30px;
        }
        button{
            width: 240px;
            padding: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 1px;
            margin: auto;
            margin-bottom: 20px;
            font-weight: 500;
            img{
                width: 15px;
                height: 15px;
                margin-right: 10px;
            }
        }
    }
    .calendarv2-wrapper-div{
        position: absolute;
        right: auto;
        left: 0;
        bottom: 64px;
        width: auto;
        z-index: 2;
        .rdp-root {
            box-shadow: 0px 4px 4px 0px #0000000a;
            border: none;
            border-radius: 12px;
            overflow: hidden;
            padding: 8px;
            background-color: white;
            .rdp-months{
                .rdp-nav{
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
                        svg{
                            width: 18px;
                            height: 18px;
                            fill: ${theme.color.secondary};
                        }
                    }
                }
                .rdp-month{
                    .rdp-month_caption{
                        .rdp-dropdowns{
                            .rdp-dropdown_root{
                                select{
                                    outline: none !important;
                                    box-shadow: none !important;
                                    border: none !important;
                                    &:focus-visible {
                                        outline: -webkit-focus-ring-color auto 0px;
                                    }
                                    &:focus{
                                        outline: none !important;
                                        box-shadow: none !important;
                                        border: none !important;
                                    }
                                }
                                .rdp-caption_label{
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: normal;
                                    color: rgb(41, 80, 134);
                                    svg{
                                        width: 18px;
                                        height: 18px;
                                        fill: ${theme.color.secondary};
                                    }
                                    &:focus-visible {
                                        outline: -webkit-focus-ring-color auto 0px;
                                    }
                                }
                            }
                        }
                        .rdp-dropdown:focus-visible ~ .rdp-caption_label {
                            outline: 0px auto Highlight;
                            outline: 0px auto -webkit-focus-ring-color;
                        }
                    }
                    .rdp-month_grid{
                        thead{
                            tr{
                                th{
                                    color: #295086;
                                    text-align: center;
                                    text-transform: uppercase;
                                    font-size: 14px;
                                    font-weight: 700;
                                    opacity: 1;
                                }
                            }
                        }
                        tbody{
                            tr{
                                td{
                                    .rdp-day_button{
                                        font-size: 14px;
                                        border-radius: 4px;
                                        font-weight: 500;
                                        color: rgb(41, 80, 134);
                                        box-shadow: none !important;
                                        outline: none !important;
                                        border: none !important;
                                    }
                                    &.rdp-selected{
                                        .rdp-day_button{
                                            /* background-color: ${theme.color.primary}; */
                                            background: #F2F6F9;
                                            /* color: ${theme.color.white}; */
                                            color: #295086;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
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

    }
    .font-weight-seven-hundred {
      font-weight: 700 !important;
    }
    .selected-item .whitebox-wrapper {
      border: 1px solid #007bff !important;  /* Highlight border */
      background-color: rgba(0, 123, 255, 0.1) !important; /* Light background */
      transition: 0.3s ease-in-out !important;
    }
    .vp-sidedock {
      display:none !important;
    }
    .gallery-slider-modal-wrapper{
        top: 0px;
        left: 0px;
        overflow: hidden;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #525252d9;
        z-index: 999;
        .close-icon{
            position: absolute;
            top: 15px;
            right: 15px;
            color: rgb(255, 255, 255);
            cursor: pointer;
            font-size: 20px;
            z-index: 2;
            svg{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .sliderbox-modal{
            max-width: 1230px;
            width: calc(100% - 15px);
            margin: auto 0;
        }
        .light-box-common-padding{
            max-width: 970px;
            width: calc(100% - 100px);
            height: 500px;
            border-radius: 20px;
            overflow: hidden;
            ${mediaQueries("xl")`
               height: 450px;
            `}
            ${mediaQueries("lg")`
               height: 400px;
            `}
            ${mediaQueries("md")`
               height: 350px;
            `}
            ${mediaQueries("sm")`
               height: 320px;
            `}
            img, video{
                width: 100%;
                height: 100%;
            }
        }
        .thumbnails-slider-wrapper{
            ${'' /* position: absolute; */}
            ${'' /* bottom: 10px; */}
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 10px;
            z-index: 9999;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: auto;
            background: transparent;
            max-width: 1230px;
            width: 100%;
            overflow: auto;
            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            &::-webkit-scrollbar-track {
            background: #e9dede;
            }
            &::-webkit-scrollbar-thumb {
            background: #295086;
            }
            .thumbnails-box{
                cursor: pointer;
                border-radius: 5px;
                padding: 0px;
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                img, video{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }
        }
        .pagition-wrapper-bar{
            padding: 24px 15px;
            color: white;
            font-weight: bold;
            width: 100%;
            justify-content: center;
            display: flex;
            span{
                margin: 0 3px;
            }
            * {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: normal;
                letter-spacing: 1px;
                color: #F3F7FB;
            }
        }
        .slider-wrapperbody{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            .arrow-wrapperbox{
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 10000px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffffff9e;
                top: 0;
                bottom: 0;
                margin: auto;
                padding: 12px;
                position: absolute;
                right: 5px;
                z-index: 1;
                color: #FFFFFF;
                cursor: pointer;
                svg{
                    width: 24px;
                    height: 24px;
                    display: block;
                    ${mediaQueries("md")`
                        width: 21px;
                        height: 21px;
                    `}
                    ${mediaQueries("sm")`
                        width: 18px;
                        height: 18px;
                    `}
                }
                &.left-arrow{
                    left: 5px;
                    margin: auto 0;
                    right: auto;
                }
                ${mediaQueries("xl")`
                    width: 70px;
                    height: 70px;
                `}
                ${mediaQueries("lg")`
                    width: 60px;
                    height: 60px;
                `}
                ${mediaQueries("md")`
                    width: 50px;
                    height: 50px;
                `}
                ${mediaQueries("sm")`
                    width: 36px;
                    height: 36px;
                `}
            }
        }
    }
    .text-left{
      text-align:left !important;
    }
    .text-spa-left {
      font-weight: 600;
      color: #295086;
      font-size: 18px;
      padding-bottom: 15px;
    }
    .text-spa-lefts {
      font-weight: 600;
      color: #295086;
      font-size: 20px;
      padding-bottom: 15px;
    }
    .sitback-select-option__menu-portal {
        .sitback-select-option__menu-list {
          padding: 0 12px;
            .sitback-select-option__option {
                /* color: ${theme.color.secondary}; */
                color: #295086;
                font-size: 14px;
                font-style: normal;
                font-weight: 300;
                line-height: normal;
                padding: 15px;
                img {
                    width: 27px !important;
                    height: 19px !important;
                    overflow: hidden;
                    object-fit: contain;
                    margin-right: 10px;
                }
                &.sitback-select-option__option--is-focused {
                    /* background: #f1f1f1; */
                    border-radius: 100px;
                    background: #F2F6F9;
                }
                &.sitback-select-option__option--is-selected {
                    background: ${theme.color.secondary};
                    /* color: ${theme.color.white}; */
                    color: #295086;
                    border-radius: 100px;
                    background: #F2F6F9;
                }
            }
            &::-webkit-scrollbar {
                /* width: 10px; */
                width: 3px;
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
    .booking-radio-lable-wrapper{
      .appointment-label{
        padding: 14px 6px !important;
      }
    }
    .sitback-delete-modal-wrapper{
      .modal-dialog{
        .modal-content{
          .modal-body{
            .sitback-delete-modal-body-wrapper{
              padding: 0;
              h5{
                /* font-weight: 800;
                font-size: 25px;
                line-height: 100%;
                color: #000000; */
                margin-bottom: 30px;
                color: #295086;
                text-align: center;
                font-size: 32px;
                font-style: normal;
                font-weight: 300;
                line-height: 52px;
                letter-spacing: -0.4px;
                ${mediaQueries("xl")`
                   font-size: 30px;
                   line-height: 48px;
                `}
                ${mediaQueries("lg")`
                    font-size: 28px;
                    line-height: 44px;
                `}
                ${mediaQueries("md")`
                   font-size: 26px;
                   line-height: 40px;
                `}
                ${mediaQueries("sm")`
                    font-size: 24px;
                   line-height: 36px;
                `}
                &.delete-modal-title-wrapper{
                  color: #29508699;
                }
              }
              p{
                font-weight: 500;
                font-size: 14px;
                line-height: 100%;
                color: #57565E;
                margin-bottom: 40px;
                text-align: center;
              }
              .confirmation-buttons{
                justify-content: center;
                display: flex;
                align-items: center;
                &.delete-confirmation-btn{
                  .confirm-btn{
                    background: #95CCD5;
                    color: #FBFBFB;
                    padding: 10px 12px;
                    min-width: 130px;
                    max-height: 45px;
                    border: 1px solid #95CCD5;
                    &.cancel-btn{
                      border: 1px solid #295086;
                      color: #295086;
                      background: transparent;
                    }
                  }
                }
                .confirm-btn{
                  background: #FFE0E4;
                  color: #E95060;
                  border: none;
                  min-width: 160px;
                  margin-left: 15px;
                  padding: 12px;
                  border-radius: 25px;
                  font-size: 14px;
                  &.cancel-btn{
                    background: #CFCFCF;
                    margin-left: 0;
                    color: #FBFBFB;
                    min-width: 120px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sitback-main-loader-wrapper{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 70vh;
      &.video-upload-loader{
        min-height: unset;
      }
    }
    .sit-select-city-options-wrapper{
      position: absolute;
      width: calc(100% - 10px);
      z-index: 20;
      background-color: hsl(0, 0%, 100%);
      border-radius: 4px;
      box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
      left: 482px;
      max-height: 300px;
      overflow-y: auto;
      top: 518px;
      max-width: 300px;
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
      ul{
        list-style-type: none !important;
        padding: 0 12px;
        li{
          a{
            color: #295086;
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            padding: 15px;
            display: block;
            &:hover{
              /* background: #f1f1f1; */
              color: #295086;
              border-radius: 100px;
              background: #F2F6F9;
            }
            &:focus{
              /* background: #f1f1f1;*/
              color: #295086;
                    border-radius: 100px;
                    background: #F2F6F9;
            }
          }
        }
      }
    }
    input[type='text'],
    input[type='email'],
    input[type='tel'],
    input[type='number'],
    textarea {
      ${mediaQueries("md")`
        font-size: 16px !important;
      `}
    }
    .dashboard-message-wrapper-div{
      margin-top: 20px;
      .sitback-supoort-and-user-tab-wrapper{
        .tab-content{
          .tab-pane{
            .search-input-wrapper {
              padding: 15px 0px;
              max-width: 600px;
              .search-input-icon-wrapper {
                position: relative;
                input {
                  padding: 14px 24px;
                  font-size: 13px;
                  box-shadow: none;
                  padding-left: 50px;
                  border-radius: 25px;
                  border: 1px solid #C8C7CC;
                  background: #FFF;
                }
                i {
                  width: 16px;
                  height: 16px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  left: 20px;
                  top: 0;
                  bottom: 0;
                  margin: auto;
                  cursor: pointer;
                  &::before{
                    content: unset !important;
                  }
                  svg {
                    color: #29508699;
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                  &::before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 1px;
                    background: #29508699;
                    left: -12px;
                  }
                }
              }
            }
            .message-updaed-layout{
              /* height: 77vh; */
              min-height: 660px;
              box-shadow: none;
              @media screen and (max-width: 1520px){
                min-height: 518px;
              }
              ${mediaQueries("sm")`
                flex-direction: column;
              `}
            }
            .userlist-boxwrapper{
              background: #FCFCFC;
              border-left: none;
              border-bottom: none;
              border-color: #C8C7CC;
              border-radius: unset;
              ${mediaQueries("sm")`
                width: 100%;
                border-right: 0;
                margin-bottom: 20px;
              `}
              .box-wrapper-div{
                padding: 2px 0 0 0;
                /* height: 543px; */
                min-height: 670px;
                @media screen and (max-width: 1520px){
                  min-height: 520px;
                }
                ${mediaQueries("sm")`
                    height: 100%;
                    min-height: unset;
                    max-height: 220px;
                    overflow-y: auto;
                `}
                .userlist-wrapper{
                  border-color: rgba(41, 80, 134, 0.14);
                  &.active{
                    background: #95CCD536;
                    border: none;
                  }
                  .quick-chat-list-wrapper{
                    .userdetailwrapper{
                      .user-detail-wrapper{
                        h3{
                          color: #295086;
                          font-size: 14px;
                          font-weight: 600;
                          line-height: 20px;
                        }
                        p{
                          color: #7C7C7C;
                          font-size: 13px;
                          font-weight: 400;
                          line-height: normal;
                          letter-spacing: 0.26px;
                        }
                      }
                    }
                  }
                  .counter-time{
                    .timetext{
                      color: #7C7C7C;
                      font-size: 12px;
                      font-weight: 400;
                      line-height: normal;
                      letter-spacing: 0.26px;
                    }
                  }
                }
              }
            }
            .chatinnerbox-wrapper{
              border: 1px solid #C8C7CC;
              border-left: 0;
              border-right: 0;
              /* padding: 0 15px; */
              border-bottom-left-radius: 10px;
              min-height: 676px;
              @media screen and (max-width: 1520px){
                height: 525px;
                min-height: 525px;
              }
              ${mediaQueries("sm")`
                min-height: unset;
              `}
              .chat-body-top-wrapper{
                padding: 0 15px;
                ${mediaQueries("sm")`
                  padding: 0 5px;
                `}
              }

              .loader-wrapper{
                background: transparent;
              }
              .chat-inner-headerbar{
                border-color: rgba(205, 216, 231, 0.60);
                padding: 20px 5px;
              }
              .set-chat-body{
                padding: 10px 5px 0;
                &.message{
                  height: 505px;
                  @media screen and (max-width: 1520px){
                    height: 353px;
                  }
                  &::-webkit-scrollbar {
                      width: 0px;
                  }
                  &::-webkit-scrollbar-track {
                      background: transparent;
                  }
                  &::-webkit-scrollbar-thumb {
                      background: #888;
                  }
                  ${mediaQueries("sm")`
                    height: 300px;
                  `}
                }
                .user-chat-box-body-wrapper{
                  .user-chat-box-list{
                    flex-direction: column;
                    .msg-time-text{
                      color: #7C7C7C;
                      font-size: 10px;
                      font-weight: 400;
                      line-height: 20px;
                      letter-spacing: 0.26px;
                    }
                    &.left-box{
                      align-items: flex-start;
                      .chatbox{
                        /* border-radius: 15px 15px 15px 0; */
                        background: #E4E4E4;
                        p{
                          color: #57565E;
                          font-size: 16px;
                          font-weight: 400;
                          line-height: normal;
                        }
                      }
                      .service-booking-box {
                        background: #FBF9F0;
                        border: 1px solid rgba(41,80,134,0.08);
                        padding: 18px 20px;
                        border-radius: 6px;
                        max-width: 360px;
                        width: 100%;
                      }

                      /* ROW: Date Text (left) + Time pill (right) */
                      .date-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 14px;
                      }

                      .time-icon {
                        margin-right: 6px;
                      }

                      .time-text {
                        color: #295086;
                        font-weight: 400;
                        font-size: 13px;
                      }


                      /* Row for Date title + Pill aligned horizontally */
                      .date-header-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 4px;
                      }

                      /* DATE LABEL */
                      .service-booking-box h6 {
                        margin-bottom: 3px;
                        color: #295086;
                        font-size: 14px;
                        font-weight: 700;
                      }

                      /* DATE TEXT */
                      .date-text {
                        color: #6B6B6B;
                        font-size: 13px;
                      }

                      /* TIME PILL */
                      .service-time-pill {
                        display: flex;
                        align-items: center;
                        border: 1px solid #295086;
                        padding: 4px 12px;
                        border-radius: 30px;
                        background: #FFFFFF;
                      }
                      .appointment-status{
                          border-radius: 100px;
                          font-weight: 700;
                          font-size: 10px;
                          line-height: 16px;
                          min-width: 75px;
                          padding: 5px 12px;
                          text-transform: capitalize;
                          &.rejected{
                            color: #E95060;
                            background: #FFEDEF;
                          }
                          &.pastbooking{
                            color: #E95060;
                            background: #FFEDEF;
                          }
                          &.pending{
                            color: #295086;
                            background: #E1E1EF;
                          }
                          &.approved{
                            color: #4A9D77;
                            background: #E2F4EC;
                          }
                      }


                    }
                    &.right-box{
                      align-items: flex-end;
                      .chatbox{
                        background: #95CCD5;
                        p{
                          color: #FFFFFF;
                          font-size: 16px;
                          font-weight: 400;
                          line-height: normal;
                        }
                      }
                    }
                  }
                }
              }
              .chat-footer-wrapper{
                background: rgba(201, 216, 238, 0.24);
                padding: 15px;
                aside{
                  &.epr-main{
                    left: 0;
                    right: unset;
                  }
                }
                .input-wrapper{
                  display: flex;
                  align-items: center;
                  flex-direction: row-reverse;
                  textarea{
                    background: ${theme.color.white};
                    &:disabled {
                      background: #f1f1f1 !important;
                      cursor: not-allowed !important;
                      opacity: 1 !important;
                    }
                  }
                  .emoji-smile{
                    left: 0;
                    right: unset;
                    position: unset;
                    display: block;
                    width: 24px;
                    height: 24px;
                    margin-right: 16px;
                    ${mediaQueries("sm")`
                      margin-right: 10px;
                    `}
                  }
                }
              }
            }
          }
        }
      }
    }
    @-moz-document url-prefix() {
      .video-banner-wrapper video {
        padding-bottom: 20px;
      }
    }
    .cursor-pointer:hover {
      cursor: pointer;
    }
    .sitback-spa-mobile-view-btn-wrapper{
      display: none;
      position: relative;
      ${mediaQueries("sm")`
        display: block;
      `}
      .filter-btn{
        /* background: none;
        border: none; */
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 1000px;
        position: absolute;
        bottom: -25px;
        right: 20px;
        border-radius: 100px;
        border: 2px solid #FFF;
        background: #004D87;
        display: flex;
        justify-content: center;
        z-index: 10;
        align-items: center;
        cursor: pointer;
        i{
          width: 24px;
          height: auto;
          overflow: hidden;
          display: block;
        }
        &:focus{
          box-shadow: none;
          outline: none;
        }
      }
    }
    .get-started-menu-div{
      border-radius: 8px;
      border: 1px solid rgba(0, 123, 255, 0.40);
      background: #F5FBFF;
      box-shadow: 0 8px 7px 0 rgba(41, 80, 134, 0.12);
      .sitback-menu-wrapper{
          .nav-link{
            display: flex;
            align-items: center;
            color: #295086;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            padding: 18px 12px;
            &.active{
              background: #295086;
              box-shadow: 0 18px 25px 0 rgba(0, 0, 0, 0.07);
              color: #FFFFFF;
              border-radius: 8px;
              i{
                svg{
                  path{
                    fill: #FFFFFF;
                  }
                }
              }
            }
            i{
              margin-right: 12px;
              width: 16px;
              height: auto;
              overflow: hidden;
              display: flex;
              justify-content: center;
              svg{
                path{
                  fill: #295086;
                }
              }
            }
          }
      }
    }
      .employee-hours-btn-wrapper{
            border-radius: 100px !important;
            background: #004D87 !important;
            color: #FFF !important;
            text-align: center !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: normal !important;
            text-transform: capitalize !important;
          }
  .sitback-select2-container{
    .sitback-select-option__menu{
      .sitback-select-option__menu-list{
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-track {
          background: #F5F6F8;
        }
        &::-webkit-scrollbar-thumb {
          background: #295086;
          border: 5px solid #295086;
          border-radius: 8px;
          background-clip: padding-box;
        }
      }
    }
  }
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
    .rc-time-picker-clear-icon{
      display: none;
    }

  #hr-datepicker-portal {
    position: relative;
    z-index: 9999;
  }

  .hr-datepicker-portal-popper {
    z-index: 9999 !important;
  }
`;

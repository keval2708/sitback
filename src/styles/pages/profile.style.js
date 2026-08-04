"use client";

// import styled from "styled-components";
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import { TherapistManagementLayoutWrapper } from "./therapist-management.style";
import { theme } from "../global/theme";
import CustomModal from "@/components/shared/modal";
import { mediaQueries } from '@/utils/mediaQuery';



export const ProfileServicesLayoutWrapper = styled.div`
  padding: 45px 0;
  ${(props) =>
    props.isDashboardProfileServiceLayoutWrapper &&
    css`
        padding: 25px 0 45px;
        background: #FCFCFC;
        min-height: 100vh;
        .sitback-updated-notification-div{
          padding: 45px 0;
            .sitback-notification-header{
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              margin-bottom: 21px;
              flex-wrap: wrap;
              ${mediaQueries("sm")`
                margin-bottom: 0;
              `}
              h5{
                font-size: 22px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                color: ${theme.color.secondary};
                ${mediaQueries("sm")`
                  margin-bottom: 21px;
                `}
              }
              .sitback-general-messages-btns{
                display: flex;
                align-items: center;
                button{
                  min-width: 140px;
                  padding: 15px;
                  margin-right: 15px;
                  ${mediaQueries("sm")`
                    margin-bottom: 21px;
                  `}
                  &:last-child{
                    margin-right: 0;
                  }
                }
              }
            }
            .sitback-notification-wrapper{
              .sitback-notification-list-wrapper{
                h6{
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  color: ${theme.color.secondary};
                  margin-bottom: 18px;
                }
                .sitback-notification-list{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                  border-bottom: 1px solid #e3e3e3;
                  margin-bottom: 27px;
                  padding-bottom: 27px;
                  .notification-detail-desc-text{
                    .notification-title-text{
                        font-size: 15px;
                        font-weight: 600;
                        line-height: normal;
                        color: ${theme.color.black};
                        margin-bottom: 4px;
                    }
                    .notification-desc-text{
                        font-size: 14px;
                        font-weight: 500;
                        line-height: normal;
                        color: #A0A0A0;
                    }
                  }
                  .user-details{
                    display: flex;
                    align-items: center;
                    flex: 1;
                    .user-img-wrapper{
                      border-radius: 1000px;
                      border: 2px solid ${theme.color.secondary};
                      background: #C4C4C4;
                      width: 46px;
                      height: 46px;
                      margin-right: 14px;
                      filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.12));
                    }
                    .user-detail-wrapper{
                      margin-right: 15px;
                      h3{
                        font-size: 15px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                        color: #295086;
                        margin-bottom: 2px;
                      }
                      p{
                        color: #A0A0A0;
                        font-size: 12px;
                      }
                    }
                  }
                  p{
                    color: #A0A0A0;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                  }
                  span{
                    color: #A0A0A0;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 26px;
                    width: 150px;
                    display: flex;
                    justify-content: flex-end;
                  }
                }
                .infinite-scroll-component__outerdiv{

                }
              }
              .infinite-scroll-component{
                padding-right: 15px;
                &::-webkit-scrollbar {
                  width: 8px;
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
        .dashboard-profile-main-boxes-row{
          margin-top: 40px;
          .sitback-profile-password-main-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            max-width: 50%;
            margin: auto;
            /* height: 100%;
            min-height: 75vh; */
            ${mediaQueries("md")`
              max-width: 100%;
              // min-height: 70vh;
            `}
            h3{
              font-weight: 800;
              font-size: 26px;
              line-height: 22px;
              color: #000000;
              margin: 40px 0 60px;
              ${mediaQueries("xl")`
                font-size: 25px;
                line-height: 21px;
              `}
              ${mediaQueries("lg")`
                font-size: 24px;
                line-height: 20px;
              `}
              ${mediaQueries("md")`
                font-size: 23px;
                line-height: 19px;
              `}
              ${mediaQueries("sm")`
                font-size: 22px;
                line-height: 20px;
              `}
            }
            .row{
              width: 100%;
              input{
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
              }
              .personal-inform-footer{
                .loading-btn-wrapper{
                  max-width: 300px;
                  min-width: unset;
                  margin: auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  ${mediaQueries("md")`
                    margin-top: 20px;
                  `}
                }
              }
            }
          }
        }
      `}
`;
export const LightyellowBoxWrapper = styled.div`
  margin-bottom: 15px;
  &.sitback-updated-white-box-wrapper{
    .user-profile-block{
      border-radius: 8px;
      border: 1px solid #EAEBEC;
      background: #FFF;
    }
    .user-profile-detail-wrapper{
      .edit-and-embed-code-wrapper{
        button{
          border-radius: 100px;
          background: #295086;
          &.sitback-updated-embed-code-btn-wrapper{
            background: transparent;
            border: 1px solid #295086;
            color: #295086;
          }
        }
      }
      .sitback-updated-save-btn-wrapper{
        border-radius: 100px;
        background: #295086;
      }
    }
    .personal-information-wrapper{
      border-radius: 8px;
      border: 1px solid #EAEBEC;
      background: #FFF;
    }
    form{
      input{
        border-radius: 100px;
        border: 1px solid rgba(218, 218, 218, 0.60);
        background: #FFF;

      }
        .personal-detail-list{
          .react-tel-input{
            .form-control{
              border-radius: 100px;
              border: 1px solid rgba(218, 218, 218, 0.60);
              background: #FFF;
            }
          }
        }
    }
    .user-profile-block{
      .upload-profile-div{
        .upload-profile-icon{
          background: #295086;
        }
      }
      .user-profile-detail-wrapper{
        input{
          border-radius: 100px;
          border: 1px solid rgba(218, 218, 218, 0.60);
          background: #FFF;
          &:disabled{
          background-color: #F8F8FB !important;
          cursor: not-allowed;
        }
        }
      }
    }
  }
  ${(props) =>
    props.isDashboardProfileServiceBoxMainDiv &&
    css`
      .user-profile-block{
        background: #FFFFFF99 !important;
        border: 1px solid #EFEFF4 !important;
        border-radius: 8px !important;
        .user-profile-detail-wrapper{
          input{
            background: #FFFFFF;
            border: 1px solid #EFEFF4;
          }
        }
      }
      .personal-information-wrapper{
        background: #FFFFFF99 !important;
        border: 1px solid #EFEFF4 !important;
        border-radius: 8px !important;
        form{
          .personal-detail-list{
            .form-control {
              background: #FFFFFF;
              border: 1px solid #EFEFF4;
              &:disabled{
                background-color: #F8F8FB !important;
              }
            }
            .react-tel-input {
              .form-control {
                background: #FFFFFF;
                border: 1px solid #EFEFF4;
              }
            }
            .location-input-wrapper-div{
              position: relative;
              input{
                background: #FFFFFF;
                border: 1px solid #EFEFF4;
              }
              .autocomplete-dropdown-container{
        padding: 9px 15px;
        background: ${theme.color.white};
        border-radius: 12px;
        position: absolute;
        top: 50px;
        width: 100%;
        max-height: 250px;
        overflow: auto;
        z-index: 3;
        .suggestion-item{
          display: flex;
          flex-direction: column;
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
          display: inline-block;
          margin-bottom: 5px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          &:hover{
            color: ${theme.color.primary};
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
        .suggestion-item{
        }
      }
            }
          }
        }
      }
    `}
    ${(props) =>
    props.isSitBackSpaPageWrapper &&
    css`
        .amenities-display-wrapper{
            padding: 10px 0;
            .amenities-main-div{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              span{
                background: #FFFFFF;
                border: 1px solid #EAEBEC;
                font-weight: 500;
                font-size: 20px;
                line-height: 100%;
                letter-spacing: 1px;
                color: #29508699;
                padding: 7px 9px 7px 15px;
                border-radius: 100px;
                /* max-width: 27%;
                flex-basis: 27%; */
                min-width: fit-content;
                margin-right: 20px;
                margin-bottom: 18px;
                display: flex;
                align-items: center;
                justify-content: space-between;
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
                  margin-right: 15px;
                `}
                .close-btn-wrapper{
                  background: #F1F4F7;
                  border-radius: 1000px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 19px;
                  height: 19px;
                  overflow: hidden;
                  .btn-img{
                    width: 15px;
                    height: 15px;
                    overflow: hidden;
                    display: flex;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                      &.loader-img-wrappper{
                        transform: scale(0.8);
                      }
                    }
                  }
                }
              }
            }
          }
      `}
  .user-profile-block{
    border-radius: 8px;
    background: #F4F4F499;
    box-shadow: 0px 5px 16px 0px #0000000F;
    padding: 30px 20px;
    .upload-profile-div{
      position: relative;
      width: 210px;
      height: 210px;
      margin: auto;
      ${mediaQueries("xl")`
          width: 200px;
          height: 200px;
      `}
      ${mediaQueries("lg")`
        width: 170px;
        height: 170px;
      `}
      ${mediaQueries("md")`
          width: 140px;
          height: 140px;
      `}
      ${mediaQueries("sm")`
          width: 110px;
          height: 110px;
      `}
      .profile-img{
        width: 206px;
        height: 206px;
        margin: auto;
        overflow: hidden;
        border-radius: 1000px;
        ${mediaQueries("xl")`
          width: 196px;
          height: 196px;
        `}
        ${mediaQueries("lg")`
          width: 164px;
          height: 164px;
        `}
        ${mediaQueries("md")`
            width: 134px;
            height: 134px;
        `}
        ${mediaQueries("sm")`
            width: 104px;
            height: 104px;
        `}
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
      .upload-profile-icon{
        cursor: pointer;
        position: absolute;
        right: 15px;
        bottom: 15px;
        width: 40px;
        height: 40px;
        overflow: hidden;
        background: ${theme.color.primary};
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
          width: 20px;
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
    &.spas-detail-box{
      padding: 15px;
      box-shadow: none;
      .upload-profile-div{
        width: 100%;
        height: 280px;
        ${mediaQueries("xl")`
          height: 260px;
        `}
        ${mediaQueries("lg")`
          height: 240px;
        `}
        ${mediaQueries("md")`
          height: 220px;
        `}
        ${mediaQueries("sm")`
          height: 200px;
        `}
        .profile-img{
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }
      .user-profile-detail-wrapper{
        .edit-and-embed-code-wrapper{
          .loading-btn-wrapper{
            margin: 0;
            padding: 12px;
            max-width: 100%;
            width: 100%;
            min-height: 51px;
          }
        }
      }
    }
  }
  .user-profile-detail-wrapper{
    .input-display-wrapper{
      margin-bottom: 0;
    }
    text-align: center;
    margin-top: 27px;
    ${mediaQueries("xl")`
      margin-top: 25px;
    `}
     ${mediaQueries("lg")`
       margin-top: 20px;
    `}
    button{
      max-width: 220px;
      margin-top: 30px;
      margin-bottom:30px;
      &.cancel-profile-btn{
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    h3{
      margin-bottom: 9px;
      word-break: break-word;
    }
    .gmail-detail-wrapper{
      display: inline-flex;
      flex-direction: column;
      margin-bottom: 15px;
      align-items: center;
      .mail-text{
        color: #4D6B93;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 1px;
        display: inline-flex;
        margin-bottom: 10px;
        word-break: break-word;
        .global_laguage_icon{
          width: 15px;
          height: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 6px;
          svg{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
       .mail-text-home{
        color: #4D6B93;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 1px;
        /* display: inline-flex; */
        display: initial;
        margin-bottom: 9px;
        word-break: break-word;
        pointer-events:none;
        position: relative;
        .global_laguage_icon{
          width: 15px;
          height: 15px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-left: 6px;
          margin-top: 4px;
          position: absolute;
          svg{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .upgrade-text{
        color: ${theme.color.secondary};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-decoration-line: underline !important;
        display: inline-flex;
        margin-bottom: 9px;
        word-break: break-word;
      }
    }
    .social-link-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      li{
        margin: 0 8px;
        a{
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          i{
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg{
            width: 100%;
            height: 100%;
            display: flex;
          }
        }
      }
    }
    .edit-and-embed-code-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      button{
        max-width: 220px;
        margin: 25px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          width: 22px;
          height: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 12px;
        }
      }
    }
      h6{
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 1px;
      color: #295086;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      ${mediaQueries("md")`
        font-size: 13px;
      `}
      ${mediaQueries("sm")`
        font-size: 12px;
      `}
      .star-ratings{
        .star-container {
          display: inline-flex;
          width: 21px;
          height: 21px;
          margin: 0 2px;
          margin-top: -3px;
          padding: 0 !important;
          &:last-child{
            margin-right: 6px
          }
          svg {
            width: 100% !important;
            height: 100% !important;
            display:block;
          }
        }
      }
      span{
        display: inline-flex;
        width: 15px;
        height: 15px;
        margin: 0 2px;
        margin-top: -1px;
        &:last-child{
          margin-right: 6px
        }
        i{
          width: 15px;
          height: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          svg{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
  .personal-information-wrapper{
    padding: 25px;
    padding-bottom: 10px;
    background:#F4F4F499;
    box-shadow: 0px 5px 16px 0px #0000000F;
    border-radius:8px;

    .personal-information-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 25px;
      h3{
        width: calc(100% - 45px);
      }
      .edit-profile-icon{
        width: 36px;
        height: 36px;
        background: #DEDFDF;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        i{
          width: 18px;
          height: 18px;
          display: flex;
          svg{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    .personal-detail-list{
      margin-bottom: 30px;
      h4{
        margin-bottom: 6px;
        font-size:17px;
      }
      .link-text{
        color: #29508699;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        display: inline-block;
        word-break: break-word;
      }
    }
    form{
      .personal-detail-list{
        input{
          max-width: 300px;
          padding: 12px 18px;
          &:disabled{
            background-color: #F8F8FB !important;
            cursor: not-allowed;
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
            min-height: 45px;
            box-shadow: none;
            outline: none;
            &:focus{
              box-shadow: none;
            }
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
      }
      .text-error {
        margin-top: -20px;
        font-size: 0.875em;
        padding-left: 10px;
      }
    }
    .warning-msg {
      background-color: #FFF8DC;           /* Light yellow (same as screenshot) */
      color: #6A6A6A;                       /* Soft grey text */
      padding: 14px 16px;
      border: 1px solid #F1E4B3;            /* Very light golden border */
      border-left: 4px solid #E8C948;        /* Yellow accent bar – same as screenshot */
      border-radius: 6px;                    /* Slight round */
      font-size: 14px;
      margin-bottom: 10px;
      width: 100%;                           /* Full width */
      display: block;
    }

    .personal-inform-footer{
      &.sitback-updated-personal-inform-footer{
        button{
        background: #295086;
          &.sitback-updated-cancel-button-wrapper{
            background: transparent;
    border: 1px solid #295086;
    color: #295086;
          }
        }
      }
      display: flex;
      align-items: center;
      max-width: 440px;
      width: 100%;
      margin: 0 auto 18px;
      button{
        padding: 14px;
        margin: 0 12px;
      }
    }
    .location-input-wrapper-div{
      position: relative;
      /* input{
        box-shadow: none !important;
        border: none !important;
      } */
      .autocomplete-dropdown-container{
        padding: 9px 15px;
        background: ${theme.color.white};
        border-radius: 12px;
        position: absolute;
        top: 50px;
        width: 100%;
        max-height: 250px;
        overflow: auto;
        z-index: 3;
        .suggestion-item{
          display: flex;
          flex-direction: column;
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
          display: inline-block;
          margin-bottom: 5px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          &:hover{
            color: ${theme.color.primary};
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
        .suggestion-item{
        }
      }
    }
  }
`;
export const OurServicesTabWrapper = styled.div`
  padding: 21px 15px;
  box-shadow: 0px 5px 16px 0px #0000000F;
  background: #F4F4F499;
  border-radius: 8px;
  &.sitback-updated-our-services-tab-div{
  border-radius: 8px;
border: 0.5px solid #EAEBEC;
background: rgba(255, 255, 255, 0.60);
  }
  ${(props) =>
    props.isDashboardProfileServiceTabSectionWrapper &&
    css`
      background: #FFFFFF99 !important;
      border: 1px solid #EFEFF4 !important;
      border-radius: 8px !important;
      .nav{
        .nav-item{
          .nav-link{
            font-weight: 500 !important;
            font-size: 15px !important;
            line-height: 16px !important;
            letter-spacing: 1px !important;
            color: #29508699 !important;
            &.active{
              color: #295086 !important;
              font-weight: 700 !important;
            }
          }
        }
      }
      .hours-main-display-div{
        .hours-set-all-days-toolbar{
          display: flex;
          justify-content: center;
          margin-bottom: 35px;
          .hours-set-all-days-btn{
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            text-transform: uppercase;
            padding: 10px 16px;
            border-radius: 100px;
            border: none;
            background: #29508D;
            color: #FFFFFF;
            cursor: pointer;
            &:disabled{
              opacity: 0.6;
              cursor: not-allowed;
            }
          }
        }
        .sitback-hours-detail-div{
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 520px;
          width: 100%;
          margin: auto;
          margin-bottom: 35px;
          flex-wrap: wrap;
          .hours-day-text{
            font-weight: 400;
            font-size: 16px;
            line-height: normal;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #29508699;
            width: 140px;
            // ${mediaQueries("xl")`
            //   font-size: 17px;
            // `}
            // ${mediaQueries("lg")`
            //   font-size: 16px;
            // `}
            ${mediaQueries("md")`
              font-size: 15px;
            `}
            ${mediaQueries("sm")`
              font-size: 14px;
            `}
          }
          .sitback-right-date-time-main-div{
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex: 1;
              flex-wrap: wrap;
              gap: 5px;
              .time-select-form{
                flex: 1;
              }
              .switch-btn{
                width: 120px;
                display: flex;
                align-items: center;
                .switch-text{
                  display: flex;
                  align-items: center;
                  span{
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 16px;
                    letter-spacing: 1px;
                    color: #295086;
                    margin-left: 6px;
                    display: inline-block;
                  }
                }
                div{
                  .react-switch-bg{
                    height: 23px !important;
                    width: 51px !important;
                    > div{
                      display: none !important;
                    }
                  }
                  .react-switch-handle{
                    height: 21px !important;
                    width: 21px !important;
                    transform: translateX(24px);
                  }
                }
              }
            .edit-start-end-time-div{
              display: flex;
              align-items: center;
              .start-end-time-text{
                font-weight: 400;
                font-size: 15px;
                line-height: 16px;
                letter-spacing: 1px;
                color: #29508699;
                margin-right: 40px;
                ${mediaQueries("xl")`
                  // font-size: 17px;
                  margin-right: 35px;
                `}
                ${mediaQueries("lg")`
                  // font-size: 16px;
                  margin-right: 30px;
                `}
                ${mediaQueries("md")`
                  font-size: 15px;
                  margin-right: 20px;
                `}
                ${mediaQueries("sm")`
                  font-size: 14px;
                  margin-right: 8px;
                  margin-left: 5px
                `}
              }
              .edit-remove-btn-div{
                display: flex;
                min-width: 46px;
                .edit-btn-div{
                  justify-content: flex-start;
                  display: flex;
                }
                .remove-btn-div{
                  justify-content: flex-end;
                  display: flex;
                }
              }
              .close-btn-wrapper{
                width: 19px;
                height: 19px;
                overflow: hidden;
                border-radius: 1000px;
                padding: 0;
                margin: 0 0 0 8px;
                outline: none;
                background: #E3E3DD;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                  display: block;
                  /* width: 16px; */
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
              .edit-btn-wrapper{
                width: 19px;
                height: 19px;
                overflow: hidden;
                border-radius: 1000px;
                padding: 0;
                margin: 0;
                outline: none;
                background: #E3E3DD;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                  display: block;
                  width: 12px;
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
          }
          .time-select-form{
            .time-select-div{
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              .form-control{
                max-width: 100px;
                border: 1px solid #EFEFF4;
                background: #FFFFFF;
                font-weight: 400;
                font-size: 14px !important;
                line-height: 16px;
                color: #8A8A8F;
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
                          .hours-main-display-div{
                          max-width: 650px;
                          margin: 0 auto;

              .hours-header-flex {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 25px;
                border-bottom: 1px solid #EAEBEC;
                padding-bottom: 15px;

                .hours-header-left {
                  display: flex;
                  align-items: center;
                  gap: 15px;
                  h3 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #295086;
                    margin: 0;
                  }
                  .hours-date-range {
                    font-size: 14px;
                    color: #4D6B93;
                    font-weight: 500;
                    margin: 0;
                  }
                  .hours-nav-arrows {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    button {
                      background: transparent;
                      border: 1px solid #EAEBEC;
                      border-radius: 50%;
                      width: 28px;
                      height: 28px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #295086;
                      cursor: pointer;
                      font-size: 14px;
                      transition: all 0.2s ease;
                      &:hover {
                        background: #F1F4F7;
                        border-color: #295086;
                      }
                    }
                  }

                }

                .hours-apply-all-btn {
                  border-radius: 100px;
                  background: #004D87;
                  color: #fff;
                  border: none;
                  padding: 8px 18px;
                  font-size: 12px;
                  font-weight: 700;
                  text-transform: uppercase;
                  cursor: pointer;
                  transition: background 0.2s ease;
                  &:hover {
                    background: #003660;
                  }
                  &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                  }
                }
              }

        .sitback-hours-detail-div {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          width: 100%;

          .hours-day-date-col {
            display: flex;
            flex-direction: column;
            width: 70px;
            .hours-day-name {
              font-weight: 700;
              font-size: 14px;
              color: #295086;
              margin: 0;
            }
            .hours-date-label {
              font-size: 12px;
              color: #8A8A8F;
              margin: 0;
            }
          }
          .hours-toggle-col {
            display: flex;
            align-items: center;
          }
          .hours-bar-col {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #EEF5FC;
            border-radius: 6px;
            padding: 10px 15px;
            min-height: 44px;

            .hours-time-range-text {
              font-size: 14px;
              color: #295086;
              font-weight: 500;
              margin: 0;
              &.closed {
                color: #E32C1F;
              }
            }

            .hours-edit-icon-btn {
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              display: flex;
              align-items: center;
              color: #4D6B93;
              transition: opacity 0.2s ease;
              &:hover {
                opacity: 0.8;
              }
              svg {
                width: 16px;
                height: 16px;
              }
            }

            .hours-inline-edit-form {
              display: flex;
              align-items: center;
              gap: 10px;
              width: 100%;
              .hours-time-picker-wrap {
                display: flex;
                align-items: center;
                gap: 8px;
                .rdt {
                  width: 100px;
                  .form-control {
                    background: #fff;
                    border: 1px solid #DADADA;
                    border-radius: 4px;
                    padding: 4px 8px;
                    font-size: 13px;
                    text-align: center;
                    height: 32px;
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
                .hours-to-separator {
                  font-size: 13px;
                  color: #4D6B93;
                  font-weight: 500;
                }
              }
              .hours-edit-actions {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-left: auto;
                button {
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  padding: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  transition: background 0.2s ease;
                  &:hover {
                    background: #e1edf8;
                  }
                  &.save-btn {
                    color: #24A813;
                    svg {
                      width: 16px;
                      height: 16px;
                      stroke: #24A813;
                    }
                  }
                  &.cancel-btn {
                    color: #E32C1F;
                    svg {
                      width: 14px;
                      height: 14px;
                      path {
                        fill: #E32C1F;
                      }
                    }
                  }
                }
              }
            }
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
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;

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
                font-weight: 600;
                padding: 6px 14px;
                border-radius: 100px;
                text-align: center;
                min-width: 75px;

                &.closed {
                  background: #FFF2F1;
                  color: #E32C1F;
                  border: 1px solid #FFD8D6;
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
        }

        .hours-save-schedule-footer {
          display: flex;
          justify-content: flex-start;
          margin-top: 35px;
          padding-top: 20px;
          border-top: 1px solid #EAEBEC;
          .save-schedule-btn {
            background: #004D87;
            color: #fff;
            border: none;
            border-radius: 100px;
            padding: 12px 28px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            transition: background 0.2s ease;
            &:hover {
              background: #003660;
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
              .separator-text{
                font-weight: 400;
                font-size: 14px;
                line-height: 16px;
                color: #29508699;
                margin: 0 4px;
              }
            }
            .time-btn-div{
              display: flex;
              align-items: center;
              .save-btn{
                font-weight: 600;
                font-size: 12px;
                line-height: 16px;
                text-align: center;
                text-transform: uppercase;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 8px;
                border-radius: 100px;
                min-width: 80px;
                background: #95CCD5;
                color: #FFFFFF;
                border: none;
                max-height: 32px;
                &.cancel-btn{
                  margin-left: 8px;
                  background: transparent;
                  border: 1px solid #295086;
                  color: #295086;
                }
              }
            }
            .error-text{
              color: #E95060;
              font-size: 12px;
              font-weight: 500;
              line-height: normal;
            }
          }
        }
      }
      .amenities-display-wrapper{
        max-width: 690px;
        margin: 0 auto;
        padding: 10px 0;
        .amenities-main-div{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span{
            background: #FBFBFB;
            border: 1px solid #EAEBEC;
            font-weight: 500;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 1px;
            color: #295086;
            padding: 7px 25px 7px 12px;
            border-radius: 5px;
            /* max-width: 27%;
            flex-basis: 27%; */
            min-width: 195px;
            margin-right: 35px;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            ${mediaQueries("xl")`
              font-size: 19px;
              margin-right: 30px;
            `}
            ${mediaQueries("lg")`
              font-size: 18px;
              margin-right: 25px;
            `}
            ${mediaQueries("md")`
              font-size: 17px;
              margin-right: 20px;
            `}
            ${mediaQueries("sm")`
              font-size: 16px;
              margin-right: 15px;
            `}
            .close-btn-wrapper{
              background: #F1F4F7;
              border-radius: 1000px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 19px;
              height: 19px;
              overflow: hidden;
              position: absolute;
              right: 8px;
              top: 0;
              bottom: 0;
              margin: auto;
              .btn-img{
                width: 15px;
                height: 15px;
                overflow: hidden;
                display: flex;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                  &.loader-img-wrappper{
                    transform: scale(0.8);
                  }
                }
              }
            }
          }
        }
        &.flex-row-wrapper{
          max-width: 100%;
          margin: 0;
          padding: 0;
          .amenities-main-div-row{
            margin: -9px;
            margin: -9px;
            display: flex;
            flex-wrap: wrap;
            .amenities-col{
              padding: 9px;
              flex: 0 0 33.33%;
              ${mediaQueries("md")`
                flex: 0 0 50%;
              `}
              ${mediaQueries("sm")`
                flex: 0 0 100%;
              `}
              button{
                width: 100%;
                min-width: 100%;
                max-width: 100%;
              }
            }
          }
          .amenities-main-div{
            margin: -9px;
            margin-bottom: 9px;
            align-items: flex-start;
            .flex-grid-wrapper{
              padding: 9px;
              margin: 0;
              flex: 0 0 33.33%;
              ${mediaQueries("md")`
               flex: 0 0 50%;
              `}
              ${mediaQueries("sm")`
               flex: 0 0 100%;
              `}
              span{
                margin: 0;
                min-width: 100%;
                width: 100%;
                max-width: 100%;
                min-height: 40px;
              }
            }
          }
        }
        .add-amenities-btn{
          background: #FFFFFFC2;
          border: 1px solid #EAEBEC;
          font-weight: 500;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 1px;
          color: #295086;
          display: flex;
          align-items: center;
          padding: 10px 15px 10px 19px;
          border-radius: 8px;
          .plus-icon{
            width: 40px;
            height: 40px;
            border-radius: 1000px;
            overflow: hidden;
            display: block;
            margin-right: 15px;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .profile-section-icon{
            margin-right: 10px !important;
          }
        }
      }
      .upgrade-tab-detail-div{
        padding: 10px 30px 25px;
        ${mediaQueries("xl")`
          padding: 10px 25px 25px;
        `}
        ${mediaQueries("lg")`
          padding: 10px 20px 25px;
        `}
        ${mediaQueries("md")`
          padding: 10px 15px 25px;
        `}
        ${mediaQueries("sm")`
          padding: 10px 10px 25px;
        `}
        .upgrade-header-div{
          text-align: center;
          margin-bottom: 60px;
          ${mediaQueries("lg")`
            margin-bottom: 50px;
          `}
          ${mediaQueries("md")`
            margin-bottom: 40px;
          `}
          ${mediaQueries("sm")`
            margin-bottom: 30px;
          `}
          h5{
            color: #295086;
            font-size: 16px;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 1px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            ${mediaQueries("md")`
              font-size: 15px;
            `}
            ${mediaQueries("sm")`
              font-size: 14px;
            `}
            i{
              margin-right: 10px;
              width: 16px;
              height: auto;
              margin-top: -4px;
              ${mediaQueries("md")`
                margin-top: -2px;
              `}
            }
          }
          p{
            color: #4D6B93;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
            max-width: 600px;
            margin: auto;
            ${mediaQueries("md")`
              font-size: 13px;
            `}
            ${mediaQueries("sm")`
              font-size: 12px;
            `}
          }
        }
        .spotlight-plan-div{
          display: flex;
          margin: 0 -10px;
          ${mediaQueries("lg")`
            flex-direction: column;
            margin: 0;
          `}
          .spotlight-main-box-wrapper{
            max-width: 50%;
            flex-basis: 50%;
            padding: 0 10px;
            ${mediaQueries("lg")`
              max-width: 100%;
              flex-basis: 100%;
              padding: 10px 0;
            `}
            .plan-box-div{
              width: 100%;
              border-radius: 8px;
              border: 1px solid #EFEFF4;
              background: rgba(255, 255, 255, 0.60);
              padding: 25px 25px 20px;
              position: relative;
              min-height: 375px;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              ${mediaQueries("xl")`
                padding: 20px 20px 15px;
              `}
              ${mediaQueries("lg")`
                padding: 20px 15px 15px;
              `}
              .popular-span{
                display: none;
              }
              &.most-popular-plan-box{
                border: 2px solid #95CCD5;
                .popular-span{
                  position: absolute;
                  top: 0;
                  right: 20px;
                  color: #FFF;
                  text-align: center;
                  font-size: 12px;
                  font-weight: 600;
                  line-height: normal;
                  border-radius: 0 0 5px 5px;
                  background: #2AC47E;
                  padding: 2px 9px;
                  min-width: 115px;
                  display: block;
                }
              }
              h5{
                color: #295086;
                font-size: 16px;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 1px;
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                ${mediaQueries("md")`
                  font-size: 15px;
                `}
                ${mediaQueries("sm")`
                  font-size: 14px;
                `}
                i{
                  display: block;
                  width: 18px;
                  height: auto;
                  overflow: hidden;
                  margin-right: 6px;
                }
              }
              .extra-month-text{
                color: #295086;
                font-size: 14px;
                font-weight: 600;
                line-height: normal;
                margin-bottom: 15px;
                span{
                  color: rgba(138, 138, 143, 0.60);
                  font-weight: 400;
                }
              }
              .plan-desc{
                color: #4D6B93;
                font-size: 11px;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 1px;
                margin-bottom: 25px;
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
              button{
                border-radius: 100px;
                background: #95CCD5;
                margin-top: 15px;
                padding: 16px;
                border: none;
              }
            }
          }
        }
      }
    `}
  .nav{
    border-bottom: 1px solid ${theme.color.border};
    padding-bottom: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
    flex-wrap: unset;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      /* width: 10px; */
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #E9DEDE;
    }
    &::-webkit-scrollbar-thumb {
      background: #295086;
    }
    .nav-item{
      // flex: 0 0 25%;
      .nav-link{
        color: #29508699;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 1px;
        padding: 0;
        background: transparent;
        outline: none;
        box-shadow: none;
        margin: 0 15px;
        position: relative;
        ${mediaQueries("lg")`
          font-size: 15px;
        `}
        ${mediaQueries("md")`
          font-size: 14px;
        `}
        &:before{
          position: absolute;
          content: '';
          width: calc(100% - 6px);
          height: 7px;
          background: ${theme.color.secondary};
          left: 0;
          right: 0;
          bottom: -18px;
          opacity: 0;
          margin: auto;
        }
        &.active{
          font-weight: 600;
          color: ${theme.color.secondary};
          &:before{
            opacity: 1;
          }
        }
      }
    }
  }
  .tab-content{
    padding: 15px;
    min-height: 270px;
    .services-category-list-wrapper{
      display: flex;
      /* flex-wrap: wrap;
      margin: -8px; */
      .grid-cols{
        /* width: 140px; */
        max-width: 170px;
        min-width: 170px;
        margin: 8px;
        /* flex: 0 0 156px;
        padding: 8px; */
      }

      .whitebox-wrapper{
        padding: 8px;
        background: ${theme.color.white};
        border: 1px solid #EAEBEC;
        border-radius: 8px;
        text-align: center;
        width: 100%;
        min-height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 100%;
        > div {
          width: 100%;
        }
        .cursor-pointer {
          cursor: pointer !important;
        }
        h4 {
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &.addmore-servicebox{
          justify-content: center;
          background: #ffffffc2;
          .add-icon-wrapper{
            width: 60px;
            height: 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            i{
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              svg{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
          p{
            margin: 12px 0 0;
          }
          &.grey-box-wrapper{
            background: #F5F5F5;
          }

        }
        .dropdown{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          .dropdown-toggle{
            width: 24px;
            height: 24px;
            border: none;
            box-shadow: none;
            padding: 0;
            background: #F1F4F7;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:after{
              content: unset;
            }
            i{
              width: 18px;
              height: 8px;
              display: flex;
              svg{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        .icon-wrapper{
          width: 70px;
          height: 47px;
          margin: 10px auto 15px;
          .provider-image{
            border-radius: 1000px;
          }
          /* img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              border-radius: 1000px;
          } */
        }
        .hour-text {
          display: flex;
          justify-content: space-between;
          border-bottom:  1px solid #EAEBEC;
          padding: 6px 0;
          &:last-child {
            border-bottom: none;
          }
          p {
            color: ${theme.color.secondary};
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: normal;
            line-height: normal;
            letter-spacing: 1px;
            // margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &.rating-text{
            display: flex;
            align-items: center;
            justify-content: center;
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
            span{
              display: flex;
              align-items: center;
              i{
                width: 15px;
                height: 15px;
                display: flex;
                width: 15px;
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 8px;
                margin-top: -2px;
                svg{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        .paragraph-text{
          color: ${theme.color.secondary};
          text-align: center;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 1px;
          margin-bottom: 12px;
          /* display: -webkit-box; */
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .massage-specialist-section{
      h3{
        margin: 21px 0 7px;
      }
      &.sitback-updated-massage-specialist-section-wrapper{
        .services-category-wrapper{
          .services-category-list-wrapper{
            .whitebox-wrapper{
               &.sitback-massage-specialist-box-wrapper{
                background: #FF0000;
              }
              &.grey-box-wrapper{
                background: #F5F5F5;
              }
              &.sitback-white-box-updated-div{
                .dropdown{
                  .dropdown-toggle{
                    background: #D9D9D9 !important;
                    i{
                      width: 12px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                  .dropdown-menu{
                    filter: drop-shadow(0px 11px 24px rgba(0, 0, 0, 0.1));
                    overflow: visible;
                    top: 3px !important;
                    border-color: #EAEBEC;
                    /* &:before {
                      position: absolute;
                      content: '';
                      width: 14px;
                      height: 14px;
                      background: red;
                      left: 15px;
                      transform: rotate(45deg);
                      top: -8px;
                      background: white;
                      border: 0.5px solid #EAEBEC;
                      z-index: -1;
                    } */
                    .dropdown-item{
                      background: white;
                      text-align: start !important;
                      font-weight: 400;
                      padding: 8px 15px;
                    }
                  }
                }
                &:hover{
                  border-color: #007BFF;
                  background: #DFECF9;
                  .dropdown-toggle{
                    background: #295086 !important;
                    i{
                      svg{
                        path{
                          stroke: #FFF !important;
                        }
                      }
                    }
                  }
                  .sitback-dropdown-img-content-div{
                    background: #FCFCFC;
                  }
                  .hour-text{
                    border-bottom: 1px solid #FFF;
                    &:last-child{
                      border-bottom: none;
                    }
                  }
                }
              }
              .dropdown{
                .dropdown-toggle{
                  background: #D9D9D9 !important;
                  i{
                    width: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                }
                .dropdown-menu{
                  filter: drop-shadow(0px 11px 24px rgba(0, 0, 0, 0.1));
                  overflow: visible;
                  top: 3px !important;
                  border-color: #EAEBEC;
                  /* &:before {
                    position: absolute;
                    content: '';
                    width: 14px;
                    height: 14px;
                    background: red;
                    left: 15px;
                    transform: rotate(45deg);
                    top: -8px;
                    background: white;
                    border: 0.5px solid #EAEBEC;
                    z-index: -1;
                  } */
                  .dropdown-item{
                    background: white;
                    text-align: start !important;
                    font-weight: 400;
                    padding: 8px 15px;
                  }
                }
              }
            }
          }
        }
      }
      .services-category-wrapper{
        .services-category-list-wrapper{
          .grid-cols{
            .whitebox-wrapper{
              .dropdown{
                .dropdown-menu{
                  .dropdown-item{
                    text-align: center;
                  }
                }
              }
              .icon-wrapper{
                width: 98px;
                height: 98px;
                margin: -15px auto 0;
                border-radius: 100px;
                overflow: hidden;
                border: 1px solid #295086;
                padding: 3px;
              }
              .paragraph-text{
                -webkit-line-clamp: 1;
                width: 114px;
              }
            }
          }
        }
      }
    }
    .services-category-wrapper{
      display: flex;
      position: relative;
      &.sitback-updated-category-display-div{
        .services-category-list-wrapper{
          .grid-cols{
            .whitebox-wrapper{
              border-radius: 8px;
              border: 1px solid #EAEBEC;
              background: #FFF;
              &.sitback-massage-specialist-box-wrapper{
                background: #FF0000;
              }
              &.grey-box-wrapper{
                background: #F5F5F5;
              }
              &.sitback-white-box-updated-div{
                .dropdown{
                  .dropdown-toggle{
                    background: #D9D9D9 !important;
                    i{
                      width: 12px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                  .dropdown-menu{
                    filter: drop-shadow(0px 11px 24px rgba(0, 0, 0, 0.1));
                    overflow: visible;
                    top: 3px !important;
                    border-color: #EAEBEC;
                    /* &:before {
                      position: absolute;
                      content: '';
                      width: 14px;
                      height: 14px;
                      background: red;
                      left: 15px;
                      transform: rotate(45deg);
                      top: -8px;
                      background: white;
                      border: 0.5px solid #EAEBEC;
                      z-index: -1;
                    } */
                    .dropdown-item{
                      background: white;
                      text-align: start !important;
                      font-weight: 400;
                      padding: 8px 15px;
                    }
                  }
                }
                &:hover{
                  border-color: #007BFF;
                  background: #DFECF9;
                  .dropdown-toggle{
                    background: #295086 !important;
                    i{
                      svg{
                        path{
                          stroke: #FFF !important;
                        }
                      }
                    }
                  }
                  .sitback-dropdown-img-content-div{
                    background: #FCFCFC;
                  }
                  .hour-text{
                    border-bottom: 1px solid #FFF;
                    &:last-child{
                      border-bottom: none;
                    }
                  }
                }
              }
              .dropdown{
                .dropdown-toggle{
                  background: #D9D9D9 !important;
                }
              }
                .sitback-dropdown-img-content-div{
                  border-radius: 6px;
                  background: #FBFBFB;
                  padding: 6px;
                  margin-bottom: 12px;
                }
            }
          }

        }
      }
      .services-category-list-wrapper{
        flex-wrap: unset;
        &.services-category-main{
          max-width: calc(100% - 141px);
          overflow: auto;
          margin-right: 8px;
          &::-webkit-scrollbar {
            /* width: 10px; */
            height: 6px;
          }
          &::-webkit-scrollbar-track {
            background: #E9DEDE;
          }
          &::-webkit-scrollbar-thumb {
            background: #295086;
            border-radius: 8px;
          }
        }&.services-category-home{
          max-width: 100%;
          overflow: auto;
          margin-right: 8px;
          &::-webkit-scrollbar {
            /* width: 10px; */
            height: 6px;
          }
          &::-webkit-scrollbar-track {
            background: #E9DEDE;
          }
          &::-webkit-scrollbar-thumb {
            background: #295086;
            border-radius: 8px;
          }
          &.sqaure-user-icon{
            .grid-cols{
              .whitebox-wrapper{
                .icon-wrapper{
                  border-radius: 0;
                  width: 65px;
                  height: 65px;
                }
              }
            }
          }
        }
        &.added-iconbox{
          display: unset;
          flex-wrap: unset;
          margin: unset;
          max-width: 140px;
          min-width: 140px;
          margin-bottom: 15px;
          .grid-cols{
            width: 100%;
            height: 100%;
            padding: 0;
            margin-left: 0;
            margin-right: 0;
          }
        }

      }
    }
    .map-imagabox{
      width: 100%;
      height: 455px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .appointments-detail-wrapper{
      position: relative;
      .datepicker-input{
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
        &:-webkit-autofill:active{
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

        /*  */
        width: 100%;
        box-shadow: none;
        border: none;
        padding: 15px 22px;
        font-size: 12px;
        background: ${theme.color.lightwhite};
        max-width: 350px;
        font-weight: 300;
      }
      .sitback-select2-container{
        max-width: 525px;
        width: 100%;
      }
      .year-input-wrapper{
        margin-bottom: 25px;
        select{
          box-shadow: none;
          font-size: 14px;
          padding: 8px 15px;
          border-radius: 6px;
          background-color: ${theme.color.white};
          border: none;
          width: 100px;
          background-size: 12px;
          background-position: right 12px center;
        }
      }
      select{
        max-width: 524px;
        box-shadow: none;
      }
      .radio-list-wrapper{
        display: flex;
        margin-bottom: 25px;
        .radio-wrapper-div{
          margin-right: 15px;
          &:last-child{
            margin-right: 0px;
          }
          input[type=radio] {
            display: none;
          }
          label{
            display: inline-flex;
            align-items: center;
            width: 100%;
            p{
              color: ${theme.color.secondary};
              font-size: 15px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              letter-spacing: 1px;
            }
          }
          input[type=radio] + label{
            border: solid 1px ${theme.color.white};
            border-radius:  8px;
            color: ${theme.color.secondary};
            padding: 10px;
            background-color: ${theme.color.white};
            cursor: pointer;
            user-select: none;
            width: 43px;
            height: 43px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1000px;
          }
          input[type=radio]:checked + label{
            border: solid 1px ${theme.color.primary};
            color: ${theme.color.white};
            background-color: ${theme.color.primary};
            p{
              color: ${theme.color.white};
            }
          }
        }
      }
      .timelist-wrapper{
        display: flex;
        align-items: flex-start;
        .time-booked-list{
          display: flex;
          /* flex-wrap: wrap; */
          li{
            border: solid 1px ${theme.color.secondary};
            border-radius:  8px;
            color: ${theme.color.secondary};
            padding: 10px;
            background-color: #EEEEEE;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            min-width: 115px;
            min-height: 43px;
            &:last-child{
              margin-right: 0;
            }
            p{
              color: ${theme.color.secondary};
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: 1px;
            }
            i{
              width: 12px;
              height: 12px;
              display: flex;
              align-items: center;
              margin-left: 6px;
              cursor: pointer;
              svg{
                width: 100%;
                height: 100%;
                display: block;
                path{
                  fill: ${theme.color.secondary};
                }
              }
            }
            &.add-time-btn{
              cursor: pointer;
              i{
                width: 21px;
                height: 21px;
                margin: 0 9px 0 0;
                svg{
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
            }
            .slot-count{
              min-width: 18px;
              min-height: 18px;
              border-radius: 1000px;
              background: #D9D9D9;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 10px;
              font-weight: 500;
              margin-left: 6px;
            }
          }
          &.timelist-btn{
            max-width: calc(100% - 170px);
            overflow: auto;
            padding-bottom: 5px;
            &::-webkit-scrollbar {
              /* width: 10px; */
              height: 6px;
            }
            &::-webkit-scrollbar-track {
              background: #E9DEDE;
            }
            &::-webkit-scrollbar-thumb {
              background: #295086;
            }
          }
          &.added-more{
            margin-bottom: 15px;
            li{
              margin-left: 12px;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
`;
export const GalleryImageBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 280px;
  .grid-row-div{
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
    .grid-col-wrapper{
      padding: 10px;
      flex: 0 0 25%;
      &:nth-of-type(1){
        flex: 0 0 50%;
      }
      &:nth-of-type(6){
        flex: 0 0 50%;
      }
      &:nth-of-type(7){
        flex: 0 0 50%;
      }
      &:nth-of-type(12){
        flex: 0 0 50%;
      }
      &:nth-of-type(13){
        flex: 0 0 50%;
      }
      &:nth-of-type(18){
        flex: 0 0 50%;
      }
      &:nth-of-type(19){
        flex: 0 0 50%;
      }
      &:nth-of-type(24){
        flex: 0 0 50%;
      }
      &:nth-of-type(25){
        flex: 0 0 50%;
      }
      .gallery-image-box-div{
        width: 100%;
        height: 160px;
        overflow: hidden;
        border-radius: 8px;
        position: relative;
        .delete-icon-box{
          width: 30px;
          height: 30px;
          border: none;
          box-shadow: none;
          padding: 0;
          background: #F1F4F7;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: absolute;
          right: 12px;
          bottom: 12px;
          i{
            width: 18px;
            height: 18px;
            display: block;
            svg{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .gallery-img{
          width: 100%;
          height: 100%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        }
      }
    }
  }
  .add-icon-wrapper{
    width: 60px;
    height: 60px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 15px;
    bottom: 25px;
    cursor: pointer;
    /* right: -10px;
    bottom: -15px;
    cursor: pointer; */
    &.sitback-updated-add-icon{
      i{
        svg{
          circle{
            fill: #295086;
          }
        }
      }
    }
    i{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      svg{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
export const ClientReviewsBlock = styled.div`
  .sitback-review-block{
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #a7b0bd4d;
    &:last-child{
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    h5{
      color: ${theme.color.secondary};
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 5px;
    }
    .review-start{
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      position: relative;
      .react-stars{
        overflow: visible !important;
        display: flex !important;
        align-items: center !important;
      }
      span{
        line-height: 15px;
        margin-right: 5px;
      }
      p{
        color: #898A8D;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: -2px;
        margin-left: 5px;
        position: unset !important;
        left: unset;
        right: -8px;
      }
    }
    .sitback-review-msg-block{
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: flex-start;
      /* margin-bottom: 15px; */
      p{
        color: ${theme.color.darkblue};
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        margin-right: 15px;
        flex: 1;
        word-break: break-word;
      }
      span{
        display: inline-flex;
        color: #898A8D;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
        justify-content: flex-end;
        width: 100px;
      }
    }

    .replied-msg-block{
      display: flex;
      align-items: flex-start;
      margin-top: 5px;
      flex-direction: column;
      &.sitback-updated-msg-block{
          form{
            textarea{
              border: 1px solid rgba(218, 218, 218, 0.60);
              background: #FFF;
            }
          }
            button{
              border-radius: 100px;
              border: 1px solid rgba(218, 218, 218, 0.60);
              background: #295086;
              color: #FFF;
              text-align: center;
              font-size: 12px;
              font-weight: 500;
              line-height: normal;
            }
      }
      p{
        color: ${theme.color.darkblue};
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
      h4{
        display: flex;
        align-items: center;
        i{
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          color: ${theme.color.secondary};
          svg{
            display: block;
            width: 100%;
            height: 100%;
          }
          &.down-icon{
            width: 14px;
            height: 14px;
            cursor: pointer;
          }
        }
        p{
          color: #2950869e;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin: 0 5px;
        }
      }
      form{
        margin-top: 9px;
        width: 100%;
        textarea {
          border-radius: 9px;
          box-shadow: none;
          border: none;
          padding: 12px;
          background: ${theme.color.white};
          font-size: 12px;
          height: 105px;
          &::-ms-input-placeholder { /* Edge 12-18 */
            color: #295086c2;
            font-weight: 500;
          }
          &::placeholder {
            color: #295086c2;
            font-weight: 500;
          }
        }
        button{
          padding: 15px;
          max-width: 210px;
          margin: auto;
        }
      }
      .edit-message-wrapper{
        display: flex;
        width: 100%;
        flex-direction: column;
        .edit-msg-row{
          display: inline-flex;
          align-items: flex-end;
          h6{
            color: #2950869e;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-right: 10px;
          }
        }
        .edit-and-delete-icon{
          display: flex;
          align-items: center;
          button{
            margin-right: 10px;
            width: 18px;
            height: 18px;
            background: transparent !important;
            outline: none !important;
            box-shadow: none !important;
            border: none !important;
            &:last-child{
              margin-right: 0;
            }
            i{
              width: 18px;
              height: 18px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              svg{
                width: 100%;
                height: 100%;
                display: block;
                  path{
                    fill: #758eab;
                  }
                }
              &.deletericon{
                svg{
                  width: 100%;
                  height: 100%;
                  display: block;
                  path{
                    fill: #FF9289;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const NotificationLayoutWrapper = styled.div`
  padding: 45px 0;
  .sitback-notification-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 21px;
    h5{
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: ${theme.color.secondary};
    }
    .sitback-general-messages-btns{
      display: flex;
      align-items: center;
      button{
        min-width: 140px;
        padding: 15px;
        margin-right: 15px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
  .sitback-notification-wrapper{
    .sitback-notification-list-wrapper{
      h6{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${theme.color.secondary};
        margin-bottom: 18px;
      }
      .sitback-notification-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid #e3e3e3;
        margin-bottom: 27px;
        padding-bottom: 27px;
        .user-details{
          display: flex;
          align-items: center;
          flex: 1;
          .user-img-wrapper{
            border-radius: 1000px;
            border: 2px solid ${theme.color.secondary};
            background: #C4C4C4;
            width: 46px;
            height: 46px;
            margin-right: 14px;
            filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.12));
          }
          .user-detail-wrapper{
            margin-right: 15px;
            h3{
              font-size: 15px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              color: #295086;
              margin-bottom: 2px;
            }
            p{
              color: #A0A0A0;
              font-size: 12px;
            }
          }
        }
        p{
          color: #A0A0A0;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        span{
          color: #A0A0A0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px;
          width: 150px;
          display: flex;
          justify-content: flex-end;
        }
      }
      .infinite-scroll-component__outerdiv{

      }
    }
    .infinite-scroll-component{
      padding-right: 15px;
      &::-webkit-scrollbar {
        width: 8px;
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
`;

export const SpaManagementLayoutWrapper = styled(TherapistManagementLayoutWrapper)`
  .therapist-sidebar {
    .sidebar-actions-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      margin-top: 20px;
    }

    .membership-btn,
    .embed-btn {
      width: 100%;
      padding: 9px 18px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      &:hover {
        opacity: 0.85;
      }
    }

    .membership-btn {
      background: #004D87;
      color: #fff;
      border: 1px solid #1d62c0;
    }

    .embed-btn {
      border: 1px solid #1d62c0;
      background: transparent;
      color: #004D87;
    }
  }

  .hours-main-display-div {
    max-width: 700px;
    margin: 0 auto;

    .hours-header-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25px;
      border-bottom: 1px solid #EAEBEC;
      padding-bottom: 15px;

      .hours-header-left {
        display: flex;
        align-items: center;
        gap: 15px;
        h3 {
          font-size: 20px;
          font-weight: 700;
          color: #295086;
          margin: 0;
        }
        .hours-date-range {
          font-size: 14px;
          color: #4D6B93;
          font-weight: 500;
          margin: 0;
        }
        .hours-nav-arrows {
          display: flex;
          align-items: center;
          gap: 5px;
          button {
            background: transparent;
            border: 1px solid #EAEBEC;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #295086;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
            &:hover {
              background: #F1F4F7;
              border-color: #295086;
            }
          }
        }

      }

      .hours-apply-all-btn {
        border-radius: 100px;
        background: #004D87;
        color: #fff;
        border: none;
        padding: 8px 18px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s ease;
        &:hover {
          background: #003660;
        }
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }

    .sitback-hours-detail-div {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      width: 100%;

      .hours-day-date-col {
        display: flex;
        flex-direction: column;
        width: 70px;
        .hours-day-name {
          font-weight: 700;
          font-size: 14px;
          color: #295086;
          margin: 0;
        }
        .hours-date-label {
          font-size: 12px;
          color: #8A8A8F;
          margin: 0;
        }
      }
      .hours-toggle-col {
        display: flex;
        align-items: center;
      }
      .hours-bar-col {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #EEF5FC;
        border-radius: 6px;
        padding: 10px 15px;
        min-height: 44px;

        .hours-time-range-text {
          font-size: 14px;
          color: #295086;
          font-weight: 500;
          margin: 0;
          &.closed {
            color: #E32C1F;
          }
        }

        .hours-edit-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          color: #4D6B93;
          transition: opacity 0.2s ease;
          &:hover {
            opacity: 0.8;
          }
          svg {
            width: 16px;
            height: 16px;
          }
        }

        .hours-inline-edit-form {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          .hours-time-picker-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
            .rdt {
              width: 100px;
              .form-control {
                background: #fff;
                border: 1px solid #DADADA;
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 13px;
                text-align: center;
                height: 32px;
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
            .hours-to-separator {
              font-size: 13px;
              color: #4D6B93;
              font-weight: 500;
            }
          }
          .hours-edit-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: auto;
            button {
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              transition: background 0.2s ease;
              &:hover {
                background: #e1edf8;
              }
              &.save-btn {
                color: #24A813;
                svg {
                  width: 16px;
                  height: 16px;
                  stroke: #24A813;
                }
              }
              &.cancel-btn {
                color: #E32C1F;
                svg {
                  width: 14px;
                  height: 14px;
                  path {
                    fill: #E32C1F;
                  }
                }
              }
            }
          }
        }
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
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;

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
              background: #FFFFFF;
              color: #E32C1F;
              border: 1px solid #DAE0E799;
            }
            &.open {
              background: #E8F8EE;
              color: #24A813;
              border: 1px solid #DAE0E799;
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
    }

    .hours-save-schedule-footer {
      display: flex;
      justify-content: flex-start;
      margin-top: 35px;
      padding-top: 20px;
      border-top: 1px solid #EAEBEC;
      .save-schedule-btn {
        background: #004D87;
        color: #fff;
        border: none;
        border-radius: 100px;
        padding: 12px 28px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        text-transform: uppercase;
        transition: background 0.2s ease;
        &:hover {
          background: #003660;
        }
      }
    }

    .empty-state-card-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
      background: #fff;

      .empty-state-icon-box {
        margin-bottom: 16px;
      }

      .empty-state-text {
        font-size: 16px;
        font-weight: 600;
        color: #295086;
        margin-bottom: 20px;
      }

      .empty-state-add-btn {
        background: #004b87;
        color: #fff;
        border: none;
        border-radius: 100px;
        padding: 12px 36px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #003660;
        }
      }
    }
  }
`;

export const ProfileServicesGalleryWrapper = styled.div`
  .hours-header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    h3 {
      font-size: 20px;
      font-weight: 700;
      color: #295086;
      margin: 0;
    }

    .add-image-btn-top {
      background: #295086;
      color: #fff;
      border: none;
      border-radius: 100px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: #1d3e6d;
      }
    }
  }

  .categories-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaf0;
    padding-bottom: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;

    .tabs-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .tab-btn {
      background: transparent;
      border: none;
      min-width: 65px;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 400;
      color: #4d6b93;
      border-radius: 100px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #f1f4f7;
        color: #295086;
      }

      &.active {
        background: #295086;
        color: #fff;
      }
    }
  }

  .empty-state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    background: #fcfdfe;
    border: 1px dashed #dbe7f5;
    border-radius: 16px;
    margin-top: 10px;

    .empty-icon {
      margin-bottom: 18px;
    }

    .empty-title {
      font-size: 16px;
      font-weight: 600;
      color: #295086;
      margin-bottom: 20px;
    }

    .empty-add-btn {
      background: #295086;
      color: #fff;
      border: none;
      border-radius: 100px;
      padding: 12px 28px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: #1d3e6d;
      }
    }
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .image-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(41, 80, 134, 0.12);

      .overlay {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 16px;
      pointer-events: auto;
    }

    .tag-pill {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      color: #fff;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      border: 1.5px solid rgba(255, 255, 255, 0.4);
      letter-spacing: 0.5px;
    }

    .delete-btn {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      border: 1.5px solid rgba(255, 255, 255, 0.4);
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;

      &:hover {
        background: rgba(227, 44, 31, 0.9);
        border-color: transparent;
        transform: scale(1.1);
      }
    }
  }
`;

export const AddGalleryModalWrapper = styled.div`
  padding: 30px;
  background: #fff;
  position: relative;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 600;
    color: #295086;
    text-align: center;
    margin-bottom: 24px;
  }

  .upload-dropzone {
    width: 100%;
    height: 180px;
    border: 2px dashed #007BFFB2;
    border-radius: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
      border-color: #295086;
      background-color: #f1f6fc;
    }

    input[type="file"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      span {
        font-size: 14px;
        font-weight: 500;
        color: #295086;
      }
    }

    .preview-container {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .remove-preview-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
        transition: background-color 0.2s;
        &:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  .form-group-custom {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    input[type="text"] {
      width: 100%;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 14px;
      color: #295086;
      background-color: #fff;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #295086;
      }

      &::placeholder {
        color: #9aaebf;
      }
    }

    select {
      width: 100%;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 14px;
      color: #295086;
      background-color: #fff;
      outline: none;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23295086' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 24px center;
      transition: border-color 0.2s;

      &:focus {
        border-color: #295086;
      }
    }
  }

  .modal-buttons-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 28px;

    button {
      flex: 1;
      max-width: 160px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
      outline: none;

      &.cancel-btn {
        background: #fff;
        border: 1px solid #295086;
        color: #295086;
      }

      &.submit-btn {
        background: #295086;
        border: none;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
    &.add-gallery-modal{
      button {
        max-width: 200px;
      }
    }
  }

  .modal-subtitle-text {
    font-size: 13px;
    color: #7a8c9e;
    text-align: center;
    margin-top: -18px;
    margin-bottom: 24px;
    line-height: 1.4;
  }

  .upload-dropzone {
    &.drag-active {
      border-color: #295086;
      background-color: #f1f6fc;
    }
  }

  .selected-images-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 16px;

    .selected-count {
      font-size: 15px;
      font-weight: 500;
      color: #495057;
    }

    .clear-all-btn {
      background: transparent;
      border: 1px solid #cad2dd;
      border-radius: 100px;
      padding: 6px 16px;
      font-size: 13px;
      font-weight: 500;
      color: #6c757d;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        background: #f8f9fa;
        color: #212529;
        border-color: #adb5bd;
      }
    }
  }

  .selected-images-list {
    max-height: 320px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding-right: 4px;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f4f7;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: #c4d3e6;
      border-radius: 8px;
    }
  }

  .selected-image-row {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border: 1px solid #e0e6ed;
    border-radius: 16px;
    margin-bottom: 16px;
    background: #fff;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    .thumbnail-wrapper {
      width: 80px;
      height: 80px;
      border-radius: 16px;
      overflow: hidden;
      flex-shrink: 0;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .image-info-fields {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex-grow: 1;

      .input-field-container {
        display: flex;
        flex-direction: column;
        width: 90%;
      }

      input[type="text"], select {
        width: 100%;
        border: 1px solid #cad2dd;
        border-radius: 100px;
        padding: 8px 20px;
        font-size: 14px;
        color: #295086;
        background-color: #fff;
        outline: none;
        height: 38px;
        transition: border-color 0.2s;

        &:focus {
          border-color: #295086;
        }

        &::placeholder {
          color: #9aaebf;
        }

        &.error-input {
          border-color: #e32c1f !important;
          background-color: #fff9f9 !important;
        }
      }

      select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23295086' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 20px center;
        background-size: 12px;
        padding-right: 36px;
      }

      .error-text {
        color: #e32c1f;
        font-size: 12px;
        margin-top: 4px;
        margin-left: 16px;
        text-align: left;
      }
    }

    .remove-image-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: #adb5bd;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      flex-shrink: 0;

      &:hover {
        color: #e32c1f;
      }
    }
  }

  .warning-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff9f0;
    border: 1px solid #ffe9cc;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
    color: #d97706;
    font-size: 13px;
    font-weight: 500;

    svg {
      flex-shrink: 0;
    }
  }
`;

export const StyledAddGalleryModal = styled(CustomModal)`
  &.add-gallery-modal-custom {
    .modal-content {
      border-radius: 24px !important;
      background: #fff !important;
      border: none !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden;
    }
    .modal-body {
      padding: 0 !important;
    }
  }
`;

export const AmenitiesCardWrapper = styled.div`
  background: #fff;
  border: 1px solid #e8f0fa;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(41, 80, 134, 0.04);

  .amenities-section {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .section-title {
    font-size: 15px;
    font-weight: 700;
    color: #295086;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .amenity-chip {
    display: inline-flex;
    align-items: center;
    background: #f1f4f7;
    border: 1px solid #e2eaf2;
    color: #295086;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;

    .remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: #295086;
      font-size: 14px;
      margin-left: 8px;
      padding: 0;
      cursor: pointer;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s, color 0.2s;

      &:hover {
        opacity: 1;
        color: #e95060;
      }
    }

    .loader-img {
      width: 12px;
      height: 12px;
      margin-left: 6px;
      object-fit: contain;
    }
  }

  .add-amenity-form {
    max-width: 100%;
  }

  .input-action-row {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    width: 100%;
  }

  .text-input-field {
    flex: 1;
    border: 1px solid #eaeaea;
    border-radius: 100px;
    padding: 12px 20px;
    font-size: 14px;
    color: #295086;
    background: #fff;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #295086;
    }

    ::placeholder {
      color: #a0a0a0;
    }
  }

  .add-action-btn {
    background: #295086;
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 12px 30px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: #1d3e6d;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .autocomplete-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;

    .autocomplete-item {
      padding: 10px 20px;
      font-size: 14px;
      color: #295086;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #f1f4f7;
      }
    }
  }

  .suggestion-chip {
    display: inline-flex;
    align-items: center;
    background: #fff;
    border: 1px solid #eaeaea;
    color: #7a8c9e;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #295086;
      border-color: #295086;
      color: #fff;
    }
  }

  .empty-text {
    font-size: 13px;
    color: #a0a0a0;
    font-style: italic;
  }
`;

export const ProfileServicesRoomsWrapper = styled.div`
  // background: #fff;
  // border: 1px solid #e8f0fa;
  // border-radius: 12px;
  // padding: 30px;
  // box-shadow: 0 4px 16px rgba(41, 80, 134, 0.04);

  .rooms-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h3 {
      font-size: 22px;
      font-weight: 700;
      color: #295086;
      margin: 0;
    }

    .add-room-btn {
      background: #004b87;
      color: #fff;
      border: none;
      border-radius: 100px;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #003660;
      }
    }
  }

  .rooms-grid-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .room-ui-card {
    background: #fff;
    border: 1px solid #eef4fc;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(41, 80, 134, 0.02);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(41, 80, 134, 0.06);
    }

    .room-image-area {
      width: 100%;
      height: 180px;
      background: #f8fbfe;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .no-image-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #b8cbe1;
        background: #f8fbfe;
      }
    }

    .room-body-area {
      padding: 15px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .room-title-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      h4 {
        font-size: 18px;
        font-weight: 700;
        color: #295086;
        margin: 0;
      }

      .actions-container {
        display: flex;
        gap: 8px;

        button {
          background: none;
          border: none;
          // padding: 4px;
          cursor: pointer;
          color: #7a8c9e;
          transition: color 0.2s;

          &:hover {
            &.edit-btn {
              color: #295086;
            }
            &.delete-btn {
              color: #ef4444;
            }
          }
        }
      }
    }

    .room-meta-line {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;

      .type-pill {
        background: #eef4fc;
        color: #295086;
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 400;
      }

      .capacity-info {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #7a8c9e;
        font-weight: 400;
        p {
          font-size: 13px;

        }

        svg {
          color: #7a8c9e;
        }
      }
    }

    .room-desc {
      font-size: 13px;
      color: #7a8c9e;
      line-height: 1.5;
      margin: 0;
    }

  }

  .empty-state-card-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    background: #fff;

    .empty-state-icon-box {
      margin-bottom: 16px;
    }

    .empty-state-text {
      font-size: 16px;
      font-weight: 600;
      color: #295086;
      margin-bottom: 20px;
    }

    .empty-state-add-btn {
      background: #004b87;
      color: #fff;
      border: none;
      border-radius: 100px;
      padding: 12px 36px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #003660;
      }
    }
  }

`;


export const StyledRoomModal = styled(CustomModal)`
  &.room-modal-custom {
    .modal-content {
      border-radius: 24px !important;
      background: #fff !important;
      border: none !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden;
    }
    .modal-body {
      padding: 0 !important;
    }
    .text-danger {
        display: block;
        margin-left: 25px;
        font-size: 12px;
    }
  }
`;

export const RoomModalWrapper = styled.div`
  padding: 30px;
  background: #fff;
  position: relative;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 24px;
  }

  .upload-dropzone {
    width: 100%;
    height: 140px;
    border: 2px dashed #007BFFB2;
    border-radius: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    transition: border-color 0.2s, background-color 0.2s;

    &:hover {
      border-color: #295086;
      background-color: #f1f6fc;
    }

    &.error {
      border-color: #E32C1F !important;
      background-color: #fff9f9 !important;
    }

    input[type="file"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      span {
        font-size: 14px;
        font-weight: 600;
        color: #295086;
      }
    }

    .preview-container {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .remove-preview-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        font-weight: bold;
        transition: background-color 0.2s;
        &:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  .form-group-custom {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 12px;
      font-weight: 700;
      color: #7a8c9e;
      text-transform: uppercase;
      margin-left: 12px;
    }

    input[type="text"],
    input[type="number"],
    select,
    textarea {
      width: 100%;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 14px;
      color: #295086;
      background-color: #fff;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #295086;
      }

      &::placeholder {
        color: #9aaebf;
      }

      &.error {
        border-color: #E32C1F !important;
      }
    }

    textarea {
      border-radius: 16px;
      resize: none;
      height: 100px;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23295086' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 24px center;
      padding-right: 40px;
    }
  }

  .form-row-two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;

    .form-group-custom {
      margin-bottom: 0;
    }
  }

  .amenities-input-row {
    display: flex;
    gap: 12px;
    align-items: center;

    input[type="text"] {
      flex: 1;
    }

    .add-amenity-btn {
      background: #004b87;
      color: #fff;
      border: none;
      border-radius: 100px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #003660;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .amenity-chip {
    display: inline-flex;
    align-items: center;
    background: #eef4fc;
    color: #295086;
    padding: 6px 14px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;

    .remove-btn {
      background: none;
      border: none;
      color: #295086;
      font-size: 12px;
      margin-left: 6px;
      padding: 0;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #ef4444;
      }
    }
  }

  .toggle-switch-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 24px;

    .switch-label {
      font-size: 14px;
      font-weight: 700;
      color: #295086;
    }

    .custom-switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 24px;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;

        &:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
      }

      input:checked + .slider {
        background-color: #295086;
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }
    }
  }

  .modal-buttons-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 28px;

    button {
      flex: 1;
      max-width: 160px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;

      &.cancel-btn {
        background: #fff;
        border: 1px solid #295086;
        color: #295086;

        &:hover {
          background: #f1f4f7;
        }
      }

      &.submit-btn {
        background: #004b87;
        border: none;
        color: #fff;

        &:hover {
          background: #003660;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const StyledServiceModal = styled(CustomModal)`
  &.service-modal-custom {
    .modal-content {
      /* border-radius: 24px !important; */
      background: #fff !important;
      border: none !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden;
    }
    .modal-body {
      padding: 0 !important;
    }
    .text-danger {
        display: block;
        margin-left: 25px;
        font-size: 12px;
    }
  }
`;

export const ServiceModalWrapper = styled.div`
  padding: 40px;
  background: #fff;
  position: relative;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 28px;
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
      background: #eef6ff;
      display: flex;
      align-items: center;
      justify-content: center;
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
        width: 100%;
        height: 100%;
        cursor: pointer;
        z-index: 2;
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

  .form-group-custom {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    input[type="text"],
    input[type="number"],
    textarea {
      width: 100%;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 15px;
      color: #295086;
      background-color: #fff;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #295086;
      }

      &::placeholder {
        color: #9aaebf;
      }

      &.error {
        border-color: #E32C1F !important;
      }
    }

    textarea {
      border-radius: 16px;
      resize: none;
      height: 100px;
    }
  }

  .form-row-two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;

    .form-group-custom {
      margin-bottom: 0;
    }
  }

  .sitback-select2-container {
    .sitback-select-option__control {
      border: 1px solid #dbe7f5 !important;
      border-radius: 100px !important;
      min-height: 50px !important;
      padding: 0 12px !important;
      box-shadow: none !important;
      background-color: #fff !important;

      &:hover {
        border-color: #295086 !important;
      }
    }

    &.sitback-select-option--is-disabled {
      cursor: not-allowed;
      .sitback-select-option__control {
        background-color: #F8F8FB !important;
        cursor: not-allowed;
      }
    }

    .sitback-select-option__placeholder {
      color: #9aaebf !important;
      font-size: 15px !important;
    }

    .sitback-select-option__single-value {
      color: #295086 !important;
      font-size: 15px !important;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sitback-select-option__indicator {
      color: #295086 !important;
    }

    .sitback-select-option__menu {
      border-radius: 12px !important;
      overflow: hidden;
      border: 1px solid #dbe7f5 !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
      z-index: 9999 !important;
    }

    .sitback-select-option__option {
      color: #295086 !important;
      font-size: 15px !important;
      display: flex;
      align-items: center;
      gap: 8px;

      &--is-focused {
        background-color: #eef4fc !important;
      }

      &--is-selected {
        background-color: #295086 !important;
        color: #fff !important;
      }
    }
  }

  .addpricemessage {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f4f8fc;
    border-radius: 100px;
    padding: 8px 16px;
    margin-top: -6px;
    margin-bottom: 16px;

    img {
      width: 14px;
      height: 14px;
    }

    span {
      font-size: 12px;
      font-weight: 500;
      color: #29508699;
      letter-spacing: 0.5px;
      line-height: normal;
    }
  }

  .modal-buttons-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;

    button {
      flex: 1;
      max-width: 220px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;

      &.cancel-btn {
        background: #fff;
        border: 1px solid #295086;
        color: #295086;

        &:hover {
          background: #f1f4f7;
        }
      }

      &.submit-btn {
        background: #004b87;
        border: none;
        color: #fff;

        &:hover {
          background: #003660;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const StyledEmbedModal = styled(CustomModal)`
  &.embed-modal-custom {
    .modal-content {
      background: #fff !important;
      border: none !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden;
      border-radius: 24px !important;
    }
    .modal-body {
      padding: 0 !important;
    }
  }
`;

export const EmbedModalWrapper = styled.div`
  padding: 40px;
  background: #fff;
  position: relative;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 28px;
  }

  .copy-link-input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 15px 0;
    position: relative;

    input {
      width: 100%;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 14px;
      color: #295086;
      background-color: #fff;
      outline: none;
      min-height: 52px;
      padding-right: 120px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;

      &:focus {
        border-color: #295086;
      }

      &::placeholder {
        color: #9aaebf;
      }
    }

    .copy-btn {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      position: absolute;
      right: 4px;
      top: 4px;
      bottom: 4px;
      width: 100px;
      background: #004b87;
      border: none;
      color: #fff;
      border-radius: 100px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #003660;
      }
    }
  }

  .download-btn-container {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .download-btn {
      width: 180px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;
      background: #004b87;
      border: none;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &:hover {
        background: #003660;
      }

      svg, .global_laguage_icon {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
    }
  }
`;

export const StyledHoursModal = styled(CustomModal)`
  &.hours-modal-custom {
    .modal-content {
      background: #fff !important;
      border: none !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
      overflow: hidden;
      border-radius: 24px !important;
    }
    .modal-body {
      padding: 0 !important;
    }
  }
`;

export const HoursModalWrapper = styled.div`
  padding: 40px;
  background: #fff;
  position: relative;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 28px;
  }

  .set-all-days-modal-intro {
    font-size: 14px;
    color: #7a8c9e;
    text-align: center;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  .selected-days-chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 24px;

    .day-chip {
      display: inline-flex;
      align-items: center;
      background: #f0f5fa;
      border: 1px solid #dbe7f5;
      border-radius: 100px;
      padding: 6px 14px;
      gap: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #295086;
      transition: background-color 0.2s, border-color 0.2s;

      &:hover {
        background-color: #e6f0fa;
        border-color: #c0d8f0;
      }

      .remove-day-btn {
        background: none;
        border: none;
        color: #295086;
        font-size: 16px;
        line-height: 1;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s, transform 0.2s;
        outline: none;

        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }

        &:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          pointer-events: none;
        }
      }
    }
  }

  .set-all-days-modal-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;

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

    label {
      font-size: 12px;
      font-weight: 700;
      color: #7a8c9e;
      text-transform: uppercase;
      margin-left: 12px;
      margin-bottom: 6px;
      display: block;
    }

    input.set-all-days-time-input {
      width: 100%;
      border: 1px solid #dbe7f5 !important;
      border-radius: 100px !important;
      padding: 12px 24px !important;
      font-size: 14px !important;
      color: #295086 !important;
      background-color: #fff !important;
      outline: none !important;
      transition: border-color 0.2s !important;
      min-height: 48px !important;

      &:focus {
        border-color: #295086 !important;
      }

      &::placeholder {
        color: #9aaebf !important;
      }
    }
  }

  .modal-buttons-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;

    button {
      flex: 1;
      max-width: 160px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;

      &.cancel-btn {
        background: #fff;
        border: 1px solid #295086;
        color: #295086;

        &:hover {
          background: #f1f4f7;
        }
      }

      &.submit-btn {
        background: #004b87;
        border: none;
        color: #fff;

        &:hover {
          background: #003660;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

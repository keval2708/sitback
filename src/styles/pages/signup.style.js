"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
// import styled from "styled-components";
import { theme } from "../global/theme";

export const LoginLayoutWrapper = styled.div`
  background: ${theme.color.lightyellow};
  min-height: 100vh;
  padding: 80px 0 80px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .right-top-img-div{
    max-width: 730px;
    height: 280px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    right: -330px;
    top: -90px;
    ${mediaQueries("lg")`
      right: -280px;
      top: -50px;
      height: 210px;
    `}
    img{
      object-fit: contain;
    }
    &.left-top-img-div{
      left: -470px;
      right: auto;
      top: 30%;
      ${mediaQueries("lg")`
      left: -340px;
      right: auto;
      top: 30%;
      height: 160px;
    `}
    }
    &.right-button-img-div{
      right: -220px;
      top: auto;
      bottom: -55px;
      &.center-bottom-img{
        left: 0;
        right: 0;
        margin: auto;
        ${mediaQueries("lg")`
          max-width: 380px;
          height: 180px;
        `}

      }
    }
  }
  .account-text-link{
    margin-top: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    h5{
      color: ${theme.color.secondary};
      text-align: center;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal; /* 21px */
      letter-spacing: 0.15px;
      ${mediaQueries("lg")`
        font-size: 14px;
      `}
      a{
        color: ${theme.color.secondary};
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.15px;
        text-decoration-line: underline !important;
        display: inline-block;
        ${mediaQueries("lg")`
          font-size: 14px;
        `}
      }
    }
  }
  &.privacy-layout-footer{

  }
  .delete-user-input-wrapper{
    .marging-bottom-wrapper{
      .edit-number-and-email-input{
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
      }
    }
    .otp-box-wrapper{
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
    }
    .login-detail-text-wrapper{
      margin-top: -35px !important;
      text-align: start;
    }
    .user-detaildiv{
      margin-bottom: 35px;
      p{
        color: #295086;
        text-align: start;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 19px;
      }
    }
  }
`;
export const LoginFormWrapper = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
  position: relative;
  z-index: 2;
  &.login-updated-form-wrapper{
    max-width: 100%;
  }
  ${mediaQueries("xl")`
    max-width: 600px;
  `}
  ${mediaQueries("lg")`
    max-width: 550px;
  `}
  ${mediaQueries("md")`
    max-width: 450px;
  `}
  .sitback-logo-wrapper{
    width: 140px;
    height: 140px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 35px;
    ${mediaQueries("xl")`
      width: 120px;
      height: 120px;
    `}
    ${mediaQueries("lg")`
      width: 100px;
      height: 100px;
    `}
    ${mediaQueries("md")`
      width: 90px;
      height: 90px;
    `}
    ${mediaQueries("sm")`
      width: 80px;
      height: 80px;
    `}
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }

  }
  .login-btn
    {
      button{
        text-transform:uppercase !important;
      }
    }
  &.isServiceProviderLayout{
    max-width: 710px;
  }
  .social-login-wrapper{
    max-width: 300px;
    width: 100%;
    margin: auto;
    margin-top: 54px;
    text-align: center;
    .login-text{
      margin-bottom: 21px;
      display: flex;
      justify-content: center;
      position: relative;
      &:before{
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background: #4D6B93;
        bottom: 7px;
        z-index: 1;
      }
      span{
        color: #6A707C;
        /* font-family: Poppins; */
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: inline-flex;
        background: ${theme.color.lightyellow};
        padding: 0 15px;
        position: relative;
        z-index: 2;
      }
    }
  }
  &.verify-document-section{
    max-width: 700px;
    h2{
      font-weight: 500;
    }
    .verify-documents-block{
      text-align: center;
      button{
        max-width: 550px;
        margin: auto;
      }
      .progress-bardiv{
        width: 100%;
        height: 14px;
        background: #f6feffa6;
        border-radius: 100px;
        .progress-bar-active{
          background: #75D6AA;
          height: 14px;
          border-radius: 100px;
        }
      }
      .step-list-div{
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -30px;
        span{
          width: 45px;
          height: 45px;
          background: white;
          border: 1px solid white;
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          position: relative;
          &.step-active{
            background: #75D6AA;
            &:before{
              position: absolute;
              content: '';
              background: url('images/mark-icon.svg') no-repeat;
              background-position: center;
              background-size: 100%;
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
    .verify-documents-divlist-wrapper{
      margin: 45px -15px;
      display: flex;
      flex-wrap: wrap;
      .document-box{
        padding: 0 15px;
        flex: 0 0 33.33%;
        margin-bottom: 21px;
        .document-iconbox{
          position: relative;
          width: 145px;
          height: 145px;
          margin: 0 auto 20px;
          border: 0.5px dashed #9f9e91;
          border-radius: 12px;
          background: #F2F1E8;
          /* overflow: hidden; */
          input{
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            opacity: 0;
          }
          img{
            width: 75px;
          }
          .icons-btn{
            display: flex;
            width: 24px;
            height: 24px;
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
          }
        }
        p{
          color: ${theme.color.secondary};
          text-align: center;
          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px;
          letter-spacing: -0.16px;
          max-width: 210px;
          width: 100%;
          margin: auto;
        }
        .info-section-wrapper{
          display: flex;
          align-items: flex-start;
          .global_laguage_icon{
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5px;
            margin-left: 3px;
            color: ${theme.color.secondary};
          }
        }
      }
    }
  }
  .login-detail-text-wrapper{
    text-align: center;
    margin-bottom: 37px;
    h2{
      margin-bottom: 12px;
    }
    p{
      color: ${theme.color.grayv2};
      text-align: center;
      font-family: "Poppins", sans-serif;
      font-size: 17px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      margin-bottom: 5px;
      max-width: 330px;
      margin: auto;
      width: 100%;
      ${mediaQueries("md")`
        font-size: 15px;
      `}
      ${mediaQueries("sm")`
        font-size: 14px;
      `}
      &:last-child{
        margin-bottom: 0px;
      }
    }
    &.reset-password-successfully{
      margin-bottom: 0;
      .mark-successfully-icon{
        width: 150px;
        height: 150px;
        margin: 0 auto 40px;
        overflow: hidden;
        ${mediaQueries("xl")`
          width: 130px;
          height: 130px;
          margin: 0 auto 30px;
        `}
        ${mediaQueries("lg")`
          width: 110px;
          height: 110px;
          margin: 0 auto 25px;
        `}
        ${mediaQueries("md")`
          width: 90px;
          height: 90px;
          margin: 0 auto 20px;
        `}
        ${mediaQueries("sm")`
          margin: 0 auto 25px;
        `}
        img{
          object-fit: contain;
        }
      }
      p{
        font-family: "Poppins", sans-serif;
        max-width: 400px;
      }
      button{
        max-width: 475px;
        margin-top: 45px;
      }
    }
    &.resend-code-link{
      margin-top: 45px;
      margin-bottom: 0;
      span{
        color: ${theme.color.secondary};
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 19px;
        display: inline-flex;
        margin-top: 15px;
        cursor: pointer;
      }
    }
  }
  &.otp-layout-wrapper{
    max-width: 570px;
    .otp-input-wrapper{
      display: flex;
      max-width: 440px;
      margin: auto;
      width: 100%;
      justify-content: space-between;
      input{
        border-radius: 8px;
        padding: 12px;
        flex: 0 0 22%;
        min-height: 65px;
        text-align: center;
        &:focus{
          border-color: ${theme.color.primary};
        }
      }
    }
  }
  .policy-text {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    a {
      color: #295086;
      text-align: center;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.15px;
      display: inline-block;
    }
  }
  &.spaloginbook-appointment{
    .nav {
      background: #FFFEF6;
      border-radius: 1000px;
      max-width: 350px;
      margin: auto;
      margin-bottom: 35px;
      box-shadow: 0px 5px 16px 0px #0000000F;
      .nav-item {
        padding: 0;
        width: 50%;
        .nav-link {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0px;
          padding: 15px;
          background: transparent;
          min-width: 160px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${theme.color.secondary};
          border-radius: 1000px;
          ${mediaQueries("sm")`
             padding: 12px;
          `}
          &.active {
            background: ${theme.color.secondary};
            color: ${theme.color.white};
          }
        }
      }
    }
    .tab-content{
      min-height: 500px;
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
`;
export const ServiceProviderMenuListWrapper = styled.div`
  width: 100%;
  .faq {
    margin-top: 40px;
    h5 {
      color: ${theme.color.secondary};
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    text-align: center;
  }
`;
export const LoginLayoutUpdatedWrapper = styled.div`
  &.sitback-updated-signup-display-div{
    .login-main-wrapper{
      ${mediaQueries("sm")`
        padding: 15px 0;
      `}
      .login-inner-div{
        justify-content: center;
        .login-left-div{
          display: none;
        }
        .login-right-div{
          max-width: 656px;
          margin: 0;
          padding: 0;
          background: unset;
          border: none;
          .sitback-updated-signup-title-div{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .logo-main-wrapper{
              width: 75px;
              height: auto;
              overflow: hidden;
              margin-bottom: 12px;
              img{
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
              }
            }
            h4{
              font-weight: 600;
              font-size: 26px;
              line-height: 45px;
              letter-spacing: -0.16px;
              text-align: center;
              margin-bottom: 30px;
              color: #004D87;
              ${mediaQueries("xxl")`
                font-size: 24px;
                line-height: 40px;
              `}
              ${mediaQueries("xl")`
                font-size: 22px;
                line-height: 35px;
              `}
              ${mediaQueries("lg")`
                font-size: 20px;
                line-height: 30px;
              `}
              ${mediaQueries("md")`
                font-size: 18px;
                line-height: 25px;
              `}
              ${mediaQueries("sm")`
                font-size: 16px;
                line-height: 20px;
              `}
            }
              .register-flow-display-wrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                gap: 60px;
                position: relative;
                &::after{
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 28px;
                  right: 0;
                  bottom: 0;
                  width: 9%;
                  height: 2px;
                  background: #E5E7EB;
                  margin: auto;
                }
                .register-detail-div{
                  display: flex;
                  align-items: center;
                  &.step-active-div{
                    h5{
                      color: #FFFFFF !important;
                    }
                    .register-step-number-div{
                      background: #295086;
                      color: #FFFFFF;
                      border-color: #295086;
                    }
                    p{
                      color: #295086;
                      font-weight: 600;
                    }
                  }
                  .register-step-number-div{
                    border: 2px solid #D1D5DC;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 10px;
                    width: 30px;
                    height: 30px;
                    border-radius: 1000px;
                    h5{
                      font-weight: 400;
                      font-size: 16px;
                      line-height: 24px;
                      letter-spacing: -0.31px;
                      color: #99A1AF;
                    }
                  }
                  p{
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 20px;
                    letter-spacing: -0.15px;
                    color: #6A7282;
                  }
                }
              }
          }
          .login-updated-form-wrapper{
            border: 1px solid #007BFF66;
            box-shadow: 0px 8px 7px 0px #2950861F;
            border-radius: 8px;
            background: #F5FBFF;
            padding: 45px 40px 35px 40px;
            ${mediaQueries("xxl")`
              padding: 35px 30px 25px 30px;
            `}
            ${mediaQueries("xl")`
              padding: 30px 25px 20px 25px;
            `}
            ${mediaQueries("lg")`
              padding: 25px 20px 15px 20px;
            `}
            ${mediaQueries("md")`
              padding: 20px 15px 10px 15px;
            `}
            ${mediaQueries("sm")`
              padding: 15px 10px 5px 10px;
            `}
            input{
              padding: 19px 25px;
              border: 1px solid #DADADA99;
            }
              .search-input-div{
                position: relative;
                input{
                  padding-left: 45px;
                }
                i{
                  width: 20px;
                  height: 20px;
                  object-fit: contain;
                  object-position: center;
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 20px;
                  bottom: 0;
                  margin: auto;
                }
                .location-input-wrapper-div{
                  width: 100%;
                  .icon-wrapper-main{
                    &.location-search-with-clear{
                      input.location-input--has-clear{
                        padding-right: 44px;
                      }
                    }
                    .location-search-clear-btn{
                      position: absolute;
                      right: 12px;
                      top: 50%;
                      transform: translateY(-50%);
                      z-index: 2;
                      width: 32px;
                      height: 32px;
                      padding: 0;
                      margin: 0;
                      border: none;
                      background: transparent;
                      color: #E32C1F;
                      font-size: 22px;
                      line-height: 1;
                      font-weight: 700;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 4px;
                      -webkit-tap-highlight-color: transparent;
                      &:hover{
                        opacity: 0.85;
                      }
                      &:focus-visible{
                        outline: 2px solid #E32C1F;
                        outline-offset: 2px;
                      }
                    }
                  }
                  input{
                    width: 100%;
                    max-width: 100%;
                  }
                  .autocomplete-dropdown-container{
                    padding: 0;
                    background: ${theme.color.white};
                    border-radius: 12px;
                    position: absolute;
                    top: 60px;
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
              /* .login-input-div {
                margin-bottom: 12px;
              } */
              .search-location-display-div{
                .current-location-btn{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #004D8712;
                  border: none;
                  margin-bottom: 12px;
                  color: #295086;
                  text-transform: uppercase;
                  font-weight: 500;
                  box-shadow: none;
                  i{
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-right: 12px;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                }
                .note-display-text{
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  color: #295086;
                  margin-bottom: 20px !important;
                  display: flex;
                  align-items: center;
                  i{
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-right: 8px;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                }
                .map-display-div{
                  width: 100%;
                  height: 480px;
                  overflow: hidden;
                  margin-bottom: 20px;
                  img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                  }
                }
              }
              .back-to-step-link{
                font-weight: 400;
                // font-style: Medium;
                font-size: 16px;
                line-height: 100%;
                text-align: center;
                text-transform: uppercase;
                color: #004D87;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 12px;
                ${mediaQueries("md")`
                  font-size: 15px;
                `}
                ${mediaQueries("sm")`
                  font-size: 14px;
                `}
              }
          }
          .account-text-with-social-login-div{
            width: 100%;
            .account-text-link{
              margin-top: 40px;
            }
            .social-login-wrapper{
              margin-top: 15px;
              .login-text{
                position: relative;
                text-align: center;
                span{
                  background: #FFFFFF;
                  z-index: 4;
                  position: relative;
                  text-align: center;
                  padding: 0 15px;
                }
                &::after{
                  width: 100%;
                  bottom: 10px;
                  ${mediaQueries("sm")`
                      width: 100% !important;
                  `}
                }
              }

              ul{
                gap: 20px;
                margin-top: 15px;
                li{
                  flex: unset;
                  display: block;
                  width: 60px;
                  height: 60px;
                  border: none;
                  background: #FFFFFF;
                  overflow: unset;
                  border-radius: 1000px;
                  border: 1px solid #DADADA99;
                  ${mediaQueries("sm")`
                    width: 52px;
                    height: 52px;
                  `}
                  &:last-child{
                    margin-right: 0;
                  }
                  div{
                    background: unset;
                    border: unset;
                  }
                  a{
                    background: unset;
                    border: unset;
                    ${mediaQueries("md")`
                      height: 60px;
                    `}
                    ${mediaQueries("sm")`
                      height: 52px;
                    `}
                  }
                }
              }

            }
          }
        }
      }
       .phone-number-input-div{
                      display: flex;
                      align-items: center;
                      .country-code-input{
                        width: 50px;
                        margin-right: 0;
                        input{
                          padding: 19px 15px !important;
                          border-top-right-radius: 0 !important;
                          border-bottom-right-radius: 0 !important;
                          border-right: none !important;
                        }
                      }
                      .mobile-number-input{
                        flex: 1;
                        input{
                          border-top-left-radius: 0 !important;
                          border-bottom-left-radius: 0 !important;
                          padding: 19px 10px !important;
                        }
                      }
                    }
    }
  }
  .login-main-wrapper{
    padding: 20px;
    ${mediaQueries("lg")`
      padding: 18px;
    `}
    ${mediaQueries("md")`
      padding: 16px;
    `}
    ${mediaQueries("sm")`
      padding: 0;
    `}
    .login-inner-div{
      display: flex;
      align-items: stretch;
      /* height: 100%; */
      height: 100vh;
      &.signup-inner-div{
        height: 100%;
      }
      ${mediaQueries("md")`
        flex-direction: column;
        align-items: center;
        height: 100%;
      `}
      .login-left-div{
        width: 48%;
        ${mediaQueries("md")`
          width: 100%;
          height: 650px;
        `}
        ${mediaQueries("sm")`
          height: 310px;
        `}
        .login-left-image-div{
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 16px;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: right;
          }
          .login-above-image-div{
            width: calc(100% - 35px);
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            margin: auto;
            height: 210px;
            background: url("images/login-bg-image.svg") no-repeat;
            background-position: center;
            background-size: cover;
            background-color: #DFECF9;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            ${mediaQueries("md")`
              height: 180px;
            `}
            ${mediaQueries("sm")`
              height: 135px;
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
        }
      }
      .login-right-div{
        flex: 1;
        margin-left: 15px;
        /* background: #F5FBFF; */
        background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
        border-radius: 16px;
        padding: 30px 45px 30px 55px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ${mediaQueries("xl")`
          padding: 30px 35px 30px 45px;
        `}
        ${mediaQueries("lg")`
          padding: 30px 25px 30px 35px;
        `}
        ${mediaQueries("md")`
          padding: 30px 20px 30px 25px;
          margin-left: 0;
          margin-top: 20px;
          width: 100%;
        `}
        ${mediaQueries("sm")`
          padding: 50px 15px 50px 20px;
          margin-left: 20px;
          margin-right: 20px;
          margin-bottom: 20px;
          width: 92%;
        `}
        ${mediaQueries("xs")`
          padding: 40px 15px 35px;
        `}
        .login-title-text{
          font-weight: 500;
          font-size: 34px;
          line-height: 45px;
          letter-spacing: -1%;
          text-align: center;
          color: ${theme.color.logintitlecolor};
          margin-bottom: 50px;
          margin-top: 20px;
          ${mediaQueries("xl")`
            font-size: 32px;
            line-height: 42px;
          `}
          ${mediaQueries("lg")`
            font-size: 30px;
            line-height: 40px;
          `}
          ${mediaQueries("md")`
            font-size: 28px;
            line-height: 38px;
          `}
          ${mediaQueries("sm")`
            font-size: 22px;
            line-height: 22px;
            margin-bottom: 50px;
            margin-top: 20px;
          `}
          &.lower-bottom-spacing{
            margin-bottom: 30px;
            ${mediaQueries("sm")`
              margin-bottom: 24px;
            `}
          }
          &.larger-bottom-spacing{
            margin-bottom: 40px;
          }
        }
        .login-detail-text-wrapper{
          &.login-spacing-detail-div{
            margin-bottom: 70px;
            ${mediaQueries("sm")`
              margin-bottom: 50px;
            `}
          }
          &.resend-code-link{
            margin-top: 20px;
            span{
              margin-top: 0;
              font-weight: 500;
              font-size: 18px;
              line-height: 160%;
              color: #295086;
              ${mediaQueries("md")`
                font-size: 17px;
                line-height: 150%;
              `}
              ${mediaQueries("sm")`
                font-size: 16px;
                line-height: 140%;
              `}
              ${mediaQueries("xs")`
                font-size: 15px;
                line-height: 130%;
              `}
            }
            .code-expire-text{
              font-weight: 400;
              font-size: 16px;
              line-height: 160%;
              color: #295086;
              ${mediaQueries("sm")`
                font-size: 15px;
                line-height: 130%;
              `}
            }
          }
          .para-login-text{
            font-weight: 300;
            font-size: 20px;
            line-height: 182%;
            text-align: center;
            color: ${theme.color.secondary};
            max-width: 370px;
            ${mediaQueries("xl")`
              font-size: 19px;
              line-height: 172%;
            `}
            ${mediaQueries("lg")`
              font-size: 18px;
              line-height:  162%;
            `}
            ${mediaQueries("md")`
              font-size: 17px;
              line-height: 152%;
            `}
            ${mediaQueries("sm")`
              font-size: 16px;
              line-height: 30px;
            `}
            &.reset-pw-text{
              max-width: 450px;
            }
            &.forgot-pw-text{
              max-width: 550px;
            }
          }
        }
        .login-input-div{
          &.password-input-spacing{
            margin-bottom: 22px;
          }
          &.phone-number-country-div{
            margin-bottom: 10px;
          }
          input{
            background: #FFFFFF;
            border: 1px solid #DADADA99;
            border-radius: 100px;
            padding: 24px 25px;
            color: #295086E5;
            font-size: 16px;
            font-weight: 400;
            ${mediaQueries("md")`
              padding: 22px 25px;
            `}
            ${mediaQueries("sm")`
              padding: 20px 25px;
            `}
            &::placeholder{
              /* color: #295086E5; */
              color: rgba(41, 80, 134, 0.90);
              font-size: 14px;
              font-weight: 400;
              line-height: 22px;
              ${mediaQueries("sm")`
                font-size: 14px;
              `}
            }
          }
          .input-group:has(input:-webkit-autofill) .input-group-text {
            background: #ffffff;
            border-color: #DADADA99;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
            -webkit-text-fill-color: #295086E5;
            font-weight: 400;
            border: 1px solid #DADADA99;
          }
          .input-group-text{
            background: #FFFFFF;
            border-color: #DADADA99;
            &:hover{
              opacity: 1;
            }
          }
          .forgot-linktext{
            margin-top: 22px;
            a{
              color: #295086E5;
              font-weight: 400;
              font-size: 14px;
              line-height: 160%;
            }
          }
          .icon-wrapper-main{
            position: relative;
            .iconbox{
              width: 21px;
              height: 21px;
              display: flex !important;
              justify-content: center;
              align-items: center;
              position: absolute;
              left: 23px;
              top: 17px;
              z-index: 6;
            }
            > div {
              input{
                padding-left: 56px;
              }
            }
          }
        }
        .loading-btn-wrapper{
          background: ${theme.color.logintitlecolor};
          padding: 24px 18px;
          margin-bottom: 18px;
          font-weight: 500;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 1px;
          text-transform: uppercase;
          ${mediaQueries("sm")`
            padding: 22px 18px;
            margin-top: 10px;
          `}
        }
        .reset-btn-wrapper{
          background: ${theme.color.logintitlecolor};
          padding: 24px 18px;
          margin-bottom: 18px;
          font-weight: 500;
          font-size: 14px;
          line-height: 100%;
          text-transform: capitalize !important;
          ${mediaQueries("sm")`
            padding: 22px 18px;
          `}
        }
        .account-text-link{
          h5{
            font-weight: 400;
            font-size: 14px;
            line-height: 160%;
            color: ${theme.color.secondary};
            text-align: center;
            a{
              font-weight: 600;
              font-size: 14px;
              line-height: 160%;
              color: ${theme.color.secondary};
              text-decoration: underline !important;
            }
          }
        }
        .social-login-wrapper{
          margin-top: 45px;
          max-width: 100%;
          ${mediaQueries("sm")`
            margin-top: 28px;
          `}
          .login-text{
            span{
              background: unset;
              color: ${theme.color.secondary};
              text-transform: uppercase;
              font-weight: 600;
            }
            &::before{
              width: 35%;
              left: 0;
              background: #0000001a;
              ${mediaQueries("sm")`
                width: 30% !important;
              `}
            }
            &::after{
              width: 35%;
              right: 0;
              position: absolute;
              content: '';
              height: 1px;
              background: #0000001a;
              bottom: 7px;
              z-index: 1;
              ${mediaQueries("sm")`
                width: 30% !important;
              `}
            }
          }
          ul{
            gap: 20px;
            li{
              flex: unset;
              display: block;
              width: 60px;
              height: 60px;
              border: none;
              background: #FFFFFF;
              overflow: unset;
              border-radius: 1000px;
              ${mediaQueries("sm")`
                width: 52px;
                height: 52px;
              `}
              &:last-child{
                margin-right: 0;
              }
              div{
                background: unset;
                border: unset;
              }
              a{
                background: unset;
                border: unset;
                ${mediaQueries("md")`
                  height: 60px;
                `}
                ${mediaQueries("sm")`
                  height: 52px;
                `}
              }
            }
          }
        }
        .policy-text{
          position: unset;
          display: flex;
          justify-content: flex-end;
          margin-top: 0;
          /* bottom: -40px;
          right: -20px;
          ${mediaQueries("lg")`
            right: 0;
          `} */
          ${mediaQueries("sm")`
            margin-top: 30px;
          `}
          a{
            font-weight: 400;
            font-size: 14px;
            line-height: 160%;
            color: ${theme.color.logintitlecolor};
          }
        }
        .otp-input-wrapper{
          input{
            background: #FFFFFF;
            border: 1px dashed #007BFF99;
            min-height: 90px;
            ${mediaQueries("lg")`
              min-height: 82px;
            `}
             ${mediaQueries("sm")`
              min-height: 76px;
            `}
            &:focus{
              border: 1px solid #007BFFCC;
            }
            /* &:valid{
              border: 1px solid #007BFFCC;
            } */
          }
        }
      }
    }
  }
`;

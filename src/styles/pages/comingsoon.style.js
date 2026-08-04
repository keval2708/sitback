"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
// import styled from "styled-components";
import { theme } from "../global/theme";
export const ComingSoonLayoutWrapper = styled.div`
  /* background: ${theme.color.blur} !important; */
  min-height: 80vh;
  /* padding: 110px 0 80px; */
  overflow: hidden;
  /* background: url("images/coming-soon-banner.png") no-repeat;
  background-position: center;
  background-size: cover; */
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  &::before{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: #51454582;
    /* opacity: 0.78; */
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  ${mediaQueries("md")`
    min-height: auto;
    min-height: 75vh;
    // padding: 80px 0 60px;
  `}
  ${mediaQueries("sm")`
    min-height: 80vh;
    // padding: 60px 0 30px;
  `}
  .comingsoon-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    position: relative;
    z-index: 3;
    ${mediaQueries("lg")`
      min-height: 70vh;
    `}
    ${mediaQueries("md")`
      min-height: 60vh;
    `}
    ${mediaQueries("sm")`
      min-height: 40vh;
    `}
    .sitback-logo-wrapper{
      max-width: 580px;
      height: 260px;
      width: 100%;
      display: inline-block;
      margin-bottom: 25px;
      ${mediaQueries("xxl")`
        max-width: 480px;
        height: 210px;
      `}
      ${mediaQueries("xl")`
        max-width: 350px;
        height: 160px;
      `}
      ${mediaQueries("lg")`
        max-width: 290px;
        height: 130px;
      `}
      ${mediaQueries("md")`
        max-width: 200px;
        height: 90px;
        margin-bottom: 18px;
      `}
      /* ${mediaQueries("sm")`
        max-width: 160px;
        height: 70px;
      `} */
      ${mediaQueries("xs")`
        max-width: 130px;
        height: 60px;
        margin-bottom: 12px;
      `}
    }
    .sub-title {
      color: ${theme.color.secondary};
      display: inline-block;
      font-size: 36px;
      font-weight: 600;
      line-height: 37px;
      margin-bottom: 20px;
      text-align: center;
      ${mediaQueries("xxl")`
        font-size: 34px;
        line-height: 35px;
      `}
      ${mediaQueries("xl")`
        font-size: 28px;
        line-height: 32px;
        margin-bottom: 15px;
      `}
      ${mediaQueries("lg")`
        font-size: 24px;
        line-height: 30px;
      `}
      ${mediaQueries("md")`
        font-size: 22px;
        line-height: 27px;
      `}
    }
    h4{
      font-size: 28px;
      font-weight: 400;
      line-height: 42px;
      letter-spacing: 0px;
      text-align: center;
      color: ${theme.color.white};
      span{
        color: ${theme.color.secondary};
        display: inline-block;
        text-decoration: underline;
        cursor: pointer;
      }
      ${mediaQueries("xxl")`
        font-size: 26px;
        line-height: 38px;
      `}
      ${mediaQueries("xl")`
        font-size: 24px;
        line-height: 36px;
      `}
      ${mediaQueries("lg")`
        font-size: 21px;
        line-height: 30px;
        font-weight: 500;
      `}
      ${mediaQueries("md")`
        font-size: 18px;
        line-height: 30px;
      `}
      ${mediaQueries("sm")`
        font-size: 16px;
        line-height: 28px;
        max-width: 320px;
      `}
      ${mediaQueries("xs")`
        font-size: 14px;
        line-height: 24px;
      `}
    }
    .bookand-list-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 40px;
      ${mediaQueries("sm")`
        flex-direction: column;
        margin-top: 30px;
      `}
      button{
        max-width: 280px;
        background: ${theme.color.secondary};
        border-color: ${theme.color.secondary};
        /* text-transform: lowercase; */
        letter-spacing: 1px;
        color: #ffffffb3;
        margin: 0 8px;
        ${mediaQueries("sm")`
          margin:0;
          margin-bottom: 15px;
          max-width: 230px;
        `}
      }
    }
  }
  .cloud-image-wrapper{
    max-width: 440px;
    height: auto;
    width: 100%;
    position: absolute;
    left: -55px;
    top: 45px;
    height: 200px;
    ${mediaQueries("xxl")`
      max-width: 400px;
      height: 190px;
    `}
    ${mediaQueries("xl")`
      max-width: 290px;
      height: 165px;
    `}
    ${mediaQueries("lg")`
      max-width: 210px;
      height: 110px;
    `}
    ${mediaQueries("md")`
      max-width: 180px;
      height: 90px;
      left: -75px;
      top: 20px;
    `}
    img{
      object-fit: fill;
    }
    &.right-side-cloud-img{
      right: -70px;
      left: auto;
      bottom: 20%;
      top: auto;
      max-width: 420px;
      height: 200px;
      ${mediaQueries("xxl")`
        max-width: 350px;
        height: 180px;
        bottom: 10%;
      `}
      ${mediaQueries("xl")`
        max-width: 240px;
        height: 125px;
      `}
      ${mediaQueries("lg")`
        max-width: 230px;
        height: 100px;
        top: auto;
        bottom: 0;
      `}
      ${mediaQueries("md")`
        max-width: 180px;
        height: 80px;
        right: -100px;
      `}
    }
    &.bottom-side-cloud-img{
      max-width: 1200px;
      height: auto;
      bottom: -20px;
      top: auto;
      left: -30%;
      right: auto;
      height: 320px;
      ${mediaQueries("xxl")`
        height: 270px;
        max-width: 1000px;
      `}
      ${mediaQueries("xl")`
        height: 190px;
        max-width: 830px;
      `}
      ${mediaQueries("lg")`
        height: 150px;
        max-width: 780px;
      `}
      ${mediaQueries("md")`
        height: 150px;
        max-width: 500px;
      `}
    }
  }
  .login-header-wrapper{
    display: flex;
    justify-content: flex-end;
    margin-right: 30px;
    align-items: center;
    ${mediaQueries("md")`
      margin-right: 20px;
    `}
    ${mediaQueries("sm")`
      margin-right: 15px;
      margin-bottom: 15px;
    `}
    a{
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: normal;
      color: #295086;
      display: inline-flex;
      margin-right: 30px;
    }
    button{
      background: ${theme.color.secondary};
      border-color: ${theme.color.secondary};
      width: auto;
      min-width: 150px;
      padding: 15px;
      color: #D7D7D7;
    }
  }
  &.coming-soon-sectionv1{
    /* min-height: auto; */
    position: relative;
    z-index: 2;
    &.sitback-coming-section-mobile-wrapper{
      display: unset;
      ${mediaQueries("sm")`
        min-height: 280px;
      `}
    }
    .video-banner-wrapper{
      width: 110%;
      height: 100%;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      padding: 62.25% 0 0 0;
      top: -120px;
      ${mediaQueries("xxl")`
        top: -60px;
      `}
      ${mediaQueries("xl")`
        padding: 0;
        top: -100px;
        top: 0px;
      `}
      ${mediaQueries("lg")`
        top: 0px;
      `}
      iframe{
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        object-position: center;
        position: absolute;
        top: 0;
        ${mediaQueries("xl")`
          transform: scale(1.5);
        `}
        ${mediaQueries("lg")`
          transform: scale(2.5);
        `}
        ${mediaQueries("sm")`
          transform: scale(3.5);
        `}
      }
    }
    .text-layout-wrapper{
      position: relative;
      z-index: 2;
      ${mediaQueries("xl")`
        margin-top: 80px;
      `}
      ${mediaQueries("lg")`
        margin-top: 80px;
      `}
      &.sitback-text-layout-mobile-warapper{
        ${mediaQueries("sm")`
          margin-top: 0;
        `}
        .coming-soon-desktop-view-paragraph-text{
          ${mediaQueries("sm")`
            display: none;
          `}
        }
        .coming-soon-mobile-view-paragraph-text{
          display: none;
          ${mediaQueries("sm")`
            display: block;
          `}
        }
        .comingsoon-wrapper{
          max-width: 1000px;
          margin: 150px auto 0;
          ${mediaQueries("xl")`
            max-width: 930px;
          `}
          ${mediaQueries("sm")`
            margin: 100px auto 0;
          `}
          .sitback-logo-wrapper{
            ${mediaQueries("sm")`
              max-width: 190px;
              margin-bottom: 16px;
            `}
            &.sitback-mobile-logo-wrapper{
              ${mediaQueries("sm")`
                display: none;
              `}
            }
          }
          .sub-title{
            ${mediaQueries("sm")`
              font-size: 24px;
              font-weight: 600;
              margin: 0 auto 6px;
              max-width: 345px;
              line-height: 36px;
            `}
          }
          .coming-soon-mobile-para-text{
            ${mediaQueries("sm")`
              font-size: 14px;
              max-width: 290px;
              line-height: 27px;
            `}
          }
        }
      }
      .sitback-landing-filter-desktop-view{
        ${mediaQueries("sm")`
          display: none;
        `}
        .filterbox-input{
          .sit-select-city-select-div{
            width: 100%;
            position: relative;
            .input-select-wrapper{
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-right: 20px;
              input{
                border: none;
                padding: 0;
                margin: 0;
                width: calc(100% - 20px);
                color: #295086;
                font-size: 14px;
                font-weight: 400;
                background:transparent;
                z-index: 1;
                &:focus{
                  outline: none;
                }
                &::placeholder{
                  color: #295086;
                  font-size: 14px;
                  font-weight: 400;
                }
              }
              i{
                display: block;
                width: 20px;
                height: 20px;
                overflow: hidden;
                position: absolute;
                top: 0;
                right: 20px;
                bottom: 0;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                svg{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                  path{
                    fill: hsl(0, 0%, 80%);
                  }
                  &:hover{
                    path{
                      fill: hsl(0, 0%, 60%);
                    }
                  }
                }
              }
            }
            p{
              color: #295086;
              font-size: 14px;
              font-weight: 400;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-right: 20px;

            }
            .sit-select-city-options-wrapper{
              position: absolute;
              width: calc(100% - 10px);
              z-index: 20;
              background-color: hsl(0, 0%, 100%);
              border-radius: 4px;
              box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);

              max-height: 300px;
              overflow-y: auto;
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
                padding: 0;
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
                      background: #f1f1f1;
                    }
                    &:focus{
                      background: #f1f1f1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .comingsoon-wrapper{
      min-height: auto;
      .sitback-logo-wrapper{
        max-width: 305px;
        height: 144px;
        ${mediaQueries("lg")`
          max-width: 240px;
          height: 100px;
        `}
        ${mediaQueries("md")`
          max-width: 190px;
          height: 85px;
        `}
        ${mediaQueries("sm")`
          max-width: 156px;
          height: auto;
        `}
      }
      .sub-title{
        color: ${theme.color.white};
      }
      .bookand-list-wrapper{
        button{
          color: white;
          margin: 0 8px;
          padding: 6px 18px;
          min-height: 55px;
          font-size: 18px;
          letter-spacing: 0;
          font-weight: 500;
          border-color: ${theme.color.white};
          ${mediaQueries("md")`
            margin-bottom: 12px;
          `}
          &.spa-btn{
            background: ${theme.color.white};
            color: ${theme.color.secondary};
          }
        }
      }
    }
  }
  .filter-inputbox-wrapper{
    background: #FFFFFF;
    border: 1px solid #29508699;
    border-radius: 100px;
    max-width: 1155px;
    width: 100%;
    margin: auto;
    margin-top: 35px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    padding: 5px 15px;
    min-height: 70px;
    ${mediaQueries("sm")`
      flex-direction: column;
      border-radius: 12px;
      padding: 15px;
    `}
    .filterbox-input{
      width: 50%;
      border-right: 1px solid #29508699;
      position: relative;
      padding: 0 0 0 15px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      ${mediaQueries("sm")`
        width: 100%;
        padding: 0;
        border-right: 0px solid #29508699;
        border-bottom: 1px solid #29508699;
        margin-bottom: 6px;
        padding-bottom: 6px;
      `}
      label{
        margin: 0;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: normal;
        color: #295086;
        margin-bottom: 4px;
      }
      .sitback-select2-container{
        width: 100%;
        .sitback-select-option__control{
          .sitback-select-option__value-container{
            padding: 0;
            min-height: auto;
            .sitback-select-option__placeholder{
              margin: 0;
              color: #295086;
            }
            .sitback-select-option__input-container{
              margin: 0;
              padding: 0;
            }
          }
          .sitback-select-option__indicators{
            padding-right: 12px;
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
                background: ${theme.color.primary};
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
      &.datepicker-box{
        border-right: 0px;
        padding-right: 0;
        .datepicker{
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          width: calc(100% - 150px);
          font-weight: 300;
        }
        .calendarv2-wrapper-div{
          /* top: 59px;
          bottom: 0; */
          top: auto;
          bottom: 45px;
          z-index: 7;
        }
      }
    }
    .filter-btn{
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      ${mediaQueries("sm")`
        position: unset;
      `}
      button{
        min-width: 150px;
        background: #295085;
        border: 1px solid #295085;
        height: 100%;
      }
    }
    .sitback-select2-container{
      .sitback-select-option__control {
        padding: 0;
        border-radius: 0;
        background: transparent;
        border-color: transparent;
        outline: none !important;
        box-shadow: none !important;
        min-height: auto;
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
          .sitback-select-option__indicator{
            padding: 0;
          }
        }
      }
      .sitback-select-option__menu{
        top: auto;
        bottom: 45px;
        .sitback-select-option__menu-list{
          max-height: 140px;
        }
      }
    }
  }
  &.sitback-revamp-banner-section{
    padding: 20px 20px 0 20px;
    ${mediaQueries("xxl")`
      min-height: 668px;
    `}
    ${mediaQueries("sm")`
      padding: 0;
      min-height: 375px;
    `}
    &::before{
      background: unset;
    }
    &.sitback-landing-page-revamp-banner-section{
      height: 665px;
      width: 100%;
      min-height: unset;
      overflow: unset;
      @media screen and (max-width: 1440px){
        height: 590px;
      }
      ${mediaQueries("sm")`
        height: auto;
      `}
      .sitback-banner-updated-div{
        height: 660px;
        width: 100%;
        @media screen and (max-width: 1440px){
          height: 590px;
        }
        ${mediaQueries("sm")`
          height: unset;
        `}
        .sitback-banner-image-div{
          ${mediaQueries("xl")`
            height: 558px;
          `}
          ${mediaQueries("sm")`
            height: 375px;
          `}
          img{
            ${mediaQueries("xl")`
              object-fit: contain !important;
              object-position: top;
            `}
            ${mediaQueries("lg")`
              object-fit: cover !important;
              object-position: top;
            `}
          }
          .banner-content-wrapper{
            bottom: 135px;
            ${mediaQueries("sm")`
              bottom: 80px;
            `}
            .banner-top-title-div{
              ${mediaQueries("sm")`
                 max-width: 320px;
                 margin: auto;
              `}
              p{
                ${mediaQueries("sm")`
                  max-width: 260px;
                  margin: auto;
                `}
              }
            }
          }
        }
      }
    }
    &.sitback-other-page-banner-div{
      .sitback-banner-updated-div{
        .sitback-banner-image-div{
          .banner-content-wrapper{
            ${mediaQueries("sm")`
              top: 73% !important;
            `}
            &.terms-banner-content-wrapper{
              .banner-top-other-page-title-div{
                ${mediaQueries("sm")`
                  max-width: 320px !important;
                `}
              }
            }
            .banner-top-other-page-title-div{
              br{
                display: none;
                ${mediaQueries("sm")`
                  display: block;
                `}
              }
              ${mediaQueries("sm")`
                max-width: 210px !important;
              `}
            }
          }
        }
      }
    }
    &.sitback-blog-detail-banner-section{
      .sitback-banner-updated-div{
        ${mediaQueries("sm")`
          height: 160px !important;
        `}
      }
    }
    &.sitback-spa-detail-page-banner-section{
      height: 720px !important;
      ${mediaQueries("sm")`
        height: 600px !important;
      `}
      .sitback-banner-updated-div{
        height: 720px !important;
        ${mediaQueries("sm")`
          height: 600px !important;
        `}
        .sitback-banner-image-div{
          ${mediaQueries("xl")`
            height: 720px;
          `}
          ${mediaQueries("sm")`
            height: 600px;
          `}
          .banner-video-main-div{
            padding: 18px;
            max-width: 1220px;
            margin: auto;
            border-radius: 20px;
            background: linear-gradient(0deg, #295086 0%, #295086 100%), url(<path-to-image>) lightgray 0px -89.797px / 100% 186.321% no-repeat;
            top: 20%;
            position: absolute;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            min-height: 450px;
            z-index: 2;
            ${mediaQueries("md")`
              flex-direction: column;
              top: 13%;
            `}
            ${mediaQueries("sm")`
              max-width: calc(100% - 40px);
              min-height: 350px;
              top: 15%;
            `}
            .banner-left-content-div{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              width: 50%;
              ${mediaQueries("md")`
                width: 100%;
                margin-bottom: 30px;
              `}
              .banner-left-inner-div{
                /* max-width: 305px; */
                margin: auto;
              }
              h1{
                color: #FFF;
                text-align: center;
                font-family: ${theme.font.fontFamilyPlayFair};
                font-size: 60px;
                font-weight: 800;
                line-height: normal;
                margin-bottom: 20px;
                ${mediaQueries("xl")`
                  font-size: 52px;
                `}
                ${mediaQueries("lg")`
                  font-size: 44px;
                `}
                ${mediaQueries("md")`
                  font-size: 36px;
                `}
                ${mediaQueries("sm")`
                  font-size: 28px;
                `}
              }
              p{
                color: #FFF;
                text-align: center;
                font-size: 18px;
                font-weight: 400;
                line-height: 32px;
                margin-bottom: 50px;
                ${mediaQueries("xl")`
                  font-size: 17px;
                  line-height: 30px;
                `}
                ${mediaQueries("lg")`
                  font-size: 16px;
                  line-height: 28px;
                `}
                ${mediaQueries("md")`
                  font-size: 15px;
                  line-height: 26px;
                  margin-bottom: 20px;
                `}
                ${mediaQueries("sm")`
                  font-size: 14px;
                  line-height: 24px;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
              }
              .spa-rating-box-wrapper{
                border-radius: 100px;
                background: #FFF;
                color: #004D87;
                font-size: 16px;
                font-weight: 600;
                line-height: normal;
                padding: 8px 11px;
                max-width: fit-content;
                margin: 8px auto 0;
                ${mediaQueries("md")`
                  font-size: 15px;
                `}
                ${mediaQueries("sm")`
                  font-size: 14px;
                  margin-top: 12px;
                `}
                span{
                  color: #004d87e6;
                  font-weight: 400;
                }
              }
            }
            .banner-right-content-div{
              flex: 1;
              overflow: hidden;
              background: #FFF;
              border-radius: 20px;
              height: 450px;
              ${mediaQueries("md")`
                height: 350px;
              `}
              ${mediaQueries("sm")`
                height: 200px;
              `}
              .video-banner-wrapper{
                width: 100%;
                height: 400px;
                /* height: 65vh; */
                border-radius: 10px;
                overflow: hidden;
                ${mediaQueries("md")`
                  height: 300px;
                `}
                ${mediaQueries("sm")`
                  height: 180px;
                `}
                .thumbnail-overlay{
                  button{
                    width: 120px;
                    height: 120px;
                    outline: none !important;
                    box-shadow: none !important;
                    background: transparent !important;
                    border: none;
                    margin-top: 30px;
                    ${mediaQueries("lg")`
                      width: 100px;
                      height: 100px;
                    `}
                    ${mediaQueries("md")`
                      width: 80px;
                      height: 80px;
                    `}
                    ${mediaQueries("sm")`
                      width: 60px;
                      height: 60px;
                      display: none;
                    `}
                  }
                }
              }
              .video-below-detail{
                padding: 4px 18px;
                /* cursor: pointer; */
                display: flex;
                justify-content: center;
                align-items: center;
                p{
                  color: #004D87;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                }
                .book-featured-btn{
                  border-radius: 100px;
                  background: #004D87;
                  min-height: 40px;
                  color: #FFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  padding: 12px;
                  max-width: 220px;
                }
              }
            }
          }
        }
      }
    }
    &.sitback-medium-size-banner-div{
      height: 560px;
      width: 100%;
      min-height: unset;
      ${mediaQueries("sm")`
        height: unset;
      `}
      .sitback-banner-updated-div{
        height: 540px;
        width: 100%;
        ${mediaQueries("sm")`
          height: 370px;
        `}
        .sitback-banner-image-div{
          img{
            ${mediaQueries("xl")`
              object-fit: contain !important;
              object-position: top;
            `}
            ${mediaQueries("lg")`
              object-fit: cover !important;
              object-position: top;
            `}
          }
          .breadcrumb-text{
            position: absolute;
            top: 23%;
            left:0;
            right: 0;
            color: #FFF;
            font-family: Poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px;
            z-index: 1;
            text-align: center;
            /* display: flex; */
            display: none;
            margin: auto 0;
            justify-content: center;
            align-items: center;
            /* width: calc(100% - 130px); */
            ${mediaQueries("xl")`
              top: 15%;
            `}
            ${mediaQueries("sm")`
              display: none;
            `}
          }
          .banner-content-wrapper{
            top: 60%;
            bottom: unset;
            ${mediaQueries("xl")`
              top: 40%;
            `}
            ${mediaQueries("sm")`
              top: 35%;
            `}
            .banner-top-title-div{
              ${mediaQueries("sm")`
                max-width: 320px;
                margin: auto;
              `}
            }
            &.about-us-banner-content-div{
              top: unset;
              bottom: 5%;
              ${mediaQueries("xl")`
                top: 65%;
                bottom: unset;
              `}
              .about-banner-para-text{
                display: none;
                /* color: #ffffffe6; */
                color: #FFFFFF;
                max-width: 260px;
                ${mediaQueries("sm")`
                  display: block;
                `}
              }
            }
            .spa-rating-box-wrapper{
              border-radius: 100px;
              background: #FFF;
              color: #004D87;
              font-size: 16px;
              font-weight: 600;
              line-height: normal;
              padding: 8px 11px;
              max-width: fit-content;
              margin: 8px auto 0;
              ${mediaQueries("md")`
                font-size: 15px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                margin-top: 12px;
              `}
              span{
                color: #004d87e6;
                font-weight: 400;
              }
            }
          }
        }
        .for-business-banner-content-div{
          ${mediaQueries("sm")`
            display: none;
          `}
        }
      }
    }
    &.sitback-small-size-banner-div{
      height: 410px;
      width: 100%;
      min-height: unset;
      ${mediaQueries("sm")`
        height: unset;
      `}
      .sitback-banner-updated-div{
        height: 390px;
        width: 100%;
        .sitback-banner-image-div{
          img{
            ${mediaQueries("xl")`
              object-fit: contain !important;
              object-position: top;
            `}
            ${mediaQueries("lg")`
              object-fit: cover !important;
              object-position: top;
            `}
          }
          .breadcrumb-text{
            position: absolute;
            top: 23%;
            left:0;
            right: 0;
            color: #FFF;
            font-family: Poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 30px;
            z-index: 1;
            text-align: center;
            /* display: flex; */
            display: none;
            margin: auto 0;
            justify-content: center;
            align-items: center;
            /* width: calc(100% - 130px); */
            ${mediaQueries("xl")`
              top: 15%;
            `}
            ${mediaQueries("sm")`
              display: none;
            `}
          }
          .banner-content-wrapper{
            top: 60%;
            bottom: unset;
            ${mediaQueries("xl")`
              top: 40%;
            `}
            ${mediaQueries("sm")`
              top: 60%;
            `}
            .banner-top-title-div{
              ${mediaQueries("sm")`
                max-width: 320px;
                margin: auto;
              `}
            }
            &.sitback-blog-updated-content-wrapper{
              ${mediaQueries("sm")`
                top: 75%;
              `}
            }
          }
        }
      }
    }
    .sitback-banner-updated-div{
      .sitback-banner-image-div{
        position: relative;
        overflow: hidden;
        border-radius: 35px;
        width: 100%;
        height: 100%;
        ${mediaQueries("xl")`
          height: 668px;
        `}
        ${mediaQueries("sm")`
          height: 375px;
          border-radius: 0;
        `}
        /* img{
          ${mediaQueries("sm")`
            object-fit: contain !important;
          `}
        } */
        &::before{
          position: absolute;
          display: block;
          content: '';
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          /* border-radius: 35px; */
          background: linear-gradient(180deg, rgba(102, 102, 102, 0.00) 0%, rgba(0, 0, 0, 0.60) 107.49%);
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
        }
        .banner-content-wrapper{
          position: absolute;
          bottom: 100px;
          right: 0;
          left: 0;
          text-align: center;
          margin: auto;
          z-index: 1;
          &.services-page-banner-content-div{
            top: 55% !important;
            ${mediaQueries("xl")`
                top: 48% !important;
            `}
            ${mediaQueries("lg")`
                top: 35%;
            `}
            ${mediaQueries("sm")`
                top: 35%;
            `}
          }
          &.spa-page-banner-content-div{
            top: 45%;
            ${mediaQueries("xl")`
                top: 40%;
            `}
            ${mediaQueries("lg")`
                top: 35%;
            `}
            ${mediaQueries("sm")`
                top: 35%;
            `}
            h1{
              ${mediaQueries("sm")`
                max-width: 280px;
              `}
            }
            .spa-page-banner-para-text{
              ${mediaQueries("md")`
                font-size: 14px !important;
                line-height: 24px !important;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            }
            &.see-other-city-banner-content-div{
              top: 45%;
              ${mediaQueries("xl")`
                top: 35%;
              `}
              ${mediaQueries("md")`
                top: 25%;
              `}
              ${mediaQueries("sm")`
                top: 35%;
              `}
            }
          }
          &.inner-page-banner-top-content-div{
            bottom: 60px;
            top: unset;
            ${mediaQueries("xl")`
              bottom: unset;
              top: 60%;
            `}
            .banner-top-title-div{
              ${mediaQueries("sm")`
                  max-width: 260px;
                  margin: auto;
              `}

              /* h1{
                ${mediaQueries("sm")`
                  max-width: 310px;
                  margin-left: auto;
                  margin-right: auto;
                `}
              }
              p{
                ${mediaQueries("sm")`
                  max-width: 260px;
                  margin-left: auto;
                  margin-right: auto;
                `}
              } */
            }
          }
          &.banner-content-with-btn-div{
            top: 45%;
            ${mediaQueries("sm")`
                bottom: 40px;
            `}
            .banner-top-title-div{
              p{
                color: #ffffffcc;
                ${mediaQueries("sm")`
                  max-width: 260px;
                  margin: 0 auto;
                `}
              }
              .banner-btn-div{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 80px;
                ${mediaQueries("sm")`
                  flex-direction: column;
                  margin-top: 0;
                `}
                .login-btn{
                  border-radius: 100px;
                  background: #004D87;
                  box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
                  max-width: 250px;
                  color: #FFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  border: none;
                  max-height: 54px;
                  margin-right: 8px;
                  padding: 16px 18px;
                  ${mediaQueries("sm")`
                    margin-right: 0;
                    margin-bottom: 12px;
                    max-height: 45px;
                  `}
                }
                .req-more-btn{
                  border-radius: 100px;
                  background: transparent;
                  border: 1px solid #FFF;
                  box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
                  color: #FFFFFF;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  max-height: 54px;
                  max-width: 250px;
                  padding: 16px 18px;
                  ${mediaQueries("sm")`
                    max-height: 45px;
                  `}
                }
              }
            }
            &.contact-banner-content-div{
              top: 55%;
              ${mediaQueries("xl")`
                top: 45%;
              `}
              .banner-top-title-div{
                p{
                  color: #FFFFFF;
                  ${mediaQueries("sm")`
                    max-width: 260px;
                    margin: 0 auto;
                  `}
                }
              }
            }
          }
          .banner-top-title-div{
            h1{
              color: #FFF;
              text-align: center;
              font-family: ${theme.font.fontFamilyPlayFair};
              font-size: 55px;
              font-weight: 800;
              line-height: normal;
              margin-bottom: 12px;
              &.service-inner-page-title{
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              ${mediaQueries("xl")`
                font-size: 48px;
              `}
              ${mediaQueries("lg")`
                font-size: 42px;
              `}
              ${mediaQueries("md")`
                font-size: 36px;
              `}
              ${mediaQueries("sm")`
                font-size: 28px;
              `}
            }
            p{
              color: #FFF;
              text-align: center;
              font-size: 20px;
              font-weight: 400;
              line-height: normal;
              &.service-inner-page-para-text{
               display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
                &.breadcrumb-services-page-text{
                 ${mediaQueries("sm")`
                  display: -webkit-box !important;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
                }
              &.spa-page-banner-para-text{
                color: rgba(255, 255, 255, 0.8);
                font-size: 16px;
                line-height: 25px;
                max-width: 935px;
                margin: auto;
                &.see-other-city-banner-text{
                  max-width: 955px;
                }
              }
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
                font-size: 14px;
              `}
              &.bread-crumb-spas-detail-wrapper{
                margin-top: 12px !important;
              }
              &.bread-crumb-spa-text{
                display: flex !important;
                position: unset;
                color: #FFF;
                font-size: 14px;
                font-weight: 500;
                line-height: 30px;
                margin-top: 25px;
                ${mediaQueries("md")`
                   margin-top: 5px;
                `}
                .sign-text{
                  margin: 0 13px;
                }
              }
            }
              .service-page-breadcrumb-div{
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-top: 25px;
                  ${mediaQueries("md")`
                    margin-top: 5px;
                  `}
                  .breadcrumb-detail-text{
                    color: #FFF;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 30px;
                    text-align: left;
                    &.spa-service-text{
                      ${mediaQueries("md")`
                        min-width: 85px;
                      `}
                    }
                    &.spa-service-name-text{
                      ${mediaQueries("md")`
                        max-width: 80px;
                      `}
                    }
                    ${mediaQueries("xl")`
                      line-height: 26px;
                    `}
                    ${mediaQueries("lg")`
                      line-height: 24px;
                    `}
                    ${mediaQueries("md")`
                      line-height: 22px;
                    `}
                    ${mediaQueries("sm")`
                      line-height: 20px;
                      display: -webkit-box !important;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      min-width: 40px;
                    `}
                  }
                  .sign-text{
                    margin: 0 13px;
                    color: #FFF;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 30px;
                    ${mediaQueries("xl")`
                    line-height: 26px;
                  `}
                  ${mediaQueries("lg")`
                    line-height: 24px;
                  `}
                  ${mediaQueries("md")`
                    line-height: 22px;
                  `}
                  ${mediaQueries("sm")`
                    line-height: 20px;
                    margin: 0 6px;
                  `}
                  }
              }
            .email-link-wrapper{
              display: flex;
              align-items: center;
              border-radius: 50px;
              background: #FFF;
              padding: 5px 20px;
              color: #004D87;
              text-align: center;
              font-size: 14px;
              font-weight: 400;
              line-height: 30px;
              max-width: fit-content;
              margin: 18px auto 0;
              .icon-div{
                width: 22px;
                height: auto;
                overflow: hidden;
                margin-right: 14px;
              }
            }
            &.banner-landing-top-title-div{
              max-width: 1195px;
              margin: auto;
            }
          }
        }
      }
      .sitback-filter-main-div{
        padding-bottom: 30px;
        &.sitback-landing-filter-div{
          ${mediaQueries("sm")`
            padding-bottom: 0;
          `}
        }
        .filter-inputbox-wrapper{
          margin-top: -120px;
          min-height: 100px;
          border-radius: 19px;
          border: none;
          max-width: 1210px;
          @media screen and (max-width: 1260px){
            max-width: calc(100% - 20px);
          }
          ${mediaQueries("sm")`
            max-width: calc(100% - 40px);
            border: 1px solid #EBECED;
            border-radius: 20px;
            padding-top: 20px;
            margin-top: -50px;
          `}
          .filterbox-input{
            padding-left: 10px;
            ${mediaQueries("sm")`
              padding-bottom: 10px;
            `}
            .select-city-label-wrapper{
              display: flex;
              align-items: center;
              .select-city-icon-wrapper{
                width: 20px;
                height: auto;
                overflow: hidden;
                display: block;
                ${mediaQueries("sm")`
                  width: 13px;
                `}
                svg{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                  path{
                    fill: #000000;
                  }
                }
              }
            }

            .city-icon-wrapper{
              display: none;
              ${mediaQueries("sm")`
                display: inline-flex;
              `}
            }
            &.datepicker-box{
              border-right: 1px solid #29508699;
              margin-right: 23px;
              padding-left: 30px;
              ${mediaQueries("xl")`
                padding-left: 20px;
              `}
              ${mediaQueries("lg")`
                padding-left: 16px;
              `}
              ${mediaQueries("md")`
                padding-left: 12px;
              `}
              ${mediaQueries("sm")`
                padding-left: 10px;
                padding-bottom: 10px;
                padding-top: 10px;
                margin-right: 0;
                border-right: 0;
              `}
              input{
                ${mediaQueries("lg")`
                  width: calc(100% - 100px);
                `}
                ${mediaQueries("md")`
                  width: calc(100% - 50px);
                `}
              }
            }
            &.service-input-wrapper{
              padding-left: 30px;
              ${mediaQueries("xl")`
                padding-left: 20px;
              `}
              ${mediaQueries("lg")`
                padding-left: 16px;
              `}
              ${mediaQueries("md")`
                padding-left: 12px;
              `}
              ${mediaQueries("sm")`
                padding-left: 10px;
                padding-bottom: 10px;
                padding-top: 10px;
              `}
            }
            label{
              font-size: 18px;
              color: ${theme.color.secondary};
              ${mediaQueries("lg")`
                font-size: 17px;
              `}
              ${mediaQueries("md")`
                font-size: 16px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                display: flex;
                align-items: center;
              `}
              i{
                margin-right: 12px;
                ${mediaQueries("sm")`
                  width: 13px;
                  height: auto;
                  display: inline-flex;
                `}
              }
            }
            .sit-select-city-select-div{
              width: 100%;
              position: relative;
              .input-select-wrapper{
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 20px;
                ${mediaQueries("sm")`
                  padding-right: 0;
                `}
                input{
                  border: none;
                  padding: 0;
                  margin: 0;
                  width: calc(100% - 20px);
                  color: #29508699;
                  font-size: 14px;
                  font-weight: 400;
                  background:transparent;
                  z-index: 1;
                  ${mediaQueries("sm")`
                    font-size: 16px;
                  `}
                  &:focus{
                    outline: none;
                  }
                  &::placeholder{
                    color: #29508699;
                    font-size: 16px;
                    font-weight: 400;
                    ${mediaQueries("sm")`
                      font-size: 14px;
                    `}
                  }
                }
                i{
                  display: block;
                  width: 20px;
                  height: 20px;
                  overflow: hidden;
                  position: absolute;
                  top: 0;
                  right: 20px;
                  bottom: 0;
                  margin: auto;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 2;
                  ${mediaQueries("sm")`
                    right: 12px;
                  `}
                  svg{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                    path{
                      fill: hsl(0, 0%, 80%);
                    }
                    &:hover{
                      path{
                        fill: hsl(0, 0%, 60%);
                      }
                    }
                  }
                }
              }
              p{
                color: #295086;
                font-size: 14px;
                font-weight: 400;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 20px;

              }
              .sit-select-city-options-wrapper{
                position: absolute;
                width: calc(100% - 10px);
                z-index: 20;
                background-color: hsl(0, 0%, 100%);
                border-radius: 4px;
                box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);

                max-height: 300px;
                overflow-y: auto;
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
                  padding: 0;
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
                        background: #f1f1f1;
                      }
                      &:focus{
                        background: #f1f1f1;
                      }
                    }
                  }
                }
              }
            }
          }
          .filter-btn{
            display: flex;
            justify-content: center;
            align-items: center;
            position: unset;
            ${mediaQueries("sm")`
              margin-top: 15px;
              min-width: 100%;
            `}
            button{
              min-height: 51px;
              min-width: 130px;
              font-size: 14px;
              font-weight: 400 !important;
              ${mediaQueries("sm")`
                min-width: 100%;
              `}
            }
          }
        }
      }
    }
  }

`;
export const MarketPlaceDisplayDiv = styled.div`
  background: #004d870d;
  padding: 40px 20px 10px;
  margin-top: 25px;
  ${mediaQueries("xl")`
    margin-top: 0;
  `}
  ${mediaQueries("sm")`
    padding: 38px 20px 38px;
    margin-top: 0;
  `}
  .marketplace-main-div{
    max-width: 1210px;
    margin: auto;
    .marketplace-box-div{
      border-radius: 19px;
      background: #FFF;
      padding: 25px 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 350px;
      margin-bottom: 30px;
      &.relaxation-box{
        background: #FDECDF;
      }
      ${mediaQueries("md")`
        min-height: 320px;
      `}
      ${mediaQueries("sm")`
         padding: 25px;
         min-height: 330px;
      `}
      ${mediaQueries("xs")`
         min-height: 350px;
      `}
      .image-div{
        width: 100px;
        height: auto;
        overflow: hidden;
        margin-bottom: 35px;
        ${mediaQueries("sm")`
          margin-bottom: 25px;
          width: 85px;
        `}
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }
      .marketplace-detail-div{
        ${mediaQueries("sm")`
          max-width: 245px;
        `}
        h4{
          color: ${theme.color.secondary};
          font-family: ${theme.font.fontFamilyPlayFair};
          font-size: 24px;
          font-weight: 800;
          line-height: normal;
          text-align: center;
          margin-bottom: 20px;
          ${mediaQueries("xl")`
            font-size: 22px;
          `}
          ${mediaQueries("lg")`
            font-size: 20px;
          `}
          ${mediaQueries("md")`
            font-size: 19px;
          `}
          ${mediaQueries("sm")`
            font-size: 18px;
            margin-bottom: 15px;
          `}
        }
        p{
          color: #295086cc;
          text-align: center;
          font-size: 16px;
          font-weight: 300;
          line-height: 32px;
          ${mediaQueries("md")`
            font-size: 15px;
          `}
          ${mediaQueries("sm")`
            font-size: 14px;
          `}
        }
      }
    }
    .marketplace-desktop-view{
      ${mediaQueries("sm")`
        display: none;
      `}
    }
    .sitback-marketplace-mobile-div{
      display: none;
      ${mediaQueries("sm")`
        display: block;
      `}
      .marketplace-box-div{
        flex-direction: row;
        padding: 15px;
        margin-bottom: 0;
        min-height: 130px;
        .image-div{
          width: 60px;
          margin-bottom: 0;
          margin-right: 15px;
        }
      }
      .marketplace-detail-div{
        max-width: 100%;
        h4{
          text-align: left;
          margin-bottom: 4px;
          font-size: 16px;
        }
        p{
          font-size: 12px;
          line-height: 20px;
          text-align: left;
        }
      }
    }
  }
`;
export const HowSitBackHelpSectionWrapper = styled.div`
  padding: 100px 0 70px;
  background: ${theme.color.white};
  overflow: hidden;
  ${mediaQueries("md")`
    padding: 90px 0 60px;
  `}
  ${mediaQueries("sm")`
    padding: 50px 0 20px;
  `}
  .container{
    max-width: 1600px;
  }
  .sitback-help-detail-wrapper{
    .sitback-help-header-title{
      max-width: 1110px;
      width: 100%;
      margin: auto;
      text-align: center;
      margin-bottom: 60px;
      ${mediaQueries("md")`
         margin-bottom: 50px;
      `}
      ${mediaQueries("sm")`
         margin-bottom: 20px;
      `}
      h2{
        ${mediaQueries("sm")`
          font-size: 26px;
        `}
      }
      p{
        max-width: 1010px;
        margin: auto;
        width: 100%;
        ${mediaQueries("xxl")`
         max-width: 970px;
        `}
        ${mediaQueries("xl")`
         max-width: 900px;
        `}
        ${mediaQueries("lg")`
         max-width: 770px;
        `}
        ${mediaQueries("md")`
          max-width: 630px;
        `}
        ${mediaQueries("sm")`
          max-width: 630px;
        `}
        ${mediaQueries("sm")`
          font-size: 16px;
          line-height: 30px;
        `}
      }
    }
    .sitback-service-icon-wrapper{
      display: flex;
      align-items: flex-start;
      ${mediaQueries("md")`
        flex-direction: column;
      `}
      ${mediaQueries("sm")`
        display: none;
      `}
      .sitback-service-icon{
        flex: 0 0 330px;
        ${mediaQueries("xxl")`
          flex: 0 0 380px;
        `}
        /* ${mediaQueries("xl")`
          flex: 0 0 280px;
        `}*/
        ${mediaQueries("lg")`
          flex: 0 0 290px;
        `}
        ${mediaQueries("md")`
          flex: 0 0 100%;
        `}
        .sitback-service-list-wrapper{
          width: 100%;
          max-width: 310px;
          margin: auto;
          ${mediaQueries("xxl")`
            max-width: 95%;
          `}
          ${mediaQueries("lg")`
            max-width: 100%;
          `}
          ${mediaQueries("md")`
            display: flex;
            flex-wrap: wrap;
            max-width: calc(100% - 24px);
          `}
          .sitback-service-list{
            margin-bottom: 40px;
            ${mediaQueries("md")`
              margin-bottom: 30px;
              flex: 0 0 48%;
              margin-right: 2%;
            `}
            .sitback-icon{
              width: 80px;
              height: 80px;
              background: #DAF7FC;
              border-radius: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 16px;
              ${mediaQueries("xxl")`
                width: 70px;
                height: 70px;
              `}
              ${mediaQueries("xl")`
                width: 60px;
                height: 60px;
              `}
              ${mediaQueries("lg")`
                width: 50px;
                height: 50px;
              `}
              ${mediaQueries("md")`
                width: 45px;
                height: 45px;
              `}
              i{
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                ${mediaQueries("xxl")`
                  width: 30px;
                  height: 30px;
                `}
                ${mediaQueries("xl")`
                  width: 26px;
                  height: 26px;
                `}
                ${mediaQueries("lg")`
                  width: 21px;
                  height: 21px;
                `}
                ${mediaQueries("md")`
                  width: 18px;
                  height: 18px;
              `}
              }
            }
            h5{
              font-size: 24px;
              font-weight: 700;
              line-height: 32px;
              letter-spacing: 0.05em;
              color: ${theme.color.secondary};
              margin-bottom: 8px;
              ${mediaQueries("xxl")`
                font-size: 22px;
              `}
              ${mediaQueries("xl")`
                font-size: 20px;
              `}
              ${mediaQueries("lg")`
                font-size: 18px;
                line-height: normal;
              `}
              ${mediaQueries("md")`
                font-size: 16px;
              `}
              ${mediaQueries("sm")`
                font-size: 15px;
              `}
            }
            p{
              font-size: 16px;
              font-weight: 400;
              line-height: 27px;
              letter-spacing: 0em;
              color: ${theme.color.secondary};
              opacity: 0.6;
              ${mediaQueries("md")`
                font-size: 15px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                line-height: 25px;
              `}
            }
          }
        }
      }
      .gallery-img-wrapper{
        flex: 1;
        ${mediaQueries("md")`
          flex: 0 0 100%;
        `}
        .gallery-img{
          width: calc(100% - 10px);
          margin: auto;
          height: 100%;
          ${mediaQueries("md")`
            max-width: 500px;
            width: 100%;
            margin: auto;
          `}
          ${mediaQueries("sm")`
            max-width: 400px;
          `}
          ${mediaQueries("xs")`
            max-width: 350px;
          `}
        }
      }
    }
    .sitback-service-mobile-view{
      display: none;
      overflow: auto;
      padding-bottom: 12px;
      margin-bottom: 40px;
      ${mediaQueries("sm")`
        display: flex;
        width: 100%;
      `}
      .gallery-img{
        flex: 0 0 280px;
        height: 220px;
        margin-right: 15px;
        .imgbox{
          width: 100%;
          height: 100%;
          background: #efecd5;
          border-radius: 12px;
          overflow: hidden;
          padding: 8px;
        }
      }
    }
    .sitback-service-iconsbox-mobile-view{
      display: none;
      overflow: auto;
      padding-bottom: 12px;
      ${mediaQueries("sm")`
        display: flex;
      `}
      .sitback-service-list{
        width: 280px;
        margin-right: 10px;
        .sitback-icon{
          width: 80px;
          height: 80px;
          background: #DAF7FC;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 16px;
          ${mediaQueries("xxl")`
            width: 70px;
            height: 70px;
          `}
          ${mediaQueries("xl")`
            width: 60px;
            height: 60px;
          `}
          ${mediaQueries("lg")`
            width: 50px;
            height: 50px;
          `}
          ${mediaQueries("md")`
            width: 45px;
            height: 45px;
          `}
          i{
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            ${mediaQueries("xxl")`
              width: 30px;
              height: 30px;
            `}
            ${mediaQueries("xl")`
              width: 26px;
              height: 26px;
            `}
            ${mediaQueries("lg")`
              width: 21px;
              height: 21px;
            `}
            ${mediaQueries("md")`
              width: 18px;
              height: 18px;
          `}
          }
        }
        h5{
          font-size: 24px;
          font-weight: 700;
          line-height: 32px;
          letter-spacing: 0.05em;
          color: ${theme.color.secondary};
          margin-bottom: 8px;
          ${mediaQueries("xxl")`
            font-size: 22px;
          `}
          ${mediaQueries("xl")`
            font-size: 20px;
          `}
          ${mediaQueries("lg")`
            font-size: 18px;
            line-height: normal;
          `}
          ${mediaQueries("md")`
            font-size: 16px;
          `}
          ${mediaQueries("sm")`
            font-size: 15px;
          `}
        }
        p{
          font-size: 16px;
          font-weight: 400;
          line-height: 27px;
          letter-spacing: 0em;
          color: ${theme.color.secondary};
          opacity: 0.6;
          ${mediaQueries("md")`
            font-size: 15px;
          `}
          ${mediaQueries("sm")`
            font-size: 14px;
            line-height: 25px;
          `}
        }
      }
    }
  }
`;
export const SitBackServiceSectionWrapper = styled.div`
  .sitback-section-wrapper{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 80px 0 30px;
    background: #FFFDEF;
    position: relative;
    overflow: hidden;
    &.sitback-reverse-section-wrapper{
      flex-direction: row-reverse;
      ${mediaQueries("md")`
        flex-direction: column;
      `}
      &::before{
        right: 0;
        left: unset;
      }
      .sitback-img-detail-wrapper{
        padding-left: 50px;
        ${mediaQueries("sm")`
          padding-left: 0;
          padding-top: 50px;
        `}
      }
    }
    &::before{
      position: absolute;
      content: '';
      width: 30%;
      background: ${theme.color.secondary};
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      ${mediaQueries("md")`
         height: 50%;
         width: 50%;
      `}
      ${mediaQueries("sm")`
         height: 42%;
      `}
    }
    ${mediaQueries("md")`
      flex-direction: column;
      padding: 80px 0 60px;
    `}
    ${mediaQueries("md")`
       padding: 60px 0;
    `}
    .sitback-img-wrapper{
      flex: 0 0 50%;
      ${mediaQueries("md")`
        flex: unset;
        width: 100%;
      `}
      .sitback-img{
        width: 100%;
        height: 750px;
        overflow: hidden;
        position: relative;
        z-index: 1;
        img{
          object-position: left;
          ${mediaQueries("sm")`
            object-position: center;
          `}
          &.sitback-business-img-wrapper{
            width: calc(100% - 50px);
            ${mediaQueries("xl")`
              width: calc(100% - 30px);
            `}
            ${mediaQueries("lg")`
              width: calc(100% - 10px);
            `}
            ${mediaQueries("md")`
              width: 100%;
            `}
          }
          &.sitback-img-showcase{
            object-position: right;
          }
        }
        ${mediaQueries("xxl")`
          height: 650px;
        `}
        ${mediaQueries("xl")`
          height: 580px;
        `}
        ${mediaQueries("lg")`
          height: 500px;
        `}
        ${mediaQueries("md")`
          height: 400px;
        `}
        ${mediaQueries("sm")`
          height: auto;
          width: calc(100% - 50px);
          height: 300px;
          margin-top: -20px;
          margin-left: 10px;
        `}
        /* ${mediaQueries("xs")`
          height: 260px;
        `} */
      }
    }
    .sitback-img-detail-wrapper{
      flex: 1;
      ${mediaQueries("md")`
         margin-top: 50px;
      `}
      .sitback-detail-text{
        max-width: 760px;
        width: calc(100% - 40px);
        padding: 30px 0;
        ${mediaQueries("xxl")`
          max-width: 560px;
          width: 100%;
          padding: 30px 0;
          margin: auto;
        `}

        ${mediaQueries("lg")`
          padding: 0 30px;
          width: 100%;
        `}
        ${mediaQueries("md")`
          padding: 30px 25px 0;
           max-width: 100%;
        `}
        ${mediaQueries("sm")`
          padding: 25px 15px 0;
        `}
        h2{
          text-align: start;
          margin-bottom: 33px;
          ${mediaQueries("md")`
            margin-bottom: 22px;
          `}
          ${mediaQueries("sm")`
            margin-bottom: 15px;
            font-size: 26px;
            line-height: 41px;
          `}
        }
        p{
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 41px;
          color: ${theme.color.secondary};
          opacity: 0.6;
          text-align: start;
          margin-bottom: 30px;
          &:last-child{
            margin-bottom: 0;
          }
          ${mediaQueries("xxl")`
            font-size: 22px;
            line-height: 38px;
          `}
          ${mediaQueries("xl")`
            font-size: 20px;
            line-height: 35px;
          `}
          ${mediaQueries("lg")`
            font-size: 18px;
            line-height: 30px;
            margin-bottom: 20px;
          `}
          ${mediaQueries("md")`
            font-size: 16px;
            line-height: 27px;
            margin-bottom: 15px;
          `}
          ${mediaQueries("sm")`
            font-size: 16px;
            line-height: 30px;
          `}
        }
        button{
          max-width: 280px;
          background: ${theme.color.secondary};
          border-color: ${theme.color.secondary};
          letter-spacing: 1px;
          color: #ffffffb3;
        }
        .mobile-view-center{
          ${mediaQueries("sm")`
            text-align: center;
          `}
        }
      }
    }
    &.sitback-givethe-people-section{
      background: ${theme.color.white};
      padding-bottom: 100px;
      ${mediaQueries("lg")`
         padding-bottom: 70px;
      `}
      ${mediaQueries("md")`
         padding-bottom: 40px;
      `}
      .sitback-detail-text{
        ${mediaQueries("sm")`
          padding-top: 0;
        `}
      }
      &::before{
        left: auto;
        right: 0;
        width: 38%;
        ${mediaQueries("md")`
          width: 50%;
          height: 450px;
        `}
      }
      .sitback-img-detail-wrapper{
        .sitback-detail-text{
          margin: 0 0 0 auto;
          margin-right: 30px;
          padding-left: 30px;
          padding-right: 15px;
          ${mediaQueries("xxl")`
            padding-left: 15px;
            max-width: 615px;
          `}
          ${mediaQueries("lg")`
            padding-left: 15px;
            max-width: 100%;
          `}
          ${mediaQueries("md")`
            padding: 0 25px 20px;
          `}
          ${mediaQueries("sm")`
            padding: 0 15px 20px;
          `}
          h2{
            /* max-width: 560px;
            font-size: 50px;
            line-height: 60px; */
            ${mediaQueries("xxl")`
              font-size: 37px;
              line-height: 45px;
            `}
            ${mediaQueries("xl")`
              font-size: 30px;
              line-height: 36px;
            `}
            ${mediaQueries("lg")`
              font-size: 25px;
              line-height: 30px;
            `}
            ${mediaQueries("md")`
              font-size: 26px;
              line-height: 32px;
              margin-bottom: 18px;
            `}
            /* ${mediaQueries("sm")`
              font-size: 28px;
              line-height: 36px;
            `} */
            /* ${mediaQueries("xs")`
              font-size: 26px;
              line-height: 41px;
            `} */
          }
        }
      }
      .sitback-img-wrapper{
        ${mediaQueries("md")`
           order: -1;
        `}
        .sitback-img{
          ${mediaQueries("md")`
            margin-top: 30px;
            width: 100%;
            height: 400px;
            margin-top: -30px;
          `}
        }
      }
    }
  }
  .empty-div {
    background: #FFFDEF;
    height: 104px;
    ${mediaQueries("lg")`
      display: none;
    `}
  }
  .sitback-more-clients-section{
    display: inline-flex;
    height: 100%;
    overflow: hidden;
    ${mediaQueries("lg")`
      flex-direction: column;
    `}
    .sitback-img-wrapper{
      background: ${theme.color.secondary};
      flex: 0 0 810px;
      min-height: 750px;
      padding: 15px;
      ${mediaQueries("xxl")`
        flex: 0 0 40%;
      `}
      ${mediaQueries("lg")`
        min-height: auto;
        padding: 30px;
      `}
      ${mediaQueries("md")`
        padding: 25px;
      `}
      ${mediaQueries("sm")`
        padding: 25px 15px;
      `}
      .text-div{
        max-width: 700px;
        width: calc(100% - 20px);
        margin: 0 0 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        ${mediaQueries("lg")`
          width: 100%;
          margin: 0;
        `}
        h5{
          font-size: 80px;
          font-weight: 700;
          line-height: 100px;
          letter-spacing: 0em;
          text-align: left;
          color: ${theme.color.white};
          ${mediaQueries("xxl")`
            font-size: 72px;
            line-height: 90px;
          `}
          ${mediaQueries("xl")`
            font-size: 70px;
            line-height: 80px;
          `}
          ${mediaQueries("lg")`
            font-size: 60px;
            line-height: 70px;
          `}
          ${mediaQueries("md")`
            font-size: 45px;
            line-height: 60px;
          `}
          span{
            display: inline-block;
            font-style: italic;
          }
        }
      }
    }
    .sitback-img-detail-wrapper{
      flex: 1;
      display: flex;
      align-items: center;
      padding: 100px 40px;
      ${mediaQueries("lg")`
        padding: 80px 30px;
      `}
      ${mediaQueries("md")`
        padding: 70px 25px;
      `}
      ${mediaQueries("sm")`
        padding: 40px 15px 45px;
      `}
      .sitback-detail-text{
        max-width: 890px;
        width: 100%;
      }
      p{
        font-style: normal;
        font-weight: 300;
        font-size: 36px;
        line-height: 54px;
        color: ${theme.color.secondary};
        opacity: 0.6;
        text-align: start;
        margin-bottom: 30px;
        ${mediaQueries("xxl")`
          font-size: 33px;
          line-height: 45px;
        `}
        ${mediaQueries("xl")`
          font-size: 28px;
          line-height: 42px;
          margin-bottom: 25px;
        `}
        ${mediaQueries("lg")`
          font-size: 25px;
          line-height: 38px;
        `}
        ${mediaQueries("md")`
          font-size: 22px;
          line-height: 38px;
        `}
        ${mediaQueries("sm")`
          font-size: 16px;
          line-height: 30px;
          margin-bottom: 8px;
        `}
        &:last-child{
          margin-bottom: 0;
        }
      }
      button{
        max-width: 280px;
        background: ${theme.color.secondary};
        border-color: ${theme.color.secondary};
        letter-spacing: 1px;
        color: #ffffffb3;
      }
      .mobile-view-center{
        ${mediaQueries("sm")`
          text-align: center;
        `}
      }
    }
  }
`;
export const UnderMaintenanceLayoutWrapper = styled.div`
  background: ${theme.color.blur};
  min-height: 100vh;
  padding: 25px 0 0;
  position: relative;
  overflow: hidden;
  .cloud-image-wrapper{
    max-width: 400px;
    height: auto;
    width: 100%;
    position: absolute;
    left: -75px;
    top: 50px;
    height: 230px;
    ${mediaQueries("xxl")`
      max-width: 350px;
      height: 160px;
    `}
    ${mediaQueries("xl")`
      max-width: 320px;
      height: 165px;
    `}
    ${mediaQueries("lg")`
      max-width: 260px;
      height: 130px;
    `}
    ${mediaQueries("md")`
      max-width: 230px;
      height: 120px;
      left: -75px;
      top: 20px;
    `}
    img{
      object-fit: fill;
    }
    &.right-side-cloud-img{
      right: -70px;
      left: auto;
      bottom: 30%;
      top: auto;
      max-width: 380px;
      height: 230px;
      ${mediaQueries("xxl")`
        max-width: 300px;
        height: 190px;
        bottom: 40%;
      `}
      ${mediaQueries("xl")`
        max-width: 280px;
        height: 100px;
      `}
      ${mediaQueries("lg")`
        max-width: 250px;
        height: 100px;
        right: -140px;
      `}
      ${mediaQueries("md")`
        max-width: 220px;
        height: 110px;
        bottom: 0%;
      `}
    }
    &.bottom-side-cloud-img{
      max-width: 1200px;
      height: auto;
      bottom: -20px;
      top: auto;
      left: -30%;
      right: auto;
      height: 320px;
      ${mediaQueries("xxl")`
        height: 270px;
        max-width: 1000px;
      `}
      ${mediaQueries("xl")`
        height: 190px;
        max-width: 830px;
      `}
      ${mediaQueries("lg")`
        height: 150px;
        max-width: 780px;
      `}
      ${mediaQueries("md")`
        height: 150px;
        max-width: 500px;
      `}
    }
  }
  .under-maintenance-detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${mediaQueries("xxl")`
     min-height: 96vh;
    `}
    .logo-detail-wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
      .sitback-logo-wrapper{
        max-width: 260px;
        height: 130px;
        width: 100%;
        display: inline-block;
        margin-bottom: 10px;
        ${mediaQueries("lg")`
          max-width: 240px;
          height: 110px;
        `}
        ${mediaQueries("md")`
          max-width: 220px;
          height: 100px;
        `}
      }
      .sub-title {
        color: ${theme.color.secondary};
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
        margin-bottom: 15px;
        text-align: center;
        ${mediaQueries("md")`
          font-size: 16px;
          line-height: 27px;
        `}
      }
      h2{
        font-size: 50px;
        font-weight: 700;
        line-height: 60px;
        letter-spacing: 0px;
        text-align: center;
        color: ${theme.color.secondary};
        max-width: 713px;
        margin: auto;
        width: 100%;
        ${mediaQueries("xl")`
          font-size: 45px;
          line-height: 55px;
          max-width: 500px;
        `}
        ${mediaQueries("lg")`
          font-size: 40px;
          line-height: 50px;
          max-width: 420px;
        `}
        ${mediaQueries("md")`
          font-size: 35px;
          line-height: 45px;
        `}
        ${mediaQueries("sm")`
          font-size: 30px;
          line-height: 40px;
        `}
        ${mediaQueries("xs")`
          font-size: 28px;
          line-height: 34px;
        `}
      }
    }
    .under-maintenance-banner{
      max-width: 1370px;
      width: 100%;
      height: 60vh;
      position: relative;
      z-index: 2;
      ${mediaQueries("xxl")`
         height: 55vh;
      `}
      img{
        object-position: bottom;
      }
    }
  }
`;
export const ScottsdaleSectionWrapper = styled.div`
  padding: 60px 0;
  background: #FFFDEF;
  ${mediaQueries("md")`
    padding: 50px 0;
  `}
  ${mediaQueries("sm")`
    padding: 30px 0 40px;
  `}
  .scottsdale-headertext{
    margin-bottom: 25px;
    ${mediaQueries("xl")`
       margin-bottom: 20px;
    `}
    ${mediaQueries("lg")`
      margin-bottom: 20px;
    `}
    ${mediaQueries("lg")`
      margin-bottom: 20px;
    `}
  }
  .filter-inputbox-wrapper{
    background: #FFFFFF;
    border: 1px solid #29508699;
    border-radius: 100px;
    max-width: 1155px;
    width: 100%;
    margin: auto;
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    padding: 5px 15px;
    min-height: 70px;
    ${mediaQueries("sm")`
      flex-direction: column;
      border-radius: 12px;
      padding: 15px;
    `}
    .filterbox-input{
      width: 50%;
      border-right: 1px solid #29508699;
      position: relative;
      padding: 0 15px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      ${mediaQueries("sm")`
        width: 100%;
        padding: 0;
        border-right: 0px solid #29508699;
        border-bottom: 1px solid #29508699;
        margin-bottom: 6px;
        padding-bottom: 6px;
      `}
      label{
        margin: 0;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: normal;
        color: #295086;
        margin-bottom: 4px;
      }
      .sitback-select2-container{
        width: 100%;
        .sitback-select-option__control{
          .sitback-select-option__value-container{
            padding: 0;
            min-height: auto;
            .sitback-select-option__placeholder{
              margin: 0;
              color: #295086;
            }
            .sitback-select-option__input-container{
              margin: 0;
              padding: 0;
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
                background: ${theme.color.primary};
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
      &.datepicker-box{
        border-right: 0px;
        padding-right: 0;
        .datepicker{
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          width: calc(100% - 150px);
        }
        .calendarv2-wrapper-div{
          top: 59px;
          bottom: 0;
        }
      }
    }
    .filter-btn{
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      ${mediaQueries("sm")`
        position: unset;
      `}
      button{
        min-width: 150px;
        background: #295085;
        border: 1px solid #295085;
        height: 100%;
      }
    }
    .sitback-select2-container{
      .sitback-select-option__control {
        padding: 0;
        border-radius: 0;
        background: transparent;
        border-color: transparent;
        outline: none !important;
        box-shadow: none !important;
        min-height: auto;
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
          .sitback-select-option__indicator{
            padding: 0;
          }
        }
      }
    }
  }
  .view-spas-footer{
    margin-top: 40px;
    text-align: center;
    button{
      max-width: 280px;
      background: #295086;
      border-color: #295086;
      letter-spacing: 1px;
      color: #ffffffb3;
      font-size: 18px;
    }
  }
  .swiper{
    height: 100%;
    .swiper-wrapper{
      .swiper-slide{
        ${mediaQueries("md")`
          height: 100%;
        `}
        .box-wrapperdiv{
          ${mediaQueries("md")`
            min-height: 450px;
          `}
        }
        .checkbox-and-btn{
          p{
            ${mediaQueries("xs")`
              -webkit-line-clamp: 2;
            `}
          }
        }
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next{
    width: 36px;
    height: 36px;
    background: #89c5d0;
    border-radius: 1000px;
    ${mediaQueries("md")`
      display: none;
    `}
    &::after{
      font-size: 15px;
      color: white;
    }
  }
  .see-othercities{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -22px;
    padding-bottom: 35px;
    a{
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 30px;
      text-decoration-line: underline !important;
      color: #295086;
      font-family: ${theme.font.fontFamilyOpenSans};
    }
  }
  &.spas-available-section{
    background: #FFFFFF;
    padding: 45px 0 60px;
    &.spas-mobile-view-display-section{
      padding-top: 50px;
      ${mediaQueries("lg")`
          padding-top: 40px;
      `}
      ${mediaQueries("md")`
          padding-top: 30px;
      `}
      ${mediaQueries("sm")`
          padding-top: 20px;
      `}
    }
    .spas-block-wrapper{
      margin-bottom: 38px;
      &:last-child{
        margin-bottom: 0;
      }
      .spas-name-title-text{
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: normal;
        color: #295086;
        margin-bottom: 26px;
        ${mediaQueries("xl")`
           font-size: 30px;
        `}
        ${mediaQueries("lg")`
          font-size: 26px;
          margin-bottom: 22px;
        `}
        ${mediaQueries("md")`
          font-size: 22px;
        `}
        ${mediaQueries("sm")`
           font-size: 18px;
           margin-bottom: 15px;
        `}
        ${mediaQueries("xs")`
           font-size: 16px;
        `}
      }
      .box-wrapperdiv{
        box-shadow: 2px 5px 36px -6px #0202021a;
        .scottsdale-detail{
          .checkbox-and-btn{
            .checkbox-list-wrapper{
              .checkbox-wrapper-div{
                .checkmark{
                  background-color: #95CCD5;
                  border-color: #EAEBEC;
                  color: white;
                  min-height: 42px;
                }
              }
              input:disabled ~ .checkmark {
                background-color: #f3f3f3;
                border-color: #f3f3f3;
                color: #a3afbe;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
  }
  .sitback-mobile-updated-search-select-filter-display-div{
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 0px #0000001A;
    border-radius: 20px;
    margin: -70px 20px 0;
    padding: 15px 0 12px;
    display: none;
    ${mediaQueries("sm")`
        display: block;
    `}
    .landing-mobile-view-filter-wrapper{
      .mobile-filter-btn{
        display: flex;
        justify-content: center;
        margin: 10px auto 0;
        button{
          width: calc(100% - 11px);
        }
      }
        .filter-inputbox-wrapper{
          max-width: 100%;
          width: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
          padding: 5px 15px;
          min-height: 70px;
          ${mediaQueries("sm")`
            flex-direction: column;
            border: none;
            width: 100%;
            padding: 0;
          `}
          .filterbox-input{
            width: 32%;
            border-right: 1px solid #29508645;
            position: relative;
            padding: 0 15px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            ${mediaQueries("sm")`
              padding: 15px 23px 10px 23px;
              border-right: none;
              border-bottom: 1px solid #29508699;
              margin-bottom: 0;
              width: 100%;
            `}
            &.service-type-input-wrapper{
              width: 100%;
              padding: 8px 23px 10px 23px;
            }
            label{
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: normal;
              color: #295086;
              margin-bottom: 0;
              ${mediaQueries("sm")`
                font-size: 16px;
              `}
            }
            .sitback-select2-container{
              width: 100%;
              .sitback-select-option__control{
                .sitback-select-option__value-container{
                  padding: 0;
                  min-height: auto;
                  .sitback-select-option__placeholder{
                    margin: 0;
                    color: #295086;
                    font-size: 14px;
                    ${mediaQueries("sm")`
                      font-size: 16px;
                    `}
                  }
                  .sitback-select-option__single-value{
                    font-size: 14px !important;
                    color: #295086 !important;
                    ${mediaQueries("sm")`
                      font-size: 16px !important;
                    `}
                  }
                  .sitback-select-option__input-container{
                    margin: 0;
                    padding: 0;
                  }
                }
              }
              .sitback-select-option__menu {
                .sitback-select-option__menu-list {
                  .sitback-select-option__option {
                    color: ${theme.color.secondary};
                    font-size: 12px;
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
                      background: ${theme.color.primary};
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
            &.datepicker-box{
              border-right: none;
              padding: 8px 23px 10px;
              flex: 1;
              label{
                /* margin-bottom: 8px; */
              }
              .calendarv2-wrapper-div{
                .rdp-root{
                  /* right: 200px; */
                }
              }
              .datepicker{
                background: transparent;
                border: none;
                box-shadow: none;
                padding: 0;
                width: 100%;
                font-size: 14px !important;
                color: #295086;
                font-weight: 300;
                min-height: 26px;
                ${mediaQueries("sm")`
                  font-size: 16px !important;
                `}
              }
              .calendarv2-wrapper-div{
                top: 59px;
                bottom: 0;
              }
            }
          }
          .filter-btn{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            padding-left: 8px;
            ${mediaQueries("sm")`
              position: unset;
              flex: 1;
              display: flex;
              justify-content: center;
            `}
            button{
              min-width: unset;
              background: transparent;
              border: none;
              height: 100%;
              padding: 0;
              margin: 0;
              width: 24px;
              height: 24px;
              overflow: hidden;
            }
          }
          .sitback-select2-container{
            .sitback-select-option__control {
              padding: 0;
              border-radius: 0;
              background: transparent;
              border-color: transparent;
              outline: none !important;
              box-shadow: none !important;
              min-height: auto;
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
                  ${mediaQueries("sm")`
                    font-size: 16px;
                  `}
                }
              }
              .sitback-select-option__indicators {
                .sitback-select-option__indicator-separator {
                  display: none;
                }
                .sitback-select-option__indicator{
                  padding: 0;
                }
              }
            }
          }
          .sit-select-city-select-div{
            width: 100%;
            position: relative;
            .input-select-wrapper{
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              input{
                border: none;
                padding: 0;
                margin: 0;
                width: calc(100% - 20px);
                color: #295086;
                font-size: 14px;
                font-weight: 400;
                background: transparent;
                /* white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 70px; */
                z-index: 1;
                &:focus{
                  outline: none;
                }
                &::placeholder{
                  color: #295086;
                  font-size: 14px;
                  font-weight: 400;
                  ${mediaQueries("sm")`
                    font-size: 16px;
                  `}
                }
                ${mediaQueries("sm")`
                  font-size: 16px;
                `}
              }
              i{
                display: block;
                width: 20px;
                height: 20px;
                overflow: hidden;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                svg{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                  path{
                    fill: hsl(0, 0%, 80%);
                  }
                  &:hover{
                    path{
                      fill: hsl(0, 0%, 60%);
                    }
                  }
                }
              }
            }
            p{
              color: #295086;
              font-size: 14px;
              font-weight: 400;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-right: 20px;

            }
            .sit-select-city-options-wrapper{
              position: absolute;
              width: 100%;
              z-index: 20;
              background-color: hsl(0, 0%, 100%);
              border-radius: 4px;
              box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
              top: 35px;
              left: 0;
              max-height: 300px;
              overflow-y: auto;
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
                padding: 0;
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
                      background: #f1f1f1;
                    }
                    &:focus{
                      background: #f1f1f1;
                    }
                  }
                }
              }
            }
          }
        }
        .filter-icon-wrapper{
          flex: 1;
          .img-wrapper{
            width: 32px;
            height: 32px;
            overflow: hidden;
            display: block;
          }

        }
      .filter-btn{
        margin-top: 18px;
        button{
          background: #295086;
          text-transform: uppercase;
          min-height: 54px;
        }

      }
    }
  }
  .sitback-landing-search-mobile-view-wrapper{
    display: none;
    ${mediaQueries("sm")`
      display: block;
      width: 100%;
      border-bottom: 1px solid #29508657;
      padding-bottom: 15px;
    `}
    /* &.sitback-updated-filter-box-wrapper{
      .landing-mobile-view-filter-wrapper{
        .filter-inputbox-wrapper{
          flex-direction: column;
          padding: 0;
          .filterbox-input{
            width: 100%;
            border-right: 0;
            border-bottom: 1px solid #29508699;
            &.service-type-input-wrapper{
              width: 100%;
              padding: 0;
            }
          }
        }
      }
    } */
    .landing-mobile-view-filter-wrapper{
        padding: 0 15px;
        .filter-inputbox-wrapper{
          background: #FFFFFF;
          border: 1px solid #29508657;
          border-radius: 100px;
          max-width: 100%;
          width: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
          padding: 5px 15px;
          min-height: 70px;
          ${mediaQueries("sm")`
            border-radius: 25px;
            padding: 10px 15px;
            min-height: unset;
            flex-direction: row;
          `}
          .filterbox-input{
            width: 32%;
            border-right: 1px solid #29508645;
            position: relative;
            padding: 0 15px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            ${mediaQueries("sm")`
              padding: 0;
              border-right: 1px solid #29508699;
              border-bottom: 0px solid #29508699;
              margin-bottom: 0;
              padding-bottom: 0;
              padding-right: 6px;
            `}
            &.service-type-input-wrapper{
              width: 42%;
              padding-left: 6px;
            }
            label{
              font-style: normal;
              font-weight: 700;
              font-size: 14px;
              line-height: normal;
              color: #295086;
              margin-bottom: 0;
            }
            .sitback-select2-container{
              width: 100%;
              .sitback-select-option__control{
                .sitback-select-option__value-container{
                  padding: 0;
                  min-height: auto;
                  .sitback-select-option__placeholder{
                    margin: 0;
                    color: #295086;
                    font-size: 13px;
                  }
                  .sitback-select-option__single-value{
                    font-size: 13px !important;
                    color: #295086 !important;
                  }
                  .sitback-select-option__input-container{
                    margin: 0;
                    padding: 0;
                  }
                }
              }
              .sitback-select-option__menu {
                .sitback-select-option__menu-list {
                  .sitback-select-option__option {
                    color: ${theme.color.secondary};
                    font-size: 12px;
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
                      background: ${theme.color.primary};
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
            &.datepicker-box{
              border-right: none;
              padding-right: 0;
              padding-left: 10px;
              flex: 1;
              label{
                /* margin-bottom: 8px; */
              }
              .calendarv2-wrapper-div{
                .rdp-root{
                  right: 200px;
                }
              }
              .datepicker{
                background: transparent;
                border: none;
                box-shadow: none;
                padding: 0;
                width: 100%;
                font-size: 13px !important;
                color: #295086;
                font-weight: 300;
                min-height: 26px;
              }
              .calendarv2-wrapper-div{
                top: 59px;
                bottom: 0;
              }
            }
          }
          .filter-btn{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            padding-left: 8px;
            ${mediaQueries("sm")`
              position: unset;
              flex: 1;
              display: flex;
              justify-content: center;
            `}
            button{
              min-width: unset;
              background: transparent;
              border: none;
              height: 100%;
              padding: 0;
              margin: 0;
              width: 24px;
              height: 24px;
              overflow: hidden;
            }
          }
          .sitback-select2-container{
            .sitback-select-option__control {
              padding: 0;
              border-radius: 0;
              background: transparent;
              border-color: transparent;
              outline: none !important;
              box-shadow: none !important;
              min-height: auto;
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
                .sitback-select-option__indicator{
                  padding: 0;
                }
              }
            }
          }
          .sit-select-city-select-div{
            width: 100%;
            position: relative;
            .input-select-wrapper{
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              input{
                border: none;
                padding: 0;
                margin: 0;
                width: calc(100% - 20px);
                color: #295086;
                font-size: 14px;
                font-weight: 400;
                background: transparent;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 70px;
                z-index: 1;
                &:focus{
                  outline: none;
                }
                &::placeholder{
                  color: #295086;
                  font-size: 12px;
                  font-weight: 400;
                }
              }
              i{
                display: block;
                width: 20px;
                height: 20px;
                overflow: hidden;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2;
                svg{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                  path{
                    fill: hsl(0, 0%, 80%);
                  }
                  &:hover{
                    path{
                      fill: hsl(0, 0%, 60%);
                    }
                  }
                }
              }
            }
            p{
              color: #295086;
              font-size: 14px;
              font-weight: 400;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-right: 20px;

            }
            .sit-select-city-options-wrapper{
              position: absolute;
              width: 100%;
              z-index: 20;
              background-color: hsl(0, 0%, 100%);
              border-radius: 4px;
              box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
              top: 35px;
              left: 0;
              max-height: 300px;
              overflow-y: auto;
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
                padding: 0;
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
                      background: #f1f1f1;
                    }
                    &:focus{
                      background: #f1f1f1;
                    }
                  }
                }
              }
            }
          }
        }
        .filter-icon-wrapper{
          flex: 1;
          .img-wrapper{
            width: 32px;
            height: 32px;
            overflow: hidden;
            display: block;
          }

        }
      .filter-btn{
        margin-top: 18px;
        button{
          background: #295086;
          text-transform: uppercase;
          min-height: 54px;
        }

      }
    }
  }
  .sitback-landing-marketplace-mobile-div{
    display: none;
    ${mediaQueries("sm")`
      display: block;
      margin: 25px 0 35px;
    `}
    .sitback-marketplace-box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #B6C3D6;
      background: #ffffff80;
      border-radius: 20px;
      padding: 25px;
      height: 100%;
      min-height: 250px;
      ${mediaQueries("sm")`
        padding: 8px 15px;
      `}
      .sitback-market-img-div{
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 1000px;
        background: #95CCD55E;
        margin-bottom: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${mediaQueries("sm")`
          width: 70px;
          height: 70px;
        `}
        &.sitback-orange-box{
          background: #F9CBA85E;
        }
        &.sitback-green-box{
          background: #55BEA15E;
        }
        .inner-img-span{
          width: 45px;
          height: auto;
          overflow: hidden;
          ${mediaQueries("sm")`
            width: 40px;
          `}
        }
      }
      .sitback-content-div{
        h5{
          /* font-family: ${theme.font.fontFamilyPoppins}; */
          font-weight: 700;
          font-size: 18px;
          line-height: normal;
          margin-bottom: 10px;
          color: #295086;
          text-align: center;
        }
        p{
          /* font-family: ${theme.font.fontFamilyPoppins}; */
          font-weight: 300;
          font-size: 14px;
          line-height: 26px;
          letter-spacing: 0%;
          color: #29508699;
          text-align: center;
        }
      }
    }
  }
  .sitback-landing-marketplace-div{
    padding: 35px 0 35px;
    ${mediaQueries("xl")`
      padding: 30px 0 35px;
    `}
    ${mediaQueries("lg")`
      padding: 25px 0 35px;
    `}
    ${mediaQueries("sm")`
      padding: 25px 0 12px;
      display: none;
    `}
    .sitback-marketplace-box{
      display: flex;
      margin-bottom: 35px;
      .sitback-market-img-div{
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 1000px;
        background: #95CCD55E;
        margin-right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${mediaQueries("sm")`
          width: 70px;
          height: 70px;
        `}
        &.sitback-orange-box{
          background: #F9CBA85E;
        }
        &.sitback-green-box{
          background: #55BEA15E;
        }
        .inner-img-span{
          width: 45px;
          height: auto;
          overflow: hidden;
          ${mediaQueries("sm")`
            width: 40px;
          `}
        }
      }
      .sitback-content-div{
        h5{
          /* font-family: ${theme.font.fontFamilyPoppins}; */
          font-weight: 700;
          font-size: 18px;
          line-height: normal;
          margin-bottom: 10px;
          color: #295086;
          ${mediaQueries("md")`
            font-size: 17px;
          `}
          ${mediaQueries("sm")`
            font-size: 16px;
            margin-bottom: 10px;
          `}
        }
        p{
          /* font-family: ${theme.font.fontFamilyPoppins}; */
          font-weight: 300;
          font-size: 14px;
          line-height: 30px;
          letter-spacing: 0%;
          color: #29508699;
          ${mediaQueries("xl")`
            line-height: 28px;
          `}
          ${mediaQueries("lg")`
            line-height: 26px;
          `}
          ${mediaQueries("md")`
            font-size: 13px;
            line-height: 24px;
          `}
          ${mediaQueries("sm")`
            font-size: 12px;
            line-height: 20px;
          `}
        }
      }
    }
  }
  .spa-header-div{
    h3{
      color: ${theme.color.logintitlecolor};
      text-align: center;
      font-family: ${theme.font.fontFamilyPlayFair};
      font-size: 45px;
      font-weight: 800;
      line-height: 55px;
      margin-bottom: 20px;
      ${mediaQueries("xl")`
        font-size: 40px;
        line-height: 50px;
      `}
      ${mediaQueries("lg")`
        line-height: 45px;
        font-size: 35px;
      `}
      ${mediaQueries("md")`
        font-size: 30px;
        line-height: 40px;
      `}
      ${mediaQueries("sm")`
        font-size: 26px;
        line-height: 35px;
        max-width: 345px;
        margin: 0 auto 15px;
      `}
    }
    .see-othercities{
      margin-top: 0;
      a{
        background: ${theme.color.logintitlecolor};
        border-radius: 100px;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 400 !important;
        line-height: normal;
        padding: 7px 16px;
        text-decoration: none !important;
        ${mediaQueries("sm")`
          font-size: 12px;
        `}
      }
    }
  }
  .spa-title-arrow-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .spas-name-title-text{
      display: flex;
      align-items: center;
      background: #d3fdc633;
      padding: 10px;
      border-radius: 6px;
      max-width: fit-content;
      color: ${theme.color.logintitlecolor};
      font-family: ${theme.font.fontFamilyPlayFair};
      font-size: 24px !important;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 0 !important;
      ${mediaQueries("sm")`
        max-width: 100% !important;
        width: 100%;
      `}
      &.light-pink-bg-color{
        background: #ffdede33;
      }
      &.light-blue-bg-color{
        background: #b4daf233;
      }
      .title-text-image-div{
        width: 34px;
        height: auto;
        overflow: hidden;
        margin-right: 7px;
      }
    }
    .center-line {
      flex: 1;
      height: 1px;
      background-color: #E5E5E5;
      margin: 0 40px 0 30px;
      ${mediaQueries("sm")`
        display: none;
      `}
    }
    .swiper-arrows-div{
      display: flex;
      align-items: center;
      ${mediaQueries("sm")`
        display: none;
      `}
      a{
        background: #d9d9d933;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 1000px;
        margin-right: 13px;
        &.next-arrow{
          i{
            transform: rotate(180deg);
          }
          margin-right: 0;
        }
        &:hover{
          background: ${theme.color.secondary};
          i{
            svg{
              path{
                fill: ${theme.color.white};
              }
            }
          }
        }
        &.active{
          background: ${theme.color.secondary};
        }
      }
    }
  }
  .sitback-updated-slide-box-wrapper{
    border-color: #D8D8D8;
    border-radius: 16px;
    background: #FFF;
    ${mediaQueries("sm")`
      box-shadow: 0 5px 30px 0 rgba(2, 2, 2, 0.14) !important;
    `}
    .imagebox{
      height: 225px;
      padding: 5px;
      overflow: hidden;
      position: relative;
      img{
        border-radius: 12px 12px 0 0;
      }
      .crown-icon-div{
        width: 38px;
        height: 38px;
        border-radius: 1000px;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 15px;
        left: 15px;
        i{
          width: 20px;
          height: auto;
          overflow: hidden;
        }
      }
    }
    .scottsdale-detail{
      padding-left: 25px;
      padding-right: 25px;
      ${mediaQueries("sm")`
        padding-left: 12px;
        padding-right: 12px;
      `}
      h4{
        color: ${theme.color.logintitlecolor};
        font-size: 20px;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 7px;
        text-align: left;
        ${mediaQueries("sm")`
          font-size: 18px;
        `}
      }
      .sitback-spa-address-distance-text-div{
        display: flex;
        align-items: center;
        .address-image-text{
          max-width: 65%;
          ${mediaQueries("sm")`
             max-width: 55%;
          `}
          i{
            margin-right: 3px;
            ${mediaQueries("sm")`
              margin-right: 3px;
            `}
          }
        }
        .spa-distance-text{
          color: #004D87;
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          flex: 1;
          display: unset;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          overflow: unset;
          text-overflow: unset;
          text-align: right;
        }
      }
      .address-image-text{
        color: #004d87e6;
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        text-align: left;
        margin-bottom: 7px;
        i{
          margin-right: 9px;
        }
      }
      h6{
        text-align: left;
        justify-content: flex-start;
        color: ${theme.color.logintitlecolor};
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        i{
          margin-right: 6px;
          margin-top: -3px;
        }
        .review-text{
          color: #004d87e6;
          font-size: 12px;
          font-weight: 400;
          line-height: normal;
          width: unset;
          height: unset;
          margin: unset;
          margin-top: unset;
          margin-left: 10px !important;
        }
      }
      .checkbox-and-btn{
        align-items: flex-start;
        p{
          color: #004d87e6;
          font-size: 12px;
          font-weight: 400;
          line-height: normal;
          margin-bottom: 6px;
          text-align: left;
        }
        .days-slot-available-details{
          width: 100%;
          min-height: 113px;
          ul{
            width: 100%;

            li{
              width: 100%;
              &:last-child{
                margin-bottom: 20px;
              }
              a{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                margin: 0 -12px;
                &:hover{
                  border-radius: 16px;
                  background: #F2F6F9;
                }
                &.active{
                  border-radius: 16px;
                  background: #F2F6F9;
                }
                .left-display-data{
                  display: flex;
                  align-items: center;
                  span{
                    background: #4ddf74b3;
                    margin-right: 9px;
                    display: block;
                    width: 8px;
                    height: 8px;
                    border-radius: 1000px;
                    &.afternoon-circle{
                      background: #ff7e0db3;
                    }
                    &.evening-circle{
                      background: #004d87b3;
                    }
                  }
                  .day-data{
                    color: ${theme.color.logintitlecolor};
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 31px;
                    margin-bottom: 0 !important;
                  }
                }
                .slot-data{
                  color: ${theme.color.logintitlecolor};
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 31px;
                  margin-bottom: 0 !important;
                }
              }

            }
          }
        }
        .avg-response-time-div{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height:15px;
          p{
            color: #004d87e6;
            font-size: 10px;
            font-weight: 400;
            line-height: normal;
            margin-bottom: 4px;
            min-height: unset;
          }
        }
        .book-now-btn{
          border-radius: 100px;
          background: #F2F6F9;
          color: ${theme.color.logintitlecolor};
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          min-height: 46px;
          border: none;
          text-transform: capitalize;
          &.search-btn{
            background: ${theme.color.logintitlecolor};
            color: ${theme.color.white};
            &:hover{
              background: ${theme.color.white};
              color: ${theme.color.logintitlecolor};
            }
          }
          &:hover{
            background: ${theme.color.logintitlecolor};
            color: ${theme.color.white};
          }
        }
      }
    }
  }
  .spa-detail-border-div{
    border: 1px solid #E5E5E5;
    width: 100%;
    &.spa-border-mobile-view{
      display: none;
      ${mediaQueries("sm")`
        display: block;
      `}
    }
    &.spa-border-desktop-view{
      ${mediaQueries("sm")`
        display: none;
      `}
    }
  }
`;
export const BusinessRevampUpdatedWrapper = styled.div`
  padding-bottom: 50px;
  .container-fluid{
    max-width: 1410px;
  }
  .business-main-wrapper{
    .business-header-div{
      margin-bottom: 50px;
      h3{
        color: ${theme.color.logintitlecolor};
        text-align: center;
        font-family: ${theme.font.fontFamilyPlayFair};
        margin-bottom: 18px;
        font-size: 45px;
        font-weight: 800;
        line-height: 55px;
        ${mediaQueries("xl")`
          font-size: 40px;
          line-height: 50px;
        `}
        ${mediaQueries("lg")`
          line-height: 45px;
          font-size: 35px;
        `}
        ${mediaQueries("md")`
          font-size: 30px;
          line-height: 40px;
        `}
        ${mediaQueries("sm")`
          font-size: 26px;
          line-height: 35px;
          margin-bottom: 8px;
        `}
      }
      p{
        color: ${theme.color.logintitlecolor};
        text-align: center;
        font-size: 22px;
        font-weight: 400;
        line-height: 27px;
        ${mediaQueries("xl")`
          font-size: 20px;
          line-height: 25px;
        `}
        ${mediaQueries("lg")`
          line-height: 18px;
          font-size: 23px;
        `}
        ${mediaQueries("md")`
          font-size: 16px;
          line-height: 21px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
          line-height: 25px;
        `}
      }
    }
    .three-panel-layout {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 24px;
      padding: 0 0 40px;
      position: relative;
      flex-wrap: wrap;
      ${mediaQueries("sm")`
        display: none;
      `}
      .panel {
        background-color: white;
        /* border-radius: 20px; */
        overflow: hidden;
        flex: 0 1 30%;
        min-width: 400px;
        height: 385px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          /* border-radius: 20px; */
        }
        &.panel-center {
          /* transform: translateY(40px); */
          z-index: 2;
          /* min-width: 380px;
          max-width: 380px; */
          img{
            transform: scale(0.9);
            ${mediaQueries("xl")`
              transform: scale(1);
            `}
          }
        }
      }
    }
    .business-owner-mobile-view{
      display: none;
      ${mediaQueries("sm")`
        display: block;
        margin-bottom: 25px;
      `}
      .swiper{
        .swiper-wrapper{
          .swiper-slide{
            .slide-image-div{
              height: 160px;
              overflow: hidden;
              border-radius: 12px;
              img{
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: top;
              }
            }
          }
        }
      }
    }
    .learn-more-btn-div{
      display: flex;
      justify-content: center;
      align-items: center;
      button{
        border-radius: 100px;
        background: #004D87;
        max-width: 165px;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        ${mediaQueries("sm")`
          max-width: 130px;
        `}
      }
    }
  }
`;
export const ScottsdaleBoxWrapper = styled.div`
  background: ${theme.color.white};
  border: 1px solid #EAEBEC;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: calc(100% - 18px);
  margin-bottom: 18px;
  min-height: 444px;
  display: flex;
  flex-direction: column;
  ${mediaQueries("md")`
    min-height: 350px;
  `}
  ${mediaQueries("sm")`
    min-height: 320px;
  `}
  .imagebox{
    width: 100%;
    height: 220px;
    overflow: hidden;
    cursor: pointer;
    ${mediaQueries("lg")`
      height: 200px;
    `}
    /* ${mediaQueries("md")`
      height: 180px;
    `} */
    .react-loading-skeleton {
       height: 100%;
    }
  }
  .scottsdale-detail{
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-height: 195px;
    ${mediaQueries("sm")`
      min-height: 150px;
    `}
    h4{
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 1px;
      color: #295086;
      text-align: center;
      margin-bottom: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      ${mediaQueries("lg")`
        font-size: 16px;
      `}
      ${mediaQueries("md")`
        font-size: 15px;
        line-height: 25px;
      `}
      ${mediaQueries("sm")`
        font-size: 14px;
        line-height: normal;
      `}
    }
    p{
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 1px;
      color: rgba(41, 80, 134, 0.6);
      text-align: center;
      margin-bottom: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      ${mediaQueries("md")`
        font-size: 15px;
         line-height: normal;
      `}
      ${mediaQueries("sm")`
        font-size: 14px;
      `}
    }
    h6{
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      //line-height: 21px;
      letter-spacing: 1px;
      color: #295086;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      min-height: 18px;
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
    button{
      padding: 13px;
      background: ${theme.color.white};
      border-color: #295085;
      box-shadow: none;
      color: #295085;
      font-size: 14px;
      text-transform: uppercase;
    }
    .checkbox-and-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-height:96px;
      ${mediaQueries("sm")`
        min-height: auto;
      `}
      p {
        margin-bottom:10px;
        min-height:24px;
      }
      h5{
          font-style: normal;
          font-weight: 800;
          font-size: 14px;
          line-height: normal;
          letter-spacing: 1px;
          text-decoration-line: underline;
          color: #295086;
          margin-top:10px;
          cursor: pointer;
          min-height:16px;
        }
      .checkbox-list-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: -3px;
        min-height:42px;
        width: 100%;
        .checkbox-wrapper-div{
          display: block;
          position: relative;
          cursor: unset;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 3px;
          flex: 30%;
          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            &:checked ~ .checkmark {
              background-color: #BAD9D5;
              border-color: #EAEBEC;
            }
            &:disabled ~ .checkmark{
              background-color: #f3f3f3;
              border: 1px solid #f3f3f3;
              color: #a3afbe;
              cursor: not-allowed;
            }
          }
          .checkmark {
            height: 100%;
            width: 100%;
            background-color: #BAD9D5;
            border: 1px solid #BAD9D5;
            border-radius: 6px;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: normal;
            text-align: center;
            letter-spacing: 1px;
            color: #295086;
            padding: 6px;
            min-height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &.slot-checkbox-wrapper{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .available-text{
                font-size: 9px;
                font-weight: 400;
                line-height: 16px;
                ${mediaQueries("xxl")`
                  font-size: 8px;
                `}
              }
            }
          }
        }
        h5{
          font-style: normal;
          font-weight: 800;
          font-size: 14px;
          line-height: normal;
          letter-spacing: 1px;
          text-decoration-line: underline;
          color: #295086;
        }
      }
    }
  }
  &.swiper-loader{
    .imagebox{
      padding:10px;
      .react-loading-skeleton {
        height: 100%;
      }
    }
    .scottsdale-detail {
      .react-loading-skeleton {
        height: 20px;
        margin-bottom: 10px;
      }

    }
  }
  &.spa-loader-animation{
    .imagebox{
      height: 240px;
    }
  }
  &.spas-detailbox{
    box-shadow: 2px 5px 36px -6px #0202021a;
    flex-direction: unset;
    min-height: 350px;
    ${mediaQueries("md")`
      flex-direction: column;
    `}
    ${mediaQueries("sm")`
      box-shadow: none;
      border: none;
      border-bottom: 1px solid #D9D9D9;
      border-radius: 0;
      padding-bottom: 16px;
    `}
    .imagebox{
      width: 320px;
      height: 100%;
      ${mediaQueries("xl")`
        width: 280px;
      `}
      ${mediaQueries("lg")`
        width: 260px;
      `}
      ${mediaQueries("md")`
        width: 100%;
        height: 200px;
      `}
      ${mediaQueries("sm")`
        width: 100%;
        border-radius: 8px;
      `}
      &.spa-image-box-desktop-view{
        ${mediaQueries("sm")`
          display: none;
        `}
      }
    }
    .spa-slider-image-mobile-view{
      display: none;
      ${mediaQueries("sm")`
        display: flex;
      `}
      .swiper{
        .swiper-wrapper{
          .swiper-slide{
            .gallery-image-box-wrapper{
              width: 100%;
              height: 200px;
              overflow: hidden;
              border-radius: 8px;
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
    }
    .scottsdale-detail{
      min-height: auto;
      ${mediaQueries("sm")`
        padding: 15px 0;
      `}
      .scottsdale-header-wrapper{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        ${mediaQueries("sm")`
          flex-direction: column;
        `}
        .title-text{
          margin-right: 12px;
          flex: 1;
          ${mediaQueries("sm")`
            margin-right: 0px;
            width: 100%;
          `}
          h4{
            text-align: start;
            margin: 0;
            margin-top: 0px;
            margin-bottom: 10px;
            font-style: normal;
            font-weight: 800;
            font-size: 30px;
            line-height: 45px;
            letter-spacing: 1px;
            color: #295086;
            ${mediaQueries("xxl")`
              font-size: 24px;
              line-height: 40px;
            `}
            ${mediaQueries("xl")`
              font-size: 24px;
              line-height: 35px;
            `}
            ${mediaQueries("lg")`
              font-size: 24px;
              line-height: 32px;
            `}
            ${mediaQueries("md")`
              font-size: 22px;
              line-height: 32px;
            `}
          }
          .location-text{
            display: flex;
            align-items: flex-start;
            ${mediaQueries("sm")`
               align-items: center;
            `}
            i{
              width: 21px;
              height: 21px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 6px;
              margin-top: 2px;
              svg{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            p{
              text-align: start;
              margin: 0;
              -webkit-line-clamp: unset;
              &.spa-location-web-view {
                 display: flex;
                 ${mediaQueries("sm")`
                   display:none;
                `}
              }
              &.spa-location-mobile-view {
                 display: none;
                 ${mediaQueries("sm")`
                   display:flex;
                `}
              }
            }
          }
          .mobile-view-rating-block{
            ${mediaQueries("sm")`
              margin-top: 9px;
            `}
            h4{
              ${mediaQueries("sm")`
                margin: 0;
                flex: 1;
              `}
            }
            ${mediaQueries("sm")`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
            h6{
              display: none;
              ${mediaQueries("sm")`
                display: flex;
                margin: 0;
                width: 150px;
              `}
            }
          }
        }
        .checkbox-and-btn {
          min-height: unset;
          width: 270px;
          .checkbox-list-wrapper{
            flex-wrap: unset;
          }
        }
      }
      h6{
        justify-content: flex-start;
        margin-bottom: 6px;
        ${mediaQueries("sm")`
           display: none;
        `}
      }
      h2{
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 1px;
        color: rgba(41, 80, 134, 0.6);
        text-align: start;
        margin-bottom: 6px;
      }
      .availble-services-wrapper{
        h3{
          font-weight: 600;
          font-size: 16px;
          line-height: 28.5px;
          letter-spacing: 1px;
          color: #295086;
        }
        .booknow-and-btn-wrapper{
          display: flex;
          align-items: center;
          /* flex-wrap: wrap; */
          width: 100%;
          ${mediaQueries("sm")`
            display: none;
          `}
          .services-block{
            display:flex;
            align-items: center;
            flex-wrap: wrap;
            flex: 1;
            margin: -6px;
            ${mediaQueries("sm")`
             display: none;
            `}
            ${mediaQueries("xs")`
              margin-bottom: 9px;
            `}
            button{
              font-weight: 600;
              font-size: 14px;
              line-height: 24px;
              letter-spacing: 1px;
              -webkit-text-decoration: underline;
              text-decoration: underline;
              color: #295086;
              padding: 0;
              border: none;
              padding: 0;
              outline: none;
              box-shadow: none;
              /* margin-right: 12px; */
              min-width: 80px;
              /* margin-bottom: 12px; */
            }
            .grid-col{
              padding: 6px;
              ${mediaQueries("xs")`
                flex: 0 0 25%;
              `}
              &.flex1mobile{
                ${mediaQueries("xs")`
                  flex: 1;
                  display: flex;
                  justify-content: flex-end;
                `}
              }
            }
            .box-wrapper{
              border: 1px solid #EAEBEC;
              border-radius: 6px;
              padding: 9px;
              width: auto;
              height: auto;
              ${mediaQueries("xs")`
                width: 100%;
                padding: 4px;
                height: auto;
              `}
              ${mediaQueries("xxs")`
                width: 63px;
              `}
              ${mediaQueries("xxxs")`
                width: 55px;
              `}
              .iconbox{
                width: 50px;
                height: 35px;
                margin: auto;
                ${mediaQueries("xs")`
                  width: 35px;
                  height: 30px;
                `}
              }
              p{
                font-weight: 500;
                font-size: 10px;
                letter-spacing: 1px;
                line-height: 13px;
                text-align: center;
                margin: 0;
                margin-top: 8px;
                -webkit-line-clamp: 1;
                color: #295086;
                max-width: 80px;
                word-wrap: break-word;
                ${mediaQueries("xs")`
                  -webkit-line-clamp: 1;
                  max-width: 100%;
                `}
              }
            }
          }
          .booknow{
            width: auto;
            min-width: 110px !important;
            background: #295085;
            color: white !important;
            text-transform: unset;
            text-decoration: unset !important;
            font-weight: 400 !important;
            padding: 12px 12px !important;
            /* margin-bottom: 12px; */
          }
        }
        .mobile-view-services-block{
          overflow: hidden;
          display: none;
          ${mediaQueries("sm")`
            display: flex;
            flex-direction: column;
          `}
          .swiper {
            height: 80px;

            .swiper-wrapper {
              align-items: stretch;
              height: 100%;

              .swiper-slide {
                height: 100%;
                width: 160px !important;

                .box-wrapper {
                  height: 100%;
                }
              }
            }
          }
          .box-wrapper{
            border: 1px solid #EAEBEC;
            border-radius: 6px;
            padding: 9px;
            width: 100%;
            height: 100%;
            min-height: 70px;
            ${mediaQueries("sm")`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
            ${mediaQueries("xs")`
              width: 100%;
              padding: 4px;
            `}
            .iconbox{
              width: 50px;
              height: 35px;
              margin: auto;
              ${mediaQueries("sm")`
                width: 55px;
                height: 38px;
                margin-right: 8px;
              `}
            }
            p{
              font-weight: 500;
              font-size: 12px;
              letter-spacing: 1px;
              line-height: 13px;
              text-align: left;
              margin: 0;
              margin-top: 8px;
              /* -webkit-line-clamp: 2; */
              color: #295086;
              max-width: 80px;
              word-break: break-word;
              ${mediaQueries("sm")`
                -webkit-line-clamp: 4;
                max-width: 100%;
              `}
              &.service-name-text{
                -webkit-line-clamp: 2;
                min-height: 27px;
              }
            }
          }
          .services-slider{
            margin: 6px 0 20px;
            /* padding-bottom: 25px; */
            .swiper{
              overflow: visible;
              .swiper-pagination{
                bottom: -35px;
                .swiper-pagination-bullet{
                  background: #295086;
                  &.swiper-pagination-bullet-active{
                    width: 12px;
                    border-radius: 9px;
                  }
                }
              }
            }
          }
          .booknow{
            width: auto;
            min-width: 300px !important;
            background: #295085;
            color: white !important;
            text-transform: unset;
            text-decoration: unset !important;
            font-weight: 600 !important;
            padding: 15px 12px !important;
            font-size: 14px ! important;
            ${mediaQueries("xs")`
              min-width: 100% !important;
            `}
          }
        }
      }
      .checkbox-and-btn{
        .checkbox-list-wrapper{
          .checkbox-wrapper-div{
            .checkmark{
              background-color: #95CCD5;
              border-color: #EAEBEC;
              color: white;
              min-height: 45px;
            }
          }
          input:disabled ~ .checkmark {
            background-color: #f3f3f3;
            border-color: #f3f3f3;
            color: #a3afbe;
            cursor: not-allowed;
          }
        }
        &.web-view-checkbox-and-btn{
          ${mediaQueries("sm")`
            display: none;
          `}
        }
        &.mobile-view-checkbox-and-btn{
          display: none;
          ${mediaQueries("sm")`
            display: flex;
            min-height: auto;
            align-items: flex-start;
            margin: 15px 0;
          `}
        }
      }
    }
    &.spa-updated-detail-box{
      border-radius: 16px;
      border: 1px solid #D8D8D8;
      background: #FFF;
      flex-direction: column;
      .imagebox{
        padding: 10px;
        width: 100%;
        height: 225px;
        position: relative;
        img{
          border-radius: 12px 12px 0 0;
        }
        .crown-icon-div{
          width: 38px;
          height: 38px;
          border-radius: 1000px;
          background: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 15px;
          left: 15px;
          i{
            width: 20px;
            height: auto;
            overflow: hidden;
          }
        }
      }
      .spa-slider-image-mobile-view{
        padding: 7px 7px 0 7px;
        .gallery-image-box-wrapper{
          border-radius: 12px 12px 0 0 !important;
          height: 175px !important;
          position: relative;
          .crown-icon-div{
            width: 38px;
            height: 38px;
            border-radius: 1000px;
            background: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 15px;
            left: 15px;
            i{
              width: 20px;
              height: auto;
              overflow: hidden;
            }
          }
        }
      }
      .rating-mobile-view-display{
        position: absolute;
        border-radius: 100px;
        background: #FFF;
        display: none;
        align-items: center;
        bottom: 15px;
        right: 10px;
        padding: 5px;
        ${mediaQueries("sm")`
          display: flex;
        `}
        i{
          width: 16px;
          height: auto;
          margin-right: 5px;
        }
        color: ${theme.color.logintitlecolor};
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
        .review-text{
          color: ${theme.color.logintitlecolor};
          font-size: 12px;
          font-weight: 400;
          line-height: normal;
          width: 100%;
          margin-left: 4px;
        }
      }
      .scottsdale-detail{
        padding: 12px 20px 20px;
        .scottsdale-header-wrapper{
          .book-now-btn-wrapper{
            width: auto;
            min-width: 130px !important;
            background: ${theme.color.logintitlecolor};;
            color: white !important;
            text-transform: unset;
            text-decoration: unset !important;
            font-weight: 400 !important;
            padding: 12px 12px !important;
            border-radius: 100px;
            min-height: 46px;
            ${mediaQueries("sm")`
              display: none;
            `}
          }
          .title-text{
            .mobile-view-rating-block{
              .spa-title-distance-text{
                display: flex;
                align-items: center;
                h4{
                  color: ${theme.color.logintitlecolor};
                  font-size: 20px;
                  font-weight: 600;
                  line-height: normal;
                  max-width: 76%;
                  ${mediaQueries("lg")`
                    font-size: 19px;
                  `}
                  ${mediaQueries("sm")`
                    font-size: 18px;
                    margin-bottom: 6px;
                    max-width: 100%;
                  `}
                }
                p{
                  color: ${theme.color.logintitlecolor};
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  margin-left: 12px;
                  display: unset;
                  -webkit-line-clamp: unset;
                  -webkit-box-orient: unset;
                  overflow: unset;
                  text-overflow: unset;
                  ${mediaQueries("sm")`
                    display: none;
                  `}
                }
              }
            }
            .location-text{
              ${mediaQueries("sm")`
                justify-content: space-between;
              `}
              .location-icon-detail-text{
                display: flex;
                align-items: center;
              }
              i{
                margin-right: 16px;
                width: 10px;
                height: auto;
              }
              .spa-location-web-view{
                color: ${theme.color.logintitlecolor};
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 200px;
              }
              .distance-mobile-text{
                display: none;
                color: ${theme.color.logintitlecolor};
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
                margin-left: 12px;
                ${mediaQueries("sm")`
                  display: block;
                `}
              }
              .rating-detail-text{
                display: flex;
                align-items: center;
                ${mediaQueries("sm")`
                  display: none;
                `}
                i{
                  width: 25px;
                  height: auto;
                  margin-right: 8px;
                  margin-top: -2px;
                }
                color: ${theme.color.logintitlecolor};
                font-size: 14px;
                font-weight: 600;
                line-height: normal;
                .review-text{
                  color: ${theme.color.logintitlecolor};
                  font-size: 12px;
                  font-weight: 400;
                  line-height: normal;
                  width: 100%;
                  margin-left: 8px;
                }
              }
            }
          }
        }
        .availble-services-wrapper{
          .service-title-div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
            h3{
              color: #004d87e6;
              font-size: 12px;
              margin-bottom: 14px;
              font-weight: 600;
              line-height: normal;
              margin-bottom: 0;
            }
            .plus-more-btn{
              color: #004D87;
              font-size: 12px;
              font-weight: 500;
              line-height: normal;
              text-decoration: underline !important;
              background: transparent;
              padding: 0;
              border: none;
            }
          }
          .mobile-view-services-block{
            .booknow-btn-mobile-view{
              width: 100%;
            }
            .services-slider{
              margin-bottom: 16px;
              .swiper{
                height: unset;
                .swiper-wrapper{
                  .swiper-slide{
                    min-width: fit-content !important;
                    width: unset !important;
                    .box-wrapper{
                      display: flex;
                      align-items: center;
                      background: #f2f6f9b3;
                      border-radius: 45px;
                      padding: 2px 10px;
                      justify-content: space-between;
                      min-height: 50px;
                      max-height: 50px;
                      .mobile-service-div{
                        display: flex;
                        align-items: center;
                        p{
                          margin-top: 0;
                        }
                        .service-name-text{
                          min-height: unset;
                          margin-right: 8px;
                          margin-top: 0;
                        }
                      }
                      .service-image-text-div{
                        display: flex;
                        align-items: center;
                        margin-right: 15px;
                        .iconbox{
                          width: 30px;
                          height: auto;
                          margin-right: 7px;
                          margin-left: 0;
                          margin-top: 0;
                          margin-bottom: 0;

                        }
                        .service-name{
                          color: ${theme.color.secondary};
                          font-size: 12px;
                          font-weight: 400;
                          line-height: 14px;
                          margin-top: 0;
                          -webkit-line-clamp: 1;
                        }
                      }
                      .service-price{
                        color: ${theme.color.secondary};;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: normal;
                        margin-top: 0;
                      }
                    }
                  }
                }
              }
            }
          }
          .booknow-and-btn-wrapper{
            .services-block{
              .grid-col{
                max-width: 33.33%;
                flex-basis: 33.33%;
                .box-wrapper{
                  display: flex;
                  align-items: center;
                  background: #f2f6f9b3;
                  border-radius: 45px;
                  padding: 2px 10px;
                  justify-content: space-between;
                  .service-image-text-div{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    .iconbox{
                      width: 30px;
                      height: auto;
                      margin-right: 7px;
                      margin-left: 0;
                      margin-top: 0;
                      margin-bottom: 0;

                    }
                    .service-name{
                      color: ${theme.color.secondary};
                      font-size: 12px;
                      font-weight: 400;
                      line-height: 14px;
                      margin-top: 0;
                      -webkit-line-clamp: 1;
                      text-align: left;
                      max-width: 90px;
                    }
                  }
                  .service-price{
                    color: ${theme.color.secondary};;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: normal;
                    margin-top: 0;
                  }
                }
              }
            }
          }
        }
      }
      .days-slot-available-details{
          width: 100%;
          min-height: 113px;
          ${mediaQueries("sm")`
            min-height: unset;
          `}
          ul{
            width: 100%;

            li{
              width: 100%;
              &:last-child{
                margin-bottom: 20px;
              }
              a{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 12px;
                margin: 0 -12px;
                &:hover{
                  border-radius: 16px;
                  background: #F2F6F9;
                }
                &.active{
                  border-radius: 16px;
                  background: #F2F6F9;
                }
                .left-display-data{
                  display: flex;
                  align-items: center;
                  span{
                    background: #4ddf74b3;
                    margin-right: 9px;
                    display: block;
                    width: 8px;
                    height: 8px;
                    border-radius: 1000px;
                    &.afternoon-circle{
                      background: #ff7e0db3;
                    }
                    &.evening-circle{
                      background: #004d87b3;
                    }
                  }
                  .day-data{
                    color: ${theme.color.logintitlecolor};
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 31px;
                    margin-bottom: 0 !important;
                  }
                }
                .slot-data{
                  color: ${theme.color.logintitlecolor};
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 31px;
                  margin-bottom: 0 !important;
                }
              }

            }
          }
        }
    }
  }
`;
export const ForBusinessDetailDiv = styled.div`
  padding: 55px 0 70px;
  ${mediaQueries("sm")`
    padding: 30px 0 40px;
  `}
  &.about-us-page-updated-div{
    padding: 50px 0 90px;
      ${mediaQueries("xl")`
        padding: 50px 0 90px;
      `}
      ${mediaQueries("lg")`
        padding: 50px 0 90px;
      `}
      ${mediaQueries("md")`
        padding: 50px 0;
      `}
      ${mediaQueries("sm")`
        padding: 30px 0 40px;
      `}
  }
  .container-fluid{
    max-width: 1410px;
  }
  ${mediaQueries("xl")`
   padding: 70px 0 60px;
  `}
  ${mediaQueries("lg")`
    padding: 60px 0 50px;
  `}
  ${mediaQueries("md")`
    padding: 50px 0;
  `}
  ${mediaQueries("sm")`
    padding: 30px 0 40px;
  `}
  .for-business-main-div{
    .business-booking-revenue-wrapper{
      margin-bottom: 50px;
      ${mediaQueries("xl")`
        margin-bottom: 45px;
      `}
      ${mediaQueries("lg")`
        margin-bottom: 40px;
      `}
      ${mediaQueries("md")`
        margin-bottom: 35px;
      `}
      ${mediaQueries("sm")`
        margin-bottom: 25px;
      `}
      .business-booking-revenue-inner-div{
        display: flex;
        align-items: center;
        margin: 0 -20px;
        ${mediaQueries("xl")`
          margin: 0 -18px;
        `}
        ${mediaQueries("lg")`
          margin: 0 -14px;
        `}
        ${mediaQueries("md")`
          margin: 0 -10px;
        `}
        ${mediaQueries("sm")`
          margin: 0 -6px;
        `}
        .business-box-div{
          padding: 0 20px;
          max-width: 50%;
          flex-basis: 50%;
          ${mediaQueries("xl")`
            padding: 0 18px;
          `}
          ${mediaQueries("lg")`
            padding: 0 14px;
          `}
          ${mediaQueries("md")`
            padding: 0 10px;
          `}
          ${mediaQueries("sm")`
            padding: 0 6px;
          `}
          .box-inner-div{
            border-radius: 20px;
            border: 1px solid rgba(231, 235, 240, 0.60);
            background: #F5FBFF;
            padding: 25px 30px;
            display: flex;
            align-items: center;
            ${mediaQueries("xl")`
              padding: 22px 25px;
            `}
            ${mediaQueries("lg")`
              padding: 18px 20px;
            `}
            ${mediaQueries("md")`
              padding: 12px 15px;
              flex-direction: column;
              min-height: 180px;
              justify-content: center;
            `}
            ${mediaQueries("sm")`
              padding: 12px;
            `}
            .business-img-div{
              width: 150px;
              height: 150px;
              overflow: hidden;
              margin-right: 75px;
              ${mediaQueries("xl")`
                width: 125px;
                height: 125px;
                margin-right: 55px;
              `}
              ${mediaQueries("lg")`
                width: 110px;
                height: 110px;
                margin-right: 35px;
              `}
              ${mediaQueries("md")`
                width: 90px;
                height: 90px;
                margin-right: 0;
                margin-bottom: 12px;
              `}
              ${mediaQueries("sm")`
                width: 75px;
                height: 75px;
              `}
            }
            .business-detail-div{
              h3{
                color: #004D87;
                font-size: 45px;
                font-weight: 700;
                line-height: normal;
                margin-bottom: 4px;
                ${mediaQueries("xl")`
                  font-size: 40px;
                `}
                ${mediaQueries("lg")`
                  font-size: 35px;
                `}
                ${mediaQueries("md")`
                  font-size: 30px;
                  text-align: center;
                `}
                ${mediaQueries("sm")`
                  font-size: 25px;
                `}
              }
              p{
                color: #004D87;
                font-size: 24px;
                font-weight: 400;
                line-height: normal;
                ${mediaQueries("xl")`
                  font-size: 22px;
                `}
                ${mediaQueries("lg")`
                  font-size: 20px;
                `}
                ${mediaQueries("md")`
                  font-size: 18px;
                  text-align: center;
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
    .business-content-div{
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      ${mediaQueries("md")`
        flex-direction: column-reverse;
      `}
      &:nth-child(2n){
        ${mediaQueries("md")`
          flex-direction: column;
        `}
      }
      &:last-child{
        margin-bottom: 0;
      }
      .business-image-div{
        width: 50%;
        height: 450px;
        overflow: hidden;
        ${mediaQueries("xl")`
          height: 500px;
        `}
        ${mediaQueries("lg")`
          height: 420px;
        `}
        ${mediaQueries("md")`
          height: 360px;
          width: 100%;
          margin-bottom: 25px;
        `}
        ${mediaQueries("sm")`
          height: 235px;
        `}
        .img-div{
          width: 100%;
          height: 100%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }

      }
      .business-detail-div{
        flex: 1;
        padding: 0 50px;
        ${mediaQueries("xl")`
          padding: 0 40px;
        `}
        ${mediaQueries("lg")`
          padding: 0 30px;
        `}
        ${mediaQueries("md")`
          padding: 0 20px;
        `}
        ${mediaQueries("sm")`
          padding: 0;
        `}
        .business-detail-inner-div{
          h3{
            color: ${theme.color.logintitlecolor};
            font-size: 34px;
            margin-bottom: 30px;
            font-weight: 600;
            line-height: normal;
            ${mediaQueries("xl")`
              font-size: 30px;
            `}
            ${mediaQueries("lg")`
              font-size: 28px;
            `}
            ${mediaQueries("md")`
              font-size: 24px;
            `}
            ${mediaQueries("sm")`
              font-size: 22px;
            `}
            &.about-us-page-title-text{
              margin-bottom: 15px;
            }
          }
          .para-text-div{
            max-width: 535px;
            p{
              color: #004d87e6;
              font-size: 16px;
              font-weight: 300;
              line-height: 30px;
              margin-bottom: 15px;
              ${mediaQueries("md")`
                font-size: 15px;
                line-height: 29px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                margin-bottom: 10px;
                line-height: 27px;
              `}
              &:last-child{
                margin-bottom: 0;
              }
            }
          }

        }
        .login-btn-div{
          display: flex;
          align-items: center;
          margin-top: 35px;
          .login-btn{
            border-radius: 100px;
            background: #004D87;
            box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
            max-width: 215px;
            color: #FFF;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            border: none;
            min-height: 47px;
            margin-right: 8px;
            &.book-appointment-btn{
              max-width: 220px;
              /* display: none; */
              ${mediaQueries("sm")`
                display: none;
                justify-content: center;
                align-items: center;
              `}
            }
          }
          .desktop-view-btn{
            ${mediaQueries("sm")`
              display: none;
            `}
          }
          .req-more-btn{
            border-radius: 100px;
            background: #FFF;
            box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
            color: #004D87;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            min-height: 47px;
            max-width: 215px;
          }
        }
        .login-mobile-view-btn-div{
          display: none;
          justify-content: center;
          align-items: center;
          ${mediaQueries("sm")`
            display: block;
          `}
            .login-btn{
              border-radius: 100px;
              background: #004D87;
              box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
              max-width: 100%;
              color: #FFF;
              text-align: center;
              font-size: 14px;
              font-weight: 400;
              line-height: normal;
              border: none;
              min-height: 47px;
              margin-right: 8px;
              display: none;
              &.book-appointment-btn{
                min-width: 100%;
                /* display: none; */
                ${mediaQueries("sm")`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              }
              &.req-more-info{
                background: #FFF;
                box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
                color: #004D87;
                border-radius: 100px;
                border: 1px solid #004D87;
                box-shadow: 0 -1px 4px 2px rgba(255, 255, 255, 0.25);
                margin: 12px 0;
              }
            }
          }
      }
    }
  }
`;
export const SpasNearLayoutWrapper = styled.div`
  padding: 60px 0;
  background-color: #ffffff;
  overflow: hidden;
  &.sitback-services-layout-update-wrapper{
    .container-fluid{
      max-width: 1410px;
    }
    padding: 60px 0 30px;
  }
  .spas-page-header-title-div{
      margin-bottom: 50px;
      h3{
        font-family: ${theme.font.fontFamilyPlayFair};
        font-weight: 800;
        font-size: 45px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        margin-bottom: 20px;
        ${mediaQueries("xxl")`
          font-size: 42px;
        `}
        ${mediaQueries("xl")`
          font-size: 39px;
        `}
        ${mediaQueries("lg")`
          font-size: 36px;
        `}
        ${mediaQueries("md")`
          font-size: 33px;
        `}
        ${mediaQueries("sm")`
          font-size: 30px;
        `}
        ${mediaQueries("xs")`
          font-size: 27px;
        `}
      }
      p{
        font-family: ${theme.font.fontFamilyPoppins};
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 21px;
        `}
        ${mediaQueries("xl")`
          font-size: 20px;
        `}
        ${mediaQueries("lg")`
          font-size: 19px;
        `}
        ${mediaQueries("md")`
          font-size: 18px;
        `}
        ${mediaQueries("sm")`
          font-size: 17px;
        `}
        ${mediaQueries("xs")`
          font-size: 16px;
        `}
      }
    }
  ${mediaQueries("md")`
    padding: 40px 0 60px;
  `}
  &.spa-updated-near-layout{
    padding-top: 0;
  }
  &.spa-padding-container{

    ${mediaQueries("xxl")`
      padding: 60px 60px;
    `}
    ${mediaQueries("xl")`
      padding: 40px 0 60px;
    `}
  }
  &.how-it-work-video-main-div{
    margin-top: -100px;
    .video-banner-wrapper{
      border-radius: 35px;
      /* height: 596px; */
      width: calc(100% - 40px);
      margin: auto;
      ${mediaQueries("sm")`
        height: 250px;
        width: calc(100% - 20px);
      `}
      video{
        ${mediaQueries("sm")`
          object-fit: cover;
        `}
      }
    }
  }
  .our-blogs-header{
    margin-bottom: 50px;

    ${mediaQueries("md")`
      margin-bottom: 30px;
    `}
    ${mediaQueries("sm")`
      margin-bottom: 15px;
    `}
    h2{
      margin-bottom: 9px;
      ${mediaQueries("md")`
        margin-bottom: 0px;
      `}
    }
    .sub-pera-text{
      max-width:1070px;
      width: 100%;
      margin: auto;
      text-align:center;
      font-family: ${theme.font.fontFamilyOpenSans};
      /* font-size: 18px;
      font-weight: 300;
      line-height: 25px;
      color: #4D6B93; */
      margin-bottom: 30px;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      color: #29508699;
      ${mediaQueries("xl")`
        font-size: 22px;
        line-height: 27px;
      `}
      ${mediaQueries("lg")`
        font-size: 20px;
        line-height: 27px;
      `}
      ${mediaQueries("md")`
        font-size: 18px;
        line-height: 27px;
      `}
    }
    .gobackbtn{
      width: 100%;
      padding: 18px 15px;
      max-width: 250px;
      background: ${theme.color.secondary};
      border-color: ${theme.color.secondary};
      color: #D7D7D7;
    }
    /* h2{
      font-weight: 900;
      font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
      font-style: normal;
      -webkit-text-stroke: 3px #295085;
    } */
  }
  .row{
    margin: 0 -8px;
    .col-lg-3, .col-md-4, .col-sm-3, .col-12{
      padding: 0 8px;
    }
  }
  .pagination-footer-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 12px;
        button{
            width: 30px;
            height: 30px;
            outline: none;
            box-shadow: none;
            padding: 0;
            margin: 0;
            border: none;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 55px;
            margin: 0 10px;
            svg{
                width: 21px;
                height: 21px;
                display: block;
            }
        }
        .input-wrapper{
            display: flex;
            align-items: center;
            input{
                padding: 6px;
                width: 40px;
                min-width: auto;
                text-align: center;
                max-width: unset;
                outline: none;
                box-shadow: none;
                border: none;
                border: 1px solid #95ccd5;
                border-radius: 6px;
                color: #95CCD5;
                font-weight: 600;
                font-size: 18px;
                line-height: normal;
                min-height: 50px;
            }
            span{
                margin-left: 10px;
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: normal;
                letter-spacing: 0.005em;
                color: rgba(41, 80, 134, 0.6);
            }
        }
    .pagination{
      margin-top: 48px;
      li{
        border: none;
        margin: 0 6px;
        &.previous{
          display: none;
        }
        &.next{
          display: none;
        }
        a{
          padding: 10px;
          color: ${theme.color.secondary} !important;
          font-size: 13px;
          font-weight: 500;
          line-height: normal;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          border: 1px solid #F1F1F1;
          background: #FFF;
        }
        &.active{
          a{
            color: ${theme.color.white} !important;
            background: ${theme.color.secondary} !important;
          }
        }
      }
    }
  }
  .grid-row{
    margin: 0 -8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &.service-page-updated-grid-wrapper{
        .grid-cols{
          flex: 0 0 274px;
          ${mediaQueries("sm")`
            flex: 0 0 184px;
          `}
          .service-updated-box{
            border-radius: 8px;
            border: 1px solid #EAEBEC;
            background: #FFF;
            cursor: pointer;
            &:hover{
              box-shadow: none;
              /* cursor: unset; */
            }
            .services-icon{
              width: 80px;
              height: 80px;
              margin-bottom: 50px;
              cursor: pointer;
              ${mediaQueries("sm")`
                margin-bottom: 40px;
              `}
            }
            p{
              color: ${theme.color.secondary};
              text-align: center;
              font-size: 16px;
              font-weight: 500;
              line-height: normal;
              max-width: 180px;
              word-break: normal;
              cursor: pointer;
              ${mediaQueries("sm")`
                 font-size: 14px;
              `}
            }
          }
        }
    }
    .grid-cols{
      padding: 0 8px;
      flex: 0 0 217px;
      ${mediaQueries("sm")`
        flex: 0 0 50%;
      `}
    }
  }
  .filter-search-section-div{
    display: flex;
    justify-content: center;
    margin-top: -20px;
    margin-bottom: 40px;
    .sitback-select2-container {
      width: 100%;
      max-width: 425px;
      .sitback-select-option__control {
        padding: 6px 15px;
        border-radius: 100px;
        background: #fff;
        border-color: #29508699;
        outline: none !important;
        box-shadow: none !important;
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
            &.sitback-select-option__option--is-focused {
              background: #eafcff;
            }
            &.sitback-select-option__option--is-selected {
              background: ${theme.color.primary};
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
  }
  &.coming-soon-layout-wrapper{
    min-height: 88vh;
    position: relative;
    /* background-image: url('/images/coming-soon-image.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
    &.sitback-coming-soon-updated-layout-wrapper{
      margin: 50px 0;
      ${mediaQueries("md")`
        margin: 0;
      `}
      ${mediaQueries("sm")`
        min-height: 40vh;
      `}
      .coming-location-wrapper{
        ${mediaQueries("sm")`
          min-height: 40vh;
        `}
      }
    }
    &::before{
      position: absolute;
      content: '';
      background:  url("/images/coming-soon-image.svg") no-repeat;
      background-position: center;
      background-size: contain;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      /* opacity: 0.5; */
      opacity: 1;
      ${mediaQueries("sm")`
        bottom: unset;
        top: 25px;
        background-position: top;
      `}
    }
    .notify-me-btn-wrapper{
      font-size: 16px;
      min-width: 330px;
      min-height: 59px;
      border-radius: 13px !important;
      ${mediaQueries("sm")`
        min-height: 45px;
         font-size: 13px;
         min-width: 225px;
         border-radius: 8px !important;
      `}
    }
    .see-other-city-link{
      color: #295086 !important;
      font-family: ${theme.font.fontFamilyPoppins} !important;
      font-weight: 400 !important;
      font-size: 20px;
      line-height: 24px !important;
      letter-spacing: -1% !important;
      text-transform: capitalize !important;
      text-decoration: underline !important;
      margin-top: 15px;
      ${mediaQueries("sm")`
        font-size: 14px !important;
        margin-top: 6px;
      `}
    }
    .container{
      position: relative;
      z-index: 1;
    }
    .coming-location-wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 74vh;
      ${mediaQueries("sm")`
       justify-content: flex-start;
      `}
      h2{
        font-style: normal;
        font-weight: 900;
        font-size: 48px;
        line-height: 64px;
        text-align: center;
        color: #295086;
        margin-bottom: 25px;
        ${mediaQueries("xl")`
          font-size: 44px;
          line-height: 60px;
        `}
        ${mediaQueries("lg")`
          font-size: 40px;
          line-height: 55px;
          margin-bottom: 20px;
        `}
        ${mediaQueries("md")`
          font-size: 35px;
          line-height: 45px;
          margin-bottom: 12px;
        `}
        ${mediaQueries("sm")`
          font-size: 24px;
          line-height: 35px;
          margin-bottom: 6px;
        `}
        ${mediaQueries("xs")`
          font-size: 23px;
          line-height: 30px;
        `}
      }
      p{
        font-style: normal;
        font-weight: 400;
        font-size: 35px;
        line-height: 30px;
        text-align: center;
        color: #29508699;
        margin-bottom: 30px;
        ${mediaQueries("xl")`
          font-size: 32px;
        `}
        ${mediaQueries("lg")`
          font-size: 28px;
        `}
        ${mediaQueries("md")`
          font-size: 25px;
        `}
        ${mediaQueries("sm")`
          font-size: 18px;
          margin-bottom: 12px;
        `}
        ${mediaQueries("xs")`
          font-size: 16px;
        `}
      }
      button{
        border-radius: 24px;
        max-width: 260px;
        margin-bottom: 30px;
        font-weight: 700;
      }
      .see-othercities{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        flex-direction: column;
        ${mediaQueries("sm")`
          margin-top: 0;
        `}
        .mapiconbox{
          width: 58px;
          height: 88px;
          display: flex;
          justify-content: center;
          align-items: center;
          ${mediaQueries("sm")`
            width: 21px;
            height: 31px;
          `}
          img{
            object-fit: contain;
          }
        }
        a{
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 30px;
          text-decoration-line: underline !important;
          color: #295086;
          font-family: ${theme.font.fontFamilyOpenSans};
        }
      }
    }
  }
  .video-banner-wrapper{
    width: 100%;
    height: 100%;
    /* height: 65vh; */
    border-radius: 10px;
    overflow: hidden;
    .thumbnail-overlay{
      button{
        width: 120px;
        height: 120px;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
        border: none;
        ${mediaQueries("lg")`
          width: 100px;
          height: 100px;
        `}
        ${mediaQueries("md")`
          width: 80px;
          height: 80px;
        `}
        ${mediaQueries("sm")`
          width: 60px;
          height: 60px;
        `}
      }
    }
  }
  .spas-layout-change-wrapper{
    display: flex;
    max-width: 1675px;
    width: 100%;
    margin: auto;
    &.spa-updated-layout-wrapper{
      max-width: 100%;
      /* padding: 0 20px; */
      .container-fluid{
        max-width: 1410px;
      }
    }
    .spas-page-header-title-div{
      margin-bottom: 50px;
      h3{
        font-family: ${theme.font.fontFamilyPlayFair};
        font-weight: 800;
        font-size: 45px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        margin-bottom: 20px;
        ${mediaQueries("xxl")`
          font-size: 42px;
        `}
        ${mediaQueries("xl")`
          font-size: 39px;
        `}
        ${mediaQueries("lg")`
          font-size: 36px;
        `}
        ${mediaQueries("md")`
          font-size: 33px;
        `}
        ${mediaQueries("sm")`
          font-size: 30px;
        `}
        ${mediaQueries("xs")`
          font-size: 27px;
        `}
      }
      p{
        font-family: ${theme.font.fontFamilyPoppins};
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 21px;
        `}
        ${mediaQueries("xl")`
          font-size: 20px;
        `}
        ${mediaQueries("lg")`
          font-size: 19px;
        `}
        ${mediaQueries("md")`
          font-size: 18px;
        `}
        ${mediaQueries("sm")`
          font-size: 17px;
        `}
        ${mediaQueries("xs")`
          font-size: 16px;
        `}
      }
    }
    ${mediaQueries("lg")`
      flex-direction: column;
    `}
    .filter-sidebar-wrapper{
      width: 430px;
      padding: 0 15px;
      &.desktop-view-sidebar-wrapper{
        ${mediaQueries("sm")`
          display: none;
        `}
      }
      ${mediaQueries("xxl")`
        width: 370px;
      `}
      ${mediaQueries("xl")`
        width: 320px;
      `}
      ${mediaQueries("lg")`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: auto;
        margin-bottom: 35px;
      `}
      .accordion{
        max-width: 380px;
        margin: auto;
        width: 100%;
        border: none;
        border-radius: 0;
        border-bottom: 0.5px solid #29508629;
        margin-bottom: 6px;
        padding-bottom: 12px;
        ${mediaQueries("lg")`
          max-width: 48%;
          margin-top: 0;
        `}
        ${mediaQueries("sm")`
          max-width: 100%;
        `}
        .accordion-item{
          border: none;
          .accordion-header{
            border: none;
            .accordion-button{
              background: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              padding: 12px 0 3px;
              color: #295086;
              &::after{
                content: unset;
              }
              &::before{
                content: '';
                position: absolute;
                background: url("/images/down-arrow-icon.svg") no-repeat;
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
              .sitback-select2-container{
                .sitback-select-option__control{
                  padding: 8px 15px;
                  background: #ffffff;
                  border-color: #29508699;
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
              }
              .prise-text{
                display: flex;
                p{
                  font-weight: 500;
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 1px;
                  color: #29508699;
                }
              }
              .date-available-input{
                position: relative;
                .datepicker{
                  padding: 15.5px 15px;
                  background: #ffffff;
                  border-color: #29508699;
                  box-shadow: none;
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
            .range-slider__thumb{
              background-color: #29508699;
              width: 32px;
              height: 32px;
              position: absolute;
              z-index: 3;
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
        justify-content:flex-end;
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
    .spas-layout-section{
      flex: 1;
      .nodata-available-text{
        min-height: 460px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container{
        max-width: 100%;
      }
      .our-blogs-header{
        margin-bottom: 20px;
        padding: 0 15px;
        h2{
          text-align: start;
        }
        &.spas-mobile-view-layout-header{
          ${mediaQueries("sm")`
              margin-bottom: 8px;
            `}
        }
        .sub-pera-text{
          text-align: start;
          margin: 0;
           &.spas-mobile-view-layout-section{
            ${mediaQueries("sm")`
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          }
        }
      }
    }
  }
  .mobile-view-filter-wrapper{
    display: none;
    ${mediaQueries("sm")`
        display: flex;
        align-items: center;
        padding: 0 15px;
         margin-bottom: 15px;
      `}
      .filter-inputbox-wrapper{
    background: #FFFFFF;
    border: 1px solid #29508699;
    border-radius: 100px;
    max-width: 90%;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    padding: 5px 15px;
    min-height: 70px;
    ${mediaQueries("sm")`
      border-radius: 25px;
      padding: 5px 10px;
      min-height: unset;
      margin-right: 12px;
    `}
    .filterbox-input{
      width: 40%;
      border-right: 1px solid #29508699;
      position: relative;
      padding: 0 15px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      ${mediaQueries("sm")`
        padding: 0;
        border-right: 1px solid #EBECED;
        border-bottom: 0px solid #29508699;
        margin-bottom: 0;
        padding-bottom: 0;
        padding-right: 6px;
      `}
      &.service-type-form-group-wrapper{
        width: 55%;
        padding-left: 8px;
      }
      label{
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: normal;
        color: #295086;
        margin-bottom: 0;
      }
      .sitback-select2-container{
        width: 100%;
        .sitback-select-option__control{
          .sitback-select-option__value-container{
            padding: 0;
            min-height: auto;
            .sitback-select-option__placeholder{
              margin: 0;
              color: #295086;
              font-size: 12px;
            }
            .sitback-select-option__single-value{
              font-size: 12px !important;
              color: #295086 !important;
            }
            .sitback-select-option__input-container{
              margin: 0;
              padding: 0;
              font-size: 12px !important;
              color: #295086 !important;
            }
          }
        }
        .sitback-select-option__menu {
          .sitback-select-option__menu-list {
            .sitback-select-option__option {
              color: ${theme.color.secondary};
              font-size: 12px;
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
                background: ${theme.color.primary};
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
      &.datepicker-box{
        border-right: 1px solid #29508699;
        padding-right: 0;
        padding-left: 6px;
        width: 40%;
        label{
          /* margin-bottom: 8px; */
        }
        .calendarv2-wrapper-div{
          .rdp-root{
            right: 120px;
          }
        }
        .datepicker{
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          width: 100%;
          font-size: 12px !important;
          color: #295086;
          font-weight: 300;
          min-height: 26px;
        }
        .calendarv2-wrapper-div{
          top: 59px;
          bottom: 0;
        }
      }
    }
    .filter-btn{
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      padding-left: 8px;
      ${mediaQueries("sm")`
        position: unset;
        flex: 1;
        display: flex;
        justify-content: center;
      `}
      button{
        min-width: unset;
        background: transparent;
        border: none;
        height: 100%;
        padding: 0;
        margin: 0;
        width: 16px;
        height: 16px;
        overflow: hidden;
      }
    }
    .sitback-select2-container{
      .sitback-select-option__control {
        padding: 0;
        border-radius: 0;
        background: transparent;
        border-color: transparent;
        outline: none !important;
        box-shadow: none !important;
        min-height: auto;
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
          .sitback-select-option__indicator{
            padding: 0;
          }
        }
      }
    }
  }
  .filter-icon-wrapper{
    flex: 1;
    .img-wrapper{
      width: 32px;
      height: 32px;
      overflow: hidden;
      display: block;
      box-shadow: 0px 4px 34px 0px #00000030;
      border-radius: 1000px;
    }

  }
  }
`;
export const ServicesIconBox = styled.div`
  background: #FFFFFF;
  border: 1px solid #EAEBEC;
  border-radius: 8px;
  padding: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: calc(100% - 16px);
  margin-bottom: 16px;
  .services-icon{
    width: 140px;
    height: 100px;
    margin: auto;
    margin-bottom: 20px;
    ${mediaQueries("md")`
      width: 120px;
      height: 90px;
    `}
    ${mediaQueries("sm")`
      width: 90px;
      height: 65px;
    `}
  }
  p{
    color: #295086;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 1px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
    margin: auto;
    word-break: break-all;
  }
  &:hover{
    border-color: #95CCD5;
    box-shadow: 0px 2px 48px 7px rgba(0, 0, 0, 0.09);
  }
`;
export const BusinessOwnersWrapper = styled.div`
  background: #EFECD5;
  position: relative;
  overflow: hidden;
  .row{
    align-items: center;
  }
  .business-owners-detail{
    max-width: 440px;
    width: 100%;
    padding: 40px 0;
    padding-top: 80px;
    margin: auto;
    position: relative;
    z-index: 1;
    ${mediaQueries("sm")`
      text-align: center;
    `}
    h2{
      text-align: start;
      margin-bottom: 6px;
      ${mediaQueries("sm")`
        text-align: center;
        font-size: 40px;
        line-height: 60px;
      `}
    }
    p{
      font-weight: 400;
      font-size: 32px;
      /* max-width: 340px; */
      width: 100%;
      margin-bottom: 25px;
      line-height: 45px;
      color: #295086;
      ${mediaQueries("xl")`
        font-size: 28px;
        line-height: 42px;
      `}
      ${mediaQueries("lg")`
        font-size: 26px;
        line-height: 36px;
      `}
      ${mediaQueries("md")`
        font-size: 22px;
        line-height: 32px;
      `}
      ${mediaQueries("sm")`
        font-size: 21px;
        line-height: 36px;
        text-align: center;
      `}
    }
    button{
      width: auto;
      background: white;
      border-color: white;
      color: #295086;
      min-width: 160px;
      padding: 15px;
      min-height: 52px;
      box-shadow: none;
      ${mediaQueries("sm")`
       font-size: 16px;
       font-weight: 600;
       min-width: 190px;
       min-height: 54px;
       text-transform: uppercase;
      `}
    }
  }
  .sitback-project-detail-img{
    max-width: 550px;
    width: 100%;
    margin: auto;
    margin-bottom: -180px;
    position: relative;
    z-index: 1;
    ${mediaQueries("md")`
      margin-bottom: -140px;
    `}
    ${mediaQueries("sm")`
      margin-bottom: -80px;
    `}
  }
  .cloud-image-wrapper{
    max-width: 600px;
    width: 100%;
    height: 266px;
    position: absolute;
    right: -140px;
    bottom: -120px;
    z-index: 0;
    opacity: 0.6;
    ${mediaQueries("sm")`
        left: 0;
        right: 0;
        margin: auto;
        bottom: -120px;
    `}
    &.left-top-image{
      left: -200px;
      right: auto;
      top: -120px;
      bottom: auto;
      max-width: 770px;
      height: 260px;
      ${mediaQueries("sm")`
          left: 0;
          right: 0;
          top: -50px;
          width: 250px;
          height: 110px;
          margin: auto;
;      `}
    }
  .business-desktop-view-image{
    ${mediaQueries("sm")`
      display: none;
    `}
  }
  .business-mobile-view-image{
    display: none;
    ${mediaQueries("sm")`
      display: block;
    `}
  }
  }`;
export const SpaDetailUpdatedDiv = styled.div`
  /* padding: 0 20px; */
  .spa-detail-tab-main-div{
    .tab-btn-div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1210px;
      margin: -40px auto 30px;
      border-radius: 19px;
      background: #FFF;
      padding: 20px 30px;
      z-index: 1;
      position: relative;
      ${mediaQueries("sm")`
        max-width: calc(100% - 40px);
        border-radius: 13px;
        padding: 8px 20px;
      `}
      .request-btn{
        border-radius: 100px;
        background: #004D87;
        min-height: 47px;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        padding: 12px;
        max-width: 220px;
        ${mediaQueries("sm")`
          display: none;
        `}
      }
      .nav{
        ${mediaQueries("sm")`
          overflow-x: auto;
          flex-wrap: nowrap;
        `}
        .nav-item{
          a{
            color: ${theme.color.secondary};
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            padding: 8px 16px;
            ${mediaQueries("xl")`
              font-size: 15px;
              padding: 8px 14px;
            `}
            ${mediaQueries("lg")`
              font-size: 14px;
              padding: 8px 12px;
            `}
            ${mediaQueries("md")`
              font-size: 15px;
              padding: 8px 10px;
            `}
            ${mediaQueries("sm")`
              font-size: 14px;
              padding: 8px;
            `}
            &.active{
              background: transparent;
              font-weight: 600;
            }
          }
        }
      }
    }
    .tab-content{
      .tab-pane{
        padding-bottom: 50px;
        .spa-details-main-content-div{
          .container-fluid{
            max-width: 1410px;
          }
        }
        .massage-specialist-section{
          .services-category-wrapper{
            display: flex;
            position: relative;
            ${mediaQueries("sm")`
              flex-direction: column;
            `}
            .services-category-list-wrapper{
              flex-wrap: unset;
              display: flex;
              overflow: unset !important;
              ${mediaQueries("sm")`
                flex-direction: column;
                max-width: calc(100% - 20px);
                margin: auto;
                width: 100%;
              `}
              .grid-cols{
                &.selected-item{
                  .whitebox-wrapper{
                    border-color: #007BFF !important;
                    .checkmark-icon-wrapper{
                      opacity: 1;
                    }
                  }
                }
                .whitebox-wrapper{
                  border-radius: 100px;
                  background: #F2F6F9;
                  display: flex;
                  align-items: center;
                  padding: 10px 20px;
                  margin-right: 12px;
                  position: relative;
                  ${mediaQueries("sm")`
                    margin-right: 0;
                    margin-bottom: 12px;
                    width: 100%;
                  `}
                  .icon-wrapper{
                    width: 30px !important;
                    height: auto !important;
                    margin-right: 12px;
                    margin-bottom: 0;
                  }
                  .paragraph-text{
                    color: #295086;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;
                  }
                  .checkmark-icon-wrapper{
                    position: absolute;
                    top: -10px;
                    right: 5px;
                    width: 22px;
                    height: auto;
                    overflow: hidden;
                    opacity: 0;
                    ${mediaQueries("sm")`
                      top: 0;
                      bottom: 0;
                      right: 15px;
                      margin: auto;
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  }
                }
              }
            }
          }
        }
        .services-category-wrapper{
          &.service-bottom-section{
            margin-top: 30px;
            .services-category-list-wrapper{
              display: flex;
              flex-wrap: wrap;
              margin: 0 -10px;
              .grid-cols{
                flex-basis: 20%;
                max-width: 20%;
                padding: 10px;
                ${mediaQueries("lg")`
                  flex-basis: 25%;
                  max-width: 25%;
                `}
                ${mediaQueries("md")`
                  flex-basis: 33.33%;
                  max-width: 33.33%;
                `}
                ${mediaQueries("sm")`
                  flex-basis: 50%;
                  max-width: 50%;
                `}
                &.selected-item{
                  .whitebox-wrapper{
                    .icon-wrapper{
                      background: ${theme.color.white};
                      .checkmark-icon-wrapper{
                        opacity: 1;
                      }
                    }
                  }
                }
                .whitebox-wrapper{
                  border-radius: 8px;
                  border: 1px solid #EAEBEC;
                  background: #FFF;
                  .icon-wrapper{
                    border-radius: 10px;
                    background: #FBFBFB;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: calc(100% - 20px);
                    margin: 10px auto;
                    height: 150px;
                    position: relative;
                    ${mediaQueries("sm")`
                      height: 135px;
                    `}
                    .checkmark-icon-wrapper{
                      position: absolute;
                      top: 10px;
                      right: 10px;
                      width: 22px;
                      height: auto;
                      overflow: hidden;
                      opacity: 0;
                    }
                    .inner-img-div{
                      width: 90px;
                      height: 90px;
                      overflow: hidden;
                    }
                  }
                  .paragraph-text{
                    color: ${theme.color.secondary};
                    text-align: center;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: normal;
                    margin-bottom: 15px;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    ${mediaQueries("md")`
                      font-size: 15px;
                    `}
                    ${mediaQueries("sm")`
                      font-size: 14px;
                    `}
                  }
                  .hour-text{
                    padding: 0 20px 7px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #EAEBEC;
                    p{
                      color: ${theme.color.secondary};
                      font-size: 14px;
                      font-weight: 400;
                      line-height: normal;
                      ${mediaQueries("sm")`
                        font-size: 12px;
                      `}
                    }
                  }
                  .price-text{
                    padding: 8px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                      color: ${theme.color.secondary};
                      font-size: 14px;
                      font-weight: 400;
                      line-height: normal;
                      ${mediaQueries("sm")`
                        font-size: 12px;
                      `}
                    }
                    h4{
                      color: ${theme.color.secondary};
                      font-size: 14px;
                      font-weight: 400;
                      line-height: normal;
                      ${mediaQueries("sm")`
                        font-size: 12px;
                      `}
                    }
                  }
                }
              }
            }
          }
        }
        .amenities-main-updated-content-div{
            .container-fluid{
              max-width: 1410px;
            }
          }
        .amenities-display-wrapper{
          .amenities-no-data-div{
            margin-top: 150px !important;
            margin-bottom: 150px !important;
            ${mediaQueries("xl")`
              margin-top: 120px !important;
               margin-bottom: 120px !important;
            `}
            ${mediaQueries("lg")`
              margin-top: 80px !important;
               margin-bottom: 80px !important;
            `}
            ${mediaQueries("sm")`
              margin-top: 50px !important;
               margin-bottom: 50px !important;
            `}
            .amenities-display-div{
              border-radius: 8px;
              border: 1px solid #EAEBEC;
              background: #FFF;
              padding: 10px;
              max-width: 255px;
              margin: auto;
              .amenities-inner-div{
                border-radius: 10px;
                background: #FBFBFB;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 36px 36px 25px;
                .amenities-image-div{
                  width: 100px;
                  height: 100px;
                  overflow: hidden;
                  margin-bottom: 25px;
                  img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                  }
                }
                p{
                  color: #295086;
                  text-align: center;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: normal;
                }
              }
            }
          }
          .amenities-main-div{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            span{
              background: #FFFFFF;
              border: 1px solid #EAEBEC;
              font-weight: 500;
              font-size: 20px;
              line-height: 100%;
              letter-spacing: 1px;
              color: #29508699;
              padding: 7px 25px 7px 12px;
              border-radius: 100px;
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
        }
        .gallery-image-updated-div{
          .grid-row-div{
            ${mediaQueries("sm")`
              margin: 0;
            `}
            .grid-inner-row-div{
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              margin-bottom: 30px;
              ${mediaQueries("lg")`
               flex-direction: column;
              `}
              &:nth-child(2n){
                flex-direction: row-reverse;
                ${mediaQueries("lg")`
                  flex-direction: column;
                `}
              }
              .gallery-big-image-div{
                width: 50%;
                padding: 0 10px;
                box-sizing: border-box;
                ${mediaQueries("lg")`
                  width: 100%;
                  padding: 0;
                `}
                .gallery-img{
                  width: 100%;
                  height: 600px;
                  overflow: hidden;
                  border-radius: 20px;
                  border: 1px solid #EAEBEC;
                  ${mediaQueries("lg")`
                    height: 500px;
                    margin-bottom: 20px;
                  `}
                  ${mediaQueries("md")`
                    height: 400px;
                  `}
                  ${mediaQueries("sm")`
                    height: 350px;
                    margin-bottom: 12px;
                  `}
                  img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                  }
                }
              }
              .small-images-wrapper{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                margin: -10px;
                .gallery-small-image-div{
                  flex-basis: 50%;
                  max-width: 50%;
                  padding: 10px;
                  ${mediaQueries("sm")`
                    padding: 5px;
                  `}
                  .gallery-img{
                    width: 100%;
                    height: 290px;
                    overflow: hidden;
                    border-radius: 20px;
                    border: 1px solid #EAEBEC;
                    ${mediaQueries("lg")`
                      height: 250px;
                    `}
                    ${mediaQueries("md")`
                      height: 200px;
                    `}
                    ${mediaQueries("sm")`
                      height: 170px;
                    `}
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
          }
        }
        .sitback-review-updated-div{
          /* display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin: 0 -12px; */
          column-count: 3; /* number of columns */
          column-gap: 8px;
          ${mediaQueries("lg")`
            column-count: 2;
          `}
          ${mediaQueries("sm")`
            column-count: 1;
          `}
          .sitback-review-block{
            /* max-width: 33.33%;
            flex-basis: 33.33%; */
            padding: 0 12px;
            border: none;
            display: inline-block;
            width: 100%;
            margin-bottom: 24px;
            .sitback-review-inner-div{
              border-radius: 8px;
              border: 1px solid #EAEBEC;
              background: #FFF;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 35px;
              box-sizing: border-box;
              ${mediaQueries("xl")`
                padding: 30px;
              `}
              ${mediaQueries("lg")`
                padding: 25px;
              `}
              ${mediaQueries("md")`
                padding: 20px;
              `}
              ${mediaQueries("sm")`
                padding: 15px;
              `}
              .sitback-review-msg-block{
                flex-direction: column-reverse;
                align-items: center;
                margin-bottom: 25px;
                span{
                  justify-content: center;
                  border-radius: 50px;
                  background: #E6EEF3;
                  color: ${theme.color.logintitlecolor};
                  text-align: center;
                  font-size: 12px;
                  font-weight: 500;
                  line-height: normal;
                  padding: 5px 12px;
                  margin-bottom: 20px;
                }
                p{
                  color: ${theme.color.logintitlecolor};
                  text-align: center;
                  font-size: 16px;
                  font-weight: 300;
                  line-height: 33px;
                  margin-right: 0;
                }
              }
              h5{
                color: ${theme.color.secondary};
                text-align: center;
                font-size: 18px;
                font-weight: 500;
                line-height: normal;
                margin-bottom: 6px;
              }
              .review-start{
                p{
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
  .spa-detail-mobile-btn-div{
    display: none;
    justify-content: center;
    align-items: center;
    margin: 50px 0 0;
    ${mediaQueries("sm")`
      display: flex;
    `}
    .request-btn{
        border-radius: 100px;
        background: #004D87;
        min-height: 47px;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        padding: 12px;
        max-width: 220px;
      }
  }
`;
export const SpaUpdatedPageLayoutDiv = styled.div`
  .spa-filter-main-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1210px;
    margin: -40px auto 30px;
    border-radius: 19px;
    background: #FFF;
    box-shadow: 0 4px 104px 0 rgba(0, 0, 0, 0.17);
    z-index: 1;
    position: relative;
    padding: 10px 0;
    ${mediaQueries("sm")`
      max-width: calc(100% - 40px);
      border-radius: 13px;
      padding: 8px 20px;
    `}
    .accordion{
      width: 100%;
      .accordion-item{
        width: 100%;
        border: none;
        .accordion-title-content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0;
          border: none;
          box-shadow: none;
          background: transparent;
          ${mediaQueries("sm")`
            align-items: center;
            // padding: 6px;
            flex-wrap: wrap;
          `}
          button{
            padding: 10px 30px 15px 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-top-left-radius: 19px;
            border-top-right-radius: 19px;
            ${mediaQueries("xl")`
              padding: 25px 25px 15px 25px;
            `}
            ${mediaQueries("lg")`
              padding: 20px 20px 15px 20px;
            `}
            ${mediaQueries("md")`
              padding: 15px;
            `}
            /* ${mediaQueries("sm")`
            align-items: flex-start;
            padding: 6px;
            flex-wrap: wrap;
          `} */
            &::after{
              display: none;
            }
            &:not(.collapsed){
              background: unset;
              padding-bottom: 15px;
            }
            &:focus{
              box-shadow: none;
              outline: none;
            }
          }
          .accordion-left-content{
            display: flex;
            align-items: center;
            padding-right: 15px;
            ${mediaQueries("sm")`
              // flex-direction: column;
              // align-items: flex-start;
              flex: 1;
              overflow: hidden;
            `}
            .sitback-filter-accordion-btn-wrapper{
              max-width: fit-content;
              padding: 10px 0 15px 30px;
              box-shadow: none !important;
              /* ${mediaQueries("xl")`
                padding: 25px 25px 15px 25px;
              `}
              ${mediaQueries("lg")`
                padding: 20px 20px 15px 20px;
              `}
              ${mediaQueries("md")`
                padding: 15px;
              `} */
              ${mediaQueries("sm")`
                padding-left: 0;
              `}
            }
            .filter-title-text{
              color: ${theme.color.secondary};
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 30px;
              display: flex;
              align-items: center;
              ${mediaQueries("xl")`
                font-size: 17px;
                line-height: 28px;
              `}
              ${mediaQueries("lg")`
                font-size: 16px;
                line-height: 26px;
              `}
              ${mediaQueries("md")`
                font-size: 15px;
                line-height: 24px;
              `}
              i{
                margin-right: 13px;
              }
              &.desktop-view-filter-display-wrapper{
                ${mediaQueries("sm")`
                 display: none;
                `}
              }
              &.mobile-view-filter-display-wrapper{
                display: none;
                ${mediaQueries("sm")`
                 display: flex;
                `}
              }
            }
            .filter-selected-details{
              margin-left: 20px;
              display: flex;
              align-items: center;
              &.filter-detail-desktop-view-wrapper{
                ${mediaQueries("sm")`
                  display: none;
                `}
              }
              ${mediaQueries("xl")`
                margin-left: 18px;
              `}
              ${mediaQueries("lg")`
                margin-left: 16px;
              `}
              ${mediaQueries("md")`
                margin-left: 14px;
                flex-wrap: nowrap;
                overflow-x: auto;
                min-width: 250px;
              `}
              ${mediaQueries("sm")`
                margin-left: 0;
                margin-top: 15px;
              `}
              span{
                border-radius: 100px;
                background: #F2F6F9;
                padding: 6px 14px;
                color: #004d87cc;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 31px;
                min-width: fit-content;
                margin-right: 10px;
                min-height: 43px;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                  margin-left: 12px;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
            }
          }
          .filter-selected-details{
              margin-left: 0;
              display: flex;
              align-items: center;
              &.filter-detail-mobile-view-wrapper{
                display: none;
                ${mediaQueries("sm")`
                  display: flex;
                  overflow-x: auto;
                  flex-wrap: nowrap;
                  min-width: 250px;
                `}
              }
              ${mediaQueries("sm")`
                margin-left: 0;
                margin-top: 15px;
              `}
              span{
                border-radius: 100px;
                background: #F2F6F9;
                padding: 6px 14px;
                color: #004d87cc;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 31px;
                min-width: fit-content;
                margin-right: 10px;
                min-height: 43px;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                  margin-left: 12px;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
            }
          .accordion-right-content{
            padding-right: 35px;
            ${mediaQueries("xl")`
               padding-right: 30px;
            `}
            ${mediaQueries("lg")`
               padding-right: 25px;
            `}
            ${mediaQueries("md")`
               padding-right: 20px;
            `}
            ${mediaQueries("sm")`
              padding-right: 0;
              width: 50%;
              justify-content: flex-end;
              display: flex;
            `}
            p{
              color: ${theme.color.secondary};
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: 30px;
              ${mediaQueries("xl")`
                font-size: 17px;
                line-height: 28px;
              `}
              ${mediaQueries("lg")`
                font-size: 16px;
                line-height: 26px;
              `}
              ${mediaQueries("md")`
                font-size: 15px;
                line-height: 24px;
              `}
            }
          }
        }
        .accordion-collapse{
          ${mediaQueries("sm")`
            display: none;
          `}
          &.show{
            border-top: 1px solid #EBECED;
          }
          .accordion-body{
            padding: 0 30px;
            width: 100%;
            ${mediaQueries("sm")`
              padding: 0 15px;
            `}
            .sitback-inner-accordion-body-div{
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              margin: 0 -12px;
              .sitback-body-content{
                max-width: 33.33%;
                flex-basis: 33.33%;
                /* padding: 0 12px; */
                ${mediaQueries("lg")`
                  max-width: 50%;
                  flex-basis: 50%;
                `}
                ${mediaQueries("sm")`
                  max-width: 100%;
                  flex-basis: 100%;
                `}
                &:nth-child(2){
                  .filter-detail-wrapper{
                    ${mediaQueries("lg")`
                     border-right: none;
                    `}
                  }
                }
                &:nth-child(3){
                  .filter-detail-wrapper{
                    border-right: none;
                    ${mediaQueries("lg")`
                      border-right: 1px solid #EBECED;
                    `}
                  }
                }
                &:nth-child(4){
                  .filter-detail-wrapper{
                    border-bottom: none;
                    ${mediaQueries("lg")`
                      border-bottom: 1px solid #EBECED;
                       border-right: none;
                    `}
                  }
                }
                &:nth-child(5){
                  .filter-detail-wrapper{
                    border-bottom: none;
                  }
                }
                &:nth-child(6){
                  .filter-detail-wrapper{
                    border-right: none;
                    border-bottom: none;
                  }
                }
                .filter-detail-wrapper{
                  padding: 25px 12px 12px;
                  border-right: 1px solid #EBECED;
                  border-bottom: 1px solid #EBECED;
                  min-height: 120px;
                  ${mediaQueries("sm")`
                    border-right: none !important;
                  `}
                  .filter-label{
                    color: ${theme.color.secondary};
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 30px;
                    margin-bottom: 12px;
                    ${mediaQueries("xl")`
                      font-size: 17px;
                      line-height: 28px;
                    `}
                    ${mediaQueries("lg")`
                      font-size: 16px;
                      line-height: 26px;
                    `}
                    ${mediaQueries("md")`
                      font-size: 15px;
                      line-height: 24px;
                    `}
                    i{
                      margin-right: 7px;
                      &.service-icon-label{
                        svg{
                          path{
                            stroke: #004D87;
                          }
                        }
                      }
                    }
                  }
                  .price-range-div{
                    margin-bottom: 0;
                    .range-slider{
                      border-radius: 100px;
                      /* opacity: 0.3;  */
                      height: 3px;
                      background: rgba(41, 80, 134, 0.43);
                      .range-slider__thumb{
                        width: 10px;
                        height: 10px;
                        background: ${theme.color.secondary};
                        z-index: 1;
                      }
                      .range-slider__range{
                        background: ${theme.color.secondary};
                      }
                    }
                    .prise-text{
                      p{
                        color: ${theme.color.logintitlecolor};
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 30px;
                      }
                    }
                  }
                  .service-select-div{
                    margin-bottom: 0;
                    .sitback-select2-container{
                      .sitback-select-option__control{
                        background: transparent;
                        padding: 0;
                        border: none;
                        .sitback-select-option__placeholder{
                          color: #29508699;
                          font-size: 16px;
                          font-style: normal;
                          font-weight: 300;
                          line-height: 30px;
                          ${mediaQueries("lg")`
                            font-size: 15px;
                            line-height: 28px;
                          `}
                          ${mediaQueries("md")`
                            font-size: 14px;
                            line-height: 26px;
                          `}
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
                    }
                  }
                  .city-select-div{
                    margin-bottom: 0;
                    .sitback-select2-container{
                      .sitback-select-option__control{
                        background: transparent;
                        padding: 0;
                        border: none;
                        .sitback-select-option__placeholder{
                          color: #29508699;
                          font-size: 16px;
                          font-style: normal;
                          font-weight: 300;
                          line-height: 30px;
                          ${mediaQueries("lg")`
                            font-size: 15px;
                            line-height: 28px;
                          `}
                          ${mediaQueries("md")`
                            font-size: 14px;
                            line-height: 26px;
                          `}
                        }
                      }
                    }
                  }
                  .date-available-input{
                    margin-bottom: 0;
                    input{
                      background: transparent;
                      border: none;
                      padding: 0;
                      box-shadow: none;
                      color: #29508699;
                    }

                  }
                  .time-select-div{
                    margin-bottom: 0;
                    .sitback-select2-container{
                      .sitback-select-option__control{
                        background: transparent;
                        padding: 0;
                        border: none;
                        .sitback-select-option__placeholder{
                          color: #29508699;
                          font-size: 16px;
                          font-style: normal;
                          font-weight: 300;
                          line-height: 30px;
                          ${mediaQueries("lg")`
                            font-size: 15px;
                            line-height: 28px;
                          `}
                          ${mediaQueries("md")`
                            font-size: 14px;
                            line-height: 26px;
                          `}
                        }
                      }
                    }
                  }
                  &.filter-btn-display-div{
                    display: flex;
                    /* justify-content: center; */
                    align-items: center;
                    width: 100%;
                    .filter-btn-div{
                      display: flex;
                      align-items: center;
                      width: 100%;
                      .apply-filter-btn{
                        border-radius: 100px;
                        background: #004D87;
                        min-height: 52px;
                        color: #FFF;
                        text-align: center;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: normal;
                        padding: 14px;
                        max-width: 250px;
                        margin-right: 20px;
                      }
                      a{
                        color: #295086;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 30px;
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
`;

export const ContactUsUpdatedWrapper = styled.div`
  .contact-form-main-div{
    max-width: 975px;
    margin: -40px auto 0;
    border-radius: 35px;
    background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray 50% / cover no-repeat;
    padding: 55px 30px;
    z-index: 1;
    position: relative;
    ${mediaQueries("xl")`
      padding: 45px 30px;
    `}
    ${mediaQueries("lg")`
      padding: 35px 30px;
    `}
    ${mediaQueries("md")`
      padding: 30px 30px;
    `}
    ${mediaQueries("sm")`
      max-width: calc(100% - 40px);
    `}
    form{
      .contact-form-group{
        margin-bottom: 30px;
        .error{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: normal;
          color: red;
          margin-top: 5px;
        }
        ${mediaQueries("sm")`
          margin-bottom: 25px;
        `}
        &.text-area-form-group{
          margin-bottom: 22px;
        }
      }
      label{
        color: ${theme.color.secondary};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        margin-bottom: 16px;
        ${mediaQueries("md")`
          font-size: 15px;
        `}
        ${mediaQueries("sm")`
          font-size: 14px;
        `}
      }
      input{
        border-radius: 100px;
        border: 1px solid rgba(218, 218, 218, 0.60);
        background: #FFF;
        padding: 17px 25px;
        min-height: 68px;
        ${mediaQueries("md")`
          padding: 15px 20px;
        `}
        ${mediaQueries("sm")`
          min-height: 60px;
        `}
        &::placeholder{
          color: rgba(41, 80, 134, 0.90);
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
        }
      }
      textarea{
        border-radius: 13px;
        border: 1px solid rgba(218, 218, 218, 0.60);
        background: #FFF;
        padding: 17px 25px;
        min-height: 200px;
        ${mediaQueries("md")`
          padding: 17px 25px;
        `}
        ${mediaQueries("sm")`
          min-height: 150px;
        `}
        &::placeholder{
          color: rgba(41, 80, 134, 0.90);
          font-size: 14px;
          font-weight: 400;
          line-height: 22.4px;
        }
      }
      .footerbox{
        .send-msg-btn{
          border-radius: 100px;
          background: ${theme.color.logintitlecolor};
          min-height: 67px;
          color: #FFF;
          font-size: 14px;
          font-weight: 500;
          line-height: normal;
          ${mediaQueries("sm")`
            min-height: 60px;
          `}
        }
      }
    }
  }
`;

export const HowItWorksLandingWrapper = styled.div`
  .how-it-works-inner-div{
    padding: 45px 0 40px;
    ${mediaQueries("xl")`
      padding: 40px 0 40px;
    `}
    ${mediaQueries("lg")`
      padding: 35px 0 40px;
    `}
    ${mediaQueries("md")`
      padding: 30px 0 40px;
    `}
    ${mediaQueries("sm")`
      padding: 25px 0 35px;
    `}
    .how-it-work-header-div{
      margin-bottom: 30px;
      ${mediaQueries("sm")`
        margin-bottom: 25px;
      `}
      h3{
        font-family: ${theme.font.fontFamilyPlayFair};
        font-weight: 800;
        font-size: 45px;
        line-height: 100%;
        text-align: center;
        margin-bottom: 15px;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 40px;
        `}
        ${mediaQueries("xl")`
          font-size: 35px;
        `}
        ${mediaQueries("lg")`
          font-size: 30px;
        `}
        ${mediaQueries("md")`
          font-size: 25px;
        `}
         ${mediaQueries("sm")`
          font-size: 24px;
        `}
      }
      p{
        /* font-family: ${theme.font.fontFamilyPoppins}; */
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 20px;
        `}
        ${mediaQueries("xl")`
          font-size: 18px;
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
    .how-it-work-boxes-wrapper{
      max-width: 1210px;
      margin: 0 auto;
      .how-it-work-web-view-div{
        ${mediaQueries("sm")`
          display: none;
        `}
        .how-it-work-box-div{
          background: #DFECF9;
          border-radius: 19px;
          padding: 45px 30px 30px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          height: calc(100% - 20px);
          margin-bottom: 20px;
          ${mediaQueries("xxl")`
             padding: 40px 25px 25px;
          `}
          ${mediaQueries("xl")`
             padding: 35px 25px 25px;
          `}
          ${mediaQueries("lg")`
             padding: 30px 25px 25px;
          `}
          ${mediaQueries("md")`
             padding: 25px;
          `}
          .how-it-work-img-div{
            width: 60px;
            height: auto;
            overflow: hidden;
            margin-bottom: 30px;
            ${mediaQueries("xxl")`
              width: 55px;
            `}
            ${mediaQueries("xl")`
              width: 50px;
            `}
            ${mediaQueries("lg")`
              width: 45px;
            `}
            ${mediaQueries("md")`
              width: 40px;
            `}
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .how-it-work-detail-div{
            h4{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 500;
              font-size: 24px;
              line-height: 100%;
              text-align: center;
              margin-bottom: 14px;
              color: ${theme.color.secondary};
              ${mediaQueries("xxl")`
                font-size: 23px;
              `}
              ${mediaQueries("xl")`
                font-size: 22px;
              `}
              ${mediaQueries("lg")`
                font-size: 21px;
              `}
              ${mediaQueries("md")`
                font-size: 20px;
              `}
              span{
                font-family: ${theme.font.fontFamilyPlayFair};
                font-weight: 800;
              }
            }
            p{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 300;
              font-size: 16px;
              line-height: 32px;
              text-align: center;
              color: #295086cc;
            }
          }
        }
      }
      .how-it-work-mobile-view-div{
        display: none;
        ${mediaQueries("sm")`
          display: block;
        `}
        .swiper{
          height: 190px;
          .swiper-wrapper{
            height: 100%;
            .swiper-slide{
              height: 100%;
            }
          }
        }
        .how-it-work-box-div{
          background: #DFECF9;
          border-radius: 19px;
          padding: 25px 20px 25px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          height: 100%;
          .how-it-work-img-div{
            width: 40px;
            height: auto;
            overflow: hidden;
            margin-bottom: 15px;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .how-it-work-detail-div{
            h4{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 500;
              font-size: 20px;
              line-height: 100%;
              text-align: center;
              margin-bottom: 10px;
              color: ${theme.color.secondary};
              span{
                font-family: ${theme.font.fontFamilyPlayFair};
                font-weight: 800;
              }
            }
            p{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 300;
              font-size: 14px;
              line-height: 25px;
              text-align: center;
              color: #295086cc;
            }
          }
        }
      }
    }
  }
`;

export const WhyPeopleChooseSection = styled.div`
  &.services-why-people-choose-div{
    .why-people-choose-inner-div{
      padding-top: 48px;
      padding-bottom: 0;
    }
  }
  &.sitback-spa-page-display-click-div{
    padding: 90px 0;
    ${mediaQueries("xxl")`
      padding: 80px 0;
    `}
    ${mediaQueries("xl")`
      padding: 70px 0;
    `}
    ${mediaQueries("lg")`
      padding: 60px 0;
    `}
    ${mediaQueries("md")`
      padding: 50px 0;
    `}
    ${mediaQueries("sm")`
      padding: 40px 0;
    `}
    .why-people-choose-inner-div{
      padding: 0;
    }
    .few-clicks-display-div{
      border-radius: 20px;
      background: #F2F6F9;
      padding: 15px;
      display: flex;
      align-items: center;
      ${mediaQueries("xxl")`
        padding: 14px;
      `}
      ${mediaQueries("xl")`
        padding: 13px;
      `}
      ${mediaQueries("lg")`
        padding: 12px;
      `}
      ${mediaQueries("md")`
        padding: 11px;
        flex-direction: column-reverse;
        align-items: flex-start;
      `}
      ${mediaQueries("sm")`
        padding: 9px;
      `}
      .left-detail-div{
        flex: 1;
        .left-inner-div{
          padding: 0 0 0 20px;
          ${mediaQueries("xxl")`
            padding: 0 0 0 18px;
          `}
          ${mediaQueries("xl")`
            padding: 0 0 0 16px;
          `}
          ${mediaQueries("lg")`
            padding: 0 0 0 15px;
          `}
          ${mediaQueries("md")`
            padding: 0 0 0 13px;
          `}
          ${mediaQueries("sm")`
            padding: 0 0 0 9px;
          `}
          .text-div{
            margin-bottom: 20px;
            h5{
              margin-bottom: 4px;
              span{
                font-weight: 500;
              }
              color: #295086;
              font-family: ${theme.font.fontFamilyPlayFair};
              font-size: 20px;
              font-weight: 800;
              line-height: normal;
              text-transform: capitalize;
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
            p{
              color: #295086cc;
              font-size: 16px;
              font-style: normal;
              font-weight: 300;
              line-height: 32px;
              ${mediaQueries("md")`
                font-size: 15px;
                line-height: 26px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                line-height: 20px;
              `}
            }
          }
          h6{
            color: #004d87cc;
            font-size: 16px;
            font-weight: 600;
            line-height: 32px;
            margin-top: 12px;
            ${mediaQueries("md")`
              font-size: 15px;
              line-height: 26px;
            `}
            ${mediaQueries("sm")`
              font-size: 14px;
              line-height: 20px;
            `}
          }
        }
      }
      .right-detail-div{
        width: 800px;
        height: 460px;
        overflow: hidden;
        border-radius: 20px;
        ${mediaQueries("xxl")`
          width: 700px;
        `}
        ${mediaQueries("xl")`
          width: 600px;
        `}
        ${mediaQueries("lg")`
          width: 480px;
        `}
        ${mediaQueries("md")`
          width: 100%;
          margin-bottom: 20px;
          height: 350px;
        `}
        ${mediaQueries("md")`
          height: 220px;
        `}
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
      }
    }
  }
  .why-people-choose-inner-div{
    padding-bottom: 30px;
    .why-people-choose-header-div{
      margin-bottom: 30px;
      ${mediaQueries("sm")`
        margin-bottom: 25px;
      `}
      h3{
        font-family: ${theme.font.fontFamilyPlayFair};
        font-weight: 800;
        font-size: 45px;
        line-height: 100%;
        text-align: center;
        margin-bottom: 15px;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 40px;
        `}
        ${mediaQueries("xl")`
          font-size: 35px;
        `}
        ${mediaQueries("lg")`
          font-size: 30px;
        `}
        ${mediaQueries("md")`
          font-size: 25px;
        `}
         ${mediaQueries("sm")`
          font-size: 24px;
        `}
      }
      p{
        /* font-family: ${theme.font.fontFamilyPoppins}; */
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 20px;
        `}
        ${mediaQueries("xl")`
          font-size: 18px;
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
    .why-people-box-wrapper{
      background: #F2F6F9;
      padding: 12px;
      border-radius: 20px;
      .why-people-choose-img-div{
        width: 100%;
        height: 600px;
        overflow: hidden;
        border-radius: 20px;
        &.why-service-choose-img-div{
          height: 550px;
          ${mediaQueries("lg")`
            height: 500px;
          `}
          ${mediaQueries("md")`
            height: 450px;
          `}
          ${mediaQueries("sm")`
            height: auto;
          `}
        }
        ${mediaQueries("xl")`
          height: 550px;
        `}
        ${mediaQueries("lg")`
          height: 500px;
        `}
        ${mediaQueries("md")`
          height: 450px;
        `}
        ${mediaQueries("sm")`
          height: auto;
        `}
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          ${mediaQueries("sm")`
            object-fit: contain;
          `}
        }
      }
      .why-people-choose-detail-div{
        padding: 36px 0 0;
        .why-people-choose-detail-header-div{
          margin-bottom: 35px;
          h3{
            font-family: ${theme.font.fontFamilyPlayFair};
            font-weight: 800;
            font-size: 45px;
            line-height: 100%;
            color: ${theme.color.logintitlecolor};
            margin-bottom: 16px;
            ${mediaQueries("xxl")`
              font-size: 40px;
            `}
            ${mediaQueries("xl")`
              font-size: 35px;
            `}
            ${mediaQueries("lg")`
              font-size: 30px;
            `}
            ${mediaQueries("md")`
              font-size: 25px;
            `}
            ${mediaQueries("sm")`
              font-size: 24px;
            `}
          }
          p{
            font-weight: 400;
            font-size: 22px;
            line-height: 100%;
            color: ${theme.color.logintitlecolor};
            ${mediaQueries("xxl")`
              font-size: 20px;
            `}
            ${mediaQueries("xl")`
              font-size: 18px;
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
        .why-people-list-display-wrapper{
          display: flex;
          margin-bottom: 18px;
          ${mediaQueries("md")`
            margin-bottom: 14px;
          `}
          ${mediaQueries("sm")`
            margin-bottom: 10px;
          `}
          &:last-child{
            margin-bottom: 0;
          }
          .checkmark-img-div{
            width: 18px;
            height: auto;
            overflow: hidden;
            margin-right: 15px;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .why-list-detail-div{
            h4{
              font-family: ${theme.font.fontFamilyPlayFair};
              font-weight: 800;
              font-size: 20px;
              line-height: 100%;
              text-transform: capitalize;
              color: ${theme.color.secondary};
              margin-bottom: 4px;
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
            p{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 300;
              font-size: 16px;
              line-height: 32px;
              color: #295086cc;
              max-width: 535px;
              ${mediaQueries("md")`
                font-size: 15px;
                line-height: 28px;
              `}
              ${mediaQueries("sm")`
                font-size: 14px;
                line-height: 25px;
              `}
            }
          }
        }
      }
    }
  }
`;

export const FaqDisplayWrapper = styled.div`
  .faq-inner-div{
    max-width: 1210px;
    margin: 0 auto;
    padding: 50px 0 60px;
    h3{
      font-family: ${theme.font.fontFamilyPlayFair};
      font-weight: 800;
      font-size: 45px;
      line-height: 100%;
      text-align: center;
      color: ${theme.color.logintitlecolor};
      margin-bottom: 30px;
      ${mediaQueries("xxl")`
        font-size: 40px;
      `}
      ${mediaQueries("xl")`
        font-size: 35px;
      `}
      ${mediaQueries("lg")`
        font-size: 30px;
      `}
      ${mediaQueries("md")`
        font-size: 25px;
      `}
        ${mediaQueries("sm")`
        font-size: 24px;
      `}
    }
    .accordion{
      border: none;
      .accordion-item{
        border: none;
        margin-bottom: 10px;
        &:has(.accordion-button:not(.collapsed)) {
          background: #DFECF9;
          border: 1px solid #007BFF;
          border-radius: 8px;
        }
        .accordion-header{
          .accordion-button{
            background: #FFFFFF;
            border: 1px solid #EAEBEC;
            border-radius: 8px;
            /* font-family: ${theme.font.fontFamilyPoppins}; */
            font-weight: 500;
            font-size: 18px;
            line-height: 30px;
            text-transform: capitalize;
            color: ${theme.color.secondary};
            padding: 15px 45px 15px;
            box-shadow: none !important;
            ${mediaQueries("lg")`
               padding: 15px 40px 15px;
            `}
            ${mediaQueries("md")`
               padding: 15px 35px 15px;
            `}
            ${mediaQueries("lg")`
              font-size: 17px;
               padding: 15px 30px 15px;
            `}
            ${mediaQueries("md")`
              font-size: 16px;
              padding: 15px 25px 15px;
            `}
             ${mediaQueries("sm")`
              font-size: 16px;
              padding: 15px;
            `}
            &::after{
              display: none;
            }
            &:focus{
              box-shadow: none;
              outline: none;
            }
            &:not(.collapsed){
              background: #DFECF9;
              padding-bottom: 8px;
            }
          }
        }
        .accordion-body{
          /* background: #DFECF9;
          border: 1px solid #007BFF; */
          padding: 0 45px 20px;
          border-radius: 8px;
          ${mediaQueries("lg")`
              padding: 15px 40px 20px;
          `}
          ${mediaQueries("md")`
              padding: 15px 35px 20px;
          `}
          ${mediaQueries("lg")`
            padding: 15px 30px 20px;
          `}
          ${mediaQueries("md")`
            padding: 15px 25px 20px;
          `}
          ${mediaQueries("sm")`
            padding: 0 15px 15px;
          `}
          .faq-accordion-body-div{
            p{
              /* font-family: ${theme.font.fontFamilyPoppins}; */
              font-weight: 300;
              font-size: 16px;
              line-height: 32px;
              color: #295086cc;
            }
          }
        }
      }
    }
    .faq-button-wrapper{
      background: #004D87;
      font-weight: 400;
      font-size: 14px;
      line-height: 100%;
      text-align: center;
      color: #FFFFFF;
      margin-top: 15px;
    }
  }
`;

export const TopReviewSpasNearSection = styled.div`
  max-width: 1210px;
  margin: auto;
  .top-review-inner-div{
    &.reviews-page-top-view-div{
      padding-top: 60px;
      ${mediaQueries("md")`
        padding-top: 50px;
      `}
      ${mediaQueries("sm")`
        padding-top: 40px;
      `}
    }
    .top-review-header-div{
      margin-bottom: 45px;
      ${mediaQueries("sm")`
        margin-bottom: 25px;
      `}
      h3{
        font-family: ${theme.font.fontFamilyPlayFair};
        font-weight: 800;
        font-size: 45px;
        line-height: 100%;
        text-align: center;
        margin-bottom: 15px;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 40px;
        `}
        ${mediaQueries("xl")`
          font-size: 35px;
        `}
        ${mediaQueries("lg")`
          font-size: 30px;
        `}
        ${mediaQueries("md")`
          font-size: 25px;
        `}
         ${mediaQueries("sm")`
          font-size: 24px;
        `}
      }
      p{
        /* font-family: ${theme.font.fontFamilyPoppins}; */
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        text-align: center;
        color: ${theme.color.logintitlecolor};
        ${mediaQueries("xxl")`
          font-size: 20px;
        `}
        ${mediaQueries("xl")`
          font-size: 18px;
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
    .top-review-desktop-view-div{
      &.review-page-desktop-view-wrapper{
        padding-bottom: 50px;
      }
      ${mediaQueries("sm")`
        display: none;
      `}
      .review-box-wrapper{
        border-radius: 19px;
        background: #F2F6F9;
        padding: 25px 10px 10px 10px;
        margin-bottom: 20px;
        height: calc(100% - 20px);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .review-box-inner-top-div{
          padding-left: 20px;
          max-width: 335px;
          .star-img-div{
            width: 100%;
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
          .user-review-text{
            color: #295086;
            font-family: ${theme.font.fontFamilyPlayFair};
            font-size: 24px;
            font-weight: 500;
            line-height: 30px;
            margin-bottom: 15px;
          }
          .user-review-para-text{
            color: #295086cc;
            font-size: 14px;
            font-weight: 300;
            line-height: 26px;
            margin-bottom: 18px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            &.review-page-paragraph-custom-wrapper{
              display: block;
              margin-bottom: 12px;
            }
          }
          .user-display-div{
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            .user-img-div{
              width: 50px;
              height: 50px;
              overflow: hidden;
              border-radius: 1000px;
              background: #D9D9D9;
              margin-right: 14px;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }
            }
            .user-detail-div{
              h6{
                color: #295086;
                font-size: 16px;
                font-weight: 500;
                line-height: 22px;
              }
              p{
                color: #295086;
                font-size: 14px;
                font-weight: 300;
                line-height: 22px;
              }
            }
          }
        }
        .user-content-bottom-wrapper{
          .user-display-div{
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            padding-left: 20px;
            .user-img-div{
              width: 50px;
              height: 50px;
              overflow: hidden;
              border-radius: 1000px;
              background: #D9D9D9;
              margin-right: 14px;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }
            }
            .user-detail-div{
              h6{
                color: #295086;
                font-size: 16px;
                font-weight: 500;
                line-height: 22px;
              }
              p{
                color: #295086;
                font-size: 14px;
                font-weight: 300;
                line-height: 22px;
              }
            }
          }
        }
        .user-display-box-wrapper{
          border-radius: 19px;
          background: #FFF;
          padding: 7px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .user-left-box{
            flex: 1;
            padding-left: 15px;
            h6{
              color: #295086;
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              margin-bottom: 4px;
            }
            .review-text{
              display: flex;
              align-items: center;
              color: #295086;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 22px;
              margin-bottom: 4px;
              .star-icon{
                margin: -3px 5px 0;
                display: block;
                width: 14px;
                height: auto;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                }
              }
              .total-reviews-text{
                color: #295086;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
              }
            }
            .place-text{
              color: #295086;
              font-size: 14px;
              font-weight: 500;
              line-height: 22px;
            }
          }
          .user-right-box{
            .spa-profile-img{
              width: 85px;
              height: 90px;
              overflow: hidden;
              border-radius: 9px;
              background: #D9D9D9;
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
      .masonry-grid{
        columns: 3;
        column-gap: 15px;
        ${mediaQueries("lg")`
          columns: 2;
        `}
        .masonry-item{
          /* display: inline-block;
          width: 100%;
          margin-bottom: 15px; */
          break-inside: avoid;
        }
      }
    }
    .top-review-mobile-view-div{
      display: none;
      ${mediaQueries("sm")`
        display: block;
      `}
      &.review-page-slider-wrapper{
        margin-bottom: 40px;
      }
      .swiper{
        .swiper-wrapper{
          .swiper-slide{
            height: auto;
            .review-box-wrapper{
              border-radius: 19px;
              background: #F2F6F9;
              padding: 25px 10px 10px 10px;
              margin-bottom: 0;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              height: auto;
              .review-box-inner-top-div{
                padding-left: 20px;
                max-width: 335px;
                .star-img-div{
                  width: 100%;
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
                .user-review-text{
                  color: #295086;
                  font-family: ${theme.font.fontFamilyPlayFair};
                  font-size: 20px;
                  font-weight: 500;
                  line-height: 30px;
                  margin-bottom: 15px;
                }
                .user-review-para-text{
                  color: #295086cc;
                  font-size: 14px;
                  font-weight: 300;
                  line-height: 26px;
                  margin-bottom: 18px;
                  /* display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis; */
                }
                .user-display-div{
                  display: flex;
                  align-items: center;
                  margin-bottom: 25px;
                  .user-img-div{
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    border-radius: 1000px;
                    background: #D9D9D9;
                    margin-right: 14px;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      object-position: center;
                    }
                  }
                  .user-detail-div{
                    h6{
                      color: #295086;
                      font-size: 16px;
                      font-weight: 500;
                      line-height: 22px;
                    }
                    p{
                      color: #295086;
                      font-size: 14px;
                      font-weight: 300;
                      line-height: 22px;
                    }
                  }
                }
              }
              .user-content-bottom-wrapper{
                .user-display-div{
                  display: flex;
                  align-items: center;
                  margin-bottom: 25px;
                  padding-left: 20px;
                  .user-img-div{
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    border-radius: 1000px;
                    background: #D9D9D9;
                    margin-right: 14px;
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      object-position: center;
                    }
                  }
                  .user-detail-div{
                    h6{
                      color: #295086;
                      font-size: 16px;
                      font-weight: 500;
                      line-height: 22px;
                    }
                    p{
                      color: #295086;
                      font-size: 14px;
                      font-weight: 300;
                      line-height: 22px;
                    }
                  }
                }
              }
              .user-display-box-wrapper{
                border-radius: 19px;
                background: #FFF;
                padding: 7px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                .user-left-box{
                  flex: 1;
                  padding-left: 15px;
                  h6{
                    color: #295086;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 22px;
                    margin-bottom: 4px;
                  }
                  .review-text{
                    display: flex;
                    align-items: center;
                    color: #295086;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 22px;
                    margin-bottom: 4px;
                    .star-icon{
                      margin: -3px 5px 0;
                      display: block;
                      width: 14px;
                      height: auto;
                      overflow: hidden;
                      img{
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-position: center;
                      }
                    }
                    .total-reviews-text{
                      color: #295086;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 22px;
                    }
                  }
                  .place-text{
                    color: #295086;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 22px;
                  }
                }
                .user-right-box{
                  .spa-profile-img{
                    width: 85px;
                    height: 90px;
                    overflow: hidden;
                    border-radius: 9px;
                    background: #D9D9D9;
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
          }
        }
      }
    }
    .see-all-btn-div{
      margin: 40px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      ${mediaQueries("sm")`
        margin: 16px 0 0;
      `}
      .see-all-review-btn{
        background: #295086;
        color: #FFF;
        font-size: 14px;
        font-weight: 600;
        line-height: 30px;
        text-transform: uppercase;
        max-width: 295px;
        max-height: 50px;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${mediaQueries("sm")`
          max-width: 100%;
          width: 100%;
        `}
      }
    }
  }
`;

export const SitbackGetStartedWrapper = styled.div`
  background: #FFFFFF;
  .sitback-get-started-inner-div{
    padding: 35px 0 45px;
    .sitback-get-started-inner-div-wrapper{
      display: flex;
      ${mediaQueries("lg")`
        flex-direction: column;
      `}
      .sitback-get-left-div{
        width: 65%;
        ${mediaQueries("lg")`
          width: 100%;
        `}
        .sitback-welcome-div{
          border-radius: 8px;
          border: 1px solid rgba(0, 123, 255, 0.40);
          background: #F5FBFF;
          box-shadow: 0 8px 7px 0 rgba(41, 80, 134, 0.12);
          padding: 16px;
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          ${mediaQueries("xl")`
            padding: 14px;
          `}
          ${mediaQueries("lg")`
            padding: 12px;
          `}
          ${mediaQueries("md")`
            padding: 10px;
          `}
          ${mediaQueries("sm")`
            flex-direction: column;
            align-items: flex-start;
          `}
          .clearfix{
            ${mediaQueries("sm")`
              width: 100%;
            `}
          }
          .sitback-welcome-video-div{
            width: 235px;
            height: 135px;
            border-radius: 8px;
            background: #FFF;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            ${mediaQueries("sm")`
              width: 100%;
              height: 120px;
              margin-right: 0;
              margin-bottom: 10px;
            `}
            video{
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }
            button{
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              i{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 38px;
                height: 38px;
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
          .sitback-welcome-text-div{
            h3{
              color: #295086;
              font-size: 18px;
              font-weight: 600;
              line-height: normal;
              margin-bottom: 8px;
            }
            p{
              color: #295086;
              font-size: 12px;
              font-weight: 300;
              line-height: 23px;
            }
          }
        }
          .sitback-get-explore-div{
            h4{
              color: #295086;
              font-size: 16px;
              font-weight: 600;
              line-height: normal;
              text-transform: capitalize;
              margin-bottom: 15px;
            }
              .sitback-get-explore-tab-wrapper{
                .nav{
                  border-radius: 8px 8px 0 0;
                  border: 1px solid #EAEBEC;
                  background: #295086;
                  padding: 15px 20px;
                  margin-bottom: 0 !important;
                  flex-wrap: nowrap;
                  overflow-x: auto;
                  align-items: center;
                  .nav-item{
                  margin-right: 15px;
                  &:last-child{
                    margin-right: 0;
                  }
                  .nav-link{
                    padding: 0;
                    border: none;
                      min-width: fit-content;
                    .nav-title-div{
                      display: flex;
                      align-items: center;
                      i{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 15px;
                        height: 15px;
                        overflow: hidden;
                        margin-right: 8px;
                        img{
                          width: 100%;
                          height: 100%;
                          object-fit: contain;
                          object-position: center;
                        }
                      }
                        opacity: 0.7;
                        p{
                        color: #FFF;
                        font-size: 13px;
                        font-weight: 500;
                        line-height: normal;
                        text-transform: capitalize;
                        /* min-width: 80px; */
                        text-align: left;
                        }
                    }
                    &.active{
                      background: transparent;
                      border: none;
                      .nav-title-div{
                      opacity: 1;
                      }
                    }
                      &:hover{
                        border: none;
                      }
                    }
                  }
                }
                .tab-content{
                  .sitback-get-explore-tab-content-div{
                    padding: 0;
                    .nav{
                      border-radius: 0 0 0 8px;
                      border: 1px solid #EAEBEC;
                      background: #F5FBFF;
                      box-shadow: 7px 0 23px 0 rgba(0, 0, 0, 0.09);
                      padding: 14px 8px 14px 12px;
                      height: 100%;
                      align-items: flex-start;
                      .nav-title-wrapper{
                      padding: 0 12px;
                        h5{
                          color: #295086;
                          font-size: 14px;
                          font-weight: 600;
                          line-height: normal;
                          text-transform: capitalize;
                          margin-bottom: 12px;
                          display: flex;
                          align-items: center;
                          i{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 15px;
                            height: 15px;
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
                      }
                      .nav-item{
                        padding: 0;
                        border: none;
                        margin-right: 0;
                        width: 100%;
                        .nav-link{
                          color: #295086;
                          font-size: 12px;
                          font-weight: 400;
                          line-height: 20px;
                          text-transform: capitalize;
                          border: none;
                          padding: 12px 12px;
                          &.active{
                            border-radius: 4px;
                            background: #DFECF9;
                            font-weight: 500;
                          }
                            &:hover{
                              border: none;
                            }
                          }
                        }
                      }
                    }
                    .tab-content{
                      padding: 16px 0 16px;
                      .explore-inner-tab-content-div{
                        .explore-video-text-div{
                        margin-bottom: 20px;
                          h5{
                            color: #295086;
                            font-size: 14px;
                            font-weight: 600;
                            line-height: normal;
                            text-transform: capitalize;
                          }
                          p{
                            color: #295086;
                            font-size: 12px;
                            font-weight: 300;
                            line-height: 23px;
                            margin-bottom: 10px;
                          }
                            button{
                            color: #004D87;
                            text-align: center;
                            font-size: 12px;
                            font-weight: 500;
                            line-height: normal;
                            padding: 10px 15px;
                            border-radius: 100px;
                            border: 1px solid #004d8733;
                            background: transparent;
                            }
                        }
                      }
                        .sitback-explore-video-div{
                            width: 100%;
                            height: 325px;
                            border-radius: 4px;
                            background: #EDEDED;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .sitback-explore-video-wrap{
                              position: relative;
                              width: 100%;
                              height: 100%;
                              border-radius: 8px;
                              overflow: hidden;
                              background: #EDEDED;
                              video{
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                object-position: center;
                                border-radius: 5px;
                                display: block;
                              }
                            }
                            .sitback-explore-video-play-overlay{
                              position: absolute;
                              inset: 0;
                              z-index: 2;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-radius: 5px;
                              background: #EDEDED;
                              cursor: pointer;
                              &.has-poster{
                                background: transparent;
                              }
                              &:focus-visible{
                                outline: 2px solid #295086;
                                outline-offset: 2px;
                              }
                            }
                            .sitback-explore-play-btn-circle{
                              width: 72px;
                              height: 72px;
                              border-radius: 50%;
                              background: #295086;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              box-shadow: 0 4px 14px rgba(41, 80, 134, 0.35);
                              padding-left: 4px;
                            }
                            > button{
                              background: transparent;
                              border: none;
                              cursor: pointer;
                              padding: 0;
                              margin: 0;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              i{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 38px;
                                height: 38px;
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
    .sitback-get-right-div{
      flex: 1;
      margin-left: 30px;
      ${mediaQueries("lg")`
        margin-left: 0;
        margin-top: 20px;
      `}
      .sitback-get-right-top-div{
        border-radius: 8px;
        border: 1px solid #EAEBEC;
        background: #FFF;
        .sitback-get-profile-div{
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #EAEBEC;
          .sitback-get-left-profile{
            display: flex;
            align-items: center;
              .profile-content-div{
              h6{
                color: #295086;
                font-size: 16px;
                font-weight: 500;
                line-height: 23px;
              }
              p{
                color: #295086;
                font-size: 12px;
                font-weight: 400;
                line-height: 23px;
                text-transform: capitalize;
              }
            }
            .sitback-profile-div{
              border-radius: 221.5px;
              width: 50px;
              height: 50px;
              overflow: hidden;
              margin-right: 15px;
              border: 1px solid #295086;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }
            }
          }
          .sitback-get-right-profile{
              button{
                border-radius: 100px;
                border: 1px solid #004D87;
                background: #004D87;
                padding: 10px 15px;
                color: #FFF;
                text-align: center;
                font-size: 12px;
                font-weight: 500;
                line-height: normal;
              }
            }
          }
        }
        .sitback-helpful-div{
          padding: 18px;
          .sitback-helpful-title{
            color: #295086;
            font-size: 14px;
            font-weight: 600;
            line-height: normal;
            text-transform: capitalize;
            margin-bottom: 12px;
          }
            .sitback-helpful-content-div{
              display: flex;
              flex-wrap: wrap;
              margin: -5px;
              .sitback-boxes-wrapper{
                padding: 5px;
                max-width: 50%;
                flex-basis: 50%;
                .sitback-inner-box-div{
                  border-radius: 8px;
                  background: #F5FBFF;
                  padding: 24px 20px 20px 20px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  .sitback-box-icon-div{
                    width: 20px;
                    height: auto;
                    overflow: hidden;
                    ${mediaQueries("sm")`
                      margin-bottom: 10px;
                    `}
                    img{
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      object-position: center;
                    }
                  }
                  .sitback-box-text-div{
                    p{
                      color: #295086;
                      text-align: center;
                      font-size: 12px;
                      font-weight: 500;
                      line-height: 40px;
                      text-transform: capitalize;
                      ${mediaQueries("xl")`
                          line-height: 30px;
                      `}
                      ${mediaQueries("lg")`
                          line-height: 25px;
                      `}
                      ${mediaQueries("md")`
                          line-height: 20px;
                      `}
                    }
                  }
                }
              }
            }
        }
      }
    .sitback-get-right-bottom-div{
      border-radius: 8px;
      background: #F5FBFF;
      padding: 25px 12px 12px 12px;
      margin-top: 15px;
      .sitback-title-right-top-div{
        margin-bottom: 23px;
        h5{
          color: #295086;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          line-height: normal;
        }
        p{
          color: #295086;
          text-align: center;
          font-size: 12px;
          font-weight: 300;
          line-height: 23px;
        }
      }
      .personalize-img-div{
        width: 100%;
        height: 250px;
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
          button{
            border-radius: 100px;
            border: 1px solid #FFF;
            background: #FFF;
            color: #004D87;
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            line-height: normal;
            padding: 10px 15px;
            position: absolute;
            bottom: 24px;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 2;
            max-width: 125px;
          }
            &::after{
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(180deg, rgba(41, 80, 134, 0.00) 59.25%, rgba(41, 80, 134, 0.50) 100%);
              z-index: 1;
            }
      }
    }
  }
`;

"use client";
// import styled from "styled-components";
import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from '../global/theme';
export const BlogLayoutWrapper = styled.div`
    padding: 40px 0;
    min-height: calc(100vh - 180px);
    background: white;
    position: relative;
    overflow: hidden;
    &.overflow-remova-div{
        overflow: clip;
    }
    &.blog-detail-updated-layout-wrapper{
      .container-fluid{
        max-width: 1410px;
      }
    }
    &.blog-updated-wrapper{
      padding: 50px 0 60px;
      ${mediaQueries("sm")`
          padding: 30px 20px 50px;
      `}
      .container-fluid{
        max-width: 1410px;
      }
      &.faq-page-wrapper{
        padding: 0;
        .faq-page-inner-div{
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
      }
    }
    ${mediaQueries("xl")`
        min-height: calc(100vh - 170px);
    `}
    ${mediaQueries("lg")`
        min-height: calc(100vh - 145px);
    `}
    ${mediaQueries("md")`
        min-height: calc(100vh - 141px);
    `}
    ${mediaQueries("sm")`
        min-height: calc(100vh - 127px);
    `}
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
                background-color:transparent;
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
    .clud-img-div{
        width: 590px;
        height: 225px;
        overflow: hidden;
        position: absolute;
        left: -360px;
        z-index: 0;
        bottom: 70px;
        opacity: 0.4;
        ${mediaQueries("lg")`
            display: none;
        `}
        &.right-side-wrapper{
            top: 600px;
            right: -360px;
            left: auto;
        }
    }
    .blog-inner-layout-wrapper{
        .date-text{
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #666666;
            margin-bottom: 14px;
            ${mediaQueries("lg")`
                font-size: 15px;
                line-height: 22px;
            `}
            ${mediaQueries("md")`
                font-size: 14px;
                line-height: 20px;
            `}
        }
        h2{
            text-align: start;
            color: #333333;
            max-width: 100%;
            width: 100%;
        }
        p{
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 32px;
            color: #666666;
            ${mediaQueries("lg")`
                font-size: 15px;
                line-height: 27px;
            `}
            ${mediaQueries("md")`
                font-size: 14px;
                line-height: 26px;
            `}
        }
    }
    .remember-section{
        margin: 60px 0;
        h4{
            font-style: italic;
            font-weight: 600;
            font-size: 32px;
            line-height: 43px;
            text-align: start;
            color: #000000;
            ${mediaQueries("xl")`
                font-size: 28px;
                line-height: 36px;
            `}
            ${mediaQueries("lg")`
                font-size: 24px;
                line-height: 32px;
            `}
            ${mediaQueries("md")`
                font-size: 20px;
                line-height: 28px;
            `}
            ${mediaQueries("sm")`
                font-size: 18px;
                line-height: 28px;
            `}
        }
    }
    .going-section{
       margin-top: 15px;
        margin-bottom: 45px;
        iframe{
            width: 100%;
            min-height: 300px;
        }
        h5 {
          margin-top: 5px;
          font-weight: 600;
          font-size: 12px;
        }
        q {
          margin-bottom: 1rem;
          display: inline-block;
        }
        /* h5{
            font-style: normal;
            font-weight: 700;
            font-size: 42px;
            line-height: 58px;
            color: #333333;
            margin-bottom: 15px;
            ${mediaQueries("xl")`
                font-size: 36px;
                line-height: 42px;
            `}
            ${mediaQueries("lg")`
                font-size: 32px;
                line-height: 36px;
            `}
            ${mediaQueries("md")`
                font-size: 28px;
                line-height: 32px;
            `}
            ${mediaQueries("sm")`
                font-size: 24px;
                line-height: 30px;
            `}
        } */
        p{
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: unset;
            color: #666666;
            margin-bottom: 1rem;
            ${mediaQueries("lg")`
                font-size: 15px;
            `}
            ${mediaQueries("md")`
                font-size: 14px;
            `}
        }
        ul {
        list-style-type: unset;
        padding-left: 30px;
        margin-top: 10px;
        li {

            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 32px;
            color: #666666;
            //margin-bottom: 35px;
            ${mediaQueries("lg")`
                font-size: 15px;
                line-height: 27px;
            `}
            ${mediaQueries("md")`
                font-size: 14px;
                line-height: 26px;
            `}

        }
        }
        pre{
          display: block;
          padding: 9.5px;
          margin: 0 0 10px;
          font-size: 13px;
          line-height: 1.42857143;
          color: #333;
          word-break: break-all;
          word-wrap: break-word;
          background-color: #eff2f3;
          border: 1px solid #D1DADE;
          border-radius: 2px;
        }
        *{
            font-family: ${theme.font.fontFamilyPoppins}, sans-serif !important;
        }
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 27px;
        p, span{
            color: #333333;
        }
        span, p{
            color: #333333;
        }
        * {
            font-size: 16px !important;
            font-weight: normal;
            line-height: 26px;
        }
        a *{
            color: #333333 !important;
            text-decoration: underline !important;
        }
        h1 *{
            font-size: 35px !important;
            font-weight: 600 !important;
            line-height: 42px;
            ${mediaQueries("xl")`
                font-size: 32px !important;
                line-height: 35px;
            `}
            ${mediaQueries("lg")`
                font-size: 28px !important;
                line-height: 30px;
            `}
            ${mediaQueries("md")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("sm")`
                font-size: 21px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xs")`
                font-size: 18px !important;
                line-height: 26px;
            `}
        }
        h2 *{
            font-size: 32px !important;
            font-weight: 600 !important;
            line-height: 35px;
            ${mediaQueries("xl")`
                font-size: 28px !important;
                line-height: 30px;
            `}
            ${mediaQueries("xl")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 26px;
            `}
        }
        h3 *{
            font-size: 28px !important;
            font-weight: 600 !important;
            line-height: 30px;
            ${mediaQueries("xl")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h4 *{
            font-size: 24px !important;
            font-weight: 600 !important;
            line-height: 30px;
            ${mediaQueries("xl")`
                font-size: 21px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 19px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h5 *{
            font-size: 21px !important;
            font-weight: 600 !important;
            line-height: 28px;
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 19px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h6 *{
            font-size: 18px !important;
            font-weight: 600 !important;
            line-height: 28px;
            ${mediaQueries("xl")`
                font-size: 17px !important;
                line-height: 26px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 26px;
            `}
        }
        h1{
            font-size: 35px !important;
            font-weight: 600 !important;
            line-height: 42px;
            ${mediaQueries("xl")`
                font-size: 32px !important;
                line-height: 35px;
            `}
            ${mediaQueries("xl")`
                font-size: 28px !important;
                line-height: 30px;
            `}
            ${mediaQueries("xl")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 21px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 26px;
            `}
        }
        h2{
            font-size: 32px !important;
            font-weight: 600 !important;
            line-height: 35px;
            ${mediaQueries("xl")`
                font-size: 28px !important;
                line-height: 30px;
            `}
            ${mediaQueries("xl")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 26px;
            `}
        }
        h3{
            font-size: 28px !important;
            font-weight: 600 !important;
            line-height: 30px;
            ${mediaQueries("xl")`
                font-size: 24px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h4{
            font-size: 24px !important;
            font-weight: 600 !important;
            line-height: 30px;
            ${mediaQueries("xl")`
                font-size: 21px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 19px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h5{
            font-size: 21px !important;
            font-weight: 600 !important;
            line-height: 28px;
            ${mediaQueries("xl")`
                font-size: 20px !important;
                line-height: 28px;
            `}
            ${mediaQueries("xl")`
                font-size: 19px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 18px !important;
                line-height: 27px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 28px;
            `}
        }
        h6{
            font-size: 18px !important;
            font-weight: 600 !important;
            line-height: 28px;
            ${mediaQueries("xl")`
                font-size: 17px !important;
                line-height: 26px;
            `}
            ${mediaQueries("xl")`
                font-size: 16px !important;
                line-height: 26px;
            `}
        }
        b{
            font-weight: 600 !important;
            *{
                font-weight: 600 !important;
            }
        }
    }
    .tags-block-wrapper{
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #CCCCCC;
        h6{
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            color: #333333;
            margin-bottom: 12px;
            ${mediaQueries("md")`
                font-size: 20px;
                line-height: 28px;
            `}
            ${mediaQueries("sm")`
                font-size: 18px;
                line-height: 28px;
            `}
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            margin-left: -6px;
            li{
                background: #95CCD5;
                border-radius: 4px;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: normal;
                color: #FFFFFF;
                padding: 12px;
                transition: all 0.3s ease-in-out;
                margin: 6px;
                min-width: 130px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    opacity: 0.8;
                }
            }
        }
    }
    .container{
        max-width: 1675px;
        ${mediaQueries("xxl")`
            max-width: 1260px;
        `}
        ${mediaQueries("xl")`
            max-width: 1200px;
        `}
    }
    .our-blogs-header{
        margin-bottom: 70px;
        h2{
            margin-bottom: 0;
            color: #000;
        }
        ${mediaQueries("xl")`
            margin-bottom: 60px;
        `}
        ${mediaQueries("lg")`
            margin-bottom: 40px;
        `}
        ${mediaQueries("md")`
            margin-bottom: 40px;
        `}
        ${mediaQueries("sm")`
            margin-bottom: 25px;
        `}
    }
    .btns-footer-wrapperdiv{
        display: flex;
        justify-content: center;
        padding-top: 30px;
        margin-bottom: 30px;
        a{
            width: auto;
            min-width: 140px;
            padding: 15px;
            color: #D7D7D7;
            border-radius: 100px;
            text-align: center;
            font-size: 15px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            border: 1px solid #295086;
            background: #295086;
            box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
            margin: 0 6px;
        }
    }
    .book-appointment-box-wrapper{
        background: #F2F1E8;
        border-radius: 10px;
        padding: 18px;
        position: sticky;
        top: 120px;
        min-height: 580px;
        display: flex;
        flex-direction: column;
        // justify-content: space-evenly;
        ${mediaQueries("xl")`
            min-height: 500px;
        `}
        ${mediaQueries("lg")`
            min-height: auto;
        `}
        .sitback-logo{
            width: 125px;
            height: 45px;
            margin: 0 auto;
            margin-bottom: 21px;
        }
        h4{
            font-style: normal;
            font-weight: 800;
            font-size: 24px;
            line-height: 32px;
            text-align: center;
            color: ${theme.color.secondary};
            // max-width: 260px;
            margin: 0 auto 30px;
            ${mediaQueries("xl")`
                font-size: 26px;
                line-height: 30px;
            `}
            ${mediaQueries("lg")`
                font-size: 22px;
                line-height: 30px;
            `}
            ${mediaQueries("md")`
                font-size: 20px;
                line-height: 27px;
                padding-bottom: 12px;
            `}
            ${mediaQueries("sm")`
                font-size: 16px;
                line-height: 26px;
            `}
        }
        .servicesgrid-row{
            max-width: 290px;
            margin: 0 auto;
            width: 100%;
        }
        .grid-row{
            margin: 0 -12px;
            display: flex;
            flex-wrap: wrap;
            .grid-col{
                flex: 0 0 50%;
                padding: 0 12px;
            }
        }
        .services-box-wrapper{
            margin-bottom: 15px;
          .box-icons{
              width: 108px;
              height: 108px;
              background: #fff;
              border-radius: 10px;
              padding: 12px;
              margin: auto;
              margin-bottom: 12px;
              /* cursor: pointer; */
          }
          p{
              font-style: normal;
              font-weight: 600;
              font-size: 13px;
              line-height: 20px;
              text-align: center;
              color: ${theme.color.secondary};
              /* cursor: pointer; */
          }

        }
        .services-btn{
            margin-top: 20px;
            display: flex;
            button{
                padding: 15px;
                background: #295086;
                border-color: #295086;
                color: #EBE3E3;
                width: 85%;
                margin: auto;
            }
        }
    }
    .blog-detail-layout-wrapper{
        display: flex;
        ${mediaQueries("lg")`
            flex-direction: column;
        `}
        .blog-detail-section{
            flex: 1;
            margin-right: 50px;
            ${mediaQueries("lg")`
                margin-right: 0px;
            `}
        }
        .book-appointment{
            width: 400px;
            ${mediaQueries("lg")`
                max-width: 400px;
                width: 100%;
            `}
        }
    }
    .blog-detail-page-updated-content-div{
      /* padding: 0 20px; */
      .blog-detail-layout-wrapper{
        .blog-detail-section{
          flex: 1 1 0%;
          margin-right: 30px;
          ${mediaQueries("lg")`
              margin-right: 0;
            `}
          .blog-detail-banner-div{
            margin-bottom: 25px;
            ${mediaQueries("xxl")`
              height: 495px;
            `}
            ${mediaQueries("sm")`
              height: 210px;
            `}
          }
          .blog-inner-layout-wrapper{
            .date-text{
              background: #f2f6f9b3;
              color: ${theme.color.secondary};
              font-size: 12px;
              font-weight: 500;
              line-height: 14px;
              padding: 8px 12px;
              max-width: fit-content;
              border-radius: 45px;
              margin-bottom: 16px;
              ${mediaQueries("sm")`
                  font-size: 10px;
              `}
            }
            .blog-detail-title-text{
              color: ${theme.color.logintitlecolor};
              font-size: 34px;
              font-weight: 600;
              line-height: 45px;
              margin-bottom: 16px;
              ${mediaQueries("xl")`
                font-size: 32px;
                line-height: 40px;
              `}
              ${mediaQueries("lg")`
                font-size: 28px;
                line-height: 38px;
              `}
              ${mediaQueries("md")`
                font-size: 26px;
                line-height: 33px;
              `}
              ${mediaQueries("sm")`
                font-size: 24px;
                line-height: 31px;
              `}
            }
            .truncated-summary{
              color: #004d87cc;
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
          }
          .going-section{
            iframe{
                width: 100%;
                min-height: 300px;
            }
            h5 {
              margin-top: 5px;
              font-weight: 600;
              font-size: 12px;
            }
            q {
              margin-bottom: 1rem;
              display: inline-block;
            }
            p{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: unset;
                color: #004D87;
                margin-bottom: 1rem;
                ${mediaQueries("lg")`
                    font-size: 15px;
                `}
                ${mediaQueries("md")`
                    font-size: 14px;
                `}
            }
            ul {
            list-style-type: unset;
            padding-left: 30px;
            margin-top: 10px;
            li {

                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 32px;
                color: #004D87;
                //margin-bottom: 35px;
                ${mediaQueries("lg")`
                    font-size: 15px;
                    line-height: 27px;
                `}
                ${mediaQueries("md")`
                    font-size: 14px;
                    line-height: 26px;
                `}

            }
            }
            pre{
              display: block;
              padding: 9.5px;
              margin: 0 0 10px;
              font-size: 13px;
              line-height: 1.42857143;
              color: #004D87;
              word-break: break-all;
              word-wrap: break-word;
              background-color: #eff2f3;
              border: 1px solid #D1DADE;
              border-radius: 2px;
            }
            *{
                font-family: ${theme.font.fontFamilyPoppins}, sans-serif !important;
                color: #004D87;
            }
            font-size: 15px;
            font-style: normal;
            font-weight: 500;
            line-height: 27px;
            p, span{
                color: #004D87;
            }
            span, p{
                color: #004D87;
            }
            /* * {
                font-size: 16px !important;
                font-weight: normal;
                line-height: 26px;
            } */
            a *{
                color: #004D87 !important;
                text-decoration: underline !important;
            }
          }
        }
        .book-appointment{
          .book-appointment-box-wrapper{
            border-radius: 16px;
            border: 1px solid #D8D8D8;
            background: ${theme.color.logintitlecolor};
            min-height: 440px;
            padding: 20px 15px;
            &::before{
              position: absolute;
              background: #ffffff1a;
              width: 100%;
              bottom: 70px;
              left: 0;
              right: 0;
              height: 1px;
              content: '';
            }
            .sitback-logo{
              width: 95px;
              margin-bottom: 20px;
            }
            h4{
              color: #FFF;
              text-align: center;
              font-size: 26px;
              font-style: normal;
              font-weight: 300;
              line-height: 35px;
              letter-spacing: -0.78px;
              margin: 0 auto 30px;
              max-width: 325px;
              span{
                font-weight: 500;
              }
            }
            .servicesgrid-row{
              max-width: 100%;
              .grid-row{
                justify-content: center;
                .grid-col{
                  max-width: 191px;
                  padding: 0 6px;
                  ${mediaQueries("sm")`
                    max-width: 178px;
                  `}
                  ${mediaQueries("xs")`
                    max-width: 165px;
                  `}
                  .services-box-wrapper{
                    background: #ffffff1a;
                    display: flex;
                    align-items: center;
                    border-radius: 10px;
                    padding: 15px 8px;
                    cursor: pointer;
                    ${mediaQueries("sm")`
                      padding: 15px 0 15px 1px;
                    `}
                    ${mediaQueries("xs")`
                      padding: 15px 0 15px 8px;
                    `}
                    .box-icons{
                      width: 52px;
                      height: 42px;
                      overflow: hidden;
                      padding: 0;
                      background: transparent;
                      margin-bottom: 0;
                      margin-right: 12px;
                      margin-left: unset;
                      margin-top: unset;
                      ${mediaQueries("sm")`
                        width: 40px;
                      `}
                    }
                    p{
                      color: #FFF;
                      font-size: 15px;
                      font-weight: 500;
                      line-height: 20px;
                      text-align: left;
                      display: -webkit-box;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                  }
                }
              }
            }
            .services-btn{
              margin-top: 50px;
              .view-all-service-link{
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: 35px;
                letter-spacing: -0.42px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;
                box-shadow: none;
                background: transparent;
                border: none;
              }
            }

          }
        }
      }
    }
    .blog-detail-col-wrapper{
      padding: 70px 20px 0;
         ${mediaQueries("sm")`
            padding: 35px 20px 0;
        `}
      .blog-detail-desktop-view{
        ${mediaQueries("sm")`
            display: none;
        `}
      }
      .blog-detail-mobile-view{
        display: none;
        ${mediaQueries("sm")`
            display: block;
        `}
        .blog-detail-updated-wrapper{
          ${mediaQueries("sm")`
              min-height: 525px;
          `}
        }
      }
    }
`;
export const BlogDetailBox = styled.div`
    cursor: pointer;
    width: 100%;
    margin-bottom: 35px;
    position: relative;
    z-index: 2;
    &.blog-detail-updated-wrapper{
      border-radius: 16px;
      border: 1px solid #D8D8D8;
      background: #FFF;
      min-height: 530px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100% - 35px);
      ${mediaQueries("sm")`
          min-height: 500px;
          height: calc(100% - 25px);
          margin-bottom: 25px;
      `}
      .blog-banner-wrapper{
        /* height: 225px; */
        width: 100%;
        overflow: hidden;
        padding: 9px 9px 0;
        border-radius: 10px;
        img{
          /* object-fit: cover; */
          border-radius: 10px;
        }
        ${mediaQueries("sm")`
            height: 200px;
        `}
      }
      .blog-inner-detail-div{
        padding: 0 20px 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .blog-date-text{
          background: #f2f6f9b3;
          color: ${theme.color.secondary};
          font-size: 12px;
          font-weight: 500;
          line-height: 14px;
          padding: 8px 12px;
          max-width: fit-content;
          border-radius: 45px;
          margin-bottom: 10px;
          ${mediaQueries("sm")`
              font-size: 10px;
          `}
        }
        .blog-list-title-summary{
          color: ${theme.color.logintitlecolor};
          font-size: 22px;
          font-weight: 600;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .truncated-summary{
          color: #004d87cc;
          font-size: 14px;
          font-weight: 400;
          line-height: 26px;
          margin-bottom: 20px;
        }
        .sitback-seemore{
          border-radius: 100px;
          background: #F2F6F9;
          color: ${theme.color.logintitlecolor};
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          line-height: normal;
          min-height: 50px;
          padding: 12px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover{
            background: ${theme.color.logintitlecolor};
            color: ${theme.color.white};
          }
        }
      }
    }
    .blog-banner-wrapper{
        width: 100%;
        /* height: 240px; */
        /* background: #E2E2E2; */
        border-radius: 12px;
        margin-bottom: 18px;
        img{
          border-radius: 6px;
          object-fit: contain;
        }
        /* ${mediaQueries("xl")`
          height: 220px;
        `}
        ${mediaQueries("lg")`
          height: 200px;
        `}
        ${mediaQueries("md")`
          height: 180px;
        `} */
    }
    h4{
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 36px;
        color: #333333;
        margin-bottom: 14px;
        ${mediaQueries("xl")`
            font-weight: 600;
            font-size: 26px;
            line-height: 30px;
        `}
        ${mediaQueries("lg")`
            font-weight: 600;
            font-size: 22px;
            line-height: 28px;
        `}
        ${mediaQueries("md")`
            font-weight: 600;
            font-size: 18px;
            line-height: 24px;
        `}
        ${mediaQueries("sm")`
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
        `}
    }
    h6{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        margin-bottom: 14px;
        ${mediaQueries("lg")`
            font-size: 15px;
            line-height: 22px;
        `}
        ${mediaQueries("md")`
            font-size: 14px;
            line-height: 20px;
        `}
    }
    p{
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        color: #777777;
        margin-bottom: 18px;
        ${mediaQueries("lg")`
            font-size: 14px;
            line-height: 22px;
        `}
        ${mediaQueries("md")`
            font-size: 13px;
            line-height: 20px;
        `}
    }
    .sitback-seemore{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 32px;
        color: #3ED1BA;
        display: inline-flex;
        ${mediaQueries("lg")`
            font-size: 14px;
            line-height: 22px;
        `}
        ${mediaQueries("md")`
            font-size: 13px;
            line-height: 20px;
        `}
    }
    .truncated-summary {
      display: -webkit-box;
      -webkit-line-clamp: 4; /* Limit to 4 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .blog-list-title-summary{
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Limit to 4 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
`;
export const BlogInnerBanner = styled.div`
    width: 100%;
    height: 580px;
    background: #E2E2E2;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 60px;
    ${mediaQueries("xxl")`
        height: 580px;
    `}
    ${mediaQueries("xl")`
        height: 560px;
    `}
    ${mediaQueries("lg")`
        height: 500px;
        margin-bottom: 50px;
    `}
    ${mediaQueries("md")`
        height: 420px;
        margin-bottom: 40px;
    `}
    ${mediaQueries("sm")`
        height: 340px;
        margin-bottom: 30px;
    `}
    ${mediaQueries("xs")`
        height: 300px;
        margin-bottom: 20px;
    `}
    img {
      ${mediaQueries("xxl")`
       object-fit: fill;
    `}
    }
`;

"use client";
// import styled from "styled-components";
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";

export const HeaderBarWrapper = styled.div`
    padding: 10px 0;
    background: ${theme.color.lightyellow2};
    position: relative;
    z-index: 8;
    min-height: 115px;
    align-items: center;
    display: flex;
    &.sitback-updated-v2-header-div{
      background: #295086;
      min-height: 92px;
      .sitback-header-wrapper{
        .sitback-logo-wrapper{
          width: 70px;
        }
      }
    }
    ${mediaQueries("lg")`
        min-height: 65px;
    `}
    ${(props) =>
    props.isNewDashboardInsightsHeaderWrapper &&
    css`
       min-height: unset;
       background: transparent;
       padding: 0 0 30px 0;
      ${mediaQueries("lg")`
          padding: 0 0 25px 0;
      `}
      ${mediaQueries("md")`
          padding: 0 0 20px 0;
      `}
      ${mediaQueries("sm")`
          padding: 0 0 15px 0;
      `}
       border-bottom: 1px solid #c8c7cc66;
       .sitback-new-header-div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .sitback-toggle-menu-wrapper{
          display: none;
          width: 25px;
          height: auto;
          overflow: hidden;
          &.profile-header-menu-toggle-wrapper{
            display: none !important;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
          ${mediaQueries("md")`
              display: flex;
          `}
        }
        .sitback-mobile-logo-wrapper{
          width: 55px;
          height: auto;
          overflow: hidden;
          display: none;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          ${mediaQueries("sm")`
              display: flex;
          `}
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        .sitback-profile-menu-logo-wrapper{
          width: 55px;
          height: auto;
          overflow: hidden;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          ${mediaQueries("sm")`
              display: none;
          `}
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        .back-arrow-link{
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 14px;
          line-height: 100%;
          color: #295086;
          width: 180px;
          ${mediaQueries("md")`
              margin-left: 20px;
              width: 220px;
              white-space: nowrap;
          `}
          ${mediaQueries("sm")`
              font-size: 12px;
              margin-left: 0;
               width: 150px;
          `}
          i{
            width: 20px;
            height: auto;
            overflow: hidden;
            margin-right: 12px;
            display: block;
            ${mediaQueries("sm")`
              width: 15px;
               margin-right: 6px;
            `}
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
        }
        .date-select-wrapper{
          position: relative;
          ${mediaQueries("md")`
              display: none;
          `}
          .react-datepicker-wrapper{
            .react-datepicker__input-container{
              .datepicker-input{
                border: 1px solid #EFEFF4;
                background: #FFFFFF;
                border-radius: 25px;
                padding: 15px 15px 15px 30px;
                font-weight: 400;
                font-size: 14px;
                line-height: 100%;
                letter-spacing: 0px;
                color: #000000;
                max-width: 220px;
                min-width: 220px;
              }
              input:focus {
                outline: none;
              }
              .global_laguage_icon{
                width: 15px;
                height: auto;
                overflow: hidden;
                left: 0px;
                top: 0;
                bottom: 0;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                svg{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                }
              }
            }
          }
          .form-select{
            border: 1px solid #EFEFF4;
            /* background: #FFFFFF; */
            border-radius: 25px;
            padding: 15px 15px 15px 55px;
            font-weight: 400;
            font-size: 15px;
            line-height: 100%;
            letter-spacing: 0px;
            color: #000000;
            min-width: 235px;
          }
          .calendar-icon{
            position: absolute;
            width: 50px;
            height: auto;
            overflow: hidden;
            top: 0;
            bottom: 0;
            left: 12px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
        }
        .search-input-icon-div{
          position: relative;
          min-width: 200px;
          max-width: 200px;
          width: 100%;
          margin-left: 12px;
          ${mediaQueries("xl")`
              min-width: unset;
              max-width: 250px;
          `}
          ${mediaQueries("md")`
              display: none;
          `}
          .calendar-icon{
            position: absolute;
            width: 20px;
            height: auto;
            overflow: hidden;
            top: 0;
            bottom: 0;
            left: 15px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .form-control{
            border: 1px solid #EFEFF4;
            background: #FFFFFF;
            border-radius: 25px;
            padding: 10px 15px 10px 45px;
            font-weight: 400;
            font-size: 12px;
            line-height: 100%;
            color: #8A8A8F;
            min-height: 43px;
            &:focus{
              outline: none;
              box-shadow: none;
            }
            &::placeholder{
              font-weight: 400;
              font-size: 12px;
              line-height: 100%;
              color: #8A8A8F;
            }
          }
        }
        .profile-content-div{
          display: flex;
          justify-content: flex-end;
          width: 100%;
          .user-profile-and-notification{
              display: flex;
              align-items: center;
              .notification-modal-wrapper{
                  margin-right: 18px;
                  /* padding-right: 18px; */
                  /* border-right: 2px solid ${theme.color.secondary}; */
                .dropdown-toggle{
                      background: transparent;
                      border: none;
                      padding: 0;
                      position: relative;
                      &:after{
                          content: unset;
                      }
                      span{
                          width: 10px;
                          height: 10px;
                          display: flex;
                          position: absolute;
                          right: -4px;
                          background: #E32C1F;
                          border-radius: 100px;
                          top: -4px;
                      }
                      i{
                          width: 21px;
                          height: 21px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          svg{
                              color: ${theme.color.secondary};
                              width: 100%;
                              height: 100%;
                              display: block;
                          }
                      }
                }
              }
              .user-profile-div{
                  .dropdown-toggle{
                      background: transparent;
                      border: none;
                      padding: 0;
                      width: 55px;
                      height: 55px;
                      overflow: hidden;
                      ${mediaQueries("xl")`
                          width: 55px;
                          height: 55px;
                      `}
                      ${mediaQueries("lg")`
                          width: 50px;
                          height: 50px;
                      `}
                      ${mediaQueries("md")`
                          width: 45px;
                          height: 45px;
                      `}
                      &:after{
                          content: unset;
                      }
                  }
              }
          }
          &.profile-page-dropdown-menu{
            .dropdown{
              .dropdown-menu{
                left: -100px !important;
              }
            }
          }
          .dropdown{
            .dropdown-menu{
              box-shadow: 1px 4px 5px 4px #0000000A;
              background: #FFFFFF;
              padding: 0 2px;
              margin: 0;
              overflow: visible;
              margin-top: 5px;
              &::after{
                  content:"";
                  width: 0;
                  height: 0;
                  border-left: 15px solid transparent;
                  border-right: 15px solid transparent;
                  border-bottom: 16px solid #FFFFFF;
                  position: absolute;
                  top: -8px;
                  right: 10px;
                  margin: auto;
                  z-index: 1001;

                }
              .dropdown-item{
                background: #FFFFFF;
                border-bottom: 0.5px solid #E4E4E4;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                text-align: center;
                color: #676767;
              }
            }
          }
        }
        .profile-wrapper{
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 1000px;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        }
       }
       .week-month-filters{
        display: flex;
        align-items: center;
        margin-left: 8px;
        button{
          font-weight: 400;
          font-size: 15px;
          line-height: 100%;
          color: #8A8A8F;
          border: 1px solid #EFEFF4;
          padding: 12px 9px;
          border-radius: 25px;
          background: #FFFFFF;
          min-width: 115px;
          min-height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          ${mediaQueries("xl")`
              min-width: 100px;
               font-size: 14px;
          `}
          ${mediaQueries("lg")`
              min-width: 90px;
              font-size: 13px;
          `}
          ${mediaQueries("md")`
              display: none;
          `}
          &.month-btn{
            margin-left: 12px;
          }
          &.active-filter{
            background: #95CCD5;
            border-color: #95CCD5;
            color: #FFFFFF;
          }
        }
        &.sitback-all-pending-filter-wrapper{
          margin-left: 0;
          button{
            margin-right: 12px;
            max-height: 43px;
            min-height: unset;
            &:last-child{
              margin-right: 0;
            }
          }

        }
       }
       .status-dropdown-display-wrapper{
          min-width: 120px;
          margin-left: 12px;
          ${mediaQueries("md")`
              display: none;
          `}
          .form-select{
            border: 1px solid #EFEFF4;
            background: #FFFFFF;
            border-radius: 25px;
            padding: 8px;
            font-weight: 400;
            font-size: 12px;
            line-height: 100%;
            letter-spacing: 0px;
            color: #000000;
            min-height: 42px;
            box-shadow: none;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: block;
            text-align: center;
          }
          .sitback-select2-container{
            .sitback-select-option__control{
              border: 1px solid #EFEFF4;
              background: #FFFFFF;
              border-radius: 25px;
              padding: 2px;
              color: #57565E;
              font-size: 12px;
              font-weight: 500;
              line-height: normal;
              box-shadow: none !important;
              .sitback-select-option__value-container{
                max-height: 120px;
                overflow-y: auto;
                .sitback-select-option__placeholder{
                  color: #8A8A8F;
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
                  color: ${theme.color.primary};
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
      `}
    .sitback-header-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .menu-icon-wrapper{
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            ${mediaQueries("xl")`
                width: 28px;
                height: 28px;
            `}
            ${mediaQueries("lg")`
                width: 25px;
                height: 25px;
            `}
            svg{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .sitback-logo-wrapper{
            width: 100px;
            height: 100px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            bottom: 0px;
            margin: auto;
            ${mediaQueries("xl")`
                width: 90px;
                height: 90px;
            `}
            ${mediaQueries("lg")`
                width: 80px;
                height: 80px;
            `}
            ${mediaQueries("md")`
                width: 70px;
                height: 70px;
            `}
            ${mediaQueries("sm")`
                width: 55px;
                height: 55px;
            `}
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
            }
        }
        .sitback-profile-pic{
            width: 55px;
            height: 55px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }
        .user-profile-and-notification{
            display: flex;
            align-items: center;
            .notification-modal-wrapper{
                margin-right: 18px;
                padding-right: 18px;
                border-right: 2px solid ${theme.color.secondary};
               .dropdown-toggle{
                    background: transparent;
                    border: none;
                    padding: 0;
                    position: relative;
                    &:after{
                        content: unset;
                    }
                    span{
                        width: 10px;
                        height: 10px;
                        display: flex;
                        position: absolute;
                        right: -4px;
                        background: #E32C1F;
                        border-radius: 100px;
                        top: -4px;
                    }
                    i{
                        width: 21px;
                        height: 21px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        svg{
                            color: ${theme.color.secondary};
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    }
               }
            }
            .user-profile-div{
                .dropdown-toggle{
                    background: transparent;
                    border: none;
                    padding: 0;
                    width: 55px;
                    height: 55px;
                    overflow: hidden;
                    ${mediaQueries("xl")`
                        width: 55px;
                        height: 55px;
                    `}
                    ${mediaQueries("lg")`
                        width: 50px;
                        height: 50px;
                    `}
                    ${mediaQueries("md")`
                        width: 45px;
                        height: 45px;
                    `}
                    &:after{
                        content: unset;
                    }
                }
            }
        }
    }
`;
export const FooterBarWrapper = styled.div`
    padding: 21px 0;
    background: ${theme.color.lightyellow2};
    text-align: center;
    &.sitback-footer-updated-wrapper{
        background: #295086;
        p{
          color: #FFFFFF;
          a{
            color: #FFFFFF;
          }
        }
    }
    p{
        color: ${theme.color.secondary};
        font-size: 18px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px;
        text-align: center;

      a {
        color: ${theme.color.secondary};
        font-size: 18px;
        font-style: normal;
        font-weight: 300;
        line-height: 24px;
        text-align: center;
      }
    }
`;
export const PrivacyFooterWrapper = styled.div`
    z-index: 1;
    position: relative;
    padding: 12px 0;
    margin-top: -5vh;
    background: transparent;
    .container{
      p{
        display: flex;
        justify-content: end;
        a{
          color: #295086;
          text-align: center;
          font-size: 15px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.15px;
        }
      }
    }
`;
export const BlogHeaderWrapper = styled.div`
    background: #89C5D0;
    padding: 18px 0;
    position: sticky;
    right: 0;
    left: 0;
    width: 100%;
    top: 0;
    z-index: 5;
    ${mediaQueries("sm")`
        min-height: 80px;
    `}
    .mobile-menu-wrapper{
        justify-content: center;
        align-items: center;
        display: none;
        width: 26px;
        height: 26px;
        padding: 0;
        border: none;
        box-shadow: none;
        position: absolute;
        ${mediaQueries("sm")`
            display: flex;
        `}
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
    .header-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sitback-logo-wrapper{
            width: 130px;
            overflow: hidden;
            display: inline-flex;
            ${mediaQueries("xl")`
               width: 120px;
            `}
             ${mediaQueries("lg")`
               width: 100px;
            `}
            ${mediaQueries("sm")`
                margin: auto;
                width: 75px;
            `}
        }
        .login-header-wrapper{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            ${mediaQueries("sm")`
                display: none;
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
                min-width: 140px;
                padding: 15px;
                color: #D7D7D7;
            }
        }
    }
    .user-profile-div{
        button{
            padding: 0;
            background: transparent;
            border: none;
            width: 45px;
            height: 45px;
            overflow: hidden;
            outline: none !important;
            box-shadow: none !important;
            background: transparent !important;
            &::after{
                content: unset;
            }
        }
    }
    .navbar{
        padding: 0;
        .container{
          ${mediaQueries("sm")`
            flex-direction: row-reverse;
          `}
        }
        .sitback-logo-wrapper{
            width: 130px;
            overflow: hidden;
            display: inline-flex;
            padding: 0;
            ${mediaQueries("xl")`
               width: 120px;
            `}
             ${mediaQueries("lg")`
               width: 100px;
            `}
            ${mediaQueries("sm")`
                margin: auto;
                width: 75px;
            `}
            &.sitback-mobile-view-logo-wrapper{
              ${mediaQueries("sm")`
                position: absolute;
                right: 0;
                left: 0;
                margin: auto;
                top: -10px;
                width: 110px;
                height: 48px;
              `}
            }
        }
        .navbar-toggler{
            padding: 0;
            outline: none;
            box-shadow: none;
            border: none;
            border-radius: 0;
            ${mediaQueries("sm")`
              margin-top: 6px;
            `}
            .navbar-toggler-icon{
                background: url("images/menu-left.svg") no-repeat;
                background-position: center;
                background-size: contain;
                width: 26px;
                height: 26px;
                ${mediaQueries("sm")`
                   background: url("images/hamburger-menu-img.png") no-repeat;
                   background-position: center;
                   background-size: contain;
                `}
            }
        }
        .navbar-collapse{
            ${mediaQueries("md")`
                margin: 18px 0;
            `}
            ${mediaQueries("sm")`
                margin: 30px 0 18px;
            `}
            .navbar-nav{
                margin: 0 auto;
                ${mediaQueries("md")`
                    display: inline-flex;
                `}
                a{
                    font-style: normal;
                    font-weight: 600;
                    font-size: 19px;
                    line-height: normal;
                    color: #295086;
                    display: inline-flex;
                    margin: 0 18px;
                    transition: all 0.3s ease-in-out;
                    position: relative;
                    padding: 0;
                    font-family: ${theme.font.fontFamilyPoppins};
                    ${mediaQueries("lg")`
                        margin: 0 12px;
                        font-size: 16px;
                    `}
                    ${mediaQueries("md")`
                        margin: 0;
                        margin-bottom: 21px;
                        font-size: 15px;
                    `}
                    &::before{
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 2px;
                        background: #FFFDEF;
                        bottom: -30px;
                        right:0;
                        left: 0;
                        opacity: 0;
                        transition: all 0.3s ease-in-out;
                    }
                    &.active{
                        color: #FFFDEF;
                        opacity: 1;
                        &::before{
                            opacity: 1;
                            ${mediaQueries("md")`
                               opacity: 0;
                            `}
                        }
                    }
                    &:hover{
                        opacity: 1;
                    }
                }
            }
            .logout-and-profile{
                display: flex;
                align-items: center;

                button{
                    background: ${theme.color.secondary};
                    border-color: ${theme.color.secondary};
                    width: auto;
                    min-width: 140px;
                    padding: 15px;
                    color: #D7D7D7;
                    font-size: 19px;
                    font-family: ${theme.font.fontFamilyPoppins};
                    ${mediaQueries("md")`
                      font-size: 15px;
                    `}
                }
                .user-profile-div{
                    button{
                        padding: 0;
                        background: transparent;
                        border: none;
                        width: 45px;
                        height: 45px;
                        overflow: hidden;
                        outline: none !important;
                        box-shadow: none !important;
                        background: transparent !important;
                        min-width: unset;
                        &::after{
                            content: unset;
                        }
                    }
                }
            }
        }
    }
    &.home-page-headerwrapper{
        background: transparent;
        position: absolute;
        padding-bottom: 0;
        ${mediaQueries("sm")`
           background: #95CCD5;
           padding-bottom: 18px;
           min-height: 82px;
        `}
        .sitback-home-logo-header-wrapper{
          display: none;
          ${mediaQueries("sm")`
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: -10px;
            margin: auto;
            width: 110px;
            height: 48px;
          `}
        }
        .navbar{
          .home-page-header-container-wrapper{
            ${mediaQueries("md")`
              justify-content: flex-start !important;
              align-items: center;
              flex-direction: row;
            `}
          }
            .navbar-toggler{
                padding: 0;
                outline: none;
                box-shadow: none;
                border: none;
                border-radius: 0;
                ${mediaQueries("sm")`
                  margin-top: 6px;
                `}
                .navbar-toggler-icon{
                    background: url("images/menu-leftv2.svg") no-repeat;
                    background-position: center;
                    background-size: contain;
                    width: 26px;
                    height: 26px;
                    ${mediaQueries("sm")`
                        background: url("images/menu-left-header-logo.svg") no-repeat;
                         background-position: center;
                        background-size: contain;
                    `}
                }
            }
            .navbar-collapse{
              ${mediaQueries("sm")`
                margin: 30px 0 18px;
              `}
                .navbar-nav{
                    margin: 0;
                    a{
                        color: white;
                        font-weight: 600;
                        &:first-child{
                            margin-left: 0;
                        }
                        &::before{
                            bottom: -8px;
                        }
                    }
                }
                .logout-and-profile{
                    button{
                        background: white;
                        border-color: white;
                        color: #295086;
                        min-width: auto;
                        background: transparent;
                        border: none;
                        color: white;
                        box-shadow: none;
                        min-height: 45px;
                        padding: 0;
                        ${mediaQueries("md")`
                            min-height: auto;
                        `}
                    }
                }
            }
        }
        &.home-page-updated-header-wrapper{
          padding-top: 48px;
          ${mediaQueries("sm")`
            background: transparent;
            padding-top: 18px;
          `}
          .home-page-header-container-wrapper{
            ${mediaQueries("xl")`
                max-width: 1200px;
            `}
          }
          .sitback-header-div{
            .sitback-header-inner-div{
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 20px;
              ${mediaQueries("sm")`
                padding: 0;
              `}
              .mobile-menu-btn-wrapper{
                min-width: 100px;
                background: #FFFFFF;
                border-radius: 100px;
                padding: 9px 15px;
                color: #000;
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
                display: none;
                align-items: center;
                border: none;
                min-height: 40px;
                i{
                  margin-right: 12px;
                }
                ${mediaQueries("sm")`
                  display: flex;
                `}
              }
              .header-menu-dropdown{
                &.desktop-view-menu-wrapper{
                  ${mediaQueries("sm")`
                    display: none;
                  `}
                }
                .dropdown-toggle{
                  min-width: 100px;
                  background: #FFFFFF;
                  border-radius: 100px;
                  padding: 9px 15px;
                  color: #000;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  display: flex;
                  align-items: center;
                  border: none;
                  min-height: 40px;
                  i{
                    margin-right: 12px;
                  }
                  &::after{
                    content: unset;
                  }
                }
                .dropdown-menu{
                  border-radius: 19px;
                  background: #FFF;
                  padding: 12px 8px;
                  min-width: 240px;
                  top: 13px !important;
                  .dropdown-item{
                    background: transparent;
                    padding: 0;
                    a{
                      color: ${theme.color.secondary};
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 49px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      background: transparent;
                      padding: 2px 16px;
                      &:hover{
                        border-radius: 100px;
                        background: #F2F6F9;
                        font-weight: 600;
                      }
                    }

                  }
                }
              }
              .header-logo-wrapper{
                width: 135px;
                height: auto;
                overflow: hidden;
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
                ${mediaQueries("xl")`
                  width: 130px;
                `}
                ${mediaQueries("lg")`
                  width: 125px;
                `}
                ${mediaQueries("md")`
                  width: 120px;
                `}
                 ${mediaQueries("sm")`
                  width: 105px;
                `}
              }
              .header-login-btn{
                display: flex;
                align-items: center;
                .business-btn{
                  min-width: 135px;
                  min-height: 40px;
                  padding: 10px 20px;
                  color: ${theme.color.secondary};
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  margin-right: 8px;
                  border-radius: 20px;
                  background: ${theme.color.white};
                  border: none;
                  ${mediaQueries("sm")`
                    display: none;
                  `}
                  &:hover{
                    opacity: 1;
                  }
                }
                .login-btn{
                  color: #FFF;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: normal;
                  border-radius: 100px;
                  background: ${theme.color.logintitlecolor};
                  min-width: 85px;
                  min-height: 40px;
                  border: none;
                  padding: 10px 20px;
                  &:hover{
                    opacity: 1;
                  }
                }
              }
              .header-mobile-menu-div{
                background: #FFF;
                position: absolute;
                top: 82px;
                left: 0;
                right: 0;
                width: 100%;
                min-height: 90vh;
                z-index: 9999;
                padding-bottom: 30px;
                padding-top: 15px;
                .header-mobile-menu-inner-div{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  height: 80vh;
                  ${mediaQueries("xs")`
                    height: 75vh;
                  `}
                }
                ul{
                  li{
                    a{
                      color: ${theme.color.secondary};
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 300;
                      line-height: 49px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      background: transparent;
                      padding: 2px 28px;
                      &:hover{
                        background: #F2F6F9;
                        font-weight: 500;
                      }
                    }
                  }
                }
                .header-mobile-btn-div{
                  padding: 0 16px;
                  .for-business-btn{
                    width: 100%;
                    border-radius: 100px;
                    background: #004D87;
                    color: #FFF;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: normal;
                    min-height: 56px;
                  }
                }

              }
            }
          }
          &.sitback-mobile-menu-header-wrapper{
            background: #004D87;
            .sitback-header-inner-div{
              .header-login-btn{
                .login-btn{
                  visibility: hidden;
                }
              }
            }
          }
        }
    }
`;
export const SitbackGetStartedHeaderWrapper = styled.div`
  min-height: 56px;
  background: ${theme.color.secondary};
  display: flex;
  align-items: center;
  .container-fluid{
    max-width: 1320px;
    ${mediaQueries("xl")`
        max-width: 100%;
    `}
  }
  .sitback-get-started-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .sitback-get-started-header-left{
      display: flex;
      align-items: center;
      .mobile-menu-toggle{
        display:none;
        background:none;
        border:none;
        color:#fff;
        cursor:pointer;
        width: 30px;
        height: auto;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        ${mediaQueries("xl")`
          display:block;
          margin-right:0px;
        `}
      }
      .header-logo-wrapper{
        width: 36px;
        height: auto;
        overflow: hidden;
        display: block;
        margin-right: 35px;
      }
        .sitback-menu-link-wrapper{
          display: flex;
          align-items: center;
          .nav-link{
            display: flex;
            align-items: center;
            color: #FFF;
            font-size: 15px;
            font-weight: 400;
            line-height: normal;
            margin-right: 20px;
            padding: 18px 12px;
            &.active{
              background: #3B67A3;
              box-shadow: 0 18px 25px 0 rgba(0, 0, 0, 0.07);
            }
            i{
              margin-right: 12px;
              width: 16px;
              height: auto;
              overflow: hidden;
              display: block;
            }
          }
          ${mediaQueries("xl")`
            position:fixed;
            top:56px;
            left:-100%;
            width:260px;
            height:100vh;
            background:${theme.color.secondary};
            flex-direction:column;
            align-items:flex-start;
            padding:20px;
            transition:0.3s;

            .nav-link{
              width:100%;
              padding:12px 0;
            }

            &.open{
              left:0;
            }
          `}
        }
    }
    .sitback-get-started-header-right{
    display: flex;
    align-items: center;
    .sitback-get-started-header-right-link{
      margin-right: 30px;
      width: 18px;
      height: auto;
      overflow: hidden;
      display: block;
      ${mediaQueries("xl")`
          display:none;
      `}
      &:nth-child(2){
        margin-right: 20px;
      }
    }
      .sitback-profile-dropdown-div{
        padding: 1px 18px;
        background: #3B67A3;
        box-shadow: 0 18px 25px 0 rgba(0, 0, 0, 0.07);
        .dropdown{
          .dropdown-toggle{
           display: flex;
           align-items: center;
           outline: none;
           text-decoration: none !important;
           &::after{
            display: none;
           }
           i{
            margin-right: 12px;
            width: 36px;
            height: 36px;
            overflow: hidden;
            display: block;
            border-radius: 1000px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }
            }
            .sitback-profile-dropdown-div-text{
            text-align: left;
             h6{
              color: #FFF;
              font-size: 14px;
              font-weight: 500;
              line-height: normal;
             }
             p{
              color: #FEFEFE;
              font-size: 12px;
              font-weight: 400;
              line-height: 23px;
              text-transform: capitalize;
             }
            }
          }
        }
      }
    }
  }
`;

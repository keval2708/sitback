"use client";
import { css } from "@emotion/react";
// import styled from "styled-components";
import styled from "@emotion/styled";
import { mediaQueries } from "../../utils/mediaQuery";
import { theme } from "../global/theme";

export const InsightsSitbackLayoutWrapper = styled.div`
  padding: 40px 0;
  ${(props) =>
    props.isNewDashboardInsightsSitbackWrapper &&
    css`
        padding: 35px 0;
        background: #FCFCFC;
        min-height: 100vh;
        ${mediaQueries("lg")`
             padding: 30px 0 35px;
        `}
        ${mediaQueries("md")`
             padding: 25px 0 35px;
        `}
        ${mediaQueries("sm")`
             padding: 20px 0 35px;
        `}
      `}
      &.sitback-updated-insights-layout-wrapper{
        .sitback-insights-tab-wrapper{
          border-radius: 8px;
          border: 1px solid #EAEBEC;
          background: #FFF;
          .nav{
            .nav-item{
              .nav-link{
                border: none;
                background: #FFF;
                &.active{
                  background: #DFECF9;
                  color: #295086;
                  .down-andup-arrow{
                    i{
                      svg{
                        path{
                          fill: #295086;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .tab-content{
          .sitback-calender-week-header{
          background: #FFFFFF;
          box-shadow: 0 0 84px 0 rgba(0, 0, 0, 0.03);
          border: 1px solid #EAEBEC;
          border-radius: 8px 8px 0 0;
            li{
                // border: 1px solid #EAEBEC;
                border: none;
                background: #FFF;
                border-radius: 8px 8px 0 0;
                
                &.active{
                  background: #DFECF9;
                  color: #295086;
                }
            }
          }
            .sitback-insights-tab-wrapper{  
              .sitback-updated-calendar-box-wrapper{
                border-radius: 8px;
                border: 0.5px solid rgba(0, 123, 255, 0.30);
                background: #DFECF9;
                h2{
                  font-size: 20px;
                  &.earn-text{
                    color: #2E9264;
                    font-size: 36px;
                    font-weight: 600;
                    line-height: normal;
                    letter-spacing: -1px;
                  }
                }
              }
              .sitback-payment-method-table-wrapper{
                &.sitback-subscription-method-wrapper{
                  border-top: none;
                }
              }
            }
            .sitback-updated-inner-insight-div{
              border-radius: 8px;
              border: 0.5px solid #EAEBEC;
              background: #FBFBFB;
              .sitback-marketing-list-wrapper{
                border-bottom: 1px solid #EAEBEC;
                &:last-child{
                  border-bottom: none;
                }
                .sitback-marketing{
                  .sitback-subtitle-text{
                    color: #2E9264;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: normal;
                  }
                }
                .sitback-marketing-icon-div{
                  width: 34px;
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

              .sitback-service-ranking-list{
                  border-bottom: 1px solid #EAEBEC;
                  padding-left: 25px;
                  padding-right: 25px;
                  &:last-child{
                    border-bottom: none;
                  }
              }
              .sitback-booked-services-btn{
                button{
                  border-radius: 100px;
                  border: 1px solid rgba(218, 218, 218, 0.60);
                  background: #FFF;
                }
              }
              .upgrade-access-btn{
                border: 1px solid #295086;
                background: #295086;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0.2px;
              }
              .sitback-add-payment-method-block{
                .download-and-date-btn{
                  .download-btn-wrapper{
                    background: #295086;
                  }
                }
              }
              .sitback-service-ranking-block{
                padding: 15px 0;
              }
              .payment-history-accordion-wrapper{
                .header-bar-wrapper{
                  border: 1px solid rgba(0, 123, 255, 0.30);
                  background: #295086;
                  h5{
                    color: #FFF;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 22px; 
                    ${mediaQueries("lg")`
                      font-size: 16px;
                    `}
                    ${mediaQueries("md")`
                      font-size: 14px;
                    `}
                  }
                }
                  .accordion{
                      .accordion-item{
                        &:first-of-type > .accordion-header .accordion-button{
                          background: #FBFBFB;
                        }
                        .accordion-header{
                          .accordion-button{
                            background: #FBFBFB;
                            border-bottom: 1px solid #EAEBEC;
                            &:not(.collapsed){
                              background: #DFECF9;
                            }
                          }
                        }
                        .accordion-collapse{
                          .accordion-body{
                            opacity: 1;
                            .header-bar-wrapper{
                              border: none;
                              background: #DFECF9;
                            }
                          }
                          &.show{
                            .accordion-body{
                              // border: 1px solid rgba(0, 123, 255, 0.30);
                              background: #DFECF9 !important;
                              .header-bar-wrapper{
                                border: none;
                              }
                            }
                          }
                        }
                      }
                  }
              }
            }
          .chatbox-wrapper-div {
            &.sitback-updated-chat-main-div{
              .sitback-supoort-and-user-tab-wrapper{
                .tab-end-wrapper{
                  .nav{
                    width: 100%;
                    background: #295086;
                    border-radius: 1000px;
                    border: 1px solid #EAEAEA;
                    .nav-item{
                      width: 50%;
                      background: #295086;
                      border-radius: 1000px;
                      .nav-link{
                        background: #295086;
                        color: #FFFFFF;
                        border-radius: 1000px;
                        &.active{
                          background: #FFF;
                          // border: 1px solid #EAEAEA;
                          border: none;
                          color: #295086;
                        }
                      }
                    }
                  }
                }
                .tab-content{
                  .chatinnerbox-wrapper{
                    .chat-inner-headerbar{
                      border-radius: 8px 8px 0 0;
                      border: 0.5px solid #EAEBEC;
                      background: rgba(255, 255, 255, 0.60);
                    }
                  }
                }
              }
            }
          }
        }
      }
  .sitback-subtitle-text {
    color: ${theme.color.secondary};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .sitback-insights-tab-wrapper {
    border-radius: 8px;
    background: ${theme.color.lightyellow2};
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
    width: 100%;
    height: auto;
    &.earnings-section {
      height: calc(100% - 20px);
    }
    &.payment-history {
      margin-bottom: 0px !important;
      overflow: hidden;
    }
    /* min-height: 195px; */
    /* height: calc(100% - 20px); */
    ${mediaQueries("lg")`
            min-height: auto;
        `}
    .nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      .nav-item {
        position: relative;
        .nav-link {
          padding: 14px 16px;
          color: ${theme.color.secondary};
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 24px */
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          background: ${theme.color.lightyellow2};
          border-radius: 0;
          .unread-msg-count {
            border-radius: 100px;
            justify-content: center;
            min-width: 20px;
            min-height: 20px;
            display: flex;
            align-items: center;
            margin-left: 9px;
            background: ${theme.color.secondary};
            font-size: 10px;
            color: ${theme.color.white};
            font-weight: 400;
          }
          &.active {
            color: ${theme.color.white};
            background: ${theme.color.secondary};
            i {
              svg {
                color: ${theme.color.white};
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .unread-msg-count {
              background: ${theme.color.white};
              color: ${theme.color.secondary};
            }
            .down-andup-arrow {
              i {
                svg {
                  width: 100%;
                  height: 100%;
                  display: block;
                  path {
                    fill: ${theme.color.white};
                  }
                }
              }
            }
          }
          i {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            margin-right: 12px;
            svg {
              color: ${theme.color.secondary};
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .down-andup-arrow {
          position: absolute;
          width: 15px;
          height: 15px;
          right: 15px;
          i {
            width: 15px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            transform: rotate(180deg);
            svg {
              path {
                fill: ${theme.color.secondary};
              }
            }
          }
        }
        .client-reports-menu {
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.5px;
          color: ${theme.color.secondary};
          cursor: pointer;
          display: none;
        }
        &.client-report {
          .nav-link {
            .down-andup-arrow {
              i {
                transform: rotate(0deg);
                svg {
                  width: 100%;
                  height: 100%;
                  display: block;
                  path {
                    fill: ${theme.color.white};
                  }
                }
              }
            }
          }
          .client-reports-menu {
            display: flex;
          }
        }
      }
    }
    .CustomerActivity {
      max-height: 400px;
      overflow: auto;
      position: relative;
      &.sitback-updated-customer-activity-table-wrapper{
        background: #FBFBFB;
        .table{
          tbody{
            tr{
              td{
                background: #FBFBFB;
                h6{
                  color: #295086C4;
                }
                .date-text{
                  color: #295086;
                }
              }
            }
          }
        }
      }
      &::-webkit-scrollbar {
        width: 6px;
        /* height: 6px; */
      }
      &::-webkit-scrollbar-track {
        background: #e9dede;
      }
      &::-webkit-scrollbar-thumb {
        background: #295086;
        border-radius: 8px;
      }
      button {
        cursor: unset;
      }
    }
    table {
      tbody {
        tr {
          vertical-align: middle;
          td {
            padding: 15px;
            border: none;
            width: 130px;
            &:first-child {
              width: auto;
              padding: 15px 25px;
            }
            h4 {
              color: ${theme.color.secondary};
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
            }
            h6 {
              color: ${theme.color.secondary};
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
            button {
              border-radius: 100px;
              background: #ffedef;
              color: #e95060;
              font-size: 9px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              width: 100%;
              padding: 6px 12px;
              outline: none;
              box-shadow: none;
              border: none;
              &.cancelled-btn {
                background: #ffedef;
                color: #e95060;
              }
              &.approved-btn {
                background: #e2f4ec;
                color: #4a9d77;
              }
            }
            .date-text {
              color: rgba(41, 80, 134, 0.6);
              font-size: 12px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
            }
          }
        }
      }
      > :not(caption) > * > * {
        background: rgba(149, 204, 213, 0.13);
      }
      &.table-striped > tbody > tr:nth-of-type(odd) > * {
        background: #f2f1e8;
        --bs-table-bg-type: transparent;
      }
      &.table-hover > tbody > tr:hover > * {
        --bs-table-color-state: transparent !important;
        --bs-table-bg-state: transparent !important;
      }
    }
    .sitback-history-table-wrapper {
      max-height: 365px;
      overflow: auto;
      min-height: 320px;
      position: relative;
      &::-webkit-scrollbar {
        width: 6px;
        /* height: 6px; */
      }
      &::-webkit-scrollbar-track {
        background: #e9dede;
      }
      &::-webkit-scrollbar-thumb {
        background: #295086;
        border-radius: 8px;
      }

      table {
        thead {
          tr {
            th {
              color: ${theme.color.secondary};
              font-size: 18px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              padding: 6px 25px;
              background: transparent !important;
              border: none;
              ${mediaQueries("xl")`
                                font-size: 16px;
                            `}
              ${mediaQueries("sm")`
                                font-size: 14px;
                            `}
                            &:last-child {
                width: 230px;
              }
            }
          }
        }
        tbody {
          tr {
            vertical-align: middle;
            td {
              padding: 15px 25px;
              border: none;
              color: #29508699;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              &.pending-text {
                color: #e32c1f;
              }
              ${mediaQueries("xl")`
                                font-size: 15px;
                            `}
              ${mediaQueries("sm")`
                                font-size: 14px;
                            `}
            }
          }
        }
        .notes-available-text {
          font-size: 14px;
          font-weight: 400;
          color: #295086;
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        > :not(caption) > * > * {
          background: transparent;
        }
        &.table-striped > tbody:nth-of-type(odd) > tr > * {
          background: #95ccd521;
          --bs-table-bg-type: transparent;
        }
        &.table-hover > tbody > tr:hover > * {
          --bs-table-color-state: transparent !important;
          --bs-table-bg-state: transparent !important;
        }
      }
      .sitback-payment-history-tip {
        margin: 12px 0 0px;
        //color: #295085;
        font-size: 15px;
        font-weight: 400;
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
          }
        }
        &.stiback-tip-amount-block {
          //color: #4a9d77;
        }
      }
    }
    .sitback-payment-method-table-wrapper {
      border-top: 1px solid gainsboro;
      .table-wrapper-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 15px 25px;
        //border-bottom: 1px solid gainsboro;
        .bank-detail-div {
          width: calc(100% - 180px);
          .form-check {
            display: flex;
            align-items: center;
            .form-check-input {
              width: 16px;
              height: 16px;
              margin-right: 12px;
              margin-top: -10px;
              &:valid:checked,
              .form-check-input.is-valid:checked {
                background-color: ${theme.color.secondary};
              }
              &:valid,
              .form-check-input.is-valid {
                border-color: ${theme.color.secondary};
              }
            }
            .form-check-label {
              span {
                color: ${theme.color.secondary};
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                display: block;
                margin-bottom: 6px;
              }
              h6 {
                color: ${theme.color.secondary};
                font-size: 22px;
                font-style: normal;
                font-weight: 400;
                line-height: 100%; /* 28px */
                text-transform: uppercase;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                ${mediaQueries("xl")`
                                    font-size: 22px;
                                    line-height: normal;
                                `}
                ${mediaQueries("lg")`
                                    font-size: 20px;
                                    line-height: normal;
                                `}
                                ${mediaQueries("md")`
                                    font-size: 18px;
                                    line-height: normal;
                                `}
                                ${mediaQueries("sm")`
                                    font-size: 16px;
                                    line-height: normal;
                                `}
              }
              p {
                /* color: #8E8F94;
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 500;
                                line-height: normal; */
                color: ${theme.color.secondary};
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                margin: 0;
              }
            }
          }
        }
        .btn-block-div {
          display: flex;
          align-items: center;
          /* width: 180px; */
          margin: 0 auto;
          .connected-text {
            background: transparent;
            padding: 0;
            color: ${theme.color.primary};
            font-size: 15px;
            font-weight: 400;
            width: auto;
            border: none;
            outline: none;
            box-shadow: none;
            margin-right: 15px;
          }
          .icon-btns-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            i {
              width: 21px;
              height: 21px;
              margin: 0 5px;
              cursor: pointer;
            }
          }
        }
      }
      .data-text {
        /* padding-left: 25px; */
        margin: 5px 0px;
        font-size: 14px;
        font-weight: 300;
        line-height: 18px;
        letter-spacing: 1px;
        text-align: center;
        color: #295086B2;
      }
      table {
        margin-bottom: 15px;
        > :not(caption) > * > * {
          background: transparent;
        }
        tbody {
          tr {
            border-bottom: 1px solid gainsboro;
            td {
              .form-check {
                display: flex;
                align-items: center;
                .form-check-input {
                  width: 21px;
                  height: 21px;
                  margin-right: 12px;
                  margin-top: -10px;
                  &:valid:checked,
                  .form-check-input.is-valid:checked {
                    background-color: ${theme.color.secondary};
                  }
                  &:valid,
                  .form-check-input.is-valid {
                    border-color: ${theme.color.secondary};
                  }
                }
                .form-check-label {
                  span {
                    color: ${theme.color.secondary};
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    display: block;
                    margin-bottom: 6px;
                  }
                  h6 {
                    color: ${theme.color.secondary};
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 100%; /* 28px */
                    text-transform: uppercase;
                    ${mediaQueries("xl")`
                                            font-size: 22px;
                                            line-height: normal;
                                        `}
                    ${mediaQueries("lg")`
                                            font-size: 20px;
                                            line-height: normal;
                                        `}
                                        ${mediaQueries("md")`
                                            font-size: 18px;
                                            line-height: normal;
                                        `}
                                        ${mediaQueries("sm")`
                                            font-size: 16px;
                                            line-height: normal;
                                        `}
                  }
                  p {
                    color: #8e8f94;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                    margin: 0;
                  }
                }
              }
              .connected-text {
                background: transparent;
                padding: 0;
                color: ${theme.color.primary};
                font-size: 15px;
                font-weight: 400;
                width: auto;
              }
              .icon-btns-wrapper {
                display: flex;
                align-items: center;
                width: 80px;
                justify-content: flex-end;
                i {
                  width: 21px;
                  height: 21px;
                  margin: 0 5px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    &.comingsoon-block-wrapper {
      .sitback-competitor-block {
        .competitor-coming-soon-text {
          .sitback-subtitle-text {
            opacity: 0.53;
          }
        }
        .sitback-booked-services-btn {
          opacity: 0.53;
        }
        button {
          opacity: 0.53;
        }
      }
    }
    .sitback-calender-box-wrapper {
      width: 100%;
      height: 100%;
      h2 {
        font-size: 30px;
        font-weight: 600;
        line-height: 30px;
        text-align: center;
        color: #295086;
      }
      h3 {
        margin-top: 0;
      }
    }
    .payment-history-accordion-wrapper{
      max-height: 500px;
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
      }
      .header-bar-wrapper{
        padding: 12px 25px;
        background: transparent;
        display: flex;
        align-items: center;
        min-height: 45px;
        h5 {
          color: #295086;
          font-size: 16px;
          font-weight: 600;
          flex: 0 0 190px;
          &:last-child{
            flex: 0 0 190px;
          }
           &:first-child{
            flex: 1;
          }
        }
      }
      .payment-history-display-text{
        padding: 12px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .accordion{
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
                    justify-content: space-between;
                    padding: 12px 25px;
                    background: #95CCD521;
                    h6{
                        color: ${theme.color.secondary};
                        font-size: 14px;
                        font-weight: 400;
                        flex: 0 0 190px;
                        &:last-child{
                          flex: 0 0 190px;
                        }
                        &:first-child{
                          flex: 1;
                        }
                        &.pending-text {
                          color: #e32c1f;
                        }
                    }
                    &:after{
                      position: absolute;
                      right: 12px;
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
                    /* span{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 36px;
                        height: 36px;
                        background: #95CCD5;
                        border-radius: 4px;
                        transition: all 0.3s ease-in-out;
                        &:after{
                            content: "";
                            position: absolute;
                            width: 16px;
                            height: 2px;
                            background: ${theme.color.white};
                            border-radius: 100px;
                            transition: all 0.3s ease-in-out;
                        }
                        &:before{
                            content: "";
                            position: absolute;
                            width: 2px;
                            height: 16px;
                            background: ${theme.color.dimgraytext};
                            border-radius: 100px;
                            opacity: 0;
                            transition: all 0.3s ease-in-out;
                        }
                    } */
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
                    margin-bottom: 15px;
                    line-height: 22px;
                }
                .header-bar-wrapper{
                  padding: 9px 25px;
                  background: #FFFFFF99;
                  display: flex;
                  align-items: center;
                  min-height: 36px;
                  h5 {
                    color: #29508699;
                    font-size: 14px;
                    font-weight: 400;
                    flex: 0 0 190px;
                      &:last-child{
                        flex: 0 0 190px;
                      }
                      &:first-child{
                        flex: 1;
                      }
                    &.platform-charge-tooltip {
                      display: inline-flex;
                      span {
                      display:flex;
                      justify-content:center;
                      align-items:center;
                      height:16px;
                      width:16px;
                      margin-left:5px;
                       i {
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:18px;
                        width:18px;
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
  .tab-content {
  }
  .sitback-calender-week-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    overflow: auto;
    flex-wrap: unset;
    &::-webkit-scrollbar {
      /* width: 6px; */
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: #e9dede;
    }
    &::-webkit-scrollbar-thumb {
      background: #295086;
      border-radius: 8px;
    }
    li {
      padding: 12px;
      color: ${theme.color.darkblue06};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      background: ${theme.color.lightyellow2};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: 1px solid #d9d9d9;
      min-width: 110px;
      ${mediaQueries("xl")`
               padding: 12px 6px;
            `}
      &.active {
        background: ${theme.color.white};
        color: ${theme.color.secondary};
      }
      &:first-of-type {
        border-radius: 5px 0px 0px 5px;
      }
      &:last-child {
        border-radius: 0px 5px 5px 0px;
        ${mediaQueries("xl")`
                    flex: 1;
                    min-width: auto;
                `}
      }
      i {
        width: 15px;
        height: 15px;
        display: flex;
        margin-left: 10px;
      }
      .react-datepicker-wrapper {
        width: 220px;
        .react-datepicker__close-icon {
          right: 16px !important;
        }
        .react-datepicker__input-container {
          display: flex;
          align-items: center;
          .global_laguage_icon {
            margin: 0;
            padding: 0;
            right: 0;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
              width: 100%;
              height: 100%;
              display: block;
              path {
                fill: #29508699;
              }
            }
          }
          input {
            padding: 0;
            height: auto;
            min-height: auto;
            max-height: unset;
            background: transparent;
            border: none;
            min-width: 220px;
            outline: none;
            box-shadow: none;
            color: ${theme.color.secondary};
            &::-ms-input-placeholder {
              /* Edge 12-18 */
              color: ${theme.color.secondary};
            }
            &::placeholder {
              color: ${theme.color.secondary};
            }
          }
        }
      }
      .react-datepicker__tab-loop {
        .react-datepicker-popper {
          .react-datepicker {
            .react-datepicker__month-container {
              .react-datepicker__header {
                background-color: #e6ede5;
                border: none;
                .react-datepicker__current-month {
                  color: ${theme.color.secondary};
                  font-size: 18px;
                  font-weight: 500;
                }
                .react-datepicker__day-names {
                  .react-datepicker__day-name {
                    color: ${theme.color.secondary};
                    font-size: 14px;
                    font-weight: 500;
                  }
                }
              }
              .react-datepicker__month {
                .react-datepicker__week {
                  .react-datepicker__day {
                    font-size: 14px;
                    color: ${theme.color.secondary};
                    font-weight: 400;
                  }
                  .react-datepicker__day--outside-month {
                    color: #a2a2a2;
                  }
                  .react-datepicker__day--weekend {
                    color: #a2a2a2;
                  }
                  .react-datepicker__day--keyboard-selected {
                    background: ${theme.color.secondary};
                    color: ${theme.color.white};
                  }
                  .react-datepicker__day--today {
                    background: ${theme.color.secondary};
                    color: ${theme.color.white};
                  }
                  .react-datepicker__day--in-range {
                    background: ${theme.color.secondary};
                    color: ${theme.color.white};
                  }
                }
              }
            }
          }
        }
      }
    }

    .react-date-custome-box {
      position: relative;
    }
  }
  .sitback-marketing-list-wrapper {
    display: flex;
    align-items: center;
    padding: 16px 25px;
    width: 100%;
    justify-content: space-between;
    &:nth-of-type(2n) {
      background: #95ccd521;
    }
    .sitback-marketing {
      display: flex;
      flex-direction: column;
      span {
        color: ${theme.color.secondary};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }



      .totalEarningText{
        display:inline-flex;
        align-items: center;
        p {
          font-size: 10px;
          color: red;
          margin-left: 5px;
          display:inline-flex;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            i {
              height:12px;
              width:12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: red;
              svg {
                height:100%;
                width:100%;
                display:block;

              }
            }
          }
        }




      }
    }
    .sitback-marketin-icon {
      .marketin-icon {
        width: 42px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${theme.color.white};
        border-radius: 6px;
        i {
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            color: ${theme.color.black};
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        &.up-marketing {
          background: #caffe7;
          i {
            svg {
              color: #4a9d77;
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        &.down-marketing {
          background: #fbdcdf;
          i {
            transform: rotateX(180deg);
            svg {
              color: #e95060;
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  }
  .no-data-text {
    color: #295086;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 15px;
  }
  .sitback-customer-activity-block {
    .sitback-subtitle-text {
      padding: 15px 25px;
    }

    .sitback-service-ranking-block {
      padding: 15px 25px;
      max-height: 400px;
      overflow: auto;
      position: relative;
      &::-webkit-scrollbar {
        width: 6px;
        /* height: 6px; */
      }
      &::-webkit-scrollbar-track {
        background: #e9dede;
      }
      &::-webkit-scrollbar-thumb {
        background: #295086;
        border-radius: 8px;
      }
      .sitback-service-ranking-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 12px;
        padding-bottom: 12px;
        &:last-child {
          margin-bottom: 6px;
          padding-bottom: 6px;
        }
        .sitback-service-icon-block {
          display: flex;
          align-items: center;
          .sitback-service-icon {
            width: 53px;
            height: 53px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            background: #95ccd580;
            margin-right: 18px;
            img {
              width: 26px;
              height: 26px;
              object-fit: contain;
            }
          }
          h5 {
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            color: ${theme.color.secondary};
          }
        }
        p {
          font-size: 15px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          color: ${theme.color.secondary};
        }
      }
    }
  }
  .sitback-competitor-block {
    padding: 20px 25px 25px;
    .sitback-subtitle-text {
      margin-bottom: 15px;
    }
    .sitback-booked-services-btn {
      display: flex;
      margin-bottom: 30px;
      margin-top: 30px;
      button {
        border-radius: 100px;
        border: 0.5px solid ${theme.color.secondary};
        background: ${theme.color.white};
        color: ${theme.color.secondary};
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding: 12px;
        margin-right: 15px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    button {
      padding: 12px;
    }
    .competitor-coming-soon-text {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h5 {
        margin: 0;
      }
      h6 {
        font-weight: 600;
        font-size: 15px;
        color: #e32c1f;
      }
    }
  }
  .sitback-add-payment-method-block {
    padding: 10px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* margin-bottom: 15px; */
    /* margin-top:5px; */
    .sitback-payment-title-text {
      color: ${theme.color.secondary};
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%;
      width: calc(100% - 140px);
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
    .subtitle-textdiv{
      color: #295086;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    button {
      border-radius: 100px;
      border: 0.5px solid ${theme.color.secondary};
      background: ${theme.color.white};
      color: ${theme.color.secondary};
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding: 9px 15px;
      min-width: 180px;
      display: flex;
      justify-content: center;
    }
  }
  .PaymentHistoryWrapper {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .sitback-payment-title-text {
      color: ${theme.color.secondary};
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%;
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
    .download-and-date-btn{
      display: flex;
      align-items: center;
      .react-datepicker-wrapper {
        margin-left: 0px;
      }
      .react-datepicker-wrapper{
        .react-datepicker__input-container{
          input{
            border: 1px solid rgba(218, 218, 218, 0.60);
            background: #FFF;
          }
        }
      }
      .download-btn-wrapper{
        width: 120px;
        margin: auto;
        padding: 9px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        margin-left: 15px;
         background: #295086;
        i{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15px;
          height: 15px;
          margin-left: 8px;
          svg{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    .react-datepicker-wrapper {
      flex: 1;
      margin-left: 15px;
      .react-datepicker__input-container {
        position: relative;
        input{
          width:100%;
          padding: 8px 8px 8px 18px !important;
          padding-right: 35px !important;
          min-height: 37px;
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
          cursor: pointer;
        }
        .react-datepicker__calendar-icon{
          display: none;
        }
        i {
          cursor: pointer;
          padding: 0;
          width: 21px;
          height: 21px;
          top: 0;
          bottom: 0;
          right: 30px;
          left: auto;
          margin: auto;
          color: #295086;
          &:before {
            position: absolute;
            content: "";
            background: url("images/Calendar-v4.svg") no-repeat;
            background-position: center;
            background-size: 100%;
            width: 21px;
            height: 21px;
          }
          &.global_laguage_icon {
            svg {
              display: none;
            }
          }
        }
        input {
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
        }
        .react-datepicker__close-icon {
          padding-right: 10px;
        }
      }
    }
    .react-datepicker__tab-loop {
      .react-datepicker-popper {
        .react-datepicker {
          background-color: #f3f9fa;
          border: 1px solid #f3f9fa;
          .react-datepicker__triangle {
            &::before {
              border-bottom-color: #f3f9fa;
            }
            &::after {
              border-bottom-color: #f3f9fa;
            }
          }
          .react-datepicker__month-container {
            .react-datepicker__header {
              background-color: #f3f9fa;
              border-bottom: 1px solid #c7c7c7;
            }
            .react-datepicker__day-names {
              .react-datepicker__day-name {
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
  .sitback-calender-box-wrapper {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h3 {
      color: #29508699;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 13px;
      margin-top: 20px;
    }
    h2 {
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 34px; /* 130.769% */
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      &.earn-text {
        color: ${theme.color.lightGreen};
      }
    }
    p {
      color: #29508699;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 162.5% */
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }
    button {
      padding: 12px 15px;
      max-width: 170px;
      font-size: 12px;
    }
    .including-text {
      font-size: 13px;
      color:red;
      margin-top: -10px;
      display:inline-flex;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        i {
          height:13px;
          width:13px;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            height:100%;
            width:100%;
            display:block;

          }
        }
      }
    }
    .note-text{
      text-align:start;
      margin:0;
      color:red;
      font-size: 12px;
    }
  }
  .sitback-supoort-and-user-tab-wrapper {
    .tab-end-wrapper {
      justify-content: flex-end;
      display: flex;
      margin-bottom: 24px;
      .nav {
        background: #d9d9d9;
        border-radius: 1000px;
        .nav-item {
          padding: 0;
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
            &.active {
              background: ${theme.color.secondary};
              color: ${theme.color.white};
            }
          }
        }
      }
    }
  }
`;

export const MessageLayoutWrapper = styled.div`
  border-radius: 8px;
  background: ${theme.color.lightyellow2};
  box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  &.sitback-updated-message-layout-div{
    background: #FFFFFF !important;
    .search-input-icon-wrapper{
      input{
        border: 1px solid rgba(218, 218, 218, 0.60);
        background: #FFF;
      }
      .global_laguage_icon{
        &::before{
          display: none;
        }
      }
    }
    .box-wrapper-div{
        .userlist-wrapper{
          &.active{
            background: #DFECF9 !important;
          }
        }
    }
    .chatinnerbox-wrapper{
      .chat-inner-headerbar{
        .quick-chat-list-wrapper{
          .userdetailwrapper{
            .user-detail-wrapper{
              p{
                color: #18C07A;
                &.offline{
                  color: #4D6B93;
                }
              }
              
            }
          }
        }
        .dropdown{
          .dropdown-toggle{
            background: transparent;
          }
          .dropdown-menu{
            .dropdown-item{
              background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray -379.447px 0px / 222.962% 100% no-repeat;
            }
          }
        }
      }  
      .set-chat-body{
        .user-chat-box-body-wrapper{
          .user-chat-box-list{
            &.left-box{
              .chatbox{
                border-radius: 15px 15px 15px 0;
                background: #DFECF9;
              }
            }
            &.right-box{
              .chatbox{
                border-radius: 15px 15px 0 15px;
                background: #295086;
              }
            }
          }
        }
      }
    }
  }
  &.message-updaed-layout{
    background: #FCFCFC;
  }
  .userlist-boxwrapper {
    width: 375px;
    height: 100%;
    border: 1px solid #dadada;
    border-radius: 8px;
    ${mediaQueries("xl")`
            width: 350px;
        `}
    ${mediaQueries("md")`
            width: 300px;
        `}
        ${mediaQueries("sm")`
            width: 250px;
        `}
        .search-input-wrapper {
      padding: 15px;
      .search-input-icon-wrapper {
        position: relative;
        input {
          padding: 14px 24px;
          font-size: 13px;
          box-shadow: none;
          padding-right: 50px;
        }
        i {
          width: 16px;
          height: 16px;
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
    .box-wrapper-div {
      height: 443px;
      overflow: auto;
      margin-right: 3px;
      width: 100%;
      /* padding: 8px 15px 0; */
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        background: #e9dede;
      }
      &::-webkit-scrollbar-thumb {
        background: #295086;
      }
      .userlist-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 12px;
        margin-bottom: 0px;
        /* margin-bottom: 12px; */
        /* padding-bottom: 12px; */
        .quick-chat-list-wrapper {
          margin-bottom: 0px;
          /* flex: 1; */
          margin-right: 12px;
          width: calc(100% - 66px);
          .userdetailwrapper {
            flex: 1;
            /* max-width: 100%; */
          }
          .user-detail-wrapper {
            /* max-width: 100%; */
            /* width: calc(100% - 62px); */
            h3 {
              color: #295086;
              font-weight: 600;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              display: block;
            }
            p {
              color: #7c7c7c;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-word;
              /* display: block; */
            }
          }
        }
        .counter-time {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          flex: 1;
          .timetext {
            color: #7c7c7c;
            font-size: 11px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
          .unread-msg-count {
            display: flex;
            justify-content: end;
          }
          p {
            min-height: 20px;
            min-width: 20px;
            background-color: ${theme.color.primary};
            border-radius: 100%;
            color: ${theme.color.white};
            font-size: 9px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        &.active {
          background: #95ccd52b;
        }
      }
      .user-notfound {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        p {
          color: #295086;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
          letter-spacing: 0.5px;
        }
      }
    }
  }
  .chatinnerbox-wrapper {
    flex: 1;
    position: relative;
    .chat-inner-headerbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid ${theme.color.border};
      .quick-chat-list-wrapper {
        margin: 0;
        .user-detail-wrapper {
          h3 {
            font-size: 12px;
            color: #111111;
            font-weight: 600;
            margin-bottom: 0;
          }
          p {
            &.offline {
              color: ${theme.color.darkblue};
            }
            font-size: 10px;
            color: #18c07a;
          }
        }
        .global_laguage_icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          cursor: pointer;
        }
      }
      .massage-detail-wrapper {
        p {
          color: ${theme.color.darkblue06};
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        ul {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          li {
            color: ${theme.color.darkblue06};
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            position: relative;
            display: flex;
            align-items: center;
            margin-right: 12px;
            padding-right: 12px;
            &:after {
              position: absolute;
              content: "";
              background: ${theme.color.darkblue06};
              width: 4px;
              height: 4px;
              right: 0;
            }
            &:last-child {
              margin-right: 0px;
              padding-right: 0px;
              &:after {
                content: unset;
              }
            }
          }
        }
      }
      .dropdown {
        .dropdown-toggle {
          width: 24px;
          height: 24px;
          border: none;
          box-shadow: none;
          padding: 0;
          background: #f1f4f7;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:after {
            content: unset;
          }
          i {
            width: 18px;
            height: 8px;
            display: flex;
            transform: rotate(90deg);
            svg {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .chat-footer-wrapper {
      width: 100%;
      padding: 12px 12px 4px 12px;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .input-wrapper {
        width: calc(100% - 50px);
        position: relative;
        input,
        textarea {
          height: 52px;
          resize: none;
          border-radius: 100px;
          background: rgba(192, 210, 235, 0.62);
          padding: 17px 20px 0px;
          color: ${theme.color.darkblue06};
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          border: none;
          width: 100%;
          outline: none;
          box-shadow: none;
          padding-right: 35px;

          &::-webkit-scrollbar {
            display: none;
          }

          &:focus {
            outline: 0;
          }
        }
        textarea::-webkit-input-placeholder {
          /* color: #fff; */
          /* padding:30px; */
          /* margin:15px; */
          /* line-height:30px; */
        }
        .emoji-smile {
          width: 21px;
          height: 21px;
          /* display: flex;
                    justify-content: center;
                    align-items: center; */
          position: absolute;
          right: 15px;
          top: 14px;
          /* bottom: 0;
                    margin: auto; */
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
      .send-icon {
        width: 40px;
        height: 40px;
        border: none;
        outline: none;
        box-shadow: none;
        border-radius: 100px;
        background: ${theme.color.secondary};
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      aside {
        &.epr-main {
          position: absolute;
          right: 0;
          bottom: 60px;
        }
      }
    }
    .set-chat-body {
      /* display: flex; */
      /* flex-direction: column; */
      /* justify-content: flex-end; */
      &.message {
        height: 380px;
      }
      height: 340px;
      overflow: auto;
      padding: 0px 15px;
      display: flex;
      flex-direction: column;
      /* justify-content: flex-end; */
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        background: #e9dede;
      }
      &::-webkit-scrollbar-thumb {
        background: #295086;
      }
    }
    .user-chat-box-body-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      flex: 1;
      /* height: 100%; */
      .user-chat-box-list {
        display: flex;
        margin-bottom: 15px;
        &.right-box {
          white-space: pre-wrap;
          justify-content: flex-end;
        }
        &.left-box {
          justify-content: flex-start;
          .chatbox {
            background: #fffef7;
            border-radius: 15px 15px 15px 0;
            p {
              color: ${theme.color.secondary};
            }
          }
        }
        .chatbox {
          border-radius: 15px 15px 0 15px;
          background: ${theme.color.primary};
          display: inline-flex;
          padding: 12px 9px 12px 11px;
          justify-content: center;
          align-items: center;
          max-width: 350px;
          p {
            color: ${theme.color.white};
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            word-break: break-word;
          }
        }
      }
    }
  }
`;

export const InsightsDashboardMainTabWrapper = styled.div`
  display: flex;
  .sitback-left-dashboard-sidebar-wrapper{
    width: 300px;
    ${mediaQueries("md")`
      display: none;
    `}
    .sitback-toggle-close-menu-wrapper{
      display: none;
    }
    &.sidebar-toggle-menu-open{
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      background: #FFFFFF;
      height: 100vh;
      .sitback-toggle-close-menu-wrapper{
       display: flex;
       width: 45px;
       height: auto;
       overflow: hidden;
       position: absolute;
       right: -20px;
       top: 12px;
       padding: 5px;
       border: 1px solid #C8C7CC;
       border-radius: 15px;
       background: #FFFFFF;
       img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
       }
      }
    }
    .sitback-insights-tab-wrapper{
      /* background: transparent; */
      box-shadow: none;
      border-radius: 30px;
      border: 1px solid #EFEFF4;
      padding: 40px 15px 40px 25px;
      background: #FFFFFF;
      min-height: 500px;
      ${mediaQueries("md")`
       border-bottom: 0;
       border-top-left-radius: 0;
       border-bottom-left-radius: 0;
       border-bottom-right-radius: 0;
       padding: 40px 15px 20px 25px;
      `}
      .sidebar-main-loader-div{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 250px;
        height: 100%;
      }
      .sitback-logo-wrapper{
        width: 100%;
        height: 90px;
        overflow: hidden;
        margin: 0 auto 50px;
        display: block;
        /* ${mediaQueries("lg")`
          padding: 0 0 25px 0;
        `}
        ${mediaQueries("md")`
            padding: 0 0 20px 0;
        `} */
        ${mediaQueries("sm")`
            height: 70px;
            margin: 0 auto 30px;
        `}
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }
      .nav{
        background: transparent;
        ${mediaQueries("md")`
          max-height: 420px;
          overflow-y: auto;
          flex-direction: column;
          flex-wrap: nowrap;
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
            @media (prefers-color-scheme: dark) {
                  &::-webkit-scrollbar {
                    width: 8px;
                  }
                  &::-webkit-scrollbar-track {
                      background: ##8A8A8F;
                      border-radius: 8px;
                  }
                  &::-webkit-scrollbar-thumb {
                      background: #8A8A8F;
                      border-radius: 8px;
                  }
                }
        `}
        .nav-item{
          background: transparent;
          .nav-link{
            background: transparent;
            /* font-family: ${theme.font.fontFamilyPoppins}; */
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            color: #8A8A8F;
            margin-bottom: 25px;
            padding: 16px;
            border-radius: 28px;
            ${mediaQueries("sm")`
                margin-bottom: 15px;
                font-size: 14px;
                padding: 13px 16px;
            `}
            &.appointment-icon-link{
              i{
                svg{
                  transform: scale(2);
                }
              }
            }
            i{
              padding: 0;
              svg{
                object-fit: contain;
                object-position: center;
                display: flex;
              }
              &.lead-booking-icon{
                svg{
                  transform: scale(2);
                }
              }
            }
            &.active{
              background: #95CCD5;
              color: #FFFFFF;
              i{
                svg{
                  path{
                    fill: #FFFFFF;
                  }
                }
                &.sidebar-msg-icon{
                    svg{
                      path{
                        stroke: #FFFFFF !important;
                        fill: transparent !important;
                      }
                    }
                  }
              }
            }
            .sidebar-msg-icon{
              svg{
                path{
                  stroke: #8A8A8F;
                }
              }
            }
          }
        }
      }
    }
    .sitback-logout-div{
      padding: 0 15px 0 25px;
      margin-top: 40px;
      ${mediaQueries("sm")`
          margin-top: 20px;
      `}
      a{
        border: 1px solid #EFEFF4;
        background: #F9F9F9;
        padding: 16px 16px 16px 20px;
        font-weight: 500;
        font-size: 17px;
        line-height: 100%;
        letter-spacing: 0px;
        color: #8A8A8F;
        border-radius: 28px;
        width: 100%;
        display: flex;
        ${mediaQueries("sm")`
            padding: 13px 16px 13px 20px;
            font-size: 15px;
        `}
        i{
          margin-right: 20px;
        }
      }
    }
  }
  .sitback-right-dashboard-display-div{
    margin-left: 30px;
    flex: 1;
    overflow: hidden;
    ${mediaQueries("md")`
      margin-left: 0;
    `}
    .mobile-header-display-div{
      display: none;
      padding: 18px 0 0;
      ${mediaQueries("sm")`
        display: flex;
        flex-wrap: wrap;
      `}
      .date-select-wrapper{
        position: relative;
        /* width: 135px; */
        flex: 1;
        margin-bottom: 12px;
        .react-datepicker-wrapper{
          width: 100%;
            .react-datepicker__input-container{
              .datepicker-input{
                border: 1px solid #EFEFF4;
                background: #FFFFFF;
                border-radius: 25px;
                padding: 15px 15px 15px 35px;
                font-weight: 400;
                font-size: 10px !important;
                line-height: 100%;
                letter-spacing: 0px;
                color: #000000;
                width: 100%;
              }
              input:focus {
                outline: none;
              }
              .global_laguage_icon{
                width: 16px;
                height: auto;
                overflow: hidden;
                left: 5px;
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
          padding: 15px 15px 15px 45px;
          font-weight: 400;
          font-size: 11px;
          line-height: 100%;
          letter-spacing: 0px;
          color: #000000;
        }
        .calendar-icon{
          position: absolute;
          width: 40px;
          height: auto;
          overflow: hidden;
          top: 0px;
          bottom: 0;
          left: 5px;
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
      .week-month-filters{
        display: flex;
        align-items: center;
        margin-left: 8px;
        margin-bottom: 12px;
        &.sitback-all-pending-filter-wrapper{
          margin-left: 0;
          justify-content: space-between;
          width: 100%;
          button{
              min-height: unset;
          }
        }
        button{
          font-weight: 400;
          font-size: 10px;
          line-height: 100%;
          color: #8A8A8F;
          border: 1px solid #EFEFF4;
          padding: 8px 4px;
          border-radius: 25px;
          background: #FFFFFF;
          min-width: 70px;
          min-height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.month-btn{
            margin-left: 6px;
          }
          &.active-filter{
            background: #95CCD5;
            border-color: #95CCD5;
            color: #FFFFFF;
          }
        }
       }
      .react-datepicker-popper{
        z-index: 3;
      }
      .search-input-icon-div{
        position: relative;
        width: 100%;
        margin-bottom: 12px;
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
          min-height: 45px;
          &::placeholder{
            font-weight: 400;
            font-size: 12px;
            line-height: 100%;
            color: #8A8A8F;
          }
          &:focus{
            outline:none;
            box-shadow:none;
          }
        }
      }
      .search-status-select-display-div{
        display: flex;
        align-items: center;
        width: 100%;
        .search-input-icon-div{
          flex: 1;
        }
        .status-dropdown-display-wrapper{
          min-width: 146px;
          margin-left: 8px;
          margin-top: -16px;

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
              padding: 3px 2px;
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
      }
    }
  }
`;

export const ShowCaseAppointmentDetailDiv = styled.div`
  padding: 50px 80px;
  min-height: 700px;
  ${mediaQueries("xl")`
    padding: 50px 65px;
  `}
  ${mediaQueries("lg")`
    padding: 40px 45px;
  `}
  ${mediaQueries("md")`
    padding: 30px 35px;
  `}
  ${mediaQueries("sm")`
    padding: 20px 15px;
  `}
  .form-select{
    border-radius: 100px;
    border: 1px solid #DADADA99;
    padding: 17px 16px;
    font-weight: 300;
    font-size: 16px;
    line-height: 25px;
    color: #57565E99;
  }
  .sitback-select2-container{
    .sitback-select-option__single-value{
      font-weight: 300 !important;
      font-size: 16px !important;
      line-height: 25px !important;
      color: #57565E99 !important;
    }
  }
  .date-input-wrapper{
    width: 100%;
    ${mediaQueries("sm")`
      max-width: 100%;
    `}
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
          background: #FFFFFF;
          &::placeholder{
            font-weight: 300;
            font-size: 16px;
            line-height: 25px;
            color: #57565E99 !important;
          }
        }
      }
    }
    .text-danger{
      margin-top: 12px;
      font-weight: 500;
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
    .add-appointment-btn{
      max-width: 360px;
      padding: 20px 15px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;
      margin-right: 40px;
      ${mediaQueries("lg")`
        margin-right: 20px;
      `}
      ${mediaQueries("sm")`
        margin-right: 0;
        margin-bottom: 20px;
      `}
    }
    .cancel-btn-wrapper{
      max-width: 360px;
      padding: 20px 15px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;
    }
  }
  .appointment-submit-main-div{
    margin-top: 60px;
    .appointment-box-wrapper{
      background: #FFFFFF;
      border: 1px solid #CDCDCD;
      border-radius: 5px;
      padding: 8px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      ${mediaQueries("sm")`
       padding: 8px 10px;
       flex-direction: column;
       justify-content: center;
      `}
      .appointment-detail-content-div{
        max-width: 20%;
        flex-basis: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.appointment-first-detail-div {
          justify-content: flex-start;
          padding-left: 20px;
        }
        ${mediaQueries("sm")`
          max-width: 100%;
          height: 100%;
          margin-bottom: 12px;
        `}
        &:first-child{
          max-width: 35%;
          flex-basis: 35%;
          ${mediaQueries("sm")`
            max-width: 100%;
            height: 100%;
          `}
        }
        &:last-child{
          max-width: 25%;
          flex-basis: 25%;
          ${mediaQueries("sm")`
            max-width: 100%;
            height: 100%;
            margin-bottom: 0;
          `}
        }
        .appointment-list-display-wrapper{
          padding-left: 6px;
          list-style-type: disc !important;
          li{
            font-weight: 400;
            font-size: 14px;
            line-height: 100%;
            letter-spacing: 0px;
            color: #8A8A8F;
            margin-bottom: 6px;
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
      }
      p{
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0px;
        color: #8A8A8F;
        &.appointment-name-text{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 110px;
          min-height: 17px;
        }
      }
      .add-appointment-btn{
        max-width: 170px;
        padding: 13px 18px;
        ${mediaQueries("xl")`
          padding: 13px 12px;
          max-width: 130px;
        `}
        ${mediaQueries("lg")`
          padding: 13px 10px;
          max-width: 120px;
        `}
        ${mediaQueries("md")`
          padding: 13px 9px;
          max-width: 100px;
        `}
        ${mediaQueries("sm")`
          padding: 13px 8px;
          max-width: 100%;
          min-width: 120px;
        `}
      }
    }
  }
  .react-datepicker{
    .react-datepicker__triangle{
      display: none !important;
    }
  }
`;

export const AppointmentContentDiv = styled.div`
  background: #FFFFFF;
  border: 1px solid #EFEFF4;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
  ${mediaQueries("md")`
    padding: 20px;
  `}
  ${mediaQueries("sm")`
    padding: 20px 15px;
  `}
  .table-title-div{
    margin-bottom: 28px;
    h3{
      font-weight: 800;
      font-size: 19px;
      line-height: 16px;
      color: #000000;
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
  }
  .appointment-table-div{
    position: relative;
    ${mediaQueries("sm")`
      display: none;
    `}
    .infinite-scroll-component{
      padding-right: 15px;
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
    }
    .not-found-text-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
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
  .appointment-mobile-table-div{
    display: none;
    position: relative;
    .not-found-text-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ${mediaQueries("sm")`
      display: block;
    `}
    .infinite-scroll-component{
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
          background: #E9DEDE;
          border-radius: 8px;
      }
      &::-webkit-scrollbar-thumb {
          background: #8A8A8F;
          border-radius: 8px;
      }
      @media (prefers-color-scheme: dark) {
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-track {
            background: #E9DEDE;
            border-radius: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: #8A8A8F;
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
            padding: 12px 10px;
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
            .appointment-detail-div{
              p{
                font-weight: 400;
                font-size: 8px;
                line-height: 100%;
                letter-spacing: 0px;
                color: #57565E;
                margin-bottom: 5px;
              }
              h5{
                font-weight: 700;
                font-size: 12px;
                line-height: 100%;
                color: #57565E;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 80px;
              }
            }
            .body-massage-detail-div{
              text-align: center;
              .icon-img{
                width: 15px;
                height: auto;
                overflow: hidden;
                margin-right: 6px;
                img{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                }
              }
              .slot-time-text{
                font-weight: 400;
                font-size: 8px;
                line-height: 100%;
                letter-spacing: 0px;
                color: #57565E;
                margin-bottom: 5px;
              }
              .detail-text{
                font-weight: 700;
                font-size: 8px;
                line-height: 100%;
                margin-bottom: 4px;
                color: #57565E;
              }
              .appointment-status{
                font-weight: 700;
                font-size: 8px;
                line-height: 100%;
                text-transform: capitalize;
                &.rejected{
                  color: #E95060;
                }
                &.pastbooking{
                  color: #E95060;
                }
                &.pending{
                  color: #295086;
                }
                &.approved{
                  color: #4A9D77;
                }
              }
            }
            .massage-appointment-image-div{
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 6px;
              .notification-icon-wrapper{
                width: 15px;
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

            .appoint-table-btn-div{
              display: flex;
              align-items: center;
              .appointment-status-active-div{
                display: flex;
                align-items: center;
                span{
                  min-width: 90px;
                  padding: 7px 12px;
                  font-weight: 500;
                  font-size: 10px;
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
                  min-width: 16px;
                  height: auto;
                  overflow: hidden;
                  margin-left: 4px;
                  &.edit-pencil-icon{
                    border: 1px solid #d4d4d6;
                    padding: 3px;
                    height: 16px;
                    border-radius: 1000px;
                    min-width: unset;
                    width: 16px;
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
                font-size: 10px;
                line-height: 16px;
                text-transform: uppercase;
                border-radius: 25px;
                min-width: 60px;
                padding: 7px 10px;
                background: #95CCD5;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                &.declined{
                  color: #E95060;
                  background: #FFE0E4;
                  margin-left: 6px;
                }
                &.suggest-btn{
                  margin-left: 20px;
                }
              }
              .confirmation-select-wrapper{
                display: flex;
                align-items: center;
                .confirmation-dropdown{
                  min-width: 100px;
                  max-height: 30px;
                  padding: 6px 12px 6px 10px;
                  border-radius: 25px;
                  font-weight: 500;
                  font-size: 9px;
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
                  min-width: 60px;
                  font-weight: 500;
                  font-size: 8px;
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
                min-width: 60px;
                &.decline-btn-display-div{
                  justify-content: flex-end;
                }
                &.accept-btn-display-div{
                  justify-content: flex-start;
                }
                .accept-btn{
                  width: 25px;
                  height: 25px;
                  overflow: hidden;
                  img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                  }
                }
                .decline-btn{
                  width: 25px;
                  height: 25px;
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

`;

export const AddServiceDetailDiv = styled.div`
  padding: 50px 80px;
  ${mediaQueries("xl")`
    padding: 50px 65px;
  `}
  ${mediaQueries("lg")`
    padding: 40px 45px;
  `}
  ${mediaQueries("md")`
    padding: 30px 35px;
  `}
  ${mediaQueries("sm")`
    padding: 20px 15px;
  `}
  .add-serice-form-group-wrapper{
    margin-bottom: 30px;
    .sitback-select-option__control{
      .sitback-select-option__value-container{
        .sitback-select-option__single-value{
          font-weight: 300;
          font-size: 16px;
          line-height: 25px;
          color: #57565E99;
          text-transform: capitalize;
        }
      }
    }
    .sitback-select2-container{
      .sitback-select-option__menu{
        z-index: 12;
      }
    }

  }
  .input-service-wrapper{
    background: #FFFFFF;
    border: 1px solid #DADADA99;
    padding: 12px 30px;
    min-height: 60px;
    font-weight: 300;
    font-size: 16px;
    line-height: 25px;
    color: #57565E99;
    &:focus{

    }
    color: #57565E99;
    &::placeholder{
      color: #57565E99;
      font-weight: 300;
      font-size: 16px;
      line-height: 25px;
    }
  }
  .addpricemessage{
    margin: 12px 0 0 0;
    span{
      font-weight: 300;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 1px;
      color: #57565EB2;
      margin-left: 8px;
    }
  }
  .add-service-text-area-wrapper{
    margin-bottom: 30px;
    .form-control{
      resize: none;
      background: #FFFFFF;
      border: 1px solid #DADADA99;
      border-radius: 10px;
      font-weight: 300;
      font-size: 16px;
      line-height: 25px;
      color: #57565E99;
      &::placeholder{
        color: #57565E99;
        font-weight: 300;
        font-size: 16px;
        line-height: 25px;
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
    .add-appointment-btn{
      max-width: 360px;
      padding: 20px 15px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;
      margin-right: 40px;
      ${mediaQueries("lg")`
        margin-right: 20px;
      `}
      ${mediaQueries("sm")`
        margin-right: 0;
        margin-bottom: 20px;
      `}
    }
    .cancel-btn-wrapper{
      max-width: 360px;
      padding: 20px 15px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;
    }
  }
`;

export const LeadsAndBookingDisplayWrapper = styled.div`
  padding: 25px 0;
  .leads-boxes-main-div{
      .lead-box-wrapper{
        background: #FFFFFF;
        border: 1px solid #EFEFF4;
        border-radius: 10px;
        padding: 50px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 370px;
        height: calc(100% - 30px);
        margin-bottom: 30px;
        position: relative;
        z-index: 1;
        cursor: pointer;
        &::after{
          width: calc(100% + 15px);
          height: calc(100% + 15px);
          border: 6px solid #DCDBED;
          filter: blur(33.97852325439453px);
          position: absolute;
          content: '';
          opacity: 0;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: -1;
        }
        &:hover{
          &::after{
            opacity: 1;
          }
        }
        ${mediaQueries("sm")`
          min-height: 310px;
        `}
        &:hover{

        }
        .lead-box-img{
          width: 90px;
          height: 90px;
          overflow: hidden;
          margin-bottom: 15px;
          ${mediaQueries("xl")`
            width: 85px;
            height: 85px;
          `}
          ${mediaQueries("lg")`
            width: 80px;
            height: 80px;
          `}
          ${mediaQueries("md")`
            width: 75px;
            height: 75px;
          `}
          ${mediaQueries("sm")`
            width: 70px;
            height: 70px;
          `}
          img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
          }
        }
        .total-lead-para-text{
          font-weight: 300;
          font-size: 18px;
          line-height: 16px;
          color: #8A8A8F;
          margin-bottom: 18px;
          ${mediaQueries("lg")`
             font-size: 17px;
          `}
          ${mediaQueries("md")`
             font-size: 16px;
          `}
          ${mediaQueries("sm")`
             font-size: 15px;
          `}
        }
        h3{
          font-weight: 600;
          font-size: 40px;
          line-height: 100%;
          color: #000000;
          margin-bottom: 15px;
          ${mediaQueries("xl")`
             font-size: 36px;
          `}
          ${mediaQueries("lg")`
             font-size: 32px;
          `}
          ${mediaQueries("md")`
             font-size: 28px;
          `}
          ${mediaQueries("sm")`
             font-size: 24px;
          `}
        }
        .growth-text{
          font-weight: 700;
          font-size: 16px;
          line-height: 100%;
          letter-spacing: 0px;
          color: #4A9D77;
          display: flex;
          align-items: center;
          &.negative-growth-text{
            color: #E95060;
          }
          span{
            margin-right: 8px;
            width: 8px;
            height: auto;
            overflow: hidden;
            display: block;
            img{
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center;
              &.negative-growth-icon{
                transform: rotate(180deg);
              }
            }
          }
          ${mediaQueries("md")`
             font-size: 15px;
          `}
          ${mediaQueries("sm")`
             font-size: 14px;
          `}
        }
      }
  }
`;

export const AvailabilityDetailDiv = styled.div`
  padding: 20px 24px;
  ${mediaQueries("lg")`
      padding: 20px 22px;
  `}
  ${mediaQueries("md")`
      padding: 20px;
  `}
  ${mediaQueries("sm")`
      padding: 20px 15px;
  `}
  .availability-main-wrapper-div{
    background: #FFFFFF;
    border: 1px solid #EFEFF4;
    border-radius: 10px;
    padding: 45px 15px;
    height: 600px;
    .title-content-div{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 30px;
      position: relative;
      ${mediaQueries("xs")`
        flex-direction: column;
        align-items: flex-start;
      `}
      h3{
        text-align: center;
        font-weight: 800;
        font-size: 19px;
        line-height: 16px;
        color: #000000;
        width: 100%;
        ${mediaQueries("lg")`
            font-size: 18px;
        `}
        ${mediaQueries("md")`
            font-size: 17px;
        `}
        ${mediaQueries("sm")`
            font-size: 16px;
        `}
        ${mediaQueries("xs")`
          text-align: left;
          margin-bottom: 15px;
        `}
      }
      .select-display-div{
        flex: 1;
        .form-select{
          border: 1px solid #EFEFF4;
          background: #FFFFFF;
          border-radius: 25px;
          padding: 15px 12px;
          min-width: 160px;
        }
      }
    }
    .availability-table-div{
      position: relative;
      max-height: 450px;
      overflow: auto;
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
      .not-found-available-text-div{
        min-height: 350px;
        .not-found-availability{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 16px;
          line-height: 16px;
          letter-spacing: 0px;
          color: #57565E;
        }
      }
      .table{
        position: relative;
        &.table-striped > tbody > tr:nth-of-type(odd) > *{
          --bs-table-bg-type: #F8F8FB;
        }
        &.table-striped > tbody > tr:nth-of-type(even) > *{
          --bs-table-bg-type: transparent;
        }
        thead{
          tr{
            th{
              font-weight: 700;
              font-size: 16px;
              line-height: 16px;
              color: #57565E;
              padding: 15px 12px;
              border: none;
              text-align: left;
              &:first-child{
                padding-left: 20px;
              }
            }
          }
        }
        tbody{
          tr{
            td{
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              color: #8A8A8F;
              border: none;
              padding: 10px 12px;
              vertical-align: middle;
              text-align: left;
              &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
              }
              &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
              }
              .service-text-span{
                margin-bottom: 6px;
                display: block;
              }
              .service-ul-wrapper{
                list-style-type: disc !important;
                padding-left: 25px;
                li{
                  margin-bottom: 6px;
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
              }
              .action-td-wrapper{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                a{
                  width: 18px;
                  height: auto;
                  display: block;
                  &.edit-icon{
                    margin-right: 24px;
                  }
                  img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                  }
                }
              }
              .confirmed-btn{
                border-radius: 100px;
                background: #6bbe9966;
                min-height: 29px;
                color: #FFF;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0.2px;
                min-width: 112px;
                border: none;
                &.question-btn{
                  background: #95CCD5;
                }
              }
            }
          }
        }
        .table-loader-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }
  .add-remove-user-main-div{
    background: #FFFFFF;
    border: 1px solid #EFEFF4;
    border-radius: 10px;
    padding: 45px 15px;
    height: 600px;
    .add-remove-user-title-div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      margin-bottom: 30px;
      ${mediaQueries("sm")`
        padding: 0;
      `}
      h3{
        font-weight: 800;
        font-size: 19px;
        line-height: 100%;
        color: ${theme.color.black};
        ${mediaQueries("xl")`
          font-size: 18px;
        `}
        ${mediaQueries("lg")`
          font-size: 17px;
        `}
        ${mediaQueries("md")`
          font-size: 16px;
        `}
        ${mediaQueries("sm")`
          font-size: 15px;
        `}
      }
      button{
        background: #95CCD5;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        text-align: center;
        text-transform: uppercase;
        color: ${theme.color.white};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border-radius: 100px;
        border: none;
        min-width: 215px;
        min-height: 55px;
        ${mediaQueries("sm")`
          font-size: 12px;
          min-height: 45px;
          min-width: unset;
          padding: 12px 8px;
        `}
      }
    }
    .add-remove-table-div{
      position: relative;
      max-height: 450px;
      overflow: auto;
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
      .not-found-available-text-div{
        min-height: 350px;
        .not-found-availability{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 16px;
          line-height: 16px;
          letter-spacing: 0px;
          color: #57565E;
        }
      }
      .table{
        position: relative;
        &.table-striped > tbody > tr:nth-of-type(odd) > *{
          --bs-table-bg-type: #e5e5e566;
        }
        &.table-striped > tbody > tr:nth-of-type(even) > *{
          --bs-table-bg-type: transparent;
        }
        thead{
          tr{
            th{
              font-weight: 700;
              font-size: 16px;
              line-height: 16px;
              color: #57565E;
              padding: 15px 20px;
              border: none;
              text-align: left;
              width: 100%;
              ${mediaQueries("sm")`
                padding: 15px 20px 15px 0;
              `}
              &.added-th-wrapper{
                min-width: 160px;
              }
            }
          }
        }
        tbody{
          tr{
            td{
              font-weight: 400;
              font-size: 14px;
              line-height: 16px;
              color: #8A8A8F;
              border: none;
              padding: 13px 23px;
              vertical-align: middle;
              text-align: left;
              width: 100%;
              ${mediaQueries("sm")`
                padding: 13px 23px 13px 4px;
              `}
              &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
              }
              &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
              }
              .added-name-text{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 120px;
              }
              .service-text-span{
                margin-bottom: 6px;
                display: block;
              }
              .service-ul-wrapper{
                list-style-type: disc !important;
                padding-left: 25px;
                li{
                  margin-bottom: 6px;
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
              }
              .action-td-wrapper{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                a{
                  width: 18px;
                  height: auto;
                  display: block;
                  &.edit-icon{
                    margin-right: 24px;
                  }
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
        .table-loader-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }
`;

export const UpgradePlanDisplayDiv = styled.div`
  padding: 35px 20px 35px 120px;
  ${mediaQueries("lg")`
      padding: 35px 20px 35px 80px;
  `}
  ${mediaQueries("md")`
      padding: 35px 20px 35px 50px;
  `}
  ${mediaQueries("sm")`
      padding: 35px 20px 35px 30px;
  `}
  ${mediaQueries("xs")`
      padding: 35px 20px 35px 15px;
  `}
  .upgrade-plan-box-wrapper{
    max-width: 550px;
    width: 100%;
    .upgrade-plan-box-div{
      background: #FFFFFF;
      border: 1px solid #F0F0F0;
      border-radius: 12px;
      padding: 20px 24px;
      ${mediaQueries("lg")`
          padding: 20px 22px;
      `}
      ${mediaQueries("md")`
          padding: 20px;
      `}
      ${mediaQueries("sm")`
          padding: 20px 18;
      `}
      ${mediaQueries("xs")`
          padding: 20px 16px;
      `}
      .upgrade-plan-header-wrapper{
        padding-bottom: 25px;
        border-bottom: 1px solid #00000014;
        h3{
          font-weight: 700;
          font-size: 48px;
          line-height: 100%;
          letter-spacing: 0.8px;
          color: #95CCD5;
          margin-bottom: 20px;
          ${mediaQueries("lg")`
              font-size: 44px;
          `}
          ${mediaQueries("md")`
              font-size: 40px;
          `}
          ${mediaQueries("sm")`
              font-size: 36px;
          `}
          ${mediaQueries("xs")`
              font-size: 32px;
          `}
          sup{
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 0.17px;
            color: #29508699;
            position: relative;
            top: -15px;
            margin-left: 6px;
            ${mediaQueries("sm")`
                top: -10px;
            `}
            ${mediaQueries("xs")`
                top: -5px;
            `}
          }
        }
        h5{
          font-weight: 700;
          font-size: 18px;
          line-height: 100%;
          letter-spacing: 0.34px;
          margin-bottom: 10px;
          color: #161616;
          ${mediaQueries("lg")`
              font-size: 17px;
          `}
          ${mediaQueries("md")`
              font-size: 16px;
          `}
          ${mediaQueries("sm")`
              font-size: 15px;
          `}
        }
        p{
          font-weight: 300;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.17px;
          color: #8A8A8F;
        }
      }
      .plan-list-display-div{
        margin-top: 15px;
        ul{
          list-style-type: none !important;
          padding: 0;
          margin-bottom: 70px;
          li{
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 16px;
            line-height: 26px;
            letter-spacing: 0.2px;
            color: #9FA0A2;
            ${mediaQueries("sm")`
                font-size: 15px;
                line-height: 22px;
            `}
            ${mediaQueries("xs")`
                font-size: 14px;
                line-height: 18px;
            `}
            &:last-child{
              margin-bottom: 0;
            }
            i{
              width: 24px;
              height: auto;
              overflow: hidden;
              display: block;
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
        .cancel-plan-btn-div{
          display: flex;
          justify-content: center;
          align-items: center;
          button{
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0.2px;
            color: #FFFFFF;
            max-width: 390px;
          }
        }
      }
    }
    .para-note-text{
      font-weight: 300;
      font-size: 14px;
      line-height: 23px;
      letter-spacing: 0.3px;
      text-align: center;
      color: #8A8A8F;
      max-width: 450px;
      width: 100%;
      margin: 30px auto 0;
    }
  }
`;

export const VideoUpgradeWrapper = styled.div`
  margin-top: 20px;
  .video-upload-inner-div{
    border-radius: 10px;
    border: 1px solid #EFEFF4;
    background: #FFF;
    padding: 40px 35px 30px;
    margin-bottom: 12px;
    ${mediaQueries("xl")`
      padding: 40px 30px 30px;
    `}
    ${mediaQueries("lg")`
      padding: 40px 25px 30px;
    `}
    ${mediaQueries("md")`
      padding: 40px 20px 30px;
    `}
    ${mediaQueries("sm")`
      padding: 40px 15px 30px;
    `}
    .video-header-div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      h4{
        display: flex;
        align-items: center;
        color: #295086;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        ${mediaQueries("md")`
          font-size: 15px;
        `}
        i{
          margin-right: 6px;
        }
      }
      p{
        display: flex;
        align-items: center;
        color: #8A8A8F;
        font-size: 14px;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 1px;
        i{
          margin-right: 10px;
        }
      }
    }
    .video-display-div{
      display: flex;
      margin-bottom: 40px;
      ${mediaQueries("lg")`
        flex-direction: column;
      `}
      .video-upload-input{
        width: 55%;
        ${mediaQueries("lg")`
           width: 100%;
        `}
        .top-div-wrapper{
          min-height: 18px;
          margin-bottom: 12px;
        }
        .video-upload-wrapper{
          border-radius: 10px;
          border: 1px dashed #95CCD5;
          background: #F0F6F6;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 45px 20px 50px;
          min-height: 255px;
          .upload-icon{
            width: 60px;
            height: 60px;
            oveflow: hidden;
            margin: 0 auto 25px;
          }
          .drag-text{
            color: #8A8A8F;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
            margin-bottom: 8px;
            text-align: center;
            span{
              color: #95CCD5;
            }
            ${mediaQueries("lg")`
              font-size: 15px;
            `}
            ${mediaQueries("md")`
              font-size: 14px;
            `}
          }
          .upload-text{
            color: #8A8A8F;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
            ${mediaQueries("lg")`
              font-size: 15px;
            `}
            ${mediaQueries("md")`
              font-size: 14px;
            `}
          }
        }
      }
      .video-uploaded-display-div{
        flex: 1;
        overflow: hidden;
        margin-left: 25px;
        ${mediaQueries("lg")`
          margin-left: 0;
          margin-top: 25px;
        `}
        .preview-text{
          color: #295086;
          font-size: 16px;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1px;
          margin-bottom: 12px;
          ${mediaQueries("lg")`
            font-size: 15px;
          `}
          ${mediaQueries("md")`
            font-size: 14px;
          `}
        }
        .video-main-div{
          div{
            width: 100% !important;
            height: 255px !important;
            overflow: hidden;
            border-radius: 10px;
            video{
              width: 100%;
              height: 100% !important;
              object-fit: cover;
              object-position: center;
            }
          }
        }
      }
    }
    .switch-div{
      display: flex;
      align-items: center;
      label{
        color: #295086;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        margin-right: 20px;
        ${mediaQueries("lg")`
          font-size: 15px;
        `}
        ${mediaQueries("md")`
          font-size: 14px;
        `}
      }
      .react-switch-bg{
        svg{
          display: none;
        }
      }
    }
    .preview-container {
      margin-bottom:15px;
      display: flex;
      align-items: center; /* vertically centers text */
      gap: 6px; /* space between label and paragraph */
       label{
        color: #295086;
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        margin-right: 10px;
        ${mediaQueries("lg")`
          font-size: 15px;
        `}
        ${mediaQueries("md")`
          font-size: 14px;
        `}
      }
    }

    .preview-text-small {
    margin: 0; /* remove default paragraph margin */
    color: #8A8A8F;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1px;

    }
  }
  .featured-section{
    border-radius: 10px;
    border: 1px solid #EFEFF4;
    background: #FDFFFF;
    padding: 25px 35px;
    ${mediaQueries("xl")`
      padding: 25px 30px;
    `}
    ${mediaQueries("lg")`
      padding: 25px 25px;
    `}
    ${mediaQueries("md")`
      padding: 25px 20px;
    `}
    ${mediaQueries("sm")`
      padding: 25px 15px;
    `}
    .featured-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .featured-header-left-div{
        display: flex;
        align-items: center;
        h4{
          display: flex;
          align-items: center;
          color: #295086;
          font-size: 16px;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1px;
          ${mediaQueries("lg")`
            font-size: 15px;
          `}
          ${mediaQueries("md")`
            font-size: 14px;
          `}
          i{
            margin-right: 6px;
          }
        }
        span{
          border-radius: 100px;
          background: rgba(40, 179, 115, 0.34);
          color: #28B373;
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 1px;
          padding: 4px 9px;
          margin-left: 24px;
          ${mediaQueries("lg")`
            font-size: 15px;
          `}
          ${mediaQueries("md")`
            font-size: 14px;
          `}
        }
      }
      .featured-header-right-div{
        display: flex;
        align-items: center;
        p{
          display: flex;
          align-items: center;
          color: #8A8A8F;
          font-size: 14px;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 1px;
          margin-right: 25px;
          ${mediaQueries("sm")`
            display: none;
          `}
          i{
            margin-right: 10px;
          }
        }
        .react-switch-bg{
          svg{
            display: none;
          }
        }
      }
    }
    .spa-visibility-text{
      color: #8A8A8F;
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 1px;
      margin-bottom: 45px;
      ${mediaQueries("lg")`
        font-size: 15px;
      `}
      ${mediaQueries("md")`
        font-size: 14px;
      `}
    }
    .featured-list-detail-div{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      ${mediaQueries("sm")`
        flex-direction: column;
      `}
      .list-left-div{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 55%;
        ${mediaQueries("sm")`
          width: 100%;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        `}
        .content-div{
          ${mediaQueries("sm")`
            margin-bottom: 20px;
          `}
          h6{
            color: #295086;
            font-size: 14px;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 1px;
            margin-bottom: 2px;
          }
          p{
            color: #8A8A8F;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 1px;
            text-align: center;
            ${mediaQueries("sm")`
              margin-bottom: 20px;
            `}
          }
        }
      }
      .list-right-div{
        display: flex;
        justify-content: flex-end;
        ${mediaQueries("sm")`
          width: 100%;
        `}
        p{
          display: flex;
          align-items: center;
          color: #8A8A8F;
          font-size: 14px;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 1px;
          display: none;
          ${mediaQueries("sm")`
            display: block;
          `}
          i{
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

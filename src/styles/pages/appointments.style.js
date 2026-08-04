"use client";

// import styled from "styled-components";
import styled from "@emotion/styled";
import { mediaQueries } from "../../utils/mediaQuery";
import { theme } from "../global/theme";

export const AppointmentsLayoutWrapper = styled.div`
  padding: 40px 0px;
  &.sitback-appointment-updated-display-div{
    .upcoming-schedules-failed-payment{
      .nav {
        background: #295086;
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
            background: ${theme.color.white};
            border-radius: 1000px;
            min-height: 53px;
            &.active {
              background: ${theme.color.secondary};
              color: ${theme.color.white};
            }
          }
        }
      }
      .tab-content{
        .box-wrapper-div{
          background: #FFFFFF;
          .sitback-updated-quick-box-wrapper{
            border-radius: 8px;
            border: 1px solid #EAEBEC;
            background: #FFF !important;
            box-shadow: 50px 0 64px 0 rgba(0, 0, 0, 0.03);
            .quick-chat-list-wrapper{
              .status-text-btn{
                background: #ED8B33;
                color: #FFF;
                font-size: 12px;
                font-weight: 400;
                line-height: 20px;
              }
            }
            .services-completed-block{
              .schedules-text{
                .noshow-btn{
                  // background: #CBD3D4 !important;
                  color: #FFF;
                  font-size: 10px;
                  font-weight: 600;
                  line-height: normal;
                  text-transform: uppercase;
                }
              }
            }
            .complete-payment-box{
              .complete-payment-box{
                .complete-get-payment-btn-wrapper{
                  background: #18C07A;
                  color: #FFF;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 23px;
                }
              }
                .sitback-updated-checkin-btn{
                  background: #295086;
                  color: #FFF;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 14px;
                }
            }
          }
          .employee-hours-btn-wrapper{
            border-radius: 100px;
            background: #004D87;
            color: #FFF;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            line-height: normal;
            text-transform: capitalize;
          }
        }        
      }
    }
    .specificevent-headerbar{
      button{
        background: #295086;
        color: #FFF;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        line-height: normal;
      }
    }
      .appointment-calender{
        .calender-title-text{
          .calender-unavailable-appointment{
            color: #FFF !important;
            text-align: center !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: normal !important;
            border-radius: 100px !important;
            background: #004D87 !important;
          }
        }
        .fc-header-toolbar{
          ${mediaQueries("sm")`
            flex-direction: column;
          `}
          .fc-toolbar-chunk{
            ${mediaQueries("sm")`
              width: 100%;
              margin-bottom: 12px;
            `}
            &:nth-child(3){
              background: #FFF;
              border-radius: 1000px;
              border: 1px solid #EAEAEA;
              padding: 0;
              button {
                font-size: 14px !important;
                font-weight: 600 !important;
                line-height: 20px !important;
                letter-spacing: 0px !important;
                padding: 15px !important;
                background: transparent !important;
                min-width: 160px !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                color: #295086 !important;
                border-radius: 1000px !important;
                min-height: 49px !important;
                &.fc-button-active {
                  background: ${theme.color.secondary} !important;
                  color: ${theme.color.white} !important;
                }
              }
            }
          }
        }
        .fc-day{
          &.custom-cell-bg{
            background-color: #295086 !important;
            .fc-daygrid-day-top{
              a{
                color: #FFF !important;
                font-size: 22px !important;
                font-weight: 500 !important;
                line-height: normal !important;
              }
            }
          }
          &.fc-day-today{
            background: #DAF7FF;
          }
        } 
         .fc-event-main{
          .fc-event-content{
            .eventContent{
              border-radius: 10px;
              background: #DFECF9;
            }
          }
         }
        .fc-timeGridDay-view{
              .fc-scrollgrid{
                thead{
                  tr{
                    th{
                      .fc-scroller-harness{
                        .fc-scroller{
                          table{
                            thead{
                              tr{
                                .fc-col-header-cell{
                                  background: transparent !important;
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
  .box-wrapper-div {
    border-radius: 8px;
    background: ${theme.color.lightyellow2};
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
    padding: 20px 0px 0px 0px;

    &.box-wrapper-padding {
      padding: 15px !important;
      margin-bottom: 20px;
    }
    // height: calc(100% - 20px);
    h5 {
      color: ${theme.color.secondary};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 1px;
      margin-bottom: 9px;
    }
    .schedule-text {
      color: #5d6566;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .checkbox-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: -8px;
      .checkbox-wrapper-div {
        padding: 8px;
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
          padding: 10px;
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
        .checkbox-wrapper-div {
          flex: 0 0 33.33%;
          label {
            justify-content: center;
          }
          input[type="checkbox"] + label {
            background: #bad9d5;
            border-color: #bad9d5;
          }
          input[type="checkbox"]:checked + label {
            border-color: ${theme.color.secondary};
            background-color: #eeeeee;
          }
        }
      }
    }
    &.upcoming-schedulesviewmore {
      max-height: 650px;
      overflow: auto;
      padding: 0 !important;
      /* padding-bottom: 15px !important; */
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: #ebebeb;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #c4c4c499;
      }
      .amount-text {
        color: #295086;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px;
      }
      .nodatext-div {
        margin-top: 0;
        padding: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 300;
        color: #295085;
      }
    }
    .cancelled-block {
      margin-bottom: 9px;
      h6 {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #f7847b;
        text-align: start;
      }
    }
    .startservice-btns-noshow {
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      width: 100%;
      gap: 15px;
      button {
        text-transform: uppercase;
        font-weight: 500;
        &.completed {
          background: #6bbe99;
          border-color: #6bbe99;
          margin: 0 auto;
          ${"" /* padding: 9px 25px; */}
          width: 180px !important;
          /* width: max-content; */
        }
        padding: 9px 18px;
        /* width: 100%; */
        /* min-width: max-content; */
        &.btn-noshowserives {
          /* width: max-content !important; */
          margin: auto;
          background-color: #e32c1f !important;
          background: #e32c1f !important;
          color: white !important;
          border: 1px solid #e32c1f !important;
          width: 180px !important;
        }
        &.get-payment-btn {
          background: #6bbe99;
          border-color: #6bbe99;
        }
      }
      &.completed-btn-wrapperdiv {
        button {
          width: 100% !important;
          &.completed {
          }
        }
      }
    }
    .fullview-btn {
      margin-top: 10px;
      button {
        &.get-payment-btn {
          width: 100%;
        }
      }
    }
  }
  .chatbox-wrapper-div {
    border-radius: 8px;
    background: ${theme.color.lightyellow2};
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
    .chat-headerbar {
      border-radius: 6px 6px 0px 0px;
      background: ${theme.color.secondary};
      padding: 12px;
      text-align: center;
      color: white;
      h6 {
        color: ${theme.color.white};
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
      }
    }
    .box-wrapper-div {
      height: 460px;
      overflow: auto;
      margin-right: 3px;
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
        .quick-chat-list-wrapper {
          margin-bottom: 0px;
          /* flex: 1; */
          margin-right: 12px;
          width: calc(100% - 55px);
        }
        .timetext {
          color: ${theme.color.darkblue06};
          font-family: Poppins;
          font-size: 11px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          /* width: 62px; */
          flex: 1;
        }
      }
    }
    .chatinnerbox-wrapper {
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
            }
            p {
              font-size: 10px;
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
      }
      .chat-footer-wrapper {
        width: 100%;
        padding: 12px;
        background: #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input-wrapper {
          width: calc(100% - 50px);
          input {
            border-radius: 100px;
            background: rgba(192, 210, 235, 0.62);
            padding: 8px 18px;
            color: ${theme.color.darkblue06};
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            border: none;
            width: 100%;
            outline: none;
            box-shadow: none;
            &:focus {
              outline: 0;
            }
          }
        }
        button {
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
      }
      .user-chat-box-body-wrapper {
        height: 360px;
        overflow: auto;
        padding: 15px;
        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-track {
          background: #e9dede;
        }
        &::-webkit-scrollbar-thumb {
          background: #295086;
        }
        .user-chat-box-list {
          display: flex;
          margin-bottom: 15px;
          &.right-box {
            justify-content: flex-end;
          }
          &.left-box {
            justify-content: flex-start;
            .chatbox {
              background: #fffef7;
              border-radius: 15px 15px 15px 0;
            }
          }
          .chatbox {
            border-radius: 15px 15px 0 15px;
            background: ${theme.color.primary};
            display: inline-flex;
            padding: 12px 9px 12px 11px;
            justify-content: center;
            align-items: center;
            max-width: 245px;
            p {
              color: #295086;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }
  }
  .employees-hours-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 30px;
    a {
      width: 100%;
      max-width: 350px;
      padding: 16px;
      border-radius: 100px;
      border: none;
      box-shadow: none;
      outline: none;
      background: ${theme.color.primary};
      color: ${theme.color.white};
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;
      border: 1px solid ${theme.color.primary};
      box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
      letter-spacing: 1px;
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
    }
  }
  .upcoming-schedules-failed-payment {
    .nav {
      background: #f2f1e8;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      margin-bottom: 15px;
      .nav-item {
        flex: 0 0 50%;
        .nav-link {
          font-size: 15px;
          font-weight: 400;
          line-height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px 15px;
          color: #29508699;
          min-height: 60px;
          &.active {
            background: ${theme.color.primary};
            color: ${theme.color.secondary};
          }
        }
      }
    }
  }
`;
export const QuickChatBoxWrapper = styled.div`
  margin-bottom: 14px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${theme.color.border};
  padding: 15px;
  .special-request-btn {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 2px;
    p {
      color: #295086;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      text-decoration: underline !important;
      display: flex;
      align-items: center;
      cursor: pointer;
      i {
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 6px;
        svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
  .dateofquickcheat {
    padding: 10px 0px;
    border-bottom: 1px dashed #e6e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      text-align: left;
      color: #295086;
    }
    .status-text-btn {
      background: #ffbc80;
      font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      border-radius: 100px;
      color: #6a6a6a;
      padding: 6px 12px;
      min-width: 95px;
      display: flex;
      justify-content: center;
    }
  }
  .quickusername {
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    display: block;
    color: #295086;
    width: 100%;
    padding: 12px 0px 0px;
  }
  &:last-child {
    margin-bottom: 0px;
    /* padding-bottom: 0px;
    border-bottom: none; */
  }
  .quick-chat-list-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    justify-content: space-between;
    .userdetailwrapper {
      display: flex;
      align-items: center;
      .user-img-wrapper {
        border-radius: 1000px;
        border: 2px solid ${theme.color.secondary};
        background: #c4c4c4;
        width: 46px;
        height: 46px;
        margin-right: 14px;
        filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.12));
      }
      .user-detail-wrapper {
        h3 {
          color: ${theme.color.secondary};
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 20px;
          margin-bottom: 3px;
        }
        p {
          color: ${theme.color.darkblue};
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 1px;
        }
        .failed-payment-text {
          color: #f7847b;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          display: block;
          cursor: pointer;
        }
      }
    }

    .status-text-btn {
      background: #ffbc80;
      font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      border-radius: 100px;
      color: #6a6a6a;
      padding: 6px 12px;
      min-width: 95px;
      display: flex;
      justify-content: center;
    }
  }
  .schedules-time-detail {
    display: flex;
    /* width: 100%; */
    flex-direction: column;
    gap: 10px;
    .schedules-text {
      margin-bottom: 15px;

      h6 {
        color: #29508699;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px;
        margin-bottom: 5px;
      }
      ul {
        display: inline-flex;
        li {
          color: #295086;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          margin-right: 15px;
          position: relative;
          display: flex;
          list-style: none;
          align-items: center;

          /* &:after{
                        position: absolute;
                        content: '';
                        width: 5px;
                        height: 5px;
                        background: #295086;
                        right: 0;
                        border-radius: 100px;
                    } */
          &:last-child {
            &:after {
              content: unset;
            }
          }
        }
      }
      li {
        color: #295086;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        margin-right: 15px;
        position: relative;
        display: flex;
        list-style: none;
        align-items: center;

        /* &:after{
                        position: absolute;
                        content: '';
                        width: 5px;
                        height: 5px;
                        background: #295086;
                        right: 0;
                        border-radius: 100px;
                    } */
        &:last-child {
          &:after {
            content: unset;
          }
        }
      }
    }
    .services-completed-block {
      display: flex;
      align-items: start;
      flex-wrap: wrap;
      gap: 4px;
      width: 100%;
      &.border-wrapper {
        border-bottom: 1px solid #e6e0e0;
        margin-bottom: 0;
        padding-bottom: 15px;
        &:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
      }
      .user-guest-detail {
        display: flex;
        align-items: center;
        width: 100%;
        padding-top: 12px;
        justify-content: space-between;
        .quickusername {
          width: auto;
          padding: 0px;
          margin-right: 8px;
        }
        .failed-payment-text {
          color: #f7847b;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          display: block;
          cursor: pointer;
        }
      }
      .schedules-text {
        margin-bottom: 10px;
        flex: 0 0 48%;
      }
      input[type="checkbox"] {
        position: relative;
        border: 2px solid #29508699;
        border-radius: 4px;
        background: none;
        cursor: pointer;
        line-height: 0;
        background: #f2f1e8;
        margin: 0 0.6em 0 0;
        outline: 0;
        padding: 0 !important;
        vertical-align: text-top;
        height: 22px;
        width: 22px;
        border-radius: 4px;
        -webkit-appearance: none;
        opacity: 0.8;
      }

      input[type="checkbox"]:hover {
        opacity: 1;
      }

      input[type="checkbox"]:checked {
        background-color: #6bbe99;
        border: 2px solid #6bbe99;
        opacity: 1;
      }

      input[type="checkbox"]:before {
        content: "";
        position: absolute;
        right: 50%;
        top: 50%;
        width: 5px;
        height: 10px;
        border: 2px solid #f2f1e8;
        border-width: 0 2px 2px 0;
        margin: -1px -1px 0 -1px;
        transform: rotate(45deg) translate(-50%, -50%);
        z-index: 2;
      }
      button {
        padding: 9px;
        width: 100% !important;
        min-width: max-content;
      }
      .noshow-btn{
        min-width: 95px;
        font-weight: 500;
        padding: 6px;
        font-size: 14px;
        background: #CBD3D4;
        border-color: #CBD3D4;
        width: auto !important;
        box-shadow: none;
      }
    }
    .complete-payment-box{
      width: 100%;
      text-align: center;
      button{
        padding: 12px;
      }
      p{
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        text-align: center;
        color: #295086;
        margin-top: 15px;
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        span{
          text-decoration-line: underline !important;
          display: inline-block;
          margin-right: 6px;
        }
      }
    }
  }
`;
export const CalendarLayoutWrapperMain = styled.div`
  display: flex;
  width: 100%;
  .specificevent-headerbar {
    width: 120px;
    margin-top: 56px;
    padding: 0px;
    border-right: 1px solid #b1bed0;
    max-height: 532px;
    margin-right: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    ${mediaQueries("md")`
            width: 100px;
        `}
    ${mediaQueries("sm")`
            width: 80px;
        `}

        &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #ebebeb;
    }
    &::-webkit-scrollbar-thumb {
      background: #c4c4c499;
      border-radius: 5px;
    }
    button {
      width: 90%;
      margin: auto;
      display: flex;
      border-radius: 0;
      padding: 18px 10px 16px;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${theme.color.secondary};
      text-transform: unset;
      box-shadow: none;
      width: 120px !important;
      position: absolute;
      ${mediaQueries("md")`
                width: 100px !important;
                padding: 10px;
                font-size: 12px;
            `}
      ${mediaQueries("sm")`
                width: 80px !important;
                padding: 6px;
                font-size: 10px;
            `}
            i {
        width: 40px;
        margin-top: 8px;
        padding-bottom: 10px;
        /* height: 21px; */
      }

      &:hover {
        opacity: 1;
      }
    }
    .user-list {
      margin-top: 100px;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          align-items: center;
          padding: 12px;
          background: #fff;
          border-bottom: 1px solid #29508666;
          .user-wrapper {
            width: 55px;
            height: 55px;
            border-radius: 1000px;
            overflow: hidden;
            background: white;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            font-weight: 600;
            line-height: 21px;
            letter-spacing: 0em;
            text-align: center;
            color: #295086;
            max-width: 88px;
            white-space: pre-wrap; /* CSS3 */
            white-space: -moz-pre-wrap; /* Firefox */
            white-space: -pre-wrap; /* Opera <7 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word; /* IE */
          }
          &.active-user {
            ${"" /* background: #86bfc9; */}
          }
        }
      }
    }
  }
  .calendar-flex {
    flex: 1;

    width: 100%;
    .fc-theme-standard {
      .fc-header-toolbar {
        .fc-toolbar-chunk {
          background: #efefef;
          border-radius: 10px;
          display: flex;
          align-items: center;
          margin-right: 20px;
          &:first-child {
            background: transparent !important;
            margin-left: -100px;
          }
          .fc-timeGridDay-button {
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            letter-spacing: 0em;
            padding: 9px;
            height: auto;
            border-radius: 10px;
            min-height: auto;
            max-height: unset;
            min-height: 40px;
            min-width: 100px;
            /* margin: 0; */
            &.fc-button-active {
              box-shadow: 0px 6px 20px 0px #b5b5b56b !important;
              background: white !important;
              font-weight: 700 !important;
              border-radius: 10px;
            }
            &.button:not(:disabled) {
              border-radius: 10px;
            }
          }
          .fc-toolbar-title {
            font-size: 21px;
            font-weight: 600;
            line-height: normal;
            text-align: center;
            word-spacing: 5px;
            color: #4d6b93 !important;
            text-transform: uppercase;
            margin: 0 12px !important;
          }
          .fc-prev-button,
          .fc-next-button {
            padding: 0 !important;
            background: transparent !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            min-width: auto;
            .fc-icon {
              &::before {
                color: #4d6b93 !important;
              }
            }
          }
          .fc-icon-chevron-left {
            display: block;
            margin: 0px auto;
            overflow: hidden;
            position: relative;
            height: 20px;
            width: 18px;
          }
          .fc-icon-chevron-left::before {
            border: 6px solid transparent;
            content: " ";
            display: block;
            position: absolute;
            z-index: 2;
            border-right-color: #295086;
            right: 0;
            top: 5px;
          }
          .fc-icon-chevron-right {
            display: block;
            margin: 0px auto;
            overflow: hidden;
            position: relative;
            height: 20px;
            width: 18px;
          }
          .fc-icon-chevron-right::before {
            border: 6px solid transparent;
            content: " ";
            display: block;
            position: absolute;
            z-index: 2;
            border-left-color: #295086;
            right: 0;
            top: 5px;
          }
          button {
            font-size: 12px !important;
            font-weight: 400 !important;
            line-height: normal;
            letter-spacing: 0em;
            text-align: center;
            border-radius: 10px;
            color: ${theme.color.secondary};
            background: white;
            background: #efefef !important;
            padding: 4px 12px !important;
            margin: 0;
            min-height: unset !important;
            outline: none;
            box-shadow: none;
            min-width: 100px;
            height: 36px !important;
            &:not(:disabled) {
              background: transparent;
              border: none;
              padding: 0;
            }
            &.fc-button-active {
              box-shadow: 0px 6px 20px 0px #b5b5b56b !important;
              background: white !important;
              border-radius: 10px;
              font-weight: 700 !important;
            }
          }
        }
      }
      .fc-view-harness {
        overflow: auto !important;
        height: 532px !important;
        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-track {
          background: #e9dede;
        }
        &::-webkit-scrollbar-thumb {
          background: #295086;
        }
        .fc-dayGridMonth-view {
          .fc-scroller {
            overflow-x: scroll !important;
            &::-webkit-scrollbar {
              width: 4px;
              height: 0px;
            }
            &::-webkit-scrollbar-track {
              background: #ebebeb;
            }
            &::-webkit-scrollbar-thumb {
              background: #c4c4c499;
              border-radius: 5px;
            }
          }
          .fc-scrollgrid {
            border: none;
            thead {
              tr {
                th {
                  border: none;
                  table {
                    thead {
                      tr {
                        th {
                          * {
                            font-size: 15px;
                            font-weight: 600;
                            line-height: 36px;
                            letter-spacing: 0em;
                            text-align: center;
                            color: ${theme.color.secondary};
                            ${mediaQueries("lg")`
                                                            font-size: 14px;
                                                            line-height: normal;
                                                        `}
                            ${mediaQueries("md")`
                                                            font-size: 10px;
                                                            line-height: normal;
                                                        `}
                                                        ${mediaQueries("xs")`
                                                            font-size: 10px;
                                                            line-height: normal;
                                                        `}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            tbody {
              tr {
                td {
                  table {
                    tbody {
                      tr {
                        td {
                          &.custom-cell-bg {
                            background-color: #95ccd5;
                            .fc-daygrid-day-events {
                              display: flex;
                            }
                            a {
                              background: transparent !important;
                              border: none !important;
                              font-size: 22px;
                              font-weight: 600;
                              line-height: 38px;

                              letter-spacing: 0em;
                              color: ${theme.color.secondary};
                            }
                          }
                          a {
                            background: transparent !important;
                            border: none !important;
                            font-size: 22px;
                            font-weight: 600;
                            padding-left: 3px;
                            line-height: 38px;
                            letter-spacing: 0em;
                            color: ${theme.color.secondary};
                          }
                          .fc-event-content {
                            display: flex;
                            align-items: center;
                            .userContent {
                              padding-top: 10px;
                              padding-bottom: 8px;
                              margin-left: -10px;
                              &:first-child {
                                margin-left: 0;
                              }
                              .imageWrapper {
                                display: flex;
                                align-items: center;
                                border: 1px solid #6bbe99;
                                width: 25px;
                                height: 25px;
                                overflow: hidden;
                                border-radius: 100px;
                                margin: 0;
                              }
                              .icon {
                                position: unset !important;
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                content: unset !important;
                              }
                            }
                            .image-count {
                              font-size: 14px;
                              font-weight: 500;
                              line-height: 14px;
                              letter-spacing: 0em;
                              color: ${theme.color.secondary};
                              margin-left: 5px;
                              margin-top: 3px;
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
    &.appointment-calender {
      .fc-theme-standard {
        .fc-header-toolbar {
          .fc-toolbar-chunk {
            &:nth-child(2) {
              background: transparent;
            }
            .fc-appointmentButton-button {
              border: none !important;
              outline: none;
              box-shadow: none;
              font-size: 12px;
              background: #295085 !important;
              border-radius: 100px;
              font-weight: 500 !important;
              padding: 8px 21px !important;
              color: white;
              text-align: center;
              text-transform: uppercase;
              min-height: 36px !important;
              height: auto !important;
            }
          }
        }
      }
    }
    .fc-col-header-cell-cushion {
      font-size: 18px;
      font-weight: 600;
      line-height: normal;
      color: #4d6b93;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .calender-title-text {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        position: relative;
        .headerdate-wraper {
          margin-left: -125px;
        }
        .headerdate {
          margin-bottom: 0;
        }
        button {
          border: none;
          outline: none;
          box-shadow: none;
          font-size: 12px;
          background: #295085;
          border-radius: 12px;
          padding: 8px 12px;
          color: white;
          position: absolute;
          right: 0;
        }
      }
      .calender-unavailable-appointment {
        padding: 9px 23px !important;
        background: #95ccd5 !important;
        border-radius: 100px !important;
        font-style: normal;
        font-weight: 600;
        font-size: 12px !important;
        line-height: 18px;
        text-align: center;
        text-transform: uppercase;
        color: #ffffff !important;
        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }
    }
    .headerdate {
      color: #295086;
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 2px;
      line-height: 36px;
    }
    .headerweekname {
      font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 27px;
      text-align: center;
      color: ${theme.color.secondary};
      text-transform: uppercase;
    }
    .eventContent {
      padding: 6px 12px 6px 10px;
      display: inline-flex;
      border-radius: 12px;
      max-width: 245px;
      justify-content: space-between;
      align-items: center;
      /* overflow-x: scroll; */
      /* width:100%; */
      /* inset: unset !important; */
      width: -webkit-fill-available;
      /* height: 100%; */
      .sitback-text {
        width: calc(100% - 10px);
      }
      p {
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
        white-space: nowrap;
        max-width: 218px;
        min-width: 160px;
        color: #295086;
      }
      span {
        display: inline-flex;
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
        color: #4d6b93;
      }
      .dropdown-btn-wrapper {
        /* margin-top: -35px;
                padding-right: 0;
                margin-right: -10px; */
        position: absolute;
        right: 4px;
        top: 5px;
        .dropdown-toggle {
          padding: 0;
          width: 15px;
          height: 15px;
          background: transparent;
          border: none;
          margin-left: auto;
          padding: 0;
          &::after {
            display: none;
          }
          i {
            width: 100%;
            padding: 0;
            height: 100%;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            color: ${theme.color.white};
            svg {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
        .dropdown-menu {
          background: #fbf9ed;
          /* display: flex; */
          z-index: 9999 !important;
          right: 0;
          overflow: hidden;
          /* inset: unset !important; */
        }
      }
      .status-text-wrapper {
        padding: 3px 12px;
        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;
        font-size: 10px;
        font-weight: 600;
        line-height: 15px;
        text-align: center;
        color: #6a6a6a;
        border-radius: 12px 0 10px 12px;
        line-height: normal;
        height: auto;
        min-width: 75px;
        padding-left: 12px;
        position: absolute;
        right: -1px;
        bottom: 1px;
      }
    }
    .fc-timegrid-event-harness > .fc-timegrid-event {
      ${"" /* inset: unset !important;*/}
      ${"" /* right: 0 !important; */}
            ${"" /* left: 0 !important; */}
            ${"" /* margin: auto; */}
            opacity: 1;
      z-index: -9999 !important;
      max-width: 245px;
      min-width: 245px;
      border-radius: 12px;
      /* height: max-content; */
    }
    .fc-timegrid-event-harness > .fc-timegrid-event:hover {
      background-color: #3e3ce1 !important;
      background: #3e3ce1 !important;
      cursor: pointer;
      z-index: 9999999999 !important;
      display: block;
      max-width: 245px;
      min-height: 100%;
      height: fit-content;
      min-width: 245px;
      box-shadow: 0px 6px 20px 0px #b5b5b56b;
    }

    .fc-timegrid-event-harness > .fc-timegrid-event:hover .eventContent p {
      color: ${theme.color.white};
      max-width: 223px;
      min-width: 160px;
      min-height: max-content;
      text-overflow: unset;
      line-height: 17px;
      margin-bottom: 4px;
      white-space: wrap;
      overflow: hidden;
    }
    .fc-timegrid-event-harness > .fc-timegrid-event:hover .eventContent span {
      color: ${theme.color.white};
    }
    .fc-timegrid-event-harness
      > .fc-timegrid-event:hover
      .dropdown-btn-wrapper
      .dropdown-toggle
      i
      svg
      path {
      fill: ${theme.color.white};
      color: ${theme.color.white};
    }

    .fc-timegrid-event-harness:hover a {
      opacity: 1;
    }

    .fc-timegrid-col-events {
      display: flex !important;
      flex-direction: row !important;
    }
    .fc-timegrid-event .fc-event-main {
      padding: 0px 0px 0px !important;
      position: relative;
    }

    .fc-timegrid-event-harness.fc-timegrid-event-harness-inset {
      z-index: 1 !important;
      /* max-width: 210px; */
      width: -webkit-fill-available;
    }

    .fc-timegrid-event-harness.fc-timegrid-event-harness-inset:hover {
      z-index: 99 !important;
    }

    .fc-scroller.fc-timegrid-container {
      overflow-y: scroll !important;
    }
    .fc-scroller {
      overflow-x: scroll !important;
      &::-webkit-scrollbar {
        width: 4px;
        height: 0px;
      }
      &::-webkit-scrollbar-track {
        background: #ebebeb;
      }
      &::-webkit-scrollbar-thumb {
        background: #c4c4c499;
        border-radius: 5px;
      }
    }
    .fc-timegrid-body {
      width: 110% !important;
      .fc-timegrid-slots {
        table {
          width: 110% !important;
          background-color: #ffffff;
        }
      }
    }

    thead {
      margin-bottom: 5px;
      .fc-scroller {
        overflow: hidden !important;
        &::-webkit-scrollbar {
          width: 4px;
          height: 0px;
        }
        &::-webkit-scrollbar-track {
          background: #ebebeb;
        }
        &::-webkit-scrollbar-thumb {
          background: #c4c4c499;
          border-radius: 5px;
        }
      }
    }
    .fc-theme-standard td {
      border: 0px solid #eeeeee !important;
    }
    .fc-scroller-harness {
      td {
        border: 1px solid #eeeeee !important;
      }
    }
    .fc .fc-daygrid-day-top {
      display: flex;
      flex-direction: row;

      a {
        padding: 6px 0px 5px 8px !important;
      }
    }
    .fc-theme-standard .fc-scrollgrid {
      border: 0px solid var(--fc-border-color);
    }
    .fc-theme-standard td,
    .fc-theme-standard th {
      border: 0px solid var(--fc-border-color);
    }
    .fc .fc-timegrid-axis-cushion,
    .fc .fc-timegrid-slot-label-cushion {
      border: none;
      padding: 0px 4px;
      color: #717579;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .fc-timegrid-event-short {
    min-width: 290px !important;
    max-width: 280px !important;
    min-height: 32px;
    .fc-event-main {
      .fc-event-content-small {
        .eventContent {
          max-width: unset;
          .sitback-text {
            display: flex;
            align-items: center;
            p {
              font-size: 13px;
              margin-right: 10px;
              max-width: unset;
              min-width: auto;
              max-width: 85px;
              min-width: 85px;
              overflow: unset;
              text-overflow: unset;
              line-height: unset;
              white-space: unset;
            }
            span {
              font-size: 13px;
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
    &:hover {
      .fc-event-main {
        .fc-event-content-small {
          .eventContent {
            .sitback-text {
              p {
              }
              span {
                font-size: 13px;
                display: -webkit-box;
                -webkit-line-clamp: unset;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }
`;
export const RemployeeHoursCalendarLayout = styled.div`
  padding: 50px 0;
  &.sitback-employee-hours-updated-wrapper{
    .sitback-employee-inner-div{
      border-radius: 8px;
      border: 0.5px solid #EAEBEC;
      background: rgba(255, 255, 255, 0.60);
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.08);
      padding: 18px 15px;
      .legend-list-block-wrapper{
        ul{
          ${mediaQueries("sm")`
            // flex-direction: column;
            flex-wrap: wrap;
          `}
        }
        
      }
      .sitback-employee-hours-updated-wrapper{
        table{
          thead{
            tr{
              th{
                color: #295086;
                text-align: center;
                font-size: 14px;
                font-weight: 600;
                line-height: normal;
              }
            }
          }
          tbody{
            tr{
              td{
              .employee-detail-wrapper{
              .employee-img{
                width: 55px;
                height: 55px;
              }
                p{
                  color: #295086;
                  text-align: center;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: normal;
                }
              }
                h6{
                  flex-direction: column;
                  color: #295086;
                  text-align: center;
                  font-size: 16px;
                  font-weight: 700;
                  line-height: normal;
                  &.unavailable-date{
                    color: rgba(80, 115, 164, 0.60);
                  }
                  i{
                    margin-bottom: 3px;
                    margin-right: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .calendar-section {
    border-radius: 20px;
    background: ${theme.color.white};
    box-shadow: 0px 4px 4px 0px #0000000a;
    overflow: hidden;
    padding-bottom: 6px;
    .specificevent-headerbar {
      padding: 35px;
      display: flex;
      align-items: center;
      button {
        border: none;
        outline: none;
        box-shadow: none;
        background: transparent;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.nextweek-btn {
          transform: rotate(180deg);
        }
      }
      span {
        font-style: normal;
        font-weight: 600;
        font-size: 21px;
        line-height: normal;
        color: #4d6b93;
        display: inline-flex;
        margin: 0 15px;
      }
    }
    .table-responsive {
      max-height: 610px;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-track {
        background: ${theme.color.white};
        max-height: 40px;
        height: 40px;
      }
      &::-webkit-scrollbar-thumb {
        background: ${theme.color.secondary};
        border: 4px solid ${theme.color.secondary};
        /* border-radius: 8px; */
        background-clip: padding-box;
      }
      &::-webkit-scrollbar-button {
      }
      table {
        margin-bottom: 0;
        thead {
          position: sticky;
          top: 0;
          tr {
            border: none;
            th {
              background: transparent;
              border: none;
              font-size: 15px;
              font-weight: 500;
              line-height: 27px;
              text-align: center;
              text-transform: unset;
              padding: 9px;
              width: 165px;
              min-width: 165px;
              max-width: 165px;
              background: ${theme.color.white};
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 9px;
              font-size: 11px;
              font-weight: 600;
              line-height: 21px;
              text-align: start;
              color: #295086;
              width: 165px;
              min-width: 165px;
              max-width: 165px;
              vertical-align: middle;
              * {
                font-size: 11px;
                font-weight: 600;
              }
              &.unavailable {
                text-align: center;
                h6 {
                  align-items: center;
                  justify-content: center;
                  i {
                    width: 18px;
                    height: 18px;
                  }
                }
              }
              h6 {
                display: flex;
                align-items: center;
                margin-bottom: 5px;
                justify-content: center;
                &:last-child {
                  margin-bottom: 0px;
                }
                i {
                  width: 15px;
                  height: 15px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 3px;
                }
                &.unavailable-date {
                  color: #5073a499;
                }
              }
              .employee-detail-wrapper {
                text-align: center;
                .employee-img {
                  width: 70px;
                  height: 70px;
                  overflow: hidden;
                  border-radius: 1000px;
                  margin: auto;
                  margin-bottom: 9px;
                }
              }
            }
          }
        }
      }
    }
  }
  .legend-list-block-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 18px;
    p {
      font-size: 15px;
      font-weight: 500;
      line-height: normal;
      color: ${theme.color.secondary};
      margin-right: 15px;
      display: inline-flex;
      margin-bottom: 1px;
    }
    ul {
      display: inline-flex;
      li {
        font-size: 15px;
        font-weight: 500;
        line-height: 27px;
        color: ${theme.color.secondary};
        display: flex;
        align-items: center;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
        i {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
      }
    }
  }
`;

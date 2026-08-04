"use client";

// import styled from "styled-components";
import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";

export const ClientAddLayoutWrapper = styled.div`
    border-radius: 8px;
    background: ${theme.color.lightyellow2};
    box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.06);
    display: flex;
    margin-bottom: 0;
    width: 100%;
    height: 100%;
    .userlist-boxwrapper{
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
        .search-input-wrapper{
            padding: 15px;
            .search-input-icon-wrapper{
                position: relative;
                input{
                    padding: 14px 24px;
                    font-size: 13px;
                    box-shadow: none;
                    padding-right: 50px;
                }
                i{
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
                    svg{
                        color: #29508699;
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    &::before{
                        position: absolute;
                        content: '';
                        height: 20px;
                        width: 1px;
                        background: #29508699;
                        left: -12px;
                    }
                }
            }
        }
        .box-wrapper-div{
            height: 443px;
            overflow: auto;
            margin-right: 3px;
            width: 100%;
            /* padding: 8px 15px 0; */
            &::-webkit-scrollbar {
                width: 10px;
            }
            &::-webkit-scrollbar-track {
                background: #E9DEDE;
            }
            &::-webkit-scrollbar-thumb {
                background: #295086;
            }
            .userlist-wrapper{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 12px;
                margin-bottom: 0px;
                /* margin-bottom: 12px; */
                /* padding-bottom: 12px; */
                .quick-chat-list-wrapper{
                    margin-bottom: 0px;
                    /* flex: 1; */
                    margin-right: 12px;
                    width: calc(100% - 66px);
                    .user-detail-wrapper{
                        width: calc(100% - 62px);
                        h3{
                            color: #111111;
                            font-weight: 600;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: block;
                        }
                        p{
                            color: #7C7C7C;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            /* display: block; */
                        }
                    }
                }
                .counter-time {
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  flex: 1;
                  .timetext{
                      color: #7C7C7C;
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

                &.active{
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
    .chatinnerbox-wrapper{
        flex: 1;
        position: relative;
        .chat-inner-headerbar{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 1px solid ${theme.color.border};
            .quick-chat-list-wrapper{
                margin: 0;
                .user-detail-wrapper{
                    h3{
                        font-size: 12px;
                        color: #111111;
                        font-weight: 600;
                        margin-bottom: 0;
                    }
                    p{
                      &.offline {
                        color: ${theme.color.darkblue};
                      }
                        font-size: 10px;
                        color: #18C07A;
                    }
                }
                .global_laguage_icon{
                    width: 18px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                    cursor: pointer;
                }
            }
            .massage-detail-wrapper{
                p{
                    color: ${theme.color.darkblue06};
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 20px;
                }
                ul{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    li{
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
                        &:after{
                            position: absolute;
                            content: '';
                            background: ${theme.color.darkblue06};
                            width: 4px;
                            height: 4px;
                            right: 0;
                        }
                        &:last-child{
                            margin-right: 0px;
                            padding-right: 0px;
                            &:after{
                                content: unset;
                            }
                        }
                    }
                }
            }
            .dropdown{
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
                        transform: rotate(90deg);
                        svg{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .chat-footer-wrapper{
            width: 100%;
            padding: 12px 12px 4px 12px;
            background: #F8F8F8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            .input-wrapper{
                width: calc(100% - 50px);
                position: relative;
                input, textarea{
                    height:52px;
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

                    &:focus{
                        outline: 0;
                    }

                }
                textarea::-webkit-input-placeholder {
                  /* color: #fff; */
                  /* padding:30px; */
                  /* margin:15px; */
                  /* line-height:30px; */
                }
                .emoji-smile{
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
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
            .send-icon{
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
                i{
                    width: 24px;
                    height: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            aside{
                &.epr-main{
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
          height: 380px;
            overflow: auto;
            padding: 0px 15px;
            display: flex;
            flex-direction: column;
            /* justify-content: flex-end; */
            &::-webkit-scrollbar {
                width: 10px;
            }
            &::-webkit-scrollbar-track {
                background: #E9DEDE;
            }
            &::-webkit-scrollbar-thumb {
                background: #295086;
            }
        }
        .user-chat-box-body-wrapper{
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          width: 100%;
          flex: 1;
          /* height: 100%; */
            .user-chat-box-list{
                display: flex;
                margin-bottom: 15px;
                &.right-box{
                    white-space: pre-wrap;
                    justify-content: flex-end;
                }
                &.left-box{
                    justify-content: flex-start;
                    .chatbox{
                        background: #FFFEF7;
                        border-radius: 15px 15px 15px 0;
                        p{
                            color: ${theme.color.secondary};
                        }
                    }
                }
                .chatbox{
                    border-radius: 15px 15px 0 15px;
                    background: ${theme.color.primary};
                    display: inline-flex;
                    padding: 12px 9px 12px 11px;
                    justify-content: center;
                    align-items: center;
                    max-width: 350px;
                    p{
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
export const ClientAddLayoutTableWrapper = styled.div`
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background: #fffef7b3;
    margin-bottom: 18px;
    /* overflow: hidden; */
    min-height: 150px;
    &.sitback-updated-client-add-layout-div{
        border-radius: 8px;
        border: 0.5px solid #EAEBEC;
        background: #FBFBFB;
        input{
            border-radius: 100px;
            border: 1px solid rgba(218, 218, 218, 0.60) !important;
            background: #FFF !important;
        }
        textarea{
            border: 1px solid rgba(218, 218, 218, 0.60) !important;
            background: #FFF !important;
        }
        .searchfilter{
            .search-clientby-header-bar{
                .header-wrapper{
                    select{
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60);
                        background: #FFF;
                    }
                    input{
                        border-radius: 100px;
                        border: 1px solid rgba(218, 218, 218, 0.60) !important;
                        background: #FFF !important;
                    }
                    .search-input-icon-wrapper{
                        .global_laguage_icon{
                            &::before{
                                display: none;
                            }
                        }
                    }
                }
            }
        }
        .sitback-history-table-wrapper{
            .table{
                tbody{
                    tr{
                        &:nth-of-type(odd)>*{
                            background: #EAEBEC;
                        }
                        td{
                            background: #EAEBEC;
                            .dropdown{
                                .dropdown-menu{
                                    .dropdown-item{
                                        background: linear-gradient(0deg, #F5FBFF 0%, #F5FBFF 100%), url(<path-to-image>) lightgray -379.447px 0px / 222.962% 100% no-repeat;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .sitback-updated-insight-btn-wrapper{
            border: 0.5px solid #295086;
            background: #295086;
            color: #FBFBFB;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            line-height: normal;
        }
    }
    .searchfilter{
        padding: 15px;
        h4{
            /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
            font-size: 14px;
            font-weight: 600;
            line-height: normal;
            color: ${theme.color.secondary};
            margin-bottom: 6px;
        }
        .search-clientby-header-bar{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            .header-wrapper{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                width: calc(100% - 295px);
                select{
                    width: 120px;
                    padding: 12px 15px;
                    margin: 0 12px 12px 0;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: normal;
                    color: ${theme.color.secondary};
                    /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
                    background-color: ${theme.color.white};
                    border: 0.5px solid ${theme.color.secondary};
                    border-radius: 100px;
                    min-height: 45px;
                }
                .search-input-icon-wrapper{
                    margin: 0 12px 12px 0;
                    position: relative;
                    flex: 1;
                    input{
                        padding: 12px 24px;
                        font-size: 13px;
                        box-shadow: none;
                        padding-right: 50px;
                        min-height: 45px;
                        background: ${theme.color.white};
                        border: 0.5px solid ${theme.color.secondary};
                    }
                    i{
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
                        svg{
                            color: #29508699;
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        &::before{
                            position: absolute;
                            content: '';
                            height: 20px;
                            width: 1px;
                            background: #29508699;
                            left: -12px;
                        }
                    }
                }
                .addnew-client{
                    padding: 12px 15px;
                    margin: 0 12px 12px 0;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: normal;
                    /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
                    background-color: ${theme.color.white};
                    border: 0.5px solid ${theme.color.secondary};
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 140px;
                    min-height: 45px;
                    color: ${theme.color.secondary};
                }
            }
            .uploadcsv-btn-wrapper{
                display: flex;
                align-items: center;
                margin: 0 0px 12px 0;
                .uploadcsv-file-wrapperbtn-wrapper{
                    position: relative;
                    input{
                        position: absolute;
                        opacity: 0;
                        right: 15px;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: calc(100% - 15px);
                        height: 100%;
                        cursor: pointer;
                    }
                }
                .uploadcsv-file-wrapper{
                    padding: 12px 15px;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: normal;
                    /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
                    background-color: ${theme.color.secondary};
                    border: 0.5px solid ${theme.color.secondary};
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: auto;
                    min-height: 45px;
                    color: ${theme.color.white};
                    margin-right: 15px;
                    &:last-child{
                        margin-right: 0;
                    }
                    i{
                        width: 18px;
                        height: 18px;
                        margin-left: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        svg{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &.download{
                        color: ${theme.color.secondary};
                        background-color: ${theme.color.white};
                    }
                }
            }
        }
    }
    .table-header-bgfill{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 15px;
        background-color: ${theme.color.secondary};
        h5{
            /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
            font-size: 15px;
            font-weight: 400;
            line-height: normal;
            color: ${theme.color.white};
            text-transform: uppercase;
            span{
                font-weight: 600;
            }
        }
        .addnew-client{
            padding: 9px 12px;
            font-size: 12px;
            font-weight: 500;
            line-height: normal;
            /* font-family: ${theme.font.fontFamilyPoppins}, sans-serif;; */
            background-color: ${theme.color.white};
            border: 0.5px solid ${theme.color.secondary};
            border-radius: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 140px;
            color: ${theme.color.secondary};
        }
    }
    .select-reports-box-wrapper{
        padding: 20px;
        .sitback-select2-container{
            .sitback-select-option__control {
                padding: 9px 15px;
                border-radius: 100px;
                background: ${theme.color.white};
                border-color: #DADADA;
                outline: none !important;
                box-shadow: none !important;
                .sitback-select-option__value-container{
                    .sitback-select-option__single-value {
                        color: ${theme.color.secondary};
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: normal;
                        ${mediaQueries("md")`
                        font-size: 16px !important;
                      `}
                        img{
                            width: 27px !important;
                            height: 19px !important;
                            overflow: hidden;
                            object-fit: contain;
                            margin-right: 10px;
                        }
                    }
                    .sitback-select-option__placeholder {
                        color: #295086;
                    }
                    input{
                        min-height: unset;
                        padding: unset;
                    }
                }
                .sitback-select-option__indicators{
                    .sitback-select-option__indicator-separator{
                        display: none;
                    }
                }
            }
            .sitback-select-option__menu{
                .sitback-select-option__menu-list{
                    .sitback-select-option__option{
                        color: ${theme.color.secondary};
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 300;
                        line-height: normal;
                        img{
                            width: 27px !important;
                            height: 19px !important;
                            overflow: hidden;
                            object-fit: contain;
                            margin-right: 10px;
                        }
                        &.sitback-select-option__option--is-focused{
                            background: #eafcff;
                        }
                        &.sitback-select-option__option--is-selected{
                            background: ${theme.color.primary};
                            color: ${theme.color.white};
                        }
                    }
                }
            }
        }
        .clearfilter-btn-wrapper{
            display: flex;
            align-items: center;
            button{
                padding: 15px;
                margin-left: 25px;
                background: ${theme.color.white};
                color: ${theme.color.secondary};
                border-color: ${theme.color.secondary};
                text-transform: uppercase;
                font-weight: 500;
            }
        }
        &.sibback-insights-add-clients{
            padding: 40px;
            ${mediaQueries("lg")`
                padding: 30px;
            `}
            ${mediaQueries("md")`
                padding: 20px;
            `}
            .save-btn-wrapper{
                margin-top: 25px;
                text-align: center;
                button{
                    max-width: 500px;
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
                    padding: 14px;
                    padding-left: 48px;
                    margin-left: 0;
                    border-radius: 100px;
                    border: none;
                    background: ${theme.color.white};
                    color: ${theme.color.secondary};
                    line-height: normal;
                    height: auto;
                    width: 100%;
                    outline: none;
                    min-height: 56px;
                    box-shadow: none;
                    outline: none;
                    border: 1px solid #DADADA;
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
            .white-input-wrapper{
                .calendar-wrapper-div{
                    bottom: auto;
                    top: 94px;
                }
            }
        }
        .react-datepicker-wrapper{
            .react-datepicker__input-container{
                input{
                    padding: 15px;
                    background: white;
                    box-shadow: none;
                }
            }
        }
    }
    label{
        font-family: ${theme.font.fontFamilyPoppins}, sans-serif;;
        font-size: 15px;
        font-weight: 400;
        line-height: normal;
        color: ${theme.color.secondary};
        text-transform: uppercase;
    }
    .white-input-wrapper{
        margin-bottom: 10px;
        input{
            border-radius: 100px;
            background: ${theme.color.white};
            border-color: #DADADA;
            box-shadow: none;
            min-height: 56px;
            padding: 14px 20px;
            color: ${theme.color.secondary};
            font-size: 14px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
        }
        textarea{
            background: ${theme.color.white};
            border-color: #DADADA;
            min-height: 250px;
        }
         &.birthday-input-wrapper{
            .react-datepicker__tab-loop{
                .react-datepicker-popper{
                    .react-datepicker{

                    }
                }
            }
            .react-datepicker__year-dropdown{
                .react-datepicker__year-option{
                    background: transparent !important;
                    .react-datepicker__navigation{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &::before{
                            border-color: #ccc;
                            border-style: solid;
                            border-width: 3px 3px 0 0;
                            content: "";
                            display: block;
                            height: 9px;
                            position: absolute;
                            top: 6px;
                            width: 9px;
                        }
                        &.react-datepicker__navigation--years-upcoming{
                            &::before{
                                transform: rotate(314deg);
                                top: 15px;
                            }
                        }
                        &.react-datepicker__navigation--years-previous{
                            &::before{
                                transform: rotate(135deg);
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const InsightsCancellationReportsSection = styled.div`
    .header-bar-wrapper{
        padding: 12px;
        background: ${theme.color.secondary};
        display: flex;
        align-items: center;
        h5{
            color: ${theme.color.white};
            font-size: 14px;
            font-weight: 400;
            width: 250px;
            &:last-child{
                flex: 1;
            }
        }
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
                    padding: 12px;
                    h5{
                        color: ${theme.color.secondary};
                        font-size: 14px;
                        font-weight: 400;
                        width: 250px;
                        &:last-child{
                            flex: 1;
                        }
                    }
                    /* &:after{
                        content: unset;
                    } */
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
                .table-responsive{
                    /* max-height: 350px; */
                    min-height: unset;
                    max-height: unset;
                    &::-webkit-scrollbar {
                        width: 10px;
                    }
                    &::-webkit-scrollbar-track {
                        background: #E9DEDE;
                    }
                    &::-webkit-scrollbar-thumb {
                        background: #295086;
                    }
                    table > :not(caption) > * > * {
                        background-color: transparent !important;
                    }
                    table{
                        thead{
                            background-color: #fefdf4;
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
                                    color: ${theme.color.secondary};
                                }
                            }
                        }
                        tbody{
                            tr{
                                td{
                                    border-bottom: 1px solid #29508630;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

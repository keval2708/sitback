"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";
export const SubscriptionsLayoutWrapper = styled.div`
    padding: 60px 0px;
    .text-center-wrapper{
        max-width: 750px;
        width: 100%;
        margin: 0 auto 40px;
        text-align: center;
    }
    .text-warning-all
    {
      color: #4D6B93;
      font-size: 14px;
      font-weight: 300;
      line-height: 26px;
      letter-spacing: 0.30000001192092896px;
      text-align: center;
    }
    .main-title-text{
        color: ${theme.color.secondary};
        font-size: 38px;
        font-style: normal;
        font-weight: 700;
        max-width: 600px;
        margin: auto;
        line-height: 52px;
        letter-spacing: 0.8px;
        ${mediaQueries("xl")`
            font-size: 42px;
            line-height: 48px;
        `}
        ${mediaQueries("lg")`
            font-size: 40px;
            line-height: 48px;
        `}
        ${mediaQueries("lg")`
            font-size: 36px;
            line-height: 44px;
        `}
        ${mediaQueries("md")`
            font-size: 32px;
            line-height: 40px;
        `}
        ${mediaQueries("sm")`
            font-size: 28px;
            line-height: 34px;
        `}
    }
    .subscripation_charged
    {
      text-align: center;
      margin-bottom:25px;
      min-height:150px;
      p{
        color: ${theme.color.darkblue};
        font-size: 14px;
        font-weight: 300;
        line-height: 26px;
        letter-spacing: 0.30000001192092896px;
        text-align: center;

      }
      .warning-text-plan{
        color: ${theme.color.darkblue};
        font-size: 14px;
        font-weight: 300;
        line-height: 26px;
        letter-spacing: 0.30000001192092896px;
        text-align: center;

        &:first-child
        {
          width:100px !important;
        }
      }

    }
    .sitback-subscription-plan-display-wrapper{
      justify-content: center;
    }
`;
export const SubscriptionPlanWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100% - 150px);
    margin-bottom: 24px;
    p{
        color: ${theme.color.darkblue};
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 20px;
        letter-spacing: 0.175px;
        text-align: center;
        max-width: 280px;
        width: 100%;
        margin: auto;
    }
    .box-wrapper{
        padding: 24px;
        background: ${theme.color.white};
        border-radius: 9px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 21px;
        border: 1px dashed ${theme.color.border};
        p{
            text-align: start;
            max-width: 100%;
            width: 100%;
        }
        .plan-detail-wrapper{
            margin-bottom: 15px;
            h4{
                display: inline-flex;
                align-items: center;
                margin-bottom: 6px;
                span{
                    color: ${theme.color.darkblue06};
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24px;
                    letter-spacing: 0.175px;
                    margin-left: 10px;
                }
            }
            h5{
                color: ${theme.color.secondary};
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                letter-spacing: 0.338px;
                margin-bottom: 6px;
            }
            ul{
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #00000014;
                li{
                    color: ${theme.color.secondary};
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 26px;
                    letter-spacing: 0.2px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 7px;
                    i{
                       svg{
                        height: 100%;
                        width: 100%;
                        display: block;
                      }
                        width: 21px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        margin-right: 10px;
                    }
                }
            }
        }
        .try-it-text-wrapper{
          color: ${theme.color.secondary};
          font-size: 15px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.338px;
          margin-bottom: 30px;
          margin-top: -30px;
        }
        button{
            letter-spacing: 0.2px;
            text-transform: unset;
            font-weight: 500;
            padding: 12px;
            box-shadow: 0px -2px 0px 0px rgba(0, 0, 0, 0.12) inset;
        }
    }
    &.basic-plan-wrapper{
        .box-wrapper{
            .plan-detail-wrapper{
                .main-title-text{
                    color: ${theme.color.secondary};
                }
            }
            button{
                background: ${theme.color.secondary};
            }
        }
    }

    &.pro-plan-wrapper{
        .box-wrapper{
            background: #F5FBFF;
            button{
                color: ${theme.color.secondary};
                background: ${theme.color.white};
                box-shadow: 0px -2px 0px 0px rgba(0, 0, 0, 0.12) inset;
                border-color: ${theme.color.white};
            }
        }
    }
    &.premium-plan-wrapper{
        .box-wrapper{
            background: ${theme.color.secondary};
            .plan-detail-wrapper{
                .main-title-text{
                    color: ${theme.color.white};
                    span{
                        color: ${theme.color.white};
                    }
                }
                h5{
                    color: ${theme.color.white};
                }
                p{
                    color: ${theme.color.white};
                }
                ul{
                    border-top: 1px solid #e9e8e93d;
                    li{
                        color: ${theme.color.white};
                    }
                }
            }
            button{
                color: ${theme.color.secondary};
                background: ${theme.color.white};
                box-shadow: 0px -2px 0px 0px rgba(0, 0, 0, 0.12) inset;
                border-color: ${theme.color.white};
            }
        }
    }
`;
export const PlanBoxWrapper = styled.div`
    display: flex;
    margin: -15px;
    flex-wrap: wrap;
    .grid-col{
        flex: 0 0 33.33%;
        padding: 15px;
    }
`;
export const FrequentlyAskQuestionsLayout = styled.div`
    padding: 60px 0px;
    overflow: hidden;
    position: relative;
    .container{
        z-index: 1;
        position: relative;
    }
    .cloud-image-wrapper{
        max-width: 723px;
        height: 280px;
        width: 100%;
        overflow: hidden;
        position: absolute;
        left: -480px;
        top: 200px;
        &.right-side-cloud-img{
            right: -330px;
            top: -200px;
            left: auto;
        }
        &.right-bottom-side-cloud-img{
            right: -280px;
            top: 420px;
            left: auto;
        }
    }
    .text-center-wrapper{
        margin-bottom: 50px;
        text-align: center;
        h5{
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 36px;
            text-align: center;
            letter-spacing: 1px;
            color: #295086;
            a{
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 36px;
                text-align: center;
                letter-spacing: 1px;
                color: #295086;
                display: inline-block;
            }
        }
    }
    .main-title-text{
        color: ${theme.color.secondary};
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: 52px;
        letter-spacing: 1px;
    }
    .accordion{
      /* max-width: 760px; */
      margin: auto;
      margin-bottom: 40px;
        .accordion-item{
            border-radius: 16px;
            background: #FFFEF7;
            box-shadow: 0px 5px 16px 0px rgba(8, 15, 52, 0.06);
            border: none;
            margin-bottom: 21px;
            .accordion-header{
                .accordion-button {
                    outline: none;
                    box-shadow: none;
                    background: transparent;
                    justify-content: space-between;
                    padding: 20px;
                    &:after{
                        content: unset;
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
                    span{
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
                    }
                }
            }
            .accordion-body{
                padding-top: 0;
                p{
                    color: ${theme.color.dimgraytext};
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    margin-bottom: 15px;
                    line-height: 22px;
                }
            }
        }
    }
    .contact-link-text{
        display: flex;
        justify-content: center;
        a{
            color: ${theme.color.secondary};
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: 28px;
            text-decoration-line: underline !important;
            display: inline-flex;
        }
    }
`;

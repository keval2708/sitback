"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";

export const PosSideBarLayoutWrapper = styled.div`
	height: 100vh;
	background: ${theme.color.secondary};
	padding: 23px;
	display: flex;
    flex-direction: column;
    align-items: center;
	width: 100%;
	.sitback-logo-wrapper{
		width: 96px;
		height: 96px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		${mediaQueries("xl")`
			width: 80px;
			height: 80px;
		`}
		${mediaQueries("lg")`
			width: 70px;
			height: 70px;
		`}
		${mediaQueries("md")`
			width: 60px;
			height: 60px;
		`}
		${mediaQueries("sm")`
			width: 50px;
			height: 50px;
		`}
		img{
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center;
		}
	}
	ul{
		display: flex;
		margin-top: 50px;
		flex-direction: column;
		${mediaQueries("lg")`
			margin-top: 45px;
		`}
		${mediaQueries("md")`
			margin-top: 40px;
		`}
		${mediaQueries("sm")`
			margin-top: 35px;
		`}
		li{
			width: 45px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 47px;
			${mediaQueries("xl")`
				width: 42px;
				height: 42px;
			`}
			${mediaQueries("lg")`
				width: 39px;
				height: 39px;
			`}
			${mediaQueries("md")`
				width: 33px;
				height: 33px;
			`}
			${mediaQueries("sm")`
				width: 30px;
				height: 30px;
			`}
			a{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				i{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					svg{
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						path{
							fill: ${theme.color.white};
						}
					}
				}
			}
			&.active{
				a{
					i{
						svg{
							width: 100%;
							height: 100%;
							display: block;
							path{
								fill: ${theme.color.primary};
							}
						}
					}
				}
			}
		}
	}

    .text-center-wrapper{
        max-width: 750px;
        width: 100%;
        margin: 0 auto 40px;
        text-align: center;
    }
    .main-title-text{
        color: ${theme.color.secondary};
        font-size: 44px;
        font-style: normal;
        font-weight: 700;
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
    }
`;
export const MainPosLayoutWeapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	.pos-sidebar-wrapper{
		width: 150px;
		position: fixed;
		${mediaQueries("xl")`
            width: 140px;
        `}
		${mediaQueries("lg")`
            width: 120px;
        `}
		${mediaQueries("md")`
            width: 100px;
        `}
	}
	.pos-main-layout-wrapper{
		width: calc(100% - 150px);
		padding: 35px 30px;
		min-height: 100vh;
		margin-left: 150px;
		${mediaQueries("xl")`
           padding: 35px 15px;
		   width: calc(100% - 140px);
		   margin-left: 140px;
        `}
		${mediaQueries("lg")`
            width: calc(100% - 120px);
			margin-left: 120px;
        `}
		${mediaQueries("md")`
            width: calc(100% - 100px);
			margin-left: 100px;
        `}
		.backbtn-wrapper-main{
			outline: none;
			box-shadow: none;
			border: none;
			background: transparent;
			display: flex;
			align-items: center;
			color: #295085;
			font-size: 16px;
			font-weight: 600;
			margin-bottom: 15px;
			i{
				display: flex;
				align-items: center;
				width: 20px;
				height: 15px;
				margin-right: 10px;
				svg{
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
	.main-title-text{
		color: ${theme.color.secondary};
		font-size: 44px;
		font-style: normal;
		font-weight: 700;
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
`;

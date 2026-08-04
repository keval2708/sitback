"use client";

import styled from '@emotion/styled'
import { mediaQueries } from '../../utils/mediaQuery'
import { theme } from "../global/theme";

export const PosLayoutWrapper = styled.div`

  width: 100%;

  &.sitback-updated-pos-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 0 80px;
    min-height: calc(100vh - 122px);
    background: #f8f9fa;

    ${mediaQueries("md")`
      padding: 40px 0 60px;
    `}

    ${mediaQueries("sm")`
      padding: 30px 0 50px;
    `}

    .pos-landing-content {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .pos-landing-header {
      text-align: center;
      margin-bottom: 48px;

      ${mediaQueries("sm")`
        margin-bottom: 32px;
      `}

      h1 {
        font-size: 36px !important;
        font-weight: 700;
        line-height: 1.2;
        color: ${theme.color.secondary};
        margin-bottom: 12px;

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

      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.color.darkblue};
        margin: 0 auto;
        max-width: 520px;

        ${mediaQueries("sm")`
          font-size: 14px;
        `}
      }
    }

    .pos-landing-cards {
      display: flex;
      align-items: stretch;
      justify-content: center;
      gap: 28px;

      ${mediaQueries("md")`
        flex-direction: column;
        align-items: center;
        gap: 20px;
      `}
    }

    .pos-landing-card {
      flex: 1;
      max-width: 420px;
      width: 100%;
      background: ${theme.color.white};
      border-radius: 14px;
      box-shadow: 0 4px 24px rgba(41, 80, 134, 0.08);
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
      border: 1px solid #DFECF9;

      ${mediaQueries("md")`
        max-width: 100%;
      `}

      ${mediaQueries("sm")`
        padding: 28px 24px;
      `}

      &:hover {
        box-shadow: 0 8px 32px rgba(41, 80, 134, 0.12);
        transform: translateY(-2px);
      }

      .pos-landing-card-icon {
        width: 64px;
        height: 64px;
        border-radius: 12px;
        background: #eef6ff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
      }

      h2 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1.3;
        color: ${theme.color.secondary};
        margin: 0;

        ${mediaQueries("sm")`
          font-size: 20px;
        `}
      }

      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        color: ${theme.color.darkblue};
        margin: 0;
        flex: 1;
      }

      .pos-landing-card-btn {
        width: auto;
        min-width: 180px;
        padding: 12px 28px;
        border-radius: 50px;
        border: none;
        background: ${theme.color.secondary};
        color: ${theme.color.white};
        font-size: 13px;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(41, 80, 134, 0.2);
        margin-top: 8px;

        &:hover {
          opacity: 0.9;
        }

        ${mediaQueries("sm")`
          width: 100%;
          min-width: unset;
        `}
      }
    }
  }

  .posmainbox
  {

    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /* display: flex; */
    /* flex: 1; */

    margin-left: 134px;

    .manageItem
    {
      background: ${theme.color.white};
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 65%;
      border-radius: 29px;
      margin: auto;
      padding: 60px;
      box-shadow: 0px 4px 4px 0px #00000040;

      .cartIcon
      {
        background: #EFEFEF;
        height: 140px;
        width: 140px;
        margin: auto;
        display: flex;
        border-radius: 50%;
        img
        {
          width: 85px;
          margin: auto;
        }
      }

      .text-title
      {
        display: flex;
        flex-direction: column;
        .cart-title
        {
          color: ${theme.color.black};
          font-size: 24px;
          font-weight: 400;
          width: 100%;
          margin-top: 8px;
          text-align: center;
          margin-top: 20px;
        }
        .cart-detail
        {
          font-size: 18px;
          font-weight: 400;
          line-height: 28px;
          margin-top: 8px;
          text-align: center;
          opacity: 0.6;
          color: ${theme.color.black};
        }
        button
        {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          width: max-content;
          padding: 0px 30px;
          height: 60px;
          margin:30px auto 0px;
          border-radius: 8px;
          background: ${theme.color.secondary};

          span
          {
            color: ${theme.color.white};
            font-size: 18px;
            font-weight: 400;
            line-height: 36px;

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


export const ProductListLayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  .product_list{
    .Product_header{
      display: flex;
      justify-content: start;
      width: 100%;
      flex-wrap: wrap;
      div {
        margin-right: 18px;
        margin-bottom: 18px;
        &:last-child{
          margin-right: 0;
        }
      }
      .search_box{
        display: flex;
        position: relative;
        flex: 1;
        min-width: 350px;
        input{
          border: none;
          outline: none;
          width: 100%;
          padding: 12px;
          padding-left: 55px;
          border-radius: 8px;
          background: ${theme.color.white};
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          color: ${theme.color.black};
          &::placeholder{
            color: #C9C9C9;
            font-size: 16px;
            font-weight: 400;
            line-height: 20.08px;
          }
        }
        .search-icon{
          position: absolute;
          left: 19px;
          width: 23px;
          top: 13px;
        }
      }

      .sortbyproduct{
        display: flex;
        position: relative;
        width: 260px;
        input{
            border: none;
            outline: none;
            width: 100%;
            padding: 12px;
            padding-left: 55px;
            border-radius: 8px;
            &::placeholder{
              color: #C9C9C9;
              font-size: 16px;
              font-weight: 400;
              line-height: 20.08px;
            }
          }
          .filteicon
          {
            position: absolute;
            left: 19px;
            width: 23px;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 21px;
            width: 21px;
          }

      }

      .editbtn{
        max-width: 182px;
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          background: ${theme.color.secondary};
          border-color: ${theme.color.secondary};
          padding: 12px 15px;
          border-radius: 8px;
          img{
            height: 21px;
            width: 21px;
            margin-right: 10px;
          }
        }
      }
      .addbtn{
        max-width: 182px;
        button{
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          background: ${theme.color.secondary};
          border-color: ${theme.color.secondary};
          padding: 12px 15px;
          border-radius: 8px;
          img{
            height: 21px;
            width: 21px;
            margin-right: 10px;
          }
        }
      }
      .cartBox{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        img{
          width: 32px;
          height: 32px;
        }
        span{
          text-align: center;
          position: absolute;
          background-color: #D32020;
          border-radius: 1000px;
          width: 21px;
          display: flex;
          height: 21px;
          font-size: 13px;
          font-weight: 600;
          line-height: 16.32px;
          justify-content: center;
          align-items: center;
          right: -10px;
          top: 6px;
          color:  ${theme.color.white};
        }
      }
    }

    .product_card{
      margin-top: 5px;
      /* height: calc(100vh - 125px);
      overflow: hidden;
      overflow-y: scroll;
      padding-right: 5px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background: #EFECD5;
      }
      &::-webkit-scrollbar-thumb {
        background: ${theme.color.secondary};
        border: 4px solid ${theme.color.secondary};
        border-radius: 8px;
        background-clip: padding-box;
      } */

      .product_card_box{
        background: ${theme.color.white};
        padding: 16px;
        margin-bottom: 25px;
        position: relative;
        cursor: pointer;
        border: 1px solid ${theme.color.white};

        .product_img{
          background: #f0f0f0;
          img
          {
            aspect-ratio: 1/1;
            object-fit: contain;
            background-position: center;
            height: 176px;
          }
        }
        &:hover
        {
          box-shadow: 0px 6px 30px 0px #00000040;
          border: 1px solid ${theme.color.secondary};
        }
        &:hover .deleteicon
        {
          opacity: 1;
        }
      }
      .product_card_box.active
      {
          box-shadow: 0px 6px 30px 0px #00000040;
          border: 1px solid ${theme.color.secondary};

          .deleteicon
        {
          opacity: 1;
        }
      }

      .deleteicon
      {
        position: absolute;
        top: 21px;
        right: 21px;
        opacity: 0;
      }
      .lowStock
      {
        position: absolute;
        background: #F97167;
        left: 16px;
        top: 25px;
        border-radius: 0px 20px 20px 0px;
        padding: 5px 10px;

        span{
          font-size: 12px;
          font-weight: 400;
          color:${theme.color.white};
        }
      }
      .product_detail
      {
        margin-top: 15px;
        .product_title
        {
          display: flex;
          justify-content: space-between;
          gap: 5px;

          span
          {
            color: #494C50;
            font-size: 18px;
            font-weight: 400;
            line-height: 27px;
            text-align: left;
            max-width: 90%;
            text-wrap:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
        }
        .product_price
        {
          span
          {
            color: #494C50;
            font-size: 18px;
            font-weight: 600;
            line-height: 27.59px;
            text-align: left;

          }
        }
      }
    }
  }
`;

export const CheckoutWraper = styled.div`
  width: 100%;
  position: relative;
  .checkout_box
  {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 70px);
    /* margin-left: 134px; */
    .checkout_main
    {

      background: ${theme.color.white};
      /* height: 350px; */
      width: 100%;
      border: 1px solid #DEDEDE;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      padding: 45px;
      flex-wrap: wrap;
      ${mediaQueries("xl")`
         padding: 40px;
      `}
      ${mediaQueries("lg")`
        padding: 30px;
      `}
      ${mediaQueries("md")`
        padding: 25 px;
      `}
      .contact_form{
        flex: 1;
        width: 100%;
        border-right: 1px solid #DEDEDE;
        padding-right: 30px;
        ${mediaQueries("lg")`
          border-right: 0;
          padding-right: 0px;
        `}
        .input_wrap{
          width: 100%;
          display: flex;
          flex-direction: column;
          label{
            font-size: 20px;
            font-weight: 400;
            line-height: normal;
            color: #060D01;
            ${mediaQueries("xl")`
               font-size: 18px;
            `}
            ${mediaQueries("lg")`
               font-size: 16px;
            `}
            ${mediaQueries("md")`
               font-size: 15px;
            `}
          }
          input{
            border: 1px solid #DEDEDE;
            background: ${theme.color.white};
            border-radius: 5px;
            height: 60px;
            padding: 10px 20px;
            outline: none;
            ${mediaQueries("xl")`
              height: 55px;
            `}
            ${mediaQueries("lg")`
              height: 51px;
            `}
            ${mediaQueries("md")`
              height: 48px;
            `}
          }
          .phone-number-input-wrapper{
            input{
              border: 1px solid #DEDEDE;
              background: ${theme.color.white};
              border-radius: 5px;
              height: 60px;
              padding: 10px 20px 10px 45px;
              outline: none;
              width: 100%;
              ${mediaQueries("xl")`
                height: 55px;
            `}
            ${mediaQueries("lg")`
                height: 51px;
            `}
            ${mediaQueries("md")`
                height: 48px;
            `}
            }

          }

          input:focus, input:focus-visible, input:focus-within, input:active
          {
            border: 1px solid #DEDEDE !important;
            outline: none;
          }
          .text-danger
          {
            padding-top: 2px;
            padding-left: 20px;
          }
          .phone_input
          {
            padding-left: 43px;
          }

        }
        .sitback-select2-container{
          width: 100%;
          margin-bottom: 15px;
          .sitback-select-option__control {
            padding: 12px 15px;
            border-radius: 4px;
            background: white;
            border-color: #DADADA;
            outline: none !important;
            box-shadow: none !important;
            ${mediaQueries("md")`
              padding: 9px 15px;
            `}
            ${mediaQueries("sm")`
              padding: 6px 12px;
            `}
            .sitback-select-option__value-container{
              padding-left: 0;
              .sitback-select-option__single-value {
                color: ${theme.color.secondary};
                font-size: 14px;
                font-style: normal;
                font-weight: 300;
                line-height: normal;
                ${mediaQueries("md")`
                font-size: 16px !important;
              `} 
                .user-name-number-text {
                  .phone {
                    display: none;
                  }
                }
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
            }
            .sitback-select-option__indicators{
              .sitback-select-option__indicator-separator{
                display: none;
              }
            }
            input{
              height: unset;
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
                      .user-name-number-text{
                        display: flex;
                        align-items: center;
                        p{
                          width: 50%;
                        }
                      }
                  }
              }
          }
        }
        &.addclient-form{
          button{
            box-shadow: none;
            border-radius: 6px;
            background: #295085;
            border-color: #295085;
            text-transform: uppercase;
            padding: 14px;
            font-weight: 500;
          }
        }
      }

      .checkout_cart_item
      {
        display: flex;
        flex-direction: column;
        padding-left: 30px;
        width: 408px;
        ${mediaQueries("md")`
          width: 100%;
          padding: 30px 0 0 0;

        `}
        .text_title
        {
          font-size: 18px;
          font-weight: 400;
          line-height: 27px;
          text-align: left;
          color: ${theme.color.black};
        }
        .detail_card
        {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-top: 20px;

          .product_img
          {
            height: 60px;
            width: 80px;
            overflow: hidden;
            border-radius: 5px;
            img
            {
              height: 100%;
              width: 100%;
              object-fit: contain;
              object-position: center;
            }
          }
          .product_detail
          {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 235px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            .product_title
            {
              font-family: Poppins;
              font-size: 18px;
              font-weight: 400;
              line-height: 15px;
              text-align: left;
              color: ${theme.color.black};
              margin-bottom: 15px;
            }
            .product_price
            {
              font-size: 18px;
              font-weight: 600;
              line-height: normal;
              text-align: left;
              color: #262626;

            }
            .quantity
            {
              display: flex;
              margin-top: 5px;
              .quantity__minus, .quantity__plus
              {

                background:  ${theme.color.secondary};
                color:  ${theme.color.white};
                text-align: center;
                width: 25px;
                display: flex;
                justify-content: center;
                height: 25px;
                cursor: pointer;
                span
                {
                  display: flex;

                  font-size: 18px;
                  color: ${theme.color.white};
                }
              }
              input
              {
                width: 25px;
                background: #2950861A;
                border-radius: 0px;
                border: none;
                text-align: center;
                outline: none;
                pointer-events:none;
                color:  ${theme.color.black};
              }
            }


          }
        }
        .sub_total
        {
          display: flex;
          margin-top: 18px;
          padding: 12px 20px;
          margin-bottom: 30px;
          border-top: 1px solid #DEDEDE;
          border-bottom: 1px solid #DEDEDE;
          .sub_total_title
          {
            font-size: 18px;
            font-weight: 400;
            line-height: 27px;
            text-align: left;
            width: 100px;
            color: ${theme.color.black};
          }
          .sub_total_price
          {
            font-size: 18px;
            font-weight: 600;
            text-align: left;
            color: #262626;
          }
        }
        .checkout_btn
        {
          width: 100%;

          button
          {
            width: 100%;
            cursor: pointer;
            border: none;
            text-align: center;
            border-radius: 8px;
            font-size: 18px;
            background: ${theme.color.secondary};
            font-weight: 400;
            height: 55px;
            line-height: 11px;
            color: ${theme.color.white};
          }
        }
      }
    }
  }

`;

export const AddProductLayoutWrapper = styled.div`
  width: 100%;
  .add_product_layout{
    .upload_product_wrapper
    {
      display: flex;
      flex-direction: column;
      width: 100%;
      .text-danger
      {
        padding-left: 30px;
        padding-top: 5px;
      }
      .file_title
      {
        margin-bottom: 20px;
        span
        {
          font-size: 20px;
          font-weight: 500;
          line-height: 37.5px;
          color : #060D01;
        }
      }
      .upload_product
      {
        background: #FAFAFA;
        border-radius: 23px;
        padding: 30px;
        .upload-file-input-wrapper{
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
                .upload-file-input{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    padding: 12px;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    input{
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        cursor: pointer;
                    }
                    img{
                        width: 50px;
                        height: 50px;
                        margin-bottom: 6px;
                    }
                    p{
                        color: ${theme.color.secondary};
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 350;
                        line-height: normal;
                    }
                    span
                    {
                      font-size: 18px;
                      font-weight: 400;
                      line-height: 32.25px;
                      color: #060D01;
                    }
                }
            }
        .upload_product_img
        {
          position: relative;
          .product_img{
            height: 358px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            background: #e4ddf4;
            ${mediaQueries("xxl")`
              height: 340px;
            `}
            ${mediaQueries("xl")`
              height: 300px;
            `}
            ${mediaQueries("lg")`
              height: 280px;
            `}
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }
          }
          .cancel_icon
          {
            cursor: pointer;
            position: absolute;
            top: 8px;
            right: 8px;
            width: 31px;
            background-color: ${theme.color.white};
            border-radius: 100%;
          }
        }
      }
    }
    .product_detail_wrapper
    {
      display: flex;
      flex-direction: column;
      width: 100%;
      .file_title
      {
        margin-bottom: 15px;
        span
        {
          font-size: 20px;
          font-weight: 500;
          line-height: 37.5px;
          color : #060D01;
        }
      }
      .product_decription
      {
        background:${theme.color.white};
        width: 100%;
        padding: 25px 30px;
        margin-bottom: 20px;
        box-shadow: 0px 4px 4px 0px #00000040;
        border-radius: 29px;

        .product_title
        {
          margin-bottom: 20px;
          input {
            border: none;
            outline: none;
            background: transparent;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            width: 100%;
            padding: 0px 0px 10px;
            border-bottom: 1px solid #DEDEDE;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            color: ${theme.color.black};
            &::placeholder{
              color: #909090;
              font-size: 16px;
            }
          }
        }
        .product_short_dec
        {
          margin-bottom: 15px;
          textarea
          {
            width: 100%;
            padding: 20px;
            height: 70px;
            outline: none;
            border-radius: 15px;
            border: 1px solid #DEDEDE;
            background: #FAFAFA;
            color: ${theme.color.black};
            &::placeholder {
              color: #909090;
              font-size: 16px;
            }
          }
          .text-danger
          {
            /* padding-left: 20px; */
          }
        }
        .product_price
        {
          display: flex;
          flex-direction: column;
          label
          {
            color: #060D01;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            text-align: left;

          }
          input{
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            width: 50%;
            text-align: left;
            color: #060D01;
            border: none;
            outline: none;
            background: transparent;
            border-bottom: 1px solid #DEDEDE;
            &::placeholder
            {
              font-size: 18px;
              font-weight: 400;
              line-height: 30px;
              text-align: left;
              color: #909090;

            }
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          span{
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            padding-top: 7px;
            color: #909090;
          }
        }
      }
      .inventory_detail
      {
        background:${theme.color.white};
        width: 100%;
        padding: 30px 25px;
        box-shadow: 0px 4px 4px 0px #00000040;
        border-radius: 29px;

        .track_stock
        {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #DEDEDE;
          padding-bottom: 8px;
          margin-bottom: 15px;

          span{
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            text-align: left;
            color: #060D01;
          }

        }
        .in_stock
        {
          display: flex;
          flex-direction: column;

          label
          {
            color: #060D01;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            text-align: left;
          }
          input{
            border: none;
            outline: none;
            border-bottom: 1px solid #DEDEDE;
            color: #060D01;
            background: transparent;
            background-color: transparent;
              font-size: 18px;
              font-weight: 400;
              line-height: 30px;
            &::placeholder
            {
              color: #909090;
              font-size: 18px;
              font-weight: 400;
              line-height: 30px;
            }
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          span{
            font-size: 13px;
            font-weight: 400;
            line-height: normal;
            text-align: left;
            color: #909090;
            &.text-danger {
              color: red;
            }
          }
        }
        .low_stock
        {
          display: flex;
          flex-direction: column;

          label
          {
            color: #060D01;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            text-align: left;
          }
          input{
            border: none;
            outline: none;
            border-bottom: 1px solid #DEDEDE;
            color: #060D01;
            background-color: transparent;
            background: transparent;
              font-size: 18px;
              font-weight: 400;
              line-height: 30px;
            &::placeholder
            {
              color: #909090;
              font-size: 20px;
              font-weight: 400;
              line-height: 36px;
            }
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          span{
            font-size: 13px;
            font-weight: 400;
            line-height: normal;
            text-align: left;
            color: #909090;
          }
        }
        .remain_stock
        {
          display: flex;
          flex-direction: column;

          label
          {
            color: #909090;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            text-align: left;
          }
          input{
            border: none;
            outline: none;
            border-bottom: 1px solid #DEDEDE;
            color: #060D01;
            background-color: transparent;
            background: transparent;
              font-size: 18px;
              font-weight: 400;
              line-height: 30px;
            &::placeholder
            {
              color: #909090;
              font-size: 20px;
              font-weight: 400;
              line-height: 36px;
            }
            &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }
          }
          span{
            font-size: 13px;
            font-weight: 400;
            line-height: normal;
            text-align: left;
            color: red;
          }
        }
      }
    }
    .modal-footer-div
    {

      display: flex;
      justify-content: end;
      gap: 15px;
      margin-top: 10px;

      .btn-cancel
      {
        background-color: ${theme.color.white};
        background: ${theme.color.white};
        border-radius: 8px !important;
        width: 140px;
        color: #060D01;
        border: 0px;
        font-size: 16px;
        height: 55px;
        line-height: 15px;
        font-family: 400;
      }
      .btn-save
      {
        background-color: #295086;
        background: #295086;
        border-radius: 8px !important;
        width: 140px;
        color: ${theme.color.white};
        font-size: 16px;
        line-height: 15px;
        height: 55px;
        border: 0px;
        font-family: 400;
      }
    }
  }

`;

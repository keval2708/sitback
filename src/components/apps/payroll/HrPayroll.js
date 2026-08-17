"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrActionButtons,
  HrAvatar,
  HrDateField,
  HrHeaderActions,
  HrMetricsGrid,
  HrModalActions,
  HrModalCard,
  HrModalClose,
  HrModalHeader,
  HrModalOverlay,
  HrModalPrimaryButton,
  HrNameCell,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrSecondaryButton,
  HrStatCard,
  HrTable,
  HrTableCard,
  HrTableWrap,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6693 2.66536H11.3359V1.9987C11.3359 1.82189 11.2657 1.65232 11.1407 1.52729C11.0157 1.40227 10.8461 1.33203 10.6693 1.33203C10.4925 1.33203 10.3229 1.40227 10.1979 1.52729C10.0728 1.65232 10.0026 1.82189 10.0026 1.9987V2.66536H6.0026V1.9987C6.0026 1.82189 5.93237 1.65232 5.80734 1.52729C5.68232 1.40227 5.51275 1.33203 5.33594 1.33203C5.15913 1.33203 4.98956 1.40227 4.86453 1.52729C4.73951 1.65232 4.66927 1.82189 4.66927 1.9987V2.66536H3.33594C2.8055 2.66536 2.2968 2.87608 1.92172 3.25115C1.54665 3.62622 1.33594 4.13493 1.33594 4.66536V12.6654C1.33594 13.1958 1.54665 13.7045 1.92172 14.0796C2.2968 14.4547 2.8055 14.6654 3.33594 14.6654H12.6693C13.1997 14.6654 13.7084 14.4547 14.0835 14.0796C14.4586 13.7045 14.6693 13.1958 14.6693 12.6654V4.66536C14.6693 4.13493 14.4586 3.62622 14.0835 3.25115C13.7084 2.87608 13.1997 2.66536 12.6693 2.66536ZM13.3359 12.6654C13.3359 12.8422 13.2657 13.0117 13.1407 13.1368C13.0157 13.2618 12.8461 13.332 12.6693 13.332H3.33594C3.15913 13.332 2.98956 13.2618 2.86453 13.1368C2.73951 13.0117 2.66927 12.8422 2.66927 12.6654V7.9987H13.3359V12.6654ZM13.3359 6.66536H2.66927V4.66536C2.66927 4.48855 2.73951 4.31898 2.86453 4.19396C2.98956 4.06894 3.15913 3.9987 3.33594 3.9987H4.66927V4.66536C4.66927 4.84218 4.73951 5.01174 4.86453 5.13677C4.98956 5.26179 5.15913 5.33203 5.33594 5.33203C5.51275 5.33203 5.68232 5.26179 5.80734 5.13677C5.93237 5.01174 6.0026 4.84218 6.0026 4.66536V3.9987H10.0026V4.66536C10.0026 4.84218 10.0728 5.01174 10.1979 5.13677C10.3229 5.26179 10.4925 5.33203 10.6693 5.33203C10.8461 5.33203 11.0157 5.26179 11.1407 5.13677C11.2657 5.01174 11.3359 4.84218 11.3359 4.66536V3.9987H12.6693C12.8461 3.9987 13.0157 4.06894 13.1407 4.19396C13.2657 4.31898 13.3359 4.48855 13.3359 4.66536V6.66536Z" fill="#295086"/>
</svg>`;

const GENERATE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.80365 7.46133H4.27031V8.528H4.80365V7.46133ZM11.2036 8.528H11.737V7.46133H11.2036V8.528ZM4.80365 10.6592H4.27031V11.7259H4.80365V10.6592ZM11.2036 11.7333H11.737V10.6667H11.2036V11.7333ZM4.80365 4.26347H4.27031V5.33013H4.80365V4.26347ZM9.07031 5.33333H9.60365V4.26667H9.07031V5.33333ZM11.2036 0.533333L11.5812 0.155733L11.4244 0H11.2036V0.533333ZM14.4036 3.73333H14.937V3.51253L14.7812 3.35573L14.4036 3.73333ZM4.80365 8.528H11.2036V7.46133H4.80365V8.528ZM4.80365 11.7259L11.2036 11.7333V10.6667L4.80365 10.6592V11.7259ZM4.80365 5.33013L9.07031 5.33333V4.26667L4.80365 4.26347V5.33013ZM13.337 14.9333H2.67031V16H13.337V14.9333ZM2.13698 14.4V1.6H1.07031V14.4H2.13698ZM2.67031 1.06667H11.2036V0H2.67031V1.06667ZM13.8703 3.73333V14.4H14.937V3.73333H13.8703ZM10.826 0.910933L14.026 4.11093L14.7812 3.35573L11.5812 0.155733L10.826 0.910933ZM2.67031 14.9333C2.52886 14.9333 2.39321 14.8771 2.29319 14.7771C2.19317 14.6771 2.13698 14.5414 2.13698 14.4H1.07031C1.07031 14.8243 1.23888 15.2313 1.53894 15.5314C1.839 15.8314 2.24597 16 2.67031 16V14.9333ZM13.337 16C13.7613 16 14.1683 15.8314 14.4684 15.5314C14.7684 15.2313 14.937 14.8243 14.937 14.4H13.8703C13.8703 14.5414 13.8141 14.6771 13.7141 14.7771C13.6141 14.8771 13.4784 14.9333 13.337 14.9333V16ZM2.13698 1.6C2.13698 1.45855 2.19317 1.3229 2.29319 1.22288C2.39321 1.12286 2.52886 1.06667 2.67031 1.06667V0C2.24597 0 1.839 0.168571 1.53894 0.468629C1.23888 0.768687 1.07031 1.17565 1.07031 1.6H2.13698Z" fill="white"/>
</svg>
`;

const CLEAR_ICON = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 2.5L2.5 9.5M2.5 2.5L9.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const CHECK_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0303 9.53025C17.1669 9.3888 17.2425 9.19935 17.2408 9.0027C17.239 8.80605 17.1602 8.61794 17.0211 8.47889C16.8821 8.33983 16.6939 8.26095 16.4973 8.25924C16.3007 8.25754 16.1112 8.33313 15.9697 8.46975L10.875 13.5645L8.40525 11.0948C8.2638 10.9581 8.07435 10.8825 7.8777 10.8842C7.68105 10.886 7.49294 10.9648 7.35389 11.1039C7.21483 11.2429 7.13595 11.4311 7.13424 11.6277C7.13254 11.8243 7.20813 12.0138 7.34475 12.1553L10.3448 15.1553C10.4854 15.2959 10.6761 15.3748 10.875 15.3748C11.0739 15.3748 11.2646 15.2959 11.4052 15.1553L17.0303 9.53025ZM12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5ZM3 12C3 7.02975 7.02975 3 12 3C16.9703 3 21 7.02975 21 12C21 16.9703 16.9703 21 12 21C7.02975 21 3 16.9703 3 12Z" fill="#295086"/>
</svg>`;

const CLOSE_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const STAT_ICONS = {
  total: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20.2821 16.8461C20.1554 16.4856 19.9196 16.1734 19.6075 15.9528C19.2954 15.7323 18.9224 15.6143 18.5403 15.6152H17.1113C16.7045 15.6146 16.3118 15.7644 16.0088 16.036C15.7059 16.3075 15.5141 16.6816 15.4705 17.0861C15.4268 17.4906 15.5343 17.8969 15.7723 18.2269C16.0104 18.5568 16.362 18.7871 16.7596 18.8732L18.9349 19.3495C19.3796 19.4471 19.7726 19.7055 20.0385 20.0751C20.3043 20.4447 20.4243 20.8995 20.3754 21.3522C20.3265 21.8048 20.1121 22.2235 19.7734 22.5277C19.4347 22.832 18.9956 23.0005 18.5403 23.0008H17.3107C16.9284 23.0016 16.5553 22.8834 16.2431 22.6626C15.931 22.4418 15.6954 22.1293 15.5689 21.7685M17.9255 15.6152V13.7695M17.9255 24.8465V23.0008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.9231 11H13.7692C13.0348 11 12.3304 11.2918 11.8111 11.8111C11.2918 12.3304 11 13.0348 11 13.7692V29L14.4615 26.9231L17.9231 29L21.3846 26.9231L24.8462 29V13.0769C24.8462 12.5261 25.065 11.9978 25.4545 11.6083C25.844 11.2188 26.3722 11 26.9231 11ZM26.9231 11C27.4739 11 28.0022 11.2188 28.3917 11.6083C28.7812 11.9978 29 12.5261 29 13.0769V17.9231H24.8462" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  processed: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.5671 16.0271C23.7022 16.1021 23.8211 16.2029 23.9172 16.3238C24.0133 16.4447 24.0846 16.5834 24.1271 16.7319C24.1696 16.8804 24.1824 17.0358 24.1648 17.1892C24.1472 17.3427 24.0995 17.4912 24.0245 17.6262L20.7582 23.5051C20.6831 23.6401 20.5822 23.7589 20.4613 23.8549C20.3403 23.9508 20.2016 24.022 20.0531 24.0644C19.7532 24.15 19.4316 24.1129 19.1591 23.9613C19.0241 23.8863 18.9053 23.7854 18.8093 23.6644C18.7134 23.5434 18.6422 23.4048 18.5998 23.2563C18.5143 22.9564 18.5513 22.6348 18.7029 22.3623L21.968 16.4833C22.0431 16.3484 22.144 16.2295 22.2649 16.1335C22.3859 16.0376 22.5246 15.9664 22.6731 15.924C22.8216 15.8817 22.977 15.869 23.1304 15.8866C23.2838 15.9043 23.4322 15.9521 23.5671 16.0271Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5482 19.5854C15.743 19.3421 16.0265 19.1861 16.3362 19.1517C16.646 19.1173 16.9568 19.2073 17.2002 19.4019L20.4665 22.0145C20.5871 22.111 20.6875 22.2304 20.762 22.3657C20.8365 22.501 20.8836 22.6496 20.9006 22.8031C20.9177 22.9566 20.9043 23.112 20.8613 23.2603C20.8183 23.4087 20.7465 23.5471 20.65 23.6677C20.5535 23.7883 20.4341 23.8887 20.2988 23.9632C20.1635 24.0377 20.0149 24.0848 19.8614 24.1018C19.7079 24.1188 19.5525 24.1055 19.4042 24.0624C19.2558 24.0194 19.1174 23.9476 18.9968 23.8511L15.7305 21.2385C15.6098 21.142 15.5094 21.0227 15.4349 20.8874C15.3604 20.7521 15.3133 20.6035 15.2962 20.4499C15.2792 20.2964 15.2926 20.1411 15.3356 19.9927C15.3787 19.8444 15.4517 19.7059 15.5482 19.5854Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.547 12.5776C20.4017 12.4332 20.2051 12.3522 20.0003 12.3522C19.7955 12.3522 19.5989 12.4332 19.4536 12.5776C18.3871 13.6428 16.6799 14.2989 15.1784 14.2237C15.0701 14.2172 14.9616 14.2339 14.8603 14.2726C14.7589 14.3113 14.6669 14.3712 14.5905 14.4482C14.5166 14.5216 14.4584 14.6093 14.4196 14.7059C14.3808 14.8026 14.3621 14.9061 14.3647 15.0103C14.3812 15.8568 14.1684 16.7022 13.8886 17.3971C13.6087 18.0932 13.176 18.8492 12.5776 19.4488C12.4332 19.5942 12.3522 19.7908 12.3522 19.9956C12.3522 20.2004 12.4332 20.397 12.5776 20.5423C13.6275 21.5935 14.3342 23.2478 14.3647 24.7352C14.3679 24.9346 14.4489 25.1249 14.5905 25.2655C14.7255 25.4018 14.9068 25.4824 15.0984 25.4912C15.9274 25.5324 16.7516 25.7769 17.4418 26.0826C18.1331 26.3895 18.8668 26.8363 19.4524 27.423C19.5977 27.5674 19.7943 27.6483 19.9991 27.6483C20.204 27.6483 20.4005 27.5674 20.5459 27.423C21.1326 26.8363 21.8663 26.3895 22.5565 26.0826C23.2478 25.7769 24.0732 25.5324 24.8998 25.4912C25.0914 25.4824 25.2728 25.4018 25.4077 25.2655C25.5497 25.1251 25.6312 24.9348 25.6347 24.7352C25.6652 23.2478 26.3719 21.5935 27.4219 20.5423C27.5662 20.397 27.6472 20.2004 27.6472 19.9956C27.6472 19.7908 27.5662 19.5942 27.4219 19.4488C26.8222 18.8492 26.3907 18.0932 26.1109 17.3971C25.831 16.7022 25.617 15.8568 25.6347 15.0103C25.6372 14.9061 25.6183 14.8024 25.5793 14.7058C25.5403 14.6091 25.4819 14.5215 25.4077 14.4482C25.3315 14.3711 25.2398 14.3112 25.1387 14.2722C25.0375 14.2333 24.9292 14.2164 24.821 14.2225C23.3184 14.2989 21.6111 13.6428 20.547 12.5776ZM12.0143 15.0561C12.032 15.9485 11.5464 17.1549 10.915 17.7851C10.3291 18.3716 10 19.1666 10 19.9956C10 20.8246 10.3291 21.6196 10.915 22.2061C11.5382 22.8269 11.9967 23.9039 12.0143 24.7834C12.0308 25.5618 12.3353 26.3354 12.9291 26.928C13.4769 27.477 14.2098 27.8019 14.9844 27.8393C15.9144 27.8863 17.1326 28.4272 17.791 29.0856C18.3774 29.6711 19.1722 30 20.0009 30C20.8296 30 21.6244 29.6711 22.2108 29.0856C22.8692 28.4272 24.0873 27.8863 25.0174 27.8393C25.792 27.8019 26.5248 27.477 27.0727 26.928C27.6432 26.3583 27.9707 25.5896 27.9862 24.7834C28.0051 23.9039 28.4636 22.8269 29.0856 22.2049C29.6711 21.6185 30 20.8237 30 19.995C30 19.1663 29.6711 18.3715 29.0856 17.7851C28.4554 17.1549 27.9686 15.9485 27.9874 15.0573C27.9963 14.6365 27.9198 14.2183 27.7626 13.8278C27.6053 13.4374 27.3706 13.0829 27.0727 12.7857C26.7638 12.476 26.3932 12.2348 25.985 12.0778C25.5769 11.9208 25.1402 11.8515 24.7034 11.8744C23.8639 11.9168 22.8045 11.5099 22.2108 10.915C21.6243 10.3291 20.8293 10 20.0003 10C19.1713 10 18.3763 10.3291 17.7898 10.915C17.1972 11.5088 16.1367 11.9168 15.2971 11.8744C14.8606 11.8517 14.4242 11.9211 14.0162 12.0781C13.6082 12.2351 13.2378 12.4762 12.9291 12.7857C12.6313 13.0828 12.3967 13.4371 12.2394 13.8273C12.0822 14.2175 12.0057 14.6355 12.0143 15.0561Z" fill="white"/>
</svg>`,
  paid: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M19.1 27H20.85V25.75C21.6833 25.6 22.4 25.275 23 24.775C23.6 24.275 23.9 23.5333 23.9 22.55C23.9 21.85 23.7 21.2083 23.3 20.625C22.9 20.0417 22.1 19.5333 20.9 19.1C19.9 18.7667 19.2083 18.475 18.825 18.225C18.4417 17.975 18.25 17.6333 18.25 17.2C18.25 16.7667 18.4043 16.425 18.713 16.175C19.0217 15.925 19.4673 15.8 20.05 15.8C20.5833 15.8 21 15.929 21.3 16.187C21.6 16.445 21.8167 16.766 21.95 17.15L23.55 16.5C23.3667 15.9167 23.0293 15.4083 22.538 14.975C22.0467 14.5417 21.5007 14.3 20.9 14.25V13H19.15V14.25C18.3167 14.4333 17.6667 14.8 17.2 15.35C16.7333 15.9 16.5 16.5167 16.5 17.2C16.5 17.9833 16.7293 18.6167 17.188 19.1C17.6467 19.5833 18.3673 20 19.35 20.35C20.4 20.7333 21.1293 21.075 21.538 21.375C21.9467 21.675 22.1507 22.0667 22.15 22.55C22.15 23.1 21.9543 23.5043 21.563 23.763C21.1717 24.0217 20.7007 24.1507 20.15 24.15C19.5993 24.1493 19.1117 23.9787 18.687 23.638C18.2623 23.2973 17.95 22.7847 17.75 22.1L16.1 22.75C16.3333 23.55 16.696 24.196 17.188 24.688C17.68 25.18 18.3173 25.5173 19.1 25.7V27ZM20 30C18.6167 30 17.3167 29.7373 16.1 29.212C14.8833 28.6867 13.825 27.9743 12.925 27.075C12.025 26.1757 11.3127 25.1173 10.788 23.9C10.2633 22.6827 10.0007 21.3827 10 20C9.99933 18.6173 10.262 17.3173 10.788 16.1C11.314 14.8827 12.0263 13.8243 12.925 12.925C13.8237 12.0257 14.882 11.3133 16.1 10.788C17.318 10.2627 18.618 10 20 10C21.382 10 22.682 10.2627 23.9 10.788C25.118 11.3133 26.1763 12.0257 27.075 12.925C27.9737 13.8243 28.6863 14.8827 29.213 16.1C29.7397 17.3173 30.002 18.6173 30 20C29.998 21.3827 29.7353 22.6827 29.212 23.9C28.6887 25.1173 27.9763 26.1757 27.075 27.075C26.1737 27.9743 25.1153 28.687 23.9 29.213C22.6847 29.739 21.3847 30.0013 20 30ZM20 28C22.2333 28 24.125 27.225 25.675 25.675C27.225 24.125 28 22.2333 28 20C28 17.7667 27.225 15.875 25.675 14.325C24.125 12.775 22.2333 12 20 12C17.7667 12 15.875 12.775 14.325 14.325C12.775 15.875 12 17.7667 12 20C12 22.2333 12.775 24.125 14.325 25.675C15.875 27.225 17.7667 28 20 28Z" fill="white"/>
</svg>`,
  net: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M26.5002 15.0001V12C26.5002 11.7348 26.3948 11.4804 26.2073 11.2929C26.0197 11.1054 25.7654 11 25.5002 11H12.5C11.9696 11 11.4609 11.2107 11.0858 11.5858C10.7107 11.9609 10.5 12.4696 10.5 13.0001C10.5 13.5305 10.7107 14.0392 11.0858 14.4143C11.4609 14.7894 11.9696 15.0001 12.5 15.0001H27.5002C27.7654 15.0001 28.0198 15.1055 28.2073 15.293C28.3948 15.4806 28.5002 15.7349 28.5002 16.0001V20.0003M28.5002 20.0003H25.5002C24.9697 20.0003 24.461 20.211 24.0859 20.5861C23.7109 20.9611 23.5001 21.4699 23.5001 22.0003C23.5001 22.5308 23.7109 23.0395 24.0859 23.4146C24.461 23.7896 24.9697 24.0004 25.5002 24.0004H28.5002C28.7654 24.0004 29.0198 23.895 29.2073 23.7075C29.3948 23.5199 29.5002 23.2656 29.5002 23.0003V21.0003C29.5002 20.7351 29.3948 20.4807 29.2073 20.2932C29.0198 20.1056 28.7654 20.0003 28.5002 20.0003Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13V27.0004C10.5 27.5308 10.7107 28.0396 11.0858 28.4147C11.4609 28.7897 11.9696 29.0005 12.5 29.0005H27.5002C27.7654 29.0005 28.0198 28.8951 28.2073 28.7076C28.3948 28.52 28.5002 28.2656 28.5002 28.0004V24.0003" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
};

const PAGE_LIMIT = 10;
const PAYROLL_SCROLL_ID = "hr-payroll-scroll";
const AVATAR_COLORS = [
  "#295086",
  "#E8622C",
  "#12A150",
  "#9333EA",
  "#E5A50A",
  "#4F9CFF",
  "#3B67A3",
  "#C45C26",
];

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(Number(value)) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

const extractRows = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.list)) return payload.list;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.payrolls)) return payload.payrolls;
  return [];
};

const formatDateValue = (value) => {
  if (!value) return "-";
  const parsed = moment(value);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : String(value);
};

const getEmployeeName = (item = {}) => {
  const employee =
    typeof item.employee === "object" && item.employee ? item.employee : null;
  return (
    item.employeeName ||
    item.employee_name ||
    item.name ||
    (typeof item.employee === "string" ? item.employee : "") ||
    employee?.name ||
    employee?.fullName ||
    [employee?.firstName, employee?.lastName].filter(Boolean).join(" ") ||
    "Employee"
  );
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "E";

const normalizeStatusTone = (value) => {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (key === "paid" || key === "payrollpaid" || key === "payroll-paid") {
    return "payroll-paid";
  }
  if (key === "processed") return "processed";
  if (key === "pending") return "pending";
  return key || "processed";
};

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const normalizePayrollRow = (item = {}, index = 0) => {
  const id = item.id ?? item._id ?? `payroll-${index}`;
  const name = getEmployeeName(item);
  const status = item.status || item.payrollStatus || "Processed";

  return {
    id,
    name,
    initials: getInitials(name),
    avatarBg: AVATAR_COLORS[Number(id || index) % AVATAR_COLORS.length],
    periodStart: formatDateValue(
      item.periodStartDate || item.periodStart || item.startDate
    ),
    periodEnd: formatDateValue(
      item.periodEndDate || item.periodEnd || item.endDate
    ),
    workingDays: Number(item.workingDays ?? item.working_days ?? 0),
    paidLeave: Number(item.paidLeave ?? item.paid_leave ?? 0),
    unpaidLeave: Number(item.unpaidLeave ?? item.unpaid_leave ?? 0),
    overtimeHrs: Number(
      item.overtimeHrs ?? item.overtimeHours ?? item.overtime ?? 0
    ),
    baseSalary: Number(item.baseSalary ?? item.base_salary ?? 0),
    overtimeAmount: Number(
      item.overtimeAmount ?? item.overtime_amount ?? 0
    ),
    tips: Number(item.tips ?? item.tipAmount ?? 0),
    deductions: Number(item.deductions ?? item.deduction ?? 0),
    netSalary: Number(item.netSalary ?? item.net_salary ?? 0),
    status: capitalize(status),
    statusTone: normalizeStatusTone(status),
  };
};

const PAYMENT_METHODS = {
  cash: "cash",
  bank: "bank",
};

export default function HrPayroll() {
  const [periodStart, setPeriodStart] = useState(null);
  const [periodEnd, setPeriodEnd] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayrollRow, setSelectedPayrollRow] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PAYMENT_METHODS.cash
  );
  const [payingSalary, setPayingSalary] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalPayrolls: 0,
    processed: 0,
    paidSalary: 0,
    netSalary: 0,
  });
  const { toaster } = useToaster();

  const periodStartValue = periodStart
    ? moment(periodStart).format("YYYY-MM-DD")
    : "";
  const periodEndValue = periodEnd
    ? moment(periodEnd).format("YYYY-MM-DD")
    : "";

  const endMinDate = useMemo(() => {
    if (!periodStart) return undefined;
    return moment(periodStart).add(1, "day").toDate();
  }, [periodStart]);

  const buildDateParams = useCallback(() => {
    const params = new URLSearchParams();
    if (periodStartValue) params.set("periodStartDate", periodStartValue);
    if (periodEndValue) params.set("periodEndDate", periodEndValue);
    return params;
  }, [periodEndValue, periodStartValue]);

  const fetchAnalytics = useCallback(
    async (isCancelled = () => false) => {
      try {
        setStatsLoading(true);
        const params = buildDateParams();
        const query = params.toString();
        const res = await axiosApiCall.get(
          query
            ? `${API_ROUTER?.HR_PAYROLL_ANALYTICS}?${query}`
            : API_ROUTER?.HR_PAYROLL_ANALYTICS
        );
        if (isCancelled()) return;

        const summary = res?.data?.data ?? res?.data ?? {};
        setAnalytics({
          totalPayrolls: Number(
            summary.totalSalaryTripsCount ??
              summary.totalPayrolls ??
              summary.total ??
              summary.totalCount ??
              0
          ),
          processed: Number(
            summary.processedStatusCount ??
              summary.processed ??
              summary.processedCount ??
              0
          ),
          paidSalary: Number(
            summary.paidStatusCount ??
              summary.paidSalary ??
              summary.paid ??
              summary.paidCount ??
              0
          ),
          netSalary: Number(
            summary.netSalaryCount ??
              summary.netSalary ??
              summary.totalNetSalary ??
              summary.net ??
              0
          ),
        });
      } catch {
        if (!isCancelled()) {
          setAnalytics({
            totalPayrolls: 0,
            processed: 0,
            paidSalary: 0,
            netSalary: 0,
          });
        }
      } finally {
        if (!isCancelled()) setStatsLoading(false);
      }
    },
    [buildDateParams]
  );

  const fetchPayrollList = useCallback(
    async (pageNum, isCancelled = () => false) => {
      try {
        setLoading(true);
        const params = buildDateParams();
        params.set("page", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_PAYROLL_LIST}?${params.toString()}`
        );
        console.log("res payroll", res);
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const payload = resData?.data ?? resData;
        const list = extractRows(resData).map(normalizePayrollRow);

        setRows((prev) => {
          if (pageNum === 1) return list;
          const existingIds = new Set(prev.map((row) => String(row.id)));
          return [
            ...prev,
            ...list.filter((row) => !existingIds.has(String(row.id))),
          ];
        });

        setHasMore(
          Boolean(
            resData?.isNextPage ??
              payload?.isNextPage ??
              false
          )
        );
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setRows([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [buildDateParams]
  );

  const fetchSalaryList = useCallback(
    async (pageNum = 1, isCancelled = () => false) => {
      try {
        setLoading(true);
        const params = buildDateParams();
        params.set("pageId", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_SALARY_LIST}?${params.toString()}`
        );
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const payload = resData?.data ?? resData;
        const list = extractRows(resData).map(normalizePayrollRow);

        setRows(list);
        setHasMore(Boolean(resData?.isNextPage ?? payload?.isNextPage ?? false));
      } catch {
        if (!isCancelled()) {
          setRows([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    [buildDateParams]
  );

  useEffect(() => {
    setRows([]);
    setHasMore(true);
    setPage(1);
  }, [periodStartValue, periodEndValue]);

  useEffect(() => {
    let cancelled = false;
    fetchPayrollList(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchPayrollList, page]);

  useEffect(() => {
    let cancelled = false;
    fetchAnalytics(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchAnalytics]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  const stats = [
    {
      label: "Total Payrolls",
      value: analytics.totalPayrolls,
      icon: STAT_ICONS.total,
    },
    {
      label: "Processed",
      value: analytics.processed,
      icon: STAT_ICONS.processed,
    },
    {
      label: "Paid Salary",
      value: analytics.paidSalary,
      icon: STAT_ICONS.paid,
    },
    {
      label: "Net Salary",
      value: formatCurrency(analytics.netSalary),
      icon: STAT_ICONS.net,
    },
  ];

  const handleMarkPaid = (id) => {
    const payroll = rows.find((row) => row.id === id) || null;
    setSelectedPayrollRow(payroll);
    setSelectedPaymentMethod(PAYMENT_METHODS.cash);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    if (payingSalary) return;
    setPaymentModalOpen(false);
    setSelectedPayrollRow(null);
    setSelectedPaymentMethod(PAYMENT_METHODS.cash);
  };

  const handlePaySalary = async () => {
    if (!selectedPayrollRow?.id || payingSalary) return;

    try {
      setPayingSalary(true);
      const res = await axiosApiCall.post(API_ROUTER?.HR_PAY_SALARY, {
        salaryId: selectedPayrollRow.id,
        paymentMethod: selectedPaymentMethod,
      });

      if (!res?.status) {
        toaster(
          res?.message || res?.data?.message || TOAST_ALERTS.GENERAL_ERROR,
          TOAST_TYPES.ERROR
        );
        return;
      }

      toaster(
        res?.data?.message || "Salary paid successfully",
        TOAST_TYPES.SUCCESS
      );

      setRows([]);
      setHasMore(true);
      setPage(1);
      fetchPayrollList(1);
      fetchAnalytics();
      setPaymentModalOpen(false);
      setSelectedPayrollRow(null);
      setSelectedPaymentMethod(PAYMENT_METHODS.cash);
    } catch {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setPayingSalary(false);
    }
  };

  const renderPaymentMethodModal = () => {
    if (!paymentModalOpen || !selectedPayrollRow) return null;

    return (
      <HrModalOverlay onClick={handleClosePaymentModal}>
        <HrModalCard
          onClick={(event) => event.stopPropagation()}
          style={{ maxWidth: 520 }}
        >
          <HrModalHeader>
            <h2>Select Transfer Method</h2>
            <HrModalClose
              type="button"
              aria-label="Close payment method modal"
              onClick={handleClosePaymentModal}
            >
              <InlineSVG src={CLOSE_ICON} />
            </HrModalClose>
          </HrModalHeader>

          <div style={{ display: "grid", gap: 12 }}>
            {[
              {
                key: PAYMENT_METHODS.cash,
                label: "Transfer via Cash",
                hint: "Mark this salary as paid using cash.",
              },
              {
                key: PAYMENT_METHODS.bank,
                label: "Bank Transfer",
                hint: "Use bank transfer for this salary payout.",
              },
            ].map((option) => {
              const isSelected = selectedPaymentMethod === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedPaymentMethod(option.key)}
                  style={{
                    textAlign: "left",
                    borderRadius: 14,
                    border: `1.5px solid ${isSelected ? "#295086" : "#D7E2EF"}`,
                    background: isSelected ? "#F5F8FC" : "#FFFFFF",
                    padding: "16px 18px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1E293B",
                      marginBottom: 4,
                    }}
                  >
                    {option.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748B" }}>
                    {option.hint}
                  </div>
                </button>
              );
            })}
          </div>

          <HrModalActions style={{ marginTop: 24 }}>
            <HrSecondaryButton
              type="button"
              onClick={handleClosePaymentModal}
              disabled={payingSalary}
            >
              Cancel
            </HrSecondaryButton>
            <HrModalPrimaryButton
              type="button"
              onClick={handlePaySalary}
              disabled={payingSalary}
            >
              {payingSalary ? "Processing..." : "Continue"}
            </HrModalPrimaryButton>
          </HrModalActions>
        </HrModalCard>
      </HrModalOverlay>
    );
  };

  const handleStartDateChange = (date) => {
    setPeriodStart(date || null);

    if (
      date &&
      periodEnd &&
      !moment(periodEnd).isAfter(moment(date), "day")
    ) {
      setPeriodEnd(null);
    }

    if (!date) {
      setPeriodEnd(null);
    }
  };

  const handleClearStartDate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPeriodStart(null);
    setPeriodEnd(null);
  };

  const handleClearEndDate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPeriodEnd(null);
  };

  const handleGeneratePayroll = () => {
    if (!periodStart || !periodEnd) return;
    if (!moment(periodEnd).isAfter(moment(periodStart), "day")) return;
    setRows([]);
    setHasMore(true);
    setPage(1);
    fetchPayrollList(1);
    fetchAnalytics();
  };

  const renderTableBody = () => {
    if (loading && page === 1 && !rows.length) {
      return Array.from({ length: 6 }).map((_, index) => (
        <tr key={`payroll-skeleton-${index}`}>
          {Array.from({ length: 12 }).map((__, colIndex) => (
            <td key={colIndex}>
              <Skeleton width={colIndex === 0 ? 140 : 70} height={16} />
            </td>
          ))}
        </tr>
      ));
    }

    if (!rows.length) {
      return (
        <tr>
          <td colSpan={12} style={{ textAlign: "center", color: "#8391A1" }}>
            No payroll records found.
          </td>
        </tr>
      );
    }

    return rows.map((row) => (
      <tr key={row.id}>
        <td>
          <HrNameCell>
            <HrAvatar $bg={row.avatarBg}>{row.initials}</HrAvatar>
            {row.name}
          </HrNameCell>
        </td>
        <td>
          {row.periodStart} {"->"} {row.periodEnd}
        </td>
        <td>{row.workingDays}</td>
        <td>
          {row.paidLeave}/{row.unpaidLeave}
        </td>
        <td>{row.overtimeHrs}</td>
        <td>{formatCurrency(row.baseSalary)}</td>
        <td>{formatCurrency(row.overtimeAmount)}</td>
        <td>{formatCurrency(row.tips)}</td>
        <td style={{ color: "#E86D4D", fontWeight: 400 }}>
          -{formatCurrency(row.deductions)}
        </td>
        <td style={{ fontWeight: 700, color: "#295086" }}>
          {formatCurrency(row.netSalary)}
        </td>
        <td>
          <HrPill $tone={row.statusTone}>{row.status}</HrPill>
        </td>
        <td>
          {row.statusTone === "processed" ? (
            <HrActionButtons>
              <button
                type="button"
                aria-label={`Mark ${row.name} as paid`}
                onClick={() => handleMarkPaid(row.id)}
              >
                <InlineSVG src={CHECK_ICON} />
              </button>
            </HrActionButtons>
          ) : null}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Payroll Processing</h1>
          <p>Auto-generate payroll using attendance, leaves, overtime, and tips</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrDateField $wide $clearable={Boolean(periodStart)}>
            <ReactDatePicker
              selected={periodStart}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Period Start Date"
              onKeyDown={(event) => event.preventDefault()}
              aria-label="Period Start Date"
              portalId="hr-datepicker-portal"
              popperClassName="hr-datepicker-portal-popper"
              popperProps={{ strategy: "fixed" }}
            />
            {periodStart ? (
              <button
                type="button"
                className="clear-btn"
                aria-label="Clear period start date"
                onClick={handleClearStartDate}
              >
                <InlineSVG src={CLEAR_ICON} />
              </button>
            ) : null}
            <span className="field-icon" aria-hidden="true">
              <InlineSVG src={CALENDAR_ICON} />
            </span>
          </HrDateField>
          <HrDateField $wide $clearable={Boolean(periodEnd)}>
            <ReactDatePicker
              selected={periodEnd}
              onChange={(date) => setPeriodEnd(date || null)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Period End Date"
              minDate={endMinDate}
              disabled={!periodStart}
              onKeyDown={(event) => event.preventDefault()}
              aria-label="Period End Date"
              portalId="hr-datepicker-portal"
              popperClassName="hr-datepicker-portal-popper"
              popperProps={{ strategy: "fixed" }}
            />
            {periodEnd ? (
              <button
                type="button"
                className="clear-btn"
                aria-label="Clear period end date"
                onClick={handleClearEndDate}
              >
                <InlineSVG src={CLEAR_ICON} />
              </button>
            ) : null}
            <span className="field-icon" aria-hidden="true">
              <InlineSVG src={CALENDAR_ICON} />
            </span>
          </HrDateField>
          {/* <HrPrimaryButton type="button" onClick={handleGeneratePayroll}>
            <InlineSVG src={GENERATE_ICON} />
            Generate Payroll
          </HrPrimaryButton> */}
        </HrHeaderActions>
      </HrPageHeader>

      <HrMetricsGrid>
        {stats.map((stat) => (
          <HrStatCard key={stat.label}>
            <div className="stat-top">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-icon">
                <InlineSVG src={stat.icon} />
              </span>
            </div>
            <span className="stat-value">
              {statsLoading ? <Skeleton width={48} height={28} /> : stat.value}
            </span>
          </HrStatCard>
        ))}
      </HrMetricsGrid>

      <HrTableCard>
        <HrTableWrap
          id={PAYROLL_SCROLL_ID}
          style={{ maxHeight: "60vh", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={rows.length}
            next={loadMore}
            hasMore={hasMore}
            scrollableTarget={PAYROLL_SCROLL_ID}
            loader={
              <div
                style={{
                  textAlign: "center",
                  padding: "12px 0",
                  color: "#8391A1",
                }}
              >
                Loading more...
              </div>
            }
          >
            <HrTable $minWidth="1180px">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Period</th>
                  <th>Working Days</th>
                  <th>Paid/Unpaid Leave</th>
                  <th>Overtime Hrs</th>
                  <th>Base Salary</th>
                  <th>Overtime Amount</th>
                  <th>Tips</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </HrTable>
          </InfiniteScroll>
        </HrTableWrap>
      </HrTableCard>
      {renderPaymentMethodModal()}
    </>
  );
}

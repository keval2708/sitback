"use client";

import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InlineSVG from "svg-inline-react";
import SalarySlipModal from "@/components/apps/slips/SalarySlipModal";
import { API_ROUTER } from "@/services/apiRouter";
import {
  HrActionButtons,
  HrAvatar,
  HrHeaderActions,
  HrHeaderOutlineButton,
  HrMetricsGrid,
  HrNameCell,
  HrPageHeader,
  HrPageTitleBlock,
  HrPill,
  HrStatCard,
  HrTable,
  HrTableCard,
  HrTableWrap,
} from "@/styles/pages/hr-module.style";
import axiosApiCall from "@/utils/axios";

const EXPORT_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6693 2.66536H11.3359V1.9987C11.3359 1.82189 11.2657 1.65232 11.1407 1.52729C11.0157 1.40227 10.8461 1.33203 10.6693 1.33203C10.4925 1.33203 10.3229 1.40227 10.1979 1.52729C10.0728 1.65232 10.0026 1.82189 10.0026 1.9987V2.66536H6.0026V1.9987C6.0026 1.82189 5.93237 1.65232 5.80734 1.52729C5.68232 1.40227 5.51275 1.33203 5.33594 1.33203C5.15913 1.33203 4.98956 1.40227 4.86453 1.52729C4.73951 1.65232 4.66927 1.82189 4.66927 1.9987V2.66536H3.33594C2.8055 2.66536 2.2968 2.87608 1.92172 3.25115C1.54665 3.62622 1.33594 4.13493 1.33594 4.66536V12.6654C1.33594 13.1958 1.54665 13.7045 1.92172 14.0796C2.2968 14.4547 2.8055 14.6654 3.33594 14.6654H12.6693C13.1997 14.6654 13.7084 14.4547 14.0835 14.0796C14.4586 13.7045 14.6693 13.1958 14.6693 12.6654V4.66536C14.6693 4.13493 14.4586 3.62622 14.0835 3.25115C13.7084 2.87608 13.1997 2.66536 12.6693 2.66536ZM13.3359 12.6654C13.3359 12.8422 13.2657 13.0117 13.1407 13.1368C13.0157 13.2618 12.8461 13.332 12.6693 13.332H3.33594C3.15913 13.332 2.98956 13.2618 2.86453 13.1368C2.73951 13.0117 2.66927 12.8422 2.66927 12.6654V7.9987H13.3359V12.6654ZM13.3359 6.66536H2.66927V4.66536C2.66927 4.48855 2.73951 4.31898 2.86453 4.19396C2.98956 4.06894 3.15913 3.9987 3.33594 3.9987H4.66927V4.66536C4.66927 4.84218 4.73951 5.01174 4.86453 5.13677C4.98956 5.26179 5.15913 5.33203 5.33594 5.33203C5.51275 5.33203 5.68232 5.26179 5.80734 5.13677C5.93237 5.01174 6.0026 4.84218 6.0026 4.66536V3.9987H10.0026V4.66536C10.0026 4.84218 10.0728 5.01174 10.1979 5.13677C10.3229 5.26179 10.4925 5.33203 10.6693 5.33203C10.8461 5.33203 11.0157 5.26179 11.1407 5.13677C11.2657 5.01174 11.3359 4.84218 11.3359 4.66536V3.9987H12.6693C12.8461 3.9987 13.0157 4.06894 13.1407 4.19396C13.2657 4.31898 13.3359 4.48855 13.3359 4.66536V6.66536Z" fill="#295086"/>
</svg>
`;

const GENERATE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.80365 7.46133H4.27031V8.528H4.80365V7.46133ZM11.2036 8.528H11.737V7.46133H11.2036V8.528ZM4.80365 10.6592H4.27031V11.7259H4.80365V10.6592ZM11.2036 11.7333H11.737V10.6667H11.2036V11.7333ZM4.80365 4.26347H4.27031V5.33013H4.80365V4.26347ZM9.07031 5.33333H9.60365V4.26667H9.07031V5.33333ZM11.2036 0.533333L11.5812 0.155733L11.4244 0H11.2036V0.533333ZM14.4036 3.73333H14.937V3.51253L14.7812 3.35573L14.4036 3.73333ZM4.80365 8.528H11.2036V7.46133H4.80365V8.528ZM4.80365 11.7259L11.2036 11.7333V10.6667L4.80365 10.6592V11.7259ZM4.80365 5.33013L9.07031 5.33333V4.26667L4.80365 4.26347V5.33013ZM13.337 14.9333H2.67031V16H13.337V14.9333ZM2.13698 14.4V1.6H1.07031V14.4H2.13698ZM2.67031 1.06667H11.2036V0H2.67031V1.06667ZM13.8703 3.73333V14.4H14.937V3.73333H13.8703ZM10.826 0.910933L14.026 4.11093L14.7812 3.35573L11.5812 0.155733L10.826 0.910933ZM2.67031 14.9333C2.52886 14.9333 2.39321 14.8771 2.29319 14.7771C2.19317 14.6771 2.13698 14.5414 2.13698 14.4H1.07031C1.07031 14.8243 1.23888 15.2313 1.53894 15.5314C1.839 15.8314 2.24597 16 2.67031 16V14.9333ZM13.337 16C13.7613 16 14.1683 15.8314 14.4684 15.5314C14.7684 15.2313 14.937 14.8243 14.937 14.4H13.8703C13.8703 14.5414 13.8141 14.6771 13.7141 14.7771C13.6141 14.8771 13.4784 14.9333 13.337 14.9333V16ZM2.13698 1.6C2.13698 1.45855 2.19317 1.3229 2.29319 1.22288C2.39321 1.12286 2.52886 1.06667 2.67031 1.06667V0C2.24597 0 1.839 0.168571 1.53894 0.468629C1.23888 0.768687 1.07031 1.17565 1.07031 1.6H2.13698Z" fill="white"/>
</svg>
`;

const VIEW_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33594 9.9987C8.33594 10.4407 8.51153 10.8646 8.82409 11.1772C9.13665 11.4898 9.56058 11.6654 10.0026 11.6654C10.4446 11.6654 10.8686 11.4898 11.1811 11.1772C11.4937 10.8646 11.6693 10.4407 11.6693 9.9987C11.6693 9.55667 11.4937 9.13275 11.1811 8.82019C10.8686 8.50763 10.4446 8.33203 10.0026 8.33203C9.56058 8.33203 9.13665 8.50763 8.82409 8.82019C8.51153 9.13275 8.33594 9.55667 8.33594 9.9987Z" stroke="#007BFF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z" stroke="#007BFF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const PRINT_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66406 17.5C6.20573 17.5 5.81351 17.3369 5.4874 17.0108C5.16128 16.6847 4.99795 16.2922 4.9974 15.8333V14.1667H3.33073C2.8724 14.1667 2.48017 14.0036 2.15406 13.6775C1.82795 13.3514 1.66462 12.9589 1.66406 12.5V9.16667C1.66406 8.45833 1.90712 7.86472 2.39323 7.38583C2.87934 6.90694 3.46962 6.66722 4.16406 6.66667H15.8307C16.5391 6.66667 17.133 6.90639 17.6124 7.38583C18.0918 7.86528 18.3313 8.45889 18.3307 9.16667V12.5C18.3307 12.9583 18.1677 13.3508 17.8416 13.6775C17.5155 14.0042 17.123 14.1672 16.6641 14.1667H14.9974V15.8333C14.9974 16.2917 14.8343 16.6842 14.5082 17.0108C14.1821 17.3375 13.7896 17.5006 13.3307 17.5H6.66406ZM3.33073 12.5H4.9974C4.9974 12.0417 5.16073 11.6494 5.4874 11.3233C5.81406 10.9972 6.20628 10.8339 6.66406 10.8333H13.3307C13.7891 10.8333 14.1816 10.9967 14.5082 11.3233C14.8349 11.65 14.998 12.0422 14.9974 12.5H16.6641V9.16667C16.6641 8.93056 16.5841 8.73278 16.4241 8.57333C16.2641 8.41389 16.0663 8.33389 15.8307 8.33333H4.16406C3.92795 8.33333 3.73017 8.41333 3.57073 8.57333C3.41128 8.73333 3.33128 8.93111 3.33073 9.16667V12.5ZM13.3307 6.66667V4.16667H6.66406V6.66667H4.9974V4.16667C4.9974 3.70833 5.16073 3.31611 5.4874 2.99C5.81406 2.66389 6.20628 2.50056 6.66406 2.5H13.3307C13.7891 2.5 14.1816 2.66333 14.5082 2.99C14.8349 3.31667 14.998 3.70889 14.9974 4.16667V6.66667H13.3307ZM14.9974 10.4167C15.2335 10.4167 15.4316 10.3367 15.5916 10.1767C15.7516 10.0167 15.8313 9.81889 15.8307 9.58333C15.8302 9.34778 15.7502 9.15 15.5907 8.99C15.4313 8.83 15.2335 8.75 14.9974 8.75C14.7613 8.75 14.5635 8.83 14.4041 8.99C14.2446 9.15 14.1646 9.34778 14.1641 9.58333C14.1635 9.81889 14.2435 10.0169 14.4041 10.1775C14.5646 10.3381 14.7624 10.4178 14.9974 10.4167ZM13.3307 15.8333V12.5H6.66406V15.8333H13.3307Z" fill="#295086"/>
</svg>
`;

const STAT_ICONS = {
  total: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M20.2821 16.8461C20.1554 16.4856 19.9196 16.1734 19.6075 15.9528C19.2954 15.7323 18.9224 15.6143 18.5403 15.6152H17.1113C16.7045 15.6146 16.3118 15.7644 16.0088 16.036C15.7059 16.3075 15.5141 16.6816 15.4705 17.0861C15.4268 17.4906 15.5343 17.8969 15.7723 18.2269C16.0104 18.5568 16.362 18.7871 16.7596 18.8732L18.9349 19.3495C19.3796 19.4471 19.7726 19.7055 20.0385 20.0751C20.3043 20.4447 20.4243 20.8995 20.3754 21.3522C20.3265 21.8048 20.1121 22.2235 19.7734 22.5277C19.4347 22.832 18.9956 23.0005 18.5403 23.0008H17.3107C16.9284 23.0016 16.5553 22.8834 16.2431 22.6626C15.931 22.4418 15.6954 22.1293 15.5689 21.7685M17.9255 15.6152V13.7695M17.9255 24.8465V23.0008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.9231 11H13.7692C13.0348 11 12.3304 11.2918 11.8111 11.8111C11.2918 12.3304 11 13.0348 11 13.7692V29L14.4615 26.9231L17.9231 29L21.3846 26.9231L24.8462 29V13.0769C24.8462 12.5261 25.065 11.9978 25.4545 11.6083C25.844 11.2188 26.3722 11 26.9231 11ZM26.9231 11C27.4739 11 28.0022 11.2188 28.3917 11.6083C28.7812 11.9978 29 12.5261 29 13.0769V17.9231H24.8462" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  net: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path d="M26.5002 15.0001V12C26.5002 11.7348 26.3948 11.4804 26.2073 11.2929C26.0197 11.1054 25.7654 11 25.5002 11H12.5C11.9696 11 11.4609 11.2107 11.0858 11.5858C10.7107 11.9609 10.5 12.4696 10.5 13.0001C10.5 13.5305 10.7107 14.0392 11.0858 14.4143C11.4609 14.7894 11.9696 15.0001 12.5 15.0001H27.5002C27.7654 15.0001 28.0198 15.1055 28.2073 15.293C28.3948 15.4806 28.5002 15.7349 28.5002 16.0001V20.0003M28.5002 20.0003H25.5002C24.9697 20.0003 24.461 20.211 24.0859 20.5861C23.7109 20.9611 23.5001 21.4699 23.5001 22.0003C23.5001 22.5308 23.7109 23.0395 24.0859 23.4146C24.461 23.7896 24.9697 24.0004 25.5002 24.0004H28.5002C28.7654 24.0004 29.0198 23.895 29.2073 23.7075C29.3948 23.5199 29.5002 23.2656 29.5002 23.0003V21.0003C29.5002 20.7351 29.3948 20.4807 29.2073 20.2932C29.0198 20.1056 28.7654 20.0003 28.5002 20.0003Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 13V27.0004C10.5 27.5308 10.7107 28.0396 11.0858 28.4147C11.4609 28.7897 11.9696 29.0005 12.5 29.0005H27.5002C27.7654 29.0005 28.0198 28.8951 28.2073 28.7076C28.3948 28.52 28.5002 28.2656 28.5002 28.0004V24.0003" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  ready: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.5671 16.0271C23.7022 16.1021 23.8211 16.2029 23.9172 16.3238C24.0133 16.4447 24.0846 16.5834 24.1271 16.7319C24.1696 16.8804 24.1824 17.0358 24.1648 17.1892C24.1472 17.3427 24.0995 17.4912 24.0245 17.6262L20.7582 23.5051C20.6831 23.6401 20.5822 23.7589 20.4613 23.8549C20.3403 23.9508 20.2016 24.022 20.0531 24.0644C19.7532 24.15 19.4316 24.1129 19.1591 23.9613C19.0241 23.8863 18.9053 23.7854 18.8093 23.6644C18.7134 23.5434 18.6422 23.4048 18.5998 23.2563C18.5143 22.9564 18.5513 22.6348 18.7029 22.3623L21.968 16.4833C22.0431 16.3484 22.144 16.2295 22.2649 16.1335C22.3859 16.0376 22.5246 15.9664 22.6731 15.924C22.8216 15.8817 22.977 15.869 23.1304 15.8866C23.2838 15.9043 23.4322 15.9521 23.5671 16.0271Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5482 19.5854C15.743 19.3421 16.0265 19.1861 16.3362 19.1517C16.646 19.1173 16.9568 19.2073 17.2002 19.4019L20.4665 22.0145C20.5871 22.111 20.6875 22.2304 20.762 22.3657C20.8365 22.501 20.8836 22.6496 20.9006 22.8031C20.9177 22.9566 20.9043 23.112 20.8613 23.2603C20.8183 23.4087 20.7465 23.5471 20.65 23.6677C20.5535 23.7883 20.4341 23.8887 20.2988 23.9632C20.1635 24.0377 20.0149 24.0848 19.8614 24.1018C19.7079 24.1188 19.5525 24.1055 19.4042 24.0624C19.2558 24.0194 19.1174 23.9476 18.9968 23.8511L15.7305 21.2385C15.6098 21.142 15.5094 21.0227 15.4349 20.8874C15.3604 20.7521 15.3133 20.6035 15.2962 20.4499C15.2792 20.2964 15.2926 20.1411 15.3356 19.9927C15.3787 19.8444 15.4517 19.7059 15.5482 19.5854Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.547 12.5776C20.4017 12.4332 20.2051 12.3522 20.0003 12.3522C19.7955 12.3522 19.5989 12.4332 19.4536 12.5776C18.3871 13.6428 16.6799 14.2989 15.1784 14.2237C15.0701 14.2172 14.9616 14.2339 14.8603 14.2726C14.7589 14.3113 14.6669 14.3712 14.5905 14.4482C14.5166 14.5216 14.4584 14.6093 14.4196 14.7059C14.3808 14.8026 14.3621 14.9061 14.3647 15.0103C14.3812 15.8568 14.1684 16.7022 13.8886 17.3971C13.6087 18.0932 13.176 18.8492 12.5776 19.4488C12.4332 19.5942 12.3522 19.7908 12.3522 19.9956C12.3522 20.2004 12.4332 20.397 12.5776 20.5423C13.6275 21.5935 14.3342 23.2478 14.3647 24.7352C14.3679 24.9346 14.4489 25.1249 14.5905 25.2655C14.7255 25.4018 14.9068 25.4824 15.0984 25.4912C15.9274 25.5324 16.7516 25.7769 17.4418 26.0826C18.1331 26.3895 18.8668 26.8363 19.4524 27.423C19.5977 27.5674 19.7943 27.6483 19.9991 27.6483C20.204 27.6483 20.4005 27.5674 20.5459 27.423C21.1326 26.8363 21.8663 26.3895 22.5565 26.0826C23.2478 25.7769 24.0732 25.5324 24.8998 25.4912C25.0914 25.4824 25.2728 25.4018 25.4077 25.2655C25.5497 25.1251 25.6312 24.9348 25.6347 24.7352C25.6652 23.2478 26.3719 21.5935 27.4219 20.5423C27.5662 20.397 27.6472 20.2004 27.6472 19.9956C27.6472 19.7908 27.5662 19.5942 27.4219 19.4488C26.8222 18.8492 26.3907 18.0932 26.1109 17.3971C25.831 16.7022 25.617 15.8568 25.6347 15.0103C25.6372 14.9061 25.6183 14.8024 25.5793 14.7058C25.5403 14.6091 25.4819 14.5215 25.4077 14.4482C25.3315 14.3711 25.2398 14.3112 25.1387 14.2722C25.0375 14.2333 24.9292 14.2164 24.821 14.2225C23.3184 14.2989 21.6111 13.6428 20.547 12.5776ZM12.0143 15.0561C12.032 15.9485 11.5464 17.1549 10.915 17.7851C10.3291 18.3716 10 19.1666 10 19.9956C10 20.8246 10.3291 21.6196 10.915 22.2061C11.5382 22.8269 11.9967 23.9039 12.0143 24.7834C12.0308 25.5618 12.3353 26.3354 12.9291 26.928C13.4769 27.477 14.2098 27.8019 14.9844 27.8393C15.9144 27.8863 17.1326 28.4272 17.791 29.0856C18.3774 29.6711 19.1722 30 20.0009 30C20.8296 30 21.6244 29.6711 22.2108 29.0856C22.8692 28.4272 24.0873 27.8863 25.0174 27.8393C25.792 27.8019 26.5248 27.477 27.0727 26.928C27.6432 26.3583 27.9707 25.5896 27.9862 24.7834C28.0051 23.9039 28.4636 22.8269 29.0856 22.2049C29.6711 21.6185 30 20.8237 30 19.995C30 19.1663 29.6711 18.3715 29.0856 17.7851C28.4554 17.1549 27.9686 15.9485 27.9874 15.0573C27.9963 14.6365 27.9198 14.2183 27.7626 13.8278C27.6053 13.4374 27.3706 13.0829 27.0727 12.7857C26.7638 12.476 26.3932 12.2348 25.985 12.0778C25.5769 11.9208 25.1402 11.8515 24.7034 11.8744C23.8639 11.9168 22.8045 11.5099 22.2108 10.915C21.6243 10.3291 20.8293 10 20.0003 10C19.1713 10 18.3763 10.3291 17.7898 10.915C17.1972 11.5088 16.1367 11.9168 15.2971 11.8744C14.8606 11.8517 14.4242 11.9211 14.0162 12.0781C13.6082 12.2351 13.2378 12.4762 12.9291 12.7857C12.6313 13.0828 12.3967 13.4371 12.2394 13.8273C12.0822 14.2175 12.0057 14.6355 12.0143 15.0561Z" fill="white"/>
</svg>
`,
  pending: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#3B67A3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5859 11.8337C13.5859 11.3473 13.7791 10.8809 14.123 10.5371C14.4669 10.1932 14.9333 10 15.4196 10H24.588C25.0744 10 25.5408 10.1932 25.8847 10.5371C26.2285 10.8809 26.4217 11.3473 26.4217 11.8337V13.539C26.4216 14.2937 26.2352 15.0367 25.879 15.702C25.5229 16.3673 25.0079 16.9345 24.3799 17.353L21.6569 19.1683L24.3799 20.9837C25.0079 21.4022 25.5229 21.9693 25.879 22.6347C26.2352 23.3 26.4216 24.043 26.4217 24.7977V26.503C26.4217 26.9893 26.2285 27.4557 25.8847 27.7996C25.5408 28.1435 25.0744 28.3367 24.588 28.3367H15.4196C14.9333 28.3367 14.4669 28.1435 14.123 27.7996C13.7791 27.4557 13.5859 26.9893 13.5859 26.503V24.7977C13.5859 24.0431 13.7722 23.3002 14.1282 22.6348C14.4842 21.9695 14.999 21.4023 15.6268 20.9837L18.3517 19.1683L15.6287 17.353C15.0005 16.9346 14.4854 16.3675 14.129 15.7021C13.7727 15.0368 13.5861 14.2937 13.5859 13.539V11.8337ZM20.0038 18.0663L23.3631 15.8265C23.7398 15.5754 24.0486 15.2353 24.2623 14.8363C24.476 14.4372 24.5879 13.9916 24.588 13.539V11.8337H15.4196V13.539C15.4198 13.9916 15.5317 14.4372 15.7454 14.8363C15.959 15.2353 16.2679 15.5754 16.6445 15.8265L20.0038 18.0663ZM20.0038 20.2704L16.6445 22.5102C16.2679 22.7613 15.959 23.1014 15.7454 23.5004C15.5317 23.8995 15.4198 24.3451 15.4196 24.7977V26.503H24.588V24.7977C24.5879 24.3451 24.476 23.8995 24.2623 23.5004C24.0486 23.1014 23.7398 22.7613 23.3631 22.5102L20.0038 20.2704Z" fill="white"/>
</svg>
`,
};

const PAGE_LIMIT = 10;
const SLIPS_SCROLL_ID = "hr-slips-scroll";
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
  if (Array.isArray(payload?.slips)) return payload.slips;
  if (Array.isArray(payload?.salaries)) return payload.salaries;
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

const capitalize = (value = "") => {
  const text = String(value).trim();
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const normalizeStatusTone = (value) => {
  const key = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (key === "generated" || key === "ready") return "generated";
  if (key === "pending") return "pending";
  if (key === "paid" || key === "payroll-paid" || key === "payrollpaid") {
    return "payroll-paid";
  }
  return key || "generated";
};

const normalizeSalarySlip = (item = {}, index = 0) => {
  const id = item.id ?? item._id ?? `slip-${index}`;
  const name = getEmployeeName(item);
  const status = item.status || item.slipStatus || "Generated";

  return {
    id,
    slipNumber:
      item.slipNumber ||
      item.slip_number ||
      item.slipNo ||
      item.slip_no ||
      `SLIP-${id}`,
    name,
    initials: getInitials(name),
    avatarBg: AVATAR_COLORS[Number(id || index) % AVATAR_COLORS.length],
    periodStart: formatDateValue(
      item.periodStartDate || item.periodStart || item.startDate
    ),
    periodEnd: formatDateValue(
      item.periodEndDate || item.periodEnd || item.endDate
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

export default function HrSlips() {
  const [slips, setSlips] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [selectedSlipId, setSelectedSlipId] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalSlips: 0,
    netValue: 0,
    readyPayrolls: 0,
    pendingGen: 0,
  });

  const selectedSlip = useMemo(
    () => slips.find((slip) => String(slip.id) === String(selectedSlipId)) || null,
    [slips, selectedSlipId]
  );

  const fetchAnalytics = useCallback(async (isCancelled = () => false) => {
    try {
      setStatsLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.HR_SALARY_ANALYTIC);
      console.log("res salary analytic", res);
      if (isCancelled()) return;

      const summary = res?.data?.data ?? res?.data ?? {};
      setAnalytics({
        totalSlips: Number(
          summary.totalSlips ??
            summary.total ??
            summary.totalCount ??
            summary.slipCount ??
            0
        ),
        netValue: Number(
          summary.netValue ??
            summary.netSalary ??
            summary.totalNetSalary ??
            summary.net ??
            0
        ),
        readyPayrolls: Number(
          summary.readyPayrolls ??
            summary.ready ??
            summary.readyCount ??
            summary.generated ??
            0
        ),
        pendingGen: Number(
          summary.pendingGen ??
            summary.pending ??
            summary.pendingCount ??
            summary.pendingGeneration ??
            0
        ),
      });
    } catch {
      if (!isCancelled()) {
        setAnalytics({
          totalSlips: 0,
          netValue: 0,
          readyPayrolls: 0,
          pendingGen: 0,
        });
      }
    } finally {
      if (!isCancelled()) setStatsLoading(false);
    }
  }, []);

  const fetchSalaryList = useCallback(
    async (pageNum, isCancelled = () => false) => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set("pageId", String(pageNum));
        params.set("limit", String(PAGE_LIMIT));

        const res = await axiosApiCall.get(
          `${API_ROUTER?.HR_SALARY_LIST}?${params.toString()}`
        );
        console.log("res salary list", res);
        if (isCancelled()) return;

        const resData = res?.data ?? {};
        const payload = resData?.data ?? resData;
        const list = extractRows(resData).map(normalizeSalarySlip);

        setSlips((prev) => {
          if (pageNum === 1) return list;
          const existingIds = new Set(prev.map((row) => String(row.id)));
          return [
            ...prev,
            ...list.filter((row) => !existingIds.has(String(row.id))),
          ];
        });

        setHasMore(
          Boolean(resData?.isNextPage ?? payload?.isNextPage ?? false)
        );
      } catch {
        if (!isCancelled() && pageNum === 1) {
          setSlips([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    fetchSalaryList(page, () => cancelled);
    return () => {
      cancelled = true;
    };
  }, [fetchSalaryList, page]);

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
      label: "Total Slips",
      value: analytics.totalSlips,
      icon: STAT_ICONS.total,
    },
    {
      label: "Net Value",
      value: formatCurrency(analytics.netValue),
      icon: STAT_ICONS.net,
    },
    {
      label: "Ready Payrolls",
      value: analytics.readyPayrolls,
      icon: STAT_ICONS.ready,
    },
    {
      label: "Pending Gen",
      value: analytics.pendingGen,
      icon: STAT_ICONS.pending,
    },
  ];

  const handleExportCsv = () => {
    const headers = [
      "Slip Number",
      "Employee",
      "Period Start",
      "Period End",
      "Base Salary",
      "Overtime Amount",
      "Tips",
      "Deductions",
      "Net Salary",
      "Status",
    ];

    const lines = slips.map((slip) =>
      [
        slip.slipNumber,
        slip.name,
        slip.periodStart,
        slip.periodEnd,
        slip.baseSalary,
        slip.overtimeAmount,
        slip.tips,
        slip.deductions,
        slip.netSalary,
        slip.status,
      ].join(",")
    );

    const blob = new Blob([[headers.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "salary-slips.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = (slip) => {
    if (!slip) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return;

    const period = `${slip.periodStart} -> ${slip.periodEnd}`;
    const deductionValue = `-${formatCurrency(slip.deductions)}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${slip.slipNumber}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 16mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #f8fafc;
              color: #295086;
            }
            .sheet {
              width: 100%;
              max-width: 760px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 18px;
              padding: 28px 28px 24px;
            }
            .title {
              text-align: center;
              font-size: 22px;
              font-weight: 700;
              margin: 0 0 22px;
            }
            .summary {
              background: #f0f7ff;
              border-radius: 14px;
              padding: 18px 20px;
              margin-bottom: 26px;
            }
            .summary-row,
            .detail-row,
            .total-row {
              display: flex;
              justify-content: space-between;
              gap: 16px;
            }
            .summary-row + .summary-row,
            .detail-row + .detail-row {
              margin-top: 16px;
            }
            .label {
              font-size: 14px;
              font-weight: 500;
            }
            .value {
              font-size: 14px;
              font-weight: 700;
              text-align: right;
            }
            .details {
              margin-bottom: 24px;
            }
            .detail-row {
              padding: 8px 0;
            }
            .detail-row.deduction .label,
            .detail-row.deduction .value {
              color: #e32c1f;
            }
            .divider {
              border-top: 1px solid #e2e8f0;
              margin: 18px 0 18px;
            }
            .total-row .label,
            .total-row .value {
              font-size: 18px;
              font-weight: 700;
            }
            .footer {
              margin-top: 18px;
              font-size: 11px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <h1 class="title">Salary Slip</h1>
            <div class="summary">
              <div class="summary-row">
                <span class="label">Slip #</span>
                <span class="value">${slip.slipNumber || "-"}</span>
              </div>
              <div class="summary-row">
                <span class="label">Employee Name</span>
                <span class="value">${slip.name || "-"}</span>
              </div>
              <div class="summary-row">
                <span class="label">Period</span>
                <span class="value">${period}</span>
              </div>
            </div>
            <div class="details">
              <div class="detail-row">
                <span class="label">Base Salary</span>
                <span class="value">${formatCurrency(slip.baseSalary)}</span>
              </div>
              <div class="detail-row">
                <span class="label">Overtime</span>
                <span class="value">${formatCurrency(slip.overtimeAmount)}</span>
              </div>
              <div class="detail-row">
                <span class="label">Tips</span>
                <span class="value">${formatCurrency(slip.tips)}</span>
              </div>
              <div class="detail-row deduction">
                <span class="label">Deductions</span>
                <span class="value">${deductionValue}</span>
              </div>
            </div>
            <div class="divider"></div>
            <div class="total-row">
              <span class="label">Net Salary</span>
              <span class="value">${formatCurrency(slip.netSalary)}</span>
            </div>
            <div class="footer">Generated on ${new Date().toLocaleDateString("en-US")}</div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  const renderTableBody = () => {
    if (loading && page === 1 && !slips.length) {
      return Array.from({ length: 6 }).map((_, index) => (
        <tr key={`slip-skeleton-${index}`}>
          {Array.from({ length: 10 }).map((__, colIndex) => (
            <td key={colIndex}>
              <Skeleton width={colIndex === 1 ? 140 : 70} height={16} />
            </td>
          ))}
        </tr>
      ));
    }

    if (!slips.length) {
      return (
        <tr>
          <td colSpan={10} style={{ textAlign: "center", color: "#8391A1" }}>
            No salary slips found.
          </td>
        </tr>
      );
    }

    return slips.map((slip) => (
      <tr key={slip.id}>
        <td>{slip.slipNumber}</td>
        <td>
          <HrNameCell>
            <HrAvatar $bg={slip.avatarBg}>{slip.initials}</HrAvatar>
            {slip.name}
          </HrNameCell>
        </td>
        <td>
          {slip.periodStart} {"->"} {slip.periodEnd}
        </td>
        <td>{formatCurrency(slip.baseSalary)}</td>
        <td>{formatCurrency(slip.overtimeAmount)}</td>
        <td>{formatCurrency(slip.tips)}</td>
        <td style={{ color: "#E86D4D", fontWeight: 400 }}>
          -{formatCurrency(slip.deductions)}
        </td>
        <td style={{ fontWeight: 700, color: "#295086" }}>
          {formatCurrency(slip.netSalary)}
        </td>
        <td>
          <HrPill $tone={slip.statusTone}>{slip.status}</HrPill>
        </td>
        <td>
          <HrActionButtons>
            <button
              type="button"
              aria-label={`View slip for ${slip.name}`}
              onClick={() => setSelectedSlipId(slip.id)}
            >
              <InlineSVG src={VIEW_ICON} />
            </button>
            <button
              type="button"
              aria-label={`Print slip for ${slip.name}`}
              onClick={() => handlePrint(slip)}
            >
              <InlineSVG src={PRINT_ICON} />
            </button>
          </HrActionButtons>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <HrPageHeader $inline $banded>
        <HrPageTitleBlock $inline>
          <h1>Salary Slips</h1>
          <p>Generate and export salary slips</p>
        </HrPageTitleBlock>
        <HrHeaderActions>
          <HrHeaderOutlineButton type="button" onClick={handleExportCsv}>
            <span>Export CSV</span>
            <InlineSVG src={EXPORT_ICON} />
          </HrHeaderOutlineButton>
          {/* <HrPrimaryButton type="button">
            <InlineSVG src={GENERATE_ICON} />
            Generate Slips
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
          id={SLIPS_SCROLL_ID}
          style={{ maxHeight: "60vh", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={slips.length}
            next={loadMore}
            hasMore={hasMore}
            scrollableTarget={SLIPS_SCROLL_ID}
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
                  <th>Slip Number</th>
                  <th>Employee</th>
                  <th>Period</th>
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

      <SalarySlipModal
        open={Boolean(selectedSlip)}
        slip={selectedSlip}
        onClose={() => setSelectedSlipId(null)}
      />
    </>
  );
}

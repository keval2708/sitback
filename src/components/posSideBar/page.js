/* eslint-disable no-dupe-keys */
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToaster } from "@/hooks";
import { handlePosRedirect } from "@/redux/messageTab";
import { PATH_DASHBOARD, PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  PosSideBarLayoutWrapper,
} from '@/styles/pages/possidebar.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


export default function PosSideBar() {

  const { toaster } = useToaster();
  const pathname = usePathname();
  const [posRedirect, setPosRedirect] = useState(0);
  const dispatch = useDispatch();
  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res
      } else {
        setPosRedirect(res?.data?.postproductlength)
        dispatch(handlePosRedirect(res?.data?.postproductlength))
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <PosSideBarLayoutWrapper>
      <div>
        <Link className="sitback-logo-wrapper" href={PATH_DASHBOARD?.profileService}> <img alt="sitback" src="/images/logosidebar.svg" /></Link>
      </div>
      <ul>
        <li
          className={pathname == PATH_POS.list ? "active" : ''}
          onClick={() => getProfileInfo()}>
          <Link href={posRedirect > 0 ? PATH_POS?.list : PATH_POS.pos}>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 40"><path fill="currantColor" d="M13.27 37.547V31.43a2.837 2.837 0 0 1 2.847-2.826h5.748c.755 0 1.48.297 2.014.828.534.53.833 1.249.833 1.998v6.116a2.427 2.427 0 0 0 .713 1.733c.46.461 1.087.72 1.74.72h3.923a6.92 6.92 0 0 0 4.886-1.998A6.819 6.819 0 0 0 38 33.156V15.734a4.946 4.946 0 0 0-1.79-3.805L22.867 1.352a6.195 6.195 0 0 0-7.897.142L1.934 11.929A4.948 4.948 0 0 0 0 15.734v17.404C0 36.928 3.095 40 6.912 40h3.833a2.462 2.462 0 0 0 2.47-2.435l.055-.018Z" /></svg>
            </i>
          </Link>
        </li>
        <li
          className={pathname == PATH_POS.pos || pathname == PATH_POS.add ? "active" : ''}
        >
          <Link href={PATH_POS?.add}>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 42"><path fill="currantColor" d="M48 17.2v.762c-.039.134-.078.27-.114.405-1.827 6.754-3.641 13.511-5.484 20.262-.584 2.139-2.2 3.364-4.387 3.367-9.348.01-18.695.008-28.043 0-2.216-.001-3.863-1.275-4.447-3.43A6340.804 6340.804 0 0 1 .114 18.482c-.108-.4-.15-.857-.078-1.261.2-1.115 1.079-1.758 2.33-1.76 3.236-.007 6.47-.011 9.706.007.393.003.617-.12.83-.447 3.02-4.599 6.044-9.195 9.094-13.772.282-.424.709-.831 1.16-1.042 1.052-.49 2.09-.084 2.783.966a7167.71 7167.71 0 0 1 9.16 13.9c.186.283.378.395.716.393 3.205-.014 6.41-.01 9.614-.004.325 0 .66.015.974.092.858.211 1.29.874 1.597 1.648ZM23.984 5.719l-6.525 9.7h13.05c-2.186-3.249-4.33-6.435-6.525-9.7Zm4.355 23.01c.007-2.425-1.948-4.41-4.35-4.415-2.4-.003-4.354 1.97-4.36 4.405-.007 2.412 1.966 4.421 4.35 4.43 2.373.01 4.352-1.997 4.36-4.42Z" /></svg>
            </i>
          </Link>
        </li>
      </ul>
    </PosSideBarLayoutWrapper>
  );
}

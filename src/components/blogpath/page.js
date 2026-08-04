"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { authCheckSliceSelector, handleHideBlog, handleLoginTab } from "@/redux/authCheck";
import { PATH_AUTH } from "@/routes/paths";
import { Button } from "@/styles/global/main.style";

export default function BlogPath() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { hideBlog } = useSelector(authCheckSliceSelector);

  const handleClose = () => dispatch(handleHideBlog(false));
  // const [show, setShow] = useState(false);

  const handleRedirect = (key) => {
    // handleLoginTab
    dispatch(handleLoginTab(key));
    push(PATH_AUTH?.signIn);
  };
  return (
    <Offcanvas show={hideBlog} onHide={handleClose} className="blog-mobile-menu">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="login-header-wrapper">
          <Link href={PATH_AUTH?.blog} className="">
            Blogs
          </Link>
          <Button onClick={() => handleRedirect("first")}>{t("comingSoonTextLogin")}</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

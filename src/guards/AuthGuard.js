"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { PATH_AUTH } from "@/routes/paths";
import { checkLogin } from "@/utils/helper";
// import { decodeData } from "@/utils/jwt";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {

  const { id } = checkLogin();

  const { replace } = useRouter();

  useEffect(() => {

  }, [id]);

  if (!id) {
    return replace(PATH_AUTH?.signIn);
  }

  return (
    <>
      {children}
    </>
  )
}

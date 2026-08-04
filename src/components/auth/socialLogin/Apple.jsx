import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import AppleLogin from 'react-apple-login'
import InlineSVG from "svg-inline-react";
import {UpdatedAppleIcon_icon } from "@/styles/svgs";

const Apple = ({
  setAppleData,
  loginType,
}) => {

  const callback = (response) => {
    if(response?.authorization?.id_token) {
    const user = jwtDecode(response?.authorization?.id_token);
    // setAppleData(user);
    setAppleData({ ...user, loginType: loginType });
    // setAppleData({
    //   email: "milan.joshi@logisticinfotech.co.in",
    //   sub: "000158.e64dcdd035ab4f6d9fd0b4a259139ef0.0629",
    // });
    }
  }

  return (
    <AppleLogin
      clientId="sitback-fe-dev.dryrun.click"
      // redirectURI="https://sitback-fe-dev.dryrun.click"
      redirectURI={process.env.APPLE_REDIRECT_URL}
      usePopup={true}
      callback={(e) => callback(e)} // Catch the response
      scope="email name"
      responseMode="query"
      render={renderProps => (  //Custom Apple Sign in Button
        <Link href="" className="" onClick={renderProps.onClick}>
          <InlineSVG
            src={UpdatedAppleIcon_icon}
            className="global_laguage_icon"
          />
        </Link>
        // <button
        //   onClick={renderProps.onClick}
        //   style={{
        //     backgroundColor: "white",
        //     padding: 10,
        //     border: "1px solid black",
        //     fontFamily: "none",
        //     lineHeight: "25px",
        //     fontSize: "25px"
        //   }}
        // >
        //   <i className="fa-brands fa-apple px-2 "></i>
        // </button>
      )}
    />
  );
};

export default Apple;

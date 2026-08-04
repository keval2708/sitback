"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleLoginTab } from "@/redux/authCheck";
import { PATH_AUTH } from "@/routes/paths";
import {
  Button,
  Image,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutUpdatedWrapper,
} from '@/styles/pages/signup.style';


export default function SignUp() {

  // Hooks
  const { push } = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

   const handleRedirect = (key) => {
     // handleLoginTab
     dispatch(handleLoginTab(key));
     push(PATH_AUTH?.signIn);
   }

  return (
    <>
      {/* <LoginLayoutWrapper>
      <div className="right-top-img-div">
        <Image alt="sitback" src="/images/right-top-img-1.svg" />
      </div>
      <div className="right-top-img-div left-top-img-div">
        <Image alt="sitback" src="/images/right-top-img-1.svg" />
      </div>
      <Container>
        <LoginFormWrapper>
          <div className="login-detail-text-wrapper reset-password-successfully">
            <div className="mark-successfully-icon">
              <Image alt="sitback" src="/images/mark-icon-green.svg" />
            </div>
            <LoginTextTitle>{t('passTitle')}</LoginTextTitle>
            <p>{t('passText')}</p>
            <Button
              type="submit"
              isBorderBtn={false}
              onClick={() => push(PATH_AUTH?.logIn)}
            >
              {t('backText')}
            </Button>
          </div>
        </LoginFormWrapper>
      </Container>
      <div className="right-top-img-div right-button-img-div">
        <Image alt="sitback" src="/images/right-top-img-1.svg" />
      </div>
      </LoginLayoutWrapper> */}
      <LoginLayoutUpdatedWrapper className="sitback-updated-signup-display-div">
      <section className="login-main-wrapper">
        <div className="login-inner-div">
          <div className="login-left-div">
            <div className="login-left-image-div">
              <Image alt="sitback" src="/images/login-left-image.png" />
              <div className="login-above-image-div">
                <Link href="/" className="login-logo-div">
                  <Image alt="sitback" src="/images/sitback-login-logo.svg" />
                </Link>
              </div>
            </div>
          </div>
          <div className="login-right-div">
            <LoginFormWrapper className="login-updated-form-wrapper">
              <div className="login-detail-text-wrapper reset-password-successfully">
                <div className="mark-successfully-icon">
                  <Image alt="sitback" src="/images/checkmark-login-icon.svg" />
                </div>
                <h2 className="login-title-text lower-bottom-spacing">{t('passTitle')}</h2>
                <p className="para-login-text reset-pw-text">{t('passText')}</p>
                <Button
                  type="submit"
                  isBorderBtn={false}
                  onClick={() => handleRedirect("first")}
                  className="reset-btn-wrapper"
                >
                  {t('backText')}
                </Button>
              </div>
            </LoginFormWrapper>
          </div>
        </div>
      </section>
      </LoginLayoutUpdatedWrapper>
    </>
  )
}

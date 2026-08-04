"use client";

import Link from "next/link";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PATH_AUTH } from "@/routes/paths";
import { FooterBarWrapper, Image, } from "@/styles/global/main.style";

export default function HomeFooter() {
  const { t } = useTranslation();

  return (
      <FooterBarWrapper className="sitback-footer-updated-wrapper">
        <Container>
          {/* <div className="main-footerbar">
            <div>
              <Link href="/" className="logo-wrapper">
                <Image isContainImg={true} alt="sitback" src="/images/sitback-v3.svg" />
              </Link>
            </div>
            <div className="nav-link-footer">
              <ul>
                <li>
                  <Link href
                  ="/" className="">Contact us</Link>
                </li>
                <li>
                  <Link href={PATH_AUTH?.aboutUs} className="">{t("footerPageText1")}</Link>
                </li>
                <li>
                  <Link href={PATH_AUTH?.contactUs} className="">{t("footerPageText2")}</Link>
                </li>
                <li>
                  <Link href={PATH_AUTH?.termsAndConditions} className="">{t("footerPageText3")}</Link>
                </li>
                <li>
                  <Link  href={PATH_AUTH?.privacyPolicy} className="">{t("footerPageText4")}</Link>
                </li>

              </ul>
            </div>
          </div>
          <p className="footer-text-sitback">{t("footerPageText5")}</p>
          <div className="sub-footerbar">
            <p>{t("comingSoonTitle13")} {new Date().getFullYear()}</p>
          </div> */}
          <div className="sitback-footer-inner-div">
              <Link href="/" className="logo-wrapper">
                <Image isContainImg={true} alt="sitback" src="/images/sitback-footer-white-logo.svg" />
              </Link>
              <div className="footer-btn-div">
                <ul>
                  <li>
                     <Link href={PATH_AUTH?.aboutUs} className="">{t("footerPageText1")}</Link>

                  </li>
                  <li>
                    <Link href={PATH_AUTH?.contactUs} className="">{t("footerPageText2")}</Link>
                  </li>
                  <li>
                    <Link href={PATH_AUTH?.termsAndConditions} className="">{t("footerPageText3")}</Link>
                  </li>
                  <li>
                    <Link  href={PATH_AUTH?.privacyPolicy} className="">{t("footerPageText4")}</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-para-text-div">
                <p>
                  {t("footerPageText5")}
                </p>
              </div>
              <div className="footer-social-login">
                <ul>
                  <li>
                    <Link target="_blank" href="https://www.facebook.com/profile.php?id=61554020515895">
                      <Image isContainImg={true} alt="sitback" src="/images/footer-social-1.svg" />
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/">
                      <Image isContainImg={true} alt="sitback" src="/images/footer-social-2.svg" />
                    </Link>
                  </li> */}
                  <li>
                    <Link target="_blank" href="https://www.linkedin.com/company/sitback-io">
                      <Image isContainImg={true} alt="sitback" src="/images/footer-social-3.svg" />
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" href="https://www.instagram.com/getsitback/">
                      <Image isContainImg={true} alt="sitback" src="/images/footer-social-4.svg" />
                    </Link>
                  </li>
                </ul>
              </div>
          </div>
        </Container>
        <div className="copy-right-footer-div">
          <p>{t('comingSoonTitle13')} {new Date().getFullYear()}</p>
        </div>
      </FooterBarWrapper>
  );
}

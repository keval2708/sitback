"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Container, Modal, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PATH_AUTH } from "@/routes/paths";
import {
  Button,
  Image,
  LoginTextTitle,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutWrapper,
} from '@/styles/pages/signup.style';

export default function Login() {
  // state
  const [lgShow, setLgShow] = useState(false);
  const { push } = useRouter();

  // hooks
  const { t } = useTranslation();

  return (
    <>
      <LoginLayoutWrapper>
        <div className="right-top-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <div className="right-top-img-div left-top-img-div">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
        <Container>
          <LoginFormWrapper>
            <Link href='/' className="sitback-logo-wrapper">
              <img alt="sitback" src="/images/sitback-logo.svg" />
            </Link>
            <div className="login-btn">
              <Button className="mb-4" isBorderBtn={true} onClick={() => setLgShow(true)}>{t('bookAppointment')}</Button>
              <Button onClick={() => { push(PATH_AUTH?.signIn) }}>{t('serviceProvider')}</Button>
            </div>
          </LoginFormWrapper>
        </Container>
        <div className="right-top-img-div right-button-img-div center-bottom-img">
          <Image alt="sitback" src="/images/right-top-img-1.svg" />
        </div>
      </LoginLayoutWrapper>
      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon"></Modal.Header>
        <Modal.Body>
          <div className='app-store-wrapper'>
            <LoginTextTitle>{t('loginModelText')}</LoginTextTitle>
            <div className='app-store-btns-wrapper'>
               <Link href="javascript:void(0)" className="app-store-btn"  onClick={() => window.location = 'https://apps.apple.com/us/app/id6475679969'}>
                <Image isContainImg={true} alt="sitback" src="/images/app-store.svg" />
              </Link>
              <Link href="javascript:void(0)" className="app-store-btn" onClick={() => window.location = 'https://play.google.com/store/apps/details?id=com.truvyn.sitback'}>
                <Image isContainImg={true} alt="sitback" src="/images/google-play.svg" />
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

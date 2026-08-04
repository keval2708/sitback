'use client'

import { getMessaging, onMessage } from 'firebase/messaging';
import { useRouter, useServerInsertedHTML } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CookiesProvider } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import "@/utils/i18n/i18n";
import { chatHandle, dtabHandle, handleProfileTab, messageTabHandle } from '@/redux/messageTab';
import { NEW_DASHBOARD_PATH, PATH_DASHBOARD } from '@/routes/paths';
import { theme } from '@/styles/global/theme'
import firebaseApp from '@/utils/firebase/firebase';

export default function StyledComponentsRegistry({ children }) {
  const { push } = useRouter();
  const dispatch = useDispatch();


  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        const notification = new Notification(payload.notification.title, {
          body: payload.notification.body,
        });


        notification.onclick = () => {
          if (payload.data?.type === 'NewChatFromUser') {
            // dispatch(chatHandle({ ...payload?.data, usernameID: payload?.data?.fromUserId }));
            // push(PATH_DASHBOARD?.insights);

              dispatch(dtabHandle("deighth"));
              dispatch(messageTabHandle("second"));
              dispatch(chatHandle({ ...payload?.data, usernameID: payload?.data?.fromUserId }));
              push(NEW_DASHBOARD_PATH?.dashboard)

          } else if (payload.data?.type === 'AdminToSpa') {
            push(PATH_DASHBOARD?.insights);
          }
          else if (payload.data?.type === "NewReviewFromUser") {
            dispatch(handleProfileTab('third'))
            // push(PATH_DASHBOARD?.profileService);
            push(NEW_DASHBOARD_PATH?.profile)
          }
          else if (payload.data?.type === 'Bookcancelbyuser') {
            push(PATH_DASHBOARD?.appointments);
          }
          else if (payload.data?.type === 'Bookappointmentbyuser') {
            // push(PATH_DASHBOARD?.appointments);
            dispatch(dtabHandle("dfirst"));
            push(NEW_DASHBOARD_PATH?.dashboard)
          }
           else if (payload.data?.type === "newAppointmentRequestReceived") {
            // push(PATH_DASHBOARD?.appointments);
            dispatch(dtabHandle("dfirst"));
            push(NEW_DASHBOARD_PATH?.dashboard)
          }
          else {
            window.open(payload.notification.click_action, '_blank');
          }
        };
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </StyleSheetManager>
    </CookiesProvider>
  )
}

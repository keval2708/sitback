import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import { Providers } from "../redux/provider";
import { GlobalStyle } from "../styles/global/global.style";
import "rc-time-picker/assets/index.css";
import ClientScript from "@/components/clientscript";
import ToastWrapper from "@/components/ToastContainer";
import "bootstrap/dist/css/bootstrap.css";
import "react-phone-input-2/lib/style.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata = {
  title: "Sitback - Service Provider",
  description: "Sitback and relax",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {process.env.SERVER_TYPE != "production" && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <link rel="icon" href="/images/sitback.png" />
        {/* <link href="/font-family/stylesheet.css" rel="stylesheet"></link> */}

      </head>
      <body suppressHydrationWarning={true}>
        {/* Google Tag Manager Script */}
        {process.env.SERVER_TYPE == "production" && (
          <>
            <Script
              id="google-tag-manager"
              strategy="afterInteractive" // Ensures the script runs after page load
              src={`https://www.googletagmanager.com/gtag/js?id=G-SJH357ME1E`}
            />
            <Script
              id="gtm-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-SJH357ME1E');`,
              }}
            />

            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-PT5WRW99');
                `,
              }}
            />

            <Script
              id="fb-pixel-script"
              dangerouslySetInnerHTML={{
                __html: `
                   !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '1971462947011854');
                    fbq('track', 'PageView');
                `,
              }}
            />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id='1971462947011854'&ev=PageView&noscript=1"
              alt=""  // Empty alt text for decorative image
            />
          </noscript>
          {/* Add the ClientScript component */}
            <ClientScript />
          </>
        )}


        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        {/* <Script src="/chatbot.js" strategy="afterInteractive" /> */}

        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <Providers>
            <StyledComponentsRegistry>
              <GlobalStyle />
              <ToastWrapper />
              {children}
            </StyledComponentsRegistry>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

"use client";

import { useEffect } from "react";

const ClientScript = () => {
  useEffect(() => {
    // 1. Load the cntrUpTag script
    const upScript = document.createElement("script");
    upScript.src = "https://cdn01.basis.net/assets/up.js?um=1";
    upScript.async = true;

    upScript.onload = () => {
      if (window.cntrUpTag) {
        window.cntrUpTag.track("cntrData", "7f043b775c2d734d");

        // 2. Load MNTN Tracking Pixel only after cntrUpTag is ready
        const mntnScript = document.createElement("script");
        mntnScript.type = "text/javascript";
        mntnScript.innerHTML = `
          (function() {

            "use strict";
            var e = null, n = "46044", additional = "", t, r, i;
            try {
              t = top.document.referer !== "" ? encodeURIComponent(top.document.referrer.substring(0, 2048)) : "";
            } catch(o) {
              t = document.referrer !== null ? document.referrer.toString().substring(0, 2048) : "";
            }
            try {
              i = parent.location.href !== "" ? encodeURIComponent(parent.location.href.toString().substring(0, 2048)) : "";
            } catch(a) {
              try {
                i = i !== null ? encodeURIComponent(i.toString().substring(0, 2048)) : "";
              } catch(f) {
                i = "";
              }
            }
            var l, c = document.createElement("script"), h = null, p = document.getElementsByTagName("script"), d = Number(p.length) - 1, v = document.getElementsByTagName("script")[d];

            if (typeof l === "undefined") { l = Math.floor(Math.random() * 1e17) }
            h = "https://dx.mountain.com/spx?" + "shaid=" + n + "&tdr=" + t + "&plh=" + i + "&cb=" + l + additional;
            c.type = "text/javascript";
            c.src = h;
            v.parentNode.insertBefore(c, v);
          })();
        `;
        document.body.appendChild(mntnScript);
      } else {
        // console.error("cntrUpTag is not defined.");
      }
    };

    document.body.appendChild(upScript);

    return () => {
      document.body.removeChild(upScript);
    };
  }, []);

  return null;
};

export default ClientScript;

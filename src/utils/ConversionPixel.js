export const conversationPixel = () => {
   if (process.env.SERVER_TYPE === "production") {

    const upScript = document.createElement("script");
    upScript.src = "https://cdn01.basis.net/assets/up.js?um=1";
    upScript.async = true;

    upScript.onload = () => {
      if (window.cntrUpTag) {
        window.cntrUpTag.track("cntrData", "2078351cabdccba2");

        // 2. Load MNTN Tracking Pixel only after cntrUpTag is ready
        const mntnScript = document.createElement("script");
        mntnScript.type = "text/javascript";
        mntnScript.innerHTML = `
        (function() {
          var x = null, p, q, m,
              o = "46044",
              conversion_type = "Lead",
              order_id = "ORDER ID",
              order_amt = "ORDER AMOUNT",
              b = "", c = "", k = "", g = "", j = "", u = "";

          try {
            p = top.document.referer !== "" ? encodeURIComponent(top.document.referrer.substring(0, 2048)) : "";
          } catch(n) {
            p = document.referrer !== null ? document.referrer.toString().substring(0, 2048) : "";
          }

          try {
            m = parent.location.href !== "" ? encodeURIComponent(parent.location.href.toString().substring(0, 2048)) : "";
          } catch(z) {
            try {
              m !== null ? encodeURIComponent(i.toString().substring(0, 2048)) : "";
            } catch(h) {
              m = "";
            }
          }

          var A, y = document.createElement("script"), w = null,
              v = document.getElementsByTagName("script"),
              t = Number(v.length) - 1,
              r = document.getElementsByTagName("script")[t];

          if (typeof A === "undefined") {
            A = Math.floor(Math.random() * 1e17);
          }

          w = "https://dx.mountain.com/spx?conv=1" + "&shaid=" + o + "&tdr=" + p + "&plh=" + m + "&cb=" + A + "&shoid=" + order_id + "&shoamt=" + order_amt + "&type=" + conversion_type + "&shocur=" + c + "&shopid=" + k + "&shoq=" + g + "&shoup=" + j + "&shpil=" + u + b;
          y.type = "text/javascript";
          y.src = w;
          r.parentNode.insertBefore(y, r);
        })();
      `;

        document.body.appendChild(mntnScript);
      }
    };

    document.body.appendChild(upScript);
  }

  }

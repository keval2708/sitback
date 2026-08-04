(function () {
  if (document.getElementById("chatbot-icon")) return;
  var CHATBOT_URL = "https://ai-chatbot.sitback.io/";
  // var CHATBOT_URL = "http://192.168.0.190:3000";

  var chatIcon = document.createElement("div");
  chatIcon.id = "chatbot-icon";
  chatIcon.style.position = "fixed";
  chatIcon.style.bottom = "20px";
  chatIcon.style.right = "20px";
  chatIcon.style.padding = "13px 18px";
  chatIcon.style.borderRadius = "50px";
  chatIcon.style.background = "#7ACBD6";
  chatIcon.style.display = "flex";
  chatIcon.style.alignItems = "center";
  chatIcon.style.justifyContent = "center";
  chatIcon.style.cursor = "pointer";
  chatIcon.style.zIndex = "9999";
  chatIcon.style.color = "#fff";
  chatIcon.style.fontSize = "16px";
  chatIcon.style.fontWeight = "500";
  chatIcon.style.fontFamily = "sans-serif";
  chatIcon.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  chatIcon.style.transition = "all 0.3s ease";
  chatIcon.innerText = "Sitback Agent";
  document.body.appendChild(chatIcon);

  var chatFrame = document.createElement("iframe");
  chatFrame.id = "chatbot-frame";
  chatFrame.src = CHATBOT_URL;
  chatFrame.style.position = "fixed";
  chatFrame.style.overflow = "hidden";
  chatFrame.style.border = "1px solid #ccc";
  chatFrame.style.borderRadius = "10px";
  chatFrame.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  chatFrame.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  chatFrame.style.display = "none";
  chatFrame.style.zIndex = "9999";
  document.body.appendChild(chatFrame);

  var isOpen = false;

  if (!sessionStorage.getItem("chatbot_session")) {
    sessionStorage.setItem("chatbot_session", "active");
    localStorage.removeItem("chatbot_seen");
  }

  var hasSeenChatbot = localStorage.getItem("chatbot_seen");
  var currentURL = window.location.href;
  var isDashboardPage = currentURL.match(/\/dashboard(\/.*)?$/) || currentURL.match(/\/profile(\/.*)?$/) || currentURL.match(/\/subscriptions(\/.*)?$/) || currentURL.match(/\/notifications(\/.*)?$/);

  if (!hasSeenChatbot && !isDashboardPage) {
    localStorage.setItem("chatbot_seen", "true");

    setTimeout(function () {
      chatFrame.style.display = "block";
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          chatFrame.style.transform = "translateY(0) scale(1)";
        });
      });

      chatIcon.innerHTML = "";
      chatIcon.style.background = "#004D87";
      var closeImg = document.createElement("img");
      closeImg.src = "/images/icon_cancel.svg";
      closeImg.alt = "close";
      closeImg.style.width = "24px";
      closeImg.style.height = "24px";
      chatIcon.appendChild(closeImg);

      isOpen = true;
    }, 2500);
  }

  function setChatFrameSize() {
    var width = window.innerWidth;

    if (width <= 480) {
      chatFrame.style.width = "100%";
      chatFrame.style.right = "0";
      chatFrame.style.bottom = "80px";
      chatFrame.style.borderRadius = "0";
    } else if (width <= 1024) {
      chatFrame.style.width = "80%";
      chatFrame.style.right = "10%";
      chatFrame.style.bottom = "80px";
      chatFrame.style.borderRadius = "10px";
    } else {
      chatFrame.style.width = "420px";
      chatFrame.style.right = "20px";
      chatFrame.style.bottom = "80px";
      chatFrame.style.borderRadius = "12px";
    }
  }

  setChatFrameSize();
  window.addEventListener("resize", setChatFrameSize);

  chatIcon.addEventListener("click", function () {
    if (!isOpen) {
      chatFrame.style.display = "block";
      document.body.style.overflow = "hidden";

      chatIcon.innerHTML = "";
      chatIcon.style.background = "#004D87";
      var closeImg = document.createElement("img");
      closeImg.src = "/images/icon_cancel.svg";
      closeImg.alt = "close";
      closeImg.style.width = "24px";
      closeImg.style.height = "24px";
      chatIcon.appendChild(closeImg);
    } else {
      chatFrame.style.display = "none";
      document.body.style.overflow = "";

      chatIcon.innerHTML = "Sitback Agent";
      chatIcon.style.background = "#95CCD5";

      chatFrame.contentWindow.postMessage({ type: "go-home" }, "*");
    }
    isOpen = !isOpen;
  });

  window.addEventListener("message", function (event) {
    if (!event.source || !chatFrame || event.source !== chatFrame.contentWindow) {
      return;
    }

    if (!event.data || !event.data.type) {
      return;
    }

    if (event.data.type === "resize") {
      var width = window.innerWidth;
      var height = window.innerHeight;
      let requestedHeight = event.data.height;

      const maxAllowedHeight = height - 100;

      if (event.data.page === "chat" && width > 1024) {
        const finalHeight = Math.min(800, maxAllowedHeight);
        chatFrame.style.height = finalHeight + "px";
      } else {
        const finalHeight = Math.min(requestedHeight, maxAllowedHeight);
        chatFrame.style.height = finalHeight + "px";
      }
    }
    if (event.data.type === "close-chatbot") {
      if (chatFrame && chatIcon) {
        chatFrame.style.display = "none";
        chatIcon.innerHTML = "Sitback Agent";
        chatIcon.style.background = "#7ACBD6";
        isOpen = false;
      }
    }
  });
})();

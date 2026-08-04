// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {

  apiKey: "AIzaSyAVZVAFsUJGV3ypbSWgXTbJup1RvzYrz-8",
  authDomain: "sitback-b586c.firebaseapp.com",
  projectId: "sitback-b586c",
  storageBucket: "sitback-b586c.appspot.com",
  messagingSenderId: "581460748314",
  appId: "1:581460748314:web:55fd2d19cc0692f072c9a3",
  measurementId: "G-SJH357ME1E"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('payload', payload)
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import firebaseApp from '@/utils/firebase/firebase';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);


          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BHwC9bsXeJ0CqttYhFfpgufMDkrcG6rtCMVhGG9Ayk8jpaLXsQMdqH5h-E1HtNEQqzOB_lc-uh7MwIvb5OwrmxY',
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              // console.log(
              //   'No registration token available. Request permission to generate one.'
              // );
            }
          }
        }
      } catch (error) {
        // console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;

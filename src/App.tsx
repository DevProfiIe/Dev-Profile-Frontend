/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

/* Pages */
import Home from '~/pages/home/Home';
import SignIn from '~/pages/signIn/SignIn';
import Resume from '~/pages/resume/Resume';
import Gallary from './pages/gallary/Gallary';
import User from './pages/user/User';

/* Components */
import PrivateRoute from '~/components/utils/PrivateRoute';
import Layout from '~/pages/layout/Layout';
import AuthCallback from '~/components/utils/AuthCallback';

/* Styles */
import resetStyle from '~/styles/reset';
import { useEffect, useState } from 'react';
import { usePostSubscribeSerberMutation } from './redux/api';
import { getCookie } from './utils/cookie';
import { UserGithubInfo } from './redux/api/types';

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: 'dev-profile-251ff.firebaseapp.com',
  projectId: 'dev-profile-251ff',
  storageBucket: 'dev-profile-251ff.appspot.com',
  messagingSenderId: '719328905080',
  appId: '1:719328905080:web:bd2b2d550036d99ceb6a8d',
  measurementId: 'G-P22S2F7S83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const App: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);
  const [subscribeFunc, { isSuccess }] = usePostSubscribeSerberMutation();

  async function requestPermission() {
    console.log('권한 요청 중...');

    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
      console.log('알림 권한 허용 안됨');
      return;
    }

    console.log('알림 권한이 허용됨');

    const token = await getToken(messaging, {
      vapidKey: `${import.meta.env.VITE_VAPID_KEY}`,
    });

    if (token) {
      subscribeFunc({
        token: token,
        username: userInfo.login,
      });

      if (isSuccess) {
        console.log('구독 성공');
      }
    } else {
      console.log('Can not get Token');
    }

    onMessage(messaging, (payload) => {
      console.log(payload.notification?.title);
      console.log(payload.notification?.body);
    });
  }

  useEffect(() => {
    if (token) {
      const storageData = localStorage.getItem('userInfo');

      if (storageData) {
        setUserInfo(JSON.parse(storageData));
      }

      requestPermission();
    }
  }, []);

  return (
    <>
      <Global styles={resetStyle} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='resume/:keyword' element={<Resume />} />
          <Route path='mypage' element={<User />} />
          <Route path='gallary' element={<Gallary />} />
          {/* Private Route */}
          <Route element={<PrivateRoute />}></Route>
        </Route>

        <Route path='auth/sign-in' element={<SignIn />} />
        <Route path='auth/callback' element={<AuthCallback />} />
      </Routes>
    </>
  );
};

export default App;

/* Libraries & Hooks */
import queryString from 'query-string';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthUserQuery, usePostSubscribeSerberMutation } from '~/redux/api';
import { getCookie, setCookie } from '~/utils/cookie';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

/* Components */
import Loader from '../loader/Loader';
import { useAppDispatch } from '~/redux/store';
import { showMessages } from '~/redux/features/popupSlice';
import { UserGithubInfo } from '~/redux/api/types';

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

const AuthCallback: React.FC = () => {
  const token = getCookie('token');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  /**
   * url에서 code파싱
   * @returns parsed code
   */
  const parseCode = (): string => {
    const parsedQuery = queryString.parse(location.search);
    const code = parsedQuery.code as string;

    return code;
  };

  /**
   * Rtk Query 구조분해할당
   */
  const userAuth = useAuthUserQuery(
    {
      code: parseCode(),
    },
    {
      skip: token ? true : false,
    },
  );

  const userData = (userAuth.data?.data as UserGithubInfo) ?? {};

  const [subscribeFunc, { isSuccess }] = usePostSubscribeSerberMutation();

  const setUserData = () => {
    setCookie('token', userAuth.data?.token, {
      path: '/',
      sameSite: 'strict',
    });

    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

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
        username: 'dbscks97',
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

  // if (isLoading) return;
  if (token) {
    requestPermission();
    navigate('/');
  }

  if (userAuth.isError) {
    dispatch(
      showMessages({
        msg: userAuth.error,
        content: 'DevProfile Login Error',
        type: 'error',
      }),
    );
  }

  if (userAuth.isSuccess) {
    setUserData();
  }
  // if (isError) return <Message msg={JSON.stringify(error)} />;

  return (
    <>{userAuth.isLoading ? <Loader /> : userAuth.isSuccess ? <Navigate to='/' /> : <Loader />}</>
  );
};

export default AuthCallback;

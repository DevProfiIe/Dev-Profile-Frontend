/* Libraries & Hooks */
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUserQuery } from '~/redux/api';
import { getCookie, setCookie } from '~/utils/cookie';

/* Components */
import Loader from '../loader/Loader';
import { useAppDispatch } from '~/redux/store';
import { showMessages } from '~/redux/features/popupSlice';

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
  const { isError, isLoading, isSuccess, data, error } = useAuthUserQuery(
    {
      code: parseCode(),
    },
    {
      skip: token ? true : false,
    },
  );

  const userData = data?.data ?? {};

  const setUserData = () => {
    setCookie('token', data?.token, {
      path: '/',
      sameSite: 'strict',
    });

    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  // if (isLoading) return;
  if (token) {
    navigate('/');
  }

  if (isError) {
    dispatch(
      showMessages({
        msg: error,
        content: 'DevProfile Login Error',
        type: 'error',
      }),
    );
  }

  if (isSuccess) {
    setUserData();
    navigate('/');
    window.location.reload;
  }
  // if (isError) return <Message msg={JSON.stringify(error)} />;

  return <>{isLoading && <Loader />}</>;
};

export default AuthCallback;

/* Libraries & Hooks */
import queryString from 'query-string';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUserQuery } from '~/redux/api';
import { getCookie, setCookie } from '~/utils/cookie';

/* Components */
import Loader from '../loader/Loader';
import Message from '../message/Message';

const AuthCallback: React.FC = () => {
  const token = getCookie('token');
  const location = useLocation();

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
  if (isSuccess) {
    setUserData();
  }
  // if (isError) return <Message msg={JSON.stringify(error)} />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <Navigate to='/' />
      ) : isError ? (
        <Message msg={JSON.stringify(error)} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AuthCallback;

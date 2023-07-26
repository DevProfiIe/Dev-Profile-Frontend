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

  if (token) {
    alert('이미 로그인 상태입니다.');
    return <Navigate to='/' />;
  }

  /**
   * Rtk Query 구조분해할당
   */
  const { isError, isLoading, isSuccess, data, error } = useAuthUserQuery({
    code: parseCode(),
  });

  if (isLoading) return <Loader />;
  if (isSuccess) {
    setCookie('token', `JWT ${data.token}`, {
      path: '/',
      sameSite: 'strict',
    });
    return <Navigate to='/' />;
  }
  if (isError) return <Message msg={JSON.stringify(error)} />;
};

export default AuthCallback;

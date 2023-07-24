import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';

const PrivateRoute: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to='/auth/sign-in' state={{ from: location }} replace />;
};

export default PrivateRoute;

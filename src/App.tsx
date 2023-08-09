/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

/* Pages */
import Home from '~/pages/home/Home';
import SignIn from '~/pages/signIn/SignIn';
import Resume from '~/pages/resume/Resume';
import Gallary from './pages/gallary/Gallary';
import User from './pages/user/User';

/* Components */
// import PrivateRoute from '~/components/utils/PrivateRoute';
import Layout from '~/pages/layout/Layout';
import AuthCallback from '~/components/utils/AuthCallback';

/* Styles */
import resetStyle from '~/styles/reset';
import PrivateRoute from './components/utils/PrivateRoute';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Global styles={resetStyle} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path='resume/:keyword' element={<Resume />} />
            <Route path='mypage' element={<User />} />
            <Route path='gallary' element={<Gallary />} />
          </Route>
        </Route>

        <Route path='auth/sign-in' element={<SignIn />} />
        <Route path='auth/callback' element={<AuthCallback />} />
      </Routes>
    </>
  );
};

export default App;

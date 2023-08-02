/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

/* Pages */
import Home from '~/pages/home/Home';
import SignIn from '~/pages/signIn/SignIn';
import Resume from '~/pages/resume/Resume';
import Gallary from './pages/gallary/Gallary';

/* Components */
// import PrivateRoute from '~/components/utils/PrivateRoute';
import Layout from '~/pages/layout/Layout';
import AuthCallback from '~/components/utils/AuthCallback';

/* Styles */
import resetStyle from '~/styles/reset';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Global styles={resetStyle} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/* Private Route */}
          {/* <Route element={<PrivateRoute />}>
            <Route path='board' element={<Board />} />
          </Route> */}
          <Route path='gallary' element={<Gallary />} />

          <Route path='resume/:keyword' element={<Resume />} />
        </Route>
        <Route path='auth/sign-in' element={<SignIn />} />
        <Route path='auth/callback' element={<AuthCallback />} />
      </Routes>
    </>
  );
};

export default App;

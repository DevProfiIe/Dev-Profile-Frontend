/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';

/* Pages */
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import Board from './pages/board/Board';
import Resume from './pages/resume/Resume';

/* Components */
import PrivateRoute from './components/utils/PrivateRoute';
import resetStyle from './styles/reset';
import Layout from './pages/layout/Layout';
import AuthCallback from './components/utils/AuthCallback';
import Modal from './components/modal/Modal';
import { useAppDispatch, useAppSelector } from './redux/store';

const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  return (
    <>
      <Global styles={resetStyle} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path='board' element={<Board />} />
          </Route>

          <Route path='resume' element={<Resume />} />
        </Route>
        <Route path='auth/sign-in' element={<SignIn />} />
        <Route path='auth/callback' element={<AuthCallback />} />
      </Routes>
      {isOpen && <Modal width='25rem' height='25rem' />}
    </>
  );
};

export default App;

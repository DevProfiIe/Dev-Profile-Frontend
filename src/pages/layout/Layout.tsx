/* Libraries */
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

/* Components */
import Header from '~/components/header/Header';

const Layout: React.FC = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: baseline;
  align-items: start;
  background-color: #fbf8f4;
  padding-top: 9.375rem;
  position: relative;
`;

export default Layout;

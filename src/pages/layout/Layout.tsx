/* Libraries */
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
// import Chat from '~/components/chat/Chat';

/* Components */
import Header from '~/components/header/Header';
import Message from '~/components/message/Message';
import Popup from '~/components/popup/Popup';
import { useAppSelector } from '~/redux/store';

const Layout: React.FC = (): JSX.Element => {
  const isOpen = useAppSelector((state) => state.popup.isOpen);
  const isOpenMessage = useAppSelector((state) => state.popup.isMessageOpen);

  return (
    <>
      <Wrapper>
        <Header />
        {isOpen && <Popup />}
        {isOpenMessage && <Message />}
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
  padding-top: 5.5rem;
  position: relative;
`;

export default Layout;

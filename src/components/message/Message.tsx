import { useNavigate } from 'react-router-dom';
import {
  MessageBoxContents,
  MessageBoxFooter,
  MessageBoxHeader,
  MessageBoxWrapper,
  Wrapper,
} from './message.style';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { closeMessages } from '~/redux/features/popupSlice';

const Message: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { type, msg, content } = useAppSelector((state) => state.popup.messageInfo);

  /**
   *
   */
  const clickErrorConfirmBtnHandler = () => {
    dispatch(closeMessages());
    navigate('/');
  };

  /**
   *
   */
  const clickConfirmBtnHandler = () => {
    dispatch(closeMessages());
  };

  return (
    <>
      <Wrapper></Wrapper>
      <MessageBoxWrapper>
        <MessageBoxHeader>
          <p>{type === 'error' ? 'DevProfile Error Message' : content}</p>
        </MessageBoxHeader>
        <MessageBoxContents>{msg}</MessageBoxContents>
        {type === 'error' ? (
          <MessageBoxFooter>
            <button onClick={clickErrorConfirmBtnHandler}>확인</button>
          </MessageBoxFooter>
        ) : (
          <MessageBoxFooter>
            <button onClick={clickConfirmBtnHandler}>확인</button>
            {type !== 'alert' ? <button onClick={clickConfirmBtnHandler}>취소</button> : null}
          </MessageBoxFooter>
        )}
      </MessageBoxWrapper>
    </>
  );
};

export default Message;

import { useNavigate } from 'react-router-dom';
import { MessageBoxContents, MessageBoxHeader, MessageBoxWrapper, Wrapper } from './message.style';
import { Close } from 'emotion-icons/evil';

type MessageBoxProps = {
  msg: string;
};

const Message: React.FC<MessageBoxProps> = ({ msg }: MessageBoxProps): JSX.Element => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <MessageBoxWrapper>
        <MessageBoxHeader>
          <p>DevProfile Error Message</p>
          <button onClick={onClickHandler}>
            <Close height={35} />
          </button>
        </MessageBoxHeader>
        <MessageBoxContents>{msg}</MessageBoxContents>
      </MessageBoxWrapper>
    </Wrapper>
  );
};

export default Message;

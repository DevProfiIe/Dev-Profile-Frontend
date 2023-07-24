import { useNavigate } from 'react-router-dom';
import { MessageBoxContent, MessageBoxHeader, MessageBoxWrapper, Wrapper } from './message.style';

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
          <p>DevProfile</p>
          <button onClick={onClickHandler}>X</button>
        </MessageBoxHeader>
        <MessageBoxContent>{msg}</MessageBoxContent>
      </MessageBoxWrapper>
    </Wrapper>
  );
};

export default Message;

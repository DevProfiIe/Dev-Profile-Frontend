import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import {
  ChatBox,
  ChatBoxButton,
  ChatBoxContents,
  ChatBoxContentsHeader,
  ChatBoxContentsInput,
  ChatBoxContentsMain,
  ChatContentsLeft,
  ChatContentsRight,
  ChatProfile,
  ChatRoomText,
  ChatRoomWrapper,
} from './chat.styles';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { open } from '~/redux/features/chatSlice';
import { Close } from 'emotion-icons/evil';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, ChatDots } from 'emotion-icons/bootstrap';
import {
  useGetChatMessagesQuery,
  useGetChatRoomListQuery,
  useMakeChatRoomMutation,
  useSendMessageMutation,
} from '~/redux/api';
import { Send } from 'emotion-icons/feather';
import { SendChatMessageInfo, UserGithubInfo } from '~/redux/api/types';

type RoomsProps = {
  nowPage: number;
  setNowPage: Dispatch<SetStateAction<number>>;
  setRoomId: Dispatch<SetStateAction<number>>;
};

const Rooms: React.FC<RoomsProps> = ({ nowPage, setNowPage, setRoomId }: RoomsProps) => {
  const dispatch = useAppDispatch();

  const showChatBoxHandler = () => {
    dispatch(open());
  };

  const pageHandler = (id: number) => {
    setRoomId(id);
    setNowPage(1);
  };

  const { data } = useGetChatRoomListQuery(null, {
    skip: nowPage > 0 ? true : false,
  });

  const roomList = data?.data ?? [];

  return (
    <ChatBoxContents>
      <ChatBoxContentsHeader>
        <div>내 채팅</div>
        <Close
          css={css`
            position: absolute;
            right: 1rem;
            cursor: pointer;
          `}
          size={30}
          onClick={showChatBoxHandler}
        />
      </ChatBoxContentsHeader>
      <ChatBoxContentsMain height='38rem'>
        {roomList.map((item) => (
          <ChatRoomWrapper key={item.id}>
            <ChatRoomText>
              <span
                css={css`
                  color: #189bfa;
                `}
              >
                {item.opponent.login}{' '}
              </span>{' '}
              님과의 대화
            </ChatRoomText>
            <ChatDots
              css={css`
                position: absolute;
                right: 1rem;
                cursor: pointer;
              `}
              size={30}
              onClick={() => {
                pageHandler(item.id);
              }}
            />
          </ChatRoomWrapper>
        ))}
      </ChatBoxContentsMain>
    </ChatBoxContents>
  );
};

const Chat = () => {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector((state) => state.chat.isShow);
  const [nowPage, setNowPage] = useState<number>(1);
  const location = useLocation();
  const [roomId, setRoomId] = useState<number>(-1);
  const [message, setMessage] = useState<string>('');
  const userInfo: UserGithubInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');

  const showChatBoxHandler = () => {
    dispatch(open());
    makeChatRoom({ userName: location.state.keyword })
      .then((res: any) => {
        setRoomId(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pageHandler = () => {
    setNowPage(-1);
    setRoomId(-1);
  };

  const [makeChatRoom] = useMakeChatRoomMutation();
  const [sendMessage] = useSendMessageMutation();

  const { data } = useGetChatMessagesQuery(
    {
      chatroomId: roomId,
    },
    {
      skip: roomId < 0 ? true : false,
      refetchOnMountOrArgChange: true,
    },
  );

  const messageChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendChatMessage = () => {
    const info: SendChatMessageInfo = {
      chatRoomId: roomId,
      sender: {
        id: userInfo.id,
        login: userInfo.login,
      },
      message: message,
    };

    sendMessage(info);
    setMessage('');
  };

  const chatHistory = data?.data ?? [];

  return (
    <Fragment>
      <ChatBoxButton onClick={showChatBoxHandler}>
        <ChatDots size={25} />
      </ChatBoxButton>

      {isShow && nowPage < 0 ? (
        <Rooms nowPage={nowPage} setNowPage={setNowPage} setRoomId={setRoomId} />
      ) : isShow && nowPage > 0 ? (
        <ChatBoxContents>
          <ChatBoxContentsHeader>
            <ArrowLeft
              css={css`
                position: absolute;
                left: 1rem;
                cursor: pointer;
              `}
              size={30}
              onClick={pageHandler}
            />
            <div>채팅방</div>
            <Close
              css={css`
                position: absolute;
                right: 1rem;
                cursor: pointer;
              `}
              size={30}
              onClick={showChatBoxHandler}
            />
          </ChatBoxContentsHeader>
          <ChatBoxContentsMain height='32rem'>
            {chatHistory.map((item) => {
              if (item.sender.id === userInfo.id) {
                return (
                  <ChatContentsRight key={item.id}>
                    <ChatBox>{item.message}</ChatBox>
                    <ChatProfile>
                      <p></p>
                    </ChatProfile>
                  </ChatContentsRight>
                );
              } else {
                return (
                  <ChatContentsLeft key={item.id}>
                    <ChatProfile>
                      <p></p>
                    </ChatProfile>
                    <ChatBox>{item.message}</ChatBox>
                  </ChatContentsLeft>
                );
              }
            })}
          </ChatBoxContentsMain>
          <ChatBoxContentsInput>
            <textarea
              css={css`
                width: 85%;
                height: auto;
                border-radius: 5px;
                background-color: white;
                border: 1px solid #eee;
                padding: 0.5rem;
                line-height: 120%;
              `}
              onChange={(e) => {
                messageChangeHandler(e);
              }}
              value={message}
            />
            <div
              css={css`
                width: 3rem;
                height: 3rem;
                border-radius: 999px;
                background-color: #ffffff;
                border: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              `}
            >
              <Send onClick={sendChatMessage} size={25} />
            </div>
          </ChatBoxContentsInput>
        </ChatBoxContents>
      ) : null}
    </Fragment>
  );
};

export default Chat;

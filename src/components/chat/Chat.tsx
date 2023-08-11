import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
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
import { close, open } from '~/redux/features/chatSlice';
import { Close } from 'emotion-icons/evil';
import { css } from '@emotion/react';
import { ArrowLeft, ChatDots } from 'emotion-icons/bootstrap';
import {
  useGetChatMessagesQuery,
  useGetChatRoomListQuery,
  useMakeChatRoomMutation,
  useSendMessageMutation,
} from '~/redux/api';
import { Send } from 'emotion-icons/feather';
import { GetChatRoomData, SendChatMessageInfo, UserGithubInfo } from '~/redux/api/types';
import { showMessages } from '~/redux/features/popupSlice';

type RoomsProps = {
  nowPage: number;
  setNowPage: Dispatch<SetStateAction<number>>;
  setRoomId: Dispatch<SetStateAction<number>>;
  setKeyword: Dispatch<SetStateAction<string>>;
};

const Rooms: React.FC<RoomsProps> = ({
  nowPage,
  setNowPage,
  setRoomId,
  setKeyword,
}: RoomsProps) => {
  const dispatch = useAppDispatch();

  // const showChatBoxHandler = () => {
  //   dispatch(open());
  // };

  /**
   *
   */
  const closeChatBoxHandler = () => {
    dispatch(close({}));
  };

  /**
   *
   * @param obj
   */
  const pageHandler = (obj: GetChatRoomData) => {
    setRoomId(obj.id);
    setNowPage(1);
    setKeyword(obj.opponent.login);
  };

  const { data } = useGetChatRoomListQuery(null, {
    skip: nowPage > 0 ? true : false,
  });

  const roomList = data?.data ?? [];

  return (
    <ChatBoxContents>
      <ChatBoxContentsHeader>
        <div>대화 목록</div>
        <Close
          css={css`
            position: absolute;
            right: 1rem;
            cursor: pointer;
          `}
          size={30}
          onClick={closeChatBoxHandler}
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
                pageHandler(item);
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
  const [keyword, setKeyword] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);
  const [roomId, setRoomId] = useState<number>(-1);
  const [message, setMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);

  const showChatBoxHandler = () => {
    dispatch(open());

    if (keyword === userInfo?.login) {
      setNowPage(-1);
      // refetch();
    } else {
      makeChatRoom({ userName: keyword })
        .then((res: any) => {
          setRoomId(res.data.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeChatBoxHandler = () => {
    dispatch(close({}));
  };

  const [makeChatRoom] = useMakeChatRoomMutation();
  const [sendMessage] = useSendMessageMutation();

  const { data, error, isError } = useGetChatMessagesQuery(
    {
      chatroomId: roomId,
    },
    {
      skip: roomId < 0 ? true : false,
      refetchOnMountOrArgChange: true,
    },
  );

  const chatHistory = data?.data ?? [];

  if (isError) {
    dispatch(
      showMessages({
        msg: error,
        content: 'DevProfile Chat Error',
        type: 'error',
      }),
    );
  }

  /**
   *
   */
  const pageHandler = () => {
    setNowPage(-1);
    setRoomId(-1);
  };

  /**
   *
   * @param e
   */
  const messageChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  /**
   *
   */
  const sendChatMessage = () => {
    const info: SendChatMessageInfo = {
      chatRoomId: roomId,
      sender: {
        id: userInfo?.id ?? -1,
        login: userInfo?.login ?? '',
      },
      message: message,
    };

    sendMessage(info);
    setMessage('');
  };

  useEffect(() => {
    const userKeyword = localStorage.getItem('keyword');

    if (userKeyword) {
      const parsedKeyword = JSON.parse(userKeyword);
      setKeyword(parsedKeyword);
    }
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      const userData = JSON.parse(userInfo) as UserGithubInfo;
      setUserInfo(userData);
    }
  }, []);

  return (
    <Fragment>
      <ChatBoxButton onClick={showChatBoxHandler}>
        <ChatDots size={25} />
      </ChatBoxButton>

      {isShow ? (
        nowPage < 0 ? (
          <Rooms
            nowPage={nowPage}
            setNowPage={setNowPage}
            setRoomId={setRoomId}
            setKeyword={setKeyword}
          />
        ) : (
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
              <div>{keyword}님과의 대화</div>
              <Close
                css={css`
                  position: absolute;
                  right: 1rem;
                  cursor: pointer;
                `}
                size={30}
                onClick={closeChatBoxHandler}
              />
            </ChatBoxContentsHeader>
            <ChatBoxContentsMain height='32rem'>
              {chatHistory.map((item) => {
                if (item.sender.id === userInfo?.id) {
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
        )
      ) : null}
    </Fragment>
  );
};

export default Chat;

import { IMessage } from '@stomp/stompjs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DefaultApi,
  GetChatRoomData,
  GetChatRoomDetail,
  GetChatRoomHistory,
  GetChatRoomHistoryParams,
  GetChatRoomParams,
  KeywordSearchOutput,
  KeywordSearchOutputParams,
  SendChatMessageInfo,
  UserGithubData,
  UserGithubDataParams,
  UserGithubInfo,
} from './types';
import { getCookie } from '~/utils/cookie';
import { getSocket } from '~/utils/socket';

/**
 * api 슬라이스
 */
export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}`,
    prepareHeaders(headers) {
      const token = getCookie('token');

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    authUser: builder.query<DefaultApi<UserGithubInfo>, UserGithubDataParams>({
      query(data) {
        return {
          url: 'oauth2/token',
          method: 'POST',
          params: data,
        };
      },
    }),
    getUserGithubInfo: builder.query<DefaultApi<UserGithubData>, any>({
      query(data) {
        return {
          url: 'response_test',
          method: 'GET',
          params: data,
        };
      },
    }),
    getSearchOutput: builder.query<DefaultApi<KeywordSearchOutput[]>, KeywordSearchOutputParams>({
      query(data) {
        return {
          url: 'search/similarity',
          method: 'GET',
          params: data,
        };
      },
    }),
    getChatRoomList: builder.query<DefaultApi<GetChatRoomData[]>, null>({
      query() {
        return {
          url: `api/user/chatrooms`,
          method: 'GET',
        };
      },
    }),
    makeChatRoom: builder.mutation<DefaultApi<GetChatRoomHistory>, GetChatRoomParams>({
      query(data) {
        return {
          url: 'api/chatroom',
          method: 'POST',
          params: data,
        };
      },
    }),
    getChatMessages: builder.query<DefaultApi<GetChatRoomDetail[]>, GetChatRoomHistoryParams>({
      query(data) {
        return {
          url: `api/chatroom/${data.chatroomId}/messages`,
          method: 'GET',
        };
      },
      async onCacheEntryAdded(userData, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          const stompClient = getSocket();

          stompClient.connect(
            {},
            (frame: any) => {
              console.log('Connected: ' + frame);
              stompClient.subscribe(
                `/topic/chatroom/${userData.chatroomId}`,
                (message: IMessage) => {
                  updateCachedData((draft) => {
                    draft.data.push(JSON.parse(message.body));
                  });
                },
              );
            },
            (error: any) => {
              console.log('Connected Error: ' + error);
            },
          );

          await cacheEntryRemoved;

          stompClient.disconnect((frame: any) => {
            console.log('Disconnected: ' + frame);
          });
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
    sendMessage: builder.mutation<any, SendChatMessageInfo>({
      queryFn(data) {
        const stompClient = getSocket();

        return new Promise(() => {
          stompClient.send('/app/chat', {}, JSON.stringify(data));
        });
      },
    }),
  }),
});

export const {
  useAuthUserQuery,
  useGetUserGithubInfoQuery,
  useGetSearchOutputQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useGetChatRoomListQuery,
  useMakeChatRoomMutation,
} = mainApi;

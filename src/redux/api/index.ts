import { IMessage } from '@stomp/stompjs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DefaultApi,
  GetBoardData,
  GetBoardDataDetails,
  GetBoardDataParams,
  GetBoardSortData,
  GetChatRoomData,
  GetChatRoomDetail,
  GetChatRoomHistory,
  GetChatRoomHistoryParams,
  GetChatRoomParams,
  GetCommitDetailsData,
  GetCommitDetailsParams,
  GetMyPageUserItems,
  GetMyPageUserItemsParams,
  KeywordSearchOutput,
  KeywordSearchOutputParams,
  PostBoardQueryData,
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
          url: 'combined_data',
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
    getCommitDetails: builder.query<DefaultApi<GetCommitDetailsData>, GetCommitDetailsParams>({
      query(data) {
        return {
          url: 'search/commits',
          method: 'GET',
          params: data,
        };
      },
    }),
    getChatRoomList: builder.query<DefaultApi<GetChatRoomData[]>, null>({
      query() {
        return {
          url: `user/chatrooms`,
          method: 'GET',
        };
      },
    }),
    makeChatRoom: builder.mutation<DefaultApi<GetChatRoomHistory>, GetChatRoomParams>({
      query(data) {
        return {
          url: 'chatroom',
          method: 'POST',
          params: data,
        };
      },
    }),
    getChatMessages: builder.query<DefaultApi<GetChatRoomDetail[]>, GetChatRoomHistoryParams>({
      query(data) {
        return {
          url: `chatroom/${data.chatroomId}/messages`,
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
    getBoard: builder.query<DefaultApi<GetBoardData>, GetBoardDataParams>({
      query(data) {
        return {
          url: 'board',
          method: 'GET',
          params: data,
        };
      },
    }),
    getBoardSortData: builder.query<DefaultApi<GetBoardSortData>, any>({
      query() {
        return {
          url: 'board/filter',
          method: 'GET',
        };
      },
    }),
    postBoardItems: builder.mutation<DefaultApi<any>, PostBoardQueryData>({
      query(data) {
        return {
          url: 'board/send',
          method: 'POST',
          body: data,
        };
      },
    }),
    getMyPageUserItems: builder.query<DefaultApi<GetMyPageUserItems>, GetMyPageUserItemsParams>({
      query(data) {
        return {
          url: 'myPage',
          method: 'GET',
          params: data,
        };
      },
    }),
    getMyPageUserSpecific: builder.query<DefaultApi<GetBoardDataDetails[]>, { id: string }>({
      query(data) {
        return {
          url: 'myPage/specific',
          method: 'GET',
          params: data,
        };
      },
      keepUnusedDataFor: 0,
    }),
    postMyPageUserSpecific: builder.mutation<
      DefaultApi<any>,
      { id: string; checkUserNames: string[] }
    >({
      query(data) {
        return {
          url: 'myPage/submit',
          method: 'POST',
          body: data,
        };
      },
    }),
    postSubscribeSerber: builder.mutation<DefaultApi<any>, { token: string; username: string }>({
      query(data) {
        return {
          url: 'subscribe',
          method: 'POST',
          body: data,
        };
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
  useGetCommitDetailsQuery,
  useGetBoardQuery,
  useGetBoardSortDataQuery,
  usePostBoardItemsMutation,
  useGetMyPageUserItemsQuery,
  useGetMyPageUserSpecificQuery,
  usePostMyPageUserSpecificMutation,
  usePostSubscribeSerberMutation,
} = mainApi;

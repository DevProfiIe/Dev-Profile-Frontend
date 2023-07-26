import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DefaultApi, UserGithubData } from './types';
import { getCookie } from '~/utils/cookie';

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
    authUser: builder.query<DefaultApi<any>, any>({
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
  }),
});

export const { useAuthUserQuery, useGetUserGithubInfoQuery } = mainApi;

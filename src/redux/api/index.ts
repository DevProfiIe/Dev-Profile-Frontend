import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DefaultApi } from './types';

const BASE_URL = 'http://43.201.251.133:8080/';

/**
 * api 슬라이스
 */
export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
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
  }),
});

export const { useAuthUserQuery } = mainApi;

import axios, { AxiosInstance, AxiosResponse, DefaultApi, HttpRequestMethods } from 'axios';

export const http: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
});

/**
 * Request 함수
 * @param method
 * @param url
 * @param params
 * @returns
 */
export const request = async <T, D>(
  method: HttpRequestMethods,
  url?: string,
  params?: T,
): Promise<AxiosResponse<DefaultApi<D>>> => {
  const response = await axios({
    url: url,
    method: method,
    params: {
      ...params,
    },
  });

  return response;
};

export const getToken = (): string | null => {
  const token = sessionStorage.getItem('token');

  return token;
};

export const setToken = (token: string) => sessionStorage.setItem('token', token);

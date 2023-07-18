import 'axios';

declare module 'axios' {
  export interface DefaultApi<T> {
    /* API 성공 여부 */
    result: boolean;
    /* API 결과 데이터 */
    data?: T;
    /* API JWT 인증 토큰 */
    token?: string;
    /* API 실패 이유 등이 담긴 메세지 */
    message?: string;
    /* API 오류 메시지 */
    error?: string;
  }

  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<DevProfileApi<T>>>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }

  export type HttpRequestMethods = 'GET' | 'POST' | 'DELETE' | 'PUT';
}

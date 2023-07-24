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

export interface AuthUser {
  code: string;
}

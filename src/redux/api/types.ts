export interface DefaultApi<T> {
  /* API 성공 여부 */
  result: boolean;
  /* API 결과 데이터 */
  data?: T;
  /* API 실패 이유 등이 담긴 메세지 */
  message?: string;
}

export interface AuthUser {
  code: string;
}

export interface UserGithubData {
  id: number;
  repoName: string;
  startDate: string;
  endDate: string;
  totalCommitCnt: number;
  myCommitCnt: number;
  totalContributors: number;
  repoLanguages: string[];
  featured: string[];
  langFramework: string[];
}

export interface UserGithubSkills {}

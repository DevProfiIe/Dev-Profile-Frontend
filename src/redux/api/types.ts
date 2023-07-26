import { CalendarDatum } from '@nivo/calendar';

export interface DefaultApi<T> {
  /* API 성공 여부 */
  result: boolean;
  /* API 결과 데이터 */
  data: T;
  /* API 실패 이유 등이 담긴 메세지 */
  message?: string;
}

export interface AuthUser {
  code: string;
}

export interface UserGithubData {
  repositoryInfo: UserGithubRepositoryInfo[];
  userInfo: UserGithubUserInfo;
}

export interface UserGithubRepositoryInfo {
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

export interface UserGithubUserInfo {
  ai: number;
  algorithm: number;
  dataScience: number;
  database: number;
  document: number;
  game: number;
  keywordSet: string[];
  login: string;
  mobile: number;
  name: string;
  systemProgramming: number;
  webBackend: number;
  commitCalender: CalendarDatum[];
  commitStart: string;
}

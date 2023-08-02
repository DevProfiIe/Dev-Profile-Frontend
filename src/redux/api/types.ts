import { CalendarDatum } from '@nivo/calendar';

export interface DefaultApi<T> {
  /* API 성공 여부 */
  result: boolean;
  /* API 결과 데이터 */
  data: T;
  /* API 실패 이유 등이 담긴 메세지 */
  message?: string;

  token?: string;
}

export interface UserInfoParams {
  userName: string;
}

export interface UserGithubDataParams {
  code: string;
}

export interface UserGithubInfo {
  avatar_url: string;
  email: string | null;
  gitHubToken: string | null;
  id: number;
  jwtRefreshToken: string;
  login: string;
  name: string;
  node_id: string;
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
  game: number;
  keywordSet: string[];
  login: string;
  mobile: number;
  name: string;
  systemProgramming: number;
  webBackend: number;
  commitCalender: CalendarDatum[];
  commitStart: string;
  webFrontend: number;
}

export interface KeywordSearchOutput {
  commitMessage: string;
  commitDdate: string;
  keywordSet: string[];
  repoName: string;
}

export interface KeywordSearchOutputParams {
  query: string;
}

export interface GetChatRoomHistory {
  id: number;
  send: ChatUserType;
  receive: ChatUserType;
  createdAt: string;
}

export interface GetChatRoomDetail {
  chatRoomId: number;
  id: number;
  message: string;
  sender: ChatUserType;
  timestamp: string;
}

export interface ChatUserType {
  id: number;
  login: string;
}

export interface GetChatRoomHistoryParams {
  chatroomId: number;
}

export interface SendChatMessageInfo {
  chatRoomId: number;
  sender: ChatUserType;
  message: string;
}

export interface GetChatRoomParams {
  userName: string;
}

export interface GetChatRoomData {
  id: number;
  opponent: ChatUserType;
  Timestamp: string;
}

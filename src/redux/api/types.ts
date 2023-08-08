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
  analyzed: boolean;
}

export interface UserGithubData {
  boardData: UserGithubBoardData[];
  repositoryInfo: UserGithubRepositoryInfo[];
  userInfo: UserGithubUserInfo;
  styleInfo: UserStyle[];
}

export interface UserStyle {
  keyword: string;
  detail: string;
}

export interface UserGithubBoardData {
  userlogin: {
    login: string;
    score: number;
  };
  feature: string[];
  field: string;
}

export interface UserGithubRepositoryInfo {
  endDate: string;
  frameworkUrls: SkillDetail[];
  id: number;
  myCommitCnt: number;
  repoDesc: string;
  repoLanguages: string[];
  repoName: string;
  startDate: string;
  totalCommitCnt: number;
  totalContributors: number;
}

export interface SkillDetail {
  skill: string;
  url: string;
}

export interface UserGithubUserInfo {
  ai: number;
  algorithm: number;
  dataScience: number;
  database: number;
  game: number;
  keywordSet: string[];
  login: string;
  name: string;
  systemProgramming: number;
  webBackend: number;
  commitCalender: CalendarDatum[];
  commitStart: string;
  commitEnd: string;
  webFrontend: number;
  userKeywordAnalyze: string;
  userTitle: string;
}

export interface KeywordSearchOutput {
  commitMessage: string;
  commitDate: string;
  commitOid: string;
  keywordSet: string[];
  repoName: string;
}

export interface KeywordSearchOutputParams {
  query: string;
  userName: string;
}

export interface GetCommitDetailsData {
  diffs: GetCommitDetailsDiff[];
  fileTree: TreeData;
}

export interface TreeData {
  children: TreeData[];
  name: string;
}

export interface GetCommitDetailsDiff {
  filename: string;
  content: string;
  filetype: string;
  status: {
    deleted: number[];
    original: number[];
    inserted: number[];
  };
}
export interface GetCommitDetailsParams {
  commitOid: string;
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

export interface GetBoardDataDetails {
  userName: string;
  language: string[];
  framework: string[];
  avataUrl: string;
  field: string;
  styles: string[];
  commitCount: number;
  commitDays: number;
  repoCount: number;
  login: string;
}

export interface GetBoardData {
  total: number;
  content: GetBoardDataDetails[];
}

export interface GetBoardDataParams {
  lang: string[];
  frame: string[];
  keywordsFilter: number[] | null;
  field: string;
  page: number;
}

export interface SkillFilterDetails {
  name: string;
  duration: number;
  sort: string;
}

export interface GetBoardSortData {
  skills: GetBoardSortDataSkiisDetail[];
  keyword: GetBoardSortDataKeywordDetail[];
}

export interface GetBoardSortDataSkiisDetail {
  sort: string;
  name: string;
}

export interface GetBoardSortDataKeywordDetail {
  num: number;
  keyword: string;
}

export interface PostBoardQueryData {
  sendUserName: string;
  receiveUserName: string;
  boardUserNames: string[];
}

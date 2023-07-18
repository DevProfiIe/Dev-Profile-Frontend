import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, DefaultApi } from 'axios';
import { request } from '~/api';

export interface UserState {
  info: UserInfo;
  token: string | null;
}

export interface UserInfo {
  email: string;
  password: string;
}

const initialState: UserState = {
  info: {
    email: '',
    password: '',
  },
  token: null,
};

/**
 * 로그인 비동기 호출
 */
export const loginUser = createAsyncThunk<
  DefaultApi<UserState>,
  UserInfo,
  { rejectValue: AxiosError }
>('auth/login', async (user, thunkOption) => {
  const { rejectWithValue } = thunkOption;
  try {
    const response = await request<UserInfo, UserState>('POST', '/login', user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error);
    }
    throw new Error('알 수없는 에러가 발생했습니다.');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {})
      .addCase(loginUser.rejected, (state, action) => {});
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  token: string;
};

const initialState: InitialState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initToken: (state, action) => {},
    setToken: (state, action) => {},
    getToken: (state, action) => {},
  },
});

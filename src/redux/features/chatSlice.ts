import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isShow: boolean;
};

const initialState: InitialState = {
  isShow: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    open: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export default chatSlice;
export const { open } = chatSlice.actions;

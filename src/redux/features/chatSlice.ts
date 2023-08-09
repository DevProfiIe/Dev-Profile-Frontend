import { getSocket } from './../../utils/socket';
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
      state.isShow = true;
    },

    close: (state, action) => {
      state.isShow = false;

      console.log(action);

      const stompClient = getSocket();

      stompClient.deactivate({
        force: false,
      });
    },
  },
});

export default chatSlice;
export const { open, close } = chatSlice.actions;

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

    close: (state) => {
      state.isShow = false;

      const stompClient = getSocket();

      stompClient.disconnect((frame: any) => {
        console.log('Disconnected: ' + frame);
      });
    },
  },
});

export default chatSlice;
export const { open, close } = chatSlice.actions;

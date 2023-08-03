import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
  commitOid: string;
};

const initialState: InitialState = {
  isOpen: false,
  commitOid: '',
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.commitOid = action.payload.commitOid;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export default popupSlice;
export const { open, close } = popupSlice.actions;

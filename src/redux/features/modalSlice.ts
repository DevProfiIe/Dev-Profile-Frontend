import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
};

const initialState: InitialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export default modalSlice;
export const { open } = modalSlice.actions;

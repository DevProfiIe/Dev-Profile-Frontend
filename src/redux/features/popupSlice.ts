import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
};

const initialState: InitialState = {
  isOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export default popupSlice;
export const { open } = popupSlice.actions;

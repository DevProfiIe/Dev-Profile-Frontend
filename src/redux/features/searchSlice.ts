import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  keyword: string;
};

const initialState: InitialState = {
  keyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export default searchSlice;
export const { change } = searchSlice.actions;

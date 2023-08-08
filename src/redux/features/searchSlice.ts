import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  keyword: string;
  commitKeyword: string;
};

const initialState: InitialState = {
  keyword: '',
  commitKeyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action) => {
      state.keyword = action.payload;

      localStorage.setItem('keyword', JSON.stringify(action.payload));
    },
    commitSearch: (state, action) => {
      state.commitKeyword = action.payload.commitKeyword;
    },
  },
});

export default searchSlice;
export const { change, commitSearch } = searchSlice.actions;

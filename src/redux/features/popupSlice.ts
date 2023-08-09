import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DevProfileNode } from '~/components/tree/Tree';

type InitialState = {
  isOpen: boolean;
  commitOid: string;
  clickedNode: DevProfileNode | null;
  orgCode: string;
  modifiedCode: string;
  isOpenEditor: boolean;
  isMessageOpen: boolean;
  messageInfo: MessageProps;
};

type MessageProps = {
  msg: any;
  type: 'error' | 'confirm' | 'alert';
  content: string;
};

const initialState: InitialState = {
  isOpen: false,
  commitOid: '',
  clickedNode: null,
  orgCode: '',
  modifiedCode: '',
  isOpenEditor: false,
  isMessageOpen: false,
  messageInfo: {
    msg: '',
    type: 'error',
    content: '',
  },
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
    click: (state, action) => {
      state.isOpenEditor = true;
      state.clickedNode = action.payload.clickedNode;
      state.orgCode = action.payload.orgCode;
      state.modifiedCode = action.payload.modifiedCode;
    },
    clear: (state) => {
      state.isOpenEditor = false;
      state.clickedNode = null;
      state.orgCode = '';
      state.modifiedCode = '';
    },
    showMessages: (state, action: PayloadAction<MessageProps>) => {
      state.isMessageOpen = true;
      state.messageInfo = action.payload;
    },
    closeMessages: (state) => {
      state.isMessageOpen = false;
    },
  },
});

export default popupSlice;
export const { open, close, click, clear, showMessages, closeMessages } = popupSlice.actions;

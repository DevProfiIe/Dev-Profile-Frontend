import { useAppDispatch } from '~/redux/store';
import {
  PopupBackground,
  PopupContent,
  PopupContentLeft,
  PopupContentRight,
  PopupHeader,
  PopupWrapper,
} from './popup.styles';
import { Close } from 'emotion-icons/evil';
import { open } from '~/redux/features/popupSlice';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const code = `
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from './api';
import searchSlice from './features/searchSlice';
import popupSlice from './features/popupSlice';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    search: searchSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
`;

const Popup = () => {
  const dispatch = useAppDispatch();

  const onToggleHandler = () => {
    dispatch(open());
  };

  return (
    <>
      <PopupBackground onClick={onToggleHandler} />
      <PopupWrapper>
        <PopupHeader>
          <p>Commits Details..</p>
          <button onClick={onToggleHandler}>
            <Close height={35} />
          </button>
        </PopupHeader>
        <PopupContent>
          <Editor
            height='90%'
            width='90%'
            defaultLanguage='typescript'
            defaultValue={code}
            theme='vs-dark'
          />
          {/* <PopupContentLeft></PopupContentLeft>
          <PopupContentRight></PopupContentRight> */}
        </PopupContent>
      </PopupWrapper>
    </>
  );
};

export default Popup;

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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCookie } from '~/utils/cookie';

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

// const code =

const httpRequest = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
  headers: {
    Authorization: `${getCookie('token')}`,
  },
});

const Popup = () => {
  const dispatch = useAppDispatch();

  const onToggleHandler = () => {
    dispatch(open());
  };

  const [data, setData] = useState([]);

  const FetchPatch = async () => {
    httpRequest;

    try {
      const response = await httpRequest(
        '/search/commits?commitOid=d89444edd96cf8d96294d7fe5864f23b1882bf91',
      ); // 여기에 실제 주소

      // API에서 반환한 데이터를 상태 변수에 설정
      setData(response.data.data.diffs);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 컴포넌트가 마운트되면 API를 호출합니다.
  useEffect(() => {
    FetchPatch();
  }, []); // 빈 배열을 전달하여 마운트 시에만 FetchRepo 함수가 실행되도록 한다.

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

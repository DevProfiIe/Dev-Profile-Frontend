import { useAppDispatch, useAppSelector } from '~/redux/store';
import {
  PopupBackground,
  PopupContents,
  PopupEditorWrapper,
  PopupHeader,
  PopupSideView,
  PopupWrapper,
} from './popup.styles';
import { Close } from 'emotion-icons/evil';
import { clear, close } from '~/redux/features/popupSlice';
import { useGetCommitDetailsQuery } from '~/redux/api';
import { GetCommitDetailsData } from '~/redux/api/types';
import { useEffect } from 'react';
import Loader from '../loader/Loader';
import { DiffEditor } from '@monaco-editor/react';

import Tree from '../tree/Tree';
import { css } from '@emotion/react';

const Popup = () => {
  const dispatch = useAppDispatch();
  const selectedOid = useAppSelector((state) => state.popup.commitOid);
  const clickedNode = useAppSelector((state) => state.popup.clickedNode);
  const isOpenEditor = useAppSelector((state) => state.popup.isOpenEditor);
  const orgCode = useAppSelector((state) => state.popup.orgCode);
  const modifiedCode = useAppSelector((state) => state.popup.modifiedCode);

  const { data, isLoading } = useGetCommitDetailsQuery(
    {
      commitOid: selectedOid,
    },
    {
      skip: selectedOid === '' ? true : false,
    },
  );

  /**
   *
   */
  const onToggleHandler = () => {
    dispatch(close());
  };

  /**
   *
   */
  const commitData: GetCommitDetailsData = data?.data ?? {
    diffs: [],
    fileTree: {
      name: '',
      children: [],
    },
  };

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PopupBackground onClick={onToggleHandler} />
      <PopupWrapper>
        <PopupHeader>
          <p
            css={css`
              font-weight: 700;
            `}
          >
            Commit Details
          </p>
          <button onClick={onToggleHandler}>
            <Close size={25} />
          </button>
        </PopupHeader>
        <PopupContents>
          <PopupSideView>
            <Tree fileTree={commitData.fileTree} commitData={commitData.diffs} />
          </PopupSideView>

          {isOpenEditor ? (
            <PopupEditorWrapper>
              <DiffEditor
                height='100%'
                theme='vs-dark'
                options={{
                  enableSplitViewResizing: false,
                }}
                original={orgCode}
                modified={modifiedCode}
                language={clickedNode?.data?.filetype}
                loading={<Loader />}
              />
            </PopupEditorWrapper>
          ) : (
            <p
              css={css`
                width: 900px;
                height: 800px;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              파일을 선택해주세요.
            </p>
          )}
        </PopupContents>
      </PopupWrapper>
    </>
  );
};

export default Popup;

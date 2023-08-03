import { useAppDispatch, useAppSelector } from '~/redux/store';
import {
  PopupBackground,
  PopupContents,
  PopupEditorWrapper,
  PopupFileWrapper,
  PopupHeader,
  PopupWrapper,
} from './popup.styles';
import { Close } from 'emotion-icons/evil';
import { close } from '~/redux/features/popupSlice';
import { useGetCommitDetailsQuery } from '~/redux/api';
import { FileEarmarkCodeFill } from 'emotion-icons/bootstrap';
import { GetCommitDetailsData } from '~/redux/api/types';
import { useEffect, useRef, useState } from 'react';
import Loader from '../loader/Loader';
import { ArrowLeft } from 'emotion-icons/feather';
import { DiffEditor } from '@monaco-editor/react';

const Popup = () => {
  const dispatch = useAppDispatch();
  const selectedOid = useAppSelector((state) => state.popup.commitOid);
  const [clickedFile, setClickedFile] = useState<number>(-1);
  const [isShowCodeEditor, setIsShowCodeEditor] = useState<boolean>(false);
  const [orgCodeContent, setOrgCodeContent] = useState<string>('');
  const [modCodeContent, setModCodeContent] = useState<string>('');
  const [codeFileType, setCodeFileType] = useState<string>('');
  const [codeValue, setCodeValue] = useState<string>();

  const { data, isLoading, isSuccess } = useGetCommitDetailsQuery(
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
   * @param index
   */
  const clickFolderHandler = (index: number) => {
    setClickedFile(index);

    const selectedFile = commitData.diffs[index];
    let orgCode = '';
    let modifiedCode = '';
    let codeValue = '';

    selectedFile.content.split('\n').forEach((item, i) => {
      if (selectedFile.status.deleted.find((code) => code === i + 1)) {
        orgCode += `\n ${item.trim()}`;
      }

      if (selectedFile.status.inserted.find((code) => code === i + 1)) {
        modifiedCode += `\n ${item.trim()}`;
      }

      if (selectedFile.status.original.find((code) => code === i + 1)) {
        codeValue += `\n ${item.trim()}`;
      }
    });

    setOrgCodeContent(orgCode);
    setModCodeContent(modifiedCode);
    setCodeFileType(commitData.diffs[index].filetype);
  };

  /**
   *
   */
  const showCodeEditorHandler = () => {
    setIsShowCodeEditor((state) => !state);
  };

  /**
   *
   */
  const commitData: GetCommitDetailsData = data?.data ?? {
    diffs: [],
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PopupBackground onClick={onToggleHandler} />
      <PopupWrapper>
        <PopupHeader>
          <p>Commits Details</p>
          <button onClick={isShowCodeEditor ? showCodeEditorHandler : onToggleHandler}>
            {isShowCodeEditor ? <ArrowLeft height={35} /> : <Close height={35} />}
          </button>
        </PopupHeader>
        <PopupContents>
          {commitData.diffs?.map((item, i) => (
            <PopupFileWrapper
              key={i}
              onClick={() => {
                clickFolderHandler(i);
              }}
              onDoubleClick={showCodeEditorHandler}
              selected={clickedFile === i ? true : false}
            >
              <FileEarmarkCodeFill size={50} />
              <p>{item.filename}</p>
            </PopupFileWrapper>
          ))}

          {isShowCodeEditor && (
            <PopupEditorWrapper>
              <DiffEditor
                height='100%'
                // defaultLanguage={codeFileType}
                // defaultValue={codeContent}
                theme='vs-dark'
                options={{
                  enableSplitViewResizing: false,
                  renderSideBySide: false,
                  autoIndent: 'advanced',
                  readOnly: true,
                  readOnlyMessage: {
                    value: '',
                  },
                }}
                original={orgCodeContent}
                modified={modCodeContent}
                language={codeFileType}
              />
            </PopupEditorWrapper>
          )}

          {commitData.diffs.length === 0 ? <p>데이터가 존재하지 않습니다.</p> : null}

          {/* <PopupcontentsLeft></PopupcontentsLeft>
          <PopupcontentsRight></PopupcontentsRight> */}
        </PopupContents>
      </PopupWrapper>
    </>
  );
};

export default Popup;

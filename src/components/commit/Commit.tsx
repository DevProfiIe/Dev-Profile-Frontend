import { css } from '@emotion/react';
import { SearchAlt } from 'emotion-icons/boxicons-regular';
import { useState } from 'react';
import { CommitContent, CommitContentTop, CommitSearchBox } from './commit.styles';
import { Popup } from 'emotion-icons/entypo';
import { useAppDispatch } from '~/redux/store';
import { open } from '~/redux/features/popupSlice';

const Commit = () => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useAppDispatch();

  const showSearchInputHandler = () => {
    setIsShow((state) => !state);
  };

  const popupToggleHandler = () => {
    dispatch(open());
  };

  return (
    <>
      <div>
        <input
          className='SearchInput'
          css={css`
            width: ${isShow ? '10rem' : '0'};
            border-bottom: 1px solid #000;
            transition: 0.3s;
            text-indent: 0.5rem;
          `}
          placeholder='Search Commits'
          onBlur={showSearchInputHandler}
        />
        <button>
          <SearchAlt height={30} onClick={showSearchInputHandler} />
        </button>
      </div>
      {isShow && (
        <CommitSearchBox>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              onClick={popupToggleHandler}
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
          <CommitContent>
            <CommitContentTop>
              <p>커밋명</p>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  gap: 0 0.7rem;
                  font-size: 0.8rem;
                `}
              >
                <p>관련키워드</p>
                <p>날짜</p>
              </div>
            </CommitContentTop>
            <div
              css={css`
                padding: 0.5rem;
                border-radius: 999px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Popup height={20} />
            </div>
          </CommitContent>
        </CommitSearchBox>
      )}
    </>
  );
};

export default Commit;

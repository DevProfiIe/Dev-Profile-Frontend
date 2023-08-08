import { css } from '@emotion/react';
import { SearchAlt } from 'emotion-icons/boxicons-regular';
import { CommitContents, CommitContentsTop, CommitSearchBox } from './commit.styles';
import { Popup } from 'emotion-icons/entypo';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { open } from '~/redux/features/popupSlice';
import { useGetSearchOutputQuery } from '~/redux/api';
import Loader from '../loader/Loader';
import useDebounce from '~/hooks/useDebounce';
import { UserGithubInfo } from '~/redux/api/types';
import { commitSearch } from '~/redux/features/searchSlice';

const Commit: React.FC = () => {
  const searchKeyword = useAppSelector((state) => state.search.commitKeyword);
  const debouncedTerm = useDebounce(searchKeyword, 500);
  const dispatch = useAppDispatch();
  const userInfo: UserGithubInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');

  /**
   * 검색 input focus 핸들러
   * @param e
   */
  const searchInputFocusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(commitSearch({ commitKeyword: e.target.value }));
  };

  /**
   * 팝업 visible 핸들러
   */
  const popupToggleHandler = (oid: string) => {
    dispatch(open({ commitOid: oid }));
  };

  const { data, isLoading, isSuccess } = useGetSearchOutputQuery(
    {
      query: searchKeyword,
      userName: userInfo?.login,
    },
    {
      skip: debouncedTerm ? false : true,
    },
  );

  const results = data?.data ?? [];

  return (
    <>
      <div>
        <input
          css={css`
            width: 15rem;
            border-bottom: 1px solid #000;
            transition: 0.3s;
            text-indent: 0.5rem;
          `}
          placeholder='Search Commits'
          onChange={searchInputFocusHandler}
          value={searchKeyword}
        />
        <button>
          <SearchAlt height={30} />
        </button>
      </div>
      {searchKeyword !== '' && (
        <CommitSearchBox>
          {isLoading ? (
            <Loader />
          ) : isSuccess && data.data ? (
            results.map((item, i) => (
              <CommitContents key={i}>
                <CommitContentsTop>
                  <p
                    css={css`
                      overflow: hidden;
                    `}
                  >
                    {item.commitMessage}
                  </p>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      gap: 0 0.7rem;
                      font-size: 0.8rem;
                    `}
                  >
                    <p>{item.commitDate}</p>
                  </div>
                </CommitContentsTop>
                <button
                  onClick={() => {
                    popupToggleHandler(item.commitOid);
                  }}
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
                </button>
              </CommitContents>
            ))
          ) : (
            <div
              css={css`
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <p>검색 결과가 존재하지 않습니다.</p>
            </div>
          )}
        </CommitSearchBox>
      )}
    </>
  );
};

export default Commit;

import { css } from '@emotion/react';
import { SearchAlt } from 'emotion-icons/boxicons-regular';
import { SearchBox, SearchOutput, SearchWrapper } from './search.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../message/Message';

type SearchProps = {
  outputBox: boolean;
  redirectTo?: string;
};

const Search: React.FC<SearchProps> = ({ outputBox, redirectTo }: SearchProps): JSX.Element => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const navigate = useNavigate();
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  /**
   *
   * @param e
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    if (outputBox) {
      setChangeFlag(() => {
        if (newKeyword.length <= 0) {
          return false;
        }

        return true;
      });
    }
  };

  /**
   *
   * @returns
   */
  const onSearchHandler = () => {
    if (keyword === null) {
      return <Message msg={'입력해주세요.'} />;
    }

    return redirectTo
      ? navigate(`${redirectTo}/${keyword}`, {
          state: { keyword: keyword },
        })
      : null;
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <input
          css={css`
            width: 80%;
          `}
          placeholder='Enter Github Email...'
          type='text'
          onChange={onChangeHandler}
        />
        <button
          css={css`
            width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          onClick={onSearchHandler}
        >
          <SearchAlt height='2rem' />
        </button>
      </SearchBox>
      {outputBox && (
        <SearchOutput show={changeFlag}>
          <p
            css={css`
              font-size: 1.5rem;
              color: #189bfa;
            `}
          >
            {keyword}
          </p>
        </SearchOutput>
      )}
    </SearchWrapper>
  );
};

export default Search;

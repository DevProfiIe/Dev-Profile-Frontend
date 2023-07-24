import { css } from '@emotion/react';
import { SearchAlt } from 'emotion-icons/boxicons-regular';
import { SearchBox, SearchOutput, SearchWrapper } from './search.styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { change } from '~/redux/features/searchSlice';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
  outputBox: boolean;
  redirectTo?: string;
};

const Search: React.FC<SearchProps> = ({ outputBox, redirectTo }: SearchProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const keyword = useAppSelector((state) => state.search.keyword);
  const navigate = useNavigate();
  const [changeFlag, setChangeFlag] = useState(false);

  /**
   *
   */
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    dispatch(change(newKeyword));

    setChangeFlag(() => {
      if (newKeyword.length <= 0) {
        return false;
      }

      return true;
    });
  };

  const onNaviHandler = () => {
    return redirectTo ? navigate(redirectTo) : null;
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
          onChange={outputBox ? onChangeHandler : undefined}
        />
        <button
          css={css`
            width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          onClick={onNaviHandler}
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

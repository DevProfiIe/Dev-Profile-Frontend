/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';
import { HeaderUserImg, HeaderUserInfoWrapper, HeaderWrapper, HerderFont } from './header.styles';
import Commit from '../commit/Commit';
import useScroll from '~/hooks/useScroll';
import { UserGithubInfo } from '~/redux/api/types';
import { useEffect, useState } from 'react';
import logo from '~/assets/images/github.webp';

const Header: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const { scrollY } = useScroll();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);

  useEffect(() => {
    const storageData = localStorage.getItem('userInfo');

    if (storageData) {
      setUserInfo(JSON.parse(storageData));
    }
  }, []);

  return (
    <HeaderWrapper scrollPosition={scrollY}>
      <h1
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 0 0.2rem;
          height: 100%;
        `}
      >
        <p
          css={css`
            ${HerderFont}
          `}
        >
          DEV-PROFILE
        </p>
        <p
          css={css`
            width: 20px;
            height: 20px;
            background-image: url(${logo});
            background-size: contain;
            background-repeat: no-repeat;
            padding-bottom: 1.8rem;
          `}
        ></p>
      </h1>
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 0 2rem;
        `}
      >
        {location.pathname.includes('resume') ? <Commit /> : ''}
        {token ? (
          <HeaderUserInfoWrapper>
            <HeaderUserImg source={userInfo?.avatar_url} />
            <p>{userInfo?.login}</p>
          </HeaderUserInfoWrapper>
        ) : (
          <Link to='/auth/sign-in'>Sign in</Link>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;

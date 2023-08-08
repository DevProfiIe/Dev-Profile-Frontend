/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { getCookie, removeCookie } from '~/utils/cookie';
import {
  HeaderDropMenuWrapper,
  HeaderUserImg,
  HeaderUserInfoWrapper,
  HeaderWrapper,
  HerderFont,
} from './header.styles';
import Commit from '../commit/Commit';
import useScroll from '~/hooks/useScroll';
import { UserGithubInfo } from '~/redux/api/types';
import { useEffect, useState } from 'react';
import logo from '~/assets/images/github.png';

const Header: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const { scrollY } = useScroll();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  /**
   *
   */
  const handleLogout = () => {
    removeCookie('token');
    window.location.reload();
  };

  /**
   *
   */
  const handleDropMenu = () => {
    setIsShow((state) => !state);
  };

  useEffect(() => {
    const storageData = localStorage.getItem('userInfo');

    if (storageData) {
      setUserInfo(JSON.parse(storageData));
    }
  }, []);

  return (
    <HeaderWrapper scrollPosition={scrollY}>
      <Link
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 0 0.2rem;
          height: 100%;
        `}
        to='/'
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
            padding-bottom: 1.5rem;
          `}
        ></p>
      </Link>
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
          <div
            css={css`
              position: relative;
            `}
          >
            <HeaderUserInfoWrapper onClick={handleDropMenu}>
              <HeaderUserImg source={userInfo?.avatar_url} />
              <p>{userInfo?.login}</p>
            </HeaderUserInfoWrapper>
            {isShow && (
              <HeaderDropMenuWrapper>
                <button
                  css={css`
                    border-bottom: 1px solid #ececec;
                  `}
                >
                  My Page
                </button>
                <button onClick={handleLogout}>Logout</button>
              </HeaderDropMenuWrapper>
            )}
          </div>
        ) : (
          <Link to='/auth/sign-in'>Sign in</Link>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;

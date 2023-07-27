/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';
import { HeaderWrapper, HerderFont } from './header.styles';
import Commit from '../commit/Commit';

const Header: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  /**
   *
   */
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  return (
    <HeaderWrapper scrollPosition={scrollPosition}>
      <h1
        css={css`
          ${HerderFont}
        `}
      >
        TEAM 5
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
        {token ? 'Logout' : <Link to='/auth/sign-in'>Sign in</Link>}
      </div>
    </HeaderWrapper>
  );
};

export default Header;

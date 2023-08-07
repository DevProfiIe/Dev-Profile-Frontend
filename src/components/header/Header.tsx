/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';
import { HeaderWrapper, HerderFont } from './header.styles';
import Commit from '../commit/Commit';
import useScroll from '~/hooks/useScroll';

const Header: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const { scrollY } = useScroll();
  const location = useLocation();

  return (
    <HeaderWrapper scrollPosition={scrollY}>
      <h1
        css={css`
          ${HerderFont}
        `}
      >
        DEV-PROFILE
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

/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '~/utils/cookie';
import { HeaderWrapper, HerderFont } from './header.styles';

const Header: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const [scrollPosition, setScrollPosition] = useState(0);

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
      <div>{token ? '로그아웃 ' : <Link to='/auth/sign-in'>Sign in</Link>}</div>
    </HeaderWrapper>
  );
};

export default Header;

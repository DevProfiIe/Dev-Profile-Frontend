/* Libraries & Hooks */
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { getCookie } from '~/utils/cookie';
import { Link, useNavigate } from 'react-router-dom';

/* Components */

/* Styles */
import githubIcon from '~/assets/images/github.png';
import {
  SignInBackground,
  SignInBox,
  SignInFloat,
  SignInMark,
  SignInWrapper,
} from './sginIn.styles';
import { showMessages } from '~/redux/features/popupSlice';
import { useAppDispatch } from '~/redux/store';

const CLIENT_ID = 'a990f185d45f796f1b7e';
const REDIRECT_URL = 'https://devprofile.store/auth/callback';
const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

const SignIn: React.FC = (): JSX.Element => {
  const token = getCookie('token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        showMessages({
          msg: '이미 로그인 상태입니다.',
          content: 'DevProfile Login Error',
          type: 'alert',
        }),
      );
      navigate('/');
    }
  }, []);

  return (
    <SignInWrapper>
      <SignInBackground />
      <SignInFloat>
        <SignInMark>DevProfile</SignInMark>
        <SignInBox>
          <h2
            css={css`
              font-weight: 600;
              font-size: 1.375rem;
              line-height: 120%;
              margin-bottom: 3rem;
            `}
          >
            Sign In to DevProfile
          </h2>
          <Link
            css={css`
              background: rgb(248, 248, 247);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 1rem;
              border-radius: 0.5rem;
              transition: all 0.2s ease 0s;
              height: 2.5rem;
              width: 100%;
            `}
            to={GITHUB_URL}
          >
            <img
              src={githubIcon}
              alt='github'
              css={css`
                height: 70%;
                margin-right: 0.5rem;
              `}
            />
            <div
              css={css`
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1;
                color: rgb(1, 5, 27);
              `}
            >
              Continue with Github
            </div>
            <div
              css={css`
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1;
                color: rgb(14, 51, 255);
                margin-left: 0.25rem;
              `}
            >
              →
            </div>
          </Link>
        </SignInBox>
        {/* <SignInFooter>this is footer</SignInFooter> */}
      </SignInFloat>
    </SignInWrapper>
  );
};

export default SignIn;

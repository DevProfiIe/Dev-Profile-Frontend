import { css } from '@emotion/react';
import styled from '@emotion/styled';
import backgroundImage from '~/assets/images/background1.png';
import githubIcon from '~/assets/images/github.png';

const SignIn = () => {
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
          <button
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
          </button>
        </SignInBox>
        <SignInFooter>this is footer</SignInFooter>
      </SignInFloat>
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SignInFloat = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  user-select: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const SignInBackground = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  user-select: none;
  background: url(${backgroundImage}) center / contain no-repeat;
  opacity: 0.75;
  animation: 3000ms ease 0s 1 normal none running anime1,
    1000ms ease 0s 1 normal none running anime2;

  @keyframes anime1 {
    0% {
      -webkit-mask: linear-gradient(
          90deg,
          rgb(0, 0, 0) 50%,
          rgba(0, 0, 0, 0.9) 60%,
          rgba(0, 0, 0, 0) 70%
        )
        100% 0px / 400% no-repeat;
    }
    100 % {
      -webkit-mask: linear-gradient(
          90deg,
          rgb(0, 0, 0) 50%,
          rgba(0, 0, 0, 0.9) 60%,
          rgba(0, 0, 0, 0) 70%
        )
        0px center / 400% no-repeat;
    }
  }

  @keyframes anime2 {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.75;
    }
  }
`;

const SignInMark = styled.div`
  width: 9.125rem;
  height: 2.5rem;
  background: rgb(248, 248, 247);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 4rem 0;
`;

const SignInBox = styled.div`
  min-width: 30.5rem;
  height: 24rem;
  padding: 2rem;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(219, 219, 215);
  border-radius: 1rem;
  box-shadow: rgba(92, 40, 0, 0.004) 0px 109px 106px, rgba(92, 40, 0, 0.008) 0px 45.5376px 44.2843px,
    rgba(92, 40, 0, 0.01) 0px 24.3466px 23.6765px, rgba(92, 40, 0, 0.01) 0px 13.6485px 13.2728px,
    rgba(92, 40, 0, 0.016) 0px 7.24861px 7.04911px, rgba(92, 40, 0, 0.02) 0px 3.01631px 2.93329px;
  align-self: stretch;
  margin: 4rem 0 7rem 0;
`;

const SignInFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
  margin: 3rem 0;
`;

export default SignIn;

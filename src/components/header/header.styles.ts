import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';

export const HeaderWrapper = styled.div<{ scrollPosition: number }>`
  width: ${({ scrollPosition }) => (scrollPosition > 50 ? '85%' : '80%')};
  height: 4rem;
  box-shadow: ${({ scrollPosition }) =>
    scrollPosition > 50 ? '0.3rem 0.3rem 0.6rem rgba(0, 0, 0, 0.1)' : 'none'};
  background-color: ${({ scrollPosition }) => (scrollPosition > 50 ? 'white' : 'none')};
  border-radius: ${({ scrollPosition }) => (scrollPosition > 50 ? '5rem' : '0')};
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
  padding: 0 1.3rem;
  position: fixed;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;

export const HerderFont = css`
  font-family: 'Bungee Shade', cursive;
  font-size: 2rem;
  background: linear-gradient(
    -45deg,
    #143cfd 25%,
    #4faae5 25%,
    #1a4bfc 50%,
    #1d4dfb 50%,
    #0526ff 75%,
    #0e34ff 75%,
    #189bfa
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 20px 20px;
  background-position: 0 0;
  animation: stripes 1s linear infinite;
  @keyframes stripes {
    100% {
      background-position: 20px 0, 20px 0, 20px 0;
    }
  }
`;

export const HeaderUserInfoWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0 0.5rem;
`;

export const HeaderUserImg = styled.div<{ source?: string }>`
  width: 35px;
  height: 35px;
  border-radius: 999px;
  background-color: white;
  background-image: url(${({ source }) => source});
  background-size: contain;
  border: 2px solid #ececec;
`;

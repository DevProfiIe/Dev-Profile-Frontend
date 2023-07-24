import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
`;

const BoxShadow = css`
  box-shadow: 0px 109px 106px rgb(92 40 0 / 1%), 0px 45.5376px 44.2843px rgb(92 40 0 / 1%),
    0px 24.3466px 23.6765px rgb(92 40 0 / 1%), 0px 13.6485px 13.2728px rgb(92 40 0 / 1%),
    0px 7.24861px 7.04911px rgb(92 40 0 / 1%), 0px 3.01631px 2.93329px rgb(92 40 0 / 2%),
    0 0 0 1px rgb(0 0 0 / 4%);
`;

const BorderRadius = css`
  border-radius: 1.5rem;
`;

export const SearchWrapper = styled.div`
  ${DisplayFlexColumn}
  width: auto;
  gap: 2rem 0;
  position: relative;
`;

export const SearchBox = styled.div`
  width: 24rem;
  height: 3rem;
  display: flex;
  flex-flow: row nowrap;
  background-color: hsla(146, 100%, 74%, 1);
  box-shadow: inset 0 0 0 1px #01051b0f;
  justify-content: space-between;
  border-radius: 999px;
  padding: 0 0.938rem;
  transition: all 0.25s ease 0s;
`;

export const SearchOutput = styled.div<{ show: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 3.5rem;
  width: ${({ show }) => (show ? '100%' : '')};
  max-height: 25rem;
  transition: all 0.5s ease;
  overflow: hidden;
  z-index: 99;
  background-color: ${color.blueCharcoal};
  ${BoxShadow}
  ${BorderRadius}
  ${DisplayFlexColumn}
`;

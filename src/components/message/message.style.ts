import { css } from '@emotion/react';
import styled from '@emotion/styled';

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
`;

const BorderSolid = css`
  border: 1px solid rgba(1, 5, 27, 0.07);
`;

const BorderRadius = css`
  border-radius: 1.5rem;
`;

const BoxShadow = css`
  box-shadow: 0px 109px 106px rgb(92 40 0 / 1%), 0px 45.5376px 44.2843px rgb(92 40 0 / 1%),
    0px 24.3466px 23.6765px rgb(92 40 0 / 1%), 0px 13.6485px 13.2728px rgb(92 40 0 / 1%),
    0px 7.24861px 7.04911px rgb(92 40 0 / 1%), 0px 3.01631px 2.93329px rgb(92 40 0 / 2%),
    0 0 0 1px rgb(0 0 0 / 4%);
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 99;
`;

export const MessageBoxWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  min-height: 25rem;
  z-index: 100;
  ${DisplayFlexColumn}
  ${BoxShadow}
  ${BorderRadius}
  ${BorderSolid}
`;

export const MessageBoxHeader = styled.div`
  ${DisplayFlexColumn}
  justify-content: center;
  align-items: center;
  height: 3rem;

  button {
    position: absolute;
    right: 5%;
  }
`;

export const MessageBoxContent = styled.div`
  height: 22rem;
  overflow: hidden;
  background-color: beige;
  padding: 1.3rem;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
`;

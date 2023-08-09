import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';

const DisplayFlexRow = css`
  display: flex;
  flex-flow: row nowrap;
`;

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
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
`;

export const MessageBoxWrapper = styled.div`
  ${DisplayFlexColumn}
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  height: 25rem;
  z-index: 100;
  background-color: beige;
  ${BoxShadow}
  ${BorderRadius}
  ${BorderSolid}
`;

export const MessageBoxHeader = styled.div`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  height: 2rem;
  background-color: white;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const MessageBoxContents = styled.div`
  height: 18rem;
  overflow: hidden;
  padding: 1.3rem;
  line-height: 134%;
  font-size: 1.2rem;
`;

export const MessageBoxFooter = styled.div`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 5rem;
  bottom: 10px;
  gap: 0 0.5rem;

  button {
    width: 100px;
    height: 50px;
    padding: 0.1rem 0;
    background-color: ${color.blueCharcoal};
    border-radius: 0.5rem;
    color: #ffffff80;

    &: hover {
      color: white;
    }
  }
`;

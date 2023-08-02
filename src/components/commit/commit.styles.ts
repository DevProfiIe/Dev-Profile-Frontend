import { css } from '@emotion/react';
import styled from '@emotion/styled';

const BoxShadow = css`
  box-shadow: 0px 109px 106px rgb(92 40 0 / 1%), 0px 45.5376px 44.2843px rgb(92 40 0 / 1%),
    0px 24.3466px 23.6765px rgb(92 40 0 / 1%), 0px 13.6485px 13.2728px rgb(92 40 0 / 1%),
    0px 7.24861px 7.04911px rgb(92 40 0 / 1%), 0px 3.01631px 2.93329px rgb(92 40 0 / 2%),
    0 0 0 1px rgb(0 0 0 / 4%);
`;

export const CommitWrapper = styled.div``;

export const CommitSearchBox = styled.div`
  position: fixed;
  top: 4.5rem;
  width: 30rem;
  max-height: 25rem;
  background-color: white;
  overflow: auto;
  border-radius: 1.5rem;
  ${BoxShadow}
`;

export const CommitContents = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.2rem;
  border-bottom: 1px solid #eee;
`;

export const CommitContentsTop = styled.div`
  width: 80%;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem 0;
`;

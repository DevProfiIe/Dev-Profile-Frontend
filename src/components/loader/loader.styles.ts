import { css } from '@emotion/react';
import styled from '@emotion/styled';

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 99;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  min-height: 25rem;
  z-index: 100;
  ${DisplayFlexColumn}
`;

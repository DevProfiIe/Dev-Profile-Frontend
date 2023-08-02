import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { boxShadow } from '~/styles/theme/primary';

const DisplayFlexRow = css`
  display: flex;
  flex-flow: row nowrap;
`;

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
`;

export const PopupBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  z-index: 99;
`;

export const PopupWrapper = styled.div`
  width: 50%;
  height: 550px;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 1.5rem;
  ${DisplayFlexColumn}
  ${boxShadow}
`;

export const PopupHeader = styled.div`
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #eee;
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    right: 1rem;
  }
`;

export const PopupContents = styled.div`
  width: 100%;
  height: 100%;
  ${DisplayFlexRow}
  justify-content: center;
`;

export const PopupContentsLeft = styled.div`
  width: 50%;
  background: blue;
  border-bottom-left-radius: 1.5rem;
`;

export const PopupContentsRight = styled.div`
  width: 50%;
  background: green;
  border-bottom-right-radius: 1.5rem;
`;

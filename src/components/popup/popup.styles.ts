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
  width: 1640px;
  height: auto;
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
  height: 50px;
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
  ${DisplayFlexRow}
  justify-content: flex-start;
  overflow: auto;
  position: relative;
  align-content: start;
`;

export const PopupFileWrapper = styled.div<{ selected: boolean }>`
  width: 100px;
  height: 100px;
  ${DisplayFlexColumn}
  justify-content:center;
  align-items: center;
  gap: 0.5rem 0;
  background-color: ${({ selected }) => (selected ? '#eee' : 'none')};

  p {
    width: 100px;
    max-height: 30px;
    text-align: center;
    overflow: hidden;
    user-select: none;
  }
`;

export const PopupSideView = css`
  padding: 0.2rem 0.3rem;
  overflow: auto;
  ${boxShadow};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PopupEditorWrapper = styled.div`
  width: 1340px;
  height: 800px;
  border-bottom-right-radius: 1.5rem;
`;

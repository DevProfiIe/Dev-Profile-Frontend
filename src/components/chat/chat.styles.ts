import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { boxShadow, color } from '~/styles/theme/primary';

const DisplayFlexRow = css`
  display: flex;
  flex-flow: row nowrap;
`;

// const DisplayFlexRowWrap = css`
//   display: flex;
//   flex-flow: row wrap;
// `;

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
`;

export const ChatBoxButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background-color: #189bfa;
  border-radius: 999px;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 200;
  ${boxShadow};
  ${DisplayFlexRow}
`;

export const ChatBoxContents = styled.button`
  box-shadow: rgba(255, 255, 255, 0.12) 0px 0px 2px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 2px 1px,
    rgba(0, 0, 0, 0.3) 0px 12px 60px;
  animation: 0.25s ease-out 0s 1 normal none running anime;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 370px;
  height: 80%;
  min-height: 520px;
  max-height: 680px;
  overflow: hidden;
  background-color: white;
  border-radius: 30px;
  z-index: 200;
  cursor: auto;
  ${DisplayFlexColumn}

  @keyframes anime 
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ChatBoxContentsHeader = styled.div`
  width: 100%;
  height: 4.5rem;
  background-color: rgba(239, 239, 240, 0.8);
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ChatBoxContentsMain = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  ${DisplayFlexColumn}
  gap : 2rem 0;
  overflow: auto;
`;

export const ChatContentsLeft = styled.div`
  width: 20rem;
  height: auto;
  padding: 0.5rem;
  ${DisplayFlexRow}
  gap: 0 0.5rem;
`;

export const ChatContentsRight = styled.div`
  width: 20rem;
  height: auto;
  padding: 0.5rem 0;
  ${DisplayFlexRow}
  gap: 0 0.5rem;
  align-self: flex-end;
`;

export const ChatProfile = styled.div`
  width: 10%;
  height: 100%;

  p {
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background-color: blue;
  }
`;

export const ChatBox = styled.div`
  width: 85%;
  height: auto;
  background-color: rgba(239, 239, 240, 0.8);
  border-radius: 5px;
  padding: 0.5rem;
  align-items: center;
  overflow: hidden;
  line-height: 120%;
  text-align: left;
`;

export const ChatBoxContentsInput = styled.div`
  width: 100%;
  height: 6rem;
  background-color: rgba(239, 239, 240, 0.8);
  padding: 2rem;
  ${DisplayFlexRow}
  align-items: center;
  justify-content: center;
  gap: 0 1rem;
`;

export const ChatRoomWrapper = styled.div`
  width: 100%;
  height: 5.5rem;
  ${DisplayFlexRow}
  justify-content: space-between;
  align-items: center;
  padding: 0 0.7rem;
  border-bottom: 1px solid ${color.keep};
`;

export const ChatRoomText = styled.div``;

export const ChatRoomEnterBtn = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  ${DisplayFlexRow};
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
`;

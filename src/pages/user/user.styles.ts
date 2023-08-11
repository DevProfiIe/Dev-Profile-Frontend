import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';

const DisplayFlexRow = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const DisplayFlexRowWrap = css`
  display: flex;
  flex-flow: row wrap;
`;

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const BoxShadow = css`
  box-shadow: 0px 109px 106px rgb(92 40 0 / 1%), 0px 45.5376px 44.2843px rgb(92 40 0 / 1%),
    0px 24.3466px 23.6765px rgb(92 40 0 / 1%), 0px 13.6485px 13.2728px rgb(92 40 0 / 1%),
    0px 7.24861px 7.04911px rgb(92 40 0 / 1%), 0px 3.01631px 2.93329px rgb(92 40 0 / 2%),
    0 0 0 1px rgb(0 0 0 / 4%);
`;

const BorderRadius = css`
  border-radius: 0.5rem;
`;

/* Components */

export const HeightBox = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
`;

export const UserWrapper = styled.div<{ height?: string }>`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: auto;
`;

export const UserContentWrapper = styled.div`
  ${DisplayFlexRow}
  justify-content: space-between;
  width: 80%;
  padding-left: 20rem;
  height: 100%;
  position: relative;
`;

export const UserSideView = styled.div`
  ${DisplayFlexColumn}
  width: 20rem;
  height: 85vh;
  border: 1px solid ${color.keep};
  background-color: white;
  position: fixed;
  top: 7rem;
  left: 10rem;
`;

export const UserMainWrapper = styled.div`
  ${DisplayFlexColumn}
  width: 100%;
  height: 100%;
`;

export const UserResumeWrapper = styled.div`
  ${DisplayFlexRowWrap}
  justify-content: flex-start;
  gap: 7rem 3rem;
  width: 100%;
  padding: 2.5rem 0.5rem;
  min-height: 50rem;
  overflow: auto;
`;

export const UserInfoBox = styled.div`
  ${DisplayFlexColumn}
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15rem;
  border-bottom: 1px solid #ececec;
`;

export const UserInfoImg = styled.div<{ bgUrl: string }>`
  width: 5rem;
  height: 5rem;
  border-radius: 999px;
  background-image: url(${({ bgUrl }) => bgUrl});
  background-size: contain;
  background-color: blue;
  margin: 1.5rem 0;
`;

export const UserInfoName = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const UserInfoContent = styled.div`
  ${DisplayFlexRow}
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  border-top: 1px solid #ececec;

  button {
    ${DisplayFlexRow}
    align-items: center;
    width: 50%;
  }
`;

export const UserReceiveWrapper = styled.div`
  ${DisplayFlexColumn}
  width: 100%;
  height: calc(100% - 15rem);
`;

export const UserReceiveItemWrapper = styled.div`
  ${DisplayFlexColumn}
  width: 100%;
  height: calc(100% - 2rem);
  gap: 1rem 0;
  padding: 0.5rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserReceiveItem = styled.div<{ isSelected: boolean }>`
  ${DisplayFlexRow}
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 10rem;
  border-bottom: 1px solid #eee;
  background-color: ${({ isSelected }) => (isSelected ? color.aquaMarine : '')};
  ${BorderRadius}
  ${BoxShadow}

  div: nth-of-type(2) {
    width: 25%;
    justify-content: center;
    align-items: center;
    ${DisplayFlexRow}
  }
`;

export const UserReceiveItemText = styled.div`
  ${DisplayFlexColumn}
  width: 75%;
  height: 100%;
  justify-content: space-between;
  gap: 2rem 0;
  padding: 1.5rem 0 1.5rem 0.7rem;
`;

export const UserFilterTag = styled.div`
  ${DisplayFlexRow}
  min-width: 50px;
  height: 25px;
  padding: 1.25rem 1rem;
  background-color: #189bfa;
  color: white;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export const UserConfirmBtn = styled.div<{ bgColor?: string }>`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  width: 90px;
  padding: 0.5rem 0;
  background-color: ${({ bgColor }) => bgColor};
  font-size: 0.75rem;
  color: white;
  ${BoxShadow}
`;

export const UserConfirmInSideWrapper = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  height: 2.5rem;
  gap: 0 0.5rem;

  button {
    padding: 0.5rem 1.5rem;
    border: 1px solid #ececec;
    border-radius: 4px;
  }
`;

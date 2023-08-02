/* CSS */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';
import backgroundImage from '~/assets/images/Logo1.jpg';

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
  border-radius: 1.5rem;
`;

/* Components */

export const HeightBox = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
`;

export const GallaryWrapper = styled.div<{ height?: string }>`
  ${DisplayFlexColumn}
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export const GallaryFilterWrapper = styled.div`
  ${DisplayFlexColumn}
  align-items: flex-start;
  justify-content: center;
  gap: 2rem 0;
  width: 80%;
  height: 10rem;
`;

export const GallaryFilterBox = styled.div`
  width: auto;
  padding: 0.6rem 1.5rem;
  border: 1px solid #ececec;
  border-radius: 5px;
  position: relative;
`;

export const StackTag = styled.div<{ color?: string; border?: boolean }>`
  ${BoxShadow}
  ${BorderRadius}
  ${DisplayFlexRow}
  align-items: center;
  min-width: 3.438rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  padding: 0 0.7rem;
  border: ${({ border }) =>
    border ? `1px solid ${color.myBlue}` : `1px solid rgba(1, 5, 27, 0.07);`};
  transition: 0.2s;
`;

export const GallaryContentsWrapper = styled.div`
  ${DisplayFlexRowWrap}
  justify-content: center;
  gap: 10rem 7rem;
  width: 80%;
  padding: 2rem 0;
  //   background-color: blue;
`;

export const GallaryItem = styled.div`
  width: 20rem;
  height: 25rem;
  border: 1px solid rgba(1, 5, 27, 0.07);
  background: #fff;
  ${BoxShadow}
  ${BorderRadius}
`;

export const GallaryItemInBox = styled.div<{ index: number }>`
  width: 25rem;
  min-height: 20rem;
  border: 1px solid rgba(1, 5, 27, 0.07);
  position: absolute;
  z-index: ${({ index }) => index};
  left: 0;
  top: 0;
  transition: 0.3s;
  background: #fff;
  transform: translateX(${({ index }) => index * 10}%);
  ${BoxShadow}
  ${BorderRadius}

  &: hover {
    transform: translateY(-5%);
  }
`;

export const GallaryImage = styled.div`
  width: 100%;
  height: 12.5rem;
  background-image: url(${backgroundImage});
  background-size: contain;
  ${BorderRadius}
`;

export const GallaryTextBox = styled.div`
  ${DisplayFlexRow}
  ${BorderRadius}
  width: 100%;
  height: 12.5rem;
  justify-content: space-between;
`;

export const GallaryTextLeft = styled.div`
  ${DisplayFlexColumn}
  align-items: flex-start;
  width: 70%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

export const GallaryBtn = styled.div`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: flex-end;
  width: 28%;
  height: 100%;
`;

export const GallaryContactBox = styled.div<{ isShow: boolean }>`
  ${DisplayFlexRow}
  align-items: center;
  width: 100%;
  height: 22rem;
  position: fixed;
  bottom: ${({ isShow }) => (isShow ? 0 : '-22rem')};
  left: 0;
  background-color: ${color.keep};
  transition: 0.5s all;
  ${BoxShadow}
`;

export const GallaryDropBox = styled.div`
  ${DisplayFlexRow}
  align-items: center;
  width: 80%;
  height: 90%;
  padding: 2rem;
  position: relative;
`;

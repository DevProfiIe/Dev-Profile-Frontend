/* CSS */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { boxShadow, color } from '~/styles/theme/primary';
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
  flex-flow: column wrap;
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
  z-index: 2;

  &: hover {
    background-color: #ececec;
  }
`;

export const GallaryFilterContent = styled.div<{ gap: string }>`
  ${DisplayFlexRow}
  align-items: center;
  gap: ${({ gap }) => gap};
`;

export const GallaryFilterBtnWrapper = styled.div`
  ${DisplayFlexRow};
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 999px;
  border: 1px solid #ececec;

  &: hover {
    border: 1px solid #aaa;
    transition: 0.3s;
  }
`;

export const StackTag = styled.div<{ color?: string; isSelected?: boolean }>`
  ${BoxShadow}
  ${BorderRadius}
  ${DisplayFlexRow}
  align-items: center;
  min-width: 3.438rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color ? 'white' : 'black')};
  padding: 0 0.7rem;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${color.myBlue}` : `2px solid rgba(1, 5, 27, 0.07);`};
  transition: 0.2s;
  font-size: 1.5rem;
  position: relative;
`;

export const GallaryContentsWrapper = styled.div`
  ${DisplayFlexRowWrap}
  justify-content: flex-start;
  width: 80%;
  padding-bottom: 5rem;
  gap: 10rem 5%;
  //   background-color: blue;
`;

export const GallaryItem = styled.div<{ selected: boolean }>`
  width: 30%;
  min-height: 25.5rem;
  border: 1px solid rgba(1, 5, 27, 0.07);
  background: #fff;
  border-radius: 0.5rem;
  outline: ${({ selected }) => (selected ? '#189bfa 2px solid' : '')};
  ${BoxShadow};
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

export const GallaryTextLeft = styled.div`
  ${DisplayFlexColumn}
  align-items: flex-start;
  width: 70%;
  height: 100%;
  padding: 0.5rem 1rem;
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

export const GallaryHeader = styled.div`
  ${DisplayFlexRow}
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 80px;
  background-color: #eee;
  padding-right: 1rem;
  position: relative;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

export const GallaryContent = styled.div`
  padding: 1rem 2rem;
  position: relative;
`;

export const GallaryItemImg = styled.div<{ imgUrl: string }>`
  width: 7.5rem;
  height: 7.5rem;
  position: absolute;
  border-radius: 999px;
  top: -55px;
  left: 10%;
  border: 3px solid ${color.mintGreen};
  background-image: url(${({ imgUrl }) => (imgUrl ? imgUrl : backgroundImage)});
  background-size: contain;
  background-position: center center;
  z-index: 1;
`;

export const GallaryItemText = styled.div`
  ${DisplayFlexRowWrap}
  align-content: flex-start;
  min-width: 70px;
  height: 5rem;
  gap: 0.2rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GallaryTag = styled.div`
  min-width: 50px;
  height: 25px;
  padding: 0.5rem 1rem;
  background-color: #189bfa;
  color: white;
  border-radius: 999px;
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`;

export const GallaryDetails = styled.div`
  ${DisplayFlexRow}
  justify-content: space-around;
  margin-bottom: 2rem;

  div {
    ${DisplayFlexColumn}
    width: 33.3%;
  }
`;

export const GallaryBtnWrapper = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  justify-content: center;
  transition: 0.2s;
`;

export const GallaryBtn = styled.div<{ bgColor: string }>`
  ${DisplayFlexRow}
  justify-content: center;
  align-items: center;
  width: 90px;
  padding: 0.5rem 0;
  background-color: ${({ bgColor }) => bgColor};
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  ${BoxShadow}
`;

export const GallaryFilterDropMenu = styled.div<{ width: string; height: string }>`
  display: flex;
  flex-flow: column wrap;
  gap: 0rem 0.5rem;
  padding: 1rem 1rem;
  position: absolute;
  width: ${({ width }) => width};
  min-height: ${({ height }) => height};
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid rgba(1, 5, 27, 0.07);
  left: 0;
  top: 120%;
  z-index: 3;
  ${boxShadow}
`;

export const ScrollBtn = styled.button`
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
  justify-content: center;
  align-items: center;
  color: white;
`;

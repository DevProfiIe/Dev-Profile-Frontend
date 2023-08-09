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
  flex-flow: column wrap;
  align-items: center;
`;

const BoxShadow = css`
  box-shadow: 0px 109px 106px rgb(92 40 0 / 1%), 0px 45.5376px 44.2843px rgb(92 40 0 / 1%),
    0px 24.3466px 23.6765px rgb(92 40 0 / 1%), 0px 13.6485px 13.2728px rgb(92 40 0 / 1%),
    0px 7.24861px 7.04911px rgb(92 40 0 / 1%), 0px 3.01631px 2.93329px rgb(92 40 0 / 2%),
    0 0 0 1px rgb(0 0 0 / 4%);
`;

export const CardItem = styled.div<{ selected?: boolean }>`
  width: 30%;
  height: 25rem;
  border: 1px solid rgba(1, 5, 27, 0.07);
  background: #fff;
  border-radius: 0.5rem;
  outline: ${({ selected }) => (selected ? '#189bfa 2px solid' : '')};
  ${BoxShadow};
`;

export const CardHeader = styled.div`
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

export const CardContent = styled.div`
  padding: 1rem 2rem;
  position: relative;
`;

export const CardItemImg = styled.div<{ imgUrl: string }>`
  width: 7.5rem;
  height: 7.5rem;
  position: absolute;
  border-radius: 999px;
  top: -55px;
  left: 22px;
  border: 3px solid ${color.mintGreen};
  background-image: url(${({ imgUrl }) => (imgUrl ? imgUrl : backgroundImage)});
  background-size: contain;
  background-position: center center;
  z-index: 1;
`;

export const CardItemText = styled.div`
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

export const CardTag = styled.div`
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

export const CardDetails = styled.div`
  ${DisplayFlexRow}
  justify-content: space-around;
  margin-bottom: 2rem;

  div {
    ${DisplayFlexColumn}
    width: 33.3%;
  }
`;

export const CardBtnWrapper = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  justify-content: center;
  transition: 0.2s;
`;

export const CardBtn = styled.div<{ bgColor: string }>`
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

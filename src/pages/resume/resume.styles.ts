import { css } from '@emotion/react';
import styled from '@emotion/styled';
import backgroundImage from '~/assets/images/background3.webp';
import backgroundImage2 from '~/assets/images/twirl.7dde194b.webp';
import { color } from '~/styles/theme/primary';

/* CSS */

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

export const ResumeWrapper = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : 'auto')};
`;

export const ResumeSection = styled.div<{ background?: boolean; height?: string }>`
  ${DisplayFlexColumn}
  width: 100%;
  height: ${({ height }) => (height ? height : 'auto')};
  background-image: ${({ background }) => (background ? `url(${backgroundImage});` : '')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 90%;
`;

export const ResumeTagBox = styled.div`
  ${DisplayFlexRowWrap}
  justify-content: center;
  gap: 0.5rem 1rem;
  width: 30rem;
  height: auto;
`;

export const ResumeTag = styled.div<{ color: string; border?: string }>`
  ${BoxShadow}
  ${BorderRadius}
  ${DisplayFlexRow}
  align-items: center;
  min-width: 3.438rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  padding: 0 0.7rem;
  border: ${({ border }) => (border === 'none' ? '' : `1px solid ${color.aquaMarine}`)};
  transition: 0.2s;

  &: hover {
    transform: translateY(-10%);
  }
`;

export const ResumeChartBox = styled.div`
  ${DisplayFlexRowWrap}
  ${BorderRadius}
  justify-content: center;
  width: 80%;
  height: 90%;
  gap: 0 5rem;
`;

export const ResumeLeftContents = styled.div`
  ${DisplayFlexColumn}
  ${BorderRadius}
  ${BoxShadow}
  justify-content: space-between;
  width: 45%;
  background-color: ${color.white};
`;

export const ResumeLeftTextBox = styled.div`
  ${DisplayFlexColumn}
  width: 100%;
  height: 50%;
  padding: 2rem 1.5rem;
  justify-content: center;
  gap: 2rem;
  overflow: hidden;
`;

export const ResumeLeftTextDetail = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  height: 2.5rem;

  p: nth-of-type(1) {
    width: 30%;
    font-weight: 700;
  }

  p: nth-of-type(2) {
    ${DisplayFlexRowWrap}
    width: 70%;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ResumeRightContents = styled.div`
  ${DisplayFlexColumn}
  width: 45%;
  height: 100%;
  justify-content: space-between;
`;

export const ResumeHashTagWrapper = styled.div`
  ${BoxShadow}
  ${BorderRadius}
  ${DisplayFlexRowWrap}
  width: 100%;
  height: 48%;
  padding: 1.2rem;
  background-color: #fff;
  background-image: url(${backgroundImage2});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ResumeTimeLineWrapper = styled.div`
  ${BoxShadow}
  ${BorderRadius}
  width: 100%;
  height: 48%;
  background-color: #fff;
  position: relative;
`;

export const ResumeRepoWrapper = styled.div`
  ${DisplayFlexColumn}
  width: 100%;
  height: 100vh;
  background: ${color.blueCharcoal};
  position: sticky;
  top: 0;
  z-index: 100;
  overflow: hidden;
`;

export const ResumeRepoText = styled.div`
  width: 80%;
  margin-top: 5.5rem;
  user-select: none;
  color: hsla(146, 100%, 74%, 1);
  font-size: 95px;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-variant: tabular-nums;
`;

export const ResumeRepoSvgbox = styled.div<{ position: number }>`
  ${DisplayFlexRow}
  width: max-content;
  height: auto;
  overflow: auto;
  position: absolute;
  left: 0;
  top: 15.5rem;
  transform: translateX(-${({ position }) => position * 0.01 + 'px'});
  transition: 0.1s translate linear;
  overflow: hidden;
`;

export const ResumeRepoContainer = styled.div`
  ${DisplayFlexRow}
  gap: 0 0.2rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 25.5rem;
  color: #black;
`;

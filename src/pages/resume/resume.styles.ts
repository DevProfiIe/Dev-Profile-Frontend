import { css } from '@emotion/react';
import styled from '@emotion/styled';
import backgroundImage from '~/assets/images/background3.png';
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
  align-content: flex-start;
`;

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
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

export const ResumeWrapper = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  height: auto;
  padding: 2rem 0;
  background-color: #fbf8f4;
  background-image: url(${backgroundImage});
  background-size: cover;
`;

export const ResumeContent = styled.div`
  max-width: 80%;
  height: inherit;
  background: #fff;
  padding: 2rem 0;
  ${DisplayFlexColumn}
  ${BoxShadow}
  ${BorderRadius}
`;

export const ResumeHeader = styled.p`
  font-size: 2.5rem;
`;

export const ResumeSection = styled.div<{ height: string; direction: string; width: string }>`
  ${({ direction }) => (direction === 'row' ? DisplayFlexRow : DisplayFlexColumn)}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  justify-content: space-between;
  gap: 2rem 0;
`;

export const ResumeChart = styled.div`
  width: 48%;
`;

export const ResumeTags = styled.div`
  ${DisplayFlexRowWrap}
  padding: 5rem 0;
  width: 48%;
`;

export const TagKeyword = styled.div`
  width: auto;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.625rem;
  border-radius: 999px;
  background-color: beige;
  margin: 0 0.625rem 0.625rem 0;
  ${BoxShadow}
`;

export const HeightBox = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
`;

export const Repasitory = styled.div`
  ${DisplayFlexColumn}
  align-items: flex-start;
  width: 90%;
  height: auto;
  padding: 2rem 5rem;
  gap: 3rem 0;
  ${BorderRadius}

  background-color: #fbf8f4;
  ${BoxShadow}
`;

export const ResumeSearchWrapper = styled.div`
  ${DisplayFlexColumn}
  width: auto;
  gap: 2rem 0;
  position: relative;
`;

export const ResumeSearchBox = styled.div`
  ${DisplayFlexRow}
  width: 100%;
  gap: 0 3rem;
  align-items: center;
  height: 3rem;
`;

export const ResumeSearchInput = styled.div`
  ${DisplayFlexRow}
  justify-content:space-between;
  background: ${color.aquaMarine};
  width: 100%;
  height: 100%;
  border-radius: 999px;
  ${BoxShadow}

  input {
    width: 90%;
    border-radius: 999px;
    text-indent: 1.5rem;
  }

  button {
    width: 10%;
    border-radius: 999px;
  }
`;

export const RepasitoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const RepasitoryContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem 0;
  width: 45%;
`;

export const RepasitoryDetails = styled.div`
  ${DisplayFlexColumn}
  align-items: start;
  gap: 2rem 0;
`;

export const SkillsBox = styled.div`
  ${DisplayFlexRow}
  gap: 0 2rem;
`;

export const ChartWrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

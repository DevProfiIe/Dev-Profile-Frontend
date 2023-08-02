import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from '~/styles/theme/primary';

/* CSS */

const DisplayFlexRow = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
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

export const HeightBox = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
`;

export const RepasitoryBox = styled.div<{ index: number; nowRepo: boolean }>`
  width: ${({ nowRepo }) => (nowRepo ? '1000px' : '35px')};
  height: 35.5rem;
  opacity: ${({ nowRepo }) => (nowRepo ? '1' : '0.5')};
  background-color: ${color.myBiolet};
  ${BorderRadius};
  ${BoxShadow};
  transition: 0.5s all ease;
  // transform: translate(-50%, -30%);
`;

export const RepasitoryWrapper = styled.div<{ nowRepo: boolean }>`
  width: 100%;
  height: 55rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const RepasitoryContents = styled.div`
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

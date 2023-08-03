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

export const RepositoryBox = styled.div<{ index: number; nowRepo: boolean }>`
  width: ${({ nowRepo }) => (nowRepo ? '55.75rem' : '2.188rem')};
  height: 25.5rem;
  opacity: ${({ nowRepo }) => (nowRepo ? '1' : '0.3')};
  background-color: ${color.keep};
  border-radius: ${({ nowRepo }) => (nowRepo ? '1.5rem' : '0')};
  ${BoxShadow};
  transition: 0.1s all ease;
  transform: ${({ nowRepo }) => (nowRepo ? 'scale(1.1)' : 'scale(0.8)')};
  overflow: hidden;
`;

export const RepositoryWrapper = styled.div<{ nowRepo?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: ${({ nowRepo }) => (nowRepo ? '1' : '0')};
  padding: 2.5rem;
`;

export const RepositorySkills = styled.div`
  ${DisplayFlexRow}
  height: 2.5rem;
  align-items: center;
  gap: 0 0.5rem;

  p {
    width: 2rem;
    height: 2rem;
  }
`;

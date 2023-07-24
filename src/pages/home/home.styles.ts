import styled from '@emotion/styled';
import { font } from '~/styles/theme/primary';

export const HomeWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 9.375rem);
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  font-family: ${font.fontFamily};
  font-weight: 500;
`;

export const HomeBox = styled.div`
  width: 100%;
  top: 8rem;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 7rem;
  position: absolute;
  z-index: 3;
  letter-spacing: -0.04em;
`;

export const BackgroundImage = styled.div<{ zIndex: number; img: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${({ img }) => img}) left 74% / contain no-repeat;
  z-index: ${({ zIndex }) => zIndex};
`;

export const HeightBox = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
`;

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color, font } from '~/styles/theme/primary';

const DisplayFlexColumn = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const BoxShadow = css`
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.14), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.10064),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.083455), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.07),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.056545), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0393604);
`;

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  font-family: ${font.mainFont};
  font-weight: 500;
`;

export const HomeSearchBox = styled.div`
  position: absolute;
  width: 100%;
  top: 3rem;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 7rem;
  letter-spacing: -0.04em;
  z-index: 3;
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

export const HomeSection = styled.div`
  width: 100%;
  height: auto;
`;

export const HomeParagragh = styled.div`
  ${DisplayFlexColumn}

  p {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 134%;
    letter-spacing: 0.05rem;
  }
`;

export const HomeText = styled.div`
  opacity: 0.16;
  white-space: nowrap;
  color: #01051b8f;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 134%;
  letter-spacing: 0.05rem;
`;

export const HomeContentsBox = styled.div`
  ${DisplayFlexColumn}
  justify-content: space-between;
  width: 500px;
  height: 21rem;
  padding: 2rem;
  background-color: ${color.blueCharcoal};
  border-radius: 32px;
  border: 1px solid rgba(1, 5, 27, 0.07);
  ${BoxShadow};
`;

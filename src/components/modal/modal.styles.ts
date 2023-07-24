import styled from '@emotion/styled';

export const ModalWrapper = styled.div<{ width: string; height: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #189bfa;
  z-index: 4;
`;

export const ModalContent = styled.div``;

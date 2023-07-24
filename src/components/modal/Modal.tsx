import styled from '@emotion/styled';
import React from 'react';
import { ModalContent, ModalWrapper } from './modal.styles';

type ModalProps = {
  width: string;
  height: string;
};

const Modal: React.FC<ModalProps> = ({ width, height }: ModalProps): JSX.Element => {
  return (
    <ModalWrapper width={width} height={height}>
      <ModalContent></ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

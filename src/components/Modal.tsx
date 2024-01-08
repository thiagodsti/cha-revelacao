// Modal.js
import React from "react";
import styled, { keyframes, css } from "styled-components";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledModal = styled.div<ModalProps>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div<ModalProps>`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 50%;
  animation: ${({ show }) =>
    show &&
    css`
      ${slideDown} 0.5s ease forwards
    `};
`;

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
}

function Modal({ show, children }: ModalProps) {
  return (
    <StyledModal show={show}>
      <ModalContent show={show}>{children}</ModalContent>
    </StyledModal>
  );
}

export default Modal;

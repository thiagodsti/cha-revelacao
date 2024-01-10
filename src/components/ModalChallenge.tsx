import styled from "styled-components";
import Modal from "./Modal";

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  display: flex;
  position: relative;
  align-items: end;
  justify-content: end;
  padding: 10rem;
`;

interface ModalChallengeProps {
  show: boolean;
  onClick: () => void;
}
function ModalChallenge({ show, onClick }: ModalChallengeProps) {
  return (
    <Modal show={show}>
      <ModalContainer
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="questions/challenge.jpg" />
        <CloseButton onClick={onClick}>X</CloseButton>
      </ModalContainer>
    </Modal>
  );
}
export default ModalChallenge;

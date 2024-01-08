import { useState, useEffect } from "react";
import Modal from "./Modal";
import styled from "styled-components";

interface ModalTrollProps {
  show: boolean;
}

interface BlinkTextProps {
  counterValue: number;
}

const BlinkText = styled.p<BlinkTextProps>`
  font-size: 10em;
  text-align: center;
  animation: blinker 1.5s linear infinite;
  margin: 0;
  color: ${({ counterValue }) => {
    switch (counterValue) {
      case 1:
        return "#800080";
      case 2:
        return "#0000FF";
      case 3:
        return "#FFC0CB";
      default:
        return "#000";
    }
  }};
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

function ModalTroll({ show }: ModalTrollProps) {
  const [counter, setCounter] = useState(3);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (show && counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1500);
      return () => clearTimeout(timer);
    } else if (show && counter === 0) {
      setShowMessage(true);
      setTimeout(() => {
        window.location.href = "/tictactoe";
      }, 3000);
    }
  }, [show, counter]);

  return (
    <Modal show={show}>
      <CenteredContent>
        {!showMessage ? (
          <BlinkText counterValue={counter}>{counter}</BlinkText>
        ) : (
          <>
            <p>Acharam que seria tão fácil assim?</p>
            <img src="trollface.png" alt="Troll Face"></img>
          </>
        )}
      </CenteredContent>
    </Modal>
  );
}

export default ModalTroll;

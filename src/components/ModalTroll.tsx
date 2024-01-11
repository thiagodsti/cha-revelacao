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
  font-size: 30em;
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

const P = styled.p`
  font-size: 5rem;
  text-align: center;
  margin: 0;
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
      }, 5000);
    }
  }, [show, counter]);

  return (
    <Modal show={true}>
      <CenteredContent>
        {!showMessage ? (
          <div style={{
            height: '500px',
            width: '500px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <BlinkText counterValue={counter}>{counter}</BlinkText>
          </div>
        ) : (
          <>
            <P>Did you really think it was going to be that easy?</P>
            <img src="trollface.png" alt="Troll Face"></img>
          </>
        )}
      </CenteredContent>
    </Modal>
  );
}

export default ModalTroll;

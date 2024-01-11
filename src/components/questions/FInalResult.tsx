import { useState } from "react";
import ModalTroll from "../ModalTroll";
import styled from "styled-components";

const Button = styled.button`
  background-color: #c6a969;
  color: #ffffec;
  padding: 20px 30px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  transition: background-color 0.3s, color 0.3s;
  latter-spacing: 4px;
  &:hover {
    background-color: #e6e6d3;
    color: #000000;
  }
`;

interface FinalResultProps {
  totalCorrect: number;
  totalQuestions: number;
}
function FinalResult({ totalCorrect, totalQuestions }: FinalResultProps) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <div style={{ textAlign: "center", width: "80%" }}>
      {totalCorrect > totalQuestions * 0.7 && (
        <>
          <p className="fade-in-message" style={{ fontWeight: "bold" }}>
            Congratulations,
          </p>
          <p className="fade-in-message">
            It looks like you won't require our assistance!
            <img src="party-blower.png" width={"40px"} height={"40px"} style={{marginLeft: '10px'}} />
          </p>
        </>
      )}
      {totalCorrect <= totalQuestions * 0.7 &&
        totalCorrect > totalQuestions * 0.3 && (
          <p className="fade-in-message">
            You're almost there. Our assistance is still necessary!
            <img src="confused.png" width={"40px"} height={"40px"} style={{marginLeft: '10px', marginTop: '10px'}} />

          </p>
        )}
      {totalCorrect <= totalQuestions * 0.3 && (
        <p className="fade-in-message">
          Oh no, it looks like we'll be frequenting this place more often.
          <img src="omg.png" width={"40px"} height={"40px"} style={{marginLeft: '10px', marginTop: '10px'}} />
        </p>
      )}
      <p style={{fontSize: '2rem', padding: '20px'}}>
        You correctly answer {totalCorrect} out of the {totalQuestions}{" "}
        questions
      </p>
      <Button onClick={handleOpenModal}>Gender reveal</Button>
      <ModalTroll show={showModal} />
    </div>
  );
}

export default FinalResult;

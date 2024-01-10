import { useState } from "react";
import ModalTroll from "../ModalTroll";
import styled from "styled-components";

const Button = styled.button`
  background-color: #f5f5dc;
  color: #333333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block; 
  transition: background-color 0.3s, color 0.3s;

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
    <div>
      <div className="fade-in-message">
        Você acertou {totalCorrect} de {totalQuestions} questões
      </div>
      {totalCorrect > totalQuestions * 0.7 && (
        <div className="fade-in-message">
          Parabéns vocês não vão precisar de nós!
        </div>
      )}
      {totalCorrect <= totalQuestions * 0.7 &&
        totalCorrect > totalQuestions * 0.3 && (
          <div className="fade-in-message">
            Estão na média, mas ainda precisam de nós!
          </div>
        )}
      {totalCorrect <= totalQuestions * 0.3 && (
        <div className="fade-in-message">
          Pessoal vamos ter que vir aqui mais vezes.
        </div>
      )}
      <Button style={{
        textAlign: "center",
      }} onClick={handleOpenModal}>Ver sexo do bebê</Button>
      <ModalTroll show={showModal} />
    </div>
  )
}

export default FinalResult
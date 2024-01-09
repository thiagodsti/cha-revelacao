import styled, { css, keyframes } from "styled-components";
import { Question, QuestionOption } from "../../pages/QuizPage";
import { useEffect, useState } from "react";

const QuestionContainer = styled.div`
  padding: 20px;
  margin-left: 10rem;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 60rem;
`;

const Option = styled.li`
  display: flex;
  align-items: baseline;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    border-width: 2px;
    box-shadow: 0 0 10px gray;
    border-radius: 10px;
  }
`;

const Question = styled.p`
  font-size: 3rem;
  margin: 0;
  color: #d89d75;
  font-weight: bold;
`;

const OptionKey = styled.p`
  font-size: 2rem;
  color: #f2c3a8;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const OptionText = styled.p`
  font-size: 1.6rem;
  color: #333;
`;

const Options = styled.ul`
  list-style: none;
  padding: 0;
`;

const blinkEffect = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Styled component para a Imagem que vai piscar e alternar entre duas imagens
const AnimatedImage = styled.img<{ blink: boolean }>`
  width: 15rem;
  height: 15rem;
  animation: ${(props) =>
    props.blink
      ? css`
          ${blinkEffect} 0.5s step-start 0s infinite
        `
      : "none"};
  transition: opacity 0.5s ease-out;
`;

interface QuizProps {
  question: Question;
  selected?: Question;
  handleOptionSelect: (
    question: Question,
    optionSelected: QuestionOption
  ) => void;
}

const correct = "questions/correct.jpg";
const wrong = "questions/wrong.jpg";

const Quiz = ({ question, handleOptionSelect, selected }: QuizProps) => {
  const [imageToShow, setImageToShow] = useState<string>(wrong);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  useEffect(() => {
    if (selected) {
      setIsBlinking(true);

      // Começa a alternar as imagens rapidamente
      let blinkInterval = setInterval(() => {
        setImageToShow((prevImage) =>
          prevImage === correct ? wrong : correct
        );
      }, 500);

      // Diminui a velocidade da alternância após um tempo
      setTimeout(() => {
        clearInterval(blinkInterval);
        blinkInterval = setInterval(() => {
          setImageToShow((prevImage) =>
            prevImage === correct ? wrong : correct
          );
        }, 1500);
      }, 2000);

      // Para a animação e mostra a imagem final
      setTimeout(() => {
        clearInterval(blinkInterval);
        setIsBlinking(false);
        setImageToShow(selected.answer?.isCorrect ? correct : wrong);
      }, 4000);

      return () => clearInterval(blinkInterval);
    }
  }, [selected]);

  return (
    <QuestionContainer>
      <Question>{question.question}</Question>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "20rem",
            height: "20rem",
          }}
          src="questions/babies.jpg"
        />
        <Options>
          {question.options.map((option, index) => (
            <Option
              key={index}
              onClick={() => handleOptionSelect(question, option)}
              style={{
                borderColor:
                  selected && selected.answer?.key === option.key
                    ? "green"
                    : "white",
              }}
            >
              <OptionKey>{`${option.key} )`}</OptionKey>
              <OptionText>{option.option}</OptionText>
            </Option>
          ))}
        </Options>
        {selected && <AnimatedImage src={imageToShow} blink={isBlinking} />}
      </div>
    </QuestionContainer>
  );
};

export default Quiz;

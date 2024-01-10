import styled, { css, keyframes } from "styled-components";
import { Question, QuestionOption } from "../../pages/QuizPage";
import { useEffect, useState } from "react";

const QuestionContainer = styled.div`
  align-items: center;
  width: 70%;
  display: grid;
  height: 80vh;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 4rem;
  transition: background-color 0.3s ease;
  padding: 1rem;
  width: fit-content;

  &:hover {
    border-width: 2px;
    box-shadow: 0 0 10px gray;
    border-radius: 10px;
  }
`;

const OptionSelected = styled.li`
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: default;
  margin-top: 4rem;
  transition: background-color 0.3s ease;
  padding: 1rem;
  border-width: 2px;
  box-shadow: 0 0 10px gray;
  border-radius: 10px;
  width: fit-content;
`;

const Question = styled.p`
  font-size: 10rem;
  margin: 0;
  color: #d89d75;
  font-weight: bold;
`;

const OptionKey = styled.p`
  font-size: 7rem;
  color: #f2c3a8;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const OptionText = styled.p`
  font-size: 5.6rem;
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

const AnimatedImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !["blink"].includes(prop),
}) <{ blink: boolean }>`
  width: 15rem;
  height: 15rem;
  animation: ${(props) =>
    props.blink
      ? css`
          ${blinkEffect} 0.4s infinite
        `
      : "none"};
`;

interface QuizProps {
  question: Question;
  selected?: Question;
  handleOptionSelect: (
    question: Question,
    optionSelected: QuestionOption
  ) => void;
  onAnimationEnd: () => void;
  highlightCorrect?: boolean;
}

const correct = "questions/correct.jpg";
const wrong = "questions/wrong.jpg";
const maxAnimationTime = 4000;

const Quiz = ({
  question,
  handleOptionSelect,
  selected,
  onAnimationEnd,
  highlightCorrect = false,
}: QuizProps) => {
  const [imageToShow, setImageToShow] = useState<string>(wrong);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  useEffect(() => {
    if (selected) {
      setIsBlinking(true);

      const blinkInterval = setInterval(() => {
        setImageToShow((prevImage) =>
          prevImage === correct ? wrong : correct
        );
      }, 400);

      setTimeout(() => {
        clearInterval(blinkInterval);
        setIsBlinking(false);
        setImageToShow(selected.answer?.isCorrect ? correct : wrong);
        onAnimationEnd();
      }, maxAnimationTime);

      return () => clearInterval(blinkInterval);
    }
  }, [selected]);

  return (
    <QuestionContainer>
      <div style={{
        alignSelf: 'center',
        gridColumnStart: 1,
        gridColumnEnd: 2,
        gridRowStart: 2,
        gridRowEnd: 3,
        textAlign: 'end',
        width: 'fit-content',
        justifySelf: 'flex-end',
        height: 'inherit'
      }}>
        <img
          style={{
            height: '60%',
            paddingTop: '30%',
          }}
          src="questions/babies.jpg"
        />
      </div>
      <div style={{ gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 3 }}>
        <Question>{question.question}</Question>
        <Options>
          {question.options.map((option, index) => {
            const isSelected = selected && selected.answer?.key == option.key;
            const isCorrectHighlighted = highlightCorrect && option.isCorrect;

            let borderColor = "none";
            if (highlightCorrect) {
              if (option.isCorrect) {
                borderColor = "3px solid green";
              } else if (isSelected && !option.isCorrect) {
                borderColor = "3px solid red";
              }
            }

            if (isSelected || isCorrectHighlighted) {
              return (
                <OptionSelected key={index} style={{ border: borderColor }}>
                  <OptionKey>{`${option.key} )`}</OptionKey>
                  <OptionText>{option.option}</OptionText>
                </OptionSelected>
              );
            } else {
              return (
                <Option
                  key={index}
                  onClick={() => handleOptionSelect(question, option)}
                >
                  <OptionKey>{`${option.key} )`}</OptionKey>
                  <OptionText>{option.option}</OptionText>
                </Option>
              );
            }
          })}
        </Options>
      </div>
      <div style={{ gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 3 }}>
        {selected && <AnimatedImage src={imageToShow} blink={isBlinking} />}
      </div>
    </QuestionContainer>
  );
};

export default Quiz;

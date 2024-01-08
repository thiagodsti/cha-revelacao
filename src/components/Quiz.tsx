import styled from "styled-components";
import { Question, QuestionOption } from "../pages/Questions";

const QuestionContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Option = styled.button`
  flex-basis: calc(50% - 10px); // Subtrai o espaço do gap
  padding: 10px;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
`;

interface QuizProps {
  question: Question;
  selected?: Question;
  back: () => void;
  next: () => void;
  labelNext?: string;
  handleOptionSelect: (
    question: Question,
    optionSelected: QuestionOption
  ) => void;
}

const Quiz = ({
  question,
  back,
  next,
  handleOptionSelect,
  labelNext = "Próxima",
  selected,
}: QuizProps) => {
  return (
    <QuestionContainer>
      <h2>{question.question}</h2>
      <OptionsContainer>
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
            {option.option}
          </Option>
        ))}
      </OptionsContainer>
      <NavigationButtons>
        <Button onClick={() => back()}>Anterior</Button>
        <Button onClick={() => next()}>{labelNext}</Button>
      </NavigationButtons>
    </QuestionContainer>
  );
};

export default Quiz;

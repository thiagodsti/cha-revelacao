import styled from "styled-components";
import Quiz from "../components/questions/Quiz";
import { useState } from "react";
import ModalTroll from "../components/ModalTroll";
import { questions } from "../components/questions/questions";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("background.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
  }
`;

export interface Question {
  questionId: string;
  question: string;
  options: QuestionOption[];
  answer?: QuestionOption;
}

export interface QuestionOption {
  key: string;
  option: string;
  isCorrect: boolean;
  questionParentId: string;
}

function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswersSelected] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const answersCorrect = answers.filter((answer) => {
    return answer.answer?.isCorrect;
  });

  return (
    <Layout>
      {questions.map(
        (question, index) =>
          currentQuestionIndex === index && (
            <Quiz
              key={index}
              question={question}
              handleOptionSelect={(question, optionSelected) => {
                question.answer = optionSelected;
                setAnswersSelected((prevAnswers) => {
                  const existingAnswerIndex = prevAnswers.findIndex(
                    (answer) => answer.questionId === question.questionId
                  );
                  if (existingAnswerIndex !== -1) {
                    const updatedAnswers = [...prevAnswers];
                    updatedAnswers[existingAnswerIndex] = question;
                    return updatedAnswers;
                  }
                  return [...prevAnswers, question];
                });
                setTimeout(() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }, 5000);
              }}
              selected={answers.find(
                (a) => a.questionId === question.questionId
              )}
            />
          )
      )}
      {currentQuestionIndex === questions.length && (
        <div>
          <div className="fade-in-message">
            Você acertou {answersCorrect.length} de {questions.length} questões
          </div>
          {answersCorrect.length > questions.length * 0.7 && (
            <div className="fade-in-message">
              Parabéns vocês não vão precisar de nós!
            </div>
          )}
          {answersCorrect.length <= questions.length * 0.7 &&
            answersCorrect.length > questions.length * 0.3 && (
              <div className="fade-in-message">
                Estão na média, mas ainda precisam de nós!
              </div>
            )}
          {answersCorrect.length <= questions.length * 0.3 && (
            <div className="fade-in-message">
              Pessoal vamos ter que vir aqui mais vezes.
            </div>
          )}
          <button onClick={handleOpenModal}>Ver sexo do bebê</button>
          <ModalTroll show={showModal} />
        </div>
      )}
    </Layout>
  );
}

export default QuestionsPage;
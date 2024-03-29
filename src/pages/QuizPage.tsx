import styled from "styled-components";
import Quiz from "../components/questions/Quiz";
import { useState } from "react";
import { questions } from "../components/questions/questions";
import ModalChallenge from "../components/ModalChallenge";
import FinalResult from "../components/questions/FInalResult";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 100vh;
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
}

function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswersSelected] = useState<Question[]>([]);

  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [highlightCorrect, setHighlightCorrect] = useState(false);


  const handleOpenChallengeModal = () => {
    setHighlightCorrect(true);
    setShowChallengeModal(true);
  };

  const handleCloseChallengeModal = () => {
    setShowChallengeModal(false);
    setTimeout(() => {
      setHighlightCorrect(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 2000);
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
              }}
              selected={answers.find(
                (a) => a.questionId === question.questionId
              )}
              onAnimationEnd={() => {
                if (question.questionId == "6") {
                  handleOpenChallengeModal();
                } else {
                  setHighlightCorrect(true);
                  setTimeout(() => {
                    setHighlightCorrect(false);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  }, 2000);
                }
              }}
              highlightCorrect={highlightCorrect}
            />
          )
      )}
      {currentQuestionIndex === questions.length && (
        <FinalResult
          totalCorrect={answersCorrect.length}
          totalQuestions={questions.length}
        />
      )}
      <ModalChallenge
        show={showChallengeModal}
        onClick={handleCloseChallengeModal}
      />
    </Layout>
  );
}

export default QuestionsPage;

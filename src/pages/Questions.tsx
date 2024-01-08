import styled from "styled-components";
import Quiz from "../components/Quiz";
import { useState } from "react";
import ModalTroll from "../components/ModalTroll";

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
    // Estilos para telas menores (como tablets e smartphones)
    padding: 20px;
    height: auto;
  }
`;

interface Group {
  name: "easy" | "medium" | "hard";
}

interface SubGroup {
  group: Group;
  name: "baby" | "teenager";
}

const subGroups: SubGroup[] = [
  {
    group: {
      name: "easy",
    },
    name: "baby",
  },
  {
    group: {
      name: "hard",
    },
    name: "baby",
  },
  {
    group: {
      name: "hard",
    },
    name: "teenager",
  },
];

export interface Question {
  questionId: string;
  question: string;
  subGroup: SubGroup;
  options: QuestionOption[];
  answer?: QuestionOption;
}

export interface QuestionOption {
  key: string;
  option: string;
  isCorrect: boolean;
  questionParentId: string;
}

const questions = [
  {
    questionId: "1",
    question: "Quantas fraudas o bebê usa por dia?",
    subGroup: subGroups[0],
    options: [
      {
        key: "a",
        option: "5",
        isCorrect: false,
        questionParentId: "1",
      },
      {
        key: "b",
        option: "10",
        isCorrect: false,
        questionParentId: "1",
      },
      {
        key: "c",
        option: "15",
        isCorrect: true,
        questionParentId: "1",
      },
      {
        key: "d",
        option: "20",
        isCorrect: false,
        questionParentId: "1",
      },
    ],
  },
  {
    questionId: "2",
    question: "Qual a distância que um bebê consegue vomitar?",
    subGroup: subGroups[1],
    options: [
      {
        key: "a",
        option: "1 metro",
        isCorrect: false,
        questionParentId: "2",
      },
      {
        key: "b",
        option: "2 metros",
        isCorrect: true,
        questionParentId: "2",
      },
      {
        key: "c",
        option: "3 metros",
        isCorrect: false,
        questionParentId: "2",
      },
      {
        key: "d",
        option: "4 metros",
        isCorrect: false,
        questionParentId: "2",
      },
    ],
  },
];

function Questions() {
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
      <h1>Jogo das Perguntas</h1>
      {questions.map(
        (question, index) =>
          currentQuestionIndex === index && (
            <Quiz
              key={index}
              question={question}
              back={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              next={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              labelNext={
                currentQuestionIndex === questions.length - 1
                  ? "Enviar respostas"
                  : "Próxima"
              }
              handleOptionSelect={(question, optionSelected) => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                question.answer = optionSelected;
                const newAnswers = [...answers, question];
                setAnswersSelected(newAnswers);
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
          {answers.map((answer, index) => (
            <div
              key={index}
              style={{
                borderColor: answer.answer?.isCorrect ? "green" : "red",
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "10px",
                margin: "10px",
              }}
            >
              <div>{answer.question}</div>
              <div>{answer.answer?.option}</div>
              {!answer.answer?.isCorrect && (
                <div>
                  A resposta correta é:{" "}
                  {answer.options.find((option) => option.isCorrect)?.option}
                </div>
              )}
            </div>
          ))}
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

export default Questions;

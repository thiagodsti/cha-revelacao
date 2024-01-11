import { useEffect, useState } from "react";
import ImageTransition from "../components/tictactoe/Tile";
import styled from "styled-components";
import FinalMessage from "../components/FinalMessage";

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

function TicTacToe() {
  const miniTulio = "tictactoe/mini-tulio4.jpg";
  const miniLais = "tictactoe/mini-lais.jpg";
  const initialImages = [
    miniTulio,
    miniLais,
    miniTulio,
    miniTulio,
    miniLais,
    miniLais,
    miniLais,
    miniTulio,
    miniTulio,
  ];

  const [counter, setCounter] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    if (counter === 9) {
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleImageClick = () => {
    setCounter(counter + 1);
  };

  return (
    <Layout>
      {showFinalMessage ? (
        <FinalMessage />
      ) : (
        <>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {initialImages.map((image, index) => (
              <ImageTransition
                key={index}
                image={image}
                onClick={() => handleImageClick()}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}

export default TicTacToe;

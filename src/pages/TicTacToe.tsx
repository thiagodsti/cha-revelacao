import { useEffect, useState } from "react";
import ImageTransition from "../components/ImageTransition";
import styled from "styled-components";

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
  const initialImages = [
    {
      imageGame: "baby/teto.png",
      imagePerson: "baby/mini-tulio.png",
    },
    {
      imageGame: "baby/babador.png",
      imagePerson: "baby/mini-lais.png",
    },
    {
      imageGame: "baby/baby.png",
      imagePerson: "baby/mini-tulio.png",
    },
    {
      imageGame: "baby/berco.png",
      imagePerson: "baby/mini-tulio.png",
    },
    {
      imageGame: "baby/carrinho.png",
      imagePerson: "baby/mini-lais.png",
    },
    {
      imageGame: "baby/chacoalho.png",
      imagePerson: "baby/mini-lais.png",
    },
    {
      imageGame: "baby/chupeta.png",
      imagePerson: "baby/mini-lais.png",
    },
    {
      imageGame: "baby/mamadeira.png",
      imagePerson: "baby/mini-tulio.png",
    },
    {
      imageGame: "baby/roupa.png",
      imagePerson: "baby/mini-tulio.png",
    },
  ];

  const [counter, setCounter] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    if (counter === 9) {
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleImageClick = () => {
    setCounter(counter + 1);
  };

  return (
    <Layout>
      {showFinalMessage ? (
        <div className="fade-in-message">It's a baby</div>
      ) : (
        <>
          <div>
            <h1>Jogo da Velha</h1>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {initialImages.map((image, index) => (
              <ImageTransition
                key={index}
                from={image.imageGame}
                to={image.imagePerson}
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

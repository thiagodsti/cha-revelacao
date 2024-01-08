import { useEffect, useState } from "react";
import ImageTransition from "../components/ImageTransition";
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
  const initialImages = [
    {
      imageGame: "baby/teto.jpg",
      imagePerson: "jogo-velha/mini-tulio.jpg",
    },
    {
      imageGame: "baby/babador.jpg",
      imagePerson: "jogo-velha/mini-lais.jpg",
    },
    {
      imageGame: "baby/baby.jpg",
      imagePerson: "jogo-velha/mini-tulio.jpg",
    },
    {
      imageGame: "baby/berco.jpg",
      imagePerson: "jogo-velha/mini-tulio.jpg",
    },
    {
      imageGame: "baby/carrinho.jpg",
      imagePerson: "jogo-velha/mini-lais.jpg",
    },
    {
      imageGame: "baby/chacoalho.jpg",
      imagePerson: "jogo-velha/mini-lais.jpg",
    },
    {
      imageGame: "baby/chupeta.jpg",
      imagePerson: "jogo-velha/mini-lais.jpg",
    },
    {
      imageGame: "baby/mamadeira.jpg",
      imagePerson: "jogo-velha/mini-tulio.jpg",
    },
    {
      imageGame: "baby/roupa.jpg",
      imagePerson: "jogo-velha/mini-tulio.jpg",
    },
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
          <div>
            <h1>Jogo da Velha</h1>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {initialImages.map((image, index) => (
              <ImageTransition
                key={index}
                image={image.imagePerson}
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

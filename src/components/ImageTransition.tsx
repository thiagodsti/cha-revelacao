import { useState } from "react";
import styled from "styled-components";
import "./ImageTransition.css";

const Image = styled("img")`
  width: 6rem;
  height: 6rem;
  background-color: white;
  padding: 4px;
  cursor: pointer;
  border-radius: 20%;
  object-fit: cover;

  @media (max-width: 768px) {
    // Estilos para telas menores (como tablets e smartphones)
    width: 1rem;
    height: 1rem;
  }
`;

const ImageFrame = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.5rem;
  height: 12.5rem;
  background-image: url("jogo-velha/bg-jogo-velha.jpg");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    // Estilos para telas menores (como tablets e smartphones)
    width: 2.5rem;
    height: 2.5rem;
  }
`;

interface ImageTransitionProps {
  from: string;
  to: string;
  onClick: () => void;
}
function ImageTransition({ from, to, onClick }: ImageTransitionProps) {
  const [currentImage, setCurrentImage] = useState(from);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageClick = () => {
    if (currentImage !== from) return;
    onClick();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(to);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <ImageFrame>
      <Image
        className={isTransitioning ? "fading" : ""}
        style={{ cursor: currentImage === from ? "pointer" : "default" }}
        src={currentImage}
        onClick={() => handleImageClick()}
      />
    </ImageFrame>
  );
}

export default ImageTransition;

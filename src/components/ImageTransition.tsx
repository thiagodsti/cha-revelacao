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

  &:hover {
    background-image: url("jogo-velha/bg-jogo-velha-hover.jpg");
  }

  @media (max-width: 768px) {
    // Estilos para telas menores (como tablets e smartphones)
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const ImageBlank = styled("div")`
  width: 12.5rem;
  height: 12.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    // Estilos para telas menores (como tablets e smartphones)
    width: 1rem;
    height: 1rem;
  }
`;

interface ImageTransitionProps {
  image: string;
  onClick: () => void;
}
function ImageTransition({ image, onClick }: ImageTransitionProps) {
  const [currentImage, setCurrentImage] = useState<string>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageClick = () => {
    if (currentImage) return;
    onClick();
    setIsTransitioning(true);
    setCurrentImage(image);
    setIsTransitioning(false);
  };

  return (
    <ImageFrame>
      {currentImage ? <Image
        className={isTransitioning ? "fading" : ""}
        style={{ cursor: "default" }}
        src={currentImage}
      /> : <ImageBlank onClick={() => handleImageClick()} />}


    </ImageFrame>
  );
}

export default ImageTransition;

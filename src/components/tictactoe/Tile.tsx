import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const fadeOutInAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => !["isTransitioning"].includes(prop),
}) <{ isTransitioning: boolean }>`
  width: 8rem;
  height: 8rem;
  background-color: white;
  padding: 4px;
  cursor: pointer;
  border-radius: 20%;
  object-fit: cover;

  ${({ isTransitioning }) =>
    isTransitioning &&
    css`
      animation: ${fadeOutInAnimation} 1s ease;
    `}

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
  width: 14.5rem;
  height: 12.5rem;
  background-image: url("tictactoe/bg-tictactoe.jpg");
  background-size: cover;
  background-position: center;

  &:hover {
    background-image: url("tictactoe/bg-tictactoe-hover.jpg");
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const ImageBlank = styled("div")`
  width: 12.5rem;
  height: 12.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
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
      {currentImage ? (
        <Image
          isTransitioning={isTransitioning}
          style={{ cursor: "default" }}
          src={currentImage}
        />
      ) : (
        <ImageBlank onClick={() => handleImageClick()} />
      )}
    </ImageFrame>
  );
}

export default ImageTransition;

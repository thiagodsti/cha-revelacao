import { useState } from 'react';
import styled from "styled-components";
import './ImageTransition.css';

const Image = styled('img')`
  width: 125px;
  height: 125px;
  background-color: white;
  padding: 10px;
  cursor: pointer;
`;

interface ImageTransitionProps {
  from: string;
  to: string;
  onClick: () => void;
}
function ImageTransition({ from, to, onClick }: ImageTransitionProps) {
  //const images = ['image1.png', 'image2.png']; // Substitua com seus nomes de imagem
  const [currentImage, setCurrentImage] = useState(from);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageClick = () => {
    if (currentImage !== from) return;
    onClick();
    setIsTransitioning(true);
    setTimeout(() => {
      // Aqui você troca a imagem e termina a transição
      setCurrentImage(to);
      setIsTransitioning(false);
    }, 500); // 1000ms = 1 segundo para o delay da transição
  };

  return (
    <Image className={isTransitioning ? 'fading' : ''}
      style={{ cursor: currentImage === from ? 'pointer' : 'default' }}
      src={currentImage} width={'125px'} height={'125px'}
      onClick={() => handleImageClick()} />
  )

}

export default ImageTransition;
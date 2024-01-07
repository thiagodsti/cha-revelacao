import { useEffect, useState } from "react";
import ImageTransition from "./components/ImageTransition";

function JogoVelha() {


  const initialImages = [
    {
      'imageGame': 'baby/teto.png',
      'imagePerson': 'baby/mini-tulio.png'
    },
    {
      'imageGame': 'baby/babador.png',
      'imagePerson': 'baby/mini-lais.png'
    },
    {
      'imageGame': 'baby/baby.png',
      'imagePerson': 'baby/mini-tulio.png'
    },
    {
      'imageGame': 'baby/berco.png',
      'imagePerson': 'baby/mini-tulio.png'
    },
    {
      'imageGame': 'baby/carrinho.png',
      'imagePerson': 'baby/mini-lais.png'
    },
    {
      'imageGame': 'baby/chacoalho.png',
      'imagePerson': 'baby/mini-lais.png'
    },
    {
      'imageGame': 'baby/chupeta.png',
      'imagePerson': 'baby/mini-lais.png'
    },
    {
      'imageGame': 'baby/mamadeira.png',
      'imagePerson': 'baby/mini-tulio.png'
    },
    {
      'imageGame': 'baby/roupa.png',
      'imagePerson': 'baby/mini-tulio.png'
    }
  ]


  const [counter, setCounter] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    if (counter === 9) {
      // Definir um temporizador para mudar o estado
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
      }, 1000); // Delay de 1000 ms (1 segundo)

      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleImageClick = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      {showFinalMessage ? <div className="fade-in-message">It's a baby</div>
        :
        <>
          <div>
            <h1>Jogo da Velha</h1>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {initialImages.map((image, index) => (
              <ImageTransition key={index} from={image.imageGame} to={image.imagePerson}
                onClick={() => handleImageClick()} />
            ))}
          </div>
        </>
      }
    </>
  )
}

export default JogoVelha

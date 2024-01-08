import { useState } from "react";
import TypingEffect from "./TypingEffect";

function FinalMessage() {
  const [showBigBaby, setShowBigBaby] = useState(false);
  return (
    <>
      <TypingEffect blink onAnimationEnd={() => setShowBigBaby(true)}>
        It is a...
      </TypingEffect>
      {showBigBaby && (
        <h1
          style={{
            fontSize: "10em",
            color: "gold",
          }}
        >
          BABY
        </h1>
      )}
    </>
  );
}
export default FinalMessage;

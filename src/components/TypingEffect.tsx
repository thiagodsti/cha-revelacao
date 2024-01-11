import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

interface TypingEffectProps {
  children: React.ReactNode;
  blink?: boolean;
  blinkOnEnd?: boolean;
  typingDuration?: number;
  onAnimationEnd?: () => void;
}

const TypingText = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["steps", "blink", "blinkOnEnd", "typingDuration"].includes(prop),
})<{
  steps: number;
  blink: boolean;
  blinkOnEnd: boolean;
  typingDuration: number;
}>`
  font-family: "lemon";
  overflow: hidden;
  white-space: nowrap;
  font-size: 5em;
  margin: 0 auto;
  letter-spacing: 0.15em;
  border-right: 0.15em solid transparent;

  ${({ steps, blink, blinkOnEnd, typingDuration }) => {
    const typing = keyframes`
      from { width: 0; }
      to { width: ${steps + 3}ch; }
    `;

    const blinkCaret = keyframes`
      from, to { border-color: transparent; }
      50% { border-color: black; }
    `;

    return css`
      animation: ${typing} ${typingDuration}ms steps(${steps}, end) forwards,
        ${blink || blinkOnEnd ? blinkCaret : ""} 0.75s step-end
          ${blinkOnEnd ? "infinite" : "1"};
    `;
  }}
`;
function TypingEffect({
  children,
  blink = false,
  blinkOnEnd = false,
  typingDuration = 2000,
  onAnimationEnd,
}: TypingEffectProps) {
  const [typingSteps, setTypingSteps] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setTypingSteps(textRef.current.textContent?.length || 0);
    }
    const timeoutId = setTimeout(
      () => onAnimationEnd && onAnimationEnd(),
      typingDuration + 600
    );
    return () => clearTimeout(timeoutId);
  }, [children, typingDuration]);

  return (
    <TypingText
      ref={textRef}
      steps={typingSteps}
      blink={blink}
      blinkOnEnd={blinkOnEnd}
      typingDuration={typingDuration}
    >
      {children}
    </TypingText>
  );
}

export default TypingEffect;

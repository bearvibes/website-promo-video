import React from 'react';
import { useCurrentFrame } from 'remotion';

interface RedButtonProps {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const RedButton: React.FC<RedButtonProps> = ({
  text,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  
  // Subtle breathing pulse effect
  const adjustedFrame = Math.max(0, frame - delay);
  const pulse = adjustedFrame > 0 ? 1 + Math.sin(adjustedFrame * 0.1) * 0.03 : 0;
  const opacity = adjustedFrame > 0 ? Math.min(1, adjustedFrame * 0.1) : 0;

  return (
    <button
      className="cta-red-button font-headline"
      style={{
        transform: `scale(${pulse})`,
        opacity,
        ...style,
      }}
    >
      <span>{text}</span>
      <div className="arrow-circle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

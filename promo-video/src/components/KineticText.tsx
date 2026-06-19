import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface KineticTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}


export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  stagger = 3,
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div 
      className={`font-headline ${className}`} 
      style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '0.25em',
        ...style 
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + (i * stagger);
        const adjustedFrame = Math.max(0, frame - wordDelay);
        
        // Spring physics for entry
        const wordSpring = spring({
          frame: adjustedFrame,
          fps,
          config: {
            damping: 11,
            stiffness: 110,
            mass: 0.7,
          },
        });

        // Basic scale and position interpolation
        const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
        const scale = interpolate(wordSpring, [0, 1], [0.3, 1]);
        const translateY = interpolate(wordSpring, [0, 1], [30, 0]);
        const rotate = interpolate(wordSpring, [0, 1], [-8, 0]);

        // Style parsing
        let cleanWord = word;
        let wordClass = 'text-white';

        if (word.startsWith('**') && word.endsWith('**')) {
          cleanWord = word.slice(2, -2);
          wordClass = 'title-cyan';
        } else if (word.startsWith('*') && word.endsWith('*')) {
          cleanWord = word.slice(1, -1);
          wordClass = 'title-red';
        }

        // Chromatic Aberration offset (large split on entry, settles to 0)
        const aberrationOffset = adjustedFrame > 0 && adjustedFrame < 15 
          ? interpolate(adjustedFrame, [0, 15], [8, 0], { extrapolateRight: 'clamp' })
          : 0;

        // Character Scrambling logic removed to avoid symbol randomizer on entry
        const displayedWord = cleanWord;

        // Text Shadows incorporating chromatic offsets
        let textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
        if (aberrationOffset > 0.1) {
          textShadow = `${aberrationOffset}px 0 0 rgba(0, 210, 255, 0.7), -${aberrationOffset}px 0 0 rgba(255, 0, 60, 0.7), ${textShadow}`;
        }

        return (
          <span
            key={i}
            className={wordClass}
            style={{
              display: 'inline-block',
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              textShadow: wordClass === 'text-white' ? textShadow : undefined,
            }}
          >
            {displayedWord}
          </span>
        );
      })}
    </div>
  );
};

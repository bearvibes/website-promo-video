import React from 'react';
import { useCurrentFrame } from 'remotion';

interface GlitchTransitionProps {
  changeFrame: number; // The exact frame where the scene swaps
}

export const GlitchTransition: React.FC<GlitchTransitionProps> = ({ changeFrame }) => {
  const frame = useCurrentFrame();

  const diff = frame - changeFrame;
  // Trigger transition within a window of 10 frames (-5 to +5)
  if (Math.abs(diff) > 6) {
    return null;
  }

  // Deterministic random generator based on frame to ensure consistency during renders
  const seed = frame * 123.45;
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const showFlash = Math.abs(diff) <= 2;
  const flashColor = random(seed) > 0.5 ? '#00d2ff' : '#ff003c';
  const flashOpacity = showFlash ? 0.35 : 0;

  // Generate 3 random horizontal glitch strips
  const strips = Array.from({ length: 3 }).map((_, i) => {
    const height = Math.floor(random(seed + i * 10) * 120) + 20; // 20px to 140px
    const top = Math.floor(random(seed + i * 20) * 960);        // random vertical position
    const leftOffset = Math.floor(random(seed + i * 30) * 200) - 100; // -100px to 100px
    const color = random(seed + i * 40) > 0.5 ? 'rgba(0, 210, 255, 0.4)' : 'rgba(255, 0, 60, 0.4)';
    return { height, top, leftOffset, color };
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Background Flash */}
      {showFlash && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: flashColor,
            opacity: flashOpacity,
          }}
        />
      )}

      {/* Glitch Strips */}
      {strips.map((strip, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: strip.leftOffset,
            top: strip.top,
            width: '120%',
            height: strip.height,
            backgroundColor: strip.color,
            boxShadow: `0 0 15px ${strip.color}`,
            transform: `skewX(${Math.floor(random(seed + index) * 30) - 15}deg)`,
          }}
        />
      ))}
    </div>
  );
};

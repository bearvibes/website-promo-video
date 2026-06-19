import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'red' | 'none';
  delay?: number;
  style?: React.CSSProperties;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const entrySpring = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const translateY = interpolate(entrySpring, [0, 1], [50, 0]);
  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);
  const scale = interpolate(entrySpring, [0, 1], [0.95, 1]);

  let borderClass = '';
  let laserColor = '';
  if (glowColor === 'cyan') {
    borderClass = 'cyan-glow-border';
    laserColor = 'var(--color-cyan)';
  } else if (glowColor === 'red') {
    borderClass = 'red-glow-border';
    laserColor = 'var(--color-red)';
  }

  // Calculate coordinates for border-tracing laser line
  const time = adjustedFrame * 2.5; // speed multiplier
  const progress = (time % 400) / 100; // 0 to 4 progress around the perimeter

  let laserStyle: React.CSSProperties = { display: 'none' };
  
  if (glowColor !== 'none' && adjustedFrame > 15) {
    if (progress < 1) {
      // Top Edge: Left to Right
      laserStyle = {
        display: 'block',
        position: 'absolute',
        top: 0,
        left: `${progress * 100}%`,
        width: '80px',
        height: '2px',
        background: `linear-gradient(to right, transparent, ${laserColor}, transparent)`,
        boxShadow: `0 0 10px ${laserColor}`,
      };
    } else if (progress < 2) {
      // Right Edge: Top to Bottom
      const rightProgress = progress - 1;
      laserStyle = {
        display: 'block',
        position: 'absolute',
        top: `${rightProgress * 100}%`,
        right: 0,
        width: '2px',
        height: '80px',
        background: `linear-gradient(to bottom, transparent, ${laserColor}, transparent)`,
        boxShadow: `0 0 10px ${laserColor}`,
      };
    } else if (progress < 3) {
      // Bottom Edge: Right to Left
      const bottomProgress = progress - 2;
      laserStyle = {
        display: 'block',
        position: 'absolute',
        bottom: 0,
        right: `${bottomProgress * 100}%`,
        width: '80px',
        height: '2px',
        background: `linear-gradient(to left, transparent, ${laserColor}, transparent)`,
        boxShadow: `0 0 10px ${laserColor}`,
      };
    } else {
      // Left Edge: Bottom to Top
      const leftProgress = progress - 3;
      laserStyle = {
        display: 'block',
        position: 'absolute',
        bottom: `${leftProgress * 100}%`,
        left: 0,
        width: '2px',
        height: '80px',
        background: `linear-gradient(to top, transparent, ${laserColor}, transparent)`,
        boxShadow: `0 0 10px ${laserColor}`,
      };
    }
  }

  return (
    <div
      className={`glass-card ${borderClass} ${className}`}
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Moving Laser Light-Streak */}
      <div style={laserStyle} />
      
      {/* Card Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        height: '100%', 
        width: '100%',
        display: style.display === 'flex' ? 'flex' : 'block',
        flexDirection: style.flexDirection,
        justifyContent: style.justifyContent,
        alignItems: style.alignItems,
        gap: style.gap
      }}>
        {children}
      </div>
    </div>
  );
};

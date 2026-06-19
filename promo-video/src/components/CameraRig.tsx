import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TIMINGS } from '../constants';

interface CameraRigProps {
  children: React.ReactNode;
}

export const CameraRig: React.FC<CameraRigProps> = ({ children }) => {
  const frame = useCurrentFrame();

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let blur = 0;

  // 1. Slow camera breathing / drift
  scale += Math.sin(frame * 0.015) * 0.015;

  // 2. Camera Shakes on heavy beats
  const shakeTriggers = [
    480,  // Scene 1: FAILED stamp
    930,  // Scene 2: THAT'S EXPENSIVE stamp
    2730, // Scene 6: COSTING MONEY stamp
  ];

  shakeTriggers.forEach(trigger => {
    if (frame >= trigger && frame < trigger + 20) {
      const shakeFrame = frame - trigger;
      // Exponential decay of shake amplitude
      const decay = Math.exp(-shakeFrame * 0.15);
      const amplitude = 12 * decay;
      
      translateX += Math.sin(shakeFrame * 1.8) * amplitude;
      translateY += Math.cos(shakeFrame * 1.8) * amplitude;
    }
  });

  // 3. Transition Whip Slides
  const transitionBoundaries = [
    TIMINGS.scene1.end, // 570
    TIMINGS.scene2.end, // 960
    TIMINGS.scene3.end, // 1530
    TIMINGS.scene4.end, // 1950
    TIMINGS.scene5.end, // 2490
  ];

  transitionBoundaries.forEach(boundary => {
    const windowSize = 6; // Whip duration in frames (-6 to +6)
    if (frame >= boundary - windowSize && frame <= boundary + windowSize) {
      const offset = frame - boundary;
      
      if (offset < 0) {
        // Sliding out (left)
        // From 0 to -1920
        const progress = (offset + windowSize) / windowSize; // 0 to 1
        translateX = -1920 * progress;
        blur = progress * 15;
      } else {
        // Sliding in (from right)
        // From 1920 to 0
        const progress = offset / windowSize; // 0 to 1
        translateX = 1920 * (1 - progress);
        blur = (1 - progress) * 15;
      }
    }
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};

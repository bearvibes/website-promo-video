import React, { useRef, useEffect } from 'react';
import { useCurrentFrame } from 'remotion';

// Simple seed-based random generator to keep it deterministic
const random = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate 40 particles with fixed properties
const PARTICLE_COUNT = 25;
const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const seed = i * 23.45;
  return {
    baseX: random(seed) * 1920,
    baseY: random(seed + 1) * 1080,
    speedX: (random(seed + 2) * 1.2 + 0.3) * (random(seed + 3) > 0.5 ? 1 : -1),
    speedY: (random(seed + 4) * 1.2 + 0.3) * (random(seed + 5) > 0.5 ? 1 : -1),
    size: random(seed + 6) * 4 + 1.5,
    glow: random(seed + 7) > 0.6,
  };
});

export const DynamicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 1920, 1080);

    // Draw warping background grid
    ctx.strokeStyle = 'rgba(0, 210, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSpacing = 120;
    
    // Slow drift of grid lines
    const gridOffset = (frame * 0.4) % gridSpacing;
    
    // Vertical grid lines
    for (let x = gridOffset; x < 1920; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1080);
      ctx.stroke();
    }
    // Horizontal grid lines
    for (let y = gridOffset; y < 1080; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1920, y);
      ctx.stroke();
    }

    // Calculate current positions of particles
    const positions = particles.map(p => {
      // Calculate position with wrap-around
      let x = (p.baseX + p.speedX * frame) % 1920;
      let y = (p.baseY + p.speedY * frame) % 1080;
      if (x < 0) x += 1920;
      if (y < 0) y += 1080;
      return { x, y, size: p.size, glow: p.glow };
    });

    // Draw connections (lines between close particles)
    ctx.lineWidth = 0.5;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Connect if within 250px
        if (dist < 250) {
          const alpha = (1 - dist / 250) * 0.04;
          ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    positions.forEach(p => {
      ctx.fillStyle = p.glow ? 'rgba(0, 210, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)';
      if (p.glow) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(0, 210, 255, 0.8)';
      } else {
        ctx.shadowBlur = 0;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Reset shadow
    ctx.shadowBlur = 0;

  }, [frame]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

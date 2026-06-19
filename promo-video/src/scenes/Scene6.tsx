import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Coins, TrendingDown } from 'lucide-react';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';
import { RedButton } from '../components/RedButton';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing mappings relative to Scene 6 start (which is frame 2264 in the timeline):
  // - 75.47s (main frame 2264) = Scene6 frame 0: "So ask yourself..."
  // - 76.37s (main frame 2291) = Scene6 frame 27: "helping you make money..."
  // - 82.73s (main frame 2482) = Scene6 frame 218: "...or costing you money?"
  // - 84.55s (main frame 2537) = Scene6 frame 273: "built to generate results..."
  // - 89.1s (main frame 2673) = Scene6 frame 409: "...let's talk."

  const showQuestions = frame < 273;
  const showCTA = frame >= 273;

  // Question Left: Make Money (reveals at 27f / 76.37s)
  const leftSpring = spring({
    frame: Math.max(0, frame - 27),
    fps,
    config: { damping: 15 },
  });
  const leftScale = interpolate(leftSpring, [0, 1], [0.8, 1]);
  const leftOpacity = frame < 264 ? interpolate(leftSpring, [0, 1], [0, 1]) : interpolate(frame, [264, 273], [1, 0]);

  // Question Right: Cost Money (reveals at 218f / 82.73s)
  const rightSpring = spring({
    frame: Math.max(0, frame - 218),
    fps,
    config: { damping: 10, stiffness: 150 }, // snappier entry
  });
  const rightScale = interpolate(rightSpring, [0, 1], [0.8, 1]);
  const rightOpacity = frame < 264 ? interpolate(rightSpring, [0, 1], [0, 1]) : interpolate(frame, [264, 273], [1, 0]);
  const isRightShaking = frame >= 218 && frame < 245;
  const rightShakeClass = isRightShaking ? 'shake-animation' : '';

  // CTA Text and button entry (273f+)
  const ctaSpring = spring({
    frame: Math.max(0, frame - 273),
    fps,
    config: { damping: 15 },
  });
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.9, 1]);

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '60px' }}>
      
      {/* Phase 1: Ask yourself questions (0 - 273f) */}
      {showQuestions && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {frame < 273 && (
            <h1 className="font-headline text-white animate-fade-in" style={{ fontSize: '48px', marginBottom: '60px', opacity: frame < 264 ? 1 : interpolate(frame, [264, 273], [1, 0]) }}>
              SO ASK YOURSELF
            </h1>
          )}

          <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', width: '100%', maxWidth: '1400px' }}>
            
            {/* Left: Making money */}
            {frame >= 27 && (
              <div style={{ transform: `scale(${leftScale})`, opacity: leftOpacity }}>
                <GlowCard
                  glowColor="cyan"
                  style={{
                    width: '500px',
                    height: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(7, 12, 24, 0.8)'
                  }}
                >
                  <Coins size={50} color="var(--color-cyan)" style={{ marginBottom: '20px' }} />
                  <h2 className="font-headline title-cyan" style={{ fontSize: '28px', textAlign: 'center', lineHeight: '1.2' }}>
                    IS YOUR WEBSITE HELPING YOU MAKE MONEY?
                  </h2>
                </GlowCard>
              </div>
            )}

            {/* Right: Costing money */}
            {frame >= 218 && (
              <div className={rightShakeClass} style={{ transform: `scale(${rightScale})`, opacity: rightOpacity }}>
                <GlowCard
                  glowColor="red"
                  style={{
                    width: '500px',
                    height: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(7, 12, 24, 0.8)'
                  }}
                >
                  <TrendingDown size={50} color="var(--color-red)" style={{ marginBottom: '20px' }} />
                  <h2 className="font-headline title-red" style={{ fontSize: '28px', textAlign: 'center', lineHeight: '1.2' }}>
                    OR IS IT COSTING YOU MONEY?
                  </h2>
                </GlowCard>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Phase 2: Final CTA (273f+) */}
      {showCTA && (
        <div style={{ opacity: ctaOpacity, transform: `scale(${ctaScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '120px' }}>
            {frame >= 273 && frame < 300 && (
              <KineticText 
                text="IF YOU'RE READY" 
                delay={273} 
                stagger={4} 
                style={{ fontSize: '64px' }}
              />
            )}
            {frame >= 300 && frame < 327 && (
              <KineticText 
                text="FOR A WEBSITE" 
                delay={300} 
                stagger={4} 
                style={{ fontSize: '64px' }}
              />
            )}
            {frame >= 327 && frame < 382 && (
              <KineticText 
                text="BUILT TO **GENERATE** **RESULTS**" 
                delay={327} 
                stagger={4} 
                style={{ fontSize: '72px' }}
              />
            )}
            {frame >= 382 && (
              <KineticText 
                text="— NOT JUST LOOK GOOD —" 
                delay={382} 
                stagger={5} 
                style={{ fontSize: '56px', color: 'var(--color-gray)' }}
              />
            )}
          </div>

          {/* LET'S TALK Climax */}
          {frame >= 409 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginTop: '10px' }}>
              <h2 className="font-headline title-red animate-pulse" style={{ fontSize: '110px', textShadow: '0 0 30px rgba(255, 0, 60, 0.8)' }}>
                LET'S TALK
              </h2>
              
              {/* Custom Red Button from reference style */}
              <RedButton text="BOOK A CALL" delay={427} style={{ marginTop: '10px' }} />
            </div>
          )}

        </div>
      )}

    </div>
  );
};

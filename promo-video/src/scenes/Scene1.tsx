import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from 'remotion';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image entrance
  const bgSpring = spring({
    frame,
    fps,
    config: { damping: 20 },
  });
  const bgOpacity = interpolate(bgSpring, [0, 1], [0, 0.15]);
  const bgScale = interpolate(bgSpring, [0, 1], [1.1, 1]);

  // Transition parameters for red cards (NO CALL, NO BOOKING, NO SALE)
  const showRedCards = frame >= 164 && frame < 273;
  
  // Fade out of first phase text
  const text1Opacity = frame < 164 ? 1 : interpolate(frame, [164, 173], [1, 0], { extrapolateRight: 'clamp' });
  
  // Phase 3 text (Not because they don't need...)
  const showPhase3 = frame >= 273 && frame < 345;
  const phase3Opacity = showPhase3 
    ? interpolate(frame, [273, 282], [0, 1], { extrapolateRight: 'clamp' })
    : frame >= 345 ? interpolate(frame, [345, 355], [1, 0], { extrapolateRight: 'clamp' }) : 0;

  // Phase 4 text (Because your website failed...)
  const showPhase4 = frame >= 345;
  const phase4Opacity = showPhase4 ? interpolate(frame, [345, 355], [0, 1], { extrapolateRight: 'clamp' }) : 0;

  // Screen shake logic for the climax of the scene (failed to convert)
  const isShaking = frame >= 382 && frame < 409;
  const shakeClass = isShaking ? 'shake-animation' : '';

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Faded Background Mockup */}
      <Img
        src={staticFile('failing_website.png')}
        style={{
          position: 'absolute',
          width: '80%',
          height: 'auto',
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
          filter: 'blur(2px) grayscale(50%)',
          pointerEvents: 'none',
        }}
        alt="Failing Website background"
      />

      {/* Phase 1 Text (0s - 6s / 0 - 180f) - Segmented into rapid punchy phrases */}
      {frame < 173 && (
        <div style={{ position: 'absolute', opacity: text1Opacity, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 100px' }}>
          {frame >= 0 && frame < 27 && (
            <KineticText 
              text="EVERY DAY" 
              delay={0} 
              stagger={4}
              style={{ fontSize: '90px' }} 
            />
          )}
          {frame >= 27 && frame < 68 && (
            <KineticText 
              text="**POTENTIAL** **CUSTOMERS**" 
              delay={27} 
              stagger={4}
              style={{ fontSize: '100px' }} 
            />
          )}
          {frame >= 68 && frame < 109 && (
            <KineticText 
              text="VISIT YOUR WEBSITE" 
              delay={68} 
              stagger={4}
              style={{ fontSize: '80px' }} 
            />
          )}
          {frame >= 109 && frame < 136 && (
            <KineticText 
              text="AND MOST OF THEM" 
              delay={109} 
              stagger={4}
              style={{ fontSize: '80px' }} 
            />
          )}
          {frame >= 136 && (
            <KineticText 
              text="*LEAVE*" 
              delay={136} 
              stagger={5}
              style={{ fontSize: '120px' }} 
            />
          )}
        </div>
      )}

      {/* Phase 2: NO CALL. NO BOOKING. NO SALE. (6s - 10s / 180 - 300f) */}
      {showRedCards && (
        <div style={{ position: 'absolute', display: 'flex', gap: '40px', justifyContent: 'center', width: '100%', padding: '0 80px' }}>
          {/* Card 1: NO CALL */}
          {frame >= 177 && (
            <GlowCard 
              glowColor="red" 
              delay={177}
              transitionType="stamp"
              style={{ width: '400px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <h2 className="font-headline title-red" style={{ fontSize: '48px', marginBottom: '15px' }}>NO CALL</h2>
              <p className="text-gray" style={{ fontSize: '20px', textAlign: 'center' }}>No inquiries from visitors</p>
            </GlowCard>
          )}

          {/* Card 2: NO BOOKING */}
          {frame >= 205 && (
            <GlowCard 
              glowColor="red" 
              delay={205}
              transitionType="stamp"
              style={{ width: '400px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <h2 className="font-headline title-red" style={{ fontSize: '48px', marginBottom: '15px' }}>NO BOOKING</h2>
              <p className="text-gray" style={{ fontSize: '20px', textAlign: 'center' }}>Calendar remains empty</p>
            </GlowCard>
          )}

          {/* Card 3: NO SALE */}
          {frame >= 235 && (
            <GlowCard 
              glowColor="red" 
              delay={235}
              transitionType="stamp"
              style={{ width: '400px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <h2 className="font-headline title-red" style={{ fontSize: '48px', marginBottom: '15px' }}>NO SALE</h2>
              <p className="text-gray" style={{ fontSize: '20px', textAlign: 'center' }}>Zero conversion revenue</p>
            </GlowCard>
          )}
        </div>
      )}

      {/* Phase 3: Not because they don't need what you offer (10s - 12.67s / 300 - 380f) */}
      {showPhase3 && (
        <div style={{ position: 'absolute', opacity: phase3Opacity, display: 'flex', justifyContent: 'center', width: '100%', padding: '0 100px' }}>
          {frame >= 273 && frame < 300 && (
            <KineticText 
              text="NOT BECAUSE THEY DON'T NEED" 
              delay={273} 
              stagger={3}
              className="text-center"
              style={{ fontSize: '64px', lineHeight: '1.3' }} 
            />
          )}
          {frame >= 300 && (
            <KineticText 
              text="WHAT YOU OFFER" 
              delay={300} 
              stagger={3}
              className="text-center"
              style={{ fontSize: '72px', lineHeight: '1.3' }} 
            />
          )}
        </div>
      )}

      {/* Phase 4: Because your website failed to convert them (12.67s - 19s / 380 - 570f) */}
      {showPhase4 && (
        <div className={shakeClass} style={{ position: 'absolute', opacity: phase4Opacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', padding: '0 100px' }}>
          <KineticText 
            text="BUT BECAUSE YOUR WEBSITE" 
            delay={345} 
            stagger={4}
            className="text-center"
            style={{ fontSize: '64px', lineHeight: '1.2' }} 
          />
          {frame >= 382 && (
            <KineticText 
              text="*FAILED* TO CONVERT THEM" 
              delay={382} 
              stagger={4}
              className="text-center"
              style={{ fontSize: '90px', lineHeight: '1.2' }} 
            />
          )}
        </div>
      )}
    </div>
  );
};

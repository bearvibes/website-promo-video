import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide Timings inside Scene 4 (Total 382 frames):
  // - Slide 1: 0 - 136f (divided 150 by 1.1) -> "Imagine doubling your leads..."
  // - Slide 2: 136 - 245f (divided 270 by 1.1) -> "Imagine knowing exactly where..."
  // - Slide 3: 245 - 382f (divided 420 by 1.1) -> "Imagine a website that works around..."

  const currentSlide = frame < 136 ? 1 : frame < 245 ? 2 : 3;

  // Slide 1 Entry/Exit Animations
  const s1Frame = frame;
  const s1Spring = spring({ frame: s1Frame, fps, config: { damping: 15 } });
  const s1Opacity = frame < 127 ? interpolate(s1Spring, [0, 1], [0, 1]) : interpolate(frame, [127, 136], [1, 0]);
  const s1Scale = frame < 127 ? interpolate(s1Spring, [0, 1], [0.9, 1]) : 1;

  // Slide 2 Entry/Exit Animations
  const s2Frame = Math.max(0, frame - 136);
  const s2Spring = spring({ frame: s2Frame, fps, config: { damping: 15 } });
  const s2Opacity = frame < 236 ? interpolate(s2Spring, [0, 1], [0, 1]) : interpolate(frame, [236, 245], [1, 0]);
  const s2Scale = frame < 236 ? interpolate(s2Spring, [0, 1], [0.9, 1]) : 1;

  // Slide 3 Entry/Exit Animations
  const s3Frame = Math.max(0, frame - 245);
  const s3Spring = spring({ frame: s3Frame, fps, config: { damping: 15 } });
  const s3Opacity = interpolate(s3Spring, [0, 1], [0, 1]);
  const s3Scale = interpolate(s3Spring, [0, 1], [0.9, 1]);

  // Clock Rotation for Slide 3
  const clockFrame = Math.max(0, frame - 245);
  const minuteHandRotation = (clockFrame * 6) % 360;
  const hourHandRotation = (clockFrame * 0.5) % 360;

  // Count-up animations for Slide 2 (starts at frame 173, runs for 25 frames)
  const countGoogle = Math.floor(interpolate(frame, [173, 198], [0, 42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const countSEO = Math.floor(interpolate(frame, [173, 198], [0, 35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const countMeta = Math.floor(interpolate(frame, [173, 198], [0, 23], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  // Count-up animation for Slide 1 (starts at frame 36, runs for 25 frames)
  const countConversion = Math.floor(interpolate(frame, [36, 61], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: 'transparent' }}>
      
      {/* Slide 1: Double Your Leads (0 - 136f) */}
      {currentSlide === 1 && (
        <div style={{ position: 'absolute', opacity: s1Opacity, transform: `scale(${s1Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' }}>
          <h2 className="font-headline text-white" style={{ fontSize: '32px', letterSpacing: '4px' }}>IMAGINE</h2>
          
          <KineticText 
            text="DOUBLE YOUR LEADS" 
            delay={9} 
            stagger={3} 
            style={{ fontSize: '72px' }}
          />

          {/* Glowing Pill Graphic */}
          {frame >= 36 && (
            <div
              className="pulse-cyan-effect"
              style={{
                background: 'linear-gradient(135deg, var(--color-cyan) 0%, #0088cc 100%)',
                color: '#030816',
                padding: '25px 60px',
                borderRadius: '50px',
                fontFamily: 'var(--font-headline)',
                fontSize: '54px',
                fontWeight: '900',
                marginTop: '20px',
                boxShadow: '0 0 35px rgba(0, 210, 255, 0.6)',
                letterSpacing: '1px',
              }}
            >
              +{countConversion}% CONVERSION
            </div>
          )}

          <p className="text-gray" style={{ fontSize: '24px', fontWeight: '600', marginTop: '20px' }}>
            Without doubling your ad budget
          </p>
        </div>
      )}

      {/* Slide 2: Know Your Sources (136 - 245f) */}
      {currentSlide === 2 && (
        <div style={{ position: 'absolute', opacity: s2Opacity, transform: `scale(${s2Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%', padding: '0 80px' }}>
          <h2 className="font-headline text-white" style={{ fontSize: '32px', letterSpacing: '4px' }}>IMAGINE</h2>
          
          <KineticText 
            text="KNOW YOUR SOURCES" 
            delay={145} 
            stagger={3} 
            style={{ fontSize: '72px' }}
          />

          {/* Sources dashboard panel */}
          {frame >= 173 && (
            <GlowCard
              glowColor="cyan"
              delay={173}
              style={{
                width: '700px',
                height: '240px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 12, 24, 0.9)',
                marginTop: '15px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div className="font-headline title-cyan" style={{ fontSize: '20px', marginBottom: '10px' }}>GOOGLE ADS</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{countGoogle}%</div>
                <div className="text-gray" style={{ fontSize: '14px' }}>Cost: $4.20/lead</div>
              </div>
              <div style={{ width: '2px', height: '120px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div className="font-headline title-cyan" style={{ fontSize: '20px', marginBottom: '10px' }}>ORGANIC SEO</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{countSEO}%</div>
                <div className="text-gray" style={{ fontSize: '14px' }}>Cost: $0.00/lead</div>
              </div>
              <div style={{ width: '2px', height: '120px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div className="font-headline title-cyan" style={{ fontSize: '20px', marginBottom: '10px' }}>META ADS</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{countMeta}%</div>
                <div className="text-gray" style={{ fontSize: '14px' }}>Cost: $6.15/lead</div>
              </div>
            </GlowCard>
          )}

          <p className="text-gray" style={{ fontSize: '24px', fontWeight: '600', marginTop: '20px' }}>
            See exactly where every customer came from
          </p>
        </div>
      )}

      {/* Slide 3: Works Around the Clock (245 - 382f) */}
      {currentSlide === 3 && (
        <div style={{ position: 'absolute', opacity: s3Opacity, transform: `scale(${s3Scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' }}>
          <h2 className="font-headline text-white" style={{ fontSize: '32px', letterSpacing: '4px' }}>IMAGINE</h2>
          
          <KineticText 
            text="WORKS AROUND THE CLOCK" 
            delay={255} 
            stagger={3} 
            style={{ fontSize: '72px' }}
          />

          {/* Custom Animated Neon Clock */}
          {frame >= 282 && (
            <div
              className="pulse-cyan-effect"
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '2px solid rgba(0, 210, 255, 0.6)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 12, 24, 0.8)',
                boxShadow: '0 0 25px rgba(0, 210, 255, 0.4)',
                marginTop: '15px',
              }}
            >
              {/* Hour Hand */}
              <div
                style={{
                  width: '6px',
                  height: '45px',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '3px',
                  position: 'absolute',
                  bottom: '50%',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${hourHandRotation}deg)`,
                }}
              />
              {/* Minute Hand */}
              <div
                style={{
                  width: '4px',
                  height: '65px',
                  backgroundColor: 'var(--color-cyan)',
                  borderRadius: '2px',
                  position: 'absolute',
                  bottom: '50%',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${minuteHandRotation}deg)`,
                }}
              />
              {/* Clock Center pin */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-white)',
                  position: 'absolute',
                  zIndex: 10,
                }}
              />
            </div>
          )}

          <p className="text-gray" style={{ fontSize: '24px', fontWeight: '600', marginTop: '20px' }}>
            A website that captures opportunities 24/7—even when you don't
          </p>
        </div>
      )}
    </div>
  );
};

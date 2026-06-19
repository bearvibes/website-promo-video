import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing constants relative to the start of Scene 2 (which is frame 570 in the timeline)
  // Inside the Scene2 sequence, frame starts at 0, representing frame 570 in the main timeline.
  // Timestamps mapping:
  // - 19s (main frame 570) = Scene2 frame 0: "Businesses spend..."
  // - 21s (main frame 630) = Scene2 frame 60: "ads..."
  // - 22s (main frame 660) = Scene2 frame 90: "SEO & Social..."
  // - 23s (main frame 690) = Scene2 frame 120: "referrals..."
  // - 25s (main frame 750) = Scene2 frame 180: "Then they send those hard-earned..."
  // - 31s (main frame 930) = Scene2 frame 360: "That's expensive."

  // Headline Entry Animation
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 15 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [-100, 0]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);

  const showCards = frame < 327;
  const showExpensive = frame >= 327;

  // Fade out cards on transition to "THAT'S EXPENSIVE"
  const cardsOpacity = frame < 327 ? 1 : interpolate(frame, [327, 336], [1, 0]);

  // Expensive text shake
  const isShaking = frame >= 327 && frame < 345;
  const shakeClass = isShaking ? 'shake-animation' : '';

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '60px' }}>
      
      {/* Scene Title (Always visible in phase 1) */}
      {frame < 327 && (
        <div style={{ transform: `translateY(${headlineY}px)`, opacity: headlineOpacity, marginBottom: '60px', zIndex: 10 }}>
          <h1 className="font-headline text-white" style={{ fontSize: '48px', letterSpacing: '2px', textAlign: 'center' }}>
            YOU'RE PAYING TO SEND VISITORS <span className="title-red">NOWHERE</span>
          </h1>
        </div>
      )}

      {/* Traffic Channel Cards (60f - 360f / 21s - 31s) */}
      {showCards && (
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%', maxWidth: '1400px', opacity: cardsOpacity }}>
          {/* Card 1: Paid Ads (Frame 60 / 21s) */}
          {frame >= 55 && (
            <GlowCard 
              glowColor="red" 
              delay={60} 
              style={{ width: '380px', height: '320px', display: 'flex', flexDirection: 'column', padding: '40px 30px' }}
            >
              <div className="font-headline title-red" style={{ fontSize: '28px', marginBottom: '15px' }}>PAID ADS</div>
              <p className="text-white" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Clicks with zero return</p>
              <p className="text-gray" style={{ fontSize: '16px', lineHeight: '1.4' }}>Driving clicks to a static page that fails to start a conversation or capture details</p>
            </GlowCard>
          )}

          {/* Card 2: SEO & Social (Frame 90 / 22s) */}
          {frame >= 82 && (
            <GlowCard 
              glowColor="cyan" 
              delay={90} 
              style={{ width: '380px', height: '320px', display: 'flex', flexDirection: 'column', padding: '40px 30px' }}
            >
              <div className="font-headline title-cyan" style={{ fontSize: '28px', marginBottom: '15px' }}>SEO & SOCIAL</div>
              <p className="text-white" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Organic traffic wasted</p>
              <p className="text-gray" style={{ fontSize: '16px', lineHeight: '1.4' }}>Hard-earned organic visitors land on a page that acts like a digital brochure—sitting idle</p>
            </GlowCard>
          )}

          {/* Card 3: Referrals (Frame 120 / 23s) */}
          {frame >= 109 && (
            <GlowCard 
              glowColor="red" 
              delay={120} 
              style={{ width: '380px', height: '320px', display: 'flex', flexDirection: 'column', padding: '40px 30px' }}
            >
              <div className="font-headline title-red" style={{ fontSize: '28px', marginBottom: '15px' }}>REFERRALS</div>
              <p className="text-white" style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Leads slip away</p>
              <p className="text-gray" style={{ fontSize: '16px', lineHeight: '1.4' }}>Warm word-of-mouth recommendations check you out online and bounce due to friction</p>
            </GlowCard>
          )}
        </div>
      )}

      {/* Just sitting there text (180f / 25s) - Segmented into rapid punchy phrases */}
      {frame >= 164 && frame < 327 && (
        <div style={{ marginTop: '50px', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {frame >= 164 && frame < 245 && (
            <KineticText 
              text="to a website" 
              delay={164} 
              stagger={4}
              style={{ fontSize: '48px' }}
            />
          )}
          {frame >= 245 && frame < 273 && (
            <KineticText 
              text="that does little more" 
              delay={245} 
              stagger={4}
              style={{ fontSize: '48px' }}
            />
          )}
          {frame >= 273 && (
            <KineticText 
              text="than **SIT** **THERE**" 
              delay={273} 
              stagger={5}
              style={{ fontSize: '64px' }}
            />
          )}
        </div>
      )}

      {/* Climax: THAT'S EXPENSIVE. (360f / 31s) */}
      {showExpensive && (
        <div className={shakeClass} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
          <h2 className="font-headline title-red" style={{ fontSize: '110px', textShadow: '0 0 30px rgba(255,0,60,0.8)' }}>
            THAT'S EXPENSIVE
          </h2>
          {frame >= 345 && (
            <div style={{ marginTop: '20px' }}>
              <KineticText 
                text="IT'S A MARKETING *LEAK*" 
                delay={380} 
                stagger={4}
                style={{ fontSize: '48px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

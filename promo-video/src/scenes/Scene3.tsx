import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';
import { AnimatedPhoneScreen } from '../components/AnimatedPhoneScreen';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing mappings relative to Scene3 start (which is frame 960 in the timeline):
  // - 32s (main frame 960) = Scene3 frame 0: "An advanced website..."
  // - 36s (main frame 1080) = Scene3 frame 120: "It works."
  // - 38s (main frame 1140) = Scene3 frame 180: split screen activation
  // - 39s (main frame 1170) = Scene3 frame 210: "Captures Leads"
  // - 40s (main frame 1200) = Scene3 frame 240: "Tracks Behavior"
  // - 43s (main frame 1290) = Scene3 frame 330: "Books Appointments"
  // - 45s (main frame 1350) = Scene3 frame 390: "Answers Instantly"
  // - 47s (main frame 1410) = Scene3 frame 450: "Turns traffic into customers..."

  // Transitions
  const phase1 = frame < 116;
  const phase2 = frame >= 116 && frame < 164;
  const phase3 = frame >= 164;

  // Mobile Dashboard slide-in
  const dashboardSpring = spring({
    frame: Math.max(0, frame - 164),
    fps,
    config: { damping: 15 },
  });
  const dashboardX = interpolate(dashboardSpring, [0, 1], [-600, 0]);
  const dashboardOpacity = interpolate(dashboardSpring, [0, 1], [0, 1]);

  // Lower Third slide-up
  const bannerSpring = spring({
    frame: Math.max(0, frame - 416),
    fps,
    config: { damping: 12 },
  });
  const bannerY = interpolate(bannerSpring, [0, 1], [150, 0]);
  const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1]);

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '60px' }}>
      
      {/* Phase 1: An advanced website doesn't just look professional - Segmented */}
      {phase1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 100px' }}>
          {frame >= 0 && frame < 55 && (
            <KineticText 
              text="AN ADVANCED WEBSITE" 
              delay={0} 
              stagger={4} 
              style={{ fontSize: '80px' }}
            />
          )}
          {frame >= 55 && frame < 82 && (
            <KineticText 
              text="DOESN'T JUST" 
              delay={55} 
              stagger={4} 
              style={{ fontSize: '80px', color: 'var(--color-gray)' }}
            />
          )}
          {frame >= 82 && (
            <KineticText 
              text="LOOK PROFESSIONAL" 
              delay={82} 
              stagger={4} 
              style={{ fontSize: '80px' }}
            />
          )}
        </div>
      )}

      {/* Phase 2: IT WORKS. */}
      {phase2 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText 
            text="**IT** **WORKS**" 
            delay={116} 
            stagger={9}
            style={{ fontSize: '120px', textShadow: '0 0 35px rgba(0, 210, 255, 0.8)' }}
          />
        </div>
      )}

      {/* Phase 3: Split screen with features and mobile mockup */}
      {phase3 && (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0 40px' }}>
          
          {/* Left Column: Mobile Dashboard Mockup */}
          <div 
            style={{ 
              width: '700px', 
              height: '700px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              transform: `translateX(${dashboardX}px)`,
              opacity: dashboardOpacity,
            }}
          >
            <div 
              style={{ 
                borderRadius: '24px', 
                overflow: 'hidden', 
                backgroundColor: 'transparent',
                width: '680px',
                height: '680px'
              }}
            >
              <AnimatedPhoneScreen frame={frame} />
            </div>
          </div>

          {/* Right Column: Features Grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '30px', maxWidth: '1000px', height: '600px', alignContent: 'center' }}>
            
            {/* Feature 1: Captures Leads (Frame 210 / 39s) */}
            {frame >= 198 && (
              <GlowCard 
                glowColor="cyan" 
                delay={198}
                style={{ gridColumn: 'span 2', padding: '25px', display: 'flex', flexDirection: 'column', height: '240px' }}
              >
                <h3 className="font-headline title-cyan" style={{ fontSize: '22px', marginBottom: '10px' }}>⚡ CAPTURES LEADS</h3>
                <p className="text-white" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Smart Forms & Offers</p>
                <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.4' }}>Capturing visitors' details with interactive friction-free forms before they leave</p>
              </GlowCard>
            )}

            {/* Feature 2: Tracks Behavior (Frame 240 / 40s) */}
            {frame >= 239 && (
              <GlowCard 
                glowColor="none" 
                delay={239}
                style={{ gridColumn: 'span 2', padding: '25px', display: 'flex', flexDirection: 'column', height: '240px' }}
              >
                <h3 className="font-headline text-white" style={{ fontSize: '22px', marginBottom: '10px' }}>📊 TRACKS BEHAVIOR</h3>
                <p className="text-white" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Analytics & Radar</p>
                <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.4' }}>Knowing exactly what visitors do where they click and where they drop off</p>
              </GlowCard>
            )}

            {/* Feature 3: Automates Follow-Up (Frame 255) */}
            {frame >= 280 && (
              <GlowCard 
                glowColor="cyan" 
                delay={280}
                style={{ gridColumn: 'span 2', padding: '25px', display: 'flex', flexDirection: 'column', height: '240px' }}
              >
                <h3 className="font-headline title-cyan" style={{ fontSize: '22px', marginBottom: '10px' }}>✉️ AUTOMATES FOLLOW-UP</h3>
                <p className="text-white" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Nurture Campaigns</p>
                <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.4' }}>Automated email & SMS sequences that keep your prospects engaged and ready to buy</p>
              </GlowCard>
            )}

            {/* Feature 4: Books Appointments (Frame 330 / 43s) */}
            {frame >= 320 && (
              <GlowCard 
                glowColor="none" 
                delay={320}
                style={{ gridColumn: '2 / span 2', padding: '25px', display: 'flex', flexDirection: 'column', height: '240px' }}
              >
                <h3 className="font-headline text-white" style={{ fontSize: '22px', marginBottom: '10px' }}>📅 BOOKS APPOINTMENTS</h3>
                <p className="text-white" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Automated Scheduling</p>
                <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.4' }}>A self-serve scheduling system that fills your calendar with qualified bookings</p>
              </GlowCard>
            )}

            {/* Feature 5: Answers Instantly (Frame 390 / 45s) */}
            {frame >= 375 && (
              <GlowCard 
                glowColor="cyan" 
                delay={375}
                style={{ gridColumn: '4 / span 2', padding: '25px', display: 'flex', flexDirection: 'column', height: '240px' }}
              >
                <h3 className="font-headline title-cyan" style={{ fontSize: '22px', marginBottom: '10px' }}>🤖 ANSWERS INSTANTLY</h3>
                <p className="text-white" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>AI & Automation Chat</p>
                <p className="text-gray" style={{ fontSize: '14px', lineHeight: '1.4' }}>Resolving customer queries 24/7 with instant automated chat assistance</p>
              </GlowCard>
            )}
          </div>
          
          {/* Lower Third Banner (Frame 450 / 47s) */}
          {frame >= 416 && (
            <div 
              className="glass-card cyan-glow-border"
              style={{
                position: 'absolute',
                bottom: '30px',
                left: 'calc(50% - 400px)',
                width: '800px',
                height: '70px',
                padding: '0 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateY(${bannerY}px)`,
                opacity: bannerOpacity,
                borderRadius: '35px',
                backgroundColor: 'rgba(7, 12, 24, 0.95)',
                zIndex: 100,
              }}
            >
              <h4 className="font-headline title-cyan" style={{ fontSize: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                TURNING YOUR TRAFFIC INTO PAYING CUSTOMERS
              </h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

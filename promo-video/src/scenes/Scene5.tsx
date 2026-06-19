import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { FileText, Handshake, Target, TrendingUp } from 'lucide-react';
import { KineticText } from '../components/KineticText';
import { GlowCard } from '../components/GlowCard';
import { AnimatedFunnel } from '../components/AnimatedFunnel';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing mappings relative to Scene 5 start (which is frame 1773 in the timeline):
  // - 59.1s (main frame 1773) = Scene5 frame 0: "Because the businesses winning today..."
  // - 63.63s (main frame 1909) = Scene5 frame 136: "They're converting more..."
  // - 67.27s (main frame 2018) = Scene5 frame 218: "difference: website vs revenue system"
  // - 71.81s (main frame 2155) = Scene5 frame 355: builds trust (382f), captures opportunities (409f), grows business (464f)

  const showPhase1 = frame < 136;
  const showPhase2 = frame >= 136 && frame < 218;
  const showPhase3 = frame >= 218 && frame < 355;
  const showPhase4 = frame >= 355;

  // Split Screen Animations for Phase 3
  const splitSpring = spring({
    frame: Math.max(0, frame - 218),
    fps,
    config: { damping: 15 },
  });
  const splitLeftX = interpolate(splitSpring, [0, 1], [-300, 0]);
  const splitRightX = interpolate(splitSpring, [0, 1], [300, 0]);
  const splitOpacity = interpolate(splitSpring, [0, 1], [0, 1]);

  return (
    <div style={{ position: 'relative', width: 1920, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '60px' }}>
      
      {/* Phase 1: Businesses winning today aren't spending more (0 - 136f) - Segmented */}
      {showPhase1 && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%' }}>
          {frame >= 0 && (
            <KineticText 
              text="THE BUSINESSES" 
              delay={0} 
              stagger={4} 
              style={{ fontSize: '50px', letterSpacing: '2px', color: 'var(--color-gray)' }}
            />
          )}
          {frame >= 27 && (
            <KineticText 
              text="**WINNING** **TODAY**" 
              delay={27} 
              stagger={4} 
              style={{ fontSize: '84px', textShadow: '0 0 25px rgba(0, 210, 255, 0.4)' }}
            />
          )}
          {frame >= 55 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              <KineticText 
                text="AREN'T ALWAYS" 
                delay={55} 
                stagger={4} 
                style={{ fontSize: '40px', color: 'var(--color-gray)' }}
              />
              {frame >= 70 && (
                <KineticText 
                  text="*SPENDING* *MORE*" 
                  delay={70} 
                  stagger={5} 
                  style={{ fontSize: '100px', textShadow: '0 0 30px rgba(255, 0, 60, 0.6)' }}
                />
              )}
              {frame >= 90 && (
                <KineticText 
                  text="ON MARKETING" 
                  delay={90} 
                  stagger={5} 
                  style={{ fontSize: '40px', color: 'var(--color-gray)' }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Phase 2: Converting more of what they have (136 - 218f) - Segmented */}
      {showPhase2 && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', padding: '0 80px' }}>
          {frame >= 136 && (
            <KineticText 
              text="THEY'RE" 
              delay={136} 
              stagger={4} 
              style={{ fontSize: '40px', color: 'var(--color-gray)' }}
            />
          )}
          {frame >= 148 && (
            <KineticText 
              text="**CONVERTING**" 
              delay={148} 
              stagger={4} 
              style={{ fontSize: '84px', textShadow: '0 0 25px rgba(0, 210, 255, 0.4)' }}
            />
          )}
          {frame >= 164 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
              <KineticText 
                text="OF THE TRAFFIC" 
                delay={164} 
                stagger={4} 
                style={{ fontSize: '40px', color: 'var(--color-gray)' }}
              />
              {frame >= 176 && (
                <KineticText 
                  text="THEY **ALREADY** **HAVE**" 
                  delay={176} 
                  stagger={5} 
                  style={{ fontSize: '76px', textShadow: '0 0 25px rgba(0, 210, 255, 0.4)' }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Phase 3: Split comparison Website vs. Revenue System (218 - 355f) */}
      {showPhase3 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center', opacity: splitOpacity }}>
          
          <h2 className="font-headline text-white" style={{ fontSize: '42px', marginBottom: '50px' }}>
            THE DIFFERENCE
          </h2>

          <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            
            {/* Left Card: WEBSITE */}
            <div style={{ transform: `translateX(${splitLeftX}px)` }}>
              <GlowCard 
                glowColor="none"
                style={{ width: '400px', height: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.08)', opacity: 0.6 }}
              >
                <div className="font-headline" style={{ fontSize: '32px', color: 'var(--color-gray)', marginBottom: '20px' }}>WEBSITE</div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--color-gray)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                  <FileText size={36} color="var(--color-gray)" />
                </div>
                <p className="text-gray" style={{ fontSize: '18px', textAlign: 'center', padding: '0 20px' }}>
                  Just sits there acts as a passive brochure
                </p>
              </GlowCard>
            </div>

            <div className="font-headline" style={{ fontSize: '36px', color: 'var(--color-gray)' }}>VS</div>

            {/* Right Card: REVENUE SYSTEM */}
            <div style={{ transform: `translateX(${splitRightX}px)` }}>
              <GlowCard 
                glowColor="cyan"
                style={{ 
                  width: '660px', 
                  height: '480px', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  padding: '25px'
                }}
              >
                {/* Generated Funnel Graphic in card - containment style without crop */}
                <div style={{ width: '280px', height: '430px', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#050a16', marginRight: '20px' }}>
                  <AnimatedFunnel frame={frame} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="font-headline title-cyan" style={{ fontSize: '32px', marginBottom: '15px' }}>REVENUE SYSTEM</div>
                  <p className="text-white" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>A Conversion Engine</p>
                  <ul className="text-gray" style={{ fontSize: '15px', lineHeight: '1.4', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>✓ Captures opportunities automatically</li>
                    <li>✓ Tracks source to close data</li>
                    <li>✓ Automates lead nurturing 24/7</li>
                  </ul>
                </div>
              </GlowCard>
            </div>

          </div>
        </div>
      )}

      {/* Phase 4: A system that builds trust, captures opportunities, grows business (355f+) */}
      {showPhase4 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          <h2 className="font-headline title-cyan" style={{ fontSize: '36px', marginBottom: '60px' }}>
            A SYSTEM BUILT FOR GROWTH
          </h2>

          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%', maxWidth: '1300px' }}>
            
            {/* Element 1: Builds Trust (reveals at 382f) */}
            {frame >= 382 && (
              <GlowCard 
                glowColor="cyan" 
                delay={382}
                style={{ width: '380px', height: '280px', padding: '30px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Handshake size={40} color="var(--color-cyan)" style={{ marginBottom: '15px' }} />
                <div className="font-headline title-cyan" style={{ fontSize: '24px', marginBottom: '10px' }}>BUILDS TRUST</div>
                <p className="text-gray" style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.4' }}>Credibility indicators that turn first-time visitors into buyers</p>
              </GlowCard>
            )}

            {/* Element 2: Captures Opportunities (reveals at 409f) */}
            {frame >= 409 && (
              <GlowCard 
                glowColor="cyan" 
                delay={409}
                style={{ width: '380px', height: '280px', padding: '30px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Target size={40} color="var(--color-cyan)" style={{ marginBottom: '15px' }} />
                <div className="font-headline title-cyan" style={{ fontSize: '20px', marginBottom: '10px' }}>CAPTURES OPPORTUNITIES</div>
                <p className="text-gray" style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.4' }}>No opportunity left behind—instant pathways to capture details</p>
              </GlowCard>
            )}

            {/* Element 3: Helps Grow 24/7 (reveals at 464f) */}
            {frame >= 464 && (
              <GlowCard 
                glowColor="cyan" 
                delay={464}
                style={{ width: '380px', height: '280px', padding: '30px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <TrendingUp size={40} color="var(--color-cyan)" style={{ marginBottom: '15px' }} />
                <div className="font-headline title-cyan" style={{ fontSize: '24px', marginBottom: '10px' }}>GROWS 24/7</div>
                <p className="text-gray" style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.4' }}>Captures leads and schedules appointments around the clock</p>
              </GlowCard>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  Gift, 
  Crown, 
  Infinity as InfinityIcon,
  TrendingUp
} from 'lucide-react';
import { interpolate } from 'remotion';

interface AnimatedFunnelProps {
  frame: number;
}

export const AnimatedFunnel: React.FC<AnimatedFunnelProps> = ({ frame }) => {
  // Funnel dimensions:
  // Container: width 250px, height 380px (actual grid height: 310px)
  // Left node X: 20px
  // Right node X: 230px
  // Center X: 125px
  
  // Left nodes Y:
  // Google Ads: 37px
  // Meta Ads: 152px
  // SEO Traffic: 267px
  
  // Right nodes Y:
  // New Customers: 37px
  // Repeat Buyers: 152px
  // Loyal Clients: 267px

  // Funnel stages Y (Centers):
  // Awareness: 62px
  // Consideration: 127px
  // Evaluation: 192px
  // Purchase: 257px

  const totalParticles = 12;
  const particles = Array.from({ length: totalParticles }).map((_, idx) => {
    const particleFrame = (frame * 1.1 + idx * 30) % 120;
    const pathType = idx % 3; // 0: Google, 1: Meta, 2: SEO

    let x = 125;
    let y = 62;
    let opacity = 0;
    let color = 'var(--color-cyan)';

    const startY = pathType === 0 ? 37 : pathType === 1 ? 152 : 267;
    const endY = pathType === 0 ? 37 : pathType === 1 ? 152 : 267;

    if (particleFrame < 40) {
      // Phase 1: Inflow (from Left Nodes to Funnel Top at y=62)
      const t = particleFrame / 40;
      x = interpolate(t, [0, 1], [20, 125]);
      y = interpolate(t, [0, 1], [startY, 62]);
      opacity = interpolate(t, [0, 0.2], [0, 1]);
      color = pathType === 0 ? '#3b82f6' : pathType === 1 ? 'var(--color-cyan)' : '#a855f7';
    } else if (particleFrame < 90) {
      // Phase 2: Funnel descent (y=62 to y=257)
      const t = (particleFrame - 40) / 50;
      x = 125 + Math.sin(t * Math.PI * 4) * 4;
      y = interpolate(t, [0, 1], [62, 257]);
      opacity = 1;
      color = t < 0.35 ? 'var(--color-cyan)' : t < 0.7 ? '#a855f7' : '#10b981';
    } else {
      // Phase 3: Outflow (from Funnel Bottom at y=257 to Right Nodes)
      const t = (particleFrame - 90) / 30;
      x = interpolate(t, [0, 1], [125, 230]);
      y = interpolate(t, [0, 1], [257, endY]);
      opacity = interpolate(t, [0.7, 1], [1, 0]);
      color = '#10b981';
    }

    return { x, y, opacity, color };
  });

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      background: '#040814', 
      padding: '20px 15px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)'
    }}>
      
      {/* Header Metric */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '8px', color: 'var(--color-gray)', letterSpacing: '1px', fontWeight: 'bold' }}>REAL-TIME CONVERSION</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>CONVERSION ENGINE</span>
        </div>
        <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <TrendingUp size={10} color="#10b981" />
          <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#10b981' }}>+20.6%</span>
        </div>
      </div>

      {/* Main flow animation grid */}
      <div style={{ position: 'relative', width: '250px', height: '310px', marginTop: '10px', overflow: 'visible' }}>
        
        {/* SVG schematic paths in background */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          {/* Inflow lines */}
          <path d="M 20 37 Q 72.5 37 125 62" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 20 152 Q 72.5 107 125 62" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 20 267 Q 72.5 164.5 125 62" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* Outflow lines */}
          <path d="M 125 257 Q 177.5 147 230 37" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 125 257 H 230" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M 125 257 Q 177.5 262 230 267" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>

        {/* 1. Left Nodes: Traffic Sources */}
        {/* Google Node */}
        <div style={{ position: 'absolute', left: '8px', top: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)' }}>
            G
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Google</span>
        </div>

        {/* Meta Node */}
        <div style={{ position: 'absolute', left: '8px', top: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid var(--color-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-cyan)', boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)' }}>
            <InfinityIcon size={12} />
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Meta</span>
        </div>

        {/* SEO Node */}
        <div style={{ position: 'absolute', left: '8px', top: '255px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}>
            <Search size={11} />
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Search</span>
        </div>

        {/* 2. Funnel rings in the center */}
        {/* Awareness (Cyan) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 45px)',
          top: '55px',
          width: '90px',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(0, 210, 255, 0.12)',
          border: '1px solid var(--color-cyan)',
          boxShadow: '0 0 12px rgba(0, 210, 255, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <span style={{ fontSize: '7px', color: 'var(--color-cyan)', fontWeight: 'bold', scale: '0.9' }}>AWARE</span>
        </div>

        {/* Consideration (Blue) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 33px)',
          top: '120px',
          width: '66px',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid #3b82f6',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <span style={{ fontSize: '7px', color: '#3b82f6', fontWeight: 'bold', scale: '0.85' }}>CONSIDER</span>
        </div>

        {/* Evaluation (Purple) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 22px)',
          top: '185px',
          width: '44px',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(168, 85, 247, 0.12)',
          border: '1px solid #a855f7',
          boxShadow: '0 0 8px rgba(168, 85, 247, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <span style={{ fontSize: '6px', color: '#a855f7', fontWeight: 'bold', scale: '0.8' }}>EVAL</span>
        </div>

        {/* Purchase (Green) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 13px)',
          top: '250px',
          width: '26px',
          height: '14px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          <span style={{ fontSize: '5px', color: '#10b981', fontWeight: 'bold', scale: '0.75' }}>CONV</span>
        </div>

        {/* 3. Right Nodes: Customer Segments */}
        {/* New Customers */}
        <div style={{ position: 'absolute', right: '8px', top: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
            <ShoppingBag size={11} />
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Buyer</span>
        </div>

        {/* Repeat Buyers */}
        <div style={{ position: 'absolute', right: '8px', top: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid #ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', boxShadow: '0 0 10px rgba(236, 72, 153, 0.2)' }}>
            <Gift size={11} />
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Repeat</span>
        </div>

        {/* Loyal Clients */}
        <div style={{ position: 'absolute', right: '8px', top: '255px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.12)', border: '1px solid #eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eab308', boxShadow: '0 0 10px rgba(234, 179, 8, 0.2)' }}>
            <Crown size={11} />
          </div>
          <span style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '2px' }}>Loyal</span>
        </div>

        {/* 4. Active Animated Particles */}
        {particles.map((p, idx) => (
          <div key={idx} style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            transform: 'translate(-3px, -3px)',
            opacity: p.opacity,
            zIndex: 2,
          }} />
        ))}

      </div>

      {/* Footer Stats summary */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>85K</div>
          <div style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '1px' }}>Traffic</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-cyan)' }}>17.5K</div>
          <div style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '1px' }}>Leads</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#10b981' }}>$2.4M</div>
          <div style={{ fontSize: '7px', color: 'var(--color-gray)', marginTop: '1px' }}>Revenue</div>
        </div>
      </div>

    </div>
  );
};

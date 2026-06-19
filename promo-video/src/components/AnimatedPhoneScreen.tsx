import React from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Calendar, 
  User, 
  Bot, 
  Bell, 
  Clock, 
  Plus, 
  MousePointer2,
  CheckCheck,
  LayoutDashboard,
  Users,
  BarChart2
} from 'lucide-react';
import { spring, interpolate } from 'remotion';

interface AnimatedPhoneScreenProps {
  frame: number;
}

export const AnimatedPhoneScreen: React.FC<AnimatedPhoneScreenProps> = ({ frame }) => {
  // Timing variables (Scene 3 starts at 0, relative timelines)
  // - Frame 218: Inbound call screen overlays (divided 240 by 1.1)
  // - Frame 264: Cursor sweeps in (divided 290 by 1.1)
  // - Frame 300: Cursor clicks "Accept & Book" button (divided 330 by 1.1)
  // - Frame 300: Call overlay fades out, Sarah Jenkins slot gets booked in calendar
  // - Frame 355: AI chat assistant bubble slides up (divided 390 by 1.1)

  // Call screen transitions
  const callSlide = interpolate(frame, [214, 218], [-600, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const callOpacity = interpolate(frame, [214, 218], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const callAcceptSlide = interpolate(frame, [300, 307], [0, -600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const callAcceptOpacity = interpolate(frame, [300, 307], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cursor coordinates & hover/click scale
  const cursorX = interpolate(frame, [264, 295], [260, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [264, 295], [540, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorOpacity = interpolate(frame, [264, 268, 300, 305], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const btnScale = interpolate(frame, [295, 299, 303], [1, 0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse animation for ringing (frame based)
  const ring1Scale = 1 + ((frame % 30) / 30) * 1.6;
  const ring1Opacity = 1 - (frame % 30) / 30;
  const ring2Scale = 1 + (((frame + 15) % 30) / 30) * 1.6;
  const ring2Opacity = 1 - ((frame + 15) % 30) / 30;

  // New booked slot spring animation
  const slotSpring = spring({
    frame: Math.max(0, frame - 300),
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });
  const slotHeight = interpolate(slotSpring, [0, 1], [0, 48]);
  const slotOpacity = interpolate(slotSpring, [0, 1], [0, 1]);
  const slotMargin = interpolate(slotSpring, [0, 1], [0, 8]);
  const slotScale = interpolate(slotSpring, [0, 1], [0.85, 1]);

  // AI Chat bubble spring animation
  const chatSpring = spring({
    frame: Math.max(0, frame - 355),
    fps: 30,
    config: { damping: 14, stiffness: 90 },
  });
  const chatY = interpolate(chatSpring, [0, 1], [120, 0]);
  const chatOpacity = interpolate(chatSpring, [0, 1], [0, 1]);

  // Menu items list
  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: false },
    { name: 'Schedule', icon: Calendar, active: true },
    { name: 'Bookings', icon: Clock, active: false },
    { name: 'Contacts', icon: Users, active: false },
    { name: 'Analytics', icon: BarChart2, active: false },
  ];

  return (
    <div style={{ position: 'relative', width: '680px', height: '680px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible' }}>
      
      {/* 1. Left Sidebar menu (glass panel behind phone) */}
      <div style={{
        position: 'absolute',
        left: '20px',
        top: '150px',
        width: '180px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '16px',
        background: 'rgba(7, 12, 24, 0.45)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 210, 255, 0.12)',
        borderRadius: '16px',
        zIndex: 1,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        {sidebarItems.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '10px',
            color: item.active ? 'var(--color-cyan)' : 'var(--color-gray)',
            background: item.active ? 'rgba(0, 210, 255, 0.08)' : 'transparent',
            border: item.active ? '1px solid rgba(0, 210, 255, 0.15)' : '1px solid transparent',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: item.active ? 'bold' : 'normal',
            cursor: 'pointer',
          }}>
            <item.icon size={16} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* 2. Right Floating Card: Recent Bookings */}
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '150px',
        width: '210px',
        padding: '16px',
        background: 'rgba(7, 12, 24, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        zIndex: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: '11px', color: 'var(--color-gray)', letterSpacing: '0.5px', marginBottom: '12px', fontWeight: 'bold' }}>
          RECENT BOOKINGS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px', borderLeft: '3px solid var(--color-cyan)' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>Alex R</div>
              <div style={{ fontSize: '9px', color: 'var(--color-gray)', marginTop: '2px' }}>Oct 24 3:00 PM</div>
            </div>
            <ChevronRightMini />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px', borderLeft: '3px solid #f43f5e' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>Sarah L</div>
              <div style={{ fontSize: '9px', color: 'var(--color-gray)', marginTop: '2px' }}>Oct 25 10:00 AM</div>
            </div>
            <ChevronRightMini />
          </div>
        </div>
      </div>

      {/* 3. Right Floating Card: Availability Graph */}
      <div style={{
        position: 'absolute',
        right: '30px',
        bottom: '120px',
        width: '190px',
        padding: '16px',
        background: 'rgba(7, 12, 24, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        zIndex: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontSize: '11px', color: 'var(--color-gray)', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 'bold' }}>
          AVAILABILITY
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '54px', marginTop: '12px' }}>
          {[35, 65, 45, 85, 55, 75, 50].map((val, idx) => {
            const isWed = idx === 2; // Wed 25 is the active lead booking day
            const activeGlow = isWed && frame >= 300;
            return (
              <div key={idx} style={{
                flex: 1,
                height: `${val}%`,
                background: activeGlow ? 'linear-gradient(to top, var(--color-cyan) 0%, #00f5ff 100%)' : 'rgba(0, 210, 255, 0.15)',
                borderRadius: '3px',
                boxShadow: activeGlow ? '0 0 10px rgba(0, 210, 255, 0.8)' : 'none',
              }} />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--color-gray)', marginTop: '8px' }}>
          <span>Time</span>
          <span>Wed</span>
          <span>Sat</span>
        </div>
      </div>

      {/* 4. Center Phone Mockup */}
      <div style={{
        position: 'absolute',
        width: '310px',
        height: '630px',
        background: '#070c18',
        border: '6px solid #1a2336',
        borderRadius: '40px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 210, 255, 0.18)',
        overflow: 'hidden',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Dynamic Island / Notch */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: 'calc(50% - 45px)',
          width: '90px',
          height: '16px',
          background: '#000',
          borderRadius: '10px',
          zIndex: 20,
        }} />

        {/* Top Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '32px',
          padding: '8px 20px 0 20px',
          zIndex: 15,
        }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff', fontFamily: 'var(--font-body)' }}>10:09</span>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {/* Signal Bars */}
            <div style={{ display: 'flex', gap: '1.5px', alignItems: 'flex-end', height: '8px' }}>
              <div style={{ width: '2px', height: '3px', background: '#fff', borderRadius: '0.5px' }} />
              <div style={{ width: '2px', height: '5px', background: '#fff', borderRadius: '0.5px' }} />
              <div style={{ width: '2px', height: '7px', background: '#fff', borderRadius: '0.5px' }} />
              <div style={{ width: '2px', height: '9px', background: '#fff', borderRadius: '0.5px' }} />
            </div>
            {/* Wifi */}
            <svg style={{ width: '10px', height: '10px', fill: '#fff' }} viewBox="0 0 24 24">
              <path d="M12 21l-12-12c2.9-2.9 6.8-4.5 11-4.5s8.1 1.6 11 4.5l-12 12zm0-16.5c-3.1 0-6 1.2-8.1 3.2l8.1 8.1 8.1-8.1c-2.1-2-5-3.2-8.1-3.2z"/>
            </svg>
            {/* Battery */}
            <div style={{ width: '18px', height: '9px', border: '1px solid rgba(255,255,255,0.7)', borderRadius: '2.5px', padding: '0.8px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--color-cyan)', borderRadius: '1px' }} />
            </div>
          </div>
        </div>

        {/* Outer view of phone screen */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 4px 16px', zIndex: 5 }}>
            <span style={{ fontFamily: 'var(--font-headline)', fontSize: '13px', fontWeight: '900', letterSpacing: '0.8px', color: '#fff', textShadow: '0 0 10px rgba(0, 210, 255, 0.4)' }}>
              SCHEDULER
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Bell size={13} color="var(--color-gray)" />
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-red)' }} />
              </div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 210, 255, 0.3)' }}>
                <User size={12} color="var(--color-cyan)" />
              </div>
            </div>
          </div>

          {/* Scheduler Section */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px', flex: 1, overflow: 'hidden' }}>
            {/* Small label */}
            <span style={{ fontSize: '8px', color: 'var(--color-gray)', letterSpacing: '1px', fontWeight: 'bold', marginTop: '6px' }}>AUTOMATED SCHEDULE</span>
            
            {/* Current Calendar Month banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-cyan)', textShadow: '0 0 8px rgba(0,210,255,0.3)' }}>OCTOBER 2026</span>
              <span style={{ fontSize: '9px', color: 'var(--color-gray)' }}>Mon 23 - Sun 29</span>
            </div>

            {/* Days row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const dayNum = 23 + idx;
                const isWed = idx === 2; // Wed 25 is active
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    width: '26px',
                    padding: '4px 0',
                    borderRadius: '6px',
                    border: isWed ? '1px solid var(--color-cyan)' : '1px solid transparent',
                    background: isWed ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                    boxShadow: isWed ? '0 0 10px rgba(0,210,255,0.2)' : 'none',
                  }}>
                    <span style={{ fontSize: '8px', color: isWed ? 'var(--color-cyan)' : 'var(--color-gray)', fontWeight: isWed ? 'bold' : 'normal' }}>{day}</span>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: isWed ? '#fff' : 'var(--color-gray)' }}>{dayNum}</span>
                  </div>
                );
              })}
            </div>

            {/* Time Slot List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', flex: 1, paddingBottom: '10px', overflow: 'hidden' }}>
              {/* Slot 1: 9:00 AM */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: 'var(--color-gray)', width: '42px', textAlign: 'right' }}>9:00 AM</span>
                <div style={{ flex: 1, padding: '6px 10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '10px', color: '#fff', fontWeight: '500' }}>
                  Client Synch
                </div>
              </div>

              {/* Slot 2: 11:30 AM */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: 'var(--color-gray)', width: '42px', textAlign: 'right' }}>11:30 AM</span>
                <div style={{ flex: 1, padding: '6px 10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '10px', color: '#fff', fontWeight: '500' }}>
                  Product Sync
                </div>
              </div>

              {/* Slot 3: 2:00 PM */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: 'var(--color-gray)', width: '42px', textAlign: 'right' }}>2:00 PM</span>
                <div style={{ flex: 1, padding: '6px 10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '10px', color: '#fff', fontWeight: '500' }}>
                  Design Review
                </div>
              </div>

              {/* NEW Slot 4: 3:00 PM (Animates in at Accept click frame 330) */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                alignItems: 'center',
                height: `${slotHeight}px`,
                opacity: slotOpacity,
                transform: `scale(${slotScale})`,
                margin: `${slotMargin}px 0`,
                overflow: 'hidden',
              }}>
                <span style={{ fontSize: '9px', color: 'var(--color-cyan)', fontWeight: 'bold', width: '42px', textAlign: 'right' }}>3:00 PM</span>
                <div style={{ 
                  flex: 1, 
                  padding: '6px 10px', 
                  background: 'rgba(16, 185, 129, 0.08)', 
                  border: '1px solid rgba(16, 185, 129, 0.3)', 
                  borderRadius: '8px', 
                  fontSize: '10px', 
                  color: '#fff', 
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.2)',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Sarah Jenkins</span>
                    <span style={{ fontSize: '7px', color: '#10b981', fontWeight: 'normal' }}>Google Lead • Inbound Call</span>
                  </div>
                  <span style={{ fontSize: '8px', padding: '2px 5px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '4px', color: '#10b981', fontWeight: 'bold' }}>BOOKED</span>
                </div>
              </div>

              {/* Slot 5: 4:30 PM */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: 'var(--color-gray)', width: '42px', textAlign: 'right' }}>4:30 PM</span>
                <div style={{ flex: 1, padding: '6px 10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '10px', color: '#fff', fontWeight: '500' }}>
                  Dev Huddle
                </div>
              </div>
            </div>

            {/* Smart booking section at bottom of schedule */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '10px', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-cyan) 0%, #0099ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Plus size={14} />
                </div>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#fff' }}>Smart Booking Setup</span>
              </div>
              {/* Pagination Dots */}
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-cyan)' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              </div>
            </div>

          </div>

          {/* 5. Inbound Phone Call Overlay Screen (active frame 218 to 307) */}
          {frame >= 218 && frame < 307 && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              background: 'rgba(7, 12, 24, 0.96)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '45px 20px',
              transform: `translateY(${frame < 300 ? callSlide : callAcceptSlide}px)`,
              opacity: frame < 300 ? callOpacity : callAcceptOpacity,
            }}>
              {/* Top Text */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 0 10px rgba(0, 210, 255, 0.5)' }}>
                  Inbound Call
                </div>
                <div style={{ fontSize: '16px', fontWeight: '950', color: '#fff', marginTop: '6px', fontFamily: 'var(--font-headline)', letterSpacing: '0.5px' }}>
                  NEW LEAD DETECTED
                </div>
              </div>

              {/* Center Avatar & Info */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {/* Ringing waves */}
                <div style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: '2px solid rgba(0, 210, 255, 0.4)',
                  transform: `scale(${ring1Scale})`,
                  opacity: ring1Opacity,
                }} />
                <div style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: '2px solid rgba(0, 210, 255, 0.15)',
                  transform: `scale(${ring2Scale})`,
                  opacity: ring2Opacity,
                }} />

                {/* Avatar Icon */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.25) 0%, rgba(0, 210, 255, 0.05) 100%)',
                  border: '2.5px solid var(--color-cyan)',
                  boxShadow: '0 0 20px rgba(0, 210, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}>
                  <User size={42} color="var(--color-cyan)" />
                </div>

                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginTop: '16px', zIndex: 2 }}>
                  Sarah Jenkins
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-gray)', marginTop: '3px', zIndex: 2 }}>
                  Google Ads Lead • California
                </div>

                <div style={{
                  marginTop: '20px',
                  padding: '10px 14px',
                  background: 'rgba(0, 210, 255, 0.04)',
                  border: '1px solid rgba(0, 210, 255, 0.12)',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#e2e8f0',
                  textAlign: 'center',
                  maxWidth: '220px',
                  lineHeight: '1.4',
                  zIndex: 2,
                }}>
                  💬 "Wants to book a consult call for a website redesign project"
                </div>
              </div>

              {/* Call Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
                {/* Decline Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(255, 0, 60, 0.12)',
                    border: '1px solid rgba(255, 0, 60, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <PhoneOff size={18} color="var(--color-red)" />
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--color-gray)' }}>Decline</span>
                </div>

                {/* Accept Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${btnScale})`,
                  }}>
                    <PhoneCall size={18} color="#fff" />
                  </div>
                  <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 'bold' }}>Accept & Book</span>
                </div>
              </div>
            </div>
          )}

          {/* 6. Mouse Cursor Pointer Animation overlay (active frame 264 to 305) */}
          {frame >= 264 && frame < 305 && (
            <div style={{
              position: 'absolute',
              left: `${cursorX}px`,
              top: `${cursorY}px`,
              zIndex: 100,
              opacity: cursorOpacity,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 6px rgba(0, 210, 255, 0.6))',
            }}>
              <MousePointer2 size={22} color="var(--color-cyan)" style={{ fill: 'var(--color-cyan)' }} />
            </div>
          )}

          {/* 7. AI Chat assistant confirmation bubble overlay (slides up at frame 355) */}
          {frame >= 355 && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '12px',
              right: '12px',
              background: 'rgba(8, 14, 28, 0.95)',
              border: '1px solid rgba(0, 210, 255, 0.45)',
              borderRadius: '16px',
              padding: '10px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 0 15px rgba(0, 210, 255, 0.25)',
              transform: `translateY(${chatY}px)`,
              opacity: chatOpacity,
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
              zIndex: 5,
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(0, 210, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid var(--color-cyan)',
              }}>
                <Bot size={13} color="var(--color-cyan)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-cyan)' }}>AI Assistant</span>
                  <span style={{ fontSize: '8px', color: 'var(--color-gray)' }}>Just now</span>
                </div>
                <p style={{ fontSize: '9.5px', color: '#fff', lineHeight: '1.35', margin: 0 }}>
                  Hi Sarah! Your appointment is confirmed for Wed Oct 25 at 3:00 PM 🚀
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                  <CheckCheck size={10} color="var(--color-cyan)" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Mini components
const ChevronRightMini = () => (
  <svg style={{ width: '12px', height: '12px', fill: 'var(--color-gray)' }} viewBox="0 0 24 24">
    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
  </svg>
);

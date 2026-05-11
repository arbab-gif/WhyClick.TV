import React from 'react';

// ── DESIGN TOKENS ──
const T = {
  bg:          '#0A0A0A',
  green:       '#BDFF00',
  surface:     '#1A1A1A',
  surf2:       '#252525',
  surf3:       '#2E2E2E',
  white:       '#FFFFFF',
  gray:        '#888888',
  red:         '#FF3B30',
  border:      '#2A2A2A',
};

// ── SHARED PRIMITIVES ──

const Screen = ({ children, bg }) => (
  <div style={{
    width: 390, height: 844,
    background: bg || T.bg,
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px #1E1E1E',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  }}>
    {children}
  </div>
);

const StatusBar = () => (
  <div style={{
    height: 50, display: 'flex', alignItems: 'flex-end',
    justifyContent: 'space-between', padding: '0 22px 10px',
    position: 'relative', zIndex: 10,
  }}>
    <span style={{ color: T.white, fontSize: 15, fontWeight: 600 }}>9:41</span>
    <span style={{ color: T.white, fontSize: 11, opacity: 0.8 }}>●●● LTE ▌▌▌</span>
  </div>
);

const BottomTabBar = ({ active = 1 }) => {
  const tabs = ['Home', 'Discover', 'Matches', 'Rank', 'Profile'];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
      background: '#0D0D0D', borderTop: `1px solid ${T.border}`,
      display: 'flex',
    }}>
      {tabs.map((tab, i) => (
        <div key={tab} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 5,
          position: 'relative',
        }}>
          {i === active && (
            <div style={{
              position: 'absolute', top: 0, width: 32, height: 3,
              background: T.green, borderRadius: '0 0 2px 2px',
            }} />
          )}
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: i === active ? T.green : T.surf2,
            opacity: i === active ? 1 : 0.5,
          }} />
          <span style={{
            fontSize: 10, fontWeight: i === active ? 600 : 400,
            color: i === active ? T.green : T.gray,
          }}>{tab}</span>
        </div>
      ))}
    </div>
  );
};

const Pill = ({ label, active }) => (
  <div style={{
    padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
    background: active ? 'rgba(189,255,0,0.12)' : T.surf2,
    color: active ? T.green : T.white,
    border: `1px solid ${active ? T.green : T.border}`,
    whiteSpace: 'nowrap', flexShrink: 0,
  }}>{label}</div>
);

const VerifiedBadge = () => (
  <div style={{
    width: 22, height: 22, borderRadius: '50%', background: T.green,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, color: '#0A0A0A', flexShrink: 0,
  }}>✓</div>
);

const PhotoDots = ({ style }) => (
  <div style={{ display: 'flex', gap: 5, alignItems: 'center', ...style }}>
    {[18, 6, 6, 6].map((w, i) => (
      <div key={i} style={{
        width: w, height: 5, borderRadius: 3,
        background: `rgba(255,255,255,${i === 0 ? 1 : 0.3})`,
      }} />
    ))}
  </div>
);

const PhotoBg = ({ style, gradient }) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: gradient || 'linear-gradient(160deg, #1E2838 0%, #111720 55%, #090E18 100%)',
    ...style,
  }}>
    <div style={{
      position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-50%)',
      color: '#3A3A3A', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
    }}>[ Partner Photo ]</div>
  </div>
);

// ────────────────────────────────────────────────
// SCREEN 01 — DISCOVER
// ────────────────────────────────────────────────
const DiscoverScreen = () => (
  <Screen>
    <StatusBar />

    {/* Top Nav */}
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 56, gap: 10 }}>
      <span style={{ color: T.green, fontSize: 22, fontWeight: 900, letterSpacing: '0.12em', flex: 1 }}>
        LOCK·IN
      </span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: T.surf2, borderRadius: 14, padding: '5px 12px',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green }} />
        <span style={{ color: T.gray, fontSize: 12, fontWeight: 500 }}>24 nearby</span>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: T.surf2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: T.gray, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>≡</span>
      </div>
    </div>

    <div style={{ padding: '0 20px 6px', color: T.gray, fontSize: 12, fontWeight: 500, letterSpacing: '0.05em' }}>
      Workout Partners Near You
    </div>

    {/* Card Stack */}
    <div style={{ position: 'relative', height: 484, margin: '0 8px' }}>
      {/* Back cards for depth */}
      <div style={{
        position: 'absolute', top: 26, left: 22, right: 22, bottom: 0,
        background: T.surf2, borderRadius: 24, opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute', top: 13, left: 11, right: 11, bottom: 0,
        background: T.surface, borderRadius: 24, opacity: 0.7,
      }} />

      {/* Main card */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden' }}>
        <PhotoBg />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 310,
          background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.7) 55%, transparent 100%)',
        }} />

        {/* Compat badge */}
        <div style={{
          position: 'absolute', top: 14, right: 12,
          background: 'rgba(189,255,0,0.12)', border: '1.5px solid rgba(189,255,0,0.5)',
          borderRadius: 14, padding: '5px 10px',
          color: T.green, fontSize: 12, fontWeight: 600,
        }}>⚡ 94% Match</div>

        {/* Distance badge */}
        <div style={{
          position: 'absolute', top: 14, left: 12,
          background: 'rgba(0,0,0,0.55)', borderRadius: 14, padding: '5px 10px',
          color: T.white, fontSize: 11, fontWeight: 500,
        }}>📍 0.8 mi</div>

        <PhotoDots style={{
          position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
        }} />

        {/* Partner info */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
            <span style={{ color: T.white, fontSize: 30, fontWeight: 700, lineHeight: 1 }}>Marcus T.</span>
            <span style={{ color: T.gray, fontSize: 22 }}>27</span>
            <VerifiedBadge />
          </div>
          <div style={{ color: T.gray, fontSize: 13, marginBottom: 4 }}>🏋 Equinox · Hudson Yards</div>
          <div style={{ color: T.gray, fontSize: 12, marginBottom: 12, opacity: 0.7 }}>
            Goal: Strength & Muscle Gain
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Strength', 'HIIT', '5–6 AM'].map(t => <Pill key={t} label={t} />)}
          </div>
        </div>
      </div>
    </div>

    {/* Hint labels */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 6 }}>
      <span style={{ color: T.gray, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 64, textAlign: 'center' }}>PASS</span>
      <span style={{ color: T.green, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 88, textAlign: 'center' }}>LOCK IN</span>
      <span style={{ color: T.gray, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 64, textAlign: 'center' }}>MESSAGE</span>
    </div>

    {/* Action Buttons */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, marginTop: 4 }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: T.surf2, border: '1.5px solid rgba(255,59,48,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 700, color: T.red,
      }}>✕</div>
      <div style={{
        width: 88, height: 88, borderRadius: '50%', background: T.green,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 32px rgba(189,255,0,0.4)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.06em' }}>LOCK</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.06em' }}>IN</span>
      </div>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: T.surf2, border: '1.5px solid rgba(189,255,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>💬</div>
    </div>

    <BottomTabBar active={1} />
  </Screen>
);

// ────────────────────────────────────────────────
// SCREEN 02 — PARTNER PROFILE
// ────────────────────────────────────────────────
const ProfileScreen = () => (
  <Screen>
    {/* Hero photo */}
    <div style={{ position: 'relative', height: 438 }}>
      <PhotoBg />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.2) 55%, transparent 100%)',
      }} />

      {/* Controls */}
      <div style={{ position: 'absolute', top: 52, left: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: T.white, fontSize: 20, fontWeight: 700,
        }}>←</div>
      </div>
      <div style={{ position: 'absolute', top: 52, right: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: T.white, fontSize: 18,
        }}>↑</div>
      </div>
      <PhotoDots style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)' }} />

      {/* Name */}
      <div style={{ position: 'absolute', bottom: 16, left: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: T.white, fontSize: 32, fontWeight: 700 }}>Marcus T.</span>
        <span style={{ color: T.gray, fontSize: 24 }}>27</span>
        <VerifiedBadge />
      </div>
    </div>

    {/* Info */}
    <div style={{ padding: '12px 20px 100px', overflowY: 'auto', maxHeight: 406 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 14,
      }}>
        <span style={{ color: T.gray, fontSize: 13 }}>Equinox · Hudson Yards</span>
        <span style={{ color: T.green, fontSize: 13, fontWeight: 600 }}>0.8 mi</span>
      </div>

      {/* Compat */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>Compatibility</span>
        <span style={{ color: T.green, fontSize: 26, fontWeight: 700 }}>94%</span>
      </div>
      <div style={{ height: 6, background: T.surf2, borderRadius: 3, marginBottom: 10 }}>
        <div style={{ width: '94%', height: '100%', background: T.green, borderRadius: 3 }} />
      </div>
      {[['Training Level','Intermediate (Similar)'],['Schedule','Morning (5–7 AM)'],['Goals','Strength · Muscle Gain']].map(([l,v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: T.gray, fontSize: 12 }}>{l}</span>
          <span style={{ color: T.green, fontSize: 12, fontWeight: 500 }}>{v}</span>
        </div>
      ))}

      {/* About */}
      <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 12, paddingTop: 12 }}>
        <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>About Marcus</div>
        <div style={{ background: T.surface, borderRadius: 12, padding: '10px 14px', color: T.gray, fontSize: 12, lineHeight: 1.55 }}>
          Morning lifter. Focused on progressive overload & hypertrophy. Looking for a consistent training partner 4–5x/week at Equinox HY.
        </div>
      </div>

      {/* Schedule days */}
      <div style={{ marginTop: 14, marginBottom: 10 }}>
        <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Workout Schedule</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['M','T','W','T','F','S','S'].map((d, i) => {
            const on = [1,1,0,1,1,0,0][i];
            return (
              <div key={`${d}${i}`} style={{
                width: 38, height: 38, borderRadius: 10,
                background: on ? T.green : T.surf2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: on ? 700 : 400,
                color: on ? '#0A0A0A' : T.gray,
              }}>{d}</div>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Strength','HIIT','Barbell','Cardio'].map(t => <Pill key={t} label={t} />)}
      </div>
    </div>

    {/* Action bar */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
      background: '#070707', borderTop: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 28,
        background: T.surf2, border: '1.5px solid rgba(255,59,48,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, fontWeight: 700, color: T.red, flexShrink: 0,
      }}>✕</div>
      <div style={{
        flex: 1, height: 56, borderRadius: 28, background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.06em',
      }}>LOCK IN</div>
      <div style={{
        width: 56, height: 56, borderRadius: 28,
        background: T.surf2, border: '1.5px solid rgba(189,255,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
      }}>💬</div>
    </div>
  </Screen>
);

// ────────────────────────────────────────────────
// SCREEN 03 — YOU'RE LOCKED IN!
// ────────────────────────────────────────────────
const MatchScreen = () => (
  <Screen bg="#050505">
    {/* Radial glow */}
    <div style={{
      position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
      width: 520, height: 520,
      background: 'radial-gradient(circle, rgba(189,255,0,0.15) 0%, rgba(189,255,0,0.04) 45%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />

    {/* Confetti dots */}
    {[
      [38,76,8,8,'#BDFF00',0.8],[324,96,6,6,'#fff',0.4],[56,148,5,10,'#BDFF00',0.6],
      [344,168,10,5,'#BDFF00',0.7],[26,304,6,6,'#BDFF00',0.4],[356,284,6,6,'#fff',0.3],
      [354,384,8,4,'#BDFF00',0.5],[16,396,5,5,'#fff',0.35],[370,144,4,8,'#BDFF00',0.5],
    ].map(([x,y,w,h,c,o],i) => (
      <div key={i} style={{
        position: 'absolute', left: x, top: y, width: w, height: h,
        background: c, opacity: o, borderRadius: 2, pointerEvents: 'none',
      }} />
    ))}

    <StatusBar />

    {/* Title */}
    <div style={{ textAlign: 'center', marginTop: 48, padding: '0 20px' }}>
      <div style={{ fontSize: 46, fontWeight: 900, color: T.white, letterSpacing: '0.06em', lineHeight: 1 }}>
        YOU'RE
      </div>
      <div style={{
        fontSize: 46, fontWeight: 900, color: T.green, letterSpacing: '0.06em', lineHeight: 1.1,
        borderBottom: `3px solid ${T.green}`, display: 'inline-block', paddingBottom: 4,
      }}>LOCKED IN</div>
    </div>
    <div style={{ textAlign: 'center', color: T.gray, fontSize: 14, marginTop: 10 }}>
      You and Marcus are now connected
    </div>

    {/* Avatar pair */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginTop: 32 }}>
      {/* My avatar */}
      <div style={{
        width: 138, height: 138, borderRadius: '50%',
        border: `3px solid ${T.green}`,
        background: 'linear-gradient(160deg, #1C2333 0%, #0D1018 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 28px rgba(189,255,0,0.3)', zIndex: 2, flexShrink: 0,
      }}>
        <span style={{ color: T.white, fontSize: 14, fontWeight: 600 }}>Me</span>
      </div>
      {/* Bolt */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%', background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, fontWeight: 900, color: '#0A0A0A', zIndex: 3, flexShrink: 0,
        boxShadow: '0 0 20px rgba(189,255,0,0.6)', margin: '0 -10px',
      }}>⚡</div>
      {/* Their avatar */}
      <div style={{
        width: 138, height: 138, borderRadius: '50%',
        border: `3px solid ${T.green}`,
        background: 'linear-gradient(160deg, #1E2838 0%, #060C18 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 28px rgba(189,255,0,0.3)', zIndex: 2, flexShrink: 0,
      }}>
        <span style={{ color: T.white, fontSize: 12, fontWeight: 600 }}>Marcus T.</span>
      </div>
    </div>

    {/* Stats */}
    <div style={{
      display: 'flex', margin: '28px 20px 0',
      background: T.surface, borderRadius: 18, overflow: 'hidden',
    }}>
      {[['94%','Match Score'],['3','Shared Goals'],['0.8mi','Distance']].map((s, i) => (
        <div key={s[0]} style={{
          flex: 1, textAlign: 'center', padding: '16px 0',
          borderRight: i < 2 ? `1px solid ${T.border}` : 'none',
        }}>
          <div style={{ color: T.green, fontSize: 22, fontWeight: 700 }}>{s[0]}</div>
          <div style={{ color: T.gray, fontSize: 11, marginTop: 4 }}>{s[1]}</div>
        </div>
      ))}
    </div>

    {/* Suggested session */}
    <div style={{
      margin: '14px 20px 0', background: T.surface, borderRadius: 16,
      border: `1px solid ${T.border}`, padding: '14px 16px', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 12, bottom: 12, width: 3,
        background: T.green, borderRadius: '0 2px 2px 0',
      }} />
      <div style={{ color: T.green, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Suggested First Session</div>
      <div style={{ color: T.gray, fontSize: 12, marginBottom: 2 }}>Equinox Hudson Yards · Tomorrow · 6:00 AM</div>
      <div style={{ color: T.white, fontSize: 12, fontWeight: 500 }}>Legs + Core</div>
    </div>

    {/* CTAs */}
    <div style={{ padding: '18px 20px 0' }}>
      <div style={{
        height: 56, borderRadius: 28, background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.04em',
        boxShadow: '0 8px 32px rgba(189,255,0,0.3)', marginBottom: 12,
      }}>START TRAINING CHAT</div>
      <div style={{
        height: 48, borderRadius: 24, border: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 500, color: T.gray,
      }}>Keep Swiping</div>
    </div>

    <div style={{
      position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
      width: 134, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.25)',
    }} />
  </Screen>
);

// ────────────────────────────────────────────────
// SCREEN 04 — MATCHES LIST
// ────────────────────────────────────────────────
const convData = [
  { name: 'Marcus T.', msg: 'Tomorrow 6AM still good?', time: 'now',       unread: 2, active: true },
  { name: 'Alex R.',   msg: 'Bro the gains are real haha', time: '12m',    unread: 0, active: true },
  { name: 'Jordan K.', msg: 'Session was fire! Same time Friday?', time: '1h', unread: 1, active: false },
  { name: 'Sam W.',    msg: "I'm in! Legs or chest?", time: '3h',          unread: 0, active: false },
  { name: 'Priya M.',  msg: "Can't make it tmrw, rain check?", time: 'Yday', unread: 0, active: false },
];

const MatchesScreen = () => (
  <Screen>
    <StatusBar />

    <div style={{ padding: '0 20px 4px' }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: T.white }}>Matches</div>
      <div style={{ fontSize: 13, color: T.gray }}>Your Workout Partners</div>
    </div>

    {/* Search */}
    <div style={{
      margin: '10px 20px', background: T.surf2, borderRadius: 22,
      border: `1px solid ${T.border}`, padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ color: T.gray }}>🔍</span>
      <span style={{ color: T.gray, fontSize: 14 }}>Search partners...</span>
    </div>

    {/* New matches header */}
    <div style={{ padding: '4px 20px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>New Matches</span>
      <div style={{
        background: T.green, borderRadius: 10, padding: '1px 7px',
        fontSize: 11, fontWeight: 700, color: '#0A0A0A',
      }}>4</div>
    </div>

    {/* Avatar row */}
    <div style={{ display: 'flex', paddingLeft: 14, gap: 2, marginBottom: 8, overflowX: 'hidden' }}>
      {['Alex R.','Jordan K.','Sam W.','Chris M.','See all'].map((name, i) => (
        <div key={name} style={{ width: 78, flexShrink: 0, textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 62, height: 62, margin: '0 auto 5px' }}>
            <div style={{
              width: 62, height: 62, borderRadius: '50%',
              border: i < 4 ? `2.5px solid ${T.green}` : `2px solid ${T.border}`,
              background: i < 4
                ? `linear-gradient(160deg, hsl(${210 + i * 15}, 28%, ${22 + i * 3}%) 0%, #090E18 100%)`
                : T.surf2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: i < 4 ? 11 : 18, fontWeight: 600,
              color: i < 4 ? T.white : T.gray,
            }}>
              {i < 4 ? name.split(' ')[0] : '···'}
            </div>
            {i < 4 && (
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 14, height: 14, borderRadius: '50%',
                background: T.green, border: `2px solid ${T.bg}`,
              }} />
            )}
          </div>
          <div style={{ fontSize: 11, color: T.white, fontWeight: 500 }}>{name.split(' ')[0]}</div>
          <div style={{ fontSize: 10, color: T.gray }}>
            {['Today','2h ago','5h ago','Yday',''][i]}
          </div>
        </div>
      ))}
    </div>

    <div style={{ margin: '4px 20px 8px', height: 1, background: T.border }} />

    <div style={{ padding: '0 20px 8px', color: T.white, fontSize: 13, fontWeight: 600 }}>
      Training Chats
    </div>

    {convData.map((conv, i) => (
      <div key={conv.name} style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 20px',
        borderBottom: i < convData.length - 1 ? `1px solid ${T.border}` : 'none',
        gap: 12,
      }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `linear-gradient(160deg, hsl(${210 + i * 10}, 26%, ${20 + i * 3}%) 0%, #090E18 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, color: T.white,
          }}>
            {conv.name.split(' ').map(w => w[0]).join('')}
          </div>
          {conv.active && (
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 12, height: 12, borderRadius: '50%',
              background: T.green, border: `2px solid ${T.bg}`,
            }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: T.white, fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{conv.name}</div>
          <div style={{
            color: conv.unread > 0 ? T.white : T.gray,
            fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{conv.msg}</div>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
          <span style={{ color: T.gray, fontSize: 10 }}>{conv.time}</span>
          {conv.unread > 0 && (
            <div style={{
              background: T.green, borderRadius: 10, minWidth: 20, height: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#0A0A0A', padding: '0 4px',
            }}>{conv.unread}</div>
          )}
        </div>
      </div>
    ))}

    <BottomTabBar active={2} />
  </Screen>
);

// ────────────────────────────────────────────────
// SCREEN 05 — CHAT
// ────────────────────────────────────────────────
const chatMsgs = [
  { me: false, text: "Hey! Just confirmed our session for tomorrow 6AM. Legs day — you in?", time: "9:15 AM" },
  { me: true,  text: "100%! I'll be there. Romanian DLs or conventional?", time: "9:17 AM" },
  { me: false, text: "Conventional for sure. Hitting 3x5 @ 80%. What's your working weight?", time: "9:19 AM" },
  { me: true,  text: "Around 275lbs. Working on form consistency.", time: "9:21 AM" },
  { me: false, text: "Nice! I'm at 290. Let's warm up together — tomorrow is going to be fire.", time: "9:22 AM" },
];

const ChatScreen = () => (
  <Screen>
    {/* Header */}
    <div style={{
      height: 92, background: '#070707', borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'flex-end', padding: '0 16px 12px', gap: 12,
    }}>
      <span style={{ color: T.white, fontSize: 20, fontWeight: 700 }}>←</span>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(160deg, #1E2838 0%, #060C18 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: T.white,
        }}>MT</div>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 12, height: 12, borderRadius: '50%',
          background: T.green, border: '2px solid #070707',
        }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: T.white, fontSize: 16, fontWeight: 600 }}>Marcus T.</div>
        <div style={{ color: T.green, fontSize: 12 }}>Active now · Equinox HY</div>
      </div>
      <span style={{ color: T.gray, fontSize: 20 }}>···</span>
    </div>

    {/* Session context */}
    <div style={{
      margin: '10px 16px', background: T.surface, borderRadius: 12,
      border: '1px solid rgba(189,255,0,0.2)', padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 10, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 10, bottom: 10, width: 3,
        background: T.green, borderRadius: '0 2px 2px 0',
      }} />
      <div style={{ flex: 1, paddingLeft: 8 }}>
        <div style={{ color: T.white, fontSize: 12, fontWeight: 500 }}>
          Next session — Tomorrow 6:00 AM · Legs + Core
        </div>
        <div style={{ color: T.gray, fontSize: 11 }}>Equinox Hudson Yards</div>
      </div>
      <div style={{
        background: T.surf2, borderRadius: 8, padding: '4px 10px',
        color: T.green, fontSize: 11, fontWeight: 600, flexShrink: 0,
      }}>Edit</div>
    </div>

    {/* Messages */}
    <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {chatMsgs.map((msg, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.me ? 'flex-end' : 'flex-start' }}>
          <div style={{
            maxWidth: '78%', padding: '10px 14px',
            background: msg.me ? T.green : T.surf2,
            color: msg.me ? '#0A0A0A' : T.white,
            borderRadius: msg.me ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
            fontSize: 13, lineHeight: 1.45,
          }}>{msg.text}</div>
          <span style={{ color: T.gray, fontSize: 10, marginTop: 3, marginLeft: 4, marginRight: 4 }}>
            {msg.time}
          </span>
        </div>
      ))}
    </div>

    {/* Quick replies */}
    <div style={{ display: 'flex', gap: 8, padding: '10px 16px', overflowX: 'auto' }}>
      {["Let's go!", "What time?", "Same!"].map(qr => (
        <div key={qr} style={{
          flexShrink: 0, background: T.surf2, border: `1px solid ${T.border}`,
          borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 500, color: T.white,
        }}>{qr}</div>
      ))}
    </div>

    {/* Input bar */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
      background: '#070707', borderTop: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: T.surf2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, fontWeight: 700, color: T.gray, flexShrink: 0,
      }}>+</div>
      <div style={{
        flex: 1, height: 44, borderRadius: 22, background: T.surf2,
        border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center',
        padding: '0 16px', color: T.gray, fontSize: 14,
      }}>Message Marcus...</div>
      <div style={{
        height: 44, borderRadius: 22, background: T.green,
        padding: '0 20px', display: 'flex', alignItems: 'center',
        fontSize: 13, fontWeight: 700, color: '#0A0A0A', flexShrink: 0,
      }}>Send</div>
    </div>
  </Screen>
);

// ────────────────────────────────────────────────
// SCREEN 06 — FILTER
// ────────────────────────────────────────────────
const FilterScreen = () => {
  const selTypes = ['Strength', 'HIIT'];
  const selExp   = ['Intermediate', 'Advanced'];
  const schedSlots = [
    { label: 'Early Bird', sub: '5–8 AM',   on: true  },
    { label: 'Morning',    sub: '8–11 AM',  on: false },
    { label: 'Afternoon',  sub: '12–5 PM',  on: false },
    { label: 'Evening',    sub: '5–9 PM',   on: false },
  ];

  return (
    <Screen>
      {/* Header */}
      <div style={{
        height: 92, background: '#070707', borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'flex-end', padding: '0 20px 14px',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: T.gray, fontSize: 18, fontWeight: 700 }}>✕</span>
        <span style={{ color: T.white, fontSize: 18, fontWeight: 700 }}>Find My Partner</span>
        <span style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>Reset</span>
      </div>

      <div style={{ padding: '0 20px', overflowY: 'auto', maxHeight: 690 }}>

        {/* Distance */}
        <div style={{ marginTop: 18, marginBottom: 16 }}>
          <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Distance</div>
          <div style={{ color: T.green, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>Within 5 miles</div>
          <div style={{ position: 'relative', height: 20, marginBottom: 6 }}>
            <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 4, background: T.surf2, borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: 7, left: 0, width: '22%', height: 4, background: T.green, borderRadius: 2 }} />
            <div style={{
              position: 'absolute', top: 0, left: '22%', marginLeft: -10,
              width: 20, height: 20, borderRadius: '50%',
              background: T.white, border: `3px solid ${T.green}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: T.gray, fontSize: 11 }}>1 mi</span>
            <span style={{ color: T.gray, fontSize: 11 }}>25 mi</span>
          </div>
        </div>

        <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

        {/* Workout type */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Workout Type</div>
          {[
            ['Strength','HIIT','Cardio','CrossFit'],
            ['Pilates','Yoga','Calisthenics','Boxing'],
          ].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {row.map(wt => <Pill key={wt} label={wt} active={selTypes.includes(wt)} />)}
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

        {/* Schedule */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Preferred Schedule</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {schedSlots.map(slot => (
              <div key={slot.label} style={{
                flex: 1, borderRadius: 12, padding: '10px 6px', textAlign: 'center',
                background: slot.on ? 'rgba(189,255,0,0.1)' : T.surf2,
                border: `1px solid ${slot.on ? T.green : T.border}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: slot.on ? T.green : T.white, marginBottom: 2 }}>
                  {slot.label}
                </div>
                <div style={{ fontSize: 10, color: T.gray }}>{slot.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

        {/* Experience level */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Experience Level</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Beginner','Intermediate','Advanced','Elite'].map(lvl => (
              <Pill key={lvl} label={lvl} active={selExp.includes(lvl)} />
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: T.border, marginBottom: 16 }} />

        {/* Toggles */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: T.white, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Preferences</div>
          {[
            { label: 'Verified Profiles Only', sub: 'Show only ID-verified partners', on: true },
            { label: 'Same Gym',               sub: 'Prioritize same-gym matches',    on: false },
          ].map(tog => (
            <div key={tog.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
            }}>
              <div>
                <div style={{ color: T.white, fontSize: 14, fontWeight: 500 }}>{tog.label}</div>
                <div style={{ color: T.gray, fontSize: 11 }}>{tog.sub}</div>
              </div>
              <div style={{
                width: 44, height: 26, borderRadius: 13,
                background: tog.on ? T.green : T.surf2, position: 'relative', flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', top: 3, left: tog.on ? 22 : 3,
                  width: 20, height: 20, borderRadius: '50%', background: T.white,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Match count + CTA */}
        <div style={{ color: T.gray, fontSize: 12, textAlign: 'center', marginBottom: 10 }}>
          147 partners match your criteria
        </div>
        <div style={{
          height: 56, borderRadius: 28, background: T.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.04em',
          boxShadow: '0 8px 24px rgba(189,255,0,0.3)', marginBottom: 24,
        }}>FIND MY GYM PARTNER</div>
      </div>
    </Screen>
  );
};

// ────────────────────────────────────────────────
// TRAINER SCREENS  (T1 · T2 · T3)
// ────────────────────────────────────────────────

const GOLD = '#FFB800';
const GOLD_DIM = 'rgba(255,184,0,0.14)';
const GOLD_BORDER = 'rgba(255,184,0,0.45)';

// ── T1: TRAINER CARD (in the Discover swipe deck) ──
const TrainerCardScreen = () => (
  <Screen>
    <StatusBar />

    {/* Top Nav */}
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 56, gap: 10 }}>
      <span style={{ color: T.green, fontSize: 22, fontWeight: 900, letterSpacing: '0.12em', flex: 1 }}>LOCK·IN</span>
      <div style={{
        background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 14, padding: '5px 12px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
        <span style={{ color: GOLD, fontSize: 12, fontWeight: 600 }}>Trainers</span>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: T.surf2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: T.gray, fontSize: 18, fontWeight: 700 }}>≡</span>
      </div>
    </div>

    <div style={{ padding: '0 20px 6px', color: T.gray, fontSize: 12, fontWeight: 500, letterSpacing: '0.05em' }}>
      Personal Trainers Near You
    </div>

    {/* Card Stack */}
    <div style={{ position: 'relative', height: 484, margin: '0 8px' }}>
      <div style={{ position: 'absolute', top: 26, left: 22, right: 22, bottom: 0, background: T.surf2, borderRadius: 24, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: 13, left: 11, right: 11, bottom: 0, background: T.surface, borderRadius: 24, opacity: 0.7 }} />

      {/* Main trainer card */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 24, overflow: 'hidden' }}>
        <PhotoBg gradient="linear-gradient(160deg, #1A1F2E 0%, #101520 55%, #080C15 100%)" />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 320,
          background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.72) 55%, transparent 100%)',
        }} />

        {/* TRAINER badge — gold, top-right */}
        <div style={{
          position: 'absolute', top: 14, right: 12,
          background: GOLD_DIM, border: `1.5px solid ${GOLD_BORDER}`,
          borderRadius: 14, padding: '5px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontSize: 10 }}>★</span>
          <span style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>TRAINER</span>
        </div>

        {/* Distance badge */}
        <div style={{
          position: 'absolute', top: 14, left: 12,
          background: 'rgba(0,0,0,0.55)', borderRadius: 14, padding: '5px 10px',
          color: T.white, fontSize: 11, fontWeight: 500,
        }}>📍 1.2 mi</div>

        <PhotoDots style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)' }} />

        {/* Certification + rating row */}
        <div style={{
          position: 'absolute', bottom: 148, left: 16,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
            borderRadius: 8, padding: '4px 10px',
            color: GOLD, fontSize: 11, fontWeight: 700,
          }}>NASM-CPT</div>
          <div style={{
            background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '4px 10px',
            color: T.white, fontSize: 11, fontWeight: 600,
          }}>★ 4.9</div>
          <div style={{
            background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '4px 10px',
            color: T.white, fontSize: 11, fontWeight: 600,
          }}>47 clients</div>
        </div>

        {/* Partner info */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ color: T.white, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>Coach Sarah K.</span>
            <VerifiedBadge />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: T.gray, fontSize: 13 }}>🏋 Equinox · Hudson Yards</span>
            <span style={{ color: GOLD, fontSize: 13, fontWeight: 700 }}>$80/session</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Weight Loss', 'Strength', 'Body Recomp'].map(t => (
              <div key={t} style={{
                padding: '6px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                background: 'rgba(0,0,0,0.45)', border: `1px solid ${T.border}`,
                color: T.white, whiteSpace: 'nowrap',
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Hint labels */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 6 }}>
      <span style={{ color: T.gray, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 64, textAlign: 'center' }}>SKIP</span>
      <span style={{ color: T.green, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 88, textAlign: 'center' }}>BOOK INTRO</span>
      <span style={{ color: T.gray, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', width: 64, textAlign: 'center' }}>MESSAGE</span>
    </div>

    {/* Action buttons */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, marginTop: 4 }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: T.surf2, border: '1.5px solid rgba(255,59,48,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, fontWeight: 700, color: T.red,
      }}>✕</div>
      <div style={{
        width: 88, height: 88, borderRadius: '50%', background: T.green,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 32px rgba(189,255,0,0.4)',
      }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.04em' }}>BOOK</span>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.04em' }}>INTRO</span>
      </div>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: T.surf2, border: '1.5px solid rgba(189,255,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
      }}>💬</div>
    </div>

    <BottomTabBar active={1} />
  </Screen>
);

// ── T2: PENDING MATCH — You locked in, waiting for trainer ──
const PendingMatchScreen = () => (
  <Screen bg="#050505">
    {/* Soft amber glow behind avatar */}
    <div style={{
      position: 'absolute', top: 160, left: '50%', transform: 'translateX(-50%)',
      width: 380, height: 380,
      background: 'radial-gradient(circle, rgba(255,184,0,0.1) 0%, rgba(255,184,0,0.02) 55%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />

    <StatusBar />

    {/* Back */}
    <div style={{
      position: 'absolute', top: 52, left: 20,
      width: 40, height: 40, borderRadius: '50%', background: T.surf2,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: T.white, fontSize: 18, fontWeight: 700,
    }}>←</div>

    {/* Title */}
    <div style={{ textAlign: 'center', marginTop: 64, padding: '0 24px' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.gray, letterSpacing: '0.1em', marginBottom: 8 }}>
        YOU LOCKED IN ON
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: T.white, lineHeight: 1.1, marginBottom: 4 }}>
        Coach Sarah K.
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 12, padding: '4px 12px', marginTop: 4,
      }}>
        <span style={{ fontSize: 10 }}>★</span>
        <span style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>NASM-CPT · 4.9 ★ · $80/session</span>
      </div>
    </div>

    {/* Trainer avatar with pulsing ring */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36, position: 'relative' }}>
      {/* Outer pulse ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 184, height: 184, borderRadius: '50%',
        border: `2px solid rgba(255,184,0,0.2)`,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 168, height: 168, borderRadius: '50%',
        border: `2px solid rgba(255,184,0,0.35)`,
      }} />
      {/* Avatar */}
      <div style={{
        width: 150, height: 150, borderRadius: '50%',
        border: `3px solid ${GOLD}`,
        background: 'linear-gradient(160deg, #1A1F2E 0%, #080C15 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 32px rgba(255,184,0,0.3)`,
        position: 'relative',
      }}>
        <span style={{ color: T.white, fontSize: 14, fontWeight: 600 }}>Coach Sarah</span>
        {/* Pending spinner dots */}
        <div style={{
          position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
          background: T.bg, borderRadius: 12, padding: '4px 12px',
          display: 'flex', gap: 5, alignItems: 'center',
          border: `1px solid ${T.border}`,
        }}>
          {[GOLD, GOLD, T.surf3].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>

    {/* Status card */}
    <div style={{
      margin: '40px 20px 0',
      background: T.surface, borderRadius: 18,
      border: `1px solid ${T.border}`,
      padding: '20px 20px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: T.white, fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
          Waiting for Sarah to accept...
        </div>
        <div style={{ color: T.gray, fontSize: 13 }}>
          Your request has been sent. Sarah will be notified.
        </div>
      </div>

      {/* Info rows */}
      {[
        { icon: '⏱', label: 'Avg. response time', value: '~1 hour' },
        { icon: '●',  label: 'Last active',         value: '2 hours ago' },
        { icon: '✓',  label: 'Acceptance rate',     value: '92%' },
      ].map(row => (
        <div key={row.label} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 0', borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: GOLD, fontSize: 14, width: 18, textAlign: 'center' }}>{row.icon}</span>
            <span style={{ color: T.gray, fontSize: 13 }}>{row.label}</span>
          </div>
          <span style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>{row.value}</span>
        </div>
      ))}
    </div>

    {/* Push notification nudge */}
    <div style={{
      margin: '14px 20px 0', background: T.surf2, borderRadius: 14,
      border: `1px solid ${T.border}`, padding: '12px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
      }}>🔔</div>
      <div>
        <div style={{ color: T.white, fontSize: 12, fontWeight: 500 }}>We'll notify you when Sarah responds</div>
        <div style={{ color: T.gray, fontSize: 11 }}>You can browse more trainers in the meantime</div>
      </div>
    </div>

    {/* CTA */}
    <div style={{ padding: '16px 20px 0' }}>
      <div style={{
        height: 52, borderRadius: 26,
        border: `1.5px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 600, color: T.white,
      }}>Browse More Trainers</div>
    </div>

    <div style={{
      position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
      width: 134, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.25)',
    }} />
  </Screen>
);

// ── T3: TRAINER MUTUAL MATCH — Both locked in ──
const TrainerMatchScreen = () => (
  <Screen bg="#050505">
    {/* Dual glow — gold + green */}
    <div style={{
      position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
      width: 540, height: 540,
      background: 'radial-gradient(circle, rgba(255,184,0,0.12) 0%, rgba(189,255,0,0.06) 40%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />

    {/* Confetti */}
    {[
      [36,72,8,8,GOLD,0.9],[326,94,6,6,'#fff',0.4],[54,146,5,10,T.green,0.6],
      [346,164,10,5,GOLD,0.8],[24,302,6,6,T.green,0.4],[358,278,6,6,'#fff',0.3],
      [356,380,8,4,GOLD,0.6],[14,394,5,5,T.green,0.4],[372,140,4,8,GOLD,0.5],
    ].map(([x,y,w,h,c,o],i)=>(
      <div key={i} style={{
        position:'absolute',left:x,top:y,width:w,height:h,
        background:c,opacity:o,borderRadius:2,pointerEvents:'none',
      }}/>
    ))}

    <StatusBar />

    {/* Title */}
    <div style={{ textAlign: 'center', marginTop: 40, padding: '0 20px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, letterSpacing: '0.12em', marginBottom: 6 }}>
        COACH ACCEPTED
      </div>
      <div style={{ fontSize: 40, fontWeight: 900, color: T.white, letterSpacing: '0.04em', lineHeight: 1 }}>
        YOU'RE
      </div>
      <div style={{
        fontSize: 40, fontWeight: 900, color: T.green, letterSpacing: '0.04em', lineHeight: 1.1,
        borderBottom: `3px solid ${T.green}`, display: 'inline-block', paddingBottom: 4,
      }}>LOCKED IN</div>
      <div style={{ color: T.gray, fontSize: 14, marginTop: 8 }}>
        Coach Sarah accepted your request
      </div>
    </div>

    {/* Avatar pair */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 28 }}>
      {/* My avatar */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        border: `3px solid ${T.green}`,
        background: 'linear-gradient(160deg, #1C2333 0%, #0D1018 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 24px rgba(189,255,0,0.3)', zIndex: 2, flexShrink: 0,
      }}>
        <span style={{ color: T.white, fontSize: 12, fontWeight: 600 }}>Me</span>
      </div>
      {/* Bolt badge */}
      <div style={{
        width: 40, height: 40, borderRadius: '50%', background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 900, color: '#0A0A0A',
        zIndex: 3, flexShrink: 0, margin: '0 -10px',
        boxShadow: '0 0 16px rgba(189,255,0,0.6)',
      }}>⚡</div>
      {/* Trainer avatar */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        border: `3px solid ${GOLD}`,
        background: 'linear-gradient(160deg, #1A1F2E 0%, #080C15 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 24px rgba(255,184,0,0.3)`, zIndex: 2, flexShrink: 0,
      }}>
        <span style={{ color: T.white, fontSize: 11, fontWeight: 600 }}>Coach</span>
        <span style={{ color: T.white, fontSize: 11, fontWeight: 600 }}>Sarah K.</span>
      </div>
    </div>

    {/* Trainer credential badges */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
      {['NASM-CPT', '4.9 ★', '3 yrs exp'].map(b => (
        <div key={b} style={{
          background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
          borderRadius: 10, padding: '4px 10px',
          color: GOLD, fontSize: 11, fontWeight: 700,
        }}>{b}</div>
      ))}
    </div>

    {/* Stats */}
    <div style={{
      display: 'flex', margin: '16px 20px 0',
      background: T.surface, borderRadius: 16, overflow: 'hidden',
    }}>
      {[['92%','Goal Rate'],['47','Clients'],['$80','/ session']].map((s, i) => (
        <div key={s[0]} style={{
          flex: 1, textAlign: 'center', padding: '14px 0',
          borderRight: i < 2 ? `1px solid ${T.border}` : 'none',
        }}>
          <div style={{ color: i < 2 ? T.green : GOLD, fontSize: 20, fontWeight: 700 }}>{s[0]}</div>
          <div style={{ color: T.gray, fontSize: 11, marginTop: 3 }}>{s[1]}</div>
        </div>
      ))}
    </div>

    {/* Intro session card */}
    <div style={{
      margin: '12px 20px 0', background: T.surface, borderRadius: 14,
      border: `1px solid ${T.border}`, padding: '14px 16px', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 12, bottom: 12, width: 3,
        background: GOLD, borderRadius: '0 2px 2px 0',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>Free Intro Session</div>
        <div style={{
          background: T.green, borderRadius: 8, padding: '2px 8px',
          color: '#0A0A0A', fontSize: 10, fontWeight: 700,
        }}>FREE</div>
      </div>
      <div style={{ color: T.gray, fontSize: 12, marginBottom: 2 }}>
        30 min consultation + fitness assessment
      </div>
      <div style={{ color: T.white, fontSize: 12, fontWeight: 500 }}>
        Equinox HY · This week · Choose your slot
      </div>
    </div>

    {/* CTAs */}
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{
        height: 56, borderRadius: 28, background: T.green,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.04em',
        boxShadow: '0 8px 28px rgba(189,255,0,0.3)', marginBottom: 10,
      }}>BOOK FREE INTRO SESSION</div>
      <div style={{
        height: 48, borderRadius: 24,
        border: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 500, color: T.white,
      }}>Message Coach Sarah</div>
    </div>

    <div style={{
      position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
      width: 134, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.25)',
    }} />
  </Screen>
);

// ────────────────────────────────────────────────
// TRAINER SESSION MANAGER
// ────────────────────────────────────────────────
const TrainerSessionManager = () => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const todayIdx = 3; // Thursday

  const sessions = [
    {
      id: 1,
      time: '10:00 AM', end: '11:00 AM', type: 'Strength Training',
      location: 'Equinox HY · Studio 2', capacity: 4,
      booked: [
        { init: 'M', color: '#4ADE80', name: 'Marcus R.' },
        { init: 'S', color: '#60A5FA', name: 'Sofia L.' },
        { init: 'A', color: '#F472B6', name: 'Anya K.' },
      ],
      status: 'OPEN', statusColor: '#BDFF00', statusBg: 'rgba(189,255,0,0.12)',
      price: '$60',
    },
    {
      id: 2,
      time: '12:00 PM', end: '1:00 PM', type: 'HIIT Circuit',
      location: 'Equinox HY · Studio 1', capacity: 4,
      booked: [
        { init: 'P', color: '#A78BFA', name: 'Priya N.' },
        { init: 'D', color: '#FB923C', name: 'Damon K.' },
        { init: 'E', color: '#F472B6', name: 'Emma R.' },
        { init: 'J', color: '#4ADE80', name: 'Jake T.' },
      ],
      status: 'FULL', statusColor: '#FF6B00', statusBg: 'rgba(255,107,0,0.12)',
      price: '$60',
    },
    {
      id: 3,
      time: '2:00 PM', end: '3:00 PM', type: 'Functional Training',
      location: 'Equinox HY · Studio 2', capacity: 4,
      booked: [
        { init: 'R', color: '#60A5FA', name: 'Ryan B.' },
      ],
      status: 'OPEN', statusColor: '#BDFF00', statusBg: 'rgba(189,255,0,0.12)',
      price: '$60',
    },
    {
      id: 4,
      time: '4:00 PM', end: '5:00 PM', type: 'Mobility Flow',
      location: 'Equinox HY · Studio 3', capacity: 4,
      booked: [],
      status: 'OPEN', statusColor: '#BDFF00', statusBg: 'rgba(189,255,0,0.12)',
      price: '$60',
    },
  ];

  const totalBooked = sessions.reduce((s, x) => s + x.booked.length, 0);
  const totalCapacity = sessions.reduce((s, x) => s + x.capacity, 0);
  const earnings = totalBooked * 60;

  return (
    <div style={{
      width: 390, background: '#080808', borderRadius: 44, overflow: 'hidden',
      flexShrink: 0, fontFamily: "'Montserrat', sans-serif",
      boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C',
      WebkitFontSmoothing: 'antialiased',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');`}</style>

      {/* STATUS BAR */}
      <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
        <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat' }}>9:41</span>
        <span style={{ color: '#fff', fontSize: 11, opacity: 0.7 }}>●●● 5G ▌▌▌▌</span>
      </div>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 22px 16px', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#141414', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 16, lineHeight: 1 }}>←</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 900, fontFamily: 'Montserrat', lineHeight: 1.1 }}>Session Manager</div>
          <div style={{ color: '#555', fontSize: 11, fontFamily: 'Montserrat', marginTop: 2 }}>Thu, May 8 · 4 sessions</div>
        </div>
        {/* Gold trainer badge */}
        <div style={{ background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.35)', borderRadius: 10, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 12 }}>🏅</span>
          <span style={{ color: '#FFB800', fontSize: 10, fontWeight: 800, fontFamily: 'Montserrat' }}>TRAINER</span>
        </div>
      </div>

      {/* DAY STRIP */}
      <div style={{ display: 'flex', padding: '0 16px', gap: 6, marginBottom: 18, overflowX: 'visible' }}>
        {days.map((d, i) => {
          const active = i === todayIdx;
          return (
            <div key={d} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 5, padding: '8px 4px', borderRadius: 14,
              background: active ? '#BDFF00' : '#111',
              border: `1px solid ${active ? '#BDFF00' : '#1E1E1E'}`,
            }}>
              <span style={{ color: active ? '#000' : '#555', fontSize: 9, fontWeight: 700, fontFamily: 'Montserrat', letterSpacing: '0.04em' }}>{d}</span>
              <span style={{ color: active ? '#000' : '#fff', fontSize: 13, fontWeight: 900, fontFamily: 'Montserrat' }}>{[5,6,7,8,9,10,11][i]}</span>
              {/* Session dots */}
              <div style={{ display: 'flex', gap: 2 }}>
                {(i === todayIdx ? [1,1,1,1] : i === 4 ? [1,1] : i === 1 ? [1,1,1] : []).map((_, j) => (
                  <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: active ? 'rgba(0,0,0,0.4)' : '#BDFF00' }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK STATS ROW */}
      <div style={{ display: 'flex', gap: 10, padding: '0 22px', marginBottom: 20 }}>
        {[
          { label: 'Sessions', val: '4', icon: '📋', color: '#BDFF00' },
          { label: 'Booked', val: `${totalBooked}/${totalCapacity}`, icon: '👥', color: '#60A5FA' },
          { label: 'Earned', val: `$${earnings}`, icon: '💰', color: '#FFB800' },
        ].map(({ label, val, icon, color }) => (
          <div key={label} style={{ flex: 1, background: '#111', borderRadius: 14, padding: '11px 10px', border: '1px solid #1C1C1C', textAlign: 'center' }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
            <div style={{ color, fontSize: 15, fontWeight: 900, fontFamily: 'Montserrat', lineHeight: 1 }}>{val}</div>
            <div style={{ color: '#444', fontSize: 9, fontFamily: 'Montserrat', marginTop: 3, letterSpacing: '0.04em' }}>{label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* SESSION SLOT CARDS */}
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sessions.map((s) => {
          const open = s.capacity - s.booked.length;
          const isFull = open === 0;
          const pct = Math.round((s.booked.length / s.capacity) * 100);
          return (
            <div key={s.id} style={{
              background: '#0E0E0E', borderRadius: 20,
              border: `1px solid ${isFull ? 'rgba(255,107,0,0.2)' : s.booked.length === 0 ? '#1A1A1A' : 'rgba(189,255,0,0.14)'}`,
              overflow: 'hidden',
            }}>
              {/* Top color bar */}
              <div style={{ height: 3, background: isFull ? 'linear-gradient(90deg,#FF6B00,#FF3B30)' : s.booked.length === 0 ? '#222' : 'linear-gradient(90deg,#BDFF00,#7ACC00)' }} />

              <div style={{ padding: '14px 16px 16px' }}>
                {/* Time + status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#BDFF00', fontSize: 14, fontWeight: 800, fontFamily: 'Montserrat' }}>{s.time}</span>
                    <span style={{ color: '#333', fontSize: 12 }}>—</span>
                    <span style={{ color: '#555', fontSize: 12, fontFamily: 'Montserrat' }}>{s.end}</span>
                  </div>
                  <div style={{ background: s.statusBg, border: `1px solid ${s.statusColor}33`, borderRadius: 8, padding: '3px 9px' }}>
                    <span style={{ color: s.statusColor, fontSize: 9, fontWeight: 800, fontFamily: 'Montserrat', letterSpacing: '0.06em' }}>
                      {isFull ? '● FULL' : open === s.capacity ? '○ NO BOOKINGS' : `● ${open} OPEN`}
                    </span>
                  </div>
                </div>

                {/* Session type + location */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: 'Montserrat', marginBottom: 3 }}>{s.type}</div>
                  <div style={{ color: '#555', fontSize: 11, fontFamily: 'Montserrat' }}>📍 {s.location} · {s.price}/person</div>
                </div>

                {/* Slot capacity dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {Array.from({ length: s.capacity }).map((_, i) => {
                      const athlete = s.booked[i];
                      return athlete ? (
                        <div key={i} style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: `linear-gradient(135deg,${athlete.color} 0%,${athlete.color}88 100%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 800, color: '#000', fontFamily: 'Montserrat',
                          border: '2px solid #0E0E0E',
                          boxShadow: `0 0 0 1px ${athlete.color}44`,
                        }}>
                          {athlete.init}
                        </div>
                      ) : (
                        <div key={i} style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: '#161616', border: '1.5px dashed #2E2E2E',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ color: '#333', fontSize: 14, lineHeight: 1 }}>+</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: open > 0 ? '#BDFF00' : '#FF6B00', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat' }}>
                      {s.booked.length}/{s.capacity} booked
                    </div>
                    <div style={{ color: '#444', fontSize: 10, fontFamily: 'Montserrat' }}>
                      {open > 0 ? `${open} spot${open > 1 ? 's' : ''} remaining` : 'Session full'}
                    </div>
                  </div>
                </div>

                {/* Fill bar */}
                <div style={{ marginBottom: 13 }}>
                  <div style={{ height: 4, borderRadius: 2, background: '#1A1A1A', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`, borderRadius: 2,
                      background: isFull ? 'linear-gradient(90deg,#FF6B00,#FF3B30)' : 'linear-gradient(90deg,#BDFF00,#7ACC00)',
                    }} />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, height: 36, borderRadius: 10, background: '#161616', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <span style={{ fontSize: 12 }}>✏️</span>
                    <span style={{ color: '#aaa', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat' }}>Edit</span>
                  </div>
                  <div style={{ flex: 1, height: 36, borderRadius: 10, background: '#161616', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <span style={{ fontSize: 12 }}>👥</span>
                    <span style={{ color: '#aaa', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat' }}>Clients</span>
                  </div>
                  {!isFull && (
                    <div style={{ flex: 1, height: 36, borderRadius: 10, background: 'rgba(189,255,0,0.1)', border: '1px solid rgba(189,255,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                      <span style={{ color: '#BDFF00', fontSize: 11, fontWeight: 800, fontFamily: 'Montserrat' }}>Share</span>
                      <span style={{ color: '#BDFF00', fontSize: 12 }}>↗</span>
                    </div>
                  )}
                  {isFull && (
                    <div style={{ flex: 1, height: 36, borderRadius: 10, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                      <span style={{ color: '#FF3B30', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat' }}>Cancel</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add new slot CTA */}
        <div style={{
          borderRadius: 20, border: '1.5px dashed #2A2A2A', padding: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: '#0A0A0A', marginBottom: 20,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(189,255,0,0.1)', border: '1.5px solid rgba(189,255,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#BDFF00', fontSize: 22, lineHeight: 1, marginTop: -2 }}>+</span>
          </div>
          <div>
            <div style={{ color: '#BDFF00', fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat' }}>Add New Session Slot</div>
            <div style={{ color: '#444', fontSize: 11, fontFamily: 'Montserrat', marginTop: 2 }}>Set time, type, capacity & price</div>
          </div>
        </div>
      </div>

      {/* BOTTOM TAB BAR */}
      <div style={{ height: 88, background: '#0A0A0A', borderTop: '1px solid #181818', display: 'flex' }}>
        {['Home','Schedule','Clients','Earnings','Profile'].map((label, i) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, position: 'relative' }}>
            {i === 1 && <div style={{ position: 'absolute', top: 0, width: 30, height: 3, background: '#BDFF00', borderRadius: '0 0 3px 3px' }} />}
            <div style={{ width: 26, height: 26, borderRadius: 8, background: i === 1 ? '#BDFF00' : '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, opacity: i === 1 ? 1 : 0.45 }}>
              {['⌂','📋','👥','💰','○'][i]}
            </div>
            <span style={{ fontSize: 9, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? '#BDFF00' : '#444', fontFamily: 'Montserrat' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
// HOME SCREEN (ATHLETE DASHBOARD)
// ────────────────────────────────────────────────
const HomeScreen = () => (
  <div style={{
    width: 390,
    background: '#080808',
    borderRadius: 44,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C',
    fontFamily: "'Montserrat', sans-serif",
    WebkitFontSmoothing: 'antialiased',
  }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&display=swap');`}</style>

    {/* STATUS BAR */}
    <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat' }}>9:41</span>
      <span style={{ color: '#fff', fontSize: 11, opacity: 0.75 }}>●●● 5G ▌▌▌▌</span>
    </div>

    {/* TOP NAV */}
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 22px 14px', gap: 10 }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #BDFF00 0%, #8CC700 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 17, fontWeight: 900, color: '#000', fontStyle: 'italic', fontFamily: 'Montserrat',
        }}>L</div>
        <span style={{ color: '#BDFF00', fontSize: 22, fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.05em', fontFamily: 'Montserrat' }}>LOCKIN</span>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#141414', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: 17 }}>🔔</span>
        <div style={{ position: 'absolute', top: 9, right: 9, width: 8, height: 8, borderRadius: '50%', background: '#FF3B30', border: '2px solid #080808' }} />
      </div>
    </div>

    {/* GREETING + QUICK BADGES */}
    <div style={{ padding: '0 22px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <div style={{ color: '#fff', fontSize: 23, fontWeight: 900, fontFamily: 'Montserrat', lineHeight: 1.2 }}>Hey, Jake 👋</div>
        <div style={{ color: '#666', fontSize: 12, fontWeight: 500, fontFamily: 'Montserrat', marginTop: 3 }}>Ready to get locked in today?</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.28)', borderRadius: 9, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 13 }}>🔥</span>
            <span style={{ color: '#FF6B00', fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat' }}>12</span>
          </div>
          <div style={{ background: 'rgba(189,255,0,0.08)', border: '1px solid rgba(189,255,0,0.22)', borderRadius: 9, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ color: '#BDFF00', fontSize: 13 }}>⚡</span>
            <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat' }}>847</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#444', fontSize: 10, fontFamily: 'Montserrat' }}>Ranked</span>
          <span style={{ color: '#FFB800', fontSize: 11, fontWeight: 800, fontFamily: 'Montserrat' }}>#12 🏆</span>
        </div>
      </div>
    </div>

    {/* ── TODAY'S SESSIONS ── */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', marginBottom: 13 }}>
        <div>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat' }}>Today's Sessions</div>
          <div style={{ color: '#444', fontSize: 11, fontFamily: 'Montserrat', marginTop: 2 }}>Thu, May 8 · 2 booked</div>
        </div>
        <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat' }}>Manage →</span>
      </div>
      <div style={{ display: 'flex', gap: 12, paddingLeft: 22, overflowX: 'visible' }}>
        {/* Session 1 – Live */}
        <div style={{ flexShrink: 0, width: 162, background: 'linear-gradient(160deg, #0D1A00 0%, #081000 100%)', borderRadius: 18, padding: '14px 14px 14px', border: '1px solid rgba(189,255,0,0.22)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#BDFF00', borderRadius: '18px 18px 0 0' }} />
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(189,255,0,0.07)', filter: 'blur(20px)' }} />
          <div style={{ color: '#BDFF00', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat', letterSpacing: '0.07em', marginBottom: 7 }}>10:00 AM</div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat', marginBottom: 3 }}>Strength Training</div>
          <div style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat', marginBottom: 12 }}>Equinox HY · 45 min</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              {['#4ADE80','#60A5FA','#F472B6'].map((c, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, marginLeft: i > 0 ? -7 : 0, border: '2px solid #0D1A00', fontSize: 9, fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat' }}>{['M','S','A'][i]}</div>
              ))}
            </div>
            <div style={{ background: 'rgba(189,255,0,0.15)', borderRadius: 7, padding: '2px 7px' }}>
              <span style={{ color: '#BDFF00', fontSize: 9, fontWeight: 800, fontFamily: 'Montserrat' }}>● LIVE</span>
            </div>
          </div>
        </div>

        {/* Session 2 – Upcoming */}
        <div style={{ flexShrink: 0, width: 162, background: '#121212', borderRadius: 18, padding: '14px', border: '1px solid #222', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#60A5FA', borderRadius: '18px 18px 0 0' }} />
          <div style={{ color: '#60A5FA', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat', letterSpacing: '0.07em', marginBottom: 7 }}>2:30 PM</div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat', marginBottom: 3 }}>HIIT Circuit</div>
          <div style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat', marginBottom: 12 }}>Crunch Fitness · 30 min</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              {['#A78BFA','#FB923C'].map((c, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, marginLeft: i > 0 ? -7 : 0, border: '2px solid #121212', fontSize: 9, fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat' }}>{['P','D'][i]}</div>
              ))}
            </div>
            <div style={{ background: 'rgba(96,165,250,0.12)', borderRadius: 7, padding: '2px 7px' }}>
              <span style={{ color: '#60A5FA', fontSize: 9, fontWeight: 700, fontFamily: 'Montserrat' }}>UPCOMING</span>
            </div>
          </div>
        </div>

        {/* Open Slot */}
        <div style={{ flexShrink: 0, width: 100, background: '#0C0C0C', borderRadius: 18, padding: '14px 10px', border: '1.5px dashed #282828', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, marginRight: 22 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#161616', border: '1.5px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#444', fontSize: 22, lineHeight: 1, marginTop: -2 }}>+</span>
          </div>
          <div style={{ color: '#444', fontSize: 10, fontWeight: 600, fontFamily: 'Montserrat', textAlign: 'center' }}>Open Slot</div>
          <div style={{ color: '#BDFF00', fontSize: 10, fontWeight: 700, fontFamily: 'Montserrat' }}>Book Now</div>
        </div>
      </div>
    </div>

    {/* ── BEST MATCHES ── */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', marginBottom: 13 }}>
        <div>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat' }}>Best Matches For You</div>
          <div style={{ color: '#444', fontSize: 11, fontFamily: 'Montserrat', marginTop: 2 }}>Based on your goals & location</div>
        </div>
        <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat' }}>See All →</span>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '0 22px' }}>
        {[
          { name: 'MARCUS R.', tags: 'Strength · HIIT', dist: '0.8 mi', photo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&h=400&q=80' },
          { name: 'SOFIA L.',  tags: 'Yoga · Cardio',   dist: '1.2 mi', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&h=400&q=80' },
        ].map(({ name, tags, dist, photo }) => (
          <div key={name} style={{ flex: 1, background: '#101010', borderRadius: 20, overflow: 'hidden', border: '1px solid #1C1C1C' }}>
            {/* Real photo */}
            <div style={{ height: 148, position: 'relative', overflow: 'hidden' }}>
              <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.55) 100%)' }} />
              <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(189,255,0,0.95)', borderRadius: 7, padding: '2px 7px' }}>
                <span style={{ color: '#000', fontSize: 9, fontWeight: 800, fontFamily: 'Montserrat' }}>{dist}</span>
              </div>
            </div>
            {/* Info */}
            <div style={{ padding: '10px 12px 13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'Montserrat' }}>{name}</span>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#000' }}>✓</div>
              </div>
              <div style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat', marginBottom: 10 }}>{tags}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1A1A1A', border: '1px solid #282828', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#555' }}>✕</div>
                <div style={{ flex: 1, height: 32, borderRadius: 10, background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#000', fontSize: 10, fontWeight: 900, fontFamily: 'Montserrat' }}>LOCK IN</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── UPCOMING EVENTS ── */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', marginBottom: 13 }}>
        <div>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat' }}>Events Near You</div>
          <div style={{ color: '#444', fontSize: 11, fontFamily: 'Montserrat', marginTop: 2 }}>This week · 12 upcoming</div>
        </div>
        <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat' }}>See All →</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 22px' }}>
        {[
          {
            name: 'Iron Mass Challenge',
            desc: 'Heavy compound lifts, 1RM testing & community battle',
            type: 'STRENGTH WORKSHOP', typeColor: '#000', typeBg: '#FFB800',
            date: 'Sat, May 10', time: '9:00 AM', end: '12:00 PM', dur: '3 hr',
            place: "Gold's Gym Downtown", dist: '0.4 mi',
            filled: 48, max: 100,
            going: ['#4ADE80','#60A5FA','#F472B6'],
            photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&h=400&q=80',
          },
          {
            name: 'Sunrise Burn Session',
            desc: 'High-energy outdoor bootcamp to kick-start your week',
            type: 'HIIT BOOTCAMP', typeColor: '#000', typeBg: '#4ADE80',
            date: 'Sun, May 11', time: '6:00 AM', end: '7:30 AM', dur: '1.5 hr',
            place: 'Crunch Fitness', dist: '0.8 mi',
            filled: 23, max: 50,
            going: ['#FB923C','#A78BFA'],
            photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&h=400&q=80',
          },
          {
            name: 'Yoga Flow & Mobility',
            desc: 'Deep stretch, breath work and active recovery practice',
            type: 'WELLNESS CLASS', typeColor: '#000', typeBg: '#A78BFA',
            date: 'Mon, May 12', time: '7:00 AM', end: '8:00 AM', dur: '1 hr',
            place: 'Equinox HY · Studio 3', dist: '0.3 mi',
            filled: 11, max: 20,
            going: ['#F472B6','#4ADE80','#60A5FA'],
            photo: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&h=400&q=80',
          },
        ].map(({ name, desc, type, typeColor, typeBg, date, time, end, dur, place, dist, filled, max, going, photo }) => {
          const pct = Math.round((filled / max) * 100);
          return (
            <div key={name} style={{ borderRadius: 22, overflow: 'hidden', background: '#101010', border: '1px solid #1C1C1C' }}>
              {/* Photo header */}
              <div style={{ height: 158, position: 'relative', overflow: 'hidden' }}>
                <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                {/* Gradient overlay: dark bottom for text legibility */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.15) 40%,rgba(0,0,0,0.82) 100%)' }} />

                {/* Type badge top-left */}
                <div style={{ position: 'absolute', top: 12, left: 12, background: typeBg, borderRadius: 8, padding: '4px 10px' }}>
                  <span style={{ color: typeColor, fontSize: 9, fontWeight: 900, fontFamily: 'Montserrat', letterSpacing: '0.06em' }}>{type}</span>
                </div>

                {/* Distance top-right */}
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', borderRadius: 8, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 9 }}>📍</span>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: 'Montserrat' }}>{dist}</span>
                </div>

                {/* Event name overlaid at bottom */}
                <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                  <div style={{ color: '#fff', fontSize: 17, fontWeight: 900, fontFamily: 'Montserrat', lineHeight: 1.2, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{name}</div>
                </div>
              </div>

              {/* Info body */}
              <div style={{ padding: '14px 16px 16px' }}>
                {/* Description */}
                <div style={{ color: '#666', fontSize: 11, fontFamily: 'Montserrat', lineHeight: 1.5, marginBottom: 12 }}>{desc}</div>

                {/* Date / Time / Duration row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8, background: '#161616', borderRadius: 10, overflow: 'hidden' }}>
                  {[
                    { icon: '📅', val: date },
                    { icon: '🕐', val: `${time} – ${end}` },
                    { icon: '⏱', val: dur },
                  ].map(({ icon, val }, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, padding: '7px 8px', borderRight: i < 2 ? '1px solid #222' : 'none' }}>
                      <span style={{ fontSize: 10 }}>{icon}</span>
                      <span style={{ color: '#aaa', fontSize: 9, fontWeight: 600, fontFamily: 'Montserrat', lineHeight: 1.3 }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Location row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 13 }}>
                  <span style={{ fontSize: 11 }}>📍</span>
                  <span style={{ color: '#666', fontSize: 11, fontFamily: 'Montserrat' }}>{place}</span>
                </div>

                {/* Capacity bar */}
                <div style={{ marginBottom: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat' }}>Spots filled</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ color: pct >= 80 ? '#FF6B00' : '#BDFF00', fontSize: 10, fontWeight: 700, fontFamily: 'Montserrat' }}>{filled}</span>
                      <span style={{ color: '#333', fontSize: 10, fontFamily: 'Montserrat' }}>/ {max}</span>
                      <div style={{ background: pct >= 80 ? 'rgba(255,107,0,0.15)' : 'rgba(189,255,0,0.12)', borderRadius: 5, padding: '1px 6px' }}>
                        <span style={{ color: pct >= 80 ? '#FF6B00' : '#BDFF00', fontSize: 9, fontWeight: 800, fontFamily: 'Montserrat' }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: '#1E1E1E', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: pct >= 80 ? 'linear-gradient(90deg,#FF6B00,#FF3B30)' : 'linear-gradient(90deg,#BDFF00,#7ACC00)', transition: 'width 0.3s' }} />
                  </div>
                </div>

                {/* Footer: avatar stack + RSVP */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex' }}>
                      {going.map((c, i) => (
                        <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg,${c} 0%,${c}88 100%)`, marginLeft: i > 0 ? -8 : 0, border: '2px solid #101010', fontSize: 10, fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat' }}>
                          {['M','S','J','P','D'][i]}
                        </div>
                      ))}
                    </div>
                    <span style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat' }}>{going.length} friends going</span>
                  </div>
                  <div style={{ height: 36, borderRadius: 18, background: '#BDFF00', padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <span style={{ color: '#000', fontSize: 11, fontWeight: 900, fontFamily: 'Montserrat' }}>RSVP</span>
                    <span style={{ color: '#000', fontSize: 12 }}>→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* ── MATCH REQUESTS ── */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', marginBottom: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat' }}>Match Requests</span>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 10, fontWeight: 800, fontFamily: 'Montserrat' }}>3</span>
          </div>
        </div>
        <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: 'Montserrat' }}>View All →</span>
      </div>
      {[
        { name: 'EMMA R.',  tags: 'Strength · Yoga',     msg: 'Looking for a morning partner 💪', photo: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=100&h=100&q=80' },
        { name: 'DAMON K.', tags: 'Powerlifting · HIIT', msg: 'Wanna hit chest day together?',   photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=100&h=100&q=80' },
      ].map(({ name, tags, msg, photo }) => (
        <div key={name} style={{ margin: '0 22px 10px', background: '#101010', borderRadius: 18, padding: '13px 14px', border: '1px solid #1C1C1C', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #2A2A2A' }}>
            <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'Montserrat' }}>{name}</span>
              <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#000' }}>✓</div>
            </div>
            <div style={{ color: '#555', fontSize: 10, fontFamily: 'Montserrat', marginBottom: 4 }}>{tags}</div>
            <div style={{ color: '#888', fontSize: 11, fontFamily: 'Montserrat', fontStyle: 'italic' }}>"{msg}"</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <div style={{ width: 68, height: 30, borderRadius: 9, background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#000', fontSize: 9, fontWeight: 900, fontFamily: 'Montserrat' }}>LOCK IN</span>
            </div>
            <div style={{ width: 68, height: 30, borderRadius: 9, background: '#161616', border: '1px solid #252525', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#555', fontSize: 9, fontWeight: 600, fontFamily: 'Montserrat' }}>DECLINE</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ── COMMUNITY STATS ── */}
    <div style={{ marginBottom: 22 }}>
      <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat', padding: '0 22px', marginBottom: 13 }}>Community Stats</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 22px' }}>
        {[
          { val: '12.4K', label: 'Active Athletes',     icon: '👥', color: '#BDFF00' },
          { val: '8.2K',  label: 'Matches Made',         icon: '🔒', color: '#60A5FA' },
          { val: '47',    label: 'Events This Week',      icon: '📅', color: '#FFB800' },
          { val: '203',   label: 'Certified Trainers',    icon: '🎯', color: '#F472B6' },
        ].map(({ val, label, icon, color }) => (
          <div key={label} style={{ background: '#101010', borderRadius: 16, padding: '16px 14px', border: '1px solid #1C1C1C' }}>
            <div style={{ fontSize: 22, marginBottom: 9 }}>{icon}</div>
            <div style={{ color, fontSize: 24, fontWeight: 900, fontFamily: 'Montserrat', lineHeight: 1 }}>{val}</div>
            <div style={{ color: '#444', fontSize: 10, fontFamily: 'Montserrat', marginTop: 5 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* ── BOTTOM TAB BAR ── */}
    <div style={{ height: 88, background: '#0A0A0A', borderTop: '1px solid #181818', display: 'flex' }}>
      {[
        { label: 'Home',    active: true },
        { label: 'Match',   active: false },
        { label: 'Event',   active: false },
        { label: 'Chat',    active: false },
        { label: 'Profile', active: false },
      ].map(({ label, active }) => (
        <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, position: 'relative' }}>
          {active && <div style={{ position: 'absolute', top: 0, width: 30, height: 3, background: '#BDFF00', borderRadius: '0 0 3px 3px' }} />}
          <div style={{ width: 26, height: 26, borderRadius: 8, background: active ? '#BDFF00' : '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, opacity: active ? 1 : 0.5 }}>
            {['⌂','⊕','◫','💬','○'][['Home','Match','Event','Chat','Profile'].indexOf(label)]}
          </div>
          <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? '#BDFF00' : '#555', fontFamily: 'Montserrat' }}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);
// (old Screen-based version replaced)
const _OldHomeScreenPlaceholder = () => (
  <Screen>
    {/* Montserrat import scoped to this screen */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');`}</style>

    {/* Status Bar */}
    <div style={{
      height: 50, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', padding: '0 22px 10px',
      position: 'relative', zIndex: 10,
    }}>
      <span style={{ color: T.white, fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>9:41</span>
      <span style={{ color: T.white, fontSize: 11, opacity: 0.7 }}>●●● LTE ▌▌▌</span>
    </div>

    {/* Top Nav */}
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, gap: 10,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ color: T.green, fontSize: 22, fontWeight: 900, letterSpacing: '0.12em', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
          LOCK·IN
        </div>
        <div style={{ color: T.gray, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', fontFamily: 'Montserrat, sans-serif' }}>
          FITNESS COMMUNITY
        </div>
      </div>
      {/* Location pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: T.surf2, borderRadius: 20, padding: '5px 10px',
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }} />
        <span style={{ color: T.white, fontSize: 11, fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>Equinox · 0.3mi</span>
      </div>
      {/* Notification bell */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: T.surf2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${T.border}`, position: 'relative',
      }}>
        <span style={{ fontSize: 16 }}>🔔</span>
        <div style={{
          position: 'absolute', top: 6, right: 6,
          width: 8, height: 8, borderRadius: '50%',
          background: T.red, border: '2px solid #0A0A0A',
        }} />
      </div>
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #BDFF00 0%, #7ACC00 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 700, color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif',
      }}>J</div>
    </div>

    {/* Greeting Row */}
    <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <div style={{ color: T.white, fontSize: 20, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', lineHeight: 1.2 }}>
          Good morning, Jake 💪
        </div>
        <div style={{ color: T.gray, fontSize: 12, fontWeight: 500, fontFamily: 'Montserrat, sans-serif', marginTop: 4 }}>
          3 people near you ready to train
        </div>
      </div>
      {/* Streak badge */}
      <div style={{
        background: 'rgba(255,107,0,0.12)', borderRadius: 12, padding: '8px 12px',
        border: '1px solid rgba(255,107,0,0.3)', textAlign: 'center', flexShrink: 0,
      }}>
        <div style={{ fontSize: 18, lineHeight: 1 }}>🔥</div>
        <div style={{ color: '#FF6B00', fontSize: 16, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1, marginTop: 2 }}>12</div>
        <div style={{ color: '#FF6B00', fontSize: 9, fontWeight: 600, fontFamily: 'Montserrat, sans-serif', opacity: 0.8, letterSpacing: '0.06em' }}>STREAK</div>
      </div>
    </div>

    {/* Hero Card */}
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{
        borderRadius: 20, overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(135deg, #0F1A00 0%, #0D1400 50%, #070A00 100%)',
        border: '1px solid rgba(189,255,0,0.2)',
        boxShadow: '0 0 40px rgba(189,255,0,0.08)',
      }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 140, height: 140,
          borderRadius: '50%', background: 'rgba(189,255,0,0.12)',
          filter: 'blur(40px)',
        }} />
        <div style={{ padding: '18px 20px 20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ color: T.green, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>
                READY TO TRAIN NEARBY
              </div>
              <div style={{ color: T.white, fontSize: 36, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
                24
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>
                partners within 5 miles
              </div>
            </div>
            {/* Mini avatar stack */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ display: 'flex' }}>
                {['#4ADE80','#60A5FA','#F472B6'].map((c, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: '50%', background: c,
                    marginLeft: i > 0 ? -10 : 0, border: '2px solid #0A0A0A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#000',
                  }}>{['M','P','A'][i]}</div>
                ))}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>
                +21 more
              </div>
            </div>
          </div>
          {/* CTA */}
          <div style={{
            height: 44, borderRadius: 22, background: T.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, color: '#0A0A0A', letterSpacing: '0.06em',
            fontFamily: 'Montserrat, sans-serif', gap: 6,
          }}>
            FIND YOUR MATCH
            <span style={{ fontSize: 14 }}>→</span>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Action Tiles */}
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: T.white, fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>What are you looking for?</span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { icon: '🏋️', label: 'Gym Buddy', color: T.green, dim: 'rgba(189,255,0,0.1)', border: 'rgba(189,255,0,0.25)' },
          { icon: '📅', label: 'Events', color: '#60A5FA', dim: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)' },
          { icon: '🎯', label: 'Get Coach', color: '#FFB800', dim: 'rgba(255,184,0,0.1)', border: 'rgba(255,184,0,0.25)' },
        ].map(({ icon, label, color, dim, border }) => (
          <div key={label} style={{
            flex: 1, background: dim, borderRadius: 14,
            border: `1px solid ${border}`, padding: '12px 8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ color: T.white, fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Your Matches */}
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: T.white, fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Your Matches</span>
        <span style={{ color: T.green, fontSize: 11, fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>See All →</span>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {[
          { name: 'Marcus', sub: 'Chest Day', color: '#4ADE80', new: true },
          { name: 'Priya', sub: 'HIIT', color: '#F472B6', new: false },
          { name: 'Damon', sub: 'Legs 🦵', color: '#60A5FA', new: false },
          { name: 'Yuki', sub: 'Cardio', color: '#A78BFA', new: true },
        ].map(({ name, sub, color, new: isNew }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${color} 0%, ${color}88 100%)`,
                border: isNew ? `2px solid ${T.green}` : `2px solid ${T.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: '#000', fontFamily: 'Montserrat, sans-serif',
              }}>{name[0]}</div>
              {isNew && (
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 14, height: 14, borderRadius: '50%',
                  background: T.green, border: '2px solid #0A0A0A',
                }} />
              )}
            </div>
            <span style={{ color: T.white, fontSize: 10, fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>{name}</span>
            <span style={{ color: T.gray, fontSize: 9, fontFamily: 'Montserrat, sans-serif' }}>{sub}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Nearby Activity */}
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }} />
          <span style={{ color: T.white, fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Active Nearby</span>
        </div>
      </div>
      {[
        { init: 'M', name: 'Marcus R.', place: 'Equinox · 0.3mi', tag: 'Chest Day 💪', color: '#4ADE80' },
        { init: 'P', name: 'Priya K.', place: 'Crunch Fitness · 1.2mi', tag: 'HIIT Session 🔥', color: '#F472B6' },
      ].map(({ init, name, place, tag, color }) => (
        <div key={name} style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
          background: T.surface, borderRadius: 14, padding: '10px 14px',
          border: `1px solid ${T.border}`,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${color} 0%, ${color}66 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#000', fontFamily: 'Montserrat, sans-serif',
          }}>{init}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: T.white, fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>{name}</div>
            <div style={{ color: T.gray, fontSize: 11, fontFamily: 'Montserrat, sans-serif' }}>{place}</div>
          </div>
          <div style={{
            background: T.surf2, borderRadius: 8, padding: '3px 8px',
            color: T.white, fontSize: 10, fontWeight: 600, fontFamily: 'Montserrat, sans-serif',
            whiteSpace: 'nowrap',
          }}>{tag}</div>
        </div>
      ))}
    </div>

    {/* Bottom Tab Bar */}
    <BottomTabBar active={0} />
  </Screen>
);

// ────────────────────────────────────────────────
// FLOW META DATA
// ────────────────────────────────────────────────
const screens = [
  { num: '01', title: 'Discover',    sub: 'Swipe to find partners',      action: 'Swipe right to Lock In',        component: <DiscoverScreen /> },
  { num: '02', title: 'Profile',     sub: 'Full partner view',            action: 'Tap Lock In to match',          component: <ProfileScreen /> },
  { num: '03', title: 'Locked In!',  sub: 'Match celebration',            action: 'Start chat or keep swiping',    component: <MatchScreen /> },
  { num: '04', title: 'Matches',     sub: 'All connections',              action: 'Tap to open conversation',      component: <MatchesScreen /> },
  { num: '05', title: 'Chat',        sub: 'Training conversation',        action: 'Plan & confirm sessions',       component: <ChatScreen /> },
  { num: '06', title: 'Filter',      sub: 'Refine your search',           action: 'Apply to refresh cards',        component: <FilterScreen /> },
];

// ────────────────────────────────────────────────
// EVENT LIST SCREEN
// ────────────────────────────────────────────────
const EventListScreen = () => {
  const FONT = "'Montserrat', sans-serif";
  const events = [
    {
      id: 1, name: 'Iron Mass Challenge',
      desc: 'Heavy compound lifts, 1RM testing & community battle',
      type: 'STRENGTH', typeBg: '#FFB800', typeColor: '#000',
      date: 'SAT', day: '10', month: 'MAY',
      time: '9:00 AM', dur: '3 hr', price: '$35',
      place: "Gold's Gym Downtown", dist: '0.4 mi',
      filled: 48, max: 100,
      photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=300&q=80',
      going: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=60&h=60&q=80','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=60&h=60&q=80'],
      saved: true, hot: true,
    },
    {
      id: 2, name: 'Sunrise Burn Session',
      desc: 'High-energy outdoor bootcamp to kick-start your week',
      type: 'HIIT', typeBg: '#4ADE80', typeColor: '#000',
      date: 'SUN', day: '11', month: 'MAY',
      time: '6:00 AM', dur: '1.5 hr', price: 'Free',
      place: 'Crunch Fitness', dist: '0.8 mi',
      filled: 23, max: 50,
      photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&h=300&q=80',
      going: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&h=60&q=80'],
      saved: false, hot: false,
    },
    {
      id: 3, name: 'Yoga Flow & Mobility',
      desc: 'Deep stretch, breathwork and active recovery practice',
      type: 'WELLNESS', typeBg: '#A78BFA', typeColor: '#fff',
      date: 'MON', day: '12', month: 'MAY',
      time: '7:00 AM', dur: '1 hr', price: '$20',
      place: 'Equinox HY · Studio 3', dist: '0.3 mi',
      filled: 11, max: 20,
      photo: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&h=300&q=80',
      going: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80','https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=60&h=60&q=80'],
      saved: false, hot: false,
    },
    {
      id: 4, name: 'Functional Athlete Camp',
      desc: 'CrossFit-style WODs with Olympic lifting fundamentals',
      type: 'CROSSFIT', typeBg: '#60A5FA', typeColor: '#000',
      date: 'WED', day: '14', month: 'MAY',
      time: '7:00 AM', dur: '2 hr', price: '$45',
      place: 'CrossFit Midtown', dist: '1.1 mi',
      filled: 30, max: 40,
      photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&h=300&q=80',
      going: [],
      saved: false, hot: true,
    },
    {
      id: 5, name: 'Night Run: Central Park',
      desc: '5K group run through the park with pacers for all speeds',
      type: 'RUNNING', typeBg: '#FB923C', typeColor: '#000',
      date: 'FRI', day: '16', month: 'MAY',
      time: '8:00 PM', dur: '1 hr', price: 'Free',
      place: 'Central Park S Entrance', dist: '1.6 mi',
      filled: 67, max: 200,
      photo: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&h=300&q=80',
      going: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=60&h=60&q=80'],
      saved: true, hot: false,
    },
  ];

  const categories = ['All', 'Strength', 'HIIT', 'Wellness', 'Running', 'CrossFit'];

  return (
    <div style={{
      width: 390, background: '#080808', borderRadius: 44, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C',
      fontFamily: FONT, flexShrink: 0,
    }}>

      {/* ── STATUS BAR ── */}
      <div style={{ padding: '52px 22px 0', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11 }}>●●●</span>
          <span style={{ color: '#fff', fontSize: 11 }}>WiFi</span>
          <span style={{ color: '#fff', fontSize: 11 }}>🔋</span>
        </div>
      </div>

      {/* ── HEADER ── */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ color: '#555', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>DISCOVER</div>
            <div style={{ color: '#fff', fontSize: 24, fontWeight: 900, letterSpacing: '-0.5px' }}>Events</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#111', border: '1px solid #1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 16 }}>🔔</span>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#111', border: '1px solid #1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 16 }}>⚙️</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ marginTop: 14, background: '#101010', borderRadius: 16, border: '1px solid #1C1C1C', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, opacity: 0.5 }}>🔍</span>
          <span style={{ color: '#3A3A3A', fontSize: 13, fontWeight: 500 }}>Search events, gyms, trainers…</span>
          <div style={{ marginLeft: 'auto', background: '#1A1A1A', border: '1px solid #222', borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 12 }}>⚡</span>
            <span style={{ color: '#888', fontSize: 10, fontWeight: 700 }}>Filter</span>
          </div>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'hidden', paddingBottom: 2 }}>
          {categories.map((cat, i) => (
            <div key={cat} style={{
              flexShrink: 0, padding: '7px 14px', borderRadius: 20,
              background: i === 0 ? '#BDFF00' : '#111',
              border: i === 0 ? 'none' : '1px solid #1C1C1C',
            }}>
              <span style={{ color: i === 0 ? '#080808' : '#666', fontSize: 11, fontWeight: 700 }}>{cat}</span>
            </div>
          ))}
        </div>

        {/* Result count + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingBottom: 12, borderBottom: '1px solid #111' }}>
          <span style={{ color: '#555', fontSize: 12 }}>
            <span style={{ color: '#BDFF00', fontWeight: 700 }}>12 events</span> this week · NYC
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#0E0E0E', border: '1px solid #1C1C1C', borderRadius: 10, padding: '5px 10px' }}>
            <span style={{ fontSize: 11 }}>📅</span>
            <span style={{ color: '#888', fontSize: 11, fontWeight: 600 }}>Date</span>
            <span style={{ color: '#555', fontSize: 10 }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── EVENT CARDS ── */}
      <div style={{ padding: '14px 22px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Featured banner — first event */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #1C1C1C', position: 'relative' }}>
          {/* HOT badge */}
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, background: '#FF3B30', borderRadius: 8, padding: '4px 9px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 9 }}>🔥</span>
            <span style={{ color: '#fff', fontSize: 9, fontWeight: 900, letterSpacing: '0.06em' }}>HOT</span>
          </div>
          {/* Save */}
          <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14 }}>🔖</span>
          </div>
          {/* Photo */}
          <div style={{ height: 160, position: 'relative' }}>
            <img src={events[0].photo} alt={events[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(8,8,8,0.9) 100%)' }} />
            {/* Type badge */}
            <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
              <div style={{ background: events[0].typeBg, borderRadius: 7, padding: '3px 9px', display: 'inline-flex' }}>
                <span style={{ color: events[0].typeColor, fontSize: 8, fontWeight: 900, letterSpacing: '0.07em' }}>{events[0].type}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 10, right: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: 7, padding: '3px 9px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>📍 {events[0].dist}</span>
            </div>
          </div>
          {/* Body */}
          <div style={{ background: '#0E0E0E', padding: '12px 14px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>{events[0].name}</div>
                <div style={{ color: '#666', fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>{events[0].desc}</div>
              </div>
              <div style={{ background: '#BDFF00', borderRadius: 10, padding: '5px 10px', flexShrink: 0, textAlign: 'center' }}>
                <div style={{ color: '#080808', fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{events[0].day}</div>
                <div style={{ color: '#080808', fontSize: 9, fontWeight: 700 }}>{events[0].month}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 0, marginTop: 10, background: '#111', borderRadius: 12, overflow: 'hidden', border: '1px solid #1A1A1A' }}>
              {[['🕐', events[0].time],['⏱', events[0].dur],['💳', events[0].price]].map(([icon, val], i) => (
                <div key={i} style={{ flex: 1, padding: '8px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid #1A1A1A' : 'none' }}>
                  <div style={{ fontSize: 12, marginBottom: 2 }}>{icon}</div>
                  <div style={{ color: '#CCC', fontSize: 10, fontWeight: 700 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex' }}>
                  {events[0].going.map((src, i) => (
                    <img key={i} src={src} alt="" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0E0E0E', marginLeft: i === 0 ? 0 : -7 }} />
                  ))}
                </div>
                <span style={{ color: '#666', fontSize: 10 }}>{events[0].filled} going · {events[0].max - events[0].filled} left</span>
              </div>
              <div style={{ background: 'rgba(189,255,0,0.1)', border: '1px solid rgba(189,255,0,0.25)', borderRadius: 10, padding: '6px 14px' }}>
                <span style={{ color: '#BDFF00', fontSize: 11, fontWeight: 800 }}>RSVP →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '2px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#111' }} />
          <span style={{ color: '#333', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>UPCOMING THIS WEEK</span>
          <div style={{ flex: 1, height: 1, background: '#111' }} />
        </div>

        {/* Compact list cards — events 2-5 */}
        {events.slice(1).map((ev) => {
          const pct = Math.round((ev.filled / ev.max) * 100);
          const capColor = pct >= 80 ? '#FF6B00' : pct >= 60 ? '#FFB800' : '#4ADE80';
          return (
            <div key={ev.id} style={{ background: '#0E0E0E', borderRadius: 18, border: '1px solid #161616', overflow: 'hidden', display: 'flex', gap: 0 }}>
              {/* Date strip */}
              <div style={{ width: 52, background: '#0A0A0A', borderRight: '1px solid #161616', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 0', flexShrink: 0 }}>
                <div style={{ color: '#555', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em' }}>{ev.date}</div>
                <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, lineHeight: 1.1, marginTop: 2 }}>{ev.day}</div>
                <div style={{ color: '#444', fontSize: 9, fontWeight: 700 }}>{ev.month}</div>
                {/* type dot */}
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.typeBg, marginTop: 8 }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1, padding: '12px 13px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <div style={{ background: ev.typeBg, borderRadius: 5, padding: '2px 7px' }}>
                        <span style={{ color: ev.typeColor, fontSize: 7.5, fontWeight: 900, letterSpacing: '0.06em' }}>{ev.type}</span>
                      </div>
                      {ev.hot && (
                        <div style={{ background: 'rgba(255,59,48,0.15)', borderRadius: 5, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                          <span style={{ fontSize: 8 }}>🔥</span>
                          <span style={{ color: '#FF3B30', fontSize: 7.5, fontWeight: 900 }}>HOT</span>
                        </div>
                      )}
                    </div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 800, lineHeight: 1.3 }}>{ev.name}</div>
                    <div style={{ color: '#555', fontSize: 10, marginTop: 3, lineHeight: 1.4 }}>{ev.desc}</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: ev.saved ? 'rgba(189,255,0,0.12)' : '#111', border: `1px solid ${ev.saved ? 'rgba(189,255,0,0.3)' : '#1C1C1C'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 12 }}>{ev.saved ? '🔖' : '+'}</span>
                  </div>
                </div>
                {/* Meta row */}
                <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ color: '#666', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}>🕐 {ev.time}</span>
                  <span style={{ color: '#666', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}>📍 {ev.dist}</span>
                  <span style={{ color: '#666', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}>⏱ {ev.dur}</span>
                  <span style={{ color: ev.price === 'Free' ? '#4ADE80' : '#FFB800', fontSize: 10, fontWeight: 700 }}>{ev.price}</span>
                </div>
                {/* Capacity mini bar */}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, background: '#161616', borderRadius: 100, height: 3 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: capColor, borderRadius: 100 }} />
                  </div>
                  <span style={{ color: capColor, fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{ev.max - ev.filled} left</span>
                  {ev.going.length > 0 && (
                    <div style={{ display: 'flex', flexShrink: 0 }}>
                      {ev.going.map((src, i) => (
                        <img key={i} src={src} alt="" style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #0E0E0E', marginLeft: i === 0 ? 0 : -5 }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Load more */}
        <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#0E0E0E', border: '1px solid #1C1C1C', borderRadius: 20, padding: '10px 22px' }}>
            <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 700 }}>Load more events</span>
            <span style={{ color: '#BDFF00', fontSize: 14 }}>↓</span>
          </div>
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{ background: '#080808', borderTop: '1px solid #111', padding: '12px 0 30px', display: 'flex', justifyContent: 'space-around' }}>
        {[['🏠','Home'],['🔍','Discover'],['📅','Events'],['👥','Partners'],['👤','Me']].map(([icon, label], i) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: i === 2 ? 'rgba(189,255,0,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: i === 2 ? '#BDFF00' : '#444' }}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

// EVENT DETAIL SCREEN
// ────────────────────────────────────────────────
const EventDetailScreen = () => {
  const event = {
    name: 'Iron Mass Challenge',
    tagline: 'Push your limits. Test your 1RM. Earn your iron.',
    desc: 'A hardcore strength workshop built for serious lifters. You\'ll cycle through heavy compound movements — squat, bench, deadlift — with expert coaching, then cap it off with a community 1RM test. All levels welcome but come ready to work.',
    type: 'STRENGTH WORKSHOP', typeBg: '#FFB800', typeColor: '#000',
    date: 'Sat, May 10, 2025',
    time: '9:00 AM', end: '12:00 PM', dur: '3 hrs',
    place: "Gold's Gym Downtown",
    address: '247 W 35th St, New York, NY',
    dist: '0.4 mi',
    filled: 48, max: 100,
    price: '$35',
    host: { name: 'MARCUS T.', role: 'Head Strength Coach · NSCA-CSCS', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=100&h=100&q=80', rating: 4.9, sessions: 214 },
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&h=500&q=80',
    agenda: [
      { time: '9:00', label: 'Warm-up & Mobility', icon: '🔥' },
      { time: '9:20', label: 'Compound Lift Blocks (3 rounds)', icon: '🏋️' },
      { time: '10:50', label: '1RM Testing — Squat / Bench / DL', icon: '⚡' },
      { time: '11:30', label: 'Community Leaderboard + Cool-down', icon: '🏆' },
    ],
    attendees: [
      { photo: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=80&h=80&q=80', color: '#4ADE80' },
      { photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=80&h=80&q=80', color: '#F472B6' },
      { photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', color: '#60A5FA' },
      { photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80', color: '#FB923C' },
    ],
    friends: ['EMMA R.', 'DAMON K.'],
    tags: ['Powerlifting', 'Community', 'Competition', 'All Levels'],
    rsvpd: false,
  };

  const FONT = "'Montserrat', sans-serif";
  const pct = Math.round((event.filled / event.max) * 100);
  const capColor = pct >= 80 ? '#FF6B00' : pct >= 60 ? '#FFB800' : '#4ADE80';
  const photos = [
    event.photo,
    'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&h=500&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&h=500&q=80',
  ];
  const agenda = [
    { time: '9:00 AM', dur: '20 min', label: 'Warm-Up & Mobility', sub: null, icon: '🔥', color: '#FF6B00' },
    { time: '9:20 AM', dur: '90 min', label: 'Compound Lift Blocks', sub: 'Squat · Bench · Deadlift — 3 working sets each', icon: '🏋️', color: '#FFB800' },
    { time: '10:50 AM', dur: '40 min', label: '1RM Testing', sub: 'Max attempt with coach spotting & form check', icon: '⚡', color: '#BDFF00' },
    { time: '11:30 AM', dur: '30 min', label: 'Leaderboard + Cool-down', sub: 'Community rankings posted live', icon: '🏆', color: '#60A5FA' },
  ];
  const perks = ['Expert coaching', 'Equipment included', 'Leaderboard prizes', 'Post-event shake'];
  const revData = [
    { name: 'Jake M.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80', rating: 5, text: 'Absolute banger. Marcus pushes you hard but keeps it safe. Hit a new PR!', time: '2w ago' },
    { name: 'Priya S.', photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=60&h=60&q=80', rating: 5, text: "Loved the energy. Everyone cheering each other on — best gym event I've done.", time: '1mo ago' },
  ];
  const similar = [
    { name: 'Powerlifting Meet', type: 'STRENGTH', typeBg: '#FFB800', date: 'May 17', photo: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=200&h=120&q=80', price: '$40' },
    { name: 'Barbell Club Open', type: 'CROSSFIT', typeBg: '#60A5FA', date: 'May 22', photo: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=200&h=120&q=80', price: '$25' },
  ];
  const Sec = ({ title, children, last }) => (
    <div style={{ padding: '18px 22px', borderBottom: last ? 'none' : '1px solid #111' }}>
      <div style={{ color: '#888', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
  return (
    <div style={{ width: 390, background: '#080808', borderRadius: 44, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C', fontFamily: FONT, flexShrink: 0 }}>
      <div style={{ height: 300, position: 'relative', overflow: 'hidden' }}>
        <img src={photos[0]} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, transparent 38%, rgba(8,8,8,0.97) 100%)' }} />
        <div style={{ position: 'absolute', top: 52, left: 22, right: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ color: '#fff', fontSize: 18 }}>←</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', borderRadius: 20, padding: '6px 13px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 600 }}>1 / {photos.length} photos</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🔖', '↑'].map((ic, i) => (
              <div key={i} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ fontSize: 15 }}>{ic}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 86, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {photos.map((_, i) => (
            <div key={i} style={{ width: i === 0 ? 20 : 6, height: 6, borderRadius: 3, background: i === 0 ? '#BDFF00' : 'rgba(255,255,255,0.28)' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 22, right: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
            <div style={{ background: event.typeBg, borderRadius: 7, padding: '3px 10px' }}>
              <span style={{ color: event.typeColor, fontSize: 9, fontWeight: 900, letterSpacing: '0.07em' }}>{event.type}</span>
            </div>
            <div style={{ background: '#FF3B30', borderRadius: 7, padding: '3px 9px', display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontSize: 9 }}>🔥</span><span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>HOT</span>
            </div>
          </div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.3px' }}>{event.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 4, fontStyle: 'italic' }}>{event.tagline}</div>
        </div>
      </div>
      <div style={{ background: '#0A0A0A', borderBottom: '1px solid #111', padding: '12px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {[
            { icon: '📅', lbl: 'DATE', val: 'SAT, 10 MAY' },
            { icon: '🕐', lbl: 'TIME', val: `${event.time}–${event.end}` },
            { icon: '⏱', lbl: 'DURATION', val: event.dur },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, background: '#1A1A1A', margin: '4px 0' }} />}
              <div style={{ flex: 1, textAlign: 'center', padding: '4px 6px' }}>
                <div style={{ fontSize: 17, marginBottom: 3 }}>{s.icon}</div>
                <div style={{ color: '#3A3A3A', fontSize: 8, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 2 }}>{s.lbl}</div>
                <div style={{ color: '#DDD', fontSize: 10, fontWeight: 700 }}>{s.val}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 22px', borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 58, height: 58, borderRadius: 14, overflow: 'hidden', flexShrink: 0, background: '#0D150D', border: '1px solid #1A1A1A', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[25,50,75].map(p => (
              <React.Fragment key={p}>
                <div style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: 'rgba(189,255,0,0.07)' }} />
                <div style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, height: 1, background: 'rgba(189,255,0,0.07)' }} />
              </React.Fragment>
            ))}
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#BDFF00', boxShadow: '0 0 10px rgba(189,255,0,0.55)', position: 'relative', zIndex: 1 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>{event.place}</div>
            <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{event.address}</div>
            <div style={{ display: 'flex', gap: 7, marginTop: 7 }}>
              <div style={{ background: 'rgba(189,255,0,0.08)', border: '1px solid rgba(189,255,0,0.2)', borderRadius: 7, padding: '3px 9px' }}>
                <span style={{ color: '#BDFF00', fontSize: 10, fontWeight: 700 }}>📍 {event.dist}</span>
              </div>
              <div style={{ background: '#111', border: '1px solid #1C1C1C', borderRadius: 7, padding: '3px 9px' }}>
                <span style={{ color: '#555', fontSize: 10, fontWeight: 600 }}>Directions →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sec title="ABOUT THIS EVENT">
        <div style={{ color: '#888', fontSize: 12, lineHeight: 1.8, marginBottom: 14 }}>{event.desc}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {perks.map((p, i) => (
            <div key={i} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#BDFF00', flexShrink: 0 }} />
              <span style={{ color: '#AAA', fontSize: 10, fontWeight: 600 }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {event.tags.map(t => (
            <span key={t} style={{ background: '#111', border: '1px solid #1E1E1E', color: '#777', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{t}</span>
          ))}
        </div>
      </Sec>
      <Sec title="SCHEDULE">
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 5, top: 7, bottom: 7, width: 2, borderRadius: 1, background: 'linear-gradient(180deg, #BDFF00 0%, #1A1A1A 100%)' }} />
          {agenda.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < agenda.length - 1 ? 20 : 0 }}>
              <div style={{ position: 'absolute', left: -24, top: 2, width: 12, height: 12, borderRadius: '50%', background: item.color, border: '2px solid #080808', boxShadow: `0 0 8px ${item.color}44` }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 13 }}>{item.icon}</span>
                    <span style={{ color: '#DDD', fontSize: 12, fontWeight: 800 }}>{item.label}</span>
                  </div>
                  {item.sub && <div style={{ color: '#555', fontSize: 10, lineHeight: 1.5 }}>{item.sub}</div>}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#777', fontSize: 10, fontWeight: 700 }}>{item.time}</div>
                  <div style={{ color: '#333', fontSize: 9, marginTop: 1 }}>{item.dur}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sec>
      <Sec title="HOSTED BY">
        <div style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: 18, padding: '14px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={event.host.photo} alt={event.host.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', display: 'block', border: '2.5px solid #FFB800' }} />
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 16, height: 16, borderRadius: '50%', background: '#FFB800', border: '2px solid #0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#000', fontSize: 8, fontWeight: 900 }}>✓</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>{event.host.name}</div>
              <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{event.host.role}</div>
            </div>
            <div style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.25)', borderRadius: 10, padding: '7px 14px', flexShrink: 0 }}>
              <span style={{ color: '#FFB800', fontSize: 11, fontWeight: 800 }}>Follow</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#111', borderRadius: 12, overflow: 'hidden', border: '1px solid #1A1A1A' }}>
            {[['★ ' + event.host.rating, 'Rating'], [event.host.sessions, 'Sessions'], ['312', 'Reviews']].map(([val, lbl], i) => (
              <div key={i} style={{ padding: '10px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid #1A1A1A' : 'none' }}>
                <div style={{ color: '#FFB800', fontSize: 13, fontWeight: 900 }}>{val}</div>
                <div style={{ color: '#444', fontSize: 9, fontWeight: 600, marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>
      <Sec title="WHO'S GOING">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex' }}>
            {event.attendees.map((a, i) => (
              <img key={i} src={a.photo} alt="" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #080808', marginLeft: i === 0 ? 0 : -12, zIndex: event.attendees.length - i }} />
            ))}
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1A1A1A', border: '2px solid #080808', marginLeft: -12, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
              <span style={{ color: '#666', fontSize: 10, fontWeight: 700 }}>+{event.filled - event.attendees.length}</span>
            </div>
          </div>
          <div>
            <div style={{ color: '#CCC', fontSize: 12, fontWeight: 600 }}>
              <span style={{ color: '#4ADE80' }}>2 friends</span> attending
            </div>
            <div style={{ color: '#444', fontSize: 10, marginTop: 2 }}>{event.filled} going · {event.max - event.filled} spots left</div>
          </div>
        </div>
        <div style={{ background: '#111', borderRadius: 100, height: 6, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${capColor}, ${capColor}BB)`, borderRadius: 100 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: capColor, fontSize: 10, fontWeight: 700 }}>{pct}% filled</span>
          <span style={{ color: '#444', fontSize: 10 }}>{event.max - event.filled} of {event.max} spots remaining</span>
        </div>
      </Sec>
      <Sec title="REVIEWS">
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ textAlign: 'center', minWidth: 56 }}>
            <div style={{ color: '#FFB800', fontSize: 34, fontWeight: 900, lineHeight: 1 }}>4.9</div>
            <div style={{ color: '#FFB800', fontSize: 14, marginTop: 2 }}>★★★★★</div>
            <div style={{ color: '#444', fontSize: 10, marginTop: 3 }}>312 reviews</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[[5,'88%'],[4,'9%'],[3,'3%']].map(([s, w]) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ color: '#444', fontSize: 9, width: 8, textAlign: 'right' }}>{s}</span>
                <div style={{ flex: 1, height: 5, background: '#161616', borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{ width: w, height: '100%', background: '#FFB800', borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {revData.map((r, i) => (
          <div key={i} style={{ background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: 14, padding: '12px', marginBottom: i < revData.length - 1 ? 10 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <img src={r.photo} alt={r.name} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #222' }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: '#DDD', fontSize: 12, fontWeight: 700 }}>{r.name}</div>
                <div style={{ color: '#FFB800', fontSize: 11 }}>{'★'.repeat(r.rating)}</div>
              </div>
              <span style={{ color: '#333', fontSize: 10 }}>{r.time}</span>
            </div>
            <div style={{ color: '#777', fontSize: 11, lineHeight: 1.65, fontStyle: 'italic' }}>"{r.text}"</div>
          </div>
        ))}
      </Sec>
      <Sec title="YOU MIGHT ALSO LIKE">
        <div style={{ display: 'flex', gap: 10 }}>
          {similar.map((s, i) => (
            <div key={i} style={{ flex: 1, background: '#0D0D0D', border: '1px solid #1A1A1A', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 76, position: 'relative' }}>
                <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
                <div style={{ position: 'absolute', top: 7, left: 7, background: s.typeBg, borderRadius: 5, padding: '2px 7px' }}>
                  <span style={{ color: '#000', fontSize: 7.5, fontWeight: 900 }}>{s.type}</span>
                </div>
              </div>
              <div style={{ padding: '9px 10px 11px' }}>
                <div style={{ color: '#DDD', fontSize: 11, fontWeight: 800, lineHeight: 1.3, marginBottom: 5 }}>{s.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#555', fontSize: 10 }}>{s.date}</span>
                  <span style={{ color: '#FFB800', fontSize: 10, fontWeight: 700 }}>{s.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sec>
      <div style={{ background: '#080808', borderTop: '1px solid #111', padding: '14px 22px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ color: '#3A3A3A', fontSize: 9, fontWeight: 700, letterSpacing: '0.09em', marginBottom: 3 }}>ENTRY FEE</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1 }}>
              {event.price}<span style={{ color: '#444', fontSize: 11, fontWeight: 400 }}> / person</span>
            </div>
            <div style={{ color: '#2A2A2A', fontSize: 9, marginTop: 3 }}>includes equipment · certified coach</div>
          </div>
          <div style={{ background: '#111', border: '1px solid #1C1C1C', borderRadius: 14, padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ display: 'flex' }}>
              {event.attendees.slice(0,3).map((a, i) => (
                <img key={i} src={a.photo} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #111', marginLeft: i === 0 ? 0 : -6 }} />
              ))}
            </div>
            <span style={{ color: '#444', fontSize: 9, fontWeight: 600 }}>Invite friends</span>
          </div>
        </div>
        <button style={{ width: '100%', padding: '15px 0', borderRadius: 16, background: 'linear-gradient(135deg, #BDFF00 0%, #9EDB00 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
          <span style={{ fontSize: 16 }}>⚡</span>
          <span style={{ color: '#080808', fontSize: 14, fontWeight: 900, letterSpacing: '0.06em' }}>LOCK IN — RSVP NOW</span>
        </button>
        <div style={{ textAlign: 'center', marginTop: 8, color: '#2E2E2E', fontSize: 10 }}>
          Free cancellation up to 24 hrs · <span style={{ color: '#3A3A3A', fontWeight: 600 }}>{event.max - event.filled} spots left</span>
        </div>
      </div>
    </div>
  );
};

// MATCH REQUEST VARIATIONS
// ────────────────────────────────────────────────
const MR_FONT = "'Montserrat', sans-serif";
const MR_BG   = '#080808';

const mrPeople = [
  { name: 'EMMA R.',   tags: ['Strength','Yoga'],        msg: 'Looking for a morning partner 💪', dist: '0.8 mi', time: '2h ago',  pct: 94, traits: ['Morning sessions','Strength goals','Same gym'], photo: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=200&h=200&q=80', color: '#4ADE80' },
  { name: 'DAMON K.',  tags: ['Powerlifting','HIIT'],    msg: 'Wanna hit chest day together?',    dist: '1.2 mi', time: '4h ago',  pct: 87, traits: ['Evening sessions','Heavy lifting','Equinox HY'], photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=200&h=200&q=80', color: '#60A5FA' },
  { name: 'SOFIA M.',  tags: ['Running','Cardio'],       msg: '5K training partner needed! 🏃',   dist: '0.5 mi', time: '6h ago',  pct: 79, traits: ['Outdoor runs','Cardio focus','Early birds'],  photo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&h=200&q=80', color: '#F472B6' },
];

// ── VAR A: Refined List ──
const MatchRequestsVarA = () => (
  <div style={{ width: 390, background: MR_BG, borderRadius: 44, overflow: 'hidden', flexShrink: 0, fontFamily: MR_FONT, boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C', WebkitFontSmoothing: 'antialiased' }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');`}</style>
    <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: MR_FONT }}>9:41</span>
      <span style={{ color: '#fff', fontSize: 11, opacity: 0.7 }}>●●● 5G ▌▌▌▌</span>
    </div>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#fff', fontSize: 20, fontWeight: 900, fontFamily: MR_FONT }}>Match Requests</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: MR_FONT }}>3</span>
        </div>
      </div>
      <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: MR_FONT }}>View All →</span>
    </div>
    {/* Cards */}
    {mrPeople.map((p) => (
      <div key={p.name} style={{ margin: '0 22px 12px', background: '#0E0E0E', borderRadius: 20, overflow: 'hidden', border: '1px solid #1C1C1C' }}>
        {/* Top accent */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${p.color}88, transparent)` }} />
        <div style={{ padding: '13px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${p.color}55` }}>
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', background: '#BDFF00', border: '2px solid #0E0E0E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 900, color: '#000' }}>✓</div>
          </div>
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: MR_FONT }}>{p.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#444', fontSize: 9, fontFamily: MR_FONT }}>📍{p.dist}</span>
                <span style={{ color: '#333', fontSize: 9 }}>·</span>
                <span style={{ color: '#444', fontSize: 9, fontFamily: MR_FONT }}>{p.time}</span>
              </div>
            </div>
            {/* Tags */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
              {p.tags.map(t => (
                <div key={t} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 6, padding: '2px 7px' }}>
                  <span style={{ color: '#888', fontSize: 9, fontWeight: 600, fontFamily: MR_FONT }}>{t}</span>
                </div>
              ))}
              {/* Match % */}
              <div style={{ marginLeft: 'auto', background: 'rgba(189,255,0,0.1)', border: '1px solid rgba(189,255,0,0.25)', borderRadius: 6, padding: '2px 7px' }}>
                <span style={{ color: '#BDFF00', fontSize: 9, fontWeight: 800, fontFamily: MR_FONT }}>{p.pct}% match</span>
              </div>
            </div>
            <div style={{ color: '#666', fontSize: 11, fontFamily: MR_FONT, fontStyle: 'italic' }}>"{p.msg}"</div>
          </div>
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', borderTop: '1px solid #181818' }}>
          <div style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #181818', gap: 5 }}>
            <span style={{ color: '#444', fontSize: 12 }}>✕</span>
            <span style={{ color: '#444', fontSize: 11, fontWeight: 600, fontFamily: MR_FONT }}>Decline</span>
          </div>
          <div style={{ flex: 2, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'rgba(189,255,0,0.06)' }}>
            <span style={{ color: '#BDFF00', fontSize: 11, fontWeight: 900, fontFamily: MR_FONT }}>🔒 LOCK IN</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── VAR B: Swipe Cards ──
const MatchRequestsVarB = () => (
  <div style={{ width: 390, background: MR_BG, borderRadius: 44, overflow: 'hidden', flexShrink: 0, fontFamily: MR_FONT, boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C', WebkitFontSmoothing: 'antialiased' }}>
    <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: MR_FONT }}>9:41</span>
      <span style={{ color: '#fff', fontSize: 11, opacity: 0.7 }}>●●● 5G ▌▌▌▌</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#fff', fontSize: 20, fontWeight: 900, fontFamily: MR_FONT }}>Match Requests</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: MR_FONT }}>3</span>
        </div>
      </div>
      <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: MR_FONT }}>View All →</span>
    </div>
    {/* Featured card */}
    <div style={{ margin: '0 22px', borderRadius: 24, overflow: 'hidden', position: 'relative', height: 340 }}>
      <img src={mrPeople[0].photo} alt={mrPeople[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.92) 100%)' }} />
      {/* Distance + time */}
      <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 6 }}>
        <div style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderRadius: 9, padding: '4px 9px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, fontFamily: MR_FONT }}>📍 {mrPeople[0].dist}</span>
        </div>
      </div>
      {/* Match % badge */}
      <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(189,255,0,0.9)', borderRadius: 9, padding: '4px 10px' }}>
        <span style={{ color: '#000', fontSize: 10, fontWeight: 900, fontFamily: MR_FONT }}>{mrPeople[0].pct}% MATCH</span>
      </div>
      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 900, fontFamily: MR_FONT, lineHeight: 1.1 }}>{mrPeople[0].name}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
              {mrPeople[0].tags.map(t => (
                <div key={t} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', borderRadius: 7, padding: '3px 9px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 600, fontFamily: MR_FONT }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '9px 12px', marginBottom: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontFamily: MR_FONT, fontStyle: 'italic' }}>"{mrPeople[0].msg}"</span>
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,59,48,0.15)', border: '1.5px solid rgba(255,59,48,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✕</div>
          <div style={{ flex: 1, height: 52, borderRadius: 26, background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ color: '#000', fontSize: 14, fontWeight: 900, fontFamily: MR_FONT }}>🔒 LOCK IN</span>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(189,255,0,0.1)', border: '1.5px solid rgba(189,255,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>♥</div>
        </div>
      </div>
    </div>
    {/* Scroll indicator + queue */}
    <div style={{ padding: '14px 22px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 14 }}>
        {mrPeople.map((_, i) => (
          <div key={i} style={{ width: i === 0 ? 20 : 6, height: 5, borderRadius: 3, background: i === 0 ? '#BDFF00' : '#222' }} />
        ))}
      </div>
      {/* Queue row */}
      <div style={{ display: 'flex', gap: 10 }}>
        {mrPeople.slice(1).map((p) => (
          <div key={p.name} style={{ flex: 1, background: '#111', borderRadius: 14, overflow: 'hidden', border: '1px solid #1C1C1C' }}>
            <div style={{ height: 64, overflow: 'hidden', position: 'relative' }}>
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
            </div>
            <div style={{ padding: '7px 9px' }}>
              <div style={{ color: '#fff', fontSize: 10, fontWeight: 800, fontFamily: MR_FONT }}>{p.name}</div>
              <div style={{ color: '#BDFF00', fontSize: 9, fontWeight: 700, fontFamily: MR_FONT }}>{p.pct}% match</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── VAR C: Notification Feed ──
const MatchRequestsVarC = () => (
  <div style={{ width: 390, background: MR_BG, borderRadius: 44, overflow: 'hidden', flexShrink: 0, fontFamily: MR_FONT, boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C', WebkitFontSmoothing: 'antialiased' }}>
    <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: MR_FONT }}>9:41</span>
      <span style={{ color: '#fff', fontSize: 11, opacity: 0.7 }}>●●● 5G ▌▌▌▌</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#fff', fontSize: 20, fontWeight: 900, fontFamily: MR_FONT }}>Match Requests</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: MR_FONT }}>3</span>
        </div>
      </div>
      <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: MR_FONT }}>View All →</span>
    </div>
    {/* Notification rows */}
    <div style={{ background: '#0C0C0C', margin: '0 22px', borderRadius: 22, border: '1px solid #181818', overflow: 'hidden' }}>
      {mrPeople.map((p, i) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderBottom: i < mrPeople.length - 1 ? '1px solid #181818' : 'none', position: 'relative' }}>
          {/* New pulse dot */}
          <div style={{ position: 'absolute', top: 13, left: 8, width: 6, height: 6, borderRadius: '50%', background: '#BDFF00' }} />
          {/* Photo */}
          <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${p.color}44`, flexShrink: 0 }}>
            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: MR_FONT }}>{p.name}</span>
              <span style={{ color: '#333', fontSize: 10, fontFamily: MR_FONT }}>{p.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              {p.tags.map(t => (
                <div key={t} style={{ background: '#181818', borderRadius: 5, padding: '1px 6px' }}>
                  <span style={{ color: '#666', fontSize: 9, fontWeight: 600, fontFamily: MR_FONT }}>{t}</span>
                </div>
              ))}
              <span style={{ color: '#333', fontSize: 9, fontFamily: MR_FONT }}>· {p.dist}</span>
            </div>
            <div style={{ color: '#555', fontSize: 11, fontFamily: MR_FONT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.msg}</div>
          </div>
          {/* Quick action icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(189,255,0,0.12)', border: '1.5px solid rgba(189,255,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#BDFF00', fontSize: 14, fontWeight: 900, lineHeight: 1 }}>✓</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,59,48,0.08)', border: '1.5px solid rgba(255,59,48,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FF3B30', fontSize: 13, lineHeight: 1 }}>✕</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* View all pill */}
    <div style={{ margin: '12px 22px 0', height: 44, borderRadius: 22, background: '#111', border: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <span style={{ color: '#555', fontSize: 12, fontWeight: 600, fontFamily: MR_FONT }}>See all 3 requests</span>
      <span style={{ color: '#BDFF00', fontSize: 13 }}>→</span>
    </div>
  </div>
);

// ── VAR D: Match Score ──
const MatchRequestsVarD = () => (
  <div style={{ width: 390, background: MR_BG, borderRadius: 44, overflow: 'hidden', flexShrink: 0, fontFamily: MR_FONT, boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px #1C1C1C', WebkitFontSmoothing: 'antialiased' }}>
    <div style={{ height: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px' }}>
      <span style={{ color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: MR_FONT }}>9:41</span>
      <span style={{ color: '#fff', fontSize: 11, opacity: 0.7 }}>●●● 5G ▌▌▌▌</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#fff', fontSize: 20, fontWeight: 900, fontFamily: MR_FONT }}>Match Requests</span>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FF3B30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: MR_FONT }}>3</span>
        </div>
      </div>
      <span style={{ color: '#BDFF00', fontSize: 12, fontWeight: 600, fontFamily: MR_FONT }}>View All →</span>
    </div>
    {/* Score cards */}
    {mrPeople.map((p, idx) => (
      <div key={p.name} style={{ margin: `0 22px ${idx < mrPeople.length - 1 ? 12 : 0}px`, background: '#0E0E0E', borderRadius: 22, border: '1px solid #1C1C1C', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          {/* Photo + ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <svg width="64" height="64" style={{ position: 'absolute', top: -4, left: -4 }}>
              <circle cx="32" cy="32" r="28" fill="none" stroke="#1A1A1A" strokeWidth="3" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="#BDFF00" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 28 * p.pct / 100} ${2 * Math.PI * 28}`}
                strokeLinecap="round" transform="rotate(-90 32 32)" />
            </svg>
            <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden' }}>
              <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          </div>
          {/* Name + score */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ color: '#fff', fontSize: 15, fontWeight: 900, fontFamily: MR_FONT }}>{p.name}</span>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#000' }}>✓</div>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {p.tags.map(t => (
                <div key={t} style={{ background: '#1A1A1A', border: '1px solid #252525', borderRadius: 6, padding: '2px 7px' }}>
                  <span style={{ color: '#777', fontSize: 9, fontWeight: 600, fontFamily: MR_FONT }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Big score */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ color: '#BDFF00', fontSize: 28, fontWeight: 900, fontFamily: MR_FONT, lineHeight: 1 }}>{p.pct}%</div>
            <div style={{ color: '#444', fontSize: 9, fontFamily: MR_FONT, letterSpacing: '0.06em' }}>MATCH</div>
          </div>
        </div>
        {/* Why you match */}
        <div style={{ background: '#141414', borderRadius: 12, padding: '10px 12px', marginBottom: 12 }}>
          <div style={{ color: '#444', fontSize: 9, fontWeight: 700, fontFamily: MR_FONT, letterSpacing: '0.08em', marginBottom: 7 }}>WHY YOU MATCH</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {p.traits.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#BDFF00', fontSize: 9 }}>✓</span>
                <span style={{ color: '#777', fontSize: 10, fontFamily: MR_FONT }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: '#161616', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#444' }}>✕</div>
          <div style={{ flex: 1, height: 44, borderRadius: 13, background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <span style={{ color: '#000', fontSize: 13, fontWeight: 900, fontFamily: MR_FONT }}>🔒 LOCK IN</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const trainerScreens = [
  { num: 'T1', title: 'Trainer Card',    sub: 'Trainer in swipe deck',         action: 'Tap Book Intro to Lock In',        component: <TrainerCardScreen /> },
  { num: 'T2', title: 'Pending Match',   sub: 'Waiting for trainer to accept',  action: 'Trainer notified of your request', component: <PendingMatchScreen /> },
  { num: 'T3', title: 'Coach Accepted!', sub: 'Mutual match celebration',       action: 'Book free intro session',          component: <TrainerMatchScreen /> },
];

// ────────────────────────────────────────────────
// MAIN PAGE
// ────────────────────────────────────────────────
export default function LockInFlow() {
  return (
    <div style={{
      minHeight: '100vh', background: '#050505',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ── HEADER BANNER ── */}
      <div style={{
        background: 'linear-gradient(90deg, #050505 0%, #0B1005 40%, #050505 100%)',
        borderBottom: '1px solid #181818', padding: '28px 56px',
        display: 'flex', alignItems: 'center', gap: 40,
      }}>
        <div>
          <div style={{ color: '#BDFF00', fontSize: 30, fontWeight: 900, letterSpacing: '0.12em', lineHeight: 1 }}>
            LOCK·IN
          </div>
          <div style={{ color: '#555', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', marginTop: 4 }}>
            FITNESS COMMUNITY APP
          </div>
        </div>
        <div style={{ width: 1, height: 44, background: '#222' }} />
        <div>
          <div style={{ color: '#FFF', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
            Workout Partner Flow — Key Screens
          </div>
          <div style={{ color: '#666', fontSize: 13 }}>
            Revamp Design · Dark Theme + Neon Green · Inspired by Nike, Strava & Under Armour
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 28, alignItems: 'center' }}>
          {[['#0A0A0A','Background'],['#BDFF00','Primary'],['#1A1A1A','Surface']].map(([hex, name]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: hex, border: '1px solid #333' }} />
              <div>
                <div style={{ color: '#FFF', fontSize: 11, fontWeight: 600 }}>{hex}</div>
                <div style={{ color: '#555', fontSize: 10 }}>{name}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: '#555', border: '1px solid #333' }} />
            <div>
              <div style={{ color: '#FFF', fontSize: 11, fontWeight: 600 }}>Inter</div>
              <div style={{ color: '#555', fontSize: 10 }}>Typeface</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOME SCREEN SECTION ── */}
      <div style={{ padding: '28px 56px 0', color: '#444', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', fontFamily: 'Montserrat, sans-serif' }}>
        HOME SCREEN · ATHLETE DASHBOARD · MONTSERRAT
      </div>
      <div style={{ overflowX: 'auto', padding: '16px 56px 40px' }}>
        <div style={{ display: 'flex', gap: 52, marginBottom: 14, width: 'max-content' }}>
          {[
            { badge: 'H', title: 'Home (Athlete)', sub: 'Personalized engagement hub' },
            { badge: 'SM', title: 'Session Manager', sub: 'Trainer slot & capacity view' },
          ].map(({ badge, title, sub }) => (
            <div key={title} style={{ width: 390, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#BDFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#0A0A0A', fontFamily: 'Montserrat, sans-serif' }}>{badge}</div>
                <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>{title}</span>
              </div>
              <div style={{ color: '#666', fontSize: 12, fontFamily: 'Montserrat, sans-serif' }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 52, width: 'max-content', alignItems: 'flex-start' }}>
          <HomeScreen />
          <TrainerSessionManager />
        </div>
        <div style={{ display: 'flex', gap: 52, marginTop: 14, width: 'max-content' }}>
          {[
            'First screen after login · personalized dashboard',
            'Trainer view · manage slots, capacity & clients',
          ].map((txt) => (
            <div key={txt} style={{ width: 390, background: '#0E0E0E', borderRadius: 12, border: '1px solid #1A1A1A', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#555', fontSize: 12, fontFamily: 'Montserrat, sans-serif' }}>{txt}</span>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#BDFF00', opacity: 0.6, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── EVENTS FLOW CANVAS ── */}
      <div style={{ padding: '60px 56px 0', borderTop: '1px solid #151515', marginTop: 60 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{ width: 4, height: 28, background: '#FFB800', borderRadius: 2 }} />
            <h2 style={{ color: '#FFF', fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
              EVENTS FLOW · LIST → DETAIL
            </h2>
          </div>
          <p style={{ color: '#555', fontSize: 13, margin: '0 0 0 18px', lineHeight: 1.6 }}>
            Browse all upcoming events with filters and category pills, then tap through to the full event detail page.
          </p>
        </div>
      </div>
      <div style={{ overflowX: 'auto', padding: '0 56px 80px' }}>
        {/* Titles */}
        <div style={{ display: 'flex', gap: 52, marginBottom: 14, width: 'max-content' }}>
          {[
            { icon: '📋', title: 'Event List', sub: 'Discover · search · filter · browse' },
            { icon: '📅', title: 'Event Detail', sub: 'Iron Mass Challenge · Gold\'s Gym · $35' },
          ].map(({ icon, title, sub }) => (
            <div key={title} style={{ width: 390, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FFB800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#080808' }}>{icon}</div>
                <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>{title}</span>
              </div>
              <div style={{ color: '#555', fontSize: 12 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Screens row with connector arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'max-content' }}>
          <EventListScreen />
          <div style={{ width: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 28, height: 1.5, background: 'rgba(255,184,0,0.4)' }} />
              <div style={{ color: '#FFB800', fontSize: 14, opacity: 0.6, lineHeight: 1 }}>›</div>
            </div>
          </div>
          <EventDetailScreen />
        </div>

        {/* Bottom labels */}
        <div style={{ display: 'flex', gap: 52, marginTop: 14, width: 'max-content' }}>
          {[
            { desc: 'Search + category filter + featured card + compact list', badge: 'List View' },
            { desc: 'Tap event card on home → full detail view with RSVP', badge: 'Detail View' },
          ].map(({ desc, badge }) => (
            <div key={badge} style={{
              width: 390, background: '#0E0B00', borderRadius: 12,
              border: '1px solid rgba(255,184,0,0.15)', padding: '11px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#666', fontSize: 12 }}>{desc}</span>
              <span style={{ background: 'rgba(255,184,0,0.1)', color: '#FFB800', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, flexShrink: 0, marginLeft: 10 }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FLOW LABEL ── */}
      <div style={{ padding: '20px 56px 0', color: '#444', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}>
        CORE USER JOURNEY · 6 KEY SCREENS · WORKOUT PARTNER
      </div>

      {/* ── SCREENS CANVAS ── */}
      <div style={{ overflowX: 'auto', padding: '16px 56px 56px' }}>

        {/* Screen titles */}
        <div style={{ display: 'flex', gap: 52, marginBottom: 14, width: 'max-content' }}>
          {screens.map(s => (
            <div key={s.num} style={{ width: 390, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: '#BDFF00',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#0A0A0A',
                }}>{s.num}</div>
                <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>{s.title}</span>
              </div>
              <div style={{ color: '#666', fontSize: 12 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Screens row with connectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'max-content' }}>
          {screens.map((s, i) => (
            <React.Fragment key={s.num}>
              {s.component}
              {i < screens.length - 1 && (
                <div style={{
                  width: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 28, height: 1.5, background: 'rgba(189,255,0,0.4)' }} />
                    <div style={{ color: '#BDFF00', fontSize: 14, opacity: 0.6, lineHeight: 1 }}>›</div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom labels */}
        <div style={{ display: 'flex', gap: 52, marginTop: 14, width: 'max-content' }}>
          {screens.map(s => (
            <div key={s.num} style={{
              width: 390, background: '#0E0E0E', borderRadius: 12,
              border: '1px solid #1A1A1A', padding: '11px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#555', fontSize: 12 }}>{s.action}</span>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#BDFF00', opacity: 0.6, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── TRAINER FLOW DIVIDER ── */}
      <div style={{ padding: '0 56px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, #1E1E00, transparent)' }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,184,0,0.06)', borderRadius: 30,
          border: '1px solid rgba(255,184,0,0.2)', padding: '8px 20px',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFB800' }} />
          <span style={{ color: '#FFB800', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em' }}>
            TRAINER MATCH FLOW · 3 KEY SCREENS
          </span>
          <div style={{
            background: 'rgba(255,184,0,0.18)', borderRadius: 10, padding: '2px 8px',
            color: '#FFB800', fontSize: 10, fontWeight: 700,
          }}>GOLD TIER</div>
        </div>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, #1E1E00, transparent)' }} />
      </div>

      {/* ── TRAINER SCREENS CANVAS ── */}
      <div style={{ overflowX: 'auto', padding: '0 56px 80px' }}>

        {/* Trainer screen titles */}
        <div style={{ display: 'flex', gap: 52, marginBottom: 14, width: 'max-content' }}>
          {trainerScreens.map(s => (
            <div key={s.num} style={{ width: 390, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: '#FFB800',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#0A0A0A',
                }}>{s.num}</div>
                <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>{s.title}</span>
              </div>
              <div style={{ color: '#666', fontSize: 12 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Trainer screens row with connectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'max-content' }}>
          {trainerScreens.map((s, i) => (
            <React.Fragment key={s.num}>
              {s.component}
              {i < trainerScreens.length - 1 && (
                <div style={{
                  width: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 28, height: 1.5, background: 'rgba(255,184,0,0.4)' }} />
                    <div style={{ color: '#FFB800', fontSize: 14, opacity: 0.6, lineHeight: 1 }}>›</div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Trainer bottom labels */}
        <div style={{ display: 'flex', gap: 52, marginTop: 14, width: 'max-content' }}>
          {trainerScreens.map(s => (
            <div key={s.num} style={{
              width: 390, background: '#0E0B00', borderRadius: 12,
              border: '1px solid rgba(255,184,0,0.15)', padding: '11px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#666', fontSize: 12 }}>{s.action}</span>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFB800', opacity: 0.6, flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MATCH REQUESTS VARIATIONS CANVAS ── */}
      <div style={{ padding: '60px 56px 0', borderTop: '1px solid #151515', marginTop: 60 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{ width: 4, height: 28, background: '#BDFF00', borderRadius: 2 }} />
            <h2 style={{ color: '#FFF', fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
              MATCH REQUESTS · 4 DESIGN VARIATIONS
            </h2>
          </div>
          <p style={{ color: '#555', fontSize: 13, margin: '0 0 0 18px', lineHeight: 1.6 }}>
            Exploring different UI patterns for the incoming match request flow — list, swipe card, notification feed, and match score ring.
          </p>
        </div>
      </div>
      <div style={{ overflowX: 'auto', padding: '0 56px 80px' }}>

        {/* Variation titles */}
        <div style={{ display: 'flex', gap: 52, marginBottom: 14, width: 'max-content' }}>
          {[
            { label: 'VAR A', title: 'Refined List', sub: 'Horizontal rows with tags & match %' },
            { label: 'VAR B', title: 'Swipe Card', sub: 'Featured card + queued previews' },
            { label: 'VAR C', title: 'Notification Feed', sub: 'Compact list with quick actions' },
            { label: 'VAR D', title: 'Match Score Ring', sub: 'SVG ring + compatibility traits' },
          ].map(v => (
            <div key={v.label} style={{ width: 390, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', background: '#BDFF00',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 900, color: '#080808',
                }}>{v.label}</div>
                <span style={{ color: '#FFF', fontSize: 15, fontWeight: 700 }}>{v.title}</span>
              </div>
              <div style={{ color: '#555', fontSize: 12 }}>{v.sub}</div>
            </div>
          ))}
        </div>

        {/* Variation screens row */}
        <div style={{ display: 'flex', gap: 52, alignItems: 'flex-start', width: 'max-content' }}>
          <MatchRequestsVarA />
          <MatchRequestsVarB />
          <MatchRequestsVarC />
          <MatchRequestsVarD />
        </div>

        {/* Variation bottom labels */}
        <div style={{ display: 'flex', gap: 52, marginTop: 14, width: 'max-content' }}>
          {[
            { desc: 'Full profile preview with accept/decline split bar', badge: 'Detailed' },
            { desc: 'Tinder-inspired swipe with action buttons', badge: 'Familiar' },
            { desc: 'Fast processing — check/close taps only', badge: 'Efficient' },
            { desc: 'Data-driven compatibility with trait matching', badge: 'Analytical' },
          ].map((l, i) => (
            <div key={i} style={{
              width: 390, background: '#060F00', borderRadius: 12,
              border: '1px solid rgba(189,255,0,0.12)', padding: '11px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#666', fontSize: 12 }}>{l.desc}</span>
              <span style={{
                background: 'rgba(189,255,0,0.1)', color: '#BDFF00',
                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                flexShrink: 0, marginLeft: 10,
              }}>{l.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

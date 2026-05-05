import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Tag, Btn, Avatar, PhotoPlaceholder, Container, SectionHeader } from '../components/primitives';
import AskAIFab from '../components/AskAIFab';
import logo from '../assets/whyclick-logo.png';

// ── NAV ──────────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { icon: 'tooth',    label: 'Dentists',           sub: '14,200 pros' },
  { icon: 'fork',     label: 'Restaurants',        sub: '12,840 listings' },
  { icon: 'scissors', label: 'Salons & Spas',      sub: '6,420 pros' },
  { icon: 'home',     label: 'Home Services',      sub: '9,180 pros' },
  { icon: 'wrench',   label: 'Service Pros',       sub: '20,100 pros' },
  { icon: 'camera',   label: 'Photographers',      sub: '3,640 pros' },
  { icon: 'pin',      label: 'Real Estate',        sub: '5,210 agents' },
  { icon: 'sparkle',  label: 'Wellness & Fitness', sub: '4,860 pros' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Browse', hasMenu: true },
    { label: 'Industries', hasMenu: true, kind: 'industries' },
    { label: 'How it works' },
    { label: 'For professionals' },
    { label: 'About' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'oklch(0.985 0.005 80 / 0.96)' : 'oklch(0.985 0.005 80 / 0.65)',
      backdropFilter: 'saturate(180%) blur(16px)',
      WebkitBackdropFilter: 'saturate(180%) blur(16px)',
      borderBottom: scrolled ? '1px solid var(--line-2)' : '1px solid transparent',
      boxShadow: scrolled ? '0 1px 0 oklch(0.92 0.01 80 / 0.6), 0 8px 24px -16px oklch(0.2 0.02 80 / 0.18)' : 'none',
      transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
    }}>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72, gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block' }} />
            </a>
            <nav style={{ display: 'flex', gap: 4, position: 'relative' }}>
              {links.map(l => (
                <a
                  key={l.label}
                  href="#"
                  onMouseEnter={() => setHover(l.label)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    position: 'relative',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '8px 12px', borderRadius: 8,
                    font: '500 14px/1 Inter',
                    color: hover === l.label ? 'var(--ink)' : 'var(--ink-2)',
                    background: hover === l.label ? 'oklch(0.94 0.01 80 / 0.7)' : 'transparent',
                    transition: 'background 160ms ease, color 160ms ease',
                  }}
                >
                  {l.label}
                  {l.hasMenu && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{
                      transition: 'transform 160ms ease',
                      transform: hover === l.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}>
                      <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              ))}

              {hover === 'Industries' && (
                <div
                  onMouseEnter={() => setHover('Industries')}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    position: 'absolute', top: 'calc(100% + 14px)', left: 0,
                    width: 560,
                    background: 'var(--bg)',
                    border: '1px solid var(--line-2)',
                    borderRadius: 16,
                    padding: 14,
                    boxShadow: '0 1px 0 oklch(1 0 0 / 0.6) inset, 0 20px 50px -20px oklch(0.2 0.02 80 / 0.35), 0 8px 20px -10px oklch(0.2 0.02 80 / 0.18)',
                    animation: 'fadeSlideDown 180ms ease',
                    zIndex: 10,
                  }}
                >
                  <div aria-hidden="true" style={{ position: 'absolute', top: -14, left: 0, right: 0, height: 14 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {INDUSTRIES.map(ind => {
                      const isLive = ind.label === 'Dentists';
                      return (
                        <a key={ind.label}
                          href={isLive ? '/dentists' : '#'}
                          onClick={e => { e.preventDefault(); navigate('/dentists'); setHover(null); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 12px', borderRadius: 10,
                            transition: 'background 140ms ease',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.96 0.005 80)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 9,
                            background: isLive ? 'var(--accent-soft)' : 'oklch(0.95 0.005 80)',
                            display: 'grid', placeItems: 'center', flexShrink: 0,
                          }}>
                            <Icon name={ind.icon} size={18} color={isLive ? 'var(--accent)' : 'var(--ink-3)'} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ font: '500 14px/1.2 Inter', color: 'var(--ink)' }}>{ind.label}</span>
                              {!isLive && <span style={{ font: '500 10px/1 Inter', color: 'var(--ink-3)', background: 'oklch(0.93 0.005 80)', padding: '2px 6px', borderRadius: 999 }}>Soon</span>}
                            </div>
                            <div style={{ font: '400 12px/1.3 Inter', color: 'var(--ink-3)', marginTop: 2 }}>{ind.sub}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <div style={{
                    marginTop: 10, paddingTop: 12, borderTop: '1px solid var(--line-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>Don't see your industry?</span>
                    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '500 13px/1 Inter', color: 'var(--accent)' }}>
                      Browse all <Icon name="arrow-right" size={13} color="var(--accent)" />
                    </a>
                  </div>
                </div>
              )}
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 11px', borderRadius: 8,
              background: 'transparent', border: '1px solid transparent',
              font: '500 13px/1 Inter', color: 'var(--ink-2)', cursor: 'pointer',
              transition: 'background 160ms, border-color 160ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.94 0.01 80 / 0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              <Icon name="pin" size={14} color="var(--ink-3)" />
              Brooklyn, NY
            </button>
            <span style={{ width: 1, height: 20, background: 'var(--line-2)' }} />
            <a href="#" style={{
              padding: '8px 12px', borderRadius: 8,
              font: '500 14px/1 Inter', color: 'var(--ink-2)',
              transition: 'background 160ms, color 160ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.94 0.01 80 / 0.7)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)'; }}>Sign in</a>
            <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={() => navigate('/join')}>Join as a partner</Btn>
          </div>
        </div>
      </Container>
    </header>
  );
};

// ── HERO ─────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  { id: 'dentist',    label: 'Dentists',               img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80&auto=format&fit=crop' },
  { id: 'restaurant', label: 'Restaurants',            img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80&auto=format&fit=crop' },
  { id: 'salon',      label: 'Salon & Spa',            img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80&auto=format&fit=crop' },
  { id: 'home',       label: 'Home Services',          img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80&auto=format&fit=crop' },
  { id: 'photo',      label: 'Photographers',          img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80&auto=format&fit=crop' },
  { id: 'service',    label: 'Professional Services',  img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&auto=format&fit=crop' },
];

const Hero = () => {
  const [query, setQuery] = useState('');
  const [zip, setZip] = useState('Brooklyn, NY · 11211');
  const [focused, setFocused] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.toLowerCase().includes('dentist') || query === '') {
      navigate('/dentists');
    }
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {HERO_SLIDES.map((s, i) => (
          <img key={s.id} src={s.img} alt="" style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 1200ms ease, transform 6000ms ease-out',
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, oklch(0.12 0.02 40 / 0.88) 0%, oklch(0.18 0.02 40 / 0.60) 50%, oklch(0.18 0.02 40 / 0.28) 100%)',
        }} />
      </div>

      <Container>
        <div style={{ paddingTop: 120, paddingBottom: 140, position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ maxWidth: 720, width: '100%' }}>
            <h1 style={{
              margin: 0, fontWeight: 800,
              fontSize: 'clamp(42px, 6vw, 76px)', lineHeight: 1.04, letterSpacing: '-0.03em',
              color: 'oklch(0.99 0 0)',
              textShadow: '0 2px 32px oklch(0 0 0 / 0.4)',
            }}>
              The pro you've been<br />looking for — found.
            </h1>

            <p style={{ marginTop: 22, maxWidth: 500, color: 'oklch(1 0 0 / 0.82)', fontSize: 17, lineHeight: 1.6, fontWeight: 400 }}>
              Every professional is ID-checked, license-verified, and reviewed by real customers. No guessing.
            </p>

            <form onSubmit={handleSearch} style={{ marginTop: 36, maxWidth: 640 }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 180px auto', gap: 0,
                background: 'oklch(1 0 0 / 0.98)', borderRadius: 999,
                boxShadow: focused ? '0 16px 48px -8px oklch(0 0 0 / 0.5)' : '0 8px 32px -8px oklch(0 0 0 / 0.35)',
                transition: 'box-shadow .15s',
                padding: 6,
                alignItems: 'center',
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px' }}>
                  <Icon name="search" size={18} color="var(--ink-3)" />
                  <input
                    value={query} onChange={e => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    placeholder="Dentist, chef, photographer…"
                    style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent',
                      font: '500 15px/1.4 Inter', color: 'var(--ink)', padding: '14px 0' }}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
                  borderLeft: '1px solid var(--line-2)' }}>
                  <Icon name="pin" size={16} color="var(--accent)" />
                  <input
                    value={zip} onChange={e => setZip(e.target.value)}
                    placeholder="Zip Code"
                    style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent',
                      font: '500 14px/1.4 Inter', color: 'var(--ink)', padding: '14px 0' }}
                  />
                </label>
                <button type="submit" style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--accent)', color: 'white', border: 'none',
                  display: 'grid', placeItems: 'center', cursor: 'pointer',
                  boxShadow: '0 4px 16px -2px rgba(255, 90, 32, 0.55)',
                }}>
                  <Icon name="search" size={18} color="white" />
                </button>
              </div>
            </form>

            {/* Quick category pills */}
            <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Dentist', 'Restaurant', 'Photographer', 'Home Services', 'Salon & Spa', 'Private Chef'].map(cat => (
                <button key={cat} onClick={() => cat === 'Dentist' ? navigate('/dentists') : null}
                  style={{
                    padding: '7px 14px', borderRadius: 999,
                    background: 'oklch(1 0 0 / 0.12)', border: '1px solid oklch(1 0 0 / 0.25)',
                    color: 'oklch(1 0 0 / 0.92)', font: '500 13px/1 Inter',
                    cursor: 'pointer', backdropFilter: 'blur(8px)',
                    transition: 'background .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'oklch(1 0 0 / 0.22)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'oklch(1 0 0 / 0.12)'}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {[
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&auto=format&fit=crop&crop=faces',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop&crop=faces',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" style={{
                      width: 32, height: 32, borderRadius: '50%', objectFit: 'cover',
                      marginLeft: i === 0 ? 0 : -10,
                      boxShadow: '0 0 0 2px oklch(0.18 0.02 40 / 0.6)',
                    }} />
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={12} color="oklch(0.78 0.14 75)" />)}
                    <span style={{ font: '600 13px/1 Inter', color: 'oklch(1 0 0 / 0.95)', marginLeft: 4 }}>4.9</span>
                  </div>
                  <span style={{ font: '500 11px/1.4 Inter', color: 'oklch(1 0 0 / 0.7)' }}>184k reviews · 1.8M users</span>
                </div>
              </div>
              <div style={{ width: 1, height: 32, background: 'oklch(1 0 0 / 0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="check-badge" size={18} color="#4ade80" />
                <span style={{ font: '500 13px/1.4 Inter', color: 'oklch(1 0 0 / 0.9)' }}>ID-verified professionals only</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div style={{
        position: 'absolute', right: 32, bottom: 32, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '10px 16px', borderRadius: 999,
        background: 'oklch(1 0 0 / 0.12)', backdropFilter: 'blur(10px)',
        border: '1px solid oklch(1 0 0 / 0.2)',
      }}>
        <span style={{ font: '500 13px/1 Inter', color: 'oklch(1 0 0 / 0.95)' }}>
          {HERO_SLIDES[slide].label}
        </span>
        <div style={{ width: 1, height: 14, background: 'oklch(1 0 0 / 0.25)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {HERO_SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => setSlide(i)} aria-label={`Show ${s.label}`} style={{
              width: i === slide ? 22 : 6, height: 6, borderRadius: 999,
              border: 'none', padding: 0, cursor: 'pointer',
              background: i === slide ? 'oklch(1 0 0 / 0.95)' : 'oklch(1 0 0 / 0.4)',
              transition: 'width .3s, background .2s',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── GET HELP TODAY ────────────────────────────────────────────────────────────
const SERVICE_ROWS = [
  ['Dental Cleaning', 'Teeth Whitening', 'Invisalign', 'Dental Implants', 'Pediatric Dentist', 'Root Canal', 'Oral Surgery'],
  ['Cosmetic Dentist', 'Braces', 'Family Dentist', 'Emergency Dental', 'Gum Treatment', 'Veneers', 'Teeth Bonding'],
  ['Private Chef', 'Home Cleaning', 'Photography', 'Hair Stylist', 'Personal Trainer', 'Plumbing'],
];

const GetHelpToday = () => {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '72px 0 64px', borderTop: '1px solid var(--line-2)', background: '#fff' }}>
      <Container>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ margin: '0 0 6px', font: '700 34px/1.15 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Get help today
          </h2>
          <p style={{ margin: 0, font: '400 15px/1.5 Inter', color: 'var(--ink-3)' }}>
            Pick a service and we'll match you with the right professional near you — usually within minutes.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SERVICE_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {row.map(svc => (
                <button
                  key={svc}
                  onClick={() => navigate('/dentists')}
                  style={{
                    padding: '10px 20px', borderRadius: 999,
                    border: '1.5px solid var(--line)',
                    background: 'var(--bg)',
                    font: '500 14px/1 Inter', color: 'var(--ink-2)',
                    cursor: 'pointer', transition: 'all .15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.background = 'var(--accent-soft)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--ink-2)';
                    e.currentTarget.style.background = 'var(--bg)';
                  }}
                >
                  {svc}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            font: '600 14px/1 Inter', color: 'var(--accent)',
            transition: 'gap .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '10px'}
          onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
            See all services <Icon name="arrow-right" size={14} color="var(--accent)" />
          </a>
        </div>
      </Container>
    </section>
  );
};

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: '01',
    title: 'Tell us what you need',
    body: 'Type it in plain English — "pediatric dentist who takes Aetna" or "photographer for a birthday party". No forms, no checkboxes.',
    icon: 'search',
  },
  {
    n: '02',
    title: 'Compare real profiles',
    body: 'See verified reviews, prices, availability, and credentials side by side. Every pro is ID-checked before they list.',
    icon: 'sparkle',
  },
  {
    n: '03',
    title: 'Book or message instantly',
    body: 'Send a message or request a booking directly. Most pros respond in under an hour.',
    icon: 'message',
  },
];

const HowItWorks = () => (
  <section style={{ padding: '96px 0', borderTop: '1px solid var(--line-2)', background: '#fff' }}>
    <Container>
      <SectionHeader title="How it works" sub="From search to booked — in minutes, not days." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--bg)' }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            padding: 36,
            borderRight: i < STEPS.length - 1 ? '1px solid var(--line-2)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 18,
            position: 'relative', minHeight: 260,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ font: '700 13px/1 "JetBrains Mono", monospace', color: 'var(--accent)', letterSpacing: '0.04em' }}>STEP {s.n}</span>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)',
                border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}>
                <Icon name={s.icon} size={20} color="var(--accent)" />
              </div>
            </div>
            <h3 style={{ margin: 0, font: '700 24px/1.2 Inter', letterSpacing: '-0.015em', color: 'var(--ink)' }}>{s.title}</h3>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.65 }}>{s.body}</p>
            {i < STEPS.length - 1 && (
              <div style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                width: 24, height: 24, borderRadius: '50%', background: 'var(--bg)',
                border: '1px solid var(--line)', display: 'grid', placeItems: 'center', zIndex: 2 }}>
                <Icon name="arrow-right" size={11} color="var(--ink-3)" />
              </div>
            )}
          </div>
        ))}
      </div>

    </Container>
  </section>
);

// ── BROWSE BY CATEGORY ────────────────────────────────────────────────────────
const BROWSE = [
  { id: 'restaurant', name: 'Restaurants',           count: '12,840', icon: 'fork',      sub: 'Fine dining → cafes',        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop' },
  { id: 'dentist',    name: 'Dentists',               count: '14,200', icon: 'tooth',     sub: 'Cleaning, ortho, cosmetic',  img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80&auto=format&fit=crop' },
  { id: 'service',    name: 'Professional Services',  count: '20,100', icon: 'briefcase', sub: 'Legal, finance, consulting', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop' },
  { id: 'salon',      name: 'Salon & Spa',            count: '6,420',  icon: 'scissors',  sub: 'Hair, nails, massage',       img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop' },
  { id: 'home',       name: 'Home Services',          count: '9,180',  icon: 'home',      sub: 'Plumbing, electric, HVAC',   img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop' },
  { id: 'photo',      name: 'Photographers',          count: '3,640',  icon: 'camera',    sub: 'Weddings, portraits, events',img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80&auto=format&fit=crop' },
];

const BrowseByCategory = () => {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '96px 0', borderTop: '1px solid var(--line-2)', background: '#fff' }}>
      <Container>
        <SectionHeader title="Browse by category" sub="Whatever you need, we have the right pro for it." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {BROWSE.map(c => (
            <a key={c.id} href="/dentists"
              onClick={e => { e.preventDefault(); navigate('/dentists'); }}
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'var(--bg)', color: 'var(--ink)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)', padding: 0,
                overflow: 'hidden', cursor: 'pointer',
                transition: 'transform .2s ease, box-shadow .2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(40,30,20,.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden', background: 'oklch(0.95 0.012 80)' }}>
                <PhotoPlaceholder ratio="16/10" label={c.name.toLowerCase()} src={c.img} style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }} />
                <div style={{ position: 'absolute', top: 14, right: 14,
                  font: '600 11px/1 "JetBrains Mono", monospace',
                  background: 'rgba(255,255,255,0.90)', color: 'var(--ink)',
                  padding: '6px 10px', borderRadius: 999, letterSpacing: '0.04em',
                }}>{c.count} pros</div>
              </div>
              <div style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ font: '700 20px/1.1 Inter', letterSpacing: '-0.015em' }}>{c.name}</div>
                  <div style={{ font: '400 13px/1.4 Inter', color: 'var(--ink-3)', marginTop: 4 }}>{c.sub}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1.5px solid var(--accent)', color: 'var(--accent)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <Icon name="arrow-up-right" size={16} color="var(--accent)" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ── TOP PROFESSIONALS ─────────────────────────────────────────────────────────
const TOP_PROS = [
  { id: 1, name: 'Dr. Maya Patel',    role: 'Pediatric Dentist',   loc: 'Brooklyn, NY',  tags: ['Pediatric', 'Cleaning'],    rating: 4.9, reviews: 412, fee: 85,  img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop&crop=faces' },
  { id: 2, name: 'Dr. Ali Awan',      role: 'Family Dentist',      loc: 'Brooklyn, NY',  tags: ['Family', 'Cleaning'],       rating: 5.0, reviews: 487, fee: 60,  img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop&crop=faces' },
  { id: 3, name: 'Dr. Lena Vogel',    role: 'Orthodontist',        loc: 'Brooklyn, NY',  tags: ['Aligners', 'Braces'],       rating: 4.8, reviews: 91,  fee: 120, img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80&auto=format&fit=crop&crop=faces' },
  { id: 4, name: 'Dr. James Okafor',  role: 'Cosmetic Dentist',    loc: 'Williamsburg',  tags: ['Whitening', 'Veneers'],     rating: 4.7, reviews: 256, fee: 200, img: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600&q=80&auto=format&fit=crop&crop=faces' },
  { id: 5, name: 'Dr. Priya Shah',    role: 'General Dentist',     loc: 'Greenpoint',    tags: ['Cleaning', 'Cosmetic'],     rating: 4.9, reviews: 184, fee: 75,  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop&crop=faces' },
  { id: 6, name: 'Dr. Marcus Reyes',  role: 'Endodontist',         loc: 'Brooklyn, NY',  tags: ['Root Canal', 'Sedation'],   rating: 4.6, reviews: 142, fee: 150, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&auto=format&fit=crop&crop=faces' },
];

function ProCard({ pro, featured = false }) {
  const navigate = useNavigate();
  const dest = '/dentists/' + pro.id;
  return (
    <article
      onClick={() => navigate(dest)}
      style={{
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'transform .2s, box-shadow .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(40,30,20,.22)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ position: 'relative' }}>
        <PhotoPlaceholder ratio="5/4" label={pro.role.toLowerCase()} src={pro.img} style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {featured && <Tag tone="accent" size="sm">Featured</Tag>}
          <Tag tone="green" size="sm"><Icon name="check-badge" size={12} /> Verified</Tag>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.94)', borderRadius: 999, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4, font: '600 12px/1 Inter' }}>
          <Icon name="star" size={12} color="oklch(0.72 0.14 75)" />
          {pro.rating}
          <span style={{ color: 'var(--ink-3)', fontWeight: 500 }}>({pro.reviews})</span>
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <h3 style={{ margin: '0 0 4px', font: '700 18px/1.2 Inter', letterSpacing: '-0.015em' }}>{pro.name}</h3>
          <div style={{ font: '400 13px/1.4 Inter', color: 'var(--ink-2)', marginBottom: 6 }}>{pro.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>
            <Icon name="pin" size={12} />
            <span>{pro.loc}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {pro.tags.map(t => <Tag key={t} tone="neutral" size="sm">{t}</Tag>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--line)', paddingTop: 12, marginTop: 2 }}>
          <div>
            <div style={{ font: '700 15px/1 Inter', color: 'var(--ink)', letterSpacing: '-0.01em' }}>from ${pro.fee}</div>
            <div style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)', marginTop: 3 }}>per consult</div>
          </div>
          <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={e => { e.stopPropagation(); navigate(dest); }}>View profile</Btn>
        </div>
      </div>
    </article>
  );
}

const TopProfessionals = () => (
  <section style={{ padding: '96px 0', background: '#fff', borderTop: '1px solid var(--line-2)' }}>
    <Container>
      <SectionHeader
        title="Top professionals near you"
        sub="Hand-picked, consistently 5-star, and available this week."
        action={<Btn variant="outline" iconRight="arrow-right" onClick={() => {}}>View all</Btn>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {TOP_PROS.map((p, i) => <ProCard key={p.id} pro={p} featured={i === 0} />)}
      </div>
    </Container>
  </section>
);

// ── REVIEWS ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1, name: 'Priya N.', loc: 'Brooklyn, NY', rating: 5,
    body: '"My son had a meltdown at every dentist we tried. Dr. Maya was patient, played music, and made it feel like a game. First clean without tears."',
    for: 'Dr. Maya Patel',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 2, name: 'Marcus T.', loc: 'Williamsburg, NY', rating: 5,
    body: '"I\'d been putting off dental work for two years. Found Dr. Awan on a Tuesday, had my cleaning on Thursday. The filter for insurance made everything so straightforward."',
    for: 'Dr. Ali Awan',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 3, name: 'Sara K.', loc: 'Greenpoint, NY', rating: 5,
    body: '"Needed emergency dental on a Saturday. Found someone, messaged them, and was sitting in the chair by 11am. That alone made me tell everyone I know about this."',
    for: 'Dr. James Okafor',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
  },
];

const Reviews = () => (
  <section style={{ padding: '96px 0', borderTop: '1px solid var(--line-2)', background: '#fff' }}>
    <Container>
      <SectionHeader title="What people are actually saying" sub="Real words from real customers — not marketing copy." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {REVIEWS.map(r => (
          <article key={r.id} style={{
            padding: 28, borderRadius: 'var(--radius)',
            border: '1px solid var(--line)', background: 'var(--bg)',
            display: 'flex', flexDirection: 'column', gap: 18, minHeight: 280,
            transition: 'box-shadow .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px -16px rgba(40,30,20,.14)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={15} color={i <= r.rating ? '#FF5A20' : 'oklch(0.88 0.01 80)'} />)}
            </div>
            <p style={{ margin: 0, font: '400 17px/1.55 Inter', letterSpacing: '-0.01em', color: 'var(--ink)', flex: 1 }}>
              {r.body}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--line-2)' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, boxShadow: 'inset 0 0 0 1px var(--line)' }}>
                <img src={r.img} alt={r.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '600 14px/1.2 Inter' }}>{r.name}</div>
                <div style={{ font: '400 12px/1.4 Inter', color: 'var(--ink-3)' }}>{r.loc} · booked {r.for}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

// ── BLOG ─────────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    tag: 'Patient Guide',
    title: 'How to pick a dentist you\'ll actually stick with',
    excerpt: 'Most people dread the dentist because of one bad experience with the wrong one. Here\'s what to look for — and what to ask before you sit in the chair.',
    author: 'Sara Kimani',
    date: 'Apr 28, 2026',
    readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Platform',
    title: 'What "verified" actually means on whyclick.tv',
    excerpt: 'We check licenses, confirm malpractice insurance, and call references. Here\'s exactly what goes into the badge you see on every profile.',
    author: 'James Okafor',
    date: 'Apr 14, 2026',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'For Professionals',
    title: '7 things top-rated pros do differently on their profiles',
    excerpt: 'We analyzed thousands of profiles. The ones that book 3× more share a few common habits — and none of them require a marketing budget.',
    author: 'Priya Shah',
    date: 'Mar 30, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format&fit=crop',
  },
];

const Blog = () => (
  <section style={{ padding: '96px 0', background: '#fff', borderTop: '1px solid var(--line-2)' }}>
    <Container>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
        <div>
          <div style={{ font: '700 12px/1 "JetBrains Mono", monospace', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 12 }}>FROM THE BLOG</div>
          <h2 style={{ margin: 0, font: '700 36px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Advice you can actually use
          </h2>
        </div>
        <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '600 14px/1 Inter', color: 'var(--accent)' }}>
          View all posts <Icon name="arrow-right" size={14} color="var(--accent)" />
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {BLOG_POSTS.map(post => (
          <article key={post.id} style={{
            background: 'var(--bg)', border: '1px solid var(--line)',
            borderRadius: 'var(--radius)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            cursor: 'pointer', transition: 'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(40,30,20,.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-alt)' }}>
              <img src={post.img} alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{
                display: 'inline-block', alignSelf: 'flex-start',
                padding: '4px 10px', borderRadius: 999,
                background: 'var(--accent-soft)', color: 'var(--accent)',
                font: '600 11px/1 Inter', letterSpacing: '0.02em',
              }}>{post.tag}</div>
              <h3 style={{ margin: 0, font: '700 18px/1.3 Inter', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                {post.title}
              </h3>
              <p style={{ margin: 0, font: '400 13px/1.6 Inter', color: 'var(--ink-2)', flex: 1 }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line-2)' }}>
                <div style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>
                  {post.author} · {post.date}
                </div>
                <span style={{ font: '500 11px/1 "JetBrains Mono", monospace', color: 'var(--ink-3)', background: 'var(--bg-alt)', padding: '4px 8px', borderRadius: 999 }}>
                  {post.readTime} read
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

// ── STATS ─────────────────────────────────────────────────────────────────────
const STATS = [
  { v: '1.8M',    label: 'Active customers',    sub: 'across the US' },
  { v: '14,200+', label: 'Verified pros',        sub: 'license-checked' },
  { v: '847',     label: 'Bookings today',       sub: 'and counting' },
  { v: '4.9',     label: 'Avg. platform rating', sub: 'out of 5 stars' },
];

const Stats = () => (
  <section style={{
    position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(135deg, #1a0f0a 0%, #0f0b08 50%, #1c1008 100%)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    {/* Subtle dot grid overlay */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
    }} />
    {/* Orange radial glow */}
    <div aria-hidden="true" style={{
      position: 'absolute', bottom: -100, left: '50%',
      transform: 'translateX(-50%)',
      width: 800, height: 400,
      background: 'radial-gradient(ellipse, rgba(255,90,32,0.18) 0%, transparent 65%)',
      pointerEvents: 'none',
    }} />

    <Container style={{ position: 'relative', zIndex: 1 }}>
      {/* Headline */}
      <div style={{ padding: '72px 0 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
          padding: '5px 14px', borderRadius: 999,
          background: 'rgba(255,90,32,0.12)', border: '1px solid rgba(255,90,32,0.25)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5A20' }} />
          <span style={{ font: '700 10px/1 "JetBrains Mono", monospace', color: '#FF5A20', letterSpacing: '0.12em' }}>LIVE PLATFORM DATA</span>
        </div>
        <h2 style={{ margin: '0 0 14px', font: '800 54px/1.05 Inter', letterSpacing: '-0.03em', color: '#fff' }}>
          Growing every{' '}
          <span style={{ color: '#FF5A20', fontStyle: 'italic' }}>single day.</span>
        </h2>
        <p style={{ margin: 0, font: '400 16px/1.5 Inter', color: 'rgba(255,255,255,0.45)' }}>
          Real numbers from our platform — updated every 24 hours.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12, marginBottom: 72,
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: '40px 32px',
            background: i === 0
              ? 'linear-gradient(135deg, #FF5A20 0%, #e04010 100%)'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 18,
            display: 'flex', flexDirection: 'column', gap: 10,
            backdropFilter: i !== 0 ? 'blur(10px)' : 'none',
            boxShadow: i === 0 ? '0 24px 48px -12px rgba(255,90,32,0.4)' : 'none',
            transition: 'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              font: '900 60px/1 Inter', letterSpacing: '-0.04em',
              color: i === 0 ? '#fff' : '#FF5A20',
            }}>
              {s.v}
              {s.label === 'Avg. platform rating' && (
                <span style={{ font: '700 28px/1 Inter', color: i === 0 ? 'rgba(255,255,255,0.8)' : '#FF5A20', marginLeft: 2 }}>★</span>
              )}
            </div>
            <div style={{ font: '600 14px/1.3 Inter', color: i === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)' }}>
              {s.label}
            </div>
            <div style={{ font: '400 12px/1 Inter', color: i === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.30)' }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);


// ── LOCATIONS ─────────────────────────────────────────────────────────────────
const LOCATIONS = [
  { name: 'New York',      count: '48,200 pros', cities: 'NYC · Buffalo · Albany' },
  { name: 'Texas',         count: '54,700 pros', cities: 'Austin · Dallas · Houston' },
  { name: 'California',    count: '62,400 pros', cities: 'Los Angeles · San Francisco' },
  { name: 'Massachusetts', count: '19,600 pros', cities: 'Boston · Cambridge · Worcester' },
  { name: 'Pennsylvania',  count: '26,800 pros', cities: 'Philadelphia · Pittsburgh' },
  { name: 'Arizona',       count: '17,900 pros', cities: 'Phoenix · Tucson · Scottsdale' },
];

const Locations = () => {
  const navigate = useNavigate();
  return (
  <section style={{ padding: '96px 0', background: '#fff', borderTop: '1px solid var(--line-2)' }}>
    <Container>
      <SectionHeader title="Find pros across the U.S." sub="Search in your city and see who's available this week." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {LOCATIONS.map(l => (
          <a key={l.name} href="/dentists" onClick={e => { e.preventDefault(); navigate('/dentists'); }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            padding: '22px 24px', borderRadius: 'var(--radius)',
            border: '1px solid var(--line)', background: 'var(--bg)',
            transition: 'transform .15s, box-shadow .15s',
            textDecoration: 'none', color: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px -12px rgba(40,30,20,.14)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div>
              <div style={{ font: '700 20px/1.1 Inter', letterSpacing: '-0.015em' }}>{l.name}</div>
              <div style={{ font: '400 12px/1.4 Inter', color: 'var(--ink-3)', marginTop: 4 }}>{l.cities}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ font: '600 13px/1 "JetBrains Mono", monospace', color: 'var(--ink-2)' }}>{l.count}</div>
              <div style={{ marginTop: 8, display: 'inline-flex' }}>
                <Icon name="arrow-up-right" size={14} color="var(--accent)" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </Container>
  </section>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };
  return (
    <div style={{
      background: 'var(--accent-soft)', border: '1px solid rgba(255,90,32,0.18)',
      borderRadius: 16, padding: '36px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 40, marginBottom: 56, flexWrap: 'wrap',
    }}>
      <div style={{ maxWidth: 400 }}>
        <h3 style={{ margin: '0 0 8px', font: '700 22px/1.2 Inter', letterSpacing: '-0.015em', color: 'var(--ink)' }}>
          Get the weekly pro roundup
        </h3>
        <p style={{ margin: 0, font: '400 14px/1.55 Inter', color: 'var(--ink-2)' }}>
          Top-rated professionals, booking tips, and new city launches. No spam. Unsubscribe anytime.
        </p>
      </div>
      {sent ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent)', font: '600 15px/1 Inter' }}>
          <Icon name="check-badge" size={20} color="var(--accent)" />
          You're in! Check your inbox.
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              padding: '12px 18px', borderRadius: '10px 0 0 10px',
              border: '1.5px solid var(--line)', borderRight: 'none',
              font: '500 14px/1 Inter', color: 'var(--ink)', background: 'var(--bg)',
              outline: 'none', width: 220,
            }}
          />
          <button type="submit" style={{
            padding: '12px 20px', borderRadius: '0 10px 10px 0',
            background: 'var(--accent)', color: 'white', border: '1.5px solid var(--accent)',
            font: '600 14px/1 Inter', cursor: 'pointer',
            transition: 'opacity .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

const Footer = () => (
  <footer style={{ padding: '64px 0 32px', borderTop: '1px solid var(--line-2)', background: 'var(--bg)' }}>
    <Container>
      <Newsletter />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block' }} />
          </div>
          <p style={{ margin: '0 0 24px', color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
            Every professional on whyclick.tv is license-verified, background-checked, and reviewed by real customers. No guessing, no spam.
          </p>
          {/* Social links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              {
                label: 'X (Twitter)',
                href: '#',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                  </svg>
                ),
              },
              {
                label: 'Instagram',
                href: '#',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: '#',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
              },
              {
                label: 'TikTok',
                href: '#',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.77 1.52V7.01a4.86 4.86 0 01-1-.32z"/>
                  </svg>
                ),
              },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} style={{
                width: 36, height: 36, borderRadius: 9,
                border: '1px solid var(--line)',
                display: 'grid', placeItems: 'center',
                color: 'var(--ink-3)', background: 'var(--bg)',
                transition: 'color .15s, border-color .15s, background .15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'var(--accent-soft)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--ink-3)';
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.background = 'var(--bg)';
              }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
        {[
          { h: 'Browse',  items: ['Dentists', 'Restaurants', 'Services', 'Salons', 'Photographers'] },
          { h: 'Company', items: ['About', 'How it works', 'Blog', 'Careers', 'Press'] },
          { h: 'Support', items: ['Help center', 'Contact us', 'Trust & safety', 'Privacy', 'Terms'] },
        ].map(col => (
          <div key={col.h}>
            <div style={{ font: '600 13px/1 Inter', marginBottom: 16, color: 'var(--ink)' }}>{col.h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {col.items.map(it => (
                <li key={it}>
                  <a href="#" style={{
                    font: '400 13px/1 Inter', color: 'var(--ink-2)',
                    transition: 'color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}
                  >{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24,
        borderTop: '1px solid var(--line-2)', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>
          © 2026 whyclick.tv · All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>All systems operational</span>
        </div>
      </div>
    </Container>
  </footer>
);

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrowseByCategory />
        <TopProfessionals />
        <Locations />
        <Stats />
        <HowItWorks />
        <Reviews />
        <Blog />
        <GetHelpToday />
      </main>
      <Footer />
      <AskAIFab />
    </>
  );
}

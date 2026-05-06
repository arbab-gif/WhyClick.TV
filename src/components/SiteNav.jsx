import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon, Btn } from './primitives';
import logo from '../assets/whyclick-logo.png';

const INDUSTRIES = [
  { icon: 'tooth',    label: 'Dentists',           sub: '14,200 pros',    slug: 'dentists' },
  { icon: 'fork',     label: 'Restaurants',        sub: '12,840 listings',slug: 'restaurants' },
  { icon: 'scissors', label: 'Salons & Spas',      sub: '6,420 pros',     slug: 'salon-spa' },
  { icon: 'camera',   label: 'Photographers',      sub: '3,640 pros',     slug: 'photographers' },
  { icon: 'home',     label: 'Home Services',      sub: '9,180 pros',     slug: null },
  { icon: 'wrench',   label: 'Service Pros',       sub: '20,100 pros',    slug: null },
  { icon: 'pin',      label: 'Real Estate',        sub: '5,210 agents',   slug: null },
  { icon: 'sparkle',  label: 'Wellness & Fitness', sub: '4,860 pros',     slug: null },
];

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Industries', path: null, hasMenu: true },
  { label: 'Blog',       path: '/blog' },
  { label: 'About',      path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

export default function SiteNav({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const solidBg = !transparent || scrolled;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: solidBg ? 'oklch(0.985 0.005 80 / 0.96)' : 'oklch(0.985 0.005 80 / 0.65)',
      backdropFilter: 'saturate(180%) blur(16px)',
      WebkitBackdropFilter: 'saturate(180%) blur(16px)',
      borderBottom: solidBg ? '1px solid var(--line-2)' : '1px solid transparent',
      boxShadow: solidBg ? '0 1px 0 oklch(0.92 0.01 80 / 0.6), 0 8px 24px -16px oklch(0.2 0.02 80 / 0.18)' : 'none',
      transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 24 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block' }} />
            </a>

            {/* Nav links */}
            <nav style={{ display: 'flex', gap: 2, position: 'relative' }}>
              {NAV_LINKS.map(l => {
                const active = l.path && isActive(l.path);
                return (
                  <button
                    key={l.label}
                    onMouseEnter={() => setHover(l.label)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      if (l.path) navigate(l.path);
                    }}
                    style={{
                      position: 'relative',
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '8px 12px', borderRadius: 8,
                      font: '500 14px/1 Inter',
                      color: active ? 'var(--ink)' : hover === l.label ? 'var(--ink)' : 'var(--ink-2)',
                      background: active ? 'oklch(0.94 0.01 80 / 0.8)' : hover === l.label ? 'oklch(0.94 0.01 80 / 0.7)' : 'transparent',
                      border: 'none', cursor: 'pointer',
                      transition: 'background 160ms ease, color 160ms ease',
                    }}
                  >
                    {l.label}
                    {l.hasMenu && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{
                        transition: 'transform 160ms ease',
                        transform: hover === 'Industries' ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>
                        <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}

              {/* Industries dropdown */}
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
                    zIndex: 10,
                  }}
                >
                  {/* invisible bridge so mouse can move from button to dropdown */}
                  <div aria-hidden="true" style={{ position: 'absolute', top: -14, left: 0, right: 0, height: 14 }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind.label}
                        onClick={() => { if (ind.slug) { setHover(null); navigate(`/${ind.slug}`); } }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 12px', borderRadius: 10,
                          background: 'transparent', border: 'none',
                          cursor: ind.slug ? 'pointer' : 'default',
                          transition: 'background 140ms ease', textAlign: 'left', width: '100%',
                          opacity: ind.slug ? 1 : 0.5,
                        }}
                        onMouseEnter={e => { if (ind.slug) e.currentTarget.style.background = 'oklch(0.96 0.005 80)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: 9,
                          background: 'var(--accent-soft)',
                          display: 'grid', placeItems: 'center', flexShrink: 0,
                        }}>
                          <Icon name={ind.icon} size={18} color="var(--accent)" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ font: '500 14px/1.2 Inter', color: 'var(--ink)' }}>{ind.label}</div>
                          <div style={{ font: '400 12px/1.3 Inter', color: 'var(--ink-3)', marginTop: 2 }}>
                            {ind.sub}{!ind.slug && ' · coming soon'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div style={{
                    marginTop: 10, paddingTop: 12, borderTop: '1px solid var(--line-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>Don't see your industry?</span>
                    <button onClick={() => { setHover(null); navigate('/contact'); }} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      font: '500 13px/1 Inter', color: 'var(--accent)',
                      background: 'none', border: 'none', cursor: 'pointer',
                    }}>
                      Get in touch <Icon name="arrow-right" size={13} color="var(--accent)" />
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </div>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="#" style={{
              padding: '8px 12px', borderRadius: 8,
              font: '500 14px/1 Inter', color: 'var(--ink-2)',
              textDecoration: 'none',
              transition: 'background 160ms, color 160ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.94 0.01 80 / 0.7)'; e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)'; }}>
              Sign in
            </a>
            <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={() => navigate('/join')}>
              Join as a partner
            </Btn>
          </div>

        </div>
      </div>
    </header>
  );
}

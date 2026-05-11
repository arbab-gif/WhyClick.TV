import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon, Btn } from './primitives';
import logo from '../assets/whyclick-logo.png';

const useW = () => {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
};

const INDUSTRIES = [
  { icon: 'tooth',    label: 'Dentists',             sub: '14,200 pros',     slug: 'dentists' },
  { icon: 'fork',     label: 'Restaurants',          sub: '12,840 listings', slug: 'restaurants' },
  { icon: 'scissors', label: 'Salons & Spas',        sub: '6,420 pros',      slug: 'salon-spa' },
  { icon: 'camera',   label: 'Photographers',        sub: '3,640 pros',      slug: 'photographers' },
  { icon: 'home',     label: 'Home Services',        sub: '9,180 pros',      slug: 'home-services' },
  { icon: 'wrench',   label: 'Professional Services',sub: '20,100 pros',     slug: 'professional-service' },
];

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Industries', path: null, hasMenu: true },
  { label: 'About',      path: '/about' },
  { label: 'Blog',       path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
];

export default function SiteNav({ transparent = false }) {
  const [scrolled, setScrolled]   = useState(false);
  const [hover, setHover]         = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [indOpen, setIndOpen]     = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const w         = useW();
  const isMobile  = w < 768;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setIndOpen(false); }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const solidBg = !transparent || scrolled || menuOpen;

  const go = (path) => { setMenuOpen(false); navigate(path); };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: solidBg ? 'oklch(0.985 0.005 80 / 0.98)' : 'oklch(0.985 0.005 80 / 0.65)',
      backdropFilter: 'saturate(180%) blur(16px)',
      WebkitBackdropFilter: 'saturate(180%) blur(16px)',
      borderBottom: solidBg ? '1px solid var(--line-2)' : '1px solid transparent',
      boxShadow: solidBg ? '0 1px 0 oklch(0.92 0.01 80 / 0.6), 0 8px 24px -16px oklch(0.2 0.02 80 / 0.18)' : 'none',
      transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '0 16px' : '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isMobile ? 60 : 68, gap: 16 }}>

          {/* Logo */}
          <a href="/" onClick={e => { e.preventDefault(); go('/'); }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src={logo} alt="whyclick.tv" style={{ height: isMobile ? 36 : 44, width: 'auto', display: 'block' }} />
          </a>

          {/* ── DESKTOP nav ── */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 40, flex: 1 }}>
              <nav style={{ display: 'flex', gap: 2, position: 'relative' }}>
                {NAV_LINKS.map(l => {
                  const active = l.path && isActive(l.path);
                  return (
                    <button
                      key={l.label}
                      onMouseEnter={() => setHover(l.label)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => { if (l.path) navigate(l.path); }}
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
                      width: 520,
                      background: 'var(--bg)',
                      border: '1px solid var(--line-2)',
                      borderRadius: 16,
                      padding: 14,
                      boxShadow: '0 1px 0 oklch(1 0 0 / 0.6) inset, 0 20px 50px -20px oklch(0.2 0.02 80 / 0.35), 0 8px 20px -10px oklch(0.2 0.02 80 / 0.18)',
                      zIndex: 10,
                      animation: 'fadeSlideDown 180ms ease',
                    }}
                  >
                    <div aria-hidden="true" style={{ position: 'absolute', top: -14, left: 0, right: 0, height: 14 }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                      {INDUSTRIES.map(ind => (
                        <button
                          key={ind.label}
                          onClick={() => { setHover(null); navigate(`/${ind.slug}`); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 12px', borderRadius: 10,
                            background: 'transparent', border: 'none',
                            cursor: 'pointer',
                            transition: 'background 140ms ease', textAlign: 'left', width: '100%',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.96 0.005 80)'; }}
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
                            <div style={{ font: '400 12px/1.3 Inter', color: 'var(--ink-3)', marginTop: 2 }}>{ind.sub}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </nav>
            </div>
          )}

          {/* ── DESKTOP right CTAs ── */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => navigate('/pro/signin')} style={{
                padding: '8px 12px', borderRadius: 8,
                font: '500 14px/1 Inter', color: 'var(--ink-2)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                transition: 'background 160ms, color 160ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.94 0.01 80 / 0.7)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)'; }}>
                Sign in
              </button>
              <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={() => navigate('/join')}>
                Join as a Partner
              </Btn>
            </div>
          )}

          {/* ── MOBILE right: Sign in + Hamburger ── */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => navigate('/pro/signin')}
                style={{
                  font: '500 14px/1 Inter', color: 'var(--ink-2)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '6px 4px',
                }}
              >
                Sign in
              </button>
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: menuOpen ? 'oklch(0.94 0.01 80)' : 'transparent',
                  border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center',
                  cursor: 'pointer', transition: 'background .15s',
                }}
              >
                {menuOpen ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 12h18M3 6h18M3 18h18"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE drawer ── */}
      {isMobile && menuOpen && (
        <div style={{
          borderTop: '1px solid var(--line-2)',
          background: 'var(--bg)',
          padding: '12px 16px 24px',
          display: 'flex', flexDirection: 'column', gap: 2,
          animation: 'fadeSlideDown 180ms ease',
        }}>
          {NAV_LINKS.map(l => (
            l.hasMenu ? (
              <div key={l.label}>
                <button
                  onClick={() => setIndOpen(o => !o)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: 10,
                    font: '500 15px/1 Inter', color: 'var(--ink-2)',
                    background: indOpen ? 'var(--bg-alt)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  {l.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'transform .2s', transform: indOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {indOpen && (
                  <div style={{ paddingLeft: 14, paddingBottom: 4, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind.label}
                        onClick={() => { go(`/${ind.slug}`); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 12px', borderRadius: 8,
                          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                          width: '100%',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0,
                        }}>
                          <Icon name={ind.icon} size={15} color="var(--accent)" />
                        </div>
                        <div>
                          <div style={{ font: '500 14px/1.2 Inter', color: 'var(--ink)' }}>{ind.label}</div>
                          <div style={{ font: '400 11px/1.3 Inter', color: 'var(--ink-3)' }}>{ind.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={l.label}
                onClick={() => go(l.path)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '12px 14px', borderRadius: 10,
                  font: '500 15px/1 Inter',
                  color: l.path && isActive(l.path) ? 'var(--accent)' : 'var(--ink-2)',
                  background: l.path && isActive(l.path) ? 'var(--accent-soft)' : 'transparent',
                  border: 'none', cursor: 'pointer', transition: 'background .15s',
                }}
                onMouseEnter={e => { if (!(l.path && isActive(l.path))) e.currentTarget.style.background = 'var(--bg-alt)'; }}
                onMouseLeave={e => { if (!(l.path && isActive(l.path))) e.currentTarget.style.background = 'transparent'; }}
              >
                {l.label}
              </button>
            )
          ))}

          {/* Join CTA */}
          <div style={{ borderTop: '1px solid var(--line-2)', marginTop: 10, paddingTop: 14 }}>
            <button
              onClick={() => go('/join')}
              style={{
                width: '100%', padding: '13px', borderRadius: 12,
                background: 'var(--accent)', color: '#fff', border: 'none',
                font: '600 15px/1 Inter', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              Join as a Partner
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

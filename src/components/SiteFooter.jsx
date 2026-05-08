import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, Container } from './primitives';
import logo from '../assets/whyclick-logo.png';

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
      background: 'var(--accent)',
      borderRadius: 16, padding: '36px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 40, marginBottom: 56, flexWrap: 'wrap',
    }}>
      <div style={{ maxWidth: 400 }}>
        <h3 style={{ margin: '0 0 8px', font: '700 22px/1.2 Inter', letterSpacing: '-0.015em', color: 'white' }}>
          Get the weekly pro roundup
        </h3>
        <p style={{ margin: 0, font: '400 14px/1.55 Inter', color: 'rgba(255,255,255,0.8)' }}>
          Top-rated professionals, booking tips, and new city launches. No spam. Unsubscribe anytime.
        </p>
      </div>
      {sent ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'white', font: '600 15px/1 Inter' }}>
          <Icon name="check-badge" size={20} color="white" />
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
              border: 'none',
              font: '500 14px/1 Inter', color: 'var(--ink)', background: 'white',
              outline: 'none', width: 220,
            }}
          />
          <button type="submit" style={{
            padding: '12px 20px', borderRadius: '0 10px 10px 0',
            background: 'var(--ink)', color: 'white', border: 'none',
            font: '600 14px/1 Inter', cursor: 'pointer',
            transition: 'opacity .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

const SOCIAL = [
  {
    label: 'X (Twitter)', href: '#',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>,
  },
  {
    label: 'Instagram', href: '#',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'LinkedIn', href: '#',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'TikTok', href: '#',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.77 1.52V7.01a4.86 4.86 0 01-1-.32z"/></svg>,
  },
];

const COLS = [
  { h: 'Browse',  items: [{ label: 'Dentists', path: '/dentists' }, { label: 'Restaurants', path: '/restaurants' }, { label: 'Salons & Spas', path: '/salon-spa' }, { label: 'Photographers', path: '/photographers' }, { label: 'Home Services', path: null }] },
  { h: 'Company', items: [{ label: 'About', path: '/about' }, { label: 'Blog', path: '/blog' }, { label: 'Contact Us', path: '/contact' }, { label: 'Careers', path: null }, { label: 'Press', path: null }] },
  { h: 'Support',  items: [{ label: 'Help center', path: null }, { label: 'Trust & safety', path: null }, { label: 'Privacy', path: null }, { label: 'Terms', path: null }] },
];

export default function SiteFooter() {
  const navigate = useNavigate();

  return (
    <footer style={{ borderTop: '1px solid var(--line-2)', background: 'var(--bg)', padding: '64px 0 32px' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand column */}
          <div>
            <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block', marginBottom: 16 }} />
            <p style={{ margin: '0 0 24px', color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
              Every professional on whyclick.tv is license-verified, background-checked, and reviewed by real customers. No guessing, no spam.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: 9,
                  border: '1px solid var(--line)',
                  display: 'grid', placeItems: 'center',
                  color: 'var(--ink-3)', background: 'var(--bg)',
                  transition: 'color .15s, border-color .15s, background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg)'; }}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.h}>
              <div style={{ font: '600 13px/1 Inter', marginBottom: 16, color: 'var(--ink)' }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.items.map(it => (
                  <li key={it.label}>
                    <a
                      href={it.path || '#'}
                      onClick={e => { if (it.path) { e.preventDefault(); navigate(it.path); } }}
                      style={{ font: '400 13px/1 Inter', color: 'var(--ink-2)', textDecoration: 'none', transition: 'color .15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid var(--line-2)', flexWrap: 'wrap', gap: 12 }}>
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
}

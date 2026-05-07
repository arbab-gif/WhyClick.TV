import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/whyclick-logo.png';

export default function ProUnderReview() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--line-2)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.6)' }} />
          <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Under review</span>
        </div>
      </header>

      {/* Main — centered */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>

        {/* Illustration */}
        <div style={{ position: 'relative', marginBottom: 36 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'oklch(0.97 0.02 60)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            border: '2px solid var(--accent)', opacity: 0.25,
            animation: 'reviewPulse 2s ease-in-out infinite',
          }} />
          <style>{`@keyframes reviewPulse { 0%,100%{transform:scale(1);opacity:.25} 50%{transform:scale(1.1);opacity:.1} }`}</style>
        </div>

        <h1 style={{ margin: '0 0 12px', font: '700 28px/1.15 Inter', letterSpacing: '-0.025em', color: 'var(--ink)', maxWidth: 400 }}>
          Your profile is under review
        </h1>
        <p style={{ margin: '0 0 36px', font: '400 15px/1.7 Inter', color: 'var(--ink-3)', maxWidth: 400 }}>
          Our team is verifying your credentials and listing. This usually takes <strong style={{ color: 'var(--ink)' }}>24–48 hours</strong>. We'll send you a notification as soon as you're approved and live.
        </p>

        {/* What happens next */}
        <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--line)', borderRadius: 16, padding: '28px 32px', marginBottom: 40, maxWidth: 420, width: '100%', textAlign: 'left' }}>
          <div style={{ font: '600 13px/1 Inter', color: 'var(--ink)', marginBottom: 20 }}>What happens next</div>
          {[
            { icon: '📋', title: 'Credential check',    desc: 'We verify your license, insurance, and any certifications you submitted.' },
            { icon: '✅', title: 'Profile approved',    desc: "You'll receive an email and in-app notification once your listing is live." },
            { icon: '🚀', title: 'Start getting clients', desc: 'Your profile goes live and clients can start finding and booking you.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < 2 ? 18 : 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', flexShrink: 0, fontSize: 16 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ font: '600 14px/1.3 Inter', color: 'var(--ink)', marginBottom: 3 }}>{item.title}</div>
                <div style={{ font: '400 13px/1.5 Inter', color: 'var(--ink-3)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout button */}
        <button
          onClick={() => navigate('/pro/signin')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 10,
            border: '1.5px solid var(--line)', background: 'transparent',
            font: '500 14px/1 Inter', color: 'var(--ink-2)', cursor: 'pointer',
            transition: 'border-color .15s, color .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink-2)'; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log out
        </button>

        <p style={{ marginTop: 20, font: '400 12px/1.5 Inter', color: 'var(--ink-3)' }}>
          Questions? Email us at{' '}
          <a href="mailto:support@whyclick.tv" style={{ color: 'var(--accent)', textDecoration: 'none' }}>support@whyclick.tv</a>
        </p>

      </div>
    </div>
  );
}

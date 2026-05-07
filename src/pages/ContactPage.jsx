import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const TOPICS = [
  'General question',
  'Joining as a professional',
  'Something isn\'t working',
  'Press or media',
  'Billing',
  'Other',
];

const FAQS = [
  {
    q: 'How long does verification take?',
    a: 'Most applications are reviewed within 48 hours. If we need anything extra we\'ll reach out directly.',
  },
  {
    q: 'Is it free for customers?',
    a: 'Yes. Browsing, comparing, and booking is always free. Professionals pay a flat monthly fee — no lead charges, no commissions.',
  },
  {
    q: 'Can I request an industry that isn\'t listed yet?',
    a: 'Absolutely. Tell us what you\'re looking for and we\'ll let you know when it\'s available in your area.',
  },
  {
    q: 'My review was removed — why?',
    a: 'Reviews that violate our guidelines (spam, personal info, conflicts of interest) are removed. Email support@whyclick.tv with the details.',
  },
  {
    q: 'How do professionals get verified?',
    a: 'We verify licenses, insurance and certifications through official state and national registries. Professionals also go through an ID check before their first listing goes live.',
  },
  {
    q: 'Can I list my business on whyclick.tv?',
    a: 'Yes — click "Join as a Partner" in the top navigation to start your application. Most categories are open and the review process takes 1–2 business days.',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const inputSt = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1px solid var(--line)', background: '#fff',
    font: '400 14px/1.4 Inter', color: 'var(--ink)',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s',
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteNav />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px 100px' }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ margin: '0 0 12px', font: '600 13px/1 Inter', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Contact us
          </p>
          <h1 style={{ margin: '0 0 16px', font: '700 44px/1.1 Inter', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            How can we help?
          </h1>
          <p style={{ margin: 0, font: '400 16px/1.7 Inter', color: 'var(--ink-3)', maxWidth: 480 }}>
            We read every message and reply within one business day. For urgent issues, email us directly.
          </p>
        </div>

        {/* ── CONTACT CHANNELS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 72 }}>
          {[
            { emoji: '✉️', label: 'General enquiries', value: 'hello@whyclick.tv', href: 'mailto:hello@whyclick.tv' },
            { emoji: '🛟', label: 'Support',            value: 'support@whyclick.tv', href: 'mailto:support@whyclick.tv' },
            { emoji: '📍', label: 'Headquarters',       value: 'Brooklyn, New York', href: null },
          ].map(card => (
            <a
              key={card.label}
              href={card.href || undefined}
              style={{
                display: 'block', padding: '24px', borderRadius: 14,
                border: '1px solid var(--line)',
                textDecoration: 'none',
                transition: 'border-color .15s, box-shadow .15s',
                cursor: card.href ? 'pointer' : 'default',
              }}
              onMouseEnter={e => { if (card.href) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-soft)'; }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 24, marginBottom: 12 }}>{card.emoji}</div>
              <div style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>{card.label}</div>
              <div style={{ font: '600 15px/1.3 Inter', color: 'var(--ink)' }}>{card.value}</div>
            </a>
          ))}
        </div>

        {/* ── FORM + FAQ ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left: Form */}
          <div>
            <h2 style={{ margin: '0 0 6px', font: '700 24px/1.2 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Send a message</h2>
            <p style={{ margin: '0 0 28px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>Fill in the form and we'll get back to you shortly.</p>

            {sent ? (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f0fdf4', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div style={{ font: '700 20px/1.2 Inter', color: 'var(--ink)', marginBottom: 8 }}>Message sent!</div>
                <div style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', marginBottom: 24 }}>We'll get back to you within one business day.</div>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  style={{ font: '500 13px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name" required style={inputSt}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                  </div>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com" required style={inputSt}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>Topic</label>
                  <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                    style={{ ...inputSt, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Select a topic</option>
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="What's on your mind?" required rows={5}
                    style={{ ...inputSt, resize: 'none', lineHeight: '1.6' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                </div>
                <button type="submit" style={{
                  padding: '13px', borderRadius: 8, border: 'none',
                  background: 'var(--accent)', color: 'white',
                  font: '600 14px/1 Inter', cursor: 'pointer',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Send message →
                </button>
              </form>
            )}
          </div>

          {/* Right: FAQ */}
          <div>
            <h2 style={{ margin: '0 0 6px', font: '700 24px/1.2 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Frequently asked</h2>
            <p style={{ margin: '0 0 28px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>Quick answers to common questions.</p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderTop: i === 0 ? '1px solid var(--line)' : 'none', borderBottom: '1px solid var(--line)' }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{
                        width: '100%', textAlign: 'left',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                        padding: '16px 0', background: 'transparent', border: 'none', cursor: 'pointer',
                      }}
                    >
                      <span style={{ font: `${isOpen ? '600' : '500'} 14px/1.4 Inter`, color: isOpen ? 'var(--ink)' : 'var(--ink-2)', transition: 'color .15s' }}>
                        {faq.q}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke={isOpen ? 'var(--accent)' : 'var(--ink-3)'}
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 16px 0' }}>
                        <p style={{ margin: 0, font: '400 13px/1.7 Inter', color: 'var(--ink-3)' }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

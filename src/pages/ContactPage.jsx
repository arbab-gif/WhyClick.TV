import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/primitives';
import SiteNav from '../components/SiteNav';

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
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const inputSt = {
    width: '100%', padding: '12px 14px', borderRadius: 9,
    border: '1.5px solid var(--line)', background: 'var(--bg)',
    font: '400 14px/1.4 Inter', color: 'var(--ink)',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s',
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SiteNav />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 32px 80px' }}>

        {/* Top — header + contact methods side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 64, alignItems: 'start' }}>
          <div>
            <p style={{ margin: '0 0 16px', font: '500 13px/1 Inter', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Contact
            </p>
            <h1 style={{ margin: '0 0 20px', font: '800 48px/1.06 Inter', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
              Let's talk.
            </h1>
            <p style={{ margin: '0 0 36px', font: '400 17px/1.6 Inter', color: 'var(--ink-2)' }}>
              Questions, feedback, press, or just want to say something — use the form or reach us directly. We read everything.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <a href="mailto:hello@whyclick.tv" style={{
                display: 'flex', alignItems: 'center', gap: 14,
                textDecoration: 'none',
                padding: '18px 20px', borderRadius: 12,
                border: '1px solid var(--line-2)', background: 'var(--bg-alt)',
                transition: 'border-color .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-2)'}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name="mail" size={18} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ font: '500 13px/1 Inter', color: 'var(--ink-3)', marginBottom: 4 }}>Email us</div>
                  <div style={{ font: '600 15px/1.2 Inter', color: 'var(--ink)' }}>hello@whyclick.tv</div>
                </div>
              </a>

              <a href="mailto:support@whyclick.tv" style={{
                display: 'flex', alignItems: 'center', gap: 14,
                textDecoration: 'none',
                padding: '18px 20px', borderRadius: 12,
                border: '1px solid var(--line-2)', background: 'var(--bg-alt)',
                transition: 'border-color .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-2)'}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name="sparkle" size={18} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ font: '500 13px/1 Inter', color: 'var(--ink-3)', marginBottom: 4 }}>Support</div>
                  <div style={{ font: '600 15px/1.2 Inter', color: 'var(--ink)' }}>support@whyclick.tv</div>
                </div>
              </a>
            </div>

            <div style={{ marginTop: 28, padding: '14px 16px', borderRadius: 10, background: 'var(--bg-alt)', border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span style={{ font: '400 13px/1.4 Inter', color: 'var(--ink-3)' }}>
                We reply within one business day, usually faster.
              </span>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--line-2)', borderRadius: 18, padding: '32px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: 'oklch(0.95 0.05 145)',
                  display: 'grid', placeItems: 'center', margin: '0 auto 20px',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div style={{ font: '700 20px/1.2 Inter', color: 'var(--ink)', marginBottom: 8 }}>Got it, {form.name.split(' ')[0]}.</div>
                <div style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', marginBottom: 28 }}>
                  We'll get back to you shortly.
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  style={{ font: '500 13px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div style={{ font: '600 17px/1.2 Inter', color: 'var(--ink)', marginBottom: 24 }}>Send a message</div>
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
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>What's this about?</label>
                    <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                      style={{ ...inputSt, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Pick a topic</option>
                      {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 6 }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="What's on your mind?" required rows={4}
                      style={{ ...inputSt, resize: 'none', lineHeight: '1.5' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                  </div>
                  <button type="submit" style={{
                    padding: '13px', borderRadius: 10, border: 'none',
                    background: 'var(--accent)', color: 'white',
                    font: '600 14px/1 Inter', cursor: 'pointer',
                    transition: 'opacity .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Send message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ borderTop: '1px solid var(--line-2)', paddingTop: 56 }}>
          <h2 style={{ margin: '0 0 8px', font: '700 24px/1.1 Inter', letterSpacing: '-0.015em', color: 'var(--ink)' }}>
            Quick answers
          </h2>
          <p style={{ margin: '0 0 32px', font: '400 15px/1.5 Inter', color: 'var(--ink-3)' }}>
            The questions we get most often.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    textAlign: 'left', display: 'block', width: '100%',
                    padding: '20px 24px',
                    background: isOpen ? 'var(--bg-alt)' : 'transparent',
                    border: 'none',
                    borderTop: i < 2 ? 'none' : '1px solid var(--line-2)',
                    borderLeft: (i % 2 === 1) ? '1px solid var(--line-2)' : 'none',
                    borderBottom: '1px solid var(--line-2)',
                    borderRight: 'none',
                    cursor: 'pointer',
                    transition: 'background .15s',
                    outline: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ font: '500 14px/1.4 Inter', color: 'var(--ink)' }}>{faq.q}</div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: 'var(--ink-3)', flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  {isOpen && (
                    <div style={{ margin: '10px 0 0', font: '400 13px/1.6 Inter', color: 'var(--ink-3)' }}>
                      {faq.a}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

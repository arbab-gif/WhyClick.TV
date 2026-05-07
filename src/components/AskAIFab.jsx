import React, { useState } from 'react';
import { Icon } from './primitives';
import { Avatar } from './primitives';
import clickAiLogo from '../assets/click-ai-logo.svg';

const SUGGESTIONS = [
  'Best dentist near me, weekends',
  'Italian chef for 12-person dinner',
  'Tax CPA for small SaaS business',
  'Family photographer, outdoor',
];

export default function AskAIFab() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [thinking, setThinking] = useState(false);
  const [reply, setReply] = useState(null);

  const ask = (text) => {
    const query = (text ?? q).trim();
    if (!query) return;
    setQ(query);
    setReply(null);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setReply({
        summary: 'Based on your need, here are 3 top matches.',
        items: [
          { name: 'Dr. Maya Patel',  meta: 'Pediatric Dentist · 0.4 mi · 4.9★', match: 98 },
          { name: 'Dr. Jordan Kim',  meta: 'Family Dentist · 1.1 mi · 4.8★',    match: 94 },
          { name: 'Brooklyn Smile',  meta: 'General · 1.6 mi · 4.7★',           match: 89 },
        ],
      });
    }, 1100);
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Ask Click AI"
        style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 100,
          display: 'inline-flex', alignItems: 'center',
          padding: 0,
          borderRadius: 999,
          background: 'none',
          border: 'none',
          boxShadow: '0 12px 32px -8px rgba(255,90,32,0.45), 0 0 0 4px rgba(255,90,32,0.15)',
          cursor: 'pointer',
          transition: 'transform .15s ease, box-shadow .15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px -8px rgba(255,90,32,0.55), 0 0 0 6px rgba(255,90,32,0.18)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(255,90,32,0.45), 0 0 0 4px rgba(255,90,32,0.15)'; }}
      >
        <img
          src={clickAiLogo}
          alt="Click AI"
          style={{ height: open ? 48 : 52, width: 'auto', display: 'block', borderRadius: 999 }}
        />
      </button>

      {open && (
        <div role="dialog" aria-label="Click AI Assistant"
          style={{
            position: 'fixed', right: 24, bottom: 92, zIndex: 100,
            width: 380, maxHeight: 'min(72vh, 560px)',
            background: 'var(--bg)', color: 'var(--ink)',
            borderRadius: 16, border: '1px solid var(--line)',
            boxShadow: '0 24px 64px -24px rgba(40,30,20,.35)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid var(--line-2)',
            background: 'var(--ink)', color: 'var(--bg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent)',
                display: 'grid', placeItems: 'center' }}>
                <Icon name="sparkle" size={14} color="white" />
              </div>
              <div>
                <div style={{ font: '600 13px/1 Inter' }}>Click AI</div>
                <div className="mono" style={{ font: '500 10px/1 Inter',
                  color: 'oklch(0.78 0.01 80)', letterSpacing: '0.08em', marginTop: 4 }}>
                  YOUR PERSONAL MATCHMAKER
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ width: 28, height: 28, borderRadius: 8,
                background: 'oklch(0.32 0.01 80)', color: 'var(--bg)', border: 'none',
                cursor: 'pointer', font: '500 14px/1 Inter', display: 'grid', placeItems: 'center' }}>×</button>
          </div>

          <div style={{ padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
            {!reply && !thinking && (
              <>
                <p style={{ margin: 0, font: '400 14px/1.5 Inter', color: 'var(--ink-2)' }}>
                  Tell me what you need — I'll suggest the best professional for it.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => ask(s)} style={{
                      textAlign: 'left', padding: '10px 12px', borderRadius: 10,
                      background: 'var(--bg-alt)', border: '1px solid var(--line)',
                      font: '500 13px/1.4 Inter', color: 'var(--ink-2)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                    }}>
                      <span>{s}</span>
                      <Icon name="arrow-up-right" size={14} color="var(--ink-3)" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {thinking && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                        animation: `askDot 1s ${i * 0.15}s infinite ease-in-out`,
                        display: 'block',
                      }} />
                    ))}
                  </div>
                  <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Analyzing your needs…</span>
                </div>
              </div>
            )}

            {reply && (
              <>
                <div style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-2)' }}>{reply.summary}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {reply.items.map((it, i) => (
                    <div key={it.name} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: 10, borderRadius: 10,
                      border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--line)',
                      background: 'var(--bg)',
                    }}>
                      <Avatar size={36} seed={(i + 1) * 9} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ font: '600 13px/1.2 Inter' }}>{it.name}</div>
                        <div style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)' }}>{it.meta}</div>
                      </div>
                      <span style={{
                        font: '600 11px/1 Inter',
                        background: i === 0 ? 'var(--accent)' : 'var(--bg-alt)',
                        color: i === 0 ? 'white' : 'var(--ink-2)',
                        padding: '4px 7px', borderRadius: 999, letterSpacing: '0.04em',
                      }}>{it.match}%</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setReply(null); setQ(''); }} style={{
                  alignSelf: 'flex-start', font: '500 12px/1 Inter', color: 'var(--ink-2)',
                  background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline',
                }}>↺ Ask something else</button>
              </>
            )}
          </div>

          <div style={{ padding: 12, borderTop: '1px solid var(--line-2)', background: 'var(--bg-alt)' }}>
            <form onSubmit={e => { e.preventDefault(); ask(); }}
              style={{ display: 'flex', gap: 8, alignItems: 'center',
                background: 'var(--bg)', border: '1px solid var(--line)',
                borderRadius: 10, padding: '4px 4px 4px 12px' }}>
              <Icon name="message" size={14} color="var(--ink-3)" />
              <input value={q} onChange={e => setQ(e.target.value)}
                placeholder="Ask Click AI…"
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  font: '500 13px/1 Inter', color: 'var(--ink)', padding: '8px 0' }} />
              <button type="submit" aria-label="Send" style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'var(--accent)', color: 'white', border: 'none',
                display: 'grid', placeItems: 'center', cursor: 'pointer',
              }}>
                <Icon name="arrow-right" size={14} color="white" />
              </button>
            </form>
            <div style={{ marginTop: 6, font: '400 10px/1.3 Inter', color: 'var(--ink-3)', textAlign: 'center' }}>
              AI-generated suggestions · always verify before booking
            </div>
          </div>
        </div>
      )}
    </>
  );
}

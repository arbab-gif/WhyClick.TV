import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/primitives';
import logo from '../assets/whyclick-logo.png';

const STEP_SIGNIN   = 'signin';
const STEP_FORGOT   = 'forgot-email';
const STEP_OTP      = 'forgot-otp';
const STEP_RESET    = 'forgot-reset';

const inputSt = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  border: '1.5px solid var(--line)', background: '#fff',
  font: '400 15px/1 Inter', color: 'var(--ink)',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color .15s',
};

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function OtpInput({ value, onChange }) {
  const refs = Array.from({ length: 6 }, () => useRef());
  const digits = (value + '      ').slice(0, 6).split('');

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = digits.map((d, idx) => idx === i ? ' ' : d).join('').trimEnd();
      onChange(next.replace(/ /g, ''));
      if (i > 0) refs[i - 1].current.focus();
    } else if (/^\d$/.test(e.key)) {
      const arr = digits.slice();
      arr[i] = e.key;
      onChange(arr.join('').replace(/ /g, ''));
      if (i < 5) refs[i + 1].current.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[0,1,2,3,4,5].map(i => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1}
          value={digits[i] === ' ' ? '' : digits[i]}
          onChange={() => {}}
          onKeyDown={e => handleKey(i, e)}
          onFocus={e => e.target.select()}
          style={{
            width: 52, height: 58, textAlign: 'center',
            borderRadius: 12, border: `2px solid ${digits[i] && digits[i] !== ' ' ? 'var(--accent)' : 'var(--line)'}`,
            font: '700 24px/1 Inter', color: 'var(--ink)',
            background: digits[i] && digits[i] !== ' ' ? 'var(--accent-soft)' : '#fff',
            outline: 'none', transition: 'border-color .15s, background .15s',
          }}
        />
      ))}
    </div>
  );
}

export default function ProSignIn() {
  const navigate = useNavigate();
  const [step, setStep]           = useState(STEP_SIGNIN);
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp]             = useState('');
  const [otpError, setOtpError]   = useState('');
  const [newPw, setNewPw]         = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showNew, setShowNew]     = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [pwDone, setPwDone]       = useState(false);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const strength = (() => {
    if (!newPw) return 0;
    let s = 0;
    if (newPw.length >= 8) s++;
    if (/[A-Z]/.test(newPw)) s++;
    if (/[0-9]/.test(newPw)) s++;
    if (/[^A-Za-z0-9]/.test(newPw)) s++;
    return s;
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'][strength];

  const panelContent = {
    [STEP_SIGNIN]: {
      heading: 'Grow your practice with real clients.',
      sub: 'Every client on whyclick.tv is actively looking for a professional. Sign in to manage your listing, respond to enquiries, and grow.',
    },
    [STEP_FORGOT]: {
      heading: "We'll get you back in.",
      sub: "Enter your registered email and we'll send a one-time code to verify it's you.",
    },
    [STEP_OTP]: {
      heading: "Quick verification — then you're in.",
      sub: 'We protect your account with a one-time code. Enter it to continue resetting your password.',
    },
    [STEP_RESET]: {
      heading: 'Almost done.',
      sub: "Set a strong password and you'll be signed in right away.",
    },
  };

  const panel = panelContent[step] || panelContent[STEP_SIGNIN];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>

      {/* ── Sticky header (matches JoinAsPartner) ── */}
      <header style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--line-2)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <img src={logo} alt="whyclick.tv" style={{ height: 44, width: 'auto', cursor: 'pointer' }} onClick={() => navigate('/')} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>Not a professional yet?</span>
          <button onClick={() => navigate('/join')} style={{
            padding: '8px 16px', borderRadius: 8, border: '1.5px solid var(--line)',
            background: 'transparent', font: '500 13px/1 Inter', color: 'var(--ink)',
            cursor: 'pointer', transition: 'border-color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
            Apply to join →
          </button>
        </div>
        <button onClick={() => navigate('/')} style={{
          width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--line)',
          background: 'var(--bg-alt)', cursor: 'pointer', display: 'grid', placeItems: 'center',
          transition: 'background .15s, border-color .15s', flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--line-2)'; e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-alt)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
        title="Back to site">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

        {/* ── LEFT — form panel ── */}
        <div style={{ flex: '0 0 56%', overflowY: 'auto', padding: '56px 72px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: 440 }}>

            {/* ── SIGN IN ── */}
            {step === STEP_SIGNIN && (
              <>
                <p style={{ margin: '0 0 10px', font: '600 12px/1 Inter', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Professional portal</p>
                <h1 style={{ margin: '0 0 6px', font: '700 30px/1.1 Inter', letterSpacing: '-0.025em', color: 'var(--ink)' }}>Welcome back</h1>
                <p style={{ margin: '0 0 36px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>Sign in to your professional account to manage your listing.</p>

                <form onSubmit={e => { e.preventDefault(); navigate('/pro/dashboard'); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 8 }}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com" required autoComplete="email" style={inputSt}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>Password</label>
                      <button type="button" onClick={() => { setForgotEmail(email); setStep(STEP_FORGOT); }}
                        style={{ font: '500 12px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Forgot password?
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••" required autoComplete="current-password"
                        style={{ ...inputSt, paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                      <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 0, display: 'grid', placeItems: 'center' }}>
                        <EyeIcon open={showPw} />
                      </button>
                    </div>
                  </div>
                  <button type="submit" style={{
                    padding: '14px', borderRadius: 10, border: 'none',
                    background: 'var(--accent)', color: 'white',
                    font: '600 15px/1 Inter', cursor: 'pointer', transition: 'opacity .15s', marginTop: 2,
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Sign in to my account →
                  </button>
                </form>
              </>
            )}

            {/* ── FORGOT — enter email ── */}
            {step === STEP_FORGOT && (
              <>
                <button onClick={() => setStep(STEP_SIGNIN)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 13px/1 Inter', color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 36 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to sign in
                </button>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <h1 style={{ margin: '0 0 6px', font: '700 28px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Reset your password</h1>
                <p style={{ margin: '0 0 32px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>Enter the email linked to your professional account and we'll send a verification code.</p>
                <form onSubmit={e => { e.preventDefault(); setResendTimer(30); setStep(STEP_OTP); }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 8 }}>Email address</label>
                    <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                      placeholder="you@example.com" required style={inputSt}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                  </div>
                  <button type="submit" style={{ padding: '14px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: 'white', font: '600 15px/1 Inter', cursor: 'pointer', transition: 'opacity .15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    Send verification code
                  </button>
                </form>
              </>
            )}

            {/* ── OTP ── */}
            {step === STEP_OTP && (
              <>
                <button onClick={() => setStep(STEP_FORGOT)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 13px/1 Inter', color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 36 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h1 style={{ margin: '0 0 6px', font: '700 28px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Check your email</h1>
                <p style={{ margin: '0 0 32px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>
                  We sent a 6-digit code to <strong style={{ color: 'var(--ink)' }}>{forgotEmail}</strong>. It expires in 10 minutes.
                </p>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (otp.length < 6) { setOtpError('Please enter all 6 digits.'); return; }
                  if (otp !== '123456') { setOtpError('Incorrect code. Please try again.'); return; }
                  setOtpError(''); setStep(STEP_RESET);
                }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <OtpInput value={otp} onChange={v => { setOtp(v); setOtpError(''); }} />
                  {otpError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span style={{ font: '400 13px/1 Inter', color: '#ef4444' }}>{otpError}</span>
                    </div>
                  )}
                  <button type="submit" disabled={otp.length < 6} style={{
                    padding: '14px', borderRadius: 10, border: 'none',
                    background: otp.length === 6 ? 'var(--accent)' : 'oklch(0.90 0.01 80)',
                    color: otp.length === 6 ? 'white' : 'var(--ink-3)',
                    font: '600 15px/1 Inter', cursor: otp.length === 6 ? 'pointer' : 'default', transition: 'all .15s',
                  }}>Verify code</button>
                </form>
                <div style={{ marginTop: 18, textAlign: 'center' }}>
                  {resendTimer > 0
                    ? <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>Resend in <strong style={{ color: 'var(--ink)' }}>{resendTimer}s</strong></span>
                    : <button onClick={() => setResendTimer(30)} style={{ font: '500 13px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Didn't receive it? Resend →</button>
                  }
                </div>
              </>
            )}

            {/* ── NEW PASSWORD ── */}
            {step === STEP_RESET && !pwDone && (
              <>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f0fdf4', display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h1 style={{ margin: '0 0 6px', font: '700 28px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>Set new password</h1>
                <p style={{ margin: '0 0 32px', font: '400 14px/1.6 Inter', color: 'var(--ink-3)' }}>Choose a strong password you haven't used before.</p>
                <form onSubmit={e => { e.preventDefault(); if (newPw.length >= 8 && newPw === confirmPw) { setPwDone(true); setTimeout(() => { setPwDone(false); setStep(STEP_SIGNIN); setNewPw(''); setConfirmPw(''); }, 2500); }}} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 8 }}>New password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showNew ? 'text' : 'password'} value={newPw} onChange={e => setNewPw(e.target.value)}
                        placeholder="Min. 8 characters" required minLength={8}
                        style={{ ...inputSt, paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                      <button type="button" onClick={() => setShowNew(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 0, display: 'grid', placeItems: 'center' }}>
                        <EyeIcon open={showNew} />
                      </button>
                    </div>
                    {newPw && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                          {[1,2,3,4].map(i => (
                            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= strength ? strengthColor : 'var(--line)', transition: 'background .2s' }} />
                          ))}
                        </div>
                        <span style={{ font: '400 11px/1 Inter', color: strengthColor }}>{strengthLabel}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 8 }}>Confirm password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showConf ? 'text' : 'password'} value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                        placeholder="Repeat password" required
                        style={{ ...inputSt, paddingRight: 44 }}
                        onFocus={e => e.target.style.borderColor = confirmPw && confirmPw !== newPw ? '#ef4444' : 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = confirmPw && confirmPw !== newPw ? '#ef4444' : 'var(--line)'} />
                      <button type="button" onClick={() => setShowConf(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 0, display: 'grid', placeItems: 'center' }}>
                        <EyeIcon open={showConf} />
                      </button>
                    </div>
                    {confirmPw && confirmPw !== newPw && (
                      <p style={{ margin: '5px 0 0', font: '400 11px/1 Inter', color: '#ef4444' }}>Passwords don't match.</p>
                    )}
                  </div>
                  <button type="submit" disabled={newPw.length < 8 || newPw !== confirmPw} style={{
                    padding: '14px', borderRadius: 10, border: 'none',
                    background: newPw.length >= 8 && newPw === confirmPw ? 'var(--accent)' : 'oklch(0.90 0.01 80)',
                    color: newPw.length >= 8 && newPw === confirmPw ? 'white' : 'var(--ink-3)',
                    font: '600 15px/1 Inter', cursor: newPw.length >= 8 && newPw === confirmPw ? 'pointer' : 'default',
                    transition: 'all .15s',
                  }}>Update password</button>
                </form>
              </>
            )}

            {/* ── PASSWORD UPDATED SUCCESS ── */}
            {step === STEP_RESET && pwDone && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <div style={{ font: '700 22px/1.2 Inter', color: 'var(--ink)', marginBottom: 8 }}>Password updated!</div>
                <div style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)' }}>Redirecting you back to sign in…</div>
              </div>
            )}

          </div>
        </div>

        {/* ── RIGHT — sticky dark image panel (matches JoinAsPartner) ── */}
        <div style={{ flex: '0 0 44%', position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80&auto=format&fit=crop"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Dark gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,3,2,0.92) 0%, rgba(5,3,2,0.45) 55%, transparent 100%)' }} />
          {/* Subtle accent tint */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(234,88,12,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Content at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 44px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--accent)', borderRadius: 999, padding: '6px 13px', marginBottom: 18 }}>
              <Icon name="sparkle" size={12} color="white" />
              <span style={{ font: '600 11px/1 Inter', color: 'white' }}>Professional portal</span>
            </div>
            <h3 style={{ font: '700 24px/1.25 Inter', color: 'white', margin: '0 0 10px', letterSpacing: '-0.015em', maxWidth: 320 }}>
              {panel.heading}
            </h3>
            <p style={{ font: '400 13px/1.6 Inter', color: 'rgba(255,255,255,0.65)', margin: '0 0 28px', maxWidth: 300 }}>
              {panel.sub}
            </p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 28 }}>
              {[{ n: '14,200+', l: 'Verified pros' }, { n: '4.9★', l: 'Avg rating' }, { n: '1.8M', l: 'Clients/year' }].map(s => (
                <div key={s.l}>
                  <div style={{ font: '700 18px/1 Inter', color: 'white', letterSpacing: '-0.02em' }}>{s.n}</div>
                  <div style={{ font: '400 11px/1.4 Inter', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

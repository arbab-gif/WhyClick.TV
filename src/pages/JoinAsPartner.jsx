import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/primitives';
import logo from '../assets/whyclick-logo.png';

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'dentist',      label: 'Dentist',            icon: 'tooth',       sub: 'Dental care & oral health' },
  { id: 'insurance',    label: 'Insurance',          icon: 'check-badge', sub: 'Health, dental & life' },
  { id: 'home',         label: 'Home Services',      icon: 'home',        sub: 'Repairs, plumbing & more' },
  { id: 'grooming',     label: 'Grooming',           icon: 'scissors',    sub: 'Salons, spas & beauty' },
  { id: 'retailer',     label: 'Retailer',           icon: 'briefcase',   sub: 'Shops & local businesses' },
  { id: 'restaurant',   label: 'Restaurant',         icon: 'fork',        sub: 'Food & dining' },
  { id: 'photographer', label: 'Photographer',       icon: 'camera',      sub: 'Photography & video' },
  { id: 'wellness',     label: 'Wellness & Fitness', icon: 'sparkle',     sub: 'Gyms, trainers & wellness' },
];

const SPECIALIZATIONS = [
  'General Dentistry', 'Orthodontics', 'Cosmetic Dentistry', 'Pediatric Dentistry',
  'Periodontics', 'Endodontics', 'Oral Surgery', 'Prosthodontics', 'Implantology',
];
const DEFAULT_SERVICES = [
  'Teeth Cleaning', 'Teeth Whitening', 'Dental Fillings', 'Root Canal',
  'Dental Implants', 'Braces / Aligners', 'Veneers', 'Crowns & Bridges',
  'Extractions', 'Pediatric Care', 'Emergency Dental', 'Gum Treatment',
];
const DEGREE_OPTIONS = [
  'DDS – Doctor of Dental Surgery', 'DMD – Doctor of Medicine in Dentistry',
  'BDS – Bachelor of Dental Surgery', 'MDS – Master of Dental Surgery', 'Other',
];
const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const STEP_LABELS = ['Personal Info', 'Services', 'Certifications', 'Review'];

// ── STYLES ────────────────────────────────────────────────────────────────────
const inputBase = {
  width: '100%', border: '1.5px solid var(--line)', borderRadius: 10,
  padding: '12px 14px', font: '400 14px/1.4 Inter', color: 'var(--ink)',
  background: 'var(--bg)', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color .15s', fontFamily: 'Inter, sans-serif',
};
const labelSt = { display: 'block', font: '500 13px/1 Inter', color: 'var(--ink-2)', marginBottom: 6 };
const fo = e => { e.target.style.borderColor = 'var(--accent)'; };
const fb = e => { e.target.style.borderColor = 'var(--line)'; };

// ── PRIMITIVES ────────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && (
      <label style={labelSt}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: 3 }}>*</span>}
      </label>
    )}
    {children}
    {hint && <span style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)' }}>{hint}</span>}
  </div>
);

const Inp = ({ value, onChange, placeholder, type = 'text' }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} style={inputBase} onFocus={fo} onBlur={fb} />
);

const Sel = ({ value, onChange, options, placeholder }) => (
  <div style={{ position: 'relative' }}>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, paddingRight: 36, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
      onFocus={fo} onBlur={fb}>
      <option value="">{placeholder || 'Select…'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <Icon name="chevron-down" size={14} color="var(--ink-3)" />
    </div>
  </div>
);

const UploadZone = ({ icon, title, sub }) => (
  <div style={{
    border: '2px dashed var(--line)', borderRadius: 12, padding: '24px 16px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    background: 'var(--bg-alt)', cursor: 'pointer', transition: 'border-color .15s, background .15s',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-alt)'; }}
  >
    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
      <Icon name={icon} size={18} color="var(--accent)" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ font: '500 13px/1 Inter', color: 'var(--ink)' }}>{title}</div>
      <div style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)', marginTop: 3 }}>{sub}</div>
    </div>
  </div>
);

// ── STEP BAR ──────────────────────────────────────────────────────────────────
const StepBar = ({ current }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
    {STEP_LABELS.map((label, i) => {
      const n = i + 1;
      const done   = n < current;
      const active = n === current;
      return (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'var(--bg-alt)',
              border: done || active ? 'none' : '1.5px solid var(--line)',
              display: 'grid', placeItems: 'center', transition: 'background .2s',
            }}>
              {done
                ? <Icon name="check" size={13} color="white" />
                : <span style={{ font: `${active ? '600' : '400'} 12px/1 Inter`, color: active ? 'white' : 'var(--ink-3)' }}>{n}</span>
              }
            </div>
            <span style={{ font: `${active ? '600' : '400'} 11px/1 Inter`, color: active ? 'var(--ink)' : 'var(--ink-3)', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div style={{ width: 52, height: 1.5, background: done ? 'var(--accent)' : 'var(--line-2)', margin: '0 6px', marginBottom: 18 }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ── SCREEN 0: CATEGORY ────────────────────────────────────────────────────────
const CategoryScreen = ({ value, onChange, onNext }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent-soft)', border: '1px solid oklch(0.88 0.08 30)', borderRadius: 999, padding: '6px 14px', marginBottom: 20 }}>
          <Icon name="sparkle" size={13} color="var(--accent)" />
          <span style={{ font: '500 12px/1 Inter', color: 'var(--accent)' }}>Join as a Partner</span>
        </div>
        <h1 style={{ font: '700 36px/1.1 Inter', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
          What type of professional are you?
        </h1>
        <p style={{ font: '400 16px/1.6 Inter', color: 'var(--ink-3)', margin: 0, maxWidth: 460 }}>
          Select the category that best describes your services. We'll personalize your onboarding experience.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 760, width: '100%' }}>
        {CATEGORIES.map(cat => {
          const sel = value === cat.id;
          return (
            <button key={cat.id} onClick={() => onChange(cat.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              padding: '22px 12px', borderRadius: 16,
              border: `2px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
              background: sel ? 'var(--accent-soft)' : 'var(--bg)',
              cursor: 'pointer', transition: 'all .15s',
              transform: sel ? 'translateY(-3px)' : 'none',
              boxShadow: sel ? '0 8px 24px -8px rgba(252,86,71,0.3)' : 'none',
            }}
              onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = 'var(--ink-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; } }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: sel ? 'var(--accent)' : 'var(--bg-alt)', display: 'grid', placeItems: 'center', transition: 'background .15s' }}>
                <Icon name={cat.icon} size={24} color={sel ? 'white' : 'var(--ink-2)'} />
              </div>
              <div>
                <div style={{ font: '600 13px/1.2 Inter', color: sel ? 'var(--accent)' : 'var(--ink)', textAlign: 'center' }}>{cat.label}</div>
                <div style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)', textAlign: 'center', marginTop: 3 }}>{cat.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        style={{
          marginTop: 36, padding: '14px 48px', borderRadius: 12, border: 'none',
          background: value ? 'var(--accent)' : 'oklch(0.88 0.01 80)',
          color: value ? 'white' : 'var(--ink-3)',
          font: '600 15px/1 Inter', cursor: value ? 'pointer' : 'default',
          transition: 'background .2s', letterSpacing: '-0.01em',
        }}
      >
        Continue →
      </button>
    </div>
  </div>
);

// ── SCREEN 1: WELCOME ─────────────────────────────────────────────────────────
const WelcomeScreen = ({ category, onStart }) => {
  const cat = CATEGORIES.find(c => c.id === category);
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ background: 'var(--bg)', borderRadius: 24, border: '1px solid var(--line-2)', overflow: 'hidden', boxShadow: '0 8px 48px -16px rgba(20,15,10,0.12)' }}>
        {/* Hero band */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, oklch(0.52 0.18 30) 100%)',
          padding: '48px 48px 40px', textAlign: 'center',
        }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
            <Icon name={cat?.icon || 'sparkle'} size={36} color="white" />
          </div>
          <h1 style={{ font: '700 28px/1.15 Inter', color: 'white', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            Welcome to whyclick.tv!
          </h1>
          <p style={{ font: '400 15px/1.6 Inter', color: 'rgba(255,255,255,0.82)', margin: 0 }}>
            Let's set up your {cat?.label} profile and connect you with potential patients.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '36px 48px 40px' }}>
          <p style={{ font: '400 15px/1.7 Inter', color: 'var(--ink-2)', margin: '0 0 28px' }}>
            This platform is designed to connect professionals like you with users seeking your services.
            By completing your profile, you ensure that users can easily find you and connect with your practice.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              { icon: 'check-badge', text: 'Verified profile badge after review' },
              { icon: 'sparkle',     text: 'AI-powered matching with relevant patients' },
              { icon: 'message',     text: 'Direct messaging & connection requests' },
              { icon: 'star',        text: 'Collect reviews and build your reputation' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={item.icon} size={15} color="var(--accent)" />
                </div>
                <span style={{ font: '400 14px/1.4 Inter', color: 'var(--ink-2)' }}>{item.text}</span>
              </div>
            ))}
          </div>

          <button onClick={onStart} style={{
            width: '100%', padding: '16px', borderRadius: 12, border: 'none',
            background: 'var(--accent)', color: 'white',
            font: '600 16px/1 Inter', cursor: 'pointer', letterSpacing: '-0.01em',
            transition: 'opacity .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Get Started →
          </button>

          <p style={{ font: '400 12px/1.5 Inter', color: 'var(--ink-3)', textAlign: 'center', marginTop: 16, marginBottom: 0 }}>
            Takes about 5–8 minutes · Profile reviewed within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

// ── STEP 2: PERSONAL INFO ─────────────────────────────────────────────────────
const PersonalStep = ({ data, set }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Personal information</h2>
      <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Enter your basic details to create your account.</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Full name" required>
          <Inp value={data.fullName} onChange={v => set('fullName', v)} placeholder="Dr. Jane Cooper" />
        </Field>
        <Field label="Professional title" required hint='e.g. "Dr. Jane Cooper, DDS"'>
          <Inp value={data.title} onChange={v => set('title', v)} placeholder="DDS, Cosmetic Dentist" />
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Email address" required>
          <Inp type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@example.com" />
        </Field>
        <Field label="Phone number" hint="Optional – used for SMS verification">
          <div style={{ position: 'relative' }}>
            <Inp type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="+1 555 000 0000" />
            {data.phone && (
              <button style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'var(--accent-soft)', border: '1px solid oklch(0.88 0.08 30)',
                borderRadius: 6, padding: '4px 10px', font: '500 11px/1 Inter',
                color: 'var(--accent)', cursor: 'pointer',
              }}>Verify</button>
            )}
          </div>
        </Field>
      </div>

      {/* Profile picture */}
      <Field label="Profile photo" hint="A professional headshot will help users recognize and trust you.">
        <UploadZone icon="camera" title="Upload profile photo" sub="JPG or PNG · max 5 MB · min 400×400 px" />
      </Field>

      <div style={{ height: 1, background: 'var(--line-2)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Password" required>
          <Inp type="password" value={data.password} onChange={v => set('password', v)} placeholder="Min. 8 characters" />
        </Field>
        <Field label="Confirm password" required>
          <Inp type="password" value={data.confirmPassword} onChange={v => set('confirmPassword', v)} placeholder="Re-enter password" />
        </Field>
      </div>
    </div>
  </div>
);

// ── STEP 3: SERVICE INFO ──────────────────────────────────────────────────────
const ServiceStep = ({ data, set }) => {
  const [newSvc, setNewSvc] = useState('');

  const toggleSvc = svc => {
    const cur = data.services || [];
    set('services', cur.includes(svc) ? cur.filter(x => x !== svc) : [...cur, svc]);
  };

  const addCustom = () => {
    const trimmed = newSvc.trim();
    if (!trimmed) return;
    const all = [...(data.allServices || DEFAULT_SERVICES), trimmed];
    set('allServices', all);
    set('services', [...(data.services || []), trimmed]);
    setNewSvc('');
  };

  const setHour = (day, field, val) => {
    set('hours', { ...data.hours, [day]: { ...data.hours[day], [field]: val } });
  };

  const toggleDay = day => {
    set('hours', { ...data.hours, [day]: { ...data.hours[day], active: !data.hours[day].active } });
  };

  const svcList = data.allServices || DEFAULT_SERVICES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Service information</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Tell us about your practice, services, and availability.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Clinic name" hint="Leave blank if solo practice">
          <Inp value={data.clinicName} onChange={v => set('clinicName', v)} placeholder="City Smile Dental" />
        </Field>
        <Field label="Specialization" required>
          <Sel value={data.specialization} onChange={v => set('specialization', v)} options={SPECIALIZATIONS} placeholder="Select specialization" />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: 16 }}>
        <Field label="City" required>
          <Inp value={data.city} onChange={v => set('city', v)} placeholder="New York" />
        </Field>
        <Field label="State" required>
          <Sel value={data.state} onChange={v => set('state', v)} options={US_STATES} placeholder="State" />
        </Field>
        <Field label="ZIP" required>
          <Inp value={data.zip} onChange={v => set('zip', v)} placeholder="10001" />
        </Field>
      </div>

      {/* Services */}
      <Field label="Services offered" hint="Select all that apply — you can also add custom services below.">
        <div style={{ border: '1.5px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px 14px 10px' }}>
            {svcList.map(svc => {
              const on = (data.services || []).includes(svc);
              return (
                <button key={svc} onClick={() => toggleSvc(svc)} style={{
                  padding: '7px 14px', borderRadius: 999,
                  border: `1.5px solid ${on ? 'var(--accent)' : 'var(--line)'}`,
                  background: on ? 'var(--accent)' : 'var(--bg)',
                  font: '500 12px/1 Inter', color: on ? 'white' : 'var(--ink-2)',
                  cursor: 'pointer', transition: 'all .15s',
                }}>{svc}</button>
              );
            })}
          </div>
          {/* Add custom service */}
          <div style={{ borderTop: '1px solid var(--line-2)', padding: '12px 14px', display: 'flex', gap: 8, background: 'var(--bg-alt)' }}>
            <input
              value={newSvc}
              onChange={e => setNewSvc(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCustom(); }}
              placeholder="Add new service…"
              style={{ ...inputBase, flex: 1, padding: '9px 12px' }}
              onFocus={fo} onBlur={fb}
            />
            <button onClick={addCustom} style={{
              padding: '9px 18px', borderRadius: 8, border: 'none',
              background: 'var(--accent)', color: 'white',
              font: '600 13px/1 Inter', cursor: 'pointer', flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>+ Add Service</button>
          </div>
        </div>
      </Field>

      {/* Video intro */}
      <Field label="Introductory video" hint="Optional but highly recommended — 1–2 minutes. Introduce yourself and your approach to patient care.">
        <UploadZone icon="camera" title="Upload intro video" sub="MP4 or MOV · max 100 MB · 1–2 min recommended" />
      </Field>
    </div>
  );
};

// ── STEP 4: CERTIFICATIONS ────────────────────────────────────────────────────
const CertsStep = ({ data, set }) => {
  const updateCert = (i, field, val) => {
    const updated = data.certifications.map((c, idx) => idx === i ? { ...c, [field]: val } : c);
    set('certifications', updated);
  };
  const addCert = () => set('certifications', [...data.certifications, { name: '', issuer: '', link: '' }]);
  const removeCert = i => set('certifications', data.certifications.filter((_, idx) => idx !== i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Certifications & legal compliance</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Upload your credentials to get verified and build patient trust.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Degree" required>
          <Sel value={data.degree} onChange={v => set('degree', v)} options={DEGREE_OPTIONS} placeholder="Select degree" />
        </Field>
        <Field label="Specialization" required>
          <Sel value={data.certSpec} onChange={v => set('certSpec', v)} options={SPECIALIZATIONS} placeholder="Select specialization" />
        </Field>
      </div>

      <Field label="License number" hint="Your dental board license number, used for credential verification">
        <Inp value={data.licenseNumber} onChange={v => set('licenseNumber', v)} placeholder="e.g. CA-DDS-123456" />
      </Field>

      <div style={{ height: 1, background: 'var(--line-2)' }} />

      <div>
        <div style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', marginBottom: 14 }}>Certifications</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ border: '1.5px solid var(--line)', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', background: 'var(--bg)' }}>
              {/* Remove button */}
              {data.certifications.length > 1 && (
                <button onClick={() => removeCert(i)} style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 24, height: 24, borderRadius: '50%', border: 'none',
                  background: 'var(--bg-alt)', color: 'var(--ink-3)',
                  font: '400 14px/1 Inter', cursor: 'pointer', display: 'grid', placeItems: 'center',
                }}>×</button>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Certification name">
                  <Inp value={cert.name} onChange={v => updateCert(i, 'name', v)} placeholder="e.g. Invisalign Certified" />
                </Field>
                <Field label="Issuing authority">
                  <Inp value={cert.issuer} onChange={v => updateCert(i, 'issuer', v)} placeholder="e.g. American Dental Association" />
                </Field>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addCert} style={{
          marginTop: 12, width: '100%', padding: '11px', borderRadius: 10,
          border: '1.5px dashed var(--accent)', background: 'var(--accent-soft)',
          font: '500 13px/1 Inter', color: 'var(--accent)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          transition: 'background .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.92 0.06 30)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-soft)'; }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add another certification
        </button>
      </div>
    </div>
  );
};

// ── STEP 5: PROFILE REVIEW ────────────────────────────────────────────────────
const ReviewStep = ({ data, set }) => {
  const cat = CATEGORIES.find(c => c.id === data.category);
  const services = (data.services || []).slice(0, 4);
  const hours = DAYS.filter(d => data.hours[d].active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Profile visibility & review</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>
          A complete profile increases your chances of being connected to potential patients.
        </p>
      </div>

      {/* Profile card preview */}
      <div>
        <div style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Profile preview
        </div>
        <div style={{ border: '1.5px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 4px 20px -8px rgba(20,15,10,0.12)' }}>
          {/* Card header */}
          <div style={{ background: 'linear-gradient(135deg, var(--accent) 0%, oklch(0.52 0.18 30) 100%)', height: 80 }} />

          <div style={{ padding: '0 20px 20px' }}>
            {/* Avatar */}
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid white', background: 'var(--bg-alt)', marginTop: -36, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={cat?.icon || 'sparkle'} size={28} color="var(--ink-3)" />
            </div>

            <div style={{ font: '700 18px/1.2 Inter', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              {data.fullName || 'Your Name'}
            </div>
            <div style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)', marginTop: 3 }}>
              {data.title || 'Professional Title'} · {data.specialization || 'Specialization'}
            </div>

            {data.city && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>
                <Icon name="pin" size={12} color="var(--accent)" />
                {[data.city, data.state].filter(Boolean).join(', ')}
              </div>
            )}

            {services.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {services.map(s => (
                  <span key={s} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 11px/1 Inter', color: 'var(--ink-2)' }}>
                    {s}
                  </span>
                ))}
                {(data.services || []).length > 4 && (
                  <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 11px/1 Inter', color: 'var(--ink-3)' }}>
                    +{(data.services || []).length - 4} more
                  </span>
                )}
              </div>
            )}

            {hours.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, font: '400 12px/1 Inter', color: 'var(--green)' }}>
                <Icon name="clock" size={12} color="var(--green)" />
                Open {hours.slice(0, 5).join(', ')}{hours.length > 5 ? ' & more' : ''}
              </div>
            )}

            {data.clinicName && (
              <div style={{ marginTop: 8, font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>
                <Icon name="briefcase" size={12} color="var(--ink-3)" style={{ marginRight: 4 }} />
                {data.clinicName}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completeness */}
      <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--line-2)', borderRadius: 12, padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Profile completeness</span>
          <span style={{ font: '700 13px/1 Inter', color: 'var(--accent)' }}>
            {Math.min(100, [data.fullName, data.title, data.email, data.specialization, (data.services || []).length > 0, data.degree, data.licenseNumber].filter(Boolean).length * 15)}%
          </span>
        </div>
        <div style={{ height: 6, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 999, background: 'var(--accent)',
            width: `${Math.min(100, [data.fullName, data.title, data.email, data.specialization, (data.services || []).length > 0, data.degree, data.licenseNumber].filter(Boolean).length * 15)}%`,
            transition: 'width .4s',
          }} />
        </div>
      </div>

      {/* Reminder */}
      <div style={{ background: 'oklch(0.96 0.02 200)', border: '1px solid oklch(0.88 0.04 200)', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 10 }}>
        <Icon name="sparkle" size={16} color="oklch(0.55 0.12 200)" />
        <p style={{ font: '400 13px/1.5 Inter', color: 'oklch(0.40 0.08 200)', margin: 0 }}>
          We will connect your profile to potential users based on the details you provide, so please ensure your information is accurate and complete.
        </p>
      </div>

      {/* Confirm checkbox */}
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
        <input type="checkbox" checked={data.confirmed} onChange={e => set('confirmed', e.target.checked)}
          style={{ width: 18, height: 18, marginTop: 1, accentColor: 'var(--accent)', flexShrink: 0 }}
        />
        <span style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-2)' }}>
          I confirm that the information provided is accurate and I agree to make my profile visible to potential patients.
        </span>
      </label>
    </div>
  );
};

// ── SUCCESS ────────────────────────────────────────────────────────────────────
const SuccessScreen = ({ onHome }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'oklch(0.94 0.06 145)', display: 'grid', placeItems: 'center', margin: '0 auto 28px' }}>
        <Icon name="check-badge" size={40} color="var(--green)" />
      </div>
      <h1 style={{ font: '700 30px/1.1 Inter', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
        Application submitted!
      </h1>
      <p style={{ font: '400 15px/1.6 Inter', color: 'var(--ink-3)', margin: '0 0 10px' }}>
        Your profile has been submitted for review.
      </p>
      <p style={{ font: '400 14px/1.6 Inter', color: 'var(--ink-3)', margin: '0 0 36px', background: 'var(--bg-alt)', borderRadius: 10, padding: '12px 16px', border: '1px solid var(--line-2)' }}>
        Our team will review your profile within <strong>24 hours</strong> to ensure everything meets the platform's standards. You'll receive an email once it's approved and live.
      </p>
      <button onClick={onHome} style={{
        padding: '14px 36px', borderRadius: 12, border: 'none',
        background: 'var(--accent)', color: 'white',
        font: '600 15px/1 Inter', cursor: 'pointer',
      }}>
        Back to home
      </button>
    </div>
  </div>
);

// ── MAIN ───────────────────────────────────────────────────────────────────────
const defaultHours = DAYS.reduce((acc, d) => ({
  ...acc,
  [d]: { active: !['Sat', 'Sun'].includes(d), from: '09:00', to: '17:00' },
}), {});

export default function JoinAsPartner() {
  const navigate = useNavigate();
  const [screen, setScreen]       = useState('category'); // category | welcome | form
  const [formStep, setFormStep]   = useState(1);           // 1–4 within form
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    category: '',
    fullName: '', title: '', email: '', phone: '', password: '', confirmPassword: '',
    clinicName: '', specialization: '', city: '', state: '', zip: '',
    services: [], allServices: [...DEFAULT_SERVICES],
    hours: defaultHours,
    degree: '', certSpec: '', licenseNumber: '',
    certifications: [{ name: '', issuer: '', link: '' }],
    confirmed: false,
  });

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const canNext = () => {
    if (formStep === 1) return !!(data.fullName && data.email && data.password);
    if (formStep === 2) return !!(data.specialization && data.city && data.state);
    if (formStep === 3) return !!(data.degree);
    if (formStep === 4) return data.confirmed;
    return true;
  };

  if (submitted) return <SuccessScreen onHome={() => navigate('/')} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--line-2)',
        padding: '0 32px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <img src={logo} alt="whyclick" style={{ height: 26, cursor: 'pointer' }} onClick={() => navigate('/')} />
        {screen === 'form' && (
          <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>
            Step {formStep} of 4
          </span>
        )}
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', font: '500 13px/1 Inter', color: 'var(--ink-3)', cursor: 'pointer' }}>
          ← Back to site
        </button>
      </header>

      {/* Category screen — full page, no inner card */}
      {screen === 'category' && (
        <CategoryScreen
          value={data.category}
          onChange={v => set('category', v)}
          onNext={() => setScreen('form')}
        />
      )}

      {/* Welcome screen */}
      {/* Form steps */}
      {screen === 'form' && (
        <div style={{ maxWidth: 680, margin: '48px auto', padding: '0 24px 80px' }}>
          <div style={{ background: 'var(--bg)', borderRadius: 20, border: '1px solid var(--line-2)', padding: '40px 48px', boxShadow: '0 8px 48px -16px rgba(20,15,10,0.12)' }}>
            <StepBar current={formStep} />

            {formStep === 1 && <PersonalStep data={data} set={set} />}
            {formStep === 2 && <ServiceStep data={data} set={set} />}
            {formStep === 3 && <CertsStep data={data} set={set} />}
            {formStep === 4 && <ReviewStep data={data} set={set} />}

            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
              <button
                onClick={() => formStep === 1 ? setScreen('category') : setFormStep(s => s - 1)}
                style={{
                  padding: '11px 22px', borderRadius: 10,
                  border: '1.5px solid var(--line)', background: 'transparent',
                  font: '500 14px/1 Inter', color: 'var(--ink)', cursor: 'pointer',
                }}
              >
                ← Back
              </button>

              <button
                onClick={formStep === 4 ? () => setSubmitted(true) : () => setFormStep(s => s + 1)}
                disabled={!canNext()}
                style={{
                  padding: '12px 28px', borderRadius: 10, border: 'none',
                  background: canNext() ? 'var(--accent)' : 'oklch(0.88 0.01 80)',
                  color: canNext() ? 'white' : 'var(--ink-3)',
                  font: '600 14px/1 Inter', cursor: canNext() ? 'pointer' : 'default',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { if (canNext()) e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                {formStep === 4 ? 'Submit Profile for Review' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

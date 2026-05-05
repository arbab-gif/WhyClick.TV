export const Avatar = ({ size = 56, seed = 0, ring = false, label }) => {
  const hue = 30 + (seed * 47) % 60;
  const id = `av-${seed}-${size}`;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      overflow: 'hidden', flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` : 'inset 0 0 0 1px var(--line)',
      position: 'relative',
    }} aria-label={label || 'professional portrait'}>
      <svg width={size} height={size} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill={`oklch(0.92 0.04 ${hue})`} />
            <rect width="3" height="6" fill={`oklch(0.86 0.06 ${hue})`} />
          </pattern>
        </defs>
        <rect width="56" height="56" fill={`url(#${id})`} />
        <circle cx="28" cy="22" r="9" fill={`oklch(0.78 0.05 ${hue})`} opacity="0.7" />
        <path d={`M8 56 C 10 40, 46 40, 48 56 Z`} fill={`oklch(0.78 0.05 ${hue})`} opacity="0.7" />
      </svg>
    </div>
  );
};

export const PhotoPlaceholder = ({ ratio = '4/3', label = 'photo', accent = false, src, style: extraStyle = {} }) => {
  const hue = accent ? 35 : 80;
  const id = `ph-${label.replace(/\s/g, '')}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div style={{
      aspectRatio: ratio,
      width: '100%',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      position: 'relative',
      background: `oklch(0.94 0.01 ${hue})`,
      boxShadow: 'inset 0 0 0 1px var(--line)',
      ...extraStyle,
    }}>
      {src ? (
        <img src={src} alt={label} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <>
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(35)">
                <rect width="10" height="10" fill={accent ? 'oklch(0.93 0.04 35)' : 'oklch(0.94 0.01 80)'} />
                <rect width="5" height="10" fill={accent ? 'oklch(0.88 0.06 35)' : 'oklch(0.90 0.012 80)'} />
              </pattern>
            </defs>
            <rect width="400" height="300" fill={`url(#${id})`} />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', padding: 12,
            font: '500 11px/1.2 Inter',
            color: 'oklch(0.35 0.02 80)',
            letterSpacing: '0.02em',
          }}>
            <span style={{ background: 'rgba(255,255,255,0.7)', padding: '3px 7px', borderRadius: 4 }}>
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export const Icon = ({ name, size = 16, stroke = 1.5, color = 'currentColor' }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'pin': return <svg {...props}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
    case 'arrow-up-right': return <svg {...props}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case 'star': return <svg {...props} fill={color}><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6.1L12 16.8l-5.4 2.8L7.8 13.5 3.3 9.3l6.1-.7L12 3Z"/></svg>;
    case 'check': return <svg {...props}><path d="m4 12 5 5L20 6"/></svg>;
    case 'check-badge': return <svg {...props}><path d="M12 2.5 14 4l2.5-.3 1.3 2.2 2.2 1.3L19.7 9.7 21 12l-1.3 2.3.3 2.5-2.2 1.3L16.5 20.3 14 20l-2 1.5L10 20l-2.5.3-1.3-2.2L4 16.8 4.3 14.3 3 12l1.3-2.3L4 7.2l2.2-1.3L7.5 3.7 10 4l2-1.5Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'tooth': return <svg {...props}><path d="M7 3.5c-2 0-3.5 1.5-3.5 3.5 0 2 .8 4 1.5 6 .5 1.4.7 3 .9 4.7.2 1.6.6 2.8 1.6 2.8 1.1 0 1.4-1.5 1.6-3.5.2-2 .9-3 1.9-3s1.7 1 1.9 3c.2 2 .5 3.5 1.6 3.5 1 0 1.4-1.2 1.6-2.8.2-1.7.4-3.3.9-4.7.7-2 1.5-4 1.5-6 0-2-1.5-3.5-3.5-3.5-1.5 0-2.5 1-4 1s-2.5-1-4-1Z"/></svg>;
    case 'fork': return <svg {...props}><path d="M7 3v8a2 2 0 0 0 2 2v8"/><path d="M11 3v8"/><path d="M5 3v4"/><path d="M17 3c-1.5 0-3 1.5-3 4s1.5 4 3 4v10"/></svg>;
    case 'briefcase': return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>;
    case 'scissors': return <svg {...props}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.5 15.5"/><path d="M20 20 8.5 8.5"/></svg>;
    case 'wrench': return <svg {...props}><path d="M14.5 4a4.5 4.5 0 0 0-5.5 5.5L3 15.5 8.5 21l6-6A4.5 4.5 0 0 0 20 9.5l-3 3-2.5-2.5 3-3A4.5 4.5 0 0 0 14.5 4Z"/></svg>;
    case 'home': return <svg {...props}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>;
    case 'camera': return <svg {...props}><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6 9.5 4h5L16 6"/></svg>;
    case 'dollar': return <svg {...props}><path d="M12 3v18M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8"/></svg>;
    case 'calendar': return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'menu': return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'sliders': return <svg {...props}><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0M16 4v4M8 10v4M14 16v4"/></svg>;
    case 'chevron-down': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'sparkle': return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l3.5 3.5M15 15l3.5 3.5M5.5 18.5 9 15M15 9l3.5-3.5"/></svg>;
    case 'message': return <svg {...props}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z"/></svg>;
    case 'play': return <svg {...props} fill={color}><path d="M7 4v16l13-8Z"/></svg>;
    default: return null;
  }
};

export const Tag = ({ children, tone = 'neutral', size = 'md' }) => {
  const tones = {
    neutral: { bg: 'var(--bg-alt)', fg: 'var(--ink-2)', bd: 'var(--line)' },
    accent:  { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)', bd: 'transparent' },
    green:   { bg: 'var(--green-soft)', fg: 'oklch(0.32 0.10 145)', bd: 'transparent' },
    ink:     { bg: 'var(--ink)', fg: 'var(--bg)', bd: 'var(--ink)' },
  };
  const t = tones[tone] || tones.neutral;
  const sz = size === 'sm' ? { font: '500 11px/1 Inter', pad: '5px 8px' } : { font: '500 12px/1 Inter', pad: '6px 10px' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 999,
      padding: sz.pad,
      font: sz.font,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
};

export const Btn = ({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, style: extraStyle = {} }) => {
  const sizes = {
    sm: { padding: '8px 14px', font: '500 13px/1 Inter', radius: 8 },
    md: { padding: '12px 18px', font: '500 14px/1 Inter', radius: 10 },
    lg: { padding: '16px 24px', font: '500 16px/1 Inter', radius: 12 },
  };
  const variants = {
    primary: { bg: 'var(--accent)', fg: 'white', bd: 'var(--accent)' },
    accent:  { bg: 'var(--accent)', fg: 'white', bd: 'var(--accent)' },
    dark:    { bg: 'var(--ink)', fg: 'var(--bg)', bd: 'var(--ink)' },
    outline: { bg: 'transparent', fg: 'var(--ink)', bd: 'var(--line)' },
    ghost:   { bg: 'transparent', fg: 'var(--ink)', bd: 'transparent' },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: v.bg, color: v.fg,
      border: `1px solid ${v.bd}`,
      padding: s.padding, font: s.font, borderRadius: s.radius,
      cursor: 'pointer', transition: 'transform .12s ease, background .15s ease',
      ...extraStyle,
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'translateY(1px)'}
    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 18 : 16} />}
    </button>
  );
};

export const Container = ({ children, max = 1240, style: extraStyle = {} }) => (
  <div style={{ maxWidth: max, margin: '0 auto', padding: '0 32px', ...extraStyle }}>{children}</div>
);

export const SectionHeader = ({ eyebrow, title, sub, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
    <div style={{ maxWidth: 640 }}>
      {eyebrow && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          <span className="mono" style={{ font: '500 11px/1 Inter', color: 'var(--ink-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{eyebrow}</span>
        </div>
      )}
      <h2 className="serif" style={{ font: '700 44px/1.05 Inter, sans-serif', margin: 0, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{title}</h2>
      {sub && <p style={{ margin: '14px 0 0', color: 'var(--ink-2)', fontSize: 16, maxWidth: 560 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

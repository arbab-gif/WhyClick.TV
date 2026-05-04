import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { Icon, Tag, Btn } from '../components/primitives';
import AskAIFab from '../components/AskAIFab';
import logo from '../assets/whyclick-logo.png';

// ── DATA ──────────────────────────────────────────────────────────────────────
const DENTISTS = [
  { id: 1,  name: 'Dr. Maya Patel',    clinic: 'Patel Pediatric Dental',   rating: 4.9, reviews: 412, distance: 0.6, lat: 40.7155, lng: -73.9540, treatments: ['Pediatric', 'Cleaning', 'Whitening'],    price: 85,  fee: 'Consult $85',  avail: 'Today · 3:00 PM',        insurance: ['Aetna', 'BCBS', 'Cigna'],           gender: 'female', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop', address: '142 Bedford Ave, Brooklyn' },
  { id: 2,  name: 'Dr. Ali Awan',      clinic: 'Bridge St. Family Dental',  rating: 5.0, reviews: 487, distance: 0.9, lat: 40.7068, lng: -73.9442, treatments: ['Family', 'Cleaning', 'Pediatric'],       price: 60,  fee: 'Consult $60',  avail: 'Tomorrow · 10:30 AM',    insurance: ['Aetna', 'Delta'],                   gender: 'male',   img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop', address: '88 Bridge St, Brooklyn' },
  { id: 3,  name: 'Dr. Lena Vogel',    clinic: 'Vogel Orthodontics',         rating: 4.8, reviews: 91,  distance: 1.2, lat: 40.7232, lng: -73.9580, treatments: ['Orthodontics', 'Aligners', 'Braces'],    price: 120, fee: 'Consult $120', avail: 'Mon, May 4 · 2:00 PM',  insurance: ['BCBS', 'Cigna', 'United'],          gender: 'female', img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80&auto=format&fit=crop', address: '25 Greenpoint Ave, Brooklyn' },
  { id: 13, name: 'Dr. James Okafor',  clinic: 'Smile Studio NYC',           rating: 4.7, reviews: 256, distance: 1.4, lat: 40.7100, lng: -73.9700, treatments: ['Cosmetic', 'Whitening', 'Veneers'],      price: 200, fee: 'Consult $200', avail: 'Today · 5:30 PM',        insurance: ['Aetna'],                            gender: 'male',   img: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600&q=80&auto=format&fit=crop', address: '310 Broadway, Williamsburg' },
  { id: 14, name: 'Dr. Priya Shah',    clinic: 'Greenpoint Dental Co.',      rating: 4.9, reviews: 184, distance: 1.7, lat: 40.7280, lng: -73.9510, treatments: ['Cleaning', 'Cosmetic', 'Whitening'],     price: 75,  fee: 'Consult $75',  avail: 'Wed, May 6 · 11:00 AM', insurance: ['BCBS', 'Delta', 'Aetna', 'Cigna'],  gender: 'female', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop', address: '78 Manhattan Ave, Greenpoint' },
  { id: 15, name: 'Dr. Marcus Reyes',  clinic: 'BK Endodontics',             rating: 4.6, reviews: 142, distance: 2.1, lat: 40.6985, lng: -73.9620, treatments: ['Root Canal', 'Endodontics', 'Sedation'], price: 150, fee: 'Consult $150', avail: 'Fri, May 8 · 9:00 AM',  insurance: ['United', 'Cigna'],                  gender: 'male',   img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&auto=format&fit=crop', address: '512 Atlantic Ave, Brooklyn' },
  { id: 16, name: 'Dr. Sarah Kim',     clinic: 'Park Slope Periodontics',    rating: 4.8, reviews: 97,  distance: 2.4, lat: 40.6728, lng: -73.9785, treatments: ['Gum Care', 'Implants', 'Cleaning'],      price: 175, fee: 'Consult $175', avail: 'Thu, May 7 · 1:00 PM',  insurance: ['BCBS', 'Aetna'],                    gender: 'female', img: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=600&q=80&auto=format&fit=crop', address: '456 7th Ave, Park Slope' },
  { id: 17, name: 'Dr. Omar Hassan',   clinic: 'Hassan Oral Surgery',        rating: 4.7, reviews: 211, distance: 2.7, lat: 40.6944, lng: -73.9213, treatments: ['Extractions', 'Implants', 'Surgery'],    price: 230, fee: 'Consult $230', avail: 'Today · 4:00 PM',        insurance: ['United', 'Aetna', 'Delta'],         gender: 'male',   img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80&auto=format&fit=crop', address: '218 Knickerbocker Ave, Bushwick' },
  { id: 18, name: 'Dr. Nina Clarke',   clinic: 'Clarke Emergency Dental',    rating: 4.9, reviews: 329, distance: 3.1, lat: 40.6501, lng: -73.9496, treatments: ['Emergency', 'Cleaning', 'Crowns'],        price: 95,  fee: 'Consult $95',  avail: 'Today · 6:00 PM',        insurance: ['Aetna', 'BCBS', 'Cigna', 'United'], gender: 'female', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&auto=format&fit=crop', address: '900 Flatbush Ave, Brooklyn' },
];

const ALL_TREATMENTS = ['Cleaning', 'Whitening', 'Pediatric', 'Cosmetic', 'Orthodontics', 'Aligners', 'Family', 'Veneers', 'Root Canal', 'Gum Care', 'Implants', 'Emergency', 'Extractions', 'Sedation', 'Crowns'];

// ── TOP BAR ───────────────────────────────────────────────────────────────────
const TopBar = () => {
  const navigate = useNavigate();
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      background: 'oklch(0.985 0.005 80 / 0.92)',
      backdropFilter: 'saturate(180%) blur(16px)',
      borderBottom: '1px solid var(--line-2)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, gap: 24 }}>
        <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="whyclick.tv" style={{ height: 32, width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#" style={{ padding: '8px 12px', borderRadius: 8, font: '500 14px/1 Inter', color: 'var(--ink-2)' }}>Sign in</a>
          <Btn variant="primary" size="sm" iconRight="arrow-right">Join as a partner</Btn>
        </div>
      </div>
    </header>
  );
};

// ── SEARCH SUB-BAR ────────────────────────────────────────────────────────────
const SearchSubBar = ({ location, onLocationChange, query, onQueryChange }) => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)', padding: '20px 24px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 Inter', color: 'var(--ink-3)' }}>
          <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>Home</a>
          <Icon name="chevron-right" size={12} />
          <span style={{ color: 'var(--ink)' }}>Dentists</span>
        </div>
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 0,
          background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 999,
          padding: 4, minWidth: 480, maxWidth: 600, flex: 1 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', flex: 1 }}>
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input value={query} onChange={e => onQueryChange(e.target.value)}
              placeholder="What can we help you with?"
              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent',
                font: '500 14px/1.4 Inter', color: 'var(--ink)', padding: '10px 0' }} />
          </label>
          <span style={{ width: 1, height: 24, background: 'var(--line-2)' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', minWidth: 200 }}>
            <Icon name="pin" size={16} color="var(--accent)" />
            <input value={location} onChange={e => onLocationChange(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent',
                font: '500 13px/1.4 Inter', color: 'var(--ink)', padding: '10px 0' }} />
          </label>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent)', color: 'white', border: 'none',
            display: 'grid', placeItems: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <Icon name="search" size={14} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── FILTER PANEL ──────────────────────────────────────────────────────────────
const Pill = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '7px 12px', borderRadius: 999,
    border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
    background: active ? 'var(--accent-soft)' : 'var(--bg)',
    color: active ? 'var(--accent-ink)' : 'var(--ink-2)',
    font: '500 12px/1 Inter', cursor: 'pointer', transition: 'all .15s',
  }}>{children}</button>
);

const FilterGroup = ({ title, children }) => (
  <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--line-2)' }}>
    <div style={{ font: '600 13px/1 Inter', color: 'var(--ink)', marginBottom: 12 }}>{title}</div>
    {children}
  </div>
);

const FilterPanel = ({ filters, setFilters, hideHeader = false, onClose }) => {
  const toggleArr = (key, val) => {
    const arr = filters[key];
    setFilters({ ...filters, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] });
  };
  const resetFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <div style={{ padding: 0 }}>
      {!hideHeader && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ font: '700 18px/1 Inter', letterSpacing: '-0.01em' }}>Filters</div>
          <button onClick={resetFilters} style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: '500 12px/1 Inter', color: 'var(--accent)' }}>Reset</button>
        </div>
      )}

      <FilterGroup title="Treatment type">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {ALL_TREATMENTS.map(t => (
            <Pill key={t} active={filters.treatments.includes(t)} onClick={() => toggleArr('treatments', t)}>{t}</Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={`Price (max $${filters.priceMax})`}>
        <input type="range" min="50" max="300" step="10"
          value={filters.priceMax}
          onChange={e => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 11px/1 Inter', color: 'var(--ink-3)', marginTop: 6 }}>
          <span>$50</span><span>$300+</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[4.5, 4.0, 3.5].map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="radio" name="rating" checked={filters.minRating === r}
                onChange={() => setFilters({ ...filters, minRating: r })}
                style={{ accentColor: 'var(--accent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1,2,3,4,5].map(i => (
                  <Icon key={i} name="star" size={12} color={i <= Math.floor(r) ? 'var(--gold)' : 'var(--line)'} />
                ))}
                <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', marginLeft: 4 }}>{r}+</span>
              </div>
            </label>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="radio" name="rating" checked={filters.minRating === 0}
              onChange={() => setFilters({ ...filters, minRating: 0 })}
              style={{ accentColor: 'var(--accent)' }} />
            <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Any rating</span>
          </label>
        </div>
      </FilterGroup>

      <FilterGroup title={`Distance (within ${filters.maxDistance} mi)`}>
        <input type="range" min="0.5" max="5" step="0.1"
          value={filters.maxDistance}
          onChange={e => setFilters({ ...filters, maxDistance: parseFloat(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 11px/1 Inter', color: 'var(--ink-3)', marginTop: 6 }}>
          <span>0.5 mi</span><span>5 mi</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Gender preference">
        <div style={{ display: 'flex', gap: 6 }}>
          {[{v: 'any', l: 'Any'}, {v: 'female', l: 'Female'}, {v: 'male', l: 'Male'}].map(g => (
            <Pill key={g.v} active={filters.gender === g.v} onClick={() => setFilters({ ...filters, gender: g.v })}>{g.l}</Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Today', 'This week', 'Anytime'].map(a => (
            <Pill key={a} active={filters.avail === a} onClick={() => setFilters({ ...filters, avail: a })}>{a}</Pill>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
};

const countActiveFilters = (f) => (
  (f.treatments?.length || 0) +
  (f.gender !== 'any' ? 1 : 0) +
  (f.avail !== 'Anytime' ? 1 : 0) +
  (f.minRating > 0 ? 1 : 0) +
  (f.priceMax < 300 ? 1 : 0) +
  (f.maxDistance < 5 ? 1 : 0)
);

const INITIAL_FILTERS = { treatments: [], priceMax: 300, minRating: 0, maxDistance: 5, insurance: [], gender: 'any', avail: 'Anytime' };

const FilterButton = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const count = countActiveFilters(filters);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', borderRadius: 999,
        background: open ? 'var(--ink)' : 'var(--bg)',
        color: open ? 'var(--bg)' : 'var(--ink)',
        border: `1px solid ${open ? 'var(--ink)' : 'var(--line)'}`,
        font: '500 13px/1 Inter', cursor: 'pointer',
        transition: 'all .15s',
      }}>
        <Icon name="sliders" size={14} color={open ? 'var(--bg)' : 'var(--ink)'} />
        Filters
        {count > 0 && (
          <span style={{
            display: 'inline-grid', placeItems: 'center',
            minWidth: 20, height: 20, padding: '0 6px',
            borderRadius: 999, background: 'var(--accent)',
            color: 'white', font: '600 11px/1 Inter',
          }}>{count}</span>
        )}
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'oklch(0.18 0.02 40 / 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'grid', placeItems: 'center',
          padding: '24px',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 560,
            background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 16,
            boxShadow: '0 32px 64px -16px rgba(40,30,20,.32)',
            display: 'flex', flexDirection: 'column',
            maxHeight: 'calc(100vh - 48px)', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 24px', borderBottom: '1px solid var(--line-2)' }}>
              <div style={{ font: '700 18px/1 Inter', letterSpacing: '-0.01em' }}>Filters</div>
              <button onClick={() => setOpen(false)} style={{
                width: 32, height: 32, borderRadius: 8, border: 'none',
                background: 'var(--bg-alt)', color: 'var(--ink-2)', cursor: 'pointer',
                display: 'grid', placeItems: 'center', font: '500 18px/1 Inter',
              }}>×</button>
            </div>
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <FilterPanel filters={filters} setFilters={setFilters} hideHeader />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
              padding: '16px 24px', borderTop: '1px solid var(--line-2)' }}>
              <button onClick={() => setFilters(INITIAL_FILTERS)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                font: '500 13px/1 Inter', color: 'var(--ink-2)',
              }}>Clear all</button>
              <Btn variant="primary" size="md" onClick={() => setOpen(false)}>Show results</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── DENTIST CARD ──────────────────────────────────────────────────────────────
const DentistCard = ({ d, active, hovered, onHover, onViewProfile }) => (
  <article
    data-id={d.id}
    onMouseEnter={() => onHover(d.id)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onViewProfile(d.id)}
    style={{
      display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0,
      background: 'var(--bg)',
      border: `1px solid ${active ? 'var(--accent)' : (hovered ? 'var(--ink-3)' : 'var(--line)')}`,
      borderRadius: 14,
      overflow: 'hidden', cursor: 'pointer',
      boxShadow: active ? '0 0 0 3px var(--accent-soft)' : (hovered ? '0 8px 24px -12px rgba(40,30,20,.18)' : 'none'),
      transition: 'border-color .15s, box-shadow .15s',
    }}>
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 180 }}>
      <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
    </div>
    <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Name + checkmark + rating */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <div style={{ font: '600 16px/1.25 Inter', letterSpacing: '-0.01em', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-label="Verified">
            <circle cx="12" cy="12" r="12" fill="var(--green)" />
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <Icon name="star" size={13} color="var(--gold)" />
          <span style={{ font: '600 13px/1 Inter' }}>{d.rating}</span>
          <span style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>({d.reviews})</span>
        </div>
      </div>
      {/* Clinic */}
      <div style={{ font: '400 13px/1.3 Inter', color: 'var(--ink-2)', marginBottom: 8 }}>{d.clinic}</div>
      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {d.treatments.slice(0, 3).map(t => (
          <span key={t} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line-2)', font: '500 11px/1.4 Inter', color: 'var(--ink-2)' }}>{t}</span>
        ))}
      </div>
      {/* Address */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 16 }}>
        <Icon name="pin" size={12} /> {d.distance} mi · {d.address}
      </div>
      {/* Price + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 14, borderTop: '1px solid var(--line-2)', marginTop: 'auto' }}>
        <div>
          <span style={{ font: '700 20px/1 Inter', color: 'var(--ink)', letterSpacing: '-0.02em' }}>${d.price}</span>
          <span style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)', marginLeft: 5 }}>/ consult</span>
        </div>
        <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={e => { e.stopPropagation(); onViewProfile(d.id); }}>View profile</Btn>
      </div>
    </div>
  </article>
);

// ── ACTIVE CHIP ───────────────────────────────────────────────────────────────
const ActiveChip = ({ label, onRemove }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '5px 5px 5px 12px', borderRadius: 999,
    background: 'var(--accent-soft)', color: 'var(--accent-ink)',
    border: '1px solid var(--accent)',
    font: '500 12px/1 Inter',
  }}>
    {label}
    <button onClick={onRemove} style={{
      width: 20, height: 20, borderRadius: '50%',
      background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
      display: 'grid', placeItems: 'center', font: '600 12px/1 Inter',
    }}>×</button>
  </span>
);

// ── MAP VIEW ──────────────────────────────────────────────────────────────────
function makePinHTML(d, active, hover) {
  if (active) {
    return `<div style="display:inline-flex;align-items:center;background:#FC5647;color:white;border:2px solid white;border-radius:999px;padding:5px 10px;font:700 12px/1 Inter,sans-serif;box-shadow:0 4px 12px -2px rgba(199,58,44,.5);white-space:nowrap;cursor:pointer;">$${d.price}</div>`;
  }
  const color = hover ? '#C73A2C' : '#FC5647';
  const size = hover ? 22 : 18;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 3px 10px -2px rgba(199,58,44,.45);cursor:pointer;"></div>`;
}

const MapView = ({ items, activeId, onPinClick, onPinHover, hoveredId, collapsed, onToggleCollapse }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (collapsed || !containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([40.7155, -73.9540], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 50);
  }, [collapsed]);

  useEffect(() => {
    if (!mapRef.current) return;
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    items.forEach(d => {
      const isActive = d.id === activeId;
      const isHover = d.id === hoveredId;
      const icon = L.divIcon({
        className: 'wc-pin',
        html: makePinHTML(d, isActive, isHover),
        iconSize: isActive ? [56, 28] : [22, 22],
        iconAnchor: isActive ? [28, 14] : [11, 11],
      });
      const marker = L.marker([d.lat, d.lng], { icon, riseOnHover: true })
        .addTo(mapRef.current)
        .on('click', () => onPinClick(d.id))
        .on('mouseover', () => onPinHover(d.id))
        .on('mouseout', () => onPinHover(null));
      markersRef.current[d.id] = marker;
    });

    if (items.length > 0) {
      const bounds = L.latLngBounds(items.map(i => [i.lat, i.lng]));
      mapRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
  }, [items, activeId, hoveredId, onPinClick, onPinHover]);

  useEffect(() => {
    if (!mapRef.current || !activeId) return;
    const m = markersRef.current[activeId];
    if (m) mapRef.current.panTo(m.getLatLng(), { animate: true, duration: 0.4 });
  }, [activeId]);

  if (collapsed) {
    return (
      <div style={{ width: 56, flexShrink: 0, position: 'sticky', top: 64,
        height: 'calc(100vh - 64px)', borderLeft: '1px solid var(--line-2)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 24 }}>
        <button onClick={onToggleCollapse} style={{
          background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 10,
          padding: '10px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8, font: '600 11px/1.2 Inter', color: 'var(--ink-2)',
        }}>
          <Icon name="pin" size={16} color="var(--accent)" />
          <span style={{ writingMode: 'vertical-rl' }}>Show map</span>
        </button>
      </div>
    );
  }

  return (
    <aside style={{ width: 460, flexShrink: 0, position: 'sticky', top: 64,
      height: 'calc(100vh - 64px)', borderLeft: '1px solid var(--line-2)',
      display: 'flex', flexDirection: 'column', background: 'oklch(0.97 0.005 80)' }}>
      <div style={{
        position: 'absolute', top: 16, left: 16, zIndex: 500,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 999,
        padding: '7px 12px', boxShadow: '0 2px 8px -2px rgba(40,30,20,.12)',
      }}>
        <Icon name="pin" size={13} color="var(--accent)" />
        <span style={{ font: '600 12px/1 Inter' }}>{items.length} dentists in this area</span>
      </div>
      <button onClick={onToggleCollapse} style={{
        position: 'absolute', top: 16, right: 16, zIndex: 500,
        background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8,
        padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        font: '500 12px/1 Inter', color: 'var(--ink-2)',
      }}>
        <Icon name="chevron-right" size={12} />
        Collapse
      </button>
      <div ref={containerRef} style={{ flex: 1, width: '100%', height: '100%' }} />
    </aside>
  );
};

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function DentistListing() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Brooklyn, NY · 11211');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const [sort, setSort] = useState('distance');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const cardRefs = useRef({});

  const filtered = useMemo(() => {
    let list = DENTISTS.filter(d => {
      if (d.price > filters.priceMax) return false;
      if (filters.minRating > 0 && d.rating < filters.minRating) return false;
      if (d.distance > filters.maxDistance) return false;
      if (filters.gender !== 'any' && d.gender !== filters.gender) return false;
      if (filters.treatments.length && !filters.treatments.some(t => d.treatments.includes(t))) return false;
      if (filters.insurance.length && !filters.insurance.some(i => d.insurance.includes(i))) return false;
      if (filters.avail === 'Today' && !d.avail.startsWith('Today')) return false;
      if (query && !(d.name + d.clinic + d.treatments.join(' ')).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === 'distance') list.sort((a, b) => a.distance - b.distance);
    if (sort === 'rating')   list.sort((a, b) => b.rating - a.rating);
    if (sort === 'price')    list.sort((a, b) => a.price - b.price);
    return list;
  }, [filters, query, sort]);

  const handlePinClick = (id) => {
    setActiveId(id);
    const el = cardRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <TopBar />
      <SearchSubBar
        location={location} onLocationChange={setLocation}
        query={query} onQueryChange={setQuery}
      />
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <main style={{ flex: 1, minWidth: 0, padding: '24px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ margin: 0, font: '700 28px/1.1 Inter', letterSpacing: '-0.02em' }}>
              {filtered.length} dentists near {location.split(' · ')[0]}
            </h1>
            <p style={{ margin: '6px 0 0', font: '400 14px/1.4 Inter', color: 'var(--ink-3)' }}>
              Sorted by {sort === 'distance' ? 'distance' : sort === 'rating' ? 'rating' : 'price'} · Showing within {filters.maxDistance} mi
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
            <FilterButton filters={filters} setFilters={setFilters} />
            <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--bg)',
              borderRadius: 999, border: '1px solid var(--line)' }}>
              {[{ id: 'distance', label: 'Closest' }, { id: 'rating', label: 'Top rated' }, { id: 'price', label: 'Lowest price' }].map(s => (
                <button key={s.id} onClick={() => setSort(s.id)} style={{
                  padding: '7px 14px', borderRadius: 999, border: 'none',
                  background: sort === s.id ? 'var(--ink)' : 'transparent',
                  color: sort === s.id ? 'var(--bg)' : 'var(--ink-2)',
                  font: '500 12px/1 Inter', cursor: 'pointer', transition: 'all .15s',
                }}>{s.label}</button>
              ))}
            </div>
          </div>

          {(filters.treatments.length > 0 || filters.gender !== 'any' || filters.avail !== 'Anytime' || filters.minRating > 0) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {filters.treatments.map(t => (
                <ActiveChip key={`t-${t}`} label={t} onRemove={() => setFilters({ ...filters, treatments: filters.treatments.filter(x => x !== t) })} />
              ))}
              {filters.gender !== 'any' && (
                <ActiveChip label={filters.gender === 'female' ? 'Female' : 'Male'} onRemove={() => setFilters({ ...filters, gender: 'any' })} />
              )}
              {filters.avail !== 'Anytime' && (
                <ActiveChip label={filters.avail} onRemove={() => setFilters({ ...filters, avail: 'Anytime' })} />
              )}
              {filters.minRating > 0 && (
                <ActiveChip label={`${filters.minRating}+ stars`} onRemove={() => setFilters({ ...filters, minRating: 0 })} />
              )}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(d => (
              <div key={d.id} ref={el => cardRefs.current[d.id] = el}>
                <DentistCard
                  d={d}
                  active={activeId === d.id}
                  hovered={hoveredId === d.id}
                  onHover={setHoveredId}
                  onClick={setActiveId}
                  onViewProfile={id => navigate(`/dentists/${id}`)}
                />
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '64px 24px', textAlign: 'center',
                background: 'var(--bg-alt)', borderRadius: 14, border: '1px dashed var(--line)' }}>
                <div style={{ font: '600 18px/1.3 Inter', marginBottom: 6 }}>No dentists match your filters</div>
                <div style={{ font: '400 14px/1.4 Inter', color: 'var(--ink-3)', marginBottom: 16 }}>
                  Try widening your distance or removing a filter.
                </div>
                <Btn variant="primary" size="sm" onClick={() => setFilters(INITIAL_FILTERS)}>Reset filters</Btn>
              </div>
            )}
          </div>
        </main>

        <MapView
          items={filtered}
          activeId={activeId}
          hoveredId={hoveredId}
          onPinClick={handlePinClick}
          onPinHover={setHoveredId}
          collapsed={mapCollapsed}
          onToggleCollapse={() => setMapCollapsed(c => !c)}
        />
      </div>
      <AskAIFab />
    </>
  );
}

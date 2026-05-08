import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/primitives';
import logo from '../assets/whyclick-logo.png';
import SiteNav from '../components/SiteNav';

// ── INDUSTRY CONFIGS ──────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: 'fork',
    sub: 'Dining, cafes & food service',
    accent: '#DC2626',
    accentBg: '#FEF2F2',
    cardHover: '#FEF2F2',
    clinicLabel: 'Restaurant / Business Name',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Bring more diners to your table — grow on whyclick.tv',
    stat: '300+ Restaurants',
    specializations: [
      'Fine Dining','Casual Dining','Cafe / Bakery','Bar & Grill','Fast Food',
      'Food Truck','Catering','Buffet','Breakfast / Brunch','Seafood',
      'Vegetarian / Vegan','Pizza',
    ],
    services: [
      'Dine-In','Takeout','Delivery','Catering','Private Events',
      'Reservation','Online Ordering','Happy Hour','Brunch','Late Night',
    ],
    degrees: [
      'Food Handler Certification','ServSafe Certification',
      'Culinary Arts Degree','Business License','None required',
    ],
    priceLabel: 'Initial Booking Price',
    pricePlaceholder: '25',
    priceHint: '',
    licenseLabel: 'Food Service License Number',
    licenseHint: 'Your local food service or restaurant license number',
  },
  {
    id: 'dentist',
    label: 'Dentist',
    icon: 'tooth',
    sub: 'Dental care & oral health',
    accent: '#2563EB',
    accentBg: '#EFF6FF',
    cardHover: '#EFF6FF',
    clinicLabel: 'Clinic / Practice Name',
    images: [
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffbb172954a?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Join thousands of dental professionals already growing on whyclick.tv',
    stat: '500+ Dental Professionals',
    specializations: [
      'General Dentistry','Orthodontics','Cosmetic Dentistry','Pediatric Dentistry',
      'Periodontics','Endodontics','Oral Surgery','Prosthodontics','Implantology',
    ],
    services: [
      'Teeth Cleaning','Teeth Whitening','Dental Fillings','Root Canal','Dental Implants',
      'Braces / Aligners','Veneers','Crowns & Bridges','Extractions','Pediatric Care',
      'Emergency Dental','Gum Treatment',
    ],
    degrees: [
      'DDS – Doctor of Dental Surgery','DMD – Doctor of Medicine in Dentistry',
      'BDS – Bachelor of Dental Surgery','MDS – Master of Dental Surgery','Other',
    ],
    priceLabel: 'Starting Service Price',
    pricePlaceholder: '75',
    priceHint: '',
    licenseLabel: 'Dental Board License Number',
    licenseHint: 'Your state dental board number — used for credential verification',
  },
  {
    id: 'professional-service',
    label: 'Professional Service',
    icon: 'briefcase',
    sub: 'Legal, finance & consulting',
    accent: '#16A34A',
    accentBg: '#F0FDF4',
    cardHover: '#F0FDF4',
    clinicLabel: 'Agency / Firm Name',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Connect with clients who need your expertise — on whyclick.tv',
    stat: '400+ Professionals',
    specializations: [
      'Legal Services','Accounting','Financial Planning','Insurance',
      'Real Estate','Consulting','HR Services','IT Services',
      'Marketing','Tax Services','Notary','Business Coaching',
    ],
    services: [
      'Consultation','Documentation','Financial Planning','Tax Filing',
      'Legal Advice','Contract Review','Business Setup','Compliance',
      'Auditing','Policy Management',
    ],
    degrees: [
      'Licensed Attorney','CPA – Certified Public Accountant',
      'CFP – Certified Financial Planner','Licensed Insurance Agent',
      'MBA','Bachelor\'s Degree','Other',
    ],
    priceLabel: 'Consultation Rate',
    pricePlaceholder: '150',
    priceHint: '',
    licenseLabel: 'Professional License Number',
    licenseHint: 'Your state-issued professional license number',
  },
  {
    id: 'salon-spa',
    label: 'Salon & Spa',
    icon: 'scissors',
    sub: 'Hair, nails, skin & wellness',
    accent: '#DB2777',
    accentBg: '#FDF2F8',
    cardHover: '#FDF2F8',
    clinicLabel: 'Salon / Spa Name',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Grow your beauty business with clients who love what you do',
    stat: '600+ Beauty Pros',
    specializations: [
      'Hair Styling','Hair Coloring','Nail Care','Skin Care',
      'Massage Therapy','Waxing','Facial Treatments','Makeup',
      'Eyebrow & Lash','Body Treatments','Keratin Treatment','Balayage',
    ],
    services: [
      'Haircut','Hair Color','Highlights','Blowout',
      'Manicure','Pedicure','Facial','Massage',
      'Waxing','Makeup Application','Lash Extensions','Eyebrow Shaping',
    ],
    degrees: [
      'Cosmetology License','Esthetician License','Nail Technician License',
      'Massage Therapy Certificate','Barbering License','None required',
    ],
    priceLabel: 'Starting Service Rate',
    pricePlaceholder: '45',
    priceHint: '',
    licenseLabel: 'Cosmetology / Trade License Number',
    licenseHint: 'Your state-issued beauty or trade license number',
  },
  {
    id: 'home-services',
    label: 'Home Services',
    icon: 'wrench',
    sub: 'Repairs, plumbing, electrical & more',
    accent: '#EA580C',
    accentBg: '#FFF7ED',
    cardHover: '#FFF7ED',
    clinicLabel: 'Company / Business Name',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Connect with homeowners who need your expertise — every day',
    stat: '1,200+ Service Pros',
    specializations: [
      'Plumbing','Electrical','HVAC','Landscaping','General Contracting',
      'Carpentry','Painting','Roofing','Cleaning Services','Pest Control',
    ],
    services: [
      'Emergency Repairs','Installation','Maintenance','Renovation','Inspection',
      'Deep Cleaning','Landscaping','Painting','Roofing','Flooring',
      'Appliance Repair','Remodeling',
    ],
    degrees: [
      'General Contractor License','Plumbing Trade License','Electrical Trade License',
      'HVAC Certification','Business License','None required',
    ],
    priceLabel: 'Starting Service Rate',
    pricePlaceholder: '95',
    priceHint: '',
    licenseLabel: 'Contractor / Trade License Number',
    licenseHint: 'Optional but recommended — helps build client trust',
  },
  {
    id: 'photography',
    label: 'Photography',
    icon: 'camera',
    sub: 'Photo & video services',
    accent: '#9333EA',
    accentBg: '#FAF5FF',
    cardHover: '#FAF5FF',
    clinicLabel: 'Studio / Business Name',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80&auto=format&fit=crop',
    ],
    tagline: 'Showcase your work and grow your client base on whyclick.tv',
    stat: '800+ Photographers',
    specializations: [
      'Wedding Photography','Portrait Photography','Commercial Photography',
      'Event Photography','Real Estate Photography','Product Photography',
      'Videography','Photo Editing',
    ],
    services: [
      'Photo Session','Video Shoot','Photo Editing','Wedding Package',
      'Event Coverage','Commercial Shoot','Headshots','Family Portraits',
      'Newborn Photography','Product Photography',
    ],
    degrees: [
      'Bachelor of Fine Arts (Photography)','Associate in Photography',
      'Professional Photographer Certification','None (Self-taught)','Other',
    ],
    priceLabel: 'Starting Session Rate',
    pricePlaceholder: '250',
    priceHint: '',
    licenseLabel: 'Business License Number',
    licenseHint: 'Optional — if you have a registered business',
  },
];

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop';


const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

const RANDOM_COVERS = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80&auto=format&fit=crop',
];

const STEP_LABELS = ['Account', 'Profile', 'Services', 'Certification', 'Review'];

// ── BASE STYLES ───────────────────────────────────────────────────────────────
const inputBase = {
  width: '100%', border: '1.5px solid var(--line)', borderRadius: 10,
  padding: '12px 14px', font: '400 14px/1.4 Inter', color: 'var(--ink)',
  background: 'var(--bg)', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color .15s', fontFamily: 'Inter, sans-serif',
};
const fo = e => { e.target.style.borderColor = 'var(--accent)'; };
const fb = e => { e.target.style.borderColor = 'var(--line)'; };

// ── FIELD ─────────────────────────────────────────────────────────────────────
const Field = ({ label, required, hint, children, span }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: span }}>
    {label && (
      <label style={{ display: 'block', font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: 3 }}>*</span>}
      </label>
    )}
    {children}
    {hint && <span style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)' }}>{hint}</span>}
  </div>
);

// ── INPUT PRIMITIVES ──────────────────────────────────────────────────────────
const Inp = ({ value, onChange, placeholder, type = 'text', style: ex }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} style={{ ...inputBase, ...ex }} onFocus={fo} onBlur={fb} />
);

const PasswordInp = ({ value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={{ ...inputBase, paddingRight: 44 }} onFocus={fo} onBlur={fb} />
      <button type="button" onClick={() => setShow(s => !s)} style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 2,
        display: 'flex', alignItems: 'center', color: 'var(--ink-3)', transition: 'color .15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-3)'; }}
      >
        {show ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 .9-2 2.35-3.74 4.12-5.06M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9.27 3.11 11 7a11.05 11.05 0 0 1-1.52 2.79M3 3l18 18"/>
            <path d="M10.73 10.73A3 3 0 0 0 14.12 14"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        )}
      </button>
    </div>
  );
};

const Textarea = ({ value, onChange, placeholder, rows = 5 }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)}
    placeholder={placeholder} rows={rows}
    style={{ ...inputBase, resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
    onFocus={fo} onBlur={fb} />
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

const CircularUpload = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: 96, height: 96, borderRadius: '50%',
      border: '2px dashed var(--line)', background: 'var(--bg-alt)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'border-color .15s, background .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-alt)'; }}
    >
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
        <Icon name="camera" size={15} color="var(--accent)" />
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ font: '500 12px/1 Inter', color: 'var(--ink)' }}>Upload photo</div>
      <div style={{ font: '400 11px/1.3 Inter', color: 'var(--ink-3)', marginTop: 2 }}>JPG or PNG · min 400×400 px</div>
    </div>
  </div>
);

const LogoUpload = ({ label = 'Logo' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <div style={{
      width: 80, height: 80, borderRadius: 16, flexShrink: 0,
      border: '2px dashed var(--line)', background: 'var(--bg-alt)',
      display: 'grid', placeItems: 'center',
      cursor: 'pointer', transition: 'border-color .15s, background .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-alt)'; }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Icon name="camera" size={18} color="var(--accent)" />
        <span style={{ font: '500 9px/1 Inter', color: 'var(--accent)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Logo</span>
      </div>
    </div>
    <div>
      <div style={{ font: '500 13px/1.3 Inter', color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
      <div style={{ font: '400 12px/1.5 Inter', color: 'var(--ink-3)' }}>PNG or SVG · min 400×400 px<br />Square format recommended</div>
    </div>
  </div>
);

const UploadZone = ({ icon, title, sub }) => (
  <div style={{
    border: '2px dashed var(--line)', borderRadius: 12, padding: '20px 16px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    background: 'var(--bg-alt)', cursor: 'pointer', transition: 'border-color .15s, background .15s',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-soft)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--bg-alt)'; }}
  >
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
      <Icon name={icon} size={16} color="var(--accent)" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ font: '500 13px/1 Inter', color: 'var(--ink)' }}>{title}</div>
      <div style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)', marginTop: 3 }}>{sub}</div>
    </div>
  </div>
);


// ── SCREEN 0: INDUSTRY SELECT (split layout) ──────────────────────────────────
const IndustryScreen = ({ value, onChange, onNext }) => {
  const [displayId, setDisplayId]   = useState(value);
  const [imgOpacity, setImgOpacity] = useState(1);

  // Fade transition on industry change
  useEffect(() => {
    if (value !== displayId) {
      setImgOpacity(0);
      const t = setTimeout(() => { setDisplayId(value); setImgOpacity(1); }, 220);
      return () => clearTimeout(t);
    }
  }, [value]);

  const displayIndustry = INDUSTRIES.find(i => i.id === displayId);
  const img = displayIndustry?.images?.[0] || DEFAULT_IMAGE;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

      {/* ── LEFT PANEL ── */}
      <div style={{ flex: '0 0 56%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 64px', overflowY: 'auto' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--accent-soft)', border: '1px solid oklch(0.88 0.08 30)', borderRadius: 999, padding: '6px 13px', marginBottom: 20, alignSelf: 'flex-start' }}>
          <Icon name="sparkle" size={12} color="var(--accent)" />
          <span style={{ font: '500 11px/1 Inter', color: 'var(--accent)' }}>Join as a Partner</span>
        </div>

        <h1 style={{ font: '800 34px/1.1 Inter', color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.025em' }}>
          What type of professional are you?
        </h1>
        <p style={{ font: '400 15px/1.6 Inter', color: 'var(--ink-3)', margin: '0 0 36px', maxWidth: 420 }}>
          Select your industry — we'll tailor the profile fields and onboarding just for you.
        </p>

        {/* Industry cards — 3×2 Whop-style grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 600 }}>
          {INDUSTRIES.map(ind => {
            const sel = value === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => onChange(ind.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: 12, padding: '18px 16px', borderRadius: 14, textAlign: 'left',
                  border: `1.5px solid ${sel ? ind.accent : 'var(--line)'}`,
                  background: sel ? ind.accentBg : 'var(--bg)',
                  cursor: 'pointer', transition: 'all .15s',
                  boxShadow: sel ? `0 0 0 3px ${ind.accent}22` : 'none',
                }}
                onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = ind.cardHover; e.currentTarget.style.borderColor = ind.accent + '88'; } }}
                onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--line)'; } }}
              >
                {/* Colored icon box */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: sel ? ind.accent : ind.accentBg,
                  display: 'grid', placeItems: 'center',
                  transition: 'background .15s',
                  boxShadow: sel ? `0 4px 12px ${ind.accent}44` : 'none',
                }}>
                  <Icon name={ind.icon} size={19} color={sel ? 'white' : ind.accent} />
                </div>
                <div>
                  <div style={{ font: '600 13px/1.2 Inter', color: sel ? ind.accent : 'var(--ink)', marginBottom: 3 }}>{ind.label}</div>
                  <div style={{ font: '400 11px/1.4 Inter', color: 'var(--ink-3)' }}>{ind.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        <button onClick={onNext} disabled={!value} style={{
          marginTop: 32, alignSelf: 'flex-start', padding: '14px 44px', borderRadius: 12, border: 'none',
          background: value ? 'var(--accent)' : 'oklch(0.88 0.01 80)',
          color: value ? 'white' : 'var(--ink-3)',
          font: '600 15px/1 Inter', cursor: value ? 'pointer' : 'default', transition: 'opacity .15s',
        }}
          onMouseEnter={e => { if (value) e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Continue →
        </button>
      </div>

      {/* ── RIGHT PANEL — dynamic image ── */}
      <div style={{ flex: '0 0 44%', position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        {/* Image with fade */}
        <img
          key={displayId}
          src={img}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: imgOpacity, transition: 'opacity 0.25s ease' }}
          onError={e => { e.target.src = DEFAULT_IMAGE; }}
        />

        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,3,2,0.85) 0%, rgba(5,3,2,0.3) 55%, transparent 100%)' }} />

        {/* Colored top tint based on industry */}
        {displayIndustry && (
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${displayIndustry.accent}22 0%, transparent 60%)`, pointerEvents: 'none' }} />
        )}

        {/* Text content at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 44px' }}>
          {displayIndustry ? (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: displayIndustry.accent, borderRadius: 999, padding: '6px 14px', marginBottom: 16 }}>
                <Icon name={displayIndustry.icon} size={13} color="white" />
                <span style={{ font: '600 12px/1 Inter', color: 'white' }}>{displayIndustry.label}</span>
              </div>
              <h2 style={{ font: '700 26px/1.2 Inter', color: 'white', margin: '0 0 12px', letterSpacing: '-0.02em', maxWidth: 360 }}>
                {displayIndustry.tagline}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: displayIndustry.accent }} />
                <span style={{ font: '400 13px/1 Inter', color: 'rgba(255,255,255,0.75)' }}>{displayIndustry.stat} on whyclick.tv</span>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ font: '700 28px/1.2 Inter', color: 'white', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Your next client is already searching.
              </h2>
              <p style={{ font: '400 14px/1.5 Inter', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Join thousands of verified professionals on whyclick.tv.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

// ── STEP 1: ACCOUNT & CONTACT ─────────────────────────────────────────────────
const AccountStep = ({ data, set, industry }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Account & contact</h2>
      <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Your login credentials and how clients can reach you.</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
      <CircularUpload />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <Field label="First Name" required>
        <Inp value={data.firstName} onChange={v => set('firstName', v)} placeholder="Jane" />
      </Field>
      <Field label="Last Name" required>
        <Inp value={data.lastName} onChange={v => set('lastName', v)} placeholder="Cooper" />
      </Field>
      <Field label="Email Address" required>
        <Inp type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@example.com" />
      </Field>
      <Field label="Phone Number">
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
      <Field label="Password" required>
        <PasswordInp value={data.password} onChange={v => set('password', v)} placeholder="Min. 8 characters" />
      </Field>
      <Field label="Confirm Password" required>
        <PasswordInp value={data.confirmPassword} onChange={v => set('confirmPassword', v)} placeholder="Re-enter password" />
      </Field>
    </div>
  </div>
);

// ── STEP 2: PROFESSIONAL PROFILE ──────────────────────────────────────────────
const ProfileStep = ({ data, set, industry }) => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Professional profile</h2>
      <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Tell us about your background — this is your public-facing profile.</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <Field label="Professional Title" required span="1 / -1">
        <Inp value={data.title} onChange={v => set('title', v)} placeholder={`e.g. ${industry?.label} – ${industry?.specializations?.[0] || 'Specialist'}`} />
      </Field>
      <Field label={industry?.clinicLabel || 'Business name'} hint="Leave blank if solo practitioner">
        <Inp value={data.clinicName} onChange={v => set('clinicName', v)} placeholder="e.g. City Smile Dental" />
      </Field>
      <Field label="Years of Experience" required>
        <div style={{ position: 'relative' }}>
          <Inp type="number" value={data.yearsExp} onChange={v => set('yearsExp', v)} placeholder="e.g. 8" style={{ paddingRight: 52 }} />
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', font: '400 13px/1 Inter', color: 'var(--ink-3)', pointerEvents: 'none' }}>yrs</span>
        </div>
      </Field>
      <Field label="Address" required span="1 / -1">
        <Inp value={data.addressLine1} onChange={v => set('addressLine1', v)} placeholder="123 Main Street, Suite 200" />
      </Field>
      <Field label="City" required>
        <Inp value={data.city} onChange={v => set('city', v)} placeholder="New York" />
      </Field>
      <Field label="State" required>
        <Sel value={data.state} onChange={v => set('state', v)} options={US_STATES} placeholder="State" />
      </Field>
      <Field label="ZIP / Postal Code" required>
        <Inp value={data.zip} onChange={v => set('zip', v)} placeholder="10001" />
      </Field>
      <Field label="Country" required>
        <Inp value={data.country} onChange={v => set('country', v)} placeholder="United States" />
      </Field>
      <Field label="About" required hint="Describe your approach and what makes you stand out. 2–4 sentences is ideal." span="1 / -1">
        <Textarea value={data.bio} onChange={v => set('bio', v)}
          placeholder="Write a brief overview of your background, your approach, and what clients can expect working with you…" rows={5} />
      </Field>
    </div>
  </div>
);

// ── STEP 2b: BUSINESS PROFILE (Restaurant & Salon/Spa) ───────────────────────
const BUSINESS_COPY = {
  restaurant: {
    heading: 'Restaurant Profile',
    sub: 'Tell us about your restaurant — this will be your public business profile.',
    namePlaceholder: 'e.g. The Golden Fork',
    roleHint: 'Your position at this restaurant',
    rolePlaceholder: 'e.g. Owner, General Manager',
    aboutHint: 'Describe your story, signature dishes, and what makes your restaurant unique.',
    aboutPlaceholder: 'Tell us about your restaurant\'s story, cuisine style, signature dishes, and atmosphere…',
  },
  'salon-spa': {
    heading: 'Salon & Spa Profile',
    sub: 'Tell us about your salon or spa — this will be your public business profile.',
    namePlaceholder: 'e.g. Serenity Spa & Salon',
    roleHint: 'Your position at this business',
    rolePlaceholder: 'e.g. Owner, Lead Stylist, Director',
    aboutHint: 'Describe your ambiance, signature treatments, and what makes your salon unique.',
    aboutPlaceholder: 'Tell us about your salon\'s story, specialties, team, and the experience clients can expect…',
  },
};

const BusinessProfileStep = ({ data, set, industry }) => {
  const copy = BUSINESS_COPY[industry?.id] || BUSINESS_COPY.restaurant;
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>{copy.heading}</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>{copy.sub}</p>
      </div>

      {/* Logo row */}
      <div style={{ marginBottom: 24, padding: '18px 20px', border: '1.5px solid var(--line)', borderRadius: 14, background: 'var(--bg)' }}>
        <LogoUpload label={industry?.id === 'salon-spa' ? 'Salon & Spa Logo' : 'Restaurant Logo'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field label={industry?.clinicLabel || 'Business Name'} required span="1 / -1">
          <Inp value={data.businessName} onChange={v => set('businessName', v)} placeholder={copy.namePlaceholder} />
        </Field>
        <Field label="Your Role" required hint={copy.roleHint}>
          <Inp value={data.title} onChange={v => set('title', v)} placeholder={copy.rolePlaceholder} />
        </Field>
        <Field label="Years In Business">
          <div style={{ position: 'relative' }}>
            <Inp type="number" value={data.yearsExp} onChange={v => set('yearsExp', v)} placeholder="e.g. 5" style={{ paddingRight: 52 }} />
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', font: '400 13px/1 Inter', color: 'var(--ink-3)', pointerEvents: 'none' }}>yrs</span>
          </div>
        </Field>
        <Field label="Address" required span="1 / -1">
          <Inp value={data.addressLine1} onChange={v => set('addressLine1', v)} placeholder="123 Main Street, Suite 100" />
        </Field>
        <Field label="City" required>
          <Inp value={data.city} onChange={v => set('city', v)} placeholder="New York" />
        </Field>
        <Field label="State" required>
          <Sel value={data.state} onChange={v => set('state', v)} options={US_STATES} placeholder="State" />
        </Field>
        <Field label="ZIP / Postal Code" required>
          <Inp value={data.zip} onChange={v => set('zip', v)} placeholder="10001" />
        </Field>
        <Field label="Country" required>
          <Inp value={data.country} onChange={v => set('country', v)} placeholder="United States" />
        </Field>
        <Field label="About" required hint={copy.aboutHint} span="1 / -1">
          <Textarea value={data.bio} onChange={v => set('bio', v)} placeholder={copy.aboutPlaceholder} rows={5} />
        </Field>
      </div>
    </div>
  );
};

// ── STEP 3: SERVICES & PRICING ────────────────────────────────────────────────
const ServicesStep = ({ data, set, industry }) => {
  const [newSpec, setNewSpec] = useState('');
  const [newSvc, setNewSvc]   = useState('');

  const baseSpecs   = industry?.specializations || [];
  const customSpecs = data.customSpecializations || [];
  const specList    = [...baseSpecs, ...customSpecs];
  const toggleSpec  = s => {
    const cur = data.specializations || [];
    set('specializations', cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
  };
  const addSpec = () => {
    const t = newSpec.trim(); if (!t) return;
    set('customSpecializations', [...customSpecs, t]);
    set('specializations', [...(data.specializations || []), t]);
    setNewSpec('');
  };

  const baseSvcs   = industry?.services || [];
  const customSvcs = data.customServices || [];
  const svcList    = [...baseSvcs, ...customSvcs];
  const toggleSvc  = s => {
    const cur = data.services || [];
    set('services', cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
  };
  const addSvc = () => {
    const t = newSvc.trim(); if (!t) return;
    set('customServices', [...customSvcs, t]);
    set('services', [...(data.services || []), t]);
    setNewSvc('');
  };

  const TagCloud = ({ list, selected, onToggle, newVal, setNewVal, onAdd, addLabel }) => (
    <div style={{ border: '1.5px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '14px 14px 10px' }}>
        {list.map(s => {
          const on = (selected || []).includes(s);
          return (
            <button key={s} onClick={() => onToggle(s)} style={{
              padding: '7px 14px', borderRadius: 999,
              border: `1.5px solid ${on ? 'var(--accent)' : 'var(--line)'}`,
              background: on ? 'var(--accent)' : 'var(--bg)',
              font: '500 12px/1 Inter', color: on ? 'white' : 'var(--ink-2)',
              cursor: 'pointer', transition: 'all .15s',
            }}>{s}</button>
          );
        })}
      </div>
      <div style={{ borderTop: '1px solid var(--line-2)', padding: '11px 14px', display: 'flex', gap: 8, background: 'var(--bg-alt)' }}>
        <input value={newVal} onChange={e => setNewVal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onAdd(); }}
          placeholder={addLabel}
          style={{ ...inputBase, flex: 1, padding: '9px 12px' }} onFocus={fo} onBlur={fb} />
        <button onClick={onAdd} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: 'white', font: '600 13px/1 Inter', cursor: 'pointer', flexShrink: 0 }}>+ Add</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Services & pricing</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Select your specializations, the services you offer, and set your starting rate.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Field label="Specialization" required>
          <TagCloud list={specList} selected={data.specializations} onToggle={toggleSpec}
            newVal={newSpec} setNewVal={setNewSpec} onAdd={addSpec} addLabel="Add a custom specialization…" />
        </Field>
        <Field label="Services Offered">
          <TagCloud list={svcList} selected={data.services} onToggle={toggleSvc}
            newVal={newSvc} setNewVal={setNewSvc} onAdd={addSvc} addLabel="Add a custom service…" />
        </Field>
        <Field label={industry?.priceLabel || 'Starting price'} required>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', font: '500 14px/1 Inter', color: 'var(--ink-3)', pointerEvents: 'none' }}>$</span>
            <Inp value={data.startingPrice} onChange={v => set('startingPrice', v)} placeholder={industry?.pricePlaceholder || '0'} style={{ paddingLeft: 28 }} />
          </div>
        </Field>
      </div>
    </div>
  );
};

// ── STEP 4: CREDENTIALS & MEDIA ───────────────────────────────────────────────
const CredentialsStep = ({ data, set, industry }) => {
  const addCert    = () => set('certifications', [...data.certifications, { name: '', issuer: '' }]);
  const removeCert = i  => set('certifications', data.certifications.filter((_, idx) => idx !== i));
  const updateCert = (i, k, v) => set('certifications', data.certifications.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Certification & media</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Upload your qualifications and add an intro video or cover photo.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Field label="Degree / Qualification" required>
          <Sel value={data.degree} onChange={v => set('degree', v)} options={industry?.degrees || []} placeholder="Select…" />
        </Field>
        <Field label={industry?.licenseLabel || 'License number'} hint={industry?.licenseHint}>
          <Inp value={data.licenseNumber} onChange={v => set('licenseNumber', v)} placeholder="e.g. CA-123456" />
        </Field>
      </div>
      <div>
        <div style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', marginBottom: 12 }}>
          Certifications <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)', marginLeft: 4 }}>(optional)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end', border: '1.5px solid var(--line)', borderRadius: 12, padding: '14px 16px', background: 'var(--bg)' }}>
              <Field label={i === 0 ? 'Certification Name' : ''}>
                <Inp value={cert.name} onChange={v => updateCert(i, 'name', v)} placeholder="e.g. Invisalign Certified" />
              </Field>
              <Field label={i === 0 ? 'Issuing Authority' : ''}>
                <Inp value={cert.issuer} onChange={v => updateCert(i, 'issuer', v)} placeholder="e.g. American Dental Assoc." />
              </Field>
              {data.certifications.length > 1
                ? <button onClick={() => removeCert(i)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--line)', background: 'var(--bg-alt)', color: 'var(--ink-3)', cursor: 'pointer', font: '400 18px/1 Inter', display: 'grid', placeItems: 'center', flexShrink: 0 }}>×</button>
                : <div />}
            </div>
          ))}
        </div>
        <button onClick={addCert} style={{ marginTop: 10, width: '100%', padding: '11px', borderRadius: 10, border: '1.5px dashed var(--accent)', background: 'var(--accent-soft)', font: '500 13px/1 Inter', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background .15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'oklch(0.92 0.06 30)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-soft)'; }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add certification
        </button>
      </div>
      <div style={{ height: 1, background: 'var(--line-2)' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Intro Video" required hint="1–2 min · MP4 or MOV · max 100 MB">
          <UploadZone icon="play" title="Upload intro video" sub="Introduce yourself in 1–2 minutes" />
        </Field>
        <Field label="Cover Photo" hint="Optional · if skipped we'll use a default cover">
          <UploadZone icon="camera" title="Upload cover photo" sub="JPG or PNG · min 1200×400 px" />
        </Field>
      </div>
    </div>
  );
};

// ── STEP 5: REVIEW ────────────────────────────────────────────────────────────
const ReviewStep = ({ data, set, industry }) => {
  const isBusinessProfile = ['restaurant', 'salon-spa'].includes(data.industry);
  const fields = [
    data.firstName, data.lastName, data.email, data.password,
    data.title,
    isBusinessProfile ? data.businessName : data.yearsExp,
    data.addressLine1, data.city, data.state, data.zip, data.country,
    data.bio, (data.specializations || []).length > 0, (data.services || []).length > 0,
    data.degree, data.startingPrice,
  ];
  const pct      = Math.round((fields.filter(Boolean).length / fields.length) * 100);
  const cover    = RANDOM_COVERS[Math.floor(Math.random() * RANDOM_COVERS.length)];
  // Business types: show business name as primary, owner name + role as subtitle
  const displayName     = isBusinessProfile
    ? (data.businessName || industry?.label + ' Name')
    : ([data.firstName, data.lastName].filter(Boolean).join(' ') || 'Your Name');
  const displaySubtitle = isBusinessProfile
    ? ([data.firstName, data.lastName].filter(Boolean).join(' ') + (data.title ? ` · ${data.title}` : ''))
    : (data.title || 'Professional Title');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ font: '700 22px/1.1 Inter', color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Review your profile</h2>
        <p style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-3)', margin: 0 }}>Here's a preview of how your profile will appear to clients.</p>
      </div>
      <div style={{ border: '1.5px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--bg)', boxShadow: '0 4px 20px -8px rgba(20,15,10,0.12)' }}>
        <div style={{ position: 'relative', height: 100, overflow: 'hidden' }}>
          <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.background = 'linear-gradient(135deg, var(--accent) 0%, oklch(0.52 0.18 30) 100%)'; }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', bottom: -28, left: 20, width: 56, height: 56, borderRadius: '50%', border: '3px solid white', background: industry?.accentBg || 'var(--bg-alt)', display: 'grid', placeItems: 'center', zIndex: 1 }}>
            <Icon name={industry?.icon || 'sparkle'} size={22} color={industry?.accent || 'var(--ink-3)'} />
          </div>
        </div>
        <div style={{ padding: '34px 20px 20px' }}>
          <div style={{ font: '700 18px/1.2 Inter', color: 'var(--ink)' }}>{displayName}</div>
          <div style={{ font: '400 13px/1.3 Inter', color: 'var(--ink-3)', marginTop: 3 }}>
            {displaySubtitle}
            {!isBusinessProfile && (data.specializations || []).length > 0 ? ` · ${data.specializations.slice(0, 2).join(', ')}` : ''}
          </div>
          {(data.city || data.state) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 7, font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>
              <Icon name="pin" size={11} color="var(--accent)" />
              {[data.city, data.state, data.country].filter(Boolean).join(', ')}
            </div>
          )}
          {data.startingPrice && (
            <div style={{ marginTop: 6 }}>
              <span style={{ font: '600 13px/1 Inter', color: 'var(--accent)' }}>${data.startingPrice}</span>
              {industry?.priceLabel ? <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)' }}> · {industry.priceLabel.toLowerCase()}</span> : ''}
            </div>
          )}
          {(data.services || []).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {(data.services || []).slice(0, 4).map(s => (
                <span key={s} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 11px/1 Inter', color: 'var(--ink-2)' }}>{s}</span>
              ))}
              {(data.services || []).length > 4 && <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 11px/1 Inter', color: 'var(--ink-3)' }}>+{(data.services || []).length - 4} more</span>}
            </div>
          )}
          {data.bio && <p style={{ font: '400 13px/1.5 Inter', color: 'var(--ink-2)', marginTop: 12, marginBottom: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.bio}</p>}
        </div>
      </div>
      <div style={{ background: 'var(--bg-alt)', border: '1px solid var(--line-2)', borderRadius: 12, padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Profile Completeness</span>
          <span style={{ font: '700 13px/1 Inter', color: pct >= 80 ? 'var(--green)' : 'var(--accent)' }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 999, background: pct >= 80 ? 'var(--green)' : 'var(--accent)', width: `${pct}%`, transition: 'width .4s' }} />
        </div>
        {pct < 80 && <p style={{ font: '400 12px/1.4 Inter', color: 'var(--ink-3)', margin: '8px 0 0' }}>A more complete profile increases your visibility in search results.</p>}
      </div>
      <div style={{ background: 'oklch(0.96 0.02 200)', border: '1px solid oklch(0.88 0.04 200)', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="sparkle" size={15} color="oklch(0.55 0.12 200)" />
        <p style={{ font: '400 13px/1.5 Inter', color: 'oklch(0.40 0.08 200)', margin: 0 }}>
          Your profile will be reviewed within <strong>24 hours</strong>. Once approved, you'll be live on whyclick.tv and visible to clients searching for {industry?.label?.toLowerCase()} professionals.
        </p>
      </div>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
        <input type="checkbox" checked={data.confirmed} onChange={e => set('confirmed', e.target.checked)}
          style={{ width: 18, height: 18, marginTop: 2, accentColor: 'var(--accent)', flexShrink: 0 }} />
        <span style={{ font: '400 14px/1.5 Inter', color: 'var(--ink-2)' }}>
          I confirm that all information provided is accurate and I agree to make my profile visible to potential clients on whyclick.tv.
        </span>
      </label>
    </div>
  );
};

// ── SUCCESS ───────────────────────────────────────────────────────────────────
const SuccessScreen = ({ onHome }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-alt)', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'oklch(0.94 0.06 145)', display: 'grid', placeItems: 'center', margin: '0 auto 28px' }}>
        <Icon name="check-badge" size={40} color="var(--green)" />
      </div>
      <h1 style={{ font: '700 30px/1.1 Inter', color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.025em' }}>Application submitted!</h1>
      <p style={{ font: '400 15px/1.6 Inter', color: 'var(--ink-3)', margin: '0 0 10px' }}>Your profile has been submitted for review.</p>
      <div style={{ font: '400 14px/1.6 Inter', color: 'var(--ink-3)', margin: '0 0 36px', background: 'var(--bg)', borderRadius: 12, padding: '14px 18px', border: '1px solid var(--line-2)', textAlign: 'left' }}>
        {[{ icon: 'check', text: 'Profile submitted successfully' }, { icon: 'clock', text: 'Our team reviews within 24 hours' }, { icon: 'message', text: "You'll receive an email once it's live" }].map(item => (
          <div key={item.text} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
            <Icon name={item.icon} size={14} color="var(--ink-3)" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <button onClick={onHome} style={{ padding: '14px 36px', borderRadius: 12, border: 'none', background: 'var(--accent)', color: 'white', font: '600 15px/1 Inter', cursor: 'pointer', transition: 'opacity .15s' }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >Back to home</button>
    </div>
  </div>
);

// ── MAIN ───────────────────────────────────────────────────────────────────────
export default function JoinAsPartner() {
  const navigate = useNavigate();
  const [screen, setScreen]       = useState('industry');
  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
    title: '', clinicName: '', yearsExp: '',
    businessName: '',
    addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: '',
    bio: '',
    specializations: [], customSpecializations: [],
    services: [],        customServices: [],
    startingPrice: '',
    degree: '', licenseNumber: '',
    certifications: [{ name: '', issuer: '' }],
    confirmed: false,
    industry: '',
  });

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const industry = INDUSTRIES.find(i => i.id === data.industry);

  // ── Auto-sliding images on form steps ──
  const [slideIdx, setSlideIdx]     = useState(0);
  const [slideOpacity, setSlideOpacity] = useState(1);

  useEffect(() => {
    if (screen !== 'form' || !industry) return;
    const imgs = industry.images || [];
    if (imgs.length < 2) return;
    const t = setInterval(() => {
      setSlideOpacity(0);
      setTimeout(() => {
        setSlideIdx(i => (i + 1) % imgs.length);
        setSlideOpacity(1);
      }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, [screen, data.industry]);

  const isBusinessProfile = ['restaurant', 'salon-spa'].includes(data.industry);

  const canNext = () => {
    if (step === 1) return !!(data.firstName && data.lastName && data.email && data.password);
    if (step === 2) {
      if (isBusinessProfile) return !!(data.businessName && data.title && data.addressLine1 && data.city && data.state && data.zip && data.country && data.bio);
      return !!(data.title && data.yearsExp && data.addressLine1 && data.city && data.state && data.zip && data.country && data.bio);
    }
    if (step === 3) return !!((data.specializations || []).length > 0 && (data.services || []).length > 0 && data.startingPrice);
    if (step === 4) return !!(data.degree);
    if (step === 5) return data.confirmed;
    return true;
  };

  if (submitted) return <SuccessScreen onHome={() => navigate('/')} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-alt)' }}>
      <SiteNav />

      {/* ── Industry screen ── */}
      {screen === 'industry' && (
        <IndustryScreen
          value={data.industry}
          onChange={v => set('industry', v)}
          onNext={() => setScreen('form')}
        />
      )}

      {/* ── Form steps — split layout ── */}
      {screen === 'form' && (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

          {/* LEFT — scrollable form */}
          <div style={{ flex: '0 0 56%', overflowY: 'auto', padding: '40px 56px 80px' }}>

            {/* ── Inline stepper (above heading) ── */}
            {(() => {
              const pct = Math.min(100, Math.round(((step - 1) + (canNext() ? 0.5 : 0)) / STEP_LABELS.length * 100));
              return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line-2)', flexWrap: 'wrap', gap: 12 }}>
                  {/* Breadcrumb */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {STEP_LABELS.map((label, i) => {
                      const n = i + 1, done = n < step, active = n === step;
                      return (
                        <React.Fragment key={label}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                              background: done ? 'var(--accent)' : active ? 'var(--accent-soft)' : 'transparent',
                              border: done ? 'none' : `2px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                              display: 'grid', placeItems: 'center', transition: 'all .2s',
                            }}>
                              {done
                                ? <Icon name="check" size={11} color="white" />
                                : <span style={{ font: `${active ? '700' : '400'} 10px/1 Inter`, color: active ? 'var(--accent)' : 'var(--ink-3)' }}>{n}</span>
                              }
                            </div>
                            <span style={{ font: `${active ? '600' : '400'} 13px/1 Inter`, color: active ? 'var(--accent)' : done ? 'var(--ink-2)' : 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                              {label}
                            </span>
                          </div>
                          {i < STEP_LABELS.length - 1 && (
                            <span style={{ font: '400 14px/1 Inter', color: 'var(--line)', margin: '0 6px', lineHeight: 1 }}>›</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {/* Completion rate */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                    <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)' }}>
                      Completion Rate: <strong style={{ color: 'var(--ink)' }}>{pct}%</strong>
                    </span>
                    <div style={{ width: 120, height: 4, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--accent)', borderRadius: 999, width: `${pct}%`, transition: 'width .5s ease' }} />
                    </div>
                  </div>
                </div>
              );
            })()}

            {step === 1 && <AccountStep     data={data} set={set} industry={industry} />}
            {step === 2 && (isBusinessProfile
              ? <BusinessProfileStep data={data} set={set} industry={industry} />
              : <ProfileStep         data={data} set={set} industry={industry} />
            )}
            {step === 3 && <ServicesStep    data={data} set={set} industry={industry} />}
            {step === 4 && <CredentialsStep data={data} set={set} industry={industry} />}
            {step === 5 && <ReviewStep      data={data} set={set} industry={industry} />}

            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--line-2)' }}>
              <button onClick={() => step === 1 ? setScreen('industry') : setStep(s => s - 1)} style={{
                padding: '11px 22px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'transparent',
                font: '500 14px/1 Inter', color: 'var(--ink)', cursor: 'pointer', transition: 'border-color .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; }}
              >← Back</button>
              <button onClick={step === 5 ? () => setSubmitted(true) : () => setStep(s => s + 1)} disabled={!canNext()} style={{
                padding: '12px 28px', borderRadius: 10, border: 'none',
                background: canNext() ? 'var(--accent)' : 'oklch(0.88 0.01 80)',
                color: canNext() ? 'white' : 'var(--ink-3)',
                font: '600 14px/1 Inter', cursor: canNext() ? 'pointer' : 'default', transition: 'background .2s, opacity .15s',
              }}
                onMouseEnter={e => { if (canNext()) e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >{step === 5 ? 'Submit for Review →' : 'Continue →'}</button>
            </div>
          </div>

          {/* RIGHT — sticky auto-sliding industry image */}
          <div style={{ flex: '0 0 44%', position: 'sticky', top: 60, height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
            <img
              src={(industry?.images?.[slideIdx % (industry?.images?.length || 1)]) || DEFAULT_IMAGE}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: slideOpacity, transition: 'opacity 0.3s ease' }}
              onError={e => { e.target.src = DEFAULT_IMAGE; }}
            />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,3,2,0.88) 0%, rgba(5,3,2,0.35) 55%, transparent 100%)' }} />
            {/* Top tint */}
            {industry && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${industry.accent}22 0%, transparent 60%)`, pointerEvents: 'none' }} />}

            {/* Step-specific messaging at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 40px' }}>
              {industry && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: industry.accent, borderRadius: 999, padding: '6px 13px', marginBottom: 16 }}>
                  <Icon name={industry.icon} size={12} color="white" />
                  <span style={{ font: '600 11px/1 Inter', color: 'white' }}>{industry.label}</span>
                </div>
              )}
              <h3 style={{ font: '700 22px/1.25 Inter', color: 'white', margin: '0 0 10px', letterSpacing: '-0.015em', maxWidth: 320 }}>
                {[
                  "Let's start with the basics.",
                  'Tell clients what makes you great.',
                  'Show what you specialize in.',
                  'Certification builds trust instantly.',
                  "You're almost live on whyclick.tv!",
                ][step - 1]}
              </h3>
              <p style={{ font: '400 13px/1.55 Inter', color: 'rgba(255,255,255,0.72)', margin: '0 0 20px', maxWidth: 300 }}>
                {[
                  'Your profile starts here — a few quick details to get your account set up.',
                  'A strong bio and clear location help clients find and trust you faster.',
                  'The more specific you are, the better we can match you with the right clients.',
                  'Verified professionals get 3× more profile views and client enquiries.',
                  "Review your profile, then submit — we'll have you live within 24 hours.",
                ][step - 1]}
              </p>
              {/* Step indicator dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{
                    height: 4, borderRadius: 999,
                    width: n === step ? 24 : 8,
                    background: n <= step ? 'white' : 'rgba(255,255,255,0.25)',
                    transition: 'all .3s ease',
                  }} />
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon, Tag, Btn } from '../components/primitives';
import logo from '../assets/whyclick-logo.png';

// ── DATA ──────────────────────────────────────────────────────────────────────
const DENTISTS = [
  {
    id: 1,
    name: 'Dr. Maya Patel', title: 'Pediatric Dentist, DDS', clinic: 'Patel Pediatric Dental',
    rating: 4.9, reviews: 412, experience: 12, patients: 1840, price: 85, degree: 'DDS', license: 'NY-DDS-084521',
    specialization: 'Pediatric Dentistry & Preventive Care', address: '142 Bedford Ave, Brooklyn, NY',
    phone: '+1 (718) 555-0101', email: 'maya@pateldental.com', avail: 'Today · 3:00 PM',
    insurance: ['Aetna', 'BCBS', 'Cigna'],
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Maya Patel is a board-certified pediatric dentist with 12 years of experience making young patients feel safe and comfortable. She founded Patel Pediatric Dental to bring compassionate, modern dentistry to Brooklyn families. Her philosophy centers on prevention, education, and building lifelong healthy habits from the very first visit.',
    services: ['Teeth Cleaning', 'Dental Sealants', 'Teeth Whitening', 'Early Orthodontics', 'Fluoride Treatment', 'Dental X-rays', 'Emergency Care'],
    certifications: ['American Board of Pediatric Dentistry', 'ADA Member', 'NY State Dental Association', 'Invisalign First Certified'],
    hours: { Mon: '9 AM – 5 PM', Tue: '9 AM – 5 PM', Wed: '9 AM – 5 PM', Thu: '9 AM – 6 PM', Fri: '9 AM – 4 PM', Sat: '10 AM – 2 PM', Sun: 'Closed' },
    education: "DDS — NYU College of Dentistry · Pediatric Residency, Children's Hospital of Philadelphia",
  },
  {
    id: 2,
    name: 'Dr. Ali Awan', title: 'Family Dentist, DMD', clinic: 'Bridge St. Family Dental',
    rating: 5.0, reviews: 487, experience: 9, patients: 2100, price: 60, degree: 'DMD', license: 'NY-DMD-076432',
    specialization: 'Family & Restorative Dentistry', address: '88 Bridge St, Brooklyn, NY',
    phone: '+1 (718) 555-0202', email: 'ali@bridgedental.com', avail: 'Tomorrow · 10:30 AM',
    insurance: ['Aetna', 'Delta Dental'],
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Ali Awan brings a warm, family-first approach to dentistry. His clinic is designed to be welcoming to all ages, from toddlers to seniors. He is known for his gentle touch and transparent communication, taking time to explain every procedure before it begins.',
    services: ['Teeth Cleaning', 'Composite Fillings', 'Root Canal', 'Crowns & Bridges', 'Oral Cancer Screening', 'Pediatric Care', 'CEREC Same-Day Crowns'],
    certifications: ['ADA Member', 'NY State Dental Association', 'CEREC Certified', 'Oral Cancer Foundation Partner'],
    hours: { Mon: '8 AM – 5 PM', Tue: '8 AM – 5 PM', Wed: '8 AM – 5 PM', Thu: '8 AM – 6 PM', Fri: '8 AM – 3 PM', Sat: '9 AM – 1 PM', Sun: 'Closed' },
    education: 'DMD — Columbia University College of Dental Medicine · General Practice Residency, Brookdale Hospital',
  },
  {
    id: 3,
    name: 'Dr. Lena Vogel', title: 'Orthodontist, Dr. med. dent.', clinic: 'Vogel Orthodontics',
    rating: 4.8, reviews: 91, experience: 15, patients: 980, price: 120, degree: 'Dr. med. dent.', license: 'NY-ORTH-031987',
    specialization: 'Clear Aligners & Adult Orthodontics', address: '25 Greenpoint Ave, Brooklyn, NY',
    phone: '+1 (718) 555-0303', email: 'lena@vogelortho.com', avail: 'Mon, May 4 · 2:00 PM',
    insurance: ['BCBS', 'Cigna', 'United'],
    img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Lena Vogel is a leading orthodontist specializing in adult and teen aligner therapy. She trained in Berlin before establishing her Greenpoint practice, bringing European precision to New York smiles. Her practice is renowned for digital simulation technology — patients see projected results before treatment begins.',
    services: ['Clear Aligners (Invisalign)', 'Traditional Braces', 'Ceramic Braces', 'Retainers', 'Jaw Alignment', '3D Digital Scanning', 'AcceleDent Therapy'],
    certifications: ['American Association of Orthodontists', 'Board Certified Orthodontist', 'Invisalign Platinum Provider', '3M Unitek Certified'],
    hours: { Mon: '9 AM – 5 PM', Tue: '9 AM – 5 PM', Wed: 'Closed', Thu: '10 AM – 7 PM', Fri: '9 AM – 4 PM', Sat: '10 AM – 3 PM', Sun: 'Closed' },
    education: 'Dr. med. dent. — Charité Berlin · Orthodontic Specialty Certificate, NYU',
  },
  {
    id: 13,
    name: 'Dr. James Okafor', title: 'Cosmetic Dentist, DDS', clinic: 'Smile Studio NYC',
    rating: 4.7, reviews: 256, experience: 11, patients: 1560, price: 200, degree: 'DDS', license: 'NY-DDS-094312',
    specialization: 'Cosmetic & Aesthetic Dentistry', address: '310 Broadway, Williamsburg, NY',
    phone: '+1 (718) 555-0404', email: 'james@smilestudio.com', avail: 'Today · 5:30 PM',
    insurance: ['Aetna'],
    img: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. James Okafor is a highly sought-after cosmetic dentist known for transforming smiles with artistry and precision. His Williamsburg studio blends luxury aesthetics with the latest dental technology. Featured in New York Magazine\'s "Best Dentists" list three years running, he designs smiles that complement each patient\'s unique facial structure.',
    services: ['Porcelain Veneers', 'Teeth Whitening', 'Smile Makeover', 'Dental Bonding', 'Gum Contouring', 'Composite Veneers', 'Enamel Shaping'],
    certifications: ['American Academy of Cosmetic Dentistry', 'ADA Member', 'NY State Dental Association', 'AACD Accredited Member'],
    hours: { Mon: '10 AM – 6 PM', Tue: '10 AM – 6 PM', Wed: '10 AM – 6 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 5 PM', Sat: '11 AM – 4 PM', Sun: 'Closed' },
    education: 'DDS — University of Pennsylvania School of Dental Medicine · Cosmetic Fellowship, Las Vegas Institute',
  },
  {
    id: 14,
    name: 'Dr. Priya Shah', title: 'General Dentist, BDS', clinic: 'Greenpoint Dental Co.',
    rating: 4.9, reviews: 184, experience: 7, patients: 1200, price: 75, degree: 'BDS', license: 'NY-BDS-108743',
    specialization: 'Preventive & Cosmetic Dentistry', address: '78 Manhattan Ave, Greenpoint, NY',
    phone: '+1 (718) 555-0505', email: 'priya@greenpointdental.com', avail: 'Wed · 11:00 AM',
    insurance: ['BCBS', 'Delta Dental', 'Aetna', 'Cigna'],
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Priya Shah founded Greenpoint Dental Co. with a single mission: make exceptional dental care accessible and stress-free. She excels at spotting problems early and crafting personalized treatment plans. Her patients consistently praise her calm chair-side manner and her ability to explain complex procedures in plain language.',
    services: ['Teeth Cleaning', 'Teeth Whitening', 'Tooth-Colored Fillings', 'Preventive Exams', 'Night Guards', 'Dental Sealants', 'Cosmetic Bonding'],
    certifications: ['ADA Member', 'NY State Dental Association', 'Academy of General Dentistry', 'Invisalign Certified Provider'],
    hours: { Mon: '9 AM – 5 PM', Tue: '9 AM – 5 PM', Wed: '9 AM – 6 PM', Thu: '9 AM – 5 PM', Fri: '9 AM – 4 PM', Sat: '10 AM – 2 PM', Sun: 'Closed' },
    education: "BDS — King's College London · Advanced Aesthetics Certification, NYU Langone",
  },
  {
    id: 15,
    name: 'Dr. Marcus Reyes', title: 'Endodontist, DMD', clinic: 'BK Endodontics',
    rating: 4.6, reviews: 142, experience: 13, patients: 890, price: 150, degree: 'DMD', license: 'NY-ENDO-057621',
    specialization: 'Root Canal & Endodontic Surgery', address: '512 Atlantic Ave, Brooklyn, NY',
    phone: '+1 (718) 555-0606', email: 'marcus@bkendo.com', avail: 'Fri · 9:00 AM',
    insurance: ['United', 'Cigna'],
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Marcus Reyes is one of Brooklyn\'s most trusted endodontists, specializing in saving teeth that other practitioners have given up on. With 13 years of focused endodontic practice, he has performed over 8,000 root canal procedures using cone-beam CT imaging and rotary instrumentation.',
    services: ['Root Canal Therapy', 'Endodontic Retreatment', 'Apicoectomy', 'Pulp Capping', 'Cracked Tooth Treatment', 'Dental Trauma Care', 'Sedation Dentistry'],
    certifications: ['American Association of Endodontists', 'Board Certified Endodontist', 'NY State Dental Association', 'Fellow, AAE'],
    hours: { Mon: '8 AM – 4 PM', Tue: '8 AM – 4 PM', Wed: '8 AM – 4 PM', Thu: '8 AM – 5 PM', Fri: '8 AM – 3 PM', Sat: 'Closed', Sun: 'Closed' },
    education: 'DMD — Boston University School of Dental Medicine · Endodontic Residency, NYU',
  },
  {
    id: 16,
    name: 'Dr. Sarah Kim', title: 'Periodontist, DDS', clinic: 'Park Slope Periodontics',
    rating: 4.8, reviews: 97, experience: 10, patients: 820, price: 175, degree: 'DDS', license: 'NY-PERIO-064312',
    specialization: 'Periodontics & Dental Implants', address: '456 7th Ave, Park Slope, NY',
    phone: '+1 (718) 555-0707', email: 'sarah@parkslopeperio.com', avail: 'Thu, May 7 · 1:00 PM',
    insurance: ['BCBS', 'Aetna'],
    img: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Sarah Kim is a board-certified periodontist who has built Park Slope Periodontics into a trusted destination for gum health and implant care. With a decade of experience, she combines the latest minimally invasive techniques with a deep commitment to patient education. Dr. Kim believes healthy gums are the foundation of every beautiful smile.',
    services: ['Gum Disease Treatment', 'Dental Implants', 'Bone Grafting', 'Gum Grafting', 'Crown Lengthening', 'Scaling & Root Planing', 'Laser Therapy'],
    certifications: ['American Academy of Periodontology', 'Board Certified Periodontist', 'ADA Member', 'Implant Dentistry Fellowship'],
    hours: { Mon: '9 AM – 5 PM', Tue: '9 AM – 5 PM', Wed: '9 AM – 5 PM', Thu: '9 AM – 6 PM', Fri: '9 AM – 3 PM', Sat: 'Closed', Sun: 'Closed' },
    education: 'DDS — University of Michigan · Periodontic Residency, Columbia University Medical Center',
  },
  {
    id: 17,
    name: 'Dr. Omar Hassan', title: 'Oral Surgeon, DDS', clinic: 'Hassan Oral Surgery',
    rating: 4.7, reviews: 211, experience: 14, patients: 1340, price: 230, degree: 'DDS', license: 'NY-OMS-048921',
    specialization: 'Oral & Maxillofacial Surgery', address: '218 Knickerbocker Ave, Bushwick, NY',
    phone: '+1 (718) 555-0808', email: 'omar@hassanoralsurgery.com', avail: 'Today · 4:00 PM',
    insurance: ['United', 'Aetna', 'Delta Dental'],
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Omar Hassan is a highly skilled oral and maxillofacial surgeon with 14 years of experience in complex extractions, implant placement, and corrective jaw surgery. His Bushwick practice is known for efficient, anxiety-free care — Dr. Hassan offers multiple sedation options and uses the latest 3D imaging for surgical planning.',
    services: ['Wisdom Tooth Extraction', 'Dental Implants', 'Bone Grafting', 'Corrective Jaw Surgery', 'IV Sedation', 'Facial Trauma Care', 'Biopsy & Pathology'],
    certifications: ['American Association of Oral and Maxillofacial Surgeons', 'Board Certified OMS', 'ADA Member', 'IV Sedation Certified'],
    hours: { Mon: '8 AM – 5 PM', Tue: '8 AM – 5 PM', Wed: '8 AM – 5 PM', Thu: '8 AM – 6 PM', Fri: '8 AM – 3 PM', Sat: '9 AM – 1 PM', Sun: 'Closed' },
    education: 'DDS — Howard University · Oral & Maxillofacial Surgery Residency, Mount Sinai Hospital',
  },
  {
    id: 18,
    name: 'Dr. Nina Clarke', title: 'Emergency Dentist, DMD', clinic: 'Clarke Emergency Dental',
    rating: 4.9, reviews: 329, experience: 8, patients: 2400, price: 95, degree: 'DMD', license: 'NY-DMD-091234',
    specialization: 'Emergency & General Dentistry', address: '900 Flatbush Ave, Brooklyn, NY',
    phone: '+1 (718) 555-0909', email: 'nina@clarkeemergency.com', avail: 'Today · 6:00 PM',
    insurance: ['Aetna', 'BCBS', 'Cigna', 'United'],
    img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&q=80&auto=format&fit=crop&crop=faces',
    hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop',
    bio: 'Dr. Nina Clarke founded Clarke Emergency Dental to fill a real gap in Brooklyn — same-day, evening, and weekend dental care without the ER price tag. Available 7 days a week, she and her team handle everything from sudden toothaches to broken crowns with speed and compassion. Dr. Clarke accepts nearly all major insurance plans and offers transparent upfront pricing.',
    services: ['Emergency Exams', 'Toothache Relief', 'Broken Tooth Repair', 'Lost Crown Replacement', 'Dental Abscess Treatment', 'Same-Day Crowns', 'After-Hours Care'],
    certifications: ['ADA Member', 'NY State Dental Association', 'CEREC Certified', 'Advanced Cardiac Life Support (ACLS)'],
    hours: { Mon: '8 AM – 8 PM', Tue: '8 AM – 8 PM', Wed: '8 AM – 8 PM', Thu: '8 AM – 8 PM', Fri: '8 AM – 6 PM', Sat: '9 AM – 5 PM', Sun: '10 AM – 4 PM' },
    education: 'DMD — Tufts University School of Dental Medicine · General Practice Residency, Kings County Hospital',
  },
];

const SAMPLE_REVIEWS = [
  { id: 1, rating: 5, name: 'Sarah M.', date: 'March 2025', text: 'Absolutely wonderful experience! The clinic was clean, modern, and the staff was incredibly kind. My daughter was terrified of dentists before — now she actually looks forward to her appointments.' },
  { id: 2, rating: 5, name: 'James T.', date: 'February 2025', text: 'Best dentist I\'ve ever had. Explained everything clearly, no unnecessary upsells, and I felt genuinely cared for. The booking process was seamless.' },
  { id: 3, rating: 4, name: 'Priya K.', date: 'January 2025', text: 'Very professional and thorough. Waiting time was a bit longer than expected but the quality of care more than made up for it. Will definitely be coming back.' },
];

// ── TOP BAR ───────────────────────────────────────────────────────────────────
const TopBar = ({ dentistName }) => {
  const navigate = useNavigate();
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'oklch(0.985 0.005 80 / 0.94)', backdropFilter: 'saturate(180%) blur(16px)', borderBottom: '1px solid var(--line-2)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 32px 8px' }}>
        {/* Row 1: back + logo + share */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/dentists')} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--bg)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--ink-2)', transition: 'border-color .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
            </button>
            <img src={logo} alt="whyclick.tv" style={{ height: 26, cursor: 'pointer' }} onClick={() => navigate('/')} />
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', font: '500 13px/1 Inter', color: 'var(--ink-2)', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
        </div>
        {/* Row 2: breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '400 12px/1 Inter', color: 'var(--ink-3)', marginTop: 6, paddingLeft: 2 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/dentists')}>Dentists</span>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{dentistName}</span>
        </div>
      </div>
    </header>
  );
};

// ── HERO BANNER ───────────────────────────────────────────────────────────────
const HeroBanner = ({ d }) => (
  <div style={{ width: '100%', height: 260, overflow: 'hidden', position: 'relative' }}>
    <img src={d.hero} alt={d.clinic} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,6,0.55) 100%)' }} />
  </div>
);

// ── PROFILE HEADER ────────────────────────────────────────────────────────────
const ProfileHeader = ({ d }) => (
  <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 32px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        {/* Avatar + name block */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 20px -4px rgba(20,15,10,0.3)', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-alt)', marginTop: -56, position: 'relative', zIndex: 2 }}>
            <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div style={{ paddingTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              <h1 style={{ margin: 0, font: '700 26px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{d.name}</h1>
              <Tag tone="green" size="sm"><Icon name="check-badge" size={10} /> Verified</Tag>
            </div>
            <div style={{ font: '400 14px/1.4 Inter', color: 'var(--ink-2)', marginBottom: 10 }}>{d.title} · {d.specialization}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, font: '400 13px/1 Inter', color: 'var(--ink-3)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="pin" size={13} color="var(--accent)" />{d.address}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Icon name="briefcase" size={13} color="var(--ink-3)" />{d.experience}+ yrs experience
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
);

// ── SECTION HEADING ───────────────────────────────────────────────────────────
const SectionHead = ({ title }) => (
  <div style={{ font: '600 15px/1 Inter', color: 'var(--ink)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
    <span>{title}</span>
    <div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
  </div>
);

// ── LEFT COLUMN ───────────────────────────────────────────────────────────────
const LeftColumn = ({ d }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* About */}
      <section>
        <SectionHead title="About" />
        <p style={{ font: '400 14px/1.75 Inter', color: 'var(--ink-2)', margin: 0 }}>{d.bio}</p>
      </section>

      {/* Services */}
      <section>
        <SectionHead title="Specialisation" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {d.services.map(svc => (
            <span key={svc} style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>
              {svc}
            </span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <SectionHead title="Certifications & Credentials" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {d.certifications.map((cert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-alt)', borderRadius: 10, border: '1px solid var(--line-2)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name="check-badge" size={14} color="var(--accent)" />
              </div>
              <span style={{ font: '500 13px/1.3 Inter', color: 'var(--ink-2)' }}>{cert}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section>
        <SectionHead title="Patient Reviews" />
        {/* Average */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, padding: '16px 18px', background: 'var(--bg-alt)', borderRadius: 12, border: '1px solid var(--line-2)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ font: '700 36px/1 Inter', color: 'var(--ink)', letterSpacing: '-0.03em' }}>{d.rating}</div>
            <div style={{ display: 'flex', gap: 2, marginTop: 6, justifyContent: 'center' }}>
              {[1,2,3,4,5].map(i => (
                <Icon key={i} name="star" size={14} color={i <= Math.round(d.rating) ? 'oklch(0.72 0.14 75)' : 'var(--line)'} />
              ))}
            </div>
            <div style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)', marginTop: 5 }}>{d.reviews} reviews</div>
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 2 }}>
            {[5,4,3].map(star => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)', width: 8 }}>{star}</span>
                <Icon name="star" size={11} color="oklch(0.72 0.14 75)" />
                <div style={{ flex: 1, height: 5, borderRadius: 999, background: 'var(--line-2)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: 'oklch(0.72 0.14 75)', width: star === 5 ? '72%' : star === 4 ? '20%' : '8%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SAMPLE_REVIEWS.map(r => (
            <div key={r.id} style={{ padding: '16px 18px', background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={13} color={i <= r.rating ? 'oklch(0.72 0.14 75)' : 'var(--line)'} />)}
              </div>
              <p style={{ font: '400 13px/1.65 Inter', color: 'var(--ink-2)', margin: '0 0 10px' }}>"{r.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>
                <span>— {r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// ── RIGHT COLUMN ──────────────────────────────────────────────────────────────
const RightColumn = ({ d }) => {
  const [form, setForm]   = useState({ service: '', date: '', time: '', notes: '' });
  const [sent, setSent]   = useState(false);
  const [tab, setTab]     = useState('book');
  const [chat, setChat]   = useState('');
  const [chatLog, setChatLog] = useState([]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const sendChat = () => {
    if (!chat.trim()) return;
    setChatLog(l => [...l, { from: 'me', text: chat.trim() }]);
    setChat('');
    setTimeout(() => setChatLog(l => [...l, { from: 'them', text: `Hi! This is ${d.name.split(' ')[1]}'s office. We'll get back to you shortly.` }]), 900);
  };

  const inputSt = {
    width: '100%', border: '1.5px solid var(--line)', borderRadius: 10,
    padding: '11px 13px', font: '400 13px/1.4 Inter', color: 'var(--ink)',
    background: 'var(--bg)', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s', fontFamily: 'Inter, sans-serif',
  };
  const fo = e => { e.target.style.borderColor = 'var(--accent)'; };
  const fb = e => { e.target.style.borderColor = 'var(--line)'; };
  const labelSt = { display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-2)', marginBottom: 5 };
  const canSubmit = form.service && form.date;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Video intro */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', cursor: 'pointer', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=720&q=80&auto=format&fit=crop" alt="Intro video" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', border: '2px solid rgba(255,255,255,0.5)', display: 'grid', placeItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z" /></svg>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px' }}>
              <div style={{ font: '600 14px/1.2 Inter', color: 'white' }}>Watch Introduction</div>
              <div style={{ font: '400 11px/1.4 Inter', color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{d.name} · 1–2 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking form */}
      <div style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px -8px rgba(20,15,10,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--line-2)' }}>
          {['book', 'chat'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 8px', border: 'none', background: tab === t ? 'var(--bg)' : 'var(--bg-alt)', font: tab === t ? '600 13px/1 Inter' : '400 13px/1 Inter', color: tab === t ? 'var(--accent)' : 'var(--ink-3)', cursor: 'pointer', borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent', transition: 'all .15s' }}>
              {t === 'book' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              )}
              {t === 'book' ? 'Book Appointment' : 'Chat'}
            </button>
          ))}
        </div>
        <div style={{ padding: 20 }}>
          {tab === 'chat' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ minHeight: 180, maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, padding: '4px 0' }}>
                {chatLog.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--ink-3)', font: '400 12px/1.6 Inter', padding: '24px 12px' }}>
                    Send a message to start chatting with {d.name.split(' ')[1]}'s office.
                  </div>
                )}
                {chatLog.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '80%', padding: '8px 12px', borderRadius: m.from === 'me' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', background: m.from === 'me' ? 'var(--accent)' : 'var(--bg-alt)', color: m.from === 'me' ? 'white' : 'var(--ink-2)', font: '400 12px/1.5 Inter', border: m.from === 'me' ? 'none' : '1px solid var(--line-2)' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={chat} onChange={e => setChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Type a message…"
                  style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 10, padding: '9px 13px', font: '400 13px/1 Inter', color: 'var(--ink)', background: 'var(--bg)', outline: 'none' }} />
                <button onClick={sendChat} style={{ padding: '9px 16px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: 'white', font: '600 13px/1 Inter', cursor: 'pointer' }}>Send</button>
              </div>
            </div>
          ) : sent ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.94 0.06 145)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                <Icon name="check-badge" size={24} color="var(--green)" />
              </div>
              <div style={{ font: '600 16px/1.2 Inter', color: 'var(--ink)', marginBottom: 6 }}>Request sent!</div>
              <div style={{ font: '400 13px/1.5 Inter', color: 'var(--ink-3)', marginBottom: 16 }}>
                {d.name} will respond within 1 hour.
              </div>
              <button onClick={() => setSent(false)} style={{ font: '500 12px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Send another request
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'var(--accent-soft)', border: '1px solid oklch(0.88 0.08 30)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Consultation starting from</span>
                <span style={{ font: '700 18px/1 Inter', color: 'var(--accent)', letterSpacing: '-0.02em' }}>${d.price}</span>
              </div>
              <div>
                <label style={labelSt}>Service Type *</label>
                <div style={{ position: 'relative' }}>
                  <select value={form.service} onChange={e => set('service', e.target.value)}
                    style={{ ...inputSt, paddingRight: 34, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
                    onFocus={fo} onBlur={fb}>
                    <option value="">Select a service…</option>
                    {d.services.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <Icon name="chevron-down" size={13} color="var(--ink-3)" />
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelSt}>Preferred Date *</label>
                  <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                    style={inputSt} onFocus={fo} onBlur={fb} />
                </div>
                <div>
                  <label style={labelSt}>Preferred Time</label>
                  <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                    style={inputSt} onFocus={fo} onBlur={fb} />
                </div>
              </div>
              <div>
                <label style={labelSt}>Additional Notes</label>
                <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Any concerns or specific requests…"
                  style={{ ...inputSt, resize: 'vertical', minHeight: 72 }}
                  onFocus={fo} onBlur={fb}
                />
              </div>
              <button
                onClick={() => { if (canSubmit) setSent(true); }}
                style={{ width: '100%', padding: '13px', borderRadius: 11, border: 'none', background: canSubmit ? 'var(--accent)' : 'oklch(0.88 0.01 80)', color: canSubmit ? 'white' : 'var(--ink-3)', font: '600 14px/1 Inter', cursor: canSubmit ? 'pointer' : 'default', transition: 'opacity .15s, background .2s' }}
                onMouseEnter={e => { if (canSubmit) e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Request Consultation
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

// ── PAGE ROOT ─────────────────────────────────────────────────────────────────
export default function DentistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const d = DENTISTS.find(x => x.id === parseInt(id, 10));

  React.useEffect(() => {
    if (!d) navigate('/dentists', { replace: true });
  }, [d, navigate]);

  if (!d) return null;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopBar dentistName={d.name} />
      <HeroBanner d={d} />
      <ProfileHeader d={d} />

      {/* Two-column body */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 36, alignItems: 'start' }}>
        {/* LEFT — profile details */}
        <LeftColumn d={d} />

        {/* RIGHT — sticky actions */}
        <div style={{ position: 'sticky', top: 80 }}>
          <RightColumn d={d} />
        </div>
      </div>
    </div>
  );
}

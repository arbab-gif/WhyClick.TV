import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import L from 'leaflet';
import { Icon, Tag, Btn } from '../components/primitives';
import AskAIFab from '../components/AskAIFab';
import SiteNav from '../components/SiteNav';

// ── SHARED PRO DATA ───────────────────────────────────────────────────────────
const ALL_PROS = {
  photographers: [
    { id: 4,  name: 'Sophie Laurent',  role: 'Wedding Photographer',    loc: 'Williamsburg, NY', tags: ['Weddings', 'Portraits'],       rating: 5.0, reviews: 318, fee: 350, distance: 0.7, lat: 40.7081, lng: -73.9571, address: '210 N 8th St, Williamsburg',      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 5,  name: 'Marcus Cole',     role: 'Event Photographer',      loc: 'Brooklyn, NY',     tags: ['Events', 'Corporate'],         rating: 4.8, reviews: 204, fee: 220, distance: 1.0, lat: 40.6782, lng: -73.9442, address: '88 Atlantic Ave, Brooklyn',       img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 6,  name: 'Rina Tanaka',     role: 'Portrait Photographer',   loc: 'Greenpoint, NY',   tags: ['Portraits', 'Headshots'],      rating: 4.9, reviews: 156, fee: 180, distance: 1.3, lat: 40.7287, lng: -73.9549, address: '55 Greenpoint Ave, Greenpoint',    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 19, name: 'Luca Ferretti',   role: 'Commercial Photographer', loc: 'Brooklyn, NY',     tags: ['Commercial', 'Products'],      rating: 4.7, reviews: 88,  fee: 400, distance: 1.6, lat: 40.6900, lng: -73.9600, address: '320 Court St, Brooklyn',          img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 20, name: 'Amara Diallo',    role: 'Family Photographer',     loc: 'Park Slope, NY',   tags: ['Family', 'Newborn'],           rating: 5.0, reviews: 241, fee: 250, distance: 1.9, lat: 40.6710, lng: -73.9814, address: '178 7th Ave, Park Slope',          img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 21, name: 'Dev Patel',       role: 'Real Estate Photographer',loc: 'Williamsburg, NY', tags: ['Interiors', 'Aerial'],         rating: 4.8, reviews: 132, fee: 300, distance: 2.2, lat: 40.7100, lng: -73.9530, address: '45 Berry St, Williamsburg',        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 22, name: 'Chloe Bennett',   role: 'Fashion Photographer',    loc: 'Bushwick, NY',     tags: ['Fashion', 'Editorial'],        rating: 4.9, reviews: 174, fee: 500, distance: 2.6, lat: 40.6944, lng: -73.9213, address: '56 Wyckoff Ave, Bushwick',         img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 23, name: 'Noah Williams',   role: 'Sports Photographer',     loc: 'Brooklyn, NY',     tags: ['Sports', 'Action'],            rating: 4.7, reviews: 99,  fee: 275, distance: 3.0, lat: 40.6600, lng: -73.9500, address: '740 Flatbush Ave, Brooklyn',       img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 35, name: 'Isla Morrison',   role: 'Food Photographer',       loc: 'Greenpoint, NY',   tags: ['Food', 'Restaurant'],          rating: 4.9, reviews: 113, fee: 320, distance: 3.4, lat: 40.7310, lng: -73.9490, address: '90 Franklin St, Greenpoint',        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop&crop=faces' },
  ],
  'salon-spa': [
    { id: 7,  name: 'Jade Monroe',     role: 'Master Stylist',          loc: 'Brooklyn, NY',     tags: ['Color', 'Cuts'],               rating: 4.9, reviews: 531, fee: 95,  distance: 0.5, lat: 40.6830, lng: -73.9442, address: '300 Atlantic Ave, Brooklyn',       img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 8,  name: 'Elena Vasquez',   role: 'Esthetician',             loc: 'Williamsburg, NY', tags: ['Facials', 'Waxing'],           rating: 4.8, reviews: 289, fee: 80,  distance: 0.9, lat: 40.7081, lng: -73.9571, address: '125 N 6th St, Williamsburg',      img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 9,  name: 'Kira Osei',       role: 'Massage Therapist',       loc: 'Greenpoint, NY',   tags: ['Deep Tissue', 'Relaxation'],   rating: 5.0, reviews: 174, fee: 110, distance: 1.2, lat: 40.7287, lng: -73.9549, address: '40 Nassau Ave, Greenpoint',        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 24, name: 'Tara Nguyen',     role: 'Nail Technician',         loc: 'Park Slope, NY',   tags: ['Gel', 'Nail Art'],             rating: 4.9, reviews: 402, fee: 55,  distance: 1.5, lat: 40.6710, lng: -73.9814, address: '220 5th Ave, Park Slope',          img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 25, name: 'Isabelle Roux',   role: 'Lash Artist',             loc: 'Brooklyn, NY',     tags: ['Lash Extensions', 'Lifts'],    rating: 5.0, reviews: 318, fee: 130, distance: 1.8, lat: 40.6760, lng: -73.9600, address: '88 Dekalb Ave, Brooklyn',          img: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 26, name: 'Priya Kapoor',    role: 'Brow Specialist',         loc: 'Williamsburg, NY', tags: ['Microblading', 'Threading'],   rating: 4.8, reviews: 227, fee: 90,  distance: 2.1, lat: 40.7050, lng: -73.9530, address: '76 S 4th St, Williamsburg',        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 27, name: 'Maya Torres',     role: 'Makeup Artist',           loc: 'Bushwick, NY',     tags: ['Bridal', 'Editorial'],         rating: 4.9, reviews: 183, fee: 150, distance: 2.5, lat: 40.6944, lng: -73.9213, address: '112 Knickerbocker Ave, Bushwick',   img: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 28, name: 'Leo Andersen',    role: 'Barber',                  loc: 'Greenpoint, NY',   tags: ['Fades', 'Beard Trim'],         rating: 4.8, reviews: 614, fee: 45,  distance: 2.9, lat: 40.7310, lng: -73.9490, address: '60 Manhattan Ave, Greenpoint',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 36, name: 'Simone Park',     role: 'Reiki & Wellness',        loc: 'Park Slope, NY',   tags: ['Reiki', 'Wellness'],           rating: 4.9, reviews: 96,  fee: 120, distance: 3.2, lat: 40.6680, lng: -73.9800, address: '410 7th Ave, Park Slope',           img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&q=80&auto=format&fit=crop&crop=faces' },
  ],
  restaurants: [
    { id: 10, name: 'Osteria Nolita',  role: 'Italian · Fine Dining',   loc: 'Brooklyn, NY',     tags: ['Italian', 'Wine Bar'],         rating: 4.9, reviews: 892,  fee: 65,  distance: 0.6, lat: 40.6850, lng: -73.9540, address: '88 Smith St, Brooklyn',            img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop' },
    { id: 11, name: 'Sōra Ramen',      role: 'Japanese · Casual',       loc: 'Williamsburg, NY', tags: ['Ramen', 'Izakaya'],            rating: 4.8, reviews: 1204, fee: 22,  distance: 0.9, lat: 40.7081, lng: -73.9571, address: '310 Bedford Ave, Williamsburg',    img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80&auto=format&fit=crop' },
    { id: 12, name: 'Casa Verde',      role: 'Mexican · Brunch',        loc: 'Greenpoint, NY',   tags: ['Tacos', 'Brunch'],             rating: 4.7, reviews: 643,  fee: 30,  distance: 1.2, lat: 40.7287, lng: -73.9549, address: '70 Nassau Ave, Greenpoint',         img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop' },
    { id: 29, name: 'The Ember Room',  role: 'American · Steakhouse',   loc: 'Brooklyn, NY',     tags: ['Steak', 'Cocktails'],          rating: 4.9, reviews: 741,  fee: 85,  distance: 1.5, lat: 40.6920, lng: -73.9620, address: '150 Atlantic Ave, Brooklyn',       img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop' },
    { id: 30, name: 'Mango & Lime',    role: 'Caribbean · Casual',      loc: 'Flatbush, NY',     tags: ['Caribbean', 'Vegan Options'],  rating: 4.8, reviews: 529,  fee: 28,  distance: 1.9, lat: 40.6501, lng: -73.9496, address: '900 Flatbush Ave, Brooklyn',        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop' },
    { id: 31, name: 'Tulum Kitchen',   role: 'Mexican · Fine Dining',   loc: 'Williamsburg, NY', tags: ['Tasting Menu', 'Mezcal'],      rating: 5.0, reviews: 418,  fee: 95,  distance: 2.2, lat: 40.7100, lng: -73.9530, address: '55 Wythe Ave, Williamsburg',        img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80&auto=format&fit=crop' },
    { id: 32, name: 'Spice Route',     role: 'Indian · Modern',         loc: 'Park Slope, NY',   tags: ['Indian', 'Vegetarian'],        rating: 4.8, reviews: 387,  fee: 40,  distance: 2.6, lat: 40.6710, lng: -73.9814, address: '340 5th Ave, Park Slope',           img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop' },
    { id: 33, name: 'Le Petit Bistro', role: 'French · Café',           loc: 'Greenpoint, NY',   tags: ['Brunch', 'French'],            rating: 4.9, reviews: 602,  fee: 35,  distance: 3.0, lat: 40.7310, lng: -73.9490, address: '112 Franklin St, Greenpoint',       img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop' },
    { id: 34, name: 'Nori & Co.',      role: 'Japanese · Sushi',        loc: 'Brooklyn, NY',     tags: ['Sushi', 'Omakase'],            rating: 5.0, reviews: 511,  fee: 120, distance: 3.4, lat: 40.6600, lng: -73.9700, address: '480 Court St, Brooklyn',            img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80&auto=format&fit=crop' },
  ],
};

const INDUSTRY_META = {
  photographers: { label: 'Photographers', noun: 'photographer' },
  'salon-spa':   { label: 'Salon & Spa',   noun: 'provider'     },
  restaurants:   { label: 'Restaurants',   noun: 'restaurant'   },
};


// ── SEARCH SUB-BAR ────────────────────────────────────────────────────────────
const SearchSubBar = ({ industry, location, onLocationChange, query, onQueryChange }) => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)', padding: '20px 24px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0,
          background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 999,
          padding: 4, minWidth: 480, maxWidth: 600, flex: 1 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', flex: 1 }}>
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input value={query} onChange={e => onQueryChange(e.target.value)}
              placeholder={`Search ${industry.label.toLowerCase()}…`}
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

// ── PRO CARD (horizontal) ─────────────────────────────────────────────────────
const ProCard = ({ pro, active, hovered, onHover, onViewProfile }) => (
  <article
    data-id={pro.id}
    onMouseEnter={() => onHover(pro.id)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onViewProfile(pro.id)}
    style={{
      display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0,
      background: 'var(--bg)',
      border: `1px solid ${active ? 'var(--accent)' : (hovered ? 'var(--ink-3)' : 'var(--line)')}`,
      borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      boxShadow: active ? '0 0 0 3px var(--accent-soft)' : (hovered ? '0 8px 24px -12px rgba(40,30,20,.18)' : 'none'),
      transition: 'border-color .15s, box-shadow .15s',
    }}>
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 180 }}>
      <img src={pro.img} alt={pro.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
    </div>
    <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <div style={{ font: '600 16px/1.25 Inter', letterSpacing: '-0.01em', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pro.name}</div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-label="Verified">
            <circle cx="12" cy="12" r="12" fill="var(--green)" />
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <Icon name="star" size={13} color="var(--gold)" />
          <span style={{ font: '600 13px/1 Inter' }}>{pro.rating}</span>
          <span style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>({pro.reviews})</span>
        </div>
      </div>
      <div style={{ font: '400 13px/1.3 Inter', color: 'var(--ink-2)', marginBottom: 8 }}>{pro.role}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {pro.tags.map(t => (
          <span key={t} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line-2)', font: '500 11px/1.4 Inter', color: 'var(--ink-2)' }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 16 }}>
        <Icon name="pin" size={12} /> {pro.distance} mi · {pro.address}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 14, borderTop: '1px solid var(--line-2)', marginTop: 'auto' }}>
        <div>
          <span style={{ font: '700 20px/1 Inter', color: 'var(--ink)', letterSpacing: '-0.02em' }}>${pro.fee}</span>
          <span style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)', marginLeft: 5 }}>/ session</span>
        </div>
        <Btn variant="primary" size="sm" iconRight="arrow-right" onClick={e => { e.stopPropagation(); onViewProfile(pro.id); }}>View profile</Btn>
      </div>
    </div>
  </article>
);

// ── MAP ───────────────────────────────────────────────────────────────────────
function makePinHTML(pro, active, hover) {
  if (active) return `<div style="display:inline-flex;align-items:center;background:#FC5647;color:white;border:2px solid white;border-radius:999px;padding:5px 10px;font:700 12px/1 Inter,sans-serif;box-shadow:0 4px 12px -2px rgba(199,58,44,.5);white-space:nowrap;cursor:pointer;">$${pro.fee}</div>`;
  const color = hover ? '#C73A2C' : '#FC5647';
  const size = hover ? 22 : 18;
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 3px 10px -2px rgba(199,58,44,.45);cursor:pointer;"></div>`;
}

const MapView = ({ items, activeId, hoveredId, onPinClick, onPinHover, collapsed, onToggleCollapse, noun }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (collapsed || !containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { zoomControl: false, scrollWheelZoom: true })
      .setView([40.7081, -73.9571], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap · © CARTO', maxZoom: 19, subdomains: 'abcd',
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 50);
  }, [collapsed]);

  useEffect(() => {
    if (!mapRef.current) return;
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};
    items.forEach(pro => {
      const isActive = pro.id === activeId;
      const isHover = pro.id === hoveredId;
      const icon = L.divIcon({
        className: 'wc-pin',
        html: makePinHTML(pro, isActive, isHover),
        iconSize: isActive ? [56, 28] : [22, 22],
        iconAnchor: isActive ? [28, 14] : [11, 11],
      });
      const marker = L.marker([pro.lat, pro.lng], { icon, riseOnHover: true })
        .addTo(mapRef.current)
        .on('click', () => onPinClick(pro.id))
        .on('mouseover', () => onPinHover(pro.id))
        .on('mouseout', () => onPinHover(null));
      markersRef.current[pro.id] = marker;
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
        <span style={{ font: '600 12px/1 Inter' }}>{items.length} {noun}s in this area</span>
      </div>
      <button onClick={onToggleCollapse} style={{
        position: 'absolute', top: 16, right: 16, zIndex: 500,
        background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8,
        padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        font: '500 12px/1 Inter', color: 'var(--ink-2)',
      }}>
        <Icon name="chevron-right" size={12} /> Collapse
      </button>
      <div ref={containerRef} style={{ flex: 1, width: '100%', height: '100%' }} />
    </aside>
  );
};

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function ProListing() {
  const { industry } = useParams();
  const navigate = useNavigate();
  const meta = INDUSTRY_META[industry] || { label: 'Professionals', noun: 'professional' };
  const pros = ALL_PROS[industry] || [];

  const [location, setLocation] = useState('Brooklyn, NY · 11211');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('distance');
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const cardRefs = useRef({});

  const filtered = useMemo(() => {
    let list = pros.filter(p =>
      !query || (p.name + p.role + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())
    );
    if (sort === 'distance') list.sort((a, b) => a.distance - b.distance);
    if (sort === 'rating')   list.sort((a, b) => b.rating - a.rating);
    if (sort === 'price')    list.sort((a, b) => a.fee - b.fee);
    return list;
  }, [pros, query, sort]);

  const handlePinClick = (id) => {
    setActiveId(id);
    const el = cardRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <SiteNav />
      <SearchSubBar
        industry={meta}
        location={location} onLocationChange={setLocation}
        query={query} onQueryChange={setQuery}
      />
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <main style={{ flex: 1, minWidth: 0, padding: '24px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ margin: 0, font: '700 28px/1.1 Inter', letterSpacing: '-0.02em' }}>
              {filtered.length} {meta.label.toLowerCase()} near {location.split(' · ')[0]}
            </h1>
            <p style={{ margin: '6px 0 0', font: '400 14px/1.4 Inter', color: 'var(--ink-3)' }}>
              Sorted by {sort === 'distance' ? 'distance' : sort === 'rating' ? 'rating' : 'price'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(pro => (
              <div key={pro.id} ref={el => cardRefs.current[pro.id] = el}>
                <ProCard
                  pro={pro}
                  active={activeId === pro.id}
                  hovered={hoveredId === pro.id}
                  onHover={setHoveredId}
                  onViewProfile={(id) => navigate(`/${industry}/${id}`)}
                />
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '64px 24px', textAlign: 'center',
                background: 'var(--bg-alt)', borderRadius: 14, border: '1px dashed var(--line)' }}>
                <div style={{ font: '600 18px/1.3 Inter', marginBottom: 6 }}>No results found</div>
                <div style={{ font: '400 14px/1.4 Inter', color: 'var(--ink-3)' }}>
                  Try a different search term.
                </div>
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
          noun={meta.noun}
        />
      </div>
      <AskAIFab />
    </>
  );
}

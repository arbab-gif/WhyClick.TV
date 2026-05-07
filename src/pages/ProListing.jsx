import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import L from 'leaflet';
import { Icon, Tag, Btn } from '../components/primitives';
import AskAIFab from '../components/AskAIFab';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

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
    { id: 7,  name: 'Monroe Hair Studio',  role: 'Hair Salon · Color & Cuts',          loc: 'Brooklyn, NY',     tags: ['Color', 'Cuts', 'Balayage'],         rating: 4.9, reviews: 531, fee: 95,  distance: 0.5, lat: 40.6830, lng: -73.9442, address: '300 Atlantic Ave, Brooklyn',       img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop' },
    { id: 8,  name: 'Glow by Elena',       role: 'Facial & Skin Care Studio',          loc: 'Williamsburg, NY', tags: ['Facials', 'Peels', 'Waxing'],        rating: 4.8, reviews: 289, fee: 80,  distance: 0.9, lat: 40.7081, lng: -73.9571, address: '125 N 6th St, Williamsburg',      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80&auto=format&fit=crop' },
    { id: 9,  name: 'Kira Wellness',       role: 'Massage & Wellness Studio',          loc: 'Greenpoint, NY',   tags: ['Deep Tissue', 'Relaxation'],         rating: 5.0, reviews: 174, fee: 110, distance: 1.2, lat: 40.7287, lng: -73.9549, address: '40 Nassau Ave, Greenpoint',        img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&auto=format&fit=crop' },
    { id: 24, name: 'Tara Nails',          role: 'Nail Studio · Gel & Nail Art',       loc: 'Park Slope, NY',   tags: ['Gel', 'Nail Art', 'Dip Powder'],     rating: 4.9, reviews: 402, fee: 55,  distance: 1.5, lat: 40.6710, lng: -73.9814, address: '220 5th Ave, Park Slope',          img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop' },
    { id: 25, name: 'Roux Lash Atelier',   role: 'Lash & Brow Atelier',                loc: 'Brooklyn, NY',     tags: ['Lash Extensions', 'Lifts'],          rating: 5.0, reviews: 318, fee: 130, distance: 1.8, lat: 40.6760, lng: -73.9600, address: '88 Dekalb Ave, Brooklyn',          img: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80&auto=format&fit=crop' },
    { id: 26, name: 'Kapoor Brow Studio',  role: 'Brow Design & Microblading Studio',  loc: 'Williamsburg, NY', tags: ['Microblading', 'Threading'],         rating: 4.8, reviews: 227, fee: 90,  distance: 2.1, lat: 40.7050, lng: -73.9530, address: '76 S 4th St, Williamsburg',        img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop' },
    { id: 27, name: 'Torres Beauty',       role: 'Makeup & Beauty Studio',             loc: 'Bushwick, NY',     tags: ['Bridal', 'Editorial', 'Airbrush'],   rating: 4.9, reviews: 183, fee: 150, distance: 2.5, lat: 40.6944, lng: -73.9213, address: '112 Knickerbocker Ave, Bushwick',   img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop' },
    { id: 28, name: "Leo's Barbershop",    role: 'Barbershop · Fades & Grooming',      loc: 'Greenpoint, NY',   tags: ['Fades', 'Beard Trim', 'Tapers'],     rating: 4.8, reviews: 614, fee: 45,  distance: 2.9, lat: 40.7310, lng: -73.9490, address: '60 Manhattan Ave, Greenpoint',      img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop' },
    { id: 36, name: 'Park Wellness Studio',role: 'Reiki & Holistic Wellness Center',   loc: 'Park Slope, NY',   tags: ['Reiki', 'Wellness', 'Sound Bath'],   rating: 4.9, reviews: 96,  fee: 120, distance: 3.2, lat: 40.6680, lng: -73.9800, address: '410 7th Ave, Park Slope',           img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80&auto=format&fit=crop' },
  ],
  'home-services': [
    { id: 40, name: 'Carlos Mendez',      role: 'Licensed Plumber',            loc: 'Brooklyn, NY',     tags: ['Plumbing', 'Emergency'],           rating: 4.9, reviews: 312, fee: 95,  distance: 0.6, lat: 40.6830, lng: -73.9442, address: '200 Atlantic Ave, Brooklyn',        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop' },
    { id: 41, name: 'Mike Torres',        role: 'Master Electrician',          loc: 'Williamsburg, NY', tags: ['Electrical', 'Rewiring'],          rating: 4.8, reviews: 198, fee: 110, distance: 0.9, lat: 40.7081, lng: -73.9571, address: '88 Bedford Ave, Williamsburg',      img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&auto=format&fit=crop' },
    { id: 42, name: 'Sunshine Cleaners',  role: 'Residential Cleaning Co.',    loc: 'Greenpoint, NY',   tags: ['Cleaning', 'Deep Clean'],          rating: 5.0, reviews: 541, fee: 80,  distance: 1.1, lat: 40.7287, lng: -73.9549, address: '30 Nassau Ave, Greenpoint',         img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop' },
    { id: 43, name: 'Ray Fitzgerald',     role: 'Painter & Decorator',         loc: 'Park Slope, NY',   tags: ['Painting', 'Interior'],            rating: 4.8, reviews: 174, fee: 75,  distance: 1.4, lat: 40.6710, lng: -73.9814, address: '150 7th Ave, Park Slope',           img: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80&auto=format&fit=crop' },
    { id: 44, name: 'BK Carpentry Co.',   role: 'Custom Carpentry & Joinery',  loc: 'Brooklyn, NY',     tags: ['Carpentry', 'Custom Furniture'],   rating: 4.9, reviews: 230, fee: 120, distance: 1.7, lat: 40.6900, lng: -73.9600, address: '280 Court St, Brooklyn',            img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80&auto=format&fit=crop' },
    { id: 45, name: 'CoolAir HVAC',       role: 'HVAC Install & Repair',       loc: 'Bushwick, NY',     tags: ['HVAC', 'Air Conditioning'],        rating: 4.7, reviews: 147, fee: 130, distance: 2.0, lat: 40.6944, lng: -73.9213, address: '90 Wyckoff Ave, Bushwick',          img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80&auto=format&fit=crop' },
    { id: 46, name: 'GreenThumb NYC',     role: 'Landscaping & Gardening',     loc: 'Williamsburg, NY', tags: ['Landscaping', 'Garden Design'],    rating: 4.9, reviews: 189, fee: 90,  distance: 2.3, lat: 40.7050, lng: -73.9530, address: '55 Grand St, Williamsburg',         img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop' },
    { id: 47, name: 'BoroBmovers',        role: 'Local Moving Service',        loc: 'Brooklyn, NY',     tags: ['Moving', 'Packing'],               rating: 4.8, reviews: 403, fee: 150, distance: 2.7, lat: 40.6600, lng: -73.9500, address: '600 Flatbush Ave, Brooklyn',        img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80&auto=format&fit=crop' },
    { id: 48, name: 'Fix-It Fast',        role: 'General Handyman',            loc: 'Greenpoint, NY',   tags: ['Plumbing', 'Electrical', 'HVAC'],  rating: 4.7, reviews: 267, fee: 70,  distance: 3.1, lat: 40.7310, lng: -73.9490, address: '20 Calyer St, Greenpoint',          img: 'https://images.unsplash.com/photo-1574361767743-23bd9b80e3ee?w=600&q=80&auto=format&fit=crop' },
  ],
  'professional-service': [
    { id: 50, name: 'Priya Sharma, Esq.',  role: 'Business & Contract Attorney', loc: 'Brooklyn, NY',     tags: ['Legal', 'Contracts'],             rating: 4.9, reviews: 208, fee: 250, distance: 0.7, lat: 40.6850, lng: -73.9540, address: '100 Montague St, Brooklyn',         img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 51, name: 'Marcus Webb, CPA',    role: 'Certified Public Accountant',  loc: 'Williamsburg, NY', tags: ['Accounting', 'Tax'],              rating: 4.9, reviews: 341, fee: 180, distance: 0.9, lat: 40.7081, lng: -73.9571, address: '200 N 7th St, Williamsburg',        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 52, name: 'Lin & Assoc.',        role: 'Business Strategy Consulting', loc: 'Greenpoint, NY',   tags: ['Consulting', 'Finance'],          rating: 4.8, reviews: 126, fee: 200, distance: 1.2, lat: 40.7287, lng: -73.9549, address: '65 Greenpoint Ave, Greenpoint',     img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 53, name: 'Omar Khalil',         role: 'Digital Marketing Consultant', loc: 'Park Slope, NY',   tags: ['Marketing', 'SEO'],               rating: 4.7, reviews: 183, fee: 120, distance: 1.5, lat: 40.6710, lng: -73.9814, address: '410 5th Ave, Park Slope',           img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 54, name: 'Studio Axis',         role: 'Brand & UX Design Agency',    loc: 'Brooklyn, NY',     tags: ['Design', 'Branding'],             rating: 5.0, reviews: 97,  fee: 160, distance: 1.8, lat: 40.6920, lng: -73.9620, address: '320 Atlantic Ave, Brooklyn',        img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80&auto=format&fit=crop' },
    { id: 55, name: 'Anika Patel, CFP',    role: 'Certified Financial Planner',  loc: 'Williamsburg, NY', tags: ['Finance', 'Investment'],          rating: 4.9, reviews: 152, fee: 220, distance: 2.1, lat: 40.7050, lng: -73.9530, address: '78 Grand St, Williamsburg',         img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop&crop=faces' },
    { id: 56, name: 'TalentBridge HR',     role: 'HR & Recruiting Consultancy',  loc: 'Bushwick, NY',     tags: ['HR', 'Recruiting'],               rating: 4.8, reviews: 74,  fee: 140, distance: 2.4, lat: 40.6944, lng: -73.9213, address: '44 Wyckoff Ave, Bushwick',          img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop' },
    { id: 57, name: 'CodeNest IT',         role: 'IT Support & Managed Services',loc: 'Greenpoint, NY',   tags: ['IT', 'Cybersecurity'],            rating: 4.8, reviews: 211, fee: 100, distance: 2.8, lat: 40.7310, lng: -73.9490, address: '80 Franklin St, Greenpoint',        img: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=80&auto=format&fit=crop' },
    { id: 58, name: 'Reyes Notary',        role: 'Notary & Document Services',   loc: 'Brooklyn, NY',     tags: ['Legal', 'Notary'],                rating: 4.9, reviews: 488, fee: 50,  distance: 3.2, lat: 40.6600, lng: -73.9500, address: '700 Flatbush Ave, Brooklyn',        img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop' },
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
  photographers:        { label: 'Photographers',      noun: 'photographer', isBusiness: false },
  'salon-spa':          { label: 'Salon & Spa',        noun: 'venue',        isBusiness: true  },
  restaurants:          { label: 'Restaurants',        noun: 'restaurant',   isBusiness: true  },
  dentists:             { label: 'Dentists',            noun: 'dentist',      isBusiness: false },
  'professional-service': { label: 'Professional Service', noun: 'professional', isBusiness: false },
  'home-services':      { label: 'Home Services',      noun: 'provider',     isBusiness: false },
};

const CATEGORY_NAV = [
  { slug: 'restaurants',           label: 'Restaurants',         icon: 'fork',     accent: '#DC2626', accentBg: '#FEF2F2' },
  { slug: 'dentists',              label: 'Dentists',            icon: 'tooth',    accent: '#2563EB', accentBg: '#EFF6FF' },
  { slug: 'professional-service',  label: 'Professional',        icon: 'briefcase',accent: '#16A34A', accentBg: '#F0FDF4' },
  { slug: 'salon-spa',             label: 'Salon & Spa',         icon: 'scissors', accent: '#DB2777', accentBg: '#FDF2F8' },
  { slug: 'home-services',         label: 'Home Services',       icon: 'wrench',   accent: '#EA580C', accentBg: '#FFF7ED' },
  { slug: 'photographers',         label: 'Photography',         icon: 'camera',   accent: '#9333EA', accentBg: '#FAF5FF' },
];


// ── FILTER SYSTEM ────────────────────────────────────────────────────────────
const FILTER_CONFIG = {
  restaurants: {
    tagLabel: 'Cuisine',
    tags: ['Italian', 'Japanese', 'Mexican', 'Caribbean', 'Indian', 'French', 'American', 'Sushi', 'Brunch', 'Vegan Options'],
    priceMin: 10, priceMax: 150, priceUnit: '/ person',
  },
  'salon-spa': {
    tagLabel: 'Service type',
    tags: ['Color', 'Balayage', 'Cuts', 'Nails', 'Gel', 'Nail Art', 'Massage', 'Deep Tissue', 'Facials', 'Waxing', 'Lash Extensions', 'Microblading', 'Makeup', 'Fades', 'Wellness'],
    priceMin: 30, priceMax: 200, priceUnit: '/ session',
  },
  photographers: {
    tagLabel: 'Specialty',
    tags: ['Weddings', 'Portraits', 'Events', 'Corporate', 'Headshots', 'Commercial', 'Products', 'Family', 'Newborn', 'Interiors', 'Aerial', 'Fashion', 'Editorial', 'Sports', 'Food'],
    priceMin: 100, priceMax: 600, priceUnit: '/ session',
  },
  dentists: {
    tagLabel: 'Treatment',
    tags: ['Cleaning', 'Whitening', 'Pediatric', 'Cosmetic', 'Orthodontics', 'Implants', 'Root Canal', 'Emergency'],
    priceMin: 50, priceMax: 300, priceUnit: '/ consult',
  },
  'home-services': {
    tagLabel: 'Service type',
    tags: ['Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry', 'HVAC', 'Landscaping', 'Moving'],
    priceMin: 50, priceMax: 400, priceUnit: '/ job',
  },
  'professional-service': {
    tagLabel: 'Specialty',
    tags: ['Legal', 'Accounting', 'Consulting', 'Marketing', 'Design', 'Finance', 'HR', 'IT'],
    priceMin: 50, priceMax: 500, priceUnit: '/ hour',
  },
};

const getInitialFilters = (industry) => {
  const cfg = FILTER_CONFIG[industry] || { priceMax: 500 };
  return { tags: [], minRating: 0, maxDistance: 5, maxPrice: cfg.priceMax };
};

const countActiveFilters = (f, industry) => {
  const cfg = FILTER_CONFIG[industry] || { priceMax: 500 };
  return (f.tags.length) + (f.minRating > 0 ? 1 : 0) + (f.maxDistance < 5 ? 1 : 0) + (f.maxPrice < cfg.priceMax ? 1 : 0);
};

const FPill = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '7px 12px', borderRadius: 999,
    border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
    background: active ? 'var(--accent-soft)' : 'var(--bg)',
    color: active ? 'var(--accent)' : 'var(--ink-2)',
    font: '500 12px/1 Inter', cursor: 'pointer', transition: 'all .15s',
  }}>{children}</button>
);

const FGroup = ({ title, children }) => (
  <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--line-2)' }}>
    <div style={{ font: '600 13px/1 Inter', color: 'var(--ink)', marginBottom: 12 }}>{title}</div>
    {children}
  </div>
);

const ProFilterPanel = ({ industry, filters, setFilters }) => {
  const cfg = FILTER_CONFIG[industry] || { tags: [], tagLabel: 'Type', priceMin: 50, priceMax: 500, priceUnit: '' };
  const toggleTag = (t) => setFilters(f => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter(x => x !== t) : [...f.tags, t] }));
  return (
    <div>
      {cfg.tags.length > 0 && (
        <FGroup title={cfg.tagLabel}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {cfg.tags.map(t => <FPill key={t} active={filters.tags.includes(t)} onClick={() => toggleTag(t)}>{t}</FPill>)}
          </div>
        </FGroup>
      )}

      <FGroup title={`Price (max $${filters.maxPrice}${cfg.priceUnit})`}>
        <input type="range" min={cfg.priceMin} max={cfg.priceMax} step={5}
          value={filters.maxPrice}
          onChange={e => setFilters(f => ({ ...f, maxPrice: parseInt(e.target.value) }))}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 11px/1 Inter', color: 'var(--ink-3)', marginTop: 6 }}>
          <span>${cfg.priceMin}</span><span>${cfg.priceMax}+</span>
        </div>
      </FGroup>

      <FGroup title="Rating">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[4.5, 4.0, 3.5].map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="radio" name="pro-rating" checked={filters.minRating === r}
                onChange={() => setFilters(f => ({ ...f, minRating: r }))}
                style={{ accentColor: 'var(--accent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.floor(r) ? 'var(--gold)' : 'var(--line)'} stroke="none">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
                <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', marginLeft: 4 }}>{r}+</span>
              </div>
            </label>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="radio" name="pro-rating" checked={filters.minRating === 0}
              onChange={() => setFilters(f => ({ ...f, minRating: 0 }))}
              style={{ accentColor: 'var(--accent)' }} />
            <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Any rating</span>
          </label>
        </div>
      </FGroup>

      <FGroup title={`Distance (within ${filters.maxDistance} mi)`}>
        <input type="range" min="0.5" max="5" step="0.1"
          value={filters.maxDistance}
          onChange={e => setFilters(f => ({ ...f, maxDistance: parseFloat(e.target.value) }))}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 11px/1 Inter', color: 'var(--ink-3)', marginTop: 6 }}>
          <span>0.5 mi</span><span>5 mi</span>
        </div>
      </FGroup>
    </div>
  );
};

const FilterButton = ({ industry, filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const cfg = FILTER_CONFIG[industry] || { priceMax: 500 };
  const initialFilters = getInitialFilters(industry);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const count = countActiveFilters(filters, industry);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        height: 42, padding: '0 16px', borderRadius: 999,
        background: open ? 'var(--ink)' : 'var(--bg)',
        color: open ? 'var(--bg)' : 'var(--ink)',
        border: `1px solid ${open ? 'var(--ink)' : 'var(--line)'}`,
        font: '500 13px/1 Inter', cursor: 'pointer', transition: 'all .15s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
        </svg>
        Filters
        {count > 0 && (
          <span style={{
            display: 'inline-grid', placeItems: 'center',
            minWidth: 20, height: 20, padding: '0 6px',
            borderRadius: 999, background: 'var(--accent)', color: 'white', font: '600 11px/1 Inter',
          }}>{count}</span>
        )}
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'oklch(0.18 0.02 40 / 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'grid', placeItems: 'center', padding: 24,
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
              <ProFilterPanel industry={industry} filters={filters} setFilters={setFilters} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
              padding: '16px 24px', borderTop: '1px solid var(--line-2)' }}>
              <button onClick={() => setFilters(initialFilters)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                font: '500 13px/1 Inter', color: 'var(--ink-2)',
              }}>Clear all</button>
              <button onClick={() => setOpen(false)} style={{
                padding: '10px 20px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: 'white',
                font: '600 14px/1 Inter', cursor: 'pointer',
              }}>Show results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── CATEGORY BAR ─────────────────────────────────────────────────────────────
const CategoryBar = ({ activeSlug }) => {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)', padding: '0 24px' }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: 4,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {CATEGORY_NAV.map(cat => {
          const active = cat.slug === activeSlug;
          return (
            <button
              key={cat.slug}
              onClick={() => navigate(`/${cat.slug}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '14px 16px', flexShrink: 0,
                border: 'none', background: 'transparent', cursor: 'pointer',
                borderBottom: `2.5px solid ${active ? cat.accent : 'transparent'}`,
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.borderBottomColor = 'var(--line)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                background: active ? cat.accent : cat.accentBg,
                display: 'grid', placeItems: 'center',
                transition: 'background .15s',
              }}>
                <Icon name={cat.icon} size={13} color={active ? 'white' : cat.accent} />
              </div>
              <span style={{
                font: `${active ? '600' : '500'} 13px/1 Inter`,
                color: active ? cat.accent : 'var(--ink-2)',
                whiteSpace: 'nowrap',
                transition: 'color .15s',
              }}>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── SEARCH SUB-BAR ────────────────────────────────────────────────────────────
const SearchSubBar = ({ industry, activeSlug, location, onLocationChange, query, onQueryChange, filters, setFilters }) => {
  const navigate = useNavigate();
  const activeCat = CATEGORY_NAV.find(c => c.slug === activeSlug) || CATEGORY_NAV[0];
  return (
    <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)', padding: '16px 24px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>

        {/* Search + location pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0,
          background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 999,
          padding: 4, width: 520 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', flex: 1 }}>
            <Icon name="search" size={16} color="var(--ink-3)" />
            <input value={query} onChange={e => onQueryChange(e.target.value)}
              placeholder={`Search ${industry.label.toLowerCase()}…`}
              style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent',
                font: '500 14px/1.4 Inter', color: 'var(--ink)', padding: '10px 0' }} />
          </label>
          <span style={{ width: 1, height: 24, background: 'var(--line-2)' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', minWidth: 180 }}>
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

        {/* Industry selector */}
        {/* Right group: Filters + Industry selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <FilterButton industry={activeSlug} filters={filters} setFilters={setFilters} />

          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--line)', borderRadius: 999, padding: '0 14px',
              height: 42, background: 'var(--bg)', pointerEvents: 'none',
              position: 'absolute', inset: 0, zIndex: 1,
            }}>
              <span style={{ font: '500 13px/1 Inter', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                {activeCat.label}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <select
              value={activeSlug}
              onChange={e => navigate(`/${e.target.value}`)}
              style={{
                position: 'relative', zIndex: 2, opacity: 0,
                height: 42, minWidth: 150, cursor: 'pointer',
                border: 'none', background: 'transparent',
              }}
            >
              {CATEGORY_NAV.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

// ── PRO CARD (horizontal) ─────────────────────────────────────────────────────
const ProCard = ({ pro, active, hovered, onHover, onViewProfile, isBusiness }) => (
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
      <img src={pro.img} alt={pro.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isBusiness ? 'center center' : 'center top' }} />
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
  const [filters, setFilters] = useState(() => getInitialFilters(industry));
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const cardRefs = useRef({});

  // Reset filters when industry changes
  useEffect(() => { setFilters(getInitialFilters(industry)); }, [industry]);

  const filtered = useMemo(() => {
    const cfg = FILTER_CONFIG[industry] || { priceMax: 9999 };
    let list = pros.filter(p => {
      if (query && !(p.name + p.role + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.tags.length > 0 && !filters.tags.some(t => p.tags.includes(t))) return false;
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;
      if (p.distance > filters.maxDistance) return false;
      if (filters.maxPrice < cfg.priceMax && p.fee > filters.maxPrice) return false;
      return true;
    });
    if (sort === 'distance') list.sort((a, b) => a.distance - b.distance);
    if (sort === 'rating')   list.sort((a, b) => b.rating - a.rating);
    if (sort === 'price')    list.sort((a, b) => a.fee - b.fee);
    return list;
  }, [pros, query, sort, filters, industry]);

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
        activeSlug={industry}
        location={location} onLocationChange={setLocation}
        query={query} onQueryChange={setQuery}
        filters={filters} setFilters={setFilters}
      />
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <main style={{ flex: 1, minWidth: 0, padding: '24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
            <div>
              <h1 style={{ margin: 0, font: '700 28px/1.1 Inter', letterSpacing: '-0.02em' }}>
                {filtered.length} {meta.label.toLowerCase()} near {location.split(' · ')[0]}
              </h1>
              <p style={{ margin: '4px 0 0', font: '400 14px/1.4 Inter', color: 'var(--ink-3)' }}>
                Sorted by {sort === 'distance' ? 'distance' : sort === 'rating' ? 'rating' : 'price'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--bg)',
              borderRadius: 999, border: '1px solid var(--line)', flexShrink: 0 }}>
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
                  isBusiness={meta.isBusiness}
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
      <SiteFooter />
      <AskAIFab />
    </>
  );
}

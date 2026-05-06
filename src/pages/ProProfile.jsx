import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon, Tag, Btn } from '../components/primitives';
import SiteNav from '../components/SiteNav';

const ALL_PROS = {
  photographers: [
    { id: 4,  name: 'Sophie Laurent',  title: 'Wedding Photographer',    studio: 'Laurent Photography',      rating: 5.0, reviews: 318, experience: 9,  sessions: 640,  fee: 350, license: 'NY-PHOTO-041221', specialization: 'Weddings & Portraits',         address: '210 N 8th St, Williamsburg, NY', phone: '+1 (718) 555-1001', email: 'sophie@laurentphoto.com', avail: 'This weekend', insurance: [], img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop', bio: 'Sophie Laurent has spent nine years documenting weddings across New York and Europe. Her work is known for its timeless elegance and quiet emotional depth — she has a gift for capturing unscripted moments that tell the real story of a day. Sophie works with a small number of couples each year to give every wedding the attention it deserves.', services: ['Full-Day Wedding Coverage', 'Engagement Sessions', 'Bridal Portraits', 'Second Shooter Coordination', 'Album Design', 'Destination Weddings', 'Rehearsal Dinner Coverage'], certifications: ['Professional Photographers of America', 'Wedding Photojournalist Association', 'Adobe Certified Professional', 'WPJA Member'], hours: { Mon: 'By appointment', Tue: 'By appointment', Wed: 'By appointment', Thu: 'By appointment', Fri: 'By appointment', Sat: 'Shoots', Sun: 'Shoots' } },
    { id: 5,  name: 'Marcus Cole',     title: 'Event Photographer',      studio: 'Cole Visual',               rating: 4.8, reviews: 204, experience: 7,  sessions: 430,  fee: 220, license: 'NY-PHOTO-053412', specialization: 'Events & Corporate',          address: '88 Atlantic Ave, Brooklyn, NY',   phone: '+1 (718) 555-1002', email: 'marcus@colevisual.com',  avail: 'Next week',   insurance: [], img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&auto=format&fit=crop', bio: 'Marcus Cole is a Brooklyn-based event photographer with seven years of experience covering everything from intimate gallery openings to large-scale corporate conferences. His editorial background gives his event work a clean, reportage quality that clients consistently describe as both professional and alive.', services: ['Corporate Events', 'Product Launches', 'Conference Coverage', 'Galas & Fundraisers', 'Headshots', 'Team Photos', 'Same-Day Delivery'], certifications: ['Professional Photographers of America', 'Adobe Certified Professional', 'New York Press Photographers Association'], hours: { Mon: '9 AM – 6 PM', Tue: '9 AM – 6 PM', Wed: '9 AM – 6 PM', Thu: '9 AM – 6 PM', Fri: '9 AM – 6 PM', Sat: 'Events only', Sun: 'Events only' } },
    { id: 6,  name: 'Rina Tanaka',     title: 'Portrait Photographer',   studio: 'Tanaka Studio',             rating: 4.9, reviews: 156, experience: 6,  sessions: 390,  fee: 180, license: 'NY-PHOTO-061834', specialization: 'Portraits & Headshots',       address: '55 Greenpoint Ave, Greenpoint, NY', phone: '+1 (718) 555-1003', email: 'rina@tanakastudio.com', avail: 'This week',   insurance: [], img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80&auto=format&fit=crop', bio: 'Rina Tanaka runs a boutique portrait studio in Greenpoint that has become a favorite among actors, creatives, and professionals seeking headshots that actually look like them. She approaches every session as a collaborative conversation, helping subjects relax so their personality comes through naturally.', services: ['Professional Headshots', 'Actor Portfolios', 'Personal Branding', 'Family Portraits', 'Maternity Sessions', 'LinkedIn Photos', 'Studio & Outdoor Sessions'], certifications: ['Professional Photographers of America', 'Headshot Crew Member', 'Adobe Certified Professional'], hours: { Mon: '10 AM – 6 PM', Tue: '10 AM – 6 PM', Wed: 'Closed', Thu: '10 AM – 7 PM', Fri: '10 AM – 6 PM', Sat: '10 AM – 4 PM', Sun: 'Closed' } },
    { id: 19, name: 'Luca Ferretti',   title: 'Commercial Photographer', studio: 'Ferretti Creative',         rating: 4.7, reviews: 88,  experience: 11, sessions: 280,  fee: 400, license: 'NY-PHOTO-078921', specialization: 'Commercial & Product',        address: '320 Court St, Brooklyn, NY',      phone: '+1 (718) 555-1004', email: 'luca@ferretticreative.com', avail: 'Next week', insurance: [], img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80&auto=format&fit=crop', bio: 'Luca Ferretti brings eleven years of commercial photography experience to brands that need imagery that sells. From sleek product flats to full-scale ad campaigns, he works with agencies and direct clients across food, fashion, and tech. His studio in Brooklyn is equipped for full production shoots.', services: ['Product Photography', 'E-commerce Shoots', 'Ad Campaigns', 'Lookbooks', 'Food Photography', 'Architectural Photography', 'Video Production'], certifications: ['Advertising Photographers of America', 'Adobe Certified Expert', 'Canon Professional Services Member'], hours: { Mon: '9 AM – 6 PM', Tue: '9 AM – 6 PM', Wed: '9 AM – 6 PM', Thu: '9 AM – 6 PM', Fri: '9 AM – 5 PM', Sat: 'By appointment', Sun: 'Closed' } },
    { id: 20, name: 'Amara Diallo',    title: 'Family Photographer',     studio: 'Diallo Family Photography',rating: 5.0, reviews: 241, experience: 8,  sessions: 510,  fee: 250, license: 'NY-PHOTO-082341', specialization: 'Family & Newborn',           address: '178 7th Ave, Park Slope, NY',     phone: '+1 (718) 555-1005', email: 'amara@diallophotography.com', avail: 'This weekend', insurance: [], img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=80&auto=format&fit=crop', bio: 'Amara Diallo is Park Slope\'s most beloved family photographer — known for sessions that feel like play, not a photo shoot. Her calm presence and playful approach put even the most camera-shy toddlers at ease. She specialises in documentary-style family sessions that capture how your family actually lives, laughs, and loves.', services: ['Family Sessions', 'Newborn Photography', 'Maternity', 'Milestone Sessions', 'Sibling Portraits', 'Lifestyle Home Sessions', 'Holiday Cards'], certifications: ['Professional Photographers of America', 'Newborn Posing Safety Certified', 'NAPCP Member'], hours: { Mon: 'By appointment', Tue: 'By appointment', Wed: 'By appointment', Thu: 'By appointment', Fri: 'By appointment', Sat: 'Shoots', Sun: 'Shoots' } },
    { id: 21, name: 'Dev Patel',       title: 'Real Estate Photographer',studio: 'Patel Real Estate Imagery',rating: 4.8, reviews: 132, experience: 5,  sessions: 720,  fee: 300, license: 'NY-PHOTO-091237', specialization: 'Interiors & Aerial',         address: '45 Berry St, Williamsburg, NY',   phone: '+1 (718) 555-1006', email: 'dev@patelrealestate.com', avail: 'Tomorrow',    insurance: [], img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&auto=format&fit=crop', bio: 'Dev Patel shoots some of the most-viewed real estate listings in Brooklyn and Williamsburg. He combines architectural photography with FAA-licensed drone work to give agents and homeowners a complete visual package — from perfectly lit interiors to sweeping aerial views. Fast turnaround, reliable, and obsessively detail-oriented.', services: ['Interior Photography', 'Aerial/Drone Photography', 'Virtual Tours', 'Floor Plan Renders', 'Twilight Shoots', 'Video Walkthroughs', '24h Delivery'], certifications: ['FAA Part 107 Certified', 'PFRE Member', 'Adobe Certified Professional', 'DJI Certified Pilot'], hours: { Mon: '8 AM – 6 PM', Tue: '8 AM – 6 PM', Wed: '8 AM – 6 PM', Thu: '8 AM – 6 PM', Fri: '8 AM – 5 PM', Sat: '9 AM – 3 PM', Sun: 'Closed' } },
    { id: 22, name: 'Chloe Bennett',   title: 'Fashion Photographer',    studio: 'Bennett Studio',            rating: 4.9, reviews: 174, experience: 10, sessions: 320,  fee: 500, license: 'NY-PHOTO-073341', specialization: 'Fashion & Editorial',        address: '56 Wyckoff Ave, Bushwick, NY',    phone: '+1 (718) 555-1007', email: 'chloe@bennettstudio.com', avail: 'Next week',   insurance: [], img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80&auto=format&fit=crop', bio: 'Chloe Bennett is a fashion and editorial photographer whose work has appeared in Vogue, Harper\'s Bazaar, and numerous independent publications. Her Bushwick studio is a creative hub that attracts designers, models, and brands looking for imagery with a distinctive visual voice. Chloe brings both technical precision and genuine artistic vision to every shoot.', services: ['Editorial Shoots', 'Lookbooks', 'Campaign Photography', 'Model Test Shoots', 'Brand Identity', 'Social Content', 'Studio Rentals'], certifications: ['American Photographic Artists', 'Adobe Certified Expert', 'Canon Professional Services Member', 'Commercial Drone License'], hours: { Mon: '10 AM – 7 PM', Tue: '10 AM – 7 PM', Wed: '10 AM – 7 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 6 PM', Sat: 'By appointment', Sun: 'Closed' } },
    { id: 23, name: 'Noah Williams',   title: 'Sports Photographer',     studio: 'Williams Sports Media',     rating: 4.7, reviews: 99,  experience: 6,  sessions: 210,  fee: 275, license: 'NY-PHOTO-086543', specialization: 'Sports & Action',            address: '740 Flatbush Ave, Brooklyn, NY',  phone: '+1 (718) 555-1008', email: 'noah@williamssports.com', avail: 'Weekends',    insurance: [], img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&auto=format&fit=crop', bio: 'Noah Williams captures the speed, intensity, and human drama of sport. Whether it\'s a youth soccer league or a professional boxing match, Noah brings the same sharp eye and anticipatory instinct to every frame. His work has been published in ESPN, Sports Illustrated online, and dozens of team publications across the tri-state area.', services: ['Game Day Coverage', 'Team Photography', 'Athlete Portraits', 'Youth Sports', 'Sports Events', 'Action & Training Shoots', 'Video Highlights'], certifications: ['Sports Shooter Academy Alumni', 'NPPA Member', 'Adobe Certified Professional'], hours: { Mon: '9 AM – 5 PM', Tue: '9 AM – 5 PM', Wed: '9 AM – 5 PM', Thu: '9 AM – 5 PM', Fri: '9 AM – 5 PM', Sat: 'Events', Sun: 'Events' } },
    { id: 35, name: 'Isla Morrison',   title: 'Food Photographer',       studio: 'Morrison Food Studio',      rating: 4.9, reviews: 113, experience: 7,  sessions: 260,  fee: 320, license: 'NY-PHOTO-094218', specialization: 'Food & Restaurant',          address: '90 Franklin St, Greenpoint, NY',  phone: '+1 (718) 555-1009', email: 'isla@morrisonfood.com', avail: 'This week',   insurance: [], img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80&auto=format&fit=crop', bio: 'Isla Morrison is a food photographer and stylist who makes dishes look as extraordinary as they taste. She works closely with restaurants, chefs, and food brands across New York to produce imagery for menus, social media, cookbooks, and campaigns. Her Greenpoint studio has a full working kitchen for prepared-food shoots.', services: ['Restaurant Menu Photography', 'Social Media Content', 'Cookbook Shoots', 'Brand Campaigns', 'Recipe Development Photos', 'Beverage Photography', 'Food Styling'], certifications: ['International Food Photography Association', 'Food Styling Certification, ICE', 'Adobe Certified Professional'], hours: { Mon: '9 AM – 6 PM', Tue: '9 AM – 6 PM', Wed: '9 AM – 6 PM', Thu: '9 AM – 6 PM', Fri: '9 AM – 5 PM', Sat: 'By appointment', Sun: 'Closed' } },
  ],
  'salon-spa': [
    { id: 7,  name: 'Jade Monroe',     title: 'Master Stylist',          studio: 'Monroe Hair Studio',        rating: 4.9, reviews: 531, experience: 14, sessions: 2800, fee: 95,  license: 'NY-COS-071234', specialization: 'Color & Precision Cuts',      address: '300 Atlantic Ave, Brooklyn, NY',  phone: '+1 (718) 555-2001', email: 'jade@monroehair.com',    avail: 'Tomorrow',    insurance: [], img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop', bio: 'Jade Monroe has been sculpting and coloring hair in Brooklyn for 14 years. With advanced training from the Vidal Sassoon Academy in London, she is equally at home doing a precision geometric cut or a complex balayage transformation. Her calm, confident approach puts clients at ease and her results keep them coming back.', services: ['Haircut & Style', 'Balayage & Highlights', 'Color Correction', 'Keratin Treatment', 'Scalp Treatment', 'Blowout', 'Bridal Hair'], certifications: ['Vidal Sassoon Academy Graduate', 'Redken Color Certified', 'NY State Cosmetology License', 'Olaplex Certified'], hours: { Mon: 'Closed', Tue: '9 AM – 6 PM', Wed: '9 AM – 6 PM', Thu: '9 AM – 7 PM', Fri: '9 AM – 6 PM', Sat: '8 AM – 5 PM', Sun: 'Closed' } },
    { id: 8,  name: 'Elena Vasquez',   title: 'Esthetician',             studio: 'Glow by Elena',             rating: 4.8, reviews: 289, experience: 8,  sessions: 1200, fee: 80,  license: 'NY-EST-083421', specialization: 'Facials & Skin Care',         address: '125 N 6th St, Williamsburg, NY',  phone: '+1 (718) 555-2002', email: 'elena@glowbyelena.com', avail: 'This week',   insurance: [], img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop', bio: 'Elena Vasquez is a licensed esthetician with eight years of experience helping clients achieve healthy, glowing skin. She takes a holistic approach to skincare — assessing lifestyle, diet, and stress alongside product use. Elena stays current with the latest techniques and only uses clean, results-driven products in her Williamsburg suite.', services: ['Custom Facials', 'Chemical Peels', 'Microdermabrasion', 'LED Light Therapy', 'Brow Shaping', 'Body Waxing', 'Skin Consultations'], certifications: ['NY State Esthetics License', 'Dermalogica Expert', 'PCA Skin Certified', 'Oncology Esthetics Certified'], hours: { Mon: '10 AM – 6 PM', Tue: '10 AM – 6 PM', Wed: '10 AM – 6 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 5 PM', Sat: '9 AM – 4 PM', Sun: 'Closed' } },
    { id: 9,  name: 'Kira Osei',       title: 'Massage Therapist',       studio: 'Kira Wellness',             rating: 5.0, reviews: 174, experience: 10, sessions: 980,  fee: 110, license: 'NY-MT-094312', specialization: 'Therapeutic Massage',         address: '40 Nassau Ave, Greenpoint, NY',   phone: '+1 (718) 555-2003', email: 'kira@kirawellness.com',  avail: 'Today',       insurance: [], img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop', bio: 'Kira Osei is a licensed massage therapist with a decade of practice in therapeutic and wellness massage. She has a rare ability to read tension patterns in the body and target them with precision. Her clients include everyone from desk-bound professionals to competitive athletes. Kira\'s sessions are deeply restorative and her availability is always in demand.', services: ['Swedish Massage', 'Deep Tissue', 'Sports Massage', 'Prenatal Massage', 'Hot Stone Therapy', 'Cupping', 'Lymphatic Drainage'], certifications: ['NY State Massage Therapy License', 'AMTA Member', 'Prenatal Massage Certified', 'Cupping Therapy Certified'], hours: { Mon: '9 AM – 7 PM', Tue: '9 AM – 7 PM', Wed: '9 AM – 7 PM', Thu: '9 AM – 7 PM', Fri: '9 AM – 6 PM', Sat: '9 AM – 5 PM', Sun: '10 AM – 4 PM' } },
    { id: 24, name: 'Tara Nguyen',     title: 'Nail Technician',         studio: 'Tara Nails',                rating: 4.9, reviews: 402, experience: 6,  sessions: 1800, fee: 55,  license: 'NY-NAIL-061289', specialization: 'Gel & Nail Art',             address: '220 5th Ave, Park Slope, NY',     phone: '+1 (718) 555-2004', email: 'tara@taranails.com',     avail: 'Today',       insurance: [], img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80&auto=format&fit=crop', bio: 'Tara Nguyen has built a cult following in Park Slope for her meticulous gel work and freehand nail art. She trained in nail artistry in Ho Chi Minh City before bringing her skills to New York, and her precision and creativity are unmatched. Tara uses only non-toxic, long-wear formulas and prioritises nail health above all else.', services: ['Gel Manicure', 'Acrylic Extensions', 'Nail Art', 'Nail Repair', 'Pedicure', 'Dip Powder', 'Nail Removal & Care'], certifications: ['NY State Nail Technician License', 'Nail Artist Guild Member', 'CND Shellac Certified', 'Aprés Gel Certified'], hours: { Mon: '9 AM – 7 PM', Tue: '9 AM – 7 PM', Wed: '9 AM – 7 PM', Thu: '9 AM – 7 PM', Fri: '9 AM – 7 PM', Sat: '9 AM – 6 PM', Sun: '10 AM – 5 PM' } },
    { id: 25, name: 'Isabelle Roux',   title: 'Lash Artist',             studio: 'Roux Lash Atelier',         rating: 5.0, reviews: 318, experience: 7,  sessions: 950,  fee: 130, license: 'NY-COS-072341', specialization: 'Lash Extensions & Lifts',    address: '88 Dekalb Ave, Brooklyn, NY',     phone: '+1 (718) 555-2005', email: 'isabelle@rouxlash.com', avail: 'Next week',   insurance: [], img: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=1200&q=80&auto=format&fit=crop', bio: 'Isabelle Roux trained in Paris before establishing her lash atelier in Brooklyn — and the French attention to detail is evident in every set she creates. She is among the few lash artists in New York certified in the full range of classic, hybrid, volume, and mega-volume techniques. Her waiting list speaks for itself.', services: ['Classic Lash Extensions', 'Hybrid Lashes', 'Volume Lashes', 'Mega Volume', 'Lash Lift & Tint', 'Lash Removal', 'Brow Lamination'], certifications: ['Nouveau Lashes Certified', 'NovaLash Master Stylist', 'NY State Cosmetology License', 'Lash Lift International Certified'], hours: { Mon: 'Closed', Tue: '10 AM – 7 PM', Wed: '10 AM – 7 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 6 PM', Sat: '9 AM – 5 PM', Sun: 'Closed' } },
    { id: 26, name: 'Priya Kapoor',    title: 'Brow Specialist',         studio: 'Kapoor Brow Studio',        rating: 4.8, reviews: 227, experience: 5,  sessions: 860,  fee: 90,  license: 'NY-COS-083217', specialization: 'Microblading & Brow Design', address: '76 S 4th St, Williamsburg, NY',   phone: '+1 (718) 555-2006', email: 'priya@kapoorbrows.com', avail: 'This week',   insurance: [], img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80&auto=format&fit=crop', bio: 'Priya Kapoor is Williamsburg\'s go-to brow specialist, combining the art of microblading with expert brow mapping to create results that look completely natural. She trained under two of the leading microblading artists in London and brings that precision and patience to every client. Brows are Priya\'s obsession and it shows.', services: ['Microblading', 'Nano Brows', 'Powder/Ombre Brows', 'Brow Lamination', 'Threading', 'Tinting', 'Brow Consultations'], certifications: ['Society of Permanent Cosmetic Professionals', 'SPCP Member', 'NY State License', 'Bloodborne Pathogens Certified'], hours: { Mon: '10 AM – 6 PM', Tue: '10 AM – 6 PM', Wed: '10 AM – 6 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 5 PM', Sat: '9 AM – 4 PM', Sun: 'Closed' } },
    { id: 27, name: 'Maya Torres',     title: 'Makeup Artist',           studio: 'Torres Beauty',             rating: 4.9, reviews: 183, experience: 9,  sessions: 620,  fee: 150, license: 'NY-COS-069871', specialization: 'Bridal & Editorial Makeup',  address: '112 Knickerbocker Ave, Bushwick, NY', phone: '+1 (718) 555-2007', email: 'maya@torresbeauty.com', avail: 'Weekends',    insurance: [], img: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80&auto=format&fit=crop', bio: 'Maya Torres is a New York-based makeup artist with nine years of experience across bridal, editorial, and film work. She is celebrated for her ability to make every client feel beautiful in a way that feels authentic to them — never overdone. Maya works with all skin tones and types, and her bridal clients consistently rave about how flawless their makeup looks all day.', services: ['Bridal Makeup', 'Bridal Trial', 'Bridesmaid Makeup', 'Editorial Makeup', 'Airbrush Application', 'On-Location Services', 'Makeup Lessons'], certifications: ['Make-Up Designory Graduate', 'NY State Cosmetology License', 'IMATS Exhibitor', 'MAC Pro Member'], hours: { Mon: 'By appointment', Tue: 'By appointment', Wed: 'By appointment', Thu: 'By appointment', Fri: 'By appointment', Sat: 'Events', Sun: 'Events' } },
    { id: 28, name: 'Leo Andersen',    title: 'Barber',                  studio: "Leo's Barbershop",          rating: 4.8, reviews: 614, experience: 12, sessions: 4200, fee: 45,  license: 'NY-BARB-052341', specialization: 'Fades & Beard Grooming',      address: '60 Manhattan Ave, Greenpoint, NY',phone: '+1 (718) 555-2008', email: 'leo@leosbarbershop.com', avail: 'Today',       insurance: [], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop', bio: "Leo Andersen has been cutting hair in Greenpoint for 12 years, building one of the borough's most loyal clienteles. His barbershop is a genuine neighbourhood institution — warm, welcoming, and completely unpretentious. Leo specialises in modern fades and classic taper cuts, and his beard work is exceptional. Walk-ins welcome.", services: ['Haircut', 'Fade', 'Taper Cut', 'Beard Trim & Shape', 'Hot Towel Shave', 'Line Up', 'Kids Cut'], certifications: ['NY State Barber License', 'Andis Educator', 'Wahl Certified', 'Master Barber Guild Member'], hours: { Mon: '9 AM – 7 PM', Tue: '9 AM – 7 PM', Wed: '9 AM – 7 PM', Thu: '9 AM – 7 PM', Fri: '9 AM – 7 PM', Sat: '8 AM – 6 PM', Sun: '10 AM – 4 PM' } },
    { id: 36, name: 'Simone Park',     title: 'Reiki & Wellness',        studio: 'Park Wellness Studio',      rating: 4.9, reviews: 96,  experience: 6,  sessions: 380,  fee: 120, license: 'NY-WELL-087123', specialization: 'Reiki & Holistic Wellness',  address: '410 7th Ave, Park Slope, NY',     phone: '+1 (718) 555-2009', email: 'simone@parkwellness.com', avail: 'This week',  insurance: [], img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=300&h=300&q=80&auto=format&fit=crop&crop=faces', hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop', bio: 'Simone Park is a Reiki master and holistic wellness practitioner who helps clients navigate stress, anxiety, and burnout through energy healing and mindfulness practices. Her Park Slope studio is a serene space designed to facilitate genuine rest and renewal. Simone integrates Reiki, sound healing, and breathwork into personalised sessions.', services: ['Reiki Healing', 'Sound Bath', 'Breathwork Sessions', 'Meditation Coaching', 'Chakra Balancing', 'Crystal Therapy', 'Wellness Consultations'], certifications: ['Usui Reiki Master Certification', 'International Association of Reiki Professionals', 'Sound Healing Academy Graduate', 'Mindfulness-Based Stress Reduction (MBSR)'], hours: { Mon: '10 AM – 6 PM', Tue: '10 AM – 6 PM', Wed: '10 AM – 6 PM', Thu: '10 AM – 7 PM', Fri: '10 AM – 5 PM', Sat: '10 AM – 4 PM', Sun: 'Closed' } },
  ],
  restaurants: [
    { id: 10, name: 'Osteria Nolita',  title: 'Italian · Fine Dining',   studio: 'Osteria Nolita',            rating: 4.9, reviews: 892,  experience: 8,  sessions: 0, fee: 65,  license: 'NYC-REST-041221', specialization: 'Southern Italian Cuisine',   address: '88 Smith St, Brooklyn, NY',       phone: '+1 (718) 555-3001', email: 'reservations@osterianolita.com', avail: 'Reservations open', insurance: [], img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop', bio: 'Osteria Nolita brings the warmth of a Southern Italian trattoria to the heart of Brooklyn. Chef Marco Ricci trained in Naples before moving to New York, and his menu is a love letter to the cucina of his childhood — handmade pasta, wood-fired proteins, and an exceptional natural wine list. The space is intimate, candlelit, and consistently one of the most romantic rooms in the borough.', services: ['Dinner Service', 'Private Dining', 'Wine Pairing Menus', 'Chef\'s Tasting Menu', 'Catering', 'Wine Bar', 'Brunch (Weekend)'], certifications: ['NYC Health Dept A Rating', 'James Beard Semifinalist 2024', 'Michelin Bib Gourmand', 'Wine Spectator Award of Excellence'], hours: { Mon: 'Closed', Tue: '5 PM – 10 PM', Wed: '5 PM – 10 PM', Thu: '5 PM – 10 PM', Fri: '5 PM – 11 PM', Sat: '11 AM – 11 PM', Sun: '11 AM – 9 PM' } },
    { id: 11, name: 'Sōra Ramen',      title: 'Japanese · Casual',       studio: 'Sōra Ramen',                rating: 4.8, reviews: 1204, experience: 5,  sessions: 0, fee: 22,  license: 'NYC-REST-053412', specialization: 'Tonkotsu & Shoyu Ramen',     address: '310 Bedford Ave, Williamsburg, NY',phone: '+1 (718) 555-3002', email: 'hello@soraramen.com',           avail: 'Walk-ins welcome', insurance: [], img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80&auto=format&fit=crop', bio: 'Sōra Ramen has become Williamsburg\'s definitive ramen destination since opening five years ago. The broth is simmered for 18 hours, the noodles are made fresh daily, and the chashu pork is slow-braised to melt-in-your-mouth perfection. The izakaya-style small plates are equally worth ordering — especially the karaage and the gyoza.', services: ['Dine In', 'Takeout', 'Delivery', 'Izakaya Menu', 'Happy Hour', 'Private Events', 'Catering'], certifications: ['NYC Health Dept A Rating', 'Eater NY Best Ramen 2023', 'Time Out NYC Editors Pick'], hours: { Mon: '12 PM – 10 PM', Tue: '12 PM – 10 PM', Wed: '12 PM – 10 PM', Thu: '12 PM – 10 PM', Fri: '12 PM – 11 PM', Sat: '11 AM – 11 PM', Sun: '11 AM – 9 PM' } },
    { id: 12, name: 'Casa Verde',      title: 'Mexican · Brunch',        studio: 'Casa Verde',                rating: 4.7, reviews: 643,  experience: 4,  sessions: 0, fee: 30,  license: 'NYC-REST-061834', specialization: 'Modern Mexican & Brunch',    address: '70 Nassau Ave, Greenpoint, NY',   phone: '+1 (718) 555-3003', email: 'hola@casaverdebrooklyn.com',    avail: 'Walk-ins welcome', insurance: [], img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop', bio: 'Casa Verde is Greenpoint\'s most beloved weekend destination, known for a brunch menu that combines classic Mexican flavours with unexpected twists. The margaritas are made with fresh-pressed juice and the tacos are extraordinary. Their weekday lunch and dinner menus are quieter-kept secrets equally worth discovering.', services: ['Brunch', 'Lunch', 'Dinner', 'Takeout', 'Delivery', 'Catering', 'Private Events'], certifications: ['NYC Health Dept A Rating', 'Zagat Rated', 'Infatuation Top Pick'], hours: { Mon: '5 PM – 10 PM', Tue: '5 PM – 10 PM', Wed: '5 PM – 10 PM', Thu: '5 PM – 10 PM', Fri: '5 PM – 11 PM', Sat: '10 AM – 11 PM', Sun: '10 AM – 9 PM' } },
    { id: 29, name: 'The Ember Room',  title: 'American · Steakhouse',   studio: 'The Ember Room',            rating: 4.9, reviews: 741,  experience: 6,  sessions: 0, fee: 85,  license: 'NYC-REST-078921', specialization: 'Wood-Fire Grill & Cocktails',address: '150 Atlantic Ave, Brooklyn, NY',  phone: '+1 (718) 555-3004', email: 'book@theemberroom.com',         avail: 'Reservations open', insurance: [], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80&auto=format&fit=crop', bio: 'The Ember Room is Brooklyn\'s premier wood-fire steakhouse — a bold, dimly-lit space where every cut is selected from small American farms and cooked over live ember. The cocktail programme is equally serious, and the private dining room has hosted everything from corporate dinners to marriage proposals. Reservations are strongly recommended.', services: ['Dinner Service', 'Private Dining', 'Cocktail Bar', 'Weekend Brunch', 'Corporate Events', 'Wine Cellar Tastings', 'Chef\'s Table'], certifications: ['NYC Health Dept A Rating', 'Wine Spectator Award', 'New York Times 2 Stars', 'James Beard Long List 2025'], hours: { Mon: 'Closed', Tue: '5 PM – 10 PM', Wed: '5 PM – 10 PM', Thu: '5 PM – 10 PM', Fri: '5 PM – 11 PM', Sat: '11 AM – 11 PM', Sun: '11 AM – 9 PM' } },
    { id: 30, name: 'Mango & Lime',    title: 'Caribbean · Casual',      studio: 'Mango & Lime',              rating: 4.8, reviews: 529,  experience: 7,  sessions: 0, fee: 28,  license: 'NYC-REST-082341', specialization: 'Caribbean Soul Food',        address: '900 Flatbush Ave, Flatbush, NY',  phone: '+1 (718) 555-3005', email: 'hello@mangoandlime.com',        avail: 'Walk-ins welcome', insurance: [], img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop', bio: 'Mango & Lime brings the vibrant soul food traditions of the Caribbean — Jamaica, Trinidad, and Barbados — to the heart of Flatbush. Family-owned and fiercely community-focused, the menu rotates seasonally and always includes outstanding vegan options. The jerk chicken is legendary in the neighbourhood, and the rum punch is dangerously good.', services: ['Dine In', 'Takeout', 'Delivery', 'Catering', 'Event Space', 'Sunday Brunch', 'Vegan Menu'], certifications: ['NYC Health Dept A Rating', 'Eater NY Neighbourhood Gem', 'Best of Brooklyn 2024'], hours: { Mon: '11 AM – 9 PM', Tue: '11 AM – 9 PM', Wed: '11 AM – 9 PM', Thu: '11 AM – 9 PM', Fri: '11 AM – 10 PM', Sat: '10 AM – 10 PM', Sun: '10 AM – 8 PM' } },
    { id: 31, name: 'Tulum Kitchen',   title: 'Mexican · Fine Dining',   studio: 'Tulum Kitchen',             rating: 5.0, reviews: 418,  experience: 3,  sessions: 0, fee: 95,  license: 'NYC-REST-091237', specialization: 'Tasting Menu & Mezcal Bar', address: '55 Wythe Ave, Williamsburg, NY',  phone: '+1 (718) 555-3006', email: 'dine@tulumkitchen.com',         avail: 'Reservations open', insurance: [], img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=80&auto=format&fit=crop', bio: 'Tulum Kitchen elevated Mexican fine dining in Williamsburg from the moment it opened. Chef Ana Reyes draws on her Oaxacan roots and Michelin-kitchen training to produce a tasting menu that surprises and delights — bold flavours, unexpected techniques, beautiful plating. The mezcal bar alone is worth the trip.', services: ['Tasting Menu', 'À La Carte Dinner', 'Mezcal Bar', 'Private Events', 'Chef\'s Table', 'Weekend Brunch', 'Cocktail Pairing'], certifications: ['NYC Health Dept A Rating', 'Michelin Star 2024', 'New York Times 3 Stars', 'James Beard Award Nominee'], hours: { Mon: 'Closed', Tue: 'Closed', Wed: '6 PM – 10 PM', Thu: '6 PM – 10 PM', Fri: '6 PM – 11 PM', Sat: '11 AM – 11 PM', Sun: '11 AM – 9 PM' } },
    { id: 32, name: 'Spice Route',     title: 'Indian · Modern',         studio: 'Spice Route',               rating: 4.8, reviews: 387,  experience: 9,  sessions: 0, fee: 40,  license: 'NYC-REST-073341', specialization: 'Modern Indian Cuisine',      address: '340 5th Ave, Park Slope, NY',     phone: '+1 (718) 555-3007', email: 'eat@spiceroute.nyc',            avail: 'Walk-ins welcome', insurance: [], img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80&auto=format&fit=crop', bio: 'Spice Route is Park Slope\'s most celebrated Indian restaurant — a sophisticated space where traditional recipes meet modern plating and seasonal New York produce. The menu spans regional India with exceptional depth: Keralan seafood, Punjabi slow-braised meats, and Delhi street food given a refined treatment. The vegetarian selection is outstanding.', services: ['Dine In', 'Takeout', 'Delivery', 'Private Dining', 'Catering', 'Vegetarian Menu', 'Weekend Brunch'], certifications: ['NYC Health Dept A Rating', 'Michelin Bib Gourmand', 'Time Out NY Top Indian 2024', 'Zagat 27/30'], hours: { Mon: '11 AM – 10 PM', Tue: '11 AM – 10 PM', Wed: '11 AM – 10 PM', Thu: '11 AM – 10 PM', Fri: '11 AM – 11 PM', Sat: '10 AM – 11 PM', Sun: '10 AM – 9 PM' } },
    { id: 33, name: 'Le Petit Bistro', title: 'French · Café',           studio: 'Le Petit Bistro',           rating: 4.9, reviews: 602,  experience: 11, sessions: 0, fee: 35,  license: 'NYC-REST-086543', specialization: 'French Café & Brunch',      address: '112 Franklin St, Greenpoint, NY', phone: '+1 (718) 555-3008', email: 'bonjour@lepetitbistro.nyc',     avail: 'Walk-ins welcome', insurance: [], img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop', bio: 'Le Petit Bistro is a genuine piece of Paris transplanted to Greenpoint — tin ceilings, bentwood chairs, and a chalkboard menu that changes with the seasons. The croissants are made fresh every morning, the steak frites are legendary, and the wine list is thoughtfully chosen and fairly priced. It\'s the neighbourhood restaurant everyone wishes they had.', services: ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Wine Bar', 'Catering', 'Private Events'], certifications: ['NYC Health Dept A Rating', 'Michelin Bib Gourmand', 'New York Times Critic\'s Pick', 'Best Brunch Brooklyn 2024'], hours: { Mon: '8 AM – 10 PM', Tue: '8 AM – 10 PM', Wed: '8 AM – 10 PM', Thu: '8 AM – 10 PM', Fri: '8 AM – 11 PM', Sat: '8 AM – 11 PM', Sun: '8 AM – 9 PM' } },
    { id: 34, name: 'Nori & Co.',      title: 'Japanese · Sushi',        studio: 'Nori & Co.',                rating: 5.0, reviews: 511,  experience: 6,  sessions: 0, fee: 120, license: 'NYC-REST-094218', specialization: 'Omakase & Premium Sushi',   address: '480 Court St, Brooklyn, NY',      phone: '+1 (718) 555-3009', email: 'reserve@noriandco.com',         avail: 'Reservations open', insurance: [], img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&h=300&q=80&auto=format&fit=crop', hero: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=80&auto=format&fit=crop', bio: 'Nori & Co. is Brooklyn\'s premier omakase experience — a ten-seat counter where Chef Kenji Mori presents 18 courses of meticulously sourced, expertly prepared sushi and sashimi. The fish is flown in from Tsukiji three times a week. The sake programme is exceptional. Reservations open 30 days in advance and sell out within hours.', services: ['Omakase Menu', 'À La Carte Sushi', 'Sake Pairing', 'Private Dining', 'Chef\'s Counter', 'Gift Experiences', 'Corporate Bookings'], certifications: ['NYC Health Dept A Rating', 'Michelin Star 2023 & 2024', 'New York Times 3 Stars', 'Eater NY Best Sushi 2024'], hours: { Mon: 'Closed', Tue: '5 PM – 10 PM', Wed: '5 PM – 10 PM', Thu: '5 PM – 10 PM', Fri: '5 PM – 11 PM', Sat: '5 PM – 11 PM', Sun: 'Closed' } },
  ],
};

const SAMPLE_REVIEWS = [
  { id: 1, rating: 5, name: 'Sarah M.', date: 'March 2025', text: 'Absolutely incredible. Professional, warm, and the quality exceeded every expectation. I\'ve already recommended them to three friends.' },
  { id: 2, rating: 5, name: 'James T.', date: 'February 2025', text: 'Best experience I\'ve had. Everything was explained clearly, no surprises, and I felt genuinely taken care of throughout.' },
  { id: 3, rating: 4, name: 'Priya K.', date: 'January 2025', text: 'Very professional and thorough. Wait time was a touch longer than expected but the quality of service more than made up for it. Will be back.' },
];

const INDUSTRY_LABEL = { photographers: 'Photographers', 'salon-spa': 'Salon & Spa', restaurants: 'Restaurants' };
const FEE_LABEL = { photographers: '/ session', 'salon-spa': '/ session', restaurants: '/ person' };
const STAT_LABEL = { photographers: 'Sessions', 'salon-spa': 'Sessions', restaurants: 'Covers/wk' };

const BackBar = ({ label, onBack }) => (
  <div style={{
    background: 'var(--bg)', borderBottom: '1px solid var(--line-2)',
    padding: '0 32px', height: 44,
  }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', cursor: 'pointer',
        font: '500 13px/1 Inter', color: 'var(--ink-2)', padding: '4px 0',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5m7-7-7 7 7 7" />
        </svg>
        Back to {label}
      </button>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 8,
        border: '1px solid var(--line)', background: 'transparent',
        font: '500 13px/1 Inter', color: 'var(--ink-2)', cursor: 'pointer',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Share
      </button>
    </div>
  </div>
);

const SectionHead = ({ title }) => (
  <div style={{ font: '600 15px/1 Inter', color: 'var(--ink)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
    <span>{title}</span>
    <div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
  </div>
);

export default function ProProfile() {
  const { industry, id } = useParams();
  const navigate = useNavigate();
  const pros = ALL_PROS[industry] || [];
  const pro = pros.find(p => p.id === parseInt(id, 10));
  const feeLabel = FEE_LABEL[industry] || '/ session';

  const [form, setForm] = useState({ service: '', date: '', time: '', notes: '' });
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState('book');
  const [chat, setChat] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  React.useEffect(() => { if (!pro) navigate(`/${industry}`, { replace: true }); }, [pro, navigate, industry]);
  if (!pro) return null;

  const sendChat = () => {
    if (!chat.trim()) return;
    setChatLog(l => [...l, { from: 'me', text: chat.trim() }]);
    setChat('');
    setTimeout(() => setChatLog(l => [...l, { from: 'them', text: `Hi! This is ${pro.name.split(' ')[0]}'s team. We'll get back to you shortly.` }]), 900);
  };

  const inputSt = { width: '100%', border: '1.5px solid var(--line)', borderRadius: 10, padding: '11px 13px', font: '400 13px/1.4 Inter', color: 'var(--ink)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s', fontFamily: 'Inter, sans-serif' };
  const fo = e => { e.target.style.borderColor = 'var(--accent)'; };
  const fb = e => { e.target.style.borderColor = 'var(--line)'; };
  const labelSt = { display: 'block', font: '500 12px/1 Inter', color: 'var(--ink-2)', marginBottom: 5 };
  const canSubmit = form.service && form.date;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SiteNav />
      <BackBar label={INDUSTRY_LABEL[industry] || industry} onBack={() => navigate(`/${industry}`)} />

      {/* Hero */}
      <div style={{ width: '100%', height: 260, overflow: 'hidden', position: 'relative' }}>
        <img src={pro.hero} alt={pro.studio} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,8,6,0.55) 100%)' }} />
      </div>

      {/* Profile header */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 32px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 112, height: 112, borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 20px -4px rgba(20,15,10,0.3)', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-alt)', marginTop: -56, position: 'relative', zIndex: 2 }}>
                <img src={pro.img} alt={pro.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ paddingTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <h1 style={{ margin: 0, font: '700 26px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{pro.name}</h1>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label="Verified">
                    <circle cx="12" cy="12" r="12" fill="var(--green)" />
                    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ font: '400 14px/1.4 Inter', color: 'var(--ink-2)', marginBottom: 10 }}>{pro.title} · {pro.specialization}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, font: '400 13px/1 Inter', color: 'var(--ink-3)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="pin" size={13} color="var(--accent)" />{pro.address}</span>
                  {pro.experience > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="briefcase" size={13} color="var(--ink-3)" />{pro.experience}+ yrs experience</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 36, alignItems: 'start' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <section>
            <SectionHead title="About" />
            <p style={{ font: '400 14px/1.75 Inter', color: 'var(--ink-2)', margin: 0 }}>{pro.bio}</p>
          </section>

          <section>
            <SectionHead title="Services" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pro.services.map(svc => (
                <span key={svc} style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--bg-alt)', border: '1px solid var(--line)', font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>{svc}</span>
              ))}
            </div>
          </section>

          <section>
            <SectionHead title="Credentials" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pro.certifications.map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-alt)', borderRadius: 10, border: '1px solid var(--line-2)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon name="check-badge" size={14} color="var(--accent)" />
                  </div>
                  <span style={{ font: '500 13px/1.3 Inter', color: 'var(--ink-2)' }}>{cert}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead title="Hours" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(pro.hours).map(([day, hrs]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1.4 Inter', color: hrs === 'Closed' ? 'var(--ink-3)' : 'var(--ink-2)', padding: '6px 0', borderBottom: '1px solid var(--line-2)' }}>
                  <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{day}</span>
                  <span>{hrs}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead title="Reviews" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, padding: '16px 18px', background: 'var(--bg-alt)', borderRadius: 12, border: '1px solid var(--line-2)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ font: '700 36px/1 Inter', color: 'var(--ink)', letterSpacing: '-0.03em' }}>{pro.rating}</div>
                <div style={{ display: 'flex', gap: 2, marginTop: 6, justifyContent: 'center' }}>
                  {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} color={i <= Math.round(pro.rating) ? 'oklch(0.72 0.14 75)' : 'var(--line)'} />)}
                </div>
                <div style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)', marginTop: 5 }}>{pro.reviews} reviews</div>
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 2 }}>
                {[5,4,3].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)', width: 8 }}>{star}</span>
                    <Icon name="star" size={11} color="oklch(0.72 0.14 75)" />
                    <div style={{ flex: 1, height: 5, borderRadius: 999, background: 'var(--line-2)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 999, background: 'oklch(0.72 0.14 75)', width: star === 5 ? '74%' : star === 4 ? '18%' : '8%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SAMPLE_REVIEWS.map(r => (
                <div key={r.id} style={{ padding: '16px 18px', background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 12 }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                    {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={13} color={i <= r.rating ? 'oklch(0.72 0.14 75)' : 'var(--line)'} />)}
                  </div>
                  <p style={{ font: '400 13px/1.65 Inter', color: 'var(--ink-2)', margin: '0 0 10px' }}>"{r.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 12px/1 Inter', color: 'var(--ink-3)' }}>
                    <span>— {r.name}</span><span>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right — booking */}
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px -8px rgba(20,15,10,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--line-2)' }}>
              {['book', 'chat'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 8px', border: 'none', background: tab === t ? 'var(--bg)' : 'var(--bg-alt)', font: tab === t ? '600 13px/1 Inter' : '400 13px/1 Inter', color: tab === t ? 'var(--accent)' : 'var(--ink-3)', cursor: 'pointer', borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent', transition: 'all .15s' }}>
                  {t === 'book' ? 'Book / Reserve' : 'Message'}
                </button>
              ))}
            </div>
            <div style={{ padding: 20 }}>
              {tab === 'chat' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ minHeight: 180, maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, padding: '4px 0' }}>
                    {chatLog.length === 0 && (
                      <div style={{ textAlign: 'center', color: 'var(--ink-3)', font: '400 12px/1.6 Inter', padding: '24px 12px' }}>
                        Send a message to start a conversation with {pro.name}.
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
                    <input value={chat} onChange={e => setChat(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Type a message…" style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 10, padding: '9px 13px', font: '400 13px/1 Inter', color: 'var(--ink)', background: 'var(--bg)', outline: 'none' }} />
                    <button onClick={sendChat} style={{ padding: '9px 16px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: 'white', font: '600 13px/1 Inter', cursor: 'pointer' }}>Send</button>
                  </div>
                </div>
              ) : sent ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.94 0.06 145)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                    <Icon name="check-badge" size={24} color="var(--green)" />
                  </div>
                  <div style={{ font: '600 16px/1.2 Inter', color: 'var(--ink)', marginBottom: 6 }}>Request sent!</div>
                  <div style={{ font: '400 13px/1.5 Inter', color: 'var(--ink-3)', marginBottom: 16 }}>{pro.name} will respond within 1 hour.</div>
                  <button onClick={() => setSent(false)} style={{ font: '500 12px/1 Inter', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>Send another request</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ background: 'var(--accent-soft)', border: '1px solid oklch(0.88 0.08 30)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)' }}>Starting from</span>
                    <span style={{ font: '700 18px/1 Inter', color: 'var(--accent)', letterSpacing: '-0.02em' }}>${pro.fee} <span style={{ font: '400 11px/1 Inter', color: 'var(--ink-3)' }}>{feeLabel}</span></span>
                  </div>
                  <div>
                    <label style={labelSt}>Service *</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.service} onChange={e => set('service', e.target.value)} style={{ ...inputSt, paddingRight: 34, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }} onFocus={fo} onBlur={fb}>
                        <option value="">Select a service…</option>
                        {pro.services.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <Icon name="chevron-down" size={13} color="var(--ink-3)" />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={labelSt}>Preferred Date *</label>
                      <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputSt} onFocus={fo} onBlur={fb} />
                    </div>
                    <div>
                      <label style={labelSt}>Preferred Time</label>
                      <input type="time" value={form.time} onChange={e => set('time', e.target.value)} style={inputSt} onFocus={fo} onBlur={fb} />
                    </div>
                  </div>
                  <div>
                    <label style={labelSt}>Notes</label>
                    <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any details or special requests…" style={{ ...inputSt, resize: 'vertical', minHeight: 72 }} onFocus={fo} onBlur={fb} />
                  </div>
                  <button onClick={() => { if (canSubmit) setSent(true); }} style={{ width: '100%', padding: '13px', borderRadius: 11, border: 'none', background: canSubmit ? 'var(--accent)' : 'oklch(0.88 0.01 80)', color: canSubmit ? 'white' : 'var(--ink-3)', font: '600 14px/1 Inter', cursor: canSubmit ? 'pointer' : 'default', transition: 'opacity .15s, background .2s' }}>
                    Request Booking
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--line-2)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ font: '500 12px/1 Inter', color: 'var(--ink-3)', marginBottom: 2 }}>Contact directly</div>
            <a href={`tel:${pro.phone}`} style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="pin" size={13} color="var(--accent)" /> {pro.phone}
            </a>
            <a href={`mailto:${pro.email}`} style={{ font: '500 13px/1 Inter', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="briefcase" size={13} color="var(--ink-3)" /> {pro.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

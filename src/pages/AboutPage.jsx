import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const TEAM = [
  {
    name: 'Arbab Rahman', role: 'Co-founder & CEO',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80&auto=format&fit=crop&crop=faces',
    quote: 'I spent three weeks trying to find a dentist. Took my insurance, had good reviews, available that week. Three weeks.',
  },
  {
    name: 'Sofia Chen', role: 'Co-founder & CTO',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&auto=format&fit=crop&crop=faces',
    quote: 'The data already exists — licenses, insurance, real reviews. We just built the system to surface it honestly.',
  },
  {
    name: 'Marcus Hill', role: 'Growth',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&auto=format&fit=crop&crop=faces',
    quote: 'Most discovery products optimize for clicks. We optimize for the moment someone actually gets helped.',
  },
  {
    name: 'Priya Kapoor', role: 'Operations',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80&auto=format&fit=crop&crop=faces',
    quote: "Verification sounds boring until you realize it's why people actually trust what they find here.",
  },
];

const PROS_COLLAGE = [
  { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop', label: 'Dentist', span: true },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80&auto=format&fit=crop', label: 'Restaurant' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&crop=faces', label: 'Salon & Spa' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=faces', label: 'Photographer' },
];


export default function AboutPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SiteNav />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80&auto=format&fit=crop"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Dark overlay — heavier on left, fades right */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, oklch(0.10 0.02 40 / 0.92) 0%, oklch(0.14 0.02 40 / 0.70) 50%, oklch(0.14 0.02 40 / 0.45) 100%)' }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 40px 72px', position: 'relative', zIndex: 1 }}>
          <p style={{ margin: '0 0 18px', font: '600 12px/1 Inter', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            About us
          </p>
          <h1 style={{ margin: '0 0 20px', font: '800 clamp(36px,5vw,60px)/1.06 Inter', letterSpacing: '-0.035em', color: 'white', maxWidth: 620, textShadow: '0 2px 24px oklch(0 0 0 / 0.35)' }}>
            Finding someone <span style={{ color: 'var(--accent)' }}>good</span> shouldn't be this hard.
          </h1>
          <p style={{ margin: '0 0 44px', font: '400 17px/1.7 Inter', color: 'rgba(255,255,255,0.65)', maxWidth: 520 }}>
            We built whyclick.tv after one too many bad experiences — unverified listings, ghost reviews, and professionals who were impossible to reach. Good pros exist in every city. We help you find them.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { n: '1.8M', label: 'people helped this year' },
              { n: '14,200+', label: 'verified professionals' },
              { n: '50+', label: 'cities across the US' },
              { n: '4.9★', label: 'average rating' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ font: '800 28px/1 Inter', letterSpacing: '-0.03em', color: 'white' }}>{s.n}</div>
                <div style={{ font: '400 12px/1.4 Inter', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 40px' }}>
        <div style={{ maxWidth: 880, borderLeft: '4px solid var(--accent)', paddingLeft: 36 }}>
          <blockquote style={{ margin: 0, font: '700 36px/1.3 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            "We believe trust should be the default — not something customers have to earn through bad experiences."
          </blockquote>
          <div style={{ marginTop: 20, font: '500 14px/1 Inter', color: 'var(--ink-3)' }}>
            Arbab Rahman · Co-founder
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ borderTop: '1px solid var(--line-2)', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <p style={{ margin: '0 0 20px', font: '600 11px/1 Inter', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Our mission
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>
            <div>
              <h2 style={{ margin: '0 0 28px', font: '800 44px/1.08 Inter', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
                Find someone great.<br />In minutes, not weeks.
              </h2>
              <p style={{ margin: '0 0 20px', font: '400 17px/1.7 Inter', color: 'var(--ink-2)' }}>
                The internet made it possible to find professionals everywhere. It didn't make it easier to trust them.
              </p>
              <p style={{ margin: 0, font: '400 17px/1.7 Inter', color: 'var(--ink-2)' }}>
                We built whyclick.tv to close that gap — a directory where every listing is earned, not bought, and every professional has been independently verified before you ever see their name.
              </p>
            </div>

            <div>
              {[
                {
                  title: 'No paid placements, ever',
                  body: "A professional's position on whyclick.tv is determined by their actual record — reviews, credentials, responsiveness. Not ad spend. The best pros rise because they're the best.",
                },
                {
                  title: 'Independently verified',
                  body: 'Every applicant is cross-referenced against state license databases and insurance records before going live. About 1 in 3 don\'t pass. That gap is the point.',
                },
                {
                  title: 'Real information, always',
                  body: 'No "starting from" pricing. No ghost profiles. We require professionals to keep listings accurate — and we pull the ones that go dark.',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  paddingTop: i === 0 ? 0 : 32,
                  paddingBottom: 32,
                  borderBottom: i < 2 ? '1px solid var(--line-2)' : 'none',
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                    flexShrink: 0, marginTop: 9,
                  }} />
                  <div>
                    <div style={{ font: '600 16px/1.3 Inter', color: 'var(--ink)', marginBottom: 8 }}>{item.title}</div>
                    <div style={{ font: '400 14px/1.7 Inter', color: 'var(--ink-3)' }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ margin: '0 0 12px', font: '600 11px/1 Inter', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              The people
            </p>
            <h2 style={{ margin: 0, font: '700 32px/1.1 Inter', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              Small team.<br />Strong opinions.
            </h2>
          </div>
          <p style={{ margin: 0, font: '400 14px/1.6 Inter', color: 'var(--ink-3)', maxWidth: 340 }}>
            We keep the team lean on purpose. Fewer people means clearer thinking and faster decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {TEAM.map(m => (
            <div
              key={m.name}
              onMouseEnter={() => setHovered(m.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 16,
                border: '1px solid var(--line-2)',
                overflow: 'hidden',
                transition: 'box-shadow .2s ease',
                boxShadow: hovered === m.name ? '0 8px 32px -8px rgba(0,0,0,0.14)' : 'none',
              }}
            >
              <div style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
                <img
                  src={m.img} alt={m.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: hovered === m.name ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform .35s ease',
                  }}
                />
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ font: '600 15px/1.2 Inter', color: 'var(--ink)' }}>{m.name}</div>
                <div style={{ font: '500 11px/1 Inter', color: 'var(--accent)', marginTop: 4, letterSpacing: '0.03em' }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ borderTop: '1px solid var(--line-2)', background: 'var(--bg-alt)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ font: '700 22px/1.2 Inter', letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 8 }}>
              Join the platform — or just say hi.
            </div>
            <div style={{ font: '400 15px/1.5 Inter', color: 'var(--ink-3)' }}>
              We're always looking for quality professionals and always happy to hear from people who use what we build.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <button
              onClick={() => navigate('/join')}
              style={{ padding: '13px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', font: '600 14px/1 Inter', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Apply as a pro →
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{ padding: '13px 24px', borderRadius: 10, background: 'transparent', color: 'var(--ink)', font: '600 14px/1 Inter', border: '1.5px solid var(--line)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

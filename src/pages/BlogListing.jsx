import React from 'react';
import { useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import { Icon, Container } from '../components/primitives';
import { BLOG_POSTS } from '../data/blogData';

export default function BlogListing() {
  const navigate = useNavigate();
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SiteNav />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #fff9f6 0%, #fff4ef 50%, #fff 100%)',
        borderBottom: '1px solid var(--line-2)',
        padding: '72px 0 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative circle */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: -120, right: -120,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,90,32,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 64, alignItems: 'flex-end' }}>

            {/* Left: text */}
            <div style={{ paddingBottom: 56 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
                padding: '6px 14px', borderRadius: 999,
                background: 'var(--accent-soft)', border: '1px solid rgba(255,90,32,0.15)',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ font: '600 12px/1 Inter', color: 'var(--accent)', letterSpacing: '0.06em' }}>
                  {BLOG_POSTS.length} articles published
                </span>
              </div>

              <h1 style={{ margin: '0 0 18px', font: '800 54px/1.06 Inter', letterSpacing: '-0.04em', color: 'var(--ink)' }}>
                Discover our<br />latest blogs
              </h1>
              <p style={{ margin: '0 0 36px', font: '400 17px/1.65 Inter', color: 'var(--ink-2)', maxWidth: 480 }}>
                Guides, insights, and expert advice — for patients finding better care and professionals building better practices.
              </p>

              {/* Topics row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Patient Guides', 'Platform', 'For Professionals', 'Industry Insights', 'Consumer Tips'].map(t => (
                  <span key={t} style={{
                    padding: '6px 14px', borderRadius: 999,
                    background: '#fff', border: '1px solid var(--line)',
                    font: '500 13px/1 Inter', color: 'var(--ink-2)',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right: stacked image previews */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignSelf: 'flex-end', paddingBottom: 0 }}>
              {BLOG_POSTS.slice(0, 4).map((post, i) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  style={{
                    borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                    aspectRatio: i === 0 ? '4/3' : '1/1',
                    gridColumn: i === 0 ? '1 / -1' : 'auto',
                    position: 'relative',
                    boxShadow: '0 4px 20px -8px rgba(40,20,0,0.18)',
                    transition: 'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(40,20,0,0.22)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -8px rgba(40,20,0,0.18)'; }}
                >
                  <img src={post.img} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Gradient overlay + title on large card */}
                  {i === 0 && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(10,5,0,0.65) 0%, transparent 55%)',
                      display: 'flex', alignItems: 'flex-end', padding: '18px 20px',
                    }}>
                      <p style={{ margin: 0, font: '600 14px/1.3 Inter', color: '#fff' }}>{post.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>

      <Container style={{ padding: '56px 0 96px' }}>

        {featured && (
          <>
            {/* ── Featured post ── */}
            <div
              onClick={() => navigate(`/blog/${featured.id}`)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 420px', gap: 0,
                border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden',
                cursor: 'pointer', marginBottom: 40,
                background: 'var(--bg)',
                transition: 'box-shadow .2s, transform .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 56px -20px rgba(40,20,0,.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ padding: '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                <h2 style={{ margin: 0, font: '800 34px/1.15 Inter', letterSpacing: '-0.025em', color: 'var(--ink)' }}>
                  {featured.title}
                </h2>
                <p style={{ margin: 0, font: '400 15px/1.65 Inter', color: 'var(--ink-2)' }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                  <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>{featured.date}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-3)' }} />
                  <span style={{ font: '400 13px/1 Inter', color: 'var(--ink-3)' }}>{featured.readTime} read</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '600 14px/1 Inter', color: 'var(--accent)' }}>
                  Read article <Icon name="arrow-right" size={14} color="var(--accent)" />
                </div>
              </div>
              <div style={{ background: 'var(--bg-alt)', overflow: 'hidden', minHeight: 360 }}>
                <img src={featured.img} alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>

            {/* ── Rest of posts ── */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {rest.map(post => (
                  <article
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    style={{
                      background: 'var(--bg)', border: '1px solid var(--line)',
                      borderRadius: 16, overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      cursor: 'pointer', transition: 'transform .2s, box-shadow .2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(40,30,20,.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-alt)' }}>
                      <img src={post.img} alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                      <h3 style={{ margin: 0, font: '700 18px/1.3 Inter', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                        {post.title}
                      </h3>
                      <p style={{ margin: 0, font: '400 13px/1.6 Inter', color: 'var(--ink-2)', flex: 1 }}>
                        {post.excerpt}
                      </p>
                      <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', gap: 6, font: '600 13px/1 Inter', color: 'var(--accent)' }}>
                        Read article <Icon name="arrow-right" size={12} color="var(--accent)" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

      </Container>
    </div>
  );
}

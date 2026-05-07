import React from 'react';
import { useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
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
        background: '#fff',
        borderBottom: '1px solid var(--line-2)',
        padding: '64px 0 60px',
      }}>
        <Container>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: '0 0 14px', font: '600 11px/1 Inter', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              whyclick.tv Blog
            </p>
            <h1 style={{ margin: '0 0 16px', font: '800 52px/1.06 Inter', letterSpacing: '-0.04em', color: 'var(--ink)' }}>
              Discover our latest blogs
            </h1>
            <p style={{ margin: 0, font: '400 17px/1.65 Inter', color: 'var(--ink-2)' }}>
              Guides, insights, and expert advice — for patients finding better care and professionals building better practices.
            </p>
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
      <SiteFooter />
    </div>
  );
}

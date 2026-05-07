import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { Icon, Container } from '../components/primitives';
import { BLOG_POSTS } from '../data/blogData';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <SiteNav />
        <Container style={{ padding: '96px 0', textAlign: 'center' }}>
          <h2 style={{ font: '700 28px/1.2 Inter', color: 'var(--ink)', marginBottom: 16 }}>Post not found</h2>
          <button onClick={() => navigate('/blog')} style={{
            padding: '10px 24px', borderRadius: 10, border: 'none',
            background: 'var(--accent)', color: '#fff', font: '600 14px/1 Inter', cursor: 'pointer',
          }}>Back to Blog</button>
        </Container>
      </div>
    );
  }

  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.tag === post.tag).slice(0, 3);
  const otherRelated = related.length < 3
    ? [...related, ...BLOG_POSTS.filter(p => p.id !== post.id && p.tag !== post.tag).slice(0, 3 - related.length)]
    : related;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <SiteNav />

      {/* ── Hero image ── */}
      <div style={{ width: '100%', aspectRatio: '21/7', overflow: 'hidden', background: 'var(--bg-alt)', maxHeight: 480 }}>
        <img
          src={post.img}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* ── Article body ── */}
      <Container style={{ padding: '64px 0 96px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Back */}
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32,
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font: '500 13px/1 Inter', color: 'var(--ink-3)',
              transition: 'color .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All articles
          </button>

          {/* Title */}
          <h1 style={{ margin: '0 0 24px', font: '800 46px/1.1 Inter', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line-2)' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent) 0%, #ff7a47 100%)',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <span style={{ font: '700 13px/1 Inter', color: '#fff' }}>
                {post.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <div style={{ font: '600 14px/1 Inter', color: 'var(--ink)' }}>{post.author}</div>
              <div style={{ font: '400 12px/1 Inter', color: 'var(--ink-3)', marginTop: 3 }}>
                {post.date} · {post.readTime} read
              </div>
            </div>
          </div>

          {/* Excerpt lead */}
          <p style={{ margin: '0 0 28px', font: '500 18px/1.7 Inter', color: 'var(--ink-2)', borderLeft: '3px solid var(--accent)', paddingLeft: 20 }}>
            {post.excerpt}
          </p>

          {/* Body paragraphs */}
          {(post.content || []).map((para, i) => (
            <p key={i} style={{ margin: '0 0 24px', font: '400 16px/1.75 Inter', color: 'var(--ink-2)' }}>
              {para}
            </p>
          ))}

          {/* Share / CTA */}
          <div style={{
            marginTop: 56, padding: '32px 36px',
            background: 'linear-gradient(135deg, var(--accent-soft) 0%, rgba(255,90,32,0.05) 100%)',
            border: '1px solid rgba(255,90,32,0.15)', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          }}>
            <div>
              <h3 style={{ margin: '0 0 6px', font: '700 20px/1.2 Inter', color: 'var(--ink)' }}>
                Ready to find a verified professional?
              </h3>
              <p style={{ margin: 0, font: '400 14px/1.5 Inter', color: 'var(--ink-2)' }}>
                Browse 76,000+ license-checked pros in your area.
              </p>
            </div>
            <button
              onClick={() => navigate('/dentists')}
              style={{
                flexShrink: 0, padding: '12px 24px', borderRadius: 10, border: 'none',
                background: 'var(--accent)', color: '#fff', font: '600 14px/1 Inter', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                transition: 'opacity .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Find a pro
              <Icon name="arrow-right" size={14} color="#fff" />
            </button>
          </div>
        </div>

        {/* ── Related posts ── */}
        {otherRelated.length > 0 && (
          <div style={{ maxWidth: 1080, margin: '80px auto 0' }}>
            <h2 style={{ margin: '0 0 28px', font: '700 26px/1.2 Inter', letterSpacing: '-0.015em', color: 'var(--ink)' }}>
              More articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {otherRelated.map(rel => (
                <article
                  key={rel.id}
                  onClick={() => { navigate(`/blog/${rel.id}`); window.scrollTo(0, 0); }}
                  style={{
                    background: 'var(--bg)', border: '1px solid var(--line)',
                    borderRadius: 14, overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'pointer', transition: 'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px -16px rgba(40,30,20,.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--bg-alt)' }}>
                    <img src={rel.img} alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <h3 style={{ margin: 0, font: '600 15px/1.3 Inter', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                      {rel.title}
                    </h3>
                    <p style={{ margin: 0, font: '400 12px/1.55 Inter', color: 'var(--ink-2)', flex: 1 }}>
                      {rel.excerpt.slice(0, 90)}…
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 12px/1 Inter', color: 'var(--accent)' }}>
                      Read article <Icon name="arrow-right" size={11} color="var(--accent)" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </Container>
      <SiteFooter />
    </div>
  );
}

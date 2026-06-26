'use client';

import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  createdAt: Date;
  author: { name: string; email: string } | null;
};

const AVATAR_COLORS = [
  'var(--color-badge-violet)',
  'var(--color-badge-orange)',
  'var(--color-badge-emerald)',
  'var(--color-badge-pink)',
];

export default function PostCard({ post }: { post: Post }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(post.createdAt));

  const initials = post.author?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'A';

  const avatarColor = AVATAR_COLORS[(post.author?.name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.15s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Cover image */}
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Card body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {/* Category badge */}
          <span style={{
            display: 'inline-flex',
            width: 'fit-content',
            alignItems: 'center',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-muted)',
            fontSize: '12px',
            fontWeight: 500,
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
          }}>
            Article
          </span>

          {/* Title */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-ink)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p style={{
            fontSize: '14px',
            color: 'var(--color-body)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
            flex: 1,
          }}>
            {post.description}
          </p>

          {/* Author + date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-hairline-soft)',
            marginTop: 'auto',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>
                {post.author?.name ?? 'Admin'}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-muted)', marginLeft: '8px' }}>
                · {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

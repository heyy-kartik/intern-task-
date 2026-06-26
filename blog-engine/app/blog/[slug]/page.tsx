import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FeaturedImage from '@/components/FeaturedImage';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post) notFound();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(post.createdAt));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-canvas)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top Nav ─────────────────────────────────── */}
      <nav style={{
        backgroundColor: 'var(--color-canvas)',
        borderBottom: '1px solid var(--color-hairline)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link href="/" style={{ color: 'var(--color-ink)', fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em' }}>
          Blog Engine
        </Link>
        <Link
          href="/blog/create"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            fontSize: '14px',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
          }}
          className="transition-opacity hover:opacity-90"
        >
          Write a post
        </Link>
      </nav>

      {/* ── Article ─────────────────────────────────── */}
      <main style={{ maxWidth: '768px', margin: '0 auto', padding: '64px 24px 96px' }}>

        {/* Category badge */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface-card)',
            color: 'var(--color-muted)',
            fontSize: '13px',
            fontWeight: 500,
            padding: '4px 12px',
            borderRadius: 'var(--radius-pill)',
          }}>
            Article
          </span>
        </div>

        {/* Title */}
        <h1 className="display-lg" style={{ color: 'var(--color-ink)', marginBottom: '20px', lineHeight: 1.1 }}>
          {post.title}
        </h1>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--color-hairline)',
        }}>
          {/* Avatar */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-badge-violet)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            {post.author?.name?.charAt(0).toUpperCase() ?? 'A'}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)' }}>
              {post.author?.name ?? 'Admin'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
              <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <FeaturedImage src={post.image} alt={post.title} />

        {/* Body */}
        <div style={{ marginTop: '40px' }}>
          {post.description.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'var(--color-body)',
              marginBottom: '20px',
            }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid var(--color-hairline)',
        }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-ink)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to home
          </Link>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <footer style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-on-dark-soft)',
        padding: '64px 48px',
        fontSize: '14px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <span style={{ color: 'var(--color-on-dark)', fontWeight: 600 }}>Blog Engine</span>
          <span style={{ color: 'var(--color-muted-soft)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Kartik Jagdale
          </span>
        </div>
      </footer>
    </div>
  );
}

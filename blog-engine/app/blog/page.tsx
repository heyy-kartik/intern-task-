import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic'; // always fetch fresh data

export default async function BlogIndexPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-canvas)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Top Nav ─────────────────────────────── */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Nav pill group */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            backgroundColor: 'var(--color-surface-soft)',
            padding: '4px',
            borderRadius: 'var(--radius-pill)',
          }}>
            <Link href="/" style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-muted)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
            }}>
              Home
            </Link>
            <span style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-ink)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-canvas)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            }}>
              All Posts
            </span>
          </div>
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
          >
            Write a post
          </Link>
        </div>
      </nav>

      {/* ── Header ──────────────────────────────── */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px 48px',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--color-surface-card)',
          color: 'var(--color-muted)',
          fontSize: '13px',
          fontWeight: 500,
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          marginBottom: '20px',
        }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
        </div>
        <h1 className="display-md" style={{ color: 'var(--color-ink)', marginBottom: '12px' }}>
          All posts
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--color-body)' }}>
          Articles written by all contributors, ordered by newest first.
        </p>
      </header>

      {/* ── Post Grid ───────────────────────────── */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 96px' }}>

        {posts.length === 0 ? (
          /* Empty state */
          <div style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '64px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>✍️</div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '8px' }}>
              No posts yet
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px' }}>
              Be the first to publish something.
            </p>
            <Link
              href="/blog/create"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Create first post
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
          }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-on-dark-soft)',
        padding: '64px 48px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '14px',
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

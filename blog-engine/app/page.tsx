import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* ── Top Nav ──────────────────────────────────────── */}
      <nav style={{
        backgroundColor: 'var(--color-canvas)',
        borderBottom: '1px solid var(--color-hairline)',
        height: '64px',
      }} className="flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <Link href="/" style={{ color: 'var(--color-ink)', fontWeight: 600, fontSize: '16px', letterSpacing: '-0.01em' }}>
          Blog Engine
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/blog" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-muted)' }}>
            All Posts
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
          >
            Write a post
          </Link>
        </div>
      </nav>

      {/* ── Hero Band ─────────────────────────────────────── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px', backgroundColor: 'var(--color-canvas)' }}
        className="px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <div className="max-w-[720px]">
          {/* Badge */}
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
            marginBottom: '32px',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: 'var(--color-success)', display: 'inline-block'
            }} />
            Live on PostgreSQL · Next.js 15
          </div>

          <h1 className="display-xl" style={{ color: 'var(--color-ink)', marginBottom: '24px' }}>
            The better way to<br />publish your ideas.
          </h1>

          <p style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'var(--color-body)',
            lineHeight: 1.6,
            marginBottom: '40px',
            maxWidth: '560px',
          }}>
            A lightweight, production-ready blog engine with automatic slug generation, a relational PostgreSQL database, and clean dynamic routing.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/blog/create"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Create a post
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link
              href="/blog"
              style={{
                backgroundColor: 'var(--color-canvas)',
                color: 'var(--color-ink)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--color-hairline)',
              }}
            >
              Browse all posts
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ────────────────────────────────── */}
      <section style={{
        paddingTop: '0',
        paddingBottom: '96px',
        backgroundColor: 'var(--color-canvas)',
      }} className="px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            {
              icon: '⚡',
              title: 'Auto Slug Generation',
              desc: 'Titles are deterministically converted to SEO-friendly URL slugs — special characters stripped, spaces hyphenated, duplicates handled automatically.',
            },
            {
              icon: '🗄️',
              title: 'PostgreSQL + Prisma',
              desc: 'A strongly-typed Prisma schema backed by a Neon PostgreSQL database. Migrations are versioned, indexed slug lookups are fast.',
            },
            {
              icon: '🚀',
              title: 'Server-Side Rendering',
              desc: 'Blog pages are rendered on the server using Next.js App Router React Server Components for maximum performance and SEO.',
            },
          ].map((f) => (
            <div key={f.title} style={{
              backgroundColor: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-ink)',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-body)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto w-full" style={{ paddingBottom: '96px' }}>
        <div style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '64px 48px',
          textAlign: 'center',
        }}>
          <h2 className="display-sm" style={{ color: 'var(--color-ink)', marginBottom: '16px' }}>
            Ready to publish your first post?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-body)', marginBottom: '32px' }}>
            Fill out the form and your post will be live at <code style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '14px',
              backgroundColor: 'var(--color-hairline-soft)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}>/blog/your-post-title</code> instantly.
          </p>
          <Link
            href="/blog/create"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            className="transition-opacity hover:opacity-90"
          >
            Get started — it&apos;s free
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-on-dark-soft)',
        padding: '64px 48px',
        marginTop: 'auto',
      }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div style={{ color: 'var(--color-on-dark)', fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>
              Blog Engine
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, maxWidth: '260px' }}>
              A backend internship assessment built with Next.js 15, Prisma ORM, and PostgreSQL.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 48px', fontSize: '14px' }}>
            <div>
              <div style={{ color: 'var(--color-on-dark)', fontWeight: 600, marginBottom: '12px' }}>Product</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><Link href="/blog/create" className="hover:text-white transition-colors">Create Post</Link></li>
              </ul>
            </div>
            <div>
              <div style={{ color: 'var(--color-on-dark)', fontWeight: 600, marginBottom: '12px' }}>API</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><code style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px' }}>POST /api/posts</code></li>
                <li><code style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px' }}>GET /api/posts/[slug]</code></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto" style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid #1f1f1f',
          fontSize: '13px',
          color: 'var(--color-muted-soft)',
        }}>
          © {new Date().getFullYear()} Kartik Jagdale · Built for Backend Internship Assessment
        </div>
      </footer>
    </div>
  );
}

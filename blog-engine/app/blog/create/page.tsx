'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', image: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim().length < 3) {
      setError('Title must be at least 3 characters.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create post');
      }
      const post = await res.json();
      router.push(`/blog/${post.slug}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    height: '40px',
    fontSize: '16px',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.15s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    marginBottom: '6px',
  };

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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-muted)' }}>
            ← Back to home
          </Link>
        </nav>
      </nav>

      {/* ── Form Page ───────────────────────────── */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '72px 24px 96px' }}>

        <div style={{ marginBottom: '40px' }}>
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
            Admin
          </div>
          <h1 className="display-md" style={{ color: 'var(--color-ink)', marginBottom: '12px' }}>
            Create a new post
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-body)' }}>
            Fill in the details below. Your post will be published instantly with a generated URL slug.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '14px',
            color: 'var(--color-error)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Title */}
            <div>
              <label htmlFor="title" style={labelStyle}>
                Post title <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={3}
                style={inputStyle}
                placeholder="e.g. Understanding Prisma Relations"
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
              />
              <p style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '6px' }}>
                The slug will be auto-generated from this title.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" style={labelStyle}>
                Cover image URL <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="https://images.unsplash.com/photo-..."
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" style={labelStyle}>
                Description <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={8}
                style={{
                  ...inputStyle,
                  height: 'auto',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  paddingTop: '10px',
                }}
                placeholder="Write your blog content here..."
                onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--color-hairline)')}
              />
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--color-hairline-soft)', paddingTop: '8px' }} />

            {/* Submit */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? 'var(--color-primary-disabled)' : 'var(--color-primary)',
                  color: loading ? 'var(--color-muted)' : 'var(--color-on-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '0 24px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  transition: 'background-color 0.15s',
                }}
              >
                {loading && (
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {loading ? 'Publishing...' : 'Publish post'}
              </button>
              <Link href="/" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-muted)' }}>
                Cancel
              </Link>
            </div>

          </div>
        </form>
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <footer style={{
        backgroundColor: 'var(--color-surface-dark)',
        color: 'var(--color-on-dark-soft)',
        padding: '32px 48px',
        fontSize: '13px',
        textAlign: 'center',
      }}>
        © {new Date().getFullYear()} Kartik Jagdale · Blog Engine
      </footer>
    </div>
  );
}

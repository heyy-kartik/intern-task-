'use client';

const FALLBACK_SRC =
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

interface FeaturedImageProps {
  src: string;
  alt: string;
}

export default function FeaturedImage({ src, alt }: FeaturedImageProps) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--color-hairline)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK_SRC;
        }}
      />
    </div>
  );
}

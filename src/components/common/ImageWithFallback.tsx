import { useState } from 'react';
import { Fish } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  label,
  className,
  width = 1200,
  height = 900,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  // An empty src means the photo was removed; show the placeholder without a broken request.
  if (!src || failed) {
    return (
      <div
        className={className ? `image-fallback ${className}` : 'image-fallback'}
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Fish size={44} strokeWidth={1.2} aria-hidden="true" />
        <span>{label ?? alt}</span>
        <small>Photo coming soon</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

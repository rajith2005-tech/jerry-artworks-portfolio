import React, { useRef } from 'react';
import { Artwork } from '../../types';
import { useCursor } from '../../hooks/useCursorState';

interface ArtFrameProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  onViewDetail?: (artwork: Artwork) => void;
  className?: string;
  isLarge?: boolean;
}

export const ArtFrame: React.FC<ArtFrameProps> = ({
  artwork,
  onSelect,
  onViewDetail,
  className = '',
  isLarge = false,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const { setCursorContext, resetCursor } = useCursor();

  // Enforce correct aspect ratio string
  const getAspectRatio = () => {
    if (artwork.aspectRatio) {
      const parts = artwork.aspectRatio.split('/').map((s) => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] > 0) {
        let w = parts[0];
        let h = parts[1];
        if (artwork.orientation === 'portrait' && w > h) return `${h} / ${w}`;
        if (artwork.orientation === 'landscape' && w < h) return `${h} / ${w}`;
        return `${w} / ${h}`;
      }
    }
    return artwork.orientation === 'portrait' ? '3 / 4' : '4 / 3';
  };

  // Subtle 3D card tilt physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    frameRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    resetCursor();
    if (frameRef.current) {
      frameRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  };

  return (
    <article
      ref={frameRef}
      className={`museum-frame-wrapper ${className}`}
      onClick={() => onSelect(artwork)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorContext('view', 'VIEW')}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: isLarge ? '1.75rem' : '1.25rem',
        backgroundColor: '#FAF9F6',
      }}
      tabIndex={0}
      role="button"
      aria-label={`View artwork details for ${artwork.title}, ${artwork.medium}, ${artwork.year}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
    >
      {/* Frame Border & Matting */}
      <div
        className="museum-frame-inner"
        style={{
          aspectRatio: getAspectRatio(),
          backgroundColor: '#FFFFFF',
          padding: '8px',
          border: '8px solid #181716',
          boxShadow: 'inset 0 0 12px rgba(0,0,0,0.2)',
        }}
      >
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>

      {/* Caption & Metadata */}
      <div className="art-caption">
        <div className="art-caption-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <h3 className="art-title">{artwork.title}</h3>
            {artwork.spineConfig && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  backgroundColor: 'rgba(24, 23, 22, 0.08)',
                  padding: '2px 5px',
                  borderRadius: '2px',
                  letterSpacing: '0.08em',
                  color: 'var(--ink-primary)',
                }}
              >
                SPINE 2D
              </span>
            )}
          </div>
          <span className="art-meta">
            {artwork.medium} • {artwork.year}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {onViewDetail && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(artwork);
              }}
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-primary)',
                borderBottom: '1px solid var(--ink-primary)',
                paddingBottom: '1px',
              }}
              title="Open full case study"
            >
              Case Study
            </button>
          )}
          <span className="art-arrow-icon" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import { Artwork } from '../../types';

interface ArtFrameProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  className?: string;
  isLarge?: boolean;
}

export const ArtFrame: React.FC<ArtFrameProps> = ({
  artwork,
  onSelect,
  className = '',
  isLarge = false,
}) => {
  // Automatically enforce proper portrait vs landscape ratio
  const getAspectRatio = () => {
    if (artwork.aspectRatio) {
      const parts = artwork.aspectRatio.split('/').map((s) => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] > 0) {
        let w = parts[0];
        let h = parts[1];
        if (artwork.orientation === 'portrait' && w > h) {
          // Invert if entered backwards (e.g. 3/2 -> 2/3)
          return `${h} / ${w}`;
        }
        if (artwork.orientation === 'landscape' && w < h) {
          // Invert if entered backwards (e.g. 3/4 -> 4/3)
          return `${h} / ${w}`;
        }
        return `${w} / ${h}`;
      }
    }
    return artwork.orientation === 'portrait' ? '3 / 4' : '4 / 3';
  };

  const computedRatio = getAspectRatio();

  return (
    <div
      className={`museum-frame-wrapper ${className}`}
      onClick={() => onSelect(artwork)}
      style={{
        padding: isLarge ? '1.85rem' : '1.35rem',
        borderRadius: '2px',
        backgroundColor: '#FAF9F6',
      }}
    >
      {/* Frame Border & Matted Area */}
      <div
        className="museum-frame-inner"
        style={{
          aspectRatio: computedRatio,
          backgroundColor: '#FFFFFF',
          padding: '8px',
          border: '9px solid #181716',
          borderRadius: '1px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            display: 'block',
          }}
        />
      </div>

      {/* Caption & Metadata matching Reference style */}
      <div className="art-caption">
        <div className="art-caption-info">
          <h3 className="art-title">{artwork.title}</h3>
          <span className="art-meta">
            {artwork.medium} • {artwork.year}
          </span>
        </div>
        <div className="art-arrow-icon" aria-hidden="true">
          ↗
        </div>
      </div>
    </div>
  );
};

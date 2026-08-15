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
  return (
    <div
      className={`museum-frame-wrapper ${className}`}
      onClick={() => onSelect(artwork)}
      style={{
        padding: isLarge ? '1.85rem' : '1.4rem',
        borderRadius: '2px',
        backgroundColor: '#FAF9F6',
      }}
    >
      {/* Frame Border & Matted Area */}
      <div
        className="museum-frame-inner"
        style={{
          aspectRatio: artwork.aspectRatio || (artwork.orientation === 'portrait' ? '3/4' : '4/3'),
          backgroundColor: '#FFFFFF',
          padding: '8px',
          border: '9px solid #181716',
          borderRadius: '1px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
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
          }}
        />
      </div>

      {/* Caption & Metadata matching Reference style */}
      <div className="art-caption">
        <div className="art-caption-info">
          <h3 className="art-title">{artwork.title}</h3>
          <span className="art-meta">{artwork.medium} • {artwork.year}</span>
        </div>
        <div className="art-arrow-icon" aria-hidden="true">
          ↗
        </div>
      </div>
    </div>
  );
};

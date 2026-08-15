import React, { useEffect } from 'react';
import { Artwork } from '../../types';

interface LightboxModalProps {
  artwork: Artwork | null;
  allArtworks: Artwork[];
  onClose: () => void;
  onSelect: (artwork: Artwork) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  artwork,
  allArtworks,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!artwork) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);
        const nextIndex = (currentIndex + 1) % allArtworks.length;
        onSelect(allArtworks[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);
        const prevIndex = (currentIndex - 1 + allArtworks.length) % allArtworks.length;
        onSelect(allArtworks[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, allArtworks, onClose, onSelect]);

  if (!artwork) return null;

  const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allArtworks.length;
    onSelect(allArtworks[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allArtworks.length) % allArtworks.length;
    onSelect(allArtworks[prevIndex]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 14, 13, 0.94)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FAF8F5',
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: artwork.orientation === 'landscape' ? '1.4fr 1fr' : '1fr 1fr',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
        className="lightbox-inner-dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: 'var(--text-primary)',
            fontSize: '1.2rem',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Artwork Media Display */}
        <div
          style={{
            backgroundColor: '#ECE8E1',
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '400px',
          }}
        >
          <div
            style={{
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '8px solid #141414',
              boxShadow: '0 16px 40px rgba(0,0,0,0.22)',
              maxWidth: '100%',
              maxHeight: '75vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              style={{
                maxWidth: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Artwork Story & Technical Info */}
        <div
          style={{
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                PIECE {currentIndex + 1} OF {allArtworks.length}
              </span>
              <span style={{ color: 'var(--border-light)' }}>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                {artwork.category}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
              }}
            >
              {artwork.title}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  MEDIUM
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {artwork.medium}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  YEAR
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {artwork.year}
                </span>
              </div>
              {artwork.dimensions && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    DIMENSIONS
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {artwork.dimensions}
                  </span>
                </div>
              )}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}
            >
              {artwork.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '2rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <button
              onClick={handlePrev}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 860px) {
          .lightbox-inner-dialog {
            grid-template-columns: 1fr !important;
            max-height: 94vh;
          }
        }
      `}</style>
    </div>
  );
};

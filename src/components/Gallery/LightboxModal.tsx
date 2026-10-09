import React, { useEffect, useState } from 'react';
import { Artwork } from '../../types';
import { SpineAnimation } from '../spine/SpineAnimation';

interface LightboxModalProps {
  artwork: Artwork | null;
  allArtworks: Artwork[];
  onClose: () => void;
  onSelect: (artwork: Artwork) => void;
  onViewCaseStudy?: (artwork: Artwork) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  artwork,
  allArtworks,
  onClose,
  onSelect,
  onViewCaseStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'inspect' | 'process' | 'spine'>('inspect');

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
        zIndex: 'var(--z-modal)' as unknown as number,
        backgroundColor: 'rgba(12, 11, 10, 0.94)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s var(--ease-editorial)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork inspection: ${artwork.title}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-primary)',
          maxWidth: '1150px',
          width: '100%',
          maxHeight: '92vh',
          borderRadius: '2px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: artwork.orientation === 'landscape' ? '1.35fr 1fr' : '1.05fr 1fr',
          boxShadow: 'var(--shadow-modal)',
          position: 'relative',
        }}
        className="lightbox-inner-dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 20,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            color: 'var(--ink-primary)',
            fontSize: '1.1rem',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Media Viewing Column */}
        <div
          style={{
            backgroundColor: '#EAE6DE',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '440px',
          }}
        >
          {activeTab === 'spine' && artwork.spineConfig ? (
            <div style={{ width: '100%', maxWidth: '480px' }}>
              <SpineAnimation
                skeletonPath={artwork.spineConfig.skeletonPath}
                atlasPath={artwork.spineConfig.atlasPath}
                fallbackImageUrl={artwork.imageUrl}
                altText={artwork.title}
                defaultAnimation={artwork.spineConfig.defaultAnimation}
                aimBoneName={artwork.spineConfig.aimBoneName}
                interactionMode="cursor"
                aspectRatio={artwork.aspectRatio}
              />
            </div>
          ) : (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#FFFFFF',
                border: '8px solid #141414',
                boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
                maxWidth: '100%',
                maxHeight: '76vh',
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
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Mode Switcher */}
          {artwork.spineConfig && (
            <div
              style={{
                marginTop: '1.2rem',
                display: 'flex',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '4px',
                borderRadius: '999px',
              }}
            >
              <button
                onClick={() => setActiveTab('inspect')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: activeTab === 'inspect' ? 'var(--ink-primary)' : 'transparent',
                  color: activeTab === 'inspect' ? '#FFFFFF' : 'var(--ink-secondary)',
                }}
              >
                STILL ART
              </button>
              <button
                onClick={() => setActiveTab('spine')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: activeTab === 'spine' ? 'var(--ink-primary)' : 'transparent',
                  color: activeTab === 'spine' ? '#FFFFFF' : 'var(--ink-secondary)',
                }}
              >
                SPINE 2D RIG
              </button>
            </div>
          )}
        </div>

        {/* Artwork Story & Technical Info Column */}
        <div
          style={{
            padding: '2.8rem 2.2rem',
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
                marginBottom: '0.6rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                CATALOG #{currentIndex + 1} OF {allArtworks.length}
              </span>
              <span>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--ink-secondary)',
                }}
              >
                {artwork.category}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.9rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                color: 'var(--ink-primary)',
                marginBottom: '1rem',
              }}
            >
              {artwork.title}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.1rem 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.4rem',
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                  MEDIUM
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {artwork.medium}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                  YEAR
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {artwork.year}
                </span>
              </div>
              {artwork.dimensions && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                    DIMENSIONS
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    {artwork.dimensions}
                  </span>
                </div>
              )}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--ink-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              {artwork.description}
            </p>

            {onViewCaseStudy && (
              <button
                onClick={() => {
                  onClose();
                  onViewCaseStudy(artwork);
                }}
                className="btn-editorial-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                Deep-Dive Case Study & Process Stages ↗
              </button>
            )}
          </div>

          {/* Previous / Next Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.5rem',
              marginTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <button
              onClick={handlePrev}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--ink-primary)',
              }}
            >
              ← Previous Piece
            </button>

            <button
              onClick={handleNext}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--ink-primary)',
              }}
            >
              Next Piece →
            </button>
          </div>
        </div>
      </div>

      <style>{`
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

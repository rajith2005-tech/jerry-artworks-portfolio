import React, { useState } from 'react';
import { Artwork } from '../types';
import { ArtFrame } from '../components/Gallery/ArtFrame';
import { useCursor } from '../hooks/useCursorState';

interface WorksPageProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onViewCaseStudy: (artwork: Artwork) => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  artworks,
  onSelectArtwork,
  onViewCaseStudy,
}) => {
  const [filter, setFilter] = useState<'all' | 'anime' | 'portrait' | 'concept'>('all');
  const [viewMode, setViewMode] = useState<'wall' | 'horizon'>('wall');
  const { setCursorContext, resetCursor } = useCursor();

  const filteredArtworks = filter === 'all'
    ? artworks
    : artworks.filter((art) => art.category === filter);

  return (
    <div className="anim-fade-in" style={{ paddingTop: '8rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Editorial Page Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              COLLECTION CATALOGUE • {filteredArtworks.length} PIECES
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: 'var(--ink-primary)',
            }}
          >
            WORKS & RIGS
          </h1>

          <p
            style={{
              marginTop: '1rem',
              maxWidth: '640px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--ink-secondary)',
              lineHeight: 1.7,
            }}
          >
            A curated exhibition of traditional 2H–8B graphite master studies, dynamic anime character concepts, and Spine 2D mesh rigged interactive artworks.
          </p>
        </div>

        {/* Filter & View Mode Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingBottom: '1.2rem',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '3.5rem',
          }}
        >
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['all', 'anime', 'portrait', 'concept'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '2px',
                  backgroundColor: filter === cat ? 'var(--ink-primary)' : 'transparent',
                  color: filter === cat ? '#FFFFFF' : 'var(--ink-secondary)',
                  border: '1px solid',
                  borderColor: filter === cat ? 'var(--ink-primary)' : 'var(--border-light)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={() => setCursorContext('hover')}
                onMouseLeave={resetCursor}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exhibition View Mode Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--bg-secondary)',
              padding: '3px',
              borderRadius: '3px',
            }}
          >
            <button
              onClick={() => setViewMode('wall')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.35rem 0.75rem',
                borderRadius: '2px',
                backgroundColor: viewMode === 'wall' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'wall' ? 'var(--ink-primary)' : 'var(--ink-muted)',
                boxShadow: viewMode === 'wall' ? 'var(--shadow-subtle)' : 'none',
              }}
            >
              WALL VIEW
            </button>
            <button
              onClick={() => setViewMode('horizon')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.35rem 0.75rem',
                borderRadius: '2px',
                backgroundColor: viewMode === 'horizon' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'horizon' ? 'var(--ink-primary)' : 'var(--ink-muted)',
                boxShadow: viewMode === 'horizon' ? 'var(--shadow-subtle)' : 'none',
              }}
            >
              HORIZON STRIP
            </button>
          </div>
        </div>

        {/* Dynamic Display based on View Mode */}
        {viewMode === 'wall' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '3rem',
            }}
            className="works-grid-wall"
          >
            {filteredArtworks.map((art) => (
              <ArtFrame
                key={art.id}
                artwork={art}
                onSelect={onSelectArtwork}
                onViewDetail={onViewCaseStudy}
              />
            ))}
          </div>
        ) : (
          /* Horizon Exhibition Strip */
          <div
            style={{
              overflowX: 'auto',
              paddingBottom: '2.5rem',
              cursor: 'grab',
            }}
            onMouseEnter={() => setCursorContext('drag', 'DRAG')}
            onMouseLeave={resetCursor}
          >
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                width: 'max-content',
                paddingRight: '3rem',
              }}
            >
              {filteredArtworks.map((art) => (
                <div key={art.id} style={{ width: '400px', flexShrink: 0 }}>
                  <ArtFrame
                    artwork={art}
                    onSelect={onSelectArtwork}
                    onViewDetail={onViewCaseStudy}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .works-grid-wall {
            grid-template-columns: 1fr !important;
            gap: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

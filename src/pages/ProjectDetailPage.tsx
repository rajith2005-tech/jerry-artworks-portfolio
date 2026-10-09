import React, { useState } from 'react';
import { Artwork, PageRoute } from '../types';
import { SpineAnimation } from '../components/spine/SpineAnimation';
import { useCursor } from '../hooks/useCursorState';

interface ProjectDetailPageProps {
  artwork: Artwork;
  allArtworks: Artwork[];
  onNavigate: (route: PageRoute) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  artwork,
  allArtworks,
  onNavigate,
  onSelectArtwork,
}) => {
  const { setCursorContext, resetCursor } = useCursor();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);
  const prevArtwork = allArtworks[(currentIndex - 1 + allArtworks.length) % allArtworks.length];
  const nextArtwork = allArtworks[(currentIndex + 1) % allArtworks.length];

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="anim-fade-in" style={{ paddingTop: '7.5rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => onNavigate('works')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--ink-secondary)',
            }}
            onMouseEnter={() => setCursorContext('hover')}
            onMouseLeave={resetCursor}
          >
            ← Back to Works
          </button>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--ink-muted)',
              letterSpacing: '0.1em',
            }}
          >
            CATALOG #{currentIndex + 1} OF {allArtworks.length}
          </span>
        </div>

        {/* Hero Artwork Viewport & Spine Canvas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: artwork.orientation === 'landscape' ? '1.45fr 1fr' : '1.1fr 1fr',
            gap: '4.5rem',
            alignItems: 'start',
            marginBottom: '6rem',
          }}
          className="project-hero-grid"
        >
          {/* Left Media Column */}
          <div
            style={{
              backgroundColor: '#EDE9E1',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-frame-resting)',
              border: '1px solid rgba(24, 23, 22, 0.08)',
            }}
          >
            {artwork.spineConfig ? (
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
            ) : (
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '8px solid #141414',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.22)',
                }}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            )}
          </div>

          {/* Right Curation & Technical Column */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              {artwork.category.toUpperCase()} • {artwork.year}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                color: 'var(--ink-primary)',
                marginBottom: '1.5rem',
              }}
            >
              {artwork.title}
            </h1>

            {/* Technical Specifications Matrix */}
            <div
              style={{
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                padding: '1.5rem 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                  MEDIUM
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {artwork.medium}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                  YEAR
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {artwork.year}
                </span>
              </div>
              {artwork.dimensions && (
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                    DIMENSIONS
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    {artwork.dimensions}
                  </span>
                </div>
              )}
              {artwork.spineConfig && (
                <div>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                    SPINE RIG HARNESS
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    {artwork.spineConfig.aimBoneName} (Cursor Tracked)
                  </span>
                </div>
              )}
            </div>

            {/* Curatorial Note */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.6rem',
                color: 'var(--ink-primary)',
              }}
            >
              Curatorial Analysis
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                lineHeight: 1.75,
                color: 'var(--ink-secondary)',
                marginBottom: '2rem',
              }}
            >
              {artwork.curatorNote || artwork.description}
            </p>

            {/* Palette Swatches */}
            {artwork.paletteHex && (
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '0.6rem',
                  }}
                >
                  GRAPHITE & VALUE TONAL PALETTE (CLICK TO COPY HEX)
                </span>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  {artwork.paletteHex.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => copyHex(hex)}
                      title={`Copy ${hex}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: hex,
                        border: '1px solid rgba(0,0,0,0.15)',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  ))}
                  {copiedHex && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--accent-ochre)',
                      }}
                    >
                      Copied {copiedHex}!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Process Breakdown Stages */}
        {artwork.processStages && artwork.processStages.length > 0 && (
          <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '4rem', marginBottom: '5rem' }}>
            <div className="editorial-header-row">
              <h2 className="editorial-header-title">
                <span className="num-index">02 /</span> PROCESS BREAKDOWN & MATERIAL STAGES
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
              }}
            >
              {artwork.processStages.map((stage, idx) => (
                <div
                  key={stage.title}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '2rem',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: 'var(--ink-muted)',
                        display: 'block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      STAGE {idx + 1}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--ink-primary)',
                        marginBottom: '0.8rem',
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.86rem',
                        lineHeight: 1.65,
                        color: 'var(--ink-secondary)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>

                  {stage.pencilGrades && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {stage.pencilGrades.map((grade) => (
                        <span
                          key={grade}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            backgroundColor: '#FFFFFF',
                            padding: '3px 8px',
                            border: '1px solid var(--border-light)',
                            borderRadius: '2px',
                          }}
                        >
                          {grade}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Artwork Footer Navigation */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <button
            onClick={() => onSelectArtwork(prevArtwork)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.3rem',
            }}
            onMouseEnter={() => setCursorContext('hover')}
            onMouseLeave={resetCursor}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
              ← PREVIOUS PIECE
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {prevArtwork.title}
            </span>
          </button>

          <button
            onClick={() => onSelectArtwork(nextArtwork)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.3rem',
            }}
            onMouseEnter={() => setCursorContext('hover')}
            onMouseLeave={resetCursor}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
              NEXT PIECE →
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
              {nextArtwork.title}
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .project-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

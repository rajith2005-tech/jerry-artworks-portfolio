import React from 'react';
import { ArtistProfile, Artwork, DisciplineArea, PageRoute } from '../types';
import { ArtFrame } from '../components/Gallery/ArtFrame';
import { SpineAnimation } from '../components/spine/SpineAnimation';
import { useCursor } from '../hooks/useCursorState';

interface HomePageProps {
  profile: ArtistProfile;
  artworks: Artwork[];
  disciplines: DisciplineArea[];
  onSelectArtwork: (artwork: Artwork) => void;
  onNavigate: (route: PageRoute) => void;
  onViewCaseStudy: (artwork: Artwork) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  profile,
  artworks,
  disciplines,
  onSelectArtwork,
  onNavigate,
  onViewCaseStudy,
}) => {
  const { setCursorContext, resetCursor } = useCursor();
  const featuredArtwork = artworks.find((a) => a.featured) || artworks[0];
  const galleryItems = artworks.slice(0, 5);

  return (
    <div className="anim-fade-in" style={{ paddingBottom: '6rem' }}>
      {/* =========================================================================
          HERO SECTION: Layered Editorial Choreography
          ========================================================================= */}
      <section
        id="home"
        style={{
          minHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: '6.5rem',
          paddingBottom: '4rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Layer 1: Handcrafted Signature Script Headline */}
          <div
            style={{
              marginBottom: '-3.8rem',
              position: 'relative',
              zIndex: 1,
              userSelect: 'none',
            }}
            className="hero-script-container"
          >
            <h1
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'var(--text-script-hero)',
                fontWeight: 400,
                color: 'var(--ink-primary)',
                letterSpacing: '0.04em',
                lineHeight: 0.88,
                fontStyle: 'italic',
                textShadow: '0 2px 25px rgba(0,0,0,0.05)',
              }}
            >
              {profile.pageName}
            </h1>
          </div>

          {/* Layer 2: Interactive Spine / Portrait Card intersecting headline */}
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              zIndex: 3,
              margin: '0 auto',
            }}
            onMouseEnter={() => setCursorContext('hover')}
            onMouseLeave={resetCursor}
          >
            <div
              style={{
                width: 'clamp(230px, 26vw, 320px)',
                height: 'clamp(280px, 31vw, 380px)',
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: 'var(--shadow-frame-hover)',
                border: '7px solid #FFFFFF',
                position: 'relative',
                transition: 'transform 0.4s var(--ease-editorial)',
                overflow: 'hidden',
              }}
              className="hero-portrait-card"
            >
              {featuredArtwork.spineConfig ? (
                <SpineAnimation
                  skeletonPath={featuredArtwork.spineConfig.skeletonPath}
                  atlasPath={featuredArtwork.spineConfig.atlasPath}
                  fallbackImageUrl={profile.heroPortraitUrl}
                  altText={`${profile.name} Artist Portrait & Spine Rig`}
                  defaultAnimation="idle"
                  aimBoneName="head_aim"
                  interactionMode="cursor"
                  aspectRatio="3/4"
                />
              ) : (
                <img
                  src={profile.heroPortraitUrl}
                  alt={profile.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
          </div>

          {/* Layer 3: Architectural Bold Discipline Headline */}
          <div
            style={{
              marginTop: '-3rem',
              position: 'relative',
              zIndex: 4,
              userSelect: 'none',
            }}
            className="hero-headline-container"
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 800,
                color: 'var(--ink-primary)',
                letterSpacing: '0.04em',
                lineHeight: 1.02,
                textTransform: 'uppercase',
              }}
            >
              {profile.title}
            </h2>
          </div>

          {/* Subtitle & Curatorial Statement */}
          <p
            style={{
              marginTop: '1.5rem',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--ink-secondary)',
              lineHeight: 1.7,
            }}
          >
            Tactile 2H–8B traditional graphite mastery meets kinetic digital concepts and Spine 2D mesh motion.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => onNavigate('works')}
              className="btn-editorial-primary"
              onMouseEnter={() => setCursorContext('hover')}
              onMouseLeave={resetCursor}
            >
              Explore Collection (5 Pieces) ↗
            </button>
            <button
              onClick={() => onNavigate('commissions')}
              className="btn-editorial-outline"
              onMouseEnter={() => setCursorContext('hover')}
              onMouseLeave={resetCursor}
            >
              Commission Matrix ↗
            </button>
          </div>
        </div>

        {/* Studio Stats Ticker */}
        <div
          style={{
            marginTop: '4.5rem',
            width: '100%',
            maxWidth: '1040px',
            marginInline: 'auto',
            padding: '1.5rem 2rem',
            borderTop: '1px solid var(--border-light)',
            borderBottom: '1px solid var(--border-light)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {profile.stats.map((s) => (
            <div key={s.label}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--ink-primary)',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SELECTED WORKS: Curated Asymmetric Exhibition Wall
          ========================================================================= */}
      <section id="work" style={{ padding: '6rem 0 4rem' }}>
        <div className="container">
          <div className="editorial-header-row">
            <h2 className="editorial-header-title">
              <span className="num-index">01 /</span> SELECTED WORK
            </h2>

            <button
              onClick={() => onNavigate('works')}
              className="editorial-link-btn"
              onMouseEnter={() => setCursorContext('hover')}
              onMouseLeave={resetCursor}
            >
              VIEW ALL EXHIBITION PIECES <span>↗</span>
            </button>
          </div>

          {/* Asymmetric Reference Wall Layout */}
          <div className="editorial-gallery-grid">
            {/* Left Big Lead Frame */}
            {galleryItems[0] && (
              <div className="gallery-col-large">
                <ArtFrame
                  artwork={galleryItems[0]}
                  onSelect={onSelectArtwork}
                  onViewDetail={onViewCaseStudy}
                  isLarge={true}
                />
              </div>
            )}

            {/* Right Stacked Multi-Frame Grid */}
            <div className="gallery-col-stacked">
              <div className="gallery-sub-row">
                {galleryItems[1] && (
                  <ArtFrame
                    artwork={galleryItems[1]}
                    onSelect={onSelectArtwork}
                    onViewDetail={onViewCaseStudy}
                  />
                )}
                {galleryItems[2] && (
                  <ArtFrame
                    artwork={galleryItems[2]}
                    onSelect={onSelectArtwork}
                    onViewDetail={onViewCaseStudy}
                  />
                )}
              </div>

              <div className="gallery-sub-row" style={{ marginTop: '2.5rem' }}>
                {galleryItems[3] && (
                  <ArtFrame
                    artwork={galleryItems[3]}
                    onSelect={onSelectArtwork}
                    onViewDetail={onViewCaseStudy}
                  />
                )}
                {galleryItems[4] && (
                  <ArtFrame
                    artwork={galleryItems[4]}
                    onSelect={onSelectArtwork}
                    onViewDetail={onViewCaseStudy}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .editorial-gallery-grid {
            display: grid;
            grid-template-columns: 1.05fr 1.35fr;
            gap: 3.5rem;
            align-items: start;
          }
          .gallery-sub-row {
            display: grid;
            grid-template-columns: 1fr 1.25fr;
            gap: 2.2rem;
            align-items: start;
          }
          @media (max-width: 1024px) {
            .editorial-gallery-grid {
              grid-template-columns: 1fr;
              gap: 2.5rem;
            }
          }
          @media (max-width: 768px) {
            .gallery-sub-row {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            .hero-script-container { margin-bottom: -1.6rem !important; }
            .hero-headline-container { margin-top: -1.4rem !important; }
          }
        `}</style>
      </section>

      {/* =========================================================================
          STUDIO STATEMENT & DISCIPLINES PREVIEW
          ========================================================================= */}
      <section id="about" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="editorial-header-row">
            <h2 className="editorial-header-title">
              <span className="num-index">02 /</span> ARTISTIC PHILOSOPHY
            </h2>

            <button
              onClick={() => onNavigate('about')}
              className="editorial-link-btn"
            >
              ABOUT STUDIO <span>↗</span>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.5fr',
              gap: '4.5rem',
              alignItems: 'start',
            }}
            className="home-about-grid"
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: 'var(--ink-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Balancing the raw tactile tooth of 300gsm paper with virtual skeletal motion.
              </h3>
              <p
                style={{
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.8,
                }}
              >
                {profile.studioPhilosophy}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: 'var(--ink-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                {profile.bioParagraph1}
              </p>

              {/* Disciplines Table */}
              <div style={{ marginTop: '2.5rem' }}>
                {disciplines.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '1.1rem 0',
                      borderBottom: '1px solid var(--border-light)',
                      gap: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--ink-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.dateOrLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .home-about-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

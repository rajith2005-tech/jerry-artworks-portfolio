import React from 'react';
import { ArtistProfile, DisciplineArea, PageRoute } from '../types';
import { useCursor } from '../hooks/useCursorState';

interface AboutPageProps {
  profile: ArtistProfile;
  disciplines: DisciplineArea[];
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ profile, disciplines, onNavigate }) => {
  const { setCursorContext, resetCursor } = useCursor();

  const studioTools = [
    {
      category: 'TRADITIONAL GRAPHITE',
      items: [
        'Faber-Castell 9000 & Staedtler Mars Lumograph (2H to 8B)',
        'Woodless Solid Graphite Burnishers (6B & 8B)',
        'Strathmore 400 Series 300gsm Heavyweight Bristol (Smooth & Vellum)',
        'Tombow Mono Zero Precision Eraser & Kneaded Putty',
      ],
    },
    {
      category: 'DIGITAL & MOTION ENGINES',
      items: [
        'Esoteric Software Spine 2D (WebGL & Pixi Runtime Pipeline)',
        'Clip Studio Paint EX & Adobe Photoshop (Custom Value Brushes)',
        'Wacom Intuos Pro Large & XP-Pen Artist Display',
        'GLSL Shaders & 60 FPS WebGL Canvas Viewport',
      ],
    },
  ];

  return (
    <div className="anim-fade-in" style={{ paddingTop: '8rem', paddingBottom: '7rem' }}>
      <div className="container">
        {/* Editorial Page Header */}
        <div style={{ marginBottom: '4rem' }}>
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
            BIOGRAPHY & STUDIO PHILOSOPHY
          </span>

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
            ABOUT RAJITH
          </h1>
        </div>

        {/* Narrative & Studio Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.4fr',
            gap: '5rem',
            alignItems: 'start',
            marginBottom: '6rem',
          }}
          className="about-narrative-grid"
        >
          {/* Left Column: Framed Portrait */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.5rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-frame-resting)',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '7px solid #141414',
                }}
              >
                <img
                  src={profile.heroPortraitUrl}
                  alt={profile.name}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  {profile.name} (JERRY ARTWORKS)
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--ink-muted)',
                  }}
                >
                  GRAPHITE & DIGITAL ARTIST • ERODE, TAMIL NADU
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--ink-primary)',
                lineHeight: 1.3,
                marginBottom: '1.5rem',
              }}
            >
              Fusing traditional graphite sensitivity with modern digital imagination.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                lineHeight: 1.8,
                color: 'var(--ink-primary)',
                marginBottom: '1.5rem',
              }}
            >
              {profile.bioParagraph1}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                lineHeight: 1.8,
                color: 'var(--ink-secondary)',
                marginBottom: '2rem',
              }}
            >
              {profile.bioParagraph2}
            </p>

            <div
              style={{
                backgroundColor: '#F3EFE8',
                padding: '2rem',
                borderLeft: '4px solid var(--ink-primary)',
                marginBottom: '2.5rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.6rem',
                }}
              >
                TACTILE PHILOSOPHY
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                {profile.studioPhilosophy}
              </p>
            </div>

            <button
              onClick={() => onNavigate('commissions')}
              className="btn-editorial-primary"
              onMouseEnter={() => setCursorContext('hover')}
              onMouseLeave={resetCursor}
            >
              Commission a Masterpiece ↗
            </button>
          </div>
        </div>

        {/* Disciplines & Accolades Matrix */}
        <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '5rem', marginBottom: '6rem' }}>
          <div className="editorial-header-row">
            <h2 className="editorial-header-title">
              <span className="num-index">01 /</span> DISCIPLINES & ACCOLADES
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {disciplines.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 2fr 1fr',
                  gap: '2rem',
                  alignItems: 'baseline',
                  padding: '1.6rem 0',
                  borderBottom: '1px solid var(--border-light)',
                }}
                className="discipline-row"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-primary)',
                  }}
                >
                  {item.title}
                </span>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                  {item.description}
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--ink-muted)',
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.dateOrLevel}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Materials & Tools */}
        <section style={{ borderTop: '1px solid var(--border-light)', paddingTop: '5rem' }}>
          <div className="editorial-header-row">
            <h2 className="editorial-header-title">
              <span className="num-index">02 /</span> STUDIO MATERIALS & ENGINE ARSENAL
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {studioTools.map((tool) => (
              <div
                key={tool.category}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '2.5rem',
                  border: '1px solid var(--border-light)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                  }}
                >
                  {tool.category}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {tool.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        color: 'var(--ink-secondary)',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.6rem',
                      }}
                    >
                      <span style={{ color: 'var(--accent-ochre)', fontWeight: 'bold' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-narrative-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .discipline-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .discipline-row span:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};

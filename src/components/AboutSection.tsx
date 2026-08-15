import React, { useState } from 'react';
import { ArtistProfile, DisciplineArea } from '../types';

interface AboutSectionProps {
  profile: ArtistProfile;
  disciplines: DisciplineArea[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, disciplines }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" style={{ padding: '6rem 0 6rem', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <h2 className="section-title">ABOUT ME & DISCIPLINES</h2>
          <button
            onClick={() => setExpanded(!expanded)}
            className="section-action-link"
          >
            {expanded ? 'SHOW LESS' : 'READ MORE'} <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* Content Layout matching Reference */}
        <div className="about-grid-layout">
          {/* Left Column: Short Statement */}
          <div className="about-left-col">
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 700,
                lineHeight: 1.25,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Fusing traditional graphite sensitivity with modern digital imagination.
            </h3>
            <p
              style={{
                marginTop: '1.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              Every stroke in graphite captures raw human expression, while digital palettes open up boundless conceptual realms.
            </p>
          </div>

          {/* Right Column: Bio Paragraphs + Disciplines List */}
          <div className="about-right-col">
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.96rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem',
              }}
            >
              {profile.bioParagraph1}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.96rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
              }}
            >
              {profile.bioParagraph2}
            </p>

            {expanded && (
              <div
                style={{
                  backgroundColor: '#F3EFE8',
                  padding: '1.75rem',
                  borderRadius: '2px',
                  marginBottom: '3rem',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Artistic Philosophy & Workflow
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                  My creative process begins in tactile sketchbooks using graphite grades from 2H (structure) to 8B (deep atmospheric occlusion). For digital pieces, these foundations are digitized and sculpted with tailored brush engines to maintain organic texture and dynamic kinetic flow.
                </p>
              </div>
            )}

            {/* Disciplines / Accolades Table matching Reference underline layout */}
            <div className="disciplines-table">
              {disciplines.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '1.15rem 0',
                    borderBottom: '1px solid var(--border-light)',
                    gap: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
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
        .about-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import { contactData } from '../../data/portfolioData';
import { PageRoute } from '../../types';

interface FooterProps {
  onRouteChange?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        padding: '4rem 0 3rem',
        backgroundColor: '#EDE9E1',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(24, 23, 22, 0.08)',
          }}
        >
          {/* Col 1: Studio Identity */}
          <div style={{ maxWidth: '340px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              JERRY ARTWORKS
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--ink-secondary)',
                lineHeight: 1.6,
              }}
            >
              Archival graphite master studies and Spine-powered interactive illustrations by Rajith. Crafted in Erode, Tamil Nadu, India.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          {onRouteChange && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '0.2rem',
                }}
              >
                NAVIGATION
              </span>
              {(['home', 'works', 'about', 'commissions', 'contact'] as PageRoute[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRouteChange(r);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    color: 'var(--ink-primary)',
                    opacity: 0.85,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Col 3: Socials & Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                marginBottom: '0.2rem',
              }}
            >
              CHANNELS
            </span>
            {contactData.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--ink-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                {s.name} <span style={{ fontSize: '0.75rem' }}>↗</span>
              </a>
            ))}

            <button
              onClick={scrollToTop}
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              ↑ BACK TO TOP
            </button>
          </div>
        </div>

        {/* Colophon Bar */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-secondary)',
            }}
          >
            © {new Date().getFullYear()} JERRY ARTWORKS — RAJITH • ALL RIGHTS RESERVED
          </p>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--ink-muted)',
              letterSpacing: '0.04em',
            }}
          >
            FINE GRAPHITE & DIGITAL ART • SPINE 2D WEBGL HARNESS
          </p>
        </div>
      </div>
    </footer>
  );
};

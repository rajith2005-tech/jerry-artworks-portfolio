import React from 'react';

interface HeroProps {
  pageName?: string;
  artistName?: string;
  title?: string;
  portraitUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  pageName = "Jerry Artworks",
  title = "GRAPHITE & DIGITAL ARTIST",
  portraitUrl = "/images/portrait.svg",
}) => {
  return (
    <section
      id="home"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '6rem',
        paddingBottom: '3.5rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Layer 1: Signature Script Name (Italianno / Cormorant Garamond Script) */}
        <div
          style={{
            marginBottom: '-3.5rem',
            position: 'relative',
            zIndex: 1,
            userSelect: 'none',
          }}
          className="hero-script-container"
        >
          <h1
            style={{
              fontFamily: "'Italianno', 'Playfair Display', cursive, serif",
              fontSize: 'clamp(5rem, 14vw, 10.5rem)',
              fontWeight: 400,
              color: '#1C1B1A',
              letterSpacing: '0.04em',
              lineHeight: 0.9,
              fontStyle: 'italic',
              textShadow: '0 2px 20px rgba(0,0,0,0.04)',
            }}
          >
            {pageName}
          </h1>
        </div>

        {/* Layer 2: Artist Portrait Frame (Intersects Script and Bold Title) */}
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            zIndex: 3,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: 'clamp(210px, 24vw, 290px)',
              height: 'clamp(240px, 28vw, 340px)',
              backgroundColor: '#EDE9E2',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.28), 0 8px 18px -4px rgba(0, 0, 0, 0.12)',
              border: '6px solid #FFFFFF',
              position: 'relative',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              overflow: 'hidden',
            }}
            className="hero-portrait-card"
          >
            <img
              src={portraitUrl}
              alt="Artist Portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        {/* Layer 3: Bold Uppercase Discipline Headline */}
        <div
          style={{
            marginTop: '-2.8rem',
            position: 'relative',
            zIndex: 4,
            userSelect: 'none',
          }}
          className="hero-headline-container"
        >
          <h2
            style={{
              fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.4rem, 8.5vw, 6.2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#work"
        style={{
          marginTop: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'transform 0.25s ease, opacity 0.25s ease',
          opacity: 0.75,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.75';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: 'bounceDown 2s infinite' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

      <style>{`
        .hero-portrait-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 28px 55px -12px rgba(0, 0, 0, 0.35), 0 12px 24px -6px rgba(0, 0, 0, 0.15) !important;
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(5px); }
          60% { transform: translateY(2px); }
        }
        @media (max-width: 768px) {
          .hero-script-container { margin-bottom: -1.5rem !important; }
          .hero-headline-container { margin-top: -1.2rem !important; }
        }
      `}</style>
    </section>
  );
};

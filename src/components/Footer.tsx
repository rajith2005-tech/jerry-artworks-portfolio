import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: '2.5rem 0',
        backgroundColor: '#EDE9E1',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          © {new Date().getFullYear()} JERRY ARTWORKS — RAJITH
        </p>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          GRAPHITE & DIGITAL ARTIST • REACT + TYPESCRIPT
        </p>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { useCursor } from '../../hooks/useCursorState';

interface NavbarProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
  initials?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRouteChange,
  initials = 'JA',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorContext, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: PageRoute; anchor?: string }[] = [
    { label: 'HOME', route: 'home', anchor: '#home' },
    { label: 'WORKS', route: 'works', anchor: '#work' },
    { label: 'ABOUT', route: 'about', anchor: '#about' },
    { label: 'COMMISSIONS', route: 'commissions' },
    { label: 'CONTACT', route: 'contact', anchor: '#contact' },
  ];

  const handleNavClick = (route: PageRoute, anchor?: string) => {
    setMobileMenuOpen(false);
    onRouteChange(route);
    if (anchor && route === 'home') {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)' as unknown as number,
        transition: 'all 0.3s var(--ease-editorial)',
        backgroundColor: scrolled ? 'rgba(250, 248, 245, 0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(24, 23, 22, 0.08)' : 'none',
        padding: scrolled ? '0.9rem 0' : '1.8rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Monogram Brand Mark */}
        <button
          onClick={() => handleNavClick('home')}
          aria-label="Jerry Artworks Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setCursorContext('hover')}
          onMouseLeave={resetCursor}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--ink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--ink-primary)',
              }}
            >
              {initials}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-primary)',
            }}
          >
            JERRY ARTWORKS
          </span>
        </button>

        {/* Desktop Navigation Menu */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.2rem',
          }}
          className="desktop-nav"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route, item.anchor)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                  position: 'relative',
                  padding: '4px 0',
                  opacity: isActive ? 1 : 0.8,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={() => setCursorContext('hover')}
                onMouseLeave={resetCursor}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--ink-primary)',
                    }}
                  />
                )}
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('commissions')}
            className="btn-editorial-primary"
            style={{
              padding: '0.45rem 1.1rem',
              fontSize: '0.68rem',
              borderRadius: '999px',
            }}
            onMouseEnter={() => setCursorContext('hover')}
            onMouseLeave={resetCursor}
          >
            Book Commission ↗
          </button>
        </nav>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            padding: '0.5rem',
            color: 'var(--ink-primary)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-light)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNavClick(item.route, item.anchor)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textAlign: 'left',
                color: currentRoute === item.route ? 'var(--ink-primary)' : 'var(--ink-secondary)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

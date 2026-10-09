import React, { useState, useEffect, useCallback } from 'react';
import { PageRoute, Artwork } from './types';
import { artistProfile, initialArtworks, disciplineMilestones } from './data/portfolioData';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { CommissionsPage } from './pages/CommissionsPage';
import { ContactPage } from './pages/ContactPage';
import { LightboxModal } from './components/Gallery/LightboxModal';
import { CustomCursor } from './components/common/CustomCursor';
import { NoiseOverlay } from './components/common/NoiseOverlay';
import { PageTransition } from './components/common/PageTransition';
import { SeoMeta } from './components/common/SeoMeta';
import { CursorProvider } from './hooks/useCursorState';
import { useLenis } from './hooks/useLenis';

const PortfolioAppContent: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [lightboxArtwork, setLightboxArtwork] = useState<Artwork | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parse initial URL path or hash
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#work' || hash === '#works') {
        setCurrentRoute('works');
      } else if (hash === '#about') {
        setCurrentRoute('about');
      } else if (hash === '#contact') {
        setCurrentRoute('contact');
      } else if (hash === '#commissions') {
        setCurrentRoute('commissions');
      } else if (path.includes('/works/') || hash.startsWith('#work/')) {
        const slug = path.split('/works/')[1] || hash.replace('#work/', '');
        const match = initialArtworks.find((a) => a.slug === slug || a.id === slug);
        if (match) {
          setSelectedArtwork(match);
          setCurrentRoute('work-detail');
        }
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);

    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  const navigateTo = useCallback((route: PageRoute, targetArtwork?: Artwork) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (targetArtwork) setSelectedArtwork(targetArtwork);
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

      // Update URL without breaking anchor links
      if (route === 'work-detail' && targetArtwork) {
        window.history.pushState({}, '', `#work/${targetArtwork.slug}`);
      } else if (route === 'home') {
        window.history.pushState({}, '', '#home');
      } else {
        window.history.pushState({}, '', `#${route}`);
      }
    }, 280);
  }, []);

  const handleCaseStudy = (artwork: Artwork) => {
    navigateTo('work-detail', artwork);
  };

  return (
    <div className="portfolio-app-root">
      {/* Dynamic SEO Meta & Schema.org Generator */}
      <SeoMeta
        currentRoute={currentRoute}
        artist={artistProfile}
        currentArtwork={selectedArtwork}
      />

      {/* Procedural Archival Noise Overlay */}
      <NoiseOverlay />

      {/* Fluid Multi-State Custom Cursor */}
      <CustomCursor />

      {/* Choreographed Page Transition Curtain */}
      <PageTransition
        isTransitioning={isTransitioning}
        onTransitionComplete={() => setIsTransitioning(false)}
      />

      {/* Sticky Editorial Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onRouteChange={(route) => navigateTo(route)}
        initials={artistProfile.initials}
      />

      {/* Page Routing Switcher */}
      <main id="main-content">
        {currentRoute === 'home' && (
          <HomePage
            profile={artistProfile}
            artworks={initialArtworks}
            disciplines={disciplineMilestones}
            onSelectArtwork={(art) => setLightboxArtwork(art)}
            onNavigate={(r) => navigateTo(r)}
            onViewCaseStudy={handleCaseStudy}
          />
        )}

        {currentRoute === 'works' && (
          <WorksPage
            artworks={initialArtworks}
            onSelectArtwork={(art) => setLightboxArtwork(art)}
            onViewCaseStudy={handleCaseStudy}
          />
        )}

        {currentRoute === 'work-detail' && selectedArtwork && (
          <ProjectDetailPage
            artwork={selectedArtwork}
            allArtworks={initialArtworks}
            onNavigate={(r) => navigateTo(r)}
            onSelectArtwork={(art) => {
              setSelectedArtwork(art);
              window.history.pushState({}, '', `#work/${art.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            profile={artistProfile}
            disciplines={disciplineMilestones}
            onNavigate={(r) => navigateTo(r)}
          />
        )}

        {currentRoute === 'commissions' && <CommissionsPage />}

        {currentRoute === 'contact' && <ContactPage />}
      </main>

      {/* Editorial Museum Footer */}
      <Footer onRouteChange={(r) => navigateTo(r)} />

      {/* Full Resolution Inspection Lightbox */}
      <LightboxModal
        artwork={lightboxArtwork}
        allArtworks={initialArtworks}
        onClose={() => setLightboxArtwork(null)}
        onSelect={(art) => setLightboxArtwork(art)}
        onViewCaseStudy={handleCaseStudy}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CursorProvider>
      <PortfolioAppContent />
    </CursorProvider>
  );
};

export default App;

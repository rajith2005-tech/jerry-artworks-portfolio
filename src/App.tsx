import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/Gallery/GallerySection';
import { LightboxModal } from './components/Gallery/LightboxModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  artistProfile,
  initialArtworks,
  disciplineMilestones,
  contactData,
} from './data/portfolioData';
import { Artwork } from './types';

export const App: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <div className="portfolio-app-root">
      {/* Top Navigation */}
      <Navbar initials={artistProfile.initials} />

      {/* Hero Section */}
      <Hero
        pageName={artistProfile.pageName}
        artistName={artistProfile.name}
        title={artistProfile.title}
        portraitUrl={artistProfile.heroPortraitUrl}
      />

      {/* Selected Work (5-frame asymmetric gallery layout) */}
      <GallerySection
        artworks={initialArtworks}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
      />

      {/* About & Disciplines Section */}
      <AboutSection
        profile={artistProfile}
        disciplines={disciplineMilestones}
      />

      {/* Contact Section */}
      <ContactSection contact={contactData} />

      {/* Footer */}
      <Footer />

      {/* Full Resolution Interactive Lightbox Modal */}
      <LightboxModal
        artwork={selectedArtwork}
        allArtworks={initialArtworks}
        onClose={() => setSelectedArtwork(null)}
        onSelect={(art) => setSelectedArtwork(art)}
      />
    </div>
  );
};

export default App;

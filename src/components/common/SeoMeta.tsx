import React, { useEffect } from 'react';
import { Artwork, ArtistProfile, PageRoute } from '../../types';
import { generateVisualArtworkSchema, generatePersonSchema } from '../../utils/seo';

interface SeoMetaProps {
  currentRoute: PageRoute;
  artist: ArtistProfile;
  currentArtwork?: Artwork | null;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({ currentRoute, artist, currentArtwork }) => {
  useEffect(() => {
    // Dynamic page title update based on route
    const baseTitle = `${artist.pageName} (${artist.name}) — ${artist.title}`;
    switch (currentRoute) {
      case 'home':
        document.title = baseTitle;
        break;
      case 'works':
        document.title = `Works & Spine 2D Rigs | ${artist.pageName}`;
        break;
      case 'work-detail':
        document.title = currentArtwork ? `${currentArtwork.title} | ${artist.pageName}` : baseTitle;
        break;
      case 'about':
        document.title = `About Rajith & Studio Philosophy | ${artist.pageName}`;
        break;
      case 'commissions':
        document.title = `Commissions & Project Pricing | ${artist.pageName}`;
        break;
      case 'contact':
        document.title = `Contact Studio | ${artist.pageName}`;
        break;
      default:
        document.title = baseTitle;
    }

    // Inject Schema.org JSON-LD
    const scriptId = 'json-ld-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (currentRoute === 'work-detail' && currentArtwork) {
      scriptEl.textContent = JSON.stringify(generateVisualArtworkSchema(currentArtwork, artist));
    } else {
      scriptEl.textContent = JSON.stringify(generatePersonSchema(artist));
    }
  }, [currentRoute, artist, currentArtwork]);

  return null;
};

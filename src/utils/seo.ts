import { Artwork, ArtistProfile } from '../types';

/**
 * Generates Schema.org VisualArtwork structured data
 */
export function generateVisualArtworkSchema(artwork: Artwork, artist: ArtistProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    artMedium: artwork.medium,
    artform: artwork.category === 'anime' ? 'Fine Art Illustration / Manga' : 'Digital / Traditional Painting',
    dateCreated: artwork.year,
    creator: {
      '@type': 'Person',
      name: artist.name,
      alternateName: artist.pageName,
      jobTitle: artist.title,
    },
    image: `https://jerryartworks.com${artwork.imageUrl}`,
    description: artwork.description,
    width: artwork.dimensions ? artwork.dimensions.split('x')[0]?.trim() : undefined,
    height: artwork.dimensions ? artwork.dimensions.split('x')[1]?.trim() : undefined,
  };
}

/**
 * Generates Schema.org Person structured data
 */
export function generatePersonSchema(artist: ArtistProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    alternateName: artist.pageName,
    jobTitle: artist.title,
    url: 'https://jerryartworks.com',
    description: artist.bioParagraph1,
    image: `https://jerryartworks.com${artist.heroPortraitUrl}`,
  };
}

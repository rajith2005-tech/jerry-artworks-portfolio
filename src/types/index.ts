export interface Artwork {
  id: string;
  title: string;
  medium: string; // e.g. "Graphite on 300gsm Bristol", "Digital Paint / Photoshop", "Charcoal & Graphite"
  year: string;
  category: 'anime' | 'portrait' | 'concept' | 'study';
  orientation: 'portrait' | 'landscape';
  imageUrl: string;
  aspectRatio: string;
  description: string;
  dimensions?: string;
  featured?: boolean;
}

export interface DisciplineArea {
  id: string;
  title: string;
  dateOrLevel: string; // e.g. "Primary Discipline", "2023 - Present", etc.
  description?: string;
}

export interface ContactInfo {
  location: string;
  locationDetails: string;
  email: string;
  phone: string;
  socials: {
    name: string;
    handle: string;
    url: string;
  }[];
}

export interface ArtistProfile {
  name: string;
  pageName: string;
  initials: string;
  title: string;
  bioParagraph1: string;
  bioParagraph2: string;
  heroPortraitUrl: string;
}

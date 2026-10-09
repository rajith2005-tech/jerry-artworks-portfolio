export type PageRoute = 'home' | 'works' | 'work-detail' | 'about' | 'commissions' | 'contact';

export interface SpineAnimationConfig {
  skeletonPath: string; // e.g. "/spine/giyu/giyu.skel" or .json
  atlasPath: string;    // e.g. "/spine/giyu/giyu.atlas"
  texturePath?: string; // e.g. "/spine/giyu/giyu.png"
  defaultAnimation: string; // e.g. "idle" or "breathing"
  aimBoneName?: string; // e.g. "head_aim" or "eye_aim" for cursor tracking
  interactionMode?: 'cursor' | 'scroll' | 'hover' | 'static';
  mixTracks?: {
    trackIndex: number;
    animationName: string;
    loop: boolean;
  }[];
}

export interface ProcessStage {
  title: string;
  stage: 'rough-graphite' | 'refined-pencil' | 'digital-sculpt' | 'final-grade';
  description: string;
  imageUrl?: string;
  pencilGrades?: string[]; // e.g. ["2H", "4B", "8B woodless"]
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  medium: string;
  year: string;
  category: 'anime' | 'portrait' | 'concept' | 'study';
  orientation: 'portrait' | 'landscape';
  aspectRatio: string;
  imageUrl: string;
  thumbnailUrl?: string;
  dimensions?: string;
  featured?: boolean;
  description: string;
  curatorNote?: string;
  paletteHex?: string[];
  processStages?: ProcessStage[];
  spineConfig?: SpineAnimationConfig;
}

export interface DisciplineArea {
  id: string;
  title: string;
  dateOrLevel: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

export interface ContactInfo {
  location: string;
  locationDetails: string;
  email: string;
  phone: string;
  socials: SocialLink[];
}

export interface ArtistProfile {
  name: string;
  pageName: string;
  initials: string;
  title: string;
  bioParagraph1: string;
  bioParagraph2: string;
  heroPortraitUrl: string;
  studioPhilosophy: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface CommissionTier {
  id: string;
  name: string;
  idealFor: string;
  startingPrice: string;
  turnaroundTime: string;
  deliverables: string[];
  mediums: string[];
}

export interface CommissionInquiry {
  clientName: string;
  email: string;
  projectType: 'traditional-graphite' | 'digital-portrait' | 'concept-illustration' | 'commercial-spine';
  budgetTier: string;
  description: string;
  deadline?: string;
  csrfToken?: string;
}

export type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'play' | 'text';

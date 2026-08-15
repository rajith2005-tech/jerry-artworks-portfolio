import { ArtistProfile, Artwork, DisciplineArea, ContactInfo } from '../types';

export const artistProfile: ArtistProfile = {
  name: "Rajith",
  pageName: "Jerry Artworks",
  initials: "JA",
  title: "GRAPHITE & DIGITAL ARTIST",
  bioParagraph1:
    "Hey there! I'm Rajith, the creative mind behind Jerry Artworks. I specialize in the delicate balance of traditional graphite precision and vivid digital illustration. My work explores iconic anime characters, detailed anatomical portraiture, and imaginative concept worlds.",
  bioParagraph2:
    "Art has been my personal pursuit for over a decade. Whether building rich texture through 4B–8B graphite pencils or sculpting digital light and silhouettes in digital painting software, I strive to create characters that convey raw emotion, movement, and narrative depth.",
  // Directly points to your image file in public/images/
  // To change your photo, simply place your photo as public/images/portrait.jpg (or .png/.svg)
  heroPortraitUrl: "/images/portrait.svg"
};

export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    title: "GUARDIAN SPIRIT",
    medium: "Graphite & Digital Colors",
    year: "2024",
    category: "concept",
    orientation: "portrait",
    aspectRatio: "3/4",
    // File location: public/images/art-1.svg (or replace with art-1.jpg / art-1.png)
    imageUrl: "/images/art-1.svg",
    dimensions: "18 x 24 in",
    description:
      "A dual-medium study exploring human connection and spirit folklore. Layered with soft graphite hatching, blended gradients, and luminous digital highlights.",
    featured: true
  },
  {
    id: "art-2",
    title: "BLADE OF THE DRIFTER",
    medium: "Traditional Graphite on Bristol",
    year: "2024",
    category: "anime",
    orientation: "portrait",
    aspectRatio: "3/4",
    // File location: public/images/art-2.svg (or replace with art-2.jpg / art-2.png)
    imageUrl: "/images/art-2.svg",
    dimensions: "11 x 14 in",
    description:
      "High-contrast anime character study featuring sharp line weights, dynamic flowing fabric, and dramatic rim lighting rendered entirely with mechanical and woodless graphite.",
    featured: false
  },
  {
    id: "art-3",
    title: "VALLEY OF REPOSE",
    medium: "Digital Environment & Concept",
    year: "2023",
    category: "concept",
    orientation: "landscape",
    aspectRatio: "4/3",
    // File location: public/images/art-3.svg (or replace with art-3.jpg / art-3.png)
    imageUrl: "/images/art-3.svg",
    dimensions: "3840 x 2160 px",
    description:
      "Panoramic atmospheric landscape capturing twilight tones, architectural silhouettes, and soft cinematic atmospheric haze.",
    featured: false
  },
  {
    id: "art-4",
    title: "STUDY IN MONOCHROME",
    medium: "Graphite Pencil & Charcoal",
    year: "2023",
    category: "portrait",
    orientation: "portrait",
    aspectRatio: "3/4",
    // File location: public/images/art-4.svg (or replace with art-4.jpg / art-4.png)
    imageUrl: "/images/art-4.svg",
    dimensions: "12 x 16 in",
    description:
      "A deep dive into facial planes, expressive micro-shadows, and organic hair flow. Emphasizing subtle tone transitions without over-smudging.",
    featured: false
  },
  {
    id: "art-5",
    title: "CELESTIAL VOID RUNNER",
    medium: "Digital Painting / Concept Art",
    year: "2024",
    category: "concept",
    orientation: "landscape",
    aspectRatio: "16/10",
    // File location: public/images/art-5.svg (or replace with art-5.jpg / art-5.png)
    imageUrl: "/images/art-5.svg",
    dimensions: "4000 x 2500 px",
    description:
      "Futuristic concept character and creature composition floating through deep space nebulae with intense cyan and amber volumetric light.",
    featured: false
  }
];

export const disciplineMilestones: DisciplineArea[] = [
  {
    id: "disc-1",
    title: "GRAPHITE & CHARCOAL FIGURATIVE MASTERY",
    dateOrLevel: "Traditional • Core Focus",
    description: "Deep pencil gradient scales, hair rendering, anatomical lighting, and archival paper handling."
  },
  {
    id: "disc-2",
    title: "ANIME & MANGA CHARACTER CONCEPTING",
    dateOrLevel: "Concept Art • Ongoing",
    description: "Original hero design, dynamic poses, expressive facial silhouettes, and thematic costumes."
  },
  {
    id: "disc-3",
    title: "DIGITAL MATTE PAINTING & LIGHTING",
    dateOrLevel: "Digital • Photoshop / Clip Studio",
    description: "Atmospheric depth, value keys, custom brush texture sculpting, and chromatic balance."
  },
  {
    id: "disc-4",
    title: "COMMISSION WORK & ART DIRECTION",
    dateOrLevel: "Selected Projects • 2022 - Present",
    description: "Private collectors, indie animation concept boards, and stylized portrait commissions."
  }
];

export const contactData: ContactInfo = {
  location: "STUDIO LOCATION",
  locationDetails: "Your City, State / Country • Available Worldwide for Commissions",
  email: "contact@jerryartworks.com",
  phone: "+1 (555) 019-2834",
  socials: [
    {
      name: "Instagram",
      handle: "@jerryartworks",
      url: "https://instagram.com"
    },
    {
      name: "ArtStation",
      handle: "jerryartworks",
      url: "https://artstation.com"
    },
    {
      name: "LinkedIn",
      handle: "Rajith (Jerry Artworks)",
      url: "https://linkedin.com"
    },
    {
      name: "GitHub",
      handle: "rajith-art",
      url: "https://github.com"
    }
  ]
};

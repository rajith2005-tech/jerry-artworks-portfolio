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
  heroPortraitUrl: "/images/portrait.png"
};

export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    title: "GIYU TOMIYOKA",
    medium: "Graphite pencil",
    year: "2025",
    category: "anime",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art1.jpeg",
    dimensions: "18 x 24 in",
    description:
      "High-contrast anime character study featuring sharp line weights, dynamic flowing fabric, and dramatic rim lighting rendered entirely with mechanical and woodless graphite.",
    featured: true
  },
  {
    id: "art-2",
    title: "DOUMA",
    medium: "Traditional Graphite on Bristol",
    year: "2025",
    category: "anime",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art2.jpeg",
    dimensions: "11 x 14 in",
    description:
      "Anime character study featuring detailed anatomical portraiture, expressive facial silhouettes, and dynamic poses rendered entirely with mechanical graphite pencils.",
    featured: false
  },
  {
    id: "art-3",
    title: "LUFFY GEAR 5",
    medium: "GRAPHITE AND CHARCOAL",
    year: "2023",
    category: "anime",
    orientation: "landscape",
    aspectRatio: "4/3",
    imageUrl: "/images/art3.jpeg",
    dimensions: "3840 x 2160 px",
    description:
      "anime character art with custom poses, expressive facial silhouettes, and dynamic poses rendered entirely with mechanical graphite pencils.",
    featured: false
  },
  {
    id: "art-4",
    title: "WEDNESDAY ADAMS",
    medium: "Digital Painting",
    year: "2026",
    category: "portrait",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art4.png",
    dimensions: "12 x 16 in",
    description:
      "Character study with realistic facial features, expressive facial silhouettes, and dynamic poses rendered entirely with digital painting software.",
    featured: false
  },
  {
    id: "art-5",
    title: "JINX",
    medium: "Digital Painting / Concept Art",
    year: "2026",
    category: "concept",
    orientation: "landscape",
    aspectRatio: "4/3",
    imageUrl: "/images/art5.jpeg",
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
  locationDetails: " Erode, Tamil Nadu / India • Available Worldwide for Commissions",
  email: "rajitr2005@gmail.com",
  phone: "+91 8807870452",
  socials: [
    {
      name: "Instagram",
      handle: "@jerry_artworks",
      url: "https://www.instagram.com/_jerry__artworks?igsh=cXowYWYyZHZ0dm5l"
    },
   
    {
      name: "LinkedIn",
      handle: "Rajith T R",
      url: "https://www.linkedin.com/in/rajith-t-r-12899b290?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    {
      name: "GitHub",
      handle: "rajith2005-tech",
      url: "https://github.com/rajith2005-tech"
    }
  ]
};

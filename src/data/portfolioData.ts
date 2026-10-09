import { ArtistProfile, Artwork, DisciplineArea, ContactInfo, CommissionTier } from '../types';

export const artistProfile: ArtistProfile = {
  name: "Rajith",
  pageName: "Jerry Artworks",
  initials: "JA",
  title: "GRAPHITE & DIGITAL ARTIST",
  bioParagraph1:
    "Hey there! I'm Rajith, the creative mind behind Jerry Artworks. I specialize in the delicate balance of traditional graphite precision and vivid digital illustration. My work explores iconic anime characters, detailed anatomical portraiture, and imaginative concept worlds.",
  bioParagraph2:
    "Art has been my personal pursuit for over a decade. Whether building rich texture through 4B–8B graphite pencils or sculpting digital light and silhouettes in digital painting software, I strive to create characters that convey raw emotion, movement, and narrative depth.",
  studioPhilosophy:
    "Every stroke in graphite captures raw human expression, while digital palettes open up boundless conceptual realms. We craft tactile, archival art that breathes with cinematic weight.",
  heroPortraitUrl: "/images/portrait.png",
  stats: [
    { label: "YEARS OF DISCIPLINE", value: "10+" },
    { label: "TRADITIONAL MEDIUMS", value: "2H–8B / Bristol" },
    { label: "COMMISSION DELIVERY", value: "Worldwide" },
    { label: "RIGGED SPARK ART", value: "Spine 2D Ready" }
  ]
};

export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    slug: "giyu-tomiyoka",
    title: "GIYU TOMIYOKA",
    medium: "Graphite pencil on 300gsm Bristol",
    year: "2025",
    category: "anime",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art1.jpeg",
    dimensions: "18 x 24 in",
    featured: true,
    description:
      "High-contrast anime character study featuring sharp line weights, dynamic flowing fabric, and dramatic rim lighting rendered entirely with mechanical and woodless graphite.",
    curatorNote:
      "A monumental character study prioritizing the tension between motionless stoicism and kinetic haori garment folds. Deep tonal values achieved using layered 6B-8B pencil burnishing.",
    paletteHex: ["#181716", "#3D3935", "#7A756D", "#B8B1A5", "#FAF8F5"],
    processStages: [
      {
        stage: "rough-graphite",
        title: "Anatomical Silhouette & Flow Lines",
        description: "Initial 2H mechanical graphite armature establishing the dramatic silhouette, sword angle, and haori trajectory.",
        pencilGrades: ["2H", "HB"]
      },
      {
        stage: "refined-pencil",
        title: "Tonal Blocking & Core Values",
        description: "Layering 2B to 4B pencil grades to sculpt muscular tension, garment folds, and deep hair occlusion shadows.",
        pencilGrades: ["2B", "4B"]
      },
      {
        stage: "final-grade",
        title: "8B Woodless Burnishing & Rim Highlights",
        description: "Final graphite burnishing for maximum velvet blacks, paired with precision mono-zero eraser highlights.",
        pencilGrades: ["6B", "8B Woodless", "Mono Zero Eraser"]
      }
    ],
    spineConfig: {
      skeletonPath: "/spine/giyu/giyu.json",
      atlasPath: "/spine/giyu/giyu.atlas",
      texturePath: "/images/art1.jpeg",
      defaultAnimation: "idle_breathe",
      aimBoneName: "head_aim",
      interactionMode: "cursor"
    }
  },
  {
    id: "art-2",
    slug: "douma",
    title: "DOUMA",
    medium: "Traditional Graphite on Bristol",
    year: "2025",
    category: "anime",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art2.jpeg",
    dimensions: "11 x 14 in",
    featured: false,
    description:
      "Anime character study featuring detailed anatomical portraiture, expressive facial silhouettes, and dynamic poses rendered entirely with mechanical graphite pencils.",
    curatorNote:
      "Capturing the eerie calm and layered ornamentation of the Upper Rank demon. High precision mechanical cross-hatching renders subtle facial planes with surgical control.",
    paletteHex: ["#151414", "#373533", "#6E6961", "#A69F93", "#F2EEE8"],
    processStages: [
      {
        stage: "rough-graphite",
        title: "Facial Proportion Armature",
        description: "Careful construction of facial symmetry and sinister gaze angles using precise geometric guidelines.",
        pencilGrades: ["3H", "HB"]
      },
      {
        stage: "final-grade",
        title: "Velvet Hatching & Texture Sculpt",
        description: "High-density cross hatching for ornate headwear and cold metallic fan elements.",
        pencilGrades: ["4B", "6B", "Blending Stump"]
      }
    ],
    spineConfig: {
      skeletonPath: "/spine/douma/douma.json",
      atlasPath: "/spine/douma/douma.atlas",
      texturePath: "/images/art2.jpeg",
      defaultAnimation: "fan_sway",
      aimBoneName: "fan_bone",
      interactionMode: "hover"
    }
  },
  {
    id: "art-3",
    slug: "luffy-gear-5",
    title: "LUFFY GEAR 5",
    medium: "GRAPHITE AND CHARCOAL",
    year: "2023",
    category: "anime",
    orientation: "landscape",
    aspectRatio: "4/3",
    imageUrl: "/images/art3.jpeg",
    dimensions: "3840 x 2160 px (Archival Paper Original)",
    featured: false,
    description:
      "Anime character art with custom poses, expressive facial silhouettes, and dynamic poses rendered entirely with mechanical graphite pencils.",
    curatorNote:
      "Celebration of kinetic liberty and whimsical cloud forms. Charcoal powder wash provides the undulating mist background behind intense pencil foreground gestures.",
    paletteHex: ["#101010", "#2E2D2B", "#5C5955", "#98948D", "#FAF8F5"],
    processStages: [
      {
        stage: "rough-graphite",
        title: "Gesture & Exaggerated Cartoon Dynamics",
        description: "Explosive dynamic curve rhythm capturing the drum of liberation pose.",
        pencilGrades: ["2B Soft", "Willow Charcoal"]
      },
      {
        stage: "final-grade",
        title: "Graphite Cloud Texture & Splatter",
        description: "Hand-blended charcoal atmosphere juxtaposed with crisp dark contour strokes.",
        pencilGrades: ["Charcoal Powder", "6B Pencil", "Kneaded Eraser"]
      }
    ],
    spineConfig: {
      skeletonPath: "/spine/luffy/luffy.json",
      atlasPath: "/spine/luffy/luffy.atlas",
      texturePath: "/images/art3.jpeg",
      defaultAnimation: "laugh_float",
      aimBoneName: "body_aim",
      interactionMode: "scroll"
    }
  },
  {
    id: "art-4",
    slug: "wednesday-adams",
    title: "WEDNESDAY ADAMS",
    medium: "Digital Painting",
    year: "2026",
    category: "portrait",
    orientation: "portrait",
    aspectRatio: "3/4",
    imageUrl: "/images/art4.png",
    dimensions: "12 x 16 in",
    featured: false,
    description:
      "Character study with realistic facial features, expressive facial silhouettes, and dynamic poses rendered entirely with digital painting software.",
    curatorNote:
      "Deep gothic value study balancing cold specular skin highlights with dense, textured braids and dark attire.",
    paletteHex: ["#0C0B0B", "#22201F", "#484340", "#847B75", "#D8D2C9"],
    processStages: [
      {
        stage: "digital-sculpt",
        title: "Grayscale Value Block-in",
        description: "Sculpting cheekbones, eyes, and hair silhouettes strictly in values 0 to 100 before color passes.",
        pencilGrades: ["Digital Hard Round Brush", "Airbrush"]
      },
      {
        stage: "final-grade",
        title: "Gothic Specular & Edge Transitions",
        description: "Refining texture of the collar pattern, skin pores, and stark unblinking eye specular reflections.",
        pencilGrades: ["Custom Texture Brushes", "Color Dodge Highlights"]
      }
    ],
    spineConfig: {
      skeletonPath: "/spine/wednesday/wednesday.json",
      atlasPath: "/spine/wednesday/wednesday.atlas",
      texturePath: "/images/art4.png",
      defaultAnimation: "blink_stare",
      aimBoneName: "eye_tracking",
      interactionMode: "cursor"
    }
  },
  {
    id: "art-5",
    slug: "jinx",
    title: "JINX",
    medium: "Digital Painting / Concept Art",
    year: "2026",
    category: "concept",
    orientation: "landscape",
    aspectRatio: "4/3",
    imageUrl: "/images/art5.jpeg",
    dimensions: "4000 x 2500 px",
    featured: false,
    description:
      "Futuristic concept character and creature composition floating through deep space nebulae with intense cyan and amber volumetric light.",
    curatorNote:
      "Cinematic sci-fi concept art exploring volumetric rim illumination, explosive chromatic contrast, and intricate cybernetic mechanical details.",
    paletteHex: ["#080A0F", "#1A2E3B", "#2B6875", "#E37A32", "#F4C542"],
    processStages: [
      {
        stage: "digital-sculpt",
        title: "Color Scripting & Light Key",
        description: "Establishing complimentary cyan/amber key lights and planetary atmospheric perspective.",
        pencilGrades: ["Color Balance Keys", "Rough Matte Painting"]
      },
      {
        stage: "final-grade",
        title: "Particle Physics & Specular Bloom",
        description: "Detailing mechanical textures, cosmic dust flares, and glowing cybernetic instrumentation.",
        pencilGrades: ["Glazing Layers", "Sharpening & Lens Aberration"]
      }
    ],
    spineConfig: {
      skeletonPath: "/spine/jinx/jinx.json",
      atlasPath: "/spine/jinx/jinx.atlas",
      texturePath: "/images/art5.jpeg",
      defaultAnimation: "nebula_pulse",
      aimBoneName: "target_aim",
      interactionMode: "cursor"
    }
  }
];

export const disciplineMilestones: DisciplineArea[] = [
  {
    id: "disc-1",
    title: "GRAPHITE & CHARCOAL FIGURATIVE MASTERY",
    dateOrLevel: "Traditional • Core Focus",
    description: "Deep pencil gradient scales, hair rendering, anatomical lighting, and archival paper handling on 300gsm Fabriano and Bristol."
  },
  {
    id: "disc-2",
    title: "ANIME & MANGA CHARACTER CONCEPTING",
    dateOrLevel: "Concept Art • Ongoing",
    description: "Original hero design, dynamic poses, expressive facial silhouettes, and thematic costumes crafted with anatomical accuracy."
  },
  {
    id: "disc-3",
    title: "DIGITAL MATTE PAINTING & LIGHTING",
    dateOrLevel: "Digital • Photoshop / Clip Studio",
    description: "Atmospheric depth, value keys, custom brush texture sculpting, and chromatic balance for concept illustrations."
  },
  {
    id: "disc-4",
    title: "COMMISSION WORK & ART DIRECTION",
    dateOrLevel: "Selected Projects • 2022 - Present",
    description: "Private collectors, indie animation concept boards, character turntables, and stylized portrait commissions worldwide."
  }
];

export const commissionTiers: CommissionTier[] = [
  {
    id: "tier-graphite",
    name: "Archival Graphite Masterwork",
    idealFor: "Collectors, anime connoisseurs, physical exhibition",
    startingPrice: "$250 USD",
    turnaroundTime: "2 – 3 Weeks",
    mediums: ["2H–8B Woodless Graphite", "Bristol Vellum / 300gsm Archival Paper"],
    deliverables: [
      "Physical Original Signed Artwork shipped worldwide with protective archival sleeve",
      "8000px High-Resolution Scan (TIFF & JPEG) for personal prints",
      "Certificate of Authenticity with artist seal",
      "Process stage photo updates (Armature -> Tone -> Polish)"
    ]
  },
  {
    id: "tier-digital",
    name: "Digital Character & Concept Art",
    idealFor: "VTubers, key visual boards, novel covers, commercial games",
    startingPrice: "$350 USD",
    turnaroundTime: "1 – 2 Weeks",
    mediums: ["Clip Studio Paint", "Photoshop", "Custom Brush Engine"],
    deliverables: [
      "Full Resolution 300DPI Master PSD with separated character, lighting & background layers",
      "Commercial Usage License for merchandising or publishing",
      "4 Color Variations (Daylight, Neon Noir, Monochrome, Cyber)",
      "High-res transparent PNG exports"
    ]
  },
  {
    id: "tier-spine",
    name: "Spine 2D Rigged Animation Artwork",
    idealFor: "Interactive web hero, game key-art, live wallpaper, streaming alert",
    startingPrice: "$600 USD",
    turnaroundTime: "3 – 4 Weeks",
    mediums: ["Esoteric Software Spine 2D (WebGL / Pixi / Unity Ready)"],
    deliverables: [
      "Fully rigged character illustration with mesh deformation on cloth, hair & eyes",
      "Idle breathing, interactive head/eye aim tracking bones, and reaction loops",
      "Exported `.skel` / `.json` + `.atlas` + `.png` texture atlases",
      "Plug-and-play web viewer integration package ready for browser deployment"
    ]
  }
];

export const contactData: ContactInfo = {
  location: "STUDIO LOCATION",
  locationDetails: "Erode, Tamil Nadu / India • Available Worldwide for Commissions & Concept Contracts",
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

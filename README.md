<div align="center">

# 🎨 Jerry Artworks — Portfolio Website

**Personal & Confidential Portfolio for Graphite & Digital Artist Rajith (Jerry Artworks).**

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Visibility](https://img.shields.io/badge/Repository-Private-red?style=for-the-badge)](https://github.com/)

<br />

[Features](#-key-features) • [Local Development](#-local-development) • [Project Architecture](#-project-architecture) • [Customization](#-customization-guide) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**Jerry Artworks** is a modern editorial portfolio designed with museum gallery aesthetics and built on a cutting-edge frontend architecture. 

It combines fine-art curation (realistic matting, asymmetric layouts, rich typography) with modern web development best practices (strict TypeScript typings, component modularity, fluid responsive layouts, and zero heavy UI library bloat).

---

## ✨ Key Features

- **🏛️ Museum Gallery Editorial Design**:
  - Asymmetric curated artwork showcase with realistic frame borders, white gallery matting, and wall drop-shadows.
  - Signature editorial hero section layering cursive script, a framed portrait card, and bold modern sans typography.
  
- **🖼️ True Orientation & Aspect Ratio Support**:
  - Intelligent frame ratio engine supporting both **Portrait (3:4, 2:3)** and **Landscape (4:3, 16:10)** compositions without image squishing, distortion, or unwanted cropping.

- **🔍 Full-Resolution Lightbox Modal**:
  - Interactive artwork inspection view with smooth fade transitions.
  - Comprehensive metadata display (Title, Medium, Year, Dimensions, and Story).
  - Keyboard navigation enabled (`Escape` to close, `ArrowLeft` / `ArrowRight` to cycle).

- **🏷️ Real-Time Category Filtering**:
  - Filter artworks on the fly by category (`Anime`, `Portrait`, `Concept`, or `All`).

- **📋 1-Click Clipboard Actions**:
  - Contact section equipped with instant copy-to-clipboard buttons for email and phone.

- **⚡ Blazing Fast & Accessible**:
  - Zero heavy CSS framework dependencies — styled with pure modern CSS Custom Properties.
  - Semantic HTML5, accessible ARIA attributes, and fluid typography.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Component architecture & declarative state |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety, strict data models, and maintainable codebase |
| **[Vite 6](https://vitejs.dev/)** | Fast dev server & optimized production bundling |
| **[Vanilla CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)** | Lightweight, fluid design system & editorial theming |
| **[Google Fonts](https://fonts.google.com/)** | *Italianno*, *Syne*, *Playfair Display*, and *Plus Jakarta Sans* |

---

## 📂 Project Architecture

```
jerry-artworks-portfolio/
├── public/
│   ├── favicon.svg                  # Brand monogram favicon
│   └── images/                      # Static artwork and portrait images
│       ├── portrait.png             # Artist hero profile photo
│       ├── art1.jpeg                # Giyu Tomiyoka (Portrait 3:4)
│       ├── art2.jpeg                # Douma (Portrait 3:4)
│       ├── art3.jpeg                # Luffy Gear 5 (Landscape 4:3)
│       ├── art4.png                 # Wednesday Adams (Portrait 3:4)
│       └── art5.jpeg                # Jinx (Landscape 16:10)
├── src/
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces (Artwork, ArtistProfile, etc.)
│   ├── data/
│   │   └── portfolioData.ts         # Centralized data model (Artworks, Bio, Contacts)
│   ├── components/
│   │   ├── Navbar.tsx               # Brand monogram & smooth navigation
│   │   ├── Hero.tsx                 # Script headline, photo frame & title
│   │   ├── Gallery/
│   │   │   ├── GallerySection.tsx   # Asymmetric 5-artwork gallery layout & filters
│   │   │   ├── ArtFrame.tsx         # Museum frame with dynamic ratio enforcement
│   │   │   └── LightboxModal.tsx    # Accessible full-screen modal with key bindings
│   │   ├── AboutSection.tsx         # Artist statement & discipline milestones table
│   │   ├── ContactSection.tsx       # "REACH OUT TO ME" section with 1-click copy
│   │   └── Footer.tsx               # Minimalist copyright & credit bar
│   ├── App.tsx                      # Root application component
│   ├── index.css                    # Design system, CSS variables & typography
│   └── main.tsx                     # React application entrypoint
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Local Development

```bash
# 1. Navigate into the project directory
cd /home/rajith/.gemini/antigravity/scratch/jerry-artworks-portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will run locally at `http://localhost:3000`.

---

## ✏️ Customization Guide

All portfolio content is decoupled from UI components and cleanly centralized in [`src/data/portfolioData.ts`](src/data/portfolioData.ts).

### Adding / Modifying Artworks
To update artworks, place your image inside `public/images/` and update `portfolioData.ts`:

```typescript
export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    title: "YOUR ARTWORK TITLE",
    medium: "Graphite pencil on Bristol",
    year: "2025",
    category: "anime", // 'anime' | 'portrait' | 'concept' | 'study'
    orientation: "portrait", // 'portrait' | 'landscape'
    aspectRatio: "3/4", // '3/4' for portrait, '4/3' or '16/10' for landscape
    imageUrl: "/images/your-file.jpeg",
    dimensions: "18 x 24 in",
    description: "Detailed description of the piece and artistic process.",
    featured: true
  }
];
```

### Modifying Artist Bio & Contact Channels
Edit `artistProfile` and `contactData` in `src/data/portfolioData.ts`:

```typescript
export const contactData: ContactInfo = {
  location: "STUDIO LOCATION",
  locationDetails: "Your City, State / Country",
  email: "your.email@example.com",
  phone: "+1 (555) 000-0000",
  socials: [
    { name: "Instagram", handle: "@_jerry__artworks", url: "https://instagram.com/..." },
    { name: "LinkedIn", handle: "Rajith T R", url: "https://linkedin.com/in/..." },
    { name: "GitHub", handle: "rajith2005-tech", url: "https://github.com/..." }
  ]
};
```

---

## 🚢 Deployment (Vercel / Netlify)

Even with a private GitHub repository, you can host your portfolio publicly or with password protection:

1. Push this project to your **Private GitHub Repository**.
2. Connect your GitHub account to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. Import your private repository (`jerry-artworks-portfolio`).
4. Framework preset: **Vite** (Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy** — your live website link will be generated!

---

## 👤 Author & Copyright

**Rajith T R (Jerry Artworks)**
- 🎨 **Instagram**: [@_jerry__artworks](https://www.instagram.com/_jerry__artworks?igsh=cXowYWYyZHZ0dm5l)
- 💼 **LinkedIn**: [Rajith T R](https://www.linkedin.com/in/rajith-t-r-12899b290)
- 🐙 **GitHub**: [@rajith2005-tech](https://github.com/rajith2005-tech)

---

## 🔒 Copyright Notice

© 2024–2026 Rajith T R (Jerry Artworks). All rights reserved.  
All artwork, illustrations, designs, and content are proprietary intellectual property. Unauthorized copying, distribution, or reproduction is strictly prohibited.

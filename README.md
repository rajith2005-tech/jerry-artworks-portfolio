<div align="center">

# 🎨 Jerry Artworks — Portfolio Website

**A bespoke, high-performance editorial portfolio for Graphite & Digital Artist Rajith (Jerry Artworks).**

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=for-the-badge)](LICENSE)

<br />

> ⚠️ **NOTICE: SHOWCASE ONLY**  
> This repository is public for **evaluation, recruitment, and portfolio demonstration purposes only**.  
> **Cloning, copying, modifying, reproducing, or redistributing this codebase and its artworks without explicit written permission is strictly prohibited.**

<br />

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Architecture](#-project-architecture) • [Live Demo & Contact](#-author--contact)

</div>

---

## 📖 Overview

**Jerry Artworks** is a modern editorial art portfolio designed with museum gallery aesthetics and built on a cutting-edge frontend architecture. 

It combines traditional fine-art curation (realistic matting, asymmetric layouts, rich typography) with modern web development best practices (strict TypeScript typings, component modularity, fluid responsive layouts, and zero heavy UI library bloat).

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

## 🔒 Copyright & Terms of Use

© 2024–2026 **Rajith T R (Jerry Artworks)**. All rights reserved.

- **Viewing Only**: This repository is public for evaluation, recruitment, and portfolio demonstration purposes.
- **No Reproduction or Redistribution**: No part of this code, repository structure, styling, or artwork assets may be cloned, forked, copied, scraped, redistributed, or used in any other projects (commercial or non-commercial) without prior written permission from the author.
- **Artwork Protection**: All original characters, illustrations, graphite drawings, and digital paintings contained in this repository are protected under international copyright law.

For permissions, commissions, or business inquiries, please contact: [contact@jerryartworks.com](mailto:contact@jerryartworks.com)

---

## 👤 Author & Contact

**Rajith T R (Jerry Artworks)**
- 🎨 **Instagram**: [@_jerry__artworks](https://www.instagram.com/_jerry__artworks?igsh=cXowYWYyZHZ0dm5l)
- 💼 **LinkedIn**: [Rajith T R](https://www.linkedin.com/in/rajith-t-r-12899b290)
- 🐙 **GitHub**: [@rajith2005-tech](https://github.com/rajith2005-tech)

# Jerry Artworks — Modern Editorial Portfolio

A responsive portfolio website for **Rajith (Jerry Artworks)**, specializing in **Graphite & Digital Art**. Built with **React 19 + TypeScript + Vite**.

---

## 🎨 Adding Your Images (Method 2 — Static Asset Architecture)

All images are managed as static assets inside [`public/images/`](file:///home/rajith/.gemini/antigravity/scratch/jerry-artworks-portfolio/public/images).

### 1. Place Your Image Files
Copy your image files directly into the `public/images/` folder:

| Slot | Default File | Suggested Ratio | Notes |
| :--- | :--- | :--- | :--- |
| **Hero Portrait** | `public/images/portrait.jpg` | **3:4 (Portrait)** | Artist photo shown in hero card |
| **Artwork 1** | `public/images/art-1.jpg` | **3:4 (Portrait)** | Large featured art on left |
| **Artwork 2** | `public/images/art-2.jpg` | **3:4 (Portrait)** | Top-right vertical frame |
| **Artwork 3** | `public/images/art-3.jpg` | **4:3 (Landscape)** | Top-right horizontal frame |
| **Artwork 4** | `public/images/art-4.jpg` | **3:4 (Portrait)** | Bottom-right vertical frame |
| **Artwork 5** | `public/images/art-5.jpg` | **16:10 (Landscape)**| Bottom-right wide frame |

### 2. Update Image Paths in Code
Open [`src/data/portfolioData.ts`](file:///home/rajith/.gemini/antigravity/scratch/jerry-artworks-portfolio/src/data/portfolioData.ts) to adjust filenames, artwork titles, mediums, and stories:

```typescript
// Hero Portrait:
export const artistProfile: ArtistProfile = {
  // ...
  heroPortraitUrl: "/images/portrait.jpg", // <--- change here
};

// 5 Artworks:
export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    title: "GUARDIAN SPIRIT",
    imageUrl: "/images/art-1.jpg", // <--- change here
    medium: "Graphite & Digital Colors",
    year: "2024",
    // ...
  },
  // ...
];
```

---

## 🚀 Quick Start Guide

```bash
cd /home/rajith/.gemini/antigravity/scratch/jerry-artworks-portfolio

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

---

## 📂 Project Structure

```
jerry-artworks-portfolio/
├── public/
│   ├── favicon.svg
│   └── images/                # Static image directory (portrait & art-1 to art-5)
├── src/
│   ├── types/
│   │   └── index.ts           # Strict TypeScript models
│   ├── data/
│   │   └── portfolioData.ts   # Bio, disciplines, artworks & contact details
│   ├── components/
│   │   ├── Navbar.tsx         # "JA" Monogram & navigation
│   │   ├── Hero.tsx           # Signature script, portrait frame & bold title
│   │   ├── Gallery/
│   │   │   ├── GallerySection.tsx # Asymmetric 5-frame museum gallery
│   │   │   ├── ArtFrame.tsx       # Museum frame with drop-shadow
│   │   │   └── LightboxModal.tsx  # Full resolution interactive inspection modal
│   │   ├── AboutSection.tsx   # Bio & discipline milestones table
│   │   ├── ContactSection.tsx # "REACH OUT TO ME" with 1-click copy
│   │   └── Footer.tsx         # Minimalist copyright & tech stack
│   ├── App.tsx                # Clean single-source component tree
│   ├── index.css              # Editorial tokens, typography & museum styling
│   └── main.tsx
```

# 🚀 Jerry Artworks — Deployment Checklist & Production Optimization Guide

**Production Standards:** Awwwards & FWA Performance, Security, and Accessibility (WCAG AA).

---

## 1. Pre-Deployment Validation

Before pushing to production, run the automated test suite and build verification:

```bash
# 1. Run Vitest Unit & Integration Suites (Security, Spine Fallback, Accessibility)
npm run test

# 2. Compile TypeScript and Generate Optimized Production Bundle
npm run build

# 3. Preview Production Build Locally
npm run preview
```

Ensure all 15 unit tests pass and `dist/` is cleanly populated with minified JS/CSS.

---

## 2. Security Configuration & Headers

When deploying to Vercel, Netlify, Cloudflare Pages, or an Nginx web server, configure the following strict HTTP headers:

### 2.1 Content Security Policy (CSP)
A strict CSP prevents cross-site scripting (XSS) and unsafe script injections:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self'; media-src 'self'; worker-src 'self' blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self';
```

### 2.2 Security Hardening Headers
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 3. WebGL & Asset Cache Headers

To guarantee 60fps performance and instant repeat visits, configure immutable caching for static artwork images and Spine binary data:

| Asset Type | File Extension | Cache-Control Header |
| :--- | :--- | :--- |
| **Vite JS/CSS Bundles** | `.js`, `.css` in `/assets` | `public, max-age=31536000, immutable` |
| **Artwork Images** | `.jpg`, `.jpeg`, `.png`, `.webp` | `public, max-age=604800, stale-while-revalidate=86400` |
| **Spine Binary / Atlases** | `.skel`, `.json`, `.atlas` | `public, max-age=2592000, immutable` |
| **HTML Documents** | `index.html` | `public, max-age=0, must-revalidate` |

---

## 4. Platform Deployment Configurations

### 4.1 Vercel Deployment (`vercel.json`)
Create a `vercel.json` file in the project root:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 4.2 Netlify Deployment (`_headers` and `_redirects`)
Add `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Add `public/_redirects`:
```
/*    /index.html   200
```

---

## 5. Mobile & Lighthouse Performance (Target 90+)

* [x] **Zero Layout Shift (CLS):** Every artwork frame uses explicit `aspectRatio` CSS property (`3/4` or `4/3`) with mathematical inversion prevention.
* [x] **Interaction Pausing:** Offscreen Spine canvases automatically halt requestAnimationFrame render loops via `IntersectionObserver`.
* [x] **Reduced Motion Support:** Users with `prefers-reduced-motion` enabled are served static archival images with all intensive motion loops disabled.
* [x] **Keyboard Navigation:** Modals support `Escape` and arrow key navigation with visible focus indicators.
* [x] **Form Anti-Abuse:** CSRF token verification, input sanitization, and time-window rate-limiting active on commission submissions.

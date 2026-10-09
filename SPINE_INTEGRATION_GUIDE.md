# 🦴 Spine 2D Motion Integration Guide

**Project:** Jerry Artworks (`Rajith`)  
**Target:** Awwwards & FWA Editorial Standard Artwork Rigs

---

## 1. Runtime Version Matching

Spine runtimes are strictly tied to the version of the Spine Editor used to export the assets:

| Spine Editor Version | Compatible Runtime | Data Format | Notes |
| :--- | :--- | :--- | :--- |
| **Spine 4.2.xx** | `@esotericsoftware/spine-webgl@4.2.x` | Binary `.skel` or JSON `.json` | **Recommended** — enhanced physics constraints and mesh deform performance. |
| **Spine 4.1.xx** | `@esotericsoftware/spine-webgl@4.1.x` | Binary `.skel` or JSON `.json` | Legacy stable. |

> ⚠️ **CRITICAL RULE:** A `.skel` or `.json` exported from Spine 4.2 **cannot** be parsed by a 4.1 runtime. Always ensure your export settings match your target runtime.

---

## 2. Spine Editor Export Settings

When exporting character illustrations from Spine Editor (`File > Export`):

### 2.1 Skeleton Export
* **Export Type:** `JSON` (for easy inspection) or `Binary` (`.skel` for 60% faster load time and smaller file size).
* **Nonessential data:** Unchecked (reduces file size).
* **Pretty print:** Unchecked (for production).
* **Extension:** `.json` or `.skel`.

### 2.2 Texture Packer Settings
Click **Pack** next to Texture Atlas in the export dialog:
* **Format:** `PNG` (8-bit or 24-bit with alpha).
* **Premultiply alpha:** `True` (Essential: avoids dark fringing and halos around semi-transparent hair/cloth strands in WebGL blend modes).
* **Power of two (POT):** `False` (WebGL2 and modern Spine runtimes support NPOT textures without issue).
* **Max width / Max height:** `2048 x 2048` or `4096 x 4096` (Keep atlas count to 1 single `.png` page per artwork).
* **Bleed:** Checked (prevents texture filtering artifacts on atlas seams).
* **Scale:** `1.0` (Full resolution) + optional `0.5` variant for mobile optimization.

---

## 3. Standard Bone & Slot Naming Conventions

To allow the portfolio's `<SpineAnimation />` harness to automatically map interactive cursor aiming, scroll track mixing, and eye-tracking, follow these exact naming conventions in your Spine project:

### 3.1 Aim & Interactive Bones
| Bone Name | Purpose | Behavior in Portfolio |
| :--- | :--- | :--- |
| `head_aim` | Neck and head directional orient | Rotates and offsets based on mouse cursor coordinates `[-0.85, 0.85]`. |
| `eye_aim` | Eye gaze target | Follows mouse position with high spring reactivity. |
| `body_aim` | Torso and spine center of gravity | Subtly tilts with scroll depth. |
| `parallax_fg` | Foreground depth elements | Moves with inverted scroll parallax. |
| `parallax_bg` | Background atmospheric planes | Subtle slow pan relative to camera. |

### 3.2 Standard Animation Track Conventions
Organize animations into distinct tracks to enable seamless additive mixing in code:

| Animation Name | Recommended Track | Mode | Description |
| :--- | :--- | :--- | :--- |
| `idle_breathe` | **Track 0** (Base) | Loop | Subtle ribcage/chest mesh expansion and baseline stance. |
| `cloth_wind` / `hair_sway` | **Track 1** (Additive) | Loop | Secondary organic motion for garments, ribbons, and hair. |
| `turn_cursor` | **Track 2** (Interactive) | Scrubbed | 3-frame or multi-pose turn driven by cursor bone kinematics. |
| `scroll_reaction` | **Track 3** (Scrubbed) | Clamped | Poses tied to scroll depth as the user navigates past the frame. |

---

## 4. Asset File Placement

Place your exported assets into the `public/spine/` directory grouped by the artwork's slug:

```
public/
└── spine/
    ├── giyu-tomiyoka/
    │   ├── giyu.json (or giyu.skel)
    │   ├── giyu.atlas
    │   └── giyu.png
    ├── douma/
    │   ├── douma.json
    │   ├── douma.atlas
    │   └── douma.png
    ├── luffy-gear-5/
    │   ├── luffy.json
    │   ├── luffy.atlas
    │   └── luffy.png
    ├── wednesday-adams/
    │   ├── wednesday.json
    │   ├── wednesday.atlas
    │   └── wednesday.png
    └── jinx/
        ├── jinx.json
        ├── jinx.atlas
        └── jinx.png
```

---

## 5. Integrating with `<SpineAnimation />`

In `src/data/portfolioData.ts`, configure the artwork's `spineConfig` block:

```typescript
{
  id: "art-1",
  slug: "giyu-tomiyoka",
  title: "GIYU TOMIYOKA",
  imageUrl: "/images/art1.jpeg", // High-res fallback image
  spineConfig: {
    skeletonPath: "/spine/giyu-tomiyoka/giyu.json",
    atlasPath: "/spine/giyu-tomiyoka/giyu.atlas",
    texturePath: "/spine/giyu-tomiyoka/giyu.png",
    defaultAnimation: "idle_breathe",
    aimBoneName: "head_aim",
    interactionMode: "cursor" // "cursor" | "scroll" | "hover" | "static"
  }
}
```

### Automatic Fallback Behavior:
1. **Missing Files:** If assets are not found, the component automatically falls back to `imageUrl` with subtle 2.5D parallax.
2. **Reduced Motion:** If the user has `prefers-reduced-motion` enabled, the WebGL loop is paused and the static archival masterpiece is presented instantly.
3. **Context Loss:** If the GPU runs out of memory or reloads, WebGL context loss listeners preserve the UI and restore automatically.

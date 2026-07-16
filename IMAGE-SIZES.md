# Homepage Image Upload Guide

> Upload images at the recommended dimensions. All components use `object-fit: contain`, so images display in full — no cropping. Matching the recommended size gives a pixel-perfect fit.

---

## Hero Image (Left — 70% width)

At `lg+` the hero section is `calc(100vh - 72px)` tall with `24px` spacing each side. Below `lg` the image stacks full-width with a fixed height.

| Viewport | Container Width | Container Height | Aspect Ratio (W:H) |
|----------|----------------|-----------------|-------------------|
| 1920×1080 (lg+) | 1344 px | 944 px | 1.42 : 1 |
| 1440×900 (lg+) | 1008 px | 764 px | 1.32 : 1 |
| 1280×720 (md) | 1280 px | 400 px | 3.20 : 1 |
| 768×1024 (sm) | 768 px | 400 px | 1.92 : 1 |
| 375×812 (xs) | 375 px | 280 px | 1.34 : 1 |

**Best upload size:** `1400 × 980 px` (ratio ≈ 1.43 : 1)

- Format: JPG or WebP
- Max file size: keep under 500 KB
- Matches the 1920×1080 desktop container almost exactly (1.42:1)
- On smaller viewports the image scales down proportionally

---

## Offer Card Image (Right — 30% width)

Same height as the hero left image. Below `lg` it stacks full-width with a fixed height.

| Viewport | Container Width | Container Height | Aspect Ratio (W:H) |
|----------|----------------|-----------------|-------------------|
| 1920×1080 (lg+) | 576 px | 944 px | 0.61 : 1 |
| 1440×900 (lg+) | 432 px | 764 px | 0.57 : 1 |
| 1280×720 (md) | 1280 px | 450 px | 2.84 : 1 |
| 768×1024 (sm) | 768 px | 450 px | 1.71 : 1 |
| 375×812 (xs) | 375 px | 360 px | 1.04 : 1 |

**Best upload size:** `600 × 1000 px` (ratio = 0.6 : 1, portrait)

- Format: JPG or WebP
- Matches the desktop container well (0.61:1)
- On mobile the container is nearly square — some letterboxing is expected
- A gradient overlay is applied for text legibility

---

## Service Card Image (Horizontal scroll cards)

Cards scroll horizontally. Image is an `<img>` tag with `object-fit: contain`. At `lg+` the height is dynamic: `max(500/520px, calc(100vh - 320px))`.

| Breakpoint | Card Width | Card Height | Aspect Ratio (W:H) | Container at 1080p |
|-----------|-----------|-------------|-------------------|-------------------|
| xs (<600) | 319 px | 425 px | 0.75 : 1 | 319 × 425 px |
| sm (600–899) | 320 px | 427 px | 0.75 : 1 | 320 × 427 px |
| md (900–1199) | 360 px | 480 px | 0.75 : 1 | 360 × 480 px |
| lg (1200–1535) | 420 px | max(500, calc) | — | 420 × 500 px |
| xl (1536+) | 440 px | max(520, calc) | — | 440 × 760 px |

**Best upload size:** `440 × 760 px` (ratio ≈ 0.58 : 1, portrait)

- Format: JPG or WebP
- At `xl` on a 1080p screen the card is 440 × 760 px — this size fills it exactly
- At smaller viewports the image scales down proportionally
- Image is centered within the card area

---

## Featured Product Card Image

Product cards use a fixed-height image area (`height: 220px`) with `object-fit: contain`. Card max-width is `325px` on mobile, `280px` on sm+.

| Breakpoint | Card Max Width | Image Height | Aspect Ratio (W:H) |
|-----------|---------------|-------------|-------------------|
| xs (mobile) | 325 px | 220 px | 1.48 : 1 |
| sm+ | 280 px | 220 px | 1.27 : 1 |

**Best upload size:** `560 × 440 px` (ratio = 1.27 : 1, landscape)

- Format: JPG or WebP
- Max file size: keep under 200 KB per product
- Exactly 2× the sm+ container (280 × 220) for Retina sharpness
- On mobile the image is ~1.97× the container (slightly under 2×, still sharp)

---

## Portfolio Grid Image

Portfolio cards use a `4/5` aspect ratio with `object-fit: contain`. The same image is shown in a lightbox dialog at up to `90vw × 80vh`.

| Viewport | Columns | Card Width | Card Height (4:5) | Container at 1080p |
|----------|---------|-----------|-------------------|-------------------|
| 1920×1080 (lg) | 4 | 358 px | 448 px | 358 × 448 px |
| 1440×900 (lg) | 4 | 334 px | 418 px | 334 × 418 px |
| 1024×768 (md) | 3 | 315 px | 394 px | 315 × 394 px |
| 768×1024 (sm) | 2 | 356 px | 445 px | 356 × 445 px |
| 375×812 (xs) | 1 | 343 px | 429 px | 343 × 429 px |

**Best upload size:** `800 × 1000 px` (ratio = 4 : 5, portrait)

- Format: JPG or WebP
- Max file size: keep under 300 KB per image
- This is ~2.2× the largest grid container — sharp on Retina displays
- Image displays in full within the 4:5 frame
- **Lightbox:** At zoom=1 on a 1080p screen the lightbox is 1728 × 864 px. A 4:5 image renders at 691 × 864 px with white borders. For a sharper lightbox, upload at `1600 × 2000 px`

---

## Portraits Grid Image

Gallery tiles use a `3/4` aspect ratio with `object-fit: cover`. Grid uses CSS Grid with responsive columns.

| Viewport | Columns | Card Width | Card Height (3:4) | Container at 1080p |
|----------|---------|-----------|-------------------|-------------------|
| 1920×1080 (xl) | 5 | 288 px | 384 px | 288 × 384 px |
| 1440×900 (xl) | 5 | 275 px | 367 px | 275 × 367 px |
| 1024×768 (md) | 3 | 320 px | 427 px | 320 × 427 px |
| 768×1024 (sm) | 2 | 360 px | 480 px | 360 × 480 px |
| 375×812 (xs) | 1 | 343 px | 457 px | 343 × 457 px |

**Best upload size:** `720 × 960 px` (ratio = 3 : 4, portrait)

- Format: JPG or WebP
- Max file size: keep under 300 KB per image
- This is 2× the largest container at sm (360 × 480) — sharp on all screens
- Uses `object-fit: cover` — image fills the frame, edges may crop slightly

---

## Restoration Showcase Images

Before/after comparison tiles use a `4/5` aspect ratio with `object-fit: cover`. Each item has two images (before + after).

| Viewport | Columns | Column Width | After Padding (12px each side) | Image Height (4:5) |
|----------|---------|-------------|-------------------------------|-------------------|
| 1920×1080 (xl) | 5 | 288 px | 264 px | 330 px |
| 1440×900 (xl) | 5 | 275 px | 251 px | 314 px |
| 1024×768 (md) | 3 | 320 px | 296 px | 370 px |
| 768×1024 (sm) | 2 | 360 px | 336 px | 420 px |
| 375×812 (xs) | 1 | 343 px | 319 px | 399 px |

**Best upload size:** `672 × 840 px` (ratio = 4 : 5, portrait)

- Format: JPG or WebP
- Both before and after images should be the same dimensions
- This is 2× the largest container at sm (336 × 420) — sharp on all screens
- Uses `object-fit: cover` — image fills the frame, edges may crop slightly

---

## Speciality Icons

Small icon images displayed at a fixed size with `object-fit: contain`.

| Viewport | Container Size | Aspect Ratio |
|----------|---------------|-------------|
| All | 100 × 100 px | 1 : 1 |

**Best upload size:** `200 × 200 px` (ratio = 1 : 1, square)

- Format: PNG (for transparency) or JPG
- 2× the container for Retina sharpness

---

## Quick Reference

| Component | Width | Height | Aspect | Shape | Object-Fit |
|-----------|-------|--------|--------|-------|------------|
| Hero (left) | 1400 px | 980 px | ~1.43:1 | Landscape | contain |
| Offer (right) | 600 px | 1000 px | 0.6:1 | Portrait | contain |
| Service card | 440 px | 760 px | ~0.58:1 | Portrait | contain |
| Product card | 560 px | 440 px | 1.27:1 | Landscape | contain |
| Portfolio image | 800 px | 1000 px | 4:5 | Portrait | contain |
| Portraits grid | 720 px | 960 px | 3:4 | Portrait | cover |
| Restoration | 672 px | 840 px | 4:5 | Portrait | cover |
| Speciality icons | 200 px | 200 px | 1:1 | Square | contain |

## Tips

- **Never upload smaller** than the recommended size — it will look blurry
- **Square images (1:1)** work but will have letterboxing in non-square containers
- `object-fit: contain` = image fits within its container, full image visible (no cropping)
- `object-fit: cover` = image fills the container, edges may crop (used by Portraits and Restoration)
- Keep important content (faces, text, products) in the **center 80%** of the image
- Use **WebP** for best quality-to-size ratio; **JPG** for maximum compatibility
- Upload at the **exact recommended dimensions** for a pixel-perfect fit
- For Retina (2×) displays, double the recommended dimensions

---
name: Tactile Intelligence
colors:
  surface: '#111125'
  surface-dim: '#111125'
  surface-bright: '#37374d'
  surface-container-lowest: '#0c0c1f'
  surface-container-low: '#1a1a2e'
  surface-container: '#1e1e32'
  surface-container-high: '#28283d'
  surface-container-highest: '#333348'
  on-surface: '#e2e0fc'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e2e0fc'
  inverse-on-surface: '#2f2e43'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#111125'
  on-background: '#e2e0fc'
  surface-variant: '#333348'
typography:
  display-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system for Researcher AI is built on a foundation of high-tech sophistication and physical intuition. It employs a "Tactile Glass" aesthetic—a fusion of Neumorphism, Glassmorphism, and Skeuomorphism—to create an interface that feels like a premium, physical instrument for digital discovery.

The UI targets power users and researchers who require a focused, immersive environment. By blending deep-space navy backgrounds with frosted translucent panels and soft, extruded surfaces, the design system evokes a sense of depth and precision. The emotional response is one of calm authority, where AI-driven insights feel grounded in a tangible, high-end workbench.

## Colors
The palette is centered around a deep navy void (#12121f), providing a low-strain environment for long research sessions. 

- **Primary Gradient:** An Indigo-to-Violet sweep (#6366f1 to #8b5cf6) is reserved for active AI states, high-priority actions, and focus indicators.
- **Surface Strategy:** Surfaces use #1a1a2e. Depth is created through directional lighting rather than flat color shifts.
- **Glass Effects:** Translucent layers utilize the primary accent at extremely low opacities (5-10%) to tint the backdrop blur, ensuring the "glass" feels integrated into the brand's color space.
- **Luminous Borders:** Use a 1px stroke with a linear gradient (Top-Left: #ffffff15 to Bottom-Right: #ffffff05) to simulate a physical edge catching light.

## Typography
Outfit is the primary typeface, chosen for its geometric clarity and modern, open terminals which complement the rounded UI shapes. Inter serves as the utility font for dense data, labels, and technical readouts where maximum legibility is required at small scales.

Headlines should utilize tighter letter-spacing to feel "locked-in" and architectural. Body text maintains standard spacing for readability. For AI-generated content or insights, use `body-lg` with slightly increased line-height to give the information room to breathe against the rich visual textures of the background.

## Layout & Spacing
The layout follows a fluid-to-fixed model. On desktop, the interface occupies a max-width container of 1440px to ensure data density remains manageable. 

- **Grid:** A 12-column grid with 24px gutters.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Panels:** Use large "Glass" panels to group related research tools. These panels should have 40px (lg) internal padding to maintain a premium, spacious feel.
- **Mobile:** Transition to a single-column layout with 16px margins. Components like sidebars collapse into bottom-sheet patterns to maintain tactile accessibility.

## Elevation & Depth
Elevation is defined by light and shadow, not just Z-index. This system uses three distinct types of depth:

1.  **Neumorphic Raised (Level 1):** Used for primary interactive containers. 
    *   *Shadows:* `8px 8px 16px rgba(0,0,0,0.4)` (Bottom-Right) and `-4px -4px 12px rgba(255,255,255,0.03)` (Top-Left).
2.  **Neumorphic Inset (Recessed):** Used for input fields, search bars, and "empty" states to signify areas that can be filled.
    *   *Shadows:* `inset 4px 4px 8px rgba(0,0,0,0.4)`, `inset -2px -2px 6px rgba(255,255,255,0.03)`.
3.  **Glass Floating (Level 2):** Used for overlays, modals, and tooltips. 
    *   *Effect:* `backdrop-blur(20px)`, `saturate(1.5)`, and a 1px luminous border. These elements sit "above" the tactile surface, casting a wide, soft 32px diffused black shadow to separate them from the main UI plane.

## Shapes
Shapes are consistently rounded to maintain the friendly yet technical "soft-hardware" aesthetic. 

- **Standard Elements:** Use `rounded` (0.5rem) for buttons and smaller inputs.
- **Containers:** Use `rounded-lg` (1rem) for cards and secondary panels.
- **Main Layout Blocks:** Use `rounded-xl` (1.5rem) for primary glass panels and global containers.
- **Interactive Pill:** Use pill-shaped (full radius) for tags, chips, and the primary "Ask AI" floating action button.

## Components

### Buttons
- **Primary:** Features the Indigo-to-Violet gradient. Use a subtle inner-glow on the top edge and a `1px` white overlay at 10% opacity to create a "glass bead" effect.
- **Secondary:** Neumorphic "Raised" style with `text-primary`. On hover, the top-left highlight brightens slightly.
- **Tertiary/Ghost:** Flat background with a luminous border that only appears on hover.

### Input Fields
Always "Inset" (recessed). The background should be slightly darker than the surface (#0e0e1a). Use `Inter` for the input text to ensure technical clarity.

### Cards & Panels
Cards use the "Glassmorphism" treatment. Background is a blur of the base navy with a 5% indigo tint. Ensure the `backdrop-filter` is applied to avoid visual clutter when scrolling content underneath.

### Chips & Tags
Pill-shaped with a soft inner-shadow to appear "pressed" into the surface, or a glowing border if they represent active AI filters.

### Progress & Status
Use a 3D "extruded" track (inset) with a glowing gradient fill for the progress bar. The fill should have a `box-shadow` of the same color to simulate light emission (bloom).

### AI Interaction Hub
The central research input should be a large, "Inset" neumorphic area with a constant, slow-pulsing luminous border when the AI is processing, creating a "breathing" light effect.
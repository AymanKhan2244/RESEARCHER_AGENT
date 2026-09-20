---
name: Deep Dark AI Research Canvas
colors:
  surface: '#111125'
  surface-dim: '#111125'
  surface-bright: '#37374d'
  surface-container-lowest: '#0c0c20'
  surface-container-low: '#1a1a2e'
  surface-container: '#1e1e32'
  surface-container-high: '#28283d'
  surface-container-highest: '#333348'
  on-surface: '#e2e0fc'
  on-surface-variant: '#c7c5d0'
  inverse-surface: '#e2e0fc'
  inverse-on-surface: '#2f2e44'
  outline: '#918f9a'
  outline-variant: '#46464f'
  surface-tint: '#c0c1ff'
  primary: '#e1dfff'
  on-primary: '#292b5e'
  primary-container: '#c0c1ff'
  on-primary-container: '#4b4d83'
  inverse-primary: '#585990'
  secondary: '#adc6ff'
  on-secondary: '#122f5f'
  secondary-container: '#2c4677'
  on-secondary-container: '#9cb5ed'
  tertiary: '#e9ddff'
  on-tertiary: '#37265e'
  tertiary-container: '#d0bcff'
  on-tertiary-container: '#594983'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#131449'
  on-primary-fixed-variant: '#404176'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#2c4677'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#210f48'
  on-tertiary-fixed-variant: '#4d3d76'
  background: '#111125'
  on-background: '#e2e0fc'
  surface-variant: '#333348'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an aura of intellectual precision, ambient depth, and luminous discovery. Crafted specifically for an AI Research Agent, the visual environment shifts away from sterile developer tools into a focused, nocturnal research sanctuary. It combines hyper-modern glassmorphism with controlled neon luminosity, mimicking high-performance computational nodes immersed in deep cosmic dark.

The interface evokes focus, calm authority, and frictionless synthesis of massive information spaces. Interactions should feel weightless yet magnetically responsive, leveraging diffuse indigo-lavender glows, frosted structural surfaces, and immaculate spatial framing.

## Colors

The palette establishes an ultra-deep indigo foundation `#111125` paired with stacked container surfaces anchored around `#1e1e32`. The accent triad draws upon high-luminance pastels: soft lavender-indigo `#c0c1ff` acts as the primary cognitive driver, glacial blue `#adc6ff` guides system statuses and contextual citations, and ethereal violet `#d0bcff` highlights generative prompts and autonomous agent decisions.

### Surface Tokens
- **Background Base**: `#111125` — The deep atmospheric base layer.
- **Surface Dim**: `#16162c` — Recessed command panels and terminal traces.
- **Surface Default**: `#1e1e32` — Baseline structural cards and panes.
- **Surface Glass**: `rgba(30, 30, 50, 0.65)` — Frosted overlay with `backdrop-filter: blur(20px)`.
- **Surface Bright**: `#26263f` — Elevated hover states and active focus blocks.

### Borders & Glows
- **Glass Border Subtle**: `rgba(192, 193, 255, 0.08)` — Standard perimeter outline.
- **Glass Border Active**: `rgba(192, 193, 255, 0.32)` — Focused inputs, running agent states.
- **Ambient Aura**: `rgba(192, 193, 255, 0.15)` — Diffused illumination for hero nodes and generation streams.

## Typography

The type system blends the geometric balance of **Outfit** for structural titles and generative readouts with the utilitarian legibility of **Inter** for dense synthesized reports, logic trees, and parameter matrices.

Outfit delivers a forward-looking presence across large headings, while Inter sustains optimal character tracking and legibility during long research sessions. Monospaced metadata or code snippets within agent outputs should map strictly to an optical size matching `body-sm`.

## Layout & Spacing

The layout is built on a high-density, flexible multi-pane system tailored for complex research workflows. It features a fixed-width frosted telemetry sidebar (64px collapsed, 260px expanded), an autonomous multi-stage investigation workspace, and a responsive contextual canvas.

- **Desktop (1200px+)**: Multi-pane layout with fluid canvas area, `margin: 2rem`, and `gutter: 1.5rem`.
- **Tablet (768px - 1199px)**: Collapsed toolbars, persistent quick-query bar, `margin: 1.5rem`, and `gutter: 1rem`.
- **Mobile (< 768px)**: Single-column linear flow, off-canvas frosted drawer navigation, `margin: 1rem`, and `gutter-sm: 1rem`.

## Elevation & Depth

Visual hierarchy relies on stacked glassmorphism, multi-layer blur filters, and chromatic edge luminescence rather than heavy drop shadows:

1. **Base Layer (Level 0)**: Unadorned `#111125` canvas.
2. **Frosted Containers (Level 1)**: `rgba(30, 30, 50, 0.60)` with `backdrop-filter: blur(24px)` and a 1px border of `rgba(192, 193, 255, 0.08)`.
3. **Elevated Overlays & Modals (Level 2)**: `rgba(38, 38, 63, 0.75)` with `backdrop-filter: blur(32px)` and outer ambient diffuse glow `0 8px 32px -4px rgba(17, 17, 37, 0.8), 0 0 20px 0 rgba(192, 193, 255, 0.12)`.
4. **Active Agent State (Level 3)**: Glowing boundaries using multi-stop linear gradients along borders (`#c0c1ff` through `#d0bcff`) with subtle outer breathing blooms (`box-shadow: 0 0 24px rgba(192, 193, 255, 0.25)`).

## Shapes

The design uses a refined curvature profile (`roundedness: 2`). Baseline controls, inputs, and chips feature `0.5rem` (8px) corner radii. Structural cards and panels leverage `1rem` (16px), while modal dialogs and dynamic hero containers expand to `1.5rem` (24px). Floating prompt bars and status badges adopt fully curved pill shapes (`9999px`) to emphasize fluidity.

## Components

### Buttons
- **Primary Action**: Solid `#c0c1ff` background with `#111125` typography. Soft box-shadow `0 0 16px rgba(192, 193, 255, 0.4)` on hover.
- **Secondary / Glass**: Background `rgba(192, 193, 255, 0.06)`, text `#c0c1ff`, border `1px solid rgba(192, 193, 255, 0.16)`. Hover: background `rgba(192, 193, 255, 0.12)`.
- **Ghost Action**: Transparent background, text `#adc6ff`, hover background `rgba(173, 198, 255, 0.08)`.

### Cards & Analytical Panels
- Background: `rgba(30, 30, 50, 0.65)` layered over subtle diagonal background gradients.
- Border: `1px solid rgba(192, 193, 255, 0.08)`.
- Padding: `space-lg` (1.5rem).
- In processing mode, cards gain an oscillating top-edge glow transitioning between `#c0c1ff` and `#d0bcff`.

### Chips & Evidence Tags
- Compact height (28px), pill border-radius (`9999px`), `space-sm` horizontal padding.
- Text in `label-sm`, background `rgba(173, 198, 255, 0.08)`, border `1px solid rgba(173, 198, 255, 0.2)`.

### Input & Search Bar
- Unified conversational search bar with a frosted pill container (`background: rgba(30, 30, 50, 0.75)`).
- Border: `1px solid rgba(192, 193, 255, 0.15)`.
- Focus ring: `1px solid #c0c1ff` paired with `0 0 16px rgba(192, 193, 255, 0.25)`.
- Placeholder text: `rgba(192, 193, 255, 0.4)`.

### Lists & Citations
- Citation sources display as translucent inset cards with `space-sm` internal padding.
- Hovering reveals a delicate border flare (`#adc6ff`) with an automated preview drawer.

### Checkboxes & Radios
- Size: 18px x 18px. Box: `rgba(30, 30, 50, 0.9)`, border `1px solid rgba(192, 193, 255, 0.24)`.
- Checked state: Filled with `#c0c1ff`, tick glyph in `#111125`, flanked by a soft halo glow.

### Agent Workflow Progress Nodes
- Timeline or execution step indicators use pulsating circular pips (`#d0bcff`) connected via semi-transparent gradient rails (`linear-gradient(to bottom, #c0c1ff, rgba(30, 30, 50, 0))`).
# Agents Guide

This document helps AI agents understand and work with the Moqup codebase.

## Project Overview

Moqup is a client-side screenshot mockup generator built with TanStack Start and deployed on Cloudflare Workers. Users can upload screenshots and wrap them in device frames with customizable backgrounds, shadows, and padding.

## Tech Stack

- **Framework**: TanStack Start (React + Vite)
- **Styling**: Tailwind CSS v4 with CSS variables
- **Deployment**: Cloudflare Workers
- **Export**: html-to-image library
- **Linting**: Biome

## Project Structure

```
moqup/
├── public/                  # Static assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── controls/        # Sidebar control components
│   │   │   ├── BackgroundPicker.tsx
│   │   │   ├── DeviceSelector.tsx
│   │   │   ├── PaddingControl.tsx
│   │   │   └── ShadowControl.tsx
│   │   ├── editor/          # Main editor components
│   │   │   ├── Canvas.tsx       # Renders the mockup preview
│   │   │   ├── DropZone.tsx     # Image upload/paste handler
│   │   │   └── ExportMenu.tsx   # Export dropdown menu
│   │   ├── frames/          # Device frame components
│   │   │   ├── BrowserFrame.tsx
│   │   │   ├── IPhoneFrame.tsx
│   │   │   ├── MacBookFrame.tsx
│   │   │   ├── IPadFrame.tsx
│   │   │   ├── PixelFrame.tsx
│   │   │   ├── MonitorFrame.tsx
│   │   │   └── index.ts
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Slider.tsx
│   │       ├── Select.tsx
│   │       └── ColorPicker.tsx
│   ├── lib/                 # Utilities and data
│   │   ├── gradients.ts     # Gradient presets
│   │   ├── devices.ts       # Device specifications
│   │   └── social-sizes.ts  # Social media export sizes
│   ├── routes/
│   │   ├── __root.tsx       # Root layout with meta tags
│   │   └── index.tsx        # Main app page
│   ├── styles.css           # Global styles and CSS variables
│   └── router.tsx           # Router configuration
├── wrangler.jsonc           # Cloudflare Workers config
└── biome.json               # Linter config
```

## Key Files

### `src/routes/index.tsx`
Main application component. Contains all state management for:
- `image` - Base64 image data
- `device` - Selected device frame
- `background` - Background style (gradient/solid/transparent)
- `padding`, `shadow`, `borderRadius` - Styling options
- `browserUrl` - URL shown in browser frame
- Keyboard shortcuts (Ctrl+S, Esc)

### `src/components/editor/Canvas.tsx`
Renders the mockup preview. Uses `forwardRef` so the parent can pass a ref for html-to-image export. The `DeviceWrapper` component selects the appropriate frame.

### `src/components/editor/ExportMenu.tsx`
Handles PNG and SVG export using html-to-image. Supports:
- Multiple scale options (1x, 2x, 3x)
- Social media preset sizes
- SVG vector export

### `src/styles.css`
Tailwind v4 config with CSS variables for theming:
- `--color-accent`: Red (#EF4444)
- `--color-background`: Near black (#09090B)
- `--color-surface`: Dark gray (#18181B)
- Animation keyframes for UI transitions

## Common Tasks

### Adding a new device frame
1. Create component in `src/components/frames/`
2. Export from `src/components/frames/index.ts`
3. Add case to `DeviceWrapper` in `Canvas.tsx`
4. Add option to `DeviceSelector.tsx`

### Adding a new gradient preset
Add to the `gradientPresets` array in `src/lib/gradients.ts`

### Adding a new export size
Add to `socialSizes` array in `src/lib/social-sizes.ts`

### Changing the accent color
Update `--color-accent` variables in `src/styles.css` and update logo SVGs in:
- `src/routes/index.tsx` (inline SVG)
- `public/favicon.svg`

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run deploy   # Deploy to Cloudflare Workers
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
```

## Design Decisions

- **Client-side only**: No server processing, all image manipulation happens in browser
- **No image storage**: Images are never uploaded to a server
- **CSS variables**: Enable easy theming and consistent colors
- **Minimal dependencies**: Keep bundle size small for fast loading

## Notes

- The app uses `html-to-image` which renders DOM to canvas - complex CSS may not export perfectly
- Device frames use simplified/iconic designs, not photorealistic
- Browser frame has dynamic URL prop for customization
- Export menu supports both controlled and uncontrolled open state

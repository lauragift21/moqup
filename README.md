# Moqup

**Drop. Frame. Ship.**

A free, open-source screenshot mockup generator. Paste or upload screenshots and instantly generate beautiful mockups with device frames, gradient backgrounds, shadows, and more. Entirely client-side, deployed on Cloudflare Workers.

## Features

- **Device Frames** - iPhone, MacBook, iPad, Pixel, Browser, Monitor
- **Backgrounds** - Gradient presets, solid colors, custom gradients, transparent
- **Customization** - Adjustable padding, shadows, border radius
- **Browser URL** - Dynamic URL input for browser frame mockups
- **Export Options** - PNG (1x/2x/3x), social media sizes, SVG
- **Keyboard Shortcuts** - `Ctrl+S` to export, `Esc` to reset
- **Dark Theme** - Clean, minimal interface

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

## Tech Stack

- [TanStack Start](https://tanstack.com/start) - React framework
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [Cloudflare Workers](https://workers.cloudflare.com) - Deployment
- [html-to-image](https://github.com/bubkoo/html-to-image) - Export functionality

## Usage

1. **Drop** - Drag & drop, paste (`Ctrl+V`), or click to upload a screenshot
2. **Frame** - Choose a device frame and customize the background, padding, and shadows
3. **Ship** - Export your mockup as PNG or SVG

## License

MIT

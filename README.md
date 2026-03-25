# SoundLevel

SoundLevel is a classroom sound monitor built with vanilla JavaScript and Vite. It listens to the microphone, estimates the current sound level, classifies the reading into four zones, and gives visual feedback through a circular meter, a mascot, streak counters, and a short history graph.

## Stack

- Vite 8
- Vanilla JavaScript (ES modules)
- Web Audio API
- HTML + CSS

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- A modern browser with microphone access

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Features

- Real-time microphone capture through the Web Audio API
- Rolling-average smoothing for more stable readings
- Four configurable sound zones
- Internationalized interface with Spanish, Galician, English, Portuguese, French, German, Catalan, and Basque
- Persistent thresholds stored in `localStorage`
- Persistent best streak stored in `localStorage`
- Persistent language preference stored in `localStorage`
- Animated mascot, particle system, and recent-history sparkline
- Basic accessibility support for focus states, live regions, and reduced motion
- Installable PWA with manifest, service worker, and app icons

## Project Structure

- `index.html`: Application shell and semantic markup
- `src/main.js`: Main controller and UI orchestration
- `src/audio.js`: Microphone capture and level estimation
- `src/i18n.js`: Copy catalog, locale helpers, and duration formatting
- `src/zones.js`: Zone thresholds, styles, and messages
- `src/mascot.js`: Mascot state handling
- `src/particles.js`: Background and celebration particles
- `src/style.css`: Layout, theme, animations, and responsive styles
- `public/manifest.webmanifest`: PWA metadata
- `public/sw.js`: Runtime caching service worker

## Notes

- The user-facing interface is in Spanish.
- The interface can be switched at runtime through a custom accessible language picker in the header.
- The project uses a local `.npmrc` to prefer the official npm registry for consistent installs and audit support.
- There is currently no automated test suite; validation is done with `npm run build` and manual browser testing.

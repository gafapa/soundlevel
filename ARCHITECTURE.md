# Architecture

## Overview

SoundLevel is a client-side single-page application. There is no backend and no server-side rendering. Vite is only used as the development server and production bundler.

Production builds are emitted with the `/soundlevel/` base path so the generated HTML, bundled assets, manifest, and service worker resolve correctly when the app is hosted from that subdirectory.

## Runtime Flow

1. `index.html` loads the application shell and `src/main.js`.
2. `main.js` initializes the particle system, mascot controller, canvases, and UI event handlers.
3. When the user starts listening, `audio.js` requests microphone access and creates a Web Audio `AnalyserNode`.
4. The animation loop in `main.js` reads the current audio level, smooths it, resolves the active zone, and updates the meter, mascot, history chart, and streak counters.
5. The i18n layer in `i18n.js` resolves locale-specific copy and formatting for the selected language.
6. Thresholds, best streak, and language values are persisted in `localStorage`.
7. The service worker and web manifest enable installability and basic offline caching.

## Modules

### `src/main.js`

- Owns UI state and DOM wiring
- Starts and stops audio capture
- Applies threshold settings
- Controls the custom language picker and its keyboard interaction
- Updates the sound meter and history canvas
- Tracks streaks and milestone celebrations
- Handles settings dropdown interaction and keyboard dismissal

### `src/audio.js`

- Requests microphone access
- Creates and manages the `AudioContext`
- Reads time-domain data from the analyser
- Converts RMS values into a normalized 0-100 level

### `src/zones.js`

- Defines the four sound zones
- Stores threshold boundaries and styling metadata
- Exposes helpers for zone lookup

### `src/i18n.js`

- Stores the supported languages and translated UI copy
- Resolves browser language and saved language preference
- Provides localized zone messages, streak messages, and time formatting

### `src/mascot.js`

- Maps logical mascot states to CSS classes
- Updates mascot speech text with a small transition
- Runs periodic blinking behavior

### `src/particles.js`

- Renders ambient background particles
- Renders burst particles for streak milestones
- Resizes the full-screen particle canvas with the viewport

### `public/manifest.webmanifest`

- Declares install metadata, theme colors, display mode, and icons

### `public/sw.js`

- Caches the app shell and same-origin assets at runtime
- Provides a navigation fallback to the cached root document when offline

### `vite.config.js`

- Uses `/` during local development
- Uses `/soundlevel/` for production builds so static asset URLs and the manifest work under the deployed subpath

## State Persistence

- `soundlevel_thresholds`: Saved threshold values for the three configurable boundaries
- `soundlevel_best_streak`: Saved best streak across sessions
- `soundlevel_language`: Saved interface language across sessions

## Rendering Model

- The sound meter and history chart are drawn on `<canvas>` elements.
- The rest of the interface is DOM-driven and styled through CSS custom properties.
- Zone changes propagate through both JS state and `data-*` attributes for CSS-based theming.

## Accessibility

- Semantic sections and header structure in `index.html`
- `aria-live` regions for dynamic status updates
- Labeled language selector in the header
- `aria-expanded` and Escape handling for the settings panel
- Visible `:focus-visible` styles
- Reduced-motion support through CSS and milestone-particle suppression

## Operational Constraints

- The app only works in secure browser contexts that allow microphone access.
- Audio processing happens entirely in the browser and does not leave the device.
- Installability depends on serving the built app over HTTPS or `localhost`.
- The current validation workflow is build-based; there is no unit or E2E test automation yet.

# ØØØØØØØ — THE MOUTH OF THE VOID

> **transmission №7 · live from nowhere** — do not adjust your skull.

<img src="./docs/banner.png" alt="A neon magenta wireframe torus knot at the heart of the void, orbited by cyan, acid-green and white wireframe shards inside dashed occult sigil rings, with a starfield warping past on black." width="100%">

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-20b2aa?logo=threedotjs&logoColor=white)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![WebAudio](https://img.shields.io/badge/WebAudio-drone%20on%20request-84cc16?logo=googlechrome&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Content warning](https://img.shields.io/badge/content_warning-flashing%20·%20strobing%20·%20low--freq%20audio-ff3b3b)](#content-warning)

**The Mouth of the Void** is a fully client-side occult web experience: a WebGL void in which 1,500 stars rush past a neon torus knot, a self-multiplying popup hydra, a WebAudio chaos drone, and a five-notch **Chaos Dial** that raises every layer of regret at once. Roughly 1,300 lines of strict TypeScript. Zero backend, zero cookies, zero mercy.

## Contents

- [Content warning](#content-warning)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [What you will witness](#what-you-will-witness)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Artwork](#artwork)
- [Engineering notes](#engineering-notes)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Content warning

⚠ This site contains **flashing neon, strobing overlays, and geometry in motion**, plus optional low-frequency audio. It is not an accessibility oversight — the chaos is the point. It is also fully dialed:

- The **Chaos Dial** (bottom right) lowers every effect from V to I.
- **RECEIVE TRANSMISSION / SILENCE THE TRANSMISSION** toggles the drone.
- The whole show starts *behind a double-confirmed warning gate*, so nothing flashes before you consent twice.

Photosensitive visitors: the void understands.

## Quick start

```bash
git clone https://github.com/zazieproductions/hlkzkhmxdh-keh.git
cd hlkzkhmxdh-keh
npm install
npm run dev
```

- **Node.js ≥ 20.19 or ≥ 22.12** (Vite 7 requirement)
- Open <http://localhost:5173> and click **TAKE ME TO SAFETY** — exactly twice.
  The second click is the only way out.

> [!NOTE]
> The production build is a single static site with no environment variables. `npm run build` then `npm run preview` serves it locally; the `dist/` output can be dropped on any static host.

## Scripts

| Command             | What it does                                                                    |
| ------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR.                                             |
| `npm run build`     | Type-check (`tsc -b`) and produce a minified production build in `dist/`.       |
| `npm run preview`   | Serve the production build locally.                                             |
| `npm run lint`      | ESLint (flat config): `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`. |

## What you will witness

| # | Experience | Where it lives |
|---|------------|----------------|
| 1 | **The Gate** — a double-click cognito-hazard warning screen. The first click is a lie. | `src/components/WarningGate.tsx` |
| 2 | **The Void** — a three.js scene: 1,500-point warp starfield, a 200-segment wireframe torus knot (p=2, q=3) with a counter-rotating icosahedron cage, 16 orbiting wire shards, 8 floating eye sprites, exponential fog — all chaos-scaled, with a drifting, color-cycling camera. | `src/components/ThreeVoid.tsx` |
| 3 | **The Chaos Dial (I–V)** — one integer that drives strobe cadence, marquee speed, 3D velocity, and (at IV–V) full-screen shake. | `src/components/ControlDock.tsx` |
| 4 | **The Popup Hydra** — prophecy popups that spawn on a timer; 35 % are *hydra* and multiply when closed. Fed by a single `chaos:popup` custom event. | `src/components/PopupStorm.tsx` |
| 5 | **The Transmission** — five detuned oscillators (55–165 Hz, saw/square/sine/triangle) breathing through LFOs, plus random square-wave blips like a possessed modem. User-gesture gated, master gain 0.045. | `src/hooks/useDrone.ts` |
| 6 | **Glyph rain & scrambled headings** — a pooled stream of 50 neon glyphs follows your cursor; every heading perpetually rewrites itself through a 46-glyph alphabet; sigils are procedural SVG. | `CursorTrail.tsx` · `ScrambleText.tsx` · `SigilCircle.tsx` |
| 7 | **The Reliquary** — five relics, each with provenance. Touch nothing. Everything touches back. | `src/components/RelicGallery.tsx` |
| 8 | **Soul counter & the Sacred Webring** — a 9-digit odometer that cannot stop, and `◄ PREV` / `✦ RANDOM` / `NEXT ►` buttons, each of which delivers a prophecy instead of a link. | `src/components/VisitorCounter.tsx` · `src/App.tsx` |
| 9 | **Eternal construction** — a loading bar, stuck at 93 % since 1919, loading the absolute. | `src/App.tsx` |

## Architecture

**One state, one event bus.** The entire experience is a single `chaos: 1–5` value (one `useState` in `App.tsx`) plus a `chaos:popup` custom event. No router, no state library, no backend. Components read the chaos level through props and `useEffect`-scoped intervals; the 3D scene reads it through a ref so the render loop never re-renders React.

**Layered composition.** The page is a fixed-z stack, so the chaos can be reasoned about geometrically:

| z    | Layer                                   | Source          |
| ---- | --------------------------------------- | --------------- |
| 0    | WebGL void (behind everything)          | `ThreeVoid`     |
| 10   | Content: hero, prophecy, sky, reliquary | `App`           |
| 30   | Top & bottom prophecy marquees (`pointer-events: none`) | `MarqueeLayer` |
| 40   | “Eternal construction” banner           | `App`           |
| 55   | Neon strobe overlay (`pointer-events: none`) | `FlashOverlay` |
| 65   | Chaos Dial / transmission dock          | `ControlDock`   |
| 70   | Glyph rain, topmost (`pointer-events: none`) | `CursorTrail` |

**All copy lives in one file.** `src/lib/occult.ts` is the corpus: the 46-glyph alphabet, 12 marquee maxims, 12 popup titles, 12 popup bodies, 8 prophecy lines, and the 7-color neon palette. Everything else is rendering.

**Strict by default.** TypeScript project references (`tsconfig.app.json` / `tsconfig.node.json`) with `tsc -b` as the build gate, ESLint flat config, and no `any` anywhere in the occult.

## Tech stack

| Layer    | Technology                                                                 |
| -------- | -------------------------------------------------------------------------- |
| UI       | React 19.2 (StrictMode)                                                    |
| Language | TypeScript 5.9 (strict)                                                    |
| Build    | Vite 7.3                                                                   |
| Styling  | Tailwind CSS 4.2 (`@tailwindcss/vite`) + hand-rolled keyframes             |
| 3D       | three.js 0.185 (raw WebGL scene — no framework wrapper)                    |
| Audio    | Native WebAudio API (no libraries)                                         |
| Type     | VT323 (terminal) + UnifrakturMaguntia (blackletter occult) via Google Fonts |

## Project structure

```text
hlkzkhmxdh-keh/
├── index.html                 # entry document — the gate of the void
├── vite.config.ts             # react + tailwindcss plugins
├── eslint.config.js           # flat config: js, tseslint, react-hooks, react-refresh
├── tsconfig.json              # references app + node configs (strict)
├── docs/
│   └── banner.jpg             # README banner
└── src/
    ├── main.tsx               # createRoot(<StrictMode><App/></StrictMode>)
    ├── App.tsx                # composition root: gate → layered scene
    ├── index.css              # tailwind theme (2 fonts), keyframes, cursed scrollbar
    ├── lib/
    │   └── occult.ts          # the corpus: glyphs, prophecies, popups, neon palette
    ├── hooks/
    │   └── useDrone.ts        # WebAudio chaos drone (user-gesture gated)
    └── components/
        ├── WarningGate.tsx    # double-click cognito-hazard gate
        ├── ThreeVoid.tsx      # the WebGL void (three.js)
        ├── MarqueeLayer.tsx   # bidirectional prophecy marquees
        ├── CursorTrail.tsx    # neon glyph rain (pooled, capped at 50)
        ├── FlashOverlay.tsx   # chaos-scaled neon strobes
        ├── PopupStorm.tsx     # the self-multiplying popup hydra
        ├── ScrambleText.tsx   # headings that rewrite themselves
        ├── SigilCircle.tsx    # procedural SVG sigils
        ├── RunawayButton.tsx  # the button that dodges (surrenders after 6)
        ├── RelicGallery.tsx   # the reliquary (5 relics)
        ├── VisitorCounter.tsx # the soul odometer (never stops)
        └── ControlDock.tsx    # chaos dial I–V + transmission toggle
```

## Artwork

The experience expects local artwork under `public/`, which is **not committed** to this repository:

```text
public/
├── favicon.svg
└── images/
    ├── woodcut.png   # RELIC 01 — The Devouring Sun (also the prophecy panel)
    ├── sigil.png     # RELIC 02 — Seal of the Mouth
    ├── serpent.png   # RELIC 03 — OUROBOROS.SYS (still loading since 1919)
    ├── crow.jpg      # RELIC 04 — The Witness
    ├── eye.png       # RELIC 05 — The Weeping Eye (also the void's 8 eye sprites)
    └── storm.jpg     # the apocalyptic sky interstitial
```

Drop your own files in place and the reliquary, prophecy panel, sky interstitial, and the eye sprites inside the void all light up. Until then, the alt text carries the prophecy.

## Engineering notes

- **Bundle:** the production build is a single ~750 kB JS chunk (three.js is the bulk). If you need to split it, lazy-load `ThreeVoid` behind the gate — nothing 3D exists before the double click.
- **First paint is cheap:** the `WarningGate` renders before any WebGL, audio, or interval work is scheduled.
- **Cleanup is real:** every three.js geometry and material is disposed on unmount, animation frames are cancelled, and the pixel ratio is clamped at 1.75.
- **Accessibility posture:** every decorative layer is `aria-hidden`; the only interactive DOM is buttons that mean it. The warning gate is an explicit consent pattern for flashing content.
- **Fonts** load from the Google Fonts CDN; everything else is self-contained.

## Contributing

1. Fork, then branch: `git checkout -b ritual/your-change`
2. `npm run lint` and `npm run build` must both be green before you push.
3. TypeScript is strict — no `any` in the occult.
4. Adding an overlay? Respect the [z-index table](#architecture) and mark it `aria-hidden` if it is decorative.
5. Chaos is a feature. Respect it.

## Roadmap

- [ ] **Chaos level VI** — “the void compiles”
- [ ] A working webring (the previous site was consumed in 1999; you are standing in its ashes. Mind the embers.)
- [ ] A real visitor counter (the current one is lying, and always will be)
- [ ] Server: no

## License

> © 1919–∞ THE MOUTH OF THE VOID · best viewed with eyes closed · resolution 777×137 ·
> **no rights reserved, all rites reversed**
>
> webmaster: `lamb@the.gate` (replies in dreams only)

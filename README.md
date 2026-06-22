# 4K Remotion Website Promo Video Template

A modern, high-conversion website promo video template built using [Remotion](https://www.remotion.dev/) (React, TypeScript, CSS, and Tailwind). It renders in **4K Ultra HD** and is optimized for hardware acceleration.

This template is fully animated, timed to voiceover tracks, and includes synchronized cinematic sound effects.

## 🎥 Features
- **4K UHD Render-Ready:** Configured with double scale rendering (`scale(2)`) for high-fidelity outputs.
- **Dynamic Animations:**
  - **KineticText:** Smooth, staggered entry animations for punchy typography.
  - **GlowCard:** Glassmorphic cards with animated neon lasers tracing the borders (custom React-spring physics).
  - **Animated Phone Screens & Dashboard:** Dynamic charts with count-up animations.
  - **Animated Funnel:** A custom SVG traffic conversion funnel.
  - **Animated Neon Clock:** Fully responsive clock hands mapping key timestamps.
  - **Glitch Transitions:** Dynamic slide-change transitions.
- **Audio Syncing:** Native Remotion `Sequence` configurations syncing sound effect hits (clicks, whooshes, and stamps) frame-accurately with the voiceover track.

---

## 📁 Repository Structure
```text
├── README.md                      # This root README
├── LICENSE                        # Open-source License (MIT)
├── Website_Promo_Video.md         # Voiceover script with timing offsets
├── Website_Promo_Video.mp3        # Master voiceover audio file
├── Your-Website-Is-Losing-You-Customers.pptx  # Slide deck reference
└── promo-video/                   # Remotion project directory
    ├── public/                    # Static assets (images, sound effects)
    ├── src/                       # React components & Scene logic
    │   ├── components/            # Reusable UI elements (GlowCard, KineticText, etc.)
    │   ├── scenes/                # Scene-by-scene compositions (Scenes 1-6)
    │   └── Composition.tsx        # Main timeline sequencer & Audio tracks
    ├── remotion.config.ts         # Remotion render configuration (Tailwind, Scale)
    └── package.json               # NPM packages and scripts
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed.
- Ensure [FFmpeg](https://ffmpeg.org/) is installed on your system (required by Remotion for video encoding).
  - *macOS:* `brew install ffmpeg`
  - *Windows:* `choco install ffmpeg`

### 🔧 Installation
1. Clone this repository.
2. Navigate to the `promo-video` directory and install the dependencies:
   ```bash
   cd promo-video
   npm install
   ```

### 💻 Running the Preview Studio
Start the local Remotion Studio to preview and seek through the timeline interactively:
```bash
npm run dev
```
Open `http://localhost:3000` (or the port specified in your terminal) in your browser.

---

## 🎬 Rendering the Video

You can render the final MP4 video in 4K UHD. Run the following command inside the `promo-video/` directory:

```bash
npx remotion render src/index.ts PromoVideo out.mp4 --scale=2 --hardware-acceleration=if-possible --gl=angle
```

### Render Flags Explained:
- `--scale=2`: Scales the video resolution from 1080p to **4K UHD (3840x2160)**.
- `--hardware-acceleration=if-possible`: Employs native GPU encoding (such as macOS VideoToolbox) for rendering up to 5x faster.
- `--gl=angle`: Directs Headless Chromium to utilize local graphics acceleration.

The rendered file will be generated as `out.mp4` in the `promo-video/` directory.

---

## ⚙️ Customization

- **Timing & Text:** Edit `promo-video/src/constants.ts` to adjust scene frames and timings.
- **Colors & Styles:** Customize tailwind utilities or modify variables inside `promo-video/src/index.css`.
- **Replacing Assets:** Place your custom voiceover or sound effects in `promo-video/public/` and adjust timing sequences inside `promo-video/src/Composition.tsx`.

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).

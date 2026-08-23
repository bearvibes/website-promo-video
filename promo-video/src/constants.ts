export const COLOR_BG_START = '#060a16';
export const COLOR_BG_END = '#0c142c';
export const COLOR_CYAN = '#00d2ff';
export const COLOR_RED = '#ff003c';
export const COLOR_WHITE = '#ffffff';
export const COLOR_GRAY = '#8f9bb3';
export const COLOR_DARK_CARD = 'rgba(16, 30, 66, 0.4)';

export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 36;
export const VIDEO_TOTAL_FRAMES = 2775; // Extended by 60 frames (2 seconds at 30 fps) to hold the last frame and fade out

export const TIMINGS = {
  scene1: { start: 0, end: 518 },       // 0s - 17.27s (original 0 to 570)
  scene2: { start: 518, end: 873 },     // 17.27s - 29.1s (original 570 to 960)
  scene3: { start: 873, end: 1391 },    // 29.1s - 46.37s (original 960 to 1530)
  scene4: { start: 1391, end: 1773 },   // 46.37s - 59.1s (original 1530 to 1950)
  scene5: { start: 1773, end: 2264 },   // 59.1s - 75.47s (original 1950 to 2490)
  scene6: { start: 2264, end: 2775 },   // 75.47s - 92.5s (original 2490 to 2987, extended by 60f)
};

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import http from "http";

// Live status state for local HTTP dashboard server
let liveStatus = {
  renderedFrames: 0,
  totalFrames: 2775,
  progress: 0,
  status: "IDLE",
  elapsedSeconds: 0,
  remainingSeconds: 0,
  width: 1920,
  height: 1080,
  fps: 36,
  startTime: Date.now()
};

// Start a local status and dashboard HTTP server
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === "/status") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(liveStatus));
  } else {
    const htmlPath = path.join(process.cwd(), "scripts", "render-games-76-dashboard.html");
    if (fs.existsSync(htmlPath)) {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(fs.readFileSync(htmlPath, "utf8"));
    } else {
      res.writeHead(404);
      res.end("Dashboard HTML not found");
    }
  }
});

// Graceful EADDRINUSE handler if port 3005 is already active
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(" ⚠️ Port 3005 already active by another RenderGames76 process. Continuing render...");
  } else {
    console.error("Server error:", err);
  }
});

server.listen(3005, "0.0.0.0", () => {
  console.log(" 🌐 RenderGames76 Live Dashboard Server running at http://127.0.0.1:3005");
});

export function getResolutionStandard(width, height) {
  if (width === 1280 && height === 720) return "720p HD";
  if (width === 1920 && height === 1080) return "1080p Full HD";
  if (width === 2560 && height === 1440) return "1440p (2K QHD)";
  if (width === 2880 && height === 1620) return "3K UHD-";
  if (width === 3840 && height === 2160) return "2160p (4K UHD)";
  return `${width}x${height} (${height}p)`;
}

export const TECH_FACTS = [
  {
    fact: "In 1977, a 16KB Apple II computer cost $1,298 (~$6,500 today) and could only display 4 colors at 280x192 resolution. Today, your free cloud runner renders 2,073,600 pixels in 16.7 million colors 36 times every second!",
    url: "https://en.wikipedia.org/wiki/Apple_II"
  },
  {
    fact: "In 1976, the Cray-1 supercomputer cost $8.8M, weighed 5.5 tons, and processed 160 megaflops. A single cloud virtual machine rendering this Remotion video possesses over 500x the raw computing horsepower of Cray-1!",
    url: "https://en.wikipedia.org/wiki/Cray-1"
  },
  {
    fact: "H.264 vs H.265 (HEVC): Developed decades after early analog TV standards, H.265 delivers identical visual video quality to H.264 at half the bit rate, enabling 4K video over home Wi-Fi.",
    url: "https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding"
  },
  {
    fact: "AV1 Open-Source Codec: Designed by Google, Mozilla, and Netflix as a royalty-free successor to HEVC, yielding 30% better compression efficiency for streaming video.",
    url: "https://en.wikipedia.org/wiki/AV1"
  },
  {
    fact: "Headless Chromium Rendering: Remotion operates by running headless Chrome in the background. It renders React DOM elements to raw pixel frames via Puppeteer, then feeds them to FFmpeg.",
    url: "https://www.remotion.dev/docs/how-it-works"
  },
  {
    fact: "24 FPS vs 30 FPS vs 60 FPS: 24 FPS was chosen in 1926 for silent films adding sound because it was the minimum speed required for smooth audio synchronization on 35mm film stock.",
    url: "https://en.wikipedia.org/wiki/Frame_rate"
  },
  {
    fact: "Rec.709 vs Rec.2020: Standard HDTVs (Rec.709) render 16.7 million colors (8-bit), whereas modern HDR displays (Rec.2020) render over 1.07 billion colors (10-bit deep color).",
    url: "https://en.wikipedia.org/wiki/Rec._2020"
  },
  {
    fact: "Nixie Tubes (1955-1970s): Cold-cathode gas-discharge glass bulbs filled with neon gas. Each digit 0-9 is a separate wire mesh cathode element stacked inside the glass bulb that glows electric orange when activated.",
    url: "https://en.wikipedia.org/wiki/Nixie_tube"
  }
];

function renderProgressBar(percentage, length = 20) {
  const filled = Math.round((percentage / 100) * length);
  const empty = length - filled;
  return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
}

function formatNixieDigits(num, pad = 5) {
  const str = String(num).padStart(pad, "0");
  return str.split("").map((d) => `( ${d} )`).join(" ");
}

export async function runRenderGames76() {
  console.log("\n==========================================================================================");
  console.log(" 🕹️ RENDERGAMES76: 1970s CLOUD MAINFRAME & TECH HUB [1.2x SPEED MODE]");
  console.log("==========================================================================================\n");

  const entry = path.join(process.cwd(), "src", "index.ts");
  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outputFile = path.join(outDir, "video_1.2x.mp4");

  liveStatus.status = "BUNDLING";
  console.log(" [1/2] Bundling Remotion Assets...");
  const bundleLocation = await bundle({
    entryPoint: entry,
  });
  console.log(" [1/2] Bundling Complete! " + renderProgressBar(100) + " 100%\n");

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "PromoVideo",
  });

  const resStandard = getResolutionStandard(composition.width, composition.height);
  const totalFrames = composition.durationInFrames;
  const fps = composition.fps;

  liveStatus.totalFrames = totalFrames;
  liveStatus.width = composition.width;
  liveStatus.height = composition.height;
  liveStatus.fps = fps;
  liveStatus.status = "RENDERING";
  liveStatus.startTime = Date.now();

  console.log(` Output Resolution : ${composition.width}x${composition.height} (${resStandard})`);
  console.log(` Render Speed       : ${fps} FPS (1.2x Speed vs 30 FPS / 1.0x Reference)`);
  console.log(` Total Frames       : ${totalFrames} frames\n`);
  console.log("------------------------------------------------------------------------------------------");
  console.log(" 🚀 STARTING HEADLESS FRAME RENDER (1.2x SPEED)...");
  console.log("------------------------------------------------------------------------------------------\n");

  let lastLoggedTime = Date.now();
  let factIndex = 0;

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputFile,
    onProgress: ({ renderedFrames, progress }) => {
      const now = Date.now();
      const elapsed = Math.round((now - liveStatus.startTime) / 1000);
      const remaining = progress > 0 ? Math.round((elapsed / progress) - elapsed) : 0;

      liveStatus.renderedFrames = renderedFrames;
      liveStatus.progress = progress;
      liveStatus.elapsedSeconds = elapsed;
      liveStatus.remainingSeconds = remaining;

      if (now - lastLoggedTime >= 5000 || progress === 1) {
        lastLoggedTime = now;
        const percent = Math.round(progress * 100);
        const nixieFrames = formatNixieDigits(renderedFrames);
        const nixieTotal = formatNixieDigits(totalFrames);
        const currentFact = TECH_FACTS[factIndex % TECH_FACTS.length];
        factIndex++;

        console.log(` 🔮 NIXIE FRAME COUNTER: ${nixieFrames} / ${nixieTotal}`);
        console.log(` TASK PROGRESS        : ${renderProgressBar(percent, 25)} ${percent}% | ${renderedFrames}/${totalFrames} frames`);
        console.log(` 💡 TECH FACT (#${(factIndex - 1) % TECH_FACTS.length + 1}): ${currentFact.fact}`);
        console.log(`    🔗 Read more: ${currentFact.url}`);
        console.log("------------------------------------------------------------------------------------------");
      }
    },
  });

  liveStatus.status = "COMPLETE";
  liveStatus.progress = 1;
  liveStatus.renderedFrames = totalFrames;
  liveStatus.remainingSeconds = 0;

  console.log("\n==========================================================================================");
  console.log(" ✅ RENDERGAMES76 RENDER COMPLETE (1.2x SPEED)!");
  console.log(` Output File Saved : ${outputFile}`);
  console.log("==========================================================================================\n");

  setTimeout(() => server.close(), 60000);
}

if (process.argv[1].endsWith("render-games-76.mjs")) {
  runRenderGames76().catch((err) => {
    console.error("Render error:", err);
    process.exit(1);
  });
}

/* eslint-disable @remotion/no-object-fit-on-media-video */
import { useState, useEffect } from "react";
import {
  Sequence,
  Audio,
  Video,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { TIMINGS } from "./constants";
import { GlitchTransition } from "./components/GlitchTransition";
import { CameraRig } from "./components/CameraRig";
import { DynamicBackground } from "./components/DynamicBackground";

// Scenes
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";

const SPEAKING_INTERVALS = [
  [0, 418], // Scene 1 first phases + failed climax
  [518, 845], // Scene 2 ads/SEO/referrals + sitting there
  [873, 1364], // Scene 3 doesn't just look professional, it works, captures leads...
  [1391, 1500], // Scene 4 Slide 1
  [1527, 1609], // Scene 4 Slide 2
  [1636, 1745], // Scene 4 Slide 3
  [1773, 1991], // Scene 5 Phase 1 & 2 (winning today, converting more)
  [2264, 2715], // Scene 6 asking questions + final CTA
];

const AudioLayer: React.FC = () => {
  const getBgmVolume = (f: number) => {
    let baseVolume = 0.22;
    const isSpeaking = SPEAKING_INTERVALS.some(
      ([start, end]) => f >= start && f <= end,
    );
    if (isSpeaking) {
      let minDistanceToSilence = Infinity;
      for (const [start, end] of SPEAKING_INTERVALS) {
        if (f >= start && f <= end) {
          const dist = Math.min(f - start, end - f);
          if (dist < minDistanceToSilence) {
            minDistanceToSilence = dist;
          }
        }
      }
      baseVolume = interpolate(minDistanceToSilence, [0, 15], [0.22, 0.07], {
        extrapolateRight: "clamp",
      });
    } else {
      let minDistanceToSpeaking = Infinity;
      for (const [start, end] of SPEAKING_INTERVALS) {
        const dist = Math.min(Math.abs(f - start), Math.abs(f - end));
        if (dist < minDistanceToSpeaking) {
          minDistanceToSpeaking = dist;
        }
      }
      baseVolume = interpolate(minDistanceToSpeaking, [0, 15], [0.07, 0.22], {
        extrapolateRight: "clamp",
      });
    }

    // Smooth BGM fade curves
    const fadeInFactor = interpolate(f, [0, 45], [0, 1], {
      extrapolateRight: "clamp",
    });
    const fadeOutFactor = interpolate(f, [2685, 2775], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return baseVolume * fadeInFactor * fadeOutFactor;
  };

  return (
    <>
      {/* Voiceover Track - Segmented & tightened to run at 1.1x speed */}
      <Sequence durationInFrames={200}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} playbackRate={1.1} />
      </Sequence>
      <Sequence from={200} durationInFrames={32}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} trimBefore={264} playbackRate={1.1} />
      </Sequence>
      <Sequence from={232} durationInFrames={27}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} trimBefore={323} playbackRate={1.1} />
      </Sequence>
      <Sequence from={259} durationInFrames={82}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} trimBefore={360} playbackRate={1.1} />
      </Sequence>
      <Sequence from={341} durationInFrames={78}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} trimBefore={458} playbackRate={1.1} />
      </Sequence>
      <Sequence from={518}>
        <Audio src={staticFile("audio.mp3")} volume={1.0} trimBefore={562} playbackRate={1.1} />
      </Sequence>
      {/* Background Music (BGM) - Dynamic ducking volume based on voiceover timing */}
      <Audio src={staticFile("bgm.mp3")} volume={getBgmVolume} loop />
      {/* Transition Whooshes (triggered 3 frames before each whip pan) */}
      <Sequence from={TIMINGS.scene1.end - 3}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={TIMINGS.scene2.end - 3}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={TIMINGS.scene3.end - 3}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={TIMINGS.scene4.end - 3}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={TIMINGS.scene5.end - 3}>
        <Audio src={staticFile("whoosh.mp3")} volume={0.3} />
      </Sequence>
      {/* Synchronized SFX Hits on heavy stamps & graphic reveals */}
      {/* Scene 1 stamps - Text Reveals (Swoosh Hit) */}
      <Sequence from={136}>
        <Audio src={staticFile("hit.mp3")} volume={0.4} />
      </Sequence>
      <Sequence from={177}>
        <Audio src={staticFile("hit.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={205}>
        <Audio src={staticFile("hit.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={235}>
        <Audio src={staticFile("hit.mp3")} volume={0.45} />
      </Sequence>
      <Sequence from={382}>
        <Audio src={staticFile("hit.mp3")} volume={0.6} />
      </Sequence>
      {/* Scene 2 expensive climax & card reveals */}
      <Sequence from={573}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* Paid Ads card - Click */}
      </Sequence>
      <Sequence from={600}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* SEO & Social card - Click */}
      </Sequence>
      <Sequence from={627}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* Referrals card - Click */}
      </Sequence>
      <Sequence from={845}>
        <Audio src={staticFile("hit.mp3")} volume={0.6} />{" "}
        {/* THAT'S EXPENSIVE - Swoosh Hit */}
      </Sequence>
      {/* Scene 3 feature highlights & banner reveal */}
      <Sequence from={989}>
        <Audio src={staticFile("hit.mp3")} volume={0.5} />{" "}
        {/* IT WORKS - Swoosh Hit */}
      </Sequence>
      <Sequence from={1071}>
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Captures Leads - Click */}
      </Sequence>
      <Sequence from={1112}>
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Tracks Behavior - Click */}
      </Sequence>
      <Sequence from={1153}>
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Automates Follow-up - Click */}
      </Sequence>
      <Sequence
        from={1193}
        style={{
          translate: "10.6px 1.4px",
        }}
      >
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Books Appointments - Click */}
      </Sequence>
      <Sequence from={1248}>
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Answers Instantly - Click */}
      </Sequence>
      <Sequence from={1289}>
        <Audio src={staticFile("click.mp3")} volume={0.2} />{" "}
        {/* Turns Traffic Banner - Click */}
      </Sequence>
      {/* Scene 4 image/clock highlights */}
      <Sequence from={1427}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* +100% conversion pill - Click */}
      </Sequence>
      <Sequence from={1564}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* Dashboard panel - Click */}
      </Sequence>
      <Sequence from={1673}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* Neon clock - Click */}
      </Sequence>
      {/* Scene 5 Website vs System split & indicator beats */}
      <Sequence from={1827}>
        <Audio src={staticFile("hit.mp3")} volume={0.4} />{" "}
        {/* SPENDING MORE - Swoosh Hit */}
      </Sequence>
      <Sequence from={1909}>
        <Audio src={staticFile("hit.mp3")} volume={0.4} />{" "}
        {/* CONVERTING - Swoosh Hit */}
      </Sequence>
      <Sequence from={1936}>
        <Audio src={staticFile("hit.mp3")} volume={0.4} />{" "}
        {/* ALREADY HAVE - Swoosh Hit */}
      </Sequence>
      <Sequence from={1991}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* Split reveal - Click */}
      </Sequence>
      <Sequence from={2155}>
        <Audio src={staticFile("click.mp3")} volume={0.22} />{" "}
        {/* Card 1: Builds Trust - Click */}
      </Sequence>
      <Sequence from={2182}>
        <Audio src={staticFile("click.mp3")} volume={0.22} />{" "}
        {/* Card 2: Captures Leads - Click */}
      </Sequence>
      <Sequence from={2236}>
        <Audio src={staticFile("click.mp3")} volume={0.22} />{" "}
        {/* Card 3: Grows 24/7 - Click */}
      </Sequence>
      {/* Scene 6 question splits & final CTA climax */}
      <Sequence from={2291}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* MAKING MONEY? - Click */}
      </Sequence>
      <Sequence from={2482}>
        <Audio src={staticFile("click.mp3")} volume={0.25} />{" "}
        {/* COSTING MONEY? - Click */}
      </Sequence>
      <Sequence from={2673}>
        <Audio src={staticFile("hit.mp3")} volume={0.7} />{" "}
        {/* LET'S TALK text - Swoosh Hit */}
      </Sequence>
      <Sequence from={2691}>
        <Audio src={staticFile("click.mp3")} volume={0.3} />{" "}
        {/* BOOK A CALL button - Click */}
      </Sequence>
    </>
  );
};

export const PromoVideoComposition: React.FC = () => {
  const [hasVideoBg, setHasVideoBg] = useState(false);
  const frame = useCurrentFrame();

  useEffect(() => {
    fetch(staticFile("background.mp4"), { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHasVideoBg(true);
        }
      })
      .catch(() => {});
  }, []);

  // Compute video fade-in (frames 0-30) and fade-out (frames 2745-2775)
  const overlayOpacity = (() => {
    if (frame < 30) {
      return interpolate(frame, [0, 30], [1, 0], {
        extrapolateRight: "clamp",
      });
    }
    if (frame > 2745) {
      return interpolate(frame, [2745, 2775], [0, 1], {
        extrapolateLeft: "clamp",
      });
    }
    return 0;
  })();

  return (
    <div className="video-bg">
      {/* 1. Background Layer: Custom Video Background at extremely low opacity + foreground Canvas Particles */}
      {hasVideoBg && (
        <Video
          src={staticFile("background.mp4")}
          volume={0}
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.05,
            filter: "contrast(110%) brightness(70%) blur(2px)",
          }}
        />
      )}
      <DynamicBackground />
      {/* Faint ambient radial glows */}
      <div className="radial-glow-blue" style={{ top: -100, left: -100 }} />
      <div className="radial-glow-red" style={{ bottom: -100, right: -100 }} />
      {/* 2. Audio Layering System */}
      <AudioLayer />
      {/* 3. Camera Rig Wrapper controlling pans, zooms, and shakes */}
      <CameraRig>
        {/* Scene Sequences */}
        <Sequence
          from={TIMINGS.scene1.start}
          durationInFrames={TIMINGS.scene1.end - TIMINGS.scene1.start}
        >
          <Scene1 />
        </Sequence>

        <Sequence
          from={TIMINGS.scene2.start}
          durationInFrames={TIMINGS.scene2.end - TIMINGS.scene2.start}
        >
          <Scene2 />
        </Sequence>

        <Sequence
          from={TIMINGS.scene3.start}
          durationInFrames={TIMINGS.scene3.end - TIMINGS.scene3.start}
        >
          <Scene3 />
        </Sequence>

        <Sequence
          from={TIMINGS.scene4.start}
          durationInFrames={TIMINGS.scene4.end - TIMINGS.scene4.start}
        >
          <Scene4 />
        </Sequence>

        <Sequence
          from={TIMINGS.scene5.start}
          durationInFrames={TIMINGS.scene5.end - TIMINGS.scene5.start}
        >
          <Scene5 />
        </Sequence>

        <Sequence
          from={TIMINGS.scene6.start}
          durationInFrames={TIMINGS.scene6.end - TIMINGS.scene6.start}
        >
          <Scene6 />
        </Sequence>
      </CameraRig>
      {/* Glitch Transitions overlayed at scene cuts */}
      <GlitchTransition changeFrame={TIMINGS.scene1.end} />
      <GlitchTransition changeFrame={TIMINGS.scene2.end} />
      <GlitchTransition changeFrame={TIMINGS.scene3.end} />
      <GlitchTransition changeFrame={TIMINGS.scene4.end} />
      <GlitchTransition changeFrame={TIMINGS.scene5.end} />

      {/* Global Black Overlay for smooth Video Fade-in & Fade-out */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          zIndex: 1000,
          pointerEvents: "none",
          opacity: overlayOpacity,
        }}
      />
    </div>
  );
};

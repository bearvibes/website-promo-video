import "./index.css";
import { Composition } from "remotion";
import { PromoVideoComposition } from "./Composition";
import { VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS, VIDEO_TOTAL_FRAMES } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideoComposition}
        durationInFrames={VIDEO_TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};

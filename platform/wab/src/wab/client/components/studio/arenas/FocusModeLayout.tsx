import { CanvasFrame } from "@/wab/client/components/canvas/CanvasFrame";
import { CanvasCtx } from "@/wab/client/components/canvas/canvas-ctx";
import { StudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { FocusedDedicatedArena } from "@/wab/shared/Arenas";
import { ArenaFrame } from "@/wab/shared/model/classes";
import { observer } from "mobx-react";
import React from "react";

export const FocusModeLayout = observer(function FocusModeLayout(props: {
  studioCtx: StudioCtx;
  arena: FocusedDedicatedArena;
  onFrameLoad: (frame: ArenaFrame, canvasCtx: CanvasCtx) => void;
}) {
  const { studioCtx, onFrameLoad, arena } = props;
  return (
    <CanvasFrame
      studioCtx={studioCtx}
      arena={arena}
      key={arena._focusedFrame.uid}
      onFrameLoad={onFrameLoad}
      arenaFrame={arena._focusedFrame}
      isFree={false}
    />
  );
});

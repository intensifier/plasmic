import { maybeShowContextMenu } from "@/wab/client/components/ContextMenu";
import styles from "@/wab/client/components/canvas/CanvasFrame/CanvasFrame.module.scss";
import { makeFrameMenu } from "@/wab/client/components/frame-menu";
import { getGlobalCssVariableValue } from "@/wab/client/components/studio/GlobalCssVariables";
import { Icon } from "@/wab/client/components/widgets/Icon";
import { useScaledElementRef } from "@/wab/client/hooks/useScaledElementRef";
import PlasmicIcon__Frame from "@/wab/client/plasmic/plasmic_kit/PlasmicIcon__Frame";
import { useStudioCtx } from "@/wab/client/studio-ctx/StudioCtx";
import { ArenaFrame } from "@/wab/shared/model/classes";
import { gridSpacing, hoverBoxTagHeight } from "@/wab/styles/css-variables";
import cn from "classnames";
import { observer } from "mobx-react";
import * as React from "react";

export const CanvasArtboardSelectionHandle = observer(
  function CanvasArtboardSelectionHandle_({
    frame,
    onClick,
  }: {
    frame: ArenaFrame;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  }) {
    const studioCtx = useStudioCtx();
    const stopClickPropagation = React.useCallback(
      (e?: React.MouseEvent<HTMLElement>) => e?.stopPropagation(),
      []
    );
    const hoverBoxObj = studioCtx.hoverBoxControlledObj;
    const isFocused = hoverBoxObj === frame;
    const isProminent =
      !isFocused && studioCtx.focusedViewCtx()?.arenaFrame() === frame;
    const _gridSpacing = parseInt(getGlobalCssVariableValue(gridSpacing));
    const _hoverBoxTagHeight = parseInt(
      getGlobalCssVariableValue(hoverBoxTagHeight)
    );

    const minZoom = isFocused ? 0 : _hoverBoxTagHeight / _gridSpacing;

    const rootRef = useScaledElementRef<HTMLDivElement>({
      minZoom: minZoom,
    });

    const handleContextMenu = (e) => {
      onClick(e);

      const viewCtx = studioCtx.focusedViewCtx();

      if (viewCtx) {
        const menu = makeFrameMenu({ viewCtx, frame });
        maybeShowContextMenu(e.nativeEvent, menu);
      }
    };

    return (
      <div
        ref={rootRef}
        className={cn(styles.artboardSelectionHandle, {
          [styles.artboardSelectionHandle_prominent]: isProminent,
          [styles.artboardSelectionHandle_focused]: isFocused,
        })}
        onContextMenu={handleContextMenu}
        onMouseDown={onClick}
        onClick={stopClickPropagation}
      >
        <Icon icon={PlasmicIcon__Frame} />
      </div>
    );
  }
);

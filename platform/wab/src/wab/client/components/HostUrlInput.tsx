import * as React from "react";
import {
  DefaultHostUrlInputProps,
  PlasmicHostUrlInput,
  PlasmicHostUrlInput__OverridesType,
} from "@/wab/client/plasmic/plasmic_kit_dashboard/PlasmicHostUrlInput";

interface HostUrlInputProps
  extends DefaultHostUrlInputProps,
    PlasmicHostUrlInput__OverridesType {}

function HostUrlInput(props: HostUrlInputProps) {
  return <PlasmicHostUrlInput {...props} />;
}

export default HostUrlInput;

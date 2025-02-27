import { ComponentPropsSection } from "@/wab/client/components/sidebar-tabs/ComponentPropsSection";
import { TplExpsProvider } from "@/wab/client/components/style-controls/StyleComponent";
import { RepeaterPropsTooltip } from "@/wab/client/components/widgets/DetailedTooltips";
import { LabelWithDetailedTooltip } from "@/wab/client/components/widgets/LabelWithDetailedTooltip";
import { ViewCtx } from "@/wab/client/studio-ctx/view-ctx";
import { assert } from "@/wab/shared/common";
import { isKnownTplComponent, TplNode } from "@/wab/shared/model/classes";
import { observer } from "mobx-react";
import React from "react";

export const RepeaterSection = observer(function (props: {
  tpl: TplNode;
  viewCtx: ViewCtx;
}) {
  const { tpl, viewCtx } = props;

  assert(
    isKnownTplComponent(tpl.parent),
    "RepeaterSection should only be used in children of Repeater components"
  );

  return (
    <ComponentPropsSection
      viewCtx={viewCtx}
      tpl={tpl.parent}
      customTitle={
        <LabelWithDetailedTooltip tooltip={<RepeaterPropsTooltip />}>
          Repeater Props
        </LabelWithDetailedTooltip>
      }
      expsProvider={new TplExpsProvider(viewCtx, tpl.parent)}
      tab="settings"
    />
  );
});

import type { PropType } from "@plasmicapp/host";
import { Collapse } from "antd";
import uniqueId from "lodash/uniqueId";
import React, { useMemo } from "react";
import { Registerable, registerComponentHelper } from "./utils";

export const singleCollapseComponentName = "plasmic-antd5-single-collapse";
export const accordionComponentName = "plasmic-antd5-collapse";
export const accordionItemComponentName = "plasmic-antd5-collapse-item";

type AccordionItemType = NonNullable<
  React.ComponentProps<typeof Collapse>["items"]
>[number];

type SingleCollapseProps = Omit<
  React.ComponentProps<typeof Collapse>,
  "items" | "activeKey" | "defaultActiveKey" | "expandIcon" | "accordion"
> &
  AccordionItemType & {
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    expandIcon?: React.ReactElement;
    rotateCustomExpandIcon: boolean;
    children: React.ReactElement;
    label2: React.ReactElement; // For backwards compatibility
  };

export function AntdAccordionItem({ children }: AccordionItemType) {
  return <div>{children}</div>;
}

export function AntdAccordion(
  props: Omit<
    React.ComponentProps<typeof Collapse>,
    "items" | "activeKey" | "defaultActiveKey" | "expandIcon" | "accordion"
  > & {
    items: { props: { children: React.ReactElement<AccordionItemType>[] } };
    defaultActiveKey?: string;
    activeKey?: string;
    disabled?: boolean;
    expandIcon?: React.ReactElement;
    rotateCustomExpandIcon: boolean;
  }
) {
  const {
    items: itemsRaw,
    activeKey,
    defaultActiveKey,
    expandIcon,
    collapsible,
    disabled,
    rotateCustomExpandIcon,
    ...rest
  } = props;

  const items: AccordionItemType[] = useMemo(() => {
    if (!React.isValidElement(itemsRaw) && !Array.isArray(itemsRaw)) return [];
    return (
      Array.isArray(itemsRaw)
        ? itemsRaw
        : Array.isArray(itemsRaw.props.children)
        ? itemsRaw.props.children
        : [itemsRaw.props.children]
    )
      .map((currentItem) => {
        const props = {
          ...currentItem.props,
          id: currentItem.props.id,
          key: currentItem.props.id,
          children: React.cloneElement(<>{currentItem.props.children}</>),
        };
        if (currentItem.props.label) {
          // The old `label` prop takes precedence, delete label2
          delete (props as any).label2;
        } else {
          // Keep `label2` so the `hidden` function knows it's used
          props.label = (props as any).label2;
        }

        return props;
      })
      .filter((i) => i != null) as AccordionItemType[];
  }, [itemsRaw]);

  return (
    <Collapse
      accordion
      items={items}
      defaultActiveKey={defaultActiveKey}
      activeKey={activeKey}
      collapsible={disabled ? "disabled" : collapsible}
      expandIcon={
        expandIcon
          ? ({ isActive }) => (
              <div
                style={
                  isActive && rotateCustomExpandIcon
                    ? { transform: "rotate(90deg)" }
                    : undefined
                }
              >
                {expandIcon}
              </div>
            )
          : undefined
      }
      {...rest}
    />
  );
}

export function AntdSingleCollapse(props: SingleCollapseProps) {
  const {
    open,
    defaultOpen,
    expandIcon,
    collapsible,
    disabled,
    rotateCustomExpandIcon,
    label: oldLabelProp,
    label2: newLabelProp,
    showArrow,
    extra,
    forceRender,
    children,
    headerClass,
    ...rest
  } = props;

  const label = oldLabelProp ?? newLabelProp;
  const defaultItemKey = useMemo(() => uniqueId(), []);

  const item = useMemo(
    () => ({
      key: defaultItemKey,
      label,
      showArrow,
      extra: <>{extra}</>,
      headerClass,
      children,
    }),
    [label, showArrow, extra, children, defaultItemKey, headerClass]
  );

  return (
    <Collapse
      accordion={false}
      items={[item]}
      defaultActiveKey={defaultOpen ? item.key : undefined}
      activeKey={open ? item.key : undefined}
      collapsible={disabled ? "disabled" : collapsible}
      expandIcon={
        expandIcon
          ? ({ isActive }) => (
              <div
                style={
                  isActive && rotateCustomExpandIcon
                    ? { transform: "rotate(90deg)" }
                    : undefined
                }
              >
                {expandIcon}
              </div>
            )
          : undefined
      }
      {...rest}
    />
  );
}

export const accordionHelpers = {
  states: {
    activePanelId: {
      onChangeArgsToValue: (activeKeys: string[]) => activeKeys[0],
    },
  },
};

export const singleCollapseHelpers = {
  states: {
    open: {
      onChangeArgsToValue: (activeKeys: string[]) => activeKeys.length > 0,
    },
  },
};

const commonAccordionProps: Record<string, PropType<any>> = {
  bordered: {
    type: "boolean",
    defaultValue: true,
    description: `Display border around accordion `,
  },
  disabled: {
    type: "boolean",
    description: "Disable the toggle behaviour of panels",
  },
  expandIcon: {
    type: "slot",
    hidePlaceholder: true,
  },
  rotateCustomExpandIcon: {
    type: "boolean",
    description: "Enable rotation of custom expand icon when panel is expanded",
    advanced: true,
    hidden: (ps) => !ps.expandIcon,
  },
  expandIconPosition: {
    type: "choice",
    defaultValueHint: "start",
    description: `Set expand icon position`,
    options: ["start", "end"],
  },
  ghost: {
    type: "boolean",
    description: `Make the accordion borderless and its background transparent`,
  },
  size: {
    type: "choice",
    defaultValueHint: "middle",
    description: `Set the size of accordion`,
    options: ["large", "middle", "small"],
  },
  onChange: {
    type: "eventHandler",
    argTypes: [{ name: "activeIds", type: "object" }],
  },
};

const commonAccordionItemProps: Record<string, PropType<any>> = {
  label: {
    type: "string",
    displayName: "Header Content",
    description: "Text inside the header",
    hidden: (props) =>
      props.label != null
        ? false
        : props?.label2 !== undefined || props?.header === undefined,
  },
  label2: {
    type: "slot",
    displayName: "Header Content",
    defaultValue: "Collapse Header",
    hidePlaceholder: true,
    hidden: (props) =>
      props.label != null
        ? true
        : props?.label2 === undefined && props?.header !== undefined,
  },
  extra: {
    type: "slot",
    hidePlaceholder: true,
  },
  showArrow: {
    type: "boolean",
    defaultValue: true,
    description: `Whether to show animating arrow alongside header text`,
    advanced: true,
  },
  headerClass: {
    type: "class",
    displayName: "Header",
  },
  children: {
    type: "slot",
    hidePlaceholder: true,
    ...({ mergeWithParent: true } as any),
    defaultValue: "Collapsible text...",
  },
};

const commonProps: Record<string, PropType<any>> = {
  collapsible: {
    displayName: "Toggle Area",
    type: "choice",
    defaultValueHint: "header",
    description: `Specify the element that can be clicked to toggle a panel`,
    options: ["header", "icon"],
    advanced: true,
    hidden: (ps) => Boolean(ps.disabled),
  },
  destroyInactivePanel: {
    type: "boolean",
    description: `Destroy/Unmount panel if inactive`,
    advanced: true,
  },
  forceRender: {
    type: "boolean",
    description: `Force rendering of content in the panel, instead of lazy rendering it.`,
    advanced: true,
  },
};

export function registerCollapse(loader?: Registerable) {
  registerComponentHelper(loader, AntdSingleCollapse, {
    name: singleCollapseComponentName,
    displayName: "Collapse",
    description: "Accordion, but with a single collapsible block.",
    defaultStyles: {
      width: "stretch",
    },
    props: {
      open: {
        editOnly: true,
        displayName: "Open",
        uncontrolledProp: "defaultOpen",
        type: "boolean",
        description: `Default open state of the collapse block`,
      },
      ...commonProps,
      ...commonAccordionItemProps,
      ...commonAccordionProps,
    },
    states: {
      open: {
        type: "writable",
        valueProp: "open",
        onChangeProp: "onChange",
        variableType: "boolean",
        ...singleCollapseHelpers.states.open,
      },
    },
    componentHelpers: {
      helpers: singleCollapseHelpers,
      importName: "singleCollapseHelpers",
      importPath: "@plasmicpkgs/antd5/skinny/registerCollapse",
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerCollapse",
    importName: "AntdSingleCollapse",
  });

  registerComponentHelper(loader, AntdAccordion, {
    name: accordionComponentName,
    displayName: "Accordion",
    defaultStyles: {
      width: "stretch",
    },
    props: {
      activeKey: {
        editOnly: true,
        displayName: "Active panel ID",
        uncontrolledProp: "defaultActiveKey",
        type: "string",
        description: `ID of Accordion item that is expanded by default.`,
        advanced: true,
      },
      items: {
        type: "slot",
        hidePlaceholder: true,
        allowedComponents: [accordionItemComponentName],
        ...({ mergeWithParent: true } as any),
        defaultValue: [
          {
            type: "component",
            name: accordionItemComponentName,
            props: {
              id: 1,
              label2: {
                type: "text",
                value: "First Item",
              },
              children: {
                type: "text",
                value: "First Children",
              },
            },
          },
          {
            type: "component",
            name: accordionItemComponentName,
            props: {
              id: 2,
              label2: {
                type: "text",
                value: "Second Item",
              },
              children: {
                type: "text",
                value: "Second Children",
              },
            },
          },
        ],
      },
      ...commonProps,
      ...commonAccordionProps,
    },
    states: {
      activePanelId: {
        type: "writable",
        valueProp: "activeKey",
        onChangeProp: "onChange",
        variableType: "text",
        ...accordionHelpers.states.activePanelId,
      },
    },
    componentHelpers: {
      helpers: accordionHelpers,
      importName: "accordionHelpers",
      importPath: "@plasmicpkgs/antd5/skinny/registerCollapse",
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerCollapse",
    importName: "AntdAccordion",
  });

  registerComponentHelper(loader, AntdAccordionItem, {
    name: accordionItemComponentName,
    displayName: "Accordion Item",
    props: {
      id: {
        type: "string",
        description: `Unique identifier for this item`,
        required: true,
      },
      ...commonProps,
      ...commonAccordionItemProps,
    },
    importPath: "@plasmicpkgs/antd5/skinny/registerCollapse",
    importName: "AntdAccordionItem",
    parentComponentName: accordionComponentName,
  });
}

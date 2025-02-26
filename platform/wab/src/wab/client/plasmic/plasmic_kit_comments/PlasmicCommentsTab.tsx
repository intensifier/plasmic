// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: BP7V3EkXPURJVwwMyWoHn
// Component: bV6LLO0B3Y
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from "@plasmicapp/react-web";
import Button from "../../components/widgets/Button"; // plasmic-import: SEF-sRmSoqV5c/component
import CommentPostForm from "../../components/comments/CommentPostForm"; // plasmic-import: qi3Y1X2qZ7/component
import CommentPost from "../../components/comments/CommentPost"; // plasmic-import: l_AKXl2AAu/component
import ListSectionSeparator from "../../components/ListSectionSeparator"; // plasmic-import: uG5_fPM0sK/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_plasmic_kit_design_system_css from "../PP__plasmickit_design_system.module.css"; // plasmic-import: tXkSR39sgCDWSitZxC5xFV/projectcss
import plasmic_plasmic_kit_color_tokens_css from "../plasmic_kit_q_4_color_tokens/plasmic_plasmic_kit_q_4_color_tokens.module.css"; // plasmic-import: 95xp9cYcv7HrNWpFWWhbcv/projectcss
import projectcss from "./plasmic_plasmic_kit_comments.module.css"; // plasmic-import: BP7V3EkXPURJVwwMyWoHn/projectcss
import sty from "./PlasmicCommentsTab.module.css"; // plasmic-import: bV6LLO0B3Y/css

import ArrowRightsvgIcon from "../q_4_icons/icons/PlasmicIcon__ArrowRightsvg"; // plasmic-import: 9Jv8jb253/icon
import ChevronDownsvgIcon from "../q_4_icons/icons/PlasmicIcon__ChevronDownsvg"; // plasmic-import: xZrB9_0ir/icon

export type PlasmicCommentsTab__VariantMembers = {
  emptySelection: "emptySelection";
};

export type PlasmicCommentsTab__VariantsArgs = {
  emptySelection?: SingleBooleanChoiceArg<"emptySelection">;
};

type VariantPropType = keyof PlasmicCommentsTab__VariantsArgs;
export const PlasmicCommentsTab__VariantProps = new Array<VariantPropType>(
  "emptySelection"
);

export type PlasmicCommentsTab__ArgsType = {};
type ArgPropType = keyof PlasmicCommentsTab__ArgsType;
export const PlasmicCommentsTab__ArgProps = new Array<ArgPropType>();

export type PlasmicCommentsTab__OverridesType = {
  root?: p.Flex<"div">;
  currentSelectionSection?: p.Flex<"div">;
  freeBox?: p.Flex<"div">;
  notificationsButton?: p.Flex<typeof Button>;
  currentlySelectedTitle?: p.Flex<"div">;
  currentlySelectedPrefix?: p.Flex<"span">;
  currentlySelectedSubject?: p.Flex<"span">;
  newThreadForm?: p.Flex<typeof CommentPostForm>;
  currentThreadsList?: p.Flex<"div">;
  listSectionSeparator?: p.Flex<typeof ListSectionSeparator>;
  restThreadsSection?: p.Flex<"div">;
  text?: p.Flex<"div">;
  restThreadsList?: p.Flex<"div">;
};

export interface DefaultCommentsTabProps {
  emptySelection?: SingleBooleanChoiceArg<"emptySelection">;
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicCommentsTab__RenderFunc(props: {
  variants: PlasmicCommentsTab__VariantsArgs;
  args: PlasmicCommentsTab__ArgsType;
  overrides: PlasmicCommentsTab__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(
    () =>
      Object.assign(
        {},

        props.args
      ),

    [props.args]
  );

  const $props = {
    ...args,
    ...variants,
  };

  const currentUser = p.useCurrentUser?.() || {};

  const stateSpecs = React.useMemo(
    () => [
      {
        path: "emptySelection",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ($props, $state, $ctx) => $props.emptySelection
          : undefined,
      },
    ],

    [$props, $ctx]
  );

  const $state = p.useDollarState(stateSpecs, $props, $ctx);

  const [$queries, setDollarQueries] = React.useState({});

  return (
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        plasmic_plasmic_kit_design_system_css.plasmic_tokens,
        plasmic_plasmic_kit_color_tokens_css.plasmic_tokens,
        sty.root,
        {
          [sty.rootemptySelection]: hasVariant(
            $state,
            "emptySelection",
            "emptySelection"
          ),
        }
      )}
    >
      {true ? (
        <div
          data-plasmic-name={"currentSelectionSection"}
          data-plasmic-override={overrides.currentSelectionSection}
          className={classNames(projectcss.all, sty.currentSelectionSection)}
        >
          <div
            data-plasmic-name={"freeBox"}
            data-plasmic-override={overrides.freeBox}
            className={classNames(projectcss.all, sty.freeBox)}
          >
            <Button
              data-plasmic-name={"notificationsButton"}
              data-plasmic-override={overrides.notificationsButton}
              className={classNames("__wab_instance", sty.notificationsButton)}
              type={["link"]}
            >
              {"Notifications: all"}
            </Button>
          </div>

          <div
            data-plasmic-name={"currentlySelectedTitle"}
            data-plasmic-override={overrides.currentlySelectedTitle}
            className={classNames(
              projectcss.all,
              projectcss.__wab_text,
              sty.currentlySelectedTitle
            )}
          >
            <React.Fragment>
              <React.Fragment>{""}</React.Fragment>
              {
                <span
                  data-plasmic-name={"currentlySelectedPrefix"}
                  data-plasmic-override={overrides.currentlySelectedPrefix}
                  className={classNames(
                    projectcss.all,
                    projectcss.span,
                    projectcss.__wab_text,
                    projectcss.plasmic_default__inline,
                    sty.currentlySelectedPrefix
                  )}
                >
                  {"Comments on selected"}
                </span>
              }

              <React.Fragment> </React.Fragment>
              {
                <span
                  data-plasmic-name={"currentlySelectedSubject"}
                  data-plasmic-override={overrides.currentlySelectedSubject}
                  className={classNames(
                    projectcss.all,
                    projectcss.span,
                    projectcss.__wab_text,
                    projectcss.plasmic_default__inline,
                    sty.currentlySelectedSubject
                  )}
                >
                  {"NAME"}
                </span>
              }

              <React.Fragment>{""}</React.Fragment>
            </React.Fragment>
          </div>

          {true ? (
            <CommentPostForm
              data-plasmic-name={"newThreadForm"}
              data-plasmic-override={overrides.newThreadForm}
              className={classNames("__wab_instance", sty.newThreadForm)}
            />
          ) : null}
          {true ? (
            <div
              data-plasmic-name={"currentThreadsList"}
              data-plasmic-override={overrides.currentThreadsList}
              className={classNames(projectcss.all, sty.currentThreadsList)}
            >
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__nx6EP
                  )}
                  thread={true}
                />
              ) : null}
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__oqqsp
                  )}
                  thread={true}
                />
              ) : null}
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__au5Ht
                  )}
                  thread={true}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <ListSectionSeparator
        data-plasmic-name={"listSectionSeparator"}
        data-plasmic-override={overrides.listSectionSeparator}
        className={classNames("__wab_instance", sty.listSectionSeparator)}
      />

      {true ? (
        <div
          data-plasmic-name={"restThreadsSection"}
          data-plasmic-override={overrides.restThreadsSection}
          className={classNames(projectcss.all, sty.restThreadsSection)}
        >
          {(
            hasVariant($state, "emptySelection", "emptySelection") ? true : true
          ) ? (
            <div
              data-plasmic-name={"text"}
              data-plasmic-override={overrides.text}
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text,
                {
                  [sty.textemptySelection]: hasVariant(
                    $state,
                    "emptySelection",
                    "emptySelection"
                  ),
                }
              )}
            >
              {"Jump to comments elsewhere"}
            </div>
          ) : null}
          {true ? (
            <div
              data-plasmic-name={"restThreadsList"}
              data-plasmic-override={overrides.restThreadsList}
              className={classNames(projectcss.all, sty.restThreadsList, {
                [sty.restThreadsListemptySelection]: hasVariant(
                  $state,
                  "emptySelection",
                  "emptySelection"
                ),
              })}
            >
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__fyIcK,
                    {
                      [sty.commentPostemptySelection__fyIcKk5Ys6]: hasVariant(
                        $state,
                        "emptySelection",
                        "emptySelection"
                      ),
                    }
                  )}
                  thread={true}
                />
              ) : null}
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__gvH2I
                  )}
                  thread={true}
                />
              ) : null}
              {true ? (
                <CommentPost
                  className={classNames(
                    "__wab_instance",
                    sty.commentPost__nOsP5
                  )}
                  thread={true}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "currentSelectionSection",
    "freeBox",
    "notificationsButton",
    "currentlySelectedTitle",
    "currentlySelectedPrefix",
    "currentlySelectedSubject",
    "newThreadForm",
    "currentThreadsList",
    "listSectionSeparator",
    "restThreadsSection",
    "text",
    "restThreadsList",
  ],

  currentSelectionSection: [
    "currentSelectionSection",
    "freeBox",
    "notificationsButton",
    "currentlySelectedTitle",
    "currentlySelectedPrefix",
    "currentlySelectedSubject",
    "newThreadForm",
    "currentThreadsList",
  ],

  freeBox: ["freeBox", "notificationsButton"],
  notificationsButton: ["notificationsButton"],
  currentlySelectedTitle: [
    "currentlySelectedTitle",
    "currentlySelectedPrefix",
    "currentlySelectedSubject",
  ],

  currentlySelectedPrefix: ["currentlySelectedPrefix"],
  currentlySelectedSubject: ["currentlySelectedSubject"],
  newThreadForm: ["newThreadForm"],
  currentThreadsList: ["currentThreadsList"],
  listSectionSeparator: ["listSectionSeparator"],
  restThreadsSection: ["restThreadsSection", "text", "restThreadsList"],
  text: ["text"],
  restThreadsList: ["restThreadsList"],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  currentSelectionSection: "div";
  freeBox: "div";
  notificationsButton: typeof Button;
  currentlySelectedTitle: "div";
  currentlySelectedPrefix: "span";
  currentlySelectedSubject: "span";
  newThreadForm: typeof CommentPostForm;
  currentThreadsList: "div";
  listSectionSeparator: typeof ListSectionSeparator;
  restThreadsSection: "div";
  text: "div";
  restThreadsList: "div";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicCommentsTab__OverridesType,
  DescendantsType<T>
>;

type NodeComponentProps<T extends NodeNameType> = {
  // Explicitly specify variants, args, and overrides as objects
  variants?: PlasmicCommentsTab__VariantsArgs;
  args?: PlasmicCommentsTab__ArgsType;
  overrides?: NodeOverridesType<T>;
} & Omit<PlasmicCommentsTab__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
  // Specify args directly as props
  Omit<PlasmicCommentsTab__ArgsType, ReservedPropsType> &
  // Specify overrides for each element directly as props
  Omit<
    NodeOverridesType<T>,
    ReservedPropsType | VariantPropType | ArgPropType
  > &
  // Specify props for the root element
  Omit<
    Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
    ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
  >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicCommentsTab__ArgProps,
          internalVariantPropNames: PlasmicCommentsTab__VariantProps,
        }),

      [props, nodeName]
    );

    return PlasmicCommentsTab__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicCommentsTab";
  } else {
    func.displayName = `PlasmicCommentsTab.${nodeName}`;
  }
  return func;
}

export const PlasmicCommentsTab = Object.assign(
  // Top-level PlasmicCommentsTab renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    currentSelectionSection: makeNodeComponent("currentSelectionSection"),
    freeBox: makeNodeComponent("freeBox"),
    notificationsButton: makeNodeComponent("notificationsButton"),
    currentlySelectedTitle: makeNodeComponent("currentlySelectedTitle"),
    currentlySelectedPrefix: makeNodeComponent("currentlySelectedPrefix"),
    currentlySelectedSubject: makeNodeComponent("currentlySelectedSubject"),
    newThreadForm: makeNodeComponent("newThreadForm"),
    currentThreadsList: makeNodeComponent("currentThreadsList"),
    listSectionSeparator: makeNodeComponent("listSectionSeparator"),
    restThreadsSection: makeNodeComponent("restThreadsSection"),
    text: makeNodeComponent("text"),
    restThreadsList: makeNodeComponent("restThreadsList"),

    // Metadata about props expected for PlasmicCommentsTab
    internalVariantProps: PlasmicCommentsTab__VariantProps,
    internalArgProps: PlasmicCommentsTab__ArgProps,
  }
);

export default PlasmicCommentsTab;
/* prettier-ignore-end */

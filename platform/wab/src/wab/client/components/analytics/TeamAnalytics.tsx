// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import moment from "moment";
import * as React from "react";
import { useHistory, useLocation } from "react-router";
import { ensure } from "../../../common";
import { TeamId } from "../../../shared/ApiSchema";
import { useAppCtx } from "../../contexts/AppContexts";
import { useAsyncStrict } from "../../hooks/useAsyncStrict";
import {
  DefaultTeamAnalyticsProps,
  PlasmicTeamAnalytics,
} from "../../plasmic/plasmic_kit_analytics/PlasmicTeamAnalytics";
import { promptBilling } from "../modals/PricingModal";
import { useChartData } from "./useChartData";
import { TeamAnalyticsFilterParams, TimeRange } from "./utils";

export interface TeamAnalyticsProps extends DefaultTeamAnalyticsProps {
  teamId: TeamId;
}

function TeamAnalytics_(
  props: TeamAnalyticsProps,
  ref: HTMLElementRefOf<"div">
) {
  const history = useHistory();
  const location = useLocation();

  const { teamId } = props;

  const changeParamsAndNavigate = (
    params: Record<string, string | undefined>
  ) => {
    const newParams = new URLSearchParams(location.search);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    const newPath = `${location.pathname}?${newParams.toString()}`;
    history.push(newPath);
  };

  const searchParams = new URLSearchParams(location.search);

  const workspaceId =
    searchParams.get(TeamAnalyticsFilterParams.WorkspaceId) ?? undefined;
  const setWorkspaceId = (newWorkspaceId: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.WorkspaceId]: newWorkspaceId,
      [TeamAnalyticsFilterParams.ProjectId]: undefined,
      [TeamAnalyticsFilterParams.ComponentId]: undefined,
      [TeamAnalyticsFilterParams.SplitId]: undefined,
    });

  const projectId =
    searchParams.get(TeamAnalyticsFilterParams.ProjectId) ?? undefined;
  const setProjectId = (newProjectId: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.ProjectId]: newProjectId,
      [TeamAnalyticsFilterParams.ComponentId]: undefined,
      [TeamAnalyticsFilterParams.SplitId]: undefined,
    });

  const componentId =
    searchParams.get(TeamAnalyticsFilterParams.ComponentId) ?? undefined;
  const setComponentId = (newComponentId: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.ComponentId]: newComponentId,
    });

  const splitId =
    searchParams.get(TeamAnalyticsFilterParams.SplitId) ?? undefined;
  const setSplitId = (newSplitId: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.SplitId]: newSplitId,
    });

  const event =
    searchParams.get(TeamAnalyticsFilterParams.Event) ?? "impressions";
  const setEvent = (newEvent: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.Event]: newEvent,
    });

  const extractTimeRange = (): TimeRange => {
    const fromStr = searchParams.get(TeamAnalyticsFilterParams.TimeRangeFrom);
    const from = fromStr
      ? moment(fromStr)
      : moment().subtract(1, "month").startOf("month");
    const toStr = searchParams.get(TeamAnalyticsFilterParams.TimeRangeTo);
    const to = toStr ? moment(toStr) : moment().endOf("day");
    return [from, to];
  };

  const timeRange = extractTimeRange();
  const setTimeRange = (newRange: TimeRange) => {
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.TimeRangeFrom]: newRange[0]
        ? newRange[0].format("YYYY-MM-DD")
        : undefined,
      [TeamAnalyticsFilterParams.TimeRangeTo]: newRange[1]
        ? newRange[1].format("YYYY-MM-DD")
        : undefined,
    });
  };

  const period = searchParams.get(TeamAnalyticsFilterParams.Period) ?? "day";
  const setPeriod = (newPeriod: string | undefined) =>
    changeParamsAndNavigate({
      [TeamAnalyticsFilterParams.Period]: newPeriod,
    });

  const chartData = useChartData({
    teamId,
    workspaceId,
    projectId,
    componentId,
    splitId,
    timeRange,
    event,
    period,
  });

  const appCtx = useAppCtx();

  useAsyncStrict(async () => {
    if (!appCtx.appConfig.analyticsPaywall) {
      return;
    }

    const team = ensure(
      appCtx.teams.find((t) => t.id === teamId),
      "Team should exist for analytics"
    );

    if (team.featureTier?.analytics) {
      return;
    }
    const { tiers } = await appCtx.api.listCurrentFeatureTiers();
    await promptBilling({
      appCtx,
      availableTiers: tiers.filter((t) => t.analytics),
      title: "You should upgrade your plan to access Analytics",
      target: {
        team,
      },
    });
  }, []);

  return (
    <PlasmicTeamAnalytics
      root={{ ref }}
      header={{
        teamId,
      }}
      teamFilters={{
        teamId,
        workspaceId,
        projectId,
        componentId,
        splitId,
        setWorkspaceId,
        setProjectId,
        setComponentId,
        setSplitId,
      }}
      dataFilters={{
        projectId,
        timeRange,
        event,
        setTimeRange,
        setEvent,
        period,
        setPeriod,
        chartData,
      }}
      chartView={{
        teamId,
        event,
        workspaceId,
        projectId,
        componentId,
        splitId,
        timeRange,
        period,
        chartData,
      }}
    />
  );
}

const TeamAnalytics = React.forwardRef(TeamAnalytics_);
export default TeamAnalytics;

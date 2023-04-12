import type {
  PageInfoWidget,
  PageChartWidget,
  PageWidgets,
  NavigationWidgets,
  DashboardWidgets,
} from "../types/widgets";
import type { MetricsMap } from "../types/data";
import type { Field } from "payload/dist/fields/config/types";
import { getPageViewsChart } from "../components/Charts/PageViewsChart";
import { getAggregateDataWidget } from "../components/Aggregates/AggregateDataWidget";
import LiveDataComponent from "../components/Live/LiveDataWidget";
import TopPages from "../components/Reports/TopPages";

export const PageWidgetMap: Record<
  PageWidgets["type"],
  (config: any, index: number, metricsMap: MetricsMap) => Field
> = {
  chart: (config: PageChartWidget, index: number, metricsMap: MetricsMap) => ({
    type: "ui",
    name: `chart_${index}_${config.timeframe ?? "30d"}`,
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) => getPageViewsChart(metricsMap, props, config),
      },
    },
  }),
  info: (config: PageInfoWidget, index: number, metricsMap: MetricsMap) => ({
    type: "ui",
    name: `info_${index}_${config.timeframe ?? "30d"}`,
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) =>
          getAggregateDataWidget(metricsMap, props, config),
      },
    },
  }),
};

export const NavigationWidgetMap: Record<NavigationWidgets["type"], React.FC> =
  {
    live: LiveDataComponent.LiveDataWidget,
  };

export const DashboardWidgetMap: Record<DashboardWidgets, React.FC> = {
  topPages: TopPages,
  viewsChart: TopPages,
};

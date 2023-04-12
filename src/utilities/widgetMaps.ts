import type {
  PageInfoWidget,
  PageChartWidget,
  PageWidgets,
  NavigationWidgets,
  DashboardWidgets,
} from "../types/widgets";
import type { Field } from "payload/dist/fields/config/types";
import { getPageViewsChart } from "../components/Charts/PageViewsChart";
import { getAggregateDataWidget } from "../components/Aggregates/AggregateDataWidget";
import LiveDataComponent from "../components/Live/LiveDataWidget";
import TopPages from "../components/Reports/TopPages";

export const PageWidgetMap: Record<
  PageWidgets["type"],
  (config: any, index: number) => Field
> = {
  chart: (config: PageChartWidget, index: number) => ({
    type: "ui",
    name: `chart_${index}_${config.timeframe ?? "30d"}`,
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) => getPageViewsChart(props, config),
      },
    },
  }),
  info: (config: PageInfoWidget) => ({
    type: "ui",
    name: "dashboardAnalyticsViewsChart",
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) => getAggregateDataWidget(props, config),
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
  viewsChart: LiveDataComponent.LiveDataWidget,
};

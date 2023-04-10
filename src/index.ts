import type { Config as PayloadConfig } from "payload/config";
import type {
  DashboardAnalyticsConfig,
  ChartWidget,
  InfoWidget,
  InnerWidget,
} from "./types";
import type { Field } from "payload/dist/fields/config/types";
import { extendWebpackConfig } from "./extendWebpackConfig";
import getProvider from "./providers";
import getGlobalAggregateData from "./routes/getGlobalAggregateData";
import getGlobalChartData from "./routes/getGlobalChartData";
import getPageChartData from "./routes/getPageChartData";
import type { CollectionConfig } from "payload/dist/collections/config/types";
import { getViewsChart } from "./components/Charts/ViewsChart";

const InnerWidgetMap: Record<InnerWidget["type"], (config: any) => Field> = {
  chart: (config: ChartWidget) => ({
    type: "ui",
    name: `chart_${config.metric}_${config.timeframe ?? "30d"}`,
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) =>
          getViewsChart(props, {
            timeframe: config.timeframe,
            metric: config.metric,
            idMatcher: config.idMatcher,
          }),
      },
    },
  }),
  /* info: (config: InfoWidget) => ({
    type: "ui",
    name: "dashboardAnalyticsViewsChart",
    admin: {
      position: "sidebar",
      components: {
        Field: (props: any) =>
          getViewsChart(props, {
            metric: config.metric,
          }),
      },
    },
  }), */
};

const payloadDashboardAnalytics =
  (incomingConfig: DashboardAnalyticsConfig) =>
  (config: PayloadConfig): PayloadConfig => {
    const { admin, collections } = config;
    const { provider } = incomingConfig;
    const endpoints = config.endpoints ?? [];
    const apiProvider = getProvider(provider);

    const processedConfig: PayloadConfig = {
      ...config,
      admin: {
        ...admin,
        /* components: {
          beforeDashboard: [() => getViewsChart()],
        }, */
        webpack: extendWebpackConfig(config),
      },
      endpoints: [
        ...endpoints,
        getGlobalAggregateData(apiProvider),
        getGlobalChartData(apiProvider),
        getPageChartData(apiProvider),
      ],
      ...(collections && {
        collections: collections.map((collection) => {
          const targetCollection = incomingConfig.collections?.find((col) => {
            if (col.slug === collection.slug) return true;
            return false;
          });

          if (targetCollection) {
            const collectionConfigWithHooks: CollectionConfig = {
              ...collection,
              fields: [
                ...collection.fields,
                ...targetCollection.widgets.map((widget) => {
                  const field = InnerWidgetMap[widget.type];

                  return field(widget);
                }),
              ],
            };

            return collectionConfigWithHooks;
          }

          return collection;
        }),
      }),
    };

    return processedConfig;
  };

export default payloadDashboardAnalytics;

import type { Config as PayloadConfig } from "payload/config";
import type { DashboardAnalyticsConfig } from "./types";
import type {
  PageInfoWidget,
  PageChartWidget,
  PageWidgets,
} from "./types/widgets";
import type { Field } from "payload/dist/fields/config/types";
import { extendWebpackConfig } from "./extendWebpackConfig";
import getProvider from "./providers";

import getGlobalAggregateData from "./routes/getGlobalAggregateData";
import getGlobalChartData from "./routes/getGlobalChartData";
import getPageChartData from "./routes/getPageChartData";
import getPageAggregateData from "./routes/getPageAggregateData";
import getLiveData from "./routes/getLiveData";

import type { CollectionConfig } from "payload/dist/collections/config/types";
import type { GlobalConfig } from "payload/dist/globals/config/types";
import { getPageViewsChart } from "./components/Charts/PageViewsChart";
import { getAggregateDataWidget } from "./components/Aggregates/AggregateDataWidget";
import LiveDataWidget from "./components/Live/LiveDataWidget";

const PageWidgetMap: Record<
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

const payloadDashboardAnalytics =
  (incomingConfig: DashboardAnalyticsConfig) =>
  (config: PayloadConfig): PayloadConfig => {
    const { admin, collections, globals } = config;
    const { provider, navigation } = incomingConfig;
    const endpoints = config.endpoints ?? [];
    const apiProvider = getProvider(provider);

    const processedConfig: PayloadConfig = {
      ...config,
      admin: {
        ...admin,
        components: {
          ...admin?.components,
          ...(navigation?.BeforeNavLinks && {
            beforeNavLinks: [
              ...(admin?.components?.beforeNavLinks ?? []),
              LiveDataWidget.LiveDataWidget,
            ],
          }),
          ...(navigation?.AfterNavLinks && {
            afterNavLinks: [
              ...(admin?.components?.afterNavLinks ?? []),
              LiveDataWidget.LiveDataWidget,
            ],
          }),
        },
        webpack: extendWebpackConfig(config),
      },
      endpoints: [
        ...endpoints,
        getGlobalAggregateData(apiProvider),
        getGlobalChartData(apiProvider),
        getPageChartData(apiProvider),
        getPageAggregateData(apiProvider),
        getLiveData(apiProvider),
      ],
      ...(collections && {
        collections: collections.map((collection) => {
          const targetCollection = incomingConfig.collections?.find(
            (pluginCollection) => {
              if (pluginCollection.slug === collection.slug) return true;
              return false;
            }
          );

          if (targetCollection) {
            const collectionConfigWithHooks: CollectionConfig = {
              ...collection,
              fields: [
                ...collection.fields,
                ...targetCollection.widgets.map((widget, index) => {
                  const field = PageWidgetMap[widget.type];

                  return field(widget, index);
                }),
              ],
            };

            return collectionConfigWithHooks;
          }

          return collection;
        }),
      }),
      ...(globals && {
        globals: globals.map((global) => {
          const targetGlobal = incomingConfig.globals?.find((pluginGlobal) => {
            if (pluginGlobal.slug === global.slug) return true;
            return false;
          });

          if (targetGlobal) {
            const globalConfigWithHooks: GlobalConfig = {
              ...global,
              fields: [
                ...global.fields,
                ...targetGlobal.widgets.map((widget, index) => {
                  const field = PageWidgetMap[widget.type];

                  return field(widget, index);
                }),
              ],
            };

            return globalConfigWithHooks;
          }

          return global;
        }),
      }),
    };

    return processedConfig;
  };

export default payloadDashboardAnalytics;

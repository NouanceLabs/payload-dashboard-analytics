import type { Config as PayloadConfig } from "payload/config";
import type { DashboardAnalyticsConfig } from "./types";
import { extendWebpackConfig } from "./extendWebpackConfig";
import getProvider from "./providers";
import getGlobalAggregateData from "./routes/getGlobalAggregateData";
import getGlobalChartData from "./routes/getGlobalChartData";
import type { CollectionConfig } from "payload/dist/collections/config/types";
import { getViewsChart } from "./components/Charts/ViewsChart";

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
        webpack: extendWebpackConfig(config),
      },
      endpoints: [
        ...endpoints,
        getGlobalAggregateData(apiProvider),
        getGlobalChartData(apiProvider),
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
                {
                  type: "ui",
                  name: "viewschart",
                  admin: {
                    position: "sidebar",
                    components: {
                      Field: (props) => getViewsChart(props),
                    },
                  },
                },
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

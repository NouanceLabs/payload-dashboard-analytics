import { Config as PayloadConfig } from "payload/config";
import { DashboardAnalyticsConfig } from "./types";
import { extendWebpackConfig } from "./extendWebpackConfig";
import getProvider from "./providers";
import getGlobalAggregateData from "./routes/getGlobalAggregateData";

const payloadDashboardAnalytics =
  (incomingConfig: DashboardAnalyticsConfig) =>
  (config: PayloadConfig): PayloadConfig => {
    const { admin } = config;
    const { provider } = incomingConfig;
    const endpoints = config.endpoints ?? [];
    const apiProvider = getProvider(provider);

    const processedConfig: PayloadConfig = {
      ...config,
      admin: {
        ...admin,
        webpack: extendWebpackConfig(config),
      },
      endpoints: [...endpoints, getGlobalAggregateData(apiProvider)],
    };

    return processedConfig;
  };

export default payloadDashboardAnalytics;

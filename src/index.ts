import { Config as PayloadConfig } from "payload/config";
import { DashboardAnalyticsConfig } from "./types";
import { extendWebpackConfig } from "./extendWebpackConfig";

const payloadDashboardAnalytics =
  (incomingConfig: DashboardAnalyticsConfig) =>
  (config: PayloadConfig): PayloadConfig => {
    const { admin } = config;

    const processedConfig: PayloadConfig = {
      admin: {
        ...admin,
        webpack: extendWebpackConfig(config),
      },
    };

    return processedConfig;
  };

export default payloadDashboardAnalytics;

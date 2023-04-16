import type { GoogleProvider } from "../../types/providers";
import type { Metrics, Properties } from "../../types/widgets";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { MetricMap, PropertyMap } from "./utilities";

type ClientOptions = {};

function client(provider: GoogleProvider, options?: ClientOptions) {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    ...(provider.credentials ? { keyFilename: provider.credentials } : {}),
  });

  return {
    run: analyticsDataClient,
  };
}

export default client;

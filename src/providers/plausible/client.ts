import type { PlausibleProvider } from "../../types/providers";
import type { Metrics } from "../../types/widgets";
import { MetricMap } from "./utilities";

type ClientOptions = {
  endpoint: string;
  timeframe?: string;
  metrics?: Metrics[];
};

function client(provider: PlausibleProvider, options: ClientOptions) {
  const { endpoint, timeframe, metrics } = options;
  const host = provider.host ?? `https://plausible.io`;
  const apiVersion = `v1`; // for future use

  const period = () => {
    switch (timeframe) {
      case "currentMonth":
        return "month";
      case null:
      case undefined:
        return "30d";
      default:
        return timeframe;
    }
  };

  const url = new URL(`${host}/api/${apiVersion}${endpoint}`);
  url.searchParams.append("site_id", provider.siteId);

  const getMetrics = () => {
    const myMetrics: string[] = [];
    const availableMetrics = Object.entries(MetricMap);

    metrics?.forEach((metric) => {
      const foundMetric = availableMetrics.find((mappedMetric) => {
        return mappedMetric[0] === metric;
      });

      if (foundMetric) myMetrics.push(foundMetric[1].value);
    });

    return myMetrics;
  };

  const plausibleMetrics = metrics?.length ? getMetrics() : "pageviews";

  const baseUrl = String(url.href);
  url.searchParams.append("period", period());
  url.searchParams.append("metrics", String(plausibleMetrics));

  return {
    host: host,
    baseUrl: baseUrl,
    metric: plausibleMetrics,
    url: url,
    metricsMap: MetricMap,
    fetch: async (customUrl?: string) => {
      const fetchUrl = customUrl ?? url.toString();

      return await fetch(fetchUrl, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${provider.apiSecret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
    },
  };
}

export default client;

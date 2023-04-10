import type { PlausibleProvider } from "../../types/providers";
import type { GlobalAggregateOptions } from "..";
import client from "./client";

async function getGlobalAggregateData(
  provider: PlausibleProvider,
  options: GlobalAggregateOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/aggregate",
    timeframe: options.timeframe,
    metrics: options.metrics,
  });

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  return data;
}

export default getGlobalAggregateData;

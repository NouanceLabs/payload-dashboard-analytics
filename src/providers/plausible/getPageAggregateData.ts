import type { PlausibleProvider } from "../../types";
import type { GlobalAggregateOptions } from "..";
import client from "./client";

async function getPageAggregateData(
  provider: PlausibleProvider,
  options?: GlobalAggregateOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/aggregate",
    timeframe: options?.timeframe,
  });

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  return data;
}

export default getPageAggregateData;

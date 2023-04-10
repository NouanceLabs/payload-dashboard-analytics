import type { PlausibleProvider } from "../../types/providers";
import type { PageAggregateOptions } from "..";
import client from "./client";

async function getPageAggregateData(
  provider: PlausibleProvider,
  options: PageAggregateOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/aggregate",
    timeframe: options?.timeframe,
    metrics: options.metrics,
  });

  const url = plausibleClient.url;

  const pageFilter = `event:page==${options.pageId}`;

  url.searchParams.append("filters", pageFilter);

  const data = await plausibleClient.fetch(url.toString()).then((response) => {
    return response.json();
  });

  return data;
}

export default getPageAggregateData;

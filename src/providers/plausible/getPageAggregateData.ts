import type { PlausibleProvider } from "../../types/providers";
import type { PageAggregateOptions } from "..";
import type { AggregateData } from "../../types/data";
import { MetricMap } from "./utilities";
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

  const data = await plausibleClient
    .fetch(url.toString())
    .then((response) => response.json());

  const processedData: AggregateData = Object.entries(data.results).map(
    ([label, value]: any) => {
      const labelAsMetric = Object.values(MetricMap).find((item) => {
        return label === item.value;
      });

      return {
        label: labelAsMetric?.label ?? label,
        value: value.value,
      };
    }
  );
  return processedData;
}

export default getPageAggregateData;

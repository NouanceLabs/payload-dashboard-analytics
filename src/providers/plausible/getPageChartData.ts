import type { PlausibleProvider, ChartDataPoint } from "../../types";
import type { PageChartOptions } from "..";
import { MetricMap } from "./client";
import payload from "payload";
import client from "./client";

async function getPageChartData(
  provider: PlausibleProvider,
  options: PageChartOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/timeseries",
    timeframe: options?.timeframe,
    metric: options?.metric,
  });

  const url = plausibleClient.url;

  const pageFilter = `event:page==${options.pageId}`;

  url.searchParams.append("filters", pageFilter);

  const { results } = await plausibleClient
    .fetch(url.toString())
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      payload.logger.error(error);
    });

  const processedData: ChartDataPoint[] = results.map((item: any) => {
    return {
      timestamp: item.date,
      value: item[plausibleClient.metric],
    };
  });

  return processedData;
}

export default getPageChartData;

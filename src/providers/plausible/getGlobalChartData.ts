import type { PlausibleProvider, ChartDataPoint } from "../../types";
import type { GlobalChartOptions } from "..";
import { MetricMap } from "./client";
import payload from "payload";
import client from "./client";

async function getGlobalChartData(
  provider: PlausibleProvider,
  options?: GlobalChartOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/timeseries",
    timeframe: options?.timeframe,
    metric: options?.metric,
  });

  const { results } = await plausibleClient
    .fetch()
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

export default getGlobalChartData;

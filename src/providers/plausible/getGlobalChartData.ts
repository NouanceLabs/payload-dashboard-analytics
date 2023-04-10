import type { PlausibleProvider } from "../../types/providers";
import type { ChartData } from "../../types/data";
import type { GlobalChartOptions } from "..";
import { MetricMap } from "./client";
import payload from "payload";
import client from "./client";

async function getGlobalChartData(
  provider: PlausibleProvider,
  options: GlobalChartOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/timeseries",
    timeframe: options?.timeframe,
    metrics: options.metrics,
  });

  const { results } = await plausibleClient
    .fetch()
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      payload.logger.error(error);
    });

  /* @todo: fix types later */
  /* @ts-ignore */
  const dataSeries: ChartData = options.metrics.map((metric) => {
    const mappedMetric = Object.entries(MetricMap).find(([key, value]) => {
      return metric === key;
    });

    if (mappedMetric) {
      const data = results.map((item: any) => {
        return {
          timestamp: item.date,
          value: item[mappedMetric[1].value],
        };
      });

      return {
        label: mappedMetric[1].label,
        data: data,
      };
    }
  });

  return dataSeries;
}

export default getGlobalChartData;

import type { PlausibleProvider } from "../../types/providers";
import type { ReportDataOptions } from "..";
import type { ReportData } from "../../types/data";
import client from "./client";

async function getReportData(
  provider: PlausibleProvider,
  options: ReportDataOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/breakdown",
    metrics: options.metrics,
    property: options.property,
  });

  const url = plausibleClient.url;

  const metricsMap = plausibleClient.metricsMap;

  url.searchParams.append("limit", "10");

  const data = await plausibleClient.fetch(url.toString()).then((response) => {
    return response.json();
  });

  const processedData: ReportData = data.results.map((item: any) => {
    const matchingProperyKey = Object.keys(item)[0];

    return {
      [options.property]: item[matchingProperyKey],
      values: Object.keys(item)
        .map((value) => {
          const matchingMetric = Object.entries(metricsMap).find(
            ([key, metricValue]) => {
              return value === metricValue.value;
            }
          );

          if (matchingMetric) {
            return {
              [matchingMetric[0]]: item[value],
            };
          }
        })
        .filter((filterItem) => Boolean(filterItem)),
    };
  });

  return processedData;
}

export default getReportData;

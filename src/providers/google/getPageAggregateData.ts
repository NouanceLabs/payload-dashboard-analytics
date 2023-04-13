import type { GoogleProvider } from "../../types/providers";
import type { PageAggregateOptions } from "..";
import type { AggregateData } from "../../types/data";
import { getMetrics } from "./utilities";
import client from "./client";

async function getPageAggregateData(
  provider: GoogleProvider,
  options: PageAggregateOptions
) {
  const googleClient = client(provider, {
    endpoint: "/stats/realtime/visitors",
  });

  const { metrics } = options;

  const usedMetrics = getMetrics(metrics);

  console.log("usedMetrics", usedMetrics);

  const request = {
    property: `properties/${provider.propertyId}`,
    dateRanges: [
      {
        startDate: "2023-03-05",
        endDate: "today",
      },
    ],
    dimensions: [{ name: "pagePath" }],
    metrics: usedMetrics.map((metric) => {
      return {
        name: metric,
      };
    }),
  };

  const data = await googleClient.run.runReport(request).then((data) => data);

  console.log("data rows", data);

  const processedData: AggregateData = {
    visitors: 0,
  };

  return processedData;
}

export default getPageAggregateData;

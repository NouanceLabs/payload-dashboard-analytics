import type { GoogleProvider } from "../../types/providers";
import type { ReportDataOptions } from "..";
import type { ReportData } from "../../types/data";
import { getMetrics, getDateRange, PropertyMap } from "./utilities";
import client from "./client";
import type { protos } from "@google-analytics/data";
import type { Timeframes } from "../../types/widgets";

async function getReportData(
  provider: GoogleProvider,
  options: ReportDataOptions
) {
  const googleClient = client(provider);

  const { metrics, property } = options;
  const timeframe: Timeframes = (options.timeframe as Timeframes) ?? "30d";

  const usedMetrics = getMetrics(metrics);
  const usedProperty = PropertyMap[property];

  const dateRange = getDateRange(timeframe);

  const request: protos.google.analytics.data.v1beta.IRunReportRequest = {
    property: `properties/${provider.propertyId}`,
    dateRanges: [dateRange.formatted],
    dimensions: [{ name: usedProperty.value ?? "pagePath" }],
    metrics: usedMetrics.map((metric) => {
      return {
        name: metric,
      };
    }),
    keepEmptyRows: false,
    metricAggregations: [1],
    limit: 10,
    orderBys: [
      {
        desc: true,
        metric: {
          metricName: usedMetrics[0],
        },
      },
      ...(usedMetrics[1]
        ? [
            {
              desc: true,
              metric: {
                metricName: usedMetrics[1],
              },
            },
          ]
        : []),
    ],
  };

  const data = await googleClient.run.runReport(request).then((data) => data);

  // @todo: fix types
  // @ts-ignore
  const processedData: ReportData = data[0].rows?.map((row, index) => {
    const dimension = row.dimensionValues?.[0].value;
    return {
      [property]: dimension ?? "",
      values: metrics.map((metric, index) => {
        const value = row.metricValues?.[index].value;

        return {
          [metric]: value ?? "0",
        };
      }),
    };
  });

  return processedData;
}

export default getReportData;

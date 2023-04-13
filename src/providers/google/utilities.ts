import type { MetricsMap, PropertiesMap } from "../../types/data";

export const MetricMap: MetricsMap = {
  views: {
    label: "Views",
    value: "screenPageViews",
  },
  visitors: { label: "Visitors", value: "activeUsers" },
  bounceRate: { label: "Bounce rate", value: "bounceRate" },
  sessionDuration: { label: "Avg. duration", value: "averageSessionDuration" },
  sessions: { label: "Sessions", value: "sessions" },
};

export const PropertyMap: PropertiesMap = {
  page: {
    label: "Page",
    value: "pagePath",
  },
  country: {
    label: "Country",
    value: "country",
  },
  /* entryPoint: {
    label: "Pages",
    value: "landingPagePlusQueryString",
  },
  exitPoint: {
    label: "Pages",
    value: "event:page",
  }, */
  source: {
    label: "Source",
    value: "source",
  },
};

export const getMetrics = (metrics: Array<keyof MetricsMap>) => {
  const myMetrics: string[] = [];
  const availableMetrics = Object.entries(MetricMap);

  metrics?.forEach((metric) => {
    const foundMetric = availableMetrics.find((mappedMetric) => {
      return mappedMetric[0] === metric;
    });

    if (foundMetric) myMetrics.push(foundMetric[1].value);
  });

  return myMetrics;
};

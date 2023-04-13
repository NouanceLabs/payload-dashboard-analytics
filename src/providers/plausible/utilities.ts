import { MetricsMap, PropertiesMap } from "../../types/data";

export const MetricMap: MetricsMap = {
  views: {
    label: "Views",
    value: "pageviews",
  },
  visitors: { label: "Visitors", value: "visitors" },
  bounceRate: { label: "Bounce rate", value: "bounce_rate" },
  sessionDuration: { label: "Avg. duration", value: "visit_duration" },
  sessions: { label: "Sessions", value: "visits" },
};

export const PropertyMap: PropertiesMap = {
  page: {
    label: "Pages",
    value: "event:page",
  },
  country: {
    label: "Pages",
    value: "event:page",
  },
  /* entryPoint: {
    label: "Pages",
    value: "event:page",
  },
  exitPoint: {
    label: "Pages",
    value: "event:page",
  }, */
  source: {
    label: "Pages",
    value: "event:page",
  },
};

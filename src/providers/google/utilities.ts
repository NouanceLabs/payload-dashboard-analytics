import type { MetricsMap, PropertiesMap } from "../../types/data";
import { Timeframes } from "../../types/widgets";
import type { protos } from "@google-analytics/data";
import {
  format,
  subDays,
  subMonths,
  startOfMonth,
  lastDayOfMonth,
} from "date-fns";

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

/* const TimeframeMap: Record<Exclude<Timeframes, "currentMonth">, number> = {
  "12mo": "",
  "6mo": "",
  "30d": "",
  "7d": "",
}; */

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

interface DateRangeReturn {
  dates: {
    startDate: Date;
    endDate: Date;
  };
  formatted: protos.google.analytics.data.v1beta.IDateRange;
}

export const DateFormat = "yyyy-MM-dd";
export const GoogleDateFormat = "yyyyMMdd";

export const getDateRange = (timeframe: Timeframes): DateRangeReturn => {
  const currentDate = new Date();

  const startDate = (): Date => {
    const date = new Date(currentDate);

    switch (timeframe) {
      case "12mo":
        return subMonths(date, 12);
      case "6mo":
        return subMonths(date, 6);
      case "30d":
        return subDays(date, 30);
      case "7d":
        return subDays(date, 7);
      case "currentMonth":
        return startOfMonth(date);
    }
  };

  const endDate =
    timeframe === "currentMonth" ? lastDayOfMonth(currentDate) : currentDate;

  return {
    dates: {
      startDate: startDate(),
      endDate: endDate,
    },
    formatted: {
      startDate: format(startDate(), DateFormat),
      endDate: format(endDate, DateFormat),
    },
  };
};

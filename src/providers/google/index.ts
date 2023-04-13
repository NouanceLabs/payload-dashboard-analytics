import type { GoogleProvider } from "../../types/providers";
/* import getGlobalAggregateData from "./getGlobalAggregateData";
import getGlobalChartData from "./getGlobalChartData";
import getPageChartData from "./getPageChartData"; */
import getPageAggregateData from "./getPageAggregateData";
import getLiveData from "./getLiveData";
/* import getReportData from "./getReportData"; */
import type {
  ApiProvider,
  GlobalAggregateOptions,
  GlobalChartOptions,
  PageChartOptions,
  PageAggregateOptions,
  LiveDataOptions,
  ReportDataOptions,
} from "..";

import { MetricMap } from "./utilities";

const google = (provider: GoogleProvider): ApiProvider => {
  return {
    getGlobalAggregateData: async (options: GlobalAggregateOptions) =>
      await new Promise(() => "test"),
    /* await getGlobalAggregateData(provider, options), */
    getGlobalChartData: async (options: GlobalChartOptions) =>
      await new Promise(() => "test"),
    /* await getGlobalChartData(provider, options), */
    getPageChartData: async (options: PageChartOptions) =>
      await new Promise(() => "test"),
    /* await getPageChartData(provider, options), */
    getPageAggregateData: async (options: PageAggregateOptions) =>
      await getPageAggregateData(provider, options),
    /* await getPageAggregateData(provider, options), */
    getLiveData: async (options: LiveDataOptions) =>
      await getLiveData(provider, options),
    getReportData: async (options: ReportDataOptions) =>
      await new Promise(() => "test"),
    /* await getReportData(provider, options), */
    metricsMap: MetricMap,
  };
};

export default google;

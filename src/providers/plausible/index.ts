import type { PlausibleProvider } from "../../types/providers";
import getGlobalAggregateData from "./getGlobalAggregateData";
import getGlobalChartData from "./getGlobalChartData";
import getPageAggregateData from "./getPageAggregateData";
import getPageChartData from "./getPageChartData";
import getLiveData from "./getLiveData";
import getReportData from "./getReportData";
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

const plausible = (provider: PlausibleProvider): ApiProvider => {
  return {
    getGlobalAggregateData: async (options: GlobalAggregateOptions) =>
      await getGlobalAggregateData(provider, options),
    getGlobalChartData: async (options: GlobalChartOptions) =>
      await getGlobalChartData(provider, options),
    getPageChartData: async (options: PageChartOptions) =>
      await getPageChartData(provider, options),
    getPageAggregateData: async (options: PageAggregateOptions) =>
      await getPageAggregateData(provider, options),
    getLiveData: async (options: LiveDataOptions) =>
      await getLiveData(provider, options),
    getReportData: async (options: ReportDataOptions) =>
      await getReportData(provider, options),
    metricsMap: MetricMap,
  };
};

export default plausible;

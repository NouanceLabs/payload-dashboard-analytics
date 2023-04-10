import type { PlausibleProvider } from "../../types/providers";
import getGlobalAggregateData from "./getGlobalAggregateData";
import getGlobalChartData from "./getGlobalChartData";
import getPageAggregateData from "./getPageAggregateData";
import getPageChartData from "./getPageChartData";
import type {
  ApiProvider,
  GlobalAggregateOptions,
  GlobalChartOptions,
  PageChartOptions,
  PageAggregateOptions,
} from "..";

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
  };
};

export default plausible;

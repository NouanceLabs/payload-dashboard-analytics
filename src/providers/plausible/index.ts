import { PlausibleProvider } from "../../types";
import getGlobalAggregateData from "./getGlobalAggregateData";
import getGlobalChartData from "./getGlobalChartData";
import type {
  ApiProvider,
  GlobalAggregateOptions,
  GlobalChartOptions,
} from "..";

const plausible = (provider: PlausibleProvider): ApiProvider => {
  return {
    getGlobalAggregateData: async (options?: GlobalAggregateOptions) =>
      await getGlobalAggregateData(provider, options),
    getGlobalChartData: async (options?: GlobalChartOptions) =>
      await getGlobalChartData(provider, options),
    /* getGlobalChartData: () => {},
    getPageAggregateData: () => {},
    getPageChartData: () => {}, */
  };
};

export default plausible;

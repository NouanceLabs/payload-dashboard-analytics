import { PlausibleProvider } from "../../types";
import getGlobalAggregateData from "./getGlobalAggregateData";
import getGlobalChartData from "./getGlobalChartData";
import { ApiProvider } from "..";

const plausible = (provider: PlausibleProvider): ApiProvider => {
  return {
    getGlobalAggregateData: async () => await getGlobalAggregateData(provider),
    getGlobalChartData: async () => await getGlobalChartData(provider),
    /* getGlobalChartData: () => {},
    getPageAggregateData: () => {},
    getPageChartData: () => {}, */
  };
};

export default plausible;

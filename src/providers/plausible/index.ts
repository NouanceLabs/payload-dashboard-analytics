import { PlausibleProvider } from "../../types";
import getGlobalAggregateData from "./getGlobalAggregateData";
import { ApiProvider } from "..";

const plausible = (provider: PlausibleProvider): ApiProvider => {
  return {
    getGlobalAggregateData: async () => await getGlobalAggregateData(provider),
    /* getGlobalChartData: () => {},
    getPageAggregateData: () => {},
    getPageChartData: () => {}, */
  };
};

export default plausible;

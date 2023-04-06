import plausible from "./plausible";
import type { Provider } from "../types";

export type ApiProvider = {
  getGlobalAggregateData: () => Promise<any>;
  /* getGlobalChartData: () => {},
    getPageAggregateData: () => {},
    getPageChartData: () => {}, */
};

const getProvider = (provider: Provider) => {
  switch (provider.source) {
    case "plausible":
      return plausible(provider);
  }
};

export default getProvider;

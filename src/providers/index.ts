import plausible from "./plausible";
import type { Provider } from "../types";
import { ChartWidget } from "../types";

type BaseOptions = {
  timeframe?: string;
};

export interface GlobalAggregateOptions extends BaseOptions {}
export interface GlobalChartOptions extends BaseOptions {
  metric: ChartWidget["metric"];
}

export type ApiProvider = {
  getGlobalAggregateData: (options?: GlobalAggregateOptions) => Promise<any>;
  getGlobalChartData: (options?: GlobalChartOptions) => Promise<any>;
  /* getPageAggregateData: () => {},
    getPageChartData: () => {}, */
};

const getProvider = (provider: Provider) => {
  switch (provider.source) {
    case "plausible":
      return plausible(provider);
  }
};

export default getProvider;

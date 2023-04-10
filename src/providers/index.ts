import plausible from "./plausible";
import type { Provider } from "../types";
import { ChartWidget, InfoWidget } from "../types/widgets";

type BaseOptions = {
  timeframe?: string;
};

export interface GlobalAggregateOptions extends BaseOptions {
  metrics: InfoWidget["metrics"];
}
export interface GlobalChartOptions extends BaseOptions {
  metrics: ChartWidget["metrics"];
}

export interface PageAggregateOptions extends BaseOptions {
  metrics: InfoWidget["metrics"];
  pageId: string;
}
export interface PageChartOptions extends BaseOptions {
  metrics: ChartWidget["metrics"];
  pageId: string;
}

export type ApiProvider = {
  getGlobalAggregateData: (options: GlobalAggregateOptions) => Promise<any>;
  getGlobalChartData: (options: GlobalChartOptions) => Promise<any>;
  getPageAggregateData: (options: PageAggregateOptions) => Promise<any>;
  getPageChartData: (options: PageChartOptions) => Promise<any>;
};

const getProvider = (provider: Provider) => {
  switch (provider.source) {
    case "plausible":
      return plausible(provider);
  }
};

export default getProvider;

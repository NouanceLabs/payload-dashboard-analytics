import plausible from "./plausible";
import type { Provider } from "../types";
import type { ChartWidget, InfoWidget, ReportWidget } from "../types/widgets";
import type {
  ChartData,
  AggregateData,
  LiveData,
  ReportData,
} from "../types/data";

type BaseOptions = {
  timeframe?: string;
};

export interface LiveDataOptions {}

export interface ReportDataOptions extends BaseOptions {
  metrics: ReportWidget["metrics"];
  property: ReportWidget["property"];
}

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
  getGlobalAggregateData: (
    options: GlobalAggregateOptions
  ) => Promise<AggregateData>;
  getGlobalChartData: (options: GlobalChartOptions) => Promise<ChartData>;
  getPageAggregateData: (
    options: PageAggregateOptions
  ) => Promise<AggregateData>;
  getPageChartData: (options: PageChartOptions) => Promise<ChartData>;
  getLiveData: (options: LiveDataOptions) => Promise<LiveData>;
  getReportData: (options: ReportDataOptions) => Promise<ReportData>;
};

const getProvider = (provider: Provider) => {
  switch (provider.source) {
    case "plausible":
      return plausible(provider);
  }
};

export default getProvider;

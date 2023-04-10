import { Payload } from "payload";
import { Config as PayloadConfig } from "payload/config";

export interface PlausibleProvider {
  source: "plausible";
  apiSecret: string;
  siteId: string;
  host?: string;
}

interface GoogleProvider {
  source: "google";
  credentials: string;
  propertyId: string;
}

export type Timeframes = "12mo" | "6mo" | "30d" | "7d" | "month";

export type IdMatcherFunction = (document: any) => string;

export type ChartWidgetMetrics = "pageViews" | "uniqueVisitors";

export type ChartWidget = {
  type: "chart";
  label?: string;
  metrics: ChartWidgetMetrics[];
  timeframe: Timeframes;
  idMatcher: IdMatcherFunction;
};

export type InfoWidget = {
  type: "info";
  label?: string;
  metric: "liveVisitors" | "totalViews";
};

export type InnerWidget = ChartWidget;

export interface ItemConfig {
  widgets: InnerWidget[];
}

export interface Collection extends ItemConfig {
  slug: string;
}

export interface Global extends ItemConfig {
  idMatcher: IdMatcherFunction;
}

export interface ChartDataPoint {
  timestamp: Date;
  value: number;
}

export interface ChartDataSeries {
  label: string;
  data: ChartDataPoint[];
}

export type ChartData = ChartDataSeries[];

export type Provider = PlausibleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  collections?: Collection[];
};

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

export type ChartWidget = {
  type: "chart";
  metric: "pageViews" | "uniqueVisitors";
  timeframe: Timeframes;
};

export type InfoWidget = {
  type: "info";
  metric: "liveVisitors" | "totalViews";
};

export type InnerWidget = ChartWidget;

export interface ItemConfig {
  widgets: InnerWidget[];
}

export interface Collection extends ItemConfig {
  slug: string;
}

export interface ChartDataPoint {
  timestamp: Date;
  value: number;
}

export type Provider = PlausibleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  collections?: Collection[];
};

import type { Metrics, Properties } from "./widgets";

export interface ChartDataPoint {
  timestamp: string;
  value: number;
}

export interface ChartDataSeries {
  label: string;
  data: ChartDataPoint[];
}

export type ChartData = ChartDataSeries[];

export type AggregateData = Array<{
  label: Metrics;
  value: string | number;
}>;

export type LiveData = {
  visitors: number;
};

export type ReportData = Array<{
  [label: string]: string;
  values: Array<{ [value: string]: string | number }>;
}>;

export type MetricsMap = Record<Metrics, { label: string; value: string }>;

export type PropertiesMap = Record<
  Properties,
  { label: string; value: string }
>;

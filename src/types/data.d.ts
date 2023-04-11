import type { AllAvailableMetrics } from "./widgets";

export interface ChartDataPoint {
  timestamp: Date;
  value: number;
}

export interface ChartDataSeries {
  label: string;
  data: ChartDataPoint[];
}

export type ChartData = ChartDataSeries[];

export type AggregateData = Array<{
  label: AllAvailableMetrics;
  value: string | number;
}>;

export type MetricsMap = Record<
  AllAvailableMetrics,
  { label: string; value: string }
>;

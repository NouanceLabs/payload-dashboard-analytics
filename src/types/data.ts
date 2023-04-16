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

type ReportDataValue = { [value: string]: string | number };

export type ReportData = {
  [label: string]: string;
  // @ts-expect-error
  values: ReportDataValue[];
}[];

export type MetricsMap = Record<Metrics, { label: string; value: string }>;

export type PropertiesMap = Record<
  Properties,
  { label: string; value: string }
>;

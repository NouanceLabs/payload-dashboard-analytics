export interface ChartDataPoint {
  timestamp: Date;
  value: number;
}

export interface ChartDataSeries {
  label: string;
  data: ChartDataPoint[];
}

export type ChartData = ChartDataSeries[];

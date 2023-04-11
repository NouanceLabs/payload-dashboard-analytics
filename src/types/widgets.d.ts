export type Timeframes = "12mo" | "6mo" | "30d" | "7d" | "currentMonth";

export type IdMatcherFunction = (document: any) => string;

export type Metrics =
  | "views"
  | "visitors"
  | "sessions"
  | "bounceRate"
  | "sessionDuration";

export interface ChartWidget {
  type: "chart";
  label?: string | "hidden";
  metrics: Metrics[];
  timeframe?: Timeframes;
}

export interface PageChartWidget extends ChartWidget {
  idMatcher: IdMatcherFunction;
}

export type AllAvailableMetrics = Metrics;

export interface InfoWidget {
  type: "info";
  label?: string | "hidden";
  metrics: Metrics[];
  timeframe?: Timeframes;
}

export interface PageInfoWidget extends InfoWidget {
  idMatcher: IdMatcherFunction;
}

export type DashboardWidgets = ChartWidget | InfoWidget;

export type PageWidgets = PageChartWidget | PageInfoWidget;

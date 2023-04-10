export type Timeframes = "12mo" | "6mo" | "30d" | "7d" | "currentMonth";

export type IdMatcherFunction = (document: any) => string;

export type ChartWidgetMetrics = "pageViews" | "uniqueVisitors";

export interface ChartWidget {
  type: "chart";
  label?: string;
  metrics: ChartWidgetMetrics[];
  timeframe: Timeframes;
}

export interface PageChartWidget extends ChartWidget {
  idMatcher: IdMatcherFunction;
}

export type InfoWidgetMetrics =
  | "totalViews"
  | "totalVisitors"
  | "bounceRate"
  | "averageDuration";

export type AllAvailableMetrics = ChartWidgetMetrics | InfoWidgetMetrics;

export interface InfoWidget {
  type: "info";
  label?: string;
  metrics: InfoWidgetMetrics[];
  timeframe: Timeframes;
}

export interface PageInfoWidget extends InfoWidget {
  idMatcher: IdMatcherFunction;
}

export type DashboardWidgets = ChartWidget | InfoWidget;

export type PageWidgets = PageChartWidget | PageInfoWidget;

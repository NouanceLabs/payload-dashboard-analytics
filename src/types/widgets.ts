export type Timeframes = "12mo" | "6mo" | "30d" | "7d" | "currentMonth";

export type IdMatcherFunction = (document: any) => string;

export type Metrics =
  | "views"
  | "visitors"
  | "sessions"
  | "bounceRate"
  | "sessionDuration";

export type Properties =
  | "page"
  /* | "entryPoint"
  | "exitPoint" */
  | "source"
  | "country";

/* Keeping this for later */
export type Reports = "topSources" | "topPages" | "topCountries";

export interface ChartWidget {
  type: "chart";
  metrics: Metrics[];
  timeframe?: Timeframes;
  label?: string | "hidden";
}

export interface PageChartWidget extends ChartWidget {
  idMatcher: IdMatcherFunction;
}

export interface InfoWidget {
  type: "info";
  label?: string | "hidden";
  metrics: Metrics[];
  timeframe?: Timeframes;
}

export interface LiveWidget {
  type: "live";
}

export interface ReportWidget {
  type: "report";
  report: Reports;
  property: Properties;
  metrics: Metrics[];
  timeframe?: Timeframes;
}

export interface PageInfoWidget extends InfoWidget {
  idMatcher: IdMatcherFunction;
}

/* export type DashboardWidgets = ChartWidget | InfoWidget | ReportWidget; */

export type DashboardWidgets = "topPages" | "viewsChart";

export type NavigationWidgets = LiveWidget;

export type PageWidgets = PageChartWidget | PageInfoWidget;

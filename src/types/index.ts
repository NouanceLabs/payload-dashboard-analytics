import type { PlausibleProvider, GoogleProvider } from "./providers";
import type {
  DashboardWidgets,
  PageWidgets,
  NavigationWidgets,
} from "./widgets";

export interface ItemConfig {
  widgets: DashboardWidgets[];
}

export interface PageItemConfig {
  widgets: PageWidgets[];
}

export interface Collection extends PageItemConfig {
  slug: string;
}

export interface Global extends PageItemConfig {
  slug: string;
}

export type Provider = PlausibleProvider | GoogleProvider;

export type AccessControl = (user: any) => boolean;

export type CacheConfig = {
  slug: string;
  routes?: {
    globalAggregate?: number;
    globalChart?: number;
    pageAggregate?: number;
    pageChart?: number;
    report?: number;
    live?: number;
  };
};

export type RouteOptions = {
  access?: AccessControl;
  cache?: CacheConfig;
};

export type DashboardAnalyticsConfig = {
  provider: Provider;
  access?: AccessControl;
  cache?: boolean | CacheConfig;
  collections?: Collection[];
  globals?: Global[];
  navigation?: {
    beforeNavLinks?: NavigationWidgets[];
    afterNavLinks?: NavigationWidgets[];
  };
  dashboard?: {
    beforeDashboard?: DashboardWidgets[];
    afterDashboard?: DashboardWidgets[];
  };
};

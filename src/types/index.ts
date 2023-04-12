import type { PlausibleProvider } from "./providers";
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

export type Provider = PlausibleProvider;

export type AccessControl = (user: any) => boolean;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  access?: AccessControl;
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

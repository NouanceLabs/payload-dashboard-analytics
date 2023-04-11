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

export interface Global extends PageItemConfig {}

export type Provider = PlausibleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  collections?: Collection[];
  navigation?: {
    BeforeNavLinks?: NavigationWidgets[];
    AfterNavLinks?: NavigationWidgets[];
  };
};

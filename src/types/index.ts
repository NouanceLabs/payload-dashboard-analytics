import type { PlausibleProvider } from "./providers";
import type {
  DashboardWidgets,
  PageWidgets,
  IdMatcherFunction,
} from "./widgets";

export interface ItemConfig {
  widgets: DashboardWidgets[];
}

export interface PageItemConfig {
  widgets: PageWidgets[];
}

export interface Collection extends ItemConfig {
  slug: string;
}

export interface Global extends ItemConfig {
  idMatcher: IdMatcherFunction;
}

export type Provider = PlausibleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  collections?: Collection[];
};

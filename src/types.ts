import { Payload } from "payload";
import { Config as PayloadConfig } from "payload/config";

export interface PlausibleProvider {
  source: "plausible";
  apiSecret: string;
  siteId: string;
  host?: string;
}

interface GoogleProvider {
  source: "google";
  credentials: string;
  propertyId: string;
}

interface Collection {
  slug: string;
}

export type Provider = PlausibleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
  collections?: Collection[];
};

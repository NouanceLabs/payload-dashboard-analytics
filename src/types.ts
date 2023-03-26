import { Payload } from "payload";
import { Config as PayloadConfig } from "payload/config";

interface PlausibleProvider {
  source: "plausible";
  apiSecret: string;
  websiteId: string;
}

interface GoogleProvider {
  source: "google";
  credentials: string;
  propertyId: string;
}

type Provider = PlausibleProvider | GoogleProvider;

export type DashboardAnalyticsConfig = {
  provider: Provider;
};

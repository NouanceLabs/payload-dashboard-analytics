export interface PlausibleProvider {
  source: "plausible";
  apiSecret: string;
  siteId: string;
  host?: string;
}

export interface GoogleProvider {
  source: "google";
  propertyId: string;
  credentials?: string;
}

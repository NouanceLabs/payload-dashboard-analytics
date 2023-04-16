export interface PlausibleProvider {
  source: "plausible";
  apiSecret: string;
  siteId: string;
  host?: string;
}

interface GoogleProvider {
  source: "google";
  propertyId: string;
  credentials?: string;
}

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

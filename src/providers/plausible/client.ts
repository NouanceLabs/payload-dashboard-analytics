import type { PlausibleProvider } from "../../types";

function client(provider: PlausibleProvider, endpoint?: string) {
  const host = provider.host ?? `https://plausible.io`;
  const apiVersion = `v1`; // for future use

  const url = new URL(`${host}/api/${apiVersion}${endpoint}`);
  url.searchParams.append("site_id", provider.siteId);

  const plausibleMetrics = [
    "visitors",
    "pageviews",
    "bounce_rate",
    "visit_duration",
  ];

  const baseUrl = String(url.href);
  url.searchParams.append("period", "30d");
  url.searchParams.append("metrics", String(plausibleMetrics));

  return {
    host: host,
    baseUrl: baseUrl,
    url: url,
    fetch: async () =>
      await fetch(url, {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${provider.apiSecret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }),
  };
}

export default client;

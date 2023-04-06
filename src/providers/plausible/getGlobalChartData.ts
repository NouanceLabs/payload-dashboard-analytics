import type { PlausibleProvider } from "../../types";
import client from "./client";

async function getGlobalChartData(provider: PlausibleProvider) {
  const plausibleClient = client(provider, "/stats/timeseries");

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  return data;
}

export default getGlobalChartData;

import type { PlausibleProvider } from "../../types";
import client from "./client";

async function getGlobalAggregateData(provider: PlausibleProvider) {
  const plausibleClient = client(provider, "/stats/aggregate");

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  return data;
}

export default getGlobalAggregateData;

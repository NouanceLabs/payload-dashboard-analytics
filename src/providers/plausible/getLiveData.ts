import type { PlausibleProvider } from "../../types/providers";
import type { LiveDataOptions } from "..";
import type { LiveData } from "../../types/data";
import client from "./client";

async function getLiveData(
  provider: PlausibleProvider,
  options: LiveDataOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/realtime/visitors",
  });

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  const processedData: LiveData = {
    visitors: data,
  };

  return processedData;
}

export default getLiveData;

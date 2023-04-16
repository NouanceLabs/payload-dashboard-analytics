import type { GoogleProvider } from "../../types/providers";
import type { LiveDataOptions } from "..";
import type { LiveData } from "../../types/data";
import client from "./client";

async function getLiveData(provider: GoogleProvider, options: LiveDataOptions) {
  const googleClient = client(provider);

  const request = {
    property: `properties/${provider.propertyId}`,
    dateRanges: [
      {
        startDate: "2023-03-05",
        endDate: "today",
      },
    ],
    /* dimensions: [{ name: "country" }], */
    metrics: [{ name: "activeUsers" }],
  };

  const data = await googleClient.run
    .runRealtimeReport(request)
    .then((data) => data[0].rows?.[0]?.metricValues?.[0]?.value ?? null);

  const processedData: LiveData = {
    visitors: data ? parseInt(data) : 0,
  };

  return processedData;
}

export default getLiveData;

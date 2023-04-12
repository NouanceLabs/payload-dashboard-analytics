import type { PlausibleProvider } from "../../types/providers";
import type { ReportDataOptions } from "..";
import type { ReportData } from "../../types/data";
import client from "./client";

async function getReportData(
  provider: PlausibleProvider,
  options: ReportDataOptions
) {
  const plausibleClient = client(provider, {
    endpoint: "/stats/breakdown",
  });

  const data = await plausibleClient.fetch().then((response) => {
    return response.json();
  });

  const processedData: ReportData = data.results.map((item: any) => {
    return item;
  });

  return processedData;
}

export default getReportData;

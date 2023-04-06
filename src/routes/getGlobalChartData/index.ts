import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getGlobalChartData = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/globalChartData",
    method: "get",
    handler: handler(provider),
  };
};

export default getGlobalChartData;

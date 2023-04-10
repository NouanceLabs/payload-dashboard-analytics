import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getPageChartData = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/pageChartData",
    method: "post",
    handler: handler(provider),
  };
};

export default getPageChartData;

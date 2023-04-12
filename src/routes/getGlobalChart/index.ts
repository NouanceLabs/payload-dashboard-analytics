import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getGlobalChart = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/globalChart",
    method: "post",
    handler: handler(provider),
  };
};

export default getGlobalChart;

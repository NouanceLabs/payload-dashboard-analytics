import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getPageChart = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/pageChart",
    method: "post",
    handler: handler(provider),
  };
};

export default getPageChart;

import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { RouteOptions } from "../../types";
import handler from "./handler";

const getPageChart = (
  provider: ApiProvider,
  options: RouteOptions
): Endpoint => {
  return {
    path: "/analytics/pageChart",
    method: "post",
    handler: handler(provider, options),
  };
};

export default getPageChart;

import type { Endpoint } from "payload/config";
import handler from "./handler";
import type { ApiProvider } from "../../providers";
import type { RouteOptions } from "../../types";

const getReport = (provider: ApiProvider, options: RouteOptions): Endpoint => {
  return {
    path: "/analytics/report",
    method: "post",
    handler: handler(provider, options),
  };
};

export default getReport;

import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { RouteOptions } from "../../types";
import handler from "./handler";

const getPageAggregate = (
  provider: ApiProvider,
  options: RouteOptions
): Endpoint => {
  return {
    path: "/analytics/pageAggregate",
    method: "post",
    handler: handler(provider, options),
  };
};

export default getPageAggregate;

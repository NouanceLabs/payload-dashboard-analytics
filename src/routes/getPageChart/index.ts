import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { AccessControl } from "../../types";
import handler from "./handler";

const getPageChart = (
  provider: ApiProvider,
  access?: AccessControl
): Endpoint => {
  return {
    path: "/analytics/pageChart",
    method: "post",
    handler: handler(provider, access),
  };
};

export default getPageChart;

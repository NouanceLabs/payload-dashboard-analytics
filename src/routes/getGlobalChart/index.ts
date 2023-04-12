import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { AccessControl } from "../../types";
import handler from "./handler";

const getGlobalChart = (
  provider: ApiProvider,
  access?: AccessControl
): Endpoint => {
  return {
    path: "/analytics/globalChart",
    method: "post",
    handler: handler(provider, access),
  };
};

export default getGlobalChart;

import type { Endpoint } from "payload/config";
import handler from "./handler";
import type { ApiProvider } from "../../providers";
import type { AccessControl } from "../../types";

const getReport = (provider: ApiProvider, access?: AccessControl): Endpoint => {
  return {
    path: "/analytics/report",
    method: "post",
    handler: handler(provider, access),
  };
};

export default getReport;

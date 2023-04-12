import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getReport = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/report",
    method: "post",
    handler: handler(provider),
  };
};

export default getReport;

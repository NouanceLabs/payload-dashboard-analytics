import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getPageAggregateData = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/pageAggregateData",
    method: "post",
    handler: handler(provider),
  };
};

export default getPageAggregateData;

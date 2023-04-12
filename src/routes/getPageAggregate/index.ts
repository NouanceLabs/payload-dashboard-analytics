import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getPageAggregate = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/pageAggregate",
    method: "post",
    handler: handler(provider),
  };
};

export default getPageAggregate;

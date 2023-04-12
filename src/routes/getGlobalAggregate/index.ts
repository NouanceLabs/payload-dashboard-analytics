import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getGlobalAggregate = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/globalAggregate",
    method: "post",
    handler: handler(provider),
  };
};

export default getGlobalAggregate;

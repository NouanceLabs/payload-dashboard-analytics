import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getLive = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/live",
    method: "post",
    handler: handler(provider),
  };
};

export default getLive;

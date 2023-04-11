import { Endpoint } from "payload/config";
import handler from "./handler";
import { ApiProvider } from "../../providers";

const getLiveData = (provider: ApiProvider): Endpoint => {
  return {
    path: "/analytics/liveData",
    method: "post",
    handler: handler(provider),
  };
};

export default getLiveData;

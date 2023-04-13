import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { AccessControl } from "../../types";

const handler = (provider: ApiProvider, access?: AccessControl) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { payload, user } = req;

    if (access) {
      const accessControl = access(user);

      if (!accessControl) {
        payload.logger.error("📊 Analytics API: Request fails access control.");
        res
          .status(500)
          .send("Request fails access control. Are you authenticated?");
        return next();
      }
    }

    try {
      console.log("fetching data");
      const data = await provider.getLiveData({});

      res.status(200).send(data);
    } catch (error) {
      payload.logger.error(error);
      res.status(500).send(`📊 Analytics API: ${error}`);
      return next();
    }
  };

  return handler;
};

export default handler;

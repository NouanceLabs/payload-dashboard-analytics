import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { payload } = req;

    try {
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

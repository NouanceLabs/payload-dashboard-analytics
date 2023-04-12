import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import payload from "payload";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    try {
      const { timeframe, metrics } = req.body;
      const data = await provider.getGlobalAggregateData({
        timeframe,
        metrics,
      });
      res.status(200).send(data);
    } catch (error) {
      payload.logger.error(payload);
      res.sendStatus(500);
    }
  };

  return handler;
};

export default handler;

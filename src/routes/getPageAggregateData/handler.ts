import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import payload from "payload";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    try {
      const { timeframe, metrics, pageId } = req.body;

      console.log("reached handler with", timeframe, metrics, pageId);

      const data = await provider.getPageAggregateData({
        timeframe: timeframe,
        metrics: metrics,
        pageId,
      });
      res.status(200).send(data);
    } catch (error) {
      payload.logger.error(error);
      res.status(500);
    }
  };

  return handler;
};

export default handler;

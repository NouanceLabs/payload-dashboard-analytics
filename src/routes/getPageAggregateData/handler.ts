import type { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import type { AggregateData } from "../../types/data";
import payload from "payload";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    try {
      const { timeframe, metrics, pageId } = req.body;

      const data: AggregateData = await provider.getPageAggregateData({
        timeframe: timeframe,
        metrics: metrics,
        pageId,
      });

      res.status(200).send(data);
    } catch (error) {
      payload.logger.error(error);
      res.sendStatus(500);
    }
  };

  return handler;
};

export default handler;

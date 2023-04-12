import type { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import type { AggregateData } from "../../types/data";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { payload } = req;
    const { timeframe, metrics, pageId } = req.body;

    if (!metrics) {
      payload.logger.error("📊 Analytics API: Missing metrics argument.");
      res.status(500).send("Missing metrics argument.");
      return next();
    }

    try {
      const data: AggregateData = await provider
        .getPageAggregateData({
          timeframe: timeframe,
          metrics: metrics,
          pageId,
        })
        .catch((error) => payload.logger.error(error));

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

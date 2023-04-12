import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { payload } = req;
    const { timeframe, metrics } = req.body;

    if (!metrics) {
      payload.logger.error("📊 Analytics API: Missing metrics argument.");
      res.status(500).send("Missing metrics argument.");
      return next();
    }

    try {
      const data = await provider.getGlobalChartData({
        timeframe: timeframe,
        metrics: metrics,
      });

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

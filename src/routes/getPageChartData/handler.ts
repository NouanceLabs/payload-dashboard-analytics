import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import payload from "payload";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    try {
      const { timeframe, metric, pageId } = req.body;
      console.log("reached handler with", timeframe, metric, pageId);
      const data = await provider.getPageChartData({
        timeframe: timeframe,
        metric: metric,
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

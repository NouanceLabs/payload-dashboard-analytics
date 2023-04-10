import { Endpoint } from "payload/config";
import { ApiProvider } from "../../providers";
import payload from "payload";

const handler = (provider: ApiProvider) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    try {
      const { timeframe, metrics, pageId } = req.body;

      const data = await provider.getPageChartData({
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

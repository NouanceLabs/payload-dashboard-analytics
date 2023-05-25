import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { AggregateData } from "../../types/data";
import type { RouteOptions } from "../../types";
import type { Payload } from "payload";
import { dayInMinutes } from "../../utilities/timings";
import { differenceInMinutes } from "date-fns";

const handler = (provider: ApiProvider, options: RouteOptions) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { user } = req;
    const payload: Payload = req.payload;
    const { timeframe, metrics, pageId } = req.body;
    const { access, cache } = options;

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

    if (!metrics) {
      payload.logger.error("📊 Analytics API: Missing metrics argument.");
      res.status(500).send("Missing metrics argument.");
      return next();
    }

    try {
      if (cache) {
        const timeNow = new Date();
        const cacheKey = `pageAggregate|${metrics.join("-")}|${
          timeframe ?? "30d"
        }|${pageId}`;
        const cacheLifetime =
          options.cache?.routes?.pageAggregate ?? dayInMinutes;

        const {
          docs: [cachedData],
        } = await payload.find({
          collection: cache.slug,
          where: {
            and: [
              {
                cacheKey: {
                  equals: cacheKey,
                },
              },
            ],
          },
        });

        if (!cachedData) {
          const data: AggregateData = await provider
            .getPageAggregateData({
              timeframe: timeframe,
              metrics: metrics,
              pageId,
            })
            .catch((error) => payload.logger.error(error));

          await payload.create({
            collection: cache.slug,
            data: {
              cacheKey: cacheKey,
              cacheTimestamp: timeNow.toISOString(),
              data: data,
            },
          });

          res.status(200).send(data);
          return next();
        }

        if (cachedData) {
          if (
            differenceInMinutes(
              timeNow,
              Date.parse(cachedData.cacheTimestamp)
            ) > cacheLifetime
          ) {
            const data: AggregateData = await provider
              .getPageAggregateData({
                timeframe: timeframe,
                metrics: metrics,
                pageId,
              })
              .catch((error) => payload.logger.error(error));

            await payload.update({
              id: cachedData.id,
              collection: cache.slug,
              data: {
                cacheKey: cacheKey,
                cacheTimestamp: timeNow.toISOString(),
                data: data,
              },
            });

            res.status(200).send(data);
            return next();
          } else {
            res.status(200).send(cachedData.data);
            return next();
          }
        }
      }

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

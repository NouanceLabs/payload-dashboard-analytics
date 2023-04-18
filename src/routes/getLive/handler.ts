import type { Endpoint } from "payload/config";
import type { ApiProvider } from "../../providers";
import type { RouteOptions } from "../../types";
import type { Payload } from "payload";
import { differenceInMinutes } from "date-fns";

const handler = (provider: ApiProvider, options: RouteOptions) => {
  const handler: Endpoint["handler"] = async (req, res, next) => {
    const { user } = req;
    const payload: Payload = req.payload;
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

    try {
      if (cache) {
        const timeNow = new Date();
        const cacheKey = "liveData";
        const cacheLifetime = options.cache?.routes?.live ?? 5;

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
          const data = await provider.getLiveData({});

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
              Date.parse(cachedData.cacheTimestamp),
              timeNow
            ) > cacheLifetime
          ) {
            const data = await provider.getLiveData({});

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

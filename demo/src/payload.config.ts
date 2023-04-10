import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import payloadDashboardAnalytics from "../../src/index";
import { PlausibleProvider } from "../../src/types/providers";

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const PLAUSIBLE_HOST = process.env.PLAUSIBLE_HOST;
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID;

const plausibleProvider: PlausibleProvider = {
  source: "plausible",
  apiSecret: PLAUSIBLE_API_KEY,
  siteId: PLAUSIBLE_SITE_ID,
  host: PLAUSIBLE_HOST,
};

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
    // Used for development
    webpack: (config) => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            react: path.join(__dirname, "../node_modules/react"),
            "react-dom": path.join(__dirname, "../node_modules/react-dom"),
            payload: path.join(__dirname, "../node_modules/payload"),
          },
        },
      };

      return newConfig;
    },
  },
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadDashboardAnalytics({
      provider: plausibleProvider,
      collections: [
        {
          slug: Posts.slug,
          widgets: [
            {
              type: "chart",
              label: "Views and visitors",
              metrics: ["views", "visitors", "sessions"],
              timeframe: "30d",
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
            {
              type: "chart",
              metrics: ["sessions"],
              timeframe: "7d",
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
            {
              type: "chart",
              metrics: ["sessionDuration"],
              timeframe: "currentMonth",
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
            /* {
              type: "info",
              metrics: ["views"],
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
            {
              type: "info",
              metrics: ["sessions", "sessionDuration"],
              timeframe: "6mo",
              idMatcher: (document: any) => `/articles/${document.slug}`,
            }, */
          ],
        },
      ],
    }),
  ],
});

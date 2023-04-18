import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import Homepage from "./globals/Homepage";
import dashboardAnalytics from "../../dist/index";

import { PlausibleProvider, GoogleProvider } from "../../dist/types/providers";

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const PLAUSIBLE_HOST = process.env.PLAUSIBLE_HOST;
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID;

const GOOGLE_PROPERTY_ID = process.env.GOOGLE_PROPERTY_ID;
const GOOGLE_CREDENTIALS_FILE = process.env.GOOGLE_CREDENTIALS_FILE;

const plausibleProvider: PlausibleProvider = {
  source: "plausible",
  apiSecret: PLAUSIBLE_API_KEY,
  siteId: PLAUSIBLE_SITE_ID,
  host: PLAUSIBLE_HOST,
};

const googleProvider: GoogleProvider = {
  source: "google",
  //credentials: GOOGLE_CREDENTIALS_FILE,
  propertyId: GOOGLE_PROPERTY_ID,
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
  globals: [Homepage],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    dashboardAnalytics({
      provider: plausibleProvider,
      access: (user: any) => {
        return Boolean(user);
      },
      cache: {
        slug: "dashboardAnalytics",
      },
      navigation: {
        afterNavLinks: [
          {
            type: "live",
          },
        ],
      },
      dashboard: {
        beforeDashboard: ["viewsChart"],
        afterDashboard: ["topPages"],
      },
      globals: [
        {
          slug: "homepage",
          widgets: [
            {
              type: "chart",
              label: "Views and visitors",
              metrics: ["views", "visitors", "sessions"],
              timeframe: "30d",
              idMatcher: () => `/`,
            },
            {
              type: "info",
              label: "Page data",
              metrics: ["views", "sessions", "sessionDuration"],
              timeframe: "currentMonth",
              idMatcher: () => `/`,
            },
          ],
        },
      ],
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
              type: "info",
              label: "Page data",
              metrics: ["views", "sessions", "sessionDuration"],
              timeframe: "currentMonth",
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
          ],
        },
      ],
    }),
  ],
});

import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import payloadDashboardAnalytics from "../../src/index";

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const PLAUSIBLE_HOST = process.env.PLAUSIBLE_HOST;
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID;

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
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
      provider: {
        source: "plausible",
        apiSecret: PLAUSIBLE_API_KEY,
        siteId: PLAUSIBLE_SITE_ID,
        host: PLAUSIBLE_HOST,
      },
      collections: [
        {
          slug: Posts.slug,
        },
      ],
    }),
  ],
});

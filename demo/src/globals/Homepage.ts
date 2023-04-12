import { GlobalConfig } from "payload/types";

const Homepage: GlobalConfig = {
  slug: "homepage",
  fields: [
    {
      name: "featuredPost",
      type: "relationship",
      relationTo: "posts",
    },
  ],
};

export default Homepage;

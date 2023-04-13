import type { Config } from "payload/config";
import path from "path";
import type { Configuration as WebpackConfig } from "webpack";
import type { Provider } from "./types";

const mockModulePath = path.resolve(__dirname, "mocks/serverModule.js");

/* Some providers may need their own list of mocked modules to avoid react errors and bundling of node modules */
const aliasMap: Record<Provider["source"], any> = {
  google: {
    [path.resolve(__dirname, "./providers/google/client")]: mockModulePath,
    [path.resolve(__dirname, "./providers/google/getLiveData")]: mockModulePath,
    "@google-analytics/data": mockModulePath,
    url: mockModulePath,
    querystring: mockModulePath,
    fs: mockModulePath,
    os: mockModulePath,
    stream: mockModulePath,
    child_process: mockModulePath,
    util: mockModulePath,
    net: mockModulePath,
    tls: mockModulePath,
    assert: mockModulePath,
    request: mockModulePath,
  },
  plausible: {
    [path.resolve(__dirname, "./providers/plausible/client")]: mockModulePath,
  },
};

export const extendWebpackConfig =
  (
    config: Config,
    provider: Provider["source"]
  ): ((webpackConfig: WebpackConfig) => WebpackConfig) =>
  (webpackConfig) => {
    const existingWebpackConfig =
      typeof config.admin?.webpack === "function"
        ? config.admin.webpack(webpackConfig)
        : webpackConfig;

    return {
      ...existingWebpackConfig,
      resolve: {
        ...(existingWebpackConfig.resolve || {}),
        alias: {
          ...(existingWebpackConfig.resolve?.alias
            ? existingWebpackConfig.resolve.alias
            : {}),
          express: mockModulePath,
          ...aliasMap[provider],
        },
      },
    };
  };

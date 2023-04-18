# Payload Dashboard Analytics Plugin

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to connect analytics data to your Payload dashboard.

Features:

- Chart widgets on collections, globals and dashboard
- Live users indicator in sidebar
- Aggregate data widgets on collections and globals
- Basic report widgets on dashboard
- Support for Plausible and Google Analytics

## Installation

```bash
  yarn add @nouance/payload-dashboard-analytics
  # OR
  npm i @nouance/payload-dashboard-analytics
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```ts
// ...
payloadDashboardAnalytics({
  provider: {
    source: "plausible",
    apiSecret: PLAUSIBLE_API_KEY,
    siteId: PLAUSIBLE_SITE_ID,
    host: PLAUSIBLE_HOST, // optional, for self-hosted instances
  },
  cache: true,
  access: (user: any) => {
    return Boolean(user);
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
      ],
    },
  ],
}),

// ...
```

## Configuration

- `provider` | required

  Configuration for a [supported provider](#providers).

- `access` | optional

  Accepts a function that takes in the req.user object to determine access to the API routes. **By default the routes are unprotected.**

  Example to allow only authenticated users:

  ```ts
  access: (user: any) => Boolean(user);
  ```

- `cache` | optional

  Accepts a boolean or a configuration object for cache management. **Defaults to false**.  
  This creates a new collection type that will store cached data so that you don't get limited by the API.

  ```ts
  cache: true;
  ```

  - `slug` | optional

    You can customise the slug of this new collection to avoid conflicts. Defaults to `analyticsData`.

  - `routes` | optional

    By default all routes are cached to one day. This is because for most analytics platforms the data report is about one day out anyway. Live data is cached to 5 minutes.

    Object with any of these keys `globalAggregate` `globalChart` `pageAggregate` `pageChart` `report` `live` set to a number in minutes.

    ```ts
    routes?: {
      globalAggregate: 1440;
      globalChart: 1440;
      pageAggregate: 1440;
      pageChart: 1440;
      report: 1440;
      live: 5;
    };
    ```

- `navigation` | optional

  Object of either `beforeNavLinks` `afterNavLinks` which are arrays of [navigation widgets](#navigation).

- `dashboard` | optional

  Object of either `beforeDashboard` `afterDashboard` which are arrays of [dashboard widgets](#dashboard).

- `globals` | optional

  Array of global configurations requiring a slug and an array of [page widgets](#page).

- `collections` | optional

  Array of collection configurations requiring a slug and an array of [page widgets](#page).

## Widgets

A full list of supported widgets. Due to some time limitations or API constraints the selection may be limited.

### Navigation

Navigation widgets have no configuration.

#### Live visitors

![Screenshot from 2023-04-12 18-12-58](https://user-images.githubusercontent.com/35137243/231445032-37f06d87-11cc-47aa-894f-e893e185c3ea.png)

**type** `live`

```ts
{
  type: "live";
}
```

### Dashboard

Dashboard widgets have no configuration.

#### Views chart

![Screenshot from 2023-04-12 18-13-28](https://user-images.githubusercontent.com/35137243/231444975-55154b82-5a91-46fd-b31b-64724e7e48c2.png)

**type** `viewsChart`

```ts
["viewsChart"];
```

#### Top pages

![Screenshot from 2023-04-12 18-13-36](https://user-images.githubusercontent.com/35137243/231444945-b92e3fd0-b60f-4777-9342-97edf9a7ccd9.png)

**type** `topPages`

```ts
["topPages"];
```

### Page

Page widgets have more configuration available with custom timeframes and metrics. These are usable on both globals and collections.

#### Page chart

![Screenshot from 2023-04-12 18-13-08](https://user-images.githubusercontent.com/35137243/231444858-89c987a5-5e42-419e-935c-70a7feb9a1b4.png)

- **type** | `chart` | required

- **label** | string or `hidden` | optional  
  Sets a custom label for the component in the frontend, defaults to a list of metrics and it's accompanied by the timeframe.  
  If `hidden` then the label is not displayed.

- **metrics** | metric[] | required  
  Array of metrics to fetch data for. See list of [available metrics](#metrics).

- **timeframe** | timeframe | optional  
  Defaults to `30d`. See list of [available timeframes](#timeframes).

- **idMatches** | function | required
  A function that takes in the published document from the React hook `useDocument` and returns a string that matches the current page to a page in the analytics data.

```ts
{
  type: "chart",
  label: "Views and visitors",
  metrics: ["views", "visitors", "sessions"],
  timeframe: "30d",
  idMatcher: (document: any) => `/blog/${document.slug}`,
}
```

#### Page info

![Screenshot from 2023-04-12 18-13-17](https://user-images.githubusercontent.com/35137243/231444901-ddfbef1d-d433-4f52-a5c9-d0757b07e04d.png)

- **type** | `info` | required

- **label** | string or `hidden` | optional  
  Sets a custom label for the component in the frontend, defaults to a list of metrics and it's accompanied by the timeframe.  
  If `hidden` then the label is not displayed.

- **metrics** | metric[] | required  
  Array of metrics to fetch data for. See list of [available metrics](#metrics).

- **timeframe** | timeframe | optional  
  Defaults to `30d`. See list of [available timeframes](#timeframes).

- **idMatches** | function | required
  A function that takes in the published document from the React hook `useDocument` and returns a string that matches the current page to a page in the analytics data.

```ts
{
  type: "info",
  label: "Views and visitors",
  metrics: ["views", "visitors", "sessions"],
  timeframe: "7d",
  idMatcher: (document: any) => `/blog/${document.slug}`,
}
```

### Timeframes

Currently supported timeframes.

- `12mo`
- `6mo`
- `30d`
- `7d`
- `currentMonth` limits the data period to the current month

### Metrics

A full list of currently supported metrics, each provider will map these on their own internally to the API they communicate with.

- `views`
- `visitors`
- `sessions`
- `sessionDuration`
- `bounceRate`

### Properties

Properties are used to generate reports, currently the widgets are limited in configuration but these should be fully supported via the API routes.

- `page`
- `source`
- `entryPoint`
- `exitPoint`
- `country`

## Providers

### Plausible

We support Plausible's Stats API, more [information on their website](https://plausible.io/docs/stats-api).

- **source** | "plausible" | required

- **apiSecret** | string | required
  You can generate an API secret in the admin panel of Plausible.

- **siteId** | string | required

- **host** | string | optional

  Set this value to the full domain host including protocol if you're self hosting Plausible, eg. `https://plausible.example.com`

Example

```ts
const plausibleProvider: PlausibleProvider = {
  source: "plausible",
  apiSecret: PLAUSIBLE_API_KEY,
  siteId: PLAUSIBLE_SITE_ID,
  host: PLAUSIBLE_HOST,
};
```

### Google Analytics

We support the GA4 Analytics API only. You will need to get a credentials file from [Google here](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries), and follow the initial setup instructions so that these credentials have the correct read access to your analytics data.

- **source** | "google" | required

- **propertyId** | string | required
  The id of your target property, you can find this information in the GA property settings panel.

- **credentials** | string | optional
  Path to your credentials.json file, make sure the filesystem has access to this, alternatively, set an environment variable named `GOOGLE_APPLICATION_CREDENTIALS` with the path to the credentials file.

Example

```ts
const googleProvider: GoogleProvider = {
  source: "google",
  credentials: GOOGLE_CREDENTIALS_FILE,
  propertyId: GOOGLE_PROPERTY_ID,
};
```

## API

To do, add API documentation.

## Known issues

Multi-metric charts have a floating tooltip in the wrong position, this is a problem upstream.

## Development

For development purposes, there is a full working example of how this plugin might be used in the [demo](./demo) of this repo. Then:

```bash
git clone git@github.com:NouanceLabs/payload-dashboard-analytics.git \
  cd payload-dashboard-analytics && yarn \
  cd demo && yarn \
  cp .env.example .env \
  vim .env \ # add your API creds to this file
  yarn dev
```

### Add custom provider

Tbd

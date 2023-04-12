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

**type** `live`

```ts
{
  type: "live";
}
```

### Dashboard

Dashboard widgets have no configuration.

#### Views chart

**type** `viewsChart`

```ts
["viewsChart"];
```

#### Top pages

**type** `topPages`

```ts
["topPages"];
```

### Page

Page widgets have more configuration available with custom timeframes and metrics. These are usable on both globals and collections.

#### Page chart

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

### Google Analytics

tbd

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

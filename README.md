# Payload Dashboard Analytics Plugin (ALPHA)

**Expect breaking changes.**

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to connect analytics data to your Payload dashboard.

Roadmap to stable release:

- Support for GA
- Support for Plausible

## Installation

```bash
  yarn add @nouance/payload-dashboard-analytics
  # OR
  npm i @nouance/payload-dashboard-analytics
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```ts
// add example
```

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

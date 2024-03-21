import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import million from "million/compiler"
import manifest from './manifest.json'
import react from '@vitejs/plugin-react-swc'
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    million.vite({}),
    crx({ manifest }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: 'betterseqtaplus-main',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: 'betterseqtaplus-popup',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
})
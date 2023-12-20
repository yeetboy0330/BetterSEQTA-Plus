import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 3004,
    hmr: {
      port: 8989,
      overlay: false,
    }
  }
})
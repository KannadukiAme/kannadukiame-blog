import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
  site: 'https://kannadukiame.netlify.app',
  integrations: [sitemap(), tailwind(), svelte()],
})

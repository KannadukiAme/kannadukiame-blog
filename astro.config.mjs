import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
  build: {
    inlineStylesheets: 'auto',
  },
  site: 'https://kannadukiame.netlify.app',
  integrations: [sitemap(), tailwind(), react()],
})

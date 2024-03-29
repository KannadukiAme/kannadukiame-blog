import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkToc, { heading: '目录' }]],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  site: 'https://kannadukiame.netlify.app',
  integrations: [sitemap(), tailwind(), svelte()],
})

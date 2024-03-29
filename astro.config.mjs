import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import react from '@astrojs/react'

export default defineConfig({
  build: {
		inlineStylesheets: "auto",
	},
  integrations: [sitemap(), tailwind(), image(), react()],
})

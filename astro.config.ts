import { defineConfig, fontProviders } from 'astro/config'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import remarkToc from 'remark-toc'
import pagefind from 'astro-pagefind'

// https://astro.build/config
export default defineConfig({
  integrations: [pagefind(), svelte()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [[remarkToc, { heading: '目录', maxDepth: 3 }]]
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'LXGW WenKai',
      cssVariable: '--font-lxgw-wenkai',
      styles: ['normal'],
      weights: ['700']
    }
  ]
})

import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: "**\/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    heroImage: z.string(),
    pubDate: z.date(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    description: z.string(),
    tags: z.array(z.string())
  }),
})

export const collections = { posts }

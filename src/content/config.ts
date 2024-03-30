import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
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

export const collections = { posts: postsCollection }

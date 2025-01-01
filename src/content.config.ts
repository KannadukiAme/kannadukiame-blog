import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { file } from "astro/loaders"
import { parse as parseCsv } from "csv-parse/sync"
import { v4 } from 'uuid'


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

const playlists = defineCollection({
  loader: file("./src/data/playlists/aniuta.csv", {
    parser: (text) => {
      const data = parseCsv(text, {
        columns: true,
        skip_empty_lines: true,
      })
      return {
        ...data
      }
    }
  })
})

export const collections = { posts, playlists }

import { getCollection } from 'astro:content'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export interface BlogStats {
  totalArticles: number
  totalWords: number
  totalImages: number
  firstArticleDate: Date
  daysSinceFirstArticle: number
}

function countWords(text: string): number {
  // Remove frontmatter
  const withoutFrontmatter = text.replace(/^---[\s\S]*?---/, '')
  // Split by whitespace and filter empty strings
  const words = withoutFrontmatter.trim().split(/\s+/).filter(Boolean)
  return words.length
}

async function countFilesRecursive(dirPath: string): Promise<number> {
  let count = 0
  try {
    const entries = await readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        count += await countFilesRecursive(join(dirPath, entry.name))
      } else {
        count++
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }
  return count
}

export async function getBlogStats(): Promise<BlogStats> {
  try {
    // Get all posts from the collection
    const posts = await getCollection('posts')

    // Count total articles
    const totalArticles = posts.length

    // Calculate total words
    let totalWords = 0
    for (const post of posts) {
      const content = post.body // body contains the raw markdown content
      totalWords += countWords(content)
    }

    // Count images
    const imagesPath = join(process.cwd(), 'src', 'assets', 'images')
    const totalImages = await countFilesRecursive(imagesPath)

    // Find earliest article date
    const dates = posts.map((p) => p.data.pubDate)
    const firstArticleDate = new Date(
      Math.min(...dates.map((d) => d.getTime()))
    )

    // Calculate days since first article
    const today = new Date()
    const daysSinceFirstArticle = Math.floor(
      (today.getTime() - firstArticleDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return {
      totalArticles,
      totalWords,
      totalImages,
      firstArticleDate,
      daysSinceFirstArticle
    }
  } catch (error) {
    console.error('Error calculating blog stats:', error)
    return {
      totalArticles: 0,
      totalWords: 0,
      totalImages: 0,
      firstArticleDate: new Date(),
      daysSinceFirstArticle: 0
    }
  }
}

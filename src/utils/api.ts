export function countWordsAndTime(rawContent: string): {
  wordCount: number
  readingTime: number
} {
  // 去掉 markdown 语法
  const pureText = rawContent
    .replace(/```[\s\S]*?```/g, '') // code block
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // image
    .replace(/\[.*?\]\(.*?\)/g, '') // link
    .replace(/[#>*_~\-]/g, '')
    .replace(/\s+/g, '')

  // 中文/日文通常用「字符数」
  const wordCount = pureText.length

  const readingTime = Math.ceil(wordCount / 400) // 400字/分钟

  return { wordCount, readingTime }
}

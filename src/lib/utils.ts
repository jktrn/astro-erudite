import { getEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `${readingTimeMinutes} min read`
}

export async function parseAuthors(authors: string[]) {
  if (!authors || authors.length === 0) return []

  const parseAuthor = async (slug: string) => {
    try {
      const author = await getEntry('authors', slug)
      return {
        name: author?.data?.name || slug,
        avatar: author?.data?.avatar || '/512x512.png',
        isRegistered: !!author,
      }
    } catch (error) {
      console.error(`Error fetching author with slug ${slug}:`, error)
      return {
        name: slug,
        avatar: '/512x512.png',
        isRegistered: false,
      }
    }
  }

  return await Promise.all(authors.map(parseAuthor))
}

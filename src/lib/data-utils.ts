import { getCollection, render, type CollectionEntry } from 'astro:content'
import { readingTime, calculateWordCountFromHtml } from '@/lib/utils'

export async function getAllAuthors(): Promise<CollectionEntry<'authors'>[]> {
  return await getCollection('authors')
}

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft && !isSubitem(post.id))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getAllPostsAndSubposts(): Promise<
  CollectionEntry<'blog'>[]
> {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

// Generic helper functions that work with any collection
export function isSubitem(itemId: string): boolean {
  return itemId.includes('/')
}

export function getParentItemId(subitemId: string): string {
  return subitemId.split('/')[0]
}

// Specific collection helpers using generic functions
export function isSubpost(postId: string): boolean {
  return isSubitem(postId)
}

export function isSubwork(workId: string): boolean {
  return isSubitem(workId)
}

export function getParentId(subpostId: string): string {
  return getParentItemId(subpostId)
}

export function getParentWorkId(subworkId: string): string {
  return getParentItemId(subworkId)
}

export async function getAllWorks(): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works')
  return works
    .filter((work) => !isSubitem(work.id))
    .sort((a, b) => {
      const dateA = (a.data.dateUpdated ?? a.data.datePublished).getTime()
      const dateB = (b.data.dateUpdated ?? b.data.datePublished).getTime()
      return dateB - dateA
    })
}

export async function getAllWorksAndSubworks(): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works')
  return works.sort((a, b) => {
    const dateA = (a.data.dateUpdated ?? a.data.datePublished).getTime()
    const dateB = (b.data.dateUpdated ?? b.data.datePublished).getTime()
    return dateB - dateA
  })
}

export async function getSubworksForParent(
  parentId: string,
): Promise<CollectionEntry<'works'>[]> {
  const works = await getCollection('works')
  return works
    .filter(
      (work) =>
        isSubitem(work.id) &&
        getParentItemId(work.id) === parentId,
    )
    .sort((a, b) => {
      const dateDiff = a.data.datePublished.valueOf() - b.data.datePublished.valueOf()
      if (dateDiff !== 0) return dateDiff

      const orderA = a.data.order ?? 0
      const orderB = b.data.order ?? 0
      return orderA - orderB
    })
}

export async function getWorkById(
  workId: string,
): Promise<CollectionEntry<'works'> | null> {
  const allWorks = await getAllWorksAndSubworks()
  return allWorks.find((work) => work.id === workId) || null
}

export async function getCombinedWorkReadingTime(workId: string): Promise<string> {
  const work = await getWorkById(workId)
  if (!work) return readingTime(0)

  let totalWords = calculateWordCountFromHtml(work.body)

  if (!isSubitem(workId)) {
    const subworks = await getSubworksForParent(workId)
    for (const subwork of subworks) {
      totalWords += calculateWordCountFromHtml(subwork.body)
    }
  }

  return readingTime(totalWords)
}

export async function getWorkReadingTime(workId: string): Promise<string> {
  const work = await getWorkById(workId)
  if (!work) return readingTime(0)

  const wordCount = calculateWordCountFromHtml(work.body)
  return readingTime(wordCount)
}

export async function hasSubworks(workId: string): Promise<boolean> {
  const subworks = await getSubworksForParent(workId)
  return subworks.length > 0
}

export async function getSubworkCount(parentId: string): Promise<number> {
  const subworks = await getSubworksForParent(parentId)
  return subworks.length
}

export async function getParentWork(
  subworkId: string,
): Promise<CollectionEntry<'works'> | null> {
  if (!isSubitem(subworkId)) {
    return null
  }

  const parentId = getParentItemId(subworkId)
  const allWorks = await getAllWorks()
  return allWorks.find((work) => work.id === parentId) || null
}

export async function getAdjacentWorks(currentId: string): Promise<{
  newer: CollectionEntry<'works'> | null
  older: CollectionEntry<'works'> | null
  parent: CollectionEntry<'works'> | null
}> {
  const allWorks = await getAllWorks()

  if (isSubitem(currentId)) {
    const parentId = getParentItemId(currentId)
    const parent = allWorks.find((work) => work.id === parentId) || null

    const works = await getCollection('works')
    const subworks = works
      .filter(
        (work) =>
          isSubitem(work.id) &&
          getParentItemId(work.id) === parentId,
      )
      .sort((a, b) => {
        const dateDiff = a.data.datePublished.valueOf() - b.data.datePublished.valueOf()
        if (dateDiff !== 0) return dateDiff

        const orderA = a.data.order ?? 0
        const orderB = b.data.order ?? 0
        return orderA - orderB
      })

    const currentIndex = subworks.findIndex((work) => work.id === currentId)
    if (currentIndex === -1) {
      return { newer: null, older: null, parent }
    }

    return {
      newer:
        currentIndex < subworks.length - 1 ? subworks[currentIndex + 1] : null,
      older: currentIndex > 0 ? subworks[currentIndex - 1] : null,
      parent,
    }
  }

  // For parent works, check if it has subworks
  const subworks = await getSubworksForParent(currentId)
  
  if (subworks.length > 0) {
    // If it has subworks, "newer" points to the first chapter
    return {
      newer: subworks[0],
      older: null,
      parent: null,
    }
  }

  // Otherwise, navigate to adjacent parent works
  const parentWorks = allWorks.filter((work) => !isSubitem(work.id))
  const currentIndex = parentWorks.findIndex((work) => work.id === currentId)

  if (currentIndex === -1) {
    return { newer: null, older: null, parent: null }
  }

  return {
    newer: currentIndex > 0 ? parentWorks[currentIndex - 1] : null,
    older:
      currentIndex < parentWorks.length - 1
        ? parentWorks[currentIndex + 1]
        : null,
    parent: null,
  }
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPosts()
  const works = await getAllWorks()
  
  const tagMap = new Map<string, number>()
  
  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  works.forEach((work) => {
    work.data.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return tagMap
}

export async function getAllFandoms(): Promise<Map<string, number>> {
  const works = await getAllWorks()
  const fandomMap = new Map<string, number>()

  works.forEach((work) => {
    work.data.fandoms?.forEach((fandoms) => {
      fandomMap.set(fandoms, (fandomMap.get(fandoms) || 0) + 1)
    })
  })

  return fandomMap
}

export async function getAllShips(): Promise<Map<string, number>> {
  const works = await getAllWorks()
  const shipMap = new Map<string, number>()

  works.forEach((work) => {
    work.data.relationships?.forEach((ship) => {
      shipMap.set(ship, (shipMap.get(ship) || 0) + 1)
    })
  })

  return shipMap
}

export async function getAdjacentPosts(currentId: string): Promise<{
  newer: CollectionEntry<'blog'> | null
  older: CollectionEntry<'blog'> | null
  parent: CollectionEntry<'blog'> | null
}> {
  const allPosts = await getAllPosts()

  if (isSubitem(currentId)) {
    const parentId = getParentItemId(currentId)
    const allPosts = await getAllPosts()
    const parent = allPosts.find((post) => post.id === parentId) || null

    const posts = await getCollection('blog')
    const subposts = posts
      .filter(
        (post) =>
          isSubitem(post.id) &&
          getParentItemId(post.id) === parentId &&
          !post.data.draft,
      )
      .sort((a, b) => {
        const dateDiff = a.data.date.valueOf() - b.data.date.valueOf()
        if (dateDiff !== 0) return dateDiff

        const orderA = a.data.order ?? 0
        const orderB = b.data.order ?? 0
        return orderA - orderB
      })

    const currentIndex = subposts.findIndex((post) => post.id === currentId)
    if (currentIndex === -1) {
      return { newer: null, older: null, parent }
    }

    return {
      newer:
        currentIndex < subposts.length - 1 ? subposts[currentIndex + 1] : null,
      older: currentIndex > 0 ? subposts[currentIndex - 1] : null,
      parent,
    }
  }

  const parentPosts = allPosts.filter((post) => !isSubitem(post.id))
  const currentIndex = parentPosts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { newer: null, older: null, parent: null }
  }

  return {
    newer: currentIndex > 0 ? parentPosts[currentIndex - 1] : null,
    older:
      currentIndex < parentPosts.length - 1
        ? parentPosts[currentIndex + 1]
        : null,
    parent: null,
  }
}

export async function getPostsByAuthor(
  authorId: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.authors?.includes(authorId))
}

export async function getPostsByTag(
  tag: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.tags?.includes(tag))
}

export async function getWorksByTag(
  tag: string,
): Promise<CollectionEntry<'works'>[]> {
  const works = await getAllWorks()
  return works.filter((work) => work.data.tags?.includes(tag))
}

export async function getWorksByFandom(
  fandom: string,
): Promise<CollectionEntry<'works'>[]> {
  const works = await getAllWorks()
  return works.filter((work) => work.data.fandoms?.includes(fandom))
}

export async function getWorksByShip(
  ship: string,
): Promise<CollectionEntry<'works'>[]> {
  const works = await getAllWorks()
  return works.filter((work) => work.data.relationships?.includes(ship))
}

export async function getRecentPosts(
  count: number,
): Promise<CollectionEntry<'works'>[]> {
  const posts = await getAllWorks()
  return posts.slice(0, count)
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()
  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export async function getSortedFandoms(): Promise<
  { fandom: string; count: number }[]
> {
  const fandomCounts = await getAllFandoms()
  return [...fandomCounts.entries()]
    .map(([fandom, count]) => ({ fandom, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.fandom.localeCompare(b.fandom)
    })
}

export async function getSortedShips(): Promise<
  { ship: string; count: number }[]
> {
  const shipCounts = await getAllShips()
  return [...shipCounts.entries()]
    .map(([ship, count]) => ({ ship, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.ship.localeCompare(b.ship)
    })
}

export async function getSubpostsForParent(
  parentId: string,
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog')
  return posts
    .filter(
      (post) =>
        !post.data.draft &&
        isSubitem(post.id) &&
        getParentItemId(post.id) === parentId,
    )
    .sort((a, b) => {
      const dateDiff = a.data.date.valueOf() - b.data.date.valueOf()
      if (dateDiff !== 0) return dateDiff

      const orderA = a.data.order ?? 0
      const orderB = b.data.order ?? 0
      return orderA - orderB
    })
}

export function groupPostsByYear(
  posts: CollectionEntry<'blog'>[],
): Record<string, CollectionEntry<'blog'>[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<'blog'>[]>, post) => {
      const year = post.data.date.getFullYear().toString()
      ;(acc[year] ??= []).push(post)
      return acc
    },
    {},
  )
}

export async function hasSubposts(postId: string): Promise<boolean> {
  const subposts = await getSubpostsForParent(postId)
  return subposts.length > 0
}

export async function getParentPost(
  subpostId: string,
): Promise<CollectionEntry<'blog'> | null> {
  if (!isSubitem(subpostId)) {
    return null
  }

  const parentId = getParentItemId(subpostId)
  const allPosts = await getAllPosts()
  return allPosts.find((post) => post.id === parentId) || null
}

export async function parseAuthors(authorIds: string[] = []) {
  if (!authorIds.length) return []

  const allAuthors = await getAllAuthors()
  const authorMap = new Map(allAuthors.map((author) => [author.id, author]))

  return authorIds.map((id) => {
    const author = authorMap.get(id)
    return {
      id,
      name: author?.data?.name || id,
      avatar: author?.data?.avatar || '/static/logo.png',
      isRegistered: !!author,
    }
  })
}

export async function getPostById(
  postId: string,
): Promise<CollectionEntry<'blog'> | null> {
  const allPosts = await getAllPostsAndSubposts()
  return allPosts.find((post) => post.id === postId) || null
}

export async function getSubpostCount(parentId: string): Promise<number> {
  const subposts = await getSubpostsForParent(parentId)
  return subposts.length
}

export async function getCombinedReadingTime(postId: string): Promise<string> {
  const post = await getPostById(postId)
  if (!post) return readingTime(0)

  let totalWords = calculateWordCountFromHtml(post.body)

  if (!isSubitem(postId)) {
    const subposts = await getSubpostsForParent(postId)
    for (const subpost of subposts) {
      totalWords += calculateWordCountFromHtml(subpost.body)
    }
  }

  return readingTime(totalWords)
}

export async function getPostReadingTime(postId: string): Promise<string> {
  const post = await getPostById(postId)
  if (!post) return readingTime(0)

  const wordCount = calculateWordCountFromHtml(post.body)
  return readingTime(wordCount)
}

export type TOCHeading = {
  slug: string
  text: string
  depth: number
  isSubpostTitle?: boolean
}

export type TOCSection = {
  type: 'parent' | 'subpost'
  title: string
  headings: TOCHeading[]
  subpostId?: string
}

export async function getTOCSections(postId: string): Promise<TOCSection[]> {
  const post = await getPostById(postId)
  if (!post) return []

  const parentId = isSubitem(postId) ? getParentItemId(postId) : postId
  const parentPost = isSubitem(postId) ? await getPostById(parentId) : post

  if (!parentPost) return []

  const sections: TOCSection[] = []

  const { headings: parentHeadings } = await render(parentPost)
  if (parentHeadings.length > 0) {
    sections.push({
      type: 'parent',
      title: 'Overview',
      headings: parentHeadings.map((heading) => ({
        slug: heading.slug,
        text: heading.text,
        depth: heading.depth,
      })),
    })
  }

  const subposts = await getSubpostsForParent(parentId)
  for (const subpost of subposts) {
    const { headings: subpostHeadings } = await render(subpost)
    if (subpostHeadings.length > 0) {
      sections.push({
        type: 'subpost',
        title: subpost.data.title,
        headings: subpostHeadings.map((heading, index) => ({
          slug: heading.slug,
          text: heading.text,
          depth: heading.depth,
          isSubpostTitle: index === 0,
        })),
        subpostId: subpost.id,
      })
    }
  }

  return sections
}

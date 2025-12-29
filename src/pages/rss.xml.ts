import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllWorks } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    const posts = await getAllWorks()

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: posts.map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: post.data.datePublished,
        link: `/blog/${post.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}

import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { getCollection } from "astro:content";

export async function GET(context) {
  // const publications = (await getCollection("publications")).filter(
  //   (publication) => !publication.data.draft,
  // );

  // const items = [...blog, ...publications].sort(
  //   (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  // );
  try {
    const blog = (await getCollection("blog")).filter((post) => !post.data.draft);

    // Filter posts by tag 'rss-feed'
    const filteredBlogs = blog.filter(post => post.data.tags && post.data.tags.includes('rss-feed'));

    // Sort posts by date
    const items = [...filteredBlogs].sort(
      (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    );

    // Return RSS feed
    return rss({
      title: SITE.TITLE,
      description: SITE.DESCRIPTION,
      site: context.site,
      items: items.map((item) => ({
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.date,
        link: `/${item.collection}/${item.slug}/`,
      })),
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}

export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  SITEURL: string
}

export const SITE: Site = {
  TITLE: 'astro-erudite',
  DESCRIPTION: 'astro-erudite is a opinionated, no-frills blogging template. Built with Astro.',
  EMAIL: 'youremail@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 2,
  SITEURL: 'https://astro-erudite.vercel.app',
}

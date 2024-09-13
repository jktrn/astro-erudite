export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  NUM_POSTS_ON_HOMEPAGE: number
  SITEURL: string
}

export type NavigationLink = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: 'astro-erudite',
  DESCRIPTION:
    'astro-erudite is a opinionated, no-frills blogging template—built with Astro, Tailwind, and shadcn/ui.',
  EMAIL: 'jason@enscribe.dev',
  NUM_POSTS_ON_HOMEPAGE: 2,
  SITEURL: 'https://astro-erudite.vercel.app',
}

export const NAV_LINKS: NavigationLink[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
]

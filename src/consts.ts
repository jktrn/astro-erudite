import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'worldwidewong',
  description:
    'My corner of the world wide web. My name is Brendan Wong',
  href: 'https://astro-erudite.vercel.app',
  author: 'bww',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/gallery',
    label: 'gallery',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  /* {
    href: 'https://github.com/jktrn',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/enscry',
    label: 'Twitter',
  }, */
  {
    href: 'mailto:brendanwong24@gmail.com',
    label: 'Email',
  },
  {
    href: 'https://instagram.com/uglyf1acko',
    label: 'Instagram',
  },
]

export const LANGUAGES: String[] = [
  "English, Native", "Chinese, Professional fluency", "German, B2, Professional fluency", "Korean, limeted working profeciency"
]


export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
  Instagram: 'lucide:instagram'
}

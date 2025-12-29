import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'serendure',
  description:
    'A personal fan fiction archive by AO3 user serendure',
  href: 'https://serendure.neocities.org',
  author: 'serendure',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/works',
    label: 'works',
  },
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/blog',
    label: 'blog',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://archiveofourown.org/users/serendure',
    label: 'AO3',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
  AO3: 'lucide:archive'
}

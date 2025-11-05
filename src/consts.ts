import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'blog.prdai.dev',
  description: "just a guy's thoughts on tech",
  href: 'https://blog.prdai.dev/',
  author: 'prdai',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/Programmer-RD-AI',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/programmer-rd-ai/',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:go2ranuga@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

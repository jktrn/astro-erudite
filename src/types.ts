export type Site = {
  title: string
  description: string
  href: string
  author: string
  locale: string
  featuredPostCount: number
  postsPerPage: number
}

export type SocialLink = {
  href: string
  label: string
}

export type FigureImage = {
  src: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

export type IconMap = {
  [key: string]: string
}

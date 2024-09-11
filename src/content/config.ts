import { defineCollection, reference, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    image: z.string().optional(),

    tags: z.array(z.string()).optional(),
    author: z.union([reference('authors'), z.string()]).optional(),
  }),
})

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    avatar: z.string().url(),
    bio: z.string().optional(),
    website: z.string().url().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    mail: z.string().email().optional(),
    discord: z.string().optional(),
  }),
})

export const collections = { blog, authors }

import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url().or(z.string().startsWith('/')),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
    ao3: z.string().url().optional(),
  }),
})

// const projects = defineCollection({
//   loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
//   schema: ({ image }) =>
//     z.object({
//       name: z.string(),
//       description: z.string(),
//       tags: z.array(z.string()),
//       image: image(),
//       link: z.string().url(),
//       startDate: z.coerce.date().optional(),
//       endDate: z.coerce.date().optional(),
//     }),
// })

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: ({ image }) => 
    z.object({
      ao3Id: z.string().optional(),
      title: z.string(),
      fandoms: z.array(z.string()).optional(), // for chapters
      summary: z.string(),
      tags: z.array(z.string()).optional(),
      datePublished: z.coerce.date(),
      dateUpdated: z.coerce.date().optional(),
      authors: z.array(z.string()).optional(),
      rating: z.string().optional(),
      warnings: z.array(z.string()).optional(),
      relationships: z.array(z.string()).optional(),
      category: z.array(z.string()).optional(),
      status: z.string().optional(),
      image: image().optional(),
      order: z.number().optional(),
    })
})

export const collections = { blog, authors, works }
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),

    tags: z.array(z.string()).optional(),
  }),
});

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    paperURL: z.string().optional(),
    authors: z.string().optional(),
    codeURL: z.string().optional(),
    webURL: z.string().optional(),
    dataURL: z.string().optional(),
    img: z.string().optional(),
    imgAlt: z.string().optional(),
    pub: z.string().optional(),
  }),
});

export const collections = { blog, publications };

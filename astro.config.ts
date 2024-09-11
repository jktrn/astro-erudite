import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-micro-academic.vercel.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    react(),
  ],
  markdown: {
    // shikiConfig: {
    //   transformers: [
    //     transformerNotationDiff(),
    //     transformerNotationFocus(),
    //     transformerMetaHighlight(),
    //   ],
    // },
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
          transformers: [transformerNotationDiff(), transformerMetaHighlight()],
        },
      ],
    ],
    remarkPlugins: [remarkToc, remarkMath, remarkEmoji],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
})

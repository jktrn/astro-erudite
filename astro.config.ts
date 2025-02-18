import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import expressiveCode from 'astro-expressive-code'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import sectionize from '@hbsnow/rehype-sectionize'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://astro-erudite.vercel.app',
  integrations: [
    expressiveCode({
      themes: ['min-light', 'min-dark'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `.${theme.name.split('-')[1]}`,
      defaultProps: {
        wrap: true,
        collapseStyle: 'collapsible-auto',
        overridesByLang: {
          'ansi,bash,bat,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,zsh,text':
            {
              showLineNumbers: false,
            },
        },
      },
      styleOverrides: {
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-sans)',
        borderColor: 'var(--color-border)',
        codeBackground:
          'color-mix(in oklab, var(--color-secondary) 25%, transparent)',
        frames: {
          editorActiveTabBackground:
            'color-mix(in oklab, var(--color-secondary) 25%, transparent)',
          editorActiveTabIndicatorBottomColor: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorTabBarBorderBottomColor: 'transparent',
          editorTabBarBackground: 'transparent',
          terminalTitlebarBorderBottomColor: 'transparent',
          terminalTitlebarBackground: 'transparent',
          frameBoxShadowCssValue: 'none',
          terminalBackground:
            'color-mix(in oklab, var(--color-secondary) 25%, transparent)',
          terminalTitlebarForeground: 'var(--color-muted-foreground)',
        },
        lineNumbers: {
          foreground: 'var(--color-muted-foreground)',
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      sectionize,
    ],
    remarkPlugins: [remarkToc, remarkMath, remarkEmoji],
  },
})

![Showcase Card](/public/static/opengraph-image.png)

<div align="center">

## astro-erudite

![Stargazers]
![Astro Version]
![Dependencies]
[![License]](LICENSE)

</div>

astro-erudite is [enscribe](https://enscribe.dev)'s opinionated, unstyled static blogging template built with [Astro](https://astro.build/) and native CSS. astro-erudite uses no UI framework, no CSS framework, and contains minimal dependencies.

| ![Preview 1](/public/static/preview-1.png) | ![Preview 2](/public/static/preview-2.png) |
| ------------------------------------------ | ------------------------------------------ |
| ![Preview 3](/public/static/preview-3.png) | ![Preview 4](/public/static/preview-4.png) |

> [!IMPORTANT]
> astro-erudite has recently been updated to v2. To learn what changed and why, read the following blog post: [Introducing astro-erudite v2](https://astro-erudite.vercel.app/blog/introducing-v2). If you're migrating an existing v1 project, see [breaking changes](https://astro-erudite.vercel.app/blog/introducing-v2#breaking-changes).

---

## Community examples

Below are some fantastic examples of websites based on this template. If you wish to add your site to this list, open a [pull request](https://github.com/jktrn/astro-erudite/pulls)!

| Site | Author | Tags | Source |
|-|-|-|-|
| [enscribe.dev](https://enscribe.dev) | [@jktrn](https://github.com/jktrn) | portfolio, interactive | [→](https://github.com/jktrn/enscribe.dev) |
| [emile.sh](https://emile.sh) | [@echoghi](https://github.com/echoghi) | minimal, flexoki | [→](https://github.com/echoghi/v5) |
| [decentparadox.me](https://decentparadox.me) | [@decentparadox](https://github.com/decentparadox) | portfolio, sci-fi | [→](https://github.com/decentparadox/decentparadox.me) |
| [flocto.github.io](https://flocto.github.io/) | [@flocto](https://github.com/flocto) | blog | [→](https://github.com/flocto/flocto.github.io) |
| [dumbprism.me](https://www.dumbprism.me/) | [@dumbprism](https://github.com/dumbprism) | portfolio, bento | [→](https://github.com/dumbprism/dumbprism-portfolio) |
| [hyuki.dev](https://hyuki.dev/) | [@snow0406](https://github.com/snow0406) | minimal, blog | [→](https://github.com/Snow0406/hyuki.dev) |
| [ldd.cc](https://ldd.cc/) | [@xJoyLu](https://github.com/xjoylu) | blog | [→](https://ldd.cc/) |
| [rezarezvan.com](https://rezarezvan.com/) | [@rezaarezvan](https://github.com/rezaarezvan) | academic, blog | [→](https://rezarezvan.com/) |
| [blog.z0x.ca](https://blog.z0x.ca/) | [@z0x](https://z0x.ca) | minimal | [→](https://git.z0x.ca/z0x/blog.z0x.ca/) |
| [angelaytchan.net](https://angelaytchan.net/) | [@wispyplant](https://github.com/wispyplant) | portfolio, art | [→](https://github.com/wispyplant/wispyplant.github.io) |
| [kaezr.xyz](https://kaezr.xyz/) | [@kaezrr](https://github.com/kaezrr) | minimal, portfolio | [→](https://github.com/kaezrr/webfolio) |
| [worldwidewong](https://worldwidewong.vercel.app) | [@brendanwong-web](https://github.com/brendanwong-web) | portfolio, gallery | [→](https://github.com/brendanwong-web/worldwidewong) |
| [bgajjala.dev](https://bgajjala.dev) | [@bgajjala8](https://github.com/bgajjala8) | minimal, blog | [→](https://github.com/bgajjala8/bgajjala.dev) |
| [ankitz007.vercel.app](https://ankitz007.vercel.app) | [@ankitz007](https://github.com/ankitz007) | blog | [→](https://github.com/ankitz007/webfolio) |
| [sadman.ca](https://sadman.ca) | [@sadmanca](https://github.com/sadmanca) | blog, media | [→](https://github.com/sadmanca/blogv3) |
| [marcel-to.vercel.app](https://marcel-to.vercel.app) | [@Marcel-TO](https://github.com/Marcel-TO) | portfolio, docs | [→](https://github.com/Marcel-TO/marcel-to-website) |
| [merox.dev](https://merox.dev) | [@meroxdotdev](https://github.com/meroxdotdev) | blog, devops, homelab | [→](https://github.com/meroxdotdev/merox) |
| [Off by One](https://justoffbyone.com) | [@cduruk](https://github.com/cduruk) | engineering, blog | [→](https://github.com/cduruk/offbyone) |
| [holywater.dev](https://holywater.dev) | [@holywater2372](https://github.com/holywater2372) | cybersecurity, blog | [→](https://github.com/holywater2372/holywater.dev) |
| [theinfinull.com](https://theinfinull.com) | [@theinfinull](https://github.com/theinfinull) | dev, portfolio, blog | [→](https://github.com/theinfinull/portfolio) |
| [chai-pin-zheng.xyz](https://www.chai-pin-zheng.xyz/) | [@Ducksss](https://github.com/Ducksss) | portfolio, interactive, blog, ascii | [→](https://github.com/Ducksss/ascii-astro-erudite) |
| [nightxade.dev](https://nightxade.dev) | [@nightxade](https://github.com/nightxade) | blog, portfolio | [→](https://github.com/nightxade/nightsite)
| [xingpingcn.top](https://xingpingcn.top) | [@xingpingcn](https://github.com/xingpingcn) | blog, chinese | [→](https://github.com/xingpingcn/newblog) |

## Features

- A design system built entirely on native CSS, using [autonomous custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) and [Utopia](https://utopia.fyi/) fluid type and space scales.
- The ridiculously fast [Sätteri](https://satteri.bruits.org/) Markdown processor (written in Rust)
- [Expressive Code](https://expressive-code.com/) for code blocks and inline code, with `` `code{:lang}` `` annotations and TextMate scope highlighting.
- $\LaTeX$ math rendered to browser-native and lightweight [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML) via [Temml](https://temml.org/).
- Subposts for organizing series, rendered as one continuous scrollable document.
- A fully responsive table of contents with active scrollspy highlighting.
- Clickable heading anchors for permalinking to any section.
- GitHub-style callouts/alerts via `:::` directives.
- SEO optimization with granular metadata and [Open Graph](https://ogp.me/) tag control for each post.
- [RSS](https://en.wikipedia.org/wiki/RSS) feed and sitemap generation.
- Author profiles with a dedicated authors page and multi-author post support.
- Post tags with a dedicated tags page for categorization and discovery.

## Getting started

1. Hit &ldquo;Use this template&rdquo;, the big green button on the top right, to create a new repository in your own GitHub account with this template.

2. Clone the repository:

   ```bash
   git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
   cd [YOUR_REPO_NAME]
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the development server:

   ```bash
   bun dev
   ```

5. Open your browser and visit `http://localhost:4321` to get started. The following commands are also available:

   | Command                | Description                                       |
   | ---------------------- | ------------------------------------------------- |
   | `bun run build`        | Build the production site to `dist/`              |
   | `bun run preview`      | Preview the built project locally                 |
   | `bun run astro`        | Run Astro CLI commands                            |
   | `bun run format`       | Format all files using [Biome](https://biomejs.dev/) |
   | `bun run format:check` | Check formatting without writing                  |

### Site configuration

Edit the `src/consts.ts` file to update your site's metadata, navigation links, and social links:

```ts
export const SITE = {
  title: "astro-erudite",
  description: "An opinionated, unstyled blogging template built with Astro.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const NAVIGATION = [
  { href: "/blog", label: "Blog" },
  // ...
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/jktrn", label: "GitHub", icon: GitHub },
  // ...
]
```

Your site's production URL is configurable in `astro.config.ts` as the `site` field, which is used for the sitemap, RSS feed, and canonical URLs.

### Color palette

Colors are defined in `src/styles/color.css` using the [Radix Colors](https://www.radix-ui.com/colors) scales. Each step carries a light/dark pair via [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) and the semantic tokens point at the scale, so the site respects system preference out of the box and the theme toggle only stores an override:

```css
:root {
  --gray-1:  light-dark(#fcfcfc, #111111);
  /* ... */
  --gray-12: light-dark(#202020, #eeeeee);

  --background:       var(--gray-1);
  --foreground:       var(--gray-12);
  --muted-foreground: var(--gray-11);
  --border:           var(--gray-6);
  /* ... */

  color-scheme: light dark;
}
```

### Favicons

Favicons are generated using [RealFaviconGenerator](https://realfavicongenerator.net/). To adjust the favicons, replace the files in the `public/` directory (such as `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, etc.) with your own. After updating the favicon files, you'll also need to adjust the references in `src/components/MetaHead.astro` to match your new favicon filenames and paths:

```html
<!-- Replace these with the generated meta tags -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="astro-erudite" />
<link rel="manifest" href="/site.webmanifest" />
```

## Adding content

### Blog posts

Add new blog posts as Markdown files in the `src/content/blog/` directory, either as a bare `your-post.md` or as a `your-post/index.md` folder (which lets you colocate assets). Use the following frontmatter structure:

```yml
---
title: "Your Post Title"
description: "A brief description of your post!"
date: 2026-01-01
authors:
  - enscribe
image: ./assets/banner.png
tags:
  - tag1
  - tag2
---
```

The blog post schema is defined as follows:

| Field         | Type (Zod)               | Requirements                                                                                                                                                                  | Required |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `title`       | `string`                 | Should be ≤60 characters.                                                                                                                                                     | Yes      |
| `description` | `string`                 | Should be ≤155 characters.                                                                                                                                                    | Yes      |
| `date`        | `coerce.date()`          | Must be in `YYYY-MM-DD` format.                                                                                                                                               | Yes      |
| `order`       | `number`                 | Sort order for subposts within a series. Defaults to `0` if not provided.                                                                                                     | Optional |
| `tags`        | `string[]`               | Preferably use kebab-case for these.                                                                                                                                          | Optional |
| `authors`     | `reference("authors")[]` | Each entry must match the id of a file in `src/content/authors/` (e.g. if their file is named `jane-doe.md`, use `jane-doe` in the array). Validated at build time.           | Yes      |
| `image`       | `image()`                | Should be exactly 1200px &times; 630px.                                                                                                                                       | Optional |
| `draft`       | `boolean`                | Defaults to `false` if not provided. You can also prefix a filename with `_` to hide it from the content loader entirely.                                                     | Optional |

### Subposts

A post becomes a series by nesting sibling Markdown files next to its `index.md`:

```
src/content/blog/
├── a-standalone-post.md
└── my-series/
    ├── index.md
    ├── getting-started.md
    └── going-further.md
```

The entire series renders as one continuous document, with the address bar syncing as you scroll between parts. Every subpost still gets its own URL (`/blog/my-series/getting-started`). Use the `order` frontmatter field to control the sequence. Only one level of nesting is supported, so files nested any deeper are ignored.

### Markdown extensions

A few authoring features exist that extend beyond standard Markdown:

- Callouts use the [directive](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) syntax, with five variants (`note`, `tip`, `warning`, `caution`, `important`) rendered as collapsible `<details>` elements. Append `{closed}` to start one collapsed:

  ```markdown
  :::note[An optional custom title]
  Hello, world!
  :::
  ```

- Math is written as `$inline$` or `$$display$$` $\LaTeX$ and rendered to MathML at build time.
- Inline code ending in an annotation gets syntax highlighting: `` `const x = 1{:ts}` `` highlights as TypeScript, and `` `text{:.string}` `` paints with the theme's color for a [TextMate scope](https://macromates.com/manual/en/language_grammars).

### Authors

Add author information in `src/content/authors/` as Markdown files. A file named `[author-name].md` can be associated with a blog post if `"author-name"` (the id) is added to the `authors` field:

```yml
---
name: "enscribe"
pronouns: "he/him"
avatar: "https://avatars.githubusercontent.com/u/71956291?v=4"
bio: "d(-_-)b"
mail: "jason@enscribe.dev"
socials:
  website: "https://enscribe.dev"
  twitter: "https://twitter.com/enscrbe"
  github: "https://github.com/jktrn"
---
```

The author schema is defined as follows:

| Field      | Type (Zod)                                 | Requirements                                                                                                                                                             | Required |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `name`     | `string`                                   | n/a                                                                                                                                                                      | Yes      |
| `pronouns` | `string`                                   | n/a                                                                                                                                                                      | Optional |
| `avatar`   | `url()` or `string.startsWith("/")`        | Should be either a valid URL or a path starting with `/`. | Yes      |
| `bio`      | `string`                                   | n/a                                                                                                                                                                      | Optional |
| `mail`     | `email()`                                  | Must be a valid email address.                                                                                                                                           | Optional |
| `socials`  | `record(string, url())`                    | A map of any label you like to a valid URL. Each label is matched to an icon in `src/components/SocialIcons.astro`.                                                      | Optional |

### Projects

Add projects in `src/content/projects/` as Markdown files:

```yml
---
name: "Project A"
description: "This is an example project description! You should replace this with a description of your own project."
tags: ["Framework A", "Library B", "Tool C", "Resource D"]
image: "./placeholder.png"
link: "https://example.com"
startDate: "2024-01-01"
endDate: "2024-02-01"
---
```

The project schema is defined as follows:

| Field         | Type (Zod)      | Requirements                            | Required |
| ------------- | --------------- | --------------------------------------- | -------- |
| `name`        | `string`        | n/a                                     | Yes      |
| `description` | `string`        | n/a                                     | Yes      |
| `link`        | `url()`         | Must be a valid URL.                    | Yes      |
| `tags`        | `string[]`      | n/a                                     | Optional |
| `image`       | `image()`       | Should be exactly 1200px &times; 630px. | Optional |
| `startDate`   | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |
| `endDate`     | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |

## License

This project is open source and available under the [MIT License](LICENSE).

---

### Star history

<a href="https://star-history.com/#jktrn/astro-erudite&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date" />
 </picture>
</a>

---

Built with &hearts; by [enscribe](https://enscribe.dev)!

[Stargazers]: https://img.shields.io/github/stars/jktrn/astro-erudite?color=fafafa&logo=github&logoColor=fff&style=flat
[Astro Version]: https://img.shields.io/github/package-json/dependency-version/jktrn/astro-erudite/astro?color=0a0a0a&logo=astro&logoColor=fff&style=flat
[Dependencies]: https://img.shields.io/badge/dependencies-13-fafafa?style=flat
[License]: https://img.shields.io/github/license/jktrn/astro-erudite?color=0a0a0a&logo=github&logoColor=fff&style=flat

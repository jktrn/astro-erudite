![Showcase Card](/public/static/twitter-card.png)

<div align="center">

## astro-erudite

![Stargazers]
[![License]](LICENSE)

</div>

astro-erudite is an opinionated, no-frills static blogging template built with [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/). Extraordinarily loosely based off the [Astro Micro](https://astro-micro.vercel.app/) theme by [trevortylerlee](https://github.com/trevortylerlee).

To learn more about why this template exists, read [The State of Static Blogs in 2024](https://astro-erudite.vercel.app/blog/the-state-of-static-blogs), where I share my take on what constitutes a great blogging template and my goals while developing this one.

---

## Technology Stack

This is a list of the various technologies used to build this website:

| Category            | Technology Name                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Framework           | [Astro](https://astro.build/)                                                                      |
| Styling             | [Tailwind](https://tailwindcss.com)                                                                |
| Components          | [shadcn/ui](https://ui.shadcn.com/)                                                                |
| Content             | [MDX](https://mdxjs.com/)                                                                          |
| Syntax Highlighting | [Shiki](https://github.com/shikijs/shiki) + [rehype-pretty-code](https://rehype-pretty.pages.dev/) |
| Graphics            | [Figma](https://www.figma.com/)                                                                    |
| Deployment          | [Vercel](https://vercel.com)                                                                       |

---

## Features

- [Astro](https://astro.build/)&rsquo;s [Islands](https://docs.astro.build/en/concepts/islands/) architecture for partial/selective hydration and client-side interactivity while maintaining a fast-to-render static site.
- [shadcn/ui](https://ui.shadcn.com/)&rsquo;s [Tailwind](https://tailwindcss.com/) color convention for automatic styling across both light and dark themes. Includes accessible, theme-aware UI components for navigation, buttons, etc.
- [rehype-pretty-code](https://rehype-pretty.pages.dev/) with [Shiki](https://github.com/shikijs/shiki) for advanced code block styling, highlighting, and code block titles/captions.
- Blog post authoring using [MDX](https://mdxjs.com/) for component-style content, alongside $\LaTeX$ rendering using [KaTeX](https://katex.org/).
- Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/) in <abbr title="Single Page Application">SPA</abbr> mode for smooth, opt-in animations during route switching.
- SEO optimization with fine-grained control over metadata and [Open Graph](https://ogp.me/) tags for each post.
- [RSS](https://en.wikipedia.org/wiki/RSS) feeds and sitemap generation!
- Supports author profiles (with a dedicated authors page) and adding multiple authors per post.
- Supports project tags (with a dedicated tags page) for easy post categorization and discovery.

## Getting Started

1. Hit &ldquo;Use this template&rdquo;, the big green button on the top right, to create a new repository in your own GitHub account with this template.

2. Clone the repository:

   ```bash
   git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPO_NAME].git
   cd [YOUR_REPO_NAME]
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:1234` to get started. The following commands are also available:

   | Command            | Description                                                     |
   | ------------------ | --------------------------------------------------------------- |
   | `npm run start`    | Alias for `npm run dev`                                         |
   | `npm run build`    | Run type checking and build the project                         |
   | `npm run preview`  | Previews the built project                                      |
   | `npm run astro`    | Run Astro CLI commands                                          |
   | `npm run prettier` | Blanket format all files using [Prettier](https://prettier.io/) |

## Customization

### Site Configuration

Edit the `src/consts.ts` file to update your site's metadata, navigation links, and social links:

```typescript
export const SITE: Site = {
  TITLE: 'astro-erudite',
  DESCRIPTION:
    'astro-erudite is a opinionated, no-frills blogging template—built with Astro, Tailwind, and shadcn/ui.',
  EMAIL: 'jason@enscribe.dev',
  NUM_POSTS_ON_HOMEPAGE: 2,
  SITEURL: 'https://astro-erudite.vercel.app',
}

export const NAV_LINKS: Link[] = [
  { href: '/blog', label: 'blog' },
  { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/jktrn', label: 'GitHub' },
  { href: 'https://twitter.com/enscry', label: 'Twitter' },
  { href: 'jason@enscribe.dev', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
```

### Color Palette

Colors are defined in `src/styles/global.css` in [<abbr title="Hue, Saturation, Lightness">HSL</abbr> format](https://en.wikipedia.org/wiki/HSL_and_HSV), using the [shadcn/ui](https://ui.shadcn.com/) convention:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 80.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 80.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 80.1%;
    --accent-foreground: 0 0% 9%;
    --additive: 112 50% 36%; /* Unique to astro-erudite */
    --additive-foreground: 0 0% 98%; /* Unique to astro-erudite */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
  }

  .dark {
    /* ... */
  }
  /* ... */
}
```

## Adding Content

### Blog Posts

Add new blog posts as MDX files in the `src/content/blog/` directory. Use the following frontmatter structure:

```yml
---
title: 'Your Post Title'
description: 'A brief description of your post!'
date: 2024-01-01
tags: ['tag1', 'tag2']
image: './image.png'
authors: ['author1', 'author2']
draft: false
---
```

The blog post schema is defined as follows:

| Field         | Type (Zod)      | Requirements                                                                                                                                                                      | Required |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `title`       | `string`        | Must be ≤60 characters.                                                                                                                                                           | Yes      |
| `description` | `string`        | Must be ≤155 characters.                                                                                                                                                          | Yes      |
| `date`        | `coerce.date()` | Must be in `YYYY-MM-DD` format.                                                                                                                                                   | Yes      |
| `image`       | `image()`       | Must be exactly 1200px &times; 630px.                                                                                                                                             | Optional |
| `tags`        | `string[]`      | Preferably use kebab-case for these.                                                                                                                                              | Optional |
| `authors`     | `string[]`      | If the author has a profile, use the slug associated with their Markdown file in `src/content/authors/` (e.g. if their file is named `jane-doe.md`, use `jane-doe` in the array). | Optional |
| `draft`       | `boolean`       | Defaults to `false` if not provided.                                                                                                                                              | Optional |

### Authors

Add author information in `src/content/authors/` as Markdown files. A file named `[author-name].md` can be associated with a blog post if `"author-name"` (the slug) is added to the `authors` field:

```yml
---
name: 'enscribe'
pronouns: 'he/him'
avatar: 'https://gravatar.com/avatar/9bfdc4ec972793cf05cb91efce5f4aaaec2a0da1bf4ec34dad0913f1d845faf6.webp?size=256'
bio: 'd(-_-)b'
website: 'https://enscribe.dev'
twitter: 'https://twitter.com/enscry'
github: 'https://github.com/jktrn'
mail: 'jason@enscribe.dev'
---
```

The author schema is defined as follows:

| Field      | Type (Zod)       | Requirements                                                                                                                        | Required |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `name`     | `string`         | n/a                                                                                                                                 | Yes      |
| `pronouns` | `string`         | n/a                                                                                                                                 | Optional |
| `avatar`   | `string.url()`   | Must be a valid URL. Preferably use [Gravatar](https://en.gravatar.com/site/implement/images/) with the `?size=256` size parameter. | Yes      |
| `bio`      | `string`         | n/a                                                                                                                                 | Optional |
| `mail`     | `string.email()` | Must be a valid email address.                                                                                                      | Optional |
| `website`  | `string.url()`   | Must be a valid URL.                                                                                                                | Optional |
| `twitter`  | `string.url()`   | Must be a valid URL.                                                                                                                | Optional |
| `github`   | `string.url()`   | Must be a valid URL.                                                                                                                | Optional |
| `linkedin` | `string.url()`   | Must be a valid URL.                                                                                                                | Optional |
| `discord`  | `string.url()`   | Must be a valid URL.                                                                                                                | Optional |

You can add as many social media links as you want, as long as you adjust the schema! Make sure you also support the new field in the `src/components/SocialIcons.astro` component.

### Projects

Add projects in `src/content/projects/` as Markdown files:

```yml
---
name: 'Project A'
description: 'This is an example project description! You should replace this with a description of your own project.'
tags: ['Framework A', 'Library B', 'Tool C', 'Resource D']
image: '/static/1200x630.png'
link: 'https://example.com'
---
```

The project schema is defined as follows:

| Field         | Type (Zod)     | Requirements                          | Required |
| ------------- | -------------- | ------------------------------------- | -------- |
| `name`        | `string`       | n/a                                   | Yes      |
| `description` | `string`       | n/a                                   | Yes      |
| `tags`        | `string[]`     | n/a                                   | Yes      |
| `image`       | `image()`      | Must be exactly 1200px &times; 630px. | Yes      |
| `link`        | `string.url()` | Must be a valid URL.                  | Yes      |

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with &hearts; by [enscribe](https://enscribe.dev)!

[Stargazers]: https://img.shields.io/github/stars/jktrn/astro-erudite?color=fafafa&logo=github&logoColor=fff&style=for-the-badge
[License]: https://img.shields.io/github/license/jktrn/astro-erudite?color=0a0a0a&logo=github&logoColor=fff&style=for-the-badge

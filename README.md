![Showcase Card](/public/static/twitter-card.png)

<div align="center">

## astro-erudite

![Stargazers]
[![License]](LICENSE)

</div>

astro-erudite is an opinionated, unstyled static blogging template built with [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/). Extraordinarily loosely based off the [Astro Micro](https://astro-micro.vercel.app/) theme by [trevortylerlee](https://github.com/trevortylerlee).

| ![Preview 1](/public/static/preview-1.png) | ![Preview 2](/public/static/preview-2.png) |
| ------------------------------------------ | ------------------------------------------ |
| ![Preview 3](/public/static/preview-3.png) | ![Preview 4](/public/static/preview-4.png) |

> [!NOTE]
> To learn more about why this template exists, read [The State of Static Blogs in 2024](https://astro-erudite.vercel.app/blog/the-state-of-static-blogs), where I share my take on what constitutes a great blogging template and my goals while developing this one.

---

## Community Examples

Below are some fantastic examples of websites based on this template. If you wish to add your site to this list, open a pull request!

| Site                                          | Author                                             | Description/Features                                                                         | Source                                                 |
| --------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [enscribe.dev](https://enscribe.dev)          | [@jktrn](https://github.com/jktrn)                 | Heavily modified bento-style homepage with client interactivity, with custom MDX components! | [→](https://github.com/jktrn/enscribe.dev)             |
| [emile.sh](https://emile.sh)                  | [@echoghi](https://github.com/echoghi)             | A minimalist personal blog using the [flexoki](https://stephango.com/flexoki) theme          | [→](https://github.com/echoghi/v5)                     |
| [decentparadox.me](https://decentparadox.me)  | [@decentparadox](https://github.com/decentparadox) | A heavily customized personal portfolio with a sci-fi theme!                                 | [→](https://github.com/decentparadox/decentparadox.me) |
| [flocto.github.io](https://flocto.github.io/) | [@flocto](https://github.com/flocto)               | A slightly modified personal blog                                                            | [→](https://github.com/flocto/flocto.github.io)        |
| [dumbprism.me](https://www.dumbprism.me/)     | [@dumbprism](https://github.com/dumbprism)         | A customized portfolio inspired by enscribe's bento grid style adding my gist of UI          | [→](https://github.com/dumbprism/dumbprism-portfolio)  |
| [hyuki.dev](https://hyuki.dev/)               | [@snow0406](https://github.com/snow0406)           | A minimalist blog with a blue color scheme, focusing on simplicity!                          | [→](https://github.com/Snow0406/hyuki.dev)             |
| [ldd.cc](https://ldd.cc/)                     | [@xJoyLu](https://github.com/xjoylu)               | The cream of the idlers.                                                                     | [→](https://ldd.cc/)                    |
| [rezarezvan.com](https://rezarezvan.com/)     | [@rezaarezvan](https://github.com/rezaarezvan)     | A academic blog with personal touches :).                                                    | [→](https://rezarezvan.com/)            |
| [blog.z0x.ca](https://blog.z0x.ca/)           | [@z0x](https://z0x.ca)                             | _Very_ minimal version of erudite, stripping it down to the bare essentials                  | [→](https://git.z0x.ca/z0x/blog.z0x.ca/)               |

## Features

- [Astro](https://astro.build/)&rsquo;s [Islands](https://docs.astro.build/en/concepts/islands/) architecture for partial/selective hydration and client-side interactivity while maintaining a fast-to-render static site.
- [shadcn/ui](https://ui.shadcn.com/)&rsquo;s [Tailwind](https://tailwindcss.com/) color convention for automatic styling across both light and dark themes. Includes accessible, theme-aware UI components for navigation, buttons, etc.
- [Expressive Code](https://expressive-code.com/) for advanced code block styling, highlighting, and code block titles/captions.
- Blog post authoring using [MDX](https://mdxjs.com/) for component-style content, alongside $\LaTeX$ rendering using [KaTeX](https://katex.org/).
- Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/) in <abbr title="Single Page Application">SPA</abbr> mode for smooth, opt-in animations during route switching.
- SEO optimization with fine-grained control over metadata and [Open Graph](https://ogp.me/) tags for each post.
- [RSS](https://en.wikipedia.org/wiki/RSS) feeds and sitemap generation!
- Supports author profiles (with a dedicated authors page) and adding multiple authors per post.
- Supports project tags (with a dedicated tags page) for easy post categorization and discovery.

## Technology Stack

This is a list of the various technologies used to build this template:

| Category   | Technology Name                                                                            |
| ---------- | ------------------------------------------------------------------------------------------ |
| Framework  | [Astro](https://astro.build/)                                                              |
| Styling    | [Tailwind](https://tailwindcss.com)                                                        |
| Components | [shadcn/ui](https://ui.shadcn.com/)                                                        |
| Content    | [MDX](https://mdxjs.com/)                                                                  |
| Codeblocks | [Expressive Code](https://expressive-code.com/), [Shiki](https://github.com/shikijs/shiki) |
| Graphics   | [Figma](https://www.figma.com/)                                                            |
| Deployment | [Vercel](https://vercel.com)                                                               |

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

```ts
export const SITE: Site = {
  title: 'astro-erudite',
  description: // ...
  href: 'https://astro-erudite.vercel.app',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  // ...
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/jktrn',
    label: 'GitHub',
  },
  // ...
]
```

### Color Palette

Colors are defined in `src/styles/global.css` in [OKLCH format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch), using the [shadcn/ui](https://ui.shadcn.com/) convention:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  /* ... */
}
```

### Favicons

Favicons are generated using [RealFaviconGenerator](https://realfavicongenerator.net/). To adjust the favicons, replace the files in the `public/` directory (such as `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, etc.) with your own. After updating the favicon files, you'll also need to adjust the references in `src/components/Favicons.astro` to match your new favicon filenames and paths:

```html
<!-- Replace these with the generated meta tags -->
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="astro-erudite" />
<link rel="manifest" href="/site.webmanifest" />
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

| Field         | Type (Zod)      | Requirements                                                                                                                                                                    | Required |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `title`       | `string`        | Should be ≤60 characters.                                                                                                                                                       | Yes      |
| `description` | `string`        | Should be ≤155 characters.                                                                                                                                                      | Yes      |
| `date`        | `coerce.date()` | Must be in `YYYY-MM-DD` format.                                                                                                                                                 | Yes      |
| `image`       | `image()`       | Should be exactly 1200px &times; 630px.                                                                                                                                         | Optional |
| `tags`        | `string[]`      | Preferably use kebab-case for these.                                                                                                                                            | Optional |
| `authors`     | `string[]`      | If the author has a profile, use the id associated with their Markdown file in `src/content/authors/` (e.g. if their file is named `jane-doe.md`, use `jane-doe` in the array). | Optional |
| `draft`       | `boolean`       | Defaults to `false` if not provided.                                                                                                                                            | Optional |

### Authors

Add author information in `src/content/authors/` as Markdown files. A file named `[author-name].md` can be associated with a blog post if `"author-name"` (the id) is added to the `authors` field:

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

| Field      | Type (Zod)                                 | Requirements                                                                                                                                                             | Required |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `name`     | `string`                                   | n/a                                                                                                                                                                      | Yes      |
| `pronouns` | `string`                                   | n/a                                                                                                                                                                      | Optional |
| `avatar`   | `string.url()` or `string.startsWith('/')` | Should be either a valid URL or a path starting with `/`. Preferably use [Gravatar](https://en.gravatar.com/site/implement/images/) with the `?size=256` size parameter. | Yes      |
| `bio`      | `string`                                   | n/a                                                                                                                                                                      | Optional |
| `mail`     | `string.email()`                           | Must be a valid email address.                                                                                                                                           | Optional |
| `website`  | `string.url()`                             | Must be a valid URL.                                                                                                                                                     | Optional |
| `twitter`  | `string.url()`                             | Must be a valid URL.                                                                                                                                                     | Optional |
| `github`   | `string.url()`                             | Must be a valid URL.                                                                                                                                                     | Optional |
| `linkedin` | `string.url()`                             | Must be a valid URL.                                                                                                                                                     | Optional |
| `discord`  | `string.url()`                             | Must be a valid URL.                                                                                                                                                     | Optional |

> [!TIP]
> You can add as many social media links as you want, as long as you adjust the schema! Make sure you also support the new field in the `src/components/SocialIcons.astro` component.

### Projects

Add projects in `src/content/projects/` as Markdown files:

```yml
---
name: 'Project A'
description: 'This is an example project description! You should replace this with a description of your own project.'
tags: ['Framework A', 'Library B', 'Tool C', 'Resource D']
image: '/static/1200x630.png'
link: 'https://example.com'
startDate: '2024-01-01'
endDate: '2024-01-01'
---
```

The project schema is defined as follows:

| Field         | Type (Zod)      | Requirements                            | Required |
| ------------- | --------------- | --------------------------------------- | -------- |
| `name`        | `string`        | n/a                                     | Yes      |
| `description` | `string`        | n/a                                     | Yes      |
| `tags`        | `string[]`      | n/a                                     | Yes      |
| `image`       | `image()`       | Should be exactly 1200px &times; 630px. | Yes      |
| `link`        | `string.url()`  | Must be a valid URL.                    | Yes      |
| `startDate`   | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |
| `endDate`     | `coerce.date()` | Must be in `YYYY-MM-DD` format.         | Optional |

## License

This project is open source and available under the [MIT License](LICENSE).

---

### Star History

<a href="https://star-history.com/#jktrn/astro-erudite&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=jktrn/astro-erudite&type=Date" />
 </picture>
</a>

---

Built with &hearts; by [enscribe](https://enscribe.dev)!

[Stargazers]: https://img.shields.io/github/stars/jktrn/astro-erudite?color=fafafa&logo=github&logoColor=fff&style=for-the-badge
[License]: https://img.shields.io/github/license/jktrn/astro-erudite?color=0a0a0a&logo=github&logoColor=fff&style=for-the-badge

---
title: "[Old] Getting started with Astro-Micro"
description: "Hit the ground running."
date: "2024-03-22"
tags: ['guide', 'start']
---

---

## Install astro-micro

Clone the [Astro Micro repository](https://github.com/trevortylerlee/astro-micro.git).

```sh
git clone https://github.com/trevortylerlee/astro-micro.git my-astro-micro
```

```sh
cd my-astro-micro
```

```sh
npm i
```

```sh
npm run build
```

```sh
npm run dev
```

## Customize the website metadata

To change the website metadata, edit `src/consts.ts`.

```ts
// src/consts.ts

export const SITE: Site = {
  NAME: "Astro Micro",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
  EMAIL: "trevortylerlee@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PUBLICATIONS_ON_HOMEPAGE: 3,
};
```

| Field        | Req | Description                                          |
| :----------- | :-- | :--------------------------------------------------- |
| TITLE        | Yes | Displayed in header and footer. Used in SEO and RSS. |
| DESCRIPTION  | Yes | Used in SEO and RSS.                                 |
| EMAIL        | Yes | Displayed in contact section.                        |
| NUM_POSTS    | Yes | Limit number of posts on home page.                  |
| NUM_PUBLICATIONS | Yes | Limit number of research on home page.               |

---

## Customize metadata for individual pages

```ts
// src/consts.ts

export const ABOUT: Metadata = {
  TITLE: "About",
  DESCRIPTION: "Astro Micro is a fork of Astro Nano.",
};
```

| Field       | Req | Description                                    |
| :---------- | :-- | :--------------------------------------------- |
| TITLE       | Yes | Displayed in browser tab. Used in SEO and RSS. |
| DESCRIPTION | Yes | Used in SEO and RSS.                           |

---

## ~~Add your social media links~~ Removed in Micro Academics

```ts
// src/consts.ts

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/boogerbuttcheeks",
  },
  {
    NAME: "github",
    HREF: "https://github.com/trevortylerlee",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/trevortylerlee",
  },
];
```

| Field | Req | Description                             |
| :---- | :-- | :-------------------------------------- |
| NAME  | Yes | Displayed in contact section as a link. |
| HREF  | Yes | External url to social media profile.   |

## Deploy the site

To set up RSS and Giscus, it's easier if the site is deployed and has a URL for you to use. Instantly deploy to Vercel or Netlify by clicking the buttons below.

<div class="flex gap-2">
  <a target="_blank" aria-label="Deploy with Vercel" href="https://vercel.com/new/clone?repository-url=https://github.com/trevortylerlee/astro-micro">
    <img src="/deploy_vercel.svg" />
  </a>
  <a target="_blank" aria-label="Deploy with Netlify" href="https://app.netlify.com/start/deploy?repository=https://github.com/trevortylerlee/astro-micro">
    <img src="/deploy_netlify.svg" />
  </a>
</div>

To deploy manually see [Astro's docs](https://docs.astro.build/en/guides/deploy/).

## ~~Set up RSS~~ New config in Astro Micro Academics

Change the `site` option to the deployed site's URL.

```js
// astro.config.mjs

export default defineConfig({
  site: "https://astro-micro.vercel.app",
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
```

## Set up Giscus

Follow the steps at [giscus.app](https://giscus.app). Once you get your  custom Giscus script from that site, go to `Giscus.astro` and replace that script with your own.

```js
// src/components/Giscus.astro

<script
  is:inline
  src="https://giscus.app/client.js"
  data-repo="trevortylerlee/astro-micro"
  data-repo-id="R_kgDOL_6l9Q"
  data-category="Announcements"
  data-category-id="DIC_kwDOL_6l9c4Cfk55"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async></script>

```

To change the Giscus themes used, edit the `setGiscusTheme` function in `Head.astro`.

```js
// src/components/Head.astro

const setGiscusTheme = () => {
  const giscus = document.querySelector(".giscus-frame");

  const isDark = document.documentElement.classList.contains("dark");

  if (giscus) {
    const url = new URL(giscus.src);
    // Change "dark" and "light" to other Giscus themes
    url.searchParams.set("theme", isDark ? "dark" : "light");
    giscus.src = url.toString();
  }
};
```

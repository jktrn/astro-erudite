---
title: "Introducing astro-erudite v2"
description: "I've rebuilt my blogging template from scratch, and it's better in every way I know how to measure."
date: 2026-06-06
authors:
  - enscribe
image: ./assets/banner.png
tags:
  - v2
---

<style>
  dim-span {
    opacity: 0.6;
  }

  delta-down {
    color: light-dark(oklch(48% 0.12 150), oklch(83% 0.1 150));
  }

  click-counter button {
    padding: var(--space-3xs) var(--space-2xs);
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
  }
</style>

## Introduction

On September 10, 2024 <dim-span>(634 days ago!)</dim-span> I ventured to build myself my perfect template. I wanted it to be the Phillips screwdriver of my toolkit that I would take to any project. I took the stack that I loved using, all the libraries I knew inside-out, the utilities I perpetually used, and bundled it into a neat package that I open-sourced for the world. The reception was enthusiastic <dim-span>(thanks for 750 stars!)</dim-span>, and since then I've seen dozens of cool projects pop up. I'm so glad I got to facilitate creating personal spaces for others around the internet.

After I released astro-erudite, I stepped away from open-source for a while to work on my personal business <dim-span>(and later to work a 9-5)</dim-span>. In the couple of years since then, I've picked up so much knowledge across so many different subsets and microcosms of web design: typography, color theory, accessibility, art direction, UX. My intuition and my experience have grown so much alongside the love for my craft.

When I recently used this project as the base for some client work, I soon realized how many fundamentally poor decisions I'd made when initially creating it. My tastes had changed and my opinions had shifted so drastically that I felt the project was no longer serving its original purpose: to be my Phillips screwdriver. I decided to rebuild it from a fresh folder.

What you are now looking at is the culmination of all the lessons I've learned throughout my years as a design engineer. I apologize for not getting to this quicker and I regret having shipped out such a subpar project. This blog post will explain the fundamental issues I had with the original version, and how the new version addresses them. Later on I'll also talk about breaking changes, and how to convert existing v1 projects into v2.

### Benchmarks

The description of this post claims that v2 is better in every way I know how to measure, so here are the measurements. Both versions were benchmarked with the same blog posts on the same machine:

| | v1 | v2 | Δ |
| - | -: | -: | -: |
| JavaScript shipped | 253kb | 6.5kb | <delta-down>↓97%</delta-down> |
| Largest JavaScript file | 169.8kb <dim-span>(React)</dim-span> | 2.4kb <dim-span>(ToC)</dim-span> | <delta-down>↓99%</delta-down> |
| CSS shipped | 76kb | 24.2kb | <delta-down>↓68%</delta-down> |
| Homepage transfer size | 293kb | 216kb | <delta-down>↓26%</delta-down> |
| Homepage requests | 14 | 7 | <delta-down>↓50%</delta-down> |
| Homepage main-thread work | 0.43s | 0.12s | <delta-down>↓72%</delta-down> |
| Series read: page loads | 6 | 1 | <delta-down>↓83%</delta-down> |
| Series read: transfer | 669kb | 546kb | <delta-down>↓18%</delta-down> |
| Build time <dim-span>(warm)</dim-span> | 6.1s | 1.2s | <delta-down>↓80%</delta-down> |
| Build time <dim-span>(per page)</dim-span> | 303ms | 67ms | <delta-down>↓78%</delta-down> |
| Direct dependencies | 33 | 13 | <delta-down>↓61%</delta-down> |
| Installed packages | 636 | 294 | <delta-down>↓54%</delta-down> |
| `node_modules` size | 334mb | 174mb | <delta-down>↓48%</delta-down> |

The series rows measure reading every post of [the v1 release series](#regarding-subposts) end to end. v1 needs a full navigation per subpost, while v2 renders the whole chain as one continuous page.

## Gripes, remediations

The format of this blog post will be simple: I will first talk about something I dislike, and then I will talk about how I got rid of it. If I used to like it, I will talk about what changed my mind.

### Regarding dependency hell

In general, a good statistic that quantifies the "weight" of a project is its dependencies. This is only natural. astro-erudite v1 (which I will now just call v1 for brevity) had 33 direct dependencies <dim-span>(devDependencies included)</dim-span>. v2 reduces this by 61%, down to 13.

:::note
In terms of the full tree, a fresh `bun install{:sh}` reports **636** installed packages for v1 versus **294** for v2. A bare `astro` install is 254 packages on its own, so of the part of the tree I actually control, v1 stacked ~382 packages on top of Astro, and v2 adds 40.
:::

The following is our `package.json` diff showing the changes:

```diff lang="json" title="package.json" showLineNumbers=false
    "dependencies": {
-     "@astrojs/check": "0.9.7",
-     "@astrojs/markdown-remark": "7.0.0",
+     "@astrojs/markdown-satteri": "^0.2.1",
-     "@astrojs/mdx": "5.0.0",
-     "@astrojs/react": "5.0.0",
      "@astrojs/rss": "^4.0.18",
      "@astrojs/sitemap": "^3.7.3",
      "@expressive-code/plugin-collapsible-sections": "^0.42.0",
      "@expressive-code/plugin-line-numbers": "^0.42.0",
-     "@iconify-json/lucide": "^1.2.26",
-     "@shikijs/rehype": "^3.4.0",
-     "@tailwindcss/vite": "^4.0.7",
-     "@types/react": "19.0.0",
-     "@types/react-dom": "19.0.0",
      "astro": "^6.4.2",
-     "astro-icon": "^1.1.5",
-     "class-variance-authority": "^0.7.1",
-     "clsx": "^2.1.1",
+     "github-slugger": "^2.0.0",
+     "hast-util-select": "^6.0.4",
+     "hast-util-to-html": "^9.0.5",
+     "hastscript": "^9.0.1",
-     "lucide-react": "^0.469.0",
-     "radix-ui": "^1.3.4",
-     "react": "19.0.0",
-     "react-dom": "19.0.0",
-     "rehype-expressive-code": "^0.40.2",
-     "rehype-external-links": "^3.0.0",
-     "rehype-katex": "^7.0.1",
-     "remark-emoji": "^5.0.1",
-     "remark-math": "^6.0.0",
+     "satteri-expressive-code": "^0.1.8",
-     "tailwind-merge": "^3.3.0",
-     "tailwindcss": "^4.1.7",
+     "temml": "^0.13.3"
-     "typescript": "^5.8.3"
  },
  "devDependencies": {
+   "@biomejs/biome": "^2.4.16"
-   "prettier": "^3.5.1",
-   "prettier-plugin-astro": "^0.14.1",
-   "prettier-plugin-astro-organize-imports": "^0.4.11",
-   "prettier-plugin-tailwindcss": "^0.6.11"
  }
```

We can divvy our removed packages into four categories:
1. **Things that existed to render HTML that I could have totally done myself**.
    - `react`, `react-dom`, `@astrojs/react`, `@types/react`, `@types/react-dom`, `radix-ui`: I've completely removed shadcn/ui from this project. I basically was only using `<Avatar>{:tsx}`, `<ScrollArea>{:tsx}`, and `<Pagination>{:tsx}`, which we can own ourselves for much cheaper. **Ownership** is a principle that I now really enjoy, and even though shadcn/ui kind of claims "ownership" as its leading philosophy <dim-span>(you are, after all, copying the components yourself)</dim-span>, these come baked in with Radix and Lucide and so you don't really own anything <dim-span>(this says a lot about our society)</dim-span>. There's absolutely no point bundling these.
    - `lucide-react`, `astro-icon`, `@iconify-json/lucide`: These are icon libraries that shadcn/ui was also using. I've learned to opt out of these icon libraries <dim-span>(which are more <abbr title="Developer experience">DX</abbr> than anything)</dim-span> and to simply have SVGs in an `icons/` folder with the ones we actually use.
2. **Things that existed to manage and fix issues with other things shouldn't have existed in the first place**. These are all things that don't actually do anything to the website, but rather do things to each other.
    - `tailwind-merge`, `clsx`, `class-variance-authority`: These are utility libraries that all mutate and fiddle around with Tailwind in specific ways. These are now entirely useless, because I've [removed Tailwind](#regarding-tailwind)!
    - `typescript`, `@astrojs/check`: These were used in the old build script that ran `astro check && astro build{:sh}` instead of just `astro build{:sh}`. `typescript` wasn't actually compiling anything, it was installed so `@astrojs/check` could borrow its compiler.
3. **Things that've fallen out of my favor**. These aren't necessarily entirely bad, but have been personally demerited by me these past couple years and have been replaced by alternatives I prefer.
    - `prettier`, `prettier-plugin-astro`, `prettier-plugin-astro-organize-imports`, `prettier-plugin-tailwindcss`: I've replaced this all with [`@biomejs/biome`](https://biomejs.dev/). It's just better, faster, and stronger for this use case.
    - `tailwindcss`, `@tailwindcss/vite`: As mentioned above, I've [removed Tailwind](#regarding-tailwind).
    - `@astrojs/mdx`: I've removed MDX support entirely. See [Regarding MDX](#regarding-mdx).
4. **The Markdown pipeline** (`@astrojs/markdown-remark`, `rehype-expressive-code`, `@shikijs/rehype`, `rehype-external-links`, `remark-emoji`, `rehype-katex`, `remark-math`). All of these either add support for the [unified](https://github.com/unifiedjs/unified) plugin ecosystem or are plugins themselves. I will talk more about our new Markdown pipeline, [Sätteri](https://satteri.bruits.org/), which removes `unified` and instead has a first-class <abbr title="Markdown Abstract Syntax Tree">MDAST</abbr> and <abbr title="HTML Abstract Syntax Tree">HAST</abbr> plugin API.

### Regarding Tailwind

I've been a Tailwind bro for as long as I can remember. I could write Tailwind fluently without needing to reference its documentation, and I was obsessed with writing these really ridiculous arbitrary strings using their square bracket escape hatch (e.g. `[grid-area:a]`) and even using `@apply{:css}` in actual `.css` files so that I would never need to write a line of pure CSS in my life. This is a snippet from the homepage of my current website, [enscribe.dev](https://enscribe.dev), and is probably the most ridiculous string of Tailwind I've ever written in my life:

```astro title="src/pages/index.astro (enscribe.dev)" startLineNumber=17
<Layout class="px-2">
  <PageHead slot="head" title="Home" />
  <section
    class={cn(
      'mx-auto grid min-w-xs sm:has-[[data-trigger]:hover]:*:first:[&_[data-overlay]]:opacity-0',
      'max-w-sm grid-cols-1 [grid-template-areas:"a""b""e""d""g""f""j""i""k"]',
      'sm:max-w-2xl sm:grid-cols-2 sm:[grid-template-areas:"a_a""b_d""e_e""j_g""h_i""h_c""k_c""f_f"]',
      'lg:max-w-5xl lg:grid-cols-3 lg:[grid-template-areas:"a_a_b""d_e_e""h_f_f""h_i_g""k_c_j"]',
      'xl:max-w-7xl xl:grid-cols-4 xl:[grid-template-areas:"a_a_b_c""d_e_e_c""h_f_f_g""h_i_j_k"]',
    )}
  >
    <div class="aspect-[3/4] p-2 [grid-area:a] sm:aspect-[2/1] xl:aspect-[2/1]">
```

Although Tailwind might have been a hard contender in 2022 <dim-span>(which is when I learned it)</dim-span>, native CSS has flourished in the last couple of years, which has made it so much more enticing and beautiful to use and learn.

The main pusher for this switch for me was my friend Lyra ([@rebane2001](https://x.com/rebane2001)), who wrote ["You no longer need JavaScript"](https://lyra.horse/blog/2025/08/you-dont-need-js/). It's my favorite blog post, maybe ever, and it's written in a single HTML file. I implore you to read it and you will see the beauty of native CSS and how it's inspired me to make this change. You can see how different and more self-documenting my files are now:

```astro title="src/pages/index.astro" collapse={9-16,20-32}
<Layout>
  <MetaPage slot="head" />
  <dictionary-entry>
    <h1>er·u·dite</h1>
    <etymology-span>
      <ipa-span>/ˈer(y)əˌdīt/</ipa-span> adj. [L. <i>ēruditus</i>, instructed, pp. of <i>ērudīre</i> to instruct, polish, lit. to free from roughness, f. ē- out + <i>rudis</i> rough, untrained]
    </etymology-span>
    <ol>
      <li>
        having or showing deep, wide-ranging knowledge acquired through study;
        learned (<i>an erudite scholar</i>).
      </li>
      <li>
        (of writing, speech, or argument) reflecting such knowledge; scholarly
        (<i>an erudite footnote</i>).
      </li>
    </ol>
    <hr />
    <prose-content>
      <p>
        astro-erudite is an opinionated, unstyled static blogging template.
      </p>
      <p>
        To use this template, check out the <a
          href="https://github.com/jktrn/astro-erudite"
          target="_blank"
          rel="noopener noreferrer">GitHub</a
        > repository. To learn more about why this template exists, read this
        blog post: <a href="/blog/introducing-v2"
          >Introducing astro-erudite v2</a
        >.
      </p>
    </prose-content>
  </dictionary-entry>
</Layout>

<style>
  dictionary-entry {
    display: block;
    font-size: var(--step-0);
    color: var(--muted-foreground);

    @media (width >= 64rem) {
      margin-block-start: -0.2em;
    }

    ipa-span {
      opacity: 0.6;
    }

    h1 {
      font-size: var(--step-2);
      line-height: calc(var(--leading-offset) + 1em);
      font-weight: var(--font-weight-medium);
      color: var(--foreground);
      margin-block-end: var(--space-2xs);
    }

    ol {
      margin-block-start: var(--space-xs);
      list-style: none;

      li {
        padding-inline-start: 1em;
        text-indent: -1em;

        &::before {
          content: counter(list-item);
          display: inline-block;
          inline-size: 1em;
          text-indent: 0;
          font-weight: var(--font-weight-medium);
        }

        + li {
          margin-block-start: var(--space-3xs);
        }
      }
    }

    hr {
      margin-block: var(--space-m);
      border-block-start: 2px solid var(--border);
    }

    prose-content {
      margin-block-start: var(--space-xs);
    }
  }
</style>
```

The main paradigm is now utilizing HTML [autonomous custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) alongside arbitrary attributes. From Lyra's blog post:

> You are allowed to just make up elements [as long as their names contain a hyphen](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name). Apart from the 8 existing tags listed at the link, no HTML tags contain a hyphen and none ever will. The spec even has `<math-α>{:html}` and `<emotion-😍>{:html}` as [examples of allowed names](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name:~:text=%F0%9F%98%8D). You are allowed to make up attributes on an [autonomous custom element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts:~:text=Any%20namespace%2Dless%20attribute), but for other elements (built-in or extended) you should only make up `data-*` attributes. I make heavy use of this on my blog to make writing HTML and CSS nicer and avoid meaningless div-soup.

#### "If not Tailwind's sizing system, then what?"

Instead of Tailwind's baked-in design system, tokens, and breakpoints, astro-erudite now uses [Utopia](https://utopia.fyi/). Utopia is not a dependency or a framework, but rather a simple internet calculator that provides three different solutions for three different problems: type scaling, spacing, and grid layouts.

The goal of Utopia is to provide a principled and elegant way to write breakpoint-less typography and spacing rules <dim-span>(as opposed to the `xs`, `sm`, `md`, `lg`, `xl`, `2xl` breakpoint names that Tailwind uses)</dim-span>. If you play around with the demo on their homepage <dim-span>(or simply just fiddle with the viewport width of this blog post, if you're on a desktop)</dim-span>, you can see how my margins, paddings, and font sizes are automatically adjusted based on the current viewport width!

To put it reductively, you specify three things at two different "poles": the minimum viewport and maximum viewport <dim-span>(i.e., "between what two widths should I allow the system to change?")</dim-span>:
1. Where do I want to place this pole?
2. At this pole, what should the font size be?
3. At this pole, what multiplier (type scale) should I use between each heading?

Utopia then calculates a `clamp(){:css}` that properly interpolates between these two poles based on the current viewport width! Here is the visual from their [blog post](https://utopia.fyi/blog/designing-with-fluid-type-scales):

![Utopia type scale visual](https://utopia.fyi/images/fluid-type-scale-visualisation.png)

astro-erudite personally uses the following:
- The minimum viewport is 328px,[^1] where the font size should be 16px and the type scale should be 1.125 (major second).
- The maximum viewport is 1215px, where the font size should be 18px and the type scale should be 1.2 (minor third).[^2]

| Scale step | @min <dim-span>(328px)</dim-span> | @max <dim-span>(1215px)</dim-span> |
| -: | -: | -: |
| 3 | 22.78 | 31.10 |
| 2 | 20.25 | 25.92 |
| 1 | 18.00 | 21.60 |
| 0 | 16.00 | 18.00 |
| -1 | 14.22 | 15.00 |

[^1]: 328px and 1215px might seem like a somewhat arbitrary choice for pole positions. However, these were originally 320px <dim-span>(the de-facto absolute minimum width for responsiveness)</dim-span> and 1024px <dim-span>(when the v2 sidebar converts into a header)</dim-span> and were then adjusted by the [Fluid grid calculator](https://utopia.fyi/grid/calculator?c=328,16,1.125,1215,18,1.2,3,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l|s-m&g=s,m,2xl,12) for the following reasons:

    - For minimum width, we ended up "rounding up" to create a perfect grid:
      > When you design a grid based on a fixed viewport, the sums rarely add up to nice neat whole numbers. Design tools usually compensate by rounding alternating columns up and down, leaving them with whole pixel values but inconsistent widths. If you prefer to design on a perfect grid, you can instead choose to round the container width up or down using the options above.
    - For maximum width, our maximum viewport was too small for the grid we wanted:
      > Your @max viewport is set to **1024px**, but the grid generated with this calculator has a max width of **1215px**. You may wish to update your @max viewport to match this calculated value, so your typography and space flex up to this point. If you leave it as is, your type & space will continue to grow/shrink beyond the capped grid.

[^2]: Nearly all the type scale ratios provided on the calculator are actually ratios from [Just intonation](https://en.wikipedia.org/wiki/Just_intonation), a tuning system based on simple ratios (as opposed to [equal temperament](https://en.wikipedia.org/wiki/Equal_temperament), which is the standard for Western music that uses irrational numbers). The reason why this pops up here is probably because both our sense of hearing and vision care about relative proportions rather than absolute sizes. It's slightly oversold here <dim-span>(in music there is the physical property in that the wavelengths actually harmonize for a perfect fifth)</dim-span> but it's still a cool detail!

You can find the calculator preset for this particular setup [here](https://utopia.fyi/type/calculator?c=328,16,1.125,1215,18,1.2,3,1,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l%7Cs-m&g=s,m,2xl,12). It will then generate the following:

```css title="src/styles/typography.css" collapse={8-18}
:root {
  /* https://utopia.fyi/type/calculator?c=328,16,1.125,1215,18,1.2,3,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l|s-m&g=s,m,2xl,12 */
  --step--1: clamp(0.8889rem, 0.8709rem + 0.0877vw, 0.9375rem);
  --step-0: clamp(1rem, 0.9538rem + 0.2255vw, 1.125rem);
  --step-1: clamp(1.125rem, 1.0418rem + 0.4059vw, 1.35rem);
  --step-2: clamp(1.2656rem, 1.1346rem + 0.6392vw, 1.62rem);
  --step-3: clamp(1.4238rem, 1.2315rem + 0.9383vw, 1.944rem);

  --font-weight-normal: 400;
  --font-weight-medium: 450;

  --tracking-tight: -0.015em;
  --leading-offset: 0.65rem;

  --prose-foreground: color-mix(in oklab, var(--foreground) 80%, transparent);
  --prose-marker:     color-mix(in oklab, var(--foreground) 30%, transparent);

  --measure: 40rem;
}
```

You then can simply assign these in your typography!

:::tip
There are no rules to how you are supposed to map each step, but I've opted for the following:

- `--step--1` &rarr; chrome (visual navigation) elements, subtext, `<h5>{:html}`/`<h6>{:html}` (to disincentivize using them)
- `--step-0` &rarr; `<p>{:html}`, `<h4>{:html}`
- `--step-1` &rarr; `<h3>{:html}`
- `--step-2` &rarr; `<h2>{:html}`
- `--step-3` &rarr; `<h1>{:html}`

In general, though, you should use `--step-0` as your baseline since it is the step that you actually control.
:::

In addition to handling type scaling, the aforementioned poles are also used for spacing! Utopia calls these "t-shirt sizes," which is quite cute actually.

There are three types of scaling variables that Utopia outputs for you:
- **Single-space.** These are the self-explanatory base-level space variables.
- **Space-value pairs (single-step).** If you wish for any particular space to have a more emphasized scaling effect when interpolated, you can use a space-value pair! For example, `--space-m-l` will interpolate between M &rarr; L from the minimum to maximum poles.
- **Space-value pairs (arbitrary).** You can arbitrarily assign any single-space variable at any pole and have it scale! I personally don't use this feature, but you can output it.

```css title="src/styles/layout.css"
:root {
  /* https://utopia.fyi/grid/calculator?c=320,16,1.125,1024,18,1.2,6,1,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l%7Cs-m&g=s,m,2xl,12 */
  --space-3xs: clamp(0.25rem, 0.2269rem + 0.1127vw, 0.3125rem);
  --space-2xs: clamp(0.5rem, 0.4769rem + 0.1127vw, 0.5625rem);
  --space-xs: clamp(0.75rem, 0.7038rem + 0.2255vw, 0.875rem);
  --space-s: clamp(1rem, 0.9538rem + 0.2255vw, 1.125rem);
  --space-m: clamp(1.5rem, 1.4307rem + 0.3382vw, 1.6875rem);
  --space-l: clamp(2rem, 1.9076rem + 0.451vw, 2.25rem);
  --space-xl: clamp(3rem, 2.8613rem + 0.6764vw, 3.375rem);
  --space-2xl: clamp(4rem, 3.8151rem + 0.9019vw, 4.5rem);
  --space-3xl: clamp(6rem, 5.7227rem + 1.3529vw, 6.75rem);

  --space-3xs-2xs: clamp(0.25rem, 0.1344rem + 0.5637vw, 0.5625rem);
  --space-2xs-xs: clamp(0.5rem, 0.3613rem + 0.6764vw, 0.875rem);
  --space-xs-s: clamp(0.75rem, 0.6113rem + 0.6764vw, 1.125rem);
  --space-s-m: clamp(1rem, 0.7458rem + 1.2401vw, 1.6875rem);
  --space-m-l: clamp(1.5rem, 1.2227rem + 1.3529vw, 2.25rem);
  --space-l-xl: clamp(2rem, 1.4915rem + 2.4803vw, 3.375rem);
  --space-xl-2xl: clamp(3rem, 2.4453rem + 2.7057vw, 4.5rem);
  --space-2xl-3xl: clamp(4rem, 2.9831rem + 4.9605vw, 6.75rem);

  --grid-max-width: 75.94rem;
  --grid-gutter: var(--space-s-m);
  --grid-columns: 12;

  --page-offset-top: var(--space-xl);
  --page-offset-bottom: var(--space-m);
}
```

These can be used throughout your site's margin and padding values to create this neat scaling effect. In particular, it is used in Utopia's [fluid grid](https://utopia.fyi/grid/calculator?c=320,16,1.125,1024,18,1.2,3,1,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l%7Cs-m&g=s,m,2xl,12) system, which establishes a set of 12[^3] columns and gutters that scale between your minimum and maximum poles using single-space variables. v2 uses the following configuration:

[^3]: 12 is a mathematically flexible number that allows you to divide a page into halves, thirds, quarters, and sixths. I believe it was originally used in print and magazine typography, and was then popularized by [Bootstrap](https://getbootstrap.com/) (correct me if I'm wrong).

| Width | @min  | @max |
| - | -: | -: |
| Container | 328px | 1215px |
| Gutter | 16px | 27px |
| Column | 10px | 72px |

We can then establish our grid layout and span sections across it:

```astro title="src/layouts/Layout.astro" collapse={11-15} {30-32,35,40-42}
<html lang={SITE.locale} dir={SITE.dir}>
  <MetaHead>
    <slot name="head" />
  </MetaHead>
  <body>
    <page-grid>
      <page-header>
        <page-nav>
          <Sidebar crumbs={crumbs}><slot name="actions" slot="actions" /></Sidebar>
        </page-nav>
        {
          Astro.slots.has("toc") && (
            <page-toc><slot name="toc" /></page-toc>
          )
        }
      </page-header>
      <page-content>
        <main><slot /></main>
        <page-footer><Footer /></page-footer>
      </page-content>
    </page-grid>
  </body>
</html>

<style>
  page-grid {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
    gap: calc(var(--grid-gutter));
    max-width: var(--grid-max-width);
    min-height: 100svh;
    margin-inline: auto;
    padding-inline: var(--grid-gutter);
    padding-block-start: var(--page-offset-top);
  }

  page-header { display: contents; }
  page-nav { grid-column: 1 / 3; grid-row: 1; }
  page-content { grid-column: 3 / 10; grid-row: 1; }
  page-toc { grid-column: 10 / 13; grid-row: 1; }
  /* ... */
</style>
```

And that is a complete rundown of astro-erudite's new design system!

#### "If not Tailwind's color system, then what?"

[Radix Colors](https://www.radix-ui.com/colors), with each scale carrying a light and dark value per step:

```css title="src/styles/color.css"
:root {
  --gray-1:  light-dark(#fcfcfc, #111111);
  --gray-2:  light-dark(#f9f9f9, #191919);
  --gray-3:  light-dark(#f0f0f0, #222222);
  --gray-4:  light-dark(#e8e8e8, #2a2a2a);
  --gray-5:  light-dark(#e0e0e0, #313131);
  --gray-6:  light-dark(#d9d9d9, #3a3a3a);
  --gray-7:  light-dark(#cecece, #484848);
  --gray-8:  light-dark(#bbbbbb, #606060);
  --gray-9:  light-dark(#8d8d8d, #6e6e6e);
  --gray-10: light-dark(#838383, #7b7b7b);
  --gray-11: light-dark(#646464, #b4b4b4);
  --gray-12: light-dark(#202020, #eeeeee);

  --red-9:  light-dark(#e5484d, #e5484d);
  --red-11: light-dark(#ce2c31, #ff9592);

  --background:         var(--gray-1);
  --foreground:         var(--gray-12);
  --primary:            var(--gray-12);
  --primary-foreground: var(--gray-1);
  --muted:              var(--gray-3);
  --muted-foreground:   var(--gray-11);
  --destructive:        var(--red-11);
  --border:             var(--gray-6);
  --ring:               var(--gray-8);

  color-scheme: light dark;
}
```

We now use [`light-dark(){:css}`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark) here instead of Tailwind's [`dark:*`](https://tailwindcss.com/docs/dark-mode) variant. We do still need to use a little bit of JavaScript to handle saving the user's color scheme if they hit the toggle button. However, upon first load astro-erudite will always respect system preference.

#### "If not Tailwind's [...], then what?"

This is a bunch of miscellaneous Tailwind stuff we have actually kept in some capacity:

- For its CSS reset <dim-span>(a CSS reset serves to minimize cross-browser inconsistencies)</dim-span>, we do still actually use [Preflight](https://tailwindcss.com/docs/preflight), but it's simply vendored in as `reset.css`.
- For its various utilities with nice numbers, I've hand-selected some in `shape.css` for use cases like when we need border radius or backdrop blurs.

### Regarding typography

As you might have noticed, astro-erudite is now using a new font! We're now on [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono). Historically, IBM Plex Sans was commissioned by IBM to replace [Helvetica Neue](https://en.wikipedia.org/wiki/Helvetica) <dim-span>(arguably one of the greatest fonts of all time)</dim-span>. These two replace [Geist Sans](https://fonts.google.com/specimen/Geist)/[Mono](https://fonts.google.com/specimen/Geist+Mono) in part because Geist <dim-span>(and likewise, [Inter](https://fonts.google.com/specimen/Inter))</dim-span> have been overused to the moon and back.

Some other readability changes:
- I personally despise heavy font weights. I also despise thin weights. Since astro-erudite is, of course, opinionated, I've decided to exclusively ship only the 400 <dim-span>(normal)</dim-span> and 500 <dim-span>(medium)</dim-span> weights of IBM Plex Mono. For IBM Plex Sans, a variable font, I've made it so that there are no instances of weights other than 400 and 450 <dim-span>(not 500!)</dim-span> throughout v2. I almost always prefer establishing hierarchy through opacity rather than weight: headers and links should get 100%, prose should get 80%, and muted text should get 60%.
- Due to Utopia, desktop devices now get big 18px fonts, and mobile devices get 16px fonts. v1 had 16px on desktop, and it just stayed like that.
- In regards to line height, all lines now use the following computation:

  ```css showLineNumbers=false
  --leading-offset: 0.65rem;
  line-height: calc(var(--leading-offset) + 1em);
  ```

  Instead of some unitless multiplier number, we now additively add a constant offset (0.65rem) to each element's own font size (1em). This keeps a roughly constant gap between lines regardless of text size, so headings stay tight and body text stays comfortable without needing a separate line-height rule for every heading and paragraph.
- We now use `max-inline-size: var(--measure){:css}` where `--measure: 40rem{:css}`. 40rem makes the overall content width narrower and nicer to read.
- For the specific task of importing fonts via `@font-face{:css}`, you may notice that there's a couple of weird entries:

  ```css title="src/styles/fonts.css" startLineNumber={17} collapse={10-18,29-39} {7,24-27}
  @font-face {
    font-family: "IBM Plex Sans";
    src: url("../assets/fonts/IBMPlexSans-LatinExt-VariableFont_wght.woff2") format("woff2");
    font-weight: 100 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0100-02FF, U+0300-036F, U+1D00-1DBF, U+1E00-1EFF, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF;
  }
  
  @font-face {
    font-family: "IBM Plex Sans";
    src: url("../assets/fonts/IBMPlexSans-LatinExt-Italic-VariableFont_wght.woff2") format("woff2");
    font-weight: 100 700;
    font-style: italic;
    font-display: swap;
    unicode-range: U+0100-02FF, U+0300-036F, U+1D00-1DBF, U+1E00-1EFF, U+20A0-20C0, U+2C60-2C7F, U+A720-A7FF;
  }
  
  @font-face {
    font-family: "IBM Plex Sans Fallback";
    src: local("Arial");
    font-weight: 100 700;
    font-style: normal;
    size-adjust:       101.1663%;
    ascent-override:   101.3184%;
    descent-override:  27.183%;
    line-gap-override: 0%;
  }
  
  @font-face {
    font-family: "IBM Plex Sans Fallback";
    src: local("Arial");
    font-weight: 100 700;
    font-style: italic;
    size-adjust:       101.1663%;
    ascent-override:   101.3184%;
    descent-override:  27.183%;
    line-gap-override: 0%;
  }
  ```
    - The former entries involve a `LatinExt` (Latin Extended) font. The goal is to support the rendering of Latin-based characters in other languages, e.g. Spanish, French, Vietnamese, German, Polish, etc. It also allows me to properly render the [IPA](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) pronunciation of erudite <dim-span>(/ˈer(y)əˌdīt/)</dim-span> so that I can put a cool dictionary definition on the homepage of this template.
    - The latter entries involve a fallback font. I manually specify `local("Arial"){:css}` as the fallback, but then I also specify these weird adjustments to ascenders, descenders, and sizing. These were actually automatically generated by Astro's [Fonts API](https://docs.astro.build/en/guides/fonts/) <dim-span>(which I intentionally didn't use because its syntax was clunky for minimal benefit)</dim-span>.

The typography files themselves have also dramatically changed. Instead of throwing everything into `global.css` and `typography.css` <dim-span>(this file was atrocious in v1, and used `!important{:css}` 9 (!!!) times)</dim-span>, we now divide CSS files into their responsibilities: color, layout, fonts, shape, etc. For specifically typography, we additionally divide it into the following: headings, lists, tables, block <dim-span>(block-level elements, e.g. tables, figures, codeblocks)</dim-span>, and inline <dim-span>(inline-level elements, e.g. links, `<kbd>{:html}`, inline code)</dim-span>. Although this has resulted in many new files, each file is readable and low cortisol to look at, and is focused in intents and purposes.

### Regarding MDX

v2 no longer ships with the `@astrojs/mdx` package/`mdx(){:ts}` plugin by default. This is one of my more debatable decisions, so I should explain myself a little bit.

The entire point of MDX is to provide an easy way to write interactive components inside of your prose. Here is one now:

<click-counter></click-counter>

<script>
  if (!customElements.get("click-counter")) {
    customElements.define(
      "click-counter",
      class extends HTMLElement {
        connectedCallback() {
          let count = 0
          const button = document.createElement("button")
          button.textContent = "Clicked 0 times"
          button.addEventListener("click", () => {
            button.textContent = `Clicked ${++count} times`
          })
          this.append(button)
        }
      },
    )
  }
</script>

There's actually no MDX involved here! You're reading a regular `.md` file. That button is an [autonomous custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) defined a few lines up in this exact document, which works because raw HTML <dim-span>(including `<script>{:html}` tags)</dim-span> passes straight through the Markdown pipeline:

```html title="index.md" showLineNumbers=false
<click-counter></click-counter>

<script>
  if (!customElements.get("click-counter")) {
    customElements.define(
      "click-counter",
      class extends HTMLElement {
        connectedCallback() {
          let count = 0
          const button = document.createElement("button")
          button.textContent = "Clicked 0 times"
          button.addEventListener("click", () => {
            button.textContent = `Clicked ${++count} times`
          })
          this.append(button)
        }
      },
    )
  }
</script>
```

:::note
The `customElements.get(){:js}` check is not optional! Since astro-erudite has [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), it re-runs body scripts across page swaps, and `customElements.define(){:js}` throws if the name is already registered.
:::

A plethora of other benefits also comes with unchaining ourselves from the React ecosystem like this:
- Removing `@astrojs/mdx` also drops our dependency tree by 51 packages <dim-span>(more packages than everything v2 stacks on top of Astro!)</dim-span>.
- JSX syntax is a lot less forgiving for both humans and compilers. Non-technical writers find it harder to write valid JSX, and embedded JSX can also fail entire builds. In general, rendering it is heavier.
- Your blogs are now dramatically more portable and universal to different platforms!

I also want to reiterate that you are completely free to install it yourself if you need it. If your blog leans heavily into interactive playgrounds, MDX with a framework island is still the right tool. I just no longer am convinced its weight is worth it to be a default for a personal blog.

#### "But what about callouts?"

I don't know why I ever thought this was in any way ergonomic, but in v1 any time you wanted to add a callout you would have to import it at the top of your file and call it like this:

```tsx showLineNumbers=false
import Callout from '@/components/callout.astro'

<Callout title="Testing" variant="note">
  Hello, world!
</Callout>
```

v2 ships with the [Sätteri](https://satteri.bruits.org/) Markdown processor, which supports [directives](https://satteri.bruits.org/docs/features/#directives) with the same specification as [remark-directive](https://github.com/remarkjs/remark-directive). We now can add callouts to our Markdown content like this, without any imports:

```markdown showLineNumbers=false
:::note[Testing]
Hello, world!
:::
```
This renders as:

:::note[Testing]
Hello, world!
:::

We do this with a custom MDAST plugin that hooks into Sätteri, rather than an Astro component. Do note that this is one of the breaking changes from v1 to v2.

### Regarding unified and Sätteri

With the release of [Astro 6.4](https://astro.build/blog/astro-640/), a new `markdown.processor` API was added that allows you to swap out the entire unified pipeline. An official alternative was added, [Sätteri](https://satteri.bruits.org/), a Markdown/MDX processor written in Rust. Of course, it's very fast <dim-span>(switching the Astro and Cloudflare docs sites over reportedly shaved a minute off each of their builds)</dim-span>, but the real reason why I switched was because I wanted to get off of rehype/remark so badly.

For reference, this was v1's Markdown setup. It was a set of seven different plugins stacked ridiculously like Tetris pieces into this single object <dim-span>(don't even mention the giant `styleOverrides` block)</dim-span>:

```ts title="astro.config.ts (v1)" startLineNumber={35} collapse={32-56}
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
      [
        rehypeExpressiveCode,
        {
          themes: ['github-light', 'github-dark'],
          plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
          useDarkModeMediaQuery: false,
          themeCssSelector: (theme: ExpressiveCodeTheme) =>
            `[data-theme="${theme.name.split('-')[1]}"]`,
          defaultProps: {
            wrap: true,
            collapseStyle: 'collapsible-auto',
            overridesByLang: {
              'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
                {
                  showLineNumbers: false,
                },
            },
          },
          styleOverrides: {
            codeFontSize: '0.75rem',
            borderColor: 'var(--border)',
            codeFontFamily: 'var(--font-mono)',
            codeBackground:
              'color-mix(in oklab, var(--muted) 25%, transparent)',
            frames: {
              editorActiveTabForeground: 'var(--muted-foreground)',
              editorActiveTabBackground:
                'color-mix(in oklab, var(--muted) 25%, transparent)',
              editorActiveTabIndicatorBottomColor: 'transparent',
              editorActiveTabIndicatorTopColor: 'transparent',
              editorTabBorderRadius: '0',
              editorTabBarBackground: 'transparent',
              editorTabBarBorderBottomColor: 'transparent',
              frameBoxShadowCssValue: 'none',
              terminalBackground:
                'color-mix(in oklab, var(--muted) 25%, transparent)',
              terminalTitlebarBackground: 'transparent',
              terminalTitlebarBorderBottomColor: 'transparent',
              terminalTitlebarForeground: 'var(--muted-foreground)',
            },
            lineNumbers: {
              foreground: 'var(--muted-foreground)',
            },
            uiFontFamily: 'var(--font-sans)',
          },
        },
      ],
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          inline: 'tailing-curly-colon',
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
```

The order of operations within this setup also mattered <dim-span>(e.g. some plugins must show up later in the chain than others)</dim-span>, which made it even more brittle. Not only this, but notice how v1 had two separate syntax highlighters with two separate configuration options: `rehype-expressive-code` for code blocks, and `rehype-shiki` for inline code. This was the workaround for the longest time, because Expressive Code only supported highlighting code blocks.

v2's Markdown configuration now looks like this:

```ts title="astro.config.ts (v2)" startLineNumber={21}
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      features: { directive: true, math: true },
      mdastPlugins: [calloutDirective, inlineExpressiveCode, temmlMath],
      hastPlugins: [externalLinks, blockExpressiveCode, headingNamespace],
    }),
  },
```

Every single plugin in `mdastPlugins` and `hastPlugins` is a file in `src/lib` that I wrote myself. Sätteri doesn't run remark or rehype plugins at all, but rather has its own plugin API where a plugin is just an object with a `name` and a visitor per node type, operating on either the MDAST <dim-span>(Markdown semantics: headings, lists, directives)</dim-span> or the HAST <dim-span>(HTML semantics: tags, attributes)</dim-span>. This seems like a downside <dim-span>(since I'm willingly walking away from many years of mature ecosystem plugins)</dim-span> until you see how great the porting experience actually is.

From here, I will talk about each of the six plugins that I've created and shipped with v2. Since Sätteri is still incredibly young <dim-span>(as of this blog post, it came out two weeks ago)</dim-span>, in the future there will likely be official companion plugins/dependencies that do just this, but for now we have maximum ownership and, thus, maximum flexibility.

#### Rendering external links

We sort this section from trivial to nontrivial. The most basic of these is my `external-links` plugin, and its sole purpose is to add `target="_blank"{:html}` and `rel="nofollow noreferrer noopener"{:html}` to links. We do this via the HAST:

```ts title="src/lib/external-links.ts"
import { defineHastPlugin } from "satteri"

export const externalLinks = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties.href
      if (typeof href === "string" && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, "target", "_blank")
        ctx.setProperty(node, "rel", "nofollow noreferrer noopener")
      }
    },
  },
})
```

#### Namespacing headings

This plugin is responsible for namespacing headings within posts that have subposts (which I talk about in [Regarding subposts](#regarding-subposts), since this system has also been completely overhauled). This is so that in the case where multiple subposts share the same heading, the headings are differentiated by prepending the post's file name to the ID. We do this via the HAST:

```ts title="src/lib/heading-namespace.ts"
import GithubSlugger from "github-slugger"
import { defineHastPlugin } from "satteri"

const SUBPOST = /\/blog\/[^/]+\/(?!index\.mdx?$)([^/]+)\.mdx?$/

export function headingNamespace() {
  const slugger = new GithubSlugger()
  return defineHastPlugin({
    name: "heading-namespace",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const match = SUBPOST.exec(ctx.filename)
        if (!match) return
        ctx.setProperty(
          node,
          "id",
          `${match[1]}-${slugger.slug(ctx.textContent(node))}`,
        )
      },
    },
  })
}
```

Two details make this plugin work:

1. It's exported as a factory function rather than a plain plugin object. Sätteri accepts both, but a factory is re-invoked for every document, which gives each post a fresh slugger <dim-span>(`github-slugger` deduplicates within an instance, so a shared one would leak `introduction-1`, `introduction-2`, &hellip; across posts)</dim-span>.
2. Heading IDs aren't actually generated by Sätteri itself. They come from `@astrojs/markdown-satteri`, which appends its own slugging plugin at the very end of the HAST plugin chain. Crucially, that built-in plugin respects any `id` that already exists and passes it unchanged, meaning that I can claim the ID first.

#### Rendering math

v1 rendered LaTeX through `remark-math` and `rehype-katex`. [KaTeX](https://katex.org/) outputs a mountain of nested `<span>{:html}` elements that are completely meaningless without its stylesheet, so v1 also shipped a script that watched every page swap and injected `katex.min.css` <dim-span>(and, transitively, whichever of its fonts the page needed)</dim-span> from a CDN whenever it spotted a `.katex` element. This was a ridiculous approach and I'm sorry for this.

v2 renders LaTeX through [Temml](https://temml.org/), which outputs [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML). Since MathML is actually browser-native <dim-span>(it became Baseline in 2023)</dim-span>, we no longer need to inject a CSS file and instead just need to bring along a math font! [STIX Two Math](https://fonts.google.com/specimen/STIX+Two+Math) is a great choice <dim-span>(and the default for macOS)</dim-span>. Here is the plugin, done with the MDAST:

```ts title="src/lib/math.ts"
import { defineMdastPlugin } from "satteri"
import temml from "temml"

const err = (e: unknown) => (e instanceof Error ? e.message : String(e))

export function temmlMath() {
  return defineMdastPlugin({
    name: "temml-math",
    inlineMath(node, ctx) {
      try {
        const value = temml.renderToString(node.value, { throwOnError: false })
        return { type: "html", value }
      } catch (error) {
        ctx.report({
          message: `temml-math: failed on \`${node.value}\`: ${err(error)}`,
          node,
          severity: "warning",
        })
      }
    },
    math(node, ctx) {
      try {
        const value = temml.renderToString(node.value, {
          displayMode: true,
          throwOnError: false,
        })
        return { type: "html", value: `<math-display>${value}</math-display>` }
      } catch (error) {
        ctx.report({
          message: `temml-math: failed on \`${node.value}\`: ${err(error)}`,
          node,
          severity: "warning",
        })
      }
    },
  })
}
```

Math syntax (`$...$` and `$$...$$`) is its own Sätteri feature flag, which is why `math: true{:ts}` sits next to `directive: true{:ts}` in the config. The plugin hands the TeX to Temml and returns the raw MathML back into the tree, and block-level math additionally gets wrapped in a `<math-display>{:html}` custom element so the stylesheet has something to center and horizontally scroll:

$$
1 + \cfrac{e^{-2\pi}}{1 + \cfrac{e^{-4\pi}}{1 + \cfrac{e^{-6\pi}}{1 + \cfrac{e^{-8\pi}}{1 + \cdots}}}} = \left( \sqrt{\frac{5 + \sqrt{5}}{2}} - \frac{1 + \sqrt{5}}{2} \right) e^{2\pi/5}
$$

#### Rendering callouts

This is the plugin I promised back in ["But what about callouts?"](#but-what-about-callouts). With the flag on, Sätteri parses `:::` blocks into `containerDirective` <dim-span>(as opposed to inline `:` and leaf `::`)</dim-span> MDAST nodes and then leaves them for someone to handle:

```ts title="src/lib/callout.ts" collapse={1-37}
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { ElementContent } from "hast"
import { toHtml } from "hast-util-to-html"
import { h } from "hastscript"
import { defineMdastPlugin } from "satteri"

const ICONS_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../assets/icons/callouts",
)

const loadIcon = (name: string) =>
  readFileSync(join(ICONS_DIR, `${name}.svg`), "utf8")
    .replace("<svg", '<svg aria-hidden="true"')
    .replace(/\s+/g, " ")
    .trim()

const VARIANTS: Record<string, string> = {
  note: "info-circle",
  tip: "lightbulb",
  warning: "danger-triangle",
  caution: "shield-warning",
  important: "bell",
}

const icons: Record<string, string> = {}
for (const name of [...new Set(Object.values(VARIANTS)), "alt-arrow-down"]) {
  icons[name] = loadIcon(name)
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const raw = (value: string): ElementContent =>
  ({ type: "raw", value }) as unknown as ElementContent

export function calloutDirective() {
  return defineMdastPlugin({
    name: "callout-directive",
    containerDirective(node, ctx) {
      const iconName = VARIANTS[node.name]
      if (!iconName) return

      const first = node.children[0]
      const isLabel =
        first?.type === "paragraph" &&
        (first.data as { directiveLabel?: boolean })?.directiveLabel === true
      const label = isLabel ? ctx.textContent(first) : null
      if (isLabel) ctx.removeNode(first)

      const title: ElementContent[] = [
        { type: "text", value: capitalize(node.name) },
      ]
      if (label) title.push(h("span", ` (${label})`))

      const summary = toHtml(
        h("summary", [
          raw(icons[iconName]),
          h("span", title),
          raw(icons["alt-arrow-down"]),
        ]),
        { allowDangerousHtml: true },
      )

      const closed = !!node.attributes && "closed" in node.attributes

      ctx.prependChild(node, { type: "html", value: summary })
      ctx.setProperty(node, "data", {
        hName: "details",
        hProperties: {
          dataCallout: node.name,
          open: !closed,
        },
      })
    },
  })
}
```

The five variants defined in the plugin are derived from [GitHub alerts](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) <dim-span>(note, tip, warning, caution, important)</dim-span>. Because they're real `<details>{:html}` elements, every callout you've seen in this post is natively collapsible with exactly zero JavaScript, and appending `{closed}` to the directive makes one start out collapsed.

There are some clever things behind-the-scenes that make this all work very elegantly:
- The icons are Solar SVGs read off the disk at build time and inlined straight into the HTML, so we need no client-side fetching of icons and no icon library.
- Each `data-callout` variant only needs a single color defined for `--accent`, and then legible colors are automatically derived for both light and dark mode with some small modifications to lightness and chroma:

```css title="src/styles/callout.css" collapse={9-63} {6-7}
prose-content {
  [data-callout] {
    --accent:         var(--muted-foreground);
    --callout-border: var(--accent);
    --callout-text:   light-dark(
      oklch(from var(--accent) 0.48 calc(c * 1.05) h),
      oklch(from var(--accent) 0.83 calc(c * 0.5) h)
    );

    position: relative;
    padding-block: 0.75rem;
    padding-inline: 1rem 0;
    border-inline-start: 4px solid var(--callout-border);

    > summary {
      display: flex;
      align-items: center;
      cursor: pointer;
      list-style: none;
      font-weight: 500;
      color: var(--callout-text);

      &::-webkit-details-marker {
        display: none;
      }

      svg {
        flex-shrink: 0;
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      svg:first-child {
        margin-inline-end: 0.5rem;
      }

      svg:last-child {
        margin-inline-start: auto;
      }

      > span {
        margin-inline-end: 0.5rem;

        > span {
          font-weight: 400;
          opacity: 0.7;
        }
      }
    }

    &[open] > summary {
      margin-block-end: 0.75rem;

      svg:last-child {
        transform: rotate(180deg);
      }
    }

    > :last-child {
      margin-block-end: 0;
    }
  }

  [data-callout="note"]      { --accent: #0090ff; }
  [data-callout="tip"]       { --accent: #30a46c; }
  [data-callout="warning"]   { --accent: #ffc53d; }
  [data-callout="caution"]   { --accent: #e5484d; }
  [data-callout="important"] { --accent: #8e4ec6; }
}
```

#### Highlighting code blocks

Code blocks are still rendered by [Expressive Code](https://expressive-code.com/), because nothing else comes close <dim-span>(text markers, collapsible sections, ANSI color code rendering, line numbers, and the editor and terminal frames)</dim-span>. Crazily, the first companion plugin the Sätteri team shipped was [`satteri-expressive-code`](https://www.npmjs.com/package/satteri-expressive-code) <dim-span>(it exists in the same monorepo as Sätteri itself)</dim-span>, so my "plugin" here is nine lines of wiring:

```ts title="src/lib/expressive-code/index.ts"
import expressiveCode from "satteri-expressive-code"
import { ecRenderer } from "./config"
import { inlineExpressiveCode } from "./inline"

export const blockExpressiveCode = expressiveCode({
  customCreateRenderer: () => ecRenderer,
})

export { inlineExpressiveCode }
```

The configuration <dim-span>(the one with the giant `styleOverrides` block I told you not to worry about)</dim-span> now, thankfully, gets shooed away in its own file instead of being crammed into `astro.config.ts`, and every override points at a custom property from the design system, so code blocks scale fluidly with Utopia and follow the theme toggle like everything else on the page:

```ts title="src/lib/expressive-code/config.ts" collapse={14-58}
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import {
  createRenderer,
  type SatteriExpressiveCodeOptions,
} from "satteri-expressive-code"

export const ecOptions: SatteriExpressiveCodeOptions = {
  themes: ["github-light", "github-dark"],
  useDarkModeMediaQuery: true,
  themeCssSelector: (theme) =>
    `[data-theme="${theme.name === "github-dark" ? "dark" : "light"}"]`,
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  defaultProps: {
    wrap: true,
    showLineNumbers: true,
    collapseStyle: "collapsible-auto",
    overridesByLang: {
      "ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh":
        {
          showLineNumbers: false,
        },
    },
  },
  styleOverrides: {
    codeFontSize: "var(--step--1)",
    codeFontFamily: "var(--font-mono)",
    codeBackground: "color-mix(in oklab, var(--muted) 25%, transparent)",
    borderColor: "var(--border)",
    borderRadius: "0",
    uiFontFamily: "var(--font-sans)",
    lineNumbers: {
      foreground: "var(--muted-foreground)",
    },
    frames: {
      editorActiveTabForeground: "var(--muted-foreground)",
      editorActiveTabBackground: "transparent",
      editorActiveTabIndicatorBottomColor: "transparent",
      editorActiveTabIndicatorTopColor: "transparent",
      editorTabBorderRadius: "0",
      editorTabBarBackground: "transparent",
      editorTabBarBorderBottomColor: "transparent",
      frameBoxShadowCssValue: "none",
      terminalBackground: "color-mix(in oklab, var(--muted) 25%, transparent)",
      terminalTitlebarBackground: "transparent",
      terminalTitlebarBorderBottomColor: "transparent",
      terminalTitlebarForeground: "var(--muted-foreground)",
    },
    textMarkers: {
      backgroundOpacity: "25%",
      borderOpacity: "25%",
      defaultChroma: "50",
      lineMarkerLabelColor: "var(--foreground)",
    },
    collapsibleSections: {
      closedFontFamily: "var(--font-sans)",
    },
  },
}

export const ecRenderer = createRenderer(ecOptions)
```

The line that actually matters here is `customCreateRenderer{:ts}`. If we had left it alone, the plugin would create its own private Expressive Code renderer. Instead, we create the renderer ourselves and hand it over, because we'll need to borrow it in the next section.

#### Highlighting inline code

This plugin is the most complicated of the six, and my personal favorite. As mentioned before, v1 ran two separate highlighters because Expressive Code only handles fenced code blocks <dim-span>(`rehype-expressive-code` for blocks, and `@shikijs/rehype` for inline code)</dim-span>, each with its own Shiki instance and its own theme configuration to keep in sync. This has been a massive pain point for me for over a year now <dim-span>(I opened [this abandoned issue](https://github.com/expressive-code/expressive-code/issues/250) and prompted [this stale PR](https://github.com/expressive-code/expressive-code/pull/336), and I even wrote a small blog post on patching the plugin behavior: [v1.3.0: "Patches in Production"](/blog/v1-posts/rehype-patch))</dim-span>.

v2 keeps `@shikijs/rehype`'s annotation syntax, an inline snippet ending in `{:lang}` <dim-span>(they call this a "tailing curly colon")</dim-span>:

```markdown showLineNumbers=false
The `mdx(){:ts}` plugin is gone.
```

The major difference is that it now feeds through the exact same renderer as the code blocks. When the plugin sees an annotated inline code node, it constructs a one-line `ExpressiveCodeBlock{:ts}`, renders it with the shared renderer from `config.ts`, plucks the highlighted tokens out of the result, and throws the rest of the frame away:

```ts title="src/lib/expressive-code/inline.ts" collapse={1-13,41-60}
import type { ElementContent } from "hast"
import { toHtml } from "hast-util-to-html"
import { select } from "hast-util-select"
import { h } from "hastscript"
import type { Html } from "mdast"
import { defineMdastPlugin } from "satteri"
import {
  type ExpressiveCode,
  ExpressiveCodeBlock,
  type ExpressiveCodeTheme,
} from "satteri-expressive-code"
import { ecRenderer } from "./config"

const ANNOTATION = /^(.+?)\{:([^}]+)\}$/

type Annotation =
  | { kind: "lang"; code: string; lang: string }
  | { kind: "scope"; code: string; scope: string }

function parseAnnotation(value: string): Annotation | null {
  const match = ANNOTATION.exec(value)
  if (!match) return null
  const [, code, tag] = match
  if (!code || tag === ".") return null
  return tag.startsWith(".")
    ? { kind: "scope", code, scope: tag.slice(1) }
    : { kind: "lang", code, lang: tag }
}

async function highlightLanguage(
  ec: ExpressiveCode,
  code: string,
  lang: string,
): Promise<ElementContent[]> {
  const block = new ExpressiveCodeBlock({ code, language: lang })
  const { renderedGroupAst } = await ec.render(block)
  const tokens = select(".ec-line .code", renderedGroupAst)?.children
  return tokens ?? [{ type: "text", value: code }]
}

function highlightScope(
  ec: ExpressiveCode,
  code: string,
  scope: string,
): ElementContent[] {
  const [light, dark] = ec.styleVariants
  const c0 = resolveScopeColor(light.theme, scope)
  const c1 = resolveScopeColor(dark.theme, scope)
  return [h("span", { style: `--0:${c0};--1:${c1}` }, code)]
}

function resolveScopeColor(theme: ExpressiveCodeTheme, scope: string): string {
  const best = (theme.settings ?? [])
    .flatMap((rule) =>
      (rule.scope ?? []).map((s) => ({ s, fg: rule.settings.foreground })),
    )
    .filter(({ s, fg }) => fg && (scope === s || scope.startsWith(`${s}.`)))
    .sort((a, b) => b.s.length - a.s.length)[0]
  return best?.fg ?? theme.fg
}

export function inlineExpressiveCode() {
  return defineMdastPlugin({
    name: "inline-expressive-code",
    async inlineCode(node, ctx) {
      const annotation = parseAnnotation(node.value)
      if (!annotation) return

      try {
        const { ec } = await ecRenderer
        const tokens =
          annotation.kind === "lang"
            ? await highlightLanguage(ec, annotation.code, annotation.lang)
            : highlightScope(ec, annotation.code, annotation.scope)
        const dataLanguage =
          annotation.kind === "lang" ? annotation.lang : undefined

        const value = toHtml(h("code", { dataEc: "", dataLanguage }, tokens))
        return { type: "html", value } satisfies Html
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error)
        ctx.report({
          message: `inline-expressive-code: failed on \`${node.value}\`: ${reason}`,
          node,
          severity: "warning",
        })
      }
    },
  })
}
```

Now that we have a single highlighter, we only need a single configuration for both code blocks and inline code, and they will never drift out of sync with each other again. There's even the added bonus that you can use [TextMate scopes](https://macromates.com/manual/en/language_grammars), so I can paint `anything{:.string}` with whatever color the active theme assigns to strings!

And that is the entire v2 Markdown pipeline!

### Regarding subposts

Subposts were one of the most important features of v1. They allowed you to compartmentalize content into smaller and more digestible pieces, and allowed you to establish a chain of related content. Although I am speaking of it in past tense like I mysteriously decided to remove it in v2, it's not going anywhere! I just made it infinitely better to use.

Within v1, a subpost was its own standalone page. You'd read the parent, then click into part one, then click into part two, and so on. Since every part was a separate URL with separate content, I had to build three different navigational components so that you never felt lost:
1. A sticky sidebar listing the series on desktop (`SubpostsSidebar.astro`)
2. A collapsible dropdown on mobile (`SubpostsHeader.astro`)
3. A special three-column previous/parent/next footer

In addition to a lot of modified post metadata <dim-span>(aggregated "total" reading times, and "x subposts" count badges on blog cards)</dim-span>, those two components alone were 581 lines, and a third of the functions in `data-utils.ts` existed just to serve them.

We approach this concept in v2 very differently. Rather than splitting into separate pages for each subpost, we now have a single continuous document. Every URL in the series renders the parent and every subpost, top to bottom. The only difference between the URLs is where you land. Now, you navigate through subposts simply by scrolling, and your scrollbar is the navigational tool.

If you wish to see a live demo, the v1 posts on this website have been archived as a series, which means [the v1.6.0 post that originally announced subposts](/blog/v1-posts/mobile-nav-and-subposts) is now itself a subpost. Open it and watch the address bar as you scroll.

I've avoided changing the authoring experience <dim-span>(a folder with an `index.md` and its sibling subposts, plus an optional `order` field in the frontmatter)</dim-span>. What has changed is the route generation, which now builds one identical "chain" of articles and emits it once per URL:

```ts title="src/pages/blog/[...id].astro" startLineNumber={13}
export async function getStaticPaths() {
  const posts = await getPosts()
  const series = await getSubposts()
  return posts.flatMap((parent, i) => {
    const chain = [parent, ...(series.get(parent.id) ?? [])]
    return chain.map((post) => ({
      params: { id: post.id },
      props: { post, chain, prev: posts[i + 1], next: posts[i - 1] },
    }))
  })
}
```

From there, a small script updates your address bar. An `IntersectionObserver{:ts}` watches a thin band near the top of the viewport, and whenever a different article in the chain crosses it, the URL and tab title silently swap to match what you're reading. Of course, this is bidirectional:

```ts title="src/components/SeriesReader.astro" showLineNumbers=false
const { url, title } = current.dataset
if (url && trimSlash(location.pathname) !== url) {
  history.replaceState(history.state, "", url + hash)
  if (title) document.title = title
  syncCrumb(current)
}
```

Incidentally, several benefits come from switching to this design:
- Each subpost URL is unique, so deep links work exactly as expected. You will be scrolled to that article in the series before first paint.
- Since every URL in a series shares the same body, the scroll position Astro stores in `history.state{:ts}` is valid on all of them, so reloading or hitting the back button restores the exact spot where you were reading!
- Subpost URLs now declare a `<link rel="canonical">{:html}` pointing at the parent, so search engines don't index the same document multiple times.
- Only the article you landed on gets an eagerly-loaded banner image; every other banner in the chain lazy-loads.
- We can entirely rid ourselves of `SubpostsSidebar.astro` and `SubpostsHeader.astro` by simply combining them with `TableOfContents.astro`. The table of contents now outlines the entire series, with a collapsible group per subpost. The collapsible group will open when you enter a new subpost, but will not close behind you when you leave the post you were coming from.

:::important
The trade-off with this approach is that every URL of a series ships the HTML of the entire series. I'm fine with this, as HTML compresses extremely well, and images <dim-span>(the actual heavy part)</dim-span> are lazy.
:::

### Regarding UI/UX

The rest of the changes are smaller interface decisions that don't individually deserve a full section, so here they are rapid-fire:

- **The header is now a sidebar.** I've come to dislike headers in the past couple of months, as I felt they were obstructing the vertical flow of content. On desktop, v1 had both this header and a breadcrumb on every page. On mobile, you could have up to three headers if you were on a post with subposts. v2 merges the navigation and breadcrumb into what is effectively a tiny file tree! I feel that this is an intuitive approach to navigating websites, especially with the indentation. Below 64rem <dim-span>(when there's no longer room for it)</dim-span> the sidebar flattens back into a top bar.
  - **There is exactly one table of contents.** v1 shipped both a `toc-sidebar.astro` for desktop and `toc-header.astro` for mobile. v2 renders both out of a single `TableOfContents.astro` thanks to our new Utopian grid! It comes with the same nice features as before <dim-span>(multi-section highlighting, automatic scrolling on long pages)</dim-span>, but additionally adds collapsible subpost dropdowns for when posts have them.
- **Pagination is dead.** v1 chopped the blog index into pages of three posts and walked you between them with a shadcn/ui `<Pagination>{:tsx}` component. Nobody has ever wanted to be on page 4 of a personal blog. v2 puts every post on one page and lets you scroll because pagination never made sense in the first place for that scale.
- **The about page is also dead.** You should probably use your homepage as an about me section rather than tucking it away. Projects, which were previously squatting at the bottom of the about page, have been promoted to their own [/projects](/projects) route!
- **We can now mix-and-match icons!** v1 originally used [Lucide](https://lucide.dev/) through its three separate icon packages. In a similar vein to Geist's removal, Lucide has been ridiculously overused in the last couple of years, and readers deserve something a little bit more fresh. Since we no longer depend on icon libraries, we no longer have any particular loyalty to a specific icon set and can now mix and match! I mainly used [Solar](https://icones.js.org/collection/solar)'s Bold variant, but for the navigation arrows I used [Phosphor](https://icones.js.org/collection/ph) and for the theme toggle I used [Akar Icons](https://icones.js.org/collection/akar-icons).
- **Better post navigation and quality-of-life.** Rather than having two copies of previous/next buttons at the top and bottom of the page <dim-span>(which is what v1 did)</dim-span>, the sidebar layout now allows for a persistent set of action buttons on the bottom left: the theme toggle, prev/next buttons, and a "scroll to top" button that only appears when the user scrolls enough down the page.

## Breaking changes

v2 is a really big rewrite. Design-wise, if you have a customized v1 fork, I would highly suggest not attempting to pull v2 into it. My suggestion here would actually be to send the diff between your v1 fork and v1 baseline to an agent and then have it replicate those changes on a fresh v2.

Content-wise, ensure you (or your agent) are aware of the following caveats when porting a v1 post to v2:
- **`.mdx` files are no longer collected.** The content loader's glob is `**/[^_]*.md` now <dim-span>(the `[^_]` also lets you hide a file from the loader entirely by prefixing it with an underscore)</dim-span>.
  - Ensure you convert all instances of `<Callout>{:tsx}` to [`:::` directives](#but-what-about-callouts), and interactive components to [custom elements with a `<script>{:html}` tag](#regarding-mdx).
  - If your content is too interactive and needs framework islands, install `@astrojs/mdx` back and re-add `.mdx` to your glob.
- **`authors` is now required, and it's a real reference.** v1's frontmatter field was an optional array of strings that simply hoped a matching author file existed. v2 uses `reference("authors"){:ts}`, so every post must declare its authors and the build fails loudly when one points at nothing. This removes the concept of "guest" authors, or authors that never resolve.
- **Author socials are now collapsed into one field.** `website`, `twitter`, `github`, `linkedin`, and `discord` are no longer five hardcoded schema fields, but a single `socials` record mapping any label to a URL. You are no longer limited to the five networks I happened to think of in 2024.
- **Emoji shortcodes are gone.** `remark-emoji` left with the rest of the unified pipeline, so `:wink:` renders as its literal syntax. Your operating system has an emoji picker. 😉
- **Math renders to MathML.** The `$...$` and `$$...$$` syntax is unchanged, but KaTeX-specific macros and extensions won't necessarily exist in [Temml's support table](https://temml.org/docs/en/supported.html). In practice the overlap covers everything a blog post actually uses, so this shouldn't be a problem.
- **Heading anchors inside subposts moved.** A series is one continuous document now, so subpost headings get namespaced IDs to avoid collisions <dim-span>(`#introduction` inside `deploy.md` becomes `#deploy-introduction`)</dim-span>. Old deep links to subpost headings will land on the right page but not scroll to the right spot.
- **Some URLs no longer exist.** `/about` is gone <dim-span>(projects moved to `/projects`)</dim-span>, and the paginated `/blog/2`, `/blog/3`, ... pages are now also gone. If you care about inbound links to these, Astro's [`redirects`](https://docs.astro.build/en/guides/routing/#redirects) config has you covered.
- **`consts.ts` was reshaped a little bit.** `NAV_LINKS{:ts}` is now `NAVIGATION{:ts}`, `SOCIAL_LINKS{:ts}` is now `SOCIALS{:ts}` and imports its SVG icons directly, and `ICON_MAP{:ts}` is gone because there is no icon library left to map into! `SITE{:ts}` lost `postsPerPage{:ts}` and `href{:ts}`, and gained `dir{:ts}` plus `defaultPageImage{:ts}` and `defaultPostImage{:ts}`.
- **Your Tailwind customizations have nowhere to go.** This unfortunately is the painful one. Any classes you've layered onto v1 components have to be rewritten as actual CSS against the [new design system](#regarding-tailwind). I genuinely believe the result will be smaller and more legible than what you had, but there is work to be done. Please defer to your local coding agent for guidance!
- **Your remark and rehype plugins won't run.** Any remark or rehype plugins you depend on will need to be ported to [Sätteri's plugin API](#regarding-unified-and-sätteri). Thankfully, you have six plugins in `src/lib` that you can use as reference implementations.

## Conclusion

I am very aware of the irony of doing all of this knowing full well that in another two years my taste will have shifted yet again and I'll be drafting v3. I think this is totally fine! I've always wanted astro-erudite to be a realistic snapshot of my current preferences and judgement. I think it's a great way to show my growth as a developer.

If you are on the fence about creating a personal blog, I implore you to give it a try. I'm not even telling you this just because I want you to use this template <dim-span>(I don't make any money off this)</dim-span>, but rather because I want to spread the joy of simply **creating your own space**. On your own website, you can write whatever you want and build whatever you want. Everything exists on your terms. You might think that you don't like writing because you were forced to write argumentative essays about To Kill a Mockingbird or Shakespeare or whatever in middle school. You are not bound by any constraints here; on my blog I exclusively wrote about cybersecurity until I went on vacation one time and returned home as a travel blogger. Writing about things you actually love is addicting and a great way to express yourself and your voice!

astro-erudite is open-source [on my GitHub](https://github.com/jktrn/astro-erudite). If you've built something with v1 these past two years, thank you. This is my gift to you! :)

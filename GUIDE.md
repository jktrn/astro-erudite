# Astronomeer: The Complete Guide

**Astronomeer** is a premium, magazine-style Astro theme built with **Astro 5**, **Tailwind CSS 4**, and **Shadcn UI**. It prioritizes developer experience (DX) and performance, offering a clean, type-safe foundation for static content sites.

This guide serves as the definitive manual for configuring, customizing, and extending the theme.

---

## 1. Getting Started

### Prerequisites
*   Node.js v18+
*   npm, pnpm, or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

---

## 2. Project Structure

An overview of the key directories and files:

```bash
/
├── astro.config.ts        # Astro configuration (MDX, Sitemap, React)
├── components.json        # Shadcn UI configuration
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Shadcn primitives (Button, Input, etc.)
│   │   └── ...            # Site-specific components (Header, Footer)
│   ├── content/           # Content Collections
│   │   ├── blog/          # Blog posts (MDX)
│   │   └── authors/       # Author profiles (JSON/YAML)
│   ├── layouts/           # Page layouts (Layout.astro)
│   ├── lib/               # Utilities (utils.ts, data-utils.ts)
│   ├── pages/             # File-based routing (index.astro, blog/...)
│   ├── styles/            # Global CSS (Tailwind imports, custom props)
│   └── consts.ts          # Global site configuration constants
└── tailwind.config.ts     # Tailwind configuration
```

---

## 3. Configuration & Customization

This section details how to personalize every aspect of the site.

### 3.1 Site Metadata
**File:** `src/consts.ts`

This file is the control center for your site's global information.

*   `SITE`:
    *   `title`: The name of your blog (appears in browser tab/SEO).
    *   `description`: Default meta description for SEO.
    *   `href`: Your production URL (e.g., `https://astronomeer.vercel.app`).
    *   `author`: Default author name.
    *   `locale`: Language code (e.g., `en-US`).
    *   `featuredPostCount`: Number of posts to fetch for the "Recent" section.
    *   `postsPerPage`: Pagination limit for the blog archive.

### 3.2 Navigation Links
**File:** `src/consts.ts`

Modify the `NAV_LINKS` array to change the header navigation.
```typescript
export const NAV_LINKS: SocialLink[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' }, // Add new links here
]
```

### 3.3 Social Media Links
**File:** `src/consts.ts`

Modify `SOCIAL_LINKS` to control what appears in the footer/header. You must also map the label to an icon in `ICON_MAP`.

```typescript
export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  // Key must match the 'label' in SOCIAL_LINKS
}
```

### 3.4 Styling (Colors & Fonts)
**File:** `src/styles/global.css`

Astronomeer uses **Tailwind CSS v4** variables.

**To change colors:**
Edit the OKLCH values in the `:root` (light mode) and `[data-theme='dark']` (dark mode) blocks.
*   `--primary`: The main brand color (buttons, links).
*   `--background`: Page background color.
*   `--foreground`: Main text color.

**To change fonts:**
1.  Place new font files in `public/fonts/`.
2.  Update the `@font-face` rules in `src/styles/global.css`.
3.  Update the `--font-sans` and `--font-mono` variables in the `@theme inline` block.

---

## 4. Content Management

### 4.1 Creating Blog Posts
**Directory:** `src/content/blog/`

Create a new file (e.g., `my-post.mdx`) or a folder (`my-post/index.mdx`).

**Required Frontmatter:**
```yaml
---
title: 'My Awesome Post'
description: 'A brief summary for cards and SEO.'
date: 2024-12-08
tags: ['tech', 'tutorial']
image: './cover.png'      # Optional: Main feature image
authors: ['jktrn']        # Must match an ID in src/content/authors/
draft: false              # Set true to hide from build
---
```

### 4.2 Managing Authors
**Directory:** `src/content/authors/`

Create a JSON file named after the author id (e.g., `jktrn.json`).

```json
{
  "name": "Jason",
  "avatar": "/images/avatars/jason.jpg",
  "bio": "Software Engineer",
  "twitter": "https://twitter.com/jktrn"
}
```

---

## 5. Implementation Guide: Magazine Features

This section provides step-by-step instructions to implement the "Magazine" features proposed in the original appendix. These changes will transform the simple blog list into a rich media layout.

### Feature 1: The "Hero" Grid Layout

This replaces the simple list on the homepage with a dynamic grid featuring the latest post and two trending stories.

**Step 1: Create the Component**
Create a new file: `src/components/magazine/HeroGrid.astro`.

```astro
---
// src/components/magazine/HeroGrid.astro
import type { CollectionEntry } from 'astro:content';
import { Image } from 'astro:assets';

interface Props {
  posts: CollectionEntry<'blog'>[];
}

const { posts } = Astro.props;
const [featured, ...side] = posts.slice(0, 3);
---

<section class="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
  <!-- Main Feature (Left, spans 8 cols) -->
  <article class="md:col-span-8 group relative rounded-xl overflow-hidden border bg-card">
    <a href={`/blog/${featured.slug}`} class="block h-full">
        {featured.data.image && (
          <Image 
            src={featured.data.image} 
            alt={featured.data.title}
            class="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/90 to-transparent w-full">
            <span class="text-white text-xs font-bold uppercase tracking-wider bg-primary px-2 py-1 rounded-sm mb-2 inline-block">
                {featured.data.tags?.[0] || 'Featured'}
            </span>
            <h2 class="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {featured.data.title}
            </h2>
            <p class="text-gray-200 line-clamp-2 md:line-clamp-3">
                {featured.data.description}
            </p>
        </div>
    </a>
  </article>

  <!-- Side Stack (Right, spans 4 cols) -->
  <div class="md:col-span-4 flex flex-col gap-6">
    {side.map(post => (
        <article class="flex-1 group relative rounded-xl overflow-hidden border bg-card">
            <a href={`/blog/${post.slug}`} class="flex flex-col h-full">
                 {post.data.image && (
                    <Image 
                        src={post.data.image} 
                        alt={post.data.title}
                        class="w-full h-32 object-cover"
                    />
                )}
                <div class="p-4 flex flex-col justify-center">
                     <span class="text-xs font-semibold text-muted-foreground mb-1">
                        {post.data.date.toLocaleDateString()}
                    </span>
                    <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.data.title}
                    </h3>
                </div>
            </a>
        </article>
    ))}
  </div>
</section>
```

**Step 2: Update the Homepage**
Open `src/pages/index.astro` and modify it to use `HeroGrid`.

1.  Import the component:
    ```astro
    import HeroGrid from '@/components/magazine/HeroGrid.astro';
    ```
2.  Replace the existing loop:
    ```astro
    <!-- Old Code: -->
    <!-- <ul class="flex flex-col gap-y-4"> {blog.map(...)} </ul> -->

    <!-- New Code: -->
    <HeroGrid posts={blog} />
    ```

### Feature 2: Category "Island" Sections

Create sections that group posts by specific tags (e.g., "Design", "Code").

**Step 1: Create the Component**
Create `src/components/magazine/CategorySection.astro`.

```astro
---
import { getPostsByTag } from '@/lib/data-utils'; // Ensure this utility exists or create it
// Note: You may need to implement getPostsByTag in lib/data-utils.ts first.
// It should filter the 'blog' collection by the provided tag.

import { getCollection } from 'astro:content';

interface Props {
    tag: string;
    title: string;
}

const { tag, title } = Astro.props;
const allPosts = await getCollection('blog', ({ data }) => {
    return data.tags && data.tags.includes(tag) && !data.draft;
});
const posts = allPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, 4);
---

<section class="py-8 border-t">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold tracking-tight">{title}</h2>
        <a href={`/tags/${tag}`} class="text-sm text-muted-foreground hover:text-primary">View All &rarr;</a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map(post => (
            <div class="flex flex-col group">
                <div class="aspect-video bg-muted rounded-md mb-3 overflow-hidden border">
                     {/* Replace with actual Image logic if available */}
                     <div class="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                        Image
                     </div>
                </div>
                <h3 class="font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                    <a href={`/blog/${post.slug}`}>{post.data.title}</a>
                </h3>
                <span class="text-xs text-muted-foreground">{post.data.date.toLocaleDateString()}</span>
            </div>
        ))}
    </div>
</section>
```

**Step 2: Use in Homepage**
In `src/pages/index.astro`:
```astro
<CategorySection title="Engineering" tag="engineering" />
<CategorySection title="Lifestyle" tag="life" />
```

### Feature 3: Trending Sidebar

Add a sidebar to article pages to keep users engaged.

**Step 1: Modify Layout**
Open `src/layouts/Layout.astro`.
Find the main container (usually a `main` tag or similar). Add a slot for the sidebar.

```astro
<main class="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 py-8">
    <div class="lg:col-span-8">
        <slot /> <!-- Main Content -->
    </div>
    
    <!-- Sidebar Slot -->
    <aside class="hidden lg:block lg:col-span-4 space-y-8">
        <slot name="sidebar" />
    </aside>
</main>
```

**Step 2: Create Sidebar Content**
When using the layout in a page (like `src/pages/blog/[...slug].astro`), pass content to the named slot.

```astro
<Layout>
  <article>...</article>
  
  <fragment slot="sidebar">
      <div class="border rounded-lg p-6 bg-card">
          <h3 class="font-bold mb-4">Trending</h3>
          <!-- List trending posts here -->
      </div>
      <div class="border rounded-lg p-6 mt-6">
           <h3 class="font-bold mb-4">Newsletter</h3>
           <!-- Insert Newsletter form -->
      </div>
  </fragment>
</Layout>
```

### Feature 4: Newsletter Component

A React component for capturing leads.

**Step 1: Create Component**
Create `src/components/magazine/Newsletter.tsx`.

```tsx
import { buttonVariants } from "@/components/ui/button"

export function Newsletter() {
  return (
    <div className="bg-primary/5 border rounded-lg p-8 text-center">
      <h3 className="text-xl font-bold mb-2">Join our Newsletter</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Weekly updates on tech and creation.
      </p>
      <form className="flex flex-col gap-2">
        <input 
            type="email" 
            placeholder="you@example.com" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        />
        <button className={buttonVariants()}>Subscribe</button>
      </form>
    </div>
  )
}
```

---

## 6. Deployment

Astronomeer is optimized for Vercel, but runs anywhere.

**Vercel:**
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Framework Preset: **Astro**.
4.  Deploy.

**Netlify:**
1.  Drag and drop your `dist` folder (after running `npm run build`), or connect to Git.

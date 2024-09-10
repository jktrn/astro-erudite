---
title: "[Old] Blog Collection"
description: "How to add posts to the blog."
date: "2024-03-21"
tags: ['aa']
---

---

## Working with the `blog` collection:

The `blog` collection is found in `src/content/blog`.

```
📁 /src/content/blog
└── 📁 post-1
      └── 📄 index.md
└── 📁 post-2
      └── 📄 index.mdx
```

In the above example, two blog posts will be generated with the folder name representing the slug.

- `https://example.com/blog/post-1`
- `https://example.com/blog/post-2`

---

## Provide metadata

Metadata is required for each post.

```astro
---
title: "Blog Collection";
description: "How to add posts to the blog.";
date: "2024-03-21";
draft: false;
---
```

| Field       | Req | Type    | Remarks                                          |
| :---------- | :-- | :------ | :----------------------------------------------- |
| title       | Yes | string  | Title of the content. Used in SEO and RSS.       |
| description | Yes | string  | Description of the content. Used in SEO and RSS. |
| date        | Yes | string  | Must be a valid date string (able to be parsed). |
| draft       | No  | boolean | If draft: true, content will not be published.   |

---

All that's left to do is write the content under the metadata.

```astro
---
title: "Blog Collection";
description: "How to add posts to the blog.";
date: "2024-03-21";
draft: false;
---

## Working with the blog collection
<!-- content -->
```

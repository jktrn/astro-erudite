---
title: 'v1.5.0: “A Callout Component for Nerds”'
description: 'A quick update introduces our first content-based component: the callout!'
date: 2025-04-24
order: 3
tags:
  - v1.5.0
image: "./assets/callouts-component.png"
authors:
  - enscribe
---

## Our (hesitantly) first content-based component

This new version of astro-erudite, v1.5.0, introduces our first content-based component: the callout! I was a bit hesitant about adding this component because, frankly, the entire philosophy behind this project was to be as minimalistic as possible—I wanted to simply provide boilerplate to remove the "busy work" factor that often takes away from the writing process.

However, just based on some blog posts I've seen that use this template, I felt like there would be a universal desire just to have this component around in the case where it'd be needed. The primary inspiration came when user [@rezaarezvan](https://github.com/rezaarezvan) sent in a PR to add their site, [rezaarezvan.com](https://rezaarezvan.com), to the examples section in the README. They had years upon years of accumulated notes and resources on their site, most of which were in the form of LaTeX-style academic content that requires "blocks" for things like definitions, theorems, and proofs. I sent in an encouraging reply to the PR and then started building the component:

> [[@jktrn]](https://github.com/jktrn/astro-erudite/pull/29#issuecomment-2814894034) your blog posts are literally insane btw @rezaarezvan how have you written multiple textbooks worth of educational resources???
>
> i think i might add latex-style theorem/lemma/corollary/def/proof/eg/ex/remark blocks to astro-erudite so i can accommodate for these academia-style blogs, like e.g. for exercises it'd just be a component with an expandable section to hide the answer

### How does it work?

I've added a simple `Callout.astro` to `src/components` that now comes shipped with the template. It's a very easy-to-read component that has an insanely long configuration scheme for all of the different types of callouts that I've added. Fundamentally, it follows the same paradigm as [shadcn/ui](https://ui.shadcn.com) which uses [class-variance-authority](https://cva.style/docs) to create different "variants" on top of a base styling scheme:

```astro title="src/components/Callout.astro" collapse={12-126} {8-10,131}
---
import { cn } from '@/lib/utils'
import { Icon } from 'astro-icon/components'
import { cva, type VariantProps } from 'class-variance-authority'

const calloutConfig = {
  note: {
    style: 'border-blue-500 dark:bg-blue-950/5',
    textColor: 'text-blue-700 dark:text-blue-300',
    icon: 'lucide:info',
  },
  tip: {
    style: 'border-green-500 dark:bg-green-950/5',
    textColor: 'text-green-700 dark:text-green-300',
    icon: 'lucide:lightbulb',
  },
  warning: {
    style: 'border-amber-500 dark:bg-amber-950/5',
    textColor: 'text-amber-700 dark:text-amber-300',
    icon: 'lucide:alert-triangle',
  },
  danger: {
    style: 'border-red-500 dark:bg-red-950/5',
    textColor: 'text-red-700 dark:text-red-300',
    icon: 'lucide:shield-alert',
  },
  important: {
    style: 'border-purple-500 dark:bg-purple-950/5',
    textColor: 'text-purple-700 dark:text-purple-300',
    icon: 'lucide:message-square-warning',
  },
  definition: {
    style: 'border-purple-500 dark:bg-purple-950/5',
    textColor: 'text-purple-700 dark:text-purple-300',
    icon: 'lucide:book-open',
  },
  theorem: {
    style: 'border-teal-500 dark:bg-teal-950/5',
    textColor: 'text-teal-700 dark:text-teal-300',
    icon: 'lucide:check-circle',
  },
  lemma: {
    style: 'border-sky-400 dark:bg-sky-950/5',
    textColor: 'text-sky-700 dark:text-sky-300',
    icon: 'lucide:puzzle',
  },
  proof: {
    style: 'border-gray-500 dark:bg-gray-950/5',
    textColor: 'text-gray-700 dark:text-gray-300',
    icon: 'lucide:check-square',
  },
  corollary: {
    style: 'border-cyan-500 dark:bg-cyan-950/5',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    icon: 'lucide:git-branch',
  },
  proposition: {
    style: 'border-slate-500 dark:bg-slate-950/5',
    textColor: 'text-slate-700 dark:text-slate-300',
    icon: 'lucide:file-text',
  },
  axiom: {
    style: 'border-violet-600 dark:bg-violet-950/5',
    textColor: 'text-violet-700 dark:text-violet-300',
    icon: 'lucide:anchor',
  },
  conjecture: {
    style: 'border-pink-500 dark:bg-pink-950/5',
    textColor: 'text-pink-700 dark:text-pink-300',
    icon: 'lucide:help-circle',
  },
  notation: {
    style: 'border-slate-400 dark:bg-slate-950/5',
    textColor: 'text-slate-700 dark:text-slate-300',
    icon: 'lucide:pen-tool',
  },
  remark: {
    style: 'border-gray-400 dark:bg-gray-950/5',
    textColor: 'text-gray-700 dark:text-gray-300',
    icon: 'lucide:message-circle',
  },
  intuition: {
    style: 'border-yellow-500 dark:bg-yellow-950/5',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    icon: 'lucide:lightbulb',
  },
  recall: {
    style: 'border-blue-300 dark:bg-blue-950/5',
    textColor: 'text-blue-600 dark:text-blue-300',
    icon: 'lucide:rotate-ccw',
  },
  explanation: {
    style: 'border-lime-500 dark:bg-lime-950/5',
    textColor: 'text-lime-700 dark:text-lime-300',
    icon: 'lucide:help-circle',
  },
  example: {
    style: 'border-emerald-500 dark:bg-emerald-950/5',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    icon: 'lucide:code',
  },
  exercise: {
    style: 'border-indigo-500 dark:bg-indigo-950/5',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    icon: 'lucide:dumbbell',
  },
  problem: {
    style: 'border-orange-600 dark:bg-orange-950/5',
    textColor: 'text-orange-700 dark:text-orange-300',
    icon: 'lucide:alert-circle',
  },
  answer: {
    style: 'border-teal-500 dark:bg-teal-950/5',
    textColor: 'text-teal-700 dark:text-teal-300',
    icon: 'lucide:check',
  },
  solution: {
    style: 'border-emerald-600 dark:bg-emerald-950/5',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    icon: 'lucide:check-circle-2',
  },
  summary: {
    style: 'border-sky-500 dark:bg-sky-950/5',
    textColor: 'text-sky-700 dark:text-sky-300',
    icon: 'lucide:list',
  },
} as const

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const calloutVariants = cva('relative px-4 py-3 my-6 border-l-4 text-sm', {
  variants: {
    variant: Object.fromEntries(
      Object.entries(calloutConfig).map(([key, config]) => [key, config.style]),
    ),
  },
  defaultVariants: {
    variant: 'note',
  },
})
```

As such, if you feel like there's any variant that you're missing, it's insanely trivial to add it yourself. It's less trivial, however, to figure out what colors to use since I've essentially taken up every good Tailwind color for these!

### How do I use these?

Within any `src/content/blog/**/*.mdx` file, you can now use the `Callout` component by importing it like so underneath your frontmatter:

```mdx title="src/content/blog/callouts-component/index.mdx" add={10}
---
title: 'v1.5.0: “A Callout Component for Nerds”'
description: 'A quick update introduces our first content-based component: the callout!'
date: 2025-04-24
tags: ['v1.5.0']
image: './1200x630.png'
authors: ['enscribe']
---

import Callout from '@/components/callout.astro'
```

Then, you can use the component like so. This is just an example but you should actually read the text since it's relevant to the article:

````mdx showLineNumbers=false collapse={3-11}
<Callout title="About Github-flavored alerts" variant="important">
  I know that Github typically uses the following syntax for "alerts" (which is what they call these callouts, you can see their documentation [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)):
  ```md showLineNumbers=false
  > [!NOTE]
  > Useful information that users should know, even when skimming content.
  ```
  The above syntax is supposed to render like this:
  <Callout>
    Useful information that users should know, even when skimming content.
  </Callout>
  I believe they do this so they can keep you within the Markdown-like syntax system. However, since this is MDX, I thought we'd be better off just using the component paradigm since it's a bit impractical to make a rehype plugin that can parse this form of syntax (also, solutions for this already exist, such as [lin-stephanie/rehype-callouts](https://github.com/lin-stephanie/rehype-callouts)). Additionally, I find it a pain to work with the `>{:md}` (the `<blockquote>{:html}` indicators for Markdown) syntax, as it makes it difficult to nest things such as code blocks within them in pure Markdown. We'll use components for now!
</Callout>
````

::::important[About Github-flavored alerts]
I know that Github typically uses the following syntax for "alerts" (which is what they call these callouts, you can see their documentation [here](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)):

```md showLineNumbers=false
> [!NOTE]
> Useful information that users should know, even when skimming content.
```

The above syntax is supposed to render like this:

:::note
Useful information that users should know, even when skimming content.
:::

I believe they do this so they can keep you within the Markdown-like syntax system. However, since this is MDX, I thought we'd be better off just using the component paradigm since it's a bit impractical to make a rehype plugin that can parse this form of syntax (also, solutions for this already exist, such as [lin-stephanie/rehype-callouts](https://github.com/lin-stephanie/rehype-callouts)). Additionally, I find it a pain to work with the `>{:md}` (the `<blockquote>{:html}` indicators for Markdown) syntax, as it makes it difficult to nest things such as code blocks within them in pure Markdown. We'll use components for now!
::::

Callout only supports three props:

| Prop | Description | Default |
| ---- | ----------- | ------- |
| `title` | The title of the callout | `undefined{:js}` |
| `variant` | The variant of the callout | `"note"{:js}` |
| `defaultOpen` | Whether the callout `<details>{:html}` box is open by default | `true{:js}` |

I've added an insane amount of variants to this component for potentially any use case you could think of. For the more general ones, you can use the following:

| Variant | Usage |
| ------- | ----- |
| Note | For general information or comments that don't fit other categories |
| Tip | For helpful advice or shortcuts related to the topic at hand |
| Warning | For potential pitfalls or common misconceptions |
| Danger | For things that could potentially be destructive or harmful |
| Important | For things that are important to the reader's understanding |

## Generic callouts

These are what the generic callouts look like (of course, all the text is made up):

::::note[Prerequisites for advanced React development]
This tutorial assumes you're familiar with React hooks and the component lifecycle. If you need a refresher, check out the [official React documentation](https://reactjs.org/docs/hooks-intro.html) before proceeding.
::::

::::tip[Productivity enhancement]
You can quickly format your code by pressing <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> (Windows/Linux) or <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>F</kbd> (Mac).

Additional shortcuts include:

| Action | Windows/Linux | Mac |
| ------ | ------------- | --- |
| Search | <kbd>Ctrl</kbd> + <kbd>F</kbd> | <kbd>Cmd</kbd> + <kbd>F</kbd> |
| Replace | <kbd>Ctrl</kbd> + <kbd>H</kbd> | <kbd>Cmd</kbd> + <kbd>H</kbd> |
| Save all | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd> | <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>S</kbd> |
::::

::::warning[Cross-browser compatibility issues]
This API is **not supported** in Internet Explorer and has limited support in older browsers. Make sure to include appropriate polyfills.

```js title="polyfill.js"
if (!Object.fromEntries) {
  Object.fromEntries = function(entries) {
    const obj = {};
    for (const [key, value] of entries) {
      obj[key] = value;
    }
    return obj;
  };
}
```

See the [Browser Compatibility Table](#) for detailed information.
::::

::::caution[Critical data loss risk]
Running this command will **permanently delete** all files in your current directory. Make sure to back up important data before proceeding.

```bash title="danger.sh"
# This will delete everything in the current directory
rm -rf ./*
# Safer alternative with confirmation
rm -ri ./*
```

This operation cannot be undone and recovery tools may not be able to restore your data.
::::

::::important[Major API changes in v2.0]
Version 2.0 introduces significant API changes. You'll need to update your existing code to use the new parameter structure.

1. The `configure(){:js}` method now returns a Promise
2. Authentication requires an API key object instead of a string
3. Event handlers use a new callback pattern

A migration example looks like the following:

```diff lang="js"
- app.configure("api-key-string");
+ await app.configure({ key: "api-key-string", version: "2.0" });

- app.on('event', callback);
+ app.on('event', { handler: callback, options: { once: true } });
```
::::

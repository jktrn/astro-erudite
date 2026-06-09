import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { ElementContent } from "hast"
import type {} from "mdast-util-to-hast"
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

export const calloutDirective = defineMdastPlugin({
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

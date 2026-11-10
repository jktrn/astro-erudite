import GithubSlugger from "github-slugger"
import { h } from "hastscript"
import { defineHastPlugin } from "satteri"
import { plainText } from "./hast-text"

export function headingAnchors() {
  const slugger = new GithubSlugger()
  return defineHastPlugin({
    name: "heading-anchors",
    element: {
      filter: ["h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const existing = node.properties.id
        const text = plainText(node)
        const id =
          typeof existing === "string" && existing
            ? existing
            : slugger.slug(text)
        if (!id) return
        if (existing !== id) ctx.setProperty(node, "id", id)
        ctx.appendChild(
          node,
          h("a", {
            dataHeadingAnchor: "",
            href: `#${id}`,
            ariaLabel: `Link to section: ${text}`,
            tabIndex: -1,
          }),
        )
      },
    },
  })
}

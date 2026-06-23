import { fileURLToPath } from "node:url"
import GithubSlugger from "github-slugger"
import { defineHastPlugin } from "satteri"

const SUBPOST = /\/blog\/[^/]+\/(?!index\.md$)([^/]+)\.md$/

export function headingNamespace() {
  const slugger = new GithubSlugger()
  return defineHastPlugin({
    name: "heading-namespace",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const path = ctx.fileURL ? fileURLToPath(ctx.fileURL) : ""
        const match = SUBPOST.exec(path)
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

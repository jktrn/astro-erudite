import { h } from "hastscript"
import { defineHastPlugin } from "satteri"

export const tableRegion = defineHastPlugin({
  name: "table-region",
  element: {
    filter: ["table"],
    visit(node, ctx) {
      ctx.wrapNode(
        node,
        h("div", {
          dataTable: "",
          role: "region",
          ariaLabel: "Table",
          tabIndex: 0,
        }),
      )
    },
  },
})

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

export const inlineExpressiveCode = defineMdastPlugin({
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

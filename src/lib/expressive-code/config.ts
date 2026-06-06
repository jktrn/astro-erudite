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

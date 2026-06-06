import expressiveCode from "satteri-expressive-code"
import { ecRenderer } from "./config"
import { inlineExpressiveCode } from "./inline"

export const blockExpressiveCode = expressiveCode({
  customCreateRenderer: () => ecRenderer,
})

export { inlineExpressiveCode }

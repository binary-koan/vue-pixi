import "./typeHelpers"
import { VueConstructor, PluginObject } from "vue"

import * as extras from "./extras"
import * as core from "./core"

export * from "./core"
export { extras }

const plugin: PluginObject<void> = {
  install(Vue: VueConstructor) {
    Object.keys(core).forEach(key => {
      Vue.component(kebabCase(key as string), (core as any)[key])
    })

    Object.keys(extras).forEach(key => {
      Vue.component(
        kebabCase(key as string).replace("pixi-", "pixi-extras-"),
        (extras as any)[key]
      )
    })
  }
}

function kebabCase(string: string) {
  return string.replace(/(.)(A-Z)/, "$1-$2").toLowerCase()
}

export default plugin

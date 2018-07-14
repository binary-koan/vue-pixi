import ResourceLoader, { LoadCallback } from "../resourceLoader"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

export default Vue.extend({
  beforeCreate() {
    this.$pixiRoot = {
      loader: new ResourceLoader(),
      root: new PIXI.Container(),
      app: undefined
    }
  },

  mounted() {
    const app = new PIXI.Application({ view: this.$el as HTMLCanvasElement })
    app.stage.addChild(this.$pixiRoot!.root)
    this.$pixiRoot!.app = app
  },

  beforeDestroy() {
    this.$pixiRoot!.loader.destroy()

    const app = this.$pixiRoot!.app
    if (app) app.destroy()
  },

  render(h) {
    return h("canvas", this.$slots.default)
  },

  methods: {
    $pixiLoadResource(name: string, callback: LoadCallback) {
      this.$pixiRoot!.loader.load(name, callback)
    },

    $pixiAddChild(child: Vue) {
      const index = this.$slots.default.indexOf(child.$vnode)
      this.$pixiRoot!.root.addChildAt(child.$pixi!.object, index)
    },

    $pixiRemoveChild(child: Vue) {
      this.$pixiRoot!.root.removeChild(child.$pixi!.object)
    }
  }
})

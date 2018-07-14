import DisplayObject from "./DisplayObject"
import { basicWatcher, generateWatchers } from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

export default DisplayObject.extend({
  pixiConstructor: () => new PIXI.Container(),

  props: {
    width: { type: Number },
    height: { type: Number }
  },

  watch: generateWatchers({
    width: basicWatcher,
    height: basicWatcher
  }),

  render(h) {
    return h("div", this.$slots.default)
  },

  methods: {
    $pixiAddChild(child: Vue) {
      const index = this.$slots.default.indexOf(child.$vnode)
      this.$pixi!.object.addChildAt(child.$pixi!.object, index)
    },

    $pixiRemoveChild(child: Vue) {
      this.$pixi!.object.removeChild(child.$pixi!.object)
    }
  }
})

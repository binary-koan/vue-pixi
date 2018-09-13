import DisplayObject from "./DisplayObject"
import { basicWatcher, generateWatchers } from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

export default DisplayObject.extend({
  pixiType: PIXI.Container,
  pixiCreateImmediately: true,

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
      const index = this.$slots.default
        .filter(vnode => !vnode.text) // Vue inserts text vnodes as spaces between components
        .indexOf(child.$vnode)

      const maxValidIndex =
        (this.$pixi!.object! as PIXI.Container).children.length + 1

      this.$pixi!.object!.addChildAt(
        child.$pixi!.object,
        Math.min(index, maxValidIndex)
      )
    },

    $pixiRemoveChild(child: Vue) {
      this.$pixi!.object!.removeChild(child.$pixi!.object)
    }
  }
})

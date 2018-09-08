import Vue, { VueConstructor } from "vue"
import * as PIXI from "pixi.js"
import { LoadCallback } from "../resourceLoader"
import {
  basicWatcher,
  resourceWatcher,
  eventWatcher,
  generateWatchers
} from "../watchers"

export default Vue.extend({
  props: {
    alpha: { type: Number },
    buttonMode: { type: Boolean },
    cacheAsBitmap: { type: Boolean },
    cursor: { type: String },
    filterArea: { type: PIXI.Rectangle },
    filters: { type: Array },
    hitArea: {
      type: [
        PIXI.Rectangle,
        PIXI.Circle,
        PIXI.Ellipse,
        PIXI.Polygon,
        PIXI.RoundedRectangle
      ]
    },
    interactive: { type: Boolean },
    mask: { type: [PIXI.Graphics, PIXI.Sprite] },
    name: { type: String },
    pivot: { type: [PIXI.Point, PIXI.ObservablePoint] },
    position: { type: [PIXI.Point, PIXI.ObservablePoint] },
    renderable: { type: Boolean },
    rotation: { type: Number },
    scale: { type: [PIXI.Point, PIXI.ObservablePoint] },
    skew: { type: PIXI.ObservablePoint },
    transform: { type: PIXI.TransformBase },
    visible: { type: Boolean },
    x: { type: Number },
    y: { type: Number }
  },

  watch: generateWatchers({
    alpha: basicWatcher,
    buttonMode: basicWatcher,
    cacheAsBitmap: {
      // Because cacheAsBitmap should cache the object in its current state with
      // textures applied, it needs to be set after the textures have been loaded
      generator: resourceWatcher,
      options: {
        loadName(value: boolean) {
          return undefined
        },
        onLoad(this: Vue, value: boolean) {
          // Wait for other resources, e.g. textures, to be applied
          this.$nextTick(() => (this.$pixi!.object!.cacheAsBitmap = value))
        }
      }
    },
    cursor: basicWatcher,
    filterArea: basicWatcher,
    filters: basicWatcher,
    hitArea: basicWatcher,
    interactive: eventWatcher,
    mask: basicWatcher,
    name: basicWatcher,
    pivot: basicWatcher,
    position: basicWatcher,
    renderable: basicWatcher,
    rotation: basicWatcher,
    scale: basicWatcher,
    skew: basicWatcher,
    visible: basicWatcher,
    x: basicWatcher,
    y: basicWatcher
  }),

  beforeCreate() {
    if (this.$options.pixiConstructor) {
      this.$pixiStartRendering!(this.$options.pixiConstructor())
    }
  },

  beforeDestroy() {
    if (this.$pixi && this.$pixi.object) {
      this.$parent.$pixiRemoveChild!(this)
    }
  },

  methods: {
    $pixiStartRendering(object: PIXI.DisplayObject) {
      if (this.$pixi && this.$pixi.object) {
        throw "$pixiStartRendering can only be called once"
      }

      this.$pixi = Object.assign({ object: object }, this.$pixi)
      this.$emit("pixiStarted", object)
      this.$off("pixiStarted")

      this.$parent.$pixiAddChild!(this)
    },

    $pixiWithObject(callback: (object: PIXI.DisplayObject) => void) {
      if (this.$pixi && this.$pixi.object) {
        callback(this.$pixi.object)
      } else {
        this.$pixi = this.$pixi || {}
        this.$on("pixiStarted", callback)
      }
    },

    $pixiLoadResource(name: string, callback: LoadCallback) {
      return this.$parent.$pixiLoadResource!(name, callback)
    }
  }
})

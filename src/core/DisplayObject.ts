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
          this.$nextTick(() => (this.$pixi!.object.cacheAsBitmap = value))
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
    this.$pixi = { object: this.$options.pixiConstructor!() }
    this.$parent.$pixiAddChild!(this)
  },

  beforeDestroy() {
    this.$parent.$pixiRemoveChild!(this)
  },

  methods: {
    $pixiLoadResource(name: string, callback: LoadCallback) {
      this.$parent.$pixiLoadResource!(name, callback)
    }
  }
})

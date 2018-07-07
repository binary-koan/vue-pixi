import Container from "./Container"
import { basicWatcher, generateWatchers, resourceWatcher } from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

export default Container.extend({
  pixiConstructor: () => new PIXI.Sprite(),

  props: {
    anchor: { type: PIXI.ObservablePoint },
    atlas: { type: String },
    blendMode: { type: Number },
    pluginName: { type: String },
    shader: { type: [PIXI.Filter, PIXI.Shader] },
    texture: { type: String },
    tint: { type: Number }
  },

  watch: generateWatchers({
    anchor: basicWatcher,
    blendMode: basicWatcher,
    pluginName: basicWatcher,
    shader: basicWatcher,
    texture: {
      generator: resourceWatcher,
      options: {
        loadName(this: Vue, value: string) {
          if (this.$props.atlas) {
            return this.$props.atlas
          } else {
            return value
          }
        },
        onLoad(this: Vue, value: string, resources: any) {
          if (this.$props.atlas) {
            this.$pixi!.object.texture =
              resources[this.$props.atlas].textures[value]
          } else {
            this.$pixi!.object.texture = resources[value].texture
          }
        }
      }
    },
    tint: basicWatcher
  })
})
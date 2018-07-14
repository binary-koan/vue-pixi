import Sprite from "../core/Sprite"
import { basicWatcher, generateWatchers, resourceWatcher } from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

export default Sprite.extend({
  pixiConstructor: () => new PIXI.extras.AnimatedSprite([]),
  props: {
    animationSpeed: { type: Number },
    loop: { type: Boolean },
    onComplete: { type: Function },
    onFrameChange: { type: Function },
    onLoop: { type: Function },
    playing: { type: Boolean },
    textures: { type: Array }
  },
  watch: generateWatchers({
    animationSpeed: basicWatcher,
    loop: basicWatcher,
    onComplete: basicWatcher,
    onFrameChange: basicWatcher,
    textures: {
      generator: resourceWatcher,
      options: {
        loadName(this: Vue, value: string[]) {
          if (this.$props.atlas) {
            return this.$props.atlas
          } else {
            throw "Animated sprites must take their textures from a single atlas"
          }
        },
        onLoad(this: Vue, value: string[], resources: any) {
          this.$pixi!.object.textures = value.map(
            texture => resources[this.$props.atlas].textures[texture]
          )
        }
      }
    }
  })
})

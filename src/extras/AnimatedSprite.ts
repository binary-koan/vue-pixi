import Sprite from "../core/Sprite"
import {
  basicWatcher,
  generateWatchers,
  resourceWatcher,
  customWatcher
} from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

/**
 * @example
 * <template>
 *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
 *     <pixi-extras-animated-sprite
 *       atlas="assets/sprites.json"
 *       :textures="gabeRun"
 *       :x="100"
 *       :y="100"
 *       :width="48"
 *       :height="48"
 *       :playing="true"
 *       :animation-speed="0.1"
 *     ></pixi-extras-animated-sprite>
 *     <pixi-extras-animated-sprite
 *       atlas="assets/sprites.json"
 *       :textures="maniRun"
 *       :x="150"
 *       :y="150"
 *       :width="48"
 *       :height="48"
 *       :playing="true"
 *       :animation-speed="0.1"
 *     ></pixi-extras-animated-sprite>
 *   </pixi-application>
 * </template>
 *
 * <script>
 * export default {
 *   data() {
 *     return {
 *       gabeRun: [2, 3, 4, 5, 6, 7].map(n => `gabe-idle-run_0${n}.png`),
 *       maniRun: [2, 3, 4, 5, 6, 7].map(n => `mani-idle-run_0${n}.png`)
 *     }
 *   }
 * }
 * </script>
 */
export default Sprite.extend({
  pixiConstructor: null,

  props: {
    animationSpeed: { type: Number },
    /**
     * Path to an atlas (JSON file) which contains the textures for the sprite. Unlike plain Pixi,
     * this must be specified and must contain all the textures in the animation
     */
    atlas: { type: String, required: true },
    loop: { type: Boolean },
    onComplete: { type: Function },
    onFrameChange: { type: Function },
    onLoop: { type: Function },
    playing: { type: Boolean },
    textures: { type: Array, required: true }
  },

  watch: generateWatchers({
    animationSpeed: basicWatcher,
    loop: basicWatcher,
    onComplete: basicWatcher,
    onFrameChange: basicWatcher,
    playing: {
      generator: customWatcher,
      options: {
        handler(object: PIXI.DisplayObject, value: Boolean) {
          if (value) {
            ;(object as PIXI.extras.AnimatedSprite).play()
          } else {
            ;(object as PIXI.extras.AnimatedSprite).stop()
          }
        }
      }
    },
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
          const textures = value.map(
            texture => resources[this.$props.atlas].textures[texture]
          )

          if (this.$pixi && this.$pixi.object) {
            this.$pixi.object.textures = textures
          } else {
            this.$pixiStartRendering!(new PIXI.extras.AnimatedSprite(textures))
          }
        }
      }
    }
  })
})

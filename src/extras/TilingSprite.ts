import Sprite from "../core/Sprite"
import { basicWatcher, generateWatchers, resourceWatcher } from "../watchers"
import * as PIXI from "pixi.js"
import Vue, { VueConstructor } from "vue"

/**
 * @example
 * <template>
 *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
 *     <pixi-extras-tiling-sprite
 *       texture="assets/tile.png"
 *       :x="0"
 *       :y="0"
 *       :width="300"
 *       :height="300"
 *     ></pixi-extras-tiling-sprite>
 *   </pixi-application>
 * </template>
 *
 * <script>
 * export default {}
 * </script>
 */
export default Sprite.extend({
  pixiType: PIXI.extras.TilingSprite,

  props: {
    clampMargin: { type: Number },
    tilePosition: { type: PIXI.ObservablePoint },
    tileScale: { type: PIXI.ObservablePoint },
    tileTransform: { type: PIXI.TransformStatic },
    uvRespectAnchor: { type: Boolean },
    uvTransform: { type: PIXI.TextureMatrix }
  },

  watch: generateWatchers({
    clampMargin: basicWatcher,
    tilePosition: basicWatcher,
    tileScale: basicWatcher,
    tileTransform: basicWatcher,
    uvRespectAnchor: basicWatcher,
    uvTransform: basicWatcher,

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
          const texture = this.$props.atlas
            ? resources[this.$props.atlas].textures[value]
            : resources[value].texture

          if (this.$pixi && this.$pixi.object) {
            this.$pixi.object.texture = texture
          } else {
            this.$pixiStartRendering!(new PIXI.extras.TilingSprite(texture))
          }
        }
      }
    }
  })
})

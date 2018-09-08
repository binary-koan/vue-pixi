import Container from "./Container";
import { basicWatcher, generateWatchers, resourceWatcher } from "../watchers";
import * as PIXI from "pixi.js";
/**
 * @example <caption>Displaying a single image as a sprite</caption>
 * <template>
 *   <pixi-application :width="300" :height="300">
 *     <pixi-sprite texture="assets/sample.png" :width="300" :height="300"></pixi-sprite>
 *   </pixi-application>
 * </template>
 *
 * <script>
 * export default {}
 * </script>
 *
 * @example <caption>Loading multiple sprites from the same file with a texture atlas</caption>
 * <template>
 *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
 *     <pixi-sprite atlas="assets/sprites.json" texture="gabe-idle-run_01.png" :x="100" :y="100" :width="48" :height="48"></pixi-sprite>
 *     <pixi-sprite atlas="assets/sprites.json" texture="mani-idle-run_01.png" :x="150" :y="150" :width="48" :height="48"></pixi-sprite>
 *   </pixi-application>
 * </template>
 *
 * <script>
 * export default {}
 * </script>
 */
export default Container.extend({
    pixiConstructor: null,
    props: {
        anchor: { type: PIXI.ObservablePoint },
        /** Path to an atlas (JSON file) which contains the sprite's texture */
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
                loadName: function (value) {
                    if (this.$props.atlas) {
                        return this.$props.atlas;
                    }
                    else {
                        return value;
                    }
                },
                onLoad: function (value, resources) {
                    var texture = this.$props.atlas
                        ? resources[this.$props.atlas].textures[value]
                        : resources[value].texture;
                    if (this.$pixi && this.$pixi.object) {
                        this.$pixi.object.texture = texture;
                    }
                    else {
                        this.$pixiStartRendering(new PIXI.Sprite(texture));
                    }
                }
            }
        },
        tint: basicWatcher
    })
});

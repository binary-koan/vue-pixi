import * as PIXI from "pixi.js";
import Vue, { VueConstructor } from "vue";
declare const _default: VueConstructor<{
    anchor: PIXI.ObservablePoint;
    atlas: string;
    blendMode: number;
    pluginName: string;
    shader: PIXI.Shader | PIXI.Filter<Object>;
    texture: string;
    tint: number;
} & {
    width: number;
    height: number;
} & {
    $pixiStartRendering(object: PIXI.DisplayObject): void;
    $pixiWithObject(callback: (object: PIXI.DisplayObject) => void): void;
    $pixiLoadResource(name: string, callback: import("../resourceLoader").LoadCallback): void;
} & {
    alpha: number;
    buttonMode: boolean;
    cacheAsBitmap: boolean;
    cursor: string;
    filterArea: PIXI.Rectangle;
    filters: {}[];
    hitArea: PIXI.Rectangle | PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | PIXI.RoundedRectangle;
    interactive: boolean;
    mask: PIXI.Graphics | PIXI.Sprite;
    name: string;
    pivot: PIXI.Point | PIXI.ObservablePoint;
    position: PIXI.Point | PIXI.ObservablePoint;
    renderable: boolean;
    rotation: number;
    scale: PIXI.Point | PIXI.ObservablePoint;
    skew: PIXI.ObservablePoint;
    transform: PIXI.TransformBase;
    visible: boolean;
    x: number;
    y: number;
} & Vue>;
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
export default _default;

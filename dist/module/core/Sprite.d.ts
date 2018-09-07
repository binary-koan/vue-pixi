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
export default _default;

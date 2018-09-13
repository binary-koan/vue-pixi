import * as PIXI from "pixi.js";
import Vue, { VueConstructor } from "vue";
declare const _default: VueConstructor<{
    clampMargin: number;
    tilePosition: PIXI.ObservablePoint;
    tileScale: PIXI.ObservablePoint;
    tileTransform: PIXI.TransformStatic;
    uvRespectAnchor: boolean;
    uvTransform: PIXI.TextureMatrix;
} & {
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
export default _default;

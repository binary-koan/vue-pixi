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
/** Test comment on export */
export default _default;

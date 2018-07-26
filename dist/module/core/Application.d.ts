import Vue, { VueConstructor } from "vue";
declare const _default: VueConstructor<{
    autoStart: boolean;
    width: number;
    height: number;
    transparent: boolean;
    antialias: boolean;
    resolution: number;
    forceCanvas: boolean;
    backgroundColor: number;
    clearBeforeRender: boolean;
    roundPixels: boolean;
    forceFXAA: boolean;
    legacy: boolean;
    powerPreference: string;
    sharedTicker: boolean;
    sharedLoader: boolean;
} & Vue>;
/**
 * The root component for a Pixi scene
 *
 * @example
 * <template>
 *   <pixi-application width="400" height="300">
 *     <pixi-sprite></pixi-sprite>
 *   </pixi-application>
 * </template>
 *
 * <script>
 * export default {}
 * </script>
 */
export default _default;

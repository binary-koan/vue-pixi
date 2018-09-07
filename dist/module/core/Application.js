import ResourceLoader from "../resourceLoader";
import * as PIXI from "pixi.js";
import Vue from "vue";
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
export default Vue.extend({
    props: {
        autoStart: { type: Boolean, default: true },
        width: { type: Number },
        height: { type: Number },
        transparent: { type: Boolean },
        antialias: { type: Boolean },
        resolution: { type: Number },
        forceCanvas: { type: Boolean },
        backgroundColor: { type: Number },
        clearBeforeRender: { type: Boolean, default: true },
        roundPixels: { type: Boolean },
        forceFXAA: { type: Boolean },
        legacy: { type: Boolean },
        powerPreference: { type: String },
        sharedTicker: { type: Boolean },
        sharedLoader: { type: Boolean }
    },
    beforeCreate: function () {
        this.$pixiRoot = {
            loader: new ResourceLoader(),
            root: new PIXI.Container(),
            app: undefined
        };
    },
    mounted: function () {
        var app = new PIXI.Application(Object.assign({ view: this.$el }, this.$props));
        app.stage.addChild(this.$pixiRoot.root);
        this.$pixiRoot.app = app;
    },
    beforeDestroy: function () {
        this.$pixiRoot.loader.destroy();
        var app = this.$pixiRoot.app;
        if (app)
            app.destroy();
    },
    render: function (h) {
        return h("canvas", { attrs: { width: this.width, height: this.height } }, this.$slots.default);
    },
    methods: {
        $pixiLoadResource: function (name, callback) {
            this.$pixiRoot.loader.load(name, callback);
        },
        $pixiAddChild: function (child) {
            var index = this.$slots.default.indexOf(child.$vnode);
            this.$pixiRoot.root.addChildAt(child.$pixi.object, index);
        },
        $pixiRemoveChild: function (child) {
            this.$pixiRoot.root.removeChild(child.$pixi.object);
        }
    }
});

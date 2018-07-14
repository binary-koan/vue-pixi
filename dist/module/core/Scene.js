import ResourceLoader from "../resourceLoader";
import * as PIXI from "pixi.js";
import Vue from "vue";
export default Vue.extend({
    beforeCreate: function () {
        this.$pixiRoot = {
            loader: new ResourceLoader(),
            root: new PIXI.Container(),
            app: undefined
        };
    },
    mounted: function () {
        var app = new PIXI.Application({ view: this.$el });
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
        return h("canvas", this.$slots.default);
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

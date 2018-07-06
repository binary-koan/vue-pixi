"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resourceLoader_1 = require("./resourceLoader");
var PIXI = require("pixi.js");
var vue_1 = require("vue");
exports.default = vue_1.default.extend({
    name: "pixi-scene",
    beforeCreate: function () {
        this.$pixiRoot = {
            loader: new resourceLoader_1.default(),
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

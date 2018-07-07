"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var watchers_1 = require("../watchers");
var vue_1 = require("vue");
/** @namespace */
var WATCHERS = {
    alpha: watchers_1.basicWatcher("alpha"),
    buttonMode: watchers_1.basicWatcher("buttonMode"),
    cacheAsBitmap: watchers_1.resourceWatcher("cacheAsBitmap", {
        loadName: function (value) {
            return undefined;
        },
        onLoad: function (value, resources) {
            var _this = this;
            // Wait for other resources, e.g. textures, to be applied
            this.$nextTick(function () { return (_this.$pixi.object.cacheAsBitmap = value); });
        }
    }),
    cursor: watchers_1.basicWatcher("cursor"),
    filterArea: watchers_1.basicWatcher("filterArea"),
    filters: watchers_1.basicWatcher("filters"),
    hitArea: watchers_1.basicWatcher("hitArea"),
    interactive: watchers_1.eventWatcher("interactive"),
    mask: watchers_1.basicWatcher("mask"),
    name: watchers_1.basicWatcher("name"),
    pivot: watchers_1.basicWatcher("pivot"),
    position: watchers_1.basicWatcher("position"),
    renderable: watchers_1.basicWatcher("renderable"),
    rotation: watchers_1.basicWatcher("rotation"),
    scale: watchers_1.basicWatcher("scale"),
    skew: watchers_1.basicWatcher("skew"),
    visible: watchers_1.basicWatcher("visible"),
    x: watchers_1.basicWatcher("x"),
    y: watchers_1.basicWatcher("y")
};
exports.default = vue_1.default.extend({
    props: Object.keys(WATCHERS),
    beforeCreate: function () {
        this.$pixi = { object: this.$options.pixiConstructor() };
        this.$parent.$pixiAddChild(this);
    },
    beforeDestroy: function () {
        this.$parent.$pixiRemoveChild(this);
    },
    watch: WATCHERS,
    methods: {
        $pixiLoadResource: function (name, callback) {
            this.$parent.$pixiLoadResource(name, callback);
        }
    }
});

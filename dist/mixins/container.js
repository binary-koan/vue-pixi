"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var displayObject_1 = require("./displayObject");
var watchers_1 = require("../watchers");
var vue_1 = require("vue");
var CONTAINER_WATCHERS = {
    width: watchers_1.basicWatcher("width"),
    height: watchers_1.basicWatcher("height")
};
exports.default = vue_1.default.extend({
    mixins: [displayObject_1.default],
    props: Object.keys(CONTAINER_WATCHERS),
    watch: CONTAINER_WATCHERS,
    render: function (h) {
        return h("div", this.$slots.default);
    },
    methods: {
        $pixiAddChild: function (child) {
            var index = this.$slots.default.indexOf(child.$vnode);
            this.$pixi.object.addChildAt(child.$pixi.object, index);
        },
        $pixiRemoveChild: function (child) {
            this.$pixi.object.removeChild(child.$pixi.object);
        }
    }
});

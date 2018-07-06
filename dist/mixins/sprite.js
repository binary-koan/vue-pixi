"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
var watchers_1 = require("../watchers");
var vue_1 = require("vue");
var WATCHERS = {
    anchor: watchers_1.basicWatcher("anchor"),
    blendMode: watchers_1.basicWatcher("blendMode"),
    height: watchers_1.basicWatcher("height"),
    pluginName: watchers_1.basicWatcher("pluginName"),
    shader: watchers_1.basicWatcher("shader"),
    texture: watchers_1.resourceWatcher("texture", {
        loadName: function (value) {
            if (this.$props.atlas) {
                return this.$props.atlas;
            }
            else {
                return value;
            }
        },
        onLoad: function (value, resources) {
            if (this.$props.atlas) {
                this.$pixi.object.texture =
                    resources[this.$props.atlas].textures[value];
            }
            else {
                this.$pixi.object.texture = resources[value].texture;
            }
        }
    }),
    tint: watchers_1.basicWatcher("tint"),
    width: watchers_1.basicWatcher("width")
};
exports.default = vue_1.default.extend({
    mixins: [container_1.default],
    props: Object.keys(WATCHERS).concat(["atlas"]),
    watch: WATCHERS
});

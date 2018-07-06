"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = require("../sprite");
var watchers_1 = require("../../watchers");
var vue_1 = require("vue");
var WATCHERS = {
    animationSpeed: watchers_1.basicWatcher("animationSpeed"),
    currentFrame: watchers_1.basicWatcher("currentFrame"),
    loop: watchers_1.basicWatcher("loop"),
    onComplete: watchers_1.basicWatcher("onComplete"),
    onFrameChange: watchers_1.basicWatcher("onFrameChange"),
    textures: watchers_1.resourceWatcher("textures", {
        loadName: function (value) {
            if (this.$props.atlas) {
                return this.$props.atlas;
            }
            else {
                throw "Animated sprites must take their textures from a single atlas";
            }
        },
        onLoad: function (value, resources) {
            var _this = this;
            this.$pixi.object.textures = value.map(function (texture) { return resources[_this.$props.atlas].textures[texture]; });
        }
    })
};
exports.default = vue_1.default.extend({
    mixins: [sprite_1.default],
    props: Object.keys(WATCHERS),
    watch: WATCHERS
});

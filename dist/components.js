"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var container_1 = require("./mixins/container");
var sprite_1 = require("./mixins/sprite");
var vue_1 = require("vue");
var animatedSprite_1 = require("./mixins/extras/animatedSprite");
exports.PixiContainer = vue_1.default.extend({
    mixins: [container_1.default]
});
exports.PixiSprite = vue_1.default.extend({
    mixins: [sprite_1.default],
    pixiConstructor: function () { return new PIXI.Sprite(); }
});
exports.PixiAnimatedSprite = vue_1.default.extend({
    mixins: [animatedSprite_1.default],
    pixiConstructor: function () { return new PIXI.extras.AnimatedSprite([]); }
});

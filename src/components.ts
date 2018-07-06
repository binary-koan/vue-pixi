import * as PIXI from "pixi.js";
import container from "./mixins/container";
import sprite from "./mixins/sprite";
import Vue, { VueConstructor } from "vue";
import animatedSprite from "./mixins/extras/animatedSprite";

export const PixiContainer = Vue.extend({
  mixins: [container]
});

export const PixiSprite = Vue.extend({
  mixins: [sprite],
  pixiConstructor: () => new PIXI.Sprite()
});

export const PixiAnimatedSprite = Vue.extend({
  mixins: [animatedSprite],
  pixiConstructor: () => new PIXI.extras.AnimatedSprite([])
});

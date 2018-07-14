import Sprite from "../core/Sprite";
import { basicWatcher, generateWatchers, resourceWatcher } from "../watchers";
import * as PIXI from "pixi.js";
export default Sprite.extend({
    pixiConstructor: function () { return new PIXI.extras.AnimatedSprite([]); },
    props: {
        animationSpeed: { type: Number },
        loop: { type: Boolean },
        onComplete: { type: Function },
        onFrameChange: { type: Function },
        onLoop: { type: Function },
        playing: { type: Boolean },
        textures: { type: Array }
    },
    watch: generateWatchers({
        animationSpeed: basicWatcher,
        loop: basicWatcher,
        onComplete: basicWatcher,
        onFrameChange: basicWatcher,
        textures: {
            generator: resourceWatcher,
            options: {
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
            }
        }
    })
});

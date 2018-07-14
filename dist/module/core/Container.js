import DisplayObject from "./DisplayObject";
import { basicWatcher, generateWatchers } from "../watchers";
import * as PIXI from "pixi.js";
export default DisplayObject.extend({
    pixiConstructor: function () { return new PIXI.Container(); },
    props: {
        width: { type: Number },
        height: { type: Number }
    },
    watch: generateWatchers({
        width: basicWatcher,
        height: basicWatcher
    }),
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

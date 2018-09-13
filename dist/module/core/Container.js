import DisplayObject from "./DisplayObject";
import { basicWatcher, generateWatchers } from "../watchers";
import * as PIXI from "pixi.js";
export default DisplayObject.extend({
    pixiType: PIXI.Container,
    pixiCreateImmediately: true,
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
            var index = this.$slots.default
                .filter(function (vnode) { return !vnode.text; }) // Vue inserts text vnodes as spaces between components
                .indexOf(child.$vnode);
            var maxValidIndex = this.$pixi.object.children.length + 1;
            this.$pixi.object.addChildAt(child.$pixi.object, Math.min(index, maxValidIndex));
        },
        $pixiRemoveChild: function (child) {
            this.$pixi.object.removeChild(child.$pixi.object);
        }
    }
});

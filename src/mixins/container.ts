import displayObject from "./displayObject";
import { basicWatcher } from "../watchers";
import Vue, { VueConstructor } from "vue";

const CONTAINER_WATCHERS = {
  width: basicWatcher("width"),
  height: basicWatcher("height")
};

export default Vue.extend({
  mixins: [displayObject],

  props: Object.keys(CONTAINER_WATCHERS),

  watch: CONTAINER_WATCHERS,

  render(h) {
    return h("div", this.$slots.default);
  },

  methods: {
    $pixiAddChild(child: Vue) {
      const index = this.$slots.default.indexOf(child.$vnode);
      this.$pixi!.object.addChildAt(child.$pixi!.object, index);
    },

    $pixiRemoveChild(child: Vue) {
      this.$pixi!.object.removeChild(child.$pixi!.object);
    }
  }
});

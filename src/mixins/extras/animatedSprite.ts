import sprite from "../sprite";
import { basicWatcher, resourceWatcher } from "../../watchers";
import Vue, { VueConstructor } from "vue";

const WATCHERS = {
  animationSpeed: basicWatcher("animationSpeed"),
  currentFrame: basicWatcher("currentFrame"),
  loop: basicWatcher("loop"),
  onComplete: basicWatcher("onComplete"),
  onFrameChange: basicWatcher("onFrameChange"),
  textures: resourceWatcher("textures", {
    loadName(this: Vue, value: string[]) {
      if (this.$props.atlas) {
        return this.$props.atlas;
      } else {
        throw "Animated sprites must take their textures from a single atlas";
      }
    },
    onLoad(this: Vue, value: string[], resources) {
      this.$pixi!.object.textures = value.map(
        texture => resources[this.$props.atlas].textures[texture]
      );
    }
  })
};

export default Vue.extend({
  mixins: [sprite],
  props: Object.keys(WATCHERS),
  watch: WATCHERS
});

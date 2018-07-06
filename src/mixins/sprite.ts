import container from "./container";
import { basicWatcher, resourceWatcher } from "../watchers";
import Vue, { VueConstructor } from "vue";

const WATCHERS = {
  anchor: basicWatcher("anchor"),
  blendMode: basicWatcher("blendMode"),
  height: basicWatcher("height"),
  pluginName: basicWatcher("pluginName"),
  shader: basicWatcher("shader"),
  texture: resourceWatcher("texture", {
    loadName(this: Vue, value: string) {
      if (this.$props.atlas) {
        return this.$props.atlas;
      } else {
        return value;
      }
    },
    onLoad(this: Vue, value: string, resources) {
      if (this.$props.atlas) {
        this.$pixi!.object.texture =
          resources[this.$props.atlas].textures[value];
      } else {
        this.$pixi!.object.texture = resources[value].texture;
      }
    }
  }),
  tint: basicWatcher("tint"),
  width: basicWatcher("width")
};

export default Vue.extend({
  mixins: [container],
  props: Object.keys(WATCHERS).concat(["atlas"]),
  watch: WATCHERS
});

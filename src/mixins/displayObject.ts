import { basicWatcher, resourceWatcher, eventWatcher } from "../watchers";
import Vue, { VueConstructor } from "vue";
import { LoadCallback } from "../resourceLoader";

const WATCHERS = {
  alpha: basicWatcher("alpha"),
  buttonMode: basicWatcher("buttonMode"),
  cacheAsBitmap: resourceWatcher("cacheAsBitmap", {
    loadName(value: boolean) {
      return undefined;
    },
    onLoad(this: Vue, value: boolean, resources) {
      // Wait for other resources, e.g. textures, to be applied
      this.$nextTick(() => (this.$pixi!.object.cacheAsBitmap = value));
    }
  }),
  cursor: basicWatcher("cursor"),
  filterArea: basicWatcher("filterArea"),
  filters: basicWatcher("filters"),
  hitArea: basicWatcher("hitArea"),
  interactive: eventWatcher("interactive"),
  mask: basicWatcher("mask"),
  name: basicWatcher("name"),
  pivot: basicWatcher("pivot"),
  position: basicWatcher("position"),
  renderable: basicWatcher("renderable"),
  rotation: basicWatcher("rotation"),
  scale: basicWatcher("scale"),
  skew: basicWatcher("skew"),
  visible: basicWatcher("visible"),
  x: basicWatcher("x"),
  y: basicWatcher("y")
};

export default Vue.extend({
  props: Object.keys(WATCHERS),

  beforeCreate() {
    this.$pixi = { object: this.$options.pixiConstructor!() };
    this.$parent.$pixiAddChild!(this);
  },

  beforeDestroy() {
    this.$parent.$pixiRemoveChild!(this);
  },

  watch: WATCHERS,

  methods: {
    $pixiLoadResource(name: string, callback: LoadCallback) {
      this.$parent.$pixiLoadResource!(name, callback);
    }
  }
});

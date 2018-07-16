export default {
  input: "./dist/module/index.js",
  output: {
    exports: "named",
    name: "VuePixi",
    globals: {
      vue: "Vue",
      "pixi.js": "PIXI"
    }
  },
  external: ["vue", "pixi.js"]
}

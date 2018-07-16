export default {
  input: "./dist/module/index.js",
  output: {
    exports: "named"
  },
  external: ["vue", "pixi.js"]
}

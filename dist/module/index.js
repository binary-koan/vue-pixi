import "./typeHelpers";
import * as extras from "./extras";
import * as core from "./core";
export * from "./core";
export { extras };
var plugin = {
    install: function (Vue) {
        Object.keys(core).forEach(function (key) {
            Vue.component(kebabCase(key), core[key]);
        });
        Object.keys(extras).forEach(function (key) {
            Vue.component(kebabCase(key).replace("pixi-", "pixi-extras-"), extras[key]);
        });
    }
};
function kebabCase(string) {
    return string.replace(/(.)(A-Z)/, "$1-$2").toLowerCase();
}
export default plugin;

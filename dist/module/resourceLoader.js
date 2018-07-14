import Vue from "vue";
import * as PIXI from "pixi.js";
var ResourceLoader = /** @class */ (function () {
    function ResourceLoader() {
        this.pixiLoader = new PIXI.loaders.Loader();
        this.nextLoadList = new Set();
        this.nextLoadCallbacks = [];
        this.resources = {};
        this.loadScheduled = false;
    }
    ResourceLoader.prototype.load = function (name, callback) {
        if (name) {
            this.nextLoadList.add(name);
        }
        this.nextLoadCallbacks.push(callback);
        this.scheduleLoad();
    };
    ResourceLoader.prototype.destroy = function () {
        this.pixiLoader.reset();
        this.resources = {};
    };
    ResourceLoader.prototype.scheduleLoad = function () {
        var _this = this;
        if (this.loadScheduled) {
            return;
        }
        this.loadScheduled = true;
        if (this.pixiLoader.loading) {
            this.pixiLoader.load(function () { return _this.performLoad(); });
        }
        else {
            Vue.nextTick(function () { return _this.performLoad(); });
        }
    };
    ResourceLoader.prototype.performLoad = function () {
        var _this = this;
        var toLoad = this.nextLoadList;
        var callbacks = this.nextLoadCallbacks;
        this.pixiLoader.reset();
        toLoad.forEach(function (name) { return _this.pixiLoader.add(name); });
        this.pixiLoader.load(function (_, resources) {
            Object.assign(_this.resources, resources);
            callbacks.forEach(function (callback) { return callback(_this.resources); });
        });
        this.resetForNextLoad();
    };
    ResourceLoader.prototype.resetForNextLoad = function () {
        this.nextLoadList = new Set();
        this.nextLoadCallbacks = [];
    };
    return ResourceLoader;
}());
export default ResourceLoader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ignoreValueChange(context, name) {
    return (!context.$pixi ||
        !context.$vnode.componentOptions.propsData ||
        !context.$vnode.componentOptions.propsData.hasOwnProperty(name));
}
exports.ignoreValueChange = ignoreValueChange;
function basicWatcher(name) {
    return {
        immediate: true,
        handler: function (value) {
            if (ignoreValueChange(this, name))
                return;
            this.$pixi.object[name] = value;
        }
    };
}
exports.basicWatcher = basicWatcher;
function resourceWatcher(name, _a) {
    var loadName = _a.loadName, onLoad = _a.onLoad;
    loadName =
        loadName ||
            function (value) {
                return value;
            };
    onLoad =
        onLoad ||
            function (value, resources) {
                this.$pixi.object[name] = resources[value];
            };
    return {
        immediate: true,
        handler: function (value) {
            var _this = this;
            if (ignoreValueChange(this, name)) {
                return;
            }
            this.$pixiLoadResource(loadName.call(this, value), function (resources) {
                onLoad.call(_this, value, resources);
            });
        }
    };
}
exports.resourceWatcher = resourceWatcher;
var BASIC_EVENTS = [
    "added",
    "click",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "mouseupoutside",
    "pointercancel",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointertap",
    "pointerup",
    "pointerupoutside",
    "removed",
    "rightclick",
    "rightdown",
    "rightup",
    "rightupoutside",
    "tap",
    "touchcancel",
    "touchend",
    "touchendoutside",
    "touchmove",
    "touchstart"
];
function eventWatcher(name) {
    return {
        immediate: true,
        handler: function (value) {
            var _this = this;
            if (ignoreValueChange(this, name))
                return;
            var pixi = this.$pixi;
            pixi.object[name] = value;
            if (value) {
                pixi.eventHandlers = {};
                BASIC_EVENTS.forEach(function (event) {
                    pixi.eventHandlers[event] = _this.$emit.bind(_this, event);
                    pixi.object.on(event, pixi.eventHandlers[event]);
                });
            }
            else if (pixi.eventHandlers) {
                BASIC_EVENTS.forEach(function (event) {
                    pixi.object.off(event, pixi.eventHandlers[event]);
                });
                pixi.eventHandlers = undefined;
            }
        }
    };
}
exports.eventWatcher = eventWatcher;

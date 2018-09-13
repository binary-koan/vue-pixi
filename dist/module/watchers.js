export function generateWatchers(props) {
    var watchers = {};
    Object.keys(props).forEach(function (key) {
        var generator = props[key];
        if (typeof generator === "function") {
            watchers[key] = generator(key);
        }
        else {
            watchers[key] = generator.generator(key, generator.options);
        }
    });
    return watchers;
}
export function propValueSpecified(context, name) {
    return (context.$vnode.componentOptions.propsData &&
        context.$vnode.componentOptions.propsData.hasOwnProperty(name));
}
export function basicWatcher(name) {
    return {
        immediate: true,
        handler: function (value) {
            if (!propValueSpecified(this, name))
                return;
            this.$pixiWithObject(function (object) { return (object[name] = value); });
        }
    };
}
export function customWatcher(name, _a) {
    var handler = _a.handler;
    return {
        immediate: true,
        handler: function (value, oldValue) {
            var _this = this;
            if (!propValueSpecified(this, name))
                return;
            this.$pixiWithObject(function (object) {
                return handler.call(_this, object, value, oldValue);
            });
        }
    };
}
export function resourceWatcher(name, _a) {
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
            if (!propValueSpecified(this, name))
                return;
            this.$pixiLoadResource(loadName.call(this, value), function (resources) {
                onLoad.call(_this, value, resources);
            });
        }
    };
}
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
export function eventWatcher(name) {
    return {
        immediate: true,
        handler: function (value) {
            var _this = this;
            if (!propValueSpecified(this, name))
                return;
            this.$pixiWithObject(function (object) {
                var pixi = _this.$pixi;
                object[name] = value;
                if (value) {
                    pixi.eventHandlers = {};
                    BASIC_EVENTS.forEach(function (event) {
                        pixi.eventHandlers[event] = _this.$emit.bind(_this, event);
                        object.on(event, pixi.eventHandlers[event]);
                    });
                }
                else if (pixi.eventHandlers) {
                    BASIC_EVENTS.forEach(function (event) {
                        object.off(event, pixi.eventHandlers[event]);
                    });
                    pixi.eventHandlers = undefined;
                }
            });
        }
    };
}

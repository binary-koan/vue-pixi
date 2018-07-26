(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('pixi.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'pixi.js'], factory) :
    (factory((global.VuePixi = {}),global.Vue,global.PIXI));
}(this, (function (exports,Vue,PIXI) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    function generateWatchers(props) {
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
    function ignoreValueChange(context, name) {
        return (!context.$pixi ||
            !context.$vnode.componentOptions.propsData ||
            !context.$vnode.componentOptions.propsData.hasOwnProperty(name));
    }
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

    var DisplayObject = Vue.extend({
        props: {
            alpha: { type: Number },
            buttonMode: { type: Boolean },
            cacheAsBitmap: { type: Boolean },
            cursor: { type: String },
            filterArea: { type: PIXI.Rectangle },
            filters: { type: Array },
            hitArea: {
                type: [
                    PIXI.Rectangle,
                    PIXI.Circle,
                    PIXI.Ellipse,
                    PIXI.Polygon,
                    PIXI.RoundedRectangle
                ]
            },
            interactive: { type: Boolean },
            mask: { type: [PIXI.Graphics, PIXI.Sprite] },
            name: { type: String },
            pivot: { type: [PIXI.Point, PIXI.ObservablePoint] },
            position: { type: [PIXI.Point, PIXI.ObservablePoint] },
            renderable: { type: Boolean },
            rotation: { type: Number },
            scale: { type: [PIXI.Point, PIXI.ObservablePoint] },
            skew: { type: PIXI.ObservablePoint },
            transform: { type: PIXI.TransformBase },
            visible: { type: Boolean },
            x: { type: Number },
            y: { type: Number }
        },
        watch: generateWatchers({
            alpha: basicWatcher,
            buttonMode: basicWatcher,
            cacheAsBitmap: {
                // Because cacheAsBitmap should cache the object in its current state with
                // textures applied, it needs to be set after the textures have been loaded
                generator: resourceWatcher,
                options: {
                    loadName: function (value) {
                        return undefined;
                    },
                    onLoad: function (value) {
                        var _this = this;
                        // Wait for other resources, e.g. textures, to be applied
                        this.$nextTick(function () { return (_this.$pixi.object.cacheAsBitmap = value); });
                    }
                }
            },
            cursor: basicWatcher,
            filterArea: basicWatcher,
            filters: basicWatcher,
            hitArea: basicWatcher,
            interactive: eventWatcher,
            mask: basicWatcher,
            name: basicWatcher,
            pivot: basicWatcher,
            position: basicWatcher,
            renderable: basicWatcher,
            rotation: basicWatcher,
            scale: basicWatcher,
            skew: basicWatcher,
            visible: basicWatcher,
            x: basicWatcher,
            y: basicWatcher
        }),
        beforeCreate: function () {
            this.$pixi = { object: this.$options.pixiConstructor() };
            this.$parent.$pixiAddChild(this);
        },
        beforeDestroy: function () {
            this.$parent.$pixiRemoveChild(this);
        },
        methods: {
            $pixiLoadResource: function (name, callback) {
                this.$parent.$pixiLoadResource(name, callback);
            }
        }
    });

    var Container = DisplayObject.extend({
        pixiConstructor: function () { return new PIXI.Container(); },
        props: {
            width: { type: Number },
            height: { type: Number }
        },
        watch: generateWatchers({
            width: basicWatcher,
            height: basicWatcher
        }),
        render: function (h) {
            return h("div", this.$slots.default);
        },
        methods: {
            $pixiAddChild: function (child) {
                var index = this.$slots.default.indexOf(child.$vnode);
                this.$pixi.object.addChildAt(child.$pixi.object, index);
            },
            $pixiRemoveChild: function (child) {
                this.$pixi.object.removeChild(child.$pixi.object);
            }
        }
    });

    /** Test comment on export */
    var Sprite = Container.extend({
        pixiConstructor: function () { return new PIXI.Sprite(); },
        props: {
            anchor: { type: PIXI.ObservablePoint },
            /** Test comment on prop */
            atlas: { type: String },
            blendMode: { type: Number },
            pluginName: { type: String },
            shader: { type: [PIXI.Filter, PIXI.Shader] },
            texture: { type: String },
            tint: { type: Number }
        },
        watch: generateWatchers({
            anchor: basicWatcher,
            blendMode: basicWatcher,
            pluginName: basicWatcher,
            shader: basicWatcher,
            texture: {
                generator: resourceWatcher,
                options: {
                    loadName: function (value) {
                        if (this.$props.atlas) {
                            return this.$props.atlas;
                        }
                        else {
                            return value;
                        }
                    },
                    onLoad: function (value, resources) {
                        if (this.$props.atlas) {
                            this.$pixi.object.texture =
                                resources[this.$props.atlas].textures[value];
                        }
                        else {
                            this.$pixi.object.texture = resources[value].texture;
                        }
                    }
                }
            },
            tint: basicWatcher
        })
    });

    var AnimatedSprite = Sprite.extend({
        pixiConstructor: function () { return new PIXI.extras.AnimatedSprite([]); },
        props: {
            animationSpeed: { type: Number },
            loop: { type: Boolean },
            onComplete: { type: Function },
            onFrameChange: { type: Function },
            onLoop: { type: Function },
            playing: { type: Boolean },
            textures: { type: Array }
        },
        watch: generateWatchers({
            animationSpeed: basicWatcher,
            loop: basicWatcher,
            onComplete: basicWatcher,
            onFrameChange: basicWatcher,
            textures: {
                generator: resourceWatcher,
                options: {
                    loadName: function (value) {
                        if (this.$props.atlas) {
                            return this.$props.atlas;
                        }
                        else {
                            throw "Animated sprites must take their textures from a single atlas";
                        }
                    },
                    onLoad: function (value, resources) {
                        var _this = this;
                        this.$pixi.object.textures = value.map(function (texture) { return resources[_this.$props.atlas].textures[texture]; });
                    }
                }
            }
        })
    });



    var extras = /*#__PURE__*/Object.freeze({
        PixiAnimatedSprite: AnimatedSprite
    });

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

    /**
     * The root component for a Pixi scene
     *
     * @example
     * <template>
     *   <pixi-application width="400" height="300">
     *     <pixi-sprite></pixi-sprite>
     *   </pixi-application>
     * </template>
     *
     * <script>
     * export default {}
     * </script>
     */
    var Application = Vue.extend({
        props: {
            autoStart: { type: Boolean },
            width: { type: Number },
            height: { type: Number },
            transparent: { type: Boolean },
            antialias: { type: Boolean },
            resolution: { type: Number },
            forceCanvas: { type: Boolean },
            backgroundColor: { type: Number },
            clearBeforeRender: { type: Boolean },
            roundPixels: { type: Boolean },
            forceFXAA: { type: Boolean },
            legacy: { type: Boolean },
            powerPreference: { type: String },
            sharedTicker: { type: Boolean },
            sharedLoader: { type: Boolean }
        },
        beforeCreate: function () {
            this.$pixiRoot = {
                loader: new ResourceLoader(),
                root: new PIXI.Container(),
                app: undefined
            };
        },
        mounted: function () {
            var app = new PIXI.Application(Object.assign({ view: this.$el }, this.$props));
            app.stage.addChild(this.$pixiRoot.root);
            this.$pixiRoot.app = app;
        },
        beforeDestroy: function () {
            this.$pixiRoot.loader.destroy();
            var app = this.$pixiRoot.app;
            if (app)
                app.destroy();
        },
        render: function (h) {
            return h("canvas", { attrs: { width: this.width, height: this.height } }, this.$slots.default);
        },
        methods: {
            $pixiLoadResource: function (name, callback) {
                this.$pixiRoot.loader.load(name, callback);
            },
            $pixiAddChild: function (child) {
                var index = this.$slots.default.indexOf(child.$vnode);
                this.$pixiRoot.root.addChildAt(child.$pixi.object, index);
            },
            $pixiRemoveChild: function (child) {
                this.$pixiRoot.root.removeChild(child.$pixi.object);
            }
        }
    });



    var core = /*#__PURE__*/Object.freeze({
        PixiApplication: Application,
        PixiDisplayObject: DisplayObject,
        PixiContainer: Container,
        PixiSprite: Sprite
    });

    var plugin = {
        install: function (Vue$$1) {
            Object.keys(core).forEach(function (key) {
                Vue$$1.component(kebabCase(key), core[key]);
            });
            Object.keys(extras).forEach(function (key) {
                Vue$$1.component(kebabCase(key).replace("pixi-", "pixi-extras-"), extras[key]);
            });
        }
    };
    function kebabCase(string) {
        return string.replace(/(.)([A-Z])/g, "$1-$2").toLowerCase();
    }

    exports.extras = extras;
    exports.default = plugin;
    exports.PixiApplication = Application;
    exports.PixiDisplayObject = DisplayObject;
    exports.PixiContainer = Container;
    exports.PixiSprite = Sprite;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

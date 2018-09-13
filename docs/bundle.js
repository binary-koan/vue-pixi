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
    function propValueSpecified(context, name) {
        return (context.$vnode.componentOptions.propsData &&
            context.$vnode.componentOptions.propsData.hasOwnProperty(name));
    }
    function basicWatcher(name) {
        return {
            immediate: true,
            handler: function (value) {
                if (!propValueSpecified(this, name))
                    return;
                this.$pixiWithObject(function (object) { return (object[name] = value); });
            }
        };
    }
    function customWatcher(name, _a) {
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
    function eventWatcher(name) {
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

    var DisplayObject = Vue.extend({
        pixiType: PIXI.DisplayObject,
        pixiCreateImmediately: true,
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
            if (this.$options.pixiCreateImmediately) {
                this.$pixiStartRendering(new this.$options.pixiType());
            }
        },
        beforeDestroy: function () {
            if (this.$pixi && this.$pixi.object) {
                this.$parent.$pixiRemoveChild(this);
            }
        },
        methods: {
            $pixiStartRendering: function (object) {
                if (this.$pixi && this.$pixi.object) {
                    throw "$pixiStartRendering can only be called once";
                }
                this.$pixi = Object.assign({ object: object }, this.$pixi);
                this.$emit("pixiStarted", object);
                this.$off("pixiStarted");
                this.$parent.$pixiAddChild(this);
            },
            $pixiWithObject: function (callback) {
                if (this.$pixi && this.$pixi.object) {
                    callback(this.$pixi.object);
                }
                else {
                    this.$pixi = this.$pixi || {};
                    this.$on("pixiStarted", callback);
                }
            },
            $pixiLoadResource: function (name, callback) {
                return this.$parent.$pixiLoadResource(name, callback);
            }
        }
    });

    var Container = DisplayObject.extend({
        pixiType: PIXI.Container,
        pixiCreateImmediately: true,
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
                var index = this.$slots.default
                    .filter(function (vnode) { return !vnode.text; }) // Vue inserts text vnodes as spaces between components
                    .indexOf(child.$vnode);
                var maxValidIndex = this.$pixi.object.children.length + 1;
                this.$pixi.object.addChildAt(child.$pixi.object, Math.min(index, maxValidIndex));
            },
            $pixiRemoveChild: function (child) {
                this.$pixi.object.removeChild(child.$pixi.object);
            }
        }
    });

    /**
     * @example <caption>Displaying a single image as a sprite</caption>
     * <template>
     *   <pixi-application :width="300" :height="300">
     *     <pixi-sprite texture="assets/sample.png" :width="300" :height="300"></pixi-sprite>
     *   </pixi-application>
     * </template>
     *
     * <script>
     * export default {}
     * </script>
     *
     * @example <caption>Loading multiple sprites from the same file with a texture atlas</caption>
     * <template>
     *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
     *     <pixi-sprite atlas="assets/sprites.json" texture="gabe-idle-run_01.png" :x="100" :y="100" :width="48" :height="48"></pixi-sprite>
     *     <pixi-sprite atlas="assets/sprites.json" texture="mani-idle-run_01.png" :x="150" :y="150" :width="48" :height="48"></pixi-sprite>
     *   </pixi-application>
     * </template>
     *
     * <script>
     * export default {}
     * </script>
     */
    var Sprite = Container.extend({
        pixiType: PIXI.Sprite,
        pixiCreateImmediately: false,
        props: {
            anchor: { type: PIXI.ObservablePoint },
            /** Path to an atlas (JSON file) which contains the sprite's texture */
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
                        var texture = this.$props.atlas
                            ? resources[this.$props.atlas].textures[value]
                            : resources[value].texture;
                        if (this.$pixi && this.$pixi.object) {
                            this.$pixi.object.texture = texture;
                        }
                        else {
                            this.$pixiStartRendering(new this.$options.pixiType(texture));
                        }
                    }
                }
            },
            tint: basicWatcher
        })
    });

    /**
     * @example
     * <template>
     *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
     *     <pixi-extras-animated-sprite
     *       atlas="assets/sprites.json"
     *       :textures="gabeRun"
     *       :x="100"
     *       :y="100"
     *       :width="48"
     *       :height="48"
     *       :playing="true"
     *       :animation-speed="0.1"
     *     ></pixi-extras-animated-sprite>
     *     <pixi-extras-animated-sprite
     *       atlas="assets/sprites.json"
     *       :textures="maniRun"
     *       :x="150"
     *       :y="150"
     *       :width="48"
     *       :height="48"
     *       :playing="true"
     *       :animation-speed="0.1"
     *     ></pixi-extras-animated-sprite>
     *   </pixi-application>
     * </template>
     *
     * <script>
     * export default {
     *   data() {
     *     return {
     *       gabeRun: [2, 3, 4, 5, 6, 7].map(n => `gabe-idle-run_0${n}.png`),
     *       maniRun: [2, 3, 4, 5, 6, 7].map(n => `mani-idle-run_0${n}.png`)
     *     }
     *   }
     * }
     * </script>
     */
    var AnimatedSprite = Sprite.extend({
        pixiType: PIXI.extras.AnimatedSprite,
        props: {
            animationSpeed: { type: Number },
            /**
             * Path to an atlas (JSON file) which contains the textures for the sprite. Unlike plain Pixi,
             * this must be specified and must contain all the textures in the animation
             */
            atlas: { type: String, required: true },
            loop: { type: Boolean },
            onComplete: { type: Function },
            onFrameChange: { type: Function },
            onLoop: { type: Function },
            playing: { type: Boolean },
            textures: { type: Array, required: true }
        },
        watch: generateWatchers({
            animationSpeed: basicWatcher,
            loop: basicWatcher,
            onComplete: basicWatcher,
            onFrameChange: basicWatcher,
            playing: {
                generator: customWatcher,
                options: {
                    handler: function (object, value) {
                        if (value) {
                            object.play();
                        }
                        else {
                            object.stop();
                        }
                    }
                }
            },
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
                        var textures = value.map(function (texture) { return resources[_this.$props.atlas].textures[texture]; });
                        if (this.$pixi && this.$pixi.object) {
                            this.$pixi.object.textures = textures;
                        }
                        else {
                            this.$pixiStartRendering(new PIXI.extras.AnimatedSprite(textures));
                        }
                    }
                }
            }
        })
    });

    /**
     * @example
     * <template>
     *   <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
     *     <pixi-extras-tiling-sprite
     *       texture="assets/tile.png"
     *       :x="0"
     *       :y="0"
     *       :width="300"
     *       :height="300"
     *     ></pixi-extras-tiling-sprite>
     *   </pixi-application>
     * </template>
     *
     * <script>
     * export default {}
     * </script>
     */
    var TilingSprite = Sprite.extend({
        pixiType: PIXI.extras.TilingSprite,
        props: {
            clampMargin: { type: Number },
            tilePosition: { type: PIXI.ObservablePoint },
            tileScale: { type: PIXI.ObservablePoint },
            tileTransform: { type: PIXI.TransformStatic },
            uvRespectAnchor: { type: Boolean },
            uvTransform: { type: PIXI.TextureMatrix }
        },
        watch: generateWatchers({
            clampMargin: basicWatcher,
            tilePosition: basicWatcher,
            tileScale: basicWatcher,
            tileTransform: basicWatcher,
            uvRespectAnchor: basicWatcher,
            uvTransform: basicWatcher,
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
                        var texture = this.$props.atlas
                            ? resources[this.$props.atlas].textures[value]
                            : resources[value].texture;
                        if (this.$pixi && this.$pixi.object) {
                            this.$pixi.object.texture = texture;
                        }
                        else {
                            this.$pixiStartRendering(new PIXI.extras.TilingSprite(texture));
                        }
                    }
                }
            }
        })
    });



    var extras = /*#__PURE__*/Object.freeze({
        PixiAnimatedSprite: AnimatedSprite,
        PixiTilingSprite: TilingSprite
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
            autoStart: { type: Boolean, default: true },
            width: { type: Number },
            height: { type: Number },
            transparent: { type: Boolean },
            antialias: { type: Boolean },
            resolution: { type: Number },
            forceCanvas: { type: Boolean },
            backgroundColor: { type: Number },
            clearBeforeRender: { type: Boolean, default: true },
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
                var index = this.$slots.default
                    .filter(function (vnode) { return !vnode.text; }) // Vue inserts text vnodes as spaces between components
                    .indexOf(child.$vnode);
                var maxValidIndex = this.$pixiRoot.root.children.length + 1;
                this.$pixiRoot.root.addChildAt(child.$pixi.object, Math.min(index, maxValidIndex));
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

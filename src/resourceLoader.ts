import Vue from "vue";
import * as PIXI from "pixi.js";

export type LoadCallback = (resources: PIXI.loaders.ResourceDictionary) => void;

export default class ResourceLoader {
  private pixiLoader: PIXI.loaders.Loader;
  private nextLoadList: Set<string>;
  private nextLoadCallbacks: LoadCallback[];
  private resources: PIXI.loaders.ResourceDictionary;
  private loadScheduled: boolean;

  constructor() {
    this.pixiLoader = new PIXI.loaders.Loader();
    this.nextLoadList = new Set();
    this.nextLoadCallbacks = [];
    this.resources = {};
    this.loadScheduled = false;
  }

  load(name: string | undefined, callback: LoadCallback) {
    if (name) {
      this.nextLoadList.add(name);
    }

    this.nextLoadCallbacks.push(callback);
    this.scheduleLoad();
  }

  destroy() {
    this.pixiLoader.reset();
    this.resources = {};
  }

  scheduleLoad() {
    if (this.loadScheduled) {
      return;
    }

    this.loadScheduled = true;

    if (this.pixiLoader.loading) {
      this.pixiLoader.load(() => this.performLoad());
    } else {
      Vue.nextTick(() => this.performLoad());
    }
  }

  performLoad() {
    const toLoad = this.nextLoadList;
    const callbacks = this.nextLoadCallbacks;

    this.pixiLoader.reset();
    toLoad.forEach(name => this.pixiLoader.add(name));
    this.pixiLoader.load(
      (_: any, resources: PIXI.loaders.ResourceDictionary) => {
        Object.assign(this.resources, resources);
        callbacks.forEach(callback => callback(this.resources));
      }
    );

    this.resetForNextLoad();
  }

  resetForNextLoad() {
    this.nextLoadList = new Set();
    this.nextLoadCallbacks = [];
  }
}

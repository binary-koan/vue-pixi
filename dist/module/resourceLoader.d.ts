import * as PIXI from "pixi.js";
export declare type LoadCallback = (resources: PIXI.loaders.ResourceDictionary) => void;
export default class ResourceLoader {
    private pixiLoader;
    private nextLoadList;
    private nextLoadCallbacks;
    private resources;
    private loadScheduled;
    constructor();
    load(name: string | undefined, callback: LoadCallback): void;
    destroy(): void;
    scheduleLoad(): void;
    performLoad(): void;
    resetForNextLoad(): void;
}

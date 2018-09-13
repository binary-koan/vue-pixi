/// <reference types="pixi.js" />
import Vue from "vue";
import { WatchOptionsWithHandler } from "vue/types/options";
export declare type WatcherGenerator<T> = ((name: string) => WatchOptionsWithHandler<any>) | {
    generator: (name: string, options: T) => WatchOptionsWithHandler<any>;
    options: T;
};
export declare function generateWatchers(props: {
    [prop: string]: WatcherGenerator<any>;
}): {
    [prop: string]: WatchOptionsWithHandler<any>;
};
export declare function propValueSpecified(context: Vue, name: string): boolean | undefined;
export declare function basicWatcher(name: string): WatchOptionsWithHandler<any>;
export declare function customWatcher<T>(name: string, { handler }: {
    handler: (this: Vue, pixiObject: PIXI.DisplayObject, newValue: T, oldValue: T) => any;
}): WatchOptionsWithHandler<T>;
export declare function resourceWatcher<T>(name: string, { loadName, onLoad }: {
    loadName: (value: T) => string | undefined;
    onLoad: (value: T, resources: any) => void;
}): WatchOptionsWithHandler<T>;
export declare function eventWatcher(name: string): WatchOptionsWithHandler<Boolean | undefined>;

import Vue from "vue";
import { WatchOptionsWithHandler } from "vue/types/options";
export declare function ignoreValueChange(context: Vue, name: string): boolean;
export declare function basicWatcher(name: string): WatchOptionsWithHandler<any>;
export declare function resourceWatcher<T>(name: string, { loadName, onLoad }: {
    loadName: (value: T) => string | undefined;
    onLoad: (value: T, resources: any) => void;
}): WatchOptionsWithHandler<T>;
export declare function eventWatcher(name: string): WatchOptionsWithHandler<Boolean | undefined>;

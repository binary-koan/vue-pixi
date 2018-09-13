import Vue from "vue";
import * as PIXI from "pixi.js";
import ResourceLoader, { LoadCallback } from "./resourceLoader";
declare module "pixi.js" {
    interface DisplayObject {
        [name: string]: any;
    }
}
declare module "vue/types/vue" {
    interface Vue {
        $pixi?: {
            object?: PIXI.DisplayObject;
            eventHandlers?: {
                [event: string]: (event: PIXI.interaction.InteractionEvent) => void;
            };
        };
        $pixiRoot?: {
            loader: ResourceLoader;
            root: PIXI.Container;
            app?: PIXI.Application;
        };
        $pixiStartRendering?: (object: PIXI.DisplayObject) => void;
        $pixiWithObject?: (callback: (object: PIXI.DisplayObject) => void) => void;
        $pixiLoadResource?: (name: string, callback: LoadCallback) => void;
        $pixiAddChild?: (child: Vue) => void;
        $pixiRemoveChild?: (child: Vue) => void;
    }
}
declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        pixiType?: {
            new (...args: any[]): PIXI.DisplayObject;
        };
        pixiCreateImmediately?: Boolean;
    }
}

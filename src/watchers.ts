import Vue from "vue"
import { WatchOptionsWithHandler } from "vue/types/options"

export type WatcherGenerator<T> =
  | ((name: string) => WatchOptionsWithHandler<any>)
  | {
      generator: (name: string, options: T) => WatchOptionsWithHandler<any>
      options: T
    }

export function generateWatchers(props: {
  [prop: string]: WatcherGenerator<any>
}) {
  const watchers: { [prop: string]: WatchOptionsWithHandler<any> } = {}

  Object.keys(props).forEach(key => {
    const generator = props[key]

    if (typeof generator === "function") {
      watchers[key] = generator(key)
    } else {
      watchers[key] = generator.generator(key, generator.options)
    }
  })

  return watchers
}

export function ignoreValueChange(context: Vue, name: string) {
  return (
    !context.$pixi ||
    !context.$vnode!.componentOptions!.propsData ||
    !context.$vnode!.componentOptions!.propsData!.hasOwnProperty(name)
  )
}

export function basicWatcher(name: string): WatchOptionsWithHandler<any> {
  return {
    immediate: true,
    handler(this: Vue, value) {
      if (ignoreValueChange(this as any, name)) return

      this.$pixi!.object[name] = value
    }
  }
}

export function resourceWatcher<T>(
  name: string,
  {
    loadName,
    onLoad
  }: {
    loadName: (value: T) => string | undefined
    onLoad: (value: T, resources: any) => void
  }
): WatchOptionsWithHandler<T> {
  loadName =
    loadName ||
    function(value) {
      return value
    }
  onLoad =
    onLoad ||
    function(this: Vue, value, resources) {
      this.$pixi!.object[name] = resources[value]
    }

  return {
    immediate: true,
    handler(this: Vue, value) {
      if (ignoreValueChange(this, name)) {
        return
      }

      this.$pixiLoadResource!(loadName.call(this, value), resources => {
        onLoad.call(this, value, resources)
      })
    }
  }
}

const BASIC_EVENTS: PIXI.interaction.InteractionEventTypes[] = [
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
]

export function eventWatcher(
  name: string
): WatchOptionsWithHandler<Boolean | undefined> {
  return {
    immediate: true,
    handler(this: Vue, value) {
      if (ignoreValueChange(this, name)) return
      const pixi = this.$pixi!

      pixi.object[name] = value

      if (value) {
        pixi.eventHandlers = {}
        BASIC_EVENTS.forEach(event => {
          pixi.eventHandlers![event] = this.$emit.bind(this, event)
          pixi.object.on(event, pixi.eventHandlers![event])
        })
      } else if (pixi.eventHandlers) {
        BASIC_EVENTS.forEach(event => {
          pixi.object.off(event, pixi.eventHandlers![event])
        })
        pixi.eventHandlers = undefined
      }
    }
  }
}

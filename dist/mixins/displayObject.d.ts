import Vue, { VueConstructor } from "vue";
import { LoadCallback } from "../resourceLoader";
declare const _default: VueConstructor<{
    $pixiLoadResource(name: string, callback: LoadCallback): void;
} & Record<string, any> & Vue>;
export default _default;

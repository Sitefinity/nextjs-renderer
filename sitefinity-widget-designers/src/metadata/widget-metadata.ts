import { keys } from '../symbols/known-keys';

export class WidgetMetadata {
    public static register (target: any) {
        if (!Object.hasOwn(target, keys.metadata)) {
            Object.defineProperty(target, keys.metadata, {enumerable: true, writable: true, value: {}});
        }
    }

    public static registerPrototype (target: any) {
        this.register(target.prototype);
    }

    public static registerProperty (target: any, key: string, value: any) {
        target[keys.metadata][key] = value;
    }

    public static registerPrototypeProperty (target: any, key: string, value: any) {
        this.registerProperty(target.prototype, key, value);
    }

    public static registerPropertyMetadata (target: any, propName: string, key: string, value: any, override = true) {
        this.registerPropertyObject(target, propName);

        if (target[keys.metadata][propName][key] === undefined || override) {
            target[keys.metadata][propName][key] = value;
        }
    }

    public static registerPrototypePropertyMetadata (target: any, propName: string, key: string, value: any, override = true) {
        this.registerPropertyMetadata(target.prototype, propName, key, value, override);
    }

    private static registerPropertyObject (target: any, key: string) {
        if (!target[keys.metadata][key]) {
            target[keys.metadata][key] = { [keys.name]: key };
        }
    }
}

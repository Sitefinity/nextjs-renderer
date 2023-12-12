import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function DisplaySettings(hide: boolean, hideContent: boolean = false) {
    const data: { [key: string]: boolean } = {
        'Hide': hide,
        'HideContent': hideContent
    };

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.displaySettings, data);
    });
}

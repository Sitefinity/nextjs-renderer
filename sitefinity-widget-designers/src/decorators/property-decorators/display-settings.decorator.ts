import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';

export function DisplaySettings(hide?: boolean, hideContent?: boolean) {
    const data: { [key: string]: boolean } = {};

    if (hide) {
        data['Hide'] = hide;
    }

    if (hideContent) {
        data['HideContent'] = hideContent;
    }

    return function (target: any, propName: string) {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.displaySettings, data);
    };
}

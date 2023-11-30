import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Model } from '../widget-entity.decorator';
import { DataType } from './data-type.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function MediaItem(itemType: string, allowMultipleSelection: boolean, standalone: boolean = false) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const data = {
            'ItemType': itemType,
            'AllowMultipleSelection': allowMultipleSelection,
            'Standalone': standalone
        };

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.mediaItem, data);
    });
}

@Model()
export class SdkItemModel {
    @DataType('string')
    Id: string | null = null;

    @DataType('string')
    Provider: string | null = null;
}

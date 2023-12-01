import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export class ContentSettings {
    Type?: string | null = null;
    IsFilterable?: boolean = false;
    AllowMultipleItemsSelection?: boolean = true;
    OpenMultipleItemsSelection?: boolean = false;
    LiveData?: boolean = false;
    Provider?: string | null = null;
    DisableInteraction?: boolean = false;
    ShowSiteSelector?: boolean = false;
    AllowCreate?: boolean = true;
    ForceShouldShowAll?: boolean = false;
}

export function Content(settings: ContentSettings = new ContentSettings()) {
    const contetSecttings = new ContentSettings();

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.content, Object.assign(contetSecttings, settings));
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, 'content');
    });
}
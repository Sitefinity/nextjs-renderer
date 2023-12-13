import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Settings for the Content property decorator.
 */
export class ContentSettings {
    /**
     * Gets or sets the type of the content to be displayed in the selector. E.g Telerik.Sitefinity.News.Model.NewsItem
     * For dynamic types the full Clr Type name is expected. E.g. Telerik.Sitefinity.DynamicTypes.Model.Pressreleases.PressRelease.
     */
    Type?: string | null = null;

    /**
     * Gets or sets a value indicating whether the filter logic will be applied for the content that has the <see cref="Type"/> atttribute defined.
     * This takes effect when no specific type is selected.
     */
    IsFilterable?: boolean = false;

    /**
     * Gets or sets a value indicating whether multiple items can be selected.
     * Defaults to 'true'
     */
    AllowMultipleItemsSelection?: boolean = true;
    /**
     * Gets or sets a value indicating whether the selector for items to be opened directly and the input option to be skipped
     * Defaults to 'false'.
     */
    OpenMultipleItemsSelection?: boolean = false;

    /**
     * Gets or sets a value indicating whether to use live or master data in the selectors.
     * Applicable for all content types except: Pages, Images, Videos and Documents.
     */
    LiveData?: boolean = false;

    /**
     * Gets or sets a name of the provider; If none was specified we will show data from all providers.
     */
    Provider?: string | null = null;

    /**
     * Gets or sets a value indicating whether to disable interaction with selected items.
     */
    DisableInteraction?: boolean = false;

    /**
     * Gets or sets a value indicating whether to show the providers/sites selector in show all items dialog.
     */
    ShowSiteSelector?: boolean = false;

    /**
     * Gets or sets a value indicating whether create item button is visible.
     * Defaults to 'true'.
     */
    AllowCreate?: boolean = true;

    /**
     * Gets or sets a value indicating whether show all button is visible.
     */
    ForceShouldShowAll?: boolean = false;
}

/**
 * Describes that the property refers to sitefinity content.
 * @param {ContentSettings} settings The configuration settings for the sitefinity content
 */
export function Content(settings: ContentSettings = new ContentSettings()) {
    const contetSecttings = new ContentSettings();

    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.content, Object.assign(contetSecttings, settings));
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, 'content');
    });
}

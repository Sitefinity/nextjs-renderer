import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { Category } from './category.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { Description } from './description.decorator';
import { DisplayName } from './display-name.decorator';

/**
 * Defines the property as the predefined SfWidgetLabel and adds the appropriate metadata:
 *  - Category: Advanced
 *  - Display name: Label
 *  - Max length: 30
 *  - Predefined description
 */
export function WidgetLabel() {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.maxLength, { Length: 30 });
        Category('Advanced')(target, propName);
        DisplayName('Label')(target, propName);
        Description('Custom labels are displayed in the page editor for your convenience. You can change the generic name with a specific one only for this widget.')(target, propName);
    });
}

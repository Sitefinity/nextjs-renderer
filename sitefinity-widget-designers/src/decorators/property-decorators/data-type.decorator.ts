import { keys } from '../../symbols/known-keys';
import { PropertyMergeStrategy, WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Predefined known field types.
 */
export enum KnownFieldTypes {
    Html = 'html',
    TextArea = 'textArea',
    RadioChoice = 'radioChoices',
    Choices = 'choices',
    ChipChoice = 'chipchoice',
    CheckBox = 'choiceYesNo',
    ChoiceList = 'choiceList',
    MultipleChoiceChip = 'multipleChoiceChip',
    ChoiceMultiple = 'choiceMultiple',
    Color = 'color',
    Password = 'password',
    Range = 'range',
    Attributes = 'attributes',
    FileTypes = 'fileTypes',
    PencilButton = 'pencilButton',
    Complex = 'complex'
}

/**
 * Predefined types of complex fields.
 */
export enum ComlexType {
    Complex = 'complex',
    Enumerable = 'enumerable',
    Dictionary = 'dictionary'
}

/**
 * Defines the property's data type.
 * @param {(KnownFieldTypes|ComlexType|string)} customDataType The property data type - e.g. 'string', 'boolean', complex type, custom type or anything specific.
 */
export function DataType(customDataType: KnownFieldTypes | ComlexType | string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, customDataType, PropertyMergeStrategy.Override);

        if (customDataType ===  KnownFieldTypes.Html) {
            WidgetMetadata.registerPropertyMetadata(target, propName, 'DynamicLinksContainer', {HasLinks : true});
        }
    });
}

// TODO: refactor this to assign type not to the original class but to the widget entity's current property
// provide overloads

/**
 * Defines the property's data model when the property is not a basic type.
 * If the property's type is a class or object, it should be referenced here, so its metadata could be populated in the decorated property's metadata.
 * @param model The class that is used as a model for the properties. It should be decorated with {@link Model} decorator.
 */
export function DataModel(model: any) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const descriptors = Object.getOwnPropertyDescriptors(model.prototype);
        const metadata = descriptors[keys.metadata];

        // get the original model instance, check if the property is an array
        const objectInstance = new (target.constructor)();
        const value = objectInstance[propName];
        if (metadata) {
            if (Array.isArray(value)) {
                metadata.value['type'] = ComlexType.Enumerable;
            } else if (typeof(value) === 'object' && value !== null) {
                metadata.value['type'] = ComlexType.Complex;
            }
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.dataModel, metadata);
    });
}

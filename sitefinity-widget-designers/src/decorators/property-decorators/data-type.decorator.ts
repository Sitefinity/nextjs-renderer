import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

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

export function DataType(customDataType: KnownFieldTypes | string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, customDataType);

        if (customDataType ===  KnownFieldTypes.Html) {
            WidgetMetadata.registerPropertyMetadata(target, propName, 'DynamicLinksContainer', {HasLinks : true});
        }
    });
}

export type CollectionType = 'enumerable' | 'dictionary';

export function DataModel(model: any): any;
export function DataModel(model: any, collectionType: CollectionType): any;
export function DataModel(model: any, collectionType?: CollectionType) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const descriptors = Object.getOwnPropertyDescriptors(model.prototype);
        const metadata = descriptors[keys.metadata];

        // get the original model instance, check if the property is an array
        const objectInstance = new (target.constructor)();
        const value = objectInstance[propName];
        if (metadata) {
            if (!collectionType) {
                if (Array.isArray(value)) {
                    metadata.value['type'] = 'enumerable';
                } else if (typeof(value) === 'object') {
                    metadata.value['type'] = KnownFieldTypes.Complex;
                }
            } else if (collectionType) {
                metadata.value['type'] = collectionType;
            }
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.dataModel, metadata);
    });
}

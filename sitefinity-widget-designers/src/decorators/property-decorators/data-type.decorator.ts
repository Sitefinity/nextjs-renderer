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

export enum ComlexType {
    Complex = 'complex',
    Enumerable = 'enumerable',
    Dictionary = 'dictionary'
}

export function DataType(customDataType: KnownFieldTypes | ComlexType | string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.type, customDataType);

        if (customDataType ===  KnownFieldTypes.Html) {
            WidgetMetadata.registerPropertyMetadata(target, propName, 'DynamicLinksContainer', {HasLinks : true});
        }
    });
}

// TODO: refactor this to assign type not to the original class but to the widget entity's current property
// provide overloads
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
            } else if (typeof(value) === 'object') {
                metadata.value['type'] = ComlexType.Complex;
            }
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.dataModel, metadata);
    });
}

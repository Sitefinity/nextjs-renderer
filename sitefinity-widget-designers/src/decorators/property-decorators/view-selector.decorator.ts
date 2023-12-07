import { ChoiceItem, Choices } from './choice.decorator';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';
import { DataType } from './data-type.decorator';

export function ViewSelector(views: ChoiceItem[]) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        Choices(views)(target, propName);
        DataType('viewSelector')(target, propName);
    });
}

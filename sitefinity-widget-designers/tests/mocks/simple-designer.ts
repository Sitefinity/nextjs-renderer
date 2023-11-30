import { DataType, DisplayName, WidgetEntity } from '../../src/decorators/';

export const SimpleWidgetName = 'Simple widget';
export const SimpleWidgetCaption = 'Simple widget caption';

@WidgetEntity(SimpleWidgetName, SimpleWidgetCaption)
export class SimpleWidgetEntity {
    @DisplayName('String field title')
    @DataType('string')
    StringField: string | null = null;

    StringFieldWithDefaultValue: string = 'default-value';
}

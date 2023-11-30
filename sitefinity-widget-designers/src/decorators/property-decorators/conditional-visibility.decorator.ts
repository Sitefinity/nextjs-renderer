import { keys } from '../../symbols/known-keys';
import { WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export interface Rule {
    operator?: 'And' | 'Or',
    conditions: {
        fieldName: string,
        operator: 'Equals' | 'NotEquals' | 'Contains' | 'NotContains',
        value: any,
        hideContent?: boolean
    }[],
    inline?: boolean,

}

export function ConditionalVisibility(condition: Rule | string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        if (typeof(condition) === 'object') {
            condition = JSON.stringify(condition);
        }

        WidgetMetadata.register(target);
        WidgetMetadata.registerPropertyMetadata(target, propName, keys.conditionalVisibility, { Condition: condition });
    });
}

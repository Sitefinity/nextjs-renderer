import { keys } from '../../symbols/known-keys';
import { PropertyMergeStrategy, WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

export function Required(errorMessage?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const required: {[key: string]: any} = {
            'Required': true
        };

        if (errorMessage) {
            required['RequiredErrorMsg'] = errorMessage;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, required, PropertyMergeStrategy.Merge);
    });
}

export function Readonly() {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const readonly: {[key: string]: any} = {
            'Readonly': true
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, readonly, PropertyMergeStrategy.Merge);
    });
}

export function Range(min: number, max: number, errorMessage?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const range: {[key: string]: any} = {
            'MinValue': min,
            'MaxValue': max
        };

        if (errorMessage) {
            range['RangeErrorMsg'] = errorMessage;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, range, PropertyMergeStrategy.Merge);
    });
}

export function MaxLength(length: number, errorMessage?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const range: {[key: string]: any} = {
            'MaxValue': length
        };

        if (errorMessage) {
            range['RangeErrorMsg'] = errorMessage;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, range, PropertyMergeStrategy.Merge);
    });
}

export function RegularExpression(regExp: string, errorMessage?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const regex: {[key: string]: any} = {
            'Regex': regExp
        };

        if (errorMessage) {
            regex['RegexErrorMsg'] = errorMessage;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, regex, PropertyMergeStrategy.Merge);
    });
}

export function StringLength(max: number, errorMessage?: string) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const range: {[key: string]: any} = {
            'MinValue': 0,
            'MaxValue': max
        };
        if (errorMessage) {
            range['StringLengthErrorMsg'] = errorMessage;
        }

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, range, PropertyMergeStrategy.Merge);
    });
}

export function DecimalPlaces(decimalPlaces: number) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const data: {[key: string]: any} = {
            'DecimalPlaces': decimalPlaces
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, data, PropertyMergeStrategy.Merge);
    });
}

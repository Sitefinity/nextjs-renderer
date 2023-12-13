import { keys } from '../../symbols/known-keys';
import { PropertyMergeStrategy, WidgetMetadata } from '../../metadata/widget-metadata';
import { PropertyDecoratorBase } from './common/property-decorator-wrapper';

/**
 * Defines the property as required.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
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

/**
 * Defines the property as read-only and not editable.
 */
export function Readonly() {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const readonly: {[key: string]: any} = {
            'Readonly': true
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, readonly, PropertyMergeStrategy.Merge);
    });
}

/**
 * Defines the property values accepted range.
 * @param {number} min The minumu value.
 * @param {number} max The maximum value.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
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

/**
 * Defines the property value maximum length.
 * @param {number} length The maximum length.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
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

/**
 * Defines the regex expression that would validate the property value.
 * @param {string} regExp The regular expression used for validation.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
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

/**
 * Defines the string property maximum length.
 * @param {number} max The maximum length.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
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

/**
 * Defined the number property decimal precision.
 * @param {number} decimalPlaces The max decimal places precision of the number.
 * @param {string} errorMessage Optional error message to be displayed when validation fails.
 */
export function DecimalPlaces(decimalPlaces: number) {
    return PropertyDecoratorBase((target: any, propName: string) => {
        const data: {[key: string]: any} = {
            'DecimalPlaces': decimalPlaces
        };

        WidgetMetadata.registerPropertyMetadata(target, propName, keys.validations, data, PropertyMergeStrategy.Merge);
    });
}

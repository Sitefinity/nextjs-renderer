import { FormRulesSettings } from '../form-rules-settings';

export const addConditionEvaluators = (ruleSettings: FormRulesSettings) => {
    ruleSettings.addConditionEvaluator('Equal', function (currentValue, ruleValue) {
        if (typeof currentValue === 'string') {
            return currentValue.search(new RegExp('^' + ruleValue + '$', 'i')) === 0;
        }

        return currentValue === ruleValue;
    });
    ruleSettings.addConditionEvaluator('NotEqual', function (currentValue, ruleValue) {
        if (typeof currentValue === 'string') {
            return currentValue.search(new RegExp('^' + ruleValue + '$', 'i')) === -1;
        }

        return currentValue !== ruleValue;
    });
    ruleSettings.addConditionEvaluator('Contains', function (currentValue, ruleValue) {
        return currentValue.search(new RegExp(ruleValue, 'i')) > -1;
    });
    ruleSettings.addConditionEvaluator('NotContains', function (currentValue, ruleValue) {
        return currentValue.search(new RegExp(ruleValue, 'i')) === -1;
    });

    let isFilledFunction = function (currentValue: number | string) {
        // Check if currentValue is NaN
        if (typeof currentValue === 'number' && currentValue !== currentValue) {
            return false;
        }

        return currentValue && currentValue.toString().length > 0;
    };

    ruleSettings.addConditionEvaluator('IsFilled', isFilledFunction);
    ruleSettings.addConditionEvaluator('IsNotFilled', function (currentValue) {
        return !isFilledFunction(currentValue);
    });
    ruleSettings.addConditionEvaluator('FileSelected', function (currentValue) {
        return currentValue && currentValue.length > 0;
    });
    ruleSettings.addConditionEvaluator('FileNotSelected', function (currentValue) {
        return !currentValue || currentValue.length === 0;
    });
    ruleSettings.addConditionEvaluator('IsGreaterThan', function (currentValue, ruleValue) {
        return currentValue > ruleValue;
    });
    ruleSettings.addConditionEvaluator('IsLessThan', function (currentValue, ruleValue) {
        return currentValue < ruleValue;
    });
};

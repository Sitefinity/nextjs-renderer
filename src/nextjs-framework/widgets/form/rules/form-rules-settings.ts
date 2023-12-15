import { ConditionEvaluator } from './condition-evaluator';
import { FormRuleActionExecutorBase } from './extractors/form-rule-action-extractor-base';
import { FieldSelector } from './field-selector';
import { ValueParser } from './value-parser';

export class FormRulesSettings {
    public ConditionEvaluators: ConditionEvaluator[] = [];
    public InputTypeParsers: ValueParser[] = [];
    public RuleValueParsers: ValueParser[] = [];
    public FieldSelectors: FieldSelector[] = [];
    public ActionExecutors: { actionName: string, actionExecutor: FormRuleActionExecutorBase }[] = [];

    public addConditionEvaluator (name: string, conditionEvaluator: (a: string, b: string) => boolean) {
        this.ConditionEvaluators.push(new ConditionEvaluator(name, conditionEvaluator, this));
    }
    public removeConditionEvaluator (name: string) {
        for (let i = 0; i < this.ConditionEvaluators.length; i++) {
            if (this.ConditionEvaluators[i].name === name) {
                this.ConditionEvaluators.splice(i, 1);
                break;
            }
        }
    }
    public processConditionEvaluator (name:string, inputType: string, currentValue: string, ruleValue: string) {
        for (let i = 0; i < this.ConditionEvaluators.length; i++) {
            if (this.ConditionEvaluators[i].canProcess(name)) {
                return this.ConditionEvaluators[i].process(currentValue, ruleValue, inputType);
            }
        }

        return false;
    }
    public getConditionEvaluator (name: string) {
        for (let i = 0; i < this.ConditionEvaluators.length; i++) {
            if (this.ConditionEvaluators[i].canProcess(name)) {
                return this.ConditionEvaluators[i];
            }
        }

        return null;
    }

    public addActionExecutor (actionName: string, actionExecutor: FormRuleActionExecutorBase) {
            this.ActionExecutors.push({ actionName: actionName, actionExecutor: actionExecutor });
        }
    public removeActionExecutor (actionName: string) {
        this.ActionExecutors = this.ActionExecutors.filter(function (a) {
            return a.actionName !== actionName;
        });
    }
    public getActionExecutor (actionName: string) {
        const entry = this.ActionExecutors.filter(function (a) {
            return a.actionName === actionName;
        })[0];
        if (entry) {
            return entry.actionExecutor;
        }

        return null;
    }

    public addInputTypeParser (inputType: string, parser: (value: string) => any, escape?: boolean, escapeRegEx?: RegExp) {
        this.InputTypeParsers.push(new ValueParser(inputType, parser, escape, escapeRegEx));
    }
    public removeInputTypeParser (inputType :string) {
        for (let i = 0; i < this.InputTypeParsers.length; i++) {
            if (this.InputTypeParsers[i].inputType === inputType) {
                this.InputTypeParsers.splice(i, 1);
                break;
            }
        }
    }
    public addRuleValueParser (inputType: string, parser: (value: string) => any, escape?: boolean, escapeRegEx?: RegExp) {
        this.RuleValueParsers.push(new ValueParser(inputType, parser, escape, escapeRegEx));
    }
    public removeRuleValueParser (inputType: string) {
        for (let i = 0; i < this.RuleValueParsers.length; i++) {
            if (this.RuleValueParsers[i].inputType === inputType) {
                this.RuleValueParsers.splice(i, 1);
                break;
            }
        }
    }
    public addFieldSelector (fieldContainerDataSfRole: string, elementSelector: string, additionalFilter?: string) {
        let element = this.FieldSelectors.map(function (e) {
            return e.fieldContainerDataSfRole;
        }).indexOf(fieldContainerDataSfRole);
        if (element > -1){
            throw 'Container with attribute [data-sf-role=\'' + fieldContainerDataSfRole + '\'] have been registered already.';
        } else {
            this.FieldSelectors.push(new FieldSelector(fieldContainerDataSfRole, elementSelector, additionalFilter));
        }
    }
    public removeFieldSelector (fieldContainerDataSfRole: string) {
        for (let i = 0; i < this.FieldSelectors.length; i++) {
            if (this.FieldSelectors[i].fieldContainerDataSfRole === fieldContainerDataSfRole) {
                this.FieldSelectors.splice(i, 1);
                break;
            }
        }
    }
    public getFieldValues (fieldContainer: HTMLDivElement) {
        for (let i = 0; i < this.FieldSelectors.length; i++) {
            if (this.FieldSelectors[i].canGetValues(fieldContainer)) {
                return this.FieldSelectors[i].getFieldValues(fieldContainer);
            }
        }

        return [];
    }
    public getFieldValueElements (fieldContainer: HTMLDivElement) {
        for (let i = 0; i < this.FieldSelectors.length; i++) {
            if (this.FieldSelectors[i].canGetValues(fieldContainer)) {
                return this.FieldSelectors[i].getFieldValueElements(fieldContainer);
            }
        }

        return null;
    }
    public getFieldsContainerNames () {
        let containers = [];
        for (let i = 0; i < this.FieldSelectors.length; i++) {
            containers.push(this.FieldSelectors[i].getFieldContainerDataSfRole());
        }

        return containers;
    }
}

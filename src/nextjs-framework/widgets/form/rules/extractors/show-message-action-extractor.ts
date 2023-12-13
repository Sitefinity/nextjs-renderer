import { FormRuleActionExecutorBase } from './form-rule-action-extractor-base';
import { FormRuleConstants } from '../form-rule-constants';

export class ShowMessageRuleActionExecutor extends FormRuleActionExecutorBase {
    public execute: boolean = false;

    constructor() {
        super();

    }

    public applyState(context: any, actionData: any) {
        let inputSelector = '[data-sf-role="form-rules-message"]';
        let inputElement = context.formContainer.querySelector(inputSelector);
        if (inputElement) {
            if (this.execute) {
                inputElement.value = actionData.target;
            } else {
                let currentValue = inputElement.value;
                if (currentValue === actionData.target) {
                    inputElement.value = '';
                }
            }
        }
    };

    public updateState(context: any, actionData: any) {
        this.execute = true;
        return true;
    };

    public undoUpdateState(context: any, actionData: any) {
        this.execute = false;
    };

    public isConflict(actionData: any, otherActionData: any) {
        return otherActionData.name === FormRuleConstants.Actions.ShowMessage || otherActionData.name === FormRuleConstants.Actions.GoTo;
    }
}

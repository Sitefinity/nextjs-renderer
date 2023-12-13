import { FormRuleActionExecutorBase } from './form-rule-action-extractor-base';

export class SendNotificationRuleActionExecutor extends FormRuleActionExecutorBase {
    public execute: boolean = false;

    constructor() {
        super();
    }

    public applyState(context: any, actionData: any) {
        let inputSelector = '[data-sf-role="form-rules-notification-emails"]';
        let inputElement = context.formContainer.querySelector(inputSelector);
        if (inputElement) {
            if (context.notificationEmails) {
                inputElement.value = context.notificationEmails.join(',');
            } else {
                inputElement.value = '';
            }
        }
    };

    public updateState(context: any, actionData: any) {
        if (!context.notificationEmails) {
            context.notificationEmails = [];
        }

        if (context.notificationEmails.indexOf(actionData.target) === -1) {
            context.notificationEmails.push(actionData.target);
        }

        return true;
    };

    public undoUpdateState(context: any, actionData: any) {
        if (context.notificationEmails) {
            let index = context.notificationEmails.indexOf(actionData.target);
            if (index !== -1) {
                context.notificationEmails.splice(index, 0);
            }
        }
    };

    public isConflict(actionData: any, otherActionData: any) {
        return actionData.name === otherActionData.name && actionData.target === otherActionData.target;
    }
}


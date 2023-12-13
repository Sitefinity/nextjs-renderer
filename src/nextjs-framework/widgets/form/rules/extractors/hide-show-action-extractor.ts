import { FormRuleActionExecutorBase } from './form-rule-action-extractor-base';
import { FormRuleConstants } from '../form-rule-constants';

export class HideShowFieldFormRuleActionExecutor extends FormRuleActionExecutorBase { //
    public actionName: string;

    constructor(actionName: string) {
        super();
      //  FormRuleActionExecutorBase.call(this);
        if (actionName === FormRuleConstants.Actions.Show || actionName === FormRuleConstants.Actions.Hide) {
            this.actionName = actionName;
        } else {
            throw new Error('Invalid action name! Only ' + FormRuleConstants.Actions.Show + ' and ' + FormRuleConstants.Actions.Hide + ' action names are allowed');
        }
    }

    public applyState(context: any, actionData: any) {
        let fieldIndex = context.helper.fieldIndexOf(context.fields, actionData.target);
        let fieldControlId = context.fields[fieldIndex].FieldControlId;
        if (context.fields[fieldIndex].Visible) {
            context.helper.showField(context, fieldControlId);
        } else {
            context.helper.hideField(context, fieldControlId);
        }
    };

    public updateState(context: any, actionData: any) {
        let updated = false;
        let fieldIndex = context.helper.fieldIndexOf(context.fields, actionData.target);
        if (this.actionName === FormRuleConstants.Actions.Show && !context.fields[fieldIndex].Visible) {
            context.fields[fieldIndex].Visible = true;
            updated = true;
        } else if (this.actionName === FormRuleConstants.Actions.Hide && context.fields[fieldIndex].Visible) {
            context.fields[fieldIndex].Visible = false;
            updated = true;
        }

        return updated;
    };

    public undoUpdateState(context: any, actionData: any) {
        let fieldIndex = context.helper.fieldIndexOf(context.fields, actionData.target);
        if (this.actionName === FormRuleConstants.Actions.Show) {
            context.fields[fieldIndex].Visible = false;
        } else {
            context.fields[fieldIndex].Visible = true;
        }
    };

    public isConflict(actionData: any, otherActionData: any) {
        return (otherActionData.name === FormRuleConstants.Actions.Show || otherActionData.name === FormRuleConstants.Actions.Hide) && actionData.target === otherActionData.target;
    };

    public getActionFieldIds(actionData: any) {
        return [actionData.target];
    };
}

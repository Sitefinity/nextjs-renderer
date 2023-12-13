import { FormRuleActionExecutorBase } from './form-rule-action-extractor-base';

export class SkipToPageFormRuleActionExecutor extends FormRuleActionExecutorBase {
    constructor() {
        super();
    }

    public applyState(context: any, actionData: any) {
        if (context.skipToPageCollection) {
            context.formContainer.trigger('form-page-skip', [context.skipToPageCollection]);
        }
    };

    public updateState(context: any, actionData: any) {
        if (!context.skipToPageCollection) {
            context.skipToPageCollection = [];
        }

        if (actionData.pageIndex < parseInt(actionData.target, 10)) {
            context.skipToPageCollection.push({ SkipFromPage: actionData.pageIndex, SkipToPage: parseInt(actionData.target, 10) });
            return true;
        }

        return false;
    };

    public undoUpdateState(context: any, actionData: any) {
        if (context.skipToPageCollection) {
            context.skipToPageCollection = context.skipToPageCollection.filter(function (p: any) {
                return p.SkipFromPage !== actionData.pageIndex || p.SkipToPage !== parseInt(actionData.target, 10);
            });
        }
    };

    public isConflict(actionData: any, otherActionData: any) {
        return actionData.name === otherActionData.name && actionData.pageIndex === otherActionData.pageIndex; // same action, same current page
    }
}



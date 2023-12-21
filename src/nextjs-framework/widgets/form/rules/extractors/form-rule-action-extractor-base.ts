export class FormRuleActionExecutorBase {

    public applyState (context: any, actionData: any) {
        throw new Error('applyState() function not implemented');
    };

    public updateState (context: any, actionData: any): boolean {
        throw new Error('updateState() function not implemented');
    };

    undoUpdateState (context: any, actionData: any) {
        throw new Error('undoUpdateState() function not implemented');
    };

    isConflict (actionData: any, otherActionData: any): boolean {
        return false;
    };

    getActionFieldIds (actionData: any): any[] {
        return [];
    };

}


import { ConditionEvaluator } from './condition-evaluator';
import { FormRuleActionExecutorBase } from './extractors/form-rule-action-extractor-base';
import { FormRulesSettings } from './form-rules-settings';

interface Field {Visible: boolean, Values: string[], FieldControlId: string};
interface ActionData {target: string, name: string, pageIndex: number, applyRule?: boolean};
interface Action {
    Visible?: boolean;
    data: ActionData;
    FieldControlId?: string;
    executor: FormRuleActionExecutorBase;
    applyRule?: boolean;
};

interface ContextInterface {
    fields: Field[],
    executedActions: Action[]
    activeActions: Action[]
    formContainer:  HTMLElement;
    formContainerSelector: string;
    iterationsCounter: number;
    hiddenFields: string [];
    skipToPageCollection: [],
    helper: {
        showField: ()=>void;
        hideField: ()=>void;
        getFieldElement: ()=>HTMLElement;
        getFieldStartSelector: ()=>string;
        getFieldEndSelector: ()=>string;
        fieldIndexOf: ()=>number;
        arrayIndexOf: ()=>number;
        actionItemIndexOf: (actions: Action[], actionData: ActionData)=>number;
    }
}

interface Rule {
    operator: string;
    conditions: {data:{id: string, value: string}, evaluator: ConditionEvaluator}[];
    actions: Action[];
}

export class FormRulesExecutor {
    public formContainerSelector: string | null = null;
    public formContainer: HTMLElement | null;
    public ruleSettings: FormRulesSettings;
    public hiddenFields: string[] = [];
    public skipFields: string[] = [];
    public formRules: Rule[] = [];
    public pages: any[] = [];
    public fieldsContainer: HTMLElement | Element | null = null;
    public formContainerMap;
    private iterationsMaxCount = 50;
    private updateFields: (args: {
        show?: string;
        hide?: string;
        skip?: string;
        unSkip?: string;
    })=>void;
    private fieldContainerSelector = '[data-sf-role$="field-container"]';
    private separatorSelector = '[data-sf-role="separator"]';
    private skipFieldsSelector = 'input[type="hidden"][data-sf-role="form-rules-skip-fields"]';
    private hiddenFieldsSelector = 'input[type="hidden"][data-sf-role="form-rules-hidden-fields"]';

    constructor(container: HTMLDivElement, updateFields: (args: {
        show?: string;
        hide?: string;
        skip?: string;
        unSkip?: string;
    })=>void) {
        this.formContainerSelector = this.getFormContainerSelector();
        this.ruleSettings = new FormRulesSettings();
        this.formContainerMap = new Map();
        this.formContainer = this.formContainerSelector ? container.closest(this.formContainerSelector) : null;
        this.updateFields = updateFields.bind(this),
        this._init(container);
    };


    public process () {
        if (!this._hasRules()){
            return;
        }

        this.hiddenFields = this._getHiddenFields();
        this.skipFields = this._getSkipFields();

        let context = this._contextInitialization();
        let updatedContext = this._evaluateFormRules(context);

        this._applyActionsState(updatedContext);

        this.hiddenFields = updatedContext.hiddenFields;
        this._setHiddenFields(this.hiddenFields);
        this._setExecutedActions(updatedContext.activeActions);
    }

    public getFormContainerSelector() {
        let selector = '[data-sf-role="form-container"]';
        const containers = document.querySelectorAll(selector);
        if (containers.length > 0) {
            return selector;
        }

        return null;
    }

    private _init(target: HTMLElement) {
        let separator = target.closest(this.separatorSelector);
        this.fieldsContainer = separator || this.formContainer;
        this.pages = Array.from(this.formContainer!.querySelectorAll(this.separatorSelector));

        this._initializeFormRules();

        let that = this;
        this.formContainer!.addEventListener('form-page-changed', function (e: any, nextIndex: number, previousIndex: number) {
            that._updateSkipPages(previousIndex, nextIndex);
        } as any);
    }


    private _hasRules() {
        return this.formRules && this.formRules.length !== 0;
    }

    private _evaluateFormRules(context: any): any {
        let currentFieldsVisibility = context.fields.map(function (field: Field) {
            return field.Visible;
        });
        let updatedContext = this._updateContext(context);
        let updatedFieldsVisibility = updatedContext.fields.map(function (field: Field) {
            return field.Visible;
        });

        let noChanges = this._compareArrays(currentFieldsVisibility, updatedFieldsVisibility);
        if (context.iterationsCounter > this.iterationsMaxCount || noChanges) {
            return updatedContext;
        }

        context.iterationsCounter++;

        return this._evaluateFormRules(updatedContext);
    }

    private _updateContext (context: ContextInterface) {
        let actions = this._getRulesActionsState(context);

        for (let i = 0; i < actions.length; i++) {
            let action = actions[i];
            let activeActionIndex = context.helper.actionItemIndexOf(context.activeActions, action.data);
            if (action.data.applyRule) {
                let updated = action.executor.updateState(context, action.data);
                if (activeActionIndex === -1) {
                    if (updated) {
                        context.activeActions.push(action);
                    }
                }
            } else {
                if (activeActionIndex > -1) {
                    action.executor.undoUpdateState(context, action.data);
                    context.activeActions.splice(activeActionIndex, 1);
                }
            }
        }

        return context;
    }

    private _getRulesActionsState (context: ContextInterface): Action[] {
        let actions: Action[] = [];
        let that = this;

        let addOrUpdateAction = function (actions:  Action[], currentAction: Action, applyRule: boolean) {
            let actionIndex = that._actionItemIndexOf(actions, currentAction.data);
            if (actionIndex === -1) {
                if (applyRule) {
                    // if status of current conditions is set to be executed, iterate through previously added actions and change their execution status
                    for (let actionIndex = 0; actionIndex < actions.length; actionIndex++) {
                        if (actions[actionIndex].data.applyRule === true) {
                            actions[actionIndex].data.applyRule = !actions[actionIndex].executor.isConflict(actions[actionIndex].data, currentAction.data);
                        }
                    }
                }

                currentAction.data.applyRule = applyRule;
                actions.push(currentAction);
            } else if (actions[actionIndex].data.applyRule === false) {
                // for duplicated actions, we replace with current execution status only if we find that action is inactive
                actions[actionIndex].data.applyRule = applyRule;
            }
        };

        for (let i = 0; i < this.formRules.length; i++) {
            // execute rule conditions and get execution status
            let rule = this.formRules[i];
            let applyRule = this._evaluateConditions(context, rule);

            for (let j = 0; j < rule.actions.length; j++) {
                let action = rule.actions[j];

                addOrUpdateAction(actions, action, applyRule);
            }
        }

        return actions;
    }

    private _applyActionsState (context: ContextInterface) {
        for (let actionIndex = 0; actionIndex < context.activeActions.length; actionIndex++) {
            let action = context.activeActions[actionIndex];
            action.executor.applyState(context, action.data);
        }

        let deactivatedActions = context.executedActions.filter(function (a) {
            return context.activeActions.indexOf(a) === -1;
        });
        for (let deactivatedActionIndex = 0; deactivatedActionIndex < deactivatedActions.length; deactivatedActionIndex++) {
            let deactivatedAction = deactivatedActions[deactivatedActionIndex];
            deactivatedAction.executor.applyState(context, deactivatedAction.data);
        }
    }

    private _evaluateConditions (context: ContextInterface, rule: Rule) {
        let executeStatus = [];
        for (let conditionIndex = 0; conditionIndex < rule.conditions.length; conditionIndex++) {
            let condition = rule.conditions[conditionIndex];
            let field = this._getContextField(context, condition.data.id)!;
            let fieldType = this._getFieldType(condition.data.id);

            let applyRule: boolean = false;
            if (field.Visible === true && condition.evaluator) {
                if (field.Values && field.Values.length > 0) {
                    for (let h = 0; h < field.Values.length; h++) {
                        applyRule = condition.evaluator.process(field.Values[h], condition.data.value, fieldType!);
                        if (applyRule) {
                            break;
                        }
                    }
                } else {
                    applyRule = condition.evaluator.process('', condition.data.value, fieldType!); //null
                }
            }

            executeStatus.push(applyRule);
        }

        let execute;
        if (rule.operator === 'And') {
            execute = executeStatus.every(e => e);
        } else {
            // Operator "Or"
            execute = executeStatus.some(e => e);
        }

        return execute;
    }

    private _initializeFormRules () {
        this.formRules = [];
        let formRulesElement = this.formContainer!.querySelector('input[data-sf-role="form-rules"]') as HTMLInputElement;
        let deserializedFormRules = formRulesElement && formRulesElement.value.length > 0 ? JSON.parse(formRulesElement.value) : null;
        if (deserializedFormRules) {
            for (let ruleIndex = 0; ruleIndex < deserializedFormRules.length; ruleIndex++) {
                let rule = deserializedFormRules[ruleIndex];
                let newRule: Rule = {
                    operator: rule.Operator,
                    conditions: [],
                    actions: []
                };

                let rulePageIndex = 0;
                for (let conditionIndex = 0; conditionIndex < rule.Conditions.length; conditionIndex++) {
                    let condition = rule.Conditions[conditionIndex];
                    let conditionEvaluator = this.ruleSettings.getConditionEvaluator(condition.Operator);
                    newRule.conditions.push({
                        data: {
                            id: condition.Id,
                            value: condition.Value
                        },
                        evaluator: conditionEvaluator!
                    });

                    let conditionTargetPageIndex = this._getFieldPageContainerIndex(condition.Id);
                    rulePageIndex = conditionTargetPageIndex && conditionTargetPageIndex > rulePageIndex ? conditionTargetPageIndex : rulePageIndex;
                }

                for (let actionIndex = 0; actionIndex < rule.Actions.length; actionIndex++) {
                    let action = rule.Actions[actionIndex];
                    let actionExecutor = this.ruleSettings.getActionExecutor(action.Action);
                    if (actionExecutor) {
                        newRule.actions.push({
                            data: {
                                target: action.Target,
                                name: action.Action,
                                pageIndex: rulePageIndex
                            },
                            executor: actionExecutor
                        });
                    }
                }

                newRule.actions = this._filterConflictingRuleActions(newRule.actions);

                this.formRules.push(newRule);
            }
        }
    }

    private _filterConflictingRuleActions (ruleActions: Action[]) {
        let filteredActions = [];

        // iterate backward and get the first rule action of the action list, skip others
        for (let i = ruleActions.length - 1; i >= 0; i--) {
            if (filteredActions.filter(function (a) {
                     return ruleActions[i].executor.isConflict(ruleActions[i].data, a.data);
                }).length === 0) {
                filteredActions.push(ruleActions[i]);
            }
        }

        return filteredActions.reverse();
    }

    private _contextInitialization() {
        let executedActions = this._getExecutedActions();
        return {
            fields: this._fieldsInitialization(),
            executedActions: executedActions.slice(),
            activeActions: executedActions.slice(),
            formContainer: this.formContainer,
            formContainerSelector: this.formContainerSelector,
            iterationsCounter: 0,
            hiddenFields: this.hiddenFields,
            skipToPageCollection: [],
            helper: {
                showField: this._showField.bind(this),
                hideField: this._hideField.bind(this),
                getFieldElement: this._getFieldElement.bind(this),
                getFieldStartSelector: this._getFieldStartSelector.bind(this),
                getFieldEndSelector: this._getFieldEndSelector.bind(this),
                fieldIndexOf: this._fieldIndexOf.bind(this),
                arrayIndexOf: this._arrayIndexOf.bind(this),
                actionItemIndexOf: this._actionItemIndexOf.bind(this)
            }
        };
    }

    private _fieldsInitialization () {
        let fields = [];
        let formRuleFields = this._getFormRulesFields();
        for (let i = 0; i < formRuleFields.length; i++) {
            fields.push({
                FieldControlId: formRuleFields[i],
                Values: this._getFieldValues(formRuleFields[i]),
                Visible: this._arrayIndexOf(this.hiddenFields, formRuleFields[i]) === -1 && this._arrayIndexOf(this.skipFields, formRuleFields[i]) === -1
            });
        }

        return fields;
    }

    private _getFormRulesFields () {
        let fields = [];

        for (let i = 0; i < this.formRules.length; i++) {
            for (let s = 0; s < this.formRules[i].conditions.length; s++) {
                let conditionFieldName = this.formRules[i].conditions[s].data.id;
                if (this._arrayIndexOf(fields, conditionFieldName) === -1) {
                    fields.push(conditionFieldName);
                }
            }

            for (let j = 0; j < this.formRules[i].actions.length; j++) {
                let actionFieldIds = this.formRules[i].actions[j].executor.getActionFieldIds(this.formRules[i].actions[j].data);
                if (actionFieldIds && actionFieldIds.length > 0) {
                    for (let k = 0; k < actionFieldIds.length; k++) {
                        if (this._arrayIndexOf(fields, actionFieldIds[k]) === -1) {
                            fields.push(actionFieldIds[k]);
                        }
                    }
                }
            }
        }

        return fields;
    }

    private _updateSkipPages (previousIndex :number, nextIndex: number) {
        if (previousIndex < nextIndex) {
            // next page - disable fields in skipped pages
            let fieldContainerNames = this.ruleSettings.getFieldsContainerNames();
            for (let skipPage = previousIndex + 1; skipPage < nextIndex; skipPage++) {
                for (let k = 0; k < fieldContainerNames.length; k++) {
                    let fieldsContainers = this.pages[skipPage].find('[data-sf-role="' + fieldContainerNames[k] + '"]');
                    for (let j = 0; j < fieldsContainers.length; j++) {
                        let skippedField = this.ruleSettings.getFieldValueElements(fieldsContainers[j])!;
                        if (skippedField.length) {
                            let fieldName = skippedField[0].getAttribute('name');
                            let fieldStartWrapper = this.formContainer!.querySelectorAll('script[data-sf-role-field-name=\'' + fieldName + '\']')[0];
                            if (fieldStartWrapper) {
                                let dataSfRole = fieldStartWrapper.getAttribute('data-sf-role');
                                if (dataSfRole) {
                                    let fieldControlId = dataSfRole.replace('start_field_', '');
                                    this._skipField(fieldControlId);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            // previous page - iterate through skipped fields and enable them again
            for (let fieldIndex = this.skipFields.length - 1; fieldIndex >= 0; fieldIndex--) {
                let fieldPageIndex = this._getFieldPageContainerIndex(this.skipFields[fieldIndex]);
                if (nextIndex < fieldPageIndex && fieldPageIndex < previousIndex) {
                    this._unskipField(this.skipFields[fieldIndex]);
                }
            }
        }

        this._setSkipFields(this.skipFields);
    }

    private _skipField (fieldControlId: string) {
        this.updateFields({
            skip: fieldControlId
        });
    }

    private _unskipField(fieldControlId: string) {
        this.updateFields({
            unSkip: fieldControlId
        });
    }

    private _actionItemIndexOf(actions: Action[], actionData: ActionData): number {
        for (let i = 0; i < actions.length; i++) {
            if (actions[i].data.target === actionData.target && actions[i].data.name === actionData.name && actions[i].data.pageIndex === actionData.pageIndex) {
                return i;
            }
        }

        return -1;
    }

    private _getContextField (context: ContextInterface, fieldControlId: string): Field | null {
        for (let i = 0; i < context.fields.length; i++) {
            if (context.fields[i].FieldControlId === fieldControlId) {
                return context.fields[i];
            }
        }
        return null;
    }

    private _getFieldElement (fieldControlId: string) {
        let scriptWrapper = this.formContainer!.querySelector(this._getFieldStartSelector(fieldControlId));
        if (scriptWrapper) {
            let fieldAllElements = [];
            let sibling = scriptWrapper.nextElementSibling!;
            while (!sibling.matches(this._getFieldEndSelector(fieldControlId))) {
                fieldAllElements.push(sibling);
                sibling = sibling.nextElementSibling!;
            }

            // Get field element based on container selector registered in FormRulesSettings
            let fieldContainerNames = this.ruleSettings.getFieldsContainerNames();
            if (fieldContainerNames && fieldContainerNames.length > 0) {
                for (let i = 0; i < fieldContainerNames.length; i++) {
                    let containerSelector = '[data-sf-role="' + fieldContainerNames[i] + '"]';
                    let fieldContainer = null;
                    for (let i = 0; i < fieldAllElements.length; i++) {
                        const element = fieldAllElements[0];
                        if (element.matches(containerSelector)) {
                            fieldContainer = element;
                            break;
                        }
                    }

                    // If not found in root elements, try searching in descendants
                    if (!fieldContainer) {
                        for (let i = 0; i < fieldAllElements.length; i++) {
                            const element = fieldAllElements[0];
                            if (element.querySelector(containerSelector)) {
                                fieldContainer = element;
                                break;
                            }
                        }
                    }

                    if (fieldContainer) {
                        return this.ruleSettings.getFieldValueElement(fieldContainer as HTMLDivElement);
                    }
                }
            }
        }

        return null;
    }

    private _showField (_context: ContextInterface, fieldControlId :string) {
       this.updateFields({
            show: fieldControlId
        });
    }

    private _hideField(_context: ContextInterface, fieldControlId :string) {
        this.updateFields({
            hide: fieldControlId
        });
    }

    private _getFieldType(fieldControlId: string) {
        let fieldElement = this._getFieldElement(fieldControlId);
        let fieldType = null;
        if (fieldElement) {
            fieldType = fieldElement.getAttribute('data-sf-input-type');
            if (!fieldType) {
                fieldType = this._getFieldElement(fieldControlId)!.getAttribute('type');
            }
        }

        return fieldType;
    }

    private _getFieldValues (fieldControlId: string) {
        let fieldContainer = this._getFieldContainer(fieldControlId) as HTMLDivElement;
        return this.ruleSettings.getFieldValues(fieldContainer);
    }

    private _getFieldContainer (fieldControlId: string) {
        return this._getFieldElement(fieldControlId)!.closest(this.fieldContainerSelector);
    }

    private _getFieldPageContainer (fieldControlId: string) {
        let element = this._getFieldElement(fieldControlId)!;
        let separator = element.closest(this.separatorSelector);
        return separator || element.closest(this.formContainerSelector!);
    }

    private _getFieldPageContainerIndex (fieldControlId: string) {
        let fieldPageContainer = this._getFieldPageContainer(fieldControlId);
        return this.pages.findIndex(function (x) {
            return x === fieldPageContainer;
        });
    }

    private _fieldIndexOf (fields: Field[], fieldControlId: string) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].FieldControlId === fieldControlId) {
                return i;
            }
        }

        return -1;
    }

    private _getExecutedActions () {
        return this.formContainerMap.get(this.formContainer) || [];
    }

    private _setExecutedActions (actions: Action[]) {
        this.formContainerMap.set(this.formContainer, actions);
    }

    private _getHiddenFields () {
        let hiddenFields = this.formContainer!.querySelector(this.hiddenFieldsSelector);
        if (hiddenFields) {
            return this._createArrayFromCsvValue((hiddenFields as HTMLInputElement).value);
        }

        return [];
    }

    private _setHiddenFields (fields: string[]) {
        let hiddenFields = this.formContainer!.querySelector(this.hiddenFieldsSelector);
        if (hiddenFields) {
            (hiddenFields as HTMLInputElement).value = fields.join(',');
        }
    }

    private _getSkipFields () {
        let skipFields = this.formContainer!.querySelector(this.skipFieldsSelector);
        if (skipFields) {
            return this._createArrayFromCsvValue((skipFields as HTMLInputElement).value);
        }

        return [];
    }

    private _setSkipFields (fields: string[]) {
        (this.formContainer!.querySelector(this.skipFieldsSelector!) as HTMLInputElement).value = fields.join(',');
    }

    private _createArrayFromCsvValue (value: string) {
        let array = (value || '').split(','), newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] && array[i] !== '') {
                newArray.push(array[i]);
            }
        }

        return newArray;
    }

    private _arrayIndexOf (array: string[], value: string) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }

        return -1;
    }

    private _compareArrays (array1: any[], array2: any[]) {
        let i = array1.length;
        if (i !== array2.length) {
            return false;
        }
        while (i--) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }

    private _getFieldStartSelector (fieldControlId: string) {
        return 'script[data-sf-role="start_field_' + fieldControlId + '"]';
    }

    private _getFieldEndSelector (fieldControlId: string) {
        return 'script[data-sf-role="end_field_' + fieldControlId + '"]';
    }
};

import { FormRulesExecutor } from './rules/form-rules-executor';
let formRuleExecutorsCache: {
    formContainer: HTMLElement
    formRulesExecutor: FormRulesExecutor
}[] = [];
export const processFormRules = (formContainer: HTMLDivElement, resetElementCache?: boolean) => {
    if (formContainer) {
        let formRulesExecutor = null;
        let cachedFormRulesExecutorObject = formRuleExecutorsCache.filter(function (e) {
         return e.formContainer === formContainer;
        })[0];
        if (resetElementCache !== true && cachedFormRulesExecutorObject) {
            formRulesExecutor = cachedFormRulesExecutorObject.formRulesExecutor;
        } else {
            formRulesExecutor = new FormRulesExecutor(formContainer);
            if (resetElementCache === true) {
                formRuleExecutorsCache = formRuleExecutorsCache.filter(function (e) {
                    return e.formContainer !== cachedFormRulesExecutorObject.formContainer;
                });
            }

            formRuleExecutorsCache.push({
                formContainer: formContainer,
                formRulesExecutor: formRulesExecutor
            });
        }

        formRulesExecutor.process();
    }
};

import { FormRulesSettings } from './form-rules-settings';

export class ConditionEvaluator {
    public name: string;
    public conditionEvaluator;
    public settings: FormRulesSettings;

    constructor(name :string, conditionEvaluator: (a:string, b:string)=>{}, settings: FormRulesSettings){
        this.name = name;
        this.conditionEvaluator = conditionEvaluator;
        this.settings = settings;
    }

    public canProcess (name: string) {
        return name === this.name;
    };

    public process (currentValue:string, ruleValue: string, inputType: string) {
        if (!this.settings.InputTypeParsers || this.settings.InputTypeParsers.length === 0) {
            return false;
        }

        let inputTypeParser;
        for (let inputValueIndex = 0; inputValueIndex < this.settings.InputTypeParsers.length; inputValueIndex++) {
            if (inputValueIndex === 0 || this.settings.InputTypeParsers[inputValueIndex].canParse(inputType)) {
                inputTypeParser = this.settings.InputTypeParsers[inputValueIndex];
            }
        }

        let ruleValueParsers;
        for (let ruleValueIndex = 0; ruleValueIndex < this.settings.RuleValueParsers.length; ruleValueIndex++) {
            if (ruleValueIndex === 0 || this.settings.RuleValueParsers[ruleValueIndex].canParse(inputType)) {
                ruleValueParsers = this.settings.RuleValueParsers[ruleValueIndex];
            }
        }

        let parsedCurrentValue = inputTypeParser ? inputTypeParser.parse(currentValue) : currentValue;
        let parsedRuleValue = ruleValueParsers ? ruleValueParsers.parse(ruleValue) : ruleValue;

        return this.conditionEvaluator(parsedCurrentValue, parsedRuleValue);
    };
}

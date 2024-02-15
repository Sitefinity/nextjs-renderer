import { FormRulesSettings } from '../form-rules-settings';

export const addFieldSelectors = (ruleSettings: FormRulesSettings) => {
    ruleSettings.addFieldSelector('text-field-container', '[data-sf-role=\'text-field-input\']');
    ruleSettings.addFieldSelector('email-text-field-container', '[data-sf-role=\'email-text-field-input\']');
    ruleSettings.addFieldSelector('multiple-choice-field-container', '[data-sf-role=\'multiple-choice-field-input\']', ':checked');
    ruleSettings.addFieldSelector('checkboxes-field-container', '[data-sf-role=\'checkboxes-field-input\']', ':checked');
    ruleSettings.addFieldSelector('paragraph-text-field-container', '[data-sf-role=\'paragraph-text-field-textarea\']');
    ruleSettings.addFieldSelector('dropdown-list-field-container', '[data-sf-role=\'dropdown-list-field-select\']');
    ruleSettings.addFieldSelector('file-field-container', '[data-sf-role=\'single-file-input\'] input[type=\'file\']');
};

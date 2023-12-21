import { GoToPageRuleActionExecutor } from '../extractors/go-to-page-action-extractor';
import { HideShowFieldFormRuleActionExecutor } from '../extractors/hide-show-action-extractor';
import { SendNotificationRuleActionExecutor } from '../extractors/send-notification-action-extractor';
import { ShowMessageRuleActionExecutor } from '../extractors/show-message-action-extractor';
import { SkipToPageFormRuleActionExecutor } from '../extractors/skip-to-page-action-extractor';
import { FormRuleConstants } from '../form-rule-constants';
import { FormRulesSettings } from '../form-rules-settings';

export const addActionExecutors = (ruleSettings: FormRulesSettings) => {
    const hideRuleAction = new HideShowFieldFormRuleActionExecutor(FormRuleConstants.Actions.Hide);
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.Hide, hideRuleAction);

    const showRuleAction = new HideShowFieldFormRuleActionExecutor(FormRuleConstants.Actions.Show);
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.Show, showRuleAction);

    const skipRuleActionExecutor = new SkipToPageFormRuleActionExecutor();
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.Skip, skipRuleActionExecutor);

    const showMessageRuleActionExecutor = new ShowMessageRuleActionExecutor();
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.ShowMessage, showMessageRuleActionExecutor);

    const goToPageRuleActionExecutor = new GoToPageRuleActionExecutor();
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.GoTo, goToPageRuleActionExecutor);

    const sendNotificationRuleActionExecutor = new SendNotificationRuleActionExecutor();
    ruleSettings.addActionExecutor(FormRuleConstants.Actions.SendNotification, sendNotificationRuleActionExecutor);
};

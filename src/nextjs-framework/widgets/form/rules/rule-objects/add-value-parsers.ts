import { FormRulesSettings } from '../form-rules-settings';

export const addValueParsers = (ruleSettings: FormRulesSettings) => {
    let dateParserFunction = function (value: string | number | Date) {
        let dateTime = new Date(value);
        let date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

        return date.getTime();
    };

    let monthParserFunction = function (value: string | number | Date, timezoneOffset: number) {
        let dateTime = new Date(value);

        if (timezoneOffset) {
            dateTime.setTime(dateTime.getTime() + timezoneOffset);
        }

        let date = new Date(dateTime.getFullYear(), dateTime.getMonth());

        return date.getTime();
    };

    let weekParserFunction = function (value: string) {
        let date = new Date(parseInt(value.split('-W')[0], 10), 0, 1 + (parseInt(value.split('-W')[1], 10) - 1) * 7);
        date.setDate(date.getDate() - date.getDay() + (date.getDate() <= 4 ? 1 : 8));
        return date.getTime();
    };

    let dateTimeParserFunction = function (value: string | number | Date, timezoneOffset?: number) {
        let dateTime = new Date(value);
        let date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes());

        if (timezoneOffset) {
            date = new Date(date.getTime() + timezoneOffset);
        }

        return date.getTime();
    };

    let timeParserFunction = function (value: string | number | Date, timezoneOffset: number) {
        let dateTime = new Date(value);

        if (timezoneOffset) {
            dateTime = new Date(dateTime.getTime() + timezoneOffset);
        }

        return dateTime.getHours() * 60 + dateTime.getMinutes();
    };

    ruleSettings.addInputTypeParser('text', function (value) {
        return value;
    });
    ruleSettings.addInputTypeParser('month', function (value) {
        return monthParserFunction(value, new Date(value).getTimezoneOffset() * 60000);
    });
    ruleSettings.addInputTypeParser('number', function (value) {
        return parseFloat(value) && Number(value);
    });
    ruleSettings.addInputTypeParser('datetime-local', dateTimeParserFunction);
    ruleSettings.addInputTypeParser('date', dateParserFunction);
    ruleSettings.addInputTypeParser('time', function (value) {
        return parseInt(value.split(':')[0], 10) * 60 + parseInt(value.split(':')[1], 10);
    });
    ruleSettings.addInputTypeParser('week', weekParserFunction);

    ruleSettings.addRuleValueParser('text', function (value) {
        return value;
    }, true);
    ruleSettings.addRuleValueParser('month', function (value) {
        return monthParserFunction(value, new Date(value).getTimezoneOffset() * 60000);
    });
    ruleSettings.addRuleValueParser('number', function (value) {
        return parseFloat(value) && Number(value);
    });
    ruleSettings.addRuleValueParser('datetime-local', function (value) {
        return dateTimeParserFunction(value, new Date(value).getTimezoneOffset() * 60000);
    });
    ruleSettings.addRuleValueParser('date', dateParserFunction);
    ruleSettings.addRuleValueParser('time', function (value) {
        return timeParserFunction(value, new Date(value).getTimezoneOffset() * 60000);
    });
    ruleSettings.addRuleValueParser('week', weekParserFunction);
};

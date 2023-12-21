import { DataType, DateSettings, DefaultValue, Description, DisplayName, Model, Placeholder, Required } from '@progress/sitefinity-widget-designers-sdk';

@Model()
export class DateRange {
    @DisplayName('start date')
    @DateSettings(false)
    @Placeholder('Start date')
    @Required()
    @DataType('datetime')
    @DefaultValue(null)
    From?: Date;

    @DisplayName('end date')
    @DateSettings(false)
    @Placeholder('End date')
    @Required()
    @DataType('datetime')
    @DefaultValue(null)
    To?: Date;

    @DisplayName('label')
    @Placeholder('type label...')
    @Description('Add a label for this range on your site. For example, 2021 - 2022 or May 2022.')
    @Required()
    @DefaultValue('')
    @DataType('string')
    Label?: string;
}

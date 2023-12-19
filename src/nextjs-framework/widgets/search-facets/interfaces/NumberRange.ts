import { DataType, DecimalPlaces, DefaultValue, Description, DisplayName, Model, Placeholder, Required } from '@progress/sitefinity-widget-designers';

@Model()
export class NumberRange {
    @DisplayName('min value')
    @Placeholder('type min value...')
    @Required()
    @DefaultValue(null)
    @DataType('number')
    From: number | null = null;

    @DisplayName('max value')
    @Placeholder('type max value...')
    @Required()
    @DefaultValue(null)
    @DataType('number')
    To: number | null = null;

    @DisplayName('label')
    @Placeholder('type label...')
    @Description('Add a label for this range on your site. For example, 5kg - 10kg or above 10kg.')
    @Required()
    @DataType('string')
    Label: string | null = null;
}

export class DecimalNumberRange {
    @DisplayName('min value')
    @Placeholder('type min value...')
    @Required()
    @DefaultValue(null)
    @DataType('number')
    @DecimalPlaces(10)
    From: number | null = null;

    @DisplayName('max value')
    @Placeholder('type max value...')
    @Required()
    @DefaultValue(null)
    @DataType('number')
    @DecimalPlaces(10)
    To: number | null = null;

    @DisplayName('label')
    @Placeholder('type label...')
    @Description('Add a label for this range on your site. For example, 5kg - 10kg or above 10kg.')
    @Required()
    @DataType('string')
    Label: string | null = null;
}

import { DecimalNumberRange, NumberRange } from './NumberRange';
import { DateRange } from './DateRange';
import { Choice,ComlexType, ConditionalVisibility, DataModel, DataType, DefaultValue, Description, DisplayName, DisplaySettings, KnownFieldTypes, Model, Placeholder, Range, StringLength, TableView } from '@progress/sitefinity-widget-designers-sdk';

@Model()
export class Settings {
    @DisplayName('Range type')
    @DefaultValue(0)
    @DataType(KnownFieldTypes.ChipChoice)
    @Choice({ Choices: [{'Title':'Auto','Name':'Auto','Value':0,'Icon':null},{'Title':'Custom','Name':'Custom','Value':1,'Icon':null}] })
    RangeType?: number;

    @TableView({ Reorderable: false, Selectable: false, MultipleSelect: false })
    @DisplayName('Set ranges')
    @Description('Specify the ranges for generating facets.')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":1 },' +
        '{"fieldName":"FacetType","operator":"Equals","value":"DateAndTime" }]}')
    @DataModel(DateRange)
    @DataType(ComlexType.Enumerable)
    DateRanges: DateRange[] | null = null;

    @DisplayName('Set a range step')
    @DataType(KnownFieldTypes.Choices)
    @Description('Select a step to automatically group values by time period.')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":0 },' +
        '{"fieldName":"FacetType","operator":"Equals","value":"DateAndTime" }]}')
    @Choice({ Choices: [{'Title':'day','Name':'0','Value':0,'Icon':'ban'},{'Title':'week','Name':'1','Value':1,'Icon':null},{'Title':'month','Name':'2','Value':2,'Icon':null},{'Title':'quarter','Name':'3','Value':3,'Icon':null},{'Title':'year','Name':'4','Value':4,'Icon':null}] })
    DateStep: string | null = null;

    @DisplayName('Set a range step')
    @Description('Specify a step to automatically generate ranges. For example, if the step is set to 10, generated ranges will be 0 - 10, 10 - 20, 20 - 30, etc. If a step is not set, all values are displayed.')
    @Placeholder('type number...')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":0 }, ' +
        '{"fieldName":"FacetType","operator":"Contains","value":"Number" }]}')
    @Range(1, 2147483647, 'Enter a positive number')
    @DefaultValue(null)
    @DataType('number')
    NumberStep?: number;

    @TableView({ Reorderable: false, Selectable: false, MultipleSelect: false })
    @DisplayName('Set ranges')
    @Description('Specify the ranges for generating facets.')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":1 },' +
        '{"fieldName":"FacetType","operator":"Equals","value":"NumberWhole" }]}')
    @DataModel(NumberRange)
    @DataType(ComlexType.Enumerable)
    NumberRanges: NumberRange[] | null = null;

    @TableView({ Reorderable: false, Selectable: false, MultipleSelect: false })
    @DisplayName('Set ranges')
    @Description('Specify the ranges for generating facets.')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":1 },' +
        '{"fieldName":"FacetType","operator":"Equals","value":"NumberDecimal" }]}')
    @DataModel(DecimalNumberRange)
    @DataType(ComlexType.Enumerable)
    NumberRangesDecimal: DecimalNumberRange[] | null = null;

    @DisplayName('Prefix')
    @Description('Add text before the values, such as units, currency, etc. For example, $0 - $10, $10 - $20, $20 - $30, etc.')
    @ConditionalVisibility('{"operator":"And","conditions":[' +
        '{"fieldName":"RangeType","operator":"Equals","value":0 }, ' +
        '{"fieldName":"FacetType","operator":"Contains","value":"Number" }]}')
    @StringLength(20, 'Your text must be less than 20 characters')
    @DefaultValue(null)
    @DataType('string')
    Prefix?: string;

    @DisplayName('Suffix')
    @Description('Add text after the values, such as units, currency, etc. For example, 0 in - 10 in, 10 in - 20 in, 20 in - 30 in, etc.')
    @ConditionalVisibility('{"operator":"And","conditions":[{"fieldName":"RangeType","operator":"Equals","value":0 }, ' +
        '{"fieldName":"FacetType","operator":"Contains","value":"Number" }]}')
    @StringLength(20, 'Your text must be less than 20 characters')
    @DefaultValue(null)
    @DataType('string')
    Suffix?: string;

    @DisplayName('Users can enter custom values')
    @Description('If enabled, empty fields for entering custom values are displayed on your site.')
    @DefaultValue(false)
    @DataType(KnownFieldTypes.ChipChoice)
    @ConditionalVisibility('{"operator":"Or","conditions":[{"fieldName":"RangeType","operator":"Equals","value":1 },{"fieldName":"FacetType","operator":"Contains","value":"Number" }]}')
    @Choice({ Choices: [{'Title':'Yes','Name':'Yes','Value':true,'Icon':null},{'Title':'No','Name':'No','Value':false,'Icon':null}] })
    DisplayCustomRange?: boolean;

    @DisplaySettings(true)
    @DataType('string')
    FacetType: string | null = null;
}

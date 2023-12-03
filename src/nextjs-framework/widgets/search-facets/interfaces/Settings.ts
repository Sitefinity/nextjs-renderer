import { NumberRange } from './NumberRange';
import { DateRange } from './DateRange';

export interface Settings {
    RangeType?: number;
    DateRanges: DateRange[];
    DateStep: string;
    NumberStep: number
    NumberRanges: NumberRange[];
    NumberRangesDecimal?: NumberRange[];
    Prefix?: string;
    Suffix?: string;
    DisplayCustomRange?: boolean;
    FacetType: string;
}

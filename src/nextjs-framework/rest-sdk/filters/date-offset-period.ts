export interface DateOffsetPeriod {
    DateFieldName: string;
    OffsetType: 'days' | 'weeks' | 'months' | 'years',
    OffsetValue: number
}

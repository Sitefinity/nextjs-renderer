import { CustomFacetRange } from './CustomFacetRange';
import { SitefinityFacetType } from './SitefinityFacetType';

export interface Facet {
    FieldName?: string;
    CustomIntervals?: CustomFacetRange[];
    IntervalRange?: string;
    FacetFieldType?: string;
    SitefinityFacetType: SitefinityFacetType;
}

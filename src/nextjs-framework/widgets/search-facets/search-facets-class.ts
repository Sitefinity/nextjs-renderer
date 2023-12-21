import { FacetElement } from './interfaces/FacetElement';
import { FacetField } from './interfaces/FacetField';
import { SearchIndexAdditonalFieldType } from './interfaces/SearchIndexAdditonalFieldType';

export class SearchFacets {
    private facetField?: FacetField;
    public FacetElements: FacetElement[] = [];
    public FacetTitle: string;
    public FacetFieldType: string;
    public FacetFieldName: string;

    constructor(facetField: FacetField, facetElements:  FacetElement[]) {
        this.facetField = facetField;
        this.FacetElements = facetElements;

        this.FacetTitle = facetField.FacetableFieldLabels;
        this.FacetFieldName = facetField.FacetableFieldNames[0];
        this.FacetFieldType = facetField.FacetFieldSettings!.FacetType!;
    }

  get ShowNumberCustomRange(): boolean | undefined {
    return this.facetField!.FacetFieldSettings!.DisplayCustomRange &&
        (this.FacetFieldType === SearchIndexAdditonalFieldType.NumberWhole ||
        this.FacetFieldType === SearchIndexAdditonalFieldType.NumberDecimal);
  }

  get ShowDateCustomRanges(): boolean | undefined {
    return this.facetField!.FacetFieldSettings!.RangeType === 1 &&
        this.facetField!.FacetFieldSettings!.DisplayCustomRange &&
        this.FacetFieldType === SearchIndexAdditonalFieldType.DateAndTime;
  }
}

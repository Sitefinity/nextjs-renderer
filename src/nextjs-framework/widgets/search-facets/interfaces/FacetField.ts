import { BasicValueTypes, DataModel, DataType, DefaultValue, Description, Dialog, DisplayName, KnownFieldTypes, Model } from '@progress/sitefinity-widget-designers-sdk';
import { Settings } from './Settings';

@Model()
export class FacetField {
    @DisplayName('Field')
    @DataType('facetTaxa')
    @DefaultValue(BasicValueTypes.StringArray)
    FacetableFieldNames:string[] = [];

    @Description('[{"Type":1,"Chunks":[{"Value":"Add a name of the facetable field that is","Presentation":[]},{"Value":"visible on your site.","Presentation":[]}]}]')
    @DisplayName('Label')
    @DefaultValue('')
    FacetableFieldLabels: string = '';

    @DisplayName('Configuration')
    @DataType(KnownFieldTypes.PencilButton)
    @Dialog('{"buttons":[{"type":"confirm", "title":"Save"}, {"type":"cancel", "title":"Cancel"}], "urlKey":"settings"}')
    @DataModel(Settings)
    FacetFieldSettings: Settings | null = null;
}

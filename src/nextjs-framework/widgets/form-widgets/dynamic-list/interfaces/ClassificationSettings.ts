import { TaxonSelectionMode } from './TaxonSelectionMode';

export interface ClassificationSettings
{
    selectedTaxonomyId: string;
    selectedTaxonomyUrl: string;
    selectedTaxonomyTitle: string;
    selectedTaxonomyName: string;
    selectionMode: TaxonSelectionMode;
    selectedTaxaIds: string[];
    byContentType: string;
}



import { LanguageEntry } from '@/components/language-selector/language-selector';
import { SearchResultDocumentDto } from './SearchResultDocumentDto';

export interface SearchResultsViewModel {
    SearchResults: SearchResultDocumentDto[];
    ResultsHeader: string;
    LanguagesLabel: string;
    ResultsNumberLabel: string;
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    CssClass?: string;
    Languages: LanguageEntry[];
    AllowUsersToSortResults: boolean;
    Sorting: string;
    SortByLabel: string;
    TotalCount?: number;
}

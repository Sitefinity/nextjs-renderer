import { CombinedFilter } from 'sitefinity-react-framework/sdk/filters/combined-filter';
import { FilterClause } from 'sitefinity-react-framework/sdk/filters/filter-clause';
import { RelationFilter } from 'sitefinity-react-framework/sdk/filters/relation-filter';
import { ContentListSettings } from 'sitefinity-react-framework/widgets/entities/content-list-settings';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { OffsetStyle } from '../styling/offset-style';
import { PageTitleMode } from './interfaces/PageTitleMode';
import { ContentViewDisplayMode } from './interfaces/DisplayMode';

export interface DocumentListEntity {
    SelectedItems: MixedContentContext;
    SfViewName: string;
    Margins?: OffsetStyle;
    ListSettings: ContentListSettings;
    OrderBy: string;
    DetailPageMode: 'SamePage' | 'ExistingPage',
    DetailPage: MixedContentContext;
    SfDetailViewName: string;
    ContentViewDisplayMode?: ContentViewDisplayMode;
    SelectionGroupLogicalOperator: 'AND' | 'OR';
    FilterExpression: CombinedFilter | FilterClause | RelationFilter | null;
    SortExpression: string;
    SelectExpression: string;
    DisableCanonicalUrlMetaTag: boolean;
    PagerMode: 'URLSegments' | 'QueryParameter';
    PagerTemplate: string;
    PagerQueryTemplate: string;
    CssClasses?: Array<{ FieldName: string, CssClass: string }>;
    SeoEnabled?: boolean;

    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    DownloadLinkLabel?: string;
    TitleColumnLabel?: string;
    TypeColumnLabel?: string;
    SizeColumnLabel?: string;
    OpenGraphType?: string;
    MetaTitle: string;
    MetaDescription: string;
    PageTitleMode?: PageTitleMode;
    OpenGraphEnabled?: boolean;
    OpenGraphTitle: string;
    OpenGraphDescription: string;
    OpenGraphImage: string;
    OpenGraphVideo: string;
}


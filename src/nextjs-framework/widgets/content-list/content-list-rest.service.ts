import { DetailItem, ContentContext, ContentVariation, ContentListSettings } from '../../editor';
import { ListDisplayMode } from '../../editor/widget-framework/list-display-mode';
import { CollectionResponse, SdkItem, FilterConverterService, CombinedFilter, FilterClause, RelationFilter, GetAllArgs, OrderBy, RestService, ServiceMetadata, FilterOperators } from '../../rest-sdk';
import { ContentListEntity } from './content-list-entity';

export class ContentListRestService {

    static getItems(entity: ContentListEntity, detailItem: DetailItem | undefined): Promise<CollectionResponse<SdkItem>> {
        if (entity.SelectedItems && entity.SelectedItems.Content && entity.SelectedItems.Content.length > 0
                && entity.SelectedItems.Content[0].Variations) {
            const selectedContent = entity.SelectedItems.Content[0];
            const variation = selectedContent.Variations![0];

            const mainFilter = FilterConverterService.getMainFilter(variation);
            const additionalFilter = entity.FilterExpression;
            const parentFilter = this.getParentFilterExpression(selectedContent, variation, detailItem);

            const filters: Array<CombinedFilter | FilterClause | RelationFilter | null> = [mainFilter, additionalFilter, parentFilter];
            let bigFilter: CombinedFilter = {
                Operator: entity.SelectionGroupLogicalOperator,
                ChildFilters: filters.filter(x => x) as Array<CombinedFilter | FilterClause>
            };

            const skipAndTakeParams = this.getSkipAndTake(entity, 1);
            const getAllArgs: GetAllArgs = {
                Skip: skipAndTakeParams.Skip,
                Take: skipAndTakeParams.Take,
                Count: skipAndTakeParams.Count,
                Type: selectedContent.Type,
                Provider: variation.Source,
                OrderBy: <OrderBy[]>[this.getOrderByExpression(entity)].filter(x => x),
                Fields: this.getSelectExpression(entity),
                Filter: bigFilter
            };

            return RestService.getItems(getAllArgs);
        };

        return Promise.resolve(({ Items: [], TotalCount: 0 }));
    }


    private static getParentFilterExpression(selectedContent: ContentContext, variation: ContentVariation, detailItem: DetailItem | undefined): FilterClause | null {
        let filterByParentExpressionSerialized = null;
        if (variation.DynamicFilterByParent) {
            let parentType = ServiceMetadata.getParentType(selectedContent.Type);

            if (parentType != null && detailItem && detailItem.ItemType === parentType) {
                return <FilterClause>{
                    FieldName: 'ParentId',
                    FieldValue: detailItem.Id,
                    Operator: FilterOperators.Equal
                };
            }
        }

        return filterByParentExpressionSerialized;
    }

    private static getSkipAndTake(entity: ContentListEntity, pageNumber: number): { Skip?: number, Take?: number, Count?: boolean, ShowPager?: boolean } {
        let retVal: { Skip?: number, Take?: number, ShowPager?: boolean, Count?: boolean } | null = {};
        let currentPage = 1;
        const settings = entity.ListSettings || new ContentListSettings();
        switch (settings.DisplayMode ) {
            case ListDisplayMode.Paging:
                retVal.ShowPager = true;
                retVal.Take = settings.ItemsPerPage;

                currentPage = pageNumber;

                if (currentPage > 1) {
                    retVal.Skip = settings.ItemsPerPage * (currentPage - 1);
                }

                retVal.Count = true;
                break;
            case ListDisplayMode.Limit:
                retVal.Take = settings.LimitItemsCount;
                break;
            default:
                break;
        }

        return retVal;
    }

    private static getOrderByExpression(entity: ContentListEntity): OrderBy | null {
        if (entity.OrderBy === 'Manually') {
            return null;
        }

        const sortExpression = entity.OrderBy === 'Custom' ?
            entity.SortExpression :
            entity.OrderBy;

        if (!sortExpression) {
            return null;
        }

        let sortExpressionParts = sortExpression.split(' ');
        if (sortExpressionParts.length !== 2) {
            return null;
        }

        let sortOrder = sortExpressionParts[1].toUpperCase();

        let orderBy: OrderBy = {
            Name: sortExpressionParts[0],
            Type: sortOrder
        };

        return orderBy;
    }

    private static getSelectExpression(entity: ContentListEntity): string[] {
        let splitExpressions = entity.SelectExpression.split(';');
        const fields = splitExpressions.map((split) => {
            return split.trim();
        });

        return fields;
    }
}

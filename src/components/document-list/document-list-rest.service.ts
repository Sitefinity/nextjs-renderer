import { CollectionResponse } from 'sitefinity-react-framework/sdk/dto/collection-response';
import { SdkItem } from 'sitefinity-react-framework/sdk/dto/sdk-item';
import { CombinedFilter } from 'sitefinity-react-framework/sdk/filters/combined-filter';
import { FilterClause, FilterOperators } from 'sitefinity-react-framework/sdk/filters/filter-clause';
import { OrderBy } from 'sitefinity-react-framework/sdk/filters/orderby';
import { RelationFilter } from 'sitefinity-react-framework/sdk/filters/relation-filter';
import { RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { ServiceMetadata } from 'sitefinity-react-framework/sdk/service-metadata';
import { DetailItem } from 'sitefinity-react-framework/sdk/services/detail-item';
import { GetAllArgs } from 'sitefinity-react-framework/sdk/services/get-all-args';
import { FilterConverterService } from 'sitefinity-react-framework/sdk/filters/filter-converter';
import { ContentVariation, ContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { DocumentListEntity } from './document-list-entity';

export class DocumentListRestService {

    static getItems(entity: DocumentListEntity, detailItem: DetailItem | null): Promise<CollectionResponse<SdkItem>> {
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


    private static getParentFilterExpression(selectedContent: ContentContext, variation: ContentVariation, detailItem: DetailItem | null): FilterClause | null {
        let filterByParentExpressionSerialized = null;
        if (variation.DynamicFilterByParent) {
            let parentType = ServiceMetadata.getParentType(selectedContent.Type);

            if (parentType != null && detailItem != null && detailItem.ItemType === parentType) {
                return <FilterClause>{
                    FieldName: 'ParentId',
                    FieldValue: detailItem.Id,
                    Operator: FilterOperators.Equal
                };
            }
        }

        return filterByParentExpressionSerialized;
    }

    private static getSkipAndTake(entity: DocumentListEntity, pageNumber: number): { Skip?: number, Take?: number, Count?: boolean, ShowPager?: boolean } {
        let retVal: { Skip?: number, Take?: number, ShowPager?: boolean, Count?: boolean } | null = {};
        let currentPage = 1;

        if (!entity.ListSettings) {
            return retVal;
        }

        switch (entity.ListSettings.DisplayMode) {
            case 'Paging':
                retVal.ShowPager = true;
                retVal.Take = entity.ListSettings.ItemsPerPage;

                currentPage = pageNumber;

                if (currentPage > 1) {
                    retVal.Skip = entity.ListSettings.ItemsPerPage * (currentPage - 1);
                }

                retVal.Count = true;
                break;
            case 'Limit':
                retVal.Take = entity.ListSettings.LimitItemsCount;
                break;
            default:
                break;
        }

        return retVal;
    }

    private static getOrderByExpression(entity: DocumentListEntity): OrderBy | null {
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

    private static getSelectExpression(entity: DocumentListEntity): string[] {
        if (!entity.SelectExpression){
            return ['*'];
        }

        const splitExpressions = entity.SelectExpression.split(';');
        const fields = splitExpressions.map((split) => {
            return split.trim();
        });

        return fields;
    }
}

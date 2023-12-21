import { RestSdkTypes, RestService } from '../rest-sdk/rest-service';
import { CollectionResponse } from '../rest-sdk/dto/collection-response';
import { SdkItem } from '../rest-sdk/dto/sdk-item';
import { GetAllArgs } from '../rest-sdk/services/get-all-args';
import { FilterTypes } from '../rest-sdk/filters/filter-types';
import { FilterConverterService } from '../rest-sdk/filters/filter-converter';
import { ContentContext, ContentVariation, MixedContentContext } from '../editor/widget-framework/mixed-content-context';

export class RestExtensionsService {
    public static async getContextItems (contentContext : MixedContentContext, getAllArgsSingle: GetAllArgs) {
        let typeGroups = contentContext.Content;

        if (!typeGroups || !typeGroups.length) {
            throw new Error('ContentContext item is not passed in MixedContentContext.');
        }

        if (typeGroups.length > 1) {
            let groupNames = typeGroups.join(',');
            throw new Error(`Cannot have two contexts for different types - ${groupNames}`);
        }

        let allVariations: any[] = contentContext.Content
            .filter((cxt: ContentContext) => cxt.Variations)
            .map((cxt: ContentContext) => cxt.Variations).flat();

        allVariations = this.mergeVariations(allVariations);

        const mergedContentContext: ContentContext = {
            Type: contentContext.Content[0].Type || getAllArgsSingle.Type,
            Variations: allVariations
        };
        contentContext.Content = [mergedContentContext];

        return this.getItemsFromContext(contentContext, { [mergedContentContext.Type]: getAllArgsSingle });
    };

   public static async getItemsFromContext (contentContext: MixedContentContext, getAllArgsPerType: {[key: string]: GetAllArgs}){
        const collectionContextForAll: CollectionResponse<SdkItem> = {
            TotalCount: 0,
            Items:[]
        };

        for (const context of contentContext.Content) {
            let argsLocal: GetAllArgs = {
                Type: context.Type
            };
            if (getAllArgsPerType !== null && context.Type) {
                argsLocal = getAllArgsPerType[context.Type];
            }

            if (context.Variations !== null && context.Variations.length > 0){
                for (const variation of context.Variations) {
                    argsLocal.Provider = variation.Source;
                    argsLocal.Filter = FilterConverterService.getMainFilter(variation);

                    let itemsForContext = await RestService.getItems(argsLocal);
                    itemsForContext.Items.forEach((dataItem: any)=> {
                        collectionContextForAll.Items.push(dataItem);
                    });

                    collectionContextForAll.TotalCount += itemsForContext.Items.length;
                };
            } else {
                let itemsForContext = await RestService.getItems(argsLocal);
                itemsForContext.Items.forEach((dataItem: any)=> {
                    collectionContextForAll.Items.push(dataItem);
                });

                collectionContextForAll.TotalCount +=  itemsForContext.Items.length;
            }
        }

        const orderedCollection: any[] = [];
        if (contentContext.ItemIdsOrdered !== null
            && contentContext.ItemIdsOrdered.length > 1
            && contentContext.ItemIdsOrdered.length === collectionContextForAll.Items.length) {
            contentContext.ItemIdsOrdered.forEach((id: string)=> {
                const orderedItem = collectionContextForAll.Items.find((x: any) => x.Id === id);

                if (orderedItem !== null) {
                    orderedCollection.push(orderedItem);
                }
            });

            if (orderedCollection.length === collectionContextForAll.Items.length){
                collectionContextForAll.Items = orderedCollection;
            }
        }

        return collectionContextForAll;
    };

    public static mergeVariations = (contentVariations: ContentVariation[]) => {
        const allMergedGroups: ContentVariation[] = [];
        const sourceGroups = contentVariations.reduce((group: any, contentVariation) => {
            const { Source } = contentVariation;
                group[Source] = group[Source] ?? [];
                group[Source].push(contentVariation);
            return group;
        }, {});

        for (const [key, sourceGroup] of Object.entries(sourceGroups)) {
            const groupsToMerge: ContentVariation[] = [];
            (sourceGroup as ContentVariation[]).forEach((group: ContentVariation) => {
                if (group.Filter.Key === FilterTypes.Ids) {
                    groupsToMerge.push(group);
                }
            });

            if (groupsToMerge.length > 1) {
                allMergedGroups.push(...groupsToMerge);
                const filter = groupsToMerge.map(x => x.Filter.Value).join(',');
                const mergedGroup: ContentVariation = {
                    Source: key,
                    Filter: { Key: FilterTypes.Ids, Value: filter }
                };

                contentVariations.push(mergedGroup);
            }
        }

        allMergedGroups.forEach((mergedGroup: ContentVariation) =>{
            contentVariations.filter((cv: ContentVariation) =>{
                return !(mergedGroup.Source === cv.Source && mergedGroup.Filter === cv.Filter);
            });
        });

        return contentVariations;
    };

    public static getPageNodeUrl = async (page: MixedContentContext) => {
        if (!page.Content || !page.Content.length) {
            return '';
        }

        const variations = page.Content[0].Variations;
        if (variations && variations.length !== 0){
            const mainFilter = FilterConverterService.getMainFilter(variations[0]);
            const pageNodes = await this.getContextItems(page, {
                Type: RestSdkTypes.Pages,
                Fields: ['ViewUrl'],
                Filter: mainFilter
            });
            const items = pageNodes.Items;
            if (items.length === 1){
                return  items[0].ViewUrl;
            }
        }

        return '';
    };
}

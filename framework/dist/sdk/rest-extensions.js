import { RestService } from './rest-service';
import { FilterTypes } from './filters/filter-types';
import { FilterConverterService } from './filters/filter-converter';
export class RestExtensionsService {
    static async getContextItems(contentContext, getAllArgsSingle) {
        let typeGroups = contentContext.Content;
        if (typeGroups.length > 1) {
            let groupNames = typeGroups.join(',');
            throw new Error(`Cannot have two contexts for different types - ${groupNames}`);
        }
        let allVariations = contentContext.Content
            .filter((cxt) => cxt.Variations)
            .map((cxt) => cxt.Variations).flat();
        allVariations = this.mergeVariations(allVariations);
        const mergedContentContext = {
            Type: contentContext.Content[0].Type || getAllArgsSingle.Type,
            Variations: allVariations
        };
        contentContext.Content = [mergedContentContext];
        return this.getItemsFromContext(contentContext, { [mergedContentContext.Type]: getAllArgsSingle });
    }
    ;
    static async getItemsFromContext(contentContext, getAllArgsPerType) {
        const collectionContextForAll = {
            TotalCount: 0,
            Items: []
        };
        for (const context of contentContext.Content) {
            let argsLocal = {
                Type: context.Type
            };
            if (getAllArgsPerType !== null && context.Type) {
                argsLocal = getAllArgsPerType[context.Type];
            }
            if (context.Variations !== null && context.Variations.length > 0) {
                for (const variation of context.Variations) {
                    argsLocal.Provider = variation.Source;
                    argsLocal.Filter = FilterConverterService.getMainFilter(variation);
                    let itemsForContext = await RestService.getItems(argsLocal);
                    itemsForContext.Items.forEach((dataItem) => {
                        collectionContextForAll.Items.push(dataItem);
                    });
                    collectionContextForAll.TotalCount += itemsForContext.Items.length;
                }
                ;
            }
            else {
                let itemsForContext = await RestService.getItems(argsLocal);
                itemsForContext.Items.forEach((dataItem) => {
                    collectionContextForAll.Items.push(dataItem);
                });
                collectionContextForAll.TotalCount += itemsForContext.Items.length;
            }
        }
        const orderedCollection = [];
        if (contentContext.ItemIdsOrdered !== null
            && contentContext.ItemIdsOrdered.length > 1
            && contentContext.ItemIdsOrdered.length === collectionContextForAll.Items.length) {
            contentContext.ItemIdsOrdered.forEach((id) => {
                const orderedItem = collectionContextForAll.Items.find((x) => x.Id === id);
                if (orderedItem !== null) {
                    orderedCollection.push(orderedItem);
                }
            });
            if (orderedCollection.length === collectionContextForAll.Items.length) {
                collectionContextForAll.Items = orderedCollection;
            }
        }
        return collectionContextForAll;
    }
    ;
    static mergeVariations = (contentVariations) => {
        const allMergedGroups = [];
        const sourceGroups = contentVariations.reduce((group, contentVariation) => {
            const { Source } = contentVariation;
            group[Source] = group[Source] ?? [];
            group[Source].push(contentVariation);
            return group;
        }, {});
        for (const [key, sourceGroup] of Object.entries(sourceGroups)) {
            const groupsToMerge = [];
            sourceGroup.forEach((group) => {
                if (group.Filter.Key === FilterTypes.Ids) {
                    groupsToMerge.push(group);
                }
            });
            if (groupsToMerge.length > 1) {
                allMergedGroups.push(...groupsToMerge);
                const filter = groupsToMerge.map(x => x.Filter.Value).join(',');
                const mergedGroup = {
                    Source: key,
                    Filter: { Key: FilterTypes.Ids, Value: filter }
                };
                contentVariations.push(mergedGroup);
            }
        }
        allMergedGroups.forEach((mergedGroup) => {
            contentVariations.filter((cv) => {
                return !(mergedGroup.Source === cv.Source && mergedGroup.Filter === cv.Filter);
            });
        });
        return contentVariations;
    };
}
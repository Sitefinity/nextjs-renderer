import { RequestContext } from '../../editor';
import { CollectionResponse, RestSdkTypes, RestService, SdkItem } from '../../rest-sdk';
import { BreadcrumbEntity, BreadcrumbIncludeOption } from './breadcrumb';

export class BreadcrumbRestService {

    static getItems(entity: BreadcrumbEntity, requestContext: RequestContext): {value: CollectionResponse<SdkItem>[]} {
        if (entity && requestContext.pageNode) {
            const getAllArgs: {[key: string]: boolean | string} = {
                addStartingPageAtEnd: entity.AddCurrentPageLinkAtTheEnd || true,
                addHomePageAtBeginning: entity.AddHomePageLinkAtBeginning || true,
                includeGroupPages: entity.IncludeGroupPages || false,
                currentPageId: requestContext.pageNode.Id
            };


            if (requestContext.pageNode.DetailItem !== null && entity.AllowVirtualNodes) {
                    let stringifiedItem = requestContext.pageNode.DetailItem;
                    getAllArgs['detailItemInfo'] = stringifiedItem;
                }

            if (entity.BreadcrumbIncludeOption === BreadcrumbIncludeOption.SpecificPagePath
                && entity.SelectedPage!.ItemIdsOrdered && entity.SelectedPage!.ItemIdsOrdered.length > 0) {
                 getAllArgs['startingPageId'] = entity.SelectedPage!.ItemIdsOrdered[0];
            }

            if (requestContext) {
                const queryString =  new URLSearchParams(requestContext.searchParams);
                const url = `${requestContext.pageNode.MetaInfo.CanonicalUrl}?${queryString}`;

                getAllArgs['currentPageUrl'] = encodeURIComponent(url).toLowerCase();
            }

            const action = 'Default.GetBreadcrumb';

            return RestService.getCustomItems(RestSdkTypes.Pages, action, getAllArgs);
        }
       return { value: [] as any };
    }
}

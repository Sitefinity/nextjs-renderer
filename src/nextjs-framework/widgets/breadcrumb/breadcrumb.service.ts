import { RequestContext } from '../../editor';
import { CollectionResponse, RestSdkTypes, RestService, SdkItem } from '../../rest-sdk';
import { BreadcrumbEntity, BreadcrumbIncludeOption } from './breadcrumb';

export class BreadcrumbRestService {

    static getItems(entity: BreadcrumbEntity, requestContext: RequestContext): {value: CollectionResponse<SdkItem>[]} {
        if (entity && requestContext.layout) {
            const getAllArgs: {[key: string]: boolean | string} = {
                addStartingPageAtEnd: entity.AddCurrentPageLinkAtTheEnd || true,
                addHomePageAtBeginning: entity.AddHomePageLinkAtBeginning || true,
                includeGroupPages: entity.IncludeGroupPages || false,
                currentPageId: requestContext.layout.Id
            };


            if (requestContext.layout.DetailItem !== null && entity.AllowVirtualNodes) {
                    let stringifiedItem = requestContext.layout.DetailItem;
                    getAllArgs['detailItemInfo'] = JSON.stringify(stringifiedItem);
                }

            if (entity.BreadcrumbIncludeOption === BreadcrumbIncludeOption.SpecificPagePath
                && entity.SelectedPage!.ItemIdsOrdered && entity.SelectedPage!.ItemIdsOrdered.length > 0) {
                 getAllArgs['startingPageId'] = entity.SelectedPage!.ItemIdsOrdered[0];
            }

            if (requestContext) {
                const queryString =  new URLSearchParams(requestContext.searchParams);
                const url = `${requestContext.layout.MetaInfo.CanonicalUrl}?${queryString}`;

                getAllArgs['currentPageUrl'] = encodeURIComponent(url).toLowerCase();
            }

            const action = 'Default.GetBreadcrumb';

            return RestService.getCustomItems(RestSdkTypes.Pages, action, getAllArgs);
        }
       return { value: [] as any };
    }
}

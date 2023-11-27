import { CollectionResponse } from '@progress/sitefinity-react-framework';
import { RestService, RestSdkTypes } from '@progress/sitefinity-react-framework';
import { SdkItem } from '@progress/sitefinity-react-framework';
import { BreadcrumbEntity, BreadcrumbIncludeOption } from './breadcrumb';

export class BreadcrumbRestService {

    static getItems(entity: BreadcrumbEntity, model?: any, requestContext?: any): {value: CollectionResponse<SdkItem>[]} {
        if (entity && requestContext.pageNode) {
            const getAllArgs: any = {
                addStartingPageAtEnd: entity.AddCurrentPageLinkAtTheEnd || true,
                addHomePageAtBeginning: entity.AddHomePageLinkAtBeginning || true,
                includeGroupPages: entity.IncludeGroupPages || false,
                currentPageId: requestContext.pageNode.Id
            };

            if (requestContext.pageNode.DetailItem !== null && entity.AllowVirtualNodes) {
                    let stringifiedItem = requestContext.pageNode.DetailItem;
                    getAllArgs['detailItemInfo'] = stringifiedItem;
                }

            if (entity.BreadcrumbIncludeOption === BreadcrumbIncludeOption.SpecificPagePath && entity.SelectedPage.ItemIdsOrdered.Length > 0) {
                 getAllArgs['startingPageId'] = entity.SelectedPage.ItemIdsOrdered[0];
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

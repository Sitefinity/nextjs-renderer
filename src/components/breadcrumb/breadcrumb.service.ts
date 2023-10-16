import { CollectionResponse } from "@/framework/sdk/dto/collection-response";
import { RestService, RestSdkTypes } from "@/framework/sdk/rest-service";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";
import { BreadcrumbEntity } from "./breadcrumb";

export class BreadcrumbRestService {

    static getItems(entity: BreadcrumbEntity, model?: any, requestContext?: any): Promise<CollectionResponse<SdkItem>> {

        if(entity && requestContext.pageNode) {
            const getAllArgs: any = {
                addStartingPageAtEnd: entity.AddCurrentPageLinkAtTheEnd || true,
                addHomePageAtBeginning: entity.AddHomePageLinkAtBeginning || true,
                includeGroupPages: entity.IncludeGroupPages || false,
                currentPageId: requestContext.pageNode.Id,
            }

            if (requestContext.pageNode.DetailItem !== null && entity.AllowVirtualNodes)
                {
                    var stringifiedItem = this.requestContext.pageNode.DetailItem;
                    getAllArgs['detailItemInfo'] = stringifiedItem;
                }

            // if (entity.BreadcrumbIncludeOption == BreadcrumbIncludeOption.SpecificPagePath && entity.SelectedPage.ItemIdsOrdered.Length > 0)
            // args.AdditionalQueryParams.Add("startingPageId", entity.SelectedPage.ItemIdsOrdered[0]);

            //     args.AdditionalQueryParams.Add("currentPageUrl", HttpUtility.UrlEncode(this.httpContextAccessor.HttpContext.Request.GetEncodedUrl()));



            const action = 'Default.GetBreadcrumb';

            return RestService.getCustomItems(RestSdkTypes.Pages, action, getAllArgs);
        }
       return Promise.resolve(({ Items: [], TotalCount: 0 }));
    }
}

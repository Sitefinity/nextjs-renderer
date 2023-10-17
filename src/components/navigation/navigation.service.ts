import { CollectionResponse } from "@/framework/sdk/dto/collection-response";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";
import { RestService, RestSdkTypes } from "@/framework/sdk/rest-service";
import { NavigationEntity } from "./navigation";
import { RequestContext } from "next/dist/server/base-server";

export class NavigationRestService {

    static getItems(entity: NavigationEntity, model?: any, requestContext: any): Promise<CollectionResponse<SdkItem>> {
        if(entity) {
            let selectedPageId = entity.SelectedPage && entity.SelectedPage.ItemIdsOrdered !== null && entity.SelectedPage.ItemIdsOrdered.length == 1
                ? entity.SelectedPage.ItemIdsOrdered[0]
                : null;
            if (!selectedPageId){
                selectedPageId = '';
            }

            const getAllArgs: any = {
                selectionModeString: entity.SelectionMode || "",
                levelsToInclude: entity.LevelsToInclude || 1,
                showParentPage: entity.ShowParentPage || false,
                selectedPageId: selectedPageId,
                'sf_page_node':requestContext.pageNode.Id,
                selectedPages: JSON.stringify(entity.CustomSelectedPages.ItemIdsOrdered)
            };
            const action = 'Default.HierarhicalByLevelsResponse'

            return RestService.getCustomItems(RestSdkTypes.Pages, action, getAllArgs);
        }
       return Promise.resolve(({ Items: [], TotalCount: 0 }));
    }
}

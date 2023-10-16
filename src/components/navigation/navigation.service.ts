import { CollectionResponse } from "@/framework/sdk/dto/collection-response";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";
import { RestService } from "@/framework/sdk/rest-service";
import { NavigationEntity } from "./navigation";
import { RequestContext } from "next/dist/server/base-server";

export class NavigationRestService {

    static getItems(entity: NavigationEntity, model?: any): Promise<CollectionResponse<SdkItem>> {
        if(entity) {
            const getAllArgs: any = {
                selectionModeString: entity.SelectionMode || "",
                levelsToInclude: entity.LevelsToInclude || 1,
                showParentPage: entity.ShowParentPage || false,
            //  selectedPageId: "", // selectedPageId || "",
                'sf_page_node': model.Id,
            //  selectedPages: entity.CustomSelectedPages.ItemIdsOrdered
            };
            const action = 'Default.HierarhicalByLevelsResponse()'

            return RestService.getPages(action, getAllArgs);
        }
       return Promise.resolve(({ Items: [], TotalCount: 0 }));
    }
}

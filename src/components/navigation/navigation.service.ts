import { CollectionResponse } from "@/framework/sdk/dto/collection-response";
import { SdkItem } from "@/framework/sdk/dto/sdk-item";
import { CombinedFilter } from "@/framework/sdk/filters/combined-filter";
import { FilterClause, FilterOperators } from "@/framework/sdk/filters/filter-clause";
import { OrderBy } from "@/framework/sdk/filters/orderby";
import { RelationFilter } from "@/framework/sdk/filters/relation-filter";
import { RestService } from "@/framework/sdk/rest-service";
import { ServiceMetadata } from "@/framework/sdk/service-metadata";
import { DetailItem } from "@/framework/sdk/services/detail-item";
import { GetAllArgs } from "@/framework/sdk/services/get-all-args";
import { ContentVariation, ContentContext } from "@/framework/widgets/entities/mixed-content-context";
import { NavigationEntity } from "./navigation";
import { RequestContext } from "next/dist/server/base-server";

export class NavigationRestService {

    static getItems(entity: NavigationEntity, model?: any): Promise<CollectionResponse<SdkItem>> {
        const getAllArgs: any = {
            selectionModeString: entity.SelectionMode || "",
            levelsToInclude: entity.LevelsToInclude || 1,
            showParentPage: entity.ShowParentPage || false,
       //     selectedPageId: "", // selectedPageId || "",
            'sf_page_node': model.Id,
           //  selectedPages: entity.CustomSelectedPages.ItemIdsOrdered
        };

        return RestService.getPages(getAllArgs);

        // }
     //   return Promise.resolve(({ Items: [], TotalCount: 0 }));
    }
}

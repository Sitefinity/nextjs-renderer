
import { SdkItem, RestService, RestSdkTypes } from '../../rest-sdk';
import { NavigationEntity } from './navigation';

export class NavigationRestService {

    static getItems(entity: NavigationEntity, model: any, requestContext: any): {value: SdkItem[]} {
        if (entity) {
            let selectedPageId = entity.SelectedPage && entity.SelectedPage.ItemIdsOrdered !== null && entity.SelectedPage.ItemIdsOrdered.length === 1
                ? entity.SelectedPage.ItemIdsOrdered[0]
                : null;
            if (!selectedPageId){
                selectedPageId = '';
            }

            const getAllArgs: any = {
                selectionModeString: entity.SelectionMode || '',
                levelsToInclude: entity.LevelsToInclude || 1,
                showParentPage: entity.ShowParentPage || false,
                selectedPageId: selectedPageId,
                'sf_page_node':requestContext.layout.Id,
                selectedPages: entity.CustomSelectedPages ? JSON.stringify(entity.CustomSelectedPages.ItemIdsOrdered): undefined
            };
            const action = 'Default.HierarhicalByLevelsResponse';

            return RestService.getCustomItems(RestSdkTypes.Pages, action, getAllArgs);
        }
        return { value: [] as any };
    }
}

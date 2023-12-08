
import { RestService } from '../../rest-sdk';
import { TaxaPageViewModel } from './classification';
import { ClassificationEntity } from './classification-entity';

export class ClassificationRestService {

    static getTaxons(entity: ClassificationEntity): {value: TaxaPageViewModel[]} {
        const settings = entity.ClassificationSettings;
        if (settings &&  settings.selectedTaxonomyId) {
            const showEmpty = entity.ShowEmpty || false;
            const showCount = entity.ShowItemCount || true;
            let orderBy = entity.OrderBy || 'Title ASC';

            if (orderBy === 'Custom') {
                orderBy = entity.SortExpression || '';
            } else if (orderBy === 'Manually'){
                orderBy = 'Ordinal';
            }

            const additionalParams = {
                'showEmpty': showEmpty,
                '$orderby': orderBy,
                '@param': `[${(settings.selectedTaxaIds || []).map(x => `'${x}'`).toString()}]`
            };
            const taxonomyUrl = settings.selectedTaxonomyUrl;
            const contentText = `taxonomyId=${settings.selectedTaxonomyId},selectedTaxaIds=@param,selectionMode='${settings.selectionMode}',contentType='${settings.byContentType}'`;
            const action = 'Default.GetTaxons';
            return RestService.getCustomItems(taxonomyUrl!, action, additionalParams, contentText);

        }
        return { value: [] };
    }
}

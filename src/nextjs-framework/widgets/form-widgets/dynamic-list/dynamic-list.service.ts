
import { GetAllArgs, RestService, SdkItem } from '../../../rest-sdk';
import { ChoiceOption } from '../common/ChoiceOption';
import { DynamicListEntity } from './dynamic-list';
import { Selection } from './interfaces/selection';


export class DynamicListService {

    static async getChoiceItems(entity: DynamicListEntity) {
        let items: SdkItem[] = [];
        let defaultFieldName: string = '';
        if (entity.ListType === Selection.Classification) {
            const taxons = await this.getClassifications(entity);
            items = taxons.value;
            defaultFieldName = 'Title';
        } else if (entity.ListType === Selection.Content) {
            let result = await this.getContent(entity);
            // items = result.Item1;
            // defaultFieldName = result.Item2;
        }

        return this.getChoices(items, defaultFieldName, entity);

    }
    static async getContent(entity: DynamicListEntity): Promise<{ value: SdkItem[]}> {
        if (entity.SelectedContent != null &&
            entity.SelectedContent.Content != null &&
            entity.SelectedContent.Content.length > 0 &&
            entity.SelectedContent.Content[0].Type != null) {
            let itemType = entity.SelectedContent.Content[0].Type;
       //     var defaultFieldName = (this.restClient as RestClient).ServiceMetadata.GetDefaultFieldName(itemType);
            const getAllArgs: GetAllArgs = {
                OrderBy: [],
                Type: itemType
            };


            const orderBy = this.getOrderByExpressionForContent(entity);
            if (orderBy !== null) {
                getAllArgs.OrderBy!.push(orderBy.Type as any);
            }

            let items = await RestService.getItems(getAllArgs);
        }

        return { value: []};
    }
     static getOrderByExpressionForContent(entity: DynamicListEntity) {
        if (entity.OrderByContent === 'Manually') {
            console.log(1);
            return null;
        }

        let sortExpression = entity.OrderByContent === 'Custom' ? entity.SortExpression : entity.OrderByContent;

        if (!sortExpression) {
            return null;
        }

        let sortExpressionParts = sortExpression!.split(' ');
        if (sortExpressionParts.length !== 2) {

            return null;
        }
        console.log(3, sortExpressionParts);
        let sortOrder = sortExpressionParts[1].toLowerCase() === 'ASC' ? 'asc' : 'desc';
        let orderBy = { Name: sortExpressionParts[0], Type: sortOrder };

        return orderBy;
    }

    static async getClassifications(entity: DynamicListEntity): Promise<{ value: SdkItem[]}> {
        const settings = entity.ClassificationSettings;

        if (settings &&  settings.selectedTaxonomyId) {
            let orderBy = entity.OrderBy || 'Title ASC';

            if (orderBy === 'Custom') {
                orderBy = entity.SortExpression || '';
            } else if (orderBy === 'Manually'){
                orderBy = 'Ordinal';
            }

            const additionalParams = {
                'showEmpty': 'True',
                '$orderby': orderBy,
                '@param': `[${(settings.selectedTaxaIds || []).map(x => `'${x}'`).toString()}]`
            };
            const taxonomyUrl = settings.selectedTaxonomyUrl;
            const contentText = `taxonomyId=${settings.selectedTaxonomyId},selectedTaxaIds=@param,selectionMode='${settings.selectionMode}',contentType='${settings.byContentType}'`;
            const action = 'Default.GetTaxons';
            return RestService.getCustomItems(taxonomyUrl, action, additionalParams, contentText);

        }
        return { value: []};
    }

    static getChoices(items: SdkItem[], defaultFieldName: string, entity: DynamicListEntity) : ChoiceOption[] {
        if (!items){
            return [];
        }

        const returnVal = items.map(x =>{
            const option: ChoiceOption = {
                Name: x[defaultFieldName],
                Value: entity.ValueFieldName && x[entity.ValueFieldName] ? x[entity.ValueFieldName] : x[defaultFieldName],
                Selected: false
            };


            return option;
        });

        if (entity.SfViewName === 'Dropdown' && returnVal.length > 0) {
            returnVal.unshift({ Name: 'Select', Value: '', Selected: true });
        }

        return returnVal;
    }
}

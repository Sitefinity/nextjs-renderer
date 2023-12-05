
import { RestSdkTypes, RestService, SdkItem } from '../../rest-sdk';
import { FormEntity } from './form';
import { FormDto } from './interfaces/FormDto';
import { FormRuleAction } from './interfaces/FormRuleAction';

export class FormRestService {

    static formRuleActionsToEncrypt: {[key: string]: number} = {
        [FormRuleAction.ShowMessage]: 0,
        [FormRuleAction.SendNotification]: 0
    };
    static async getItem(entity: FormEntity)  {
        const id = entity.SelectedItems.ItemIdsOrdered![0];
        const provider = entity.SelectedItems.Content[0].Variations![0].Source;

        return RestService.getItem(RestSdkTypes.Form, id, provider);
    }

    static async getModel(sdkItem: SdkItem, queryString: {[key:string]: string})  {
        const argsLocal = {
            Name: 'Default.Model()',
            Type: 'forms',
            Id: sdkItem.Id,
            AdditionalQueryParams: {
                ...queryString
            }
        };

        const response: { value: any } = await RestService.getBoundType(argsLocal);
        return response;
    }

    static async getPage(entity: FormEntity)  {
        const id = entity.RedirectPage.ItemIdsOrdered![0];
        const provider = entity.RedirectPage.Content[0].Variations![0].Source;

        return RestService.getItem(RestSdkTypes.Pages, id, provider);
    }

    static getFormRulesViewModel(form: FormDto): string {
        if (!form.Rules) {
            return form.Rules;
        }

        const actionIndexList = {...this.formRuleActionsToEncrypt};
        const rules = JSON.parse(form.Rules);
        for (let rule of rules) {
            for (let action of rule['Actions']) {
                let ruleAction = action['Action'];
                if (Object.keys(this.formRuleActionsToEncrypt).includes(ruleAction)) {
                    action['Target'] = `sf_${ruleAction}_${actionIndexList[ruleAction]}`;
                    actionIndexList[ruleAction]++;
                }
            }
        }

        return rules;
    }

    static getHiddenFields(formModel: any){ // PageModel
        const hiddenFields = formModel.AllViewComponentsFlat
            .filter((x :any) => x.Properties.Hidden)
            .map((x :any) => x.Properties.SfFieldName);

        return hiddenFields;
    }

    static buildFormComponents(formModel: any) {
        return {
            HasLazyComponents: formModel.ComponentContext.HasLazyComponents,
            ViewComponentsFlat:formModel.ComponentContext.Components,
            AllViewComponentsFlat:formModel.ComponentContext.Components,
            Culture: formModel.Culture,
            DetailItem :formModel.DetailItem,
            Id: formModel.Id,
            MetaInfo: formModel.MetaInfo,
            Scripts: formModel.Scripts,
            SiteId: formModel.SiteId,
            TemplateName: formModel.TemplateName,
            UrlParameters: formModel.UrlParameters
        };
    }
}

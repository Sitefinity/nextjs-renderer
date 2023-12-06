import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { MixedContentContext, WidgetContext, WidgetModel, classNames, htmlAttributes } from '../../editor';
import { FormSubmitAction } from './interfaces/FormSubmitAction';
import { FormRestService } from './form.service';
import { FormDto } from './interfaces/FormDto';
import { StylingConfig } from '../styling/styling-config';
import { RestExtensionsService } from '../rest-extensions';
import { RenderWidgetService } from '../../services/render-widget-service';
import { QueryParamNames } from '../../rest-sdk/query-params-names';
import { FormModel } from './interfaces/FormModel';


export async function Form(props: WidgetContext<FormEntity>) {
    const entity = {
        SuccessMessage: 'Thank you for filling out our form.',
        ...props.model.Properties
    };
    const context = props.requestContext;
    const searchParams = context.searchParams;

    const viewModel: FormViewModel = {
        CustomSubmitAction: false,
        VisibilityClasses: StylingConfig.VisibilityClasses,
        InvalidClass: StylingConfig.InvalidClass
    };
    const restService = props.restService || FormRestService;
    let formDto;
    let formModel;
    const queryParams = {...searchParams};
    if (entity.SelectedItems?.ItemIdsOrdered?.length === 1) {
        formDto = await restService.getItem(entity);

        if (searchParams && searchParams['sf-content-action']) {
            viewModel.SkipDataSubmission = true;
            queryParams['sf-content-action'] = encodeURIComponent(searchParams['sf-content-action']);
        }

        if (!context.isLive) {
            viewModel.SkipDataSubmission = true;
        }

        try {
            formModel = await restService.getModel(formDto as FormDto, {});
        } catch (err) {
            if (context.isEdit) {
                queryParams[QueryParamNames.Action] = 'edit';
                formModel = await restService.getModel(formDto as FormDto, {});
                viewModel.Warning = 'This form is a Draft and will not be displayed on the site until you publish the form.';
            } else {
                throw err;
            }
        }

        viewModel.FormModel = restService.buildFormComponents(formModel);
        viewModel.Rules = restService.getFormRulesViewModel(formDto);
        viewModel.SubmitUrl = `/forms/submit/${formDto.Name}/${context.culture}?${searchParams![QueryParamNames.Site]}=${context.pageNode.SiteId}&${searchParams![QueryParamNames.SiteTempFlag]}=true`;

        if (entity.FormSubmitAction === FormSubmitAction.Redirect) {
            viewModel.CustomSubmitAction = true;

            viewModel.RedirectUrl = await RestExtensionsService.getPageNodeUrl(entity.RedirectPage);

        } else if (entity.FormSubmitAction === FormSubmitAction.Message) {
            viewModel.CustomSubmitAction = true;
            viewModel.SuccessMessage = entity.SuccessMessage;
        }

        viewModel.HiddenFields = restService.getHiddenFields(viewModel.FormModel).join(',');
        viewModel.Attributes = entity.Attributes;
    }

    const dataAttributes = htmlAttributes(props);
    const defaultClass = entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
    );

    if (props.requestContext && props.requestContext.isEdit) {
        dataAttributes['data-sfemptyicon'] = 'plus-circle';
        dataAttributes['data-sfemptyiconaction'] = 'Edit';
    }

    dataAttributes['data-sfemptyicontext'] = 'Select a form';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    return (<form action={viewModel.SubmitUrl} method="post" {...dataAttributes} noValidate={true}>
      <div className={viewModel.CssClass}
        data-sf-role="form-container"
        data-sf-invalid={viewModel.InvalidClass}
            // data-sf-visibility-inline-visible="@Model.VisibilityClasses[Progress.Sitefinity.AspNetCore.Configuration.VisibilityStyle.InlineVisible]"
            // data-sf-visibility-hidden="@Model.VisibilityClasses[Progress.Sitefinity.AspNetCore.Configuration.VisibilityStyle.Hidden]"
            // data-sf-visibility-visible="@Model.VisibilityClasses[Progress.Sitefinity.AspNetCore.Configuration.VisibilityStyle.Visible]">
            >
        { (viewModel.Rules) && <>
          <input type="hidden" data-sf-role="form-rules" value={viewModel.Rules} />
          <input type="hidden" data-sf-role="form-rules-hidden-fields" name="sf_FormHiddenFields" value={viewModel.HiddenFields} autoComplete="off"/>
          <input type="hidden" data-sf-role="form-rules-skip-fields" name="sf_FormSkipFields" autoComplete="off"/>
          <input type="hidden" data-sf-role="form-rules-notification-emails" name="sf_FormNotificationEmails" autoComplete="off"/>
          <input type="hidden" data-sf-role="form-rules-message" name="sf_FormMessage" autoComplete="off"/>
          <input type="hidden" data-sf-role="form-rules-redirect-page" name="sf_FormRedirectPage" autoComplete="off"/>
        </>
                }

        <input type="hidden" data-sf-role="redirect-url" value={viewModel.RedirectUrl} />
        <input type="hidden" data-sf-role="custom-submit-action" value={viewModel.CustomSubmitAction!.toString()} />
        <div data-sf-role="success-message" className="valid-feedback" role="alert" aria-live="assertive">{viewModel.SuccessMessage}</div>
        <div data-sf-role="error-message" className="invalid-feedback" role="alert" aria-live="assertive" />
        <div data-sf-role="loading" style={{display: 'none'}}>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        { viewModel.SkipDataSubmission &&
        <span data-sf-role="skip-data-submission" />
                }
        <div data-sf-role="fields-container" data-sfcontainer={true} not-editable="true"
                // container-context={viewModel.FormModel.ContainerContext("Body", null)}
                >
          { viewModel.FormModel && viewModel.FormModel.ViewComponentsFlat.map((widgetModel: WidgetModel<any>, idx: number)=>{
                        return RenderWidgetService.createComponent(widgetModel, context);
                    })}
        </div>
      </div>
    </form>);
}

export interface FormViewModel {
    CssClass?: string;
    FormModel?: FormModel;
    SubmitUrl?: string;
    CustomSubmitAction: boolean;
    RedirectUrl?: string;
    SuccessMessage?: string;
    Warning?: string;
    SkipDataSubmission?: boolean;
    Rules?: string;
    InvalidClass?: string;
    HiddenFields?: string;
    Attributes?:{ [key: string]: Array<{ Key: string, Value: string}> };
    VisibilityClasses: {[key: number]: string};
}

export interface FormEntity {
    SelectedItems: MixedContentContext;
    FormSubmitAction: FormSubmitAction;
    SuccessMessage?: string;
    RedirectPage: MixedContentContext;
    Margins: OffsetStyle;
    CssClass?: string;
    Attributes?:{ [key: string]: Array<{ Key: string, Value: string}> };
}

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
import { FormContainer } from './form-container';


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
        viewModel.SubmitUrl = `/forms/submit/${formDto.Name}/${context.culture}?${QueryParamNames.Site}=${context.layout.SiteId}&${QueryParamNames.SiteTempFlag}=true`;

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

    const formDataAttributes = htmlAttributes(props);

    const defaultClass = entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const containerClass = classNames(
        defaultClass,
        marginClass
    );

    if (props.requestContext && props.requestContext.isEdit) {
        formDataAttributes['data-sfemptyicon'] = 'plus-circle';
        formDataAttributes['data-sfemptyiconaction'] = 'Edit';
    }

    formDataAttributes['data-sfemptyicontext'] = 'Select a form';
    formDataAttributes['data-sfiscontentwidget'] = true;
    formDataAttributes['data-sfhasquickeditoperation'] = true;

    return (<form action={viewModel.SubmitUrl} method="post" {...formDataAttributes}  noValidate={true}>
      { entity.Heading && <h3 className="qu-heading-medium">{entity.Heading}</h3>}
      <FormContainer
        viewModel={viewModel}
        className={containerClass}>
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
        <div data-sf-role="fields-container" >
          { viewModel.FormModel && viewModel.FormModel.ViewComponentsFlat.map((widgetModel: WidgetModel<any>, idx: number)=>{
               return RenderWidgetService.createComponent(widgetModel, context);
            })
          }
        </div>
      </FormContainer>
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
    Heading?: string;
    SelectedItems: MixedContentContext;
    FormSubmitAction: FormSubmitAction;
    SuccessMessage?: string;
    RedirectPage: MixedContentContext;
    Margins: OffsetStyle;
    CssClass?: string;
    Attributes?:{ [key: string]: Array<{ Key: string, Value: string}> };
}

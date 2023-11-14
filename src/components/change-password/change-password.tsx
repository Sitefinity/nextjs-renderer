import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { PostPasswordChangeAction } from './interfaces/PostPasswordChangeAction';
import { StylingConfig } from '../styling/styling-config';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';
import { RestExtensionsService } from 'sitefinity-react-framework/sdk/rest-extensions';
import { RestSdkTypes, RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { FormContainer } from './form-container';
import { VisibilityStyle } from '../styling/visibility-style';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type:RestSdkTypes.Pages,
        Variations:null
    }]
};

export async function ChangePassword(props: WidgetContext<ChangePasswordEntity>) {
    const entity = {
        PostPasswordChangeRedirectPage: defaultMixedContent,
        PostPasswordChangeMessage:  'Your password was changed successfully!',
        Header: 'Change password',
        CurrentPassword: 'Current password',
        NewPassword: 'New password',
        ConfirmPassword: 'Repeat new password',
        SubmitButtonLabel: 'Save',
        LoginFirstMessage: 'You need to be logged in to change your password.',
        ValidationRequiredMessage: 'All fields are required.',
        ValidationMismatchMessage: 'New password and repeat password don\'t match.',
        ExternalProviderMessageFormat: 'Your profile does not store any passwords, because you are registered with ',
        ...props.model.Properties
    };
    const context = props.requestContext;
    const dataAttributes = htmlAttributes(props);
    const defaultClass =  entity.CssClass;
    const marginClass = entity.Margins && StyleGenerator.getMarginClasses(entity.Margins);
    const webServicePath =  process.env.SF_WEB_SERVICE_PATH;

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        ChangePasswordHandlerPath: `${webServicePath}/ChangePassword`,
        Attributes: entity.Attributes,
        Labels: {}
    };

    viewModel.Labels.Header = entity.Header;
    viewModel.Labels.OldPassword = entity.CurrentPassword;
    viewModel.Labels.NewPassword = entity.NewPassword;
    viewModel.Labels.RepeatPassword = entity.ConfirmPassword;
    viewModel.Labels.SubmitButtonLabel = entity.SubmitButtonLabel;
    viewModel.Labels.LoginFirstMessage = entity.LoginFirstMessage;
    viewModel.Labels.ValidationRequiredMessage = entity.ValidationRequiredMessage;
    viewModel.Labels.ValidationMismatchMessage = entity.ValidationMismatchMessage;
    viewModel.Labels.ExternalProviderMessageFormat = entity.ExternalProviderMessageFormat;
    viewModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    viewModel.InvalidClass = StylingConfig.InvalidClass;


    viewModel.PostPasswordChangeAction = entity.PostPasswordChangeAction;
    let baseURL;
    if (process.env.NODE_ENV === 'development'){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        baseURL = 'https://localhost:5001/sf/system/users/current';
    }
    const argsLocal = {
        BaseURL: baseURL,
        Name: 'users/current',
        AdditionalHeaders: {
            'cookie' : context.cookie
        }
    };
    const response: any = await RestService.getUnboundType(argsLocal);
    const user: any = response.value;

    viewModel.ExternalProviderName = user?.ExternalProviderName;

    if (entity.PostPasswordChangeAction === PostPasswordChangeAction.RedirectToPage) {

            viewModel.RedirectUrl = RestExtensionsService.getPageNodeUrl(entity.PostPasswordChangeRedirectPage);
    } else {
        viewModel.PostPasswordChangeMessage = entity.PostPasswordChangeMessage;
    }

    const hasUser = user || (user && !user.IsAuthenticated);
    const labels = viewModel.Labels;
    const oldPasswordInputId = getUniqueId('sf-old-password-');
    const newPasswordInputId = getUniqueId('sf-new-password-');
    const repeatPasswordInputId = getUniqueId('sf-repeat-password-');

    return (
      <div
        data-sf-role="sf-change-password-container"
        data-sf-visibility-hidden={viewModel.VisibilityClasses[VisibilityStyle.Hidden]}
        data-sf-invalid={viewModel.InvalidClass}
        {...dataAttributes}
        >
        { !hasUser
        ? <div className="alert alert-danger my-3">{labels.LoginFirstMessage}</div>
        : viewModel.ExternalProviderName
            ? <div>{`${labels.ExternalProviderMessageFormat}${viewModel.ExternalProviderName}`}</div>
            :  <>
              <form action={viewModel.ChangePasswordHandlerPath} method="post" role="form">
                <h2 className="mb-3">{labels.Header}</h2>
                <div data-sf-role="error-message-container" className="alert alert-danger my-3 d-none" role="alert" aria-live="assertive" />
                <div data-sf-role="success-message-container" className="alert alert-success my-3 d-none" role="alert" aria-live="assertive" />
                <div className="mb-3">
                  <label htmlFor={oldPasswordInputId} className="form-label">{labels.OldPassword}</label>
                  <input type="password" className="form-control" id={oldPasswordInputId} name="OldPassword" data-sf-role="required" />
                </div>
                <div className="mb-3">
                  <label htmlFor={newPasswordInputId} className="form-label">{labels.NewPassword}</label>
                  <input type="password" className="form-control" id={newPasswordInputId} name="NewPassword" data-sf-role="required" />
                </div>
                <div className="mb-3">
                  <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatPassword}</label>
                  <input type="password" className="form-control" id={repeatPasswordInputId} name="RepeatPassword" data-sf-role="required" />
                </div>

                <input className="btn btn-primary w-100" type="submit" value={labels.SubmitButtonLabel} />
              </form>

              <input type="hidden" name="redirectUrl" value={viewModel.RedirectUrl} />
              <input type="hidden" name="postChangeMessage" value={viewModel.PostPasswordChangeMessage} />
              <input type="hidden" name="postChangeAction" value={viewModel.PostPasswordChangeAction} />
              <input type="hidden" name="validationRequiredMessage" value={labels.ValidationRequiredMessage} />
              <input type="hidden" name="validationMismatchMessage" value={labels.ValidationMismatchMessage} />
            </>
        }
      </div>
    );
}

export class ChangePasswordEntity {
    Attributes?: any[];
    CssClass?: string;
    Margins?: OffsetStyle;
    PostPasswordChangeAction?: PostPasswordChangeAction;
    PostPasswordChangeRedirectPage?: MixedContentContext;
    SfViewName?: string;
    PostPasswordChangeMessage?: string;
    Header?: string;
    CurrentPassword?: string;
    NewPassword?: string;
    ConfirmPassword?: string;
    SubmitButtonLabel?: string;
    LoginFirstMessage?: string;
    ValidationRequiredMessage?: string;
    ValidationMismatchMessage?: string;
    ExternalProviderMessageFormat?: string;
}

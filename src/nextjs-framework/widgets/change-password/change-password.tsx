import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { PostPasswordChangeAction } from './interfaces/PostPasswordChangeAction';
import { StylingConfig } from '../styling/styling-config';
import { ChangeForm } from './change-form';
import { VisibilityStyle } from '../styling/visibility-style';
import { ChangePasswordViewModel } from './interfaces/ChangePasswordViewModel';
import { User } from './interfaces/User';
import { classNames } from '../..';
import { getUniqueId } from '../..';
import { RestExtensionsService } from '../..';
import { htmlAttributes } from '../..';
import { MixedContentContext } from '../..';
import { WidgetContext } from '../..';
import { RestSdkTypes, RestService } from '../..';
import { RootUrlService } from '../..';

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

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: ChangePasswordViewModel = {
        ChangePasswordHandlerPath: `${RootUrlService.getServiceUrl()}}/ChangePassword`,
        Attributes: entity.Attributes,
        VisibilityClasses: StylingConfig.VisibilityClasses,
        InvalidClass: StylingConfig.InvalidClass,
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

    viewModel.PostPasswordChangeAction = entity.PostPasswordChangeAction;
    let baseURL;
    if (process.env.NODE_ENV === 'development'){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        baseURL = `${process.env.NEXT_PUBLIC_CMS_URL}sf/system/users/current`;
    }
    const argsLocal = {
        BaseURL: baseURL,
        Name: 'users/current',
        AdditionalHeaders: {
            cookie : context.cookie || ''
        }
    };
    const response: { value: User } = await RestService.getUnboundType(argsLocal);
    const user: User = response.value;

    viewModel.ExternalProviderName = user?.ExternalProviderName;

    if (entity.PostPasswordChangeAction === PostPasswordChangeAction.RedirectToPage) {

            viewModel.RedirectUrl = await RestExtensionsService.getPageNodeUrl(entity.PostPasswordChangeRedirectPage);
    } else {
        viewModel.PostPasswordChangeMessage = entity.PostPasswordChangeMessage;
    }

    const hasUser = (user && user.IsAuthenticated);
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
              <ChangeForm
                viewModel={viewModel}
                oldPasswordInputId={oldPasswordInputId}
                newPasswordInputId={newPasswordInputId}
                repeatPasswordInputId={repeatPasswordInputId} />
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

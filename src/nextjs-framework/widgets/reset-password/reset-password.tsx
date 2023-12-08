import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { MixedContentContext, WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../editor';

import { StylingConfig } from '../styling/styling-config';
import { ForgottenForm } from './forgotten-form';
import { ResetForm } from './reset-form';
import { RestSdkTypes, RootUrlService, RestService } from '../../rest-sdk';
import { RestExtensionsService } from '../rest-extensions';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type: RestSdkTypes.Pages,
        Variations: null
    }]
};

const PasswordRecoveryQueryStringKey = 'vk';

const isResetPasswordRequest = (context: any) => {
    if (context.IsLive) {
        if (context.searchParams[PasswordRecoveryQueryStringKey]) {
            return true;
        }
    }

    return false;
};

export async function ResetPassword(props: WidgetContext<ResetPasswordEntity>) {
    const entity = {
        LoginPage: defaultMixedContent,
        ResetPasswordHeader: 'Reset password',
        NewPasswordLabel: 'New password',
        RepeatNewPasswordLabel: 'Repeat new password',
        SecurityQuestionLabel: 'Secret question:',
        SaveButtonLabel: 'Save',
        SuccessMessage: 'Your password is successfully changed.',
        ErrorMessage: 'You are unable to reset password. Contact your administrator for assistance.',
        BackLinkLabel: 'Back to login',
        AllFieldsAreRequiredErrorMessage: 'All fields are required.',
        PasswordsMismatchErrorMessage: 'New password and repeat password don\'t match.',
        ForgottenPasswordHeader: 'Forgot your password?',
        ForgottenPasswordLabel: 'Enter your login email address and you will receive an email with a link to reset your password.',
        EmailLabel: 'Email',
        SendButtonLabel: 'Send',
        ForgottenPasswordSubmitMessage: 'You sent a request to reset your password to',
        ForgottenPasswordLinkMessage: 'Use the link provided in your email to reset the password for your account.',
        InvalidEmailFormatMessage: 'Invalid email format.',
        FieldIsRequiredMessage: 'Field is required.',
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

    const viewModel: any = {
        Attributes: entity.Attributes,
        Labels: {}
    };

    viewModel.ResetUserPasswordHandlerPath = `${RootUrlService.getServiceUrl()}}/ResetUserPassword`;
    viewModel.Attributes = entity.Attributes;
    viewModel.Labels.ResetPasswordHeader = entity.ResetPasswordHeader;
    viewModel.Labels.NewPasswordLabel = entity.NewPasswordLabel;
    viewModel.Labels.RepeatNewPasswordLabel = entity.RepeatNewPasswordLabel;
    viewModel.Labels.SecurityQuestionLabel = entity.SecurityQuestionLabel;
    viewModel.Labels.SaveButtonLabel = entity.SaveButtonLabel;
    viewModel.Labels.BackLinkLabel = entity.BackLinkLabel;
    viewModel.Labels.SuccessMessage = entity.SuccessMessage;
    viewModel.Labels.ErrorMessage = entity.ErrorMessage;
    viewModel.Labels.AllFieldsAreRequiredErrorMessage = entity.AllFieldsAreRequiredErrorMessage;
    viewModel.Labels.PasswordsMismatchErrorMessage = entity.PasswordsMismatchErrorMessage;

    viewModel.SendResetPasswordEmailHandlerPath = `${RootUrlService.getServiceUrl()}/SendResetPasswordEmail`;
    viewModel.Labels.ForgottenPasswordHeader = entity.ForgottenPasswordHeader;
    viewModel.Labels.EmailLabel = entity.EmailLabel;
    viewModel.Labels.ForgottenPasswordLinkMessage = entity.ForgottenPasswordLinkMessage;
    viewModel.Labels.ForgottenPasswordSubmitMessage = entity.ForgottenPasswordSubmitMessage;
    viewModel.Labels.SendButtonLabel = entity.SendButtonLabel;
    viewModel.Labels.BackLinkLabel = entity.BackLinkLabel;
    viewModel.Labels.ForgottenPasswordLabel = entity.ForgottenPasswordLabel;
    viewModel.Labels.InvalidEmailFormatMessage = entity.InvalidEmailFormatMessage;
    viewModel.Labels.FieldIsRequiredMessage = entity.FieldIsRequiredMessage;
    viewModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    viewModel.InvalidClass = StylingConfig.InvalidClass;

    viewModel.LoginPageUrl = await RestExtensionsService.getPageNodeUrl(entity.LoginPage);
    const queryList = new URLSearchParams(context.searchParams);
    const queryString = '?' + queryList.toString();

    if (isResetPasswordRequest(context)) {
        viewModel.IsResetPasswordRequest = true;

        try {
            const argsLocal = {
                Name: 'Default.GetResetPasswordModel',
                Data: {
                      securityToken: queryString
                }
            };
            const resetPasswordModel: any = await RestService.getUnboundType(argsLocal);

            viewModel.RequiresQuestionAndAnswer = resetPasswordModel.RequiresQuestionAndAnswer;
            viewModel.SecurityQuestion = resetPasswordModel.SecurityQuestion;
        } catch (Exception) {
            // In terms of security, if there is some error with the user get, we display common error message to the user.
            viewModel.Error = true;
        }
    } else {
        if (context.isLive) {
            viewModel.ResetPasswordUrl = context.pageNode.MetaInfo.CanonicalUrl;
        }
    }

    const labels = viewModel.Labels;
    const securityQuestionInputId = getUniqueId('sf-security-question-');
    const newPasswordInputId = getUniqueId('sf-new-password-');
    const repeatPasswordInputId = getUniqueId('sf-repeat-password-');
    const emailInputId = getUniqueId('sf-email-');
    const securityQuestionLabel = !labels.SecurityQuestionLabel ? viewModel.SecurityQuestion : `${labels.SecurityQuestionLabel} ${viewModel.SecurityQuestion}`;
    return (
      <div
        {...dataAttributes}
        >
        {viewModel.IsResetPasswordRequest ?
          <div data-sf-role="sf-reset-password-container">
            {viewModel.Error || (viewModel.RequiresQuestionAndAnswer && !viewModel.SecurityQuestion) ?
              <>
                <h2>{labels.ResetPasswordHeader}</h2>
                <div data-sf-role="error-message-container" className="alert alert-danger" role="alert" aria-live="assertive">{labels.ErrorMessage}</div>
              </>
                :
              <ResetForm
                viewModel={viewModel}
                context={context}
                securityQuestionInputId={securityQuestionInputId}
                newPasswordInputId={newPasswordInputId}
                repeatPasswordInputId={repeatPasswordInputId}
                securityQuestionLabel={securityQuestionLabel}
                   />
                }
          </div>
        : <div data-sf-role="sf-forgotten-password-container">
          <h2 className="mb-3">{labels.ForgottenPasswordHeader}</h2>
          <ForgottenForm viewModel={viewModel} emailInputId={emailInputId} />
          {viewModel.LoginPageLink &&
            <a href={viewModel.LoginPageLink} className="text-decoration-none">{labels.BackLinkLabel}</a>
            }
        </div>
        }
      </div>
    );
}

export class ResetPasswordEntity {
    Attributes?: { [key: string]: Array<{ Key: string, Value: string}> };
    CssClass?: string;
    Margins?: OffsetStyle;
    LoginPage?: MixedContentContext;
    SfViewName?: string;
    ResetPasswordHeader?: string;
    NewPasswordLabel?: string;
    RepeatNewPasswordLabel?: string;
    SecurityQuestionLabel?: string;
    SaveButtonLabel?: string;
    SuccessMessage?: string;
    ErrorMessage?: string;
    BackLinkLabel?: string;
    AllFieldsAreRequiredErrorMessage?: string;
    PasswordsMismatchErrorMessage?: string;
    ForgottenPasswordHeader?: string;
    ForgottenPasswordLabel?: string;
    EmailLabel?: string;
    SendButtonLabel?: string;
    ForgottenPasswordSubmitMessage?: string;
    ForgottenPasswordLinkMessage?: string;
    InvalidEmailFormatMessage?: string;
    FieldIsRequiredMessage?: string;
}

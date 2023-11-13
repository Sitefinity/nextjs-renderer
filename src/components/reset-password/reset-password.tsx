import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { StylingConfig } from '../styling/styling-config';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';
import { RestExtensionsService } from 'sitefinity-react-framework/sdk/rest-extensions';
import { RestSdkTypes, RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type:RestSdkTypes.Pages,
        Variations:null
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
    const webServicePath =  process.env.SF_WEB_SERVICE_PATH;

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

    viewModel.ResetUserPasswordHandlerPath = `${webServicePath}/ResetUserPassword`;
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

    viewModel.SendResetPasswordEmailHandlerPath = `${webServicePath}/SendResetPasswordEmail`;
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

    viewModel.LoginPageUrl = RestExtensionsService.getPageNodeUrl(entity.LoginPage);

    if (isResetPasswordRequest(context)) {
        viewModel.IsResetPasswordRequest = true;

        try {
            const argsLocal = {
                Name: 'Default.GetResetPasswordModel'
                // Data: {
                //      securityToken = this.httpContextAccessor.HttpContext.Request.QueryString.Value,
                // }
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
              <>
                <div data-sf-role="form-container">
                  <h2 className="mb-3">{labels.ResetPasswordHeader}</h2>
                  <div data-sf-role="error-message-container" className="alert alert-danger d-none my-3" role="alert" aria-live="assertive" />
                  <form method="post" action={viewModel.ResetUserPasswordHandlerPath} role="form">
                    {viewModel.RequiresQuestionAndAnswer && viewModel.SecurityQuestion &&
                      <div className="mb-3">
                        <label htmlFor={securityQuestionInputId} className="form-label">{securityQuestionLabel}</label>
                        <input id={securityQuestionInputId} type="text" className="form-control" name="Answer" data-sf-role="required" />
                      </div>
                        }
                    <div className="mb-3">
                      <label htmlFor={newPasswordInputId} className="form-label">{labels.NewPasswordLabel}</label>
                      <input id={newPasswordInputId} type="password" className="form-control" name="NewPassword" data-sf-role="required" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatNewPasswordLabel}</label>
                      <input id={repeatPasswordInputId} type="password" className="form-control" data-sf-role="required" />
                    </div>

                    <input type="hidden" name="SecurityToken" value={context.searchParams!['value']} />
                    <input className="btn btn-primary w-100" type="submit" value={labels.SaveButtonLabel} />
                  </form>
                  <input type="hidden" name="ErrorMessage" value={labels.ErrorMessage} />
                  <input type="hidden" name="AllFieldsAreRequiredErrorMessage" value={labels.AllFieldsAreRequiredErrorMessage} />
                  <input type="hidden" name="PasswordsMismatchErrorMessage" value={labels.PasswordsMismatchErrorMessage} />
                </div>
                <div data-sf-role="success-message-container" className="d-none">
                  <h2>{labels.SuccessMessage}</h2>
                  {viewModel.LoginPageLink &&
                    <a href={viewModel.LoginPageLink} className="text-decoration-none">{labels.BackLinkLabel}</a>
                  }
                </div>
              </>
                }
          </div>
        : <div data-sf-role="sf-forgotten-password-container">
          <h2 className="mb-3">{labels.ForgottenPasswordHeader}</h2>
          <div data-sf-role="error-message-container" className="alert alert-danger my-3 d-none" role="alert" aria-live="assertive" />
          <div data-sf-role="form-container">
            <p>{labels.ForgottenPasswordLabel}</p>
            <form action={viewModel.SendResetPasswordEmailHandlerPath} role="form" noValidate={true}>
              <div className="mb-3">
                <label className="form-label" htmlFor={emailInputId}>{labels.EmailLabel}</label>
                <input id={emailInputId} type="email" className="form-control" name="Email" data-sf-role="required" />
              </div>
              <input className="btn btn-primary w-100" type="submit" value={labels.SendButtonLabel} />
              <input type="hidden" name="ResetPasswordUrl" value={viewModel.ResetPasswordUrl} />
            </form>

            <input type="hidden" name="InvalidEmailFormatMessage" value={labels.InvalidEmailFormatMessage} />
            <input type="hidden" name="FieldIsRequiredMessage" value={labels.FieldIsRequiredMessage} />
          </div>
          <div data-sf-role="success-message-container" className="d-none mt-3">
            <p>{labels.ForgottenPasswordSubmitMessage} <strong data-sf-role="sent-email-label" /></p>
            <p>{labels.ForgottenPasswordLinkMessage}</p>
          </div>
          {viewModel.LoginPageLink &&
            <a href={viewModel.LoginPageLink} className="text-decoration-none">{labels.BackLinkLabel}</a>
            }
        </div>
        }
      </div>
    );
}

export class ResetPasswordEntity {
    Attributes?: any[];
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

import React from 'react';
import { StyleGenerator } from '../styling/style-generator.service';
import { OffsetStyle } from '../styling/offset-style';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { classNames } from 'sitefinity-react-framework/utils/classNames';
import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { PostRegistrationAction } from './interfaces/PostRegistrationAction';
import { StylingConfig } from '../styling/styling-config';
import { getUniqueId } from 'sitefinity-react-framework/utils/getUniqueId';
import { RestExtensionsService } from 'sitefinity-react-framework/sdk/rest-extensions';
import { RestSdkTypes, RestService } from 'sitefinity-react-framework/sdk/rest-service';
import { FilterConverterService } from 'sitefinity-react-framework/sdk/filters/filter-converter';
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { ExternalLoginBase } from 'sitefinity-react-framework/login/external-login-base';
import { ExternalProvider } from 'sitefinity-react-framework/sdk/dto/external-provider';
import { RegistrationSettingsDto } from 'sitefinity-react-framework/sdk/dto/registration-settings';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type:RestSdkTypes.Pages,
        Variations:null
    }]
};
const EncryptedParam = 'qs';

const isAccountActivationRequest = (context: any) => {
    if (context.IsLive) {
        if (context.searchParams[EncryptedParam]) {
            return true;
        }
    }

    return false;
};


export async function Registration(props: WidgetContext<RegistrationEntity>) {
    const entity = {
        PostRegistrationRedirectPage: defaultMixedContent,
        LoginPage: defaultMixedContent,
        PostRegistrationAction: 0,
        Header: 'Registration',
        FirstNameLabel: 'First name',
        LastNameLabel: 'Last name',
        EmailLabel: 'Email',
        PasswordLabel: 'Password',
        RepeatPasswordLabel: 'Repeat password',
        SecretQuestionLabel: 'Secret question',
        SecretAnswerLabel: 'Secret answer',
        RegisterButtonLabel: 'Register',
        ActivationLinkHeader: 'Please check your email',
        ActivationLinkLabel: 'An activation link has been sent to',
        SendAgainLink: 'Send again',
        SendAgainLabel: 'Another activation link has been sent to {0}. If you have not received an email please check your spam box.',
        SuccessHeader: 'Thank you!',
        SuccessLabel: 'You are successfully registered.',
        LoginLabel: 'Already registered?',
        LoginLink: 'Log in',
        ExternalProvidersHeader: 'or connect with...',
        ValidationRequiredMessage: 'All fields are required.',
        ValidationInvalidEmailMessage: 'Password and repeat password don\'t match.',
        ValidationMismatchMessage: 'Invalid email format.',
        ActivationMessage: 'Your account is activated',
        ActivationFailMessage: 'Your account could not be activated',
        ...props.model.Properties
    };
    const context = props.requestContext;

    const dataAttributes = htmlAttributes(props);
    const defaultClass =  entity.CssClass;
    const marginClass = entity.MarginStyle && StyleGenerator.getMarginClasses(entity.MarginStyle);
    const webServicePath =  process.env.SF_WEB_SERVICE_PATH;

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        RegistrationHandlerPath: `/${webServicePath}/Registration`,
        ResendConfirmationEmailHandlerPath: `/${webServicePath}/ResendConfirmationEmail`,
        ExternalLoginHandlerPath: '/sitefinity/external-login-handler',
        Attributes: entity.Attributes,
        Labels: {}
    };

    if (entity.ExternalProviders && entity.ExternalProviders.length){
        const argsLocal = {
            Name: 'Default.GetExternalProviders'
        };
        const externalProviders: any = await RestService.getUnboundType(argsLocal);
        viewModel.ExternalProviders = externalProviders.value.filter((p: ExternalProvider) => entity.ExternalProviders?.indexOf(p.Name) !== -1);
    }

    viewModel.Labels.Header = entity.Header;
    viewModel.Labels.FirstNameLabel = entity.FirstNameLabel;
    viewModel.Labels.LastNameLabel = entity.LastNameLabel;
    viewModel.Labels.EmailLabel = entity.EmailLabel;
    viewModel.Labels.PasswordLabel = entity.PasswordLabel;
    viewModel.Labels.RepeatPasswordLabel = entity.RepeatPasswordLabel;
    viewModel.Labels.SecretQuestionLabel = entity.SecretQuestionLabel;
    viewModel.Labels.SecretAnswerLabel = entity.SecretAnswerLabel;
    viewModel.Labels.RegisterButtonLabel = entity.RegisterButtonLabel;
    viewModel.Labels.ActivationLinkHeader = entity.ActivationLinkHeader;
    viewModel.Labels.ActivationLinkLabel = entity.ActivationLinkLabel;
    viewModel.Labels.SendAgainLink = entity.SendAgainLink;
    viewModel.Labels.SendAgainLabel = entity.SendAgainLabel;
    viewModel.Labels.SuccessHeader = entity.SuccessHeader;
    viewModel.Labels.SuccessLabel = entity.SuccessLabel;
    viewModel.Labels.LoginLabel = entity.LoginLabel;
    viewModel.Labels.LoginLink = entity.LoginLink;
    viewModel.Labels.ExternalProvidersHeader = entity.ExternalProvidersHeader;
    viewModel.Labels.ValidationRequiredMessage = entity.ValidationRequiredMessage;
    viewModel.Labels.ValidationMismatchMessage = entity.ValidationMismatchMessage;
    viewModel.Labels.ValidationInvalidEmailMessage = entity.ValidationInvalidEmailMessage;
    viewModel.VisibilityClasses = StylingConfig.VisibilityClasses;
    viewModel.InvalidClass = StylingConfig.InvalidClass;

    viewModel.LoginPageUrl = RestExtensionsService.getPageNodeUrl(entity.LoginPage);
    if (isAccountActivationRequest(context)) {
        viewModel.IsAccountActivationRequest = true;
        viewModel.Labels.ActivationMessage = entity.ActivationMessage;

        try {
            const encryptedParam = context.searchParams ? context.searchParams[EncryptedParam] : '';
            const AdditionalQueryParams = encryptedParam ? {
                [EncryptedParam]: encodeURIComponent(encryptedParam).toString()
            } : undefined;
            const argsLocal = {
                Name: 'Default.RegistrationSettings',
                AdditionalQueryParams
            };
            await RestService.getUnboundType(argsLocal);
        } catch (ErrorCodeException) {
            viewModel.Labels.ActivationMessage = entity.ActivationFailMessage;
        }
    } else {
        if (entity.PostRegistrationAction === PostRegistrationAction.RedirectToPage) {
            viewModel.RedirectUrl = RestExtensionsService.getPageNodeUrl(entity.PostRegistrationRedirectPage);
            viewModel.PostRegistrationAction = PostRegistrationAction.RedirectToPage;
        }

        const argsLocal = {
            Name: 'Default.RegistrationSettings'
        };
        const result: RegistrationSettingsDto = await RestService.getUnboundType(argsLocal);

        viewModel.RequiresQuestionAndAnswer = result.RequiresQuestionAndAnswer;
        viewModel.ActivationMethod = result.ActivationMethod;
        if (context.isLive) {
            viewModel.ActivationPageUrl = context.pageNode.MetaInfo.CanonicalUrl;
        }
    }

    const labels = viewModel.Labels;
    const firstNameInputId = getUniqueId('sf-first-name-');
    const lastNameInputId = getUniqueId('sf-last-name-');
    const emailInputId = getUniqueId('sf-email-');
    const passwordInputId = getUniqueId('sf-new-password-');
    const repeatPasswordInputId = getUniqueId('sf-repeat-password-');
    const questionInputId = getUniqueId('sf-secret-question-');
    const answerInputId = getUniqueId('sf-secret-answer-');
    const showSuccessMessage = ExternalLoginBase.ShowSuccessMessage(context);
    return (
      <div
        {...dataAttributes}
        >
        {viewModel.IsAccountActivationRequest && <h2 className="mb-3">
            {labels.ActivationMessage}
        </h2>
        }
        {showSuccessMessage && <h3>{labels.SuccessHeader}</h3>}
        {showSuccessMessage && <p>{labels.SuccessLabel}</p>}
        {
            !showSuccessMessage &&
            <>
              <div data-sf-role="form-container">
                <h2 className="mb-3">labels.Header</h2>
                <div data-sf-role="error-message-container" className="alert alert-danger d-none my-3" role="alert" aria-live="assertive" />
                <form method="post" action={viewModel.RegistrationHandlerPath} role="form" noValidate={true}>
                  <div className="mb-3">
                    <label htmlFor={firstNameInputId} className="form-label">{labels.FirstNameLabel}</label>
                    <input id={firstNameInputId} type="text" className="form-control" name="FirstName" data-sf-role="required"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={lastNameInputId} className="form-label">{labels.LastNameLabel}</label>
                    <input id={lastNameInputId} type="text" className="form-control" name="LastName" data-sf-role="required"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={emailInputId} className="form-label">{labels.EmailLabel}</label>
                    <input id={emailInputId} type="email" className="form-control" name="Email" data-sf-role="required"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={passwordInputId} className="form-label">{labels.PasswordLabel}</label>
                    <input id={passwordInputId} type="password" className="form-control" name="Password" data-sf-role="required"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={repeatPasswordInputId} className="form-label">{labels.RepeatPasswordLabel}</label>
                    <input id={repeatPasswordInputId} type="password" className="form-control" name="RepeatPassword" data-sf-role="required"/>
                  </div>

                  {viewModel.RequiresQuestionAndAnswer &&
                  <div className="mb-3">
                    <label htmlFor={questionInputId} className="form-label">{labels.SecretQuestionLabel}</label>
                    <input id={questionInputId} type="text" className="form-control" name="Question" data-sf-role="required"/>
                  </div>
                    }
                  {viewModel.RequiresQuestionAndAnswer &&
                  <div className="mb-3">
                    <label htmlFor={answerInputId} className="form-label">{labels.SecretAnswerLabel}</label>
                    <input id={answerInputId} type="text" className="form-control" name="Answer" data-sf-role="required"/>
                  </div>
                    }

                  <input className="btn btn-primary w-100" type="submit" defaultValue={labels.RegisterButtonLabel} />

                  <input type="hidden" name="ActivationPageUrl" defaultValue={viewModel.ActivationPageUrl} />
                </form>

                {viewModel.LoginPageUrl && <div className="mt-3">{labels.LoginLabel}</div>}
                {viewModel.LoginPageUrl && <a href={viewModel.LoginPageUrl} className="text-decoration-none">{labels.LoginLink}</a>}

                {viewModel.ExternalProviders && viewModel.ExternalProviders.length &&

                    [<h3 key={100} className="mt-3">{labels.ExternalProvidersHeader}</h3>,
                        viewModel.ExternalProviders.map((provider: ExternalProvider, idx: number) => {
                            const providerClass = ExternalLoginBase.GetExternalLoginButtonCssClass(provider.Name);
                            const providerHref = ExternalLoginBase.GetExternalLoginPath(context, provider.Name);

                            return (
                              <a key={idx}
                                className={classNames('btn border fs-5 w-100 mt-2',providerClass)}
                                href={providerHref}>{provider.Value}</a>
                            );
                        })
                    ]
                }

                <input type="hidden" name="RedirectUrl" defaultValue={viewModel.RedirectUrl} />
                <input type="hidden" name="PostRegistrationAction" defaultValue={viewModel.PostRegistrationAction} />
                <input type="hidden" name="ActivationMethod" defaultValue={viewModel.ActivationMethod} />
                <input type="hidden" name="ValidationRequiredMessage" value={labels.ValidationRequiredMessage} />
                <input type="hidden" name="ValidationMismatchMessage" value={labels.ValidationMismatchMessage} />
                <input type="hidden" name="ValidationInvalidEmailMessage" value={labels.ValidationInvalidEmailMessage} />
              </div>

              <div data-sf-role="success-registration-message-container" className="d-none">
                <h3>{labels.SuccessHeader}</h3>
                <p>{labels.SuccessLabel}</p>
              </div>

              <div data-sf-role="confirm-registration-message-container" className="d-none">
                <h3>{labels.ActivationLinkHeader}</h3>
                <p data-sf-role="activation-link-message-container" />
                <a data-sf-role="sendAgainLink" className="btn btn-primary">
                  {labels.SendAgainLink}
                </a>

                <input type="hidden" name="ResendConfirmationEmailUrl" value={viewModel.ResendConfirmationEmailHandlerPath} />
                <input type="hidden" name="ActivationLinkLabel" value={labels.ActivationLinkLabel} />
                <input type="hidden" name="SendAgainLink" value={labels.SendAgainLink} />
                <input type="hidden" name="SendAgainLabel" value={labels.SendAgainLabel} />
              </div>
            </>
        }
      </div>
    );
}

export class RegistrationEntity {
    Attributes?: any[];
    CssClass?: string;
    MarginStyle?: OffsetStyle;
    PostRegistrationAction?: PostRegistrationAction;
    PostRegistrationRedirectPage?: MixedContentContext;
    LoginPage?: MixedContentContext;
    ExternalProviders?: string[];
    SfViewName?: string;
    Header?: string;
    FirstNameLabel?: string;
    LastNameLabel?: string;
    EmailLabel?: string;
    PasswordLabel?: string;
    RepeatPasswordLabel?: string;
    SecretQuestionLabel?: string;
    SecretAnswerLabel?: string;
    RegisterButtonLabel?: string;
    ActivationLinkHeader?: string;
    ActivationLinkLabel?: string;
    SendAgainLink?: string;
    SendAgainLabel?: string;
    SuccessHeader?: string;
    SuccessLabel?: string;
    LoginLabel?: string;
    LoginLink?: string;
    ExternalProvidersHeader?: string;
    ValidationRequiredMessage?: string;
    ValidationInvalidEmailMessage?: string;
    ValidationMismatchMessage?: string;
    ActivationMessage?: string;
    ActivationFailMessage?: string;
}

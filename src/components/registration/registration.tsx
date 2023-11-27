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
import { MixedContentContext } from 'sitefinity-react-framework/widgets/entities/mixed-content-context';
import { ExternalLoginBase } from 'sitefinity-react-framework/login/external-login-base';
import { ExternalProvider } from 'sitefinity-react-framework/sdk/dto/external-provider';
import { RegistrationSettingsDto } from 'sitefinity-react-framework/sdk/dto/registration-settings';
import { RegistrationForm } from './registration-form';
import { RootUrlService } from 'sitefinity-react-framework/sdk/root-url.service';

const defaultMixedContent = {
    ItemIdsOrdered:null,
    Content:[ {
        Type:RestSdkTypes.Pages,
        Variations:null
    }]
};
const EncryptedParam = 'qs';

const isAccountActivationRequest = (context: any) => {
    if (context && context.IsLive && context.searchParams[EncryptedParam]) {
        return true;
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
        ValidationInvalidEmailMessage: 'Invalid email format.',
        ValidationMismatchMessage: 'Password and repeat password don\'t match.',
        ActivationMessage: 'Your account is activated',
        ActivationFailMessage: 'Your account could not be activated',
        ...props.model.Properties
    };
    const context = props.requestContext;

    const dataAttributes = htmlAttributes(props);
    const defaultClass =  entity.CssClass;
    const marginClass = entity.MarginStyle && StyleGenerator.getMarginClasses(entity.MarginStyle);

    dataAttributes['className'] = classNames(
        defaultClass,
        marginClass
        );
    dataAttributes['data-sfemptyiconaction'] = 'Edit';
    dataAttributes['data-sfhasquickeditoperation'] = true;

    const viewModel: any = {
        RegistrationHandlerPath: `${RootUrlService.getServiceUrl()}}/Registration`,
        ResendConfirmationEmailHandlerPath: `${RootUrlService.getServiceUrl()}}/ResendConfirmationEmail`,
        ExternalLoginHandlerPath: '/sitefinity/external-login-handler',
        Attributes: entity.Attributes,
        Labels: {}
    };

    if (entity.ExternalProviders && entity.ExternalProviders.length){
        const argsLocal = {
            Name: 'Default.GetExternalProviders'
        };
        const externalProviders: { value: ExternalProvider[] } = await RestService.getUnboundType(argsLocal);
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

    viewModel.LoginPageUrl = await RestExtensionsService.getPageNodeUrl(entity.LoginPage);

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
            viewModel.RedirectUrl = await RestExtensionsService.getPageNodeUrl(entity.PostRegistrationRedirectPage);
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

    const formContainerServer = (<>
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
    </>);
    const confirmServer = (<>
      <input type="hidden" name="ResendConfirmationEmailUrl" value={viewModel.ResendConfirmationEmailHandlerPath} />
      <input type="hidden" name="ActivationLinkLabel" value={labels.ActivationLinkLabel} />
      <input type="hidden" name="SendAgainLink" value={labels.SendAgainLink} />
      <input type="hidden" name="SendAgainLabel" value={labels.SendAgainLabel} />
    </>);
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

              <RegistrationForm method="post" action={viewModel.RegistrationHandlerPath} role="form" noValidate={true}
                viewModel={viewModel}
                context={context}
                firstNameInputId={firstNameInputId}
                lastNameInputId={lastNameInputId}
                emailInputId={emailInputId}
                passwordInputId={passwordInputId}
                questionInputId={questionInputId}
                answerInputId={answerInputId}
                repeatPasswordInputId={repeatPasswordInputId}
                formContainerServer={formContainerServer}
                confirmServer={confirmServer}
                   />
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
